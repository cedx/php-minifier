import {Transform, type TransformCallback} from "node:stream";
import log from "fancy-log";
import PluginError from "plugin-error";
import type Vinyl from "vinyl";
import {FastTransformer} from "../fast_transformer.js";
import {SafeTransformer} from "../safe_transformer.js";
import {TransformMode} from "../transform_mode.js";
import type {Transformer} from "../transformer.js";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class Plugin extends Transform {

	/**
	 * The path to the PHP executable.
	 */
	readonly binary: string;

	/**
	 * The operation mode of the plugin.
	 */
	readonly mode: TransformMode;

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	readonly silent: boolean;

	/**
	 * The instance used to process the PHP code.
	 */
	readonly #transformer: Transformer;

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: Partial<PluginOptions> = {}) {
		super({objectMode: true});

		this.binary = options.binary ?? "php";
		this.mode = options.mode ?? TransformMode.safe;
		this.silent = options.silent ?? false;
		this.#transformer = this.mode == TransformMode.fast ? new FastTransformer(this.binary) : new SafeTransformer(this.binary);

		const handler = async (): Promise<void> => { await this.#transformer.close(); };
		this.on("end", handler).on("error", handler);
	}

	/**
	 * Transforms input and produces output.
	 * @param chunk The chunk to transform.
	 * @param encoding The encoding type if the chunk is a string.
	 * @param callback The function to invoke when the supplied chunk has been processed.
	 * @returns The transformed chunk.
	 */
	async _transform(chunk: Vinyl, encoding: NodeJS.BufferEncoding, callback: TransformCallback): Promise<Vinyl> {
		try {
			if (!this.silent) log(`Minifying: ${chunk.relative}`);
			chunk.contents = Buffer.from(await this.#transformer.transform(chunk.path), encoding);
			callback(null, chunk);
		}
		catch (error) {
			callback(new PluginError("@cedx/php-minifier", error instanceof Error ? error : String(error), {fileName: chunk.path}), null);
		}

		return chunk;
	}
}

/**
 * Defines the options of a {@link Plugin} instance.
 */
export interface PluginOptions {

	/**
	 * The path to the PHP executable.
	 */
	binary: string;

	/**
	 * The operation mode of the plugin.
	 */
	mode: TransformMode;

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	silent: boolean;
}