import {readFileSync, readdirSync, rmSync, writeFileSync} from "node:fs";
import {EOL} from "node:os";
import {join} from "node:path";

/**
 * Recursively deletes all files in the specified directory.
 * @param {string} directory The directory to clean.
 */
export function cleanDirectory(directory) {
	readdirSync(directory).filter(item => item != ".gitkeep").forEach(item => rmSync(join(directory, item), {force: true, recursive: true}));
}

/**
 * Parses the content of the specified JSON file.
 * @param {string} path The relative path to the JSON file.
 * @returns {any} The parsed content.
 */
export function parseJson(path) {
	return JSON.parse(readFileSync(new URL(path, import.meta.url), {encoding: "utf8"}));
}

/**
 * Adds a shebang to the specified source file.
 * @param {string} path The path to the source file.
 * @param {string} executable The name of the executable to prepend.
 */
export function shebang(path, executable = "node") {
	writeFileSync(path, `#!/usr/bin/env ${executable}${EOL}${readFileSync(path, {encoding: "utf8"})}`);
}
