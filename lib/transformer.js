/**
 * Removes comments and whitespace from a PHP script.
 * @interface
 */
export class Transformer {

	/**
	 * Creates a new transformer.
	 */
	constructor() {
		if (this.constructor == Transformer) throw new TypeError("The Transformer class is an interface.");
	}

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns {Promise<void>} Resolves when the transformer is finally disposed.
	 */
	async close() {
		throw new TypeError("Not implemented.");
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 */
	async transform(file) { // eslint-disable-line no-unused-vars
		throw new TypeError("Not implemented.");
	}
}
