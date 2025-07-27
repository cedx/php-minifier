/**
 * Removes comments and whitespace from a PHP script.
 */
export interface ITransformer extends AsyncDisposable {

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	transform: (file: string) => Promise<string>;
}
