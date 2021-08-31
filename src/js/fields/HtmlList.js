(function($, _, _is, _obj){

	_.HtmlList = _.Field.extend({
		updateSelected: function(){
			var self = this;
			self.$change.each(function(){
				var $el = $(this);
				$el.parent('label').toggleClass(self.instance.cls.selected, $el.is(self.opt.valueFilter));
			});
		},
		setup: function(){
			this.updateSelected();
		},
		doValueChanged: function(){
			const self = this;
			self.updateSelected();
			if ( self.opt.nonce ) {
				self.doCallback();
			}
			self._super();
		},
		doCallback: function(){
			const self = this;
			var postData = {
				'action': 'foofields_' + self.id,
				'value': self.val(),
				'nonce': self.opt.nonce
			};

			if ( $( '#post_ID' ).length ) {
				postData.postID = $( '#post_ID' ).val();
			}

			$.ajax({
				url: window.ajaxurl,
				type: 'POST',
				data: postData,
				error: function() {

					//What do we do with an error?
				},
				success: function( res ) {
					if ( res ) {
						if ( res.success ) {
							// if ( res.data.message ) {
							// 	alert( res.data.message );
							// }
							// if ( res.data.replace ) {
							// 	$( res.data.replace.target ).html( res.data.replace.html );
							// 	_.__instance__.reinit();
							// }
							// if ( res.data.show ) {
							// 	$( res.data.show ).show();
							// }
							if ( res.data.metabox ) {
								var $metabox = $( '#' + res.data.metabox.id );
								$metabox.find('.inside').html( res.data.metabox.html );
								$metabox.find('.postbox-header h2').html( res.data.metabox.title );
								_.__instance__.reinit();
								$metabox.show();
							}
						}
					}
				},
				complete: function() {

				}
			});
		},
	});

	_.fields.register("htmllist", _.HtmlList, ".foofields-type-htmllist,.foofields-type-radiolist,.foofields-type-checkboxlist", {
		changeSelector: "[type='checkbox'],[type='radio']",
		valueSelector: "[type='checkbox'],[type='radio']",
		valueFilter: ":checked",
	}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
