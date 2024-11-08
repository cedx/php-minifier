import {Transform} from "node:stream";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class GulpPlugin extends Transform {

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: GulpPluginOptions);
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
