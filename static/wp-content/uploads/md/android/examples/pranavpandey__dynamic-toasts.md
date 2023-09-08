# Dynamic-toasts

>  Custom toasts with color and icon on Android..
 
### Dynamic Toasts

![Toast Library Tutorial](https://camo.githubusercontent.com/7a4c66b0404e9ef60777dad7719e21c6f8a0581c565032fd12d50ab9257d1713/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d417061636865253230322d3445423142412e7376673f)


![Toast Library Tutorial](https://camo.githubusercontent.com/42354adbb5615793218ef8fb063c7638d8cab8b6ad2f3771f3a1a99e90224082/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f636f6d2e7072616e617670616e6465792e616e64726f69642f64796e616d69632d746f61737473)

A simple library to display themed toasts with icon and text on Android 2.3 (API 9) and above.

![Toast Library Tutorial](https://github.com/pranavpandey/dynamic-toasts/raw/master/graphics/preview.png)


### Installation

It can be installed by adding the following dependency to your `build.gradle` file:

```xml
dependencies {
    // For AndroidX enabled projects.
    implementation 'com.pranavpandey.android:dynamic-toasts:4.1.2'

    // For legacy projects.
    implementation 'com.pranavpandey.android:dynamic-toasts:1.3.0'
}
```


### Usage

Just call `show()` method to display the toast.

### Configuration

Various methods can be called anywhere in the app to do customisations.

```java
DynamicToast.Config.getInstance()
    // Background color for default toast.
    .setDefaultBackgroundColor(@ColorInt int defaultBackgroundColor)
    // Tint color for default toast.
    .setDefaultTintColor(@ColorInt int defaultTintColor)
    // Background color for error toast.
    .setErrorBackgroundColor(@ColorInt int errorBackgroundColor)
    // Background color for success toast.
    .setSuccessBackgroundColor(@ColorInt int successBackgroundColor)
    // Background color for warning toast.
    .setWarningBackgroundColor(@ColorInt int warningBackgroundColor)
    // Custom icon for error toast. Pass `null` to use default icon.
    .setErrorIcon(@Nullable Drawable errorIcon)
    // Custom icon for success toast. Pass `null` to use default icon.
    .setSuccessIcon(@Nullable Drawable successIcon)
    // Custom icon for warning toast. Pass `null` to use default icon.
    .setWarningIcon(@Nullable Drawable warningIcon)
    // Disable icon for all the toasts.
    .setDisableIcon(boolean disableIcon)
    // Custom icon size in `pixels` for all the toasts.
    .setIconSize(int iconSize)
    // Custom text size in `SP` for all the toasts.
    .setTextSize(int textSize)
    // Custom text typeface for all the toasts. Pass `null` to use system typeface.
    .setTextTypeface(@Nullable Typeface textTypeface)
    // Custom background drawable for all the toasts. Pass `null` to use default background.
    .setToastBackground(@Nullable Drawable toastBackground)
    // Apply customisations.
    .apply();
```

Call `reset()` method to reset all the customisations.

```java
// Reset customisations.
DynamicToast.Config.getInstance().reset();
```


### Default toast

Simple toast based on the vanilla Android theme for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.make(context, "Default toast").show();
```


### Default toast with duration

Simple toast based on the vanilla Android theme for supplied duration.

```java
DynamicToast.make(context, "Default toast with duration", duration).show();
```


### Default toast with icon

Simple toast based on the vanilla Android theme with a icon for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.make(context, "Default toast with icon", drawable).show();
```


### Default toast with icon and duration

Simple toast based on the vanilla Android theme with a icon for supplied duration.

```java
DynamicToast.make(context, "Default toast with icon and duration", drawable, duration).show();
```


### Error toast

Error toast with `#F44336` background for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.makeError(context, "Error toast").show();
```


### Error toast with duration

Error toast with `#F44336` background for supplied duration.

```java
DynamicToast.makeError(context, "Error toast with duration", duration).show();
```


### Success toast

Success toast with `#4CAF50` background for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.makeSuccess(context, "Success toast").show();
```


### Success toast with duration

Success toast with `#4CAF50` background for supplied duration.

```java
DynamicToast.makeSuccess(context, "Success toast with duration", duration).show();
```


### Warning toast

Warning toast with `#FFEB3B` background for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.makeWarning(context, "Warning toast").show();
```


### Warning toast with duration

Warning toast with `#FFEB3B` background for supplied duration.

```java
DynamicToast.makeWarning(context, "Warning toast with duration", duration).show();
```


### Custom toast

Custom toast based on the supplied background and tint color for `Toast.LENGTH_SHORT` duration.

```java
DynamicToast.make(context, "Custom toast", tintColor, backgroundColor).show();
```


### Custom toast with duration

Custom toast based on the supplied background and tint color for supplied duration.

```java
DynamicToast.make(context, "Custom toast with duration", tintColor, backgroundColor, duration).show();
```


### Custom toast with icon


```java
DynamicToast.make(context, "Custom toast with icon", drawable, tintColor, backgroundColor).show();
```


### Custom toast with icon and duration

Custom toast based on the supplied icon, background and tint color theme for supplied duration.

```java
DynamicToast.make(context, "Custom toast with icon and duration", drawable, 
        tintColor, backgroundColor, duration).show();
```


### Cheat sheets

Use `DynamicHint.show(view, toast)` method to display it according to the anchor view position.


### Full Example

Click the link below to see a full example of how to use this library.

<!--more-->

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). content_dynamic_toasts.xml**


> Our `content_dynamic_toasts` layout.

First inside your `/res/layout/` directory create an xml layout file named `content_dynamic_toasts.xml`.

Next design your XML layout using the following 9 UI widgets and ViewGroups:

1. `!--`
2. `FrameLayout`
3. `androidx.core.widget.NestedScrollView`
4. `LinearLayout`
5. `androidx.constraintlayout.widget.ConstraintLayout`
6. `androidx.appcompat.widget.AppCompatTextView`
7. `com.google.android.flexbox.FlexboxLayout`
8. `androidx.appcompat.widget.AppCompatButton`
9. `View`

```xml
<?xml version="1.0" encoding="utf-8"?>


<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior">

    <androidx.core.widget.NestedScrollView
        android:id="@+id/scroll_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="vertical"
        android:scrollbarStyle="outsideOverlay"
        android:clipToPadding="false">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:paddingTop="@dimen/activity_margin"
            android:paddingLeft="@dimen/activity_margin"
            android:paddingRight="@dimen/activity_margin"
            android:paddingBottom="@dimen/activity_margin_fab"
            android:orientation="vertical">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content">

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/gradle_title"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/gradle"
                    app:layout_constraintTop_toTopOf="parent"
                    app:layout_constraintStart_toStartOf="parent" />

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/gradle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:textSize="16sp"
                    app:layout_constraintTop_toBottomOf="@id/gradle_title"
                    app:layout_constraintStart_toStartOf="parent" />

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_default"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/default_toasts"
                    app:layout_constraintTop_toBottomOf="@id/gradle"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_default_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_default"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_default"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/without_icon" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_default_icon"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/with_icon" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_inbuilt"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/inbuilt_toasts"
                    app:layout_constraintTop_toBottomOf="@id/toasts_default_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_inbuilt_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_inbuilt"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_error"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/error" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_success"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/success" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_warning"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/warning" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_custom"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/custom_toasts"
                    app:layout_constraintTop_toBottomOf="@id/toasts_inbuilt_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_custom_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_custom"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_custom"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/without_icon" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_custom_icon"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/with_icon" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_colors"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/custom_colors"
                    app:layout_constraintTop_toBottomOf="@id/toasts_custom_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_colors_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_colors"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_error_color"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/error" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_success_color"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/success" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_warning_color"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/warning" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_default_color"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/default_custom" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_icons"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/custom_icons"
                    app:layout_constraintTop_toBottomOf="@id/toasts_colors_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_icons_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icons"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_error_icon"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/error" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_success_icon"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/success" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_warning_icon"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/warning" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_icon_disable"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/disable_icon"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icons_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_icon_disable_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icon_disable"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_error_icon_disable"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/error" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_success_icon_disable"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/success" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_warning_icon_disable"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/warning" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_icon_disable_tint"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/disable_icon_tint"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icon_disable_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_icon_disable_tint_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icon_disable_tint"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_error_icon_disable_tint"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/error" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_success_icon_disable_tint"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/success" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_warning_icon_disable_tint"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/warning" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_config"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/config"
                    app:layout_constraintTop_toBottomOf="@id/toasts_icon_disable_tint_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_config_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_config"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_config_text"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/text" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_config_background"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/background" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/toast_config_icon_size"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/icon_size" />

                </com.google.android.flexbox.FlexboxLayout>

                <androidx.appcompat.widget.AppCompatTextView
                    android:id="@+id/toasts_hint"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/activity_margin"
                    android:text="@string/cheat_sheets"
                    app:layout_constraintTop_toBottomOf="@id/toasts_config_content"
                    app:layout_constraintStart_toStartOf="parent" />

                <com.google.android.flexbox.FlexboxLayout
                    android:id="@+id/toasts_hint_content"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:layout_constraintTop_toBottomOf="@id/toasts_hint"
                    app:layout_constraintStart_toStartOf="parent"
                    app:flexWrap="wrap"
                    app:alignItems="stretch"
                    app:alignContent="stretch">

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/hint_default"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/default_custom" />

                    <androidx.appcompat.widget.AppCompatButton
                        android:id="@+id/hint_custom"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="@string/custom" />

                </com.google.android.flexbox.FlexboxLayout>

            </androidx.constraintlayout.widget.ConstraintLayout>

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>

    <View
        android:id="@+id/ads_app_bar_shadow"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:background="@drawable/app_bar_shadow" />

</FrameLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). DynamicToastsActivity.kt**

> Our `DynamicToastsActivity` class.

To begin prepare a Kotlin file named `DynamicToastsActivity.kt`.

Moreover we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Configuration` from the `android.content.res` package.
2. `Color` from the `android.graphics` package.
3. `Typeface` from the `android.graphics` package.
4. `Bundle` from the `android.os` package.
5. `Menu` from the `android.view` package.
6. `MenuItem` from the `android.view` package.
7. `View` from the `android.view` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.
10. `AppCompatActivity` from the `androidx.appcompat.app` package.
11. `AppCompatResources` from the `androidx.appcompat.content.res` package.
12. `Toolbar` from the `androidx.appcompat.widget` package.
13. `ContextCompat` from the `androidx.core.content` package.

On top of that create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `applyOverrideConfiguration(overrideConfiguration: Configuration?) `.
3. `onCreateOptionsMenu(menu: Menu): Boolean `.
4. `onOptionsItemSelected(item: MenuItem): Boolean `.
5. `onClick(v: View) `.

Just copy the code below and replace the package with your app's package name.

```kotlin

package replace_with_your_package_name

import android.content.res.Configuration
import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.content.res.AppCompatResources
import androidx.appcompat.widget.Toolbar
import androidx.core.content.ContextCompat
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.pranavpandey.android.dynamic.toasts.DynamicHint
import com.pranavpandey.android.dynamic.toasts.DynamicToast
import com.pranavpandey.android.dynamic.toasts.sample.dialog.AboutDialogFragment
import com.pranavpandey.android.dynamic.util.DynamicColorUtils
import com.pranavpandey.android.dynamic.util.DynamicLinkUtils
import com.pranavpandey.android.dynamic.util.DynamicPackageUtils
import com.pranavpandey.android.dynamic.util.DynamicUnitUtils

/**
 * Main activity to show the implementation of [DynamicToast].
 */
class DynamicToastsActivity : AppCompatActivity(), View.OnClickListener {

    companion object {

        /**
         * Open source repository url.
         */
        const val URL_GITHUB = "https://github.com/pranavpandey/dynamic-toasts"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_dynamic_toasts)
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        toolbar.setSubtitle(R.string.app_name_sample)
        setSupportActionBar(toolbar)

        val fab = findViewById<FloatingActionButton>(R.id.fab)
        fab.setColorFilter(DynamicColorUtils.getTintColor(
                ContextCompat.getColor(this, R.color.color_accent)))

        (findViewById<View>(R.id.gradle) as TextView).text = String.format(
                getString(R.string.format_version),
                DynamicPackageUtils.getVersionName(this))

        fab.setOnClickListener(this)
        findViewById<View>(R.id.toast_default).setOnClickListener(this)
        findViewById<View>(R.id.toast_default_icon).setOnClickListener(this)
        findViewById<View>(R.id.toast_success).setOnClickListener(this)
        findViewById<View>(R.id.toast_error).setOnClickListener(this)
        findViewById<View>(R.id.toast_success).setOnClickListener(this)
        findViewById<View>(R.id.toast_warning).setOnClickListener(this)
        findViewById<View>(R.id.toast_custom_icon).setOnClickListener(this)
        findViewById<View>(R.id.toast_custom).setOnClickListener(this)
        findViewById<View>(R.id.toast_error_color).setOnClickListener(this)
        findViewById<View>(R.id.toast_success_color).setOnClickListener(this)
        findViewById<View>(R.id.toast_warning_color).setOnClickListener(this)
        findViewById<View>(R.id.toast_default_color).setOnClickListener(this)
        findViewById<View>(R.id.toast_error_icon).setOnClickListener(this)
        findViewById<View>(R.id.toast_success_icon).setOnClickListener(this)
        findViewById<View>(R.id.toast_warning_icon).setOnClickListener(this)
        findViewById<View>(R.id.toast_error_icon_disable).setOnClickListener(this)
        findViewById<View>(R.id.toast_success_icon_disable).setOnClickListener(this)
        findViewById<View>(R.id.toast_warning_icon_disable).setOnClickListener(this)
        findViewById<View>(R.id.toast_error_icon_disable_tint).setOnClickListener(this)
        findViewById<View>(R.id.toast_success_icon_disable_tint).setOnClickListener(this)
        findViewById<View>(R.id.toast_warning_icon_disable_tint).setOnClickListener(this)
        findViewById<View>(R.id.toast_config_text).setOnClickListener(this)
        findViewById<View>(R.id.toast_config_background).setOnClickListener(this)
        findViewById<View>(R.id.toast_config_icon_size).setOnClickListener(this)
        findViewById<View>(R.id.hint_default).setOnClickListener(this)
        findViewById<View>(R.id.hint_custom).setOnClickListener(this)
    }

    override fun applyOverrideConfiguration(overrideConfiguration: Configuration?) {
        if (overrideConfiguration != null) {
            val uiMode = overrideConfiguration.uiMode
            overrideConfiguration.setTo(baseContext.resources.configuration)
            overrideConfiguration.uiMode = uiMode
        }
        super.applyOverrideConfiguration(resources.configuration)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return super.onCreateOptionsMenu(menu)

    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.menu_about) {
            AboutDialogFragment.newInstance().showDialog(this)

            return true
        }
        return super.onOptionsItemSelected(item)
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.fab -> DynamicLinkUtils.viewUrl(this@DynamicToastsActivity, URL_GITHUB)

            // Default toast without icon.
            R.id.toast_default -> DynamicToast.make(
                    this, getString(R.string.without_icon_desc)).show()

            // Default toast with icon.
            R.id.toast_default_icon -> DynamicToast.make(
                    this, getString(R.string.with_icon_desc),
                    AppCompatResources.getDrawable(
                            this, R.drawable.ic_toast_icon)).show()

            // Error toast.
            R.id.toast_error -> DynamicToast.makeError(
                    this, getString(R.string.error_desc)).show()

            // Success toast.
            R.id.toast_success -> DynamicToast.makeSuccess(
                    this, getString(R.string.success_desc)).show()

            // Warning toast.
            R.id.toast_warning -> DynamicToast.makeWarning(
                    this, getString(R.string.warning_desc)).show()

            // Custom toast without icon.
            R.id.toast_custom -> DynamicToast.make(
                    this, getString(R.string.custom_desc),
                    Color.parseColor("#FFFFFF"), Color.parseColor("#000000"),
                    Toast.LENGTH_LONG).show()

            // Custom toast with icon.
            R.id.toast_custom_icon -> DynamicToast.make(
                    this, getString(R.string.custom_desc),
                    AppCompatResources.getDrawable(this, R.drawable.ic_social_github),
                    Color.parseColor("#FFFFFF"), Color.parseColor("#000000"),
                    Toast.LENGTH_LONG).show()

            // Error toast with custom color.
            R.id.toast_error_color -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setErrorBackgroundColor(Color.parseColor("#673AB7"))
                        .apply()

                DynamicToast.makeError(this, getString(R.string.error_color_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Success toast with custom color.
            R.id.toast_success_color -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setSuccessBackgroundColor(Color.parseColor("#2196F3"))
                        .apply()

                DynamicToast.makeSuccess(
                        this, getString(R.string.success_color_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Warning toast with custom color.
            R.id.toast_warning_color -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setWarningBackgroundColor(Color.parseColor("#8BC34A"))
                        .apply()

                DynamicToast.makeWarning(
                        this, getString(R.string.warning_color_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Default toast with custom color.
            R.id.toast_default_color -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setDefaultBackgroundColor(Color.parseColor("#607d8b"))
                        .setDefaultTintColor(DynamicColorUtils.getTintColor(
                                Color.parseColor("#607d8b")))
                        .apply()

                DynamicToast.make(
                        this, getString(R.string.default_color_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Error toast with custom icon.
            R.id.toast_error_icon -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setErrorIcon(AppCompatResources.getDrawable(
                                this, R.drawable.ic_toast_icon))
                        .apply()

                DynamicToast.makeError(this,
                        getString(R.string.error_icon_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Success toast with custom icon.
            R.id.toast_success_icon -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setSuccessIcon(AppCompatResources.getDrawable(
                                this, R.drawable.ic_toast_icon))
                        .apply()

                DynamicToast.makeSuccess(this,
                        getString(R.string.success_icon_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Warning toast with custom icon.
            R.id.toast_warning_icon -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setWarningIcon(AppCompatResources.getDrawable(
                                this, R.drawable.ic_toast_icon))
                        .apply()

                DynamicToast.makeWarning(this,
                        getString(R.string.warning_icon_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Error toast without icon.
            R.id.toast_error_icon_disable -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setDisableIcon(true)
                        .apply()

                DynamicToast.makeError(this,
                        getString(R.string.error_icon_disable_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Success toast without icon.
            R.id.toast_success_icon_disable -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setDisableIcon(true)
                        .apply()

                DynamicToast.makeSuccess(this,
                        getString(R.string.success_icon_disable_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Warning toast without icon.
            R.id.toast_warning_icon_disable -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setDisableIcon(true)
                        .apply()

                DynamicToast.makeWarning(this, getString(
                        R.string.warning_icon_disable_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Error toast without icon tint.
            R.id.toast_error_icon_disable_tint -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setErrorIcon(AppCompatResources.getDrawable(
                                this, R.mipmap.ic_launcher))
                        .setTintIcon(false)
                        .apply()

                DynamicToast.makeError(this,
                        getString(R.string.error_icon_disable_tint_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Success toast without icon tint.
            R.id.toast_success_icon_disable_tint -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setSuccessIcon(AppCompatResources.getDrawable(
                                this, R.mipmap.ic_launcher))
                        .setTintIcon(false)
                        .apply()

                DynamicToast.makeSuccess(this,
                        getString(R.string.success_icon_disable_tint_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Warning toast without icon tint.
            R.id.toast_warning_icon_disable_tint -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setWarningIcon(AppCompatResources.getDrawable(
                                this, R.mipmap.ic_launcher))
                        .setTintIcon(false)
                        .apply()

                DynamicToast.makeWarning(this, getString(
                        R.string.warning_icon_disable_tint_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Toast with custom text size and typeface.
            R.id.toast_config_text -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setTextSize(18)
                        .setErrorIcon(AppCompatResources.getDrawable(
                                this, R.drawable.ic_toast_icon))
                        .setTextTypeface(Typeface.create(
                                Typeface.SERIF, Typeface.BOLD_ITALIC))
                        .setErrorBackgroundColor(Color.parseColor("#2196F3"))
                        .apply()

                DynamicToast.makeError(this, getString(R.string.text_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Toast with custom background.
            R.id.toast_config_background -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setToastBackground(AppCompatResources.getDrawable(
                                this, R.drawable.bg_custom_toast))
                        .apply()

                DynamicToast.makeSuccess(this, getString(R.string.background_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Toast with custom icon size.
            R.id.toast_config_icon_size -> {
                // Customise toast.
                DynamicToast.Config.getInstance()
                        .setIconSize(DynamicUnitUtils.convertDpToPixels(48f))
                        .apply()

                DynamicToast.makeWarning(this, getString(R.string.icon_size_desc)).show()

                // Reset customisations.
                DynamicToast.Config.getInstance().reset()
            }

            // Default hint without icon.
            R.id.hint_default -> DynamicHint.show(v,
                    DynamicHint.make(this, getString(R.string.default_hint)))

            // Custom hint with icon.
            R.id.hint_custom -> {
                // Customise hint.
                DynamicHint.Config.getInstance()
                        .setDefaultBackgroundColor(Color.parseColor("#607d8b"))
                        .setDefaultTintColor(DynamicColorUtils.getTintColor(
                                Color.parseColor("#607d8b")))
                        .apply()

                DynamicHint.show(v, DynamicHint.make(this, getString(R.string.custom_hint),
                        AppCompatResources.getDrawable(this, R.drawable.adt_ic_warning)))

                // Reset customisations.
                DynamicHint.Config.getInstance().reset()
            }
        }
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/pranavpandey/dynamic-toasts/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/pranavpandey/dynamic-toasts).|
|3.|Follow code author [here](https://github.com/pranavpandey).|
