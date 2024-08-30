import {execFile} from "node:child_process";
import {normalize, resolve} from "node:path";
import type {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer implements Transformer {

	/**
	 * The path to the PHP executable.
	 */
	readonly #executable: string;

	/**
	 * Creates a new safe transformer.
	 * @param executable The path to the PHP executable.
	 */
	constructor(executable = "php") {
		this.#executable = normalize(executable);
	}

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns Resolves when the transformer is finally disposed.
	 */
	close(): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	transform(file: string): Promise<string> {
		const {promise, reject, resolve: fulfill} = Promise.withResolvers<string>();
		execFile(this.#executable, ["-w", resolve(file)], {maxBuffer: 20 * 1_024 * 1_024}, (error, stdout) => {
			if (error) reject(error);
			else fulfill(stdout);
		});

		return promise;
	}
}
