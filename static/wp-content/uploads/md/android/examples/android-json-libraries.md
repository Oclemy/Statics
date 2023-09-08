# Android JSON

_Android JSON Tutorial and Libraries_

In this class we will explore some of the android libraries and classes that allow us work with JSON data.


#### What is JSON

_JSON stands for JavaScript Object Notation and is a language-independent data format that expresses JSON objects as human-readable lists of properties(name-value pairs)._

It is a data format derived from the literals of the JavaScript programming language.

Learn more about JSON here

#### Android JSON Libraries

Let's now come explore some of the JSON libraries used for:

1. JSON Parsing.
2. JSON Serialization

#### LoganSquare

LoganSquare is a fast JSON parsing and serialization library for Android. It's developers claim it is the fastest avaiable JSON parsing and serialization library for android. They say LoganSquare is able to "consistently outperform GSON and Jackson's Databind library by 400% or more".

One of the keys to LoganSquare's performance is the fact that it relies on compile-time annotation processing to generate code.

LoganSquare allows you to make use of the power of Jackson's streaming API. However you do this without having to write tedius, low-level code involving JsonParsers or JsonGenerators. All you do os to annotate your model objects as a `@JsonObject` and your fields as `@JsonFields`. Then LoganSquare does the rest.

##### Installattion

LoganSquare is only available for gradle. So to install first go to your app level build.gradle and add it:

```groovy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.neenbedankt.gradle.plugins:android-apt:1.8'
    }
}
apply plugin: 'com.neenbedankt.android-apt'

dependencies {
    apt 'com.bluelinelabs:logansquare-compiler:1.3.6'
    compile 'com.bluelinelabs:logansquare:1.3.6'
}
```

Here's sample of how to parse JSON:

```java
 // Parse from an InputStream
    InputStream is = ...;
    Image imageFromInputStream = LoganSquare.parse(is, Image.class);

    // Parse from a String
    String jsonString = ...;
    Image imageFromString = LoganSquare.parse(jsonString, Image.class);
```

And here's example of how to deserialize JSON:

```java
 // Serialize it to an OutputStream
    OutputStream os = ...;
    LoganSquare.serialize(image, os);

    // Serialize it to a String
    String jsonString = LoganSquare.serialize(image);
```

Here are more resources:

|No.|Resource| |1.|[Documentation](https://github.com/bluelinelabs/LoganSquare/tree/development/docs)| |2.|[Repo]([https://github.com/bluelinelabs/LoganSquare](https://github.com/bluelinelabs/LoganSquare)| |3.|[Full Example](https://github.com/lomza/LoganSquare-Example)| |4.|[Benchmark Demo App](https://github.com/bluelinelabs/LoganSquare/tree/development/BenchmarkDemo)|
