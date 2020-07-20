(function($, _, _is, _obj){

	if (!$.fn.wpColorPicker) {
		console.log("FooFields.ColorPicker dependency missing.");
		return;
	}

	_.ColorPicker = _.Field.extend({
		setup: function() {
			var self = this;
			self.$input.children('input[type=text]').wpColorPicker();
		}
	});

	_.fields.register("colorpicker", _.ColorPicker, ".foofields-type-colorpicker", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
