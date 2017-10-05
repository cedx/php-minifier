'use strict';

const {FastTransformer} = require('./fast_transformer');
const {SafeTransformer} = require('./safe_transformer');

/**
 * Interface providing a mechanism for transforming input and producing output.
 * @interface
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
   * Initializes a new instance of the class.
   * @throws {TypeError} This class is not instantiable.
   */
  constructor() {
    throw new TypeError('This type is not instantiable.');
  }

  /* eslint-disable no-unused-vars, valid-jsdoc */

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return {Promise} Completes when the transformer is finally disposed.
   */
  async close() {
    throw new Error('Not implemented.');
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    throw new Error('Not implemented.');
  }

  /* eslint-enable no-unused-vars, valid-jsdoc */
};
