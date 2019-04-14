/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {retries, suite, test, timeout} from 'mocha-typescript';
import {FastTransformer} from '../src';

/**
 * Tests the features of the [[FastTransformer]] class.
 */
@suite(retries(2), timeout(30000))
class FastTransformerTest {

  /**
   * The transformer to be tested.
   */
  private _transformer: FastTransformer = new FastTransformer;

  /**
   * This method is called after each test.
   */
  async after(): Promise<void> {
    await this._transformer.close();
  }

  /**
   * This method is called before each test.
   */
  before(): void {
    this._transformer = new FastTransformer;
  }

  /**
   * Tests the `FastTransformer#close()` method.
   */
  @test async testClose(): Promise<void> {
    // It should complete without any error.
    await this._transformer.close();
    expect(true).to.be.ok;

    // It should be callable multiple times.
    await this._transformer.close();
    expect(true).to.be.ok;
  }

  /**
   * Tests the `FastTransformer#listen()` method.
   */
  @test async testListen(): Promise<void> {
    // It should complete without any error.
    await this._transformer.listen();
    expect(true).to.be.ok;

    // It should be callable multiple times.
    await this._transformer.listen();
    expect(true).to.be.ok;
  }

  /**
   * Tests the `FastTransformer#listening` property.
   */
  @test async testListening(): Promise<void> {
    // It should return whether the server is listening.
    expect(this._transformer.listening).to.be.false;

    await this._transformer.listen();
    expect(this._transformer.listening).to.be.true;

    await this._transformer.close();
    expect(this._transformer.listening).to.be.false;
  }

  /**
   * Tests the `FastTransformer#transform()` method.
   */
  @test async testTransform(): Promise<void> {
    const script = 'test/fixtures/sample.php';

    // It should remove the inline comments.
    expect(await this._transformer.transform(script)).to.contain("<?= 'Hello World!' ?>");

    // It should remove the multi-line comments.
    expect(await this._transformer.transform(script)).to.contain('namespace dummy; class Dummy');

    // It should remove the single-line comments.
    expect(await this._transformer.transform(script)).to.contain('$className = get_class($this); return $className;');

    // It should remove the whitespace.
    expect(await this._transformer.transform(script)).to.contain('__construct() { }');
  }
}
