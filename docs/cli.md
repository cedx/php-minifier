# Command line interface
From a command prompt, install the `php_minifier` executable:

```shell
npm install --global @cedx/php-minifier
```

> Consider adding the [`npm install --global`](https://docs.npmjs.com/files/folders) executables directory to your system path.

Then use it to minify your [PHP](https://www.php.net) source code:

```shell
$ php_minifier --help

Minify PHP source code by removing comments and whitespace.

> php_minifier [flags] <input> [output]

    input  : The input directory.
    output : The output directory.

  Flags:
         --binary, -b : The path to the PHP executable.
      --extension, -e : The extension of the PHP files to process. Defaults to "php".
           --mode, -m : The operation mode of the minifier. Defaults to "safe".
         --silent, -s : Value indicating whether to silence the minifier output.
           --help, -h : Display this help.
        --version, -v : Output the version number.
```

For example:

```shell
$ php_minifier path/to/source/folder path/to/destination/folder
# Minifying: MyClass1.php
# Minifying: subfolder/MyClass2.php
# ...
```

## Flags

### --binary
The minifier relies on the availability of the [PHP](https://www.php.net) executable on the target system. By default, the minifier will use the `php` binary found on the system path.  
If the minifier cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` flag:

```shell
$ php_minifier "--binary=C:\Program Files\PHP\php.exe" path/to/source/folder
```

### --extension
By default, the minifier will process all files with the `.php` extension. If your [PHP](https://www.php.net) scripts use a different file extension, you can specify another extension to process by using the `extension` flag:

```shell
$ php_minifier --extension=php8 path/to/source/folder
```

### --mode
The minifier can work in two manners, which can be selected using the `mode` flag:

- the `safe` mode: as its name implies, this mode is very reliable. But it is also very slow as it spawns a new PHP process for every file to be processed. This is the default mode.
- the `fast` mode: as its name implies, this mode is very fast, but it is not always reliable. It spawns a PHP web server that processes the input files, but on some systems this fails.

```shell
$ php_minifier --mode=fast path/to/source/folder
```

> The minifier defaults to the `safe` mode, but you should really give a try to the `fast` one. The difference is very noticeable.

### --silent
By default, the minifier prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` flag.

```shell
$ php_minifier --silent path/to/source/folder
```
