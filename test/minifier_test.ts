import {expect} from 'chai';
const File from 'vinyl');
const {Minifier, TransformMode} from '../lib';

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
        mode: TransformMode.fast,
        silent: true
      });

      let executable = process.platform == 'win32' ? '\\usr\\local\\bin\\php' : '/usr/local/bin/php';
      expect(minifier.silent).to.be.true;
      expect(minifier._transformer).to.equal(`fast:${executable}`);
    });
  });

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let minifier = new Minifier({silent: true});
    after(() => minifier.emit('end'));

    it('should remove the comments and whitespace', async () => {
      let file = new File({path: 'test/fixtures/sample.php'});
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>")
        .and.contain('namespace dummy; class Dummy')
        .and.contain('$className = get_class($this); return $className;')
        .and.contain('__construct() { }');
    });
  });
});
