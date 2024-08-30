using Lambda;

/** Packages the project. **/
function main() {
	final cli = "bin/php_minifier.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');

	final files = [cli, "lib/bundle.js"];
	files.iter(file -> Sys.command('npx esbuild --allow-overwrite --legal-comments=none --log-level=warning --minify --outfile=$file --platform=node $file'));
	Sys.command('git update-index --chmod=+x $cli');
}
