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
			self.regex = {
				id: /(_)-?\d+(-.*?)?$/i,
				name: /(\[.*?]\[)-?\d+(]\[.*?])$/i
			};
		},
		init: function(reindex){
			var self = this;
			self._super();
			self.$el.on('index-change.foofields', {self: self}, self.onIndexChange);
			self.fields.forEach(function(field){
				field.on("change", self.onFieldChange, self);
				field.init();
			});
			if (reindex) self.reindex();
		},
		destroy: function(){
			var self = this;
			self.fields.forEach(function(field){
				field.off("change", self.onFieldChange, self);
				field.destroy();
			});
			self._super();
		},
		remove: function(){
			var self = this;
			self.repeater.remove(self);
		},
		reindex: function(){
			var self = this, index = self.$el.index();
			self.fields.forEach(function(field){
				field.id = self.update(field.$el, index);
				field.$el.find("[id],[name]").each(function(i, el){
					self.update(el, index);
				});
			});
			self.trigger('index-change', [index]);
		},
		update: function(el, index){
			el = _is.jq(el) ? el : $(el);
			var id = el.prop('id');
			if (_is.string(id)){
				var newId = id.replace(this.regex.id, '$1' + index + '$2');
				if (newId !== id){
					el.prop('id', newId);
					id = newId;
				}
			}
			var name = el.prop('name');
			if (_is.string(name)){
				var newName = name.replace(this.regex.name, '$1' + index + '$2');
				if (newName !== name){
					el.prop('name', newName);
				}
			}
			return id;
		},
		field: function(id){
			return _utils.find(this.fields, function(field){
				return field.id === id;
			});
		},
		onIndexChange: function(e){
			e.data.self.reindex();
		},
		onFieldChange: function(){
			this.repeater.doValueChanged();
		},
		enable: function() {
			this.fields.forEach(function(field){
				field.enable();
			});
		},
		val: function(value){
			const self = this, fields = self.fields.filter(function(field){
				return !(field instanceof _.RepeaterIndex) && !(field instanceof _.RepeaterDelete);
			});
			if (_is.array(value)){
				fields.forEach(function(field, i){
					field.val(i < value.length ? value[i] : '');
				});
				return;
			}
			return fields.map(function(field){
				return field.val();
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
