/** Interface providing a mechanism for transforming input and producing output. */
export interface Transformer {

  /**
   * Closes this transformer and releases any resources associated with it.
   * @return Completes when the transformer is finally disposed.
   */
  close(): Promise<void>;

  /**
   * Processes a PHP script.
   * @param script The path to the PHP script.
   * @return The transformed script.
   */
  transform(script: string): Promise<string>;
}
