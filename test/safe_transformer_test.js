'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {join} from 'path';
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
    let script = join(__dirname, 'fixtures/sample.php');
    let transformer = new SafeTransformer(new Minifier());

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
  });
});
