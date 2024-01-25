package php_minifier;

#if macro
import haxe.macro.Compiler;
import haxe.macro.Context;
import sys.io.File;

/** Provides initialization macros. **/
@:noDoc abstract class Macro {

	/** Adds a shebang to the compiled file. **/
	public static function shebang(executable: String) Context.onAfterGenerate(() -> {
		final path = Compiler.getOutput();
		File.saveContent(path, '#!/usr/bin/env $executable\n${File.getContent(path)}');
	});
}
#end
