import {execFile} from "node:child_process";
import {normalize, resolve} from "node:path";

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer {

	/**
	 * The path to the PHP executable.
	 * @type {string}
	 * @readonly
	 */
	#executable;

	/**
	 * Creates a new safe transformer.
	 * @param {string} executable The path to the PHP executable.
	 */
	constructor(executable = "php") {
		this.#executable = normalize(executable);
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
	transform(file) {
		const {promise, reject, resolve: fulfill} = Promise.withResolvers();
		execFile(this.#executable, ["-w", resolve(file)], {maxBuffer: 20 * 1_024 * 1_024}, (error, stdout) => {
			if (error) reject(error);
			else fulfill(stdout);
		});

		return promise;
	}
}
