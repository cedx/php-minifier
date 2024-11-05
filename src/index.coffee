export * from "./fast_transformer.js"
export * from "./gulp_plugin.js"
export * from "./safe_transformer.js"

# Creates a new Gulp plugin.
export phpMinify = (options = {}) -> new GulpPlugin options
