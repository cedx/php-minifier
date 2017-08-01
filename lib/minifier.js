'use strict';

const {Transform} = require('stream');
const {name: pkgName} = require('../package.json');
const {FastTransformer} = require('./fast_transformer');
const {SafeTransformer} = require('./safe_transformer');

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function.
 */
exports.Minifier = class Minifier extends Transform {

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
    this._transformer = value == 'fast' ? new FastTransformer(this) : new SafeTransformer(this);
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} callback The function to invoke when the supplied chunk has been processed.
   */
  _transform(file, encoding, callback) {
    if (!this.silent) console.log(`Minifying: ${file.path}`);

    this._transformer.transform(file.path).subscribe({
      error: err => callback(new Error(`[${pkgName}] ${err.message}`)),
      next: data => {
        file.contents = Buffer.from(data, encoding);
        callback(null, file);
      }
    });
  }
};