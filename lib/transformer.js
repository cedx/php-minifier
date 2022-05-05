/**
 * Removes comments and whitespace from a PHP script.
 * @interface
 */
export class Transformer {

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns {Promise<void>} Resolves when the transformer is finally disposed.
	 */
	async close() {
		throw new Error("Not implemented.");
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 */
	async transform(file) {
		throw new Error("Not implemented.");
	}
}
