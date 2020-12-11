(function($, _, _utils, _is, _obj){

	_.Component = _utils.EventClass.extend({
		construct: function(instance, element, classes, selectors){
			var self = this;
			self._super();
			/**
			 * @summary The parent instance for this component.
			 * @memberof FooFields.Component#
			 * @name instance
			 * @type {FooFields.Component}
			 */
			self.instance = instance;
			/**
			 * @summary The jQuery element object for this component.
			 * @memberof FooFields.Component#
			 * @name $el
			 * @type {string}
			 */
			self.$el = _is.jq(element) ? element : $(element);
			/**
			 * @summary The CSS classes for this component.
			 * @memberof FooFields.Component#
			 * @name cls
			 * @type {Object}
			 */
			self.cls = classes;
			/**
			 * @summary The CSS selectors for this component.
			 * @memberof FooFields.Component#
			 * @name sel
			 * @type {Object}
			 */
			self.sel = selectors;
		},
		init: function(){},
		destroy: function(){
			this._super();
		}
	});

	_.CtnrComponent = _.Component.extend({
		construct: function(instance, ctnr, element, classes, selectors){
			var self = this;
			self._super(instance, element, classes, selectors);
			/**
			 * @summary The parent container for this component.
			 * @memberof FooFields.CtnrComponent#
			 * @name ctnr
			 * @type {FooFields.Container}
			 */
			self.ctnr = ctnr;

			self.opt = _obj.extend({
				showWhen: {
					field: null,
					value: null,
					operator: null
				}
			}, self.$el.data());

			self.visible = !self.$el.hasClass(self.instance.cls.hidden);

			self._showWhenField = null;
		},
		init: function(){
			this.setupVisibilityRules();
		},
		destroy: function(){
			this.teardownVisibilityRules();
			this._super();
		},
		toggle: function(state){
			var self = this;
			self.visible = _is.boolean(state) ? state : !self.visible;
			self.$el.toggleClass(self.instance.cls.hidden, !self.visible);
			self.trigger("toggle", [self.visible, self]);
			self.ctnr.trigger("toggle", [self, self.visible]);
		},
		setupVisibilityRules: function(){
			var self = this;
			if (self.opt.showWhen.field !== null){
				var field = self.instance.field(self.opt.showWhen.field);
				if (field instanceof _.Field){
					if (field.visible){
						self.visible = self.checkVisibilityRules(field.val());
					} else {
						self.visible = false;
					}
					self._showWhenField = field;
					self._showWhenField.on({
						"change": self.onShowWhenFieldChanged,
						"toggle": self.onShowWhenFieldToggled
					}, self);
				}
			}
			self.toggle(self.visible);
		},
		teardownVisibilityRules: function(){
			var self = this;
			if (self._showWhenField instanceof _.Field){
				self._showWhenField.off({
					"change": self.onShowWhenFieldChanged,
					"toggle": self.onShowWhenFieldToggled
				}, self);
			}
		},
		checkVisibilityRules: function(value){
			var self = this, testValue = self.opt.showWhen.value, visible;
			switch (self.opt.showWhen.operator) {
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
			return visible;
		},
		onShowWhenFieldChanged: function(e, value, field){
			const self = this;
			if (field.visible){
				self.toggle(self.checkVisibilityRules(value));
			} else {
				self.toggle(false);
			}
		},
		onShowWhenFieldToggled: function(e, visible, field){
			const self = this;
			if (visible){
				self.toggle(self.checkVisibilityRules(field.val()));
			} else {
				self.toggle(false);
			}
		},
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
