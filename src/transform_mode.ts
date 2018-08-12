const {Enum} from '@cedx/enum');

/**
 * Defines the type of transformation applied by a minifier.
 * @type {Object}
 *
 * @property {string} fast Applies a fast transformation.
 * @property {string} safe Applies a safe transformation.
 */
const TransformMode = Enum.create({
  fast: 'fast',
  safe: 'safe'
});
