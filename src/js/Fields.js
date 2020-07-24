(function($, _, _utils, _is, _obj){

	_.Fields = _utils.Factory.extend(/** @lends FooFields.Fields */{
		/**
		 * @summary A factory for tables allowing them to be easily registered and created.
		 * @memberof FooFields.
		 * @constructs Fields
		 * @description The plugin makes use of an instance of this class exposed as {@link FooFields.fields}.
		 * @augments FooFields.utils.Factory
		 * @borrows FooFields.utils.Class.extend as extend
		 * @borrows FooFields.utils.Class.override as override
		 */
		construct: function () {
			/**
			 * @summary An object containing all registered tables.
			 * @memberof FooFields.Fields#
			 * @name registered
			 * @type {Object.<string, Object>}
			 * @readonly
			 * @example {@caption The following shows the structure of this object. The `<name>` placeholders would be the name the class was registered with.}
			 * {
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"selector": <string>,
			 * 		"options": <object>,
			 * 		"classes": <object>,
			 * 		"i18n": <object>,
			 * 		"priority": <number>
			 * 	},
			 * 	"<name>": {
			 * 		"name": <string>,
			 * 		"klass": <function>,
			 * 		"selector": <string>,
			 * 		"options": <object>,
			 * 		"classes": <object>,
			 * 		"i18n": <object>,
			 * 		"priority": <number>
			 * 	},
			 * 	...
			 * }
			 */
			this.registered = {};
		},
		register: function(name, klass, selector, options, classes, i18n, priority){
			var self = this;
			if (!_is.string(selector)) return false;
			if (self._super(name, klass, priority)){
				var reg = self.registered[name];
				reg.selector = selector;
				reg.options = _is.hash(options) ? options : {};
				reg.classes = _is.hash(classes) ? classes : {};
				reg.i18n = _is.hash(i18n) ? i18n : {};
				return true;
			}
			return false;
		},
		make: function(name, content, element, options){
			var self = this, reg = self.registered[name], i18n = {}, classes = {};
			if (_is.hash(reg)){

				var inst = content.instance,
					regBases = self.bases(name),
					ext_options = [{}],
					ext_classes = [{}],
					ext_i18n = [{}];

				regBases.push(self.registered[name]);
				regBases.push({
					options: inst.opt.fields[name],
					classes: inst.cls.fields[name],
					i18n: inst.i18n.fields[name]
				});

				regBases.forEach(function(reg){
					ext_options.push(reg.options);
					ext_classes.push(reg.classes);
					ext_i18n.push(reg.i18n);
				});

				ext_options.push(options);
				ext_classes.push(classes);
				ext_i18n.push(i18n);

				options = _obj.extend.apply(_obj, ext_options);
				classes = _obj.extend.apply(_obj, ext_classes);
				i18n = _obj.extend.apply(_obj, ext_i18n);

				return self._super(name, content, element, options, classes, i18n);
			}
			return null;
		},
		create: function(content, element, options){
			var self = this, name;

			element = _is.jq(element) ? element : $(element);
			// merge the options with any supplied using data attributes
			options = _obj.extend({}, options, element.data());

			for (name in self.registered){
				if (!self.registered.hasOwnProperty(name) || name === "field" || !element.is(self.registered[name].selector)) continue;
				return self.make(name, content, element, options);
			}
			return self.make("field", content, element, options);
		},
		/**
		 * @summary Get all registered base fields for the supplied name.
		 * @memberof FooFields.Fields#
		 * @function bases
		 * @param {string} name - The name of the field to get the bases for.
		 * @returns {Object[]}
		 */
		bases: function(name){
			if (!this.contains(name)) return [];
			var self = this,
				reg = self.registered[name],
				bases = reg.klass.bases(),
				result = [];
			bases.forEach(function(base){
				var found = self.find(base);
				if (found !== null){
					result.push(found);
				}
			});
			return result;
		},
		/**
		 * @summary Given the class this method attempts to find its registered values.
		 * @memberof FooFields.Fields#
		 * @function find
		 * @param {FooFields.Field} klass - The class to find.
		 * @returns {(Object|null)}
		 */
		find: function(klass){
			var name, reg = this.registered;
			for (name in reg){
				if (!reg.hasOwnProperty(name) || reg[name].klass !== klass) continue;
				return reg[name];
			}
			return null;
		}
	});

	_.fields = new _.Fields();

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);
