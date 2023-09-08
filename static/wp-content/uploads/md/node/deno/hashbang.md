# Making Scripts Executable With a Hashbang (Shebang)

## Concepts

* [Deno.env](https://deno.land/api?s=Deno.env) provides the environment variables.
* [env](https://www.man7.org/linux/man-pages/man1/env.1.html) runs a program in a modified environment.


## Overview

Making Deno scripts executable can be useful if you want to make, for example,
small tools.


Note: Hashbangs do not work on Windows.


## Example

In this program we give the context permission to access the environment
variables and print the Deno installation path.



```typescript




const path = Deno.env.get("DENO_INSTALL");

console.log("Deno Install Path:", path);
```
### Permissions

You may require to give the script execution permissions.


#### Linux

### Execute

Start the script by calling it like any other command:


## Details

* A hashbang has to be placed in the first line.
* `-S` splits the command into arguments.
* End the file name in `.ts` for the script to be interpreted as TypeScript.
* Future plans include supporting the command-line option `--ext <type>`,
relieving this naming restriction. See
[denoland/deno#5088](https://github.com/denoland/deno/issues/5088).


## Using hashbang in files with no extension

You may wish to not use an extension for your script's filename. In this case,
you can supply one by using the `--ext` flag:



```typescript
$ cat my_script

console.log("Hello!");
$ ./my_script
Hello!
```



