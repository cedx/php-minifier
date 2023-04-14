import bundle from "./bundle.js";

/**
 * Creates a new plug-in.
 * @param {PluginOptions} [options] The plug-in options.
 * @returns {Plugin} The newly created instance.
 */
export default function phpMinify(options = {}) {
	const {Plugin} = bundle;
	return new Plugin(options);
}
