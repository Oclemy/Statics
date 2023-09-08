# PDFRenderer with ViewPager2

>  PDFRenderer with ViewPager 2.

PDFRenderer class enables rendering a PDF document and this class is not thread safe.
A typical use of the APIs to render a PDF looks like this:

```java
// create a new renderer
 PdfRenderer renderer = new PdfRenderer(getSeekableFileDescriptor());

 // let us just render all pages
 final int pageCount = renderer.getPageCount();
 for (int i = 0; i < pageCount; i++) {
     Page page = renderer.openPage(i);

     // say we render for showing on the screen
     page.render(mBitmap, null, null, Page.RENDER_MODE_FOR_DISPLAY);

     // do stuff with the bitmap

     // close the page
     page.close();
 }

 // close the renderer
 renderer.close();
```


### Other Libraries used in this Project:

- PhotoView: a custom implementation of ImageView that handles smoothly pinch-to-zoom and double-tap to zoom
PhotoView: a custom implementation of ImageView that handles smoothly pinch-to-zoom and double-tap to zoom
ViewPager 2: is now using the RecyclerView components and also brings in a lot of interesting features and improvements, such as:

- Right-to-Left (RTL) support
- Support for vertical paging
- Ability to programmatically scroll the page
- Added MarginPageTransformer and CompositePageTransformer, which allows you to achieve beautiful custom animations for your pages

### Demo

Here is the demo:

![PDFRenderer-with-ViewPager-2 Example Tutorial](https://github.com/jorgecasariego/PDFRenderer-with-ViewPager-2/raw/master/demo/test.gif)

### Full Example

Let us look at a full PDFView with ViewPager Example below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). build.gradle**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

Among the dependencies we add include:

1. Our `Viewpager2` library 
2. Our `PhotoView` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.jorgecasariego.pdfrenderer"
        minSdkVersion 21
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

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_1_8.toString()
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'

    //External Dependencies
    implementation 'androidx.viewpager2:viewpager2:1.0.0'
    implementation 'com.github.chrisbanes:PhotoView:2.3.0'

    implementation "com.google.android.material:material:1.3.0-alpha02"
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    testImplementation 'junit:junit:4.13'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jorgecasariego.pdfrenderer">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). pdf_page_item.xml**


> Our `pdf_page_item` layout.

 inside your `/res/layout/` directory create an xml layout file named `pdf_page_item.xml`.

Afterwhich design your XML layout using the following 2 UI widgets and ViewGroups:

1. `LinearLayout` - Our root View
2. `com.github.chrisbanes.photoview.PhotoView` - Will help in displaying PDF with zooming capabilities.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:padding="5dp">

    <com.github.chrisbanes.photoview.PhotoView
        android:id="@+id/pageImgView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginTop="@dimen/pageMarginAndOffset"
        android:layout_marginBottom="@dimen/pageMarginAndOffset"/>

</LinearLayout>
```

**(b). pdf_activity.xml**


> Our `pdf_activity` layout.

 inside your `/res/layout/` directory create an xml layout file named `pdf_activity.xml`.

After that design your XML layout using the following 5 UI widgets and ViewGroups:

1. `RelativeLayout` - Root element
2. `androidx.appcompat.widget.Toolbar` - Our toolbar
3. `LinearLayout`
4. `ProgressBar` - To show rendering progress
5. `androidx.viewpager2.widget.ViewPager2` - To help provide swipe capabilities.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:animateLayoutChanges="true"
    android:background="#808E9B"
    android:orientation="vertical">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/pdfToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:theme="@style/CustomActionBar"/>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center">
        <ProgressBar
            android:id="@+id/baseProgressBar"
            android:layout_width="wrap_content"
            android:layout_gravity="center"
            android:layout_height="wrap_content"
            android:indeterminateTint="@android:color/white"/>

        <androidx.viewpager2.widget.ViewPager2
            android:id="@+id/pageViewPager"
            android:visibility="gone"
            android:layout_gravity="center"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"/>


    </LinearLayout>

</RelativeLayout>
```

**(c). activity_main.xml**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

After that design your XML layout using the following 2 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). PdfBitmapPool.kt**

> Our `PdfBitmapPool` class.

 create a Kotlin file named `PdfBitmapPool.kt`.

Subsequently we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bitmap` from the `android.graphics` package.
2. `Canvas` from the `android.graphics` package.
3. `Color` from the `android.graphics` package.
4. `PdfRenderer` from the `android.graphics.pdf` package.
5. `Log` from the `android.util` package.
6. `SparseArray` from the `android.util` package.
7. `getOrElse` from the `androidx.core.util` package.

Besides create a class that derives from `Int)` and add its contents as follows:

Besides we will be creating the following methods:

1. `getPage(parameter)` - Our function will take a `Int` object as a parameter which represents the page we are getting
2. `loadMore(parameter)` - Pass to this method a `Int` object as a parameter which is the next page we are loading.
3. `getCurrentRange(parameter)` - Let's pass a `Int` object as a parameter . Get current range of pages.
4. `removeOutOfRangeElements(parameter)` - Let's pass a `IntProgression` object as a parameter.
5. `loadPage(parameter) `- This function will take a `Int` object as a parameter which is the page we are loading.
6. `newWhiteBitmap(width: Int, height: Int): Bitmap ` - Takes a width and height and returns a Bitmap
7. `Int.toPixelDimension(parameter)` - Our function will take a `Float` type as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.pdf.PdfRenderer
import android.util.Log
import android.util.SparseArray
import androidx.core.util.getOrElse

class PdfBitmapPool(val pdfRenderer: PdfRenderer, val config: Bitmap.Config, val densityDpi : Int) {

    val bitmaps: SparseArray<Bitmap> = SparseArray()

    init {
        val initialLoadCount =
            if (pdfRenderer.pageCount < POOL_SIZE) pdfRenderer.pageCount else POOL_SIZE

        for (i in 0 until initialLoadCount) {
            bitmaps.append(i, loadPage(i))
        }
    }

    var currentIndex = 0

    companion object {
        const val POOL_SIZE = 5
        val PDF_RESOLUTION_DPI = 72
    }

    fun getPage(index: Int): Bitmap {
        return bitmaps.getOrElse(index) {
            loadPage(index)
        }
    }

    fun loadMore(newLimitIndex: Int) {

        val newRange = getCurrentRange(newLimitIndex)
        removeOutOfRangeElements(newRange)

        for (i in newRange) {
            if (i != newLimitIndex && i in 0 until bitmaps.size() && bitmaps.indexOfKey(i) < 0)
                bitmaps.append(i, loadPage(i))
        }

        currentIndex = newLimitIndex
    }

    fun getCurrentRange(currentIndex: Int): IntProgression {
        val sectionSize = (POOL_SIZE - 1) / 2
        return (currentIndex - sectionSize)..(currentIndex + sectionSize)
    }

    fun removeOutOfRangeElements(newRange: IntProgression) {
        //Removing elements that are out of range, the bitmap is cleared and pushed back to the unused bitmaps stack
        getCurrentRange(currentIndex).filter { !newRange.contains(it) }.forEach {
            val removingBitmap = bitmaps[it]
            removingBitmap?.let { bitmap ->
                bitmaps.remove(it)
            }
        }
    }

    fun loadPage(pageIndex: Int): Bitmap {
        Log.d(PdfBitmapPool::class.java.simpleName, "Loading page at index $pageIndex")
        val page = pdfRenderer.openPage(pageIndex)
        val bitmap = newWhiteBitmap(page.width.toPixelDimension(), page.height.toPixelDimension())
        page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
        page.close()
        return bitmap
    }

    fun newWhiteBitmap(width: Int, height: Int): Bitmap {
        val bitmap = Bitmap.createBitmap(width, height, config)
        val canvas = Canvas(bitmap)
        canvas.drawColor(Color.WHITE)
        canvas.drawBitmap(bitmap, 0f, 0f, null)
        return bitmap
    }


    fun Int.toPixelDimension(scaleFactor: Float = 0.4f): Int {
        return ((densityDpi * this / PDF_RESOLUTION_DPI) * scaleFactor).toInt()
    }
}

```

**(b). PDFAdapter.kt**

> Our `PDFAdapter` class.

Okay create a Kotlin file named `PDFAdapter.kt`.

Next we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Bitmap` from the `android.graphics` package.
3. `PdfRenderer` from the `android.graphics.pdf` package.
4. `ParcelFileDescriptor` from the `android.os` package.
5. `LayoutInflater` from the `android.view` package.
6. `View` from the `android.view` package.
7. `ViewGroup` from the `android.view` package.
8. `ImageView` from the `android.widget` package.
9. `RecyclerView` from the `androidx.recyclerview.widget` package.

On top of that create a class that derives from `Context)` and add its contents as follows:

We will be overriding the following functions: 

1. `onBindViewHolder(holder: PDFPageViewHolder, position: Int) `.
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): PDFPageViewHolder `.

On top of that we will be creating the following methods:

1. `clear() `.
2. `bind(parameter) - This function will take a `Int` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.graphics.Bitmap
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView

class PDFAdapter(pdfParcelDescriptor: ParcelFileDescriptor, context : Context) : RecyclerView.Adapter<PDFAdapter.PDFPageViewHolder>() {

    private var bitmapPool: PdfBitmapPool? = null
    private val pdfRenderer: PdfRenderer = PdfRenderer(pdfParcelDescriptor)

    init {
        bitmapPool = PdfBitmapPool(pdfRenderer, Bitmap.Config.ARGB_8888,
            context.resources.displayMetrics.densityDpi)
    }

    override fun getItemCount(): Int = pdfRenderer.pageCount

    override fun onBindViewHolder(holder: PDFPageViewHolder, position: Int) {
        holder.bind(position)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PDFPageViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.pdf_page_item, parent, false)
        return PDFPageViewHolder(view)
    }

    fun clear() {
        pdfRenderer.close()
        bitmapPool?.bitmaps?.clear()
    }


    inner class PDFPageViewHolder(val view: View) : RecyclerView.ViewHolder(view) {

        fun bind(pagePosition: Int) {
            val imgPage = view.findViewById<ImageView>(R.id.pageImgView)
            imgPage.setImageBitmap(bitmapPool!!.getPage(pagePosition))
            bitmapPool!!.loadMore(pagePosition)
        }
    }
}






```

**(c). MainActivity.kt**

> Our `MainActivity` class.

Prepare a Kotlin file named `MainActivity.kt`.

After that we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `ParcelFileDescriptor` from the `android.os` package.
3. `MenuItem` from the `android.view` package.
4. `View` from the `android.view` package.
5. `AppCompatActivity` from the `androidx.appcompat.app` package.
6. `ViewCompat` from the `androidx.core.view` package.
7. `ViewPager2` from the `androidx.viewpager2.widget` package.
8. `ORIENTATION_HORIZONTAL` from the `androidx.viewpager2.widget.ViewPager2` package.
9. `*` from the `kotlinx.android.synthetic.main.pdf_activity` package.

Moreover create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onOptionsItemSelected(item: MenuItem?): Boolean `.
3. `onDestroy() `.

Afterwhich we will be creating the following methods:

1. `initPdfViewer(parameter) - Pass to this method a `File` object as a parameter.
2. `getFile() : File`.
3. `File.copyInputStreamToFile(parameter) - Pass to this method a `InputStream` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.os.ParcelFileDescriptor
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.viewpager2.widget.ViewPager2
import androidx.viewpager2.widget.ViewPager2.ORIENTATION_HORIZONTAL
import kotlinx.android.synthetic.main.pdf_activity.*
import java.io.File
import java.io.InputStream

class MainActivity : AppCompatActivity() {
    lateinit var pageViewPager: ViewPager2
    var parcelFileDescriptor: ParcelFileDescriptor? = null
    var pdfAdapter: PDFAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.pdf_activity)

        pageViewPager = findViewById(R.id.pageViewPager)

        with(pageViewPager) {
            clipToPadding = false
            clipChildren = false
            offscreenPageLimit = 3
        }


        val pageMarginPx = resources.getDimensionPixelOffset(R.dimen.pageMargin)
        val offsetPx = resources.getDimensionPixelOffset(R.dimen.offset)

        pageViewPager.setPageTransformer { page, position ->
            val viewPager = page.parent.parent as ViewPager2
            val offset = position * -(2 * offsetPx + pageMarginPx)
            if (viewPager.orientation == ORIENTATION_HORIZONTAL) {
                if (ViewCompat.getLayoutDirection(viewPager) == ViewCompat.LAYOUT_DIRECTION_RTL) {
                    page.translationX = -offset
                } else {
                    page.translationX = offset
                }
            } else {
                page.translationY = offset
            }
        }

        initPdfViewer(getFile())

    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        when (item?.itemId) {
            android.R.id.home -> onBackPressed()
        }
        return true
    }

    fun initPdfViewer(pdfFile : File){
        try {
            pageViewPager.visibility = View.VISIBLE
            baseProgressBar.visibility = View.GONE

            parcelFileDescriptor = ParcelFileDescriptor.open(pdfFile, ParcelFileDescriptor.MODE_READ_ONLY)
            pdfAdapter = PDFAdapter(parcelFileDescriptor!!, this@MainActivity)
            pageViewPager.adapter = pdfAdapter

        }catch (e: Exception){
            pdfFile.delete()
        }
    }

    fun getFile() : File{
        val inputStream = assets.open("dc_comics.pdf")
        return File(filesDir.absolutePath + "dc_comics.pdf").apply {
            copyInputStreamToFile(inputStream)
        }
    }

    fun File.copyInputStreamToFile(inputStream: InputStream) {
        this.outputStream().use { fileOut ->
            inputStream.copyTo(fileOut)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        parcelFileDescriptor?.close()
        pdfAdapter?.clear()

    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/jorgecasariego/PDFRenderer-with-ViewPager-2/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/jorgecasariego/PDFRenderer-with-ViewPager-2).|
|3.|Follow code author [here](https://github.com/jorgecasariego).|
