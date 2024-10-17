package php_minifier;

import asys.FileSystem;
import js.Node;
import js.node.ChildProcess;
import js.node.child_process.ChildProcess as Process;
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
	public function new(executable = "php")
		this.executable = executable.normalize();

	/** Closes this transformer and releases any resources associated with it. **/
	public function close(): Promise<Noise> {
		process?.kill();
		process = null;
		return Noise;
	}

	/** Processes a PHP script. **/
	public function transform(file: String): Promise<String>
		return listen()
			.next(_ -> Client.fetch('http://$address:$port/index.php?${QueryString.build({file: FileSystem.absolutePath(file)})}').all())
			.next(response -> response.body.toString());

	/** Gets an ephemeral TCP port chosen by the system. **/
	function getPort(): Promise<Int> {
		final trigger = Promise.trigger();
		final socket = Net.createServer().on("error", error -> trigger.reject(Error.ofJsError(error)));
		socket.listen(0, address, () -> {
			final port = socket.address().port;
			socket.close(() -> trigger.resolve(port));
		});

		socket.unref();
		return trigger.asPromise();
	}

	/** Starts the underlying PHP process and begins accepting connections. **/
	function listen(): Promise<Noise>
		return process != null ? Noise : getPort().next(tcpPort -> {
			final trigger: PromiseTrigger<Noise> = Promise.trigger();
			port = tcpPort;
			process = ChildProcess
				.spawn(executable, ["-S", '$address:$port', "-t", Path.join([Node.__dirname, "../www"])], {stdio: [Ignore, Pipe, Ignore]})
				.on("error", error -> trigger.reject(Error.ofJsError(error)))
				.on("spawn", () -> Future.delay(1_000, Noise).handle(trigger.resolve));

			trigger.asPromise();
		});
}
