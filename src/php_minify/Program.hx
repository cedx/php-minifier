package php_minify;

import sys.FileSystem;
import tink.Cli;
import tink.cli.Rest;
using Lambda;
using haxe.io.Path;

/**
	Minify PHP source code by removing comments and whitespace.

	> php_minify [flags] <input> [output]
**/
@:noDoc final class Program {

	/** The extension of the PHP files to process. Defaults to "php". **/
	public var extension = "php";

	/** Display this help. **/
	public var help = false;

	/** Output the version number. **/
	public var version = false;

	/** Creates a new program. **/
	public function new() {}

	/** Application entry point. **/
	static function main() Cli.process(Sys.args(), new Program()).handle(Cli.exit);

	/**
		input  : The input directory.
		output : The output directory.
	**/
	@:defaultCommand
	public function run(rest: Rest<String>): Promise<Noise> {
		if (help || version) {
			Sys.println(version ? Version.packageVersion : Cli.getDoc(this));
			return Noise;
		}

		final haxelibRun = Sys.getEnv("HAXELIB_RUN") == "1";
		final requiredArgs = haxelibRun ? 2 : 1;
		if (rest.length < requiredArgs) return new Error(BadRequest, "You must provide the path to the input directory.");

		final cwd = haxelibRun ? rest.pop() : Sys.getCwd();
		final input = resolvePath(rest.shift(), cwd);
		if (!FileSystem.exists(input)) return new Error(NotFound, "The input directory was not found.");
		trace(input);

		final output = rest.length > 0 ? resolvePath(rest.shift(), cwd) : input;
		// TODO ??? FileSystem.createDirectory(output);
		trace(output);

		return Noise;
	}

	/** Resolves the specified `path` into an absolute path. **/
	function resolvePath(path: String, cwd: String) return path.isAbsolute() ? path : Path.join([cwd, path]);
}
