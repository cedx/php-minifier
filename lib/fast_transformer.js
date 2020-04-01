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
var _executable, _port, _process;
import { spawn } from 'child_process';
import { createServer } from 'net';
import fetch from 'node-fetch';
import { dirname, normalize, resolve } from 'path';
import { fileURLToPath } from 'url';
/** Removes comments and whitespace from a PHP script, by calling a Web service. */
export class FastTransformer {
    /**
     * Creates a new fast transformer.
     * @param executable The path to the PHP executable.
     */
    constructor(executable = 'php') {
        /** The path to the PHP executable. */
        _executable.set(this, void 0);
        /** The port that the PHP process is listening on. */
        _port.set(this, -1);
        /** The underlying PHP process. */
        _process.set(this, void 0);
        __classPrivateFieldSet(this, _executable, executable);
    }
    /** Value indicating whether the PHP process is currently listening. */
    get listening() {
        return Boolean(__classPrivateFieldGet(this, _process));
    }
    /**
     * Closes this transformer and releases any resources associated with it.
     * @return Completes when the transformer is finally disposed.
     */
    close() {
        if (this.listening) {
            __classPrivateFieldGet(this, _process).kill();
            __classPrivateFieldSet(this, _process, undefined);
        }
        return Promise.resolve();
    }
    /**
     * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
     * @return The port used by the PHP process.
     */
    async listen() {
        if (this.listening)
            return __classPrivateFieldGet(this, _port);
        __classPrivateFieldSet(this, _port, await this._getPort());
        return new Promise((fulfill, reject) => {
            const args = ['-S', `${FastTransformer.address}:${__classPrivateFieldGet(this, _port)}`, '-t', dirname(fileURLToPath(import.meta.url))];
            __classPrivateFieldSet(this, _process, spawn(normalize(__classPrivateFieldGet(this, _executable)), args));
            __classPrivateFieldGet(this, _process).on('error', err => reject(err));
            setTimeout(() => fulfill(__classPrivateFieldGet(this, _port)), 1000);
        });
    }
    /**
     * Processes a PHP script.
     * @param script The path to the PHP script.
     * @return The transformed script.
     */
    async transform(script) {
        const file = encodeURIComponent(resolve(script));
        const port = await this.listen();
        const res = await fetch(`http://${FastTransformer.address}:${port}/server.php?file=${file}`);
        if (!res.ok)
            throw new Error('An error occurred while transforming the script.');
        return res.text();
    }
    /**
     * Gets an ephemeral port chosen by the system.
     * @return A port that the server can listen on.
     */
    _getPort() {
        return new Promise((fulfill, reject) => {
            const server = createServer().unref();
            server.on('error', err => reject(err));
            server.listen(0, FastTransformer.address, () => {
                const { port } = server.address();
                server.close(() => fulfill(port));
            });
        });
    }
}
_executable = new WeakMap(), _port = new WeakMap(), _process = new WeakMap();
/** The address that the server is listening on. */
FastTransformer.address = '127.0.0.1';
