'use strict';

const {factory} = require('./factory');
const {FastTransformer} = require('./fast_transformer');
const {Minifier} = require('./minifier');
const {SafeTransformer} = require('./safe_transformer');

module.exports = {
  phpMinify: factory,
  FastTransformer,
  Minifier,
  SafeTransformer
};
