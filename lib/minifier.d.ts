/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import File from 'vinyl';
/** Defines the type of transformation applied by a minifier. */
export declare enum TransformMode {
    /** Applies a fast transformation. */
    fast = "fast",
    /** Applies a safe transformation. */
    safe = "safe"
}
/** Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function. */
export declare class Minifier extends Transform {
    #private;
    /** The path to the PHP executable. */
    readonly binary: string;
    /** The operational mode. */
    readonly mode: TransformMode;
    /** Value indicating whether to silence the minifier output. */
    silent: boolean;
    /**
     * Creates a new minifier.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(options?: Partial<MinifierOptions>);
    /**
     * Transforms input and produces output.
     * @param file The chunk to transform.
     * @param encoding The encoding type if the chunk is a string.
     * @param callback The function to invoke when the supplied chunk has been processed.
     * @return The transformed chunk.
     */
    _transform(file: File, encoding?: string, callback?: TransformCallback): Promise<File>;
}
/** Defines the options of a [[Minifier]] instance. */
export interface MinifierOptions {
    /** The path to the PHP executable. */
    binary: string;
    /** The operation mode of the minifier. */
    mode: TransformMode;
    /** Value indicating whether to silence the minifier output. */
    silent: boolean;
}
