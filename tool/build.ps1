#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

node_modules/.bin/tsc --project src/tsconfig.json
node_modules/.bin/gulp --gulpfile=tool/gulpfile.cjs
