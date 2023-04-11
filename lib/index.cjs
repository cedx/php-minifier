const {Minifier} = require("./bundle.js");

/**
 * Creates a new minifier.
 * @param {MinifierOptions} [options] The minifier options.
 * @returns {Minifier} The newly created instance.
 */
module.exports = function phpMinify(options = {}) {
	return new Minifier(options);
}
