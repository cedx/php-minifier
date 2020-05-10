<?php declare(strict_types=1);
use Gulp\PhpMinify\{Server};

// Start the application.
require_once __DIR__.'/Server.php';
(new Server)->run($_GET);
