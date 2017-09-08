'use strict';

const {expect} = require('chai');
const File = require('vinyl');
const {FastTransformer, Minifier, SafeTransformer} = require('../lib');

/**
 * @test {Minifier}
 */
describe('Minifier', function() {
  this.retries(3);
  this.timeout(60000);

  /**
   * @test {Minifier.factory}
   */
  describe('.factory()', () => {
    it('should return a `Minifier` instance', () => {
      expect(Minifier.factory()).to.be.instanceof(Minifier);
    });

    it('should properly initialize the instance properties', () => {
      let minifier = Minifier.factory({
        binary: '/usr/local/bin/php',
        mode: 'fast',
        silent: true
      });

      expect(minifier.binary).to.equal(process.platform == 'win32' ? '\\usr\\local\\bin\\php' : '/usr/local/bin/php');
      expect(minifier.mode).to.equal('fast');
      expect(minifier.silent).to.be.true;
    });
  });

  /**
   * @test {Minifier#mode}
   */
  describe('#mode', () => {
    it('should be `safe` if the underlying transformer is a `SafeTransformer` one', () => {
      let minifier = new Minifier;
      minifier._transformer = new SafeTransformer(minifier);
      expect(minifier.mode).to.equal('safe');
    });

    it('should be `fast` if the underlying transformer is a `FastTransformer` one', () => {
      let minifier = new Minifier;
      minifier._transformer = new FastTransformer(minifier);
      expect(minifier.mode).to.equal('fast');
    });

    it('should change the underlying transformer on value update', () => {
      let minifier = new Minifier;

      minifier.mode = 'fast';
      expect(minifier._transformer).to.be.instanceOf(FastTransformer);

      minifier.mode = 'safe';
      expect(minifier._transformer).to.be.instanceOf(SafeTransformer);
    });
  });

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let file = new File({path: 'test/fixtures/sample.php'});

    let minifier = new Minifier;
    minifier.silent = true;
    after(() => minifier.emit('end'));

    it('should remove the inline comments', async () => {
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>");
    });

    it('should remove the multi-line comments', async () => {
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain('namespace dummy; class Dummy');
    });

    it('should remove the single-line comments', async () => {
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain('$className = get_class($this); return $className;');
    });

    it('should remove the whitespace', async () => {
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain('__construct() { }');
    });
  });
});
