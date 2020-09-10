(function($, _, _is, _fn, _obj){

	if (!$.fn.wpColorPicker) {
		console.log("FooFields.ColorPicker dependency missing.");
		return;
	}

	_.ColorPicker = _.Field.extend({
		setup: function() {
			var self = this;
			self.debouncedId = null;
			self.$input.children('input[type=text]').wpColorPicker({
				change: self.onColorPickerChange.bind(self),
				clear: self.onColorPickerClear.bind(self)
			});
		},
		onColorPickerClear: function(){
			this.doValueChanged();
		},
		onColorPickerChange: function(e, ui){
			const self = this;
			if (self.debouncedId !== null) clearTimeout(self.debouncedId);
			self.debouncedId = setTimeout(function(){
				self.debouncedId = null;
				self.doValueChanged();
			}, 100);
		}
	});

	_.fields.register("colorpicker", _.ColorPicker, ".foofields-type-colorpicker", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.fn,
	FooFields.utils.obj
);
