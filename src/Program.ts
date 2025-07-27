import console from "node:console";
import {access, mkdir, readdir, writeFile} from "node:fs/promises";
import {dirname, join, relative, resolve} from "node:path";
import process from "node:process";
import {parseArgs} from "node:util";
import pkg from "../package.json" with {type: "json"};
import {FastTransformer} from "./FastTransformer.js";
import {SafeTransformer} from "./SafeTransformer.js";

// The usage information.
const usage = `
Minify PHP source code by removing comments and whitespace.

Usage:
	npx @cedx/php-minifier [options] <input> [output]

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
	process.title = "PHP Minifier";

	// Parse the command line arguments.
	const {positionals, values} = parseArgs({allowPositionals: true, options: {
		binary: {short: "b", type: "string", default: "php"},
		extension: {short: "e", type: "string", default: "php"},
		help: {short: "h", type: "boolean", default: false},
		mode: {short: "m", type: "string", default: "safe"},
		silent: {short: "s", type: "boolean", default: false},
		version: {short: "v", type: "boolean", default: false}
	}});

	// Print the usage.
	if (values.help) {
		console.log(usage.trim().replaceAll("\t", "  "));
		process.exit();
	}

	if (values.version) {
		console.log(pkg.version);
		process.exit();
	}

	// Check the requirements.
	if (!positionals.length) {
		console.error("You must provide the path to the input directory.");
		process.exit(400);
	}

	const input = resolve(positionals[0]);
	try { await access(input); }
	catch {
		console.error("The input directory was not found.");
		process.exit(404);
	}

	// Process the PHP scripts.
	const output = positionals.length > 1 ? resolve(positionals[1]) : input;
	await using transformer = values.mode == "fast" ? new FastTransformer(values.binary) : new SafeTransformer(values.binary);

	const files = await readdir(input, {recursive: true, withFileTypes: true});
	for (const file of files.filter(item => item.isFile() && item.name.endsWith(`.${values.extension}`))) {
		const fullPath = join(file.parentPath, file.name);
		const relativePath = relative(input, fullPath);
		if (!values.silent) console.log(`Minifying: ${relativePath}`);

		const script = await transformer.transform(fullPath);
		const target = join(output, relativePath);
		await mkdir(dirname(target), {recursive: true});
		await writeFile(target, script);
	}
}
catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(500);
}
