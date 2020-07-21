(function($, _, _is, _obj){
	_.AjaxButton = _.Field.extend({
		setup: function() {
			var self = this;
			self.$button = self.$input.find('a:first');
			self.$spinner = self.$input.find('.spinner');
			self.$message = self.$input.find('.response-message');

			self.$button.click( function( e ) {
				e.preventDefault();
				e.stopPropagation();

				//hide the message if previously shown
				self.$message.hide();

				//show the spinner
				self.$spinner.addClass( 'is-active' );

				var postData = {
					'action': 'foofields_ajaxbutton_' + self.id,
					'nonce': $( this ).data( 'nonce' )
				};

				if ( $( '#post_ID' ).length ) {
					postData.postID = $( '#post_ID' ).val();
				}

				$.ajax({
					url: window.ajaxurl,
					type: 'POST',
					data: postData,
					error: function() {
						self.$message.text( 'An unexpected error occurred!' ).addClass( 'error' ).show();
					},
					success: function( res ) {
						if ( res ) {
							if ( res.success ) {

								//output success message
								if ( res.data.message ) {
									self.$message.text( res.data.message ).addClass( 'success' ).show();
								}
							} else {

								//output error
								if ( res.data.message ) {
									self.$message.text( res.data.message ).addClass( 'error' ).show();
								}
							}
						}
					},
					complete: function() {
						self.$spinner.removeClass( 'is-active' );
					}
				});
			} );
		}
	});

	_.fields.register( 'ajaxbutton', _.AjaxButton, '.foofields-type-ajaxbutton', {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
