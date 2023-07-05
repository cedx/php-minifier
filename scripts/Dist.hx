using Lambda;

/** Packages the project. **/
function main() {
	final cli = "bin/php_minifier.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	[cli, "lib/bundle.js"].iter(file -> minifyFile(file));
}

/** Minifies the specified `source` file. **/
private function minifyFile(source: String, ?destination: String) Sys.command("npx", [
	"esbuild",
	"--allow-overwrite",
	"--legal-comments=none",
	"--log-level=warning",
	"--minify",
	'--outfile=${destination ?? source}',
	"--platform=node",
	source
]);
