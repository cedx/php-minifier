import {execFile} from 'child_process';
import {normalize, resolve} from 'path';
import {promisify} from 'util';
import {Transformer} from './transformer.js';

/** Removes comments and whitespace from a PHP script, by calling a PHP process. */
export class SafeTransformer implements Transformer {

  /** The largest amount of data in bytes allowed on `stdout` or `stderr`. */
  static bufferSize: number = 10 * 1024 * 1024;

  /** The path to the PHP executable. */
  readonly #executable: string;

  /**
   * Creates a new safe transformer.
   * @param executable The path to the PHP executable.
   */
  constructor(executable: string = 'php') {
    this.#executable = executable;
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  close(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  async transform(script: string): Promise<string> {
    const spawn = promisify(execFile);
    const {stdout} = await spawn(normalize(this.#executable), ['-w', resolve(script)], {maxBuffer: SafeTransformer.bufferSize});
    return stdout;
  }
}
