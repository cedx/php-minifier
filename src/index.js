import path from 'path';
import which from 'which';
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
  let minifier = new Minifier(typeof options.binary == 'string' ? path.normalize(options.binary) : which.sync('php'));
  if (typeof options.mode == 'string') minifier.mode = options.mode;
  if (typeof options.silent == 'boolean') minifier.silent = options.silent;
  return minifier;
}
