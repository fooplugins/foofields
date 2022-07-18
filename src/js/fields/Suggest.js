(function($, _, _is, _obj){

	_.Suggest = _.Field.extend({
		construct: function(content, element, options, classes, i18n){
			const self = this;
			self._super(content, element, options, classes, i18n);
			self._timeout = null;
			self._prevLength = 0;
			self._cache = [];
			self._cacheSize = 0;
			self._$window = $( window );
			self._endpoint = '';
		},
		setup: function() {
			const self = this;
			self._endpoint = window.ajaxurl + '?' + self.opt.query;

			self.$suggest = self.$input.children( "input[type=text]" ).first();
			self.$suggest.attr( "autocomplete", "off" )
				.on( {
					"blur": self.onBlur,
					"keydown": self.onKeydown
				}, { self } );

			self.$suggestions = $( "<ul/>" ).addClass( self.cls.results );
			self.$suggestions.appendTo( "body" );
		},
		resetPosition: function(){
			const self = this;
			const offset = self.$suggest.offset();
			const top = offset.top + self.$suggest.prop("offsetHeight");
			self.$suggestions.css( {
				top: top + 'px',
				left: offset.left + 'px'
			} );
		},
		query: function(){
			const self = this;
			let q = self.$suggest.val().trim(), multipleSepPos, items;
			if ( self.opt.multiple ) {
				multipleSepPos = q.lastIndexOf( self.opt.multipleSep );
				if ( multipleSepPos !== -1 ) {
					q = q.substring( multipleSepPos + self.opt.multipleSep.length ).trim();
				}
			}
			if ( q.length >= self.opt.minchars ) {
				const cached = self.checkCache( q );
				if ( cached ) {
					self.displayItems( cached[ 'items' ] );
				} else {
					$.get( self._endpoint, { q: q }, function( txt ) {
						self.$suggestions.hide();
						items = self.parseTxt( txt, q );
						self.displayItems( items );
						self.addToCache( q, items, txt.length );
					} );
				}
			} else {
				self.$suggestions.hide();
			}
		},
		displayItems: function( items ){
			if ( !items ) return;

			const self = this;
			if ( !items.length ) {
				self.$suggestions.hide();
				return;
			}

			self.resetPosition(); // when the form moves after the page has loaded

			const html = items.reduce( function( result, item ) {
				result += '<li>' + item + '</li>';
				return result;
			}, '' );

			self.$suggestions.html( html ).show();
			self.$suggestions.children( 'li' )
				.on( { 'mouseover': self.onItemMouseover, 'click': self.onItemClick }, { self } );
		},
		checkCache: function( query ){
			const self = this;
			let i;
			for ( i = 0; i < self._cache.length; i++ ) {
				if ( self._cache[ i ][ 'q' ] === query ) {
					self._cache.unshift( self._cache.splice( i, 1 )[ 0 ] );
					return self._cache[ 0 ];
				}
			}
			return false;
		},
		addToCache: function( query, items, size ){
			const self = this;
			let cached;
			while ( self._cache.length && ( self._cacheSize + size > self.opt.maxCacheSize ) ) {
				cached = self._cache.pop();
				self._cacheSize -= cached[ 'size' ];
			}
			self._cache.push( { q: query, size: size, items: items } );
			self._cacheSize += size;
		},
		onBlur: function( e ){
			const self = e.data.self;
			setTimeout( function() {
				self.$suggestions.hide()
			}, 200 );
		},
		onKeydown: function( e ){
			const self = e.data.self;
			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if ( ( /27$|38$|40$/.test( e.keyCode ) && self.$suggestions.is( ':visible' ) )
				|| ( /^13$|^9$/.test( e.keyCode ) && self.getCurrentResult() ) ) {

				if ( e.preventDefault ) e.preventDefault();
				if ( e.stopPropagation ) e.stopPropagation();

				e.cancelBubble = true;
				e.returnValue = false;

				switch ( e.keyCode ) {
					case 38: // up
						self.prevResult();
						break;
					case 40: // down
						self.nextResult();
						break;
					case 9:  // tab
					case 13: // return
						self.selectCurrentResult();
						break;
					case 27: //	escape
						self.$suggestions.hide();
						break;
				}
			} else if ( self.$suggest.val().length !== self._prevLength ) {
				if ( self._timeout ) clearTimeout( self._timeout );
				self._timeout = setTimeout( function(){
					self.query();
				}, self.opt.delay );
				self._prevLength = self.$suggest.val().length;
			}
		},
		onItemMouseover: function( e ){
			const self = e.data.self;
			self.$suggestions.children( 'li' ).removeClass( self.cls.select );
			$( this ).addClass( self.cls.select );
		},
		onItemClick: function( e ){
			e.preventDefault();
			e.stopPropagation();
			e.data.self.selectCurrentResult();
		},
		parseTxt: function( txt, query ){
			const self = this;
			// parse returned data for non-empty items
			return txt.split( self.opt.delimiter ).reduce( function( result, token ) {
				let trimmed = token.trim();
				if ( trimmed.length ) {
					trimmed = trimmed.replace(
						new RegExp( query, 'ig' ),
						function( matched ) {
							return '<span class="' + self.cls.match + '">' + matched + '</span>';
						}
					);
					result.push( trimmed );
				}
				return result;
			}, [] );
		},
		getCurrentResult: function() {
			const self = this;
			if ( !self.$suggestions.is( ':visible' ) ) return false;
			let $currentResult = self.$suggestions.children( 'li.' + self.cls.select );
			if ( !$currentResult.length ) $currentResult = false;
			return $currentResult;
		},
		selectCurrentResult: function() {
			const self = this;
			const $currentResult = self.getCurrentResult();
			if ( !$currentResult ) return;
			if ( self.opt.multiple ) {
				let value = self.$suggest.val();
				if ( value.indexOf( self.opt.multipleSep ) !== -1 ) {
					value = value.substring( 0, ( value.lastIndexOf( self.opt.multipleSep ) + self.opt.multipleSep.length ) ) + ' ';
				} else {
					value = "";
				}
				self.$suggest.val( value + $currentResult.text() + self.opt.multipleSep + ' ' );
				self.$suggest.focus();
			} else {
				self.$suggest.val( $currentResult.text() );
			}
			self.$suggestions.hide();
			self.$suggest.trigger( 'change' );
			if ( self.opt.onSelect ) self.opt.onSelect.apply( self.$suggest.get( 0 ) );
		},
		nextResult: function() {
			const self = this;
			const $currentResult = self.getCurrentResult();
			if ( $currentResult ) {
				$currentResult
					.removeClass( self.cls.select )
					.next()
					.addClass( self.cls.select );
			} else {
				self.$suggestions.children( 'li:first-child' ).addClass( self.cls.select );
			}
		},
		prevResult: function(){
			const self = this;
			const $currentResult = self.getCurrentResult();
			if ( $currentResult ) {
				$currentResult
					.removeClass( self.cls.select )
					.prev()
					.addClass( self.cls.select );
			} else {
				self.$suggestions.children( 'li:last-child' ).addClass( self.cls.select );
			}
		}
	});

	_.fields.register("suggest", _.Suggest, ".foofields-type-suggest", {
		source: null,
		multiple: false,
		multipleSep: ",",
		delay: 100,
		minchars: 2,
		delimiter: '\n',
		onSelect: false,
		maxCacheSize: 65536
	}, {
		results: "foofields-suggest-results",
		select: "foofields-suggest-select",
		match: "foofields-suggest-match"
	}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
