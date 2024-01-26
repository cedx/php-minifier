import {doesNotReject, ok} from "node:assert/strict";
import {after, describe, it} from "node:test";
import {SafeTransformer} from "#phpMinifier";

/**
 * Tests the features of the {@link SafeTransformer} class.
 */
describe("SafeTransformer", () => {
	describe("close()", () => {
		it("should not reject, even if called several times", async () => {
			const transformer = new SafeTransformer;
			await doesNotReject(transformer.close());
			return doesNotReject(transformer.close());
		});
	});

	describe("transform()", () => {
		const map = new Map([
			["should remove the inline comments", "<?= 'Hello World!' ?>"],
			["should remove the multi-line comments", "namespace dummy; class Dummy"],
			["should remove the single-line comments", "$className = get_class($this); return $className;"],
			["should remove the whitespace", "__construct() { $this->property"]
		]);

		const script = "res/sample.php";
		const transformer = new SafeTransformer;
		after(() => transformer.close());

		for (const [key, value] of map) it(key, async () => {
      const output = await transformer.transform(script);
			ok(output.includes(value));
    });
	});
});
