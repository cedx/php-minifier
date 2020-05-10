'use strict';
const {dest, series, src, task} = require('gulp');

/** Builds the project. */
let phpMinify;
task('phpMinify:import', () => import('../lib/index.js').then(mod => phpMinify = mod.phpMinify));
task('phpMinify:run', () => src('../src/php/*.php').pipe(phpMinify()).pipe(dest('../lib/php')));
task('default', series('phpMinify:import', 'phpMinify:run'));
