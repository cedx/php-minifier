/**
 * The operation mode of the minifier.
 */
export const TransformMode = Object.freeze({

	/**
	 * Applies a fast transformation.
	 */
	fast: "fast",

	/**
	 * Applies a safe transformation.
	 */
	safe: "safe"
});

/**
 * The operation mode of the minifier.
 */
export type TransformMode = typeof TransformMode[keyof typeof TransformMode];
