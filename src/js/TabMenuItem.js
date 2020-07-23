(function($, _, _utils, _is, _obj){

	_.TabMenuItem = _.CtnrComponent.extend({
		construct: function(menu, el, index){
			var self = this;
			self._super(menu.instance, menu.ctnr, el, menu.cls.item, menu.sel.item);
			self.menu = menu;
			self.index = index;
			self.opt = _obj.extend({
				showWhen: {
					field: null,
					value: null,
					operator: null
				}
			}, self.$el.data());
			self.active = self.$el.hasClass(self.instance.cls.active);
			self.$link = self.$el.children(self.sel.link).first();
			self.$text = self.$link.children(self.sel.text).first();
			self.target = _utils.strip(self.$link.attr("href"), "#");
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.first, self.index === 0)
				.toggleClass(self.instance.cls.last, self.index === self.menu.items.length - 1);
			self.$link.on("click.foofields", {self: self}, self.onLinkClick);
			self._super();
		},
		destroy: function(){
			var self = this;
			self.$el.removeClass(self.instance.cls.first)
				.removeClass(self.instance.cls.last);
			self.$link.off(".foofields");
			self._super();
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.target === id));
		},
		onLinkClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			var self = e.data.self;
			self.ctnr.activate(self.target);
		},
		onShowWhenFieldChanged: function(e, value){
			this.ctnr.toggle(this.target, this.checkVisibilityRules(value));
		}
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
