'use strict';

const {FastTransformer} = require('./fast_transformer');
const {Minifier} = require('./minifier');
const {SafeTransformer} = require('./safe_transformer');

module.exports = {
  phpMinify: Minifier.factory,
  FastTransformer,
  Minifier,
  SafeTransformer
};
