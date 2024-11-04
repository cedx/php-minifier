import {GulpPlugin} from "@cedx/php-minifier"
import {doesNotReject, ifError, ok} from "node:assert/strict"
import {resolve} from "node:path"
import {after, describe, it} from "node:test"
import File from "vinyl"

# Tests the features of the `GulpPlugin` class.
describe "GulpPlugin", ->
	describe "_transform()", ->
		map = new Map [
			["should remove the inline comments", "<?= 'Hello World!' ?>"]
			["should remove the multi-line comments", "namespace dummy; class Dummy"]
			["should remove the single-line comments", "$className = get_class($this); return $className;"]
			["should remove the whitespace", "__construct() { $this->property"]
		]

		describe "fast", ->
			file = new File path: resolve "res/sample.php"
			plugin = new GulpPlugin mode: "fast", silent: yes
			after -> plugin.emit "end"

			for [key, value] from map then it key, ->
				await doesNotReject plugin._transform file, "utf8", (error, chunk) ->
					ifError error
					ok chunk.contents.toString().includes value

		describe "safe", ->
			file = new File path: resolve "res/sample.php"
			plugin = new GulpPlugin mode: "safe", silent: yes
			after -> plugin.emit "end"

			for [key, value] from map then it key, ->
				await doesNotReject plugin._transform file, "utf8", (error, chunk) ->
					ifError error
					ok chunk.contents.toString().includes value
