(function($, _, _is, _obj){

	_.Suggest = _.Field.extend({
		setup: function() {
			// var self = this;
			// self.$select = self.$input.children("select").first();
			// self.$display = self.$input.children("input[type=hidden]").first();
			// _obj.extend(self.opt, self.$select.data());
			// self.endpoint = window.ajaxurl + '?' + self.opt.query;
			// var options = _obj.extend({}, self.opt.selectize, {
			// 	onChange: function(value){
			// 		if (self.api instanceof window.Selectize){
			// 			var selection = self.api.getItem( value );
			// 			self.$display.val( selection.text() );
			// 		}
			// 	},
			// 	load: function(query, callback){
			// 		$.get(self.endpoint, {
			// 			data: { q: query }
			// 		}).done(function(response){
			// 			callback(response.results);
			// 		}).fail(function(){
			// 			callback();
			// 		});
			// 	}
			// });
			// self.api = self.$select.selectize(options).get(0).selectize;
		},
		teardown: function(){
			// var self = this;
			// if (self.api instanceof Selectize){
			// 	self.api.destroy();
			// }
		}
	});

	_.fields.register("suggest", _.Suggest, ".foofields-type-suggest", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
