(function($, _, _is, _fn, _obj){

	if (!$.fn.wpColorPicker) {
		console.log("FooFields.ColorPicker dependency missing.");
		return;
	}

	_.ColorPicker = _.Field.extend({
		setup: function() {
			var self = this;
			self.debouncedId = null;
			self.$pickers = self.$input.children('input[type=text]').wpColorPicker({
				change: self.onColorPickerChange.bind(self),
				clear: self.onColorPickerClear.bind(self)
			});
		},
		val: function(value){
			const self = this, current = self.$pickers.val();
			if (!_is.undef(value)){
				self.$pickers.wpColorPicker('color', value);
				return;
			}
			return current;
		},
		doValueChanging: function(value){
			const self = this;
			self.trigger("changing", [value, self]);
			self.ctnr.trigger("changing", [self, value]);
		},
		onColorPickerClear: function(){
			this.doValueChanged();
		},
		onColorPickerChange: function(e, ui, color){
			const self = this;
			self.doValueChanging(_is.string(color) ? color : ui.color.toString());
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
