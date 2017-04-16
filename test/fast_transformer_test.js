'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import path from 'path';
import {FastTransformer, Minifier} from '../src/index';

/**
 * @test {FastTransformer}
 */
describe('FastTransformer', function() {
  this.timeout(30000);

  /**
   * @test {FastTransformer#listening}
   */
  describe('#listening', () => {
    it('should return whether the server is listening', async () => {
      let transformer = new FastTransformer(new Minifier());
      expect(transformer.listening).to.be.false;
      await transformer.listen();
      expect(transformer.listening).to.be.true;
      await transformer.close();
      expect(transformer.listening).to.be.false;
    });
  });

  /**
   * @test {FastTransformer#transform}
   */
  describe('#transform()', () => {
    let script = path.join(__dirname, 'sample.php');
    let transformer = new FastTransformer(new Minifier());

    it('should remove the inline comments', async () => {
      let output = await transformer.transform(script);
      expect(output).to.contain('<?= \'Hello World!\' ?>');
    });

    it('should remove the multi-line comments', async () => {
      let output = await transformer.transform(script);
      expect(output).to.contain('namespace dummy; class Dummy');
    });

    it('should remove the single-line comments', async () => {
      let output = await transformer.transform(script);
      expect(output).to.contain('$className = get_class($this); return $className;');
    });

    it('should remove the whitespace', async () => {
      let output = await transformer.transform(script);
      expect(output).to.contain('__construct() { }');
    });

    return transformer.close();
  });
});
