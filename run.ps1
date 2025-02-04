#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
$commandPath = Get-Item $PSCommandPath
$scriptRoot = $commandPath.LinkType ? (Split-Path $commandPath.LinkTarget) : $PSScriptRoot

$entryPoint = "$scriptRoot/lib/cli.js"
if (Test-Path "$entryPoint.map") { & node --enable-source-maps $entryPoint @args }
else { & node $entryPoint @args }
