'use strict';

const {FastTransformer} = require('./fast_transformer.js');
const {Minifier} = require('./minifier.js');
const {SafeTransformer} = require('./safe_transformer.js');
const {TransformMode} = require('./transform_mode.js');
const {Transformer} = require('./transformer.js');

module.exports = {
  phpMinify: Minifier.factory,
  FastTransformer,
  Minifier,
  SafeTransformer,
  TransformMode,
  Transformer
};
