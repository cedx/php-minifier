import {ChildProcess, spawn} from 'child_process';
import {AddressInfo, createServer} from 'net';
import fetch from 'node-fetch';
import {dirname, normalize, join, resolve} from 'path';
import {fileURLToPath} from 'url';
import {Transformer} from './transformer.js';

/** Removes comments and whitespace from a PHP script, by calling a Web service. */
export class FastTransformer implements Transformer {

  /** The address that the server is listening on. */
  static address: string = '127.0.0.1';

  /** The path to the PHP executable. */
  readonly #executable: string;

  /** The port that the PHP process is listening on. */
  #port: number = -1;

  /** The underlying PHP process. */
  #process?: ChildProcess;

  /**
   * Creates a new fast transformer.
   * @param executable The path to the PHP executable.
   */
  constructor(executable: string = 'php') {
    this.#executable = executable;
  }

  /** Value indicating whether the PHP process is currently listening. */
  get listening(): boolean {
    return Boolean(this.#process);
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  close(): Promise<void> {
    if (this.listening) {
      this.#process!.kill();
      this.#process = undefined;
    }

    return Promise.resolve();
  }

  /**
   * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
   * @return The port used by the PHP process.
   */
  async listen(): Promise<number> {
    if (this.listening) return this.#port;

    this.#port = await this._getPort();
    return new Promise((fulfill, reject) => {
      const libDir = dirname(fileURLToPath(import.meta.url));
      const args = ['-S', `${FastTransformer.address}:${this.#port}`, '-t', join(libDir, 'php')];
      this.#process = spawn(normalize(this.#executable), args);
      this.#process.on('error', err => reject(err));
      setTimeout(() => fulfill(this.#port), 1000);
    });
  }

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  async transform(script: string): Promise<string> {
    const file = encodeURIComponent(resolve(script));
    const port = await this.listen();

    const res = await fetch(`http://${FastTransformer.address}:${port}/?file=${file}`);
    if (!res.ok) throw new Error('An error occurred while transforming the script.');
    return res.text();
  }

  /**
   * Gets an ephemeral port chosen by the system.
   * @return A port that the server can listen on.
   */
  private _getPort(): Promise<number> {
    return new Promise((fulfill, reject) => {
      const server = createServer().unref();
      server.on('error', err => reject(err));
      server.listen(0, FastTransformer.address, () => {
        const {port} = server.address() as AddressInfo;
        server.close(() => fulfill(port));
      });
    });
  }
}
