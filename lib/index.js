import { Minifier } from './minifier.js';
export * from './fast_transformer.js';
export * from './minifier.js';
export * from './safe_transformer.js';
/**
 * Creates a new minifier.
 * @param options The minifier options.
 * @return The newly created instance.
 */
export function phpMinify(options = {}) {
    return new Minifier(options);
}
