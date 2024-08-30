import bundle from "./bundle.js";

/**
 * Creates a new plugin.
 * @param {Partial<import("./index.js").GulpPluginOptions>} options The plugin options.
 * @returns {import("./index.js").GulpPlugin} The newly created instance.
 */
export default function phpMinifier(options = {}) {
	const {GulpPlugin} = bundle;
	return new GulpPlugin(options);
}
