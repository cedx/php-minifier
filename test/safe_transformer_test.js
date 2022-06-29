import assert from "node:assert/strict";
import test from "node:test";
import {SafeTransformer} from "../lib/index.js";

test("SafeTransformer.close()", async ctx => {
	const transformer = new SafeTransformer;
	await ctx.test("should complete without any error", () => assert.doesNotReject(transformer.close()));

	await ctx.test("should be callable multiple times", async () => {
		await assert.doesNotReject(transformer.close());
		return assert.doesNotReject(transformer.close());
	});
});

test("SafeTransformer.transform()", async ctx => {
	const script = "test/fixture/sample.php";
	const transformer = new SafeTransformer;

	await ctx.test("should remove the inline comments", async () => {
		assert.ok((await transformer.transform(script)).includes("<?= 'Hello World!' ?>"));
		return transformer.close();
	});

	await ctx.test("should remove the multi-line comments", async () => {
		assert.ok((await transformer.transform(script)).includes("namespace dummy; class Dummy"));
		return transformer.close();
	});

	await ctx.test("should remove the single-line comments", async () => {
		assert.ok((await transformer.transform(script)).includes("$className = get_class($this); return $className;"));
		return transformer.close();
	});

	await ctx.test("should remove the whitespace", async () => {
		assert.ok((await transformer.transform(script)).includes("__construct() { $this->property"));
		return transformer.close();
	});
});
