# Image-minifier Example


> A Minifier is a lightweight (**21KB**) android library for image resizing, format changing and quality focusing in reduce file size.


### Step 1: Install it

Add to Project-level `build.gradle`:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```
Add to Module-level `build.gradle`:

```groovy
dependencies {
    implementation 'com.github.jeziellago:image-minifier:0.1.1'
}
```


### Step 2: Compress Image

With an image file, apply one or multiples transformations:

```kotlin
MinifierFactory.create(context)
    .withImage(originalFile)
    .addTransformations {
        resize(1200, 720)
        convertTo(CompressFormat.JPEG)
    }
    .minify {
        onSuccess { minified -> /* success */ }
        onFailure { error -> /* failure */ }
    }
        
```
or use coroutines:

```kotlin
val minifiedFile: File = MinifierFactory.create(context)
    .withImage(originalFile)
    .addTransformations {
        resize(1200, 720)
        convertTo(CompressFormat.JPEG)
    }
    .minify(Dispatchers.IO)
```

### Step 3: Apply Transformations

Resize:

```kotlin
resize(1200, 720)
```

Format:

```kotlin
convertTo(CompressFormat.JPEG)
```
Gray scale:

```kotlin
colorGrayScale()
```
Quality
```kotlin:

quality(80)
```

### Reference

Read more [here](https://github.com/jeziellago/image-minifier).
