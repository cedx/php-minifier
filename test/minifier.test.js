import assert from 'assert';
import File from 'vinyl';
import {Minifier} from '../src/index';
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
      assert.equal(new Minifier({binary: './FooBar.exe'}).binary, 'FooBar.exe');
      assert.equal(new Minifier({silent: true}).silent, true);
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new Minifier({foo: 'bar'})));
    });
  });

  /**
   * @test {Minifier#close}
   */
  describe('#close()', () => {
    it('should error the observable if the PHP process is not started or already terminated', done => {
      let minifier = new Minifier();
      minifier._phpServer = null;
      minifier.close().subscribe({
        complete: () => done(new Error('This observable should not be completed.')),
        error: () => done()
      });
    });
  });

  /**
   * @test {Minifier#listen}
   */
  describe('#listen()', () => {
    it('should error the observable if the PHP process is already started', done => {
      let minifier = new Minifier();
      minifier._phpServer = {host: '127.0.0.1:8000'};
      minifier.listen().subscribe({
        complete: () => done(new Error('This observable should not be completed.')),
        error: () => done()
      });
    });
  });

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let file = new File({path: path.join(__dirname, 'sample.php')});
    let minifier = new Minifier({silent: true});

    it('should remove the inline comments', () => {
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert.ok(result.contents.toString().includes('<?= \'Hello World!\' ?>'));
        minifier.close().subscribe();
      });
    });

    it('should remove the multi-line comments', () => {
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert.ok(result.contents.toString().includes('namespace dummy; class Dummy'));
        minifier.close().subscribe();
      });
    });

    it('should remove the single-line comments', () => {
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert.ok(result.contents.toString().includes('$className = get_class($this); return $className;'));
        minifier.close().subscribe();
      });
    });

    it('should remove the whitespace', () => {
      minifier._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert.ok(result.contents.toString().includes('__construct() { }'));
        minifier.close().subscribe();
      });
    });
  });
});
