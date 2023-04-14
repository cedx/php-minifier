#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
node "$PSScriptRoot/php_minifier.js" @args
