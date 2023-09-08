# Built-in API

The global Deno namespace contains APIs that are not web standard, including
APIs for reading from files, opening TCP sockets, serving HTTP, and executing
subprocesses, etc.


For a full list of Deno Built-in APIs, see the
[reference](https://deno.land/api@v1.32.1?s=Deno). Below we highlight some
of the most important.


## Errors

The Deno runtime comes with
[20 error classes](https://deno.land/api@v1.32.1#Errors) that can be raised
in response to a number of conditions.


Some examples are:



```typescript
Deno.errors.NotFound;
Deno.errors.WriteZero;
```
They can be used as below:



```typescript
try {
  const file = await Deno.open("./some/file.txt");
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.error("the file was not found");
  } else {
    
    throw error;
  }
}
```
## File System

The Deno runtime comes with
[various functions for working with files and directories](https://deno.land/api@v1.32.1#File_System).
You will need to use --allow-read and --allow-write permissions to gain access
to the file system.


Refer to the links below for code examples of how to use the file system
functions.


## I/O

The Deno runtime comes with
[built-in functions for working with resources and I/O](https://deno.land/api@v1.32.1#I/O).


Refer to the links below for code examples for common functions.


## Network

The Deno runtime comes with
[built-in functions for dealing with connections to network ports](https://deno.land/api@v1.32.1#Network).


Refer to the links below for code examples for common functions.


## Sub Process

The Deno runtime comes with
[built-in functions for spinning up subprocesses](https://deno.land/api@v1.32.1#Sub_Process).


Refer to the links below for code samples of how to create a subprocess.





