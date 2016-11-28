'use strict';

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
   * @test {Minifier#listening}
   */
  describe('#listening', () => {
    let minifier = new Minifier();

    it('should return `true` when the server is listening', done => {
      assert.ok(!minifier.listening);
      minifier.listen().subscribe(
        () => assert.ok(minifier.listening),
        done, done
      );
    });

    it('should return `false` when the server is not listening', done => {
      assert.ok(minifier.listening);
      minifier.close().subscribe(
        () => assert.ok(!minifier.listening),
        done, done
      );
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
