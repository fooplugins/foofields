(function($, _, _utils, _is){

	_.Content = _.CtnrComponent.extend({
		construct: function(ctnr, el){
			var self = this;
			self._super(ctnr.instance, ctnr, el, ctnr.cls.content, ctnr.sel.content);
			self.id = self.$el.attr("id");
			self.active = self.$el.hasClass(self.instance.cls.active);
			self.fields = self.$el.children(self.sel.field).map(function(i, el){
				return _.fields.create(self, el);
			}).get();
		},
		init: function(){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, self.active);
			self.fields.forEach(function(field){
				field.init();
			});
		},
		destroy: function(){
			var self = this;
			self.fields.forEach(function(field){
				field.destroy();
			});
		},
		activate: function(id){
			var self = this;
			self.$el.toggleClass(self.instance.cls.active, (self.active = self.id === id));
		},
		field: function(id){
			return _utils.find(this.fields, function(field){
				return field.id === id;
			});
		}
	});


})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is
);