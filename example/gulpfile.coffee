import {phpMinify} from "@cedx/php-minifier"
import gulp from "gulp"
import process from "node:process"

# Compresses a given set of PHP scripts.
export compressPhp = ->
	isWindows = process.platform is "win32"
	options =
		binary: if isWindows then "C:/Program Files/PHP/php.exe" else "/usr/bin/php"
		mode: if isWindows then "safe" else "fast"
		silent: process.stdout.isTTY

	gulp.src "path/to/**/*.php", read: no
		.pipe phpMinify options
		.pipe gulp.dest "path/to/out"
