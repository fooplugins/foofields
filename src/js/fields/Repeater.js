(function($, _, _is, _obj){

	_.Repeater = _.Field.extend({
		setup: function() {
			var self = this;
			self.$addButton = self.$input.find('.foofields-repeater-add:first');
			self.$container = self.$input.find('.foofields-repeater:first');
			self.$table = self.$input.find( 'table:first' );

			self.$addButton.click( function( e ) {
				var $this = $( this ),
					$table = self.$table,
					addRow = $table.find( 'tfoot tr' ).clone();

				e.preventDefault();
				e.stopPropagation();

				//make sure the inputs are not disabled
				addRow.find( ':input' ).removeAttr( 'disabled' );

				//add the new row to the table
				$table.find( 'tbody' ).append( addRow );

				//ensure the no-data message is hidden, and the table is shown
				self.$container.removeClass( 'foofields-repeater-empty' );
			});

			self.$input.on( 'click', '.foofields-repeater-delete', function( e ) {
				var $this = $( this ),
					confirmMessage = $this.data( 'confirm' ),
					$row = $this.parents( 'tr:first' );

				e.preventDefault();
				e.stopPropagation();

				if ( confirmMessage && confirm( confirmMessage ) ) {
					$row.remove();
				}

				//check if no rows are left
				if ( self.$table.find( 'tbody tr' ).length === 0 ) {
					self.$container.addClass( 'foofields-repeater-empty' );
				}
			});
		}
	});

	_.fields.register("repeater", _.Repeater, ".foofields-type-repeater", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
