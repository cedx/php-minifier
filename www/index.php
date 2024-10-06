<?php declare(strict_types=1);

/**
 * Application entry point.
 * @param array<string, string> $query The query string.
 */
function main(array $query): void {
	if (empty($query["file"])) throw new LogicException("Bad Request", 400);
	$output = php_strip_whitespace($query["file"]);
	if (!$output) throw new RuntimeException("Not Found", 404);
	sendResponse($output, "application/x-php");
}

/**
 * Sends the specified response to the client.
 * @param string $body The response body.
 * @param string $mediaType The response media type.
 * @param int $status The status code of the response.
 */
function sendResponse(string $body, string $mediaType = "application/octet-stream", int $status = 200): void {
	http_response_code($status);
	header("Content-Length: ".strlen($body));
	header("Content-Type: $mediaType");
	print $body;
}

// Start the application.
try {
	set_error_handler(fn($severity, $message, $file, $line) => throw new ErrorException($message, 500, $severity, $file, $line));
	main($_GET);
}
catch (Throwable $e) {
	$code = $e->getCode();
	sendResponse($e->getMessage(), "text/plain", $code >= 400 && $code < 600 ? $code : 500);
}
