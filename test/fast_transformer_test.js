import chai from 'chai';
import {FastTransformer} from '../lib/index.js';

/** Tests the features of the {@link FastTransformer} class. */
describe('FastTransformer', function() {
  const {expect} = chai;
  this.retries(2);
  this.timeout(30000);

  describe('#listening', () => {
    const transformer = new FastTransformer;

    it('should return whether the server is listening', async () => {
      expect(transformer.listening).to.be.false;

      await transformer.listen();
      expect(transformer.listening).to.be.true;

      await transformer.close();
      expect(transformer.listening).to.be.false;
    });
  });

  describe('#close()', () => {
    const transformer = new FastTransformer;

    it('should complete without any error', async () => {
      await transformer.listen();
      await transformer.close();
      expect(true).to.be.ok;
    });

    it('should be callable multiple times', async () => {
      await transformer.close();
      await transformer.close();
      expect(true).to.be.ok;
    });
  });

  describe('#listen()', () => {
    const transformer = new FastTransformer;
    after(() => transformer.close());

    it('should complete without any error', async () => {
      await transformer.listen();
      expect(true).to.be.ok;
    });

    it('should be callable multiple times', async () => {
      await transformer.listen();
      await transformer.listen();
      expect(true).to.be.ok;
    });
  });

  describe('#transform()', () => {
    const script = 'test/fixtures/sample.php';
    const transformer = new FastTransformer;
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
