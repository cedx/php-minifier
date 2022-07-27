import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {FastTransformer} from "../src/index.js";

/**
 * Tests the features of the {@link FastTransformer} class.
 */
describe("FastTransformer", () => {
	describe(".close()", () => {
		const transformer = new FastTransformer;

		it("should complete without any error", async () => {
			await assert.doesNotReject(transformer.listen());
			return assert.doesNotReject(transformer.close());
		});

		it("should be callable multiple times", async () => {
			await assert.doesNotReject(transformer.close());
			return assert.doesNotReject(transformer.close());
		});
	});

	describe(".listen()", () => {
		const transformer = new FastTransformer;

		it("should complete without any error", async () => {
			await assert.doesNotReject(transformer.listen());
			return transformer.close();
		});

		it("should be callable multiple times", async () => {
			await assert.doesNotReject(transformer.listen());
			await assert.doesNotReject(transformer.listen());
			return transformer.close();
		});
	});

	describe(".transform()", () => {
		const script = "test/fixture/sample.php";
		const transformer = new FastTransformer;

		it("should remove the inline comments", async () => {
			assert.ok((await transformer.transform(script)).includes("<?= 'Hello World!' ?>"));
			return transformer.close();
		});

		it("should remove the multi-line comments", async () => {
			assert.ok((await transformer.transform(script)).includes("namespace dummy; class Dummy"));
			return transformer.close();
		});

		it("should remove the single-line comments", async () => {
			assert.ok((await transformer.transform(script)).includes("$className = get_class($this); return $className;"));
			return transformer.close();
		});

		it("should remove the whitespace", async () => {
			assert.ok((await transformer.transform(script)).includes("__construct() { $this->property"));
			return transformer.close();
		});
	});
});
