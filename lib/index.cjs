const {Plugin} = require("./bundle.js");

/**
 * Creates a new plugin.
 * @param {PluginOptions} [options] The plugin options.
 * @returns {Plugin} The newly created instance.
 */
module.exports = function phpMinifier(options = {}) {
	return new Plugin(options);
}
