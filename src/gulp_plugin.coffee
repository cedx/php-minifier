import log from "fancy-log"
import {Buffer} from "node:buffer"
import {Transform} from "node:stream"
import {FastTransformer} from "./fast_transformer.js"
import {SafeTransformer} from "./safe_transformer.js"

# Minifies PHP source code by removing comments and whitespace.
export class GulpPlugin extends Transform

	# Creates a new plugin.
	constructor: (options = {}) ->
		super objectMode: true

		binary = options.binary ? "php"
		transformer = if options.mode ? "safe" is "fast" then new FastTransformer binary else new SafeTransformer binary
		close = -> await transformer.close()
		@on("end", close).on("error", close)

		# Value indicating whether to silence the plugin output.
		@_silent = options.silent ? no

		# The instance used to process the PHP code
		@_transformer = transformer

	# Transforms input and produces output.
	_transform: (chunk, encoding, callback) ->
		try
			log "Minifying: #{chunk.relative}" unless @_silent
			chunk.contents = Buffer.from await @_transformer.transform(chunk.path), encoding
			callback null, chunk

		catch error
			failure = if error instanceof Error then error else String error
			callback new PluginError "@cedx/php-minifier", failure, fileName: chunk.path
