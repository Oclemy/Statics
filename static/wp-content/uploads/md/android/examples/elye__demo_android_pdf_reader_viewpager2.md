# Android PDF Reader with Viewpager2

>  Simple PDF reader in ViewPager2.

This example will teach you how to download and render PDF, then navigate the PDF pages by swiping through `ViewPager2`.

### Full Example

Let us look at a full android PDFView with ViewPager sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). build.gradle**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

As usual, inside the android closure we will set the `compileSDKVersion` and `buildToolsVersion`. We will also set the application ID, minimum SDK version, target SDK version, version code and version name inside a `defaultConfig` closure. We will also set the build types: to either debug or release. For each build type you can enable minification of resources, as well as enable proguard.

Afterwhich we will declare our app dependencies in under the `dependencies` closure. We will need the following 10 dependencies:

1. Our `Kotlin-stdlib` library.
2. Our `Core-ktx` library.
3. Our `Appcompat` library.
4. Our `Constraintlayout` library.
5. Our `Material` library.
6. Our `Viewpager2` library.
7. Our `Okhttp` library.
8. Our `Rxjava` library.
9. Our `Rxandroid` library.
10. Our `PhotoView` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "30.0.0"

    defaultConfig {
        applicationId "com.example.pdfreader"
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
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'com.google.android.material:material:1.3.0-alpha02'
    implementation 'androidx.viewpager2:viewpager2:1.0.0'
    implementation 'com.squareup.okhttp3:okhttp:4.8.1'
    implementation 'io.reactivex.rxjava2:rxjava:2.2.19'
    implementation "io.reactivex.rxjava2:rxandroid:2.1.1"
    implementation 'com.github.chrisbanes:PhotoView:2.3.0'

    testImplementation 'junit:junit:4.13'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'

}
```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we can specify permissions if necessary, register our activities, define the package name as well as register any other component like Services, ContentProviders and BroadcastReceivers. We also specify other app properties like app icon, app label and app theme. If we register an `activity` we can specify if it is a launcher activity using intent filters.

Here we will add the following permission:

1. Our INTERNET permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.pdfreader">

    <uses-permission android:name="android.permission.INTERNET" />
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


**(a). item_page.xml**


> Our `item_page` layout.

 inside your `/res/layout/` directory create an xml layout file named `item_page.xml`.

On top of that design your XML layout using the following 2 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `com.github.chrisbanes.photoview.PhotoView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.github.chrisbanes.photoview.PhotoView
        android:id="@+id/pdf_image"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(b). activity_main.xml**


> Our `activity_main` layout.

The first step is to inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

After that design your XML layout using the following 3 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout` - This is our root container.
2. `com.google.android.material.tabs.TabLayout` - This will will allow us show Tabs
3. `androidx.viewpager2.widget.ViewPager2` - This will allow us to swipe our pages

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/pdf_page_tab"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toTopOf="@id/pdf_view_pager"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:tabMode="auto" />

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/pdf_view_pager"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@id/pdf_page_tab" />

</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). PdfReader.kt**

> Our `PdfReader` class.

Create a Kotlin file named `PdfReader.kt`. This class will receive a `File` object as a constructor

On top of that we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bitmap` from the `android.graphics` package.
2. `PdfRenderer` from the `android.graphics.pdf` package.
3. `ParcelFileDescriptor` from the `android.os` package.
4. `ImageView` from the `android.widget` package.

On top of that we will be creating the following methods:

1. `openPage(page: Int, pdfImage: ImageView) ` - This will allow us open a page. We pass in the target page as an integer and the PDF ImageView.
2. `close() ` - This will allow us close the current page, the `FileDescriptor` as well as the PDFRenderer

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.graphics.Bitmap
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import android.widget.ImageView
import java.io.File

class PdfReader(file: File) {

    private var currentPage: PdfRenderer.Page? = null
    private val fileDescriptor =
        ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
    private val pdfRenderer = PdfRenderer(fileDescriptor)

    val pageCount = pdfRenderer.pageCount

    fun openPage(page: Int, pdfImage: ImageView) {
        if (page >= pageCount) return
        currentPage?.close()
        currentPage = pdfRenderer.openPage(page).apply {
            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
            pdfImage.setImageBitmap(bitmap)
        }
    }

    fun close() {
        currentPage?.close()
        fileDescriptor.close()
        pdfRenderer.close()
    }
}


```

**(b). PageHolder.kt**

> Our `PageHolder` class.

This class will have the following method

1. `openPage(page: Int, pdfReader: PdfReader) ` - To open a PDF page.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_page.view.*

class PageHolder(view: View) : RecyclerView.ViewHolder(view) {
    fun openPage(page: Int, pdfReader: PdfReader) {
        pdfReader.openPage(page, itemView.pdf_image)
    }
}


```

**(c). PageAdaptor.kt**

> Our `PageAdaptor` class.

We will be overriding the following routine recyclerview functions: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): PageHolder `.
2. `getItemCount(): Int `.
3. `onBindViewHolder(holder: PageHolder, position: Int) `.

After that we will be creating the following methods:

1. `setupPdfRenderer(parameter)` - Let's pass a `PdfReader` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class PageAdaptor: RecyclerView.Adapter<PageHolder>() {

    private var pdfReader: PdfReader? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PageHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_page, parent, false)
        return PageHolder(view)
    }

    fun setupPdfRenderer(pdfReader: PdfReader) {
        this.pdfReader = pdfReader
        notifyDataSetChanged()
    }

    override fun getItemCount(): Int {
        return pdfReader?.pageCount ?: 0
    }

    override fun onBindViewHolder(holder: PageHolder, position: Int) {
        pdfReader?.let {
            holder.openPage(position, it)
        }
    }
}


```

**(d). FileDownloader.kt**

> Our `FileDownloader` class.

This class will allow us to download our PDF file.

It will contain the following important method:

1. `download(url: String, file: File): Observable<Int> `- The function to download our PDF file via OkHttp and return it as an Observable.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import io.reactivex.Observable
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.File
import java.net.HttpURLConnection
import java.util.concurrent.TimeUnit

class FileDownloader(okHttpClient: OkHttpClient) {

    companion object {
        private const val BUFFER_LENGTH_BYTES = 1024 * 8
        private const val HTTP_TIMEOUT = 30
    }

    private var okHttpClient: OkHttpClient

    init {
        val okHttpBuilder = okHttpClient.newBuilder()
            .connectTimeout(HTTP_TIMEOUT.toLong(), TimeUnit.SECONDS)
            .readTimeout(HTTP_TIMEOUT.toLong(), TimeUnit.SECONDS)
        this.okHttpClient = okHttpBuilder.build()
    }

    fun download(url: String, file: File): Observable<Int> {
        return Observable.create<Int> { emitter ->
            val request = Request.Builder().url(url).build()
            val response = okHttpClient.newCall(request).execute()
            val body = response.body
            val responseCode = response.code
            if (responseCode >= HttpURLConnection.HTTP_OK &&
                responseCode < HttpURLConnection.HTTP_MULT_CHOICE &&
                body != null) {
                val length = body.contentLength()
                body.byteStream().apply {
                    file.outputStream().use { fileOut ->
                        var bytesCopied = 0
                        val buffer = ByteArray(BUFFER_LENGTH_BYTES)
                        var bytes = read(buffer)
                        while (bytes >= 0) {
                            fileOut.write(buffer, 0, bytes)
                            bytesCopied += bytes
                            bytes = read(buffer)
                            emitter.onNext(((bytesCopied * 100)/length).toInt())
                        }
                    }
                    emitter.onComplete()
                }
            } else {
                throw IllegalArgumentException("Error occurred when do http get $url")
            }
        }
    }
}


```

**(e). MainActivity.kt**

> Our `MainActivity` class.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.tabs.TabLayoutMediator
import io.reactivex.BackpressureStrategy
import io.reactivex.android.schedulers.AndroidSchedulers.*
import io.reactivex.disposables.Disposables
import io.reactivex.plugins.RxJavaPlugins
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.*
import java.io.File
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    companion object {
        private const val FILE_NAME = "TestPdf.pdf"
        private const val URL = "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf"
    }

    private var disposable = Disposables.disposed()
    private var pdfReader: PdfReader? = null

    private val fileDownloader by lazy {
        FileDownloader(
            OkHttpClient.Builder().build()
        )
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        RxJavaPlugins.setErrorHandler {
            Log.e("Error", it.localizedMessage)
        }

        pdf_view_pager.adapter = PageAdaptor()

        val targetFile = File(cacheDir, FILE_NAME)

        disposable = fileDownloader.download(URL, targetFile)
            .throttleFirst(2, TimeUnit.SECONDS)
            .toFlowable(BackpressureStrategy.LATEST)
            .subscribeOn(Schedulers.io())
            .observeOn(mainThread())
            .subscribe({
                Toast.makeText(this, "$it% Downloaded", Toast.LENGTH_SHORT).show()
            }, {
                Toast.makeText(this, it.localizedMessage, Toast.LENGTH_SHORT).show()
            }, {
                Toast.makeText(this, "Complete Downloaded", Toast.LENGTH_SHORT).show()
                pdfReader = PdfReader(targetFile).apply {
                    (pdf_view_pager.adapter as PageAdaptor).setupPdfRenderer(this)
                }
            })

        TabLayoutMediator(pdf_page_tab, pdf_view_pager) { tab, position ->
            tab.text = (position + 1).toString()
        }.attach()
    }

    override fun onDestroy() {
        super.onDestroy()
        disposable.dispose()
        pdfReader?.close()
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/elye/demo_android_pdf_reader_viewpager2/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/elye/demo_android_pdf_reader_viewpager2).|
|3.|Follow code author [here](https://github.com/elye).|
