import {FastTransformer} from './fast_transformer';
import {SafeTransformer} from './safe_transformer';
import {TransformMode} from './transform_mode';

/**
 * Interface providing a mechanism for transforming input and producing output.
 */
export abstract class Transformer {

  /**
   * Creates a new transformer.
   * @param mode The transformation type.
   * @param executable The path to the PHP executable.
   * @return The newly created instance.
   */
  public static factory(mode: string, executable: string = 'php'): Transformer {
    return mode == TransformMode.fast ? new FastTransformer(executable) : new SafeTransformer(executable);
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  public async close(): Promise<void> {
    throw new Error('Not implemented.');
  }

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  public async transform(script: string): Promise<string> {
    throw new Error('Not implemented.');
  }
}
