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
			self.$change.on("change", {self: self}, self.onValueChanged);
			self._super();
			self.trigger("init", [self]);
			self.instance.fieldObserver.observe(self.$el.get(0));
		},
		setup: function(){},
		destroy: function(){
			var self = this;
			self.instance.fieldObserver.unobserve(self.$el.get(0));
			self.trigger("destroy", [self]);
			self.$change.off("change", self.onValueChanged);
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
		val: function(value){
			var self = this, $inputs = self.$value, isRadio = $inputs.is(":radio"), single = $inputs.length === 1;
			if (_is.undef(value)){
				if (_is.string(self.opt.valueFilter)){
					$inputs = $inputs.filter(self.opt.valueFilter);
				}
				var result = $inputs.map(function(){
					var $el = $(this);
					return self.opt.valueAttribute !== null ?
						$el.attr(self.opt.valueAttribute) :
						($el.is(":checkbox") && single ? $el.is(":checked") : $el.val());
				}).get();
				return (single || isRadio) && result.length > 0 ? (result.length === 0 ? null : result[0]) : isRadio ? "" : result;
			}
			let changed = false;
			$inputs.each(function(i){
				var $el = $(this), oldValue = null, newValue = null;
				if (self.opt.valueAttribute !== null){
					newValue = _is.string(value) ? value : JSON.stringify(value);
					oldValue = $el.attr(self.opt.valueAttribute);
					$el.attr(self.opt.valueAttribute, newValue);
				} else if ($el.is(":checkbox,:radio")){
					if (_is.boolean(value)){
						newValue = value;
					} else if (_is.array(value)) {
						newValue = value.indexOf($el.val()) !== -1;
					} else if (_is.string(value)) {
						newValue = $el.val() === value;
					}
					if (newValue !== null){
						oldValue = $el.prop('checked');
						$el.prop('checked', newValue);
					}
				} else if (_is.array(value)) {
					newValue = i < value.length ? value[i] : "";
					oldValue = $el.val();
					$el.val(newValue);
				} else {
					newValue = value;
					oldValue = $el.val();
					$el.val(newValue);
				}
				if (!changed){
					changed = oldValue !== newValue;
				}
			});
			if (changed){
				self.doValueChanged();
			}
		},
		doValueChanged: function(){
			const self = this, value = self.val();
			self.trigger("change", [value, self]);
			self.instance.trigger("change", [self, value]);
		},
		onValueChanged: function(e){
			e.data.self.doValueChanged();
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
