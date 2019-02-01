/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Minifier, phpMinify, TransformMode} from '../src';

/**
 * Tests the features of the factory function.
 */
@suite class FactoryTest {

  /**
   * Tests the `phpMinify()` function.
   */
  @test testPhpMinify(): void {
    // It should return a `Minifier` instance.
    expect(phpMinify()).to.be.instanceof(Minifier);

    // It should properly initialize the instance properties.
    const minifier = phpMinify({
      binary: '/usr/local/bin/php',
      mode: TransformMode.fast,
      silent: true
    });

    // @ts-ignore: `_transformer` is a private property.
    expect(minifier._transformer).to.equal('fast@/usr/local/bin/php');
    expect(minifier.silent).to.be.true;
  }
}
