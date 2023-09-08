# Runtime Permissions Library


In android devices, permission has to be requested by the programmer before using or accessing some device resources. This is a security feature in that it allows the application to respect user's privacy.

This is a top list tutorial. We want to explore some of the top android runtime permission library and examples.

Developers have developed several open source libraries that allow us work with runtime permissions easily. Listed below are some of the top libraries in random order.


Through this article you will learn the following concepts:

1. How to check and request for permissions at runtime.
2. How to use third party libraries to check and request permissions.

If you prefer not to use libraries, then check [this tutorial](https://camposha.info/android-examples/android-check-request-permission/) of ours.

## (a). PermissionsDispatcher

> PermissionsDispatcher is a declarative API to handle Android runtime permissions.

Here are some of the features that make `PermissionsDispatcher` cool:

- Fully Kotlin/Java support
- Special permissions support
- 100% reflection-free

PermissionsDispatcher lifts the burden that comes with writing a bunch of check statements whether a permission has been granted or not from you, in order to keep your code clean and safe.

### Step 1: Install it

You start by installing PermissionsDispatcher:

If you are using Kotlin then make sure you use kapt:

```groovy
apply plugin: 'kotlin-kapt'
```

Then install the library using the following statement:

```java
dependencies {
  implementation "com.github.permissions-dispatcher:permissionsdispatcher:4.8.0"
  kapt "com.github.permissions-dispatcher:permissionsdispatcher-processor:4.8.0"
}
```

### Step 2: Add Permission to Manifest

Add the permission you need in your android manifest:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### step 3: Attach Annotations

Attach annotations to your types:

```kotlin
@RuntimePermissions
class MainActivity : AppCompatActivity(), View.OnClickListener {

    @NeedsPermission(Manifest.permission.CAMERA)
    fun showCamera() {
        supportFragmentManager.beginTransaction()
                .replace(R.id.sample_content_fragment, CameraPreviewFragment.newInstance())
                .addToBackStack("camera")
                .commitAllowingStateLoss()
    }

    @OnShowRationale(Manifest.permission.CAMERA)
    fun showRationaleForCamera(request: PermissionRequest) {
        showRationaleDialog(R.string.permission_camera_rationale, request)
    }

    @OnPermissionDenied(Manifest.permission.CAMERA)
    fun onCameraDenied() {
        Toast.makeText(this, R.string.permission_camera_denied, Toast.LENGTH_SHORT).show()
    }

    @OnNeverAskAgain(Manifest.permission.CAMERA)
    fun onCameraNeverAskAgain() {
        Toast.makeText(this, R.string.permission_camera_never_askagain, Toast.LENGTH_SHORT).show()
    }
}
```

### Step 4: Delegate to generated functions

Now generated functions become much more concise and intuitive than Java version!

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        findViewById(R.id.button_camera).setOnClickListener {
            // NOTE: delegate the permission handling to generated function
            showCameraWithPermissionCheck()
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        // NOTE: delegate the permission handling to generated function
        onRequestPermissionsResult(requestCode, grantResults)
    }
```

### Full Example

Check Full Example [here](https://github.com/permissions-dispatcher/PermissionsDispatcher/tree/master/sample).

### Reference

Check the reference links below:

| No. | Link |
| --- | --- |
| 1. | Check Sample [here](https://github.com/permissions-dispatcher/PermissionsDispatcher/tree/master/sample) |
| 2. | Read more [here](https://github.com/permissions-dispatcher/PermissionsDispatcher) |
| 3. | [Follow](https://github.com/permissions-dispatcher/) library author |

## (c). RxPermissions

> RxPermissions is an Android runtime permissions powered by RxJava2.

This library allows the usage of RxJava with the new Android M permission model.

This is also another popular and great library like the ones we've listed here.

To use this library your minSdkVersion must be `>= 11`.

### Step 1: Install RxPermissions

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

dependencies {
    implementation 'com.github.tbruyelle:rxpermissions:0.10.2'
}
```

### Step 2: Use RxPermissions

First you need to create a `RxPermissions` instance :

```java
final RxPermissions rxPermissions = new RxPermissions(this); // where this is an Activity or Fragment instance
```

> NOTE: new RxPermissions(this) the this parameter can be an Activity or a Fragment. If you are using RxPermissions inside of a fragment you should pass the fragment instance(new RxPermissions(this)) as constructor parameter rather than new RxPermissions(fragment.getActivity()) or you could face a java.lang.IllegalStateException: FragmentManager is already executing transactions.

Then: for example : you can request the CAMERA permission (with Retrolambda for brevity, but not required)

```java
// Must be done during an initialization phase like onCreate
rxPermissions
    .request(Manifest.permission.CAMERA)
    .subscribe(granted -> {
        if (granted) { // Always true pre-M
           // I can control the camera now
        } else {
           // Oups permission denied
        }
    });
```

If multiple permissions at the same time, the result is combined :

```java
rxPermissions
    .request(Manifest.permission.CAMERA,
             Manifest.permission.READ_PHONE_STATE)
    .subscribe(granted -> {
        if (granted) {
           // All requested permissions are granted
        } else {
           // At least one permission is denied
        }
    });
```

You can also observe a detailed result with requestEach or ensureEach :

```java
rxPermissions
    .requestEach(Manifest.permission.CAMERA,
             Manifest.permission.READ_PHONE_STATE)
    .subscribe(permission -> { // will emit 2 Permission objects
        if (permission.granted) {
           // `permission.name` is granted !
        } else if (permission.shouldShowRequestPermissionRationale) {
           // Denied permission without ask never again
        } else {
           // Denied permission with ask never again
           // Need to go to the settings
        }
    });
```

### Example

Let's look at a full example.

Start by Install the library as described above, then replace your main activity with the following code:

**MainActivity.java**

```java
package com.tbruyelle.rxpermissions3.sample;

import android.Manifest.permission;
import android.hardware.Camera;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.jakewharton.rxbinding4.view.RxView;
import com.tbruyelle.rxpermissions3.Permission;
import com.tbruyelle.rxpermissions3.RxPermissions;

import java.io.IOException;

import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.functions.Action;
import io.reactivex.rxjava3.functions.Consumer;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "RxPermissionsSample";

    private Camera camera;
    private SurfaceView surfaceView;
    private Disposable disposable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RxPermissions rxPermissions = new RxPermissions(this);
        rxPermissions.setLogging(true);

        setContentView(R.layout.act_main);
        surfaceView = findViewById(R.id.surfaceView);

        disposable = RxView.clicks(findViewById(R.id.enableCamera))
                // Ask for permissions when button is clicked
                .compose(rxPermissions.ensureEach(permission.CAMERA))
                .subscribe(new Consumer<Permission>() {
                               @Override
                               public void accept(Permission permission) {
                                   Log.i(TAG, "Permission result " + permission);
                                   if (permission.granted) {
                                       releaseCamera();
                                       camera = Camera.open(0);
                                       try {
                                           camera.setPreviewDisplay(surfaceView.getHolder());
                                           camera.startPreview();
                                       } catch (IOException e) {
                                           Log.e(TAG, "Error while trying to display the camera preview", e);
                                       }
                                   } else if (permission.shouldShowRequestPermissionRationale) {
                                       // Denied permission without ask never again
                                       Toast.makeText(MainActivity.this,
                                               "Denied permission without ask never again",
                                               Toast.LENGTH_SHORT).show();
                                   } else {
                                       // Denied permission with ask never again
                                       // Need to go to the settings
                                       Toast.makeText(MainActivity.this,
                                               "Permission denied, can't enable the camera",
                                               Toast.LENGTH_SHORT).show();
                                   }
                               }
                           },
                        new Consumer<Throwable>() {
                            @Override
                            public void accept(Throwable t) {
                                Log.e(TAG, "onError", t);
                            }
                        },
                        new Action() {
                            @Override
                            public void run() {
                                Log.i(TAG, "OnComplete");
                            }
                        });
    }

    @Override
    protected void onDestroy() {
        if (disposable != null && !disposable.isDisposed()) {
            disposable.dispose();
        }
        super.onDestroy();
    }

    @Override
    protected void onStop() {
        super.onStop();
        releaseCamera();
    }

    private void releaseCamera() {
        if (camera != null) {
            camera.release();
            camera = null;
        }
    }

}
```

The example code link is below.

### References

| No. | Location | Link |
| --- | --- | --- |
| 1. | Check [example](https://github.com/tbruyelle/RxPermissions/tree/master/sample) |
| 2. | GitHub | [HomePage](https://github.com/tbruyelle/RxPermissions) |

## (c). Nammu

> Nammu is a Permission helper for Android M - background check, monitoring and more.

Nammu allows you speed up your work with new Runtime Permissions introduced in Android 6.0 Marshmallow. This lib allows you to monitor permissions, check them in background and as well ask for a permission in easy way (callback).

Runtime Permissions are like old-loved permissions that were asked during installation but this time they are more dynamic (should be ask only when they are needed) and can be revoked by user at any time.

Nammu allows you to:

1. Monitor permissions To keep track of access to particular permissions, all you need is `init` Nammu `Nammu.init(Context`); (pass [Application](https://camposha.info/android/application) Context, not Activity Context) and then call `permissionCompare(PermissionListener)` to compare lists of granted permissions with previous method call.
2. Easily ask/request for permissions Nammu removes a bit of boiler plate to keep request id, and thus simplify your code inside [Activity](https://camposha.info/android/activity) class. Just call`Nammu.askForPermission(Activity, PermissionString , PermissionCallback)` which offers a nice callback with either success or fail method. To use this the only thing you need to do is add this in your activity:
    
    ```java
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    Nammu.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    ```
    

### How to Install Nammu

In you project level build.gradle:

```groovy
repositories {
    maven {
        url "https://jitpack.io"
    }
}
```

In your app level build.gradle:

```groovy
dependencies {
    implementation 'com.github.tajchert:nammu:1.2.0'
}
```

### Nammu Resources

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [HomePage](https://github.com/tajchert/Nammu) |
