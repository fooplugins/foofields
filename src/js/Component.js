(function($, _, _utils, _is){

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
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);