import type {Transform} from "node:stream";

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

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export function phpMinify(options?: GulpPluginOptions): Transform;
