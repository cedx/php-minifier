import haxe.Json;
import sys.io.File;

/** Performs the static analysis of source code. **/
function main() {
	final include = Json.parse(File.getContent("jsconfig.json")).include;
	Sys.command("npx tsc --project jsconfig.json");
	Sys.command("npx", ["eslint", "--config=etc/eslint.json"].concat(include));
}
