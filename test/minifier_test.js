import assert from "node:assert/strict";
import {describe, it} from "node:test";
import File from "vinyl";
import {Minifier, TransformMode} from "#php_minify";

/**
 * Tests the features of the {@link Minifier} class.
 */
describe("", () => {
	describe("._transform()", () => {
		it("should remove the comments and whitespace using the fast transformer", async () => {
			const file = new File({path: "test/fixture/sample.php"});
			const minifier = new Minifier({mode: TransformMode.fast, silent: true});
			await minifier._transform(file);
			minifier.emit("end");

			const contents = file.contents?.toString() ?? "";
			assert.ok(contents.includes("<?= 'Hello World!' ?>"));
			assert.ok(contents.includes("namespace dummy; class Dummy"));
			assert.ok(contents.includes("$className = get_class($this); return $className;"));
			assert.ok(contents.includes("__construct() { $this->property"));
		});

		it("should remove the comments and whitespace using the safe transformer", async () => {
			const file = new File({path: "test/fixture/sample.php"});
			const minifier = new Minifier({mode: TransformMode.safe, silent: true});
			await minifier._transform(file);
			minifier.emit("end");

			const contents = file.contents?.toString() ?? "";
			assert.ok(contents.includes("<?= 'Hello World!' ?>"));
			assert.ok(contents.includes("namespace dummy; class Dummy"));
			assert.ok(contents.includes("$className = get_class($this); return $className;"));
			assert.ok(contents.includes("__construct() { $this->property"));
		});
	});
});
