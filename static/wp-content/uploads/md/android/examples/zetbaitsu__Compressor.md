# Compressor


> Compressor is a lightweight and powerful android image compression library. 
 
Compressor will allow you to compress large photos into smaller sized photos with very less or negligible loss in quality of the image.

Follow the following steps:

### Step 1: Install it:

```groovy
dependencies {
    implementation 'id.zelory:compressor:3.0.1'
}
```
### Step 2: Compresss

To Compress Image File:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile)
```

To Compress Image File to specific destination:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    default()
    destination(myFile)
}
```
### Customize Compressor

Using default constraint and custom partial of it:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    default(width = 640, format = Bitmap.CompressFormat.WEBP)
}
```

Full custom constraint

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    resolution(1280, 720)
    quality(80)
    format(Bitmap.CompressFormat.WEBP)
    size(2_097_152) // 2 MB
}
```

Using your own custom constraint:

```kotlin
class MyLowerCaseNameConstraint: Constraint {
    override fun isSatisfied(imageFile: File): Boolean {
        return imageFile.name.all { it.isLowerCase() }
    }

    override fun satisfy(imageFile: File): File {
        val destination = File(imageFile.parent, imageFile.name.toLowerCase())
        imageFile.renameTo(destination)
        return destination
    }
}

val compressedImageFile = Compressor.compress(context, actualImageFile) {
    constraint(MyLowerCaseNameConstraint()) // your own constraint
    quality(80) // combine with compressor constraint
    format(Bitmap.CompressFormat.WEBP)
}
```

### Compressor now is using Kotlin coroutines!

Calling Compressor should be done from coroutines scope:

```kotlin
// e.g calling from activity lifecycle scope
lifecycleScope.launch {
    val compressedImageFile = Compressor.compress(context, actualImageFile)
}

// calling from global scope
GlobalScope.launch {
    val compressedImageFile = Compressor.compress(context, actualImageFile)
}
```

To Run Compressor in main thread:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile, Dispatchers.Main)
```

### Reference

Read more [here](https://github.com/zetbaitsu/Compressor/).
