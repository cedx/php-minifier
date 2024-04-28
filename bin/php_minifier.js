#!/usr/bin/env node
import console from "node:console";
import {access, mkdir, writeFile} from "node:fs/promises";
import {dirname, join, resolve} from "node:path";
import {exit} from "node:process";
import {parseArgs} from "node:util";
import readdirp from "readdirp";
import pkg from "../package.json" with {type: "json"};
import {FastTransformer, SafeTransformer, TransformMode} from "../src/index.js";

/**
 * The usage information.
 */
const usage = `
Minify PHP source code by removing comments and whitespace.

Usage:
  npx @cedx/php-minifier [options] <input> <output>

Arguments:
  input            The path to the input directory.
  output           The path to the output directory.

Options:
  -b, --binary     The path to the PHP executable.
  -e, --extension  The extension of the PHP files to process. Defaults to "php".
  -m, --mode       The operation mode of the minifier. Defaults to "safe".
  -s, --silent     Value indicating whether to silence the minifier output.
  -h, --help       Display this help.
  -v, --version    Output the version number.
`;

/**
 * Defines the command line options.
 * @typedef {object} CliOptions
 * @property {string} binary The path to the PHP executable.
 * @property {string} extension The extension of the PHP files to process.
 * @property {string} mode The operation mode of the minifier.
 * @property {boolean} silent Value indicating whether to silence the minifier output.
 */

/**
 * Application entry point.
 * @returns {Promise<void>} Resolves when the application is terminated.
 */
async function main() {
	// Parse the command line arguments.
	const {positionals, values} = parseArgs({allowPositionals: true, options: {
		binary: {short: "b", type: "string", default: "php"},
		extension: {short: "e", type: "string", default: "php"},
		help: {short: "h", type: "boolean", default: false},
		mode: {short: "m", type: "string", default: TransformMode.safe},
		silent: {short: "s", type: "boolean", default: false},
		version: {short: "v", type: "boolean", default: false}
	}});

	// Print the usage.
	if (values.help || values.version) return console.log(values.version ? pkg.version : usage.trim());

	// Check the requirements.
	if (!positionals.length) throw Error("You must provide the path to the input directory.");

	const input = resolve(positionals[0]);
	try { await access(input); }
	catch { throw Error("The input directory was not found."); }

	// Process the PHP files.
	const output = positionals.length > 1 ? resolve(positionals[1]) : input;
	return processFiles(input, output, values);
}

/**
 * Processes the PHP files located in the specified input directory.
 * @param {string} input The path to the input directory.
 * @param {string} output The path to the output directory.
 * @param {Partial<CliOptions>} options The command line arguments.
 * @returns {Promise<void>} Resolves when all PHP files have been processed.
 */
async function processFiles(input, output, options = {}) {
	const binary = options.binary ?? "php";
	const silent = options.silent ?? false;

	const transformer = (options.mode ?? "safe") == TransformMode.fast ? new FastTransformer(binary) : new SafeTransformer(binary);
	for await (const file of readdirp(input, {fileFilter: `*.${options.extension ?? "php"}`})) {
		if (!silent) console.log(`Minifying: ${file.path}`);
		const script = await transformer.transform(file.fullPath);
		const path = join(output, file.path);
		await mkdir(dirname(path), {recursive: true});
		await writeFile(path, script);
	}

	return transformer.close();
}

// Start the application.
main().catch(error => {
	console.error(error instanceof Error ? error.message : error);
	exit(1);
});
