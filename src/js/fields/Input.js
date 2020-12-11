(function($, _, _is, _fn, _obj){

	_.Input = _.Field.extend({
		setup: function() {
			var self = this;
			self.currentValue = self.val();
			self.debouncedId = null;
			self.$change.off("change", self.onValueChanged)
				.on('input.foofields', { self: self }, self.onInputChange);
		},
		teardown: function(){
			var self = this;
			clearTimeout(self.debouncedId);
			self.$change.off('.foofields');
		},
		onInputChange: function(e){
			const self = e.data.self, val = self.val();
			if (val !== self.currentValue){
				self.currentValue = val;
				self.doValueChanged();
			}
		}
	});

	_.fields.register("input", _.Input, ".foofields-type-text,.foofields-type-textarea", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.fn,
	FooFields.utils.obj
);
