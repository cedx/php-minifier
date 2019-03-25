<?php declare(strict_types=1);

/**
 * Implementation of the `dummy\Dummy` class.
 */
namespace dummy;

/**
 * A dummy class.
 */
class Dummy {

  /**
   * Creates a new instance.
   */
  public function __construct() {

  }

  /**
   * A dummy method.
   * @return string The class name.
   */
  public function __toString(): string {
    // A comment.
    $className = get_class($this);

    // Another one.
    return $className;
  }
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Tests</title>
  </head>

  <body>
    <h1>
      <?= /* An inline coment. */ 'Hello World!' ?>
    </h1>
  </body>
</html>
