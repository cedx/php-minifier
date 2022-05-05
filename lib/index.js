import {Minifier} from "./minifier.js";

export * from "./fast_transformer.js";
export * from "./minifier.js";
export * from "./safe_transformer.js";
export * from "./transform_mode.js";
export * from "./transformer.js";

/**
 * Creates a new minifier.
 * @param {Partial<import("./minifier.js").MinifierOptions>} [options] The minifier options.
 * @returns {import("./minifier.js").Minifier} The newly created instance.
 */
export default function phpMinify(options) {
	return new Minifier(options);
}
