/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {FastTransformer} from '../src';

/** Tests the features of the [[FastTransformer]] class. */
describe('FastTransformer', function() {
  this.retries(2);
  this.timeout(30000);

  let transformer: FastTransformer = new FastTransformer;
  afterEach(async () => await transformer.close());
  beforeEach(() => transformer = new FastTransformer);

  /** Tests the `FastTransformer#listening` property. */
  describe('#listening', () => {
    it('should return whether the server is listening', async () => {
      expect(transformer.listening).to.be.false;

      await transformer.listen();
      expect(transformer.listening).to.be.true;

      await transformer.close();
      expect(transformer.listening).to.be.false;
    });
  });

  /** Tests the `FastTransformer#close()` method. */
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

  /** Tests the `FastTransformer#listen()` method. */
  describe('#listen()', () => {
    it('should complete without any error', async () => {
      await transformer.listen();
      expect(true).to.be.ok;
    });

    it('should be callable multiple times', async () => {
      await transformer.listen();
      expect(true).to.be.ok;
    });
  });

  /** Tests the `FastTransformer#transform()` method. */
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
