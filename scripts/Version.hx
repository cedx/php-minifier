//! --class-path src
import php_minifier.Platform;
import sys.io.File;

/** Updates the version number in the sources. **/
function main()
	replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Platform.packageVersion}"');

/** Replaces in the specified `file` the substring which the `pattern` matches with the given `replacement`. **/
private function replaceInFile(file: String, pattern: EReg, replacement: String)
	File.saveContent(file, pattern.replace(File.getContent(file), replacement));
