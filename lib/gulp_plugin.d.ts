import {Transform, TransformCallback} from "node:stream";
import File from "vinyl"

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class GulpPlugin extends Transform {

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: GulpPluginOptions);

	/**
	 * Transforms input and produces output.
	 * @param chunk The chunk to transform.
	 * @param encoding The encoding type if the chunk is a string.
	 * @param callback The function to invoke when the supplied chunk has been processed.
	 * @returns The transformed chunk.
	 */
	_transform(chunk: File, encoding: NodeJS.BufferEncoding, callback: TransformCallback): Promise<void>;
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
