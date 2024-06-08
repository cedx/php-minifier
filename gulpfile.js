import {cp} from "node:fs/promises";
import {env} from "node:process";
import {deleteAsync} from "del";
import {$} from "execa";
import gulp from "gulp";
import pkg from "./package.json" with {type: "json"};

// Builds the project.
export function build() {
	return $`tsc --project src/tsconfig.json`;
}

// Deletes all generated files.
export function clean() {
	return deleteAsync(["lib", "var/**/*", "www"]);
}

// Builds the documentation.
export async function doc() {
	for (const file of ["CHANGELOG.md", "LICENSE.md"]) await cp(file, `docs/${file.toLowerCase()}`);
	return $`typedoc --options etc/typedoc.js`;
}

// Performs the static analysis of source code.
export async function lint() {
	await $`tsc --project tsconfig.json`;
	return $`eslint --config=etc/eslint.config.js gulpfile.js bin example src test`;
}

// Publishes the package.
export async function publish() {
	for (const registry of ["https://registry.npmjs.org", "https://npm.pkg.github.com"]) await $`npm publish --registry=${registry}`;
	for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
}

// Starts the development server.
export async function serve() {
	await doc();
	return $({stdio: "inherit"})`mkdocs serve --config-file=etc/mkdocs.yaml`;
}

// Runs the test suite.
export function test() {
	env.NODE_ENV = "test";
	return $`node --test --test-reporter=spec`;
}

// The default task.
export default gulp.series(
	clean,
	build
);
