import {FastTransformer, SafeTransformer} from "@cedx/php-minifier";
import console from "node:console";
import {mkdir, readdir, writeFile} from "node:fs/promises";
import {dirname, join, relative} from "node:path";
import {env, loadEnvFile} from "node:process";

// Choose an appropriate transformer.
loadEnvFile();
await using transformer = env.PHPMINIFIER_MODE == "fast" ? new FastTransformer : new SafeTransformer;

// Scan the input directory for PHP files.
const input = "path/to/source/folder";
const files = (await readdir(input, {recursive: true, withFileTypes: true}))
	.filter(item => item.isFile() && item.name.endsWith(".php"));

// Write the transformed files to the output directory.
const output = "path/to/destination/folder";
for (const file of files) {
	const fullPath = join(file.parentPath, file.name);
	const relativePath = relative(input, fullPath);
	console.log(`Minifying: ${relativePath}`);

	const script = await transformer.transform(fullPath);
	const target = join(output, relativePath);
	await mkdir(dirname(target), {recursive: true});
	await writeFile(target, script);
}
