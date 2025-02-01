Set-StrictMode -Version Latest
$file = "$PSScriptRoot\lib\cli.js"
if (Test-Path "$file.map") { & node --enable-source-maps $file @args }
else { & node $file @args }
