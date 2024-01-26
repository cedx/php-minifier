/* eslint-disable no-underscore-dangle */
import {doesNotReject, ok} from "node:assert/strict";
import {resolve} from "node:path";
import {after, describe, it} from "node:test";
import Vinyl from "vinyl";
import {Plugin, TransformMode} from "#phpMinifier";

/**
 * Tests the features of the {@link Plugin} class.
 */
describe("Plugin", () => {
	describe("_transform()", () => {
		const script = {path: resolve("res/sample.php")};

		describe("fast", () => {
			const plugin = new Plugin({mode: TransformMode.fast, silent: true});
			after(() => plugin.emit("end"));

			it("should remove the inline comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("<?= 'Hello World!' ?>")))));

			it("should remove the multi-line comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("namespace dummy; class Dummy")))));

			it("should remove the single-line comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("$className = get_class($this); return $className;")))));

			it("should remove the whitespace", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("__construct() { $this->property")))));
		});

		describe("safe", () => {
			const plugin = new Plugin({mode: TransformMode.safe, silent: true});
			after(() => plugin.emit("end"));

			it("should remove the inline comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("<?= 'Hello World!' ?>")))));

			it("should remove the multi-line comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("namespace dummy; class Dummy")))));

			it("should remove the single-line comments", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("$className = get_class($this); return $className;")))));

			it("should remove the whitespace", () => doesNotReject(plugin._transform(new Vinyl(script), "utf8", (_, chunk) =>
				ok(chunk.contents.toString().includes("__construct() { $this->property")))));
		});
	});
});
