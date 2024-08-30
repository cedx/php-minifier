package php_minifier;

import asys.FileSystem;
import js.node.ChildProcess;
using haxe.io.Path;

/** Removes comments and whitespace from a PHP script, by calling a PHP process. **/
class SafeTransformer implements Transformer {

	/** The path to the PHP executable. **/
	final executable: String;

	/** Creates a new safe transformer. **/
	public function new(executable = "php")
		this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	public function close(): Promise<Noise>
		return Noise;

	/** Processes a PHP script. **/
	public function transform(file: String): Promise<String>
		return Promise.irreversible((resolve, reject) -> {
			final callback = (error, stdout, stderr) -> error != null ? reject(Error.ofJsError(error)) : resolve(stdout);
			ChildProcess.execFile(executable, ["-w", FileSystem.absolutePath(file)], {maxBuffer: 20 * 1_024 * 1_024}, callback);
		});
}
