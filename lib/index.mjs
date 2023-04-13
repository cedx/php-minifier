import bundle from "./bundle.js";

/**
 * Creates a new plugin.
 * @param {PluginOptions} [options] The plugin options.
 * @returns {Plugin} The newly created instance.
 */
export default function phpMinify(options = {}) {
	return new bundle.Plugin(options);
}
