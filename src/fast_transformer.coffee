import {spawn} from "node:child_process"
import {createServer} from "node:net"
import {join, normalize, resolve} from "node:path"
import {setTimeout} from "node:timers"

# Removes comments and whitespace from a PHP script, by calling a Web service.
export class FastTransformer

	# Creates a new fast transformer.
	constructor: (executable = "php") ->

		# The path to the PHP executable.
		@_executable = normalize executable

		# The port that the PHP process is listening on.
		@_port = -1

		# The underlying PHP process.
		@_process = null

	# Closes this transformer and releases any resources associated with it.
	close: ->
		@_process?.kill()
		@_process = null
		Promise.resolve()

	# Starts the underlying PHP process and begins accepting connections.
	listen: -> if @_process? then Promise.resolve @_port else
		@_port = await @_getPort()
		args = ["-S", "127.0.0.1:#{@_port}", "-t", join(import.meta.dirname, "../www")]
		new Promise (fulfill, reject) =>
			spawn @_executable, args, stdio: ["ignore", "pipe", "ignore"]
				.on "error", reject
				.on "spawn", => setTimeout (=> fulfill @_port), 1000

	# Processes a PHP script.
	transform: (file) ->
		await @listen()
		url = new URL "http://127.0.0.1:#{@_port}/index.php"
		url.searchParams.set "file", resolve(file)

		response = await fetch url
		throw Error("An error occurred while processing the script: #{file}") unless response.ok
		response.text()

	# Gets an ephemeral TCP port chosen by the system.
	_getPort: -> new Promise (fulfill, reject) ->
		socket = createServer().on "error", reject
		socket.unref()
		socket.listen host: "127.0.0.1", port: 0, ->
			{port} = socket.address()
			socket.close -> fulfill port
