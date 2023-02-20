/** Runs the test suite. **/
function main() Sys.command("npx", ["c8",
	"--all",
	"--include=src/**/*.js",
	"--report-dir=var",
	"--reporter=lcovonly",
	"node", "--test"
]);
