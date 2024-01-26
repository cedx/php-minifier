import {doesNotReject, ok} from "node:assert/strict";
import {describe, it} from "node:test";
import {SafeTransformer} from "#phpMinifier";

/**
 * Tests the features of the {@link SafeTransformer} class.
 */
describe("SafeTransformer", () => {
	describe("close()", () => {
		it("should TODO", async () => {
			const transformer = new SafeTransformer;
			await doesNotReject(transformer.close());
			return doesNotReject(transformer.close());
		});
	});

	describe("transform()", () => {
		it("should TODO", async () => {
			const transformer = new SafeTransformer;
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
