import {readFileSync, writeFileSync} from "node:fs";
import {EOL} from "node:os";

// Packages the project.
const file = "bin/php_minifier.cjs";
writeFileSync(file, `#!/usr/bin/env node${EOL}${readFileSync(file, {encoding: "utf8"})}`);
