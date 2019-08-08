import {dirname} from 'path';
import {fileURLToPath} from 'url';

/** The directory name of the current module. */
export const __dirname = dirname(fileURLToPath(import.meta.url));
