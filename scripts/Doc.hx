//! --class-path src --library tink_core
import php_minifier.Version;
import sys.FileSystem;
import sys.io.File;

/** Builds the documentation. **/
function main() {
	if (FileSystem.exists("docs/api")) Tools.removeDirectory("docs/api");

	Sys.command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	Sys.command("lix", ["run", "dox",
		"--define", "description", "Minify PHP source code by removing comments and whitespace.",
		"--define", "source-path", "https://github.com/cedx/php-minifier/blob/main/src",
		"--define", "themeColor", "0x4f5b93",
		"--define", "version", Version.packageVersion,
		"--define", "website", "https://docs.belin.io/php-minifier",
		"--input-path", "var",
		"--output-path", "docs/api",
		"--title", "PHP Minifier",
		"--toplevel-package", "php_minifier"
	]);

	File.copy("docs/favicon.ico", "docs/api/favicon.ico");
}
