import sys.FileSystem;
using Lambda;

/** Deletes all generated files. **/
function main() {
	for (file in ["bin/php_minify.js", "lib/index.js"]) [file, '$file.map'].filter(FileSystem.exists).iter(FileSystem.deleteFile);
	["lib", "res"].filter(FileSystem.exists).iter(Tools.removeDirectory);
	Tools.cleanDirectory("var");
}
