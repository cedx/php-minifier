/* eslint-disable no-underscore-dangle */
import {doesNotReject, ok} from "node:assert/strict";
import {resolve} from "node:path";
import {describe, it} from "node:test";
import Vinyl from "vinyl";
import {Plugin, TransformMode} from "#phpMinifier";

/**
 * Tests the features of the {@link Plugin} class.
 */
describe("Plugin", () => {
	describe("_transform()", () => {
		const file = new Vinyl({path: resolve("res/sample.php")});

		it("should TODO", async () => {
			const plugin = new Plugin({mode: TransformMode.safe, silent: true});
			return doesNotReject(plugin._transform(file, "utf8", (_, chunk) => {
				plugin.emit("end");

				const script = chunk.contents.toString();
				ok(script.includes("<?= 'Hello World!' ?>"));
				ok(script.includes("namespace dummy; class Dummy"));
				ok(script.includes("$className = get_class($this); return $className;"));
				ok(script.includes("__construct() { $this->property"));
			}));
		});

		it("should TODO", async () => {
			const plugin = new Plugin({mode: TransformMode.fast, silent: true});
			return doesNotReject(plugin._transform(file, "utf8", (_, chunk) => {
				plugin.emit("end");

				const script = chunk.contents.toString();
				ok(script.includes("<?= 'Hello World!' ?>"));
				ok(script.includes("namespace dummy; class Dummy"));
				ok(script.includes("$className = get_class($this); return $className;"));
				ok(script.includes("__construct() { $this->property"));
			}));
		});
	});
});
