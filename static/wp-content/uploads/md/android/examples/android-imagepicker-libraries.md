# Kotlin Android ImagePicker Libraries and Examples

In this article we will explore some awesome android gallery imagepicker libraries. These are libraries designed to pick images from the gallery or filesystem. This tutorial is seperate from one where we'd looked at libraries that allow us to both capture and pick images. You can find that tutorial [here](https://camposha.info/android-examples/android-photo-capture-libraries/).


## Example 1: Kotlin Standard ImagePicker with Runtime Permissions

In the first example we will show you how to pick an image from the gallery in kotlin android without any third party library. Then you wil proceed to check out how to do it using third party libraries.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependency is used in this example.

### Step 3: Add Permission

We need to pick an image from the gallery. Those images may be stored in the external storage. So we need to declare the external storage permission in our `AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

### Step 4: Design Layout

The picked image will be shown in the ImageView. We will show a button and an imageView in our layout. The user presses the button then the imagepicker is launched. We pick an image and it gets shown in the ImageView.

Design your layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/image_view"
        android:layout_width="300dp"
        android:layout_height="300dp"
        android:src="@drawable/ic_image_black_24dp"/>

    <Button
        android:id="@+id/btn"
        android:layout_marginTop="20dp"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        android:text="Select Image"
        android:textColor="@android:color/white"
        android:textSize="20sp"/>

</LinearLayout>
```

### Step 5: Pick and Show Image

We will do these by writing code. Go to your `MainActivity.kt` and declare the following imports:

```kotlin
import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
```

Extend the `AppCompatActivity`, the initialize two integers as instance fields:

```kotlin
class MainActivity : AppCompatActivity() {

    private val GALLERY = 100
    private val GALLERY_PERMISSION_CODE = 101
```

Here is how you initiate or show the ImagePicker using Intent:

```kotlin
    fun pickupImageFromGallery()
    {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, GALLERY)
    }
```

When our button is clicked we will check runtime permissions then show our imagepicker, if the permission is granted:

```kotlin
        btn.setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            {
                if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED)
                {
                    //permission denied
                    val permission = arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
                    //show popup to request runtime permission
                    requestPermissions(permission, GALLERY_PERMISSION_CODE)
                }
                else
                {
                    //permission already granted
                    pickupImageFromGallery()
                }
            }
            else
            {
                //system os is < Marshmallow
                pickupImageFromGallery()
            }
        }
```

Here's the full code:

**MainActivity.kt**

```kotlin

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val GALLERY = 100
    private val GALLERY_PERMISSION_CODE = 101

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn.setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            {
                if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED)
                {
                    //permission denied
                    val permission = arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)
                    //show popup to request runtime permission
                    requestPermissions(permission, GALLERY_PERMISSION_CODE)
                }
                else
                {
                    //permission already granted
                    pickupImageFromGallery()
                }
            }
            else
            {
                //system os is < Marshmallow
                pickupImageFromGallery()
            }
        }
    }

    fun pickupImageFromGallery()
    {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, GALLERY)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray)
    {
        when(requestCode)
        {
            GALLERY_PERMISSION_CODE ->
            {
                if (grantResults.size >0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                {
                    //permission from popup granted
                    pickupImageFromGallery()
                }
                else
                {
                    //permission from popup denied
                    Toast.makeText(this,"permission denied",Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && requestCode == GALLERY)
        {
            image_view.setImageURI(data?.data)
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Image-Picker-From-Gallery-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Kotlin Android Take Picture with Camera - No Library

The second example will look at how to capture an image from the camera in Kotlin Android. In this case we do not use any third party library. However later on we will see how to both capture and pick images using third party libraries.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependency is needed for this project.

### Step 3: Add Permissions

We do need two permissions: to write to external storage and to access camera. The access camera permission will allow us launch the camera to capture our image. However after we've captured the image we need the write-to-external storage permission so that we can save and render the image.

Add these two permissions in your android manifest file:

```xml
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CAMERA" />
```

### Step 4: Design Layout

Add a button and imageview to your xml layout. The button will launch the camera while the imageview will render the captured image:

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/image_view"
        android:layout_width="300dp"
        android:layout_height="300dp"
        android:src="@drawable/ic_image_black_24dp"/>

    <Button
        android:id="@+id/btn"
        android:layout_marginTop="20dp"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:background="@color/colorAccent"
        android:textSize="20dp"
        android:text="Take Picture"
        android:textColor="@android:color/white"/>

</LinearLayout>
```

### Step 5: Capture Image and render it

Here is the code for opening the camera and capturing the image:

```kotlin
    fun openCamera()
    {
        val values = ContentValues()
        values.put(MediaStore.Images.Media.TITLE, "New Picture")
        values.put(MediaStore.Images.Media.DESCRIPTION, "From the Camera")
        image_uri = contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)

        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, image_uri)
        startActivityForResult(cameraIntent, CAMERA)
    }
```

Here is the code for rendering the captured image in an imageview using the `setImageUri` inside the `onActivityResult()` callback:

```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK)
        {
            //set image capture to image view
            image_view.setImageURI(image_uri)
        }
    }
```

Here is the code for checking the runtime permissions before invoking the camera:

```kotlin
        btn.setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            {
                if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_DENIED ||
                        checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED)
                {
                    //permission was not enabled
                    val permission = arrayOf(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    //show popup to request permission
                    requestPermissions(permission, CAMERA_PERMISSION_CODE)
                }
                else
                {
                    //permission already granted
                    openCamera()
                }
            }
            else
            {
                //system os is < marshmallow
                openCamera()
            }
        }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.Manifest
import android.app.Activity
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val CAMERA = 100
    private val CAMERA_PERMISSION_CODE = 101
    var image_uri : Uri? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn.setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
            {
                if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_DENIED ||
                        checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED)
                {
                    //permission was not enabled
                    val permission = arrayOf(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    //show popup to request permission
                    requestPermissions(permission, CAMERA_PERMISSION_CODE)
                }
                else
                {
                    //permission already granted
                    openCamera()
                }
            }
            else
            {
                //system os is < marshmallow
                openCamera()
            }
        }
    }

    fun openCamera()
    {
        val values = ContentValues()
        values.put(MediaStore.Images.Media.TITLE, "New Picture")
        values.put(MediaStore.Images.Media.DESCRIPTION, "From the Camera")
        image_uri = contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)

        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, image_uri)
        startActivityForResult(cameraIntent, CAMERA)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray)
    {
        when(requestCode)
        {
            CAMERA_PERMISSION_CODE ->
            {
                if (grantResults.size >0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                {
                    //permission from popu granted
                    openCamera()
                }
                else
                {
                    //permission from popup denied
                    Toast.makeText(this,"permission denied", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK)
        {
            //set image capture to image view
            image_view.setImageURI(image_uri)
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Take-Picture-With-Camera-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

> Let us now see how to use third party libraries to capture or pick.

## (a). TedBottomPicker

> TedBottomPicker is simple image picker using bottom sheet.

**Bottom sheets** slide up from the bottom of the screen to reveal more content.

If you want pick image from gallery or take picture, this library can help easily. **TedBottomPicker** provide 3 options:

1. Take a picture by camera(using `MediaStore.ACTION_IMAGE_CAPTURE` intent)
2. Get image from gallery(using `Intent.ACTION_PICK` intent)
3. Get image from recent image(using `MediaStore.Images.Media.EXTERNAL_CONTENT_URI` cursor)

**TedBottomPicker** is simple image picker using bottom sheet.

![TedBottomPicker](https://github.com/ParkSangGwon/TedImagePicker/raw/master/art/multi_select.gif)

### Step 1: Install TedBottomPicker

In your app level add the implementation statement for this library:

```groovy
dependencies {
    implementation 'gun0912.ted:tedbottompicker:x.y.z'
    //implementation 'gun0912.ted:tedbottompicker:2.0.1'
}
```

### Step 2: Check Permission

You have to grant `WRITE_EXTERNAL_STORAGE` permission from user. If your targetSDK version is 23+, you have to check permission and request permission to user. Because after Marshmallow(6.0), you have to not only declare permissions in `AndroidManifest.xml` but also request permissions at runtime.

### Step 3: Start TedBottomPicker

This library supports two styles:

1. RxJava
2. Listener

For RxJava, here is how you pick a single image:

```java
        TedRxBottomPicker.with(MainActivity.this)
                 .show()
                 .subscribe(uri ->
                    // here is selected image uri
                 }, Throwable::printStackTrace);
```

and multuple images:

```java
        TedRxBottomPicker.with(MainActivity.this)
                //.setPeekHeight(getResources().getDisplayMetrics().heightPixels/2)
                .setPeekHeight(1600)
                .showTitle(false)
                .setCompleteButtonText("Done")
                .setEmptySelectionText("No Select")
                .setSelectedUriList(selectedUriList)
                .showMultiImage()
                .subscribe(uris -> {
                   // here is selected image uri list
                }, Throwable::printStackTrace);
```

As for the listener style, here is how you pick a single image:

```java
        TedBottomPicker.with(MainActivity.this)
               .show(new TedBottomSheetDialogFragment.OnImageSelectedListener() {
                   @Override
                   public void onImageSelected(Uri uri) {
                     // here is selected image uri
                   }
               });
```

and multiple images:

```java
        TedBottomPicker.with(MainActivity.this)
               .setPeekHeight(1600)
               .showTitle(false)
               .setCompleteButtonText("Done")
               .setEmptySelectionText("No Select")
               .setSelectedUriList(selectedUriList)
               .showMultiImage(new TedBottomSheetDialogFragment.OnMultiImageSelectedListener() {
                    @Override
                    public void onImagesSelected(List<Uri> uriList) {
                         // here is selected image uri list
                    }
              });
```

### Full Example

Here is a full example. You wil be able to download:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    private ImageView iv_image;
    private List<Uri> selectedUriList;
    private Uri selectedUri;
    private Disposable singleImageDisposable;
    private Disposable multiImageDisposable;
    private ViewGroup mSelectedImagesContainer;
    private RequestManager requestManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        iv_image = findViewById(R.id.iv_image);
        mSelectedImagesContainer = findViewById(R.id.selected_photos_container);
        requestManager = Glide.with(this);
        setSingleShowButton();
        setMultiShowButton();
        setRxSingleShowButton();
        setRxMultiShowButton();

    }

    private void setSingleShowButton() {

        Button btnSingleShow = findViewById(R.id.btn_single_show);
        btnSingleShow.setOnClickListener(view -> {
            PermissionListener permissionlistener = new PermissionListener() {
                @Override
                public void onPermissionGranted() {

                    TedBottomPicker.with(MainActivity.this)
                            //.setPeekHeight(getResources().getDisplayMetrics().heightPixels/2)
                            .setSelectedUri(selectedUri)
                            //.showVideoMedia()
                            .setPeekHeight(1200)
                            .show(uri -> {
                                Log.d("ted", "uri: " + uri);
                                Log.d("ted", "uri.getPath(): " + uri.getPath());
                                selectedUri = uri;

                                iv_image.setVisibility(View.VISIBLE);
                                mSelectedImagesContainer.setVisibility(View.GONE);

                                requestManager
                                        .load(uri)
                                        .into(iv_image);
                            });

                }

                @Override
                public void onPermissionDenied(ArrayList<String> deniedPermissions) {
                    Toast.makeText(MainActivity.this, "Permission Denied\n" + deniedPermissions.toString(), Toast.LENGTH_SHORT).show();
                }

            };

            checkPermission(permissionlistener);
        });
    }

    private void setMultiShowButton() {

        Button btnMultiShow = findViewById(R.id.btn_multi_show);
        btnMultiShow.setOnClickListener(view -> {

            PermissionListener permissionlistener = new PermissionListener() {
                @Override
                public void onPermissionGranted() {

                    TedBottomPicker.with(MainActivity.this)
                            //.setPeekHeight(getResources().getDisplayMetrics().heightPixels/2)
                            .setPeekHeight(1600)
                            .showTitle(false)
                            .setCompleteButtonText("Done")
                            .setEmptySelectionText("No Select")
                            .setSelectedUriList(selectedUriList)
                            .showMultiImage(uriList -> {
                                selectedUriList = uriList;
                                showUriList(uriList);
                            });

                }

                @Override
                public void onPermissionDenied(ArrayList<String> deniedPermissions) {
                    Toast.makeText(MainActivity.this, "Permission Denied\n" + deniedPermissions.toString(), Toast.LENGTH_SHORT).show();
                }

            };

            checkPermission(permissionlistener);

        });

    }

    private void setRxSingleShowButton() {

        Button btnSingleShow = findViewById(R.id.btn_rx_single_show);
        btnSingleShow.setOnClickListener(view -> {
            PermissionListener permissionlistener = new PermissionListener() {
                @Override
                public void onPermissionGranted() {

                    singleImageDisposable = TedRxBottomPicker.with(MainActivity.this)
                            //.setPeekHeight(getResources().getDisplayMetrics().heightPixels/2)
                            .setSelectedUri(selectedUri)
                            //.showVideoMedia()
                            .setPeekHeight(1200)
                            .show()
                            .subscribe(uri -> {
                                selectedUri = uri;

                                iv_image.setVisibility(View.VISIBLE);
                                mSelectedImagesContainer.setVisibility(View.GONE);

                                requestManager
                                        .load(uri)
                                        .into(iv_image);
                            }, Throwable::printStackTrace);

                }

                @Override
                public void onPermissionDenied(ArrayList<String> deniedPermissions) {
                    Toast.makeText(MainActivity.this, "Permission Denied\n" + deniedPermissions.toString(), Toast.LENGTH_SHORT).show();
                }

            };

            checkPermission(permissionlistener);
        });
    }

    private void setRxMultiShowButton() {

        Button btnRxMultiShow = findViewById(R.id.btn_rx_multi_show);
        btnRxMultiShow.setOnClickListener(view -> {
            PermissionListener permissionlistener = new PermissionListener() {
                @Override
                public void onPermissionGranted() {

                    multiImageDisposable = TedRxBottomPicker.with(MainActivity.this)
                            //.setPeekHeight(getResources().getDisplayMetrics().heightPixels/2)
                            .setPeekHeight(1600)
                            .showTitle(false)
                            .setCompleteButtonText("Done")
                            .setEmptySelectionText("No Select")
                            .setSelectedUriList(selectedUriList)
                            .showMultiImage()
                            .subscribe(uris -> {
                                selectedUriList = uris;
                                showUriList(uris);
                            }, Throwable::printStackTrace);

                }

                @Override
                public void onPermissionDenied(ArrayList<String> deniedPermissions) {
                    Toast.makeText(MainActivity.this, "Permission Denied\n" + deniedPermissions.toString(), Toast.LENGTH_SHORT).show();
                }

            };

            checkPermission(permissionlistener);
        });

    }

    private void checkPermission(PermissionListener permissionlistener) {
        TedPermission.with(MainActivity.this)
                .setPermissionListener(permissionlistener)
                .setDeniedMessage("If you reject permission,you can not use this service\n\nPlease turn on permissions at [Setting] > [Permission]")
                .setPermissions(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .check();
    }

    private void showUriList(List<Uri> uriList) {
        // Remove all views before
        // adding the new ones.
        mSelectedImagesContainer.removeAllViews();

        iv_image.setVisibility(View.GONE);
        mSelectedImagesContainer.setVisibility(View.VISIBLE);

        int widthPixel = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100, getResources().getDisplayMetrics());
        int heightPixel = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100, getResources().getDisplayMetrics());

        for (Uri uri : uriList) {

            View imageHolder = LayoutInflater.from(this).inflate(R.layout.image_item, null);
            ImageView thumbnail = imageHolder.findViewById(R.id.media_image);

            requestManager
                    .load(uri.toString())
                    .apply(new RequestOptions().fitCenter())
                    .into(thumbnail);

            mSelectedImagesContainer.addView(imageHolder);

            thumbnail.setLayoutParams(new FrameLayout.LayoutParams(widthPixel, heightPixel));

        }

    }

    @Override
    protected void onDestroy() {
        if (singleImageDisposable != null && !singleImageDisposable.isDisposed()) {
            singleImageDisposable.dispose();
        }
        if (multiImageDisposable != null && !multiImageDisposable.isDisposed()) {
            multiImageDisposable.dispose();
        }
        super.onDestroy();
    }
}
```

### Reference

Here are the download links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/ParkSangGwon/TedBottomPicker/tree/master/app) example |
| 2. | [Read](https://github.com/ParkSangGwon/TedBottomPicker) more |

## (b). TedImagePicker

> TedImagePicker is simple/beautiful/smart image picker.

- Support Image/Video
- Support Single/Multi select
- Support more configuration option

![TedImagePicker](https://github.com/ParkSangGwon/TedImagePicker/raw/master/art/multi_select.png)

### Step 1: Install TedImagePicker

Start by installing the library from maven central:

```groovy
repositories {
  google()
  mavenCentral()
}

dependencies {
    implementation 'io.github.ParkSangGwon:tedimagepicker:x.y.z'
    //implementation 'io.github.ParkSangGwon:tedimagepicker:1.1.10'
}
```

### Step 2: Enable DataBinding

Enable data binding since TedImagePicker uses data binding:

```groovy
dataBinding {
    enabled = true
}
```

### Step 3: Pick Image

You can use the RxJava approach or listener approach. If you use listener approach, you can pick a single image this way:

```kotlin
TedImagePicker.with(this)
    .start { uri -> showSingleImage(uri) }
```

or multiple images:

```kotlin
TedImagePicker.with(this)
    .startMultiImage { uriList -> showMultiImage(uriList) }
```

And if you use the RxJava approach, you can pick a single image this way:

```kotlin
TedRxImagePicker.with(this)
    .start()
    .subscribe({ uri ->
    }, Throwable::printStackTrace)
```

Or multiple images:

```kotlin
TedRxImagePicker.with(this)
    .startMultiImage()
    .subscribe({ uriList ->
    }, Throwable::printStackTrace)
```

### Full Example

Here is a full example:

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var selectedUriList: List<Uri>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        setNormalSingleButton()
        setNormalMultiButton()
        setRxSingleButton()
        setRxMultiButton()
        setRxMultiDropDown()
    }

    private fun setNormalSingleButton() {
        binding.btnNormalSingle.setOnClickListener {
            TedImagePicker.with(this)
                .start { uri -> showSingleImage(uri) }
        }
    }

    private fun setNormalMultiButton() {
        binding.btnNormalMulti.setOnClickListener {
            TedImagePicker.with(this)
                //.mediaType(MediaType.IMAGE)
                //.scrollIndicatorDateFormat("YYYYMMDD")
                //.buttonGravity(ButtonGravity.BOTTOM)
                //.buttonBackground(R.drawable.btn_sample_done_button)
                //.buttonTextColor(R.color.sample_yellow)
                .errorListener { message -> Log.d("ted", "message: $message") }
                .selectedUri(selectedUriList)
                .startMultiImage { list: List<Uri> -> showMultiImage(list) }
        }
    }

    private fun setRxSingleButton() {
        binding.btnRxSingle.setOnClickListener {
            TedRxImagePicker.with(this)
                .start()
                .subscribe(this::showSingleImage, Throwable::printStackTrace)
        }
    }

    private fun setRxMultiButton() {
        binding.btnRxMulti.setOnClickListener {
            TedRxImagePicker.with(this)
                .startMultiImage()
                .subscribe(this::showMultiImage, Throwable::printStackTrace)
        }
    }

    private fun setRxMultiDropDown() {
        binding.btnRxMultiDropDown.setOnClickListener {
            TedRxImagePicker.with(this)
                .dropDownAlbum()
                .imageCountTextFormat("%s장")
                .startMultiImage()
                .subscribe(this::showMultiImage, Throwable::printStackTrace)
        }
    }

    private fun showSingleImage(uri: Uri) {
        binding.ivImage.visibility = View.VISIBLE
        binding.containerSelectedPhotos.visibility = View.GONE
        Glide.with(this).load(uri).into(binding.ivImage)

    }

    private fun showMultiImage(uriList: List<Uri>) {
        this.selectedUriList = uriList
        Log.d("ted", "uriList: $uriList")
        binding.ivImage.visibility = View.GONE
        binding.containerSelectedPhotos.visibility = View.VISIBLE

        binding.containerSelectedPhotos.removeAllViews()

        val viewSize =
            TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100f, resources.displayMetrics)
                .toInt()
        uriList.forEach {
            val itemImageBinding = ItemImageBinding.inflate(LayoutInflater.from(this))
            Glide.with(this)
                .load(it)
                .apply(RequestOptions().fitCenter())
                .into(itemImageBinding.ivMedia)
            itemImageBinding.root.layoutParams = FrameLayout.LayoutParams(viewSize, viewSize)
            binding.containerSelectedPhotos.addView(itemImageBinding.root)
        }

    }
}
```

You can download the code below.

### Reference

Here are the download links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/ParkSangGwon/TedImagePicker/tree/master/app) example |
| 2. | [Read](https://github.com/ParkSangGwon/TedImagePicker) more |

## (c). Louvre

> A small customizable library useful to handle an gallery image pick action built-in your app.

Here's the demo:

![Louvre demo](https://raw.githubusercontent.com/andremion/Louvre/master/art/sample.gif)

This library requires API 19+.

### Step 1: Install Louvre

The library is hosted in jitpack. So you need to register jitpack as a maven url in your project level build.gradle file:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then specify the implementation statement in your dependencies in the app level build.gradle file:

```groovy
implementation 'com.github.andremion:louvre:1.3.0'
```

### Step 2: Add Necessary Permission

That necessary permission is the external storage permission. You add in your android manifest file:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Step 3: Choose Louvre theme

Choose one of the **Louvre** themes to use in `GalleryActivity` and override it to define your app color palette.

```xml
<style name="AppTheme.Louvre.Light.DarkActionBar" parent="Louvre.Theme.Light.DarkActionBar">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

```xml
<style name="AppTheme.Louvre.Dark" parent="Louvre.Theme.Dark">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

```xml
<style name="AppTheme.Louvre.Light" parent="Louvre.Theme.Light">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

For `PreviewActivity` you just need to define the accent color.

```xml
<style name="AppTheme.Louvre.Preview" parent="Louvre.Theme.Preview">
    <item name="colorAccent">@color/colorAccent</item>
</style
```

### Step 4: Register Louvre Activities

Register the activities in the android manifest:

```xml
<activity
    android:name="com.andremion.louvre.home.GalleryActivity"
    android:theme="@style/AppTheme.Louvre.Light.DarkActionBar" />
<activity
    android:name="com.andremion.louvre.preview.PreviewActivity"
    android:theme="@style/AppTheme.Louvre.Preview" />
```

### Step 5: Write Kotlin/Java Code

Your now go on and write your code either in activity, to initialize Louvre:

```java
Louvre.init(myActivity)
        .setRequestCode(LOUVRE_REQUEST_CODE)
        .open();
```

or in fragment:

```java
Louvre.init(myFragment)
        .setRequestCode(LOUVRE_REQUEST_CODE)
        .open();
```

You can configure the number of items you want to picked in the gallery:

```java
louvre.setMaxSelection(10)
```

### Example

Here's an example:

```java

package com.andremion.louvre.sample;

import android.app.Dialog;
import android.content.DialogInterface;
import android.net.Uri;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.FragmentManager;
import androidx.appcompat.app.AlertDialog;
import android.util.SparseBooleanArray;

import com.andremion.louvre.Louvre;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static android.content.ContentValues.TAG;

public class MediaTypeFilterDialog extends DialogFragment implements DialogInterface.OnMultiChoiceClickListener, DialogInterface.OnClickListener {

    private static final String ARG_REQUEST_CODE = "request_code_arg";
    private static final String ARG_MAX_SELECTION = "max_selection_arg";
    private static final String ARG_SELECTION = "selection_arg";

    public static void show(@NonNull FragmentManager fragmentManager, int requestCode, int maxSelection, @Nullable List<Uri> selection) {
        MediaTypeFilterDialog dialog = new MediaTypeFilterDialog();
        Bundle args = new Bundle();
        args.putInt(ARG_REQUEST_CODE, requestCode);
        args.putInt(ARG_MAX_SELECTION, maxSelection);
        if (selection != null) {
            args.putSerializable(ARG_SELECTION, new LinkedList<>(selection));
        }
        dialog.setArguments(args);
        dialog.show(fragmentManager, TAG);
    }

    private final SparseBooleanArray mSelectedTypes;

    public MediaTypeFilterDialog() {
        mSelectedTypes = new SparseBooleanArray();
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        return new AlertDialog.Builder(getContext())
                .setTitle(R.string.media_type_prompt)
                .setMultiChoiceItems(Louvre.IMAGE_TYPES, null, this)
                .setPositiveButton(android.R.string.ok, this)
                .setNegativeButton(android.R.string.cancel, null)
                .show();
    }

    @Override
    public void onClick(DialogInterface dialog, int which, boolean isChecked) {
        if (isChecked) {
            mSelectedTypes.put(which, true);
        } else {
            mSelectedTypes.put(which, false);
        }
    }

    @Override
    public void onClick(DialogInterface dialog, int which) {
        //noinspection WrongConstant,ConstantConditions,unchecked
        Louvre.init(getActivity())
                .setRequestCode(getArguments().getInt(ARG_REQUEST_CODE))
                .setMaxSelection(getArguments().getInt(ARG_MAX_SELECTION))
                .setSelection((List<Uri>) getArguments().get(ARG_SELECTION))
                .setMediaTypeFilter(parseToArray(mSelectedTypes))
                .open();
    }

    @NonNull
    private String[] parseToArray(@NonNull SparseBooleanArray selectedTypes) {
        List<String> selectedTypeList = new ArrayList<>();
        for (int i = 0; i < selectedTypes.size(); i++) {
            int key = selectedTypes.keyAt(i);
            if (selectedTypes.get(key, false)) {
                selectedTypeList.add(Louvre.IMAGE_TYPES[key]);
            }
        }
        String[] array = new String[selectedTypeList.size()];
        selectedTypeList.toArray(array);
        return array;
    }
}
```

Find full exmaple [here](https://github.com/andremion/Louvre/tree/development/sample).

### Reference

Find source code reference [here](https://github.com/andremion/Louvre).
