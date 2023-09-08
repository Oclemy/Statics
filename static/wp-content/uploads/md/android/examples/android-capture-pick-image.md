# Kotlin Android Capture From Camera or Pick Image

The ability to share capture and share images is one of the qualities that have propelled smartphone usages over the past decade. Multi-billion dollar tech franchises like Instagram and Pinterest have thus been born. This ability tells us about ourselves as human beings, we love stories. However stories don't just have to be put in words. We can also use images and series of images called videos to convey our story.

If you are a developer you need to incorporate the ability to capture images or select already captured images and import them into your application. Then you can do all types of interesting things to these images.

Fortunately for us android sdk provides classes and APIs we can use to provide this capability seamlessly into our application. So in this tutorial we learn how to capture images via camera and show them in an imageview. Alternatively, we will see how to select images from the gallery and render them on an imageview.


## Example 1 - Kotlin Android Capture From Camera or Select from ImagePicker

We are creating an app containing one activity. That activity has an imageview and two buttons below it. When the user clicks the first button, we will initiate the Camera via intent. Then we can capture and image and that image will be rendered on an imageview within our application. The second button allows us to open our system gallery. From the gallery we can select an image and have it rendered on our imageview.


### Step 1: Create our Project

Open app android studio and create a new project. Choose empty activity, choose Kotlin as our programming language. Make sure our app supports androidx artifacts. I will use Android API Level 15 as my minimum version.

Here is my app level build.gradle:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    testImplementation 'junit:junit:4.12'
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
}
```

You can see there is no special dependency to be added.

### Step 2 : Layouts

We will have just a single layout:

#### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:gravity="center|top"
              android:layout_height="match_parent">
    <TextView
            android:id="@+id/headerTxt"
            android:text="Camera and ImagePicker Tutorial"
            android:background="@color/colorAccent"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="5dp"
            android:textAlignment="center"
            android:textStyle="bold"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:textColor="@android:color/white" />
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:layout_marginTop="16dp"
            android:gravity="center"
            android:background="@android:color/darker_gray"
            android:orientation="vertical">

        <ImageView
                android:id="@+id/mImageView"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center_horizontal"
                android:contentDescription="Our Image"/>
    </LinearLayout>

    <LinearLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        <Button
                android:layout_weight="0.5"
                android:layout_width="0dp"
                android:layout_height="45dp"
                android:padding="5dp"
                android:text="Capture"
                android:layout_marginTop="10dp"
                android:textColor="@android:color/white"
                android:background="@drawable/button_shape"
                android:id="@+id/btnCapture"/>

        <Button
                android:layout_weight="0.5"
                android:layout_width="0dp"
                android:layout_height="45dp"
                android:padding="5dp"
                android:text="Choose"
                android:layout_marginTop="10dp"
                android:textColor="@android:color/white"
                android:background="@drawable/button_shape"
                android:id="@+id/btnChoose"/>
    </LinearLayout>

</LinearLayout>
```

That Layout contains the following components:

1. [LinearLayout](https://camposha.info/android/linearlayout) - To order our elements linearly either vertically or horizontally.
2. TextView - To render text
3. ImageView - To render images.
4. Button - To allow us choose/select an image or capture one from the camera.

### Classes

We have only one class.

#### (a). MainActivity.kt

Star by adding imports:

```kotlin
import android.annotation.TargetApi
import android.app.Activity
import android.content.ContentUris
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.net.Uri

import android.os.Build
import android.os.Bundle
import android.provider.DocumentsContract
import android.provider.MediaStore
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import java.io.File
```

Then make our class extend the AppCompatActivity:

```kotlin
class MainActivity : AppCompatActivity() {
```

Inside the class lets define our instance fields:

```kotlin
    //Our variables
    private var mImageView: ImageView? = null
    private var mUri: Uri? = null
    //Our widgets
    private lateinit var btnCapture: Button
    private lateinit var btnChoose : Button
    //Our constants
    private val OPERATION_CAPTURE_PHOTO = 1
    private val OPERATION_CHOOSE_PHOTO = 2
```

In the above, the imageview will render our image, the Uri is the uri of the image. `btnCapture` will allow us start our camera to capture the image. `btnChoose` will allow us open the gallery to choose image.

Let's then create a method to initialize the above widgets:

```kotlin
    private fun initializeWidgets() {
        btnCapture = findViewById(R.id.btnCapture)
        btnChoose = findViewById(R.id.btnChoose)
        mImageView = findViewById(R.id.mImageView)
    }
```

Then a method to show our Toast message:

```kotlin
    private fun show(message: String) {
        Toast.makeText(this,message,Toast.LENGTH_SHORT).show()
    }
```

Next we will create a method to capture our photo or image:

```kotlin
    private fun capturePhoto(){
        val capturedImage = File(externalCacheDir, "My_Captured_Photo.jpg")
        if(capturedImage.exists()) {
            capturedImage.delete()
        }
        capturedImage.createNewFile()
        mUri = if(Build.VERSION.SDK_INT >= 24){
            FileProvider.getUriForFile(this, "info.camposha.kimagepicker.fileprovider",
             capturedImage)
        } else {
            Uri.fromFile(capturedImage)
        }

        val intent = Intent("android.media.action.IMAGE_CAPTURE")
        intent.putExtra(MediaStore.EXTRA_OUTPUT, mUri)
        startActivityForResult(intent, OPERATION_CAPTURE_PHOTO)
    }
```

In the above method you can see we have started by instantiating a File we are calling capturedImage. We have passed the location as well as the file name.

Then using the `exists()` method we have checked if a file with name as the captured image does exist. If so we delete.

Then we create a new file using the `createNewFile()` method. The we obtain the Uri for the file. Take note that if we are using a build sdk version of Android API Version 24 and above we use the `FileProvider` class, invoking its `getUriForFile()` method. Otherwise we use the good old `fromFile()` method of the Uri class.

Then we instantiate our intent and startActivityForResult.

Then to open our gallery and filter images:

```kotlin
    private fun openGallery(){
        val intent = Intent("android.intent.action.GET_CONTENT")
        intent.type = "image/*"
        startActivityForResult(intent, OPERATION_CHOOSE_PHOTO)
    }
```

We will be rendering our image as a bitmap:

```kotlin
    private fun renderImage(imagePath: String?){
        if (imagePath != null) {
            val bitmap = BitmapFactory.decodeFile(imagePath)
            mImageView?.setImageBitmap(bitmap)
        }
        else {
            show("ImagePath is null")
        }
    }
```

To obtain our image path we will use this method:

```kotlin
    private fun getImagePath(uri: Uri?, selection: String?): String {
        var path: String? = null
        val cursor = contentResolver.query(uri, null, selection, null, null )
        if (cursor != null){
            if (cursor.moveToFirst()) {
                path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA))
            }
            cursor.close()
        }
        return path!!
    }
```

Here is how we will handle our image on Android API Level 19 and above:

```kotlin
    @TargetApi(19)
    private fun handleImageOnKitkat(data: Intent?) {
        var imagePath: String? = null
        val uri = data!!.data
        //DocumentsContract defines the contract between a documents provider and the platform.
        if (DocumentsContract.isDocumentUri(this, uri)){
            val docId = DocumentsContract.getDocumentId(uri)
            if ("com.android.providers.media.documents" == uri.authority){
                val id = docId.split(":")[1]
                val selsetion = MediaStore.Images.Media._ID + "=" + id
                imagePath = getImagePath(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                 selsetion)
            }
            else if ("com.android.providers.downloads.documents" == uri.authority){
                val contentUri = ContentUris.withAppendedId(Uri.parse(
                    "content://downloads/public_downloads"), java.lang.Long.valueOf(docId))
                imagePath = getImagePath(contentUri, null)
            }
        }
        else if ("content".equals(uri.scheme, ignoreCase = true)){
            imagePath = getImagePath(uri, null)
        }
        else if ("file".equals(uri.scheme, ignoreCase = true)){
            imagePath = uri.path
        }
        renderImage(imagePath)
    }
```

**FULL Code**

Here is the full code for MainActivity.kt:

```kotlin
package info.camposha.kimagepicker

import android.annotation.TargetApi
import android.app.Activity
import android.content.ContentUris
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.net.Uri

import android.os.Build
import android.os.Bundle
import android.provider.DocumentsContract
import android.provider.MediaStore
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import java.io.File

class MainActivity : AppCompatActivity() {
    //Our variables
    private var mImageView: ImageView? = null
    private var mUri: Uri? = null
    //Our widgets
    private lateinit var btnCapture: Button
    private lateinit var btnChoose : Button
    //Our constants
    private val OPERATION_CAPTURE_PHOTO = 1
    private val OPERATION_CHOOSE_PHOTO = 2

    private fun initializeWidgets() {
        btnCapture = findViewById(R.id.btnCapture)
        btnChoose = findViewById(R.id.btnChoose)
        mImageView = findViewById(R.id.mImageView)
    }

    private fun show(message: String) {
        Toast.makeText(this,message,Toast.LENGTH_SHORT).show()
    }
    private fun capturePhoto(){
        val capturedImage = File(externalCacheDir, "My_Captured_Photo.jpg")
        if(capturedImage.exists()) {
            capturedImage.delete()
        }
        capturedImage.createNewFile()
        mUri = if(Build.VERSION.SDK_INT >= 24){
            FileProvider.getUriForFile(this, "info.camposha.kimagepicker.fileprovider",
             capturedImage)
        } else {
            Uri.fromFile(capturedImage)
        }

        val intent = Intent("android.media.action.IMAGE_CAPTURE")
        intent.putExtra(MediaStore.EXTRA_OUTPUT, mUri)
        startActivityForResult(intent, OPERATION_CAPTURE_PHOTO)
    }
    private fun openGallery(){
        val intent = Intent("android.intent.action.GET_CONTENT")
        intent.type = "image/*"
        startActivityForResult(intent, OPERATION_CHOOSE_PHOTO)
    }
    private fun renderImage(imagePath: String?){
        if (imagePath != null) {
            val bitmap = BitmapFactory.decodeFile(imagePath)
            mImageView?.setImageBitmap(bitmap)
        }
        else {
            show("ImagePath is null")
        }
    }
    private fun getImagePath(uri: Uri?, selection: String?): String {
        var path: String? = null
        val cursor = contentResolver.query(uri, null, selection, null, null )
        if (cursor != null){
            if (cursor.moveToFirst()) {
                path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA))
            }
            cursor.close()
        }
        return path!!
    }
    @TargetApi(19)
    private fun handleImageOnKitkat(data: Intent?) {
        var imagePath: String? = null
        val uri = data!!.data
        //DocumentsContract defines the contract between a documents provider and the platform.
        if (DocumentsContract.isDocumentUri(this, uri)){
            val docId = DocumentsContract.getDocumentId(uri)
            if ("com.android.providers.media.documents" == uri.authority){
                val id = docId.split(":")[1]
                val selsetion = MediaStore.Images.Media._ID + "=" + id
                imagePath = getImagePath(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                 selsetion)
            }
            else if ("com.android.providers.downloads.documents" == uri.authority){
                val contentUri = ContentUris.withAppendedId(Uri.parse(
                    "content://downloads/public_downloads"), java.lang.Long.valueOf(docId))
                imagePath = getImagePath(contentUri, null)
            }
        }
        else if ("content".equals(uri.scheme, ignoreCase = true)){
            imagePath = getImagePath(uri, null)
        }
        else if ("file".equals(uri.scheme, ignoreCase = true)){
            imagePath = uri.path
        }
        renderImage(imagePath)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>
    , grantedResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantedResults)
        when(requestCode){
            1 ->
                if (grantedResults.isNotEmpty() && grantedResults.get(0) ==
                 PackageManager.PERMISSION_GRANTED){
                    openGallery()
                }else {
                    show("Unfortunately You are Denied Permission to Perform this Operataion.")
                }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when(requestCode){
            OPERATION_CAPTURE_PHOTO ->
                if (resultCode == Activity.RESULT_OK) {
                    val bitmap = BitmapFactory.decodeStream(
                        getContentResolver().openInputStream(mUri))
                    mImageView!!.setImageBitmap(bitmap)
                }
            OPERATION_CHOOSE_PHOTO ->
                if (resultCode == Activity.RESULT_OK) {
                    if (Build.VERSION.SDK_INT >= 19) {
                        handleImageOnKitkat(data)
                    }
                }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeWidgets()

        btnCapture.setOnClickListener{capturePhoto()}
        btnChoose.setOnClickListener{
            //check permission at runtime
            val checkSelfPermission = ContextCompat.checkSelfPermission(this,
             android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
            if (checkSelfPermission != PackageManager.PERMISSION_GRANTED){
                //Requests permissions to be granted to this application at runtime
                ActivityCompat.requestPermissions(this,
                 arrayOf(android.Manifest.permission.WRITE_EXTERNAL_STORAGE), 1)
            }
            else{
                openGallery()
            }
        }
    }
}
//end
```

### Resources

Here are downlaod and reference resources:

| No. | Site | Link |
| --- | --- | --- |
| 1. | Github | [Browse](https://github.com/Oclemy/KotllinCameraImagePicker) |
| 2. | Github | [Download](https://github.com/Oclemy/KotllinCameraImagePicker/archive/master.zip) |
| 3. | YouTube | [Watch](https://youtu.be/5zt010_HTTo) |

Now move to the next tutorial.

## Example 2: Android Select Image From Gallery and Show in ImageView

This second example is super simple and is written in java. You simply click a button and via Intent we open the Gallery. You choose the image you want and we render it directly on an ImageView.

Check the Gallery demo below:

![How to Select Image From Gallery and Show it in ImageView Android](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/How-to-Select-Image-From-Gallery-and-Show-it-in-ImageView-Android.png)

Let's start.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party or special dependency is needed for this project.

### Step 3: Design Layout

Simply place a button in your layout. When that button is clicked we will open the gallery. Also add an imageview that will render our selected image:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin">

    <Button
        android:id="@+id/upload_btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Upload" />

    <ImageView
        android:id="@+id/image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"/>
</RelativeLayout>
```

### Step 4: Write Code

Here is how we open the Gallery for selecting images via Intent:

```java
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), SELECT_PICTURE);
```

Here is how we get the real path of an image provided we have it's Uri:

```java
    public String getPathFromURI(Uri contentUri) {
        String res = null;
        String[] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = getContentResolver().query(contentUri, proj, null, null, null);
        if (cursor.moveToFirst()) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
        }
        cursor.close();
        return res;
    }
```

Then here is how we render the selected image on an imageview:

```java
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            if (requestCode == SELECT_PICTURE) {
                // Get the url from data
                Uri selectedImageUri = data.getData();
                if (null != selectedImageUri) {
                    // Get the path from the Uri
                    String path = getPathFromURI(selectedImageUri);
                    Log.i("MainActivity", "Image Path : " + path);
                    // Set the image in ImageView
                    image.setImageURI(selectedImageUri);
                }
            }
        }
    }
```

Here is the full code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    private static final int SELECT_PICTURE = 100;
    ImageView image;
    Button upload_btn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        upload_btn= (Button)findViewById(R.id.upload_btn);
        image= (ImageView)findViewById(R.id.image);
        upload_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), SELECT_PICTURE);
            }
        });
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            if (requestCode == SELECT_PICTURE) {
                // Get the url from data
                Uri selectedImageUri = data.getData();
                if (null != selectedImageUri) {
                    // Get the path from the Uri
                    String path = getPathFromURI(selectedImageUri);
                    Log.i("MainActivity", "Image Path : " + path);
                    // Set the image in ImageView
                    image.setImageURI(selectedImageUri);
                }
            }
        }
    }

    /* Get the real path from the URI */
    public String getPathFromURI(Uri contentUri) {
        String res = null;
        String[] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = getContentResolver().query(contentUri, proj, null, null, null);
        if (cursor.moveToFirst()) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
        }
        cursor.close();
        return res;
    }
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment7.3/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
