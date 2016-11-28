import child from 'child_process';
import path from 'path';
import {Observable} from 'rxjs';
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
   * Value indicating whether the server is currently listening.
   * @type {boolean}
   */
  get listening() {
    return typeof this._phpServer == 'object' && this._phpServer;
  }

  /**
   * Terminates the underlying PHP process: stops the server from accepting new connections. It does nothing if the server is already closed.
   * @return {Observable} Completes when the PHP process is finally terminated.
   */
  close() {
    return !this.listening ? Observable.of(null) : new Observable(observer => {
      this._phpServer.process.kill();
      this._phpServer = null;
      observer.next();
      observer.complete();
    });
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return {Observable<number>} The port used by the PHP process.
   */
  listen() {
    if (this.listening) return Observable.of(this._phpServer.port);

    let getPort = Observable.bindNodeCallback(portFinder.getPort);
    return getPort().do(port => {
      let address = '127.0.0.1';
      let args = ['-S', `${address}:${port}`, '-t', path.join(__dirname, '../web')];

      this._phpServer = {address, port, process: child.spawn(this.binary, args)};
      this.once('end', () => this.close().subscribe());
    });
  }

  /**
   * Transforms input and produces output.
   * @param {File} file The chunk to be transformed.
   * @param {string} encoding The encoding type if the chunk is a string.
   * @param {function} callback The function to invoke when the supplied chunk has been processed.
   */
  _transform(file, encoding, callback) {
    if (!this.silent) console.log(`Minifying: ${file.path}`);

    this.listen().subscribe(() => superagent
      .get(`http://${this._phpServer.address}:${this._phpServer.port}/index.php`)
      .query({file: file.path})
      .end((err, res) => {
        if (err) callback(new Error(`[${pkg.name}] ${err}`));
        else {
          file.contents = Buffer.from(res.text, encoding);
          callback(null, file);
        }
      }));
  }
}
