'use strict';

const {ChildProcess, spawn} = require('child_process');
const {createServer} = require('net');
const fetch = require('node-fetch');
const {join} = require('path');
const {Observable} = require('rxjs');
const {URL} = require('url');

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
exports.FastTransformer = class FastTransformer {

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
     * The port that the PHP process is listening on.
     * @type {number}
     */
    this._port = -1;

    /**
     * The underlying PHP process.
     * @type {ChildProcess}
     */
    this._process = null;
  }

  /**
   * Value indicating whether the PHP process is currently listening.
   * @type {boolean}
   */
  get listening() {
    return this._process instanceof ChildProcess;
  }

  /**
   * Terminates the underlying PHP process: stops the server from accepting new connections. It does nothing if the server is already closed.
   * @return {Observable} Completes when the PHP process is finally terminated.
   */
  close() {
    return !this.listening ? Observable.empty() : new Observable(observer => {
      this._process.kill();
      this._process = null;
      observer.next();
      observer.complete();
    });
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return {Observable<number>} The port used by the PHP process.
   */
  listen() {
    return this.listening ? Observable.of(this._port) : this._getPort().map(port => {
      this._process = spawn(this._minifier.binary, ['-S', `${FastTransformer.DEFAULT_ADDRESS}:${port}`, '-t', join(__dirname, '../web')]);
      this._port = port;
      return this._port;
    }).delay(1000);
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Observable<string>} The transformed script.
   */
  transform(script) {
    return this.listen()
      .mergeMap(port => {
        let endPoint = new URL(`http://${FastTransformer.DEFAULT_ADDRESS}:${port}/index.php`);
        endPoint.searchParams.set('file', script);
        return Observable.from(fetch(endPoint.href));
      })
      .mergeMap(res => Observable.from(res.text()));
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
};
