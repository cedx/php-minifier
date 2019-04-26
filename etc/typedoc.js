module.exports = {
  excludePrivate: true,
  gaID: process.env.GOOGLE_ANALYTICS_ID,
  gitRevision: 'master',
  mode: 'modules',
  name: 'Gulp-PHP-Minify',
  out: require('path').join(__dirname, '../doc/api')
};
