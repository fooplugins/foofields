(function($, _, _utils, _is, _obj){

	_.Tab = _.CtnrComponent.extend({
		construct: function(ctnr, el, index){
			var self = this;
			self._super(ctnr.instance, ctnr, el, ctnr.cls.tabs.tab, ctnr.sel.tabs.tab);
			self.el = self.$el.get(0);
			self.index = index;
			self.$link = self.$el.children(self.sel.link).first();
			self.$icon = self.$link.children(self.sel.icon).first();
			self.$text = self.$link.children(self.sel.text).first();

			self.target = _utils.strip(self.$link.attr("href"), "#");
			self.active = self.$el.hasClass(self.instance.cls.active);

			self.menu = new _.TabMenu(self, self.$el.children(self.sel.menu.el));
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.first, self.index === 0)
				.toggleClass(self.instance.cls.last, self.index === self.ctnr.tabs.length - 1);
			self.$link.on("click.foofields", {self: self}, self.onLinkClick);
			self._super();
			self.menu.init();
		},
		destroy: function(){
			var self = this;
			self.$el.removeClass(self.instance.cls.first)
				.removeClass(self.instance.cls.last);
			self.$link.off(".foofields");
			self._super();
			self.menu.destroy();
		},
		handles: function(id){
			var self = this;
			return self.target === id || self.menu.handles(id);
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.handles(id)));
			if (self.menu.exists) self.menu.activate(id);
		},
		onLinkClick: function(e){
			e.preventDefault();
			var self = e.data.self;
			if (self.menu.exists && self.instance.small && !self.instance.hoverable){
				self.menu.toggle();
			} else {
				self.ctnr.activate(self.target);
			}
		},
		onShowWhenFieldChanged: function(e, value, field){
			const self = this;
			if (field.visible){
				self.ctnr.toggle(self.target, self.checkVisibilityRules(value));
			} else {
				self.ctnr.toggle(self.target, false);
			}
		},
		onShowWhenFieldToggled: function(e, visible, field){
			const self = this;
			if (visible){
				self.ctnr.toggle(self.target, self.checkVisibilityRules(field.val()));
			} else {
				self.ctnr.toggle(self.target, false);
			}
		}
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
