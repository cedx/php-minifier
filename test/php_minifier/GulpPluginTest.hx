package php_minifier;

import asys.FileSystem;
import js.node.Buffer;
import js.vinyl.File;
using StringTools;

/** Tests the features of the `GulpPlugin` class. **/
@:asserts final class GulpPluginTest {

	/** Creates a new test. **/
	public function new() {}

	/** Tests the `transform()` method. **/
	@:variant(Fast)
	@:variant(Safe)
	public function transform(input: TransformMode) {
		final file = new File({path: FileSystem.absolutePath("res/sample.php")});
		final plugin = new GulpPlugin({mode: input, silent: true});
		@:privateAccess plugin._transform(file, "utf8", (error, chunk) -> {
			plugin.emit("end");
			asserts.assert(error == null);

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
