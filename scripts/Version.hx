//! --class-path src --library tink_core
import php_minify.Version;

/** Updates the version number in the sources. **/
function main()
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Version.packageVersion}"');
