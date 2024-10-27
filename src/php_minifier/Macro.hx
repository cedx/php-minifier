package php_minifier;

import sys.io.File;
import sys.ssl.Socket;

/** Provides initialization macros. **/
abstract class Macro {

	#if macro
	/** Adds a shebang to the compiled file. **/
	public static function shebang(executable: String) haxe.macro.Context.onAfterGenerate(() -> {
		final path = haxe.macro.Compiler.getOutput();
		File.saveContent(path, '#!/usr/bin/env $executable\n${File.getContent(path)}');
	});
	#end

	/** Enables or disables the verification of peer certificates during SSL handshake. **/
	public static function verifySslCerts(value: Bool): Void
		Socket.DEFAULT_VERIFY_CERT = value;
}
