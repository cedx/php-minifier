import {execFile} from "node:child_process";
import {normalize, resolve} from "node:path";
import {promisify} from "node:util";
import type {ITransformer} from "./ITransformer.js";

/**
 * Spawns a new process using the specified command.
 */
const run = promisify(execFile);

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer implements ITransformer {

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
	 * Releases any resources associated with this object.
	 * @returns Resolves when this object is finally disposed.
	 */
	[Symbol.asyncDispose](): Promise<void> {
		return this.close();
	}

	/**
	 * Closes this transformer.
	 * @returns Resolves when the transformer has been closed.
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
		return (await run(this.#executable, ["-w", resolve(file)], {maxBuffer: 20 * 1024 * 1024})).stdout
	}
}
