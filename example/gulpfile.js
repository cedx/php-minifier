import {phpMinify} from "@cedx/php-minifier";
import gulp from "gulp";
import process from "node:process";

// Compresses a given set of PHP scripts.
export function compressPhp() {
	const isWindows = process.platform == "win32";

	/** @type {import("@cedx/php-minifier").GulpPluginOptions} */
	const options = {
		binary: isWindows ? "C:/Program Files/PHP/php.exe" : "/usr/bin/php",
		mode: isWindows ? "safe" : "fast",
		silent: process.stdout.isTTY
	};

	return gulp.src("path/to/**/*.php", {read: false})
		.pipe(phpMinify(options))
		.pipe(gulp.dest("path/to/out"));
}
