import {execFile} from 'child_process';
import {normalize, resolve} from 'path';
import {promisify} from 'util';
import {Transformer} from './transformer';

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer implements Transformer {

  /**
   * The largest amount of data in bytes allowed on `stdout` or `stderr`.
   */
  static bufferSize: number = 8 * 1024 * 1024;

  /**
   * Creates a new safe transformer.
   * @param _executable The path to the PHP executable.
   */
  constructor(private readonly _executable: string = 'php') {}

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
    const {stdout} = await spawn(normalize(this._executable), ['-w', resolve(script)], {maxBuffer: SafeTransformer.bufferSize});
    return stdout;
  }
}
