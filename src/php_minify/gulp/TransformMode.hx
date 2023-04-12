package php_minify.gulp;

/** Defines the type of transformation applied by the minifier. **/
enum abstract TransformMode(String) to String {

	/** Applies a fast transformation. **/
	var Fast = "fast";

	/** Applies a safe transformation. **/
	var Safe = "safe";
}
