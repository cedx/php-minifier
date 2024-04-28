import {GulpPlugin} from "./gulp_plugin.js";

export * from "./fast_transformer.js";
export * from "./gulp_plugin.js";
export * from "./safe_transformer.js";
export * from "./transform_mode.js";

/**
 * Creates a new plugin.
 * @param {Partial<import("./gulp_plugin.js").GulpPluginOptions>} options The plugin options.
 * @returns {GulpPlugin} The newly created instance.
 */
export default function phpMinifier(options = {}) {
	return new GulpPlugin(options);
}
