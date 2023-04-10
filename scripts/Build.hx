/** Builds the project. **/
function main() {
	final debug = Sys.args().contains("--debug");
	for (file in ["build", "run"]) Sys.command('haxe ${debug ? "--debug" : ""} $file.hxml');
}
