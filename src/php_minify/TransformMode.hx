package php_minify;

/** Defines the type of transformation applied by the minifier. **/
enum abstract TransformMode(String) from String to String {

	/** Applies a fast transformation. **/
	var Fast = "fast";

	/** Applies a safe transformation. **/
	var Safe = "safe";
}
