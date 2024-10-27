/** Packages the project. **/
function main() {
	final cli = "bin/php_minifier.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	for (file in [cli, "lib/bundle.js"]) Sys.command('npx terser --comments=false --compress --mangle --output=$file $file');
	Sys.command('git update-index --chmod=+x $cli');
}
