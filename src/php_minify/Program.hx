package php_minify;

import sys.FileSystem;
import sys.io.File;
import tink.Cli;
import tink.cli.Rest;
using Lambda;
using StringTools;
using haxe.io.Path;

/**
	Minify PHP source code by removing comments and whitespace.

	> php_minify [flags] <input> [output]
**/
@:noDoc final class Program {

	/** The path to the PHP executable. **/
	public var binary = "php";

	/** The extension of the PHP files to process. Defaults to "php". **/
	public var extension = "php";

	/** The operation mode of the minifier. Defaults to "safe". **/
	public var mode = TransformMode.Safe;

	/** Value indicating whether to silence the minifier output. **/
	public var silent = false;

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

		final length = input.addTrailingSlash().length;
		final output = rest.length > 0 ? resolvePath(rest.shift(), cwd) : input;
		return processFiles(input, output, listDirectory(input).map(path -> path.substring(length)));
	}

	/** Processes the specified PHP `files`. **/
	function processFiles(input: String, output: String, files: Array<String>) {
		final isWindows = Sys.systemName() == "Windows";
		final transformer: Transformer = mode == Fast ? new FastTransformer(binary) : new SafeTransformer(binary);
		return Promise.inSequence(files.map(file -> {
			if (!silent) {
				final normalizedPath = isWindows ? file.replace("/", "\\") : file;
				Sys.println('Minifying: $normalizedPath');
			}

			transformer.transform(Path.join([input, file])).next(script -> Error.catchExceptions(() -> {
				final path = Path.join([output, file]);
				FileSystem.createDirectory(path.directory());
				File.saveContent(path, script);
				Noise;
			}));
		})).noise();
	}

	/** Returns the paths of all PHP files in the specified `directory`. **/
	function listDirectory(directory: String) {
		var paths = [];
		for (entry in FileSystem.readDirectory(directory)) {
			final path = Path.join([directory, entry]);
			if (FileSystem.isDirectory(path)) paths = paths.concat(listDirectory(path));
			else if (entry.extension() == extension) paths.push(path);
		}

		return paths;
	}

	/** Resolves the specified `path` into an absolute path. **/
	function resolvePath(path: String, cwd: String)
		return path.isAbsolute() ? path.normalize() : Path.join([cwd, path]);
}
