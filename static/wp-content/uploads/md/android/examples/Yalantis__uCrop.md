# uCrop


> Image Cropping Library for Android.

uCrop aims to provide an ultimate and flexible image cropping experience.

Here is a sample screenshot:

![](https://github.com/Yalantis/uCrop/raw/develop/preview.gif)

### Step 1: Install it


1. Include the library as a local library project.

```groovy
	allprojects {
	   repositories {
	      jcenter()
	      maven { url "https://jitpack.io" }
	   }
	}
```

A lightweight general solution:

```groovy
    implementation 'com.github.yalantis:ucrop:2.2.6' 
```
Get power of the native code to preserve image quality (+ about 1.5 MB to an apk size):

```groovy
     implementation 'com.github.yalantis:ucrop:2.2.6-native'
```

### Step 2: Add to Manifest

Add UCropActivity into your AndroidManifest.xml

```xml
    <activity
        android:name="com.yalantis.ucrop.UCropActivity"
        android:screenOrientation="portrait"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar"/>
```

### Step 3: Write Code:

The uCrop configuration is created using the builder pattern.

```java
    UCrop.of(sourceUri, destinationUri)
        .withAspectRatio(16, 9)
        .withMaxResultSize(maxWidth, maxHeight)
        .start(context);
```


Then Override `onActivityResult` method and handle uCrop result:

```java
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK && requestCode == UCrop.REQUEST_CROP) {
            final Uri resultUri = UCrop.getOutput(data);
        } else if (resultCode == UCrop.RESULT_ERROR) {
            final Throwable cropError = UCrop.getError(data);
        }
    }
```

You may want to add this to your PROGUARD config:

```groovy
    -dontwarn com.yalantis.ucrop**
    -keep class com.yalantis.ucrop** { *; }
    -keep interface com.yalantis.ucrop** { *; }
```

### Customization

If you want to let your users choose crop ratio dynamically, just do not call `withAspectRatio(x, y)`.

uCrop builder class has method `withOptions(UCrop.Options options)` which extends library configurations.

Currently, you can change:

 * image compression format (e.g. PNG, JPEG, WEBP), compression
 * image compression quality [0 - 100]. PNG which is lossless, will ignore the quality setting.
 * whether all gestures are enabled simultaneously
 * maximum size for Bitmap that is decoded from source Uri and used within crop view. If you want to override the default behaviour.
 * toggle whether to show crop frame/guidelines
 * setup color/width/count of crop frame/rows/columns
 * choose whether you want rectangle or oval(`options.setCircleDimmedLayer(true)`) crop area
 * the UI colors (Toolbar, StatusBar, active widget state)
 * and more...

### Compatibility

* Library - Android ICS 4.0+ (API 14) (Android GINGERBREAD 2.3+ (API 10) for versions <= 1.3.2)
* Sample - Android ICS 4.0+ (API 14)
* CPU - armeabi armeabi-v7a x86 x86_64 arm64-v8a (for versions >= 2.1.2)


### Reference

Read more [here](https://github.com/Yalantis/uCrop/).
