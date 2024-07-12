/* eslint-disable no-underscore-dangle */
import {doesNotReject, ifError, ok} from "node:assert/strict";
import {resolve} from "node:path";
import {after, describe, it} from "node:test";
import File from "vinyl";
import {GulpPlugin, TransformMode} from "@cedx/php-minifier";

/**
 * Tests the features of the {@link GulpPlugin} class.
 */
describe("GulpPlugin", () => {
	describe("_transform()", () => {
		const script = {path: resolve("res/sample.php")};
		const map = new Map([
			["should remove the inline comments", "<?= 'Hello World!' ?>"],
			["should remove the multi-line comments", "namespace dummy; class Dummy"],
			["should remove the single-line comments", "$className = get_class($this); return $className;"],
			["should remove the whitespace", "__construct() { $this->property"]
		]);

		describe("TransformMode.fast", () => {
			const plugin = new GulpPlugin({mode: TransformMode.fast, silent: true});
			after(() => plugin.emit("end"));
			for (const [key, value] of map) it(key, () => doesNotReject(plugin._transform(new File(script), "utf8", (error, /** @type {File} */ chunk) => {
				ifError(error);
				ok(chunk.contents?.toString().includes(value));
			})));
		});

		describe("TransformMode.safe", () => {
			const plugin = new GulpPlugin({mode: TransformMode.safe, silent: true});
			after(() => plugin.emit("end"));
			for (const [key, value] of map) it(key, () => doesNotReject(plugin._transform(new File(script), "utf8", (error, /** @type {File} */ chunk) => {
				ifError(error);
				ok(chunk.contents?.toString().includes(value));
			})));
		});
	});
});
