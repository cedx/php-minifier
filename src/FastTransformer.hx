package php_minifier;

import asys.FileSystem;
import asys.io.Process;
import js.Node;
import js.node.Net;
import tink.QueryString;
import tink.http.Client;
using haxe.io.Path;

/** Removes comments and whitespace from a PHP script, by calling a Web service. **/
class FastTransformer implements Transformer {

	/** The address that the server is listening on. **/
	static inline final address = "127.0.0.1";

	/** The path to the PHP executable. **/
	final executable: String;

	/** The port that the PHP process is listening on. **/
	var port = -1;

	/** The underlying PHP process. **/
	var process: Null<Process> = null;

	/** Creates a new fast transformer. **/
	public function new(executable = "php") this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	@:ignoreInstrument
	public function close() {
		process?.kill();
		process = null;
		return Promise.NOISE;
	}

	/** Processes a PHP script. **/
	public function transform(file: String) return listen()
		.next(_ -> {
			final query = QueryString.build({file: FileSystem.absolutePath(file)});
			Client.fetch('http://$address:$port/index.php?$query').all();
		})
		.next(response -> response.body.toString());

	/** Gets an ephemeral TCP port chosen by the system. **/
	function getPort(): Promise<Int> {
		final socket = Net.createServer();
		socket.unref();

		final trigger = Promise.trigger();
		socket.on("error", e -> trigger.reject(Error.withData(ServiceUnavailable, "Unable to find an ephemeral TCP port.", e)));
		socket.listen(0, address, () -> {
			final port = socket.address().port;
			socket.close(() -> trigger.resolve(port));
		});

		return trigger.asPromise();
	}

	/** Starts the underlying PHP process and begins accepting connections. **/
	function listen() return process != null ? Promise.NOISE : getPort().next(tcpPort -> {
		port = tcpPort;
		process = new Process(executable, ["-S", '$address:$port', "-t", Path.join([Node.__dirname, "../www"])]);
		Future.delay(1_000, Noise);
	});
}
