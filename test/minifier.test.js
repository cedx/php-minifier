import assert from 'assert';
import File from 'vinyl';
import {Minifier} from '../src';
import path from 'path';

/**
 * @test {Minifier}
 */
describe('Minifier', function() {
  this.timeout(60000);

  /**
   * @test {Minifier#constructor}
   */
  describe('#constructor()', () => {
    it('should initialize the existing properties', () => {
      assert.equal(new Minifier({binary: 'FooBar'})._options.binary, 'FooBar');
      assert.equal(new Minifier({silent: true})._options.silent, true);
    });

    it('should not create new properties', () =>
      assert(!('foo' in new Minifier({foo: 'bar'})))
    );
  });

  /**
   * @test {Minifier#close}
   */
  describe('#close()', () => {
    it('should reject the promise if the PHP process is not started or already terminated', () => {
      let minifier = new Minifier();
      minifier._phpServer = null;
      minifier.close().then(
        () => { throw new Error('This promise should not be resolved.'); },
        () => assert(true)
      );
    });
  });

  /**
   * @test {Minifier#listen}
   */
  describe('#listen()', () => {
    it('should reject the promise if the PHP process is already started', () => {
      let minifier = new Minifier();
      minifier._phpServer = {host: '127.0.0.1:8000'};
      minifier.listen().then(
        () => { throw new Error('This promise should not be resolved.'); },
        () => assert(true)
      );
    });
  });

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let file = new File({path: path.join(__dirname, 'sample.php')});
    let minifier = new Minifier({silent: true});

    it('should remove the inline comments', () =>
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().includes('<?= \'Hello World!\' ?>'));
        return minifier.close();
      })
    );

    it('should remove the multi-line comments', () =>
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().includes('namespace dummy; class Dummy'));
        return minifier.close();
      })
    );

    it('should remove the single-line comments', () =>
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().includes('$className = get_class($this); return $className;'));
        return minifier.close();
      })
    );

    it('should remove the whitespace', () =>
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().includes('__construct() { }'));
        return minifier.close();
      })
    );
  });
});
