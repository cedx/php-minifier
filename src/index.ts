import {Plugin, type PluginOptions} from "./gulp/plugin.js";

export * from "./fast_transformer.js";
export * from "./safe_transformer.js";
export * from "./transform_mode.js";
export * from "./transformer.js";
export * from "./gulp/plugin.js";

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export default function phpMinifier(options: Partial<PluginOptions>): Plugin {
	return new Plugin(options);
}
