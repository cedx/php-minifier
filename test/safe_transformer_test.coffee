import {SafeTransformer} from "@cedx/php-minifier"
import {doesNotReject, ok} from "node:assert/strict"
import {after, describe, it} from "node:test"

# Tests the features of the `SafeTransformer` class.
describe "SafeTransformer", ->
	describe "close()", ->
		it "should not reject, even if called several times", ->
			transformer = new SafeTransformer
			await doesNotReject transformer.close()
			await doesNotReject transformer.close()

	describe "transform()", ->
		map = new Map([
			["should remove the inline comments", "<?= 'Hello World!' ?>"]
			["should remove the multi-line comments", "namespace dummy; class Dummy"]
			["should remove the single-line comments", "$className = get_class($this); return $className;"]
			["should remove the whitespace", "__construct() { $this->property"]
		])

		script = "res/sample.php"
		transformer = new SafeTransformer
		after -> transformer.close()

		for [key, value] from map then it key, ->
			output = await transformer.transform script
			ok output.includes value
