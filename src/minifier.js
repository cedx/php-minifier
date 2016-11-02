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
   * Terminates the underlying PHP process: stops the server from accepting new connections.
   * @return {Observable} Completes when the PHP process is finally terminated.
   */
  close() {
    if (!this._phpServer) return Observable.throw(new Error('The PHP process is not started.'));

    return new Observable(observer => {
      this._phpServer.process.kill();
      this._phpServer = null;
      observer.complete();
    });
  }

  /**
   * Starts the underlying PHP process: begins accepting connections.
   * @return {Observable<number>} The port used by the PHP process.
   */
  listen() {
    if (this._phpServer) return Observable.throw(new Error('The PHP process is already started.'));

    let getPort = Observable.bindNodeCallback(portFinder.getPort);
    return getPort().do(port => {
      let host = `127.0.0.1:${port}`;
      let args = ['-S', host, '-t', path.join(__dirname, '../web')];

      this._phpServer = {host, process: child.spawn(this.binary, args)};
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

    let request = superagent
      .get(`http://${this._phpServer.host}/index.php`)
      .query({file: file.path});

    // let promise = this._phpServer ? Promise.resolve() : this.listen();
    let fetch = Observable.bindNodeCallback(request.end.bind(request));
    fetch()
      .map(res => {
        file.contents = Buffer.from(res.text, encoding);
        return file;
      })
      .subscribe(
        file => callback(null, file),
        err => callback(new Error(`[${pkg.name}] ${err}`))
      );
  }
}
