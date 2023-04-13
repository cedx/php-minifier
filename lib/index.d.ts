import {Transform} from "node:stream";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export class Plugin extends Transform {

	/**
	 * The path to the PHP executable.
	 */
	readonly binary: string;

	/**
	 * The operation mode.
	 */
	readonly mode: TransformMode;

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	readonly silent: boolean;

	/**
	 * Creates a new plugin.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: PluginOptions);
}

/**
 * Defines the options of a {@link Plugin} instance.
 */
export type PluginOptions = {

	/**
	 * The path to the PHP executable.
	 */
	binary?: string;

	/**
	 * The operation mode of the plugin.
	 */
	mode?: TransformMode;

	/**
	 * Value indicating whether to silence the plugin output.
	 */
	silent?: boolean;
};

/**
 * The operation mode of the minifier.
 */
export type TransformMode = "fast" | "safe";

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export default function phpMinify(options?: PluginOptions): Plugin;
