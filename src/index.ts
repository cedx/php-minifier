import {Minifier, MinifierOptions} from './minifier';

export * from './fast_transformer';
export * from './minifier';
export * from './safe_transformer';
export * from './transform_mode';
export * from './transformer';

/// TODO
export function phpMinify(options: Partial<MinifierOptions> = {}): Minifier {
  return new Minifier(options);
}
