//! --class-path src --library tink_core
import php_minify.Version;

/** Publishes the package. **/
function main() {
	Sys.command("lix Dist");
	Tools.compress(["CHANGELOG.md", "LICENSE.md", "README.md", "haxelib.json", "run.n", "src"], "var/haxelib.zip");
	Sys.command("haxelib submit var/haxelib.zip");
	Sys.command("npm publish");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Version.packageVersion}');
}
