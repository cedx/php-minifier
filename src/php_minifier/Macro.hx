package php_minifier;

#if macro
import haxe.macro.Compiler;
import haxe.macro.Context;
import sys.io.File;
import sys.ssl.Socket;

/** Provides initialization macros. **/
abstract class Macro {

	/** Adds a shebang to the compiled file. **/
	public static function shebang(executable: String) Context.onAfterGenerate(() -> {
		final path = Compiler.getOutput();
		File.saveContent(path, '#!/usr/bin/env $executable\n${File.getContent(path)}');
	});

	/** Enables or disables the verification of peer certificates during SSL handshake. **/
	public static function verifySslCerts(value: Bool): Void
		Socket.DEFAULT_VERIFY_CERT = value;
}
#end
