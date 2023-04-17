const process = require("node:process");
const {dest, src} = require("gulp");
const phpMinifier = require("@cedx/php-minifier");

/**
 * Compresses a given set of PHP scripts.
 */
exports.compressPhp = function compressPhp() {
	const isWindows = process.platform == "win32";
	const options = {
		binary: isWindows ? "C:\\Program Files\\PHP\\php.exe" : "/usr/bin/php",
		mode: isWindows ? "safe" : "fast",
		silent: process.stdout.isTTY
	};

	return src("path/to/**/*.php", {read: false})
		.pipe(phpMinifier(options))
		.pipe(dest("path/to/out"));
}
