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
		new Promise (fulfill, reject) =>
			args = ["-S", "127.0.0.1:#{@_port}", "-t", join(import.meta.dirname, "../www")]
			@_process = spawn @_executable, args, stdio: ["ignore", "pipe", "ignore"]
				.on "error", reject
				.on "spawn", => setTimeout (=> fulfill @_port), 1000

	# Processes a PHP script.
	transform: (file) ->
		port = await @listen()
		url = new URL "http://127.0.0.1:#{port}/index.php"
		url.searchParams.set "file", resolve(file)

		response = await fetch url
		throw Error("An error occurred while processing the script: #{file}") unless response.ok
		await response.text()

	# Gets an ephemeral TCP port chosen by the system.
	_getPort: -> new Promise (fulfill, reject) ->
		server = createServer().unref().on("error", reject)
		server.listen host: "127.0.0.1", port: 0, ->
			{port} = server.address()
			server.close -> fulfill port
