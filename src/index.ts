import {Minifier, MinifierOptions} from './minifier';

export * from './fast_transformer';
export * from './minifier';
export * from './safe_transformer';
export * from './transform_mode';
export * from './transformer';

/**
 * Creates a new minifier.
 * @param options The minifier options.
 * @return The newly created instance.
 */
export function phpMinify(options: Partial<MinifierOptions> = {}): Minifier {
  return new Minifier(options);
}
