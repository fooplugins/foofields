(function($, _, _is, _obj){

	_.Repeater = _.Field.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content, element, options, classes, i18n);
			self.$container = self.$input.find(self.sel.container);
			self.$addButton = self.$container.children(self.sel.add);
			self.$table = self.$container.children('table').first();
			self.$tbody = self.$table.children('tbody').first();
			self.$template = self.$table.children('tfoot').first().children('tr').first();
			self.rows = self.$tbody.children('tr').map(function(i, el){
				return new _.RepeaterRow(self, el);
			}).get();
		},
		init: function(){
			var self = this;
			self._super();
			self.rows.forEach(function(row){
				row.init();
			});
		},
		destroy: function(){
			var self = this;
			self.rows.forEach(function(row){
				row.destroy();
			});
			self._super();
		},
		addNewRow: function(){
			var self = this,
				row = new _.RepeaterRow(self, self.$template.clone());
			// add the row to the collection for later use
			self.rows.push(row);
			self.$tbody.append(row.$el);
			row.init();
			// always remove the empty class when adding a row, jquery internally checks if it exists
			self.$table.removeClass(self.cls.empty);
			return row;
		},
		remove: function(row){
			var self = this;
			row.$el.remove();
			var i = self.rows.indexOf(row);
			if (i !== -1){
				self.rows.splice(i, 1);
			}
			//check if no rows are left
			if ( self.$tbody.children("tr").length === 0 ) {
				self.$container.addClass(self.cls.empty);
			}
		},
		setup: function() {
			this.$addButton.on('click.foofields', {self: this}, this.onAddNewClick);
		},
		teardown: function(){
			this.$addButton.off('.foofields');
		},
		onAddNewClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			e.data.self.addNewRow();
		}
	});

	_.fields.register("repeater", _.Repeater, ".foofields-type-repeater", {

	}, {
		add: "foofields-repeater-add",
		container: "foofields-repeater",
		empty: "foofields-repeater-empty"
	}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
