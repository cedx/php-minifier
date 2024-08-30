const {Plugin} = require("./bundle.js");

/**
 * Creates a new plugin.
 * @param {Partial<import("./index.js").PluginOptions>} options The plugin options.
 * @returns {import("./index.js").Plugin} The newly created instance.
 */
module.exports = function phpMinifier(options = {}) {
	return new Plugin(options);
}
