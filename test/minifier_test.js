'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {join} from 'path';
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
    let file = new File({path: join(__dirname, 'fixtures/sample.php')});
    let minifier = new Minifier;
    minifier.silent = true;

    it('should remove the inline comments', async () => {
      /* eslint-disable quotes */
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain("<?= 'Hello World!' ?>");
      /* eslint-enable quotes */
    });

    it('should remove the multi-line comments', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('namespace dummy; class Dummy');
    });

    it('should remove the single-line comments', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('$className = get_class($this); return $className;');
    });

    it('should remove the whitespace', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('__construct() { }');
    });

    minifier.emit('end');
  });
});
