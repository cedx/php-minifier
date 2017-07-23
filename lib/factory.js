'use strict';

const {normalize} = require('path');
const {sync: which} = require('which');
const {Minifier} = require('./minifier');

/**
 * Create a new instance of the plug-in.
 * @param {object} [options] The plug-in options.
 * @return {Minifier} The newly created instance.
 */
exports.factory = function factory(options = {}) {
  let minifier = new Minifier(typeof options.binary == 'string' ? normalize(options.binary) : which('php'));
  if (typeof options.mode == 'string') minifier.mode = options.mode;
  if (typeof options.silent == 'boolean') minifier.silent = options.silent;
  return minifier;
};
