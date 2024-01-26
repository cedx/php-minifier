import console from "node:console";
import {access, mkdir, writeFile} from "node:fs/promises";
import {dirname, join, resolve} from "node:path";
import process from "node:process";
import {parseArgs} from "node:util";
import readdirp from "readdirp";
import pkg from "../../package.json" with {type: "json"};
import usage from "./usage.js";
import {FastTransformer} from "../fast_transformer.js";
import {SafeTransformer} from "../safe_transformer.js";
import {TransformMode} from "../transform_mode.js";

/**
 * Defines the command line options.
 */
interface CliOptions {

	/**
	 * The path to the PHP executable.
	 */
	binary: string;

	/**
	 * The extension of the PHP files to process.
	 */
	extension: string;

	/**
	 * The operation mode of the minifier.
	 */
	mode: string;

	/**
	 * Value indicating whether to silence the minifier output.
	 */
	silent: boolean;
}

/**
 * Application entry point.
 * @returns The application exit code.
 */
async function main(): Promise<number> {
	// Parse the command line arguments.
	const {positionals, values} = parseArgs({allowPositionals: true, options: {
		binary: {short: "b", type: "string", default: false},
		extension: {short: "e", type: "string", default: false},
		help: {short: "h", type: "boolean", default: false},
		mode: {short: "m", type: "string", default: false},
		silent: {short: "s", type: "boolean", default: false},
		version: {short: "v", type: "boolean", default: false}
	}});

	// Print the usage.
	if (values.help || values.version) { // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
		console.log(values.version ? pkg.version : usage.trim());
		return 0;
	}

	// Check the requirements.
	if (!positionals.length) {
		console.error("You must provide the path to the input directory.");
		return 1;
	}

	const input = resolve(positionals[0]);
	try { await access(input); }
	catch {
		console.error("The input directory was not found.");
		return 2;
	}

	// Process the PHP files.
	const output = positionals.length > 1 ? resolve(positionals[1]) : input;
	await processFiles(input, output, values);
	return 0;
}

/**
 * Processes the PHP files located in the specified input directory.
 * @param input The path to the input directory.
 * @param output The path to the output directory.
 * @param options The command line arguments.
 * @returns Resolves when all PHP files have been processed.
 */
async function processFiles(input: string, output: string, options: Partial<CliOptions> = {}): Promise<void> {
	const binary = options.binary ?? "php";
	const extension = options.extension ?? "php";
	const mode = (options.mode ?? "safe") as TransformMode;
	const silent = options.silent ?? false;

	const files = await readdirp.promise(input, {fileFilter: `*.${extension}`});
	const transformer = mode == TransformMode.fast ? new FastTransformer(binary) : new SafeTransformer(binary);
	const promises = files.map(async file => {
		if (!silent) console.log(`Minifying: ${file.path}`);
		const script = await transformer.transform(file.fullPath);
		const path = join(output, file.path);
		await mkdir(dirname(path), {recursive: true});
		return writeFile(path, script);
	});

	for (const promise of promises) await promise;
	return transformer.close();
}

// Start the application.
main().then(exitCode => process.exitCode = exitCode, error => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
