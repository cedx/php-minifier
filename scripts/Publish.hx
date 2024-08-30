//! --class-path src
import php_minifier.Platform;

/** Publishes the package. **/
function main() {
	Sys.command("lix Dist");
	for (registry in ["https://registry.npmjs.org", "https://npm.pkg.github.com"]) Sys.command('npm publish --registry=$registry');
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Platform.packageVersion}');
}
