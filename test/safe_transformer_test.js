import chai from 'chai';
import {SafeTransformer} from '../lib/index.js';

/** Tests the features of the {@link SafeTransformer} class. */
describe('SafeTransformer', function() {
  const {expect} = chai;
  this.retries(2);
  this.timeout(30000);

  describe('.close()', () => {
    const transformer = new SafeTransformer;

    it('should complete without any error', async () => {
      try { await transformer.close(); }
      catch (err) { expect.fail(err.message); }
    });

    it('should be callable multiple times', async () => {
      try {
        await transformer.close();
        await transformer.close();
      }

      catch (err) {
        expect.fail(err.message);
      }
    });
  });

  describe('.transform()', () => {
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
