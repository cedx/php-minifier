'use strict';

const {expect} = require('chai');
const {Minifier, SafeTransformer} = require('../lib');

/**
 * @test {SafeTransformer}
 */
describe('SafeTransformer', function() {
  this.timeout(30000);

  /**
   * @test {SafeTransformer#transform}
   */
  describe('#transform()', () => {
    let script = 'test/fixtures/sample.php';
    let transformer = new SafeTransformer(new Minifier('php'));

    it('should remove the inline comments', done => {
      transformer.transform(script).subscribe(output => {
        /* eslint-disable quotes */
        expect(output).to.contain("<?= 'Hello World!' ?>");
        /* eslint-enable quotes */
      }, done, done);
    });

    it('should remove the multi-line comments', done => {
      transformer.transform(script).subscribe(output => {
        expect(output).to.contain('namespace dummy; class Dummy');
      }, done, done);
    });

    it('should remove the single-line comments', done => {
      transformer.transform(script).subscribe(output => {
        expect(output).to.contain('$className = get_class($this); return $className;');
      }, done, done);
    });

    it('should remove the whitespace', done => {
      transformer.transform(script).subscribe(output => {
        expect(output).to.contain('__construct() { }');
      }, done, done);
    });
  });
});
