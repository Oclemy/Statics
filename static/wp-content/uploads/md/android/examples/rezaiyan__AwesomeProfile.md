# How to Animated Profile Page with MotionLayout


>  Android Sample to use [MotionLayout](https://android.camposha.info/en/motionlayout) written in Kotlin..

Here is the demo GIF:

![MotionLayout Tutorial](https://github.com/rezaiyan/AwesomeProfile/raw/master/art/preview.gif)

Let us look at a full `MotionLayout` Example code:

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. `Material` - Collection of Modular and customizable Material Design UI components for Android.
3. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
4. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
5. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"

    defaultConfig {
        applicationId "ir.alirezaiyan.profile"
        minSdkVersion 16
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'com.google.android.material:material:1.2.0-alpha04'
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-beta3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```

#### Step 2. Create Motion XML

Create a directory known as `xml` inside your `res` directory and add the following `profile_motion` transition animations:

**(a). `profile_motion.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
        motion:constraintSetEnd="@id/end"
        motion:constraintSetStart="@id/start">

        <OnSwipe
            motion:dragDirection="dragUp"
            motion:touchAnchorId="@id/recyclerview"
            motion:touchAnchorSide="top" />

        <KeyFrameSet>

        </KeyFrameSet>
    </Transition>

    <ConstraintSet android:id="@+id/start">

        <Constraint
            android:id="@+id/recyclerview"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            android:translationY="-25dp"
            motion:layout_constraintTop_toBottomOf="@+id/avatarImageView">

        </Constraint>


        <Constraint
            android:id="@+id/avatarImageView"
            android:layout_width="match_parent"
            android:layout_height="250dp"
            android:elevation="2dp"
            android:scaleX="1"
            android:scaleY="1"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="parent">

            <CustomAttribute
                motion:attributeName="CornerRadius"
                motion:customIntegerValue="20" />

        </Constraint>

    </ConstraintSet>

    <ConstraintSet android:id="@+id/end">

        <Constraint
            android:id="@+id/recyclerview"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            motion:layout_constraintEnd_toEndOf="parent"
            android:translationY="0dp"
            motion:layout_constraintStart_toStartOf="parent"
            android:layout_marginTop="250dp"
            motion:layout_constraintTop_toTopOf="parent">

        </Constraint>

        <Constraint
            android:id="@+id/avatarImageView"
            android:layout_width="250dp"
            android:layout_height="250dp"
            android:elevation="0dp"
            android:scaleX="0.5"
            android:scaleY="0.5"
            motion:layout_constraintEnd_toEndOf="parent"
            motion:layout_constraintStart_toStartOf="parent"
            motion:layout_constraintTop_toTopOf="@id/recyclerview"
            motion:layout_constraintBottom_toTopOf="@id/recyclerview">

            <CustomAttribute
                motion:attributeName="CornerRadius"
                motion:customIntegerValue="500" />

        </Constraint>

    </ConstraintSet>

</MotionScene>

```
#### Step 3. Design Layouts

For this project let's create the following layouts:

**(a). `item1.xml`**

> Our `item1` layout.

This layout will represent our 's layout. Specify [`androidx.cardview.widget.CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardBackgroundColor="@color/colorPrimary"
    android:layout_marginBottom="10dp"
    app:cardCornerRadius="12dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="200dp">

        <ImageView
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:layout_marginRight="40dp"
            android:background="?selectableItemBackgroundBorderless"
            android:padding="4dp"
            android:src="@drawable/ic_baseline_star_border_24" />

        <TextView
            android:id="@+id/username"
            style="@style/TextAppearance.AppCompat.Light.SearchResult.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:layout_marginTop="64dp"
            android:text="Alfred cervantes"
            android:textColor="#FFF"
            tools:ignore="HardcodedText" />


        <TextView
            android:id="@+id/phonenumber"
            style="@style/TextAppearance.AppCompat.Small"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/username"
            android:layout_centerHorizontal="true"
            android:layout_marginTop="8dp"
            android:textColor="#FFF"
            tools:ignore="HardcodedText"
            tools:text="(800) 555-8501" />

        <ImageView
            android:id="@+id/voicecall"
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:layout_alignParentBottom="true"
            android:layout_margin="16dp"
            android:background="?selectableItemBackgroundBorderless"
            android:padding="4dp"
            android:src="@drawable/ic_baseline_voicemail_24" />


        <ImageView
            android:id="@+id/videocall"
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:layout_alignBaseline="@id/voicecall"
            android:layout_alignParentBottom="true"
            android:layout_margin="16dp"
            android:layout_toRightOf="@id/voicecall"
            android:background="?selectableItemBackgroundBorderless"
            android:padding="4dp"
            android:src="@drawable/ic_baseline_duo_24" />


    </RelativeLayout>

</androidx.cardview.widget.CardView>
```

**(b). `item2.xml`**

> Our `item2` layout.

It has the same widgets as the first layout:

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="10dp"
    app:cardBackgroundColor="@color/colorPrimary"
    app:cardCornerRadius="12dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="200dp">

        <ImageView
            android:id="@+id/videocall"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_alignParentRight="true"
            android:layout_margin="16dp"
            android:background="?selectableItemBackgroundBorderless"
            android:padding="4dp"
            android:src="@drawable/ic_baseline_duo_24" />


        <TextView
            android:id="@+id/phonenumber1"
            style="@style/TextAppearance.AppCompat.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/videocall"
            android:layout_centerHorizontal="true"
            android:textColor="#FFF"
            tools:ignore="HardcodedText"
            android:text="(800) 555-8501" />


        <TextView
            android:id="@+id/phonenumber2"
            style="@style/TextAppearance.AppCompat.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/phonenumber1"
            android:layout_centerHorizontal="true"
            android:layout_marginTop="8dp"
            android:textColor="#FFF"
            tools:ignore="HardcodedText"
            android:text="(800) 555-8502" />


    </RelativeLayout>

</androidx.cardview.widget.CardView>
```

**(c). `item3.xml`**

> Our `item3` layout.

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="10dp"
    app:cardBackgroundColor="@color/colorPrimary"
    app:cardCornerRadius="12dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="200dp">

        <ImageView
            android:id="@+id/videocall"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_alignParentRight="true"
            android:layout_margin="16dp"
            android:background="?selectableItemBackgroundBorderless"
            android:padding="4dp"
            android:src="@drawable/ic_baseline_contact_mail_24" />


        <TextView
            android:id="@+id/address1"
            style="@style/TextAppearance.AppCompat.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/videocall"
            android:layout_centerHorizontal="true"
            android:textColor="#FFF"
            tools:ignore="HardcodedText"
            android:text="alirezaiyann@gmail.com" />


        <TextView
            android:id="@+id/address2"
            style="@style/TextAppearance.AppCompat.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/address1"
            android:layout_centerHorizontal="true"
            android:layout_marginTop="8dp"
            android:textColor="#FFF"
            tools:ignore="HardcodedText"
            android:text="hi@alirezaiyan.ir" />


    </RelativeLayout>

</androidx.cardview.widget.CardView>
```

**(d). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.motion.widget.MotionLayout`](https://android.camposha.info/en/motionlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`RecyclerView`](https://android.camposha.info/en/recyclerview)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`AvatarView`](https://android.camposha.info/en/circular-imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.motion.widget.MotionLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/profileLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorPrimaryDark"
    android:fitsSystemWindows="true"
    app:layoutDescription="@xml/profile_motion"
    tools:context=".MainActivity"
    tools:motionProgress="0.0"
    tools:showPaths="true"
    tools:visibility="visible">


    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerview"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:background="@color/colorPrimaryDark"
        android:clipToPadding="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/avatarImageView"
        tools:itemCount="50"
        tools:listitem="@layout/item1" />

    <ImageView
        android:id="@+id/newrelease"
        android:layout_width="32dp"
        android:layout_height="32dp"
        android:layout_margin="8dp"
        android:background="?selectableItemBackgroundBorderless"
        android:padding="4dp"
        android:src="@drawable/ic_baseline_new_releases_24"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/menu"
        android:layout_width="32dp"
        android:layout_height="32dp"
        android:layout_margin="8dp"
        android:background="?selectableItemBackgroundBorderless"
        android:padding="4dp"
        android:src="@drawable/ic_baseline_more_horiz_24"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />


    <ir.alirezaiyan.profile.AvatarView
        android:id="@+id/avatarImageView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:scaleType="fitXY"
        android:src="@drawable/avatar"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:targetApi="lollipop" />


</androidx.constraintlayout.motion.widget.MotionLayout>

```
#### Step 4. Write Code

Finally we need to write our code as follows:

**(a). `AvatarView.kt`**

> Our `AvatarView` class.

Create a Kotlin file named `AvatarView.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `BitmapDrawable` from the `android.graphics.drawable` package.
2. `ColorDrawable` from the `android.graphics.drawable` package.
3. `Drawable` from the `android.graphics.drawable` package.
4. `AttributeSet` from the `android.util` package.
5. `AppCompatImageView` from the `androidx.appcompat.widget` package.

Then extend the `AppCompatImageView` and add its contents as follows:

First override these callbacks: 

1. `onDraw(canvas: Canvas) `.
2. `onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) `.

Then we will be creating the following functions:

1. `init() `.
2. `setCornerRadius(parameter)` - Pass to this method a `Int` object as a parameter.
3. `getBitmapFromDrawable(parameter)` - We pass a `Drawable?` object as a parameter.
4. `resizeBitmap(width: Int, height: Int): Bitmap `.

**(a). Our `setCornerRadius()` function**

Write the `setCornerRadius()` function as follows:

```kotlin
    fun setCornerRadius(cornerRadius: Int) {
        this.cornerRadius = cornerRadius.toFloat()
        invalidate()
    }
```

**(b). Our `resizeBitmap()` function**

Write the `resizeBitmap()` function as follows:

```kotlin
    private fun resizeBitmap(width: Int, height: Int): Bitmap {
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        mBitmap?.let {
            mMatrix.setScale(width.toFloat() / it.width, height.toFloat() / it.height)
            canvas.drawBitmap(it, mMatrix, null)
        }

        return bitmap
    }
```

**(c). Our `getBitmapFromDrawable()` function**

Write the `getBitmapFromDrawable()` function as follows:

```kotlin
    private fun getBitmapFromDrawable(drawable: Drawable?): Bitmap? {
        if (drawable == null) {
            return null
        }
        return if (drawable is BitmapDrawable) {
            drawable.bitmap
        } else try {
            val bitmap: Bitmap = if (drawable is ColorDrawable) {
                Bitmap
                    .createBitmap(width, height, Bitmap.Config.ARGB_8888)
            } else {
                Bitmap.createBitmap(
                    drawable.intrinsicWidth, drawable.intrinsicHeight,
                    Bitmap.Config.ARGB_8888
                )
            }
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            bitmap
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
```

**(d). Our `init()` function**

Write the `init()` function as follows:

```kotlin
    private fun init() {
        mBitmap = getBitmapFromDrawable(drawable)
        val mBitmapShader =
            BitmapShader(mBitmap!!, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP)
        mBitmapPaint.shader = mBitmapShader
        mBitmapPaint.isAntiAlias = true
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.*
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatImageView

class AvatarView : AppCompatImageView {
    private var mBitmap: Bitmap? = null
    private var cornerRadius = 50f
    private val mBitmapPaint = Paint()
    private val mMatrix = Matrix()
    private val mRectF = RectF()

    constructor(context: Context?) : super(context) {
        init()
    }

    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs) {
        init()
    }

    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    ) {
        val a =
            context.obtainStyledAttributes(attrs, R.styleable.AvatarView, defStyleAttr, 0)
        cornerRadius = a
            .getDimensionPixelSize(R.styleable.AvatarView_av_radius, cornerRadius.toInt()).toFloat()
        a.recycle()
        init()
    }

    private fun init() {
        mBitmap = getBitmapFromDrawable(drawable)
        val mBitmapShader =
            BitmapShader(mBitmap!!, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP)
        mBitmapPaint.shader = mBitmapShader
        mBitmapPaint.isAntiAlias = true
    }

    @SuppressLint("DrawAllocation")
    override fun onDraw(canvas: Canvas) {
        if (mBitmap == null) {
            return
        }
        mBitmapPaint.shader = BitmapShader(
            resizeBitmap(width, height), Shader.TileMode.CLAMP, Shader.TileMode.CLAMP
        )
        mRectF.set(0F, 0F, width.toFloat(), height.toFloat())
        canvas.drawRoundRect(
            mRectF,
            cornerRadius,
            cornerRadius,
            mBitmapPaint
        )
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec)
    }

    fun setCornerRadius(cornerRadius: Int) {
        this.cornerRadius = cornerRadius.toFloat()
        invalidate()
    }

    private fun getBitmapFromDrawable(drawable: Drawable?): Bitmap? {
        if (drawable == null) {
            return null
        }
        return if (drawable is BitmapDrawable) {
            drawable.bitmap
        } else try {
            val bitmap: Bitmap = if (drawable is ColorDrawable) {
                Bitmap
                    .createBitmap(width, height, Bitmap.Config.ARGB_8888)
            } else {
                Bitmap.createBitmap(
                    drawable.intrinsicWidth, drawable.intrinsicHeight,
                    Bitmap.Config.ARGB_8888
                )
            }
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            bitmap
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private fun resizeBitmap(width: Int, height: Int): Bitmap {
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        mBitmap?.let {
            mMatrix.setScale(width.toFloat() / it.width, height.toFloat() / it.height)
            canvas.drawBitmap(it, mMatrix, null)
        }

        return bitmap
    }
}

```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
3. `onBindViewHolder(holder: ViewHolder, position: Int) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerview.layoutManager = LinearLayoutManager(baseContext)
        recyclerview.adapter = Adapter()

        newrelease.setOnClickListener {
            Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("http://github.com/rezaiyan/awesomeprofile")
            }.also { startActivity(it) }
        }
    }


    class Adapter() : RecyclerView.Adapter<Adapter.ViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val layout = when (viewType) {
                0 -> R.layout.item1
                1 -> R.layout.item2
                else -> R.layout.item3
            }

            return ViewHolder(
                LayoutInflater.from(parent.context).inflate(
                    layout,
                    parent,
                    false
                )
            )
        }

        override fun getItemViewType(position: Int) = position

        override fun getItemCount() = 3

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        }

        class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView)
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/rezaiyan/AwesomeProfile/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/rezaiyan/AwesomeProfile).|
|3.|Follow code author [here](https://github.com/rezaiyan).|
