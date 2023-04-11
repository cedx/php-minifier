package js.fancy_log;

/** Logs messages. **/
@:jsRequire("fancy-log")
extern class Logger {

	/** Logs a debug message. **/
	static function dir(...args: Any): Logger;

	/** Logs an error message. **/
	static function error(...args: Any): Logger;

	/** Logs an informative message. **/
	static function info(...args: Any): Logger;

	/** Logs a message. **/
	@:selfCall
	static function log(...args: Any): Logger;

	/** Logs a warning message. **/
	static function warn(...args: Any): Logger;
}
