(function($, _, _utils, _is, _fn, _obj){

	_.Instance = _utils.EventClass.extend({
		construct: function(){
			const self = this;
			self._super();
			/**
			 * @summary The options for this instance.
			 * @memberof FooFields.Instance#
			 * @name opt
			 * @type {FooFields~Options}
			 */
			self.opt = _obj.extend({}, _.config.opt);
			/**
			 * @summary The CSS classes for this instance.
			 * @memberof FooFields.Instance#
			 * @name cls
			 * @type {FooFields~Classes}
			 */
			self.cls = _obj.extend({}, _.config.cls);
			/**
			 * @summary The i18n for this instance.
			 * @memberof FooFields.Instance#
			 * @name i18n
			 * @type {FooFields~i18n}
			 */
			self.i18n = _obj.extend({}, _.config.i18n);
			/**
			 * @summary The CSS selectors for this instance.
			 * @memberof FooFields.Instance#
			 * @name sel
			 * @type {FooFields~Classes}
			 */
			self.sel = _utils.selectify(self.cls);
			/**
			 * @summary The jQuery document object for this instance.
			 * @memberof FooFields.Instance#
			 * @name $doc
			 * @type {?jQuery}
			 */
			self.$doc = null;
			/**
			 * @summary The MediaQueryList used to determine whether the instance is being displayed on a small screen.
			 * @memberof FooFields.Instance#
			 * @name mqlSmall
			 * @type {?MediaQueryList}
			 */
			self.mqlSmall = null;
			/**
			 * @summary Whether or not the instance is currently being displayed on a small screen.
			 * @memberof FooFields.Instance#
			 * @name small
			 * @type {boolean}
			 */
			self.small = false;
			/**
			 * @summary The MediaQueryList used to determine whether the instance can use hover.
			 * @memberof FooFields.Instance#
			 * @name mqlHoverable
			 * @type {?MediaQueryList}
			 */
			self.mqlHoverable = null;
			/**
			 * @summary Whether or not the instance is currently using hover.
			 * @memberof FooFields.Instance#
			 * @name hoverable
			 * @type {boolean}
			 */
			self.hoverable = false;
			/**
			 * @summary The containers for this instance.
			 * @memberof FooFields.Instance#
			 * @name containers
			 * @type {FooFields.Container[]}
			 */
			self.containers = [];
			/**
			 * @type  {ResizeObserver}
			 */
			self.fieldObserver = new ResizeObserver(_fn.throttle(self.onFieldResizeObserved.bind(self), 1000/60));

			// bind the event listeners to ensure we have access back to this instance and can unbind the listeners later
			self.onMqlSmallChanged = self.onMqlSmallChanged.bind(self);
			self.onMqlHoverableChanged = self.onMqlHoverableChanged.bind(self);
		},
		init: function(config){
			const self = this;
			// first parse the config object if one is supplied
			if (_is.hash(config)){
				_obj.extend(self.opt, config.opt);
				_obj.extend(self.i18n, config.i18n);
				if (_is.hash(config.cls)){
					// only check config.cls so we don't selectify more than we need to.
					_obj.extend(self.cls, config.cls);
					self.sel = _utils.selectify(self.cls);
				}
			}
			// now bind any event listeners prior to triggering any events
			if (!_is.empty(self.opt.on)) self.on(self.opt.on, self);
			// initialize all the properties
			self.$doc = $(document);
			self.mqlSmall = window.matchMedia("(max-width: " + self.opt.smallScreen + "px)");
			self.mqlHoverable = window.matchMedia("(hover: hover)");
			self.small = self.mqlSmall.matches;
			self.hoverable = self.mqlHoverable.matches;
			self.containers = $(self.sel.container.el).map(function(i, el){
				return new _.Container(self, el);
			}).get();

			self.trigger("init", [self]);

			self.containers.forEach(function(ctnr){
				ctnr.init();
			});

			// noinspection JSDeprecatedSymbols
			self.mqlSmall.addListener(self.onMqlSmallChanged);
			// noinspection JSDeprecatedSymbols
			self.mqlHoverable.addListener(self.onMqlHoverableChanged);

			self.trigger("ready", [self]);
		},
		reinit: function() {
			var self = this,
				current = self.containers.map( function(cntr){
					return cntr.$el.get(0);
				});
			var newContainers = $(self.sel.container.el).not(current).map(function(i, el) {
				return new _.Container(self, el);
			}).get();
			newContainers.forEach(function(cntr) {
				self.containers.push(cntr);
				cntr.init();
			});
		},
		destroy: function(){
			const self = this;
			self.trigger("destroy", [self]);
			self.fieldObserver.disconnect();

			// noinspection JSDeprecatedSymbols
			self.mqlSmall.removeListener(self.onMqlSmallChanged);
			// noinspection JSDeprecatedSymbols
			self.mqlHoverable.removeListener(self.onMqlHoverableChanged);

			self.containers.forEach(function(ctnr){
				ctnr.destroy();
			});

			if (!_is.empty(self.opt.on)) self.off(self.opt.on, self);

			self._super();
		},
		/**
		 * @summary Get a field by ID.
		 * @memberof FooFields.Instance#
		 * @function field
		 * @param {string} id - The ID of the field to find.
		 * @returns {FooFields.Field}
		 */
		field: function(id){
			const self = this;
			let field, i = 0, l = self.containers.length;
			for (; i < l; i++){
				field = self.containers[i].field(id);
				if (field instanceof _.Field) return field;
			}
		},
		/**
		 * @summary Get a content by ID.
		 * @memberof FooFields.Instance#
		 * @function content
		 * @param {string} id - The ID of the content to find.
		 * @returns {FooFields.Content}
		 */
		content: function(id){
			const self = this;
			let content, i = 0, l = self.containers.length;
			for (; i < l; i++){
				content = self.containers[i].content(id);
				if (content instanceof _.Content) return content;
			}
		},
		/**
		 * @summary Get a container by ID.
		 * @memberof FooFields.Instance#
		 * @function container
		 * @param {string} id - The ID of the container to find.
		 * @returns {FooFields.Container}
		 */
		container: function(id){
			const self = this;
			if (_is.string(id)){
				id = _utils.strip(id, "#");
				return _utils.find(self.containers, function(container){
					return container.id === id;
				});
			}
		},
		val: function(){
			return this.containers.reduce(function(result, container){
				result[container.id] = container.val();
				return result;
			}, {});
		},
		/**
		 * @summary Listens for the small screen MediaQueryList changed event.
		 * @memberof FooFields.Instance#
		 * @function onMqlSmallChanged
		 * @param {MediaQueryListEvent} mqlEvent - The event object for the change.
		 */
		onMqlSmallChanged: function(mqlEvent){
			const self = this;
			/**
			 * @summary Raised when changing between being a small screen or not.
			 * @event FooFields.Instance~"small-changed"
			 * @type {FooFields.utils.Event}
			 * @param {FooFields.utils.Event} event - The event object.
			 * @param {FooFields.Instance} instance - The instance raising the event.
			 * @param {boolean} state - Whether or not the screen is small.
			 */
			self.trigger("small-changed", [self, (self.small = mqlEvent.matches)]);
		},
		/**
		 * @summary Listens for the hover MediaQueryList changed event.
		 * @memberof FooFields.Instance#
		 * @function onMqlHoverableChanged
		 * @param {MediaQueryListEvent} mqlEvent - The event object for the change.
		 */
		onMqlHoverableChanged: function(mqlEvent){
			const self = this;
			/**
			 * @summary Raised when hover changes between being supported or not.
			 * @event FooFields.Instance~"hoverable-changed"
			 * @type {FooFields.utils.Event}
			 * @param {FooFields.utils.Event} event - The event object.
			 * @param {FooFields.Instance} instance - The instance raising the event.
			 * @param {boolean} state - Whether or not hover is supported.
			 */
			self.trigger("hoverable-changed", [self, (self.hoverable = mqlEvent.matches)]);
		},
		/**
		 * @summary The callback for the ResizeObserver that watches for field size changes.
		 * @memberof FooFields.Instance#
		 * @function onFieldResizeObserved
		 * @param {ResizeObserverEntry[]} entries
		 */
		onFieldResizeObserved: function(entries){
			const self = this;
			entries.forEach(function(entry){
				const $field = $(entry.target);
				if(_is.array(entry.contentBoxSize) && entry.contentBoxSize.length > 0) {
					$field.toggleClass(self.cls.small, entry.contentBoxSize[0].inlineSize < self.opt.smallField);
				} else {
					$field.toggleClass(self.cls.small, entry.contentRect.width < self.opt.smallField);
				}
			});
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.fn,
	FooFields.utils.obj
);
