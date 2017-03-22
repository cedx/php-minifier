import {Minifier} from './minifier';

export * from './fast_transformer';
export * from './minifier';
export * from './safe_transformer';

/**
 * Create a new instance of the plug-in.
 * @param {object} [options] The plug-in options.
 * @return {Minifier} The newly created instance.
 */
export function phpMinify(options = {}) {
  return new Minifier(options);
}
