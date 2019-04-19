/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {SafeTransformer} from '../src';

/** Tests the features of the [[SafeTransformer]] class. */
describe('SafeTransformer', function() {
  this.retries(2);
  this.timeout(30000);

  let transformer: SafeTransformer = new SafeTransformer;
  afterEach(async () => await transformer.close());
  beforeEach(() => transformer = new SafeTransformer);

  /** Tests the `SafeTransformer#close()` method. */
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

  /** Tests the `SafeTransformer#transform()` method. */
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
