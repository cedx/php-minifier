import {which} from '@cedx/which';
import * as log from 'fancy-log';
import {Transform, TransformCallback} from 'stream';
import * as File from 'vinyl';

// @ts-ignore: disable processing of the imported JSON file.
import * as pkg from '../package.json';
import {FastTransformer} from './fast_transformer';
import {SafeTransformer} from './safe_transformer';
import {TransformMode} from './transform_mode';
import {Transformer} from './transformer';

/**
 * Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function.
 */
export class Minifier extends Transform {

  /**
   * The path to the PHP executable.
   */
  readonly binary: string;

  /**
   * The operational mode.
   */
  readonly mode: TransformMode;

  /**
   * Value indicating whether to silent the minifier output.
   */
  silent: boolean;

  /**
   * The instance used to process the PHP code.
   */
  private _transformer: Transformer | null = null;

  /**
   * Creates a new minifier.
   * @param options An object specifying values used to initialize this instance.
   */
  constructor(options: Partial<MinifierOptions> = {}) {
    super({objectMode: true});

    const {binary = '', mode = TransformMode.safe, silent = false} = options;
    this.binary = binary;
    this.mode = mode;
    this.silent = silent;

    const handler = async () => { if (this._transformer) await this._transformer.close(); };
    this.on('end', handler).on('error', handler);
  }

  /**
   * Transforms input and produces output.
   * @param file The chunk to transform.
   * @param encoding The encoding type if the chunk is a string.
   * @param callback The function to invoke when the supplied chunk has been processed.
   * @return The transformed chunk.
   */
  async _transform(file: File, encoding: string = 'utf8', callback?: TransformCallback): Promise<File> {
    try {
      if (!this._transformer) {
        const executable = this.binary.length ? this.binary : await which('php', {onError: () => 'php'}) as string;
        this._transformer = this.mode == TransformMode.fast ? new FastTransformer(executable) : new SafeTransformer(executable);
      }

      if (!this.silent) log(`Minifying: ${file.path}`);
      file.contents = Buffer.from(await this._transformer.transform(file.path), encoding);
      if (callback) callback(undefined, file);
    }

    catch (err) {
      if (callback) callback(new Error(`[${pkg.name}] ${err.message}`));
      else throw err;
    }

    return file;
  }
}

/**
 * Defines the options of a [[Minifier]] instance.
 */
export interface MinifierOptions {

  /**
   * The path to the PHP executable.
   */
  binary: string;

  /**
   * The operation mode of the minifier.
   */
  mode: TransformMode;

  /**
   * Value indicating whether to silent the minifier output.
   */
  silent: boolean;
}
