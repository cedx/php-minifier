/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {retries, suite, test, timeout} from 'mocha-typescript';
import {SafeTransformer} from '../src';

/**
 * Tests the features of the `SafeTransformer` class.
 */
@suite(retries(2), timeout(30000))
class SafeTransformerTest {

  /**
   * @test {SafeTransformer#close}
   */
  @test public async testClose(): Promise<void> {
    const transformer = new SafeTransformer;

    // It should complete without any error.
    await transformer.close();
    expect(true).to.be.ok;

    // It should be callable multiple times.
    await transformer.close();
    await transformer.close();
    expect(true).to.be.ok;
  }

  /**
   * @test {SafeTransformer#transform}
   */
  @test public async testTransform(): Promise<void> {
    const script = 'test/fixtures/sample.php';
    const transformer = new SafeTransformer;
    after(async () => await transformer.close());

    // It should remove the inline comments.
    expect(await transformer.transform(script)).to.contain("<?= 'Hello World!' ?>");

    // It should remove the multi-line comments.
    expect(await transformer.transform(script)).to.contain('namespace dummy; class Dummy');

    // It should remove the single-line comments.
    expect(await transformer.transform(script)).to.contain('$className = get_class($this); return $className;');

    // It should remove the whitespace.
    expect(await transformer.transform(script)).to.contain('__construct() { }');
  }
}
