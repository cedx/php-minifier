/**
 * Removes comments and whitespace from a PHP script.
 */
export interface ITransformer extends AsyncDisposable {

	/**
	 * Closes this transformer.
	 * @returns Resolves when the transformer has been closed.
	 */
	close: () => Promise<void>;

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	transform: (file: string) => Promise<string>;
}
