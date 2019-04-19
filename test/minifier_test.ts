/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import * as File from 'vinyl';
import {Minifier} from '../src';

/** Tests the features of the [[Minifier]] class. */
describe('Minifier', function() {
  this.retries(3);
  this.timeout(60000);

  let minifier: Minifier = new Minifier;
  afterEach(() => minifier.emit('end'));
  beforeEach(() => minifier = new Minifier({silent: true}));

  /** Tests the `Minifier#_transform()` method. */
  describe('#transform()', () => {
    it('should remove the comments and whitespace', async () => {
      const file = new File({path: 'test/fixtures/sample.php'});
      await minifier._transform(file);
      expect(file.contents!.toString()).to.contain("<?= 'Hello World!' ?>")
        .and.contain('namespace dummy; class Dummy')
        .and.contain('$className = get_class($this); return $className;')
        .and.contain('__construct() { }');
    });
  });
});
