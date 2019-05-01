import {which} from '@cedx/which';
import log from 'fancy-log';
import {Transform} from 'stream';
import {Transformer} from './transformer.js';

/** Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function. */
export class Minifier extends Transform {

  /**
   * The path to the PHP executable.
   * @type {string}
   */
  binary;

  /**
   * The operational mode.
   * @type {TransformMode}
   */
  mode;

  /**
   * Value indicating whether to silent the minifier output.
   * @type {boolean}
   */
  silent;

  /**
   * The instance used to process the PHP code.
   * @type {Transformer}
   */
  #transformer = null;

  /**
   * Creates a new minifier.
   * @param {MinifierOptions} [options] An object specifying values used to initialize this instance.
   */
  constructor(options = {}) {
    super({objectMode: true});

    const {binary = '', mode = TransformMode.safe, silent = false} = options;
    this.binary = binary;
    this.mode = mode;
    this.silent = silent;

    const handler = async () => { if (this.#transformer) await this.#transformer.close(); };
    this.on('end', handler).on('error', handler);
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} [encoding] The encoding type if the chunk is a string.
   * @param {TransformCallback} [callback] The function to invoke when the supplied chunk has been processed.
   * @return {void} The transformed chunk.
   */
  async _transform(file, encoding = 'utf8', callback = null) {
    try {
      if (!this.#transformer) {
        const executable = this.binary.length ? this.binary : await which('php', {onError: () => 'php'});
        this.#transformer = new Transformer(this.mode, executable);
      }

      if (!this.silent) log(`Minifying: ${file.path}`);
      file.contents = Buffer.from(await this.#transformer.transform(file.path), encoding);
      if (callback) callback(null, file);
    }

    catch (err) {
      if (callback) callback(new Error(`[@cedx/gulp-php-minify] ${err.message}`));
      else throw err;
    }

    return file;
  }
}

/**
 * Defines the options of a {@link Minifier} instance.
 * @typedef {object} MinifierOptions
 * @property {string} [binary] The path to the PHP executable.
 * @property {TransformMode} [mode] The operation mode of the minifier.
 * @property {boolean} [silent] Value indicating whether to silent the minifier output.
 */

/**
 * The function to invoke when a supplied chunk has been processed.
 * @callback TransformCallback
 * @param {Error} [error]
 * @param {File} [data]
 */

/**
 * Defines the type of transformation applied by a minifier.
 * @enum {string}
 */
export const TransformMode = Object.freeze({

  /** Applies a fast transformation. */
  fast: 'fast',

  /** Applies a safe transformation. */
  safe: 'safe'
});
