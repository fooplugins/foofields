(function($, _, _is, _obj){

	_.Repeater = _.Field.extend({
		construct: function(content, element, options, classes, i18n){
			var self = this;
			self._super(content, element, options, classes, i18n);
			self.$addButton = self.$input.children(self.sel.add);
			self.$table = self.$input.children('table').first();
			self.$tbody = self.$table.children('tbody').first();
			self.$template = self.$table.children('tfoot').first().children('tr').first();
			self.rows = self.$tbody.children('tr').map(function(i, el){
				return new _.RepeaterRow(self, el);
			}).get();
		},
		init: function(){
			var self = this;
			self._super();
			self.$addButton.on('click.foofields', {self: self}, self.onAddNewClick);
			self.rows.forEach(function(row){
				row.init();
			});
			var original;
			self.$tbody.sortable({
				cancel: ':input',
				forcePlaceholderSize: true,
				placeholder: 'foofields-repeater-placeholder',
				items: '> tr',
				distance: 5,
				start: function(e, ui){
					original = ui.item.index();
					ui.placeholder.height(ui.item.height());
				},
				update: function(e, ui){
					var current = ui.item.index(),
						from = original < current ? original : current;
					self.$tbody.children('tr').eq(from).nextAll('tr').andSelf().trigger('index-change');
				}
			});
		},
		destroy: function(){
			var self = this;
			self.$tbody.sortable("destroy");
			self.rows.forEach(function(row){
				row.destroy();
			});
			self.$addButton.off('.foofields');
			self._super();
		},
		addNewRow: function(){
			var self = this,
				row = new _.RepeaterRow(self, self.$template.clone());
			// add the row to the collection for later use
			self.rows.push(row);
			self.$tbody.append(row.$el).sortable("refresh");
			row.init(true);
			// row.enable();
			// always remove the empty class when adding a row, jquery internally checks if it exists
			self.$el.removeClass(self.cls.empty);
			self.doValueChanged();
			return row;
		},
		remove: function(row){
			var self = this, $after = row.$el.nextAll('tr');
			row.$el.remove();
			self.$tbody.sortable("refresh");
			var i = self.rows.indexOf(row);
			if (i !== -1){
				self.rows.splice(i, 1);
			}
			//check if no rows are left
			if ( self.$tbody.children("tr").length === 0 ) {
				self.$el.addClass(self.cls.empty);
			}
			$after.trigger('index-change');
			self.doValueChanged();
		},
		onAddNewClick: function(e){
			e.preventDefault();
			e.stopPropagation();
			e.data.self.addNewRow();
		},
		toggle: function(state){
			this._super(state);
			this.$template.find(":input").attr("disabled", "disabled");
		},
		val: function(value){
			const self = this;
			if (_is.array(value)){
				self.rows.forEach(function(row, i){
					row.val(i < value.length ? value[i] : []);
				});
				return;
			}
			return self.rows.map(function(row){
				return row.val();
			});
		}
	});

	_.fields.register("repeater", _.Repeater, ".foofields-type-repeater", {

	}, {
		add: "foofields-repeater-add",
		empty: "foofields-empty"
	}, {});

})(
	FooFields.$,
	FooFields,
	FooFields.utils.is,
	FooFields.utils.obj
);
