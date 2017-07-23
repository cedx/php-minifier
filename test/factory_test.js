'use strict';

const {expect} = require('chai');
const {Minifier, phpMinify: factory} = require('../lib');

/**
 * @test {factory}
 */
describe('factory()', () => {
  it('should return a `Minifier` instance', () => {
    expect(factory()).to.be.instanceof(Minifier);
  });

  it('should properly initialize the minifier properties', () => {
    let minifier = factory({
      binary: '/usr/local/bin/php',
      mode: 'fast',
      silent: true
    });

    expect(minifier.binary).to.equal(process.platform == 'win32' ? '\\usr\\local\\bin\\php' : '/usr/local/bin/php');
    expect(minifier.mode).to.equal('fast');
    expect(minifier.silent).to.be.true;
  });
});
