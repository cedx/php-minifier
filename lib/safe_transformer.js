var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _executable;
import { execFile } from 'child_process';
import { normalize, resolve } from 'path';
import { promisify } from 'util';
/** Removes comments and whitespace from a PHP script, by calling a PHP process. */
export class SafeTransformer {
    /**
     * Creates a new safe transformer.
     * @param executable The path to the PHP executable.
     */
    constructor(executable = 'php') {
        /** The path to the PHP executable. */
        _executable.set(this, void 0);
        __classPrivateFieldSet(this, _executable, executable);
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
        const { stdout } = await spawn(normalize(__classPrivateFieldGet(this, _executable)), ['-w', resolve(script)], { maxBuffer: SafeTransformer.bufferSize });
        return stdout;
    }
}
_executable = new WeakMap();
/** The largest amount of data in bytes allowed on `stdout` or `stderr`. */
SafeTransformer.bufferSize = 10 * 1024 * 1024;
