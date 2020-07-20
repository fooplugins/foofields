(function($, _, _is, _obj){

	_.EmbedMetabox = _.Field.extend({
		setup: function() {
			var self = this;
			self.$container = self.$input.children("div").first();
			self.$metabox = $( '#' + self.$container.data('metabox') );
			self.$metabox.removeClass('closed');
			self.$metabox.detach().appendTo( self.$container );
		}
	});

	_.fields.register("embed-metabox", _.EmbedMetabox, ".foofields-type-embed-metabox", {}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
