import log from "fancy-log";
import {Buffer} from "node:buffer";
import {Transform, type TransformCallback} from "node:stream";
import PluginError from "plugin-error";
import type File from "vinyl";
import {FastTransformer} from "./FastTransformer.js";
import type {ITransformer} from "./ITransformer.js";
import {SafeTransformer} from "./SafeTransformer.js";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class GulpPlugin extends Transform {

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	readonly #silent: boolean;

	/**
	 * The instance used to process the PHP code.
	 */
	readonly #transformer: ITransformer;

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options: GulpPluginOptions = {}) {
		super({objectMode: true});

		const binary = options.binary ?? "php";
		this.#silent = options.silent ?? false;
		this.#transformer = (options.mode ?? "safe") == "fast" ? new FastTransformer(binary) : new SafeTransformer(binary);

		const dispose = async (): Promise<void> => { await this.#transformer[Symbol.asyncDispose](); };
		this.on("end", dispose).on("error", dispose); // eslint-disable-line @typescript-eslint/no-misused-promises
	}

	/**
	 * Transforms input and produces output.
	 * @param file The chunk to transform.
	 * @param encoding The encoding type if the chunk is a string.
	 * @param done The function to invoke when the supplied chunk has been processed.
	 * @returns Resolves when the specified chunk has been transformed.
	 */
	override async _transform(file: File, encoding: BufferEncoding, done: TransformCallback): Promise<void> { // eslint-disable-line @typescript-eslint/no-misused-promises
		try {
			if (!this.#silent) log(`Minifying: ${file.relative}`);
			file.contents = Buffer.from(await this.#transformer.transform(file.path), encoding);
			done(null, file);
		}
		catch (error) {
			const failure = error instanceof Error ? error : String(error);
			done(new PluginError("@cedx/php-minifier", failure, {fileName: file.path}));
		}
	}
}

/**
 * Defines the options of a {@link GulpPlugin} instance.
 */
export type GulpPluginOptions = Partial<{

	/**
	 * The path to the PHP executable.
	 */
	binary: string;

	/**
	 * The operation mode of the plugin.
	 */
	mode: "fast"|"safe";

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	silent: boolean;
}>;
