import child_process from 'child_process';
import path from 'path';
import * as pkg from '../package.json';
import portFinder from 'portfinder';
import superagent from 'superagent';
import {Transform} from 'stream';

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
    this.binary = typeof options.binary == 'string' ? path.normalize(options.binary) : 'php';

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
  }

  /**
   * Value indicating whether the PHP process is currently listening.
   * @type {boolean}
   */
  get listening() {
    return this._phpServer && typeof this._phpServer == 'object';
  }

  /**
   * Terminates the underlying PHP process: stops the server from accepting new connections. It does nothing if the server is already closed.
   * @return {Promise} Completes when the PHP process is finally terminated.
   */
  async close() {
    if (this.listening) {
      this._phpServer.process.kill();
      this._phpServer = null;
    }

    return null;
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return {Promise<number>} The port used by the PHP process.
   */
  async listen() {
    if (!this.listening) {
      let getPort = new Promise((resolve, reject) => {
        portFinder.getPort((err, port) => {
          if (err) reject(err);
          else resolve(port);
        });
      });

      let address = '127.0.0.1';
      let port = await getPort;

      let args = ['-S', `${address}:${port}`, '-t', path.join(__dirname, '../web')];
      this._phpServer = {address, port, process: child_process.spawn(this.binary, args, {stdio: 'inherit'})}; // TODO: remove inherit

      let listener = async () => {
        this.removeListener('end', listener).removeListener('error', listener);
        await this.close();
      };

      this.once('end', listener).once('error', listener);
    }

    return this._phpServer.port;
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to transform.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} [callback] The function to invoke when the supplied chunk has been processed.
   * @return {Promise<File>} The transformed chunk.
   */
  async _transform(file, encoding, callback) {
    if (!this.silent) console.log(`Minifying: ${file.path}`);

    try {
      await this.listen();

      let response = await superagent
        .get(`http://${this._phpServer.address}:${this._phpServer.port}/index.php`)
        .query({file: file.path});

      file.contents = Buffer.from(response.text, encoding);
      if (typeof callback == 'function') callback(null, file);
    }

    catch (err) {
      if (typeof callback == 'function') callback(new Error(`[${pkg.name}] ${err}`));
    }

    return file;
  }
}
