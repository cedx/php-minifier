import {Minifier} from './minifier';
export * from './minifier';

/**
 * Create a new instance of the plug-in.
 * @param {object} [options] The plug-in options.
 * @return {Minifier} Tthe newly created instance.
 */
export function phpMinify(options = {}) {
  return new Minifier(options);
}
