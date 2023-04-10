import {Buffer} from "node:buffer";
import {Transform} from "node:stream";
import log from "fancy-log";
import PluginError from "plugin-error";
import {FastTransformer} from "./fast_transformer.js";
import {SafeTransformer} from "./safe_transformer.js";
import {TransformMode} from "./transform_mode.js";

/**
 * Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function.
 */
export class Minifier extends Transform {

	/**
	 * The path to the PHP executable.
	 * @type {string}
	 */
	binary;

	/**
	 * The operation mode.
	 * @type {TransformMode}
	 */
	mode;

	/**
	 * Value indicating whether to silence the minifier output.
	 * @type {boolean}
	 */
	silent;

	/**
	 * The instance used to process the PHP code.
	 * @type {import("./transformer.js").Transformer|null}
	 */
	#transformer = null;

	/**
	 * Creates a new minifier.
	 * @param {MinifierOptions} [options] An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		super({objectMode: true});

		this.binary = options.binary ?? "php";
		this.mode = options.mode ?? TransformMode.safe;
		this.silent = options.silent ?? false;

		const handler = async () => { if (this.#transformer) await this.#transformer.close(); };
		this.on("end", handler).on("error", handler);
	}

	/**
	 * Transforms input and produces output.
	 * @param {import("vinyl")} file The chunk to transform.
	 * @param {BufferEncoding} [encoding] The encoding type if the chunk is a string.
	 * @param {import("node:stream").TransformCallback} [callback] The function to invoke when the supplied chunk has been processed.
	 * @returns {Promise<import("vinyl")>} The transformed chunk.
	 */
	async _transform(file, encoding, callback) {
		try {
			this.#transformer ??= this.mode == TransformMode.fast ? new FastTransformer(this.binary) : new SafeTransformer(this.binary);
			if (!this.silent) log(`Minifying: ${file.relative}`);
			file.contents = Buffer.from(await this.#transformer.transform(file.path), encoding);
			if (callback) callback(null, file);
		}
		catch (error) {
			if (callback) callback(new PluginError("@cedx/php-minify", /** @type {Error} */ (error)), {fileName: file.path});
			else throw error;
		}

		return file;
	}
}

/**
 * Defines the options of a {@link Minifier} instance.
 * @typedef {object} MinifierOptions
 * @property {string} [binary] The path to the PHP executable.
 * @property {TransformMode} [mode] The operation mode of the minifier.
 * @property {boolean} [silent] Value indicating whether to silence the minifier output.
 */
