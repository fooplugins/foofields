(function($, _, _utils, _is){

	_.TabMenu = _.CtnrComponent.extend({
		construct: function(tab, el){
			var self = this;
			self._super(tab.instance, tab.ctnr, el, tab.cls.menu, tab.sel.menu);
			self.tab = tab;
			self.$header = $("<li/>", {"class": self.cls.header}).append(tab.$text.clone());
			self.items = self.$el.children(self.sel.item.el).map(function(i, el){
				return new _.TabMenuItem(self, el, i);
			}).get();

			self.exists = self.items.length > 0;
			self.visible = tab.$el.hasClass(self.cls.visible);

			self._enter = null;
			self._leave = null;

			self.onDocumentClick = self.onDocumentClick.bind(self);
			self.onTabMouseEnter = self.onTabMouseEnter.bind(self);
			self.onTabMouseLeave = self.onTabMouseLeave.bind(self);
		},
		init: function(){
			var self = this;
			if (!self.exists) return;

			self.tab.$el.addClass(self.cls.exists);

			self.items.forEach(function(item){
				item.init();
			});

			self.setSmall(self.instance.small);
			self.setHoverable(self.instance.hoverable);

			self.instance.on({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);
		},
		destroy: function(){
			var self = this;
			if (!self.exists) return;

			self.instance.off({
				"small-changed": self.onSmallChanged,
				"hoverable-changed": self.onHoverableChanged
			}, self);

			self.toggle(false);
			self.setSmall(false);
			self.setHoverable(false);

			self.tab.$el.removeClass(self.cls.exists);
			self.items.forEach(function(item){
				item.destroy();
			});
		},
		toggle: function(visible){
			var self = this;
			if (!self.exists) return;
			self.visible = !_is.undef(visible) ? !!visible : !self.visible;
			self.tab.$el.toggleClass(self.cls.visible, self.visible);
			self.ctnr.$el.children(self.ctnr.cls.tabs.el).toggleClass(self.cls.visible, self.visible);
			if (self.visible){
				self.instance.$doc.on("click.foofields", self.onDocumentClick);
			} else {
				self.instance.$doc.off("click.foofields", self.onDocumentClick);
			}
		},
		item: function(id){
			if (!this.exists) return;
			return _utils.find(this.items, function(item){
				return item.target === id;
			});
		},
		handles: function(id){
			return this.item(id) instanceof _.TabMenuItem;
		},
		activate: function(id){
			var self = this;
			if (!self.exists) return;
			self.items.forEach(function(item){
				item.activate(id);
			});
		},
		setSmall: function(state){
			var self = this;
			if (state){
				self.$el.prepend(self.$header);
			} else {
				self.$header.remove();
			}
		},
		setHoverable: function(state){
			var self = this;
			if (state){
				self.tab.$el.on({
					"mouseenter.foofields": self.onTabMouseEnter,
					"mouseleave.foofields": self.onTabMouseLeave
				});
			} else  {
				self.tab.$el.off({
					"mouseenter.foofields": self.onTabMouseEnter,
					"mouseleave.foofields": self.onTabMouseLeave
				});
				clearTimeout(self._enter);
				clearTimeout(self._leave);
				self._enter = null;
				self._leave = null;
			}
		},

		//region Listeners
		/**
		 * @summary Listens for the `small-changed` event.
		 * @memberof FooFields.TabMenu#
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
		 * @memberof FooFields.TabMenu#
		 * @function onHoverableChanged
		 * @param {FooFields.utils.Event} e - The event object for the change.
		 * @param {FooFields.Instance} instance - The instance raising the event.
		 * @param {boolean} state - Whether or not hover is supported.
		 */
		onHoverableChanged: function(e, instance, state){
			this.setHoverable(state);
		},
		//endregion

		//region Listeners
		onDocumentClick: function(){
			this.toggle(false);
		},
		onTabMouseEnter: function(){
			var self = this;
			clearTimeout(self._leave);
			self._leave = null;
			if (self._enter === null){
				self._enter = setTimeout(function(){
					self.toggle(true);
					self._enter = null;
				}, 300);
			}
		},
		onTabMouseLeave: function(){
			var self = this;
			clearTimeout(self._enter);
			self._enter = null;
			if (self._leave === null){
				self._leave = setTimeout(function(){
					self.toggle(false);
					self._leave = null;
				}, 300);
			}
		}
		//endregion
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);