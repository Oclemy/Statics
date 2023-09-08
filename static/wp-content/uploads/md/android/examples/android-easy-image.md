# Android EasyImage – Photo Capture Library and Example

_Android EasyImage tutorial and Example._

EasyImage is a library that allows you to easily capture images from:

1. Gallery
2. Camera
3. Documents.

Yet it does this without creating lots of boilerplate code. You can easily plug EasyImage into your project as a dependency and use it. This library is written by [Jacek](https://github.com/jkwiecien) and is well maintained and mature.


#### Questions this Tutorial Attempts to Answer

1. What is EasyImage, How do we install it and use it.
2. Android Capture Photo from Camera tutorial.
3. Android Pick Photo from Gallery, Camera and Documents using system file picker tutorial.

#### Installing EasyImage

EasyImage requires specific [runtime permissions](/android/permission. Declare it in your AndroidMnifest.xml:

```xml
<uses-permission android_name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

[notice] For devices running API 23 (marshmallow) you have to request this permission in the runtime, before calling `EasyImage.openCamera()`.

Also if your app uses CAMERA permission, you should check it along with `WRITE_EXTERNAL_STORAGE` before calling `EasyImage.openCamera()`. [/notice]

EasyImage is hosted in Jitpack, so first in your project-level build.gradle you need to register jitpack as a repository:

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then in your app level build.gradle add EasyImage's implementation statement:

```groovy
dependencies {
    implementation 'com.github.jkwiecien:EasyImage:2.1.0'
}
```

[notice] Note that support for `SDK 14 & 15` ended on version `1.3.1`. If you have to support one of those, use that version of the library. [/notice]

As of the time of writing this, the version is `2.1.0`.

#### EasyImage Usage Snippets

##### (a). How to take image straight from camera

```java
EasyImage.openCamera(Activity activity, int type);
EasyImage.openCamera(Fragment fragment, int type);
```

##### (b). How to take image from gallery or the gallery picker if there is more than 1 gallery app

```java
EasyImage.openGallery(Activity activity, int typee);
EasyImage.openGallery(Fragment fragment, int type);
```

##### (c). How to take image from documents

```java
EasyImage.openDocuments(Activity activity, int type);
EasyImage.openDocuments(Fragment fragment, int type);
```

##### (d). How to display system picker to chose from camera, documents, or gallery if no documents apps are available

```java
EasyImage.openChooserWithDocuments(Activity activity, String chooserTitle, int type);
EasyImage.openChooserWithDocuments(Fragment fragment, String chooserTitle, int type);
```

##### (e). How to Display system picker to chose from camera or gallery app

```java
EasyImage.openChooserWithGallery(Activity activity, String chooserTitle, int type);
EasyImage.openChooserWithGallery(Fragment fragment, String chooserTitle, int type);
```

[notice] The type parameter is there only if you want to return different kind of images on the same screen. Otherwise, pass any int like `0`. [/notice]

##### (e). How to Remove canceled but captured photo

Sometimes the user can take a photo using the camera, then decides to cancel. Here's how you can remove that photo from the device.

```java
 @Override
  public void onCanceled(EasyImage.ImageSource source, int type) {
      // Cancel handling, you might wanna remove taken photo if it was canceled
      if (source == EasyImage.ImageSource.CAMERA) {
          File photoFile = EasyImage.lastlyTakenButCanceledPhoto(MainActivity.this);
          if (photoFile != null) photoFile.delete();
      }
  }
```

##### (f). More Configuration

```java
EasyImage.configuration(this)
          .setImagesFolderName("My app images") // images folder name, default is "EasyImage"
          .saveInAppExternalFilesDir() // if you want to use root internal memory for storying images
          .saveInRootPicturesDirectory(); // if you want to use internal memory for storying images - default
      .setAllowMultiplePickInGallery(true) // allows multiple picking in galleries that handle it. Also only for phones with API 18+ but it won't crash lower APIs. False by default
```

Configuration is persisted by default, so if you wish to clear it before the next use call`EasyImage.clearConfiguration(Context context);`.

#### Full EasyImage Example

Let's now explore the full example:

##### (a). Build.gradle

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    implementation "com.android.support:appcompat-v7:$support_library_version"
    implementation "com.android.support:design:$support_library_version"
    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.jkwiecien:EasyImage:2.1.0'
    implementation 'com.github.tajchert:nammu:1.1.1'
}
```

Then in your root `build.gradle` at the end of repositories:\\`\`\`

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

\`

##### (b). AndroidManifest.xml

Add the following write permission to your android manifest file.

```xml
<uses-permission android_name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

##### (c). view_image.xml

To render our image.

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    android_layout_width="match_parent"
    android_layout_height="160dp">

    <ImageView
        android_id="@+id/image_view"
        android_layout_width="200dp"
        android_layout_height="match_parent"
        android_layout_gravity="center"
        android_layout_marginBottom="20dp"
        android_scaleType="centerCrop" />
</FrameLayout>
```

##### (d). activity_main.xml

Will have a [recyclerview](https://camposha.info/android/recyclerview) and several buttons:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context=".MainActivity">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/recycler_view"
        android_layout_width="match_parent"
        android_layout_height="0dp"
        android_layout_weight="1"
        android_background="@android:color/darker_gray"
        android_gravity="center"
        android_padding="10dp" />

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_gravity="center"
        android_orientation="vertical"
        android_padding="10dp">

        <Button
            android_id="@+id/camera_button"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_camera_alt_black_24dp"
            android_text="Take with camera" />

        <Button
            android_id="@+id/camera_video_button"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_camera_alt_black_24dp"
            android_text="Take video with camera" />

        <Button
            android_id="@+id/documents_button"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_documents_black_24dp"
            android_paddingLeft="8dp"
            android_text="Pick from docs" />

        <Button
            android_id="@+id/gallery_button"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_insert_photo_black_24dp"
            android_text="Pick from gallery" />

        <Button
            android_id="@+id/chooser_button"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_assistant_black_24dp"
            android_text="Display chooser with documents" />

        <Button
            android_id="@+id/chooser_button2"
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_drawableLeft="@drawable/ic_assistant_black_24dp"
            android_text="Display chooser with Gallery" />

    </LinearLayout>

</LinearLayout>
```

##### (e). ImagesAdapter.java

```java
import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;

import java.io.File;
import java.util.List;

/**
 * Created by Jacek Kwiecień on 08.11.2016.
 */

public class ImagesAdapter extends RecyclerView.Adapter<ImagesAdapter.ViewHolder> {

    private Context context;
    private List<File> imagesFiles;

    public ImagesAdapter(Context context, List<File> imagesFiles) {
        this.context = context;
        this.imagesFiles = imagesFiles;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        return new ViewHolder(inflater.inflate(R.layout.view_image, parent, false));
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Picasso.get()
                .load(imagesFiles.get(position))
                .fit()
                .centerCrop()
                .into(holder.imageView);
    }

    @Override
    public int getItemCount() {
        return imagesFiles.size();
    }

    protected static class ViewHolder extends RecyclerView.ViewHolder {

        public ImageView imageView;

        public ViewHolder(View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.image_view);
        }

    }
}
```

##### (f). MainActivity.java

```java
package pl.aprilapps.easyphotopicker.sample;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import pl.aprilapps.easyphotopicker.DefaultCallback;
import pl.aprilapps.easyphotopicker.EasyImage;
import pl.tajchert.nammu.Nammu;
import pl.tajchert.nammu.PermissionCallback;

public class MainActivity extends AppCompatActivity {

    private static final String PHOTOS_KEY = "easy_image_photos_list";

    protected RecyclerView recyclerView;

    protected View galleryButton;

    private ImagesAdapter imagesAdapter;

    private ArrayList<File> photos = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Nammu.init(this);

        recyclerView = findViewById(R.id.recycler_view);
        galleryButton = findViewById(R.id.gallery_button);

        if (savedInstanceState != null) {
            photos = (ArrayList<File>) savedInstanceState.getSerializable(PHOTOS_KEY);
        }

        imagesAdapter = new ImagesAdapter(this, photos);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setHasFixedSize(true);
        recyclerView.setAdapter(imagesAdapter);

        int permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            Nammu.askForPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE, new PermissionCallback() {
                @Override
                public void permissionGranted() {
                    //Nothing, this sample saves to Public gallery so it needs permission
                }

                @Override
                public void permissionRefused() {
                    finish();
                }
            });
        }

        EasyImage.configuration(this)
                .setImagesFolderName("EasyImage sample")
                .setCopyTakenPhotosToPublicGalleryAppFolder(true)
                .setCopyPickedImagesToPublicGalleryAppFolder(true)
                .setAllowMultiplePickInGallery(true);

        checkGalleryAppAvailability();

        findViewById(R.id.gallery_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /** Some devices such as Samsungs which have their own gallery app require write permission. Testing is advised! */
                EasyImage.openGallery(MainActivity.this, 0);
            }
        });

        findViewById(R.id.camera_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EasyImage.openCameraForImage(MainActivity.this, 0);
            }
        });

        findViewById(R.id.camera_video_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EasyImage.openCameraForVideo(MainActivity.this, 0);
            }
        });

        findViewById(R.id.documents_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /** Some devices such as Samsungs which have their own gallery app require write permission. Testing is advised! */

                int permissionCheck = ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
                if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
                    EasyImage.openDocuments(MainActivity.this, 0);
                } else {
                    Nammu.askForPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE, new PermissionCallback() {
                        @Override
                        public void permissionGranted() {
                            EasyImage.openDocuments(MainActivity.this, 0);
                        }

                        @Override
                        public void permissionRefused() {

                        }
                    });
                }
            }
        });

        findViewById(R.id.chooser_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EasyImage.openChooserWithDocuments(MainActivity.this, "Pick source", 0);
            }
        });

        findViewById(R.id.chooser_button2).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EasyImage.openChooserWithGallery(MainActivity.this, "Pick source", 0);
            }
        });

    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putSerializable(PHOTOS_KEY, photos);
    }

    private void checkGalleryAppAvailability() {
        if (!EasyImage.canDeviceHandleGallery(this)) {
            //Device has no app that handles gallery intent
            galleryButton.setVisibility(View.GONE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        Nammu.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        EasyImage.handleActivityResult(requestCode, resultCode, data, this, new DefaultCallback() {
            @Override
            public void onImagePickerError(Exception e, EasyImage.ImageSource source, int type) {
                //Some error handling
                e.printStackTrace();
            }

            @Override
            public void onImagesPicked(List<File> imageFiles, EasyImage.ImageSource source, int type) {
                onPhotosReturned(imageFiles);
            }

            @Override
            public void onCanceled(EasyImage.ImageSource source, int type) {
                //Cancel handling, you might wanna remove taken photo if it was canceled
                if (source == EasyImage.ImageSource.CAMERA_IMAGE) {
                    File photoFile = EasyImage.lastlyTakenButCanceledPhoto(MainActivity.this);
                    if (photoFile != null) photoFile.delete();
                }
            }
        });
    }

    private void onPhotosReturned(List<File> returnedPhotos) {
        photos.addAll(returnedPhotos);
        imagesAdapter.notifyDataSetChanged();
        recyclerView.scrollToPosition(photos.size() - 1);
    }

    @Override
    protected void onDestroy() {
        // Clear any configuration that was done!
        EasyImage.clearConfiguration(this);
        super.onDestroy();
    }
}
```

#### Download

Let's go over and download the project, or browse it from github.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/jkwiecien/EasyImage/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/jkwiecien/EasyImage/tree/master/sample) |

Credit to the Original Creator of the above project [@Jacek](https://github.com/jkwiecien)

#### How to Run

1. Download the project above.
2. Create your application in android studio as normal.
3. Replace the layouts and activities in your project with the ones in the sample folder.
4. Make sure you edit your app level build.gradle to add the appropriate dependencies.
