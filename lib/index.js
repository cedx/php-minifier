'use strict';

const {FastTransformer} = require('./fast_transformer');
const {Minifier} = require('./minifier');
const {SafeTransformer} = require('./safe_transformer');
const {TransformMode} = require('./transform_mode');
const {Transformer} = require('./transformer');

module.exports = {
  phpMinify: Minifier.factory,
  FastTransformer,
  Minifier,
  SafeTransformer,
  TransformMode,
  Transformer
};
