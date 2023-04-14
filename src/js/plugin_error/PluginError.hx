package js.plugin_error;

import haxe.extern.EitherType;
import js.lib.Error;

/** Represents a plugin error. **/
@:jsRequire("plugin-error")
extern class PluginError extends Error {

	/** The file name where the error occurred. **/
	final fileName: Null<String>;

	/** The line number where the error occurred. **/
	final lineNumber: Null<Int>;

	/** The plug-in name. **/
	final plugin: String;

	/** Value indicating whether to the error properties. **/
	final showProperties: Bool;

	/** Value indicating whether to the stack. **/
	final showStack: Bool;

	/** Creates a new plug-in error. **/
	function new(plugin: String, message: EitherType<Error, String>, ?options: PluginErrorOptions);
}

/** Defines the options of a `PluginError` instance. **/
typedef PluginErrorOptions = {

	/** The file name where the error occurred. **/
	var ?fileName: String;

	/** The line number where the error occurred. **/
	var ?lineNumber: Int;

	/** The error message. **/
	var ?message: Any;

	/** The error name. **/
	var ?name: String;

	/** Value indicating whether to the error properties. **/
	var ?showProperties: Bool;

	/** Value indicating whether to the stack. **/
	var ?showStack: Bool;

	/** The error stack to use. **/
	var ?stack: String;
}
