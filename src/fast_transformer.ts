import {join, normalize, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {execa, type ExecaChildProcess} from "execa";
import getPort from "get-port";
import type {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer implements Transformer {

	/**
	 * The address that the server is listening on.
	 */
	static readonly #address = "127.0.0.1";

	/**
	 * The path to the PHP executable.
	 */
	readonly #executable: string;

	/**
	 * The port that the PHP process is listening on.
	 */
	#port = -1;

	/**
	 * The underlying PHP process.
	 */
	#process: ExecaChildProcess|null = null;

	/**
	 * Creates a new fast transformer.
	 */
	constructor(executable = "php") {
		this.#executable = normalize(executable);
	}

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns Resolves when the transformer is finally disposed.
	 */
	close(): Promise<void> {
		this.#process?.kill();
		this.#process = null;
		return Promise.resolve();
	}

	/**
	 * Starts the underlying PHP process and begins accepting connections.
	 * @returns The port used by the PHP process.
	 */
	async listen(): Promise<number> {
		if (this.#process) return this.#port;

		this.#port = await getPort();
		return new Promise((fulfill, reject) => {
			const root = typeof module == "undefined" ? fileURLToPath(new URL("../www", import.meta.url)) : join(__dirname, "../www");
			const args = ["-S", `${FastTransformer.#address}:${this.#port}`, "-t", root];
			this.#process = execa(this.#executable, args);
			this.#process.on("error", reject);
			setTimeout(() => fulfill(this.#port), 1_000);
		});
	}

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	async transform(file: string): Promise<string> {
		const port = await this.listen();
		const url = new URL(`http://${FastTransformer.#address}:${port}/index.php`);
		url.searchParams.set("file", resolve(file));

		const response = await fetch(url);
		if (!response.ok) throw new Error(`An error occurred while processing the script: ${file}`);
		return response.text();
	}
}
