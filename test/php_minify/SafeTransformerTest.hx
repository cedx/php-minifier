package php_minify;

using StringTools;

/** Tests the features of the `SafeTransformer` class. **/
@:asserts final class SafeTransformerTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `close()` method. **/
	public function testClose() {
		final transformer = new SafeTransformer();
		Promise.inSequence([transformer.close(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `transform()` method. **/
	@:variant("<?= 'Hello World!' ?>")
	@:variant("namespace dummy; class Dummy")
	@:variant("$className = get_class($this); return $className;")
	@:variant("__construct() { $this->property")
	public function testTransform(output: String) {
		final transformer = new SafeTransformer();
		transformer.transform("test/fixture/sample.php").next(script -> {
			asserts.assert(script.contains(output));
			transformer.close();
		}).handle(asserts.handle);

		return asserts;
	}
}
