import path from 'path';
import {Transform} from 'stream';
import which from 'which';

import * as pkg from '../package.json';
import {FastTransformer} from './fast_transformer';
import {SafeTransformer} from './safe_transformer';

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function.
 */
export class Minifier extends Transform {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] The checker settings.
   */
  constructor(options = {}) {
    super({objectMode: true});

    /**
     * The path to the PHP executable.
     * @type {string}
     */
    this.binary = typeof options.binary == 'string' ? path.normalize(options.binary) : which.sync('php');

    /**
     * The transformation type.
     * @type {string}
     */
    this.mode = typeof options.mode == 'string' ? options.mode : 'safe';

    /**
     * Value indicating whether to silent the plug-in output.
     * @type {boolean}
     */
    this.silent = typeof options.silent == 'boolean' ? options.silent : false;

    /**
     * The underlying PHP process.
     * @type {object}
     */
    this._phpServer = null;

    /**
     * The instance used to process the PHP code.
     * @type {object}
     */
    this._transformer = this.mode == 'fast' ? new FastTransformer(this) : new SafeTransformer(this);
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
      if (typeof callback == 'function') callback(new Error(`[${pkg.name}] ${err.message}`));
    }

    return file;
  }
}
