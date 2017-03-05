<?php
/**
 * Implementation of the `gulp\php_minify\Application` class.
 */
namespace gulp\php_minify;

/**
 * An HTTP server that strip comments and whitespace from the files specified in client requests.
 */
class Application {

  /**
   * Handles the PHP execution errors such as warnings and notices.
   * @param int $severity The level of the error raised.
   * @param string $message The error message.
   * @param string $file The filename that the error was raised in.
   * @param int $line The line number the error was raised at.
   * @return bool Whether the error was handled.
   * @throws \ErrorException When an error occurred.
   */
  public function handleError(int $severity, string $message, string $file = __FILE__, int $line = __LINE__): bool {
    if (error_reporting() & $severity) throw new \ErrorException($message, 0, $severity, $file, $line);
    return false;
  }

  /**
   * Runs the application.
   * @param array $args The request parameters.
   */
  public function run(array $args = []) {
    set_error_handler([$this, 'handleError']);
    try { $this->sendResponse($this->processRequest($args)); }
    catch(\Exception $e) { $this->sendResponse($e->getMessage(), $e->getCode()); }
  }

  /**
   * Processes the specified request body.
   * @param array $args The request sent by a client.
   * @return string The stripped source code corresponding to the provided file.
   * @throws \Exception The requirements are not met, or an error occurred.
   */
  public function processRequest(array $args): string {
    if (!isset($args['file']) || !mb_strlen($args['file'])) throw new \LogicException('Bad Request', 400);
    if (!is_file($args['file'])) throw new \RuntimeException('Not Found', 404);

    $output = php_strip_whitespace($args['file']);
    if (!mb_strlen($output)) throw new \RuntimeException('Internal Server Error', 500);
    return $output;
  }

  /**
   * Sends the specified response body.
   * @param string $body The response body to send to the client.
   * @param int $status The status code of the response.
   */
  public function sendResponse(string $body, int $status = 200) {
    http_response_code($status);
    header('Content-Length: '.strlen($body));
    header('Content-Type: text/plain');
    echo $body;
  }
}

// Start the application.
(new Application())->run($_GET);
