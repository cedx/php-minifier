path: blob/master
source: example/gulpfile.ts

# ESM Upgrade Path for TypeScript
If you use a `gulpfile.ts` script, you will need to add support for ES modules.

!!! warning
    Remember that to use TypeScript with Gulp, you must also have
    the [`ts-node`](https://www.npmjs.com/package/ts-node) package installed.

## Install the `esm` package
Gulp does not natively support ES modules, but it is able to work with them thanks to the [`esm` package](https://www.npmjs.com/package/esm). Modify your project to add this additional dependency:

```shell
npm install --save-dev esm
```

## Enable the ESM module loader
You must create a specific [Gulp configuration file](https://www.npmjs.com/package/gulp-cli#configuration), next to your `gulpfile.ts` script.
In this configuration file, you must require the `esm` package using the [`--require` flag from Node.js](https://nodejs.org/api/cli.html#cli_r_require_module).

For example, you can use a [JSON](https://www.json.org) file, named `.gulp.json`, with this contents:

```json
{
  "flags": {
    "nodeFlags": ["--require=esm"]
  }
}
```

If you prefer to keep the [TypeScript](https://www.typescriptlang.org) syntax, you can use a file named `.gulp.ts` with this contents:

```typescript
module.exports = {
  flags: {
    nodeFlags: ['--require=esm']
  }
};
```

That's it!
