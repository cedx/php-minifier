import {$} from "execa";
import pkg from "../package.json" with {type: "json"};

// Publishes the package.
for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
