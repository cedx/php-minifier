import {ChildProcess, spawn} from "node:child_process";
import {createServer, type AddressInfo} from "node:net";
import {join, normalize, resolve} from "node:path";
import {setTimeout} from "node:timers";
import type {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer implements Transformer {

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
	 * @returns The TCP port used by the PHP process.
	 */
	async listen(): Promise<number> {
		if (this.#process) return Promise.resolve(this.#port);

		this.#port = await this.#getPort();
		return new Promise((fulfill, reject) => {
			const args = ["-S", `127.0.0.1:${this.#port}`, "-t", join(import.meta.dirname, "../www")];
			this.#process = spawn(this.#executable, args, {stdio: ["ignore", "pipe", "ignore"]})
				.on("error", reject)
				.on("spawn", () => setTimeout(() => fulfill(this.#port), 1_000));
		});
	}

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 * @throws `Error` when an error occurred while processing the script.
	 */
	async transform(file: string): Promise<string> {
		const port = await this.listen();
		const url = new URL(`http://127.0.0.1:${port}/index.php`);
		url.searchParams.set("file", resolve(file));

		const response = await fetch(url);
		if (response.ok) return await response.text();
		throw Error(`An error occurred while processing the script: ${file}`);
	}

	/**
	 * Gets an ephemeral TCP port chosen by the system.
	 * @returns The TCP port chosen by the system.
	 */
	#getPort(): Promise<number> {
		return new Promise((fulfill, reject) => {
			const server = createServer().unref().on("error", reject);
			server.listen({host: "127.0.0.1", port: 0}, () => {
				const {port} = server.address() as AddressInfo;
				server.close(() => fulfill(port));
			});
		});
	}
}
