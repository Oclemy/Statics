# Avatarview Android

>  Supports loading profile images with fractional styles, shapes, borders, indicators, and initials for Android..

![Circular ImageView Tutorial](https://user-images.githubusercontent.com/24237865/148317308-8b39adb4-2c24-4094-abb7-8ad808fd1f96.png)


![Circular ImageView Tutorial](https://camo.githubusercontent.com/e4be58c2eb500c8634ceff111c34f70b52db29ed45acc60eaf229098fddc801c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d32312532422d627269676874677265656e2e7376673f7374796c653d666c6174)

AvatarView supports loading profile images with fractional style, borders, indicators, and initials for Android.

### Preview

Here are demo previews:

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview7.gif)

![Circular ImageView Tutorial](https://user-images.githubusercontent.com/24237865/146585515-a10a7446-fa47-4e34-9813-89b14177793d.png)

![Circular ImageView Tutorial](https://user-images.githubusercontent.com/24237865/146585501-889b031c-55d1-4822-9d25-1d2c8ff8bd67.png)


### Step 1: Install it

![Circular ImageView Tutorial](https://camo.githubusercontent.com/6532094a6b94f0a6017930a8de682df1065163c69b81a8faf1cf1c4df984bd7a/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f696f2e67657473747265616d2f617661746172766965772e7376673f6c6162656c3d4d6176656e25323043656e7472616c)

Add the below codes to your root `build.gradle` file (not your module `build.gradle` file).

```groovy
allprojects {
    repositories {
        mavenCentral()
    }
}
```

Next, add the below dependency to your module's `build.gradle` file.

```groovy
dependencies {
    implementation "io.getstream:avatarview-coil:1.0.6"
}
```

Note: The `io.getstream.avatarview-coil` dependency includes `Coil` to load images internally. So if you're using `Coil` in your project, please make sure your project is using the same `Coil` version or exclude `Coil` dependencies to adapt yours.

#### Including the SNAPSHOT

Snapshots of the current development version of AvatarView are available, which track the latest versions.
To import snapshot versions on your project, add the code snippet below on your gradle file.

```groovy
repositories {
   maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
}
```

Next, add the below dependency to your module's `build.gradle` file.

```groovy
dependencies {
    implementation "io.getstream:avatarview-coil:1.0.7-SNAPSHOT"
    implementation "io.getstream:avatarview-glide:1.0.7-SNAPSHOT"
}
```


### Step 2: Usage

First, add the following XML namespace inside your XML layout file.

```kotlin
xmlns:app="http://schemas.android.com/apk/res-auto"
```


#### AvatarView in XML layout

You can customize `AvatarView` in your XML layout by setting attributes.

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewBorderColor="@color/yellow"
    app:avatarViewBorderWidth="3dp"
    app:avatarViewIndicatorBorderColor="@color/white"
    app:avatarViewIndicatorBorderSizeCriteria="10"
    app:avatarViewIndicatorColor="@color/md_green_100"
    app:avatarViewIndicatorEnabled="true"
    app:avatarViewIndicatorPosition="bottomRight"
    app:avatarViewIndicatorSizeCriteria="9"
    app:avatarViewInitialsTextStyle="bold"
    app:avatarViewShape="circle" />
```


#### Loading Single Image

You can load an image on your `AvatarView` by using the `loadImage` method as in the example below:

```kotlin
avatarView.loadImage(data)
```


```kotlin
avatarView.loadImage(
    data = data,
    placeholder = drawable,
    onStart = {
        // started requesting an image
    },
    onComplete = {
        // completed requesting an image
    }
)
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview2.png)


#### Loading Images with Fractional Style

`AvatarView` supports loading up to four images with the fractional style as in the example below:

```kotlin
avatarView.loadImage(
  data = listof(url1, url2, url3, url4)
)
```

avatarViewMaxSectionSize

```kotlin
app:avatarViewMaxSectionSize="4"
```

The default value is 4, and you can set the fractional formats to your taste.
![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview5.png)


#### Loading Placeholder

We can set a placeholder to show a placeholder during loading an image as in the example below:

```kotlin
app:avatarViewPlaceholder="@drawable/stream"
```

Or we can set a drawable manually on the `AvatarView`.

```kotlin
avatarView.placeholder = drawable
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview4.png)


#### Error Placeholder

We can set an error placeholder to show a placeholder when the request failed as in the example below:

```kotlin
app:avatarViewErrorPlaceholder="@drawable/stream"
```

Or we can set a drawable manually on the `AvatarView`.

```kotlin
avatarView.errorPlaceholder = drawable
```


#### Custom ImageRequest

You can customize ImageRequest and provide information to load an image as in the example below:

```kotlin
avatarView.loadImage(
  data = data
) {
    crossfade(true)
    crossfade(300)
    transformations(CircleCropTransformation())
    lifecycle(this@MainActivity)
}
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview9.png)


#### Border

You can customize border relevant attributes as in the example below:

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewBorderColor="@color/white"
    app:avatarViewBorderWidth="3dp" />
```

Also, you can make a gradient for the border with an `avatarViewIndicatorBorderColorArray` attribute. First, declare an array of color in you colors.xml file as in the example below:
avatarViewIndicatorBorderColorArray

#### colors.xml


```kotlin
<array name="rainbow">
    <item>@color/red</item>
    <item>@color/orange</item>
    <item>@color/yellow</item>
    <item>@color/chartreuse</item>
    <item>@color/green</item>
</array>
```

Next, apply the color array with the ``avatarViewBorderColor`Array` attribute instread of the `avatarViewBorderColor` as in the below example:
avatarViewBorderColorArray
avatarViewBorderColor

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewBorderColorArray="@color/white"
    app:avatarViewBorderWidth="3dp" />
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview8.png)


#### Shape

AvatarView supports two shapes; circle and rounded rect. You can customize the shapes as in the example below:

##### Circle

You can set the shape as a `circle` by setting the `avatarViewShape` attribute to `circle`.
avatarViewShape

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewShape="circle" />
```


##### Rounded Rect

You can set the shape as a rounded rect by setting the `avatarViewShape` attribute to `rounded_rect`. Also, you can customize a radius of the border with an `avatarViewBorderRadius` attribute.
avatarViewShape
avatarViewBorderRadius

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewShape="rounded_rect"
    app:avatarViewBorderRadius="21dp"
    />
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview10.png)


#### Indicator

AvatarView supports drawing an indicator, which can be used for presenting a user online status or badges. You can enable it by giving true for an `avatarViewIndicatorEnabled` attribute as in the example below:
avatarViewIndicatorEnabled

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewIndicatorEnabled="true"
    app:avatarViewIndicatorColor="@color/green"
    app:avatarViewIndicatorBorderColor="@color/white"
    app:avatarViewIndicatorSizeCriteria="9"
    app:avatarViewIndicatorBorderSizeCriteria="10"
    app:avatarViewIndicatorPosition="bottomRight" />
```

As you can see above, you can customize the color of the indicator and border of the indicator, size criteria, and position. Also, you can customize the whole indicator with your custom drawable resource:

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewIndicatorDrawable="@drawable/stream" />
```

![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview3.png)


#### Initials

``AvatarView`` supports drawing initials. You can draw and customize initials instead of loading an image over the ``AvatarView`` as in the example below:

```xml
<io.getstream.avatarview.AvatarView
    android:layout_width="110dp"
    android:layout_height="110dp"
    app:avatarViewInitials="AB"
    app:avatarViewInitialsBackgroundColor="@color/skyBlue"
    app:avatarViewInitialsTextColor="@color/white"
    app:avatarViewInitialsTextSize="21sp"
    app:avatarViewInitialsTextSizeRatio="0.33"
    app:avatarViewInitialsTextStyle="bold" />
```


#### AvatarCoil

The `io.getstream.avatarview-coil` dependency supports customizing the internal Coil that is called `AvatarCoil`.
AvatarCoil

#### Custom ImageLoader

You can load images with your custom ``ImageLoader`` to load ``AvatarView`` by setting an ``ImageLoader``Factory on the `AvatarCoil`. Then all ``AvatarView`` will be loaded by the provided ``ImageLoader`` as in example the below:
AvatarCoil

```kotlin
AvatarCoil.setImageLoader(
    AvatarImageLoaderFactory(context) {
        crossfade(true)
        crossfade(400)
        okHttpClient {
            OkHttpClient.Builder()
                .cache(CoilUtils.createDefaultCache(context))
                .build()
        }
    }
)
```


### Custom AvatarBitmapFactory


#### Loading custom Avatar bitmaps

Avatar bitmaps are created by the internal bitmap factory called `AvatarBitmapFactory`. However, you can override the image loading methods and provide your own bitmap loader like the example below:
Note: The `loadAvatarBitmapBlocking` method takes precedence over this one if both are implemented.

```kotlin
AvatarCoil.setAvatarBitmapFactory(
    object : AvatarBitmapFactory(context) {
        override suspend fun loadAvatarBitmap(data: Any?): Bitmap? {
            return withContext(Dispatchers.IO) {
                val imageResult = context.imageLoader.execute(
                    ImageRequest.Builder(context)
                       .headers(AvatarCoil.imageHeadersProvider.getImageRequestHeaders().toHeaders())
                       .data(data)
                       .build()
                )
                (imageResult.drawable as? BitmapDrawable)?.bitmap
            }
        }
    }
)
```

If you don't use coroutines, you can override `loadAvatarBitmapBlocking` method instead.

```kotlin
AvatarCoil.setAvatarBitmapFactory(
    object : AvatarBitmapFactory(context) {
        override fun loadAvatarBitmapBlocking(): Bitmap? {
            return // return your loaded Bitmap
        }
    }
)
```


#### Loading custom Avatar placeholder bitmaps

Basically, you can draw your `placeholder` drawable by setting the `placeholder` property on the `AvatarView`. However, you can provide your own bitmap loader by overriding the `loadAvatarPlaceholderBitmap` method like the example below:
Note: The `loadAvatarPlaceholderBitmap` will be executed if the previous image request failed. And the `loadAvatarPlaceholderBitmap`Blocking method takes precedence over this one if both are implemented.

```kotlin
AvatarCoil.setAvatarBitmapFactory(
    object : AvatarBitmapFactory(context) {
        override fun loadAvatarPlaceholderBitmap(): Bitmap? {
            return // return your loaded placeholder Bitmap
        }
    }
)
```

If you don't use coroutines, you can override `loadAvatarPlaceholderBitmapBlocking` method instead like the example below:

```kotlin
AvatarCoil.setAvatarBitmapFactory(
    object : AvatarBitmapFactory(context) {
        override fun loadAvatarPlaceholderBitmapBlocking(): Bitmap? {
            return // return your loaded placeholder Bitmap
        }
    }
)
```


### Custom ImageHeadersProvider

If you're using your own CDN, you can set the `imageHeadersProvider` on `AvatarCoil` to load image data with your own header as in the example below:
AvatarCoil

```kotlin
AvatarCoil.imageHeadersProvider = yourImageHeadersProvider
```


### AvatarView with Glide

We highly recommend using AvatarView-Coil to load images if possible. However, you can also use Glide instead.
👉 Check out AvatarView-Glide.


### Stream Integration

AvatarView supports integrating features with Stream Chat SDK for Android. First, You can simply integrate with Stream Chat SDK by adding the dependency below:

```groovy
dependencies {
    implementation "io.getstream:avatarview-stream-integration:$avatarview_version"
}
```

Next, you should set the `StreamAvatarBitmapFactory` on the `AvatarCoil` as in the below:
AvatarCoil

```kotlin
AvatarCoil.setAvatarBitmapFactory(StreamAvatarBitmapFactory(context))
```

Basically, it will load the `image` extra data of the `User`. But if there's no valid `image` data, the initials from the `name` will be loaded.
![Circular ImageView Tutorial](https://github.com/GetStream/avatarview-android/raw/main/preview/preview6.png)

Then you can set your `User` model to the `AvatarView` as in the example below:

```kotlin
val currentUser = ChatClient.instance().getCurrentUser()
avatarView.setUserData(currentUser)
```

Also, you can set your `Channel` model to the `AvatarView` as in the example below:

```kotlin
avatarView.setChannel(channel)
```

The channel image will be loaded. But if there is no valid channel image, an image composed of members will be loaded.



### Full Example

Let us look at a full Circular ImageView with this library Example below.

<!--more-->


#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our INTERNET permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="io.getstream.avatarviewdemo">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/stream"
        android:label="@string/app_name"
        android:roundIcon="@drawable/stream"
        android:supportsRtl="true"
        android:theme="@style/Theme.AvatarViewDemo">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 2. Design Layouts


**(a). activity_main.xml**

> Our `activity_main` layout.

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `io.getstream.avatarview.AvatarView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/background">

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView1"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_margin="10dp"
            app:avatarViewBorderColorArray="@array/rainbow"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorEnabled="true"
            app:avatarViewIndicatorPosition="bottomRight"
            app:avatarViewIndicatorSizeCriteria="9"
            app:avatarViewInitialsTextColor="@color/white"
            app:avatarViewInitialsTextSize="60sp"
            app:avatarViewInitialsTextStyle="bold"
            app:avatarViewPlaceholder="@drawable/stream"
            app:layout_constraintEnd_toStartOf="@id/avatarView2"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView2"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_margin="10dp"
            app:avatarViewBorderColor="@color/md_orange_200"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorColor="@color/md_orange_100"
            app:avatarViewIndicatorEnabled="true"
            app:avatarViewIndicatorPosition="bottomRight"
            app:avatarViewIndicatorSizeCriteria="8"
            app:avatarViewInitialsTextColor="@color/white"
            app:avatarViewInitialsTextSize="50sp"
            app:avatarViewInitialsTextStyle="bold"
            app:avatarViewPlaceholder="@drawable/stream"
            app:layout_constraintEnd_toStartOf="@id/avatarView3"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toEndOf="@id/avatarView1"
            app:layout_constraintTop_toTopOf="parent"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView3"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_margin="10dp"
            app:avatarViewBorderColor="@color/md_blue_200"
            app:avatarViewBorderWidth="4dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorColor="@color/red"
            app:avatarViewIndicatorEnabled="true"
            app:avatarViewIndicatorPosition="bottomRight"
            app:avatarViewIndicatorSizeCriteria="8"
            app:avatarViewInitialsTextColor="@color/white"
            app:avatarViewInitialsTextSize="50sp"
            app:avatarViewInitialsTextStyle="bold"
            app:avatarViewPlaceholder="@drawable/stream"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toEndOf="@id/avatarView2"
            app:layout_constraintTop_toTopOf="parent"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView4"
            android:layout_width="130dp"
            android:layout_height="130dp"
            android:layout_margin="20dp"
            app:avatarViewBorderColor="@color/blue_200"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorEnabled="false"
            app:avatarViewIndicatorPosition="bottomRight"
            app:avatarViewIndicatorSizeCriteria="8"
            app:avatarViewPlaceholder="@drawable/stream"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/avatarView2"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView5"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_marginHorizontal="10dp"
            android:layout_marginTop="20dp"
            android:elevation="10dp"
            app:avatarViewBorderColor="@color/background"
            app:avatarViewBorderRadius="21dp"
            app:avatarViewBorderWidth="0dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/background"
            app:avatarViewIndicatorDrawable="@drawable/stream"
            app:avatarViewIndicatorEnabled="true"
            app:avatarViewIndicatorPosition="topRight"
            app:avatarViewIndicatorSizeCriteria="3"
            app:avatarViewPlaceholder="@drawable/stream"
            app:avatarViewShape="rounded_rect"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintEnd_toStartOf="@id/avatarView6"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/avatarView4"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView6"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_marginHorizontal="10dp"
            app:avatarViewBorderColorArray="@array/colors"
            app:avatarViewBorderRadius="12dp"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorDrawable="@drawable/stream"
            app:avatarViewIndicatorEnabled="true"
            app:avatarViewIndicatorPosition="bottomRight"
            app:avatarViewIndicatorSizeCriteria="3"
            app:avatarViewPlaceholder="@drawable/stream"
            app:avatarViewShape="rounded_rect"
            app:layout_constraintEnd_toStartOf="@id/avatarView7"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toEndOf="@id/avatarView5"
            app:layout_constraintTop_toTopOf="@id/avatarView5"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView7"
            android:layout_width="110dp"
            android:layout_height="110dp"
            android:layout_marginHorizontal="10dp"
            app:avatarViewBorderColor="@color/md_yellow_200"
            app:avatarViewBorderRadius="18dp"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorEnabled="false"
            app:avatarViewIndicatorPosition="topRight"
            app:avatarViewIndicatorSizeCriteria="9"
            app:avatarViewPlaceholder="@drawable/stream"
            app:avatarViewShape="rounded_rect"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_chainStyle="packed"
            app:layout_constraintStart_toEndOf="@id/avatarView6"
            app:layout_constraintTop_toTopOf="@id/avatarView5"
            tools:src="@tools:sample/avatars" />

        <io.getstream.avatarview.AvatarView
            android:id="@+id/avatarView8"
            android:layout_width="130dp"
            android:layout_height="130dp"
            android:layout_marginHorizontal="10dp"
            android:layout_marginTop="20dp"
            app:avatarViewBorderColor="@color/skyBlue"
            app:avatarViewBorderRadius="18dp"
            app:avatarViewBorderWidth="3dp"
            app:avatarViewErrorPlaceholder="@drawable/stream"
            app:avatarViewIndicatorBorderColor="@color/white"
            app:avatarViewIndicatorBorderSizeCriteria="10"
            app:avatarViewIndicatorEnabled="false"
            app:avatarViewIndicatorPosition="topRight"
            app:avatarViewIndicatorSizeCriteria="9"
            app:avatarViewPlaceholder="@drawable/stream"
            app:avatarViewShape="rounded_rect"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/avatarView7"
            tools:src="@tools:sample/avatars" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). Samples.kt**

> Our `Samples` class.

To begin create a Kotlin file named `Samples.kt`.


Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

object Samples {

    val cats: List<String>
        get() = listOf(
            "https://swiftype-ss.imgix.net/https%3A%2F%2Fcdn.petcarerx.com%2FLPPE%2Fimages%2Farticlethumbs%2FFluffy-Cats-Small.jpg?ixlib=rb-1.1.0&h=320&fit=clip&dpr=2.0&s=c81a75f749ea4ed736b7607100cb52cc.png",
            "https://images.ctfassets.net/cnu0m8re1exe/1GxSYi0mQSp9xJ5svaWkVO/d151a93af61918c234c3049e0d6393e1/93347270_cat-1151519_1280.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill",
            "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
            "https://post.healthline.com/wp-content/uploads/2020/08/cat-thumb2-732x415.jpg",
        ).shuffled()
}


```

**(b). MainActivity.kt**

> Our `MainActivity` class.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import coil.transform.RoundedCornersTransformation
import io.getstream.avatarview.coil.loadImage
import io.getstream.avatarviewdemo.Samples.cats
import io.getstream.avatarviewdemo.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        with(binding) {
            avatarView1.loadImage(cats.take(1))

            avatarView2.loadImage(
                cats.take(2)
            ) {
                crossfade(true)
                crossfade(300)
                lifecycle(this@MainActivity)
            }

            avatarView3.loadImage(
                cats.take(3)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
            }

            avatarView4.loadImage(
                cats.take(4)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
            }

            avatarView5.loadImage(
                cats.take(1)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
            }

            avatarView6.loadImage(
                cats.take(2)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
            }

            avatarView7.loadImage(
                cats.take(3)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
                transformations(
                    RoundedCornersTransformation(36f)
                )
            }

            avatarView8.loadImage(
                cats.take(4)
            ) {
                crossfade(true)
                crossfade(400)
                lifecycle(this@MainActivity)
            }
        }
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/GetStream/avatarview-android/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/GetStream/avatarview-android).|
|3.|Follow code author [here](https://github.com/GetStream).|
