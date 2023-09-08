# Android Text Recognition - Solutions and Examples



This tutorial explores solutions for recognizing texts. For example you can recognize of extract text from an image.


Here are the solutions:

## Use TextRocognizer

> Through this library you you can extract text from image.

It extends the [google vision](https://developers.google.com/vision/) . For reading text from image you have to give image **Uri** or **Bitmap**.

Here is the demo:

![](https://github.com/mahimrocky/TextRecognizer/raw/master/screenshot.png)

### Step 1: Install It

Start by installing this library. First register jitpack in your project-level `build.gradle` as follows:

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then add implementation statement in your app-level build.gradle as follows;

```groovy
dependencies {
            implementation 'com.github.mahimrocky:TextRecognizer:1.0.0'
    }
```

### Step 2: Use it

Use it as follows;

```java
 TextScanner.getInstance(this)
                .init()
                .load(uri) // uri or bitmap
                .getCallback(new TextExtractCallback() {
                    @Override
                    public void onGetExtractText(List<String> textList) {
                        // Here you will get list of text

                    }
                });
```

### Full Example

1. Create Android Project.
2. Install the Library as well as Dexter permissions library.
3. Design layout

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:text="Hello World!"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginRight="8dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/text" />

    <Button
        android:id="@+id/button_camera"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginBottom="8dp"
        android:text="@string/camera"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/button_gallery"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginBottom="8dp"
        android:text="@string/gallery"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</android.support.constraint.ConstraintLayout>
```

4.Write Code

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    Button buttonGallery, buttonCamera;
    TextView recognizeText;
    ImageView captureImage;

    public static final int REQUEST_FOR_IMAGE_FROM_GALLERY = 101;
    public static final int REQUEST_FOR_IMAGE_FROM_CAMERA = 102;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buttonGallery = findViewById(R.id.button_gallery);
        buttonCamera = findViewById(R.id.button_camera);
        recognizeText = findViewById(R.id.text);
        captureImage = findViewById(R.id.imageView);

        buttonGallery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openGallery();
            }
        });

        buttonCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Dexter.withActivity(MainActivity.this).withPermission(Manifest.permission.CAMERA).withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse response) {
                        openCamera();
                    }

                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse response) {

                    }

                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permission, PermissionToken token) {

                    }
                }).check();

            }
        });

    }

    @Override
    protected void onActivityResult(final int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        final Uri uri = data.getData();
        try {
            Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
            captureImage.setImageBitmap(bitmap);
        } catch (IOException e) {
            e.printStackTrace();
        }
        TextScanner.getInstance(this)
                .init()
                .load(uri)
                .getCallback(new TextExtractCallback() {
                    @Override
                    public void onGetExtractText(List<String> textList) {
                        // Here ypu will get list of text

                        final StringBuilder text = new StringBuilder();
                        for (String s : textList) {
                            text.append(s).append("\n");
                        }
                        recognizeText.post(new Runnable() {
                            @Override
                            public void run() {
                                recognizeText.setText(text.toString());
                            }
                        });

                    }
                });
    }

    /**
     * Method for Open device default Camera and take snap
     */
    private void openCamera() {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        File imageFile = null;
        if (cameraIntent.resolveActivity(getPackageManager()) != null) {
            try {
                imageFile = createImageFile();
            } catch (Exception e) {
                e.printStackTrace();
            }
            if (imageFile != null) {
                Uri mImageFileUri;
                if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT_WATCH) {
                    mImageFileUri = FileProvider.getUriForFile(this,
                            getResources().getString(R.string.file_provider_authority),
                            imageFile);
                } else {
                    mImageFileUri = Uri.parse("file:" + imageFile.getAbsolutePath());
                }
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, mImageFileUri);
                cameraIntent.putExtra(MediaStore.EXTRA_SCREEN_ORIENTATION, ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

                startActivityForResult(cameraIntent, REQUEST_FOR_IMAGE_FROM_CAMERA);
            }
        }
    }

    /**
     * Method for Open default device gallery
     */
    private void openGallery() {
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, REQUEST_FOR_IMAGE_FROM_GALLERY);
    }

    /**
     * Create a file for save photo from camera
     *
     * @return File
     * @throws IOException Input output error
     */
    private File createImageFile() throws IOException {
        @SuppressLint("SimpleDateFormat")
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "IMG_" + timeStamp;
        File storageDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        try {
            storageDirectory.mkdirs();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return File.createTempFile(imageFileName, ".jpg", storageDirectory);
    }
}
```

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/mahimrocky/TextRecognizer/tree/master/app) Example |
| 2. | [read](https://github.com/mahimrocky/TextRecognizer/) more |
