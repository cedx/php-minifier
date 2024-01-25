import {execSync} from "node:child_process";
import {parseJson} from "./tools.js";

/**
 * Publishes the package.
 */
const {version} = await parseJson("../package.json");
["tag", "push origin"].forEach(action => execSync(`git ${action} v${version}`));
