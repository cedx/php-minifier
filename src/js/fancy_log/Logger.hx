package js.fancy_log;

import js.node.Util.InspectOptionsBase;

/** Logs messages, prefixed with a timestamp. **/
@:jsRequire("fancy-log")
extern class Logger {

	/** Uses `util.inspect()` on `obj` and prints the resulting string to `stdout`. **/
	static function dir(obj: Any, ?options: InspectOptionsBase): Logger;

	/** Prints to `stderr` with newline. **/
	static function error(data: Any, ...args: Any): Logger;

	/** An alias for `log()`. **/
	static function info(data: Any, ...args: Any): Logger;

	/** Prints to `stdout` with newline. **/
	@:selfCall static function log(data: Any, ...args: Any): Logger;

	/** An alias for `error()`. **/
	static function warn(data: Any, ...args: Any): Logger;
}
