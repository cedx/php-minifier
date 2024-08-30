import bundle from "./bundle.js";

/**
 * Creates a new plugin.
 * @param {Partial<import("./index.js").PluginOptions>} options The plugin options.
 * @returns {import("./index.js").Plugin} The newly created instance.
 */
export default function phpMinifier(options = {}) {
	const {Plugin} = bundle;
	return new Plugin(options);
}
