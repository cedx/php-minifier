<?php declare(strict_types=1);

/**
 * Processes the specified request body.
 * @param string[] $args The request sent by a client.
 * @return string The stripped source code corresponding to the provided file.
 * @throws \Exception The requirements are not met, or an error occurred.
 */
function processRequest(array $args): string {
	if (empty($args["file"])) throw new \LogicException("Bad Request", 400);

	$file = $args["file"];
	if (!is_readable($file)) throw new \RuntimeException("Not Found", 404);

	$output = php_strip_whitespace($file);
	if (!$output) throw new \RuntimeException("Internal Server Error", 500);
	return $output;
}

/**
 * Sends the specified response body.
 * @param string $body The response body to send to the client.
 * @param int $status The status code of the response.
 */
function sendResponse(string $body, int $status = 200): void {
	http_response_code($status);
	if (!headers_sent()) {
		header("Content-Length: ".strlen($body));
		header("Content-Type: text/plain; charset=".mb_internal_encoding());
	}

	print $body;
}

// Start the application.
try {
	sendResponse(processRequest($_GET));
}
catch (\Throwable $e) {
	$code = $e->getCode();
	sendResponse($e->getMessage(), $code >= 400 && $code < 600 ? $code : 500);
}
