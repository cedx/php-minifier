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
      describe('close()', self.testClose);
      describe('listen()', self.testListen);
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
   * Tests the `close` method.
   */
  testClose() {
    it('should reject the promise if the PHP process is not started or already terminated', () => {
      let minifier = new Minifier();
      minifier._phpServer = null;
      minifier.close().then(
        () => { throw new Error('This promise should not be resolved.'); },
        () => assert(true)
      );
    });
  }

  /**
   * Tests the `listen` method.
   */
  testListen() {
    it('should reject the promise if the PHP process is already started', () => {
      let minifier = new Minifier();
      minifier._phpServer = {host: '127.0.0.1:8000'};
      minifier.listen().then(
        () => { throw new Error('This promise should not be resolved.'); },
        () => assert(true)
      );
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
