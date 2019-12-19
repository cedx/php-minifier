import {pathToFileURL} from 'url';

/** The base directory of the package. */
export const packageDir: string = __dirname;

/** The base URI of the package. */
export const packageUri: URL = pathToFileURL(packageDir);
