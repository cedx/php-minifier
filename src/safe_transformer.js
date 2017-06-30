import {execFile} from 'child_process';
import {promisify} from 'util';

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer {

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
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    const exec = promisify(execFile);
    return (await exec(this._minifier.binary, ['-w', script], {maxBuffer: 10 * 1024 * 1024})).stdout;
  }
}
