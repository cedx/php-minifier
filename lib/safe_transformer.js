'use strict';

const {execFile} = require('child_process');
const {Observable} = require('rxjs');

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
exports.SafeTransformer = class SafeTransformer {

  /**
   * Initializes a new instance of the class.
   * @param {Minifier} minifier The instance providing access to the minifier settings.
   */
  constructor(minifier) {

    /**
     * The instance providing access to the minifier settings.
     * @type {Minifier}
     */
    this._minifier = minifier;
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Observable<string>} The transformed script.
   */
  transform(script) {
    const exec = Observable.bindNodeCallback(execFile, stdout => stdout);
    return exec(this._minifier.binary, ['-w', script], {maxBuffer: 10 * 1024 * 1024});
  }
};
