import process from "node:process";
import gulp from "gulp";
import phpMinify from "@cedx/php-minify";

/**
 * Compresses a given set of PHP scripts.
 */
export default function() {
	const isWindows = process.platform == "win32";
	const options = {
		binary: isWindows ? "C:\\Program Files\\PHP\\php.exe" : "/usr/bin/php",
		mode: isWindows ? "safe" : "fast",
		silent: process.stdout.isTTY
	};

	return gulp.src("path/to/**/*.php", {read: false})
		.pipe(phpMinify(options))
		.pipe(gulp.dest("path/to/out"));
}
