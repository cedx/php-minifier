import {rmSync} from "node:fs";
import {cleanDirectory} from "./tools.js";

/**
 * Deletes all generated files.
 */
rmSync("lib", {force: true, recursive: true});
cleanDirectory("var");
