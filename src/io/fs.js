import {dirname} from 'path';
import {fileURLToPath} from 'url';

/** The base directory of the package. */
export const libDir = dirname(dirname(fileURLToPath(import.meta.url)));
