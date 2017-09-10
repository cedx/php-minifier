'use strict';

const {expect} = require('chai');
const {Minifier, SafeTransformer} = require('../lib');

/**
 * @test {SafeTransformer}
 */
describe('SafeTransformer', function() {
  this.retries(2);
  this.timeout(30000);

  /**
   * @test {SafeTransformer#transform}
   */
  describe('#transform()', () => {
    let script = 'test/fixtures/sample.php';
    let transformer = new SafeTransformer(new Minifier('php'));

    it('should remove the inline comments', async () => {
      expect(await transformer.transform(script)).to.contain("<?= 'Hello World!' ?>");
    });

    it('should remove the multi-line comments', async () => {
      expect(await transformer.transform(script)).to.contain('namespace dummy; class Dummy');
    });

    it('should remove the single-line comments', async () => {
      expect(await transformer.transform(script)).to.contain('$className = get_class($this); return $className;');
    });

    it('should remove the whitespace', async () => {
      expect(await transformer.transform(script)).to.contain('__construct() { }');
    });
  });
});
