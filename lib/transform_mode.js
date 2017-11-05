'use strict';
const {Enum} = require('@cedx/enum');

/**
 * Defines the type of transformation applied by a minifier.
 * @type {object}
 *
 * @property {string} fast Applies a fast transformation.
 * @property {string} safe Applies a safe transformation.
 */
exports.TransformMode = Enum.create({
  fast: 'fast',
  safe: 'safe'
});
