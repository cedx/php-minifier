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
      this.timeout(60000);
      describe('constructor()', self.testConstructor);
      describe('_transform()', self.testTransform);
    });
  }

  /**
   * Tests the constructor.
   */
  testConstructor() {
    it('should properly handle the options', () => {
      assert.equal(new Minifier({binary: 'FooBar'})._options.binary, 'FooBar');
      assert.equal(new Minifier({silent: true})._options.silent, true);
    });
  }

  /**
   * Tests the `_transform` method.
   */
  testTransform() {
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
  }
}

// Run all tests.
new MinifierTest().run();
