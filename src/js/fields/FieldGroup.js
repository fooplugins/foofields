(function($, _, _utils, _is, _obj){

	_.FieldGroup = _.Field.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content, element, options, classes, i18n);
			self.fields = self.$el.children(self.sel.el).map(function(i, el){
				return _.fields.create(self, el);
			}).get();
			self._changeId = null;
		},
		init: function(){
			var self = this;
			self._super();
			self.fields.forEach(function(field){
				field.on("change", self.onFieldChange, self);
				field.init();
			});
		},
		destroy: function(){
			var self = this;
			if (self._changeId !== null) clearTimeout(self._changeId);
			self._changeId = null;
			self.fields.forEach(function(field){
				field.off("change", self.onFieldChange, self);
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
		},
		doValueChanged: function(){
			// override the base method to prevent raising duplicate events on the container
			const self = this, value = self.val();
			self.trigger("change", [value, self]);
		},
		onFieldChange: function(){
			const self = this;
			if (self._changeId !== null) clearTimeout(self._changeId);
			self._changeId = setTimeout(function(){
				self._changeId = null;
				self.doValueChanged();
			}, 50);
		}
	});

	_.fields.register("field-group", _.FieldGroup, ".foofields-type-field-group", {
		changeSelector: "code.fbr-does-not-exist",
		valueSelector: "code.fbr-does-not-exist",
	}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
