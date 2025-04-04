/* eslint-disable no-underscore-dangle */
import {GulpPlugin} from "@cedx/php-minifier";
import {doesNotReject, ifError, ok} from "node:assert/strict";
import {resolve} from "node:path";
import {after, describe, it} from "node:test";
import File from "vinyl";

/**
 * Tests the features of the {@link GulpPlugin} class.
 */
describe("GulpPlugin", () => {
	describe("_transform()", () => {
		const map = new Map([
			["should remove the inline comments", "<?= 'Hello World!' ?>"],
			["should remove the multi-line comments", "namespace dummy; class Dummy"],
			["should remove the single-line comments", "$className = get_class($this); return $className;"],
			["should remove the whitespace", "__construct() { $this->property"]
		]);

		describe("fast", () => {
			const file = new File({path: resolve("res/sample.php")});
			const plugin = new GulpPlugin({mode: "fast", silent: true});
			after(() => plugin.emit("end"));

			for (const [key, value] of map) it(key, () => doesNotReject(plugin._transform(file, "utf8", (error, /** @type {File} */ chunk) => {
				ifError(error);
				ok(chunk.contents?.toString().includes(value)); // eslint-disable-line @typescript-eslint/no-base-to-string
			})));
		});

		describe("safe", () => {
			const file = new File({path: resolve("res/sample.php")});
			const plugin = new GulpPlugin({mode: "safe", silent: true});
			after(() => plugin.emit("end"));

			for (const [key, value] of map) it(key, () => doesNotReject(plugin._transform(file, "utf8", (error, /** @type {File} */ chunk) => {
				ifError(error);
				ok(chunk.contents?.toString().includes(value)); // eslint-disable-line @typescript-eslint/no-base-to-string
			})));
		});
	});
});
