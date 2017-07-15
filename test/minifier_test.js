'use strict';

import {expect} from 'chai';
import {after, describe, it} from 'mocha';
import File from 'vinyl';
import {FastTransformer, Minifier, SafeTransformer} from '../src/index';

/**
 * @test {Minifier}
 */
describe('Minifier', function() {
  this.timeout(60000);

  /**
   * @test {Minifier#mode}
   */
  describe('#mode', () => {
    it('should be `safe` if the underlying transformer is a `SafeTransformer` one', () => {
      let minifier = new Minifier;
      minifier._transformer = new SafeTransformer(minifier);
      expect(minifier.mode).to.equal('safe');
    });

    it('should be `fast` if the underlying transformer is a `FastTransformer` one', () => {
      let minifier = new Minifier;
      minifier._transformer = new FastTransformer(minifier);
      expect(minifier.mode).to.equal('fast');
    });

    it('should change the underlying transformer on value update', () => {
      let minifier = new Minifier;

      minifier.mode = 'fast';
      expect(minifier._transformer).to.be.instanceOf(FastTransformer);

      minifier.mode = 'safe';
      expect(minifier._transformer).to.be.instanceOf(SafeTransformer);
    });
  });

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let file = new File({path: 'test/fixtures/sample.php'});

    let minifier = new Minifier;
    minifier.silent = true;
    after(() => minifier.emit('end'));

    it('should remove the inline comments', done => {
      minifier._transform(file, 'utf8', (err, file) => {
        if (err) done(err);
        else {
          /* eslint-disable quotes */
          expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>");
          done();
          /* eslint-enable quotes */
        }
      });
    });

    it('should remove the multi-line comments', done => {
      minifier._transform(file, 'utf8', (err, file) => {
        if (err) done(err);
        else {
          expect(file.contents.toString()).to.contain('namespace dummy; class Dummy');
          done();
        }
      });
    });

    it('should remove the single-line comments', done => {
      minifier._transform(file, 'utf8', (err, file) => {
        if (err) done(err);
        else {
          expect(file.contents.toString()).to.contain('$className = get_class($this); return $className;');
          done();
        }
      });
    });

    it('should remove the whitespace', done => {
      minifier._transform(file, 'utf8', (err, file) => {
        if (err) done(err);
        else {
          expect(file.contents.toString()).to.contain('__construct() { }');
          done();
        }
      });
    });
  });
});
