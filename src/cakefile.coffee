{spawnSync} = require "node:child_process"
{readdirSync, rmSync} = require "node:fs"
{join} = require "node:path"
{env} = require "node:process"
pkg = require "../package.json"

option "-m", "--map", "Whether to generate source maps."

task "build", "Builds the project.", (options) ->
	sourcemaps = if options.map then ["--map"] else []
	run "coffee", "--compile", sourcemaps..., "--no-header", "--output", "lib", "src"

task "clean", "Deletes all generated files.", ->
	rmSync join("lib", file) for file from readdirSync "lib" when not file.endsWith ".d.ts"
	rmSync join("var", file), recursive: yes for file from readdirSync "var" when file isnt ".gitkeep"

task "dist", "Packages the project.", ->
	invoke script for script from ["clean", "build"]
	rmSync "lib/cakefile.js"

task "lint", "Performs the static analysis of source code.", ->
	npx "coffeelint", "--file=etc/coffeelint.json", "example", "src", "test"

task "publish", "Publishes the package.", ->
	invoke "dist"
	run "npm", "publish", "--registry=#{registry}" for registry from ["https://registry.npmjs.org", "https://npm.pkg.github.com"]
	run "git", action..., "v#{pkg.version}" for action from [["tag"], ["push", "origin"]]

task "test", "Runs the test suite.", ->
	env.NODE_ENV = "test"
	run "coffee", "--compile", "--map", "--no-header", "--output", "lib", "src", "test"
	run "node", "--enable-source-maps", "--test", "--test-reporter=spec", "lib/**/*_test.js"

task "watch", "Watches for file changes.", (options) ->
	sourcemaps = if options.map then ["--map"] else []
	run "coffee", "--compile", sourcemaps..., "--no-header", "--output", "lib", "--watch", "src", "test"

# Executes a command from a local package.
npx = (command, args...) -> run "npm", "exec", "--", command, args...

# Spawns a new process using the specified command.
run = (command, args...) ->
	{status} = spawnSync command, args, shell: yes, stdio: "inherit"
	unless status is 0
		console.error "Command failed:", command, args...
		process.exit status
