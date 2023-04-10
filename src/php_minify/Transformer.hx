package php_minify;

using haxe.io.Path;

/** Removes comments and whitespace from a PHP script. **/
abstract class Transformer {

	/** The path to the PHP executable. **/
	final executable: String;

	/** Creates a new transformer. **/
	function new(executable: String) this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	abstract function close(): Promise<Noise>;

	/** Processes a PHP script. **/
	abstract function transform(file: String): Promise<String>;
}
