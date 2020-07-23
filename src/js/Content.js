(function($, _, _utils, _is, _obj){

	_.Content = _.CtnrComponent.extend({
		construct: function(ctnr, el){
			var self = this;
			self._super(ctnr.instance, ctnr, el, ctnr.cls.content, ctnr.sel.content);
			self.opt = _obj.extend({
				showWhen: {
					field: null,
					value: null,
					operator: null
				}
			}, self.$el.data());
			self.id = self.$el.attr("id");
			self.active = self.$el.hasClass(self.instance.cls.active);
			self.fields = self.$el.children(self.sel.field).map(function(i, el){
				return _.fields.create(self, el);
			}).get();
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, self.active);
			self._super();
			self.fields.forEach(function(field){
				field.init();
			});
		},
		destroy: function(){
			var self = this;
			self.fields.forEach(function(field){
				field.destroy();
			});
			self._super();
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.id === id));
		},
		field: function(id){
			return _utils.find(this.fields, function(field){
				return field.id === id;
			});
		},
		onShowWhenFieldChanged: function(e, value){
			this.ctnr.toggle(this.id, this.checkVisibilityRules(value));
		}
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
