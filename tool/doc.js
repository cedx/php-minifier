import {cpSync} from "node:fs";

// Builds the documentation.
for (const file of ["CHANGELOG.md", "LICENSE.md"]) cpSync(file, `docs/${file.toLowerCase()}`);
cpSync("docs/favicon.ico", "docs/api/favicon.ico");
