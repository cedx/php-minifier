import sys.FileSystem;

/** Deletes all generated files. **/
function main() {
	if (FileSystem.exists("lib")) Tools.removeDirectory("lib");
	Tools.cleanDirectory("var");
}
