# Kompressor


Unfortunately, most of compression libs still work with filesystem and don't support contentUris. It can cause problems with new SDK versions, no matter if you have a `android:requestLegacyExternalStorage=”true"` in manifest or not.
Remember, `contentUris `can point not only to local files, but also to "virtual" files on the cloud. Therefore, this lib is built on input and output streams and it doesn't work with files.

### Step 1: Install it

Install it as shown below:

```groovy
dependencies {
    implementation 'com.github.airatlovesmusic:Kompressor:0.2.0'
}
```
### Step 2: Compress Image

Compress your image as shown below:

```kotlin
val inputStream = context.contentResolver.openInputStream(contentUri)
val compressedData = imageCompressor.compress(
        inputStream = context.contentResolver.openInputStream(contentUri),
        format = Bitmap.CompressFormat.JPEG,
        quality = 70
)
val compressedBitmap = BitmapFactory.decodeStream(compressedData)
```

Do whatever you want with received `OutputStream`, for example you can make Retrofit `RequestBody` with bytes from stream.

### Configuration!

Let's compress something, but with configuration!

```kotlin
val inputStream = context.contentResolver.openInputStream(contentUri)
val compressedData = imageCompressor.compress(
        inputStream = context.contentResolver.openInputStream(contentUri),
        format = Bitmap.CompressFormat.PNG,
        quality = 70,
        steps = resolutionCompression(outHeight = 720, outWidth = 1024) + sizeCompression(FILE_MAX_SIZE)
)
val compressedBitmap = BitmapFactory.decodeStream(compressedData)
```

This library has multiple compression constraints you can combine: 
- resolutionCompression (set up required height and width of result image), 
- sizeCompression (set up max file size of image), 
- rotationCompression (rotate image)
- 
### Custom Configuration

Let's compress something, but with custom configuration!

```kotlin
val inputStream = context.contentResolver.openInputStream(contentUri)
val compressedData = imageCompressor.compress(
        inputStream = context.contentResolver.openInputStream(contentUri),
        format = Bitmap.CompressFormat.PNG,
        quality = 70,
        steps = resolutionCompression(outHeight = 720, outWidth = 1024) + { bm: Bitmap -> bm }
)
val compressedBitmap = BitmapFactory.decodeStream(compressedData)
```

You can also easily add your own custom compression steps by passing function which takes Bitmap and returns Bitmap.

### Reference

Read more [here](https://github.com/airatlovesmusic/Kompressor)
