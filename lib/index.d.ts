import {Transform} from "node:stream";
import {GulpPluginOptions} from "./gulp_plugin.js";
export * from "./fast_transformer.js";
export * from "./gulp_plugin.js";
export * from "./safe_transformer.js";

/**
 * Creates a new plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export function phpMinify(options?: GulpPluginOptions): Transform;
