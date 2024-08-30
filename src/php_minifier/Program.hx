package php_minifier;

import asys.FileSystem;
import asys.io.File;
#if nodejs import js.Node; #end
import sys.FileSystem as SyncFileSystem;
import tink.Cli;
import tink.cli.Rest;
using Lambda;
using StringTools;
using haxe.io.Path;

/**
	Minify PHP source code by removing comments and whitespace.

	> npx @cedx/php-minifier [flags] <input> [output]
**/
final class Program {

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
	static function main() {
		#if nodejs Node.process.title = "PHP Minifier"; #end
		Cli.process(Sys.args(), new Program()).handle(Cli.exit);
	}

	/**
		input  : The input directory.
		output : The output directory.
	**/
	@:defaultCommand
	public function run(rest: Rest<String>): Promise<Noise> {
		if (help || version) {
			Sys.println(version ? Platform.packageVersion : Cli.getDoc(this));
			return Noise;
		}

		final haxelibRun = Sys.getEnv("HAXELIB_RUN") == "1";
		final requiredArgs = haxelibRun ? 2 : 1;
		if (rest.length < requiredArgs) return new Error(BadRequest, "You must provide the path to the input directory.");

		final cwd = haxelibRun ? rest.pop() : Sys.getCwd();
		final input = resolvePath(rest.shift(), cwd);
		final output = rest.length > 0 ? resolvePath(rest.shift(), cwd) : input;

		return FileSystem.exists(input).next(exists -> !exists ? new Error(NotFound, "The input directory was not found.") : {
			final length = input.addTrailingSlash().length;
			minifyFiles(input, output, listDirectory(input).map(path -> path.substr(length)));
		});
	}

	/** Returns the paths of all PHP files in the specified `directory`. **/
	function listDirectory(directory: String): Array<String> {
		var paths = [];
		for (entry in SyncFileSystem.readDirectory(directory)) {
			final path = Path.join([directory, entry]);
			if (SyncFileSystem.isDirectory(path)) paths = paths.concat(listDirectory(path));
			else if (entry.extension().toLowerCase() == extension) paths.push(path);
		}

		return paths;
	}

	/** Minifies the specified PHP `files`. **/
	function minifyFiles(input: String, output: String, files: Array<String>): Promise<Noise> {
		final isWindows = Sys.systemName() == "Windows";
		final transformer: Transformer = mode == Fast ? new FastTransformer(binary) : new SafeTransformer(binary);
		final minify = (file: String) -> Promise.NOISE
			.withSideEffect(_ -> if (!silent) {
				final normalizedPath = isWindows ? file.replace("/", "\\") : file;
				Sys.println('Minifying: $normalizedPath');
			})
			.next(_ -> transformer.transform(Path.join([input, file])))
			.next(script -> {
				final path = Path.join([output, file]);
				FileSystem.createDirectory(path.directory()).next(_ -> File.saveContent(path, script));
			});

		return Promise.inSequence(files.map(minify)).next(_ -> transformer.close());
	}

	/** Resolves the specified `path` into an absolute path. **/
	function resolvePath(path: String, cwd: String): String
		return path.isAbsolute() ? path.normalize() : Path.join([cwd, path]);
}
