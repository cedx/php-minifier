module.exports = {
  exclude: ['**/index.ts'],
  excludePrivate: true,
  gaID: process.env.GOOGLE_ANALYTICS_ID,
  gitRevision: 'master',
  mode: 'modules',
  name: 'Gulp-PHP-Minify',
  out: 'doc/api'
};
