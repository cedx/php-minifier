/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {context, retries, suite, test, timeout} from 'mocha-typescript';
import {FastTransformer} from '../src';

/**
 * Tests the features of the `FastTransformer` class.
 */
@suite(retries(2), timeout(30000))
class FastTransformerTest {

  /**
   * @test {FastTransformer#close}
   */
  @test public async testClose(): Promise<void> {
    const transformer = new FastTransformer;

    // It should complete without any error.
    await transformer.close();
    expect(true).to.be.ok;

    // It should be callable multiple times.
    await transformer.close();
    await transformer.close();
    expect(true).to.be.ok;
  }

  /**
   * @test {FastTransformer#listen}
   */
  @test public async testListen(): Promise<void> {
    const transformer = new FastTransformer;
    after(async () => await transformer.close());

    // It should complete without any error.
    await transformer.listen();
    expect(true).to.be.ok;

    // It should be callable multiple times.
    await transformer.listen();
    await transformer.listen();
    expect(true).to.be.ok;
  }

  /**
   * @test {FastTransformer#listening}
   */
  @test public async testListening(): Promise<void> {
    const transformer = new FastTransformer;

    // It should return whether the server is listening.
    expect(transformer.listening).to.be.false;

    await transformer.listen();
    expect(transformer.listening).to.be.true;

    await transformer.close();
    expect(transformer.listening).to.be.false;
  }

  /**
   * @test {FastTransformer#transform}
   */
  @test public async testTransform(): Promise<void> {
    const script = 'test/fixtures/sample.php';
    const transformer = new FastTransformer;
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
