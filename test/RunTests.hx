import instrument.coverage.Coverage;
import tink.testrunner.Reporter.AnsiFormatter;
import tink.testrunner.Reporter.BasicReporter;
import tink.testrunner.Runner;
import tink.unit.TestBatch;

/** Runs the test suite. **/
function main() {
	final tests = TestBatch.make([
		new php_minify.FastTransformerTest(),
		new php_minify.SafeTransformerTest(),
		#if js new php_minify.gulp.MinifierTest() #end
	]);

	ANSI.stripIfUnavailable = false;
	Runner.run(tests, new BasicReporter(new AnsiFormatter())).handle(outcome -> {
		Coverage.endCoverage();
		Runner.exit(outcome);
	});
}
