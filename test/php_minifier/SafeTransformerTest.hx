package php_minifier;

using StringTools;

/** Tests the features of the `SafeTransformer` class. **/
@:asserts final class SafeTransformerTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `close()` method. **/
	public function close() {
		final transformer = new SafeTransformer();
		Promise.inSequence([transformer.close(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `transform()` method. **/
	@:variant("<?= 'Hello World!' ?>")
	@:variant("namespace dummy; class Dummy")
	@:variant("$className = get_class($this); return $className;")
	@:variant("__construct() { $this->property")
	public function transform(output: String) {
		final transformer = new SafeTransformer();
		transformer.transform("share/sample.php")
			.next(script -> transformer.close().next(_ -> asserts.assert(script.contains(output))))
			.handle(asserts.handle);

		return asserts;
	}
}
