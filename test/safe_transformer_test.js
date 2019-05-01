import {expect} from 'chai';
import {SafeTransformer} from '../lib/index.js';

/** Tests the features of the `Finder` class. */
describe('SafeTransformer', function() {
  /* eslint-disable no-invalid-this */
  this.retries(2);
  this.timeout(30000);
  /* eslint-enable no-invalid-this */

  let transformer = new SafeTransformer;
  afterEach(async () => transformer.close());
  beforeEach(() => transformer = new SafeTransformer);

  describe('#close()', () => {
    it('should complete without any error', async () => {
      await transformer.close();
      expect(true).to.be.ok;
    });

    it('should be callable multiple times', async () => {
      await transformer.close();
      expect(true).to.be.ok;
    });
  });

  describe('#transform()', () => {
    const script = 'test/fixtures/sample.php';

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
