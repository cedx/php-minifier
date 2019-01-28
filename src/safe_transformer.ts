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
   * The class name.
   */
  readonly [Symbol.toStringTag]: string = 'SafeTransformer';

  /**
   * Creates a new safe transformer.
   * @param _executable The path to the PHP executable.
   */
  constructor(private readonly _executable: string = 'php') {}

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  async close(): Promise<void> {
    return undefined;
  }

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  async transform(script: string): Promise<string> {
    const exec = promisify(execFile);
    const {stdout} = await exec(normalize(this._executable), ['-w', resolve(script)], {maxBuffer: SafeTransformer.bufferSize});
    return stdout;
  }
}
