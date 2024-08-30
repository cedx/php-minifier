const {GulpPlugin} = require("./bundle.js");

/**
 * Creates a new plugin.
 * @param {Partial<import("./index.js").GulpPluginOptions>} options The plugin options.
 * @returns {import("./index.js").GulpPlugin} The newly created instance.
 */
module.exports = function phpMinifier(options = {}) {
	return new GulpPlugin(options);
}
