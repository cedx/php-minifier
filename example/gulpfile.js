import process from "node:process";
import gulp from "gulp";
import phpMinifier from "@cedx/php-minifier";

// Compresses a given set of PHP scripts.
export function compressPhp() {
	const isWindows = process.platform == "win32";

	/** @type {import("@cedx/php-minifier").PluginOptions} */
	const options = {
		binary: isWindows ? "C:\\Program Files\\PHP\\php.exe" : "/usr/bin/php",
		mode: isWindows ? "safe" : "fast",
		silent: process.stdout.isTTY
	};

	return gulp.src("path/to/**/*.php", {read: false})
		.pipe(phpMinifier(options))
		.pipe(gulp.dest("path/to/out"));
}
