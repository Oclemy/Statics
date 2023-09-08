# Drawing Application

>  An Android application made in kotlin. Allows users to draw sketches on the screen using different brushes and colours. Functionality of importing images from gallery as background and sharing the drawing via Whatsapp , Email etc..

A drawing app designed for kids with functionalities such as :-
• Pick a colour from the listed colours
• Pick from 3 different stroke size
• Storing the drawing on your phone
• Undo Strokes
• Importing an image from gallery and add as background
• Sharing the drawing via Whatsapp , Email

Here's a demo of the app :-

https://user-images.githubusercontent.com/70281464/178120724-2c7c5a52-551e-4fc7-b056-fd4fb123943e.mov

### Full Example

Awaiting below is a full android sample to demonstrate Drawing concept.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of java8 features.

We then declare our app dependencies under the `dependencies` closure. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib` library.
2. Our `Core-ktx` library.
3. Our `Appcompat` library.
4. Our `Material` library.
5. Our `Constraintlayout` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
}

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.3"

    defaultConfig {
        applicationId "com.example.kidsdrawingapp"
        minSdkVersion 21
        targetSdkVersion 30
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
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {

    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.5.0'
    implementation 'androidx.appcompat:appcompat:1.3.0'
    implementation 'com.google.android.material:material:1.4.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
}
```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `READ_EXTERNAL_STORAGE` permission.
2. Our `WRITE_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.kidsdrawingapp">
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.KidsDrawingApp">
        <activity android:name=".MainActivity"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <provider
            android:authorities="com.example.kidsdrawingapp.fileprovider"
            android:name="androidx.core.content.FileProvider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/path"/>

        </provider>
    </application>

</manifest>
```
#### Step 3. Create XML

Create a directory known as `xml` inside your `res` directory and add the following xml file:


**(a). `path.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
 <external-path
     name="captured"
     path="Android/data/com.example.kidsdrawingapp/files"/>
</paths>
```
#### Step 4. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `dialog_custom_progress.xml`**


> Our `dialog_custom_progress` layout.

Inside your `/res/layout/` directory create an xml layout file named `dialog_custom_progress.xml`.

- [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
- [`ProgressBar`](https://android.camposha.info/en/progressbar)
- [`TextView`](https://android.camposha.info/en/textview)


```xml
<?xml version="1.0" encoding="utf-8"?>
<!--TODO(Step 1 : Creating a view for custom progress dialog)-->
<!--START-->
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:orientation="horizontal"
    android:padding="10dp">

    <ProgressBar
        android:id="@+id/progressBar"
        android:layout_width="50dp"
        android:layout_height="50dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/textView"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Please Wait..."
        android:textColor="@android:color/black"
        android:textSize="16sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toEndOf="@+id/progressBar"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
    <!--END-->
```

**(b). `dialog_brush_size.xml`**


> Our `dialog_brush_size` layout.

Create an xml layout file named `dialog_brush_size.xml` and add the following widgets:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. [`ImageButton`](htpps://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:gravity="center">
    <ImageButton
        android:id="@+id/ib_small_brush"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:contentDescription="image_small"
        android:src="@drawable/small"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/ib_medium_brush"/>
    <ImageButton
        android:id="@+id/ib_medium_brush"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:contentDescription="image_medium"
        android:src="@drawable/medium"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@id/ib_small_brush"
        app:layout_constraintBottom_toTopOf="@+id/ib_large_brush"/>
    <ImageButton
        android:id="@+id/ib_large_brush"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:contentDescription="image_large"
        android:src="@drawable/large"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@id/ib_medium_brush"
        app:layout_constraintBottom_toBottomOf="parent"/>


</androidx.constraintlayout.widget.ConstraintLayout>
```

**(c). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 6 UI widgets and ViewGroups:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`FrameLayout`](https://android.camposha.info/en/framelayout)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. `com.example.kidsdrawingapp.DrawingView`
5. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
6. [`ImageButton`](https://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <FrameLayout
        android:id="@+id/fl_drawing_view_layout"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_margin="5dp"
        android:background="@drawable/backgroud_drawing_view_layout"
        android:padding="1dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/ll_paint_colors">

        <ImageView
            android:id="@+id/iv_background"
            android:contentDescription="background image"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scaleType="centerCrop"/>
        <com.example.kidsdrawingapp.DrawingView
            android:id="@+id/drawing_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="#80FFFFFF"
             />

    </FrameLayout>

    <LinearLayout
        android:id="@+id/ll_paint_colors"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toTopOf="@+id/ll_action_buttons"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/fl_drawing_view_layout">
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:onClick="paintClicked"
            android:background="@color/skin"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/skin"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:background="@color/black"
            android:layout_margin="2dp"
            android:onClick="paintClicked"
            android:src="@drawable/pallet_normal"
            android:tag="@color/black"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:background="@color/red"
            android:layout_margin="2dp"
            android:onClick="paintClicked"
            android:src="@drawable/pallet_normal"
            android:tag="@color/red"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:background="@color/green"
            android:onClick="paintClicked"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/green"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:onClick="paintClicked"
            android:background="@color/blue"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/blue"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:onClick="paintClicked"
            android:background="@color/yellow"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/yellow"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:background="@color/lollipop"
            android:onClick="paintClicked"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/lollipop"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:onClick="paintClicked"
            android:background="@color/random"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/random"/>
        <ImageButton
            android:layout_width="25dp"
            android:layout_height="25dp"
            android:contentDescription="color_pallet"
            android:onClick="paintClicked"
            android:background="@color/white"
            android:layout_margin="2dp"
            android:src="@drawable/pallet_normal"
            android:tag="@color/white"/>
    </LinearLayout>
    <LinearLayout
        android:id="@+id/ll_action_buttons"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent">
        <ImageButton
            android:id="@+id/ib_gallery"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:src="@drawable/ic_gallery"
            android:contentDescription="gallery image"
            android:scaleType="fitXY"
            android:layout_margin="5dp" />

        <ImageButton
            android:id="@+id/ib_undo"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:src="@drawable/ic_undo"
            android:contentDescription="undo image"
            android:scaleType="fitXY"
            android:layout_margin="5dp" />

        <ImageButton
            android:id="@+id/ib_brush"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:src="@drawable/ic_brush"
            android:contentDescription="brush image"
            android:scaleType="fitXY"
            android:layout_margin="5dp" />
        <ImageButton
            android:id="@+id/ib_save"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:src="@drawable/ic_save"
            android:contentDescription="brush image"
            android:scaleType="fitXY"
            android:layout_margin="5dp" />
    </LinearLayout>


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `DrawingView.kt`**

> Our `DrawingView` class.

Create a Kotlin file named `DrawingView.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `*` from the `android.graphics` package.
3. `AttributeSet` from the `android.util` package.
4. `TypedValue` from the `android.util` package.
5. `MotionEvent` from the `android.view` package.
6. `View` from the `android.view` package.

We will be overriding the following functions: 

1. `onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) `.
2. `onDraw(canvas: Canvas) `.
3. `onTouchEvent(event: MotionEvent?): Boolean `.

We will be creating the following methods:

1. `onClickUndo()`.
2. `setUpDrawing() `.
3. `setsizeforBrush(parameter)` - We pass a `Float` object as a parameter.
4. `setColor(parameter)` - Let's pass a `String` object as a parameter.

**(a). Our `setUpDrawing()` function**

Write the `setUpDrawing()` function as follows:

```kotlin
    private fun setUpDrawing() {
        mDrawPaint = Paint()
        mDrawPath = CustomPath(color,mBrushSize)
        mDrawPaint!!.color = color
        mDrawPaint!!.style = Paint.Style.STROKE
        mDrawPaint!!.strokeJoin = Paint.Join.ROUND
        mDrawPaint!!.strokeCap = Paint.Cap.ROUND
        mCanvasPaint = Paint(Paint.DITHER_FLAG)
        mBrushSize = 20.toFloat()
    }
```

**(b). Our `setColor()` function**

Write the `setColor()` function as follows:

```kotlin
    fun setColor(newColor:String){
        color = Color.parseColor(newColor)
        mDrawPaint!!.color = color
    }
```

**(c). Our `setsizeforBrush()` function**

Write the `setsizeforBrush()` function as follows:

```kotlin
    fun setsizeforBrush(newsize:Float) {
        mBrushSize = TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, newsize, resources.displayMetrics
        )
        mDrawPaint!!.strokeWidth = mBrushSize
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.util.TypedValue
import android.view.MotionEvent
import android.view.View

class DrawingView(context: Context,attrs:AttributeSet): View(context,attrs) {

    private var mDrawPath: CustomPath? = null
    private var mCanvasBitmap: Bitmap? = null
    private var mDrawPaint:Paint? = null
    private var mCanvasPaint:Paint? = null
    private var mBrushSize:Float = 0.toFloat()
    private var color = Color.BLACK
    private var canvas: Canvas? = null
    private val mPaths = ArrayList<CustomPath>()
    private val mUndoPaths = ArrayList<CustomPath>()
    init {
        setUpDrawing()
    }
     fun onClickUndo(){
        if (mPaths.size > 0){
            mUndoPaths.add(mPaths.removeAt(mPaths.size - 1))
            invalidate()
        }

    }
    private fun setUpDrawing() {
        mDrawPaint = Paint()
        mDrawPath = CustomPath(color,mBrushSize)
        mDrawPaint!!.color = color
        mDrawPaint!!.style = Paint.Style.STROKE
        mDrawPaint!!.strokeJoin = Paint.Join.ROUND
        mDrawPaint!!.strokeCap = Paint.Cap.ROUND
        mCanvasPaint = Paint(Paint.DITHER_FLAG)
        mBrushSize = 20.toFloat()
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        mCanvasBitmap = Bitmap.createBitmap(w,h,Bitmap.Config.ARGB_8888)
        canvas = Canvas(mCanvasBitmap!!)
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        canvas.drawBitmap(mCanvasBitmap!!,0f,0f,mCanvasPaint)
        for(path in mPaths){
            mDrawPaint!!.strokeWidth = path.brushThickness
            mDrawPaint!!.color = path.color
            canvas.drawPath(path, mDrawPaint!!)
        }
        if(!mDrawPath!!.isEmpty) {
            mDrawPaint!!.strokeWidth = mDrawPath!!.brushThickness
            mDrawPaint!!.color = mDrawPath!!.color
            canvas.drawPath(mDrawPath!!, mDrawPaint!!)
        }
    }

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        val touchx = event?.x
        val touchy = event?.y
        when(event?.action){
            MotionEvent.ACTION_DOWN -> {
                mDrawPath!!.color = color
                mDrawPath!!.brushThickness = mBrushSize
                mDrawPath!!.reset()
                mDrawPath!!.moveTo(touchx!!,touchy!!)
            }
            MotionEvent.ACTION_MOVE -> {
                mDrawPath!!.lineTo(touchx!!, touchy!!)
            }
            MotionEvent.ACTION_UP -> {
                mPaths.add(mDrawPath!!)
                mDrawPath = CustomPath(color,mBrushSize)
            }
            else -> return false
        }


        invalidate()
        return true
    }

    fun setsizeforBrush(newsize:Float) {
        mBrushSize = TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, newsize, resources.displayMetrics
        )
        mDrawPaint!!.strokeWidth = mBrushSize
    }
    fun setColor(newColor:String){
        color = Color.parseColor(newColor)
        mDrawPaint!!.color = color
    }

    internal inner class CustomPath(var color:Int,var brushThickness:Float): Path() {

    }


}



```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Manifest` from the `android` package.
2. `Activity` from the `android.app` package.
3. `Dialog` from the `android.app` package.
4. `Intent` from the `android.content` package.
5. `PackageManager` from the `android.content.pm` package.
6. `Bitmap` from the `android.graphics` package.
7. `Canvas` from the `android.graphics` package.
8. `Color` from the `android.graphics` package.
9. `Image` from the `android.media` package.
10. `MediaScannerConnection` from the `android.media` package.
11. `AsyncTask` from the `android.os` package.
12. `AppCompatActivity` from the `androidx.appcompat.app` package.
13. `Bundle` from the `android.os` package.
14. `MediaStore` from the `android.provider` package.
15. `View` from the `android.view` package.
16. `*` from the `android.widget` package.
17. `ActivityResultCallback` from the `androidx.activity.result` package.
18. `ActivityResultContracts` from the `androidx.activity.result.contract` package.
19. `ActivityCompat` from the `androidx.core.app` package.
20. `ContextCompat` from the `androidx.core.content` package.
21. `get` from the `androidx.core.view` package.
22. `AsyncTaskLoader` from the `androidx.loader.content` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onPreExecute() `.
3. `doInBackground(vararg params: Any?): String `.
4. `onPostExecute(result: String?) `.

We will be creating the following methods:

1. `showBrushSizeChooserDialog()`.
2. `paintClicked(parameter)` - We pass a `View` object as a parameter.
3. `requestStoragePermission() `.
4. `isReadStorageAllowed():Boolean`.
5. `getBitmapFromView(parameter)` - Pass to this method a `View` object as a parameter.
6. `showProgressDialog()`.
7. `cancelProgressDialog()`.

**(a). Our `isReadStorageAllowed()` function**

Write the `isReadStorageAllowed()` function as follows:

```kotlin
    private fun isReadStorageAllowed():Boolean{
        val result = ContextCompat.checkSelfPermission(this,Manifest.permission.READ_EXTERNAL_STORAGE)
        return result == PackageManager.PERMISSION_GRANTED
    }
```

**(b). Our `requestStoragePermission()` function**

Write the `requestStoragePermission()` function as follows:

```kotlin
    private fun requestStoragePermission() {
        if(ActivityCompat.shouldShowRequestPermissionRationale(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.WRITE_EXTERNAL_STORAGE).toString())){
            Toast.makeText(this,"Need Permission to add background",Toast.LENGTH_LONG).show()
        }
        ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.WRITE_EXTERNAL_STORAGE),
            STORAGE_PERMISSION_CODE)
    }
```

**(c). Our `cancelProgressDialog()` function**

Write the `cancelProgressDialog()` function as follows:

```kotlin
        private fun cancelProgressDialog(){
            mProgressDialog.dismiss()
        }
```

**(d). Our `showBrushSizeChooserDialog()` function**

Write the `showBrushSizeChooserDialog()` function as follows:

```kotlin
    private fun showBrushSizeChooserDialog(){
        val brushDialog = Dialog(this)
        brushDialog.setContentView(R.layout.dialog_brush_size)
        brushDialog.setTitle("Brush size: ")
        val smallBtn = brushDialog.findViewById<ImageButton>(R.id.ib_small_brush)
        val mediumBtn = brushDialog.findViewById<ImageButton>(R.id.ib_medium_brush)
        val largeBtn = brushDialog.findViewById<ImageButton>(R.id.ib_large_brush)
        val drawing_view = findViewById<DrawingView>(R.id.drawing_view)

        smallBtn.setOnClickListener {
            drawing_view.setsizeforBrush(10.toFloat())
            brushDialog.dismiss()
        }
        mediumBtn.setOnClickListener {
            drawing_view.setsizeforBrush(20.toFloat())
            brushDialog.dismiss()
        }
        largeBtn.setOnClickListener {
            drawing_view.setsizeforBrush(30.toFloat())
            brushDialog.dismiss()
        }
        brushDialog.show()

    }
```

**(e). Our `paintClicked()` function**

Write the `paintClicked()` function as follows:

```kotlin
    fun paintClicked(view: View){
        val drawing_view = findViewById<DrawingView>(R.id.drawing_view)
        if(view!== mImageButtonCurrentPaint){
            val imageButton = view as ImageButton
            val colorTag = imageButton.tag.toString()
            drawing_view.setColor(colorTag)
            imageButton.setImageDrawable(
                ContextCompat.getDrawable(this,R.drawable.pallet_pressed)
            )
            mImageButtonCurrentPaint!!.setImageDrawable(
                ContextCompat.getDrawable(this,R.drawable.pallet_normal)
            )
            mImageButtonCurrentPaint = view
        }
    }
```

**(f). Our `showProgressDialog()` function**

Write the `showProgressDialog()` function as follows:

```kotlin
       private fun showProgressDialog(){
           mProgressDialog = Dialog(this@MainActivity)
           mProgressDialog.setContentView(R.layout.dialog_custom_progress)
           mProgressDialog.show()
       }
```

**(g). Our `getBitmapFromView()` function**

Write the `getBitmapFromView()` function as follows:

```kotlin
   private fun getBitmapFromView(view: View):Bitmap{
       val returnedBitmap = Bitmap.createBitmap(view.width,view.height,Bitmap.Config.ARGB_8888)
       val canvas = Canvas(returnedBitmap)
       val bgDrawable = view.background
       if(bgDrawable != null)
       {
           bgDrawable.draw(canvas)
       }else {
           canvas.drawColor(Color.WHITE)
       }
       view.draw(canvas)
       return returnedBitmap
   }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.media.Image
import android.media.MediaScannerConnection
import android.os.AsyncTask
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.*
import androidx.activity.result.ActivityResultCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.get
import androidx.loader.content.AsyncTaskLoader
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream

class MainActivity : AppCompatActivity() {
    private var mImageButtonCurrentPaint: ImageButton? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val drawing_view = findViewById<DrawingView>(R.id.drawing_view)
        val ib_brush = findViewById<ImageButton>(R.id.ib_brush)
        val ll_paint_colors = findViewById<LinearLayout>(R.id.ll_paint_colors)
        mImageButtonCurrentPaint = ll_paint_colors[1] as ImageButton
        mImageButtonCurrentPaint!!.setImageDrawable(
            ContextCompat.getDrawable(this,R.drawable.pallet_pressed)
        )
        drawing_view.setsizeforBrush(20.toFloat())
        ib_brush.setOnClickListener {
            showBrushSizeChooserDialog()
        }
        val iv_background = findViewById<ImageView>(R.id.iv_background)
        val ib_gallery = findViewById<ImageButton>(R.id.ib_gallery)
        val getAction = registerForActivityResult(ActivityResultContracts.GetContent(),
            ActivityResultCallback { uri ->
                iv_background.setImageURI(uri)
            })

        ib_gallery.setOnClickListener {
            getAction.launch("image/*")
        }
        val ib_undo = findViewById<ImageButton>(R.id.ib_undo)
        ib_undo.setOnClickListener {
            drawing_view.onClickUndo()
        }
        val fl_drawing_view_layout = findViewById<FrameLayout>(R.id.fl_drawing_view_layout)
        val ib_save = findViewById<ImageButton>(R.id.ib_save)
        ib_save.setOnClickListener {
            if(isReadStorageAllowed())
            {
                BitmapAsyncTask(getBitmapFromView(fl_drawing_view_layout)).execute()
            }
            else{
                requestStoragePermission()
            }
        }

    }



    private fun showBrushSizeChooserDialog(){
        val brushDialog = Dialog(this)
        brushDialog.setContentView(R.layout.dialog_brush_size)
        brushDialog.setTitle("Brush size: ")
        val smallBtn = brushDialog.findViewById<ImageButton>(R.id.ib_small_brush)
        val mediumBtn = brushDialog.findViewById<ImageButton>(R.id.ib_medium_brush)
        val largeBtn = brushDialog.findViewById<ImageButton>(R.id.ib_large_brush)
        val drawing_view = findViewById<DrawingView>(R.id.drawing_view)

        smallBtn.setOnClickListener {
            drawing_view.setsizeforBrush(10.toFloat())
            brushDialog.dismiss()
        }
        mediumBtn.setOnClickListener {
            drawing_view.setsizeforBrush(20.toFloat())
            brushDialog.dismiss()
        }
        largeBtn.setOnClickListener {
            drawing_view.setsizeforBrush(30.toFloat())
            brushDialog.dismiss()
        }
        brushDialog.show()

    }


    fun paintClicked(view: View){
        val drawing_view = findViewById<DrawingView>(R.id.drawing_view)
        if(view!== mImageButtonCurrentPaint){
            val imageButton = view as ImageButton
            val colorTag = imageButton.tag.toString()
            drawing_view.setColor(colorTag)
            imageButton.setImageDrawable(
                ContextCompat.getDrawable(this,R.drawable.pallet_pressed)
            )
            mImageButtonCurrentPaint!!.setImageDrawable(
                ContextCompat.getDrawable(this,R.drawable.pallet_normal)
            )
            mImageButtonCurrentPaint = view
        }
    }
    private fun requestStoragePermission() {
        if(ActivityCompat.shouldShowRequestPermissionRationale(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.WRITE_EXTERNAL_STORAGE).toString())){
            Toast.makeText(this,"Need Permission to add background",Toast.LENGTH_LONG).show()
        }
        ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE,Manifest.permission.WRITE_EXTERNAL_STORAGE),
            STORAGE_PERMISSION_CODE)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray)
    {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if(requestCode==PackageManager.PERMISSION_GRANTED){
            if(grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                Toast.makeText(this@MainActivity,"Permission granted to read storage file",Toast.LENGTH_LONG).show()
            }else{
                Toast.makeText(this,"Oops you were just denied the permission",Toast.LENGTH_LONG).show()
            }
        }
    }
    private fun isReadStorageAllowed():Boolean{
        val result = ContextCompat.checkSelfPermission(this,Manifest.permission.READ_EXTERNAL_STORAGE)
        return result == PackageManager.PERMISSION_GRANTED
    }

   private fun getBitmapFromView(view: View):Bitmap{
       val returnedBitmap = Bitmap.createBitmap(view.width,view.height,Bitmap.Config.ARGB_8888)
       val canvas = Canvas(returnedBitmap)
       val bgDrawable = view.background
       if(bgDrawable != null)
       {
           bgDrawable.draw(canvas)
       }else {
           canvas.drawColor(Color.WHITE)
       }
       view.draw(canvas)
       return returnedBitmap
   }
    private inner class BitmapAsyncTask(val mBitmap:Bitmap): AsyncTask<Any, Void, String>(){
        private lateinit var mProgressDialog:Dialog
        override fun onPreExecute() {
            super.onPreExecute()
            showProgressDialog()
        }
        override fun doInBackground(vararg params: Any?): String {
            var result = ""
            if(mBitmap != null)
            {   try {
                val bytes = ByteArrayOutputStream()
                mBitmap.compress(Bitmap.CompressFormat.PNG,90,bytes)
                val f = File(externalCacheDir!!.absoluteFile.toString()+File.separator
                        +"KidDrawingApp_"+ System.currentTimeMillis()/1000+".png")
                val fos = FileOutputStream(f)
                fos.write(bytes.toByteArray())
                fos.close()
                result = f.absolutePath

            }catch (e: Exception){
                result = ""
                e.printStackTrace()
            }
            }
            return result
        }

        override fun onPostExecute(result: String?) {
            super.onPostExecute(result)
            cancelProgressDialog()
            MediaScannerConnection.scanFile(this@MainActivity, arrayOf(result),null){
                path, uri -> val shareIntent = Intent()
                shareIntent.action = Intent.ACTION_SEND
                shareIntent.putExtra(Intent.EXTRA_STREAM,uri)
                shareIntent.type = "image/png"
                startActivity(
                    Intent.createChooser(shareIntent,"Share")
                )
            }
        }
       private fun showProgressDialog(){
           mProgressDialog = Dialog(this@MainActivity)
           mProgressDialog.setContentView(R.layout.dialog_custom_progress)
           mProgressDialog.show()
       }
        private fun cancelProgressDialog(){
            mProgressDialog.dismiss()
        }
    }
    companion object {
        private const val STORAGE_PERMISSION_CODE = 1
        private const val GALLERY = 2
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/guneer491/Drawing-Application/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/guneer491/Drawing-Application).|
|3.|Follow code author [here](https://github.com/guneer491).|
