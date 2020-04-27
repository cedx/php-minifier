# Changelog

## Version [11.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v10.3.0...v11.0.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Dropped support for [GitHub Packages](https://github.com/features/packages).
- Updated the documentation.
- Updated the package dependencies.

## Version [10.3.0](https://git.belin.io/cedx/gulp-php-minify/compare/v10.2.0...v10.3.0)
- Using private class fields.
- Updated the package dependencies.

## Version [10.2.0](https://git.belin.io/cedx/gulp-php-minify/compare/v10.1.0...v10.2.0)
- Updated the package dependencies.

## Version [10.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v10.0.0...v10.1.0)
- Due to strong user demand, restored the [TypeScript](https://www.typescriptlang.org) source code.
- Fixed the [issue #15](https://git.belin.io/cedx/gulp-php-minify/issues/15): replaced the usage of the `__dirname` variable by `import.meta.url`.
- Raised the [Node.js](https://nodejs.org) constraint.
- Renamed the `FastTransformer.defaultAdress` static property to `address`.
- Replaced the [JSDoc](https://jsdoc.app) documentation generator by [TypeDoc](https://typedoc.org).

## Version [10.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v9.3.0...v10.0.0)
- Breaking change: dropped support for [CommonJS modules](https://nodejs.org/api/modules.html).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: reverted the source code to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- Added support for [ECMAScript modules](https://nodejs.org/api/esm.html).
- Replaced the [TypeDoc](https://typedoc.org) documentation generator by [JSDoc](https://jsdoc.app).
- Replaced the [TSLint](https://palantir.github.io/tslint) static analyzer by [ESLint](https://eslint.org).
- Updated the package dependencies.

## Version [9.3.0](https://git.belin.io/cedx/gulp-php-minify/compare/v9.2.0...v9.3.0)
- Modified the package layout.
- Updated the package dependencies.

## Version [9.2.0](https://git.belin.io/cedx/gulp-php-minify/compare/v9.1.1...v9.2.0)
- Added the `binary` and `mode` properties to the `Minifier` class.
- Updated the package dependencies.

## Version [9.1.1](https://git.belin.io/cedx/gulp-php-minify/compare/v9.1.0...v9.1.1)
- Fixed the [issue #8](https://git.belin.io/cedx/gulp-php-minify/issues/8): unable to spawn a custom [PHP](https://www.php.net) executable.

## Version [9.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v9.0.0...v9.1.0)
- Fixed the [issue #10](https://git.belin.io/cedx/gulp-php-minify/issues/10): the [Gulp](https://gulpjs.com) task does not complete.
- Fixed the [issue #12](https://git.belin.io/cedx/gulp-php-minify/issues/12): the documentation is not up to date.
- Updated the package dependencies.

## Version [9.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v8.0.0...v9.0.0)
- Breaking change: ported the source code to [TypeScript](https://www.typescriptlang.org).
- Breaking change: removed the `Minifier.factory()` method.
- Breaking change: reshaped the `Transformer` abstract class into an interface.
- Ported the unit tests to classes with experimental decorators.
- Replaced the [ESDoc](https://esdoc.org) documentation generator by [TypeDoc](https://typedoc.org).
- Replaced the [ESLint](https://eslint.org) static analyzer by [TSLint](https://palantir.github.io/tslint).
- Updated the package dependencies.

## Version [8.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v7.1.1...v8.0.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: raised the required [PHP](https://www.php.net) version.
- Added a user guide based on [MkDocs](http://www.mkdocs.org).
- Using PHP 7.1 features, like void functions.
- Using the global `URL` class.
- Updated the build system to [Gulp](https://gulpjs.com) version 4.
- Updated the package dependencies.

## Version [7.1.1](https://git.belin.io/cedx/gulp-php-minify/compare/v7.1.0...v7.1.1)
- Fixed the [issue #6](https://git.belin.io/cedx/gulp-php-minify/issues/6): a required dependency was declared in the wrong section of the `package.json` file.

## Version [7.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v7.0.1...v7.1.0)
- Added the `TransformMode` enumeration.
- Updated the package dependencies.

## Version [7.0.1](https://git.belin.io/cedx/gulp-php-minify/compare/v7.0.0...v7.0.1)
- Fixed a bug with relative file paths.

## Version [7.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v6.0.0...v7.0.0)
- Breaking change: changed the signature of most class constructors.
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: removed the `binary` and `mode` properties from the `Minifier` class.
- Breaking change: renamed the `FastTransformer.DEFAULT_ADDRESS` constant to `defaultAddress`.
- Added new unit tests.
- Added the `Transformer` abstract class.
- Updated the package dependencies.

## Version [6.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v5.1.0...v6.0.0)
- Breaking change: converted the [`Observable`](http://reactivex.io/intro.html)-based API to an `async/await`-based one.
- Added the [`[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property to all classes.
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).

## Version [5.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v5.0.0...v5.1.0)
- Replaced the [SuperAgent](https://visionmedia.github.io/superagent) HTTP client by `node-fetch`.
- Updated the package dependencies.

## Version [5.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v4.2.0...v5.0.0)
- Breaking change: changed the `factory()` function to the `Minifier.factory()` method.
- Updated the package dependencies.

## Version [4.2.0](https://git.belin.io/cedx/gulp-php-minify/compare/v4.1.0...v4.2.0)
- Replaced the `which` module by an `Observable`-based one.
- Updated the package dependencies.

## Version [4.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v4.0.0...v4.1.0)
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the package dependencies.

## Version [4.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v3.1.1...v4.0.0)
- Breaking change: restored the [Observable](http://reactivex.io/intro.html) APIs.
- Updated the package dependencies.

## Version [3.1.1](https://git.belin.io/cedx/gulp-php-minify/compare/v3.1.0...v3.1.1)
- Fixed a code generation bug.
- Updated the package dependencies.

## Version [3.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v3.0.0...v3.1.0)
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version [3.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v2.0.0...v3.0.0)
- Breaking change: changed the signature of the `Minifier` constructor.
- Added new unit tests.
- Updated the package dependencies.

## Version [2.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v1.1.0...v2.0.0)
- Breaking change: dropped the dependency on [Observables](http://reactivex.io/intro.html).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: raised the required [PHP](https://www.php.net) version.
- Breaking change: using ES2017 features, like async/await functions.
- Added a `mode` option allowing to select the underlying transformer.
- Improved the build system.
- Ported the unit test assertions from [TDD](https://en.wikipedia.org/wiki/Test-driven_development) to [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).
- Restored the legacy transformer from version 0.2.0.
- Updated the package dependencies.

## Version [1.1.0](https://git.belin.io/cedx/gulp-php-minify/compare/v1.0.1...v1.1.0)
- Properly handle the stream events: added support for the `error` event, remove the registered listeners on stream close.
- Replaced the [Codacy](https://www.codacy.com) code coverage service by the [Coveralls](https://coveralls.io) one.
- Updated the package dependencies.

## Version [1.0.1](https://git.belin.io/cedx/gulp-php-minify/compare/v1.0.0...v1.0.1)
- Fixed the [issue #1](https://git.belin.io/cedx/gulp-php-minify/issues/1).

## Version [1.0.0](https://git.belin.io/cedx/gulp-php-minify/compare/v0.3.1...v1.0.0)
- Breaking change: the plug-in is not anymore a default export. The use of destructuring assignment is advised to access it.
- Breaking change: ported the [CommonJS modules](https://nodejs.org/api/modules.html) to ES2015 format.
- Breaking change: ported the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-based APIs to [Observables](http://reactivex.io/intro.html).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: replaced the test classes by plain tests.
- Added the `listening` property.
- Added a build task for fixing the coding standards issues.
- Replaced the [JSDoc](http://usejsdoc.org) documentation generator by [ESDoc](https://esdoc.org).
- Replaced the [JSHint](http://jshint.com) linter by [ESLint](http://eslint.org).
- Updated the package dependencies.

## Version [0.3.1](https://git.belin.io/cedx/gulp-php-minify/compare/v0.3.0...v0.3.1)
- Added support for code coverage.
- Added support for [Travis CI](https://travis-ci.com) continuous integration.

## Version [0.3.0](https://git.belin.io/cedx/gulp-php-minify/compare/v0.2.0...v0.3.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Added the `silent` option: conditionally displaying the path of the minified scripts to the standard output.
- Drastically improved the performance (up to a 30x factor).
- Updated the package dependencies.

## Version [0.2.0](https://git.belin.io/cedx/gulp-php-minify/compare/v0.1.2...v0.2.0)
- Breaking change: renamed the `PHPMinifier` class to `Minifier`.
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: using ES2015 features, like default parameters and destructuring assignment.
- Turned the package into a [scoped one](https://docs.npmjs.com/getting-started/scoped-packages).

## Version [0.1.2](https://git.belin.io/cedx/gulp-php-minify/compare/v0.1.1...v0.1.2)
- Added support for [Codacy](https://www.codacy.com) code analyzer.
- Renamed the project according to its [npm](https://www.npmjs.com) package name.
- Updated the package dependencies.

## Version [0.1.1](https://git.belin.io/cedx/gulp-php-minify/compare/v0.1.0...v0.1.1)
- Fixed some bugs.
- Updated the package dependencies.

## Version 0.1.0
- Initial release.
