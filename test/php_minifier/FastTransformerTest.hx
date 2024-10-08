package php_minifier;

using StringTools;

/** Tests the features of the `FastTransformer` class. **/
@:asserts final class FastTransformerTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `close()` method. **/
	@:access(php_minifier.FastTransformer.listen)
	public function close() {
		final transformer = new FastTransformer();
		Promise.inSequence([transformer.listen().noise(), transformer.close(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `listen()` method. **/
	@:access(php_minifier.FastTransformer.listen)
	public function listen() {
		final transformer = new FastTransformer();
		Promise.inSequence([transformer.listen().noise(), transformer.listen().noise(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `transform()` method. **/
	@:variant("<?= 'Hello World!' ?>")
	@:variant("namespace dummy; class Dummy")
	@:variant("$className = get_class($this); return $className;")
	@:variant("__construct() { $this->property")
	public function transform(output: String) {
		final transformer = new FastTransformer();
		transformer.transform("share/sample.php")
			.next(script -> transformer.close().next(_ -> asserts.assert(script.contains(output))))
			.handle(asserts.handle);

		return asserts;
	}
}
