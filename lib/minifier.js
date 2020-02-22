var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _transformer;
import { which } from '@cedx/which';
import log from 'fancy-log';
import { normalize } from 'path';
import { Transform } from 'stream';
import { FastTransformer } from './fast_transformer.js';
import { SafeTransformer } from './safe_transformer.js';
/** Defines the type of transformation applied by a minifier. */
export var TransformMode;
(function (TransformMode) {
    /** Applies a fast transformation. */
    TransformMode["fast"] = "fast";
    /** Applies a safe transformation. */
    TransformMode["safe"] = "safe";
})(TransformMode || (TransformMode = {}));
/** Removes PHP comments and whitespace by applying the `php_strip_whitespace()` function. */
export class Minifier extends Transform {
    /**
     * Creates a new minifier.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(options = {}) {
        super({ objectMode: true });
        /** The instance used to process the PHP code. */
        _transformer.set(this, void 0);
        const { binary = '', mode = TransformMode.safe, silent = false } = options;
        this.binary = binary;
        this.mode = mode;
        this.silent = silent;
        const handler = async () => { if (__classPrivateFieldGet(this, _transformer))
            await __classPrivateFieldGet(this, _transformer).close(); };
        this.on('end', handler).on('error', handler); // eslint-disable-line @typescript-eslint/no-misused-promises
    }
    /**
     * Transforms input and produces output.
     * @param file The chunk to transform.
     * @param encoding The encoding type if the chunk is a string.
     * @param callback The function to invoke when the supplied chunk has been processed.
     * @return The transformed chunk.
     */
    async _transform(file, encoding = 'utf8', callback) {
        try {
            if (!__classPrivateFieldGet(this, _transformer)) {
                const executable = this.binary.length ? normalize(this.binary) : await which('php', { onError: () => 'php' });
                __classPrivateFieldSet(this, _transformer, this.mode == TransformMode.fast ? new FastTransformer(executable) : new SafeTransformer(executable));
            }
            if (!this.silent)
                log(`Minifying: ${file.path}`);
            file.contents = Buffer.from(await __classPrivateFieldGet(this, _transformer).transform(file.path), encoding); // eslint-disable-line require-atomic-updates
            if (callback)
                callback(null, file);
        }
        catch (err) {
            if (callback)
                callback(new Error(`[@cedx/gulp-php-minify] ${err.message}`));
            else
                throw err;
        }
        return file;
    }
}
_transformer = new WeakMap();
