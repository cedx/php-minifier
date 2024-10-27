package php_minifier;

/** Information about the environment in which the current program is running. **/
abstract class Platform {

	/** The name of the Haxe compilation target. **/
	public static var haxeTarget(get, never): String;
		static inline function get_haxeTarget() return getHaxeTarget();

	/** The version number of the Haxe compiler. **/
	public static var haxeVersion(get, never): String;
		static inline function get_haxeVersion() return getHaxeVersion();

	/** The package version of this program. **/
	public static var packageVersion(get, null): String;
		static function get_packageVersion() {
			if (packageVersion == null) packageVersion = #if display "0.0.0" #else getPackageVersion() #end;
			return packageVersion;
		}

	/** Gets the name of the Haxe compilation target. **/
	macro static function getHaxeTarget()
		return macro $v{haxe.macro.Context.definedValue("target.name")};

	/** Gets the version number of the Haxe compiler. **/
	macro static function getHaxeVersion()
		return macro $v{haxe.macro.Context.definedValue("haxe")};

	/** Gets the package version of this program. **/
	macro static function getPackageVersion()
		return macro $v{haxe.Json.parse(sys.io.File.getContent("haxelib.json")).version};
}
