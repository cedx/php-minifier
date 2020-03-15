<?php declare(strict_types=1); namespace Gulp\PhpMinify; class Server { function handleError(int $severity, string $message, string $file = __FILE__, int $line = __LINE__): bool { assert(mb_strlen($file) > 0); assert($line > 0); if (error_reporting() & $severity) throw new \ErrorException($message, 0, $severity, $file, $line); return false; } function run(array $args = []): void { set_error_handler([$this, 'handleError']); try { $this->sendResponse($this->processRequest($args)); } catch (\Throwable $e) { $this->sendResponse($e->getMessage(), $e->getCode()); } } function sendResponse(string $body, int $status = 200): void { assert($status >= 100 && $status < 600); http_response_code($status); header('Content-Length: '.strlen($body)); header('Content-Type: text/plain; charset='.mb_internal_encoding()); echo $body; } private function processRequest(array $args): string { if (!isset($args['file']) || !mb_strlen($args['file'])) throw new \LogicException('Bad Request', 400); if (!is_file($args['file'])) throw new \RuntimeException('Not Found', 404); $output = php_strip_whitespace($args['file']); if (!mb_strlen($output)) throw new \RuntimeException('Internal Server Error', 500); return $output; } } (new Server)->run($_GET); 