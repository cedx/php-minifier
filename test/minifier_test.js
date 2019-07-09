import chai from 'chai';
import File from 'vinyl';
import {Minifier} from '../lib/index.js';

/** Tests the features of the {@link Minifier} class. */
describe('Minifier', function() {
  const {expect} = chai;

  /* eslint-disable no-invalid-this */
  this.retries(3);
  this.timeout(60000);
  /* eslint-enable no-invalid-this */

  let minifier = new Minifier;
  afterEach(() => minifier.emit('end'));
  beforeEach(() => minifier = new Minifier({silent: true}));

  describe('#_transform()', () => {
    it('should remove the comments and whitespace', async () => {
      const file = new File({path: 'test/fixtures/sample.php'});
      await minifier._transform(file);
      expect(file.contents.toString()).to.contain("<?= 'Hello World!' ?>")
        .and.contain('namespace dummy; class Dummy')
        .and.contain('$className = get_class($this); return $className;')
        .and.contain('__construct() { }');
    });
  });
});
