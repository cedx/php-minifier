import child_process from 'child_process';
import path from 'path';
import portFinder from 'portfinder';
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

    /**
     * The instance providing access to the minifier settings.
     * @type {Minifier}
     */
    this._minifier = minifier;

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
    if (this.listening) return this._phpServer.port;

    const getPort = () => new Promise((resolve, reject) => portFinder.getPort((err, port) => {
      if (err) reject(err);
      else resolve(port);
    }));

    let address = FastTransformer.DEFAULT_ADDRESS;
    let port = await getPort();

    return new Promise(resolve => {
      let handler = async () => await this.close();
      this._minifier.once('end', handler).once('error', handler);

      let args = ['-S', `${address}:${port}`, '-t', path.join(__dirname, '../web')];
      this._phpServer = {address, port, process: child_process.spawn(this._minifier.binary, args)};
      setTimeout(() => resolve(port), 1000);
    });
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    await this.listen();

    let response = await superagent
      .get(`http://${this._phpServer.address}:${this._phpServer.port}/index.php`)
      .query({file: script});

    return response.text;
  }
}
