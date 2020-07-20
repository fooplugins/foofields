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
				_obj.extend(self.opt, self.$select.data());
				self.endpoint = window.ajaxurl + '?' + self.opt.query;
				var options = _obj.extend({}, self.opt.selectize, {
					onChange: function (value) {
						if (self.api instanceof window.Selectize) {
							var selection = self.api.getItem(value);
							self.$display.val(selection.text());
						}
					},
					load: function (query, callback) {
						$.get(self.endpoint, {
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
		teardown: function(){
			var self = this;
			if (self.api instanceof Selectize){
				self.api.destroy();
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