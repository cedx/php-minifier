import assert from "node:assert/strict";
import {FastTransformer} from "../lib/index.js";

/**
 * Tests the features of the {@link FastTransformer} class.
 */
describe("FastTransformer", /** @this {Mocha.Suite} */ function() {
	this.retries(2);
	this.timeout(30_000);

	describe(".close()", () => {
		const transformer = new FastTransformer;

		it("should complete without any error", () => {
			assert.doesNotReject(transformer.listen());
			assert.doesNotReject(transformer.close());
		});

		it("should be callable multiple times", () => {
			assert.doesNotReject(transformer.close());
			assert.doesNotReject(transformer.close());
		});
	});

	describe(".listen()", () => {
		const transformer = new FastTransformer;
		after(() => transformer.close());

		it("should complete without any error", () => {
			assert.doesNotReject(transformer.listen());
		});

		it("should be callable multiple times", () => {
			assert.doesNotReject(transformer.listen());
			assert.doesNotReject(transformer.listen());
		});
	});

	describe(".transform()", () => {
		const script = "test/fixture/sample.php";
		const transformer = new FastTransformer;
		after(() => transformer.close());

		it("should remove the inline comments", async () => {
			assert((await transformer.transform(script)).includes("<?= 'Hello World!' ?>"));
		});

		it("should remove the multi-line comments", async () => {
			assert((await transformer.transform(script)).includes("namespace dummy; class Dummy"));
		});

		it("should remove the single-line comments", async () => {
			assert((await transformer.transform(script)).includes("$className = get_class($this); return $className;"));
		});

		it("should remove the whitespace", async () => {
			assert((await transformer.transform(script)).includes("__construct() { $this->property"));
		});
	});
});
