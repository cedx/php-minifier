import sys.FileSystem;

/** Installs the project dependencies. **/
function main() {
	Sys.command("lix download");
	Sys.command('npm ${FileSystem.exists("package-lock.json") ? "install" : "update"}');
}
