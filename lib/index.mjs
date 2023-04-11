import {Minifier} from "./bundle.js";

/**
 * Creates a new minifier.
 * @param {MinifierOptions} [options] The minifier options.
 * @returns {Minifier} The newly created instance.
 */
export default function phpMinify(options = {}) {
	return new Minifier(options);
}
