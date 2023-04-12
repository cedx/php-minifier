using Lambda;

/** Packages the project. **/
function main() {
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');

	final cli = "bin/php_minify.js";
	[cli, "lib/bundle.js"].iter(file -> minifyFile(file));

	Sys.command('git update-index --chmod=+x $cli');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $cli');
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
