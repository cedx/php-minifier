import {resolve} from "node:path";
import {execa} from "execa";
import {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer extends Transformer {

	/**
	 * Creates a new safe transformer.
	 * @param {string} [executable] The path to the PHP executable.
	 */
	constructor(executable = "php") {
		super(executable);
	}

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns {Promise<void>} Resolves when the transformer is finally disposed.
	 */
	close() {
		return Promise.resolve();
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 */
	async transform(file) {
		return (await execa(this._executable, ["-w", resolve(file)])).stdout;
	}
}
