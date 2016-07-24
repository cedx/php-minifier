/**
 * Package entry point.
 * @module index
 */
const Minifier = require('./minifier');
module.exports = options => new Minifier(options);
