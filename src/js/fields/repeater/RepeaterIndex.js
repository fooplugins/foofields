(function($, _, _is, _str){

	_.RepeaterIndex = _.Field.extend({
		setup: function(){
			this.content.on("index-change", this.onIndexChange, this);
		},
		teardown: function(){
			this.content.off("index-change");
		},
		onIndexChange: function(e, index){
			this.$input.text(_str.format(this.opt.format, {index: index, count: index + 1}));
		}
	});

	_.fields.register("repeater-index", _.RepeaterIndex, ".foofields-type-repeater-index", {
		format: "{count}"
	}, {}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.str
);
