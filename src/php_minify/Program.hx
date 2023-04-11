package php_minify;

import tink.Cli;
import tink.cli.Rest;
using Lambda;

/** Remove PHP comments and whitespace by applying the `php_strip_whitespace()` function. **/
@:noDoc final class Program {

	/** Display this help. **/
	public var help = false;

	/** Output the version number. **/
	public var version = false;

	/** Creates a new program. **/
	public function new() {}

	/** Application entry point. **/
	static function main() Cli.process(Sys.args(), new Program()).handle(Cli.exit);

	/**
		<input> : The input directory.
		[output] : The output directory.
	**/
	@:defaultCommand
	public function run(rest: Rest<String>): Promise<Noise> {
		if (help || version) {
			Sys.println(version ? Version.packageVersion : Cli.getDoc(this));
			return Noise;
		}

		final requiredArgs = Sys.getEnv("HAXELIB_RUN") == "1" ? 2 : 1;
		if (rest.length < requiredArgs) return new Error(BadRequest, "You must provide the path to the input directory.");

		return Noise;
	}
}
