import {Minifier} from './minifier.js';

export * from './fast_transformer.js';
export * from './minifier.js';
export * from './safe_transformer.js';
export * from './transformer.js';

/**
 * Creates a new minifier.
 * @param {MinifierOptions} [options] The minifier options.
 * @return {Minifier} The newly created instance.
 */
export function phpMinify(options = {}) {
  return new Minifier(options);
}
