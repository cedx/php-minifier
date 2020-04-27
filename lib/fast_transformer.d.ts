import { Transformer } from './transformer.js';
/** Removes comments and whitespace from a PHP script, by calling a Web service. */
export declare class FastTransformer implements Transformer {
    #private;
    /** The address that the server is listening on. */
    static address: string;
    /**
     * Creates a new fast transformer.
     * @param executable The path to the PHP executable.
     */
    constructor(executable?: string);
    /** Value indicating whether the PHP process is currently listening. */
    get listening(): boolean;
    /**
     * Closes this transformer and releases any resources associated with it.
     * @return Completes when the transformer is finally disposed.
     */
    close(): Promise<void>;
    /**
     * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
     * @return The port used by the PHP process.
     */
    listen(): Promise<number>;
    /**
     * Processes a PHP script.
     * @param script The path to the PHP script.
     * @return The transformed script.
     */
    transform(script: string): Promise<string>;
    /**
     * Gets an ephemeral port chosen by the system.
     * @return A port that the server can listen on.
     */
    private _getPort;
}
