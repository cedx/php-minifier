'use strict';

const {expect} = require('chai');
const {FastTransformer, Minifier} = require('../lib');

/**
 * @test {FastTransformer}
 */
describe('FastTransformer', function() {
  this.timeout(30000);

  /**
   * @test {FastTransformer#listening}
   */
  describe('#listening', () => {
    it('should return whether the server is listening', done => {
      let transformer = new FastTransformer(new Minifier);
      expect(transformer.listening).to.be.false;

      transformer.listen()
        .do(() => expect(transformer.listening).to.be.true)
        .mergeMap(() => transformer.close())
        .do(() => expect(transformer.listening).to.be.false)
        .subscribe(null, done, done);
    });
  });

  /**
   * @test {FastTransformer#transform}
   */
  describe('#transform()', () => {
    let script = 'test/fixtures/sample.php';
    let transformer = new FastTransformer(new Minifier);
    after(() => transformer.close().subscribe());

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
