# How to Execute Shell Commands Programmatically


You may be in a situation where you need to execute shell commands in your android app. The solutions below would be useful to you in that case.


## (a). Use Ktsh

> It is a library allowing you to Execute shell commands on Android or the JVM.

### Install Ktsh

There are two ways of installing this library:

First, you can install Ktsh by adding the following implementation statement to your app-level build.gradle file:

```groovy
implementation 'com.jaredrummler:ktsh:1.0.0'
```

Another approach is simply to copy the [Shell.kt](https://github.com/jaredrummler/KtSh/blob/main/library/src/main/kotlin/com/jaredrummler/ktsh/Shell.kt) file and add it to your project.

### Step 2: Write Code

Start by creating a Shell:

````kotlin
val shell = Shell("sh")                       ```
Then invoke the `run()` method passing in shell command you want executed as a string:
```kotlin
val result = shell.run("echo 'Hello, World!'") 
````

You can check for the success/failure of the result as follows:

```kotlin
if (result.isSuccess) {                         // check if the exit-code was 0
    println(result.stdout())                    // prints "Hello, World!"
}
```

Here are alternative ways of constructing a shell instance:

```kotlin
// Construct a new shell instance with additional environment variables
val shell = Shell("sh", "USER" to "Chuck Norris", "ENV_VAR" to "VALUE")

// Construct a new shell instance with path to the shell:
val bash = Shell("/bin/bash")
```

**Execute a command and get the result:**

```kotlin
val shell = Shell.SH
val result: Shell.Command.Result \= shell.run("ls")
```

A \`Shell.Command.Result\` contains the following:

- \`stdout\`: A list of lines read from the standard input stream.
- \`stderr\`: A list of lines read from the standard error stream.
- \`exitCode\`: The exit status from running the command.
- \`details\`: Additional information (start, stop, elapsed time, id, command)

To add a callback when the stdout or stderr is read

```kotlin
shell.addOnStderrLineListener(object : Shell.OnLineListener {
  override fun onLine(line: String) {
      // do something
  }
})
```

To add a callback that is invoked each time a command comletes:

```kotlin
shell.addOnCommandResultListener(object : Shell.OnCommandResultListener {
  override fun onResult(result: Shell.Command.Result) {
    // do something with the result
  }
})
```

### Example

There is a full example [here](https://github.com/jaredrummler/KtSh/tree/main/demo). If you run the example you will get the following:

![Kotlin Android Execute Shell Commands](https://github.com/jaredrummler/KtSh/raw/main/.github/ktsh-demo.gif)

### Reference

Find the reference links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/jaredrummler/KtSh/archive/refs/heads/main.zip) code |
| 2. | [Read](https://github.com/jaredrummler/KtSh/) more |
| 3. | [Follow](https://github.com/jaredrummler) code author |
