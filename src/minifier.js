import {Transform} from 'stream';

import {name as pkgName} from '../package.json';
import {FastTransformer} from './fast_transformer';
import {SafeTransformer} from './safe_transformer';

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function.
 */
export class Minifier extends Transform {

  /**
   * Initializes a new instance of the class.
   * @param {string} [binary] The path to the PHP executable.
   */
  constructor(binary = 'php') {
    super({objectMode: true});

    /**
     * The path to the PHP executable.
     * @type {string}
     */
    this.binary = binary;

    /**
     * Value indicating whether to silent the plug-in output.
     * @type {boolean}
     */
    this.silent = false;

    /**
     * The underlying PHP process.
     * @type {object}
     */
    this._phpServer = null;

    /**
     * The instance used to process the PHP code.
     * @type {object}
     */
    this._transformer = new SafeTransformer(this);
  }

  /**
   * The transformation type.
   * @type {string}
   */
  get mode() {
    return this._transformer instanceof FastTransformer ? 'fast' : 'safe';
  }

  /**
   * Sets the transformation type.
   * @param {string} value The new transformation type.
   */
  set mode(value) {
    this._transformer = String(value) == 'fast' ? new FastTransformer(this) : new SafeTransformer(this);
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} [callback] The function to invoke when the supplied chunk has been processed.
   * @return {Promise<File>} The transformed chunk.
   */
  async _transform(file, encoding, callback) {
    try {
      if (!this.silent) console.log(`Minifying: ${file.path}`);

      let data = await this._transformer.transform(file.path);
      file.contents = Buffer.from(data, encoding);

      if (typeof callback == 'function') callback(null, file);
    }

    catch (err) {
      if (typeof callback == 'function') callback(new Error(`[${pkgName}] ${err.message}`));
    }

    return file;
  }
}
