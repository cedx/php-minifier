import {GulpPlugin, type GulpPluginOptions} from "./GulpPlugin.js";

export * from "./FastTransformer.js";
export * from "./GulpPlugin.js";
export type * from "./ITransformer.js";
export * from "./SafeTransformer.js";

/**
 * Creates a new Gulp plugin.
 * @param options The plugin options.
 * @returns The newly created instance.
 */
export function phpMinify(options: GulpPluginOptions= {}): GulpPlugin {
	return new GulpPlugin(options);
}
