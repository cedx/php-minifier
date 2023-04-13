import {Plugin} from "./bundle.js";

/**
 * Creates a new minifier.
 * @param {PluginOptions} [options] The minifier options.
 * @returns {Plugin} The newly created instance.
 */
export default function phpMinify(options = {}) {
	return new Plugin(options);
}
