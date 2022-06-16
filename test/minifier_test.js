import assert from "node:assert/strict";
import File from "vinyl";
import {Minifier, TransformMode} from "../lib/index.js";

/**
 * Tests the features of the {@link Minifier} class.
 */
describe("Minifier", /** @this {Mocha.Suite} */ function() {
	this.retries(3);
	this.timeout(60_000);

	describe("._transform()", () => {
		it("should remove the comments and whitespace using the fast transformer", async () => {
			const file = new File({path: "test/fixture/sample.php"});
			const minifier = new Minifier({mode: TransformMode.fast, silent: true});
			await minifier._transform(file); // eslint-disable-line no-underscore-dangle
			minifier.emit("end");

			const contents = file.contents?.toString() ?? "";
			assert(contents.includes("<?= 'Hello World!' ?>"));
			assert(contents.includes("namespace dummy; class Dummy"));
			assert(contents.includes("$className = get_class($this); return $className;"));
			assert(contents.includes("__construct() { $this->property"));
		});

		it("should remove the comments and whitespace using the safe transformer", async () => {
			const file = new File({path: "test/fixture/sample.php"});
			const minifier = new Minifier({mode: TransformMode.safe, silent: true});
			await minifier._transform(file); // eslint-disable-line no-underscore-dangle
			minifier.emit("end");

			const contents = file.contents?.toString() ?? "";
			assert(contents.includes("<?= 'Hello World!' ?>"));
			assert(contents.includes("namespace dummy; class Dummy"));
			assert(contents.includes("$className = get_class($this); return $className;"));
			assert(contents.includes("__construct() { $this->property"));
		});
	});
});
