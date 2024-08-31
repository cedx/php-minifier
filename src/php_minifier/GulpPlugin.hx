package php_minifier;

import js.fancy_log.Logger;
import js.lib.Error;
import js.node.Buffer;
import js.node.stream.Transform;
import js.plugin_error.PluginError;
import js.vinyl.File;

/** Minifies PHP source code by removing comments and whitespace. **/
final class GulpPlugin extends Transform<GulpPlugin> {

	/** Value indicating whether to silence the plugin output. **/
	final silent: Bool;

	/** The instance used to process the PHP code. **/
	final transformer: Transformer;

	/** Creates a new plugin. **/
	public function new(?options: GulpPluginOptions) {
		super({objectMode: true});

		final binary = options?.binary ?? "php";
		silent = options?.silent ?? false;
		transformer = (options?.mode ?? Safe) == Fast ? new FastTransformer(binary) : new SafeTransformer(binary);

		final close = () -> transformer.close().eager();
		on("end", close).on("error", close);
	}

	/** Creates a new plugin. **/
	@:expose("phpMinify")
	static inline function create(?options: GulpPluginOptions): GulpPlugin
		return new GulpPlugin(options);

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

/** Defines the options of a `GulpPlugin` instance. **/
typedef GulpPluginOptions = {

	/** The path to the PHP executable. **/
	var ?binary: String;

	/** The operation mode of the plugin. **/
	var ?mode: TransformMode;

	/** Value indicating whether to silence the plugin output. **/
	var ?silent: Bool;
}
