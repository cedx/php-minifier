const {Plugin} = require("./bundle.js");

/**
 * Creates a new minifier.
 * @param {PluginOptions} [options] The minifier options.
 * @returns {Plugin} The newly created instance.
 */
module.exports = function phpMinify(options = {}) {
	return new Plugin(options);
}
