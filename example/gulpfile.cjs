const {phpMinify} = require("@cedx/php-minifier");
const gulp = require("gulp");
const process = require("node:process");

// Compresses a given set of PHP scripts.
exports.compressPhp = function compressPhp() {
	const isWindows = process.platform == "win32";
	const options = {
		binary: isWindows ? "C:\\Program Files\\PHP\\php.exe" : "/usr/bin/php",
		mode: isWindows ? "safe" : "fast",
		silent: process.stdout.isTTY
	};

	return gulp.src("path/to/**/*.php", {read: false})
		.pipe(phpMinify(options))
		.pipe(gulp.dest("path/to/out"));
};
