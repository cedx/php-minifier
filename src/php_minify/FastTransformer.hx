package php_minify;

using haxe.io.Path;

/** Removes comments and whitespace from a PHP script, by calling a Web service. **/
class FastTransformer implements Transformer {

	/** The path to the PHP executable. **/
	final executable: String;

	/** Creates a new transformer. **/
	public function new(executable = "php") this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	public function close() {
		return Promise.NOISE;
	}

	/** Processes a PHP script. **/
	public function transform(file: String) {
		return Promise.resolve("TODO");
	}
}
