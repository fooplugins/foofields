(function($, _, _utils, _is, _obj){

	_.RepeaterRow = _.Component.extend({
		construct: function(repeater, el){
			var self = this;
			self._super(repeater.instance, el, repeater.cls, repeater.sel);
			self.repeater = repeater;
			self.ctnr = repeater.ctnr;
			self.$cells = self.$el.children('td,th');
			self.fields = self.$cells.children(self.sel.el).map(function(i, el){
				return _.fields.create(self, el);
			}).get();
		},
		init: function(){
			var self = this;
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
		remove: function(){
			var self = this;
			self.repeater.remove(self);
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
	FooFields.utils.is,
	FooFields.utils.obj
);
