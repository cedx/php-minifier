<?php declare(strict_types=1);
namespace Gulp\PhpMinify;

/** An HTTP server that strip comments and whitespace from the files specified in client requests. */
class Server {

  /**
   * Runs the application.
   * @param array<string, string> $args The request parameters.
   */
  function run(array $args = []): void {
    try {
      $this->sendResponse($this->processRequest($args));
    }

    catch (\Throwable $e) {
      $code = $e->getCode();
      $this->sendResponse($e->getMessage(), $code >= 400 && $code < 600 ? $code : 500);
    }
  }

  /**
   * Sends the specified response body.
   * @param string $body The response body to send to the client.
   * @param int $status The status code of the response.
   */
  function sendResponse(string $body, int $status = 200): void {
    assert($status >= 100 && $status < 600);

    http_response_code($status);
    if (!headers_sent()) {
      header('Content-Length: '.strlen($body));
      header('Content-Type: text/plain; charset='.mb_internal_encoding());
    }

    echo $body;
  }

  /**
   * Processes the specified request body.
   * @param array<string, string> $args The request sent by a client.
   * @return string The stripped source code corresponding to the provided file.
   * @throws \Exception The requirements are not met, or an error occurred.
   */
  private function processRequest(array $args): string {
    if (!isset($args['file']) || !mb_strlen($args['file'])) throw new \LogicException('Bad Request', 400);

    $file = new \SplFileInfo($args['file']);
    if (!$file->isReadable()) throw new \RuntimeException('Not Found', 404);

    $output = php_strip_whitespace($file->getPathname());
    if (!mb_strlen($output)) throw new \RuntimeException('Internal Server Error', 500);
    return $output;
  }
}
