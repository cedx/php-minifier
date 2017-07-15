'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Minifier, SafeTransformer} from '../src/index';

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
    let transformer = new SafeTransformer(new Minifier);

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
