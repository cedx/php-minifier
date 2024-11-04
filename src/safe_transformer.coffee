import {execFile} from "node:child_process"
import {normalize, resolve} from "node:path"
import {promisify} from "node:util"

# Spawns a new process using the specified command.
run = promisify execFile

# Removes comments and whitespace from a PHP script, by calling a PHP process.
export class SafeTransformer

	# Creates a new safe transformer.
	constructor: (executable = "php") ->

		# The path to the PHP executable.
		@_executable = normalize executable

	# Closes this transformer and releases any resources associated with it.
	close: -> Promise.resolve()

	# Processes a PHP script.
	transform: (file) -> (await run @_executable, ["-w", resolve file], maxBuffer: 20 * 1024 * 1024).stdout
