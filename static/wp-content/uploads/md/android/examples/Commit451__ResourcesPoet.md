# Use ResourcesPoet

>  It is a Kotlin API for generating Android XML Resources.

Here is how you use it:

### Step 1: Install via Gradle

Add the following dependency:

```kotlin
dependencies {
    implementation("com.commit451:resourcespoet:latest.release.here")
}
```


### Step 2: Basic Usage

Write variables to the poet like:

```kotlin
val poet = ResourcesPoet.create()
    .addString("app_name", "Test")
    .addColor("color_primary", "#FF0000")
    .addBool("is_cool", true)
    .addComment("This is a comment")
    .addDrawable("logo", "@drawable/logo")
    .addStyle("AppTheme.Dark", "Base.AppTheme.Dark")
    // etc
    .indent(true)
val xml: String = poet.build()
println(xml)
```

which would output this XML:

```kotlin
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<resources>
    <string name="app_name">Test</string>
    <color name="color_primary">#FF0000</color>
    <bool name="is_cool">true</bool>
    <!--This is a comment-->
    <drawable name="logo">@drawable/logo</drawable>
    <style name="AppTheme.Dark" parent="Base.AppTheme.Dark"/>
</resources>
```

To get the XML result as a file:

```kotlin
val valuesFolder = File(resFolderPath + File.separator + "values")
valuesFolder.mkdirs()
val configXml = File(valuesFolder, "config.xml")
configXml.createNewFile()
poet.build(configXml)
```

You can even start with and modify an existing resource file:

```kotlin
val file = File("some/path/to/file")
val poet = ResourcesPoet.create(file)
    .remove(Type.STRING, "app_name")
    .addString("app_name", "Even Better App Name")
    .add(Type.BOOL, "is_cool", "true")
```


### Supported Types

Most resource types are supported. All look similar in usage:

```kotlin
val poet = ResourcesPoet.create()
    .addBool("is_cool", true)
    .addColor("color_primary", "#FF0000")
    .addComment("This is a comment")
    .addDimension("margin", "2dp")
    .addDrawable("logo", "@drawable/logo")
    .addId("some_id")
    .addInteger("number", 0)
    .addIntegerArray("numbers", numbers)
    .addPlurals("songs", plurals)
    .addString("app_name", "Test")
    .addStringArray("stuff", strings)
    .addStyle("AppTheme.Dark", "Base.AppTheme.Dark")
    .addTypedArray("some_typed_array", typedArray)
```

> It does not allow configuration of more complicated resources like `drawable` and `anim` in the creation sense.

### Reference

|2.|Read more [here](https://github.com/Commit451/ResourcesPoet).|
|3.|Follow code author [here](https://github.com/Commit451).|
