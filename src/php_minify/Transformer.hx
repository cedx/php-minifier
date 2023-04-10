package php_minify;

/** Removes comments and whitespace from a PHP script. **/
interface Transformer {

	/** Closes this transformer and releases any resources associated with it. **/
	function close(): Promise<Noise>;

	/** Processes a PHP script. **/
	function transform(file: String): Promise<String>;
}
