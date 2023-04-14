package php_minifier.gulp;

import js.fancy_log.Logger;
import js.lib.Error;
import js.node.Buffer;
import js.node.stream.Transform;
import js.plugin_error.PluginError;
import js.vinyl.File;

/** Minifies PHP source code by removing comments and whitespace. **/
@:expose("Plugin")
final class Plugin extends Transform<Plugin> {

	/** The path to the PHP executable. **/
	public final binary: String;

	/** The operation mode of the plugin. **/
	public final mode: TransformMode;

	/** Value indicating whether to silence the plugin output. **/
	public final silent: Bool;

	/** The instance used to process the PHP code. **/
	final transformer: Transformer;

	/** Creates a new plugin. **/
	@:ignoreInstrument
	public function new(?options: PluginOptions) {
		super({objectMode: true});

		binary = options?.binary ?? "php";
		mode = options?.mode ?? Safe;
		silent = options?.silent ?? false;
		transformer = mode == Fast ? new FastTransformer(binary) : new SafeTransformer(binary);

		final handler = () -> transformer?.close()?.eager();
		on("end", handler).on("error", handler);
	}

	/** Transforms input and produces output. **/
	override function _transform(chunk: Dynamic, encoding: String, callback: (Null<Error>, Any) -> Void): Void {
		final file: File = chunk;
		if (!silent) Logger.log('Minifying: ${file.relative}');
		transformer.transform(file.path).handle(outcome -> switch outcome {
			case Failure(error):
				callback(new PluginError("@cedx/php-minifier", error.message, {fileName: file.path}), null);
			case Success(output):
				file.contents = Buffer.from(output, encoding);
				callback(null, file);
		});
	}
}

/** Defines the options of a `Plugin` instance. **/
typedef PluginOptions = {

	/** The path to the PHP executable. **/
	var ?binary: String;

	/** The operation mode of the plugin. **/
	var ?mode: TransformMode;

	/** Value indicating whether to silence the plugin output. **/
	var ?silent: Bool;
}
