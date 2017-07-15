import {spawn} from 'child_process';
import {createServer} from 'net';
import {join} from 'path';
import {Observable} from 'rxjs';
import superagent from 'superagent';

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer {

  /**
   * The default address that the server is listening on.
   * @type {string}
   */
  static get DEFAULT_ADDRESS() {
    return '127.0.0.1';
  }

  /**
   * Initializes a new instance of the class.
   * @param {Minifier} minifier The instance providing access to the minifier settings.
   */
  constructor(minifier) {
    let handler = () => this.close().subscribe();

    /**
     * The instance providing access to the minifier settings.
     * @type {Minifier}
     */
    this._minifier = minifier;
    this._minifier.on('end', handler).on('error', handler);

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
    return Boolean(this._phpServer && typeof this._phpServer == 'object');
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

    return this._getPort().map(port => {
      let address = FastTransformer.DEFAULT_ADDRESS;
      let args = ['-S', `${address}:${port}`, '-t', join(__dirname, '../web')];
      this._phpServer = {address, port, process: spawn(this._minifier.binary, args)};
      return port;
    }).delay(1000);
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Observable<string>} The transformed script.
   */
  transform(script) {
    let req = superagent
      .get(`http://${this._phpServer.address}:${this._phpServer.port}/index.php`)
      .query({file: script});

    return this.listen()
      .mergeMap(() => Observable.from(req))
      .map(res => res.text);
  }

  /**
   * Gets an ephemeral port chosen by the system.
   * @return {Observable<number>} A port that the server can listen on.
   */
  _getPort() {
    return new Observable(observer => {
      let server = createServer();
      server.unref();
      server.on('error', err => observer.error(err));

      server.listen(0, FastTransformer.DEFAULT_ADDRESS, () => {
        observer.next(server.address().port);
        server.close(() => observer.complete());
      });
    });
  }
}
