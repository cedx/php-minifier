'use strict';

const {execFile} = require('child_process');
const {resolve} = require('path');
const {promisify} = require('util');

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 * @implements {Transformer}
 */
class SafeTransformer {

  /**
   * Initializes a new instance of the class.
   * @param {string} [executable] The path to the PHP executable.
   */
  constructor(executable = 'php') {

    /**
     * The path to the PHP executable.
     * @type {string}
     */
    this._executable = executable;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'SafeTransformer';
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return {Promise} Completes when the transformer is finally disposed.
  */
  async close() {
    return null;
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    const exec = promisify(execFile);
    let {stdout} = await exec(this._executable, ['-w', resolve(script)], {maxBuffer: 10 * 1024 * 1024});
    return stdout;
  }
}

// Module exports.
exports.SafeTransformer = SafeTransformer;
