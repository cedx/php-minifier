import console from "node:console"
import {access, mkdir, readdir, writeFile} from "node:fs/promises"
import {dirname, join, relative, resolve} from "node:path"
import process from "node:process"
import {parseArgs} from "node:util"
import {FastTransformer} from "./fast_transformer.js"
import {SafeTransformer} from "./safe_transformer.js"

# The usage information.
usage = """
Minify PHP source code by removing comments and whitespace.

Usage:
	php_minifier [options] <input> [output]

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
"""

# Start the application.
try
	process.title = "PHP Minifier"

	# Parse the command line arguments.
	{positionals, values} = parseArgs allowPositionals: yes, options:
		binary: {short: "b", type: "string", default: "php"}
		extension: {short: "e", type: "string", default: "php"}
		help: {short: "h", type: "boolean", default: off}
		mode: {short: "m", type: "string", default: "safe"}
		silent: {short: "s", type: "boolean", default: off}
		version: {short: "v", type: "boolean", default: off}

	# Print the usage.
	if values.help
		console.log usage.replaceAll "\t", "  "
		process.exit()

	if values.version
		pkg = await import("../package.json", with: {type: "json"})
		console.log pkg.default.version
		process.exit()

	# Check the requirements.
	unless positionals.length
		console.error "You must provide the path to the input directory."
		process.exit 400

	input = resolve positionals[0]
	try await access input catch
		console.error "The input directory was not found."
		process.exit 404

	# Process the PHP scripts.
	output = if positionals.length > 1 then resolve positionals[1] else input
	transformer = if values.mode is "fast" then new FastTransformer values.binary  else new SafeTransformer values.binary

	files = await readdir input, recursive: yes, withFileTypes: yes
	for file from files.filter (item) -> item.isFile() and item.name.endsWith ".#{values.extension}"
		fullPath = join file.parentPath, file.name
		relativePath = relative input, fullPath
		console.log "Minifying: #{relativePath}" unless values.silent

		script = await transformer.transform join fullPath
		target = join output, relativePath
		await mkdir dirname(target), recursive: true
		await writeFile target, script

	await transformer.close()

catch error
	console.error if error instanceof Error then error.message else error
	process.exit 500
