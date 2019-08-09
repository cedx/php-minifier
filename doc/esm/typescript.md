path: blob/master
source: example/gulpfile.ts

# ESM Upgrade Path for TypeScript
If you use a `gulpfile.ts` script, you will need to add support for ES modules.

## Install the `esm` package
Gulp does not natively support ES modules, but it is able to work with them thanks to the [`esm` package](https://www.npmjs.com/package/esm). Modify your project to add this additional dependency:

```shell
npm install --save-dev esm
```

## Enable the ESM hook
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

If you prefer the [YAML](https://yaml.org) format, you can use a file named `.gulp.yml` with this contents:

```yaml
flags:
  nodeFlags: ['--require=esm']
```

That's it!
