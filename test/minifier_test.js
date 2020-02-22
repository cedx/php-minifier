import chai from 'chai';
import File from 'vinyl';
import {Minifier, TransformMode} from '../lib/index.js';

/** Tests the features of the {@link Minifier} class. */
describe('Minifier', function() {
  const {expect} = chai;
  this.retries(3);
  this.timeout(60000);

  describe('._transform()', () => {
    it('should remove the comments and whitespace using the fast transformer', async () => {
      const file = new File({path: 'test/fixtures/sample.php'});
      const minifier = new Minifier({mode: TransformMode.fast, silent: true});
      await minifier._transform(file);
      minifier.emit('end');

      expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>")
        .and.contain('namespace dummy; class Dummy')
        .and.contain('$className = get_class($this); return $className;')
        .and.contain('__construct() { }');
    });

    it('should remove the comments and whitespace using the safe transformer', async () => {
      const file = new File({path: 'test/fixtures/sample.php'});
      const minifier = new Minifier({mode: TransformMode.safe, silent: true});
      await minifier._transform(file);
      minifier.emit('end');

      expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>")
        .and.contain('namespace dummy; class Dummy')
        .and.contain('$className = get_class($this); return $className;')
        .and.contain('__construct() { }');
    });
  });
});
