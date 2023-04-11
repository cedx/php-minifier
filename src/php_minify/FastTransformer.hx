package php_minify;

import asys.FileSystem;
import asys.io.Process;
import tink.QueryString;
import tink.http.Client;
using haxe.io.Path;

#if java
import java.net.ServerSocket as Socket;
#elseif js
import js.node.Net;
#else
import sys.net.Host;
import sys.net.Socket;
#end

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

	/** Creates a new transformer. **/
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
		#if js
			final socket = Net.createServer();
			socket.unref();

			final trigger = Promise.trigger();
			socket.on("error", e -> trigger.reject(Error.withData(ServiceUnavailable, "Unable to find an ephemeral TCP port.", e)));
			socket.listen(0, address, () -> {
				final port = socket.address().port;
				socket.close(() -> trigger.resolve(port));
			});

			return trigger.asPromise();
		#else
			return Error.catchExceptions(() -> {
				final socket = new Socket(#if java 0 #end);
				#if java socket.setReuseAddress(true) #else socket.bind(new Host(address), 0) #end;
				final port = #if java socket.getLocalPort() #else socket.host().port #end;
				socket.close();
				port;
			}, e -> Error.withData(ServiceUnavailable, "Unable to find an ephemeral TCP port.", e));
		#end
	}

	/** Starts the underlying PHP process and begins accepting connections. **/
	function listen() return process != null ? Promise.NOISE : getPort().next(tcpPort -> {
		port = tcpPort;
		process = new Process(executable, ["-S", '$address:$port', "-t", "www"]); // TODO location of "www" folder
		Future.delay(1_000, Noise);
	});
}
