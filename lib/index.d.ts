import {Transform, type TransformCallback} from "node:stream";
import type File from "vinyl";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export declare class GulpPlugin extends Transform {

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: Partial<GulpPluginOptions>);

	/**
	 * Transforms input and produces output.
	 * @param chunk The chunk to transform.
	 * @param encoding The encoding type if the chunk is a string.
	 * @param callback The function to invoke when the supplied chunk has been processed.
	 * @returns The transformed chunk.
	 */
	_transform(chunk: File, encoding: NodeJS.BufferEncoding, callback: TransformCallback): Promise<File>;
}

/**
 * Defines the options of a {@link GulpPlugin} instance.
 */
export type GulpPluginOptions = {

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
};

/**
 * The operation mode of the minifier.
 */
export type TransformMode = "fast"|"safe";

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export default function phpMinifier(options?: Partial<GulpPluginOptions>): GulpPlugin;
