import {$} from "execa";
import pkg from "../package.json" with {type: "json"};

// Publishes the package.
for (const registry of ["https://registry.npmjs.org", "https://npm.pkg.github.com"]) $.sync`npm publish --registry=${registry}`;
for (const action of [["tag"], ["push", "origin"]]) $.sync`git ${action} v${pkg.version}`;
