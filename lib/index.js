/**
 * Package entry point.
 * @module index
 */
const PHPMinifier = require('./php_minifier.js');
module.exports = options => new PHPMinifier(options);
