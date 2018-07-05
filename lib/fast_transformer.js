'use strict';

const {ChildProcess, spawn} = require('child_process');
const {createServer} = require('net');
const fetch = require('node-fetch');
const {join, resolve} = require('path');

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 * @implements {Transformer}
 */
class FastTransformer {

  /**
   * The default address that the server is listening on.
   * @type {string}
   */
  static get defaultAddress() {
    return '127.0.0.1';
  }

  /**
   * Initializes a new instance of the class.
   * @param {string} [executable] The path to the PHP executable.
   */
  constructor(executable = 'php') {

    /**
     * The path to the PHP executable.
     * @type {string}
     */
    this._executable = executable;

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
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'FastTransformer';
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
   */
  async close() {
    if (!this.listening) return;
    this._process.kill();
    this._process = null;
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return {Promise<number>} The port used by the PHP process.
   */
  async listen() {
    if (this.listening) return this._port;

    this._port = await this._getPort();
    return new Promise((resolve, reject) => {
      this._process = spawn(this._executable, ['-S', `${FastTransformer.defaultAddress}:${this._port}`, '-t', join(__dirname, 'php')]);
      this._process.on('error', err => reject(err));
      setTimeout(() => resolve(this._port), 1000);
    });
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    let port = await this.listen();
    let endPoint = new URL(`http://${FastTransformer.defaultAddress}:${port}/server.php`);
    endPoint.searchParams.set('file', resolve(script));

    let res = await fetch(endPoint.href);
    if (!res.ok) throw new Error('An error occurred while transforming the script.');
    return res.text();
  }

  /**
   * Gets an ephemeral port chosen by the system.
   * @return {Promise<number>} A port that the server can listen on.
   */
  async _getPort() {
    return new Promise((resolve, reject) => {
      let server = createServer().unref();
      server.on('error', err => reject(err));
      server.listen(0, FastTransformer.defaultAddress, () => {
        let port = server.address().port;
        server.close(() => resolve(port));
      });
    });
  }
}

// Module exports.
exports.FastTransformer = FastTransformer;
