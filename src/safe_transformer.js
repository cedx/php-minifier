import child_process from 'child_process';

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
    let args = ['-w', script];
    let options = {maxBuffer: 10 * 1024 * 1024};
    return new Promise((resolve, reject) => child_process.execFile(this._minifier.binary, args, options, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    }));
  }
}
