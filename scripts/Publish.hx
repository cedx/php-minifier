import haxe.Json;
import sys.io.File;

/** Publishes the package. **/
function main() {
	final version = Json.parse(File.getContent("package.json")).version;
	Sys.command("npm publish");
	for (action in ["tag", "push origin"]) Sys.command('git $action v$version');
}
