import sys.FileSystem;
using Lambda;

/** Deletes all generated files. **/
function main() {
	for (file in ["bin/php_minifier.js", "lib/bundle.js"]) [file, '$file.map'].filter(FileSystem.exists).iter(FileSystem.deleteFile);
	Tools.cleanDirectory("var");
}
