import {GulpPlugin, type GulpPluginOptions} from "./gulp_plugin.js";

export * from "./fast_transformer.js";
export * from "./gulp_plugin.js";
export * from "./safe_transformer.js";
export * from "./transformer.js";

/**
 * Creates a new Gulp plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export function phpMinify(options: GulpPluginOptions= {}): GulpPlugin {
	return new GulpPlugin(options);
}
