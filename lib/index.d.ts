import {Transform} from "node:stream";

/**
 * Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function.
 */
export class Minifier extends Transform {

	/**
	 * The path to the PHP executable.
	 */
	readonly binary: string;

	/**
	 * The operation mode.
	 */
	readonly mode: TransformMode;

	/**
	 * Value indicating whether to silence the minifier output.
	 */
	readonly silent: boolean;

	/**
	 * Creates a new minifier.
	 * @param options An object providing values to initialize this instance.
	 */
	constructor(options?: MinifierOptions);
}

/**
 * Defines the options of a {@link Minifier} instance.
 */
export type MinifierOptions = {

	/**
	 * The path to the PHP executable.
	 */
	binary?: string;

	/**
	 * The operation mode of the minifier.
	 */
	mode?: TransformMode;

	/**
	 * Value indicating whether to silence the minifier output.
	 */
	silent?: boolean;
};

/**
 * Defines the type of transformation applied by the minifier.
 */
export type TransformMode = "fast" | "safe";

/**
 * Creates a new minifier.
 * @param options The minifier options.
 * @returns The newly created instance.
 */
export default function phpMinify(options?: MinifierOptions): Minifier;
