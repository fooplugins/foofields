(function($, _, _utils, _is, _str, _obj){

	/**
	 * @summary Returns the value of the first element in the provided array that satisfies the provided test function.
	 * @memberof FooFields.utils.
	 * @function find
	 * @param {Array} array - The array to search.
	 * @param {FooFields.utils~ArrFindCallback} callback - Function to execute on each value in the array.
	 * @param {*} [thisArg] - Object to use as `this` inside the callback.
	 * @returns {*}
	 */
	_utils.find = function(array, callback, thisArg) {
		if (!_is.array(array) || !_is.fn(callback)) return;
		for (var i = 0, l = array.length; i < l; i++){
			if (callback.call(thisArg, array[i], i, array)){
				return array[i];
			}
		}
	};

	/**
	 * @summary Executed once for each index of the array until it returns a truthy value.
	 * @callback FooFields.utils~ArrFindCallback
	 * @param {*} element - The current element in the array.
	 * @param {number} [index] - The index of the current element in the array.
	 * @param {Array} [array] - The array currently being searched.
	 * @returns {boolean} A truthy value.
	 */

	/**
	 * @summary Strips the `prefix` and/or `suffix from the `target` string.
	 * @memberof FooFields.utils.
	 * @function strip
	 * @param {string} target - The string to strip the prefix and/or suffix from.
	 * @param {string} [prefix=null] - The prefix to remove.
	 * @param {string} [suffix=null] - The suffix to remove.
	 * @returns {string}
	 */
	_utils.strip = function(target, prefix, suffix){
		if (_is.string(target)){
			if (_is.string(prefix) && !_is.empty(prefix) && _str.startsWith(target, prefix)){
				target = _str.from(target, prefix);
			}
			if (_is.string(suffix) && !_is.empty(suffix) && _str.endsWith(target, suffix)){
				target = _str.until(target, suffix);
			}
		}
		return target;
	};

	/**
	 * @summary Exposes the `methods` from the `source` on the `target`.
	 * @memberof FooFields.utils.
	 * @function expose
	 * @param {Object} source - The object to expose methods from.
	 * @param {Object} target - The object to expose methods on.
	 * @param {String[]} methods - An array of method names to expose.
	 */
	_utils.expose = function(source, target, methods){
		if (_is.object(source) && _is.object(target) && _is.array(methods)) {
			methods.forEach(function(method){
				if (_is.string(method) && _is.fn(source[method])){
					target[method] = source[method].bind(source);
				}
			});
		}
	};

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.str,
	FooFields.utils.obj
);