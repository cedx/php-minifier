import {spawn} from 'child_process';
import {createServer} from 'net';
import fetch from 'node-fetch';
import {join, normalize, resolve} from 'path';

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 * @implements {Transformer}
 */
export class FastTransformer {

  /**
   * The default address that the server is listening on.
   * @type {string}
   */
  static get defaultAddress() {
    return '127.0.0.1';
  }

  /**
   * The path to the PHP executable.
   * @type {string}
   */
  #executable;

  /**
   * The port that the PHP process is listening on.
   * @type {number}
   */
  #port = -1;

  /**
   * The underlying PHP process.
   * @type {?module:child_process.ChildProcess}
   */
  #process = null;

  /**
   * Creates a new fast transformer.
   * @param {string} [executable] The path to the PHP executable.
   */
  constructor(executable = 'php') {
    this.#executable = executable;
  }

  /**
   * Value indicating whether the PHP process is currently listening.
   * @type {boolean}
   */
  get listening() {
    return this.#process != null;
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return {Promise<void>} Completes when the transformer is finally disposed.
   */
  async close() {
    if (!this.listening) return;
    this.#process.kill();
    this.#process = null;
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return {Promise<number>} The port used by the PHP process.
   */
  async listen() {
    if (this.listening) return this.#port;
    this.#port = await this._getPort();

    const args = ['-S', `${FastTransformer.defaultAddress}:${this.#port}`, '-t', join(__dirname, 'php')];
    return new Promise((fulfill, reject) => {
      this.#process = spawn(normalize(this.#executable), args);
      this.#process.on('error', err => reject(err));
      setTimeout(() => fulfill(this.#port), 1000);
    });
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    const port = await this.listen();
    const endPoint = new URL(`http://${FastTransformer.defaultAddress}:${port}/server.php`);
    endPoint.searchParams.set('file', resolve(script));

    const res = await fetch(endPoint.href);
    if (!res.ok) throw new Error('An error occurred while transforming the script.');
    return res.text();
  }

  /**
   * Gets an ephemeral port chosen by the system.
   * @return {Promise<number>} A port that the server can listen on.
   */
  _getPort() {
    return new Promise((fulfill, reject) => {
      /** @type {module:net.Server} */
      const server = createServer().unref();
      server.on('error', err => reject(err));
      server.listen(0, FastTransformer.defaultAddress, () => {
        const {port} = server.address();
        server.close(() => fulfill(port));
      });
    });
  }
}
