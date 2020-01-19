import { execFile } from 'child_process';
import { normalize, resolve } from 'path';
import { promisify } from 'util';
/** Removes comments and whitespace from a PHP script, by calling a PHP process. */
export class SafeTransformer {
    /**
     * Creates a new safe transformer.
     * @param _executable The path to the PHP executable.
     */
    constructor(_executable = 'php') {
        this._executable = _executable;
    }
    /**
     * Closes this transformer and releases any resources associated with it.
     * @return Completes when the transformer is finally disposed.
     */
    close() {
        return Promise.resolve();
    }
    /**
     * Processes a PHP script.
     * @param script The path to the PHP script.
     * @return The transformed script.
     */
    async transform(script) {
        const spawn = promisify(execFile);
        const { stdout } = await spawn(normalize(this._executable), ['-w', resolve(script)], { maxBuffer: SafeTransformer.bufferSize });
        return stdout;
    }
}
/** The largest amount of data in bytes allowed on `stdout` or `stderr`. */
SafeTransformer.bufferSize = 10 * 1024 * 1024;
