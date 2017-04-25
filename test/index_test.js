'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Minifier, phpMinify} from '../src/index';

/**
 * @test {phpMinify}
 */
describe('phpMinify()', () => {
  it('should return a `Minifier` instance', () => {
    expect(phpMinify()).to.be.instanceof(Minifier);
  });

  it('should properly initialize the minifier properties', () => {
    let minifier = phpMinify({
      binary: '/usr/local/bin/php',
      mode: 'fast',
      silent: true
    });

    expect(minifier.binary).to.equal(process.platform == 'win32' ? '\\usr\\local\\bin\\php' : '/usr/local/bin/php');
    expect(minifier.mode).to.equal('fast');
    expect(minifier.silent).to.be.true;
  });
});
