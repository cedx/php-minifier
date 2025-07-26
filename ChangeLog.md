# Changelog

## Version [6.0.0](https://github.com/cedx/php-minifier.js/compare/v5.1.0...v6.0.0)
- Breaking change: renamed the `Transformer` interface to `ITransformer`.
- Updated the project URL.

## Version [5.1.0](https://github.com/cedx/php-minifier.js/compare/v5.0.2...v5.1.0)
- Ported the source code to [TypeScript](https://www.typescriptlang.org).

## Version [5.0.2](https://github.com/cedx/php-minifier.js/compare/v5.0.1...v5.0.2)
- Fixed the [Gulp](https://gulpjs.com) plugin.

## Version [5.0.1](https://github.com/cedx/php-minifier.js/compare/v5.0.0...v5.0.1)
- Fixed the [TypeScript](https://www.typescriptlang.org) typings.

## Version [5.0.0](https://github.com/cedx/php-minifier.js/compare/v4.0.1...v5.0.0)
- Breaking change: dropped support for [CommonJS modules](https://nodejs.org/api/modules.html).
- Ported the source code to [CoffeeScript](https://coffeescript.org).

## Version [4.0.1](https://github.com/cedx/php-minifier.js/compare/v4.0.0...v4.0.1)
- Fixed the [TypeScript](https://www.typescriptlang.org) typings.

## Version [4.0.0](https://github.com/cedx/php-minifier.js/compare/v3.1.0...v4.0.0)
- Breaking change: the `phpMinify()` function now uses a named export instead of a default export.
- Ported the source code to [Haxe](https://haxe.org).
- Restored support for [CommonJS modules](https://nodejs.org/api/modules.html).

## Version [3.1.0](https://github.com/cedx/php-minifier.js/compare/v3.0.0...v3.1.0)
- The `TransformMode` enumeration is now implemented as a frozen object.

## Version [3.0.0](https://github.com/cedx/php-minifier.js/compare/v2.1.2...v3.0.0)
- Breaking change: replaced the use of the `Promise` constructor by calls to the `Promise.withResolvers()` method.

## Version [2.1.2](https://github.com/cedx/php-minifier.js/compare/v2.1.1...v2.1.2)
- Migrated the documentation to the [GitHub wiki](https://github.com/cedx/php-minifier.js/wiki).

## Version [2.1.1](https://github.com/cedx/php-minifier.js/compare/v2.1.0...v2.1.1)
- Fixed a buffer overflow with large [PHP](https://www.php.net) files when using the `safe` transform mode. 

## Version [2.1.0](https://github.com/cedx/php-minifier.js/compare/v2.0.0...v2.1.0)
- Removed the dependency on [execa](https://www.npmjs.com/package/execa) package.

## Version [2.0.0](https://github.com/cedx/php-minifier.js/compare/v1.0.2...v2.0.0)
- Breaking change: dropped support for [CommonJS modules](https://nodejs.org/api/modules.html).
- Ported the source code to [TypeScript](https://www.typescriptlang.org).

## Version [1.0.2](https://github.com/cedx/php-minifier.js/compare/v1.0.1...v1.0.2)
- Fixed a packaging issue.

## Version [1.0.1](https://github.com/cedx/php-minifier.js/compare/v1.0.0...v1.0.1)
- Improved compatibility with [PHP](https://www.php.net) 7.

## Version 1.0.0
- Initial release.
