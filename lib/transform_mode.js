'use strict';

/**
 * Defines the type of transformation applied by a minifier.
 * @type {object}
 *
 * @property {string} fast Applies a fast transformation.
 * @property {string} safe Applies a safe transformation.
 */
exports.TransformMode = Object.freeze({
  fast: 'fast',
  safe: 'safe'
});
