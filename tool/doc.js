import {cpSync} from "node:fs";

/**
 * Builds the documentation.
 */
["CHANGELOG.md", "LICENSE.md"].forEach(file => cpSync(file, `docs/${file.toLowerCase()}`));
cpSync("docs/favicon.ico", "docs/api/favicon.ico");
