/**
 * Implementation of the `PHPMinifier` class.
 * @module php_minifier
 */
'use strict';

// module dependencies.
const child = require('child_process');
const path = require('path');
const pkg = require('../package.json');
const Transform = require('stream').Transform;

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](http://php.net/manual/en/function.php-strip-whitespace.php) function.
 * @extends stream.Transform
 */
class PHPMinifier extends Transform {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] The checker settings.
   */
  constructor(options) {
    super({objectMode: true});

    /**
     * The minifier settings.
     * @var {object}
     * @private
     */
    this._options = {binary: 'php'};
    if(typeof options == 'object' && options) Object.assign(this._options, options);
    this._options.binary = path.normalize(this._options.binary);
  }

  /**
   * Transforms input and produces output.
   * @param {vinyl.File} file The chunk to be transformed.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} callback The function to invoke when the supplied chunk has been processed.
   */
  _transform(file, encoding, callback) {
    child.exec(`"${this._options.binary}" -w "${file.path}"`, {maxBuffer: 5 * 1024 * 1024}, (err, stdout) => {
      if(err) callback(new Error(`[${pkg.name}] ${err}`));
      else {
        file.contents = new Buffer(stdout, encoding);
        callback(null, file);
      }
    });
  }
}

// Public interface.
module.exports = PHPMinifier;
