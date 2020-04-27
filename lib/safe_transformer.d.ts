import { Transformer } from './transformer.js';
/** Removes comments and whitespace from a PHP script, by calling a PHP process. */
export declare class SafeTransformer implements Transformer {
    #private;
    /** The largest amount of data in bytes allowed on `stdout` or `stderr`. */
    static bufferSize: number;
    /**
     * Creates a new safe transformer.
     * @param executable The path to the PHP executable.
     */
    constructor(executable?: string);
    /**
     * Closes this transformer and releases any resources associated with it.
     * @return Completes when the transformer is finally disposed.
     */
    close(): Promise<void>;
    /**
     * Processes a PHP script.
     * @param script The path to the PHP script.
     * @return The transformed script.
     */
    transform(script: string): Promise<string>;
}
