import {doesNotReject, ok} from "node:assert/strict";
import {describe, it} from "node:test";
import {FastTransformer} from "#phpMinifier";

/**
 * Tests the features of the {@link FastTransformer} class.
 */
describe("FastTransformer", () => {
	describe("close()", () => {
		it("should TODO", async () => {
			const transformer = new FastTransformer;
			await doesNotReject(transformer.listen());
			await doesNotReject(transformer.close());
			return doesNotReject(transformer.close());
		});
	});

	describe("listen()", () => {
		it("should TODO", async () => {
			const transformer = new FastTransformer;
			await doesNotReject(transformer.listen());
			await doesNotReject(transformer.listen());
			return doesNotReject(transformer.close());
		});
	});

	describe("transform()", () => {
		it("should TODO", async () => {
			const transformer = new FastTransformer;
			const transform = transformer.transform("res/sample.php");
			await doesNotReject(transform);

			const script = await transform;
			ok(script.includes("<?= 'Hello World!' ?>"));
			ok(script.includes("namespace dummy; class Dummy"));
			ok(script.includes("$className = get_class($this); return $className;"));
			ok(script.includes("__construct() { $this->property"));
			return doesNotReject(transformer.close());
		});
	});
});
