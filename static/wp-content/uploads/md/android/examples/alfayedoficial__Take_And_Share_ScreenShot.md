# Take And Share ScreenShot

>  Take screenShot and share via social medeia or email , Code for kotlin code not work for emulator , you can test for real mobile.

Let us look at a full Screenshot Capture Example below.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `INTERNET` permission.
2. Our `WRITE_EXTERNAL_STORAGE` permission.
3. Our `READ_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	package="com.alialfayed.testsharescreen">

	<uses-permission android:name="android.permission.INTERNET"/>
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
	<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />


	<application
		  android:allowBackup="true"
		  android:icon="@mipmap/ic_launcher"
		  android:label="@string/app_name"
		  android:roundIcon="@mipmap/ic_launcher_round"
		  android:supportsRtl="true"
		  android:theme="@style/AppTheme"
		tools:ignore="GoogleAppIndexingWarning">
		  <activity android:name=".MainActivity">
			   <intent-filter>
					<action android:name="android.intent.action.MAIN" />

					<category android:name="android.intent.category.LAUNCHER" />
			   </intent-filter>
		  </activity>
	 </application>

</manifest>
```
#### Step 2. Design Layouts

Let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
3. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	 xmlns:app="http://schemas.android.com/apk/res-auto"
	 xmlns:tools="http://schemas.android.com/tools"
	 android:layout_width="match_parent"
	 android:layout_height="match_parent"
	 tools:context=".MainActivity">

	 <TextView
		  android:id="@+id/textView"
		  android:layout_width="wrap_content"
		  android:layout_height="wrap_content"
		  android:text="Hello World!"
		  app:layout_constraintBottom_toBottomOf="parent"
		  app:layout_constraintLeft_toLeftOf="parent"
		  app:layout_constraintRight_toRightOf="parent"
		  app:layout_constraintTop_toTopOf="parent" />

	 <Button
		  android:id="@+id/btnScreenShot"
		  android:layout_width="wrap_content"
		  android:layout_height="wrap_content"
		  android:layout_marginTop="24dp"
		  android:text="ScreenShot"
		  app:layout_constraintEnd_toEndOf="@+id/textView"
		  app:layout_constraintStart_toStartOf="@+id/textView"
		  app:layout_constraintTop_toBottomOf="@+id/textView" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Manifest` from the `android` package.
2. `Intent` from the `android.content` package.
3. `PackageManager` from the `android.content.pm` package.
4. `Bitmap` from the `android.graphics` package.
5. `Canvas` from the `android.graphics` package.
6. `Uri` from the `android.net` package.
7. `Bundle` from the `android.os` package.
8. `Log` from the `android.util` package.
9. `View` from the `android.view` package.
10. `AppCompatActivity` from the `androidx.appcompat.app` package.
11. `ActivityCompat` from the `androidx.core.app` package.
12. `ContextCompat` from the `androidx.core.content` package.
13. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `saveBitmap(parameter)` - Let's pass a `Bitmap` object as a parameter.
2. `screenShot(parameter)` - This function will take a `View` object as a parameter.
3. `checkPermission(parameter)` - This function will take a `String` object as a parameter.
4. `takePermission() `.

**(a). Our `takePermission()` function**

Write the `takePermission()` function as follows:

```kotlin
    fun takePermission() {
        val arrayPermission = arrayOf(
            Manifest.permission.READ_EXTERNAL_STORAGE
            , Manifest.permission.INTERNET, Manifest.permission.WRITE_EXTERNAL_STORAGE
        )
        ActivityCompat.requestPermissions(this, arrayPermission, PERMISSIONCODE)
    }
```

**(b). Our `screenShot()` function**

Write the `screenShot()` function as follows:

```kotlin
    private fun screenShot(view: View): Bitmap {
        val bitmap = Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        view.draw(canvas)
        return bitmap
    }
```

**(c). Our `checkPermission()` function**

Write the `checkPermission()` function as follows:

```kotlin
    fun checkPermission(permission: String): Boolean {
        val check: Int = ContextCompat.checkSelfPermission(this, permission)
        return (check == PackageManager.PERMISSION_GRANTED)
    }
```

**(d). Our `saveBitmap()` function**

Write the `saveBitmap()` function as follows:

```kotlin
    private fun saveBitmap(bm: Bitmap): File {
//        val path: String =   Environment.getExternalStorageDirectory().absolutePath.toString() + "/Screenshots"
        val path: String = this.getExternalFilesDir(null)!!.absolutePath.toString() + "/Screenshots"

        val dir = File(path)
        if (!dir.exists()) dir.mkdirs()
        val file = File(dir, "mantis_image.png")
        try {
            val fOut = FileOutputStream(file)
            bm.compress(Bitmap.CompressFormat.PNG, 90, fOut)
            fOut.flush()
            fOut.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return file
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File
import java.io.FileOutputStream


class MainActivity : AppCompatActivity() {

    private val PERMISSIONCODE: Int = 0


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnScreenShot.setOnClickListener {
            if (checkPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
                || checkPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                || checkPermission(Manifest.permission.INTERNET)
            ) {
                //            val view: View = this.window.decorView
                val bm: Bitmap = screenShot(this.window.decorView)
                val file: File = saveBitmap(bm)
                Log.i("chase", "filepath: " + file.absolutePath)
                val uri: Uri = Uri.fromFile(File(file.absolutePath))
                val shareIntent = Intent()
                shareIntent.action = Intent.ACTION_SEND
                shareIntent.putExtra(Intent.EXTRA_TEXT, "Check out my app.")
                shareIntent.putExtra(Intent.EXTRA_STREAM, uri)
                shareIntent.type = "image/*"
                shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                startActivity(Intent.createChooser(shareIntent, "share via"))

            } else {
                takePermission()
            }

        }

    }

    private fun saveBitmap(bm: Bitmap): File {
//        val path: String =   Environment.getExternalStorageDirectory().absolutePath.toString() + "/Screenshots"
        val path: String = this.getExternalFilesDir(null)!!.absolutePath.toString() + "/Screenshots"

        val dir = File(path)
        if (!dir.exists()) dir.mkdirs()
        val file = File(dir, "mantis_image.png")
        try {
            val fOut = FileOutputStream(file)
            bm.compress(Bitmap.CompressFormat.PNG, 90, fOut)
            fOut.flush()
            fOut.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return file
    }

    private fun screenShot(view: View): Bitmap {
        val bitmap = Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        view.draw(canvas)
        return bitmap
    }


    // Check checkPermission
    fun checkPermission(permission: String): Boolean {
        val check: Int = ContextCompat.checkSelfPermission(this, permission)
        return (check == PackageManager.PERMISSION_GRANTED)
    }


    // take Permission
    fun takePermission() {
        val arrayPermission = arrayOf(
            Manifest.permission.READ_EXTERNAL_STORAGE
            , Manifest.permission.INTERNET, Manifest.permission.WRITE_EXTERNAL_STORAGE
        )
        ActivityCompat.requestPermissions(this, arrayPermission, PERMISSIONCODE)
    }


}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/alfayedoficial/Take_And_Share_ScreenShot/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/alfayedoficial/Take_And_Share_ScreenShot).|
|3.|Follow code author [here](https://github.com/alfayedoficial).|
