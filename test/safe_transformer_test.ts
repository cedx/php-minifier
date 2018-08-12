import {expect} from 'chai';
const {SafeTransformer} from '../lib';

/**
 * @test {SafeTransformer}
 */
describe('SafeTransformer', function() {
  this.retries(2);
  this.timeout(30000);

  /**
   * @test {SafeTransformer#close}
   */
  describe('#close()', () => {
    let transformer = new SafeTransformer;

    it('should complete without any error', async () => {
      await transformer.close();
      expect(true).to.be.ok;
    });

    it('should be callable multiple times', async () => {
      await transformer.close();
      await transformer.close();
      expect(true).to.be.ok;
    });
  });

  /**
   * @test {SafeTransformer#transform}
   */
  describe('#transform()', () => {
    let script = 'test/fixtures/sample.php';
    let transformer = new SafeTransformer;
    after(async () => await transformer.close());

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
