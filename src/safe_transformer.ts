import {normalize, resolve} from "node:path";
import {execa} from "execa"
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
	async transform(file: string): Promise<string> {
		return (await execa(this.#executable, ["-w", resolve(file)])).stdout;
	}
}
