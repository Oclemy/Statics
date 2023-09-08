# MaterialDialog-Android

>  📱Android Library to implement animated, 😍beautiful, 🎨stylish Material Dialog in android apps easily..

Use with `API 19+`.

![MaterialDialog Libraries Tutorial](https://camo.githubusercontent.com/e2220dc53028453785aa549bfe0e26686ef0c226dc243f0e121203e9b590f517/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6465762e73687265796173706174696c2e4d6174657269616c4469616c6f672f4d6174657269616c4469616c6f67)

![MaterialDialog Libraries Tutorial](https://camo.githubusercontent.com/4b77bd224fa83c91add5d32112b163cd25eb2af1be7ad31a549c4220dd985a87/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d31392532422d627269676874677265656e2e737667)


### Material Dialogs for Android 📱

📱Android Library to implement animated, 😍beautiful, 🎨stylish Material Dialog in android apps easily.

Here are demo GIFs:

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/SimpleMaterialDialog.gif)

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/AnimatedMaterialDialog.gif)

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/BottomSheetMaterialDialog.gif)

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/AnimatedBottomSheetMaterialDialog.gif)


### Types of Dialog

MaterialDialog library provides two types of dialog i.e.

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/Screenshots/MaterialDialog.png)

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/Screenshots/BottomSheetMaterialDialog.png)


#### i. Gradle

In `Build.gradle` of app module, include these dependencies. If you want to show animations, include Lottie animation library.
This library is available on MavenCentreal

```groovy
repositories {
    mavenCentral()
}

dependencies {

    // Material Dialog Library
    implementation 'dev.shreyaspatil.MaterialDialog:MaterialDialog:2.2.3'

    // Material Design Library
    implementation 'com.google.android.material:material:1.0.0'

    // Lottie Animation Library
    implementation 'com.airbnb.android:lottie:3.3.6'
}
```


#### ii. Set up Material Theme

Setting Material Theme to app is necessary before implementing Material Dialog library. To set it up, update styles.xml of `values` directory in app.
`styles.xml`

```xml
<resources>
    <style name="AppTheme" parent="Theme.MaterialComponents.Light">
        <!-- Customize your theme here. -->
        ...
    </style>
</resources>
```

These are required prerequisites to implement Material Dialog library.

#### iii. Customize Dialog Theme (Optional)

If you want to customize dialog view, you can override style in `styles.xml` as below.

```xml
<!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.MaterialComponents.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:fontFamily">@font/montserrat</item>

        <!-- Customize your theme here. -->
        <item name="material_dialog_background">#FFFFFF</item>
        <item name="material_dialog_title_text_color">#000000</item>
        <item name="material_dialog_message_text_color">#5F5F5F</item>
        <item name="material_dialog_positive_button_color">@color/colorAccent</item>
        <item name="material_dialog_positive_button_text_color">#FFFFFF</item>
        <item name="material_dialog_negative_button_text_color">@color/colorAccent</item>
    </style>
```


### Create Dialog Instance

As there are two types of dialogs in library. Material Dialogs are instantiated as follows.

#### i. Material Dialog

``MaterialDialog`` class is used to create Material Dialog. Its static `Builder` class is used to instantiate it. After building, to show the dialog, `show()` method of ``MaterialDialog`` is used.

```java
MaterialDialog mDialog = new MaterialDialog.Builder(this)
                .setTitle("Delete?")
                .setMessage("Are you sure want to delete this file?")
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        // Delete Operation
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        dialogInterface.dismiss();
                    }
                })
                .build();

        // Show Dialog
        mDialog.show();
```

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/SimpleMaterialDialog.gif)


#### ii. Bottom Sheet Material Dialog

``BottomSheetMaterialDialog`` class is used to create Bottom Sheet Material Dialog. Its static `Builder` class is used to instantiate it. After building, to show the dialog, `show()` method of ``BottomSheetMaterialDialog`` is used.

```java
BottomSheetMaterialDialog mBottomSheetDialog = new BottomSheetMaterialDialog.Builder(this)
                .setTitle("Delete?")
                .setMessage("Are you sure want to delete this file?")
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Deleted!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Cancelled!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .build();

        // Show Dialog
        mBottomSheetDialog.show();
```

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/BottomSheetMaterialDialog.gif)


### Text Alignment

Following Alignment Enum Values are allowed to be used for Dialog text alignment:

- `TextAlignment.START`: Aligns text at start / left.
- `TextAlignment.CENTER`: Aligns text at center.
- `TextAlignment.END`: Aligns text at end / right.
Example usage:

```kotlin
MaterialDialog mDialog = new MaterialDialog.Builder(this)
                .setTitle("Lorem Ipsum Title", TextAlignment.START)
                .setMessage("Lorem Ipsum Message", TextAlignment.START)
```


### HTML formatting for Message

HTML spanned text is supported only for dialog's message. While setting a message, you can directly provide `Spanned` instance as shown in following example.

```kotlin
MaterialDialog mDialog = new MaterialDialog.Builder(this)
                .setMessage(Html.fromText("<b>Lorem <i>Ipsum</i></b>. <br> Click <a href=\"https://example.com\">here</a> for more information"))
```


### Show Animations

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/AnimatedMaterialDialog.gif)

![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/GIFs/AnimatedBottomSheetMaterialDialog.gif)

For example, here `delete_anim.json` animation file is used to show file delete animation.

#### i. Using Resource File

`Resource`
Downloaded json file should placed in `raw` directory of `res`.
![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/Screenshots/ScreenAnimRes.PNG)

In code, `setAnimation()` method of `Builder` is used to set Animation to the dialog.
Prototype :
setAnimation(int resourceId)
Resource file should be passed to method. e.g. `R.raw.delete_anim`.

```kotlin
MaterialButton mDialog = new MaterialDialog.Builder(this)
                .setAnimation(R.raw.delete_anim)
```


#### ii. Using Asset File

`Asset`
Downloaded json file should placed in `asset` directory.
![MaterialDialog Libraries Tutorial](https://github.com/PatilShreyas/MaterialDialog-Android/raw/master/Screenshots/ScreenAnimAsset.PNG)

In code, `setAnimation()` method of `Builder` is used to set Animation to the dialog.
Prototype:
setAnimation(String fileName)
Only file name with extensions should passed to method.

```kotlin
MaterialButton mDialog = new MaterialDialog.Builder(this)
                // Other Methods to create Dialog........               
                .setAnimation("delete_anim.json")               
                //...
```


#### iii. Getting LottieAnimationView

`LottieAnimationView`
To get `View` of Animation for any operations, there is a method in Material Dialogs which returns LottieAnimation`View` of dialog.

```java
// Get Animation View
        LottieAnimationView animationView = mDialog.getAnimationView();
        // Do operations on animationView
```


### Dialog State Listeners

There are three callback events and listeners for Dialog.
Following are interfaces for implementations:

- `OnShowListener()` - Listens for dialog Show event. Its `onShow()` is invoked when dialog is displayed.
- `OnCancelListener()` - Listens for dialog Cancel event. Its `onCancel()` is invoked when dialog is cancelled.
- `OnDismissListener()` - Listens for dialog Dismiss event. Its `onDismiss()` is dismiss when dialog is dismissed.

```java
... 
       mDialog.setOnShowListener(this);
       mDialog.setOnCancelListener(this);
       mDialog.setOnDismissListener(this);
    }
    
    @Override
    public void onShow(DialogInterface dialogInterface) {
        // Dialog is Displayed
    }

    @Override
    public void onCancel(DialogInterface dialogInterface) {
        // Dialog is Cancelled
    }

    @Override
    public void onDismiss(DialogInterface dialogInterface) {
        // Dialog is Dismissed
    }
}
```

- 
### Full Example

Let us look at a full `MaterialDialog` Example below.

#### Step 1. Design Layouts

**(a). `activity_main.xml`**


> Our `activity_main` layout.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. `androidx.coordinatorlayout.widget.CoordinatorLayout`
2. `LinearLayout`
3. `com.google.android.material.button.MaterialButton`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="dev.shreyaspatil.MaterialDialogExample.MainActivity">

    <LinearLayout
        android:padding="16dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:orientation="vertical">

        <com.google.android.material.button.MaterialButton
            android:id="@+id/button_simple_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_marginTop="16dp"
            android:text="Simple Material Dialog"
            android:textAllCaps="false" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/button_simple_bottomsheet_dialog"
            android:layout_marginTop="16dp"
            android:textAllCaps="false"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="Simple Bottomsheet Material Dialog" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/button_animated_dialog"
            android:layout_marginTop="16dp"
            android:textAllCaps="false"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="Animated Material Dialog" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/button_animated_bottomsheet_dialog"
            android:layout_marginTop="16dp"
            android:textAllCaps="false"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="Animated Bottomsheet Material Dialog" />
    </LinearLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.java`**

> Our `MainActivity` class.

Here is the full code:

```java
package replace_with_your_package_name;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import dev.shreyaspatil.MaterialDialog.BottomSheetMaterialDialog;
import dev.shreyaspatil.MaterialDialog.MaterialDialog;
import dev.shreyaspatil.MaterialDialog.interfaces.DialogInterface;
import dev.shreyaspatil.MaterialDialog.interfaces.OnCancelListener;
import dev.shreyaspatil.MaterialDialog.interfaces.OnDismissListener;
import dev.shreyaspatil.MaterialDialog.interfaces.OnShowListener;
import dev.shreyaspatil.MaterialDialog.model.TextAlignment;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, OnShowListener, OnCancelListener, OnDismissListener {

    private MaterialDialog mSimpleDialog;
    private MaterialDialog mAnimatedDialog;
    private BottomSheetMaterialDialog mSimpleBottomSheetDialog;
    private BottomSheetMaterialDialog mAnimatedBottomSheetDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button mButtonSimpleDialog = findViewById(R.id.button_simple_dialog);
        Button mButtonAnimatedDialog = findViewById(R.id.button_animated_dialog);
        Button mButtonBottomSheetDialog = findViewById(R.id.button_simple_bottomsheet_dialog);
        Button mButtonAnimatedBottomSheetDialog = findViewById(R.id.button_animated_bottomsheet_dialog);

        // Simple Material Dialog
        mSimpleDialog = new MaterialDialog.Builder(this)
                .setTitle("Delete?", TextAlignment.START)
                .setMessage(Html.fromHtml("Are you sure want to <i>delete this file</i>?"), TextAlignment.START)
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(getApplicationContext(), "Deleted!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Cancelled!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .build();

        // Simple BottomSheet Material Dialog
        mSimpleBottomSheetDialog = new BottomSheetMaterialDialog.Builder(this)
                .setTitle("Delete?", TextAlignment.CENTER)
                .setMessage("Are you sure want to delete this file?", TextAlignment.CENTER)
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(getApplicationContext(), "Deleted!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Cancelled!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .build();

        // Animated Simple Material Dialog
        mAnimatedDialog = new MaterialDialog.Builder(this)
                .setTitle("Delete?")
                .setMessage("Are you sure want to delete this file?")
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(getApplicationContext(), "Deleted!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new MaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Cancelled!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setAnimation("delete_anim.json")
                .build();

        // Animated BottomSheet Material Dialog
        mAnimatedBottomSheetDialog = new BottomSheetMaterialDialog.Builder(this)
                .setTitle("Delete?")
                .setMessage("Are you sure want to delete this file?")
                .setCancelable(false)
                .setPositiveButton("Delete", R.drawable.ic_delete, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Toast.makeText(getApplicationContext(), "Deleted!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setNegativeButton("Cancel", R.drawable.ic_close, new BottomSheetMaterialDialog.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int which) {
                        Toast.makeText(getApplicationContext(), "Cancelled!", Toast.LENGTH_SHORT).show();
                        dialogInterface.dismiss();
                    }
                })
                .setAnimation("delete_anim.json")
                .build();

        mButtonSimpleDialog.setOnClickListener(this);
        mButtonBottomSheetDialog.setOnClickListener(this);
        mButtonAnimatedDialog.setOnClickListener(this);
        mButtonAnimatedBottomSheetDialog.setOnClickListener(this);
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_simple_dialog:
                mSimpleDialog.show();
                break;

            case R.id.button_simple_bottomsheet_dialog:
                mSimpleBottomSheetDialog.show();
                break;

            case R.id.button_animated_dialog:
                mAnimatedDialog.show();
                break;

            case R.id.button_animated_bottomsheet_dialog:
                mAnimatedBottomSheetDialog.show();
                break;
        }
    }

    @Override
    public void onShow(DialogInterface dialogInterface) {

    }

    @Override
    public void onCancel(DialogInterface dialogInterface) {

    }

    @Override
    public void onDismiss(DialogInterface dialogInterface) {

    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/PatilShreyas/MaterialDialog-Android).|
|3.|Follow code author [here](https://github.com/PatilShreyas).|
