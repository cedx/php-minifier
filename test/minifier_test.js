'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import path from 'path';
import File from 'vinyl';
import {Minifier} from '../src/index';

/**
 * @test {Minifier}
 */
describe('Minifier', function() {
  this.timeout(60000);

  /**
   * @test {Minifier#_transform}
   */
  describe('#_transform()', () => {
    let file = new File({path: path.join(__dirname, 'fixtures/sample.php')});
    let minifier = new Minifier();
    minifier.silent = true;

    it('should remove the inline comments', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('<?= \'Hello World!\' ?>');
    });

    it('should remove the multi-line comments', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('namespace dummy; class Dummy');
    });

    it('should remove the single-line comments', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('$className = get_class($this); return $className;');
    });

    it('should remove the whitespace', async () => {
      let result = await minifier._transform(file, 'utf8');
      expect(result.contents.toString()).to.contain('__construct() { }');
    });

    minifier.emit('end');
  });
});
