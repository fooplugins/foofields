(function($, _, _utils, _is, _obj){

	_.FieldGroup = _.Field.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content, element, options, classes, i18n);
			self.fields = self.$el.children(self.sel.el).map(function(i, el){
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
		onShowWhenFieldChanged: function(e, value, field){
			if (field.visible){
				this.toggle(this.checkVisibilityRules(value));
			} else {
				this.toggle(false);
			}
		},
		val: function(value){
			if (_is.object(value)){
				this.fields.forEach(function(field){
					if (value.hasOwnProperty(field.id)){
						field.val(value[field.id]);
					}
				});
			} else {
				return this.fields.reduce(function(result, field){
					result[field.id] = field.val();
					return result;
				}, {});
			}
		}
	});

	_.fields.register("field-group", _.FieldGroup, ".foofields-type-field-group", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
