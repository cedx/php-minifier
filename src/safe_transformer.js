import child_process from 'child_process';

/**
 * TODO
 */
export class SafeTransformer {

  /**
   * Initializes a new instance of the class.
   * @param {string} binary The path to the PHP executable.
   */
  constructor(binary) {

    /**
     * The path to the PHP executable.
     * @type {string}
     */
    this._binary = binary;
  }

  /**
   * Transforms a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    let command = `"${this._binary}" -w "${script}"`;
    return new Promise((resolve, reject) => child_process.exec(command, {maxBuffer: 10 * 1024 * 1024}, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    }));
  }
}
