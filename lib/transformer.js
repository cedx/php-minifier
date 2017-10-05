'use strict';

const {FastTransformer} = require('./fast_transformer');
const {SafeTransformer} = require('./safe_transformer');

/**
 * Interface providing a mechanism for transforming input and producing output.
 */
exports.Transformer = class Transformer {

  /**
   * Creates a new transformer.
   * @param {string} mode The transformation type.
   * @param {string} [executable] The path to the PHP executable.
   * @return {Transformer} The newly created instance.
   */
  static factory(mode, executable = 'php') {
    return mode.toLowerCase() == 'fast' ? new FastTransformer(executable) : new SafeTransformer(executable);
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   */
  async close() {
    throw new Error('Not implemented.');
  }

  /**
   * Processes the specified PHP script and returns its contents minified.
   * @param {string} script The path to the PHP script.
   */
  async transform(script) { // eslint-disable-line
    throw new Error('Not implemented.');
  }
};
