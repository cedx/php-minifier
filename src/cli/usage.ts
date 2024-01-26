export default `
Minify PHP source code by removing comments and whitespace.

Usage:
  php_minifier [options] <input> <output>

Arguments:
  input            The path to the input directory.
  output           The path to the output directory.

Options:
  -b, --binary     The path to the PHP executable.
  -e, --extension  The extension of the PHP files to process. Defaults to "php".
  -m, --mode       The operation mode of the minifier. Defaults to "safe".
  -s, --silent     Value indicating whether to silence the minifier output.
  -h, --help       Display this help.
  -v, --version    Output the version number.
`;
