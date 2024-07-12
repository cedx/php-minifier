import {GulpPlugin, type GulpPluginOptions} from "./gulp_plugin.js";

export * from "./fast_transformer.js";
export * from "./gulp_plugin.js";
export * from "./safe_transformer.js";
export * from "./transform_mode.js";
export * from "./transformer.js";

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export default function phpMinifier(options: Partial<GulpPluginOptions> = {}): GulpPlugin {
	return new GulpPlugin(options);
}
