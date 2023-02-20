import sys.io.File;

/** Builds the documentation. **/
function main() {
	Sys.command("npx typedoc --options etc/typedoc.json");
	File.copy("www/favicon.ico", "docs/favicon.ico");
}
