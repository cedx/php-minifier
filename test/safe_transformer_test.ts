import * as chai from 'chai';
import {SafeTransformer} from '../src/index';

/** Tests the features of the [[SafeTransformer]] class. */
describe('SafeTransformer', function() {
  const {expect} = chai;

  /* eslint-disable no-invalid-this */
  this.retries(2);
  this.timeout(30000);
  /* eslint-enable no-invalid-this */

  describe('#close()', () => {
    const transformer = new SafeTransformer;

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

  describe('#transform()', () => {
    const script = 'test/fixtures/sample.php';
    const transformer = new SafeTransformer;
    after(() => transformer.close());

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
