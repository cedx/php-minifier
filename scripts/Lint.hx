import haxe.Json;
import sys.io.File;

/** Performs the static analysis of source code. **/
function main() {
	final include = Json.parse(File.getContent("jsconfig.json")).include;
	Sys.command("lix run checkstyle --config etc/checkstyle.json --exitcode --source scripts");
	Sys.command("npx tsc --project jsconfig.json");
	Sys.command("npx", ["eslint", "--config=etc/eslint.json"].concat(include));
}
