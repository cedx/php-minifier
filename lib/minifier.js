'use strict';

const {which} = require('@cedx/which');
const {normalize} = require('path');
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
  constructor(binary = '') {
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
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'Minifier';
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
   * Creates a new minifier.
   * @param {object} [options] The minifier options.
   * @return {Minifier} The newly created instance.
   */
  static factory(options = {}) {
    let minifier = new Minifier(typeof options.binary == 'string' ? normalize(options.binary) : '');
    if (typeof options.mode == 'string') minifier.mode = options.mode;
    if (typeof options.silent == 'boolean') minifier.silent = options.silent;
    return minifier;
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} [encoding] The encoding type if the chunk is a string.
   * @param {function} [callback] The function to invoke when the supplied chunk has been processed.
   * @return {Promise<File>} The transformed chunk.
   */
  async _transform(file, encoding = 'utf8', callback = null) {
    if (!this.silent) console.log(`Minifying: ${file.path}`);

    try {
      if (!this.binary.length) this.binary = await which('php');
      file.contents = Buffer.from(await this._transformer.transform(file.path), encoding);
      if (callback) callback(null, file);
    }

    catch (err) {
      if (callback) callback(new Error(`[${pkgName}] ${err.message}`));
      else throw err;
    }

    return file;
  }
};
