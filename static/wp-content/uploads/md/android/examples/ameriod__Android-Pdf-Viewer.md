# Use Android-Pdf-Viewer

>  Android Pdf Viewer Library that uses the PdfRenderer and a ViewPager.

A simple library that wraps the Android's `PdfRenderer`, `ViewPager` to swipe between pages and the PhotoViewer for pinch and zoom support.

### Step 1: Add as a Dependency

Add this in your root build.gradle file (not your module build.gradle file):

```kotlin
allprojects {
	repositories {
        maven { url "https://jitpack.io" }
    }
}
```

Then, add the library to your module build.gradle

```groovy
dependencies {
    implementation 'com.github.ameriod:Android-Pdf-Viewer:1.0.0'
}
```


### Step 2: Usage

Add the following in your layout:

```xml
<me.ameriod.lib.pdfviewer.PdfViewerView
    android:id="@+id/pdfViewer"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

Then call one of the `setPdf()` methods to display the PDF.

### Full Example

For a full PDFView with ViewPager example project based on this library follow the following steps.

> Start by instaling the library as has been discussed.

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). activity_main.xml**


> Our `activity_main` layout.

The first step is to inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Afterwhich design your XML layout using the following 2 UI widgets and ViewGroups:

1. `LinearLayout` - Our outer layout
2. `me.ameriod.lib.pdfviewer.PdfViewerView` - Our custom PDF View supplied by the library.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="me.ameriod.pdfviewer.MainActivity">

    <me.ameriod.lib.pdfviewer.PdfViewerView
        android:id="@+id/pdfViewer"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). MainActivity.kt**

To set a pdf all you need is:

```kotlin
pdfViewer.setPdfFromAsset("sample.pdf")
```

Create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        pdfViewer.setPdfFromAsset("sample.pdf")
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/ameriod/Android-Pdf-Viewer/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/ameriod/Android-Pdf-Viewer).|
|3.|Follow code author [here](https://github.com/ameriod).|
