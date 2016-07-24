/**
 * Unit tests of the `minifier` module.
 * @module test/minifier_test
 */
const assert = require('assert');
const File = require('vinyl');
const Minifier = require('../lib/minifier');
const path = require('path');

/**
 * Tests the features of the `Minifier` class.
 */
class MinifierTest {

  /**
   * Runs the unit tests.
   */
  run() {
    let self = this;
    describe('Minifier', function() {
      this.timeout(10000);
      describe('constructor()', self.testConstructor);
      describe('_transform()', self.testTransform);
    });
  }

  /**
   * Tests the constructor.
   */
  testConstructor() {
    it('should properly handle the options', () =>
      assert.equal(new Minifier({binary: 'FooBar'})._options.binary, 'FooBar')
    );
  }

  /**
   * Tests the `_transform` method.
   */
  testTransform() {
    let file = new File({path: path.join(__dirname, 'sample.php')});

    it('should remove the inline comments', done =>
      new Minifier()._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().indexOf('<?= \'Hello World!\' ?>') > 0);
        done();
      })
    );

    it('should remove the multi-line comments', done =>
      new Minifier()._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().indexOf('namespace dummy; class Dummy') > 0);
        done();
      })
    );

    it('should remove the single-line comments', done =>
      new Minifier()._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().indexOf('$className = get_class($this); return $className;') > 0);
        done();
      })
    );

    it('should remove the whitespace', done =>
      new Minifier()._transform(file, 'utf8', (err, result) => {
        assert.ifError(err);
        assert(result.contents.toString().indexOf('__construct() { }') > 0);
        done();
      })
    );
  }
}

// Run all tests.
new MinifierTest().run();
