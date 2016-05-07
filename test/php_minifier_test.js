/**
 * Unit tests of the `php_minifier` module.
 * @module test/php_minifier_test
 */
'use strict';

// Module dependencies.
const assert = require('assert');
const File = require('vinyl');
const PHPMinifier = require('../lib/php_minifier');
const pkg = require('../package.json');
const stream = require('stream');

/**
 * Tests the features of the `PHPMinifier` class.
 */
class PHPMinifierTest {

  /**
   * Runs the unit tests.
   */
  run() {
    let self = this;
    describe('PHPMinifier', function() {
      this.timeout(15000);
      describe('constructor()', self.testConstructor);
      describe('_transform()', self.testTransform);
    });
  }

  /**
   * Tests the constructor.
   */
  testConstructor() {
    it('should properly handle the options', () =>
      assert.equal(new PHPMinifier({binary: 'FooBar'})._options.binary, 'FooBar')
    );
  }

  /**
   * Tests the `_transform` method.
   */
  testTransform() {
    // TODO
  }
}

// Run all tests.
new PHPMinifierTest().run();
