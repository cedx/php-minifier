/** Interface providing a mechanism for transforming input and producing output. */
import {FastTransformer} from './fast_transformer.js';
import {TransformMode} from './minifier.js';
import {SafeTransformer} from './safe_transformer.js';

/** Removes comments and whitespace from a PHP script. */
export class Transformer {

  /**
   * Creates a new transformer.
   * @param {string} mode The operational mode.
   * @param {string} [executable] The path to the PHP executable.
   */
  constructor(mode, executable = 'php') {
    return mode == TransformMode.fast ? new FastTransformer(executable) : new SafeTransformer(executable);
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return {Promise} Completes when the transformer is finally disposed.
   */
  close() {
    throw new Error('Missing concrete implementation.');
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  transform(script) { // eslint-disable-line no-unused-vars
    throw new Error('Missing concrete implementation.');
  }
}
