/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {retries, suite, test, timeout} from 'mocha-typescript';
import * as File from 'vinyl';
import {Minifier} from '../src';

/**
 * Tests the features of the `Minifier` class.
 */
@suite(retries(3), timeout(60000))
class MinifierTest {

  /**
   * Tests the `Minifier#_transform()` method.
   */
  @test async testTransform(): Promise<void> {
    const minifier = new Minifier({silent: true});
    after(() => minifier.emit('end'));

    // It should remove the comments and whitespace.
    const file = new File({path: 'test/fixtures/sample.php'});
    await minifier._transform(file);
    expect(file.contents!.toString()).to.contain("<?= 'Hello World!' ?>")
      .and.contain('namespace dummy; class Dummy')
      .and.contain('$className = get_class($this); return $className;')
      .and.contain('__construct() { }');
  }
}
