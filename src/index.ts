import {Minifier, MinifierOptions} from "./minifier.js";

export * from "./fast_transformer.js";
export * from "./minifier.js";
export * from "./safe_transformer.js";
export * from "./transformer.js";

/**
 * Creates a new minifier.
 * @param options The minifier options.
 * @returns The newly created instance.
 */
export function phpMinify(options: Partial<MinifierOptions> = {}): Minifier {
	return new Minifier(options);
}
