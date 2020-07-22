(function($, _, _utils, _is){

	_.Field = _.CtnrComponent.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content.instance, content.ctnr, element, classes, _utils.selectify(classes));
			self.content = content;
			self.opt = options;
			self.i18n = i18n;
			self.id = self.$el.attr("id");
			self.$label = self.$el.children(self.sel.label);
			self.$input = self.$el.children(self.sel.input);
			self.$change = self.$el.find(self.opt.changeSelector);
			self.$value = self.$el.find(self.opt.valueSelector);
			self.visible = !self.opt.hidden;
			self._showWhenField = null;
		},
		init: function(){
			var self = this;
			self.setup();
			self.$change.on("change.foofields", {self: self}, self.onValueChanged);
			self.setupVisibilityRules();
			self.trigger("init", [self]);
		},
		setup: function(){},
		setupVisibilityRules: function(){
			var self = this;
			self.toggle(self.visible);
			if (self.opt.showWhenField !== null){
				var field = self.instance.field(self.opt.showWhenField);
				if (field instanceof _.Field){
					self._showWhenField = field;
					self._showWhenField.on("change", self.onShowWhenFieldChanged, self);
				}
			}
		},
		destroy: function(){
			var self = this;
			self.trigger("destroy", [self]);
			self.$change.off("change.foofields", self.onValueChanged);
			self.teardownVisibilityRules();
			self.teardown();
		},
		teardown: function(){},
		teardownVisibilityRules: function(){
			var self = this;
			if (self._showWhenField instanceof _.Field){
				self._showWhenField.off("change", self.onShowWhenFieldChanged, self);
			}
		},
		toggle: function(state){
			var self = this;
			self.visible = _is.boolean(state) ? state : !self.visible;
			self.$el.toggleClass(self.instance.cls.hidden, !self.visible)
				.find(":input").attr("disabled", !self.visible);
		},
		val: function(){
			var self = this, $inputs = self.$value;
			if (_is.string(self.opt.valueFilter)){
				$inputs = $inputs.filter(self.opt.valueFilter);
			}
			return $inputs.map(function(){
				var $el = $(this);
				return self.opt.valueAttribute !== null ? $el.attr(self.opt.valueAttribute) : $el.val();
			}).get().join(',');
		},
		onValueChanged: function(e){
			var self = e.data.self;
			self.trigger("change", [self.val(), self]);
		},
		onShowWhenFieldChanged: function(e, value){
			var self = this, testValue = self.opt.showWhenValue, visible;
			switch (self.opt.showWhenOperator) {
				case "!==":
					visible = value !== testValue;
					break;
				case "regex":
					visible = new RegExp(testValue).test(value);
					break;
				case "indexOf":
					visible = value.indexOf(testValue) !== -1;
					break;
				default:
					visible = value === testValue;
					break;
			}
			self.toggle(visible);
		}
	});

	_.fields.register("field", _.Field, ".foofields-field", {
		// options
		hidden: false,
		showWhenField: null,
		showWhenValue: null,
		showWhenOperator: null,
		changeSelector: ":input",
		valueSelector: ":input",
		valueFilter: null,
		valueAttribute: null
	}, {
		el: "foofields-field",
		label: "foofields-label",
		input: "foofields-field-input"
	}, {
		// i18n
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);
