(function($, _, _utils, _is, _obj){

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
			const groups = [];
			let result = _utils.find(this.fields, function(field){
				if (field instanceof _.FieldGroup) groups.push(field);
				return field.id === id;
			});
			if (!(result instanceof _.Field)){
				for (let i = 0, l = groups.length; i < l; i++){
					result = groups[i].field(id);
					if (result instanceof _.Field) return result;
				}
			}
			return result;
		},
		val: function(){
			return this.fields.reduce(function(result, field){
				result[field.id] = field.val();
				return result;
			}, {});
		},
		onShowWhenFieldChanged: function(e, value, field){
			const self = this;
			if (field.visible){
				self.ctnr.toggle(self.id, self.checkVisibilityRules(value));
			} else {
				self.ctnr.toggle(self.id, false);
			}
		},
		onShowWhenFieldToggled: function(e, visible, field){
			const self = this;
			if (visible){
				self.ctnr.toggle(self.id, self.checkVisibilityRules(field.val()));
			} else {
				self.ctnr.toggle(self.id, false);
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
