'use strict';

const {which} = require('@cedx/which');
const {normalize} = require('path');
const {Transform} = require('stream');
const pkg = require('../package.json');
const {TransformMode} = require('./transform_mode.js');
const {Transformer} = require('./transformer.js');

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function.
 */
class Minifier extends Transform {

  /**
   * Initializes a new instance of the class.
   * @param {Object} [options] An object specifying values used to initialize this instance.
   */
  constructor({binary = '', mode = TransformMode.safe, silent = false} = {}) {
    super({objectMode: true});

    /**
     * Value indicating whether to silent the plug-in output.
     * @type {boolean}
     */
    this.silent = silent;

    /**
     * The instance used to process the PHP code.
     * @type {Transformer|string}
     */
    this._transformer = `${mode}:${binary}`;

    // Register the event handlers.
    let handler = async () => {
      if (typeof this._transformer != 'string') await this._transformer.close();
    };

    this.on('end', handler).on('error', handler);
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'Minifier';
  }

  /**
   * Creates a new minifier.
   * @param {Object} [options] The minifier options.
   * @return {Minifier} The newly created instance.
   */
  static factory(options = {}) {
    return new Minifier({
      binary: typeof options.binary == 'string' ? normalize(options.binary) : '',
      mode: TransformMode.coerce(options.mode, TransformMode.safe),
      silent: typeof options.silent == 'boolean' ? options.silent : false
    });
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} [encoding] The encoding type if the chunk is a string.
   * @param {function} [callback] The function to invoke when the supplied chunk has been processed.
   * @return {Promise<File>} The transformed chunk.
   */
  async _transform(file, encoding = 'utf8', callback = null) {
    try {
      if (typeof this._transformer == 'string') {
        let parts = this._transformer.split(':', 2);
        this._transformer = Transformer.factory(parts[0], parts[1].length ? parts[1] : await which('php'));
      }

      if (!this.silent) console.log(`Minifying: ${file.path}`);
      file.contents = Buffer.from(await this._transformer.transform(file.path), encoding);
      if (callback) callback(null, file);
    }

    catch (err) {
      if (callback) callback(new Error(`[${pkg.name}] ${err.message}`));
      else throw err;
    }

    return file;
  }
}

// Module exports.
exports.Minifier = Minifier;
