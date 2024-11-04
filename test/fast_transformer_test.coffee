import {FastTransformer} from "@cedx/php-minifier"
import {doesNotReject, ok} from "node:assert/strict"
import {after, describe, it} from "node:test"

# Tests the features of the `FastTransformer` class.
describe "FastTransformer", ->
	describe "close()", ->
		it "should not reject, even if called several times", ->
			transformer = new FastTransformer
			await doesNotReject transformer.listen()
			await doesNotReject transformer.close()
			await doesNotReject transformer.close()

	describe "listen()", ->
		it "should not reject, even if called several times", ->
			transformer = new FastTransformer
			await doesNotReject transformer.listen()
			await doesNotReject transformer.listen()
			await doesNotReject transformer.close()

	describe "transform()", ->
		map = new Map [
			["should remove the inline comments", "<?= 'Hello World!' ?>"]
			["should remove the multi-line comments", "namespace dummy; class Dummy"]
			["should remove the single-line comments", "$className = get_class($this); return $className;"]
			["should remove the whitespace", "__construct() { $this->property"]
		]

		transformer = new FastTransformer
		after -> transformer.close()

		for [key, value] from map then it key, ->
			output = await transformer.transform "res/sample.php"
			ok output.includes value
