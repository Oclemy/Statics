# Android LoganSquare Tutorial and Examples

_Android LoganSquare Tutorial and Examples_

Let's cover LoganSquare, a fast JSON library for android and look at several examples.


#### What is LoganSquare?

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

#### LoganSquare Converter For Retrofit

You may already be familiar with [Retrofit](https://camposha.info/android/retrofit) and know it's a type safe HTTP Client for java and android.

As an HTTP Client Retrofit is always used to make HTTP requests against web services. The most common data exchnage for this is JSON. Hence LoganSquare is relevant when working with retrofit. So [@mannodermaus](https://github.com/mannodermaus) wrote a LoganSquare Converter for retrofit.

Normally these converters allow us to map our JSON data to Java POJO classes and vice versa. Thus this prevents us from even having to do the parsing manually. You can find the library [here](https://github.com/mannodermaus/retrofit-logansquare).

This converter is meant to be used solely with Retrofit 2 and above.

Here's a sample:

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://your.server.com/api/")
    .addConverterFactory(LoganSquareConverterFactory.create())
    .build();
```

#### Top Android LoganSquare Opensouce Examples

Let's look at some open source LoganSquare examples.

##### 1\. JSON Parsing and Serialization Example

This is an android LoganSquare exploring how to parse and serialize json data. It is written by [@Lomza](https://github.com/lomza) There are two buttons, one for parsing JSON data while the other for serializing the it. The json data comprise of fields such as Category, tags, comment count, content, description, duration etc. Hence it is a fairly complex json schema.

The results get displayed in a TextView placed inside a ScrollView. That means the result will scrollable.

Here are some of the important classes in this project:

**(a). DateConverter**

This class extends the `DateTypeConverter` defined in LoganSquare. It's roles include:

1. Return a `java.util.Date` when supplied a `JsonParser` object. `JsonParser` is a class defined in Jackson which is a dependency of LoganSquare.

**(b). EnumStringConverter**

This class will return a status when supplied a String and a String when supplied a Status object.

**(a). Status**

Is an enum Defining `ADDED`,`BLOCKED` and `REMOVED` constants.

Here are more resources:

|No.|Resource| |1.|[Documentation](https://github.com/bluelinelabs/LoganSquare/tree/development/docs)| |2.|[Repo]([https://github.com/bluelinelabs/LoganSquare](https://github.com/bluelinelabs/LoganSquare)| |3.|[Full Example](https://github.com/lomza/LoganSquare-Example)| |4.|[Benchmark Demo App](https://github.com/bluelinelabs/LoganSquare/tree/development/BenchmarkDemo)|

#### 2\. Using LoganSquare with Retrofit Example.

There is a great practical example of LoganSquare usage with retrofit involving a simple movie app. The app is written in kotlin and there are explanations for the project.

The project utilizes [Retrofit2](https://camposha.info/android/retrofit), Glide, Retrofit LoganSquare Converter and [RecyclerView](https://camposha.info/android/recyclerview).

The data is fetched from public json data [here](https://jsonplaceholder.typicode.com).

The recyclerview itemviews comprise a textview and imageview to show photo title and thumbnail.

|No.|Resource| |1.|[Documentation](https://medium.com/@gurukarthi.android/kotlin-android-retrofit-logansquare-cc1c3e8d07e9)| |2.|[Repo]([https://github.com/HungerNHeart/Kotlin-Android-Retrofit-LoganSquare](https://github.com/HungerNHeart/Kotlin-Android-Retrofit-LoganSquare)| |3.|[Direct Download](https://github.com/HungerNHeart/Kotlin-Android-Retrofit-LoganSquare/archive/master.zip)|

#### 3\. How to use LoganSquare with Maven

LoganSquare documentation say they are only available for gradle. However what about if you are using maven build system. Well here is [a simple example](https://github.com/thachhoang/logansquare-maven-example) making use of maven build system. The example is written [@thachhoang](https://github.com/thachhoang/).
