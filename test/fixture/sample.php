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
	 * A dummy property.
	 * @var int
	 */
	public readonly int $property;

	/**
	 * Creates a new instance.
	 */
	public function __construct() {
		$this->property = 123;
	}

	/**
	 * A dummy method.
	 * @return string The class name.
	 */
	public function __toString(): string {
		// A comment.
		$className = get_class($this);

		// Another comment.
		return $className;
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Tests</title>
	</head>

	<body>
		<h1>
			<?= /* An inline comment. */ 'Hello World!' ?>
		</h1>
	</body>
</html>
