import {dirname} from 'path';
import {fileURLToPath, pathToFileURL} from 'url';

/** The base directory of the package. */
export const packageDir = dirname(fileURLToPath(import.meta.url));

/** The base URI of the package. */
export const packageUri = pathToFileURL(packageDir);
