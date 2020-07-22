(function($, _, _is, _obj){

	if (!window.Selectize) {
		console.log("FooFields.Selectize dependency missing.");
		return;
	}

	_.SelectizeMulti = _.Field.extend({
		setup: function(){
			var self = this;
			self.$select = self.$input.children("select").first();
			self.create = false;
			if ( self.opt.create ) {
				self.create = function(input, callback) {
					this.close();
					self.$input.children(".selectize-control").addClass('loading');
					var data = {
						action: self.opt.action,
						nonce: self.opt.nonce,
						add: input
					};

					jQuery.ajax({
						url: window.ajaxurl,
						cache: false,
						type: 'POST',
						data: data,
						complete: function() {
							self.$input.children(".selectize-control").removeClass('loading');
						},
						success: function(response) {
							if (typeof response.new !== 'undefined') {
								callback({
									value: response.new.value,
									text: response.new.display
								});
							} else {
								callback(false);
							}
						},
						error: function() {
							callback(false);
						}
					});
				};
			}

			if ( self.$select.length ) {
				_obj.extend(self.opt, self.$select.data());
				var options = _obj.extend({}, self.opt.selectize, {
					onChange: function (value) {
						if (self.api instanceof window.Selectize) {
							var selection = self.api.getItem(value);
						}
					},
					create: self.create
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

	_.fields.register("selectize-multi", _.SelectizeMulti, ".foofields-type-selectize-multi", {
		selectize: {
			plugins: ['remove_button'],
			delimiter: ', ',
			createOnBlur: true,
			maxItems: null,
			closeAfterSelect : true,
			items: null
		}
	}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
