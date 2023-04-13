package php_minify.gulp;

import asys.FileSystem;
import js.node.Buffer;
import js.vinyl.File;
using StringTools;

/** Tests the features of the `Minifier` class. **/
@:asserts final class MinifierTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `transform()` method. **/
	@:variant(Fast)
	@:variant(Safe)
	public function testTransform(input: TransformMode) {
		final file = new File({path: FileSystem.absolutePath("test/fixture/sample.php")});
		final minifier = new Minifier({mode: input, silent: true});
		@:privateAccess minifier._transform(file, "utf8", (error, chunk) -> {
			minifier.emit("end");

			final script = ((chunk: File).contents: Buffer).toString();
			asserts.assert(script.contains("<?= 'Hello World!' ?>"));
			asserts.assert(script.contains("namespace dummy; class Dummy"));
			asserts.assert(script.contains("$className = get_class($this); return $className;"));
			asserts.assert(script.contains("__construct() { $this->property"));
			asserts.done();
		});

		return asserts;
	}
}
