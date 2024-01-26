import {deleteSync} from "del";

// Deletes all generated files.
deleteSync(["lib", "var/**/*"]);
