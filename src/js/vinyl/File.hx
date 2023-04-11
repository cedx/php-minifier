package js.vinyl;

import haxe.extern.EitherType;
import js.node.Buffer;
import js.node.stream.Readable.IReadable;

/** Describes a file. **/
@:jsRequire("vinyl")
extern class File {

	/** The contents of this file. **/
	var contents: Null<EitherType<Buffer, IReadable>>;

	/** The absolute path. **/
	var path: String;

	/** The relative path. **/
	final relative: String;

	/** Creates a new file. **/
	function new(?options: FileOptions);
}

/** Defines the options of a `File` instance. **/
typedef FileOptions = {

	/** The absolute path. **/
	var ?path: String;
}
