<?php
/**
 * Sends the specified response to the client.
 * @param string $body The response body.
 * @param string $mediaType The response media type.
 * @param int $status The status code of the response.
 */
function sendResponse(string $body, string $mediaType = "text/plain", int $status = 200): void {
	http_response_code($status);
	header("Content-Length: ".strlen($body));
	header("Content-Type: $mediaType");
	print $body;
}

// Start the application.
try {
	if (empty($_GET["file"])) throw new LogicException("Bad Request", 400);
	$output = @php_strip_whitespace($_GET["file"]);
	if (!$output) throw new RuntimeException("Not Found", 404);
	sendResponse($output, mediaType: "application/x-php");
}
catch (Throwable $e) {
	$code = $e->getCode();
	sendResponse($e->getMessage(), status: $code >= 400 && $code < 600 ? $code : 500);
}
