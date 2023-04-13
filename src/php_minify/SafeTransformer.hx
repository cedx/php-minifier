package php_minify;

import asys.FileSystem;
import asys.io.Process;
using haxe.io.Path;
using tink.io.Source;

/** Removes comments and whitespace from a PHP script, by calling a PHP process. **/
class SafeTransformer implements Transformer {

	/** The path to the PHP executable. **/
	final executable: String;

	/** Creates a new safe transformer. **/
	public function new(executable = "php") this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	public function close() return Promise.NOISE;

	/** Processes a PHP script. **/
	public function transform(file: String) {
		final process = new Process(executable, ["-w", FileSystem.absolutePath(file)]);
		return process.exitCode()
			.next(exitCode -> exitCode == 0 ? process.stdout.all() : new Error('The PHP process exited with a $exitCode code.'))
			.next(stdout -> { process.close(); stdout.toString(); });
	}
}
