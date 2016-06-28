function foo () {
	var bar;
	quux = 'foo';

	function zip () {
		var quux = 'zip';
		var bar = true;
	}

	return zip;
}