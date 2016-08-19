/**
 * Implementation of the `Minifier` class.
 * @module minifier
 */
const childProcess = require('child_process');
const path = require('path');
const pkg = require('../package.json');
const portFinder = require('portfinder');
const request = require('superagent');
const {Transform} = require('stream');

/**
 * Removes PHP comments and whitespace by applying the [`php_strip_whitespace()`](http://php.net/manual/en/function.php-strip-whitespace.php) function.
 * @augments stream.Transform
 */
class Minifier extends Transform {

  /**
   * Initializes a new instance of the class.
   * @param {object} [options] The checker settings.
   */
  constructor(options = {}) {
    super({objectMode: true});

    /**
     * The minifier settings.
     * @type {object}
     * @private
     */
    this._options = {
      binary: 'php',
      silent: false
    };

    /**
     * The underlying PHP process.
     * @type {object}
     * @private
     */
    this._phpServer = null;

    // Initialize the instance.
    Object.assign(this._options, options);
    this._options.binary = path.normalize(this._options.binary);
  }

  /**
   * Terminates the underlying PHP process: stops the server from accepting new connections.
   * @returns {Promise} Completes when the PHP process is finally terminated.
   */
  close() {
    if(!this._phpServer) return Promise.reject(new Error('The PHP process is not started or already terminated.'));

    return new Promise(resolve => {
      this._phpServer.process.kill();
      this._phpServer = null;
      resolve();
    });
  }

  /**
   * Starts the underlying PHP process: begins accepting connections.
   * @returns {Promise} Completes when the PHP process has been started.
   */
  listen() {
    if(this._phpServer) return Promise.reject(new Error('The PHP process is already started.'));

    return new Promise((resolve, reject) => portFinder.getPort((err, port) => {
      if(err) reject(err);
      else {
        let host = `127.0.0.1:${port}`;
        let args = ['-S', host, '-t', path.join(__dirname, '../web')];

        this._phpServer = {
          host,
          process: childProcess.spawn(this._options.binary, args)
        };

        this.once('end', () => this.close());
        resolve();
      }
    }));
  }

  /**
   * Transforms input and produces output.
   * @param {vinyl.File} file The chunk to be transformed.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} callback The function to invoke when the supplied chunk has been processed.
   */
  _transform(file, encoding, callback) {
    let promise = this._phpServer ? Promise.resolve() : this.listen();
    promise
      .then(() => {
        if(!this._options.silent) console.log(`Minifying: ${file.path}`);
        return request(`http://${this._phpServer.host}/index.php`).query({file: file.path});
      })
      .then(res => {
        file.contents = Buffer.from(res.text, encoding);
        callback(null, file);
      })
      .catch(err =>
        callback(new Error(`[${pkg.name}] ${err}`))
      );
  }
}

// Public interface.
module.exports = Minifier;
