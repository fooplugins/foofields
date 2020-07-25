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
		},
		init: function(){
			var self = this;
			self.setup();
			self.$change.on("change.foofields", {self: self}, self.onValueChanged);
			self._super();
			self.trigger("init", [self]);
		},
		setup: function(){},
		destroy: function(){
			var self = this;
			self.trigger("destroy", [self]);
			self.$change.off("change.foofields", self.onValueChanged);
			self.teardown();
			self._super();
		},
		teardown: function(){},
		toggle: function(state){
			this._super(state);
			if ( this.visible ) {
				this.enable();
			} else {
				this.disable();
			}
		},
		disable: function() {
			this.$el.find(":input").attr("disabled", "disabled");
		},
		enable: function() {
			this.$el.find(":input").removeAttr("disabled");
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
		}
	});

	_.fields.register("field", _.Field, ".foofields-field", {
		// options
		showWhen: {
			field: null,
			value: null,
			operator: null
		},
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
