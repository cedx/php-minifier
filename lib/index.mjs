import bundle from "./bundle.js";

/**
 * Creates a new plugin.
 * @param {PluginOptions} [options] The plugin options.
 * @returns {Plugin} The newly created instance.
 */
export default function phpMinifier(options = {}) {
	const {Plugin} = bundle;
	return new Plugin(options);
}
