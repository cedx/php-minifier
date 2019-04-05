# Installation

## Requirements
Before installing **Gulp-PHP-Minify**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Gulp-PHP-Minify requires Node.js >= **10.15.0**.
    
You can verify if you're already good to go with the following commands:

```shell
node --version
# v11.13.0

npm --version
# 6.7.0
```

!!! info
    If you plan to play with the package sources, you will also need
    [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/gulp-php-minify
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code, you can use:

```js
const {phpMinify} = require('@cedx/gulp-php-minify');
```

!!! info
    This library is packaged as [CommonJS modules](https://nodejs.org/api/modules.html) (`.js` files).
