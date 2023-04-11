package php_minify;

using StringTools;

/** Tests the features of the `FastTransformer` class. **/
@:asserts final class FastTransformerTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `close()` method. **/
	public function testClose() {
		final transformer = new FastTransformer();
		Promise.inSequence([transformer.listen().noise(), transformer.close(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `listen()` method. **/
	public function testListen() {
		final transformer = new FastTransformer();
		Promise.inSequence([transformer.listen().noise(), transformer.listen().noise(), transformer.close()]).handle(asserts.handle);
		return asserts;
	}

	/** Tests the `transform()` method. **/
	@:variant("<?= 'Hello World!' ?>")
	@:variant("namespace dummy; class Dummy")
	@:variant("$className = get_class($this); return $className;")
	@:variant("__construct() { $this->property")
	public function testTransform(output: String) {
		final transformer = new FastTransformer();
		transformer.transform("test/fixture/sample.php").next(stdout -> {
			asserts.assert(stdout.contains(output));
			transformer.close();
		}).handle(asserts.handle);

		return asserts;
	}
}
