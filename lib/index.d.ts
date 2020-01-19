import { Minifier, MinifierOptions } from './minifier';
export * from './fast_transformer';
export * from './minifier';
export * from './safe_transformer';
export * from './transformer';
/**
 * Creates a new minifier.
 * @param options The minifier options.
 * @return The newly created instance.
 */
export declare function phpMinify(options?: Partial<MinifierOptions>): Minifier;
