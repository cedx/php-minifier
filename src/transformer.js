import {normalize} from "node:path";

/**
 * Removes comments and whitespace from a PHP script.
 * @abstract
 */
export class Transformer {

	/**
	 * The path to the PHP executable.
	 * @type {string}
	 * @protected
	 */
	_executable;

	/**
	 * Creates a new transformer.
	 * @param {string} executable The path to the PHP executable.
	 * @protected
	 */
	constructor(executable) {
		if (this.constructor == Transformer) throw TypeError("The Transformer class is abstract.");
		this._executable = normalize(executable);
	}

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns {Promise<void>} Resolves when the transformer is finally disposed.
	 * @abstract
	 */
	async close() {
		throw TypeError("Not implemented.");
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 * @abstract
	 */
	async transform(file) { // eslint-disable-line no-unused-vars
		throw TypeError("Not implemented.");
	}
}
