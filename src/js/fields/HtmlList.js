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
			self._super();
		}
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
