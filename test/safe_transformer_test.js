import {strict as assert} from 'assert';
import {SafeTransformer} from '../lib/index.js';

/** Tests the features of the {@link SafeTransformer} class. */
describe('SafeTransformer', function() {
  this.retries(2);
  this.timeout(30000);

  describe('.close()', () => {
    const transformer = new SafeTransformer;

    it('should complete without any error', () => {
      assert.doesNotReject(transformer.close());
    });

    it('should be callable multiple times', () => {
      assert.doesNotReject(transformer.close());
      assert.doesNotReject(transformer.close());
    });
  });

  describe('.transform()', () => {
    const script = 'test/fixtures/sample.php';
    const transformer = new SafeTransformer;
    after(() => transformer.close());

    it('should remove the inline comments', async () => {
      assert((await transformer.transform(script)).includes("<?= 'Hello World!' ?>"));
    });

    it('should remove the multi-line comments', async () => {
      assert((await transformer.transform(script)).includes('namespace dummy; class Dummy'));
    });

    it('should remove the single-line comments', async () => {
      assert((await transformer.transform(script)).includes('$className = get_class($this); return $className;'));
    });

    it('should remove the whitespace', async () => {
      assert((await transformer.transform(script)).includes('__construct() { }'));
    });
  });
});
