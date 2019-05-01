import {execFile} from 'child_process';
import {normalize, resolve} from 'path';
import {promisify} from 'util';

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 * @implements {Transformer}
 */
export class SafeTransformer {

  /**
   * The largest amount of data in bytes allowed on `stdout` or `stderr`.
   * @type {number}
   */
  static bufferSize = 10 * 1024 * 1024;

  /**
   * The path to the PHP executable.
   * @type {string}
   */
  #executable;

  /**
   * Creates a new safe transformer.
   * @param {string} [executable] The path to the PHP executable.
   */
  constructor(executable = 'php') {
    this.#executable = executable;
  }

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return {Promise<void>} Completes when the transformer is finally disposed.
   */
  close() {
    return Promise.resolve();
  }

  /**
   * Processes a PHP script.
   * @param {string} script The path to the PHP script.
   * @return {Promise<string>} The transformed script.
   */
  async transform(script) {
    const spawn = promisify(execFile);
    const {stdout} = await spawn(normalize(this.#executable), ['-w', resolve(script)], {maxBuffer: SafeTransformer.bufferSize});
    return stdout;
  }
}
