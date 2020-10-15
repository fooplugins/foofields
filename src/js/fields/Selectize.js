(function($, _, _is, _obj){

	if (!window.Selectize) {
		console.log("FooFields.Selectize dependency missing.");
		return;
	}

	_.Selectize = _.Field.extend({
		setup: function(){
			var self = this;
			self.$select = self.$input.children("select").first();
			if ( self.$select.length ) {
				self.$display = self.$input.children("input[type=hidden]").first();
				var options = _obj.extend({}, self.opt.selectize, {
					onChange: function (value) {
						if (self.api instanceof window.Selectize) {
							var selection = self.api.getItem(value);
							self.$display.val(selection.text());
						}
					},
					load: function (query, callback) {
						$.get(window.ajaxurl + '?' + self.opt.query, {
							q: query
						}).done(function (response) {
							callback(response.results);
						}).fail(function () {
							callback();
						});
					}
				});
				self.api = self.$select.selectize(options).get(0).selectize;
			}
		},
		val: function(value){
			const self = this;
			if (!!self.api){
				if (!_is.undef(value)){
					self.api.setValue(value);
					self.doValueChanged();
					return;
				}
				return self.api.getValue();
			}
			return "";
		},
		teardown: function(){
			var self = this;
			if (self.api instanceof Selectize){
				self.api.destroy();
			}
		},
		enable: function() {
			var self = this;
			if (self.api instanceof Selectize){
				self.api.enable();
			}
		},
		disable: function() {
			var self = this;
			if (self.api instanceof Selectize){
				self.api.disable();
			}
		}
	});

	_.fields.register("selectize", _.Selectize, ".foofields-type-selectize", {
		query: null,
		selectize: {
			valueField: 'id',
			labelField: 'text',
			searchField: 'text',
			maxItems: 1,
			create: false,
			options: []
		}
	}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
