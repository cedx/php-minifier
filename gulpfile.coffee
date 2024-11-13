import gulp from "gulp"
import {spawn} from "node:child_process"
import {readdir, rm} from "node:fs/promises"
import {join} from "node:path"
import {env} from "node:process"

# Builds the project.
export build = ->
	await npx "coffee", "--compile", "--no-header", "--output", "lib", "src"

# Deletes all generated files.
export clean = ->
	await rm join("lib", file) for file from await readdir "lib" when not file.endsWith ".d.ts"
	await rm join("var", file), recursive: yes for file from await readdir "var" when file isnt ".gitkeep"

# Performs the static analysis of source code.
export lint = ->
	await npx "coffeelint", "--file=etc/coffeelint.json", "gulpfile.coffee", "example", "src", "test"

# Publishes the package.
export publish = ->
	{default: {version}} = await import("./package.json", with: {type: "json"})
	await run "gulp"
	await run "npm", "publish", "--registry=#{registry}" for registry from ["https://registry.npmjs.org", "https://npm.pkg.github.com"]
	await run "git", action..., "v#{version}" for action from [["tag"], ["push", "origin"]]

# Runs the test suite.
export test = ->
	env.NODE_ENV = "test"
	await npx "coffee", "--compile", "--map", "--no-header", "--output", "lib", "src", "test"
	await run "node", "--enable-source-maps", "--test", "lib/**/*_test.js"

# Watches for file changes.
export watch = ->
	await npx "coffee", "--compile", "--no-header", "--output", "lib", "--watch", "src", "test"

# The default task.
export default gulp.series clean, build

# Executes a command from a local package.
npx = (command, args...) -> run "npm", "exec", "--", command, ...args

# Spawns a new process using the specified command.
run = (command, args...) -> new Promise (resolve, reject) ->
	spawn command, args, shell: on, stdio: "inherit"
		.on "close", (code) -> if code then reject(Error [command, args...].join(" ")) else resolve()
