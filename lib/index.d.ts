import {Transform} from "node:stream";

/**
 * Minifies PHP source code by removing comments and whitespace.
 */
export declare class GulpPlugin extends Transform {}

/**
 * Defines the options of a {@link GulpPlugin} instance.
 */
export interface GulpPluginOptions {

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
}

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export function phpMinify(options?: Partial<GulpPluginOptions>): GulpPlugin;
