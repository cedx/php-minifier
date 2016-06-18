/**
 * Package entry point.
 * @module index
 */
'use strict';

// Module dependencies.
const PHPMinifier = require('./php_minifier.js');

// Public interface.
module.exports = options => new PHPMinifier(options);
