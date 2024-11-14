import {Transformer} from "./transformer.js";

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer implements Transformer {

	/**
	 * Creates a new fast transformer.
	 * @param executable The path to the PHP executable.
	 */
	constructor(executable?: string);

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns Resolves when the transformer is finally disposed.
	 */
	close(): Promise<void>;

	/**
	 * Starts the underlying PHP process and begins accepting connections.
	 * @returns The TCP port used by the PHP process.
	 */
	listen(): Promise<number>;

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	transform(file: string): Promise<string>;
}
