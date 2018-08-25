import {ChildProcess, spawn} from 'child_process';
import {AddressInfo, createServer} from 'net';
import fetch from 'node-fetch';
import {join, normalize, resolve} from 'path';
import {Transformer} from './transformer';

/**
 * Removes comments and whitespace from a PHP script, by calling a Web service.
 */
export class FastTransformer implements Transformer {

  /**
   * The default address that the server is listening on.
   */
  static defaultAddress: string = '127.0.0.1';

  /**
   * The port that the PHP process is listening on.
   */
  private _port: number = -1;

  /**
   * The underlying PHP process.
   */
  private _process: ChildProcess | null = null;

  /**
   * Creates a new fast transformer.
   * @param _executable The path to the PHP executable.
   */
  constructor(private readonly _executable: string = 'php') {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'FastTransformer';
  }

  /**
   * Value indicating whether the PHP process is currently listening.
   */
  get listening(): boolean {
    return this._process != null;
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  async close(): Promise<void> {
    if (!this.listening) return;
    this._process!.kill();
    this._process = null;
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return The port used by the PHP process.
   */
  async listen(): Promise<number> {
    if (this.listening) return this._port;
    this._port = await this._getPort();

    return new Promise<number>((fulfill, reject) => {
      this._process = spawn(normalize(this._executable), ['-S', `${FastTransformer.defaultAddress}:${this._port}`, '-t', join(__dirname, 'php')], {shell: true});
      this._process.on('error', err => reject(err));
      setTimeout(() => fulfill(this._port), 1000);
    });
  }

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  async transform(script: string): Promise<string> {
    const port = await this.listen();
    const endPoint = new URL(`http://${FastTransformer.defaultAddress}:${port}/server.php`);
    endPoint.searchParams.set('file', resolve(script));

    const res = await fetch(endPoint.href);
    if (!res.ok) throw new Error('An error occurred while transforming the script.');
    return res.text();
  }

  /**
   * Gets an ephemeral port chosen by the system.
   * @return A port that the server can listen on.
   */
  private _getPort(): Promise<number> {
    return new Promise<number>((fulfill, reject) => {
      const server = createServer().unref();
      server.on('error', err => reject(err));
      server.listen(0, FastTransformer.defaultAddress, () => {
        const port = (server.address() as AddressInfo).port;
        server.close(() => fulfill(port));
      });
    });
  }
}
