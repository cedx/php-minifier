package php_minify.gulp;

import js.fancy_log.Logger;
import js.lib.Error;
import js.node.Buffer;
import js.node.stream.Transform;
import js.plugin_error.PluginError;
import js.vinyl.File;

/** Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function. **/
@:expose("Minifier")
@:require(nodejs)
final class Minifier extends Transform<Minifier> {

	/** The path to the PHP executable. **/
	public final binary: String;

	/** The operation mode of the minifier. **/
	public final mode: TransformMode;

	/** Value indicating whether to silence the minifier output. **/
	public final silent: Bool;

	/** The instance used to process the PHP code. **/
	var transformer: Null<Transformer>;

	/** Creates a new minifier. **/
	@:ignoreInstrument
	public function new(?options: MinifierOptions) {
		super({objectMode: true});

		binary = options?.binary ?? "php";
		mode = options?.mode ?? Safe;
		silent = options?.silent ?? false;
		transformer = null;

		final handler = () -> transformer?.close()?.eager();
		on("end", handler).on("error", handler);
	}

	/** Transforms input and produces output. **/
	override function _transform(chunk: Dynamic, encoding: String, callback: (Null<Error>, Any) -> Void): Void {
		final file: File = chunk;
		if (!silent) Logger.log('Minifying: ${file.relative}');

		if (transformer == null) transformer = mode == Fast ? new FastTransformer(binary) : new SafeTransformer(binary);
		transformer.transform(file.path).handle(outcome -> switch outcome {
			case Failure(error):
				callback(new PluginError("@cedx/php-minify", error.message, {fileName: file.path, lineNumber: 0}), null);
			case Success(output):
				file.contents = Buffer.from(output, encoding);
				callback(null, file);
		});
	}
}

/** Defines the options of a `Minifier` instance. **/
typedef MinifierOptions = {

	/** The path to the PHP executable. **/
	var ?binary: String;

	/** The operation mode of the minifier. **/
	var ?mode: TransformMode;

	/** Value indicating whether to silence the minifier output. **/
	var ?silent: Bool;
}