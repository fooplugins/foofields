(function($, _, _utils, _is, _obj){

	/**
	 * @class FooFields.Container
	 */
	_.Container = _.Component.extend(/** @lends FooFields.Container */{
		/**
		 * @summary This class is used by the rest of the plugin to perform certain global checks.
		 * @memberof FooFields.Container#
		 * @constructs
		 * @param {FooFields.Instance} instance - The parent instance for this container.
		 * @param {(string|jQuery|Element)} element - The element for this container.
		 * @augments FooFields.Component
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function(instance, element){
			var self = this;
			// noinspection JSValidateTypes
			self._super(instance, element, instance.cls.container, instance.sel.container);

			self.id = self.$el.attr("id");

			self.contents = self.$el.children(self.sel.content.el).map(function(i, el){
				return new _.Content(self, el);
			}).get();

			self.tabs = self.$el.children(self.sel.tabs.el)
				.children(self.sel.tabs.tab.el)
				.map(function(i, el){
					return new _.Tab(self, el, i);
				}).get();
		},
		/**
		 * @summary Init the container raising events.
		 * @memberof FooFields.Container#
		 * @function init
		 */
		init: function(){
			var self = this, active = null;

			self.$el.toggleClass(self.cls.tabs.exists, self.tabs.length > 0);
			self.setSmall(self.instance.small);
			self.setHoverable(self.instance.hoverable);

			self.contents.forEach(function (content) {
				content.init();
				if (active === null && content.active) active = content;
			});
			self.tabs.forEach(function(tab){
				tab.init();
			});

			if (active === null && self.contents.length > 0) active = self.contents[0];
			if (active instanceof _.Content) self.activate(active.id);

			self.instance.on({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);
		},
		/**
		 * @summary Destroy the container raising events.
		 * @memberof FooFields.Container#
		 * @function destroy
		 */
		destroy: function(){
			var self = this;

			self.instance.off({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);

			self.$el.removeClass(self.cls.tabs.exists);
			self.tabs.forEach(function(tab){
				tab.destroy();
			});
			self.contents.forEach(function (content) {
				content.destroy();
			});
		},
		activate: function(id){
			var self = this;
			self.tabs.forEach(function(tab){
				tab.activate(id);
			});
			self.contents.forEach(function (content) {
				content.activate(id);
			});
		},
		field: function(id){
			var self = this, field;
			for (var i = 0, l = self.contents.length; i < l; i++){
				field = self.contents[i].field(id);
				if (field instanceof _.Field) return field;
			}
		},
		content: function(id){
			var self = this;
			if (_is.string(id)){
				id = _utils.strip(id, "#");
				return _utils.find(self.contents, function(content){
					return content.id === id;
				});
			}
		},
		/**
		 * @summary Sets the small screen state for this container.
		 * @memberof FooFields.Container#
		 * @function setSmall
		 * @param {boolean} state - Whether or not this is a small screen.
		 */
		setSmall: function(state){
			var self = this;
			self.$el.toggleClass(self.instance.cls.small, !!state);
		},
		/**
		 * @summary Sets the hoverable state for this container.
		 * @memberof FooFields.Container#
		 * @function setHoverable
		 * @param {boolean} state - Whether or not this is a small screen.
		 */
		setHoverable: function(state){
			var self = this;
			self.$el.toggleClass(self.instance.cls.hoverable, !!state);
		},
		/**
		 * @summary Listens for the `small-changed` event.
		 * @memberof FooFields.Container#
		 * @function onSmallChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not the screen is small.
		 */
		onSmallChanged: function(e, instance, state){
			this.setSmall(state);
		},
		/**
		 * @summary Listens for the `hoverable-changed` event.
		 * @memberof FooFields.Container#
		 * @function onHoverableChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not hover is supported.
		 */
		onHoverableChanged: function(e, instance, state){
			this.setHoverable(state);
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
