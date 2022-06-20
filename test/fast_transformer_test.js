import assert from "node:assert/strict";
import test from "node:test";
import {FastTransformer} from "../lib/index.js";

test("FastTransformer.close()", async ctx => {
	const transformer = new FastTransformer;

	await ctx.test("should complete without any error", async () => {
		await assert.doesNotReject(transformer.listen());
		return assert.doesNotReject(transformer.close());
	});

	await ctx.test("should be callable multiple times", async () => {
		await assert.doesNotReject(transformer.close());
		return assert.doesNotReject(transformer.close());
	});
});

test("FastTransformer.listen()", async ctx => {
	const transformer = new FastTransformer;

	await ctx.test("should complete without any error", async () => {
		await assert.doesNotReject(transformer.listen());
		return transformer.close();
	});

	await ctx.test("should be callable multiple times", async () => {
		await assert.doesNotReject(transformer.listen());
		await assert.doesNotReject(transformer.listen());
		return transformer.close();
	});
});

test("FastTransformer.transform()", async ctx => {
	const script = "test/fixture/sample.php";
	const transformer = new FastTransformer;

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
