(function($, _, _is, _obj){

	if (!$.suggest) {
		console.log("FooFields.Suggest dependency missing.");
		return;
	}

	_.Suggest = _.Field.extend({
		setup: function() {
			var self = this;
			self.$suggest = self.$input.children('input[type=text]').first();
			self.$suggest.suggest(
				window.ajaxurl + '?' + self.$suggest.data( 'suggest-query' ),
				{
					multiple: $( this ).data( 'suggest-multiple' ),
					multipleSep: $( this ).data( 'suggest-separator' )
				}
			);
		}
	});

	_.fields.register("suggest", _.Suggest, ".foofields-type-suggest", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
