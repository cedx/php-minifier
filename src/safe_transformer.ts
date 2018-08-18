import {execFile} from 'child_process';
import {resolve} from 'path';
import {promisify} from 'util';
import {Transformer} from './transformer';

/**
 * Removes comments and whitespace from a PHP script, by calling a PHP process.
 */
export class SafeTransformer implements Transformer {

  /**
   * Creates a new safe transformer.
   * @param _executable The path to the PHP executable.
   */
  constructor(private readonly _executable: string = 'php') {}

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'SafeTransformer';
  }

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
    const {stdout} = await exec(this._executable, ['-w', resolve(script)], {maxBuffer: 10 * 1024 * 1024});
    return stdout;
  }
}
