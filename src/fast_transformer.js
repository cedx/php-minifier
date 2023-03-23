import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {execa} from "execa";
import getPort from "get-port";
import {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer extends Transformer {

	/**
	 * The address that the server is listening on.
	 * @type {string}
	 */
	static address = "127.0.0.1";

	/**
	 * The port that the PHP process is listening on.
	 * @type {number}
	 */
	#port = -1;

	/**
	 * The underlying PHP process.
	 * @type {import("execa").ExecaChildProcess|null}
	 */
	#process = null;

	/**
	 * Creates a new fast transformer.
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
		this.#process?.kill();
		this.#process = null;
		return Promise.resolve();
	}

	/**
	 * Starts the underlying PHP process and begins accepting connections. It does nothing if the server is already started.
	 * @returns {Promise<number>} The port used by the PHP process.
	 */
	async listen() {
		if (this.#process) return this.#port;

		this.#port = await getPort();
		return new Promise((fulfill, reject) => {
			const args = ["-S", `${FastTransformer.address}:${this.#port}`, "-t", fileURLToPath(new URL("php", import.meta.url))];
			this.#process = execa(this._executable, args);
			this.#process.on("error", reject);
			this.#process.on("spawn", () => setTimeout(fulfill, 1_000, this.#port));
		});
	}

	/**
	 * Processes a PHP script.
	 * @param {string} file The path to the PHP script.
	 * @returns {Promise<string>} The transformed script.
	 */
	async transform(file) {
		const port = await this.listen();
		const url = new URL(`http://${FastTransformer.address}:${port}/index.php`);
		url.searchParams.set("file", resolve(file));

		const response = await fetch(url);
		if (!response.ok) throw Error(`An error occurred while processing the script: ${file}`);
		return response.text();
	}
}
