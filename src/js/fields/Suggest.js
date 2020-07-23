(function($, _, _is, _obj){

	if (!$.fn.suggest) {
		console.log("FooFields.Suggest dependency missing.");
		return;
	}

	_.Suggest = _.Field.extend({
		setup: function() {
			var self = this;
			self.$suggest = self.$input.children('input[type=text]').first();
			self.$suggest.suggest(
				window.ajaxurl + '?' + self.opt.query,
				{
					multiple: self.opt.mulitple,
					multipleSep: self.opt.separator
				}
			);
		}
	});

	_.fields.register("suggest", _.Suggest, ".foofields-type-suggest", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
