/**
 * Removes comments and whitespace from a PHP script.
 */
export interface Transformer { // eslint-disable-line @typescript-eslint/consistent-type-definitions

	/**
	 * Closes this transformer and releases any resources associated with it.
	 * @returns Resolves when the transformer is finally disposed.
	 */
	close: () => Promise<void>;

	/**
	 * Processes a PHP script.
	 * @param file The path to the PHP script.
	 * @returns The transformed script.
	 */
	transform: (file: string) => Promise<string>;
}
