#!/usr/bin/env node
import console from "node:console";
import {access, mkdir, writeFile} from "node:fs/promises";
import {dirname, join, resolve} from "node:path";
import process from "node:process";
import {parseArgs} from "node:util";
import {readdirp} from "readdirp";
import {FastTransformer, SafeTransformer, TransformMode} from "../lib/index.js";
import pkg from "../package.json" with {type: "json"};

// Give the process a friendly name.
process.title = "PHP Minifier";

// The usage information.
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

// Start the application.
try {
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
	if (values.help || values.version) {
		console.log(values.version ? pkg.version : usage.trim());
		process.exit();
	}

	// Check the requirements.
	if (!positionals.length) {
		console.error("You must provide the path to the input directory.");
		process.exit(2);
	}

	const input = resolve(positionals[0]);
	try { await access(input); }
	catch {
		console.error("The input directory was not found.");
		process.exit(3);
	}

	// Process the PHP files.
	const output = positionals.length > 1 ? resolve(positionals[1]) : input;
	const transformer = values.mode == TransformMode.fast ? new FastTransformer(values.binary) : new SafeTransformer(values.binary);

	for await (const file of readdirp(input, {fileFilter: `*.${values.extension}`})) {
		if (!values.silent) console.log(`Minifying: ${file.path}`);
		const script = await transformer.transform(file.fullPath);
		const path = join(output, file.path);
		await mkdir(dirname(path), {recursive: true});
		await writeFile(path, script);
	}

	await transformer.close();
}
catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}
