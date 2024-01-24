import tink.testrunner.Reporter.AnsiFormatter;
import tink.testrunner.Reporter.BasicReporter;
import tink.testrunner.Runner;
import tink.unit.TestBatch;

/** Runs the test suite. **/
function main() {
	final tests = TestBatch.make([
		new php_minifier.FastTransformerTest(),
		new php_minifier.SafeTransformerTest(),
		new php_minifier.gulp.PluginTest()
	]);

	ANSI.stripIfUnavailable = false;
	Runner.run(tests, new BasicReporter(new AnsiFormatter())).handle(Runner.exit);
}
