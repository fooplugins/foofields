(function($, _, _is, _obj){

	_.RepeaterDelete = _.Field.extend({
		setup: function(){
			var self = this;
			self.$button = self.$input.find(self.sel.button)
				.on("click.foofields", {self: self}, self.onClick);
		},
		teardown: function(){
			this.$button.off(".foofields");
		},
		onClick: function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $( this ),
				confirmMessage = $this.data( 'confirm' );

			if ( confirmMessage && confirm( confirmMessage ) ) {
				// within the context of a repeater the fields content property
				// holds a reference to its parent RepeaterRow so we can simply
				// call the .remove() method.
				e.data.self.content.remove();
			}
		}
	});

	_.fields.register("repeater-delete", _.RepeaterDelete, ".foofields-type-repeater-delete", {}, {
		button: ".foofields-repeater-delete"
	}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
