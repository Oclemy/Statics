# Ticket Booking Layout using ConstraintLayout


>  Android (Kotlin) app design using ConstraintLayout.

This is an Android sample app created using `ConstraintLayout`.

Here is the demo GIF:

![ticket_booking Example Tutorial](https://github.com/sbis04/ticket_booking/raw/master/screenshots/movie_ticket_demo.gif)


### Main layout

Here is the demo screenshot of the main layout:

![ticket_booking Example Tutorial](https://github.com/sbis04/ticket_booking/raw/master/screenshots/main_layout.png)


### Cover layout

Here is the demo screenshot of the cover layout:

![ticket_booking Example Tutorial](https://github.com/sbis04/ticket_booking/raw/master/screenshots/cover_layout.png)


### Description layout

And here is the demo screenshot of the description layout:

![ticket_booking Example Tutorial](https://github.com/sbis04/ticket_booking/raw/master/screenshots/description_layout.png)

Let us look at a full `ConstraintLayout` Example based on this project below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:

1. `Kotlin-stdlib` - So that we can use Kotlin as our programming language.
2. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
3. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. `Material` - Collection of Modular and customizable Material Design UI components for Android.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.souvikbiswas.ticketbooking"
        minSdkVersion 19
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        android.defaultConfig.vectorDrawables.useSupportLibrary = true
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        dataBinding true
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-rc1'
    implementation 'com.google.android.material:material:1.2.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'

}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.camposha.info/en/activity) but we have to register it right here as shown below: We will be defining a `meta-data` tag as well, which will allow us to apply our custom fonts in our app typography. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.souvikbiswas.ticketbooking">

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
        <meta-data
            android:name="preloaded_fonts"
            android:resource="@array/preloaded_fonts" />
    </application>

</manifest>
```
#### Step 3. Design Layouts

Create a folder known as `font` inside the `res` directory and add fonts you want to use in that folder. This project uses three fonts. Here is one of them:

**(a). `poppins.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto"
        app:fontProviderAuthority="com.google.android.gms.fonts"
        app:fontProviderPackage="com.google.android.gms"
        app:fontProviderQuery="Poppins"
        app:fontProviderCerts="@array/com_google_android_gms_fonts_certs">
</font-family>

```

#### Step 4. Design Layouts

For this project let's create the following layouts:

**(a). `description_view.xml`**

> Our `description_view` layout.

This layout will represent our View Description's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ImageView`](https://android.camposha.info/en/imageview)
2. [`ImageButton`](https://android.camposha.info/en/imagebutton)
3. [`Guideline`](https://android.camposha.info/en/guideline)
4. [`TextView`](https://android.camposha.info/en/textview)
5. [`Button`](https://android.camposha.info/en/button)
6. [`Barrier`](https://android.camposha.info/en/barrier)
7. [`View`](https://android.camposha.info/en/view)

```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/cover"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="24dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:contentDescription="@string/cover_image"
        android:scaleType="centerCrop"
        app:layout_constraintDimensionRatio="2:3"
        app:layout_constraintEnd_toStartOf="@+id/right_guideline"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/menu_button"
        app:srcCompat="@drawable/red_sparrow" />

    <ImageButton
        android:id="@+id/menu_button"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:background="@null"
        android:contentDescription="@string/menu_button"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_scatter" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/left_guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.15" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/right_guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.40" />

    <TextView
        android:id="@+id/movie_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:fontFamily="@font/poppins_semibold"
        android:text="@string/movie_title"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintBottom_toTopOf="@+id/desc"
        app:layout_constraintStart_toEndOf="@+id/cover"
        app:layout_constraintTop_toBottomOf="@+id/menu_button"
        app:layout_constraintVertical_bias="0.0"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/desc"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginBottom="16dp"
        android:fontFamily="@font/poppins"
        android:text="@string/movie_desc"
        app:layout_constraintBottom_toTopOf="@+id/rating"
        app:layout_constraintStart_toEndOf="@+id/cover"
        app:layout_constraintTop_toBottomOf="@+id/movie_title" />

    <TextView
        android:id="@+id/rating"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:fontFamily="@font/poppins_medium"
        android:text="@string/movie_rating"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toTopOf="@+id/cast"
        app:layout_constraintStart_toEndOf="@+id/cover"
        app:layout_constraintTop_toBottomOf="@+id/desc" />

    <TextView
        android:id="@+id/cast"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:fontFamily="@font/poppins_semibold"
        android:text="@string/cast"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        app:layout_constraintBottom_toTopOf="@+id/cast_one"
        app:layout_constraintStart_toEndOf="@+id/cover" />

    <TextView
        android:id="@+id/status"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:fontFamily="@font/poppins_semibold"
        android:src="@drawable/transition"
        android:text="@string/movie_status"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintEnd_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/menu_button" />

    <ImageView
        android:id="@+id/cast_one"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:layout_marginStart="16dp"
        android:contentDescription="@string/cast_1"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toBottomOf="@+id/cover"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintEnd_toStartOf="@+id/cast_three"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread_inside"
        app:layout_constraintStart_toEndOf="@+id/cover"
        app:srcCompat="@drawable/cast_1" />

    <ImageView
        android:id="@+id/cast_two"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:contentDescription="@string/cast_2"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toBottomOf="@+id/cast_three"
        app:layout_constraintDimensionRatio="h,1:1"
        app:layout_constraintEnd_toStartOf="@+id/button"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/cast_three"
        app:layout_constraintTop_toTopOf="@+id/cast_three"
        app:srcCompat="@drawable/cast_3" />

    <ImageView
        android:id="@+id/cast_three"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:contentDescription="@string/cast_3"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toBottomOf="@+id/cast_one"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintEnd_toStartOf="@+id/cast_two"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/cast_one"
        app:layout_constraintTop_toTopOf="@+id/cast_one"
        app:srcCompat="@drawable/cast_2" />

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="50dp"
        android:layout_marginEnd="16dp"
        android:background="@color/gray"
        android:text="@string/more_casts"
        app:layout_constraintBottom_toBottomOf="@+id/cast_two"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/cast_two"
        app:layout_constraintTop_toTopOf="@+id/cast_two" />

    <TextView
        android:id="@+id/movie_info"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginTop="36dp"
        android:layout_marginEnd="24dp"
        android:fontFamily="@font/poppins"
        android:text="@string/movie_info"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="@id/barrier"
        app:layout_constraintTop_toBottomOf="@+id/cover" />

    <ImageButton
        android:id="@+id/description_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:background="@null"
        android:contentDescription="@string/description_button"
        android:tint="@android:color/black"
        app:layout_constraintStart_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/movie_title"
        app:srcCompat="@drawable/ic_baseline_sort_24" />

    <androidx.constraintlayout.widget.Barrier
        android:id="@+id/barrier"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:barrierDirection="bottom"
        app:constraint_referenced_ids="cover,cast_two,cast_one,button,cast_three"
        tools:layout_editor_absoluteY="267dp" />

    <View
        android:id="@+id/view"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginTop="36dp"
        android:background="@color/gray"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/movie_info"
        app:layout_constraintVertical_bias="0.0" />

    <View
        android:id="@+id/date_selector"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginTop="36dp"
        android:background="@android:color/white"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingEnd="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        app:layout_constraintBottom_toBottomOf="@+id/day_1"
        app:layout_constraintEnd_toEndOf="@+id/day_1"
        app:layout_constraintStart_toStartOf="@+id/day_1"
        app:layout_constraintTop_toBottomOf="@+id/movie_info" />

    <View
        android:id="@+id/black_bar"
        android:layout_width="0dp"
        android:layout_height="4dp"
        android:background="@android:color/black"
        app:layout_constraintEnd_toEndOf="@+id/date_selector"
        app:layout_constraintStart_toStartOf="@+id/date_selector"
        app:layout_constraintTop_toTopOf="@+id/date_selector" />

    <TextView
        android:id="@+id/date_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="52dp"
        android:fontFamily="@font/poppins_semibold"
        android:text="20"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintEnd_toEndOf="@+id/day_1"
        app:layout_constraintStart_toStartOf="@+id/day_1"
        app:layout_constraintTop_toBottomOf="@+id/movie_info"
        tools:text="20" />

    <TextView
        android:id="@+id/date_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="21"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_1"
        app:layout_constraintEnd_toEndOf="@+id/day_2"
        app:layout_constraintStart_toStartOf="@+id/day_2"
        app:layout_constraintTop_toTopOf="@+id/date_1"
        tools:text="21" />

    <TextView
        android:id="@+id/date_3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="22"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_2"
        app:layout_constraintEnd_toEndOf="@+id/day_3"
        app:layout_constraintStart_toStartOf="@+id/day_3"
        app:layout_constraintTop_toTopOf="@+id/date_2"
        tools:text="22" />

    <TextView
        android:id="@+id/date_4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="23"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_3"
        app:layout_constraintEnd_toEndOf="@+id/day_4"
        app:layout_constraintStart_toStartOf="@+id/day_4"
        app:layout_constraintTop_toTopOf="@+id/date_3"
        tools:text="23" />

    <TextView
        android:id="@+id/date_5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="24"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_4"
        app:layout_constraintEnd_toEndOf="@+id/day_5"
        app:layout_constraintStart_toStartOf="@+id/day_5"
        app:layout_constraintTop_toTopOf="@+id/date_4"
        tools:text="24" />

    <TextView
        android:id="@+id/date_6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="25"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_5"
        app:layout_constraintEnd_toEndOf="@+id/day_6"
        app:layout_constraintStart_toStartOf="@+id/day_6"
        app:layout_constraintTop_toTopOf="@+id/date_5"
        tools:text="25" />

    <TextView
        android:id="@+id/date_7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="26"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_6"
        app:layout_constraintEnd_toEndOf="@+id/day_7"
        app:layout_constraintStart_toStartOf="@+id/day_7"
        app:layout_constraintTop_toTopOf="@+id/date_6"
        tools:text="26" />

    <TextView
        android:id="@+id/day_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/sunday"
        app:layout_constraintEnd_toStartOf="@+id/day_2"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/date_1" />

    <TextView
        android:id="@+id/day_3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/tuesday"
        app:layout_constraintBottom_toBottomOf="@+id/day_2"
        app:layout_constraintEnd_toStartOf="@+id/day_4"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_2"
        app:layout_constraintTop_toTopOf="@+id/day_2" />

    <TextView
        android:id="@+id/day_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/monday"
        app:layout_constraintBottom_toBottomOf="@+id/day_1"
        app:layout_constraintEnd_toStartOf="@+id/day_3"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_1"
        app:layout_constraintTop_toTopOf="@+id/day_1" />

    <TextView
        android:id="@+id/day_4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/wednesday"
        app:layout_constraintBottom_toBottomOf="@+id/day_3"
        app:layout_constraintEnd_toStartOf="@+id/day_5"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_3"
        app:layout_constraintTop_toTopOf="@+id/day_3" />

    <TextView
        android:id="@+id/day_7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/saturday"
        app:layout_constraintBottom_toBottomOf="@+id/day_6"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_6"
        app:layout_constraintTop_toTopOf="@+id/day_6" />

    <TextView
        android:id="@+id/day_5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/thursday"
        app:layout_constraintBottom_toBottomOf="@+id/day_4"
        app:layout_constraintEnd_toStartOf="@+id/day_6"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_4"
        app:layout_constraintTop_toTopOf="@+id/day_4" />

    <TextView
        android:id="@+id/day_6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        android:paddingBottom="@dimen/selector_bottom_padding"
        android:text="@string/friday"
        app:layout_constraintBottom_toBottomOf="@+id/day_5"
        app:layout_constraintEnd_toStartOf="@+id/day_7"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_5"
        app:layout_constraintTop_toTopOf="@+id/day_5" />

    <Button
        android:id="@+id/containedButton"
        android:layout_width="0dp"
        android:layout_height="60dp"
        android:background="@color/brick_red"
        android:fontFamily="@font/poppins"
        android:text="@string/book_button"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@android:color/white"
        app:icon="@drawable/ic_baseline_sort_24"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/movie_theater_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_medium"
        android:text="@string/movie_theater_name"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintBottom_toTopOf="@+id/movie_theater_distance"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/date_selector"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/movie_theater_distance"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="2dp"
        android:layout_marginTop="2dp"
        android:fontFamily="@font/poppins"
        android:text="@string/theater_distance"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        app:layout_constraintBottom_toTopOf="@+id/containedButton"
        app:layout_constraintEnd_toEndOf="@+id/movie_theater_name"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="@+id/movie_theater_name"
        app:layout_constraintTop_toBottomOf="@+id/movie_theater_name" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `cover_view.xml`**

> Our `cover_view` layout.

This layout will represent our View Cover's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ImageView`](https://android.camposha.info/en/imageview)
2. [`ImageButton`](https://android.camposha.info/en/imagebutton)
3. [`Guideline`](https://android.camposha.info/en/guideline)
4. [`TextView`](https://android.camposha.info/en/textview)
5. [`Button`](https://android.camposha.info/en/button)
6. [`View`](https://android.camposha.info/en/view)

```xml
<?xml version="1.0" encoding="utf-8"?>


<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/cover"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:contentDescription="@string/cover_image"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintDimensionRatio=""
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.0"
        app:srcCompat="@drawable/red_sparrow" />

    <ImageButton
        android:id="@+id/menu_button"
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:background="@null"
        android:contentDescription="@string/menu_button"
        android:tint="@android:color/white"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_scatter" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/left_guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.15" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/right_guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.85" />

    <TextView
        android:id="@+id/movie_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="@string/movie_title"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toTopOf="@+id/desc"
        app:layout_constraintStart_toStartOf="@+id/left_guideline"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/desc"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:fontFamily="@font/poppins"
        android:text="@string/movie_desc"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toTopOf="@+id/rating"
        app:layout_constraintStart_toStartOf="@+id/left_guideline" />

    <TextView
        android:id="@+id/rating"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="36dp"
        android:fontFamily="@font/poppins_medium"
        android:text="@string/movie_rating"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="@+id/left_guideline" />

    <TextView
        android:id="@+id/status"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:fontFamily="@font/poppins_semibold"
        android:text="@string/movie_status"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@android:color/white"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/cast_one"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:layout_marginStart="16dp"
        android:contentDescription="@string/cast_1"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toBottomOf="@+id/cover"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintEnd_toStartOf="@+id/cast_three"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread_inside"
        app:layout_constraintStart_toEndOf="parent"
        app:srcCompat="@drawable/cast_1" />

    <ImageView
        android:id="@+id/cast_two"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:layout_marginBottom="16dp"
        android:contentDescription="@string/cast_2"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toTopOf="@+id/movie_info"
        app:layout_constraintDimensionRatio="h,1:1"
        app:layout_constraintEnd_toStartOf="@+id/button"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/cast_three"
        app:srcCompat="@drawable/cast_3" />

    <ImageView
        android:id="@+id/cast_three"
        android:layout_width="50dp"
        android:layout_height="0dp"
        android:layout_marginBottom="16dp"
        android:contentDescription="@string/cast_3"
        android:scaleType="centerCrop"
        app:layout_constraintBottom_toTopOf="@+id/movie_info"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintEnd_toStartOf="@+id/cast_two"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/cast_one"
        app:srcCompat="@drawable/cast_2" />

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="50dp"
        android:layout_marginBottom="16dp"
        android:background="@color/gray"
        android:text="@string/more_casts"
        app:layout_constraintBottom_toTopOf="@+id/movie_info"
        app:layout_constraintDimensionRatio="w,1:1"
        app:layout_constraintStart_toEndOf="@+id/cast_two" />

    <TextView
        android:id="@+id/movie_info"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="24dp"
        android:fontFamily="@font/poppins"
        android:text="@string/movie_info"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/cover" />

    <ImageButton
        android:id="@+id/description_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="16dp"
        android:background="@null"
        android:contentDescription="@string/description_button"
        android:tint="@android:color/white"
        app:layout_constraintBottom_toTopOf="@+id/movie_title"
        app:layout_constraintEnd_toEndOf="@+id/movie_title"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="@+id/left_guideline"
        app:srcCompat="@drawable/ic_baseline_sort_24" />

    <View
        android:id="@+id/view"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:background="@color/gray"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/cover" />

    <View
        android:id="@+id/date_selector"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginTop="16dp"
        android:background="@android:color/white"
        android:paddingLeft="@dimen/selector_side_padding"
        android:paddingEnd="@dimen/selector_side_padding"
        android:paddingRight="@dimen/selector_side_padding"
        app:layout_constraintBottom_toBottomOf="@+id/day_1"
        app:layout_constraintEnd_toEndOf="@+id/day_3"
        app:layout_constraintStart_toStartOf="@+id/day_3"
        app:layout_constraintTop_toBottomOf="@+id/movie_info" />

    <View
        android:id="@+id/black_bar"
        android:layout_width="0dp"
        android:layout_height="4dp"
        android:background="@android:color/black"
        app:layout_constraintEnd_toEndOf="@+id/date_selector"
        app:layout_constraintStart_toStartOf="@+id/date_selector"
        app:layout_constraintTop_toTopOf="@+id/date_selector" />

    <TextView
        android:id="@+id/date_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:fontFamily="@font/poppins_semibold"
        android:text="20"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintEnd_toEndOf="@+id/day_1"
        app:layout_constraintStart_toStartOf="@+id/day_1"
        app:layout_constraintTop_toBottomOf="@+id/movie_info"
        tools:text="20" />

    <TextView
        android:id="@+id/date_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="21"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_1"
        app:layout_constraintEnd_toEndOf="@+id/day_2"
        app:layout_constraintHorizontal_bias="0.368"
        app:layout_constraintStart_toStartOf="@+id/day_2"
        app:layout_constraintTop_toTopOf="@+id/date_1"
        tools:text="21" />

    <TextView
        android:id="@+id/date_3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="22"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_2"
        app:layout_constraintEnd_toEndOf="@+id/day_3"
        app:layout_constraintStart_toStartOf="@+id/day_3"
        app:layout_constraintTop_toTopOf="@+id/date_2"
        tools:text="22" />

    <TextView
        android:id="@+id/date_4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="23"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_3"
        app:layout_constraintEnd_toEndOf="@+id/day_4"
        app:layout_constraintStart_toStartOf="@+id/day_4"
        app:layout_constraintTop_toTopOf="@+id/date_3"
        tools:text="23" />

    <TextView
        android:id="@+id/date_5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="24"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_4"
        app:layout_constraintEnd_toEndOf="@+id/day_5"
        app:layout_constraintStart_toStartOf="@+id/day_5"
        app:layout_constraintTop_toTopOf="@+id/date_4"
        tools:text="24" />

    <TextView
        android:id="@+id/date_6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="25"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_5"
        app:layout_constraintEnd_toEndOf="@+id/day_6"
        app:layout_constraintStart_toStartOf="@+id/day_6"
        app:layout_constraintTop_toTopOf="@+id/date_5"
        tools:text="25" />

    <TextView
        android:id="@+id/date_7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_semibold"
        android:text="26"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1"
        app:layout_constraintBottom_toBottomOf="@+id/date_6"
        app:layout_constraintEnd_toEndOf="@+id/day_7"
        app:layout_constraintStart_toStartOf="@+id/day_7"
        app:layout_constraintTop_toTopOf="@+id/date_6"
        tools:text="26" />

    <TextView
        android:id="@+id/day_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/sunday"
        app:layout_constraintEnd_toStartOf="@+id/day_2"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/date_1" />

    <TextView
        android:id="@+id/day_3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/tuesday"
        app:layout_constraintBottom_toBottomOf="@+id/day_2"
        app:layout_constraintEnd_toStartOf="@+id/day_4"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_2"
        app:layout_constraintTop_toTopOf="@+id/day_2" />

    <TextView
        android:id="@+id/day_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/monday"
        app:layout_constraintBottom_toBottomOf="@+id/day_1"
        app:layout_constraintEnd_toStartOf="@+id/day_3"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_1"
        app:layout_constraintTop_toTopOf="@+id/day_1" />

    <TextView
        android:id="@+id/day_4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/wednesday"
        app:layout_constraintBottom_toBottomOf="@+id/day_3"
        app:layout_constraintEnd_toStartOf="@+id/day_5"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_3"
        app:layout_constraintTop_toTopOf="@+id/day_3" />

    <TextView
        android:id="@+id/day_7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/saturday"
        app:layout_constraintBottom_toBottomOf="@+id/day_6"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_6"
        app:layout_constraintTop_toTopOf="@+id/day_6" />

    <TextView
        android:id="@+id/day_5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/thursday"
        app:layout_constraintBottom_toBottomOf="@+id/day_4"
        app:layout_constraintEnd_toStartOf="@+id/day_6"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_4"
        app:layout_constraintTop_toTopOf="@+id/day_4" />

    <TextView
        android:id="@+id/day_6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/friday"
        app:layout_constraintBottom_toBottomOf="@+id/day_5"
        app:layout_constraintEnd_toStartOf="@+id/day_7"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/day_5"
        app:layout_constraintTop_toTopOf="@+id/day_5" />

    <Button
        android:id="@+id/containedButton"
        android:layout_width="0dp"
        android:layout_height="60dp"
        android:layout_marginTop="16dp"
        android:background="@color/brick_red"
        android:fontFamily="@font/poppins"
        android:text="@string/book_button"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@android:color/white"
        app:icon="@drawable/ic_baseline_sort_24"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="parent" />

    <TextView
        android:id="@+id/movie_theater_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="@font/poppins_medium"
        android:text="@string/movie_theater_name"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintBottom_toTopOf="@+id/movie_theater_distance"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/date_selector"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/movie_theater_distance"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="2dp"
        android:layout_marginTop="2dp"
        android:fontFamily="@font/poppins"
        android:text="@string/theater_distance"
        android:textAppearance="@style/TextAppearance.AppCompat.Small"
        app:layout_constraintBottom_toTopOf="@+id/containedButton"
        app:layout_constraintEnd_toEndOf="@+id/movie_theater_name"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="@+id/movie_theater_name"
        app:layout_constraintTop_toBottomOf="@+id/movie_theater_name" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`layout`](https://android.camposha.info/en/layout) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`ImageButton`](https://android.camposha.info/en/imagebutton)
4. [`Guideline`](https://android.camposha.info/en/guideline)
5. [`Button`](https://android.camposha.info/en/button)
6. [`TextView`](https://android.camposha.info/en/textview)
7. [`Barrier`](https://android.camposha.info/en/barrier)
8. [`View`](https://android.camposha.info/en/view)

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".MainActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/root"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@android:color/white">

        <ImageView
            android:id="@+id/cover"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginStart="16dp"
            android:layout_marginTop="36dp"
            android:layout_marginEnd="16dp"
            android:contentDescription="@string/cover_image"
            android:scaleType="centerCrop"
            app:layout_constraintDimensionRatio="2:3"
            app:layout_constraintEnd_toStartOf="@+id/right_guideline"
            app:layout_constraintStart_toStartOf="@+id/left_guideline"
            app:layout_constraintTop_toBottomOf="@+id/status"
            app:srcCompat="@drawable/red_sparrow" />

        <ImageButton
            android:id="@+id/menu_button"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:background="@null"
            android:contentDescription="@string/menu_button"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@drawable/ic_scatter" />

        <androidx.constraintlayout.widget.Guideline
            android:id="@+id/left_guideline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            app:layout_constraintGuide_percent="0.15" />

        <androidx.constraintlayout.widget.Guideline
            android:id="@+id/right_guideline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            app:layout_constraintGuide_percent="0.85" />

        <ImageView
            android:id="@+id/cast_one"
            android:layout_width="50dp"
            android:layout_height="0dp"
            android:layout_marginStart="16dp"
            android:contentDescription="@string/cast_1"
            android:scaleType="centerCrop"
            app:layout_constraintBottom_toBottomOf="@+id/cover"
            app:layout_constraintDimensionRatio="w,1:1"
            app:layout_constraintEnd_toStartOf="@+id/cast_three"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="parent"
            app:layout_constraintTop_toTopOf="@+id/cover"
            app:srcCompat="@drawable/cast_1" />

        <ImageView
            android:id="@+id/cast_two"
            android:layout_width="50dp"
            android:layout_height="0dp"
            android:contentDescription="@string/cast_2"
            android:scaleType="centerCrop"
            app:layout_constraintBottom_toBottomOf="@+id/cover"
            app:layout_constraintDimensionRatio="h,1:1"
            app:layout_constraintEnd_toStartOf="@+id/button"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/cast_three"
            app:layout_constraintTop_toTopOf="@+id/cover"
            app:srcCompat="@drawable/cast_3" />

        <ImageView
            android:id="@+id/cast_three"
            android:layout_width="50dp"
            android:layout_height="0dp"
            android:contentDescription="@string/cast_3"
            android:scaleType="centerCrop"
            app:layout_constraintBottom_toBottomOf="@+id/cover"
            app:layout_constraintDimensionRatio="w,1:1"
            app:layout_constraintEnd_toStartOf="@+id/cast_two"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/cast_one"
            app:layout_constraintTop_toTopOf="@+id/cover"
            app:srcCompat="@drawable/cast_2" />

        <Button
            android:id="@+id/button"
            android:layout_width="0dp"
            android:layout_height="50dp"
            android:background="@color/gray"
            android:text="@string/more_casts"
            app:layout_constraintBottom_toBottomOf="@+id/cover"
            app:layout_constraintDimensionRatio="w,1:1"
            app:layout_constraintStart_toEndOf="@+id/cast_two"
            app:layout_constraintTop_toTopOf="@+id/cover" />

        <TextView
            android:id="@+id/movie_info"
            android:layout_width="335dp"
            android:layout_height="104dp"
            android:layout_marginTop="16dp"
            android:fontFamily="@font/poppins"
            android:text="@string/movie_info"
            android:textAppearance="@style/TextAppearance.AppCompat.Small"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="@+id/date_4" />

        <TextView
            android:id="@+id/cast"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:fontFamily="@font/poppins_semibold"
            android:text="@string/cast"
            android:textAppearance="@style/TextAppearance.AppCompat.Small"
            app:layout_constraintBottom_toTopOf="@+id/cast_one"
            app:layout_constraintStart_toEndOf="parent" />

        <TextView
            android:id="@+id/movie_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="24dp"
            android:fontFamily="@font/poppins_semibold"
            android:text="@string/movie_title"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            app:layout_constraintBottom_toTopOf="@+id/desc"
            app:layout_constraintStart_toStartOf="@+id/left_guideline"
            app:layout_constraintTop_toBottomOf="@+id/cover"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/desc"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginBottom="16dp"
            android:fontFamily="@font/poppins"
            android:text="@string/movie_desc"
            app:layout_constraintBottom_toTopOf="@+id/rating"
            app:layout_constraintStart_toStartOf="@+id/left_guideline"
            app:layout_constraintTop_toBottomOf="@+id/movie_title" />

        <TextView
            android:id="@+id/rating"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginBottom="16dp"
            android:fontFamily="@font/poppins_medium"
            android:text="@string/movie_rating"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="@+id/left_guideline"
            app:layout_constraintTop_toBottomOf="@+id/desc" />

        <TextView
            android:id="@+id/status"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="8dp"
            android:fontFamily="@font/poppins_semibold"
            android:src="@drawable/transition"
            android:text="@string/movie_status"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            app:layout_constraintStart_toStartOf="@+id/left_guideline"
            app:layout_constraintTop_toBottomOf="@+id/menu_button" />

        <androidx.constraintlayout.widget.Barrier
            android:id="@+id/barrier"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:barrierDirection="bottom"
            app:constraint_referenced_ids="cover,cast_two,cast_one,button,cast_three" />

        <ImageButton
            android:id="@+id/description_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="@null"
            android:tint="@android:color/black"
            app:layout_constraintBottom_toTopOf="@+id/desc"
            app:layout_constraintEnd_toEndOf="@+id/cover"
            app:layout_constraintTop_toTopOf="@+id/movie_title"
            app:srcCompat="@drawable/ic_baseline_sort_24" />

        <View
            android:id="@+id/view"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="16dp"
            android:background="@color/gray"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="parent" />

        <View
            android:id="@+id/date_selector"
            android:layout_width="0dp"
            android:layout_height="2dp"
            android:layout_marginTop="16dp"
            android:background="@android:color/white"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingEnd="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            app:layout_constraintBottom_toBottomOf="@+id/day_1"
            app:layout_constraintEnd_toEndOf="@+id/day_1"
            app:layout_constraintStart_toStartOf="@+id/day_1"
            app:layout_constraintTop_toBottomOf="@+id/movie_info" />

        <View
            android:id="@+id/black_bar"
            android:layout_width="0dp"
            android:layout_height="4dp"
            android:background="@android:color/black"
            app:layout_constraintEnd_toEndOf="@+id/date_selector"
            app:layout_constraintStart_toStartOf="@+id/date_selector"
            app:layout_constraintTop_toTopOf="@+id/date_selector" />

        <TextView
            android:id="@+id/date_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="20"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintEnd_toEndOf="@+id/day_1"
            app:layout_constraintHorizontal_bias="1.0"
            app:layout_constraintStart_toStartOf="@+id/day_1"
            app:layout_constraintTop_toBottomOf="parent"
            tools:text="20" />

        <TextView
            android:id="@+id/date_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="21"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_1"
            app:layout_constraintEnd_toEndOf="@+id/day_2"
            app:layout_constraintHorizontal_bias="0.368"
            app:layout_constraintStart_toStartOf="@+id/day_2"
            app:layout_constraintTop_toTopOf="@+id/date_1"
            tools:text="21" />

        <TextView
            android:id="@+id/date_3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="22"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_2"
            app:layout_constraintEnd_toEndOf="@+id/day_3"
            app:layout_constraintStart_toStartOf="@+id/day_3"
            app:layout_constraintTop_toTopOf="@+id/date_2"
            tools:text="22" />

        <TextView
            android:id="@+id/date_4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="23"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_3"
            app:layout_constraintEnd_toEndOf="@+id/day_4"
            app:layout_constraintStart_toStartOf="@+id/day_4"
            app:layout_constraintTop_toTopOf="@+id/date_3"
            tools:text="23" />

        <TextView
            android:id="@+id/date_5"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="24"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_4"
            app:layout_constraintEnd_toEndOf="@+id/day_5"
            app:layout_constraintStart_toStartOf="@+id/day_5"
            app:layout_constraintTop_toTopOf="@+id/date_4"
            tools:text="24" />

        <TextView
            android:id="@+id/date_6"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="25"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_5"
            app:layout_constraintEnd_toEndOf="@+id/day_6"
            app:layout_constraintStart_toStartOf="@+id/day_6"
            app:layout_constraintTop_toTopOf="@+id/date_5"
            tools:text="25" />

        <TextView
            android:id="@+id/date_7"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_semibold"
            android:text="26"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="@+id/date_6"
            app:layout_constraintEnd_toEndOf="@+id/day_7"
            app:layout_constraintStart_toStartOf="@+id/day_7"
            app:layout_constraintTop_toTopOf="@+id/date_6"
            tools:text="26" />

        <TextView
            android:id="@+id/day_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/sunday"
            app:layout_constraintEnd_toStartOf="@+id/day_2"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/date_1" />

        <TextView
            android:id="@+id/day_3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/tuesday"
            app:layout_constraintBottom_toBottomOf="@+id/day_2"
            app:layout_constraintEnd_toStartOf="@+id/day_4"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_2"
            app:layout_constraintTop_toTopOf="@+id/day_2" />

        <TextView
            android:id="@+id/day_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/monday"
            app:layout_constraintBottom_toBottomOf="@+id/day_1"
            app:layout_constraintEnd_toStartOf="@+id/day_3"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_1"
            app:layout_constraintTop_toTopOf="@+id/day_1" />

        <TextView
            android:id="@+id/day_4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/wednesday"
            app:layout_constraintBottom_toBottomOf="@+id/day_3"
            app:layout_constraintEnd_toStartOf="@+id/day_5"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_3"
            app:layout_constraintTop_toTopOf="@+id/day_3" />

        <TextView
            android:id="@+id/day_7"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/saturday"
            app:layout_constraintBottom_toBottomOf="@+id/day_6"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_6"
            app:layout_constraintTop_toTopOf="@+id/day_6" />

        <TextView
            android:id="@+id/day_5"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/thursday"
            app:layout_constraintBottom_toBottomOf="@+id/day_4"
            app:layout_constraintEnd_toStartOf="@+id/day_6"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_4"
            app:layout_constraintTop_toTopOf="@+id/day_4" />

        <TextView
            android:id="@+id/day_6"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:paddingLeft="@dimen/selector_side_padding"
            android:paddingRight="@dimen/selector_side_padding"
            android:paddingBottom="@dimen/selector_bottom_padding"
            android:text="@string/friday"
            app:layout_constraintBottom_toBottomOf="@+id/day_5"
            app:layout_constraintEnd_toStartOf="@+id/day_7"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/day_5"
            app:layout_constraintTop_toTopOf="@+id/day_5" />

        <Button
            android:id="@+id/containedButton"
            android:layout_width="0dp"
            android:layout_height="60dp"
            android:layout_marginTop="16dp"
            android:background="@color/brick_red"
            android:fontFamily="@font/poppins"
            android:text="@string/book_button"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:textColor="@android:color/white"
            app:icon="@drawable/ic_baseline_sort_24"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="parent" />

        <TextView
            android:id="@+id/movie_theater_name"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/poppins_medium"
            android:text="@string/movie_theater_name"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            app:layout_constraintBottom_toTopOf="@+id/movie_theater_distance"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/date_selector"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/movie_theater_distance"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="2dp"
            android:layout_marginTop="2dp"
            android:fontFamily="@font/poppins"
            android:text="@string/theater_distance"
            android:textAppearance="@style/TextAppearance.AppCompat.Small"
            app:layout_constraintBottom_toTopOf="@+id/containedButton"
            app:layout_constraintEnd_toEndOf="@+id/movie_theater_name"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="@+id/movie_theater_name"
            app:layout_constraintTop_toBottomOf="@+id/movie_theater_name" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</layout>
```

#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**
> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TextView` from the `android.widget` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `ConstraintSet` from the `androidx.constraintlayout.widget` package.
4. `TransitionManager` from the `androidx.transition` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `addConstraintSetAnimation() `.
2. `selectDate(day: TextView, destinationConstraint: ConstraintSet) `.

**(a). Our `addConstraintSetAnimation()` function**

Write the `addConstraintSetAnimation()` function as follows:

```kotlin
    private fun addConstraintSetAnimation() {
        coverImage = cover
        menuButton = menu_button
        movieStatus = status
        movieTitle = movie_title
        movieDescription = desc
        movieRating = rating
        descriptionButton = description_button

        var isCoverView = false
        var isDescriptionView = false

        val initialConstraint = ConstraintSet()
        initialConstraint.clone(root)

        val coverConstraint = ConstraintSet()
        coverConstraint.clone(this, R.layout.cover_view)

        val descriptionConstraint = ConstraintSet()
        descriptionConstraint.clone(this, R.layout.description_view)

        val mapOfDays: Map<TextView, TextView> = mapOf(
            day_1 to date_1,
            day_2 to date_2,
            day_3 to date_3,
            day_4 to date_4,
            day_5 to date_5,
            day_6 to date_6,
            day_7 to date_7
        )

        val days: List<TextView> = listOf(day_1, day_2, day_3, day_4, day_5, day_6, day_7)

        for (day in days) {
            day.setOnClickListener { selectDate(it as TextView, descriptionConstraint) }
        }

        for (day in mapOfDays) {
            day.value.setOnClickListener { selectDate(day.key, descriptionConstraint) }
        }

        coverImage.setOnClickListener {
            if (!isCoverView) {
                TransitionManager.beginDelayedTransition(root)
                coverConstraint.applyTo(root)

                val anim = ValueAnimator()
                anim.setIntValues(Color.BLACK, Color.WHITE)
                anim.setEvaluator(ArgbEvaluator())
                anim.addUpdateListener {
                    menuButton.setColorFilter(it.animatedValue as Int)
                    movieStatus.setTextColor(it.animatedValue as Int)
                    movieTitle.setTextColor(it.animatedValue as Int)
                    movieDescription.setTextColor(it.animatedValue as Int)
                    movieRating.setTextColor(it.animatedValue as Int)
                    descriptionButton.setColorFilter(it.animatedValue as Int)
                }

                anim.duration = 300
                anim.start()
                isCoverView = true
                isDescriptionView = false
            }

        }

        menuButton.setOnClickListener {
            if (isCoverView) {
                TransitionManager.beginDelayedTransition(root)
                initialConstraint.applyTo(root)

                val anim = ValueAnimator()
                anim.setIntValues(Color.WHITE, Color.BLACK)
                anim.setEvaluator(ArgbEvaluator())
                anim.addUpdateListener {
                    menuButton.setColorFilter(it.animatedValue as Int)
                    movieStatus.setTextColor(it.animatedValue as Int)
                    movieTitle.setTextColor(it.animatedValue as Int)
                    movieDescription.setTextColor(it.animatedValue as Int)
                    movieRating.setTextColor(it.animatedValue as Int)
                    descriptionButton.setColorFilter(it.animatedValue as Int)
                }

                anim.duration = 300
                anim.start()
                isCoverView = false
                isDescriptionView = false
            } else if (isDescriptionView) {
                TransitionManager.beginDelayedTransition(root)
                initialConstraint.applyTo(root)

                isCoverView = false
                isDescriptionView = false
            }

        }

        descriptionButton.setOnClickListener {
            if (!isDescriptionView) {
                TransitionManager.beginDelayedTransition(root)
                descriptionConstraint.applyTo(root)

                if (isCoverView) {
                    val anim = ValueAnimator()
                    anim.setIntValues(Color.WHITE, Color.BLACK)
                    anim.setEvaluator(ArgbEvaluator())
                    anim.addUpdateListener {
                        menuButton.setColorFilter(it.animatedValue as Int)
                        movieStatus.setTextColor(it.animatedValue as Int)
                        movieTitle.setTextColor(it.animatedValue as Int)
                        movieDescription.setTextColor(it.animatedValue as Int)
                        movieRating.setTextColor(it.animatedValue as Int)
                        descriptionButton.setColorFilter(it.animatedValue as Int)
                    }

                    anim.duration = 300
                    anim.start()
                    isCoverView = false
                }


                isDescriptionView = true
            }
        }
    }
```

**(b). Our `selectDate()` function**

Write the `selectDate()` function as follows:

```kotlin
    private fun selectDate(day: TextView, destinationConstraint: ConstraintSet) {
        destinationConstraint.connect(
            date_selector.id,
            ConstraintSet.START,
            day.id,
            ConstraintSet.START
        )
        destinationConstraint.connect(
            date_selector.id,
            ConstraintSet.END,
            day.id,
            ConstraintSet.END
        )
        TransitionManager.beginDelayedTransition(root)
        destinationConstraint.applyTo(root)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.animation.ArgbEvaluator
import android.animation.ValueAnimator
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.ImageButton
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintSet
import androidx.transition.TransitionManager
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    private lateinit var coverImage: View
    private lateinit var menuButton: ImageButton
    private lateinit var movieStatus: TextView
    private lateinit var movieTitle: TextView
    private lateinit var movieDescription: TextView
    private lateinit var movieRating: TextView
    private lateinit var descriptionButton: ImageButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_FULLSCREEN)

        setContentView(R.layout.activity_main)

        addConstraintSetAnimation()
    }

    private fun addConstraintSetAnimation() {
        coverImage = cover
        menuButton = menu_button
        movieStatus = status
        movieTitle = movie_title
        movieDescription = desc
        movieRating = rating
        descriptionButton = description_button

        var isCoverView = false
        var isDescriptionView = false

        val initialConstraint = ConstraintSet()
        initialConstraint.clone(root)

        val coverConstraint = ConstraintSet()
        coverConstraint.clone(this, R.layout.cover_view)

        val descriptionConstraint = ConstraintSet()
        descriptionConstraint.clone(this, R.layout.description_view)

        val mapOfDays: Map<TextView, TextView> = mapOf(
            day_1 to date_1,
            day_2 to date_2,
            day_3 to date_3,
            day_4 to date_4,
            day_5 to date_5,
            day_6 to date_6,
            day_7 to date_7
        )

        val days: List<TextView> = listOf(day_1, day_2, day_3, day_4, day_5, day_6, day_7)

        for (day in days) {
            day.setOnClickListener { selectDate(it as TextView, descriptionConstraint) }
        }

        for (day in mapOfDays) {
            day.value.setOnClickListener { selectDate(day.key, descriptionConstraint) }
        }

        coverImage.setOnClickListener {
            if (!isCoverView) {
                TransitionManager.beginDelayedTransition(root)
                coverConstraint.applyTo(root)

                val anim = ValueAnimator()
                anim.setIntValues(Color.BLACK, Color.WHITE)
                anim.setEvaluator(ArgbEvaluator())
                anim.addUpdateListener {
                    menuButton.setColorFilter(it.animatedValue as Int)
                    movieStatus.setTextColor(it.animatedValue as Int)
                    movieTitle.setTextColor(it.animatedValue as Int)
                    movieDescription.setTextColor(it.animatedValue as Int)
                    movieRating.setTextColor(it.animatedValue as Int)
                    descriptionButton.setColorFilter(it.animatedValue as Int)
                }

                anim.duration = 300
                anim.start()
                isCoverView = true
                isDescriptionView = false
            }

        }

        menuButton.setOnClickListener {
            if (isCoverView) {
                TransitionManager.beginDelayedTransition(root)
                initialConstraint.applyTo(root)

                val anim = ValueAnimator()
                anim.setIntValues(Color.WHITE, Color.BLACK)
                anim.setEvaluator(ArgbEvaluator())
                anim.addUpdateListener {
                    menuButton.setColorFilter(it.animatedValue as Int)
                    movieStatus.setTextColor(it.animatedValue as Int)
                    movieTitle.setTextColor(it.animatedValue as Int)
                    movieDescription.setTextColor(it.animatedValue as Int)
                    movieRating.setTextColor(it.animatedValue as Int)
                    descriptionButton.setColorFilter(it.animatedValue as Int)
                }

                anim.duration = 300
                anim.start()
                isCoverView = false
                isDescriptionView = false
            } else if (isDescriptionView) {
                TransitionManager.beginDelayedTransition(root)
                initialConstraint.applyTo(root)

                isCoverView = false
                isDescriptionView = false
            }

        }

        descriptionButton.setOnClickListener {
            if (!isDescriptionView) {
                TransitionManager.beginDelayedTransition(root)
                descriptionConstraint.applyTo(root)

                if (isCoverView) {
                    val anim = ValueAnimator()
                    anim.setIntValues(Color.WHITE, Color.BLACK)
                    anim.setEvaluator(ArgbEvaluator())
                    anim.addUpdateListener {
                        menuButton.setColorFilter(it.animatedValue as Int)
                        movieStatus.setTextColor(it.animatedValue as Int)
                        movieTitle.setTextColor(it.animatedValue as Int)
                        movieDescription.setTextColor(it.animatedValue as Int)
                        movieRating.setTextColor(it.animatedValue as Int)
                        descriptionButton.setColorFilter(it.animatedValue as Int)
                    }

                    anim.duration = 300
                    anim.start()
                    isCoverView = false
                }


                isDescriptionView = true
            }
        }
    }

    private fun selectDate(day: TextView, destinationConstraint: ConstraintSet) {
        destinationConstraint.connect(
            date_selector.id,
            ConstraintSet.START,
            day.id,
            ConstraintSet.START
        )
        destinationConstraint.connect(
            date_selector.id,
            ConstraintSet.END,
            day.id,
            ConstraintSet.END
        )
        TransitionManager.beginDelayedTransition(root)
        destinationConstraint.applyTo(root)
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/sbis04/ticket_booking/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/sbis04/ticket_booking).|
|3.|Follow code author [here](https://github.com/sbis04).|
