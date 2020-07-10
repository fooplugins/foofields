(function($, _, _utils, _is, _obj){

	_.__instance__ = new _.Instance();

	_utils.expose(_.__instance__, _, ["on","off","trigger","init","destroy","field"]);

	_utils.ready(function(){
		_.__instance__.init(window.FOOFIELDS);
	});

})(
	FooFields.$,
	FooFields,
	FooFields.utils,
	FooFields.utils.is,
	FooFields.utils.obj
);