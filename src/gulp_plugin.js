import {Transform} from "node:stream";
import log from "fancy-log";
import PluginError from "plugin-error";
import {FastTransformer} from "./fast_transformer.js";
import {SafeTransformer} from "./safe_transformer.js";
import {TransformMode} from "./transform_mode.js";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class GulpPlugin extends Transform {

	/**
	 * Value indicating whether to silence the plugin output.
	 * @type {boolean}
	 * @readonly
	 */
	#silent;

	/**
	 * The instance used to process the PHP code.
	 * @type {Transformer}
	 * @readonly
	 */
	#transformer;

	/**
	 * Creates a new plugin.
	 * @param {Partial<GulpPluginOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		super({objectMode: true});

		const binary = options.binary ?? "php";
		this.#silent = options.silent ?? false;
		this.#transformer = (options.mode ?? TransformMode.safe) == TransformMode.fast ? new FastTransformer(binary) : new SafeTransformer(binary);

		const close = async () => { await this.#transformer.close(); };
		this.on("end", close).on("error", close);
	}

	/**
	 * Transforms input and produces output.
	 * @param {import("vinyl")} chunk The chunk to transform.
	 * @param {NodeJS.BufferEncoding} encoding The encoding type if the chunk is a string.
	 * @param {import("node:stream").TransformCallback} callback The function to invoke when the supplied chunk has been processed.
	 * @returns {Promise<import("vinyl")>} The transformed chunk.
	 * @override
	 */
	async _transform(chunk, encoding, callback) {
		try {
			if (!this.#silent) log(`Minifying: ${chunk.relative}`);
			chunk.contents = Buffer.from(await this.#transformer.transform(chunk.path), encoding);
			callback(null, chunk);
		}
		catch (error) {
			callback(new PluginError("@cedx/php-minifier", error instanceof Error ? error : String(error), {fileName: chunk.path}));
		}

		return chunk;
	}
}

/**
 * Defines the options of a {@link GulpPlugin} instance.
 * @typedef {object} GulpPluginOptions
 * @property {string} binary The path to the PHP executable.
 * @property {TransformMode|string} mode The operation mode of the plugin.
 * @property {boolean} silent Value indicating whether to silence the plugin output.
 */

/**
 * Removes comments and whitespace from a PHP script.
 * @typedef {object} Transformer
 * @property {() => Promise<void>} close Closes this transformer and releases any resources associated with it.
 * @property {(file: string) => Promise<string>} transform Processes a PHP script.
 */
