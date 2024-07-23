import getPort from "get-port";
import {spawn, type ChildProcess} from "node:child_process";
import {join, normalize, resolve} from "node:path";
import {setTimeout} from "node:timers";
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
	#process: ChildProcess|null = null;

	/**
	 * Creates a new fast transformer.
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

		const {promise, reject, resolve: fulfill} = Promise.withResolvers<number>();
		const args = ["-S", `${FastTransformer.#address}:${this.#port}`, "-t", join(import.meta.dirname, "../src")];
		this.#process = spawn(this.#executable, args, {stdio: ["ignore", "pipe", "ignore"]});
		this.#process.on("error", reject);
		this.#process.on("spawn", () => setTimeout(() => fulfill(this.#port), 1_000));
		return promise;
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
		if (response.ok) return response.text();
		throw Error(`An error occurred while processing the script: ${file}`);
	}
}
