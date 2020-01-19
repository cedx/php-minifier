import { spawn } from 'child_process';
import { createServer } from 'net';
import fetch from 'node-fetch';
import { dirname, join, normalize, resolve } from 'path';
import { fileURLToPath } from 'url';
/** Removes comments and whitespace from a PHP script, by calling a Web service. */
export class FastTransformer {
    /**
     * Creates a new fast transformer.
     * @param _executable The path to the PHP executable.
     */
    constructor(_executable = 'php') {
        this._executable = _executable;
        /** The port that the PHP process is listening on. */
        this._port = -1;
    }
    /** Value indicating whether the PHP process is currently listening. */
    get listening() {
        return Boolean(this._process);
    }
    /**
     * Closes this transformer and releases any resources associated with it.
     * @return Completes when the transformer is finally disposed.
     */
    close() {
        if (this.listening) {
            this._process.kill();
            this._process = undefined;
        }
        return Promise.resolve();
    }
    /**
     * Starts the underlying PHP process: begins accepting connections. It does nothing if the server is already started.
     * @return The port used by the PHP process.
     */
    async listen() {
        if (this.listening)
            return this._port;
        this._port = await this._getPort();
        const serverDir = join(dirname(fileURLToPath(import.meta.url)), 'php');
        const args = ['-S', `${FastTransformer.address}:${this._port}`, '-t', serverDir];
        return new Promise((fulfill, reject) => {
            this._process = spawn(normalize(this._executable), args);
            this._process.on('error', err => reject(err));
            setTimeout(() => fulfill(this._port), 1000);
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
/** The address that the server is listening on. */
FastTransformer.address = '127.0.0.1';
