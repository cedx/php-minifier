import {Minifier} from './minifier';

export * from './fast_transformer';
export * from './minifier';
export * from './safe_transformer';
export * from './transformer';

/**
 * Creates a new minifier.
 * @param {MinifierOptions} [options] The minifier options.
 * @return {Minifier} The newly created instance.
 */
export function phpMinify(options = {}) {
  return new Minifier(options);
}
