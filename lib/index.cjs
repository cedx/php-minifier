const {Plugin} = require("./bundle.js");

/**
 * Creates a new plug-in.
 * @param {PluginOptions} [options] The plug-in options.
 * @returns {Plugin} The newly created instance.
 */
module.exports = function phpMinify(options = {}) {
	return new Plugin(options);
}
