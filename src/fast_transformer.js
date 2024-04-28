import {spawn} from "node:child_process";
import {normalize, resolve} from "node:path";
import {setTimeout} from "node:timers";
import getPort from "get-port";

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer {

	/**
	 * The address that the server is listening on.
	 * @type {string}
	 * @readonly
	 */
	static #address = "127.0.0.1";

	/**
	 * The path to the PHP executable.
	 * @type {string}
	 * @readonly
	 */
	#executable;

	/**
	 * The port that the PHP process is listening on.
	 * @type {number}
	 */
	#port = -1;

	/**
	 * The underlying PHP process.
	 * @type {import("node:child_process").ChildProcess|null}
	 */
	#process = null;

	/**
	 * Creates a new fast transformer.
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
		this.#process?.kill();
		this.#process = null;
		return Promise.resolve();
	}

	/**
	 * Starts the underlying PHP process and begins accepting connections.
	 * @returns {Promise<number>} The port used by the PHP process.
	 */
	async listen() {
		if (this.#process) return this.#port;

		this.#port = await getPort();
		return new Promise((fulfill, reject) => {
			const args = ["-S", `${FastTransformer.#address}:${this.#port}`, "-t", import.meta.dirname];
			this.#process = spawn(this.#executable, args, {stdio: ["ignore", "pipe", "ignore"]});
			this.#process.on("error", reject);
			this.#process.on("spawn", () => setTimeout(() => fulfill(this.#port), 1_000));
		});
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 */
	async transform(file) {
		const port = await this.listen();
		const url = new URL(`http://${FastTransformer.#address}:${port}/index.php`);
		url.searchParams.set("file", resolve(file));

		const response = await fetch(url);
		if (response.ok) return response.text();
		throw Error(`An error occurred while processing the script: ${file}`);
	}
}
