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
		const script = "res/sample.php";
		const transformer = new SafeTransformer;
		after(() => transformer.close());

		it("should remove the inline comments", async () => {
      const output = await transformer.transform(script);
			ok(output.includes("<?= 'Hello World!' ?>"));
    });

    it("should remove the multi-line comments", async () => {
      const output = await transformer.transform(script);
			ok(output.includes("namespace dummy; class Dummy"));
    });

    it("should remove the single-line comments", async () => {
      const output = await transformer.transform(script);
			ok(output.includes("$className = get_class($this); return $className;"));
    });

    it("should remove the whitespace", async () => {
      const output = await transformer.transform(script);
			ok(output.includes("__construct() { $this->property"));
    });
	});
});
