# AutoCallScheduler


>  An android app that can automatically dial a phone number..

An android app that can automatically dial a phone number within a given scheduled of time. Basically it's a test base app of google's #30daysOfKotlin bootcamp. In this project there are many concepts of kotlin used in coding sections(e.g: Livedata, ViewModel, When expressions, Data classes and equality, Visibility, Sealed classes, Lazy, Inline, Top level functions and parameters, Extension functions, Easier spans, Scoping out, etc). Students will find this project helpful for them in depth learning of kotlin programming in android development. Fell free to share and give star or fork this project. Happy coding :)

![Dialer Tutorial](https://raw.githubusercontent.com/rrsaikat/AutoCallScheduler/master/app/src/main/res/drawable/gitfullbanner.png)


### Usage


To dial a number automatically user should inputs his desired number along with scheduled date time from pickers. After finishing remaining countdown of the scheduled timer a PHONE_CALL Intent activity starts. And that's how my app works.

![AutoCallScheduler Example Tutorial](https://github.com/rrsaikat/AutoCallScheduler/raw/master/app/GIF-200606_072213.gif)

Let us look at the full Dialer Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 7 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
5. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
6. Our `Vita` library.
7. Our `Html-textview` library.

Here is our full `app/build.gradle`:

```groovy

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.rezwan.autocallscheduler"
        minSdkVersion 19
        targetSdkVersion 29
        versionCode 1
        versionName "0.2"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            def name = "AutoCallScheduler-${variant.versionCode}.${variant.versionName}.apk"
            output.outputFileName = name
        }
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'com.google.android.material:material:1.1.0'
    implementation 'androidx.core:core-ktx:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    implementation 'com.androidisland.arch:vita:0.1.0'
    implementation 'org.sufficientlysecure:html-textview:3.9'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 5 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. We will be defining a `meta-data` tag as well. Here we will add the following permission:

1. Our `CALL_PHONE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.rezwan.autocallscheduler">

    <uses-permission android:name="android.permission.CALL_PHONE" />

    <application
        android:name=".App"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".ui.ScrollingActivity"
            android:label="@string/title_activity_scrolling"
            android:theme="@style/AppTheme.NoActionBar"></activity>
        <activity android:name=".ui.DevInfoActivity" />
        <activity
            android:name=".ui.SplashActivity"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.AppCompat.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".ui.ScheduleActivity"
            android:screenOrientation="portrait" />
        <activity
            android:name=".ui.CallerActivity"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <meta-data
            android:name="preloaded_fonts"
            android:resource="@array/preloaded_fonts" />
    </application>

</manifest>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`!--`](https://android.examples.directory/!--) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/bg"
    tools:context=".ui.SplashActivity">

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_schedule.xml`**

> Our `activity_schedule` layout.

This layout will represent our Schedule Activity's layout. Specify [`!--`](https://android.examples.directory/!--) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ScrollView`](https://android.examples.directory/scrollview)
2. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
3. [`RelativeLayout`](https://android.examples.directory/relativelayout)
4. [`DatePicker`](https://android.examples.directory/datepicker)
5. [`TimePicker`](https://android.examples.directory/timepicker)
6. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>


<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingBottom="10dp"
    tools:context=".ui.ScheduleActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <RelativeLayout
            android:id="@+id/datePickerlayout"
            android:layout_width="match_parent"
            android:layout_height="match_parent" >

            <DatePicker
                android:id="@+id/dateTimePicker"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_gravity="center"
                android:layout_marginTop="10dp"
                android:layout_alignParentTop="true"
                android:layout_centerHorizontal="true"
                android:scaleX="1.1"
                android:scaleY="1.1"/>

        </RelativeLayout>

        <TimePicker
            android:id="@+id/timepicker"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            app:layout_constraintTop_toBottomOf="@+id/datePickerlayout"/>

        <Button
            android:id="@+id/btnAutoCaller"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/timepicker"
            android:text="Set Auto Caller"/>

    </androidx.constraintlayout.widget.ConstraintLayout>



</ScrollView>
```

**(c). `activity_dev_info.xml`**

> Our `activity_dev_info` layout.

This layout will represent our Info Dev Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`View`](https://android.examples.directory/view)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`ScrollView`](https://android.examples.directory/scrollview)
6. [`MaterialButton`](https://android.examples.directory/materialbutton)
7. [`HtmlTextView`](https://android.examples.directory/htmltextview)

```xml
<?xml version="1.0" encoding="utf-8"?>

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".ui.DevInfoActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/layout_1"
        android:layout_width="match_parent"
        android:layout_height="@dimen/app_bar_height">

        <View
            android:id="@+id/view"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:background="@drawable/ic_top_item"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="100dp"
            android:layout_height="100dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="@+id/view"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@drawable/icon_asset" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/app_name"
            android:textAppearance="@style/TextAppearance.AppCompat.Title"
            android:textColor="#FFFFFF"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/imageView" />

    </androidx.constraintlayout.widget.ConstraintLayout>

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/layout_1"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:id="@+id/layout_2"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:padding="10dp">

            <TextView
                android:id="@+id/textView3"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:alpha=".5"
                android:text="Developer Info"
                android:textAppearance="@style/TextAppearance.AppCompat.Title"
                app:layout_constraintBottom_toTopOf="@+id/layout_owner"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnDev"
                style="@style/Widget.MaterialComponents.Button.TextButton"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:drawableEnd="@drawable/ic_rrow_right"
                android:text="More"
                app:layout_constraintBottom_toBottomOf="@+id/textView3"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintTop_toTopOf="@+id/textView3" />

            <androidx.constraintlayout.widget.ConstraintLayout
                android:id="@+id/layout_owner"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                app:layout_constraintBottom_toTopOf="@+id/textView7"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/textView3">

                <ImageView
                    android:id="@+id/imageView3"
                    android:layout_width="80dp"
                    android:layout_height="80dp"
                    android:layout_marginTop="16dp"
                    android:src="@drawable/owner"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />

                <androidx.constraintlayout.widget.ConstraintLayout
                    android:id="@+id/owner_details"
                    android:layout_width="0dp"
                    android:layout_height="match_parent"
                    android:layout_marginStart="16dp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toEndOf="@+id/imageView3"
                    app:layout_constraintTop_toTopOf="parent">

                    <TextView
                        android:id="@+id/textView4"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Rezwan rabbi"
                        android:textAppearance="@style/TextAppearance.AppCompat.Headline"
                        app:layout_constraintBottom_toTopOf="@+id/textView6"
                        app:layout_constraintStart_toStartOf="parent"
                        app:layout_constraintTop_toTopOf="parent" />

                    <TextView
                        android:id="@+id/textView6"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Android Engineer"
                        app:layout_constraintBottom_toTopOf="@+id/tvDevLink"
                        app:layout_constraintStart_toStartOf="@+id/textView4"
                        app:layout_constraintTop_toBottomOf="@+id/textView4" />

                    <org.sufficientlysecure.htmltextview.HtmlTextView
                        android:id="@+id/tvDevLink"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="https://www.github.com/rrsaikat"
                        android:textColor="#03A9F4"
                        app:layout_constraintBottom_toBottomOf="parent"
                        app:layout_constraintStart_toStartOf="@+id/textView6"
                        app:layout_constraintTop_toBottomOf="@+id/textView6" />
                </androidx.constraintlayout.widget.ConstraintLayout>
            </androidx.constraintlayout.widget.ConstraintLayout>

            <TextView
                android:id="@+id/textView7"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:alpha=".5"
                android:text="Project Info"
                android:textAppearance="@style/TextAppearance.AppCompat.Title"
                app:layout_constraintBottom_toTopOf="@+id/tvProjectInfo"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/layout_owner" />

            <com.google.android.material.button.MaterialButton
                android:id="@+id/btnProject"
                style="@style/Widget.MaterialComponents.Button.TextButton"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:drawableEnd="@drawable/ic_rrow_right"
                android:text="More"
                app:layout_constraintBottom_toBottomOf="@+id/textView7"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintTop_toTopOf="@+id/textView7" />

            <TextView
                android:id="@+id/tvProjectInfo"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:lineSpacingExtra="0dp"
                android:text="@string/app_details"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/textView7" />
        </androidx.constraintlayout.widget.ConstraintLayout>

    </ScrollView>
</RelativeLayout>
```

**(d). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`!--`](https://android.examples.directory/!--) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`EditText`](https://android.examples.directory/edittext)
3. [`TextInputLayout`](https://android.examples.directory/textinputlayout)
4. [`TextInputEditText`](https://android.examples.directory/textinputedittext)
5. [`ImageButton`](https://android.examples.directory/imagebutton)
6. [`TextView`](https://android.examples.directory/textview)
7. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>


<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.CallerActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/numberlayout"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.26">

        <EditText
            android:id="@+id/editText2"
            android:layout_width="100dp"
            android:layout_height="wrap_content"
            android:ems="10"
            android:gravity="center"
            android:hint="*100*"
            android:inputType="textPersonName"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/input_number_field"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/input_number_field"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.Dense"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="4dp"
            app:hintEnabled="false"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/editText4"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/editText2"
            app:layout_constraintTop_toTopOf="parent">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/edtNumber"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:ems="10"
                android:gravity="start"
                android:hint="Enter phone number"
                android:inputType="phone"
                android:textColorHint="#998E8989" />
        </com.google.android.material.textfield.TextInputLayout>

        <EditText
            android:id="@+id/editText4"
            android:layout_width="40dp"
            android:layout_height="wrap_content"
            android:ems="10"
            android:gravity="center"
            android:hint="#"
            android:inputType="textPersonName"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/input_number_field"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/action_layout"
        android:layout_width="411dp"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/numberlayout">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:id="@+id/directcall_field"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/btnConfirm"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

            <ImageButton
                android:id="@+id/btnCall"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:background="#FFFFFF"
                android:padding="10dp"
                android:src="@drawable/ic_call"
                app:layout_constraintBottom_toTopOf="@+id/textView"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <TextView
                android:id="@+id/textView"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Direct Call"
                app:layout_constraintBottom_toTopOf="@+id/btnCall"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/btnCall" />
        </androidx.constraintlayout.widget.ConstraintLayout>

        <Button
            android:id="@+id/btnConfirm"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="10dp"
            android:text="Confirm"
            android:textAllCaps="false"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/clear_field"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/directcall_field"
            app:layout_constraintTop_toTopOf="parent" />

        <androidx.constraintlayout.widget.ConstraintLayout
            android:id="@+id/clear_field"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toEndOf="@+id/btnConfirm"
            app:layout_constraintTop_toTopOf="parent">

            <ImageButton
                android:id="@+id/btnClear"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:background="#FFFFFF"
                android:padding="10dp"
                android:src="@drawable/ic_clear"
                app:layout_constraintBottom_toTopOf="@+id/textView1"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <TextView
                android:id="@+id/textView1"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Clear"
                app:layout_constraintBottom_toTopOf="@+id/btnClear"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintHorizontal_bias="0.5"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/btnClear" />
        </androidx.constraintlayout.widget.ConstraintLayout>

    </androidx.constraintlayout.widget.ConstraintLayout>

    <TextView
        android:id="@+id/tvTimer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:padding="10dp"
        android:text="0:00"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/action_layout" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Bundle` from the `android.os` package.
4. `Handler` from the `android.os` package.

Then extend the `BaseActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin

package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.rezwan.autocallscheduler.R
import com.rezwan.autocallscheduler.ext.postDelayed

class SplashActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        Handler().postDelayed(Runnable {
            startActivity(Intent(this, CallerActivity::class.java))
            finish()
        },2000)
    }
}


```


**(b). `ScheduleActivity.kt`**

> Our `ScheduleActivity` class.

Create a Kotlin file named `ScheduleActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `DatePicker` from the `android.widget` package.
3. `TimePicker` from the `android.widget` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_schedule` package.

Then extend the `BaseActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onDateChanged(view: DatePicker?, year: Int, monthOfYear: Int, dayOfMonth: Int) `.
3. `onTimeChanged(view: TimePicker?, hourOfDay: Int, minute: Int) `.

Then we will be creating the following functions:

1. `setupToolbar() `.
2. `initPickers() `.
3. `initListener() `.

**(a). Our `setupToolbar()` function.**

A function to setup toolbar:

```kotlin
    private fun setupToolbar() {
        supportActionBar?.apply {
            title = "Pick Date & Time"
            elevation = 0f
            setDisplayHomeAsUpEnabled(true)
        }
    }
```

**(b). Our `initListener()` function.**

A function to init listener:

```kotlin
    private fun initListener() {
        btnAutoCaller.setOnClickListener {
            viewModel.setLiveScheduler(schedulerModel)
            super.onBackPressed()
        }
    }
```

**(c). Our `initPickers()` function.**

A function to init pickers:

```kotlin
    private fun initPickers() {
        with(Calendar.getInstance()) {
            mhour = this.get(Calendar.HOUR_OF_DAY)
            mmin = this.get(Calendar.MINUTE)

            val yy: Int = this.get(Calendar.YEAR)
            val mm: Int = this.get(Calendar.MONTH)
            val dd: Int = this.get(Calendar.DAY_OF_MONTH)

            schedulerModel.day = dd
            schedulerModel.month = mm + 1
            schedulerModel.year = yy
            schedulerModel.hour = mhour
            schedulerModel.min = mmin
            schedulerModel.format = TimeUtils.getAmPmFormat(mhour)

            dateTimePicker.init(yy, mm, dd, this@ScheduleActivity)
            timepicker.setOnTimeChangedListener(this@ScheduleActivity)
        }
    }
```


Here is the full code:

```kotlin

package replace_with_your_package_name

import android.os.Bundle
import android.widget.DatePicker
import android.widget.TimePicker
import com.rezwan.autocallscheduler.R
import com.rezwan.autocallscheduler.model.SchedulerModel
import com.rezwan.autocallscheduler.utils.TimeUtils
import kotlinx.android.synthetic.main.activity_schedule.*
import java.util.*

class ScheduleActivity : BaseActivity(), DatePicker.OnDateChangedListener,
    TimePicker.OnTimeChangedListener {
    private val schedulerModel = SchedulerModel(0, 0, 0, 0, 0, "")
    private var mhour = 0
    private var mmin = 0


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_schedule)
        setupToolbar()
        initPickers()
        initListener()
    }

    private fun setupToolbar() {
        supportActionBar?.apply {
            title = "Pick Date & Time"
            elevation = 0f
            setDisplayHomeAsUpEnabled(true)
        }
    }

    private fun initPickers() {
        with(Calendar.getInstance()) {
            mhour = this.get(Calendar.HOUR_OF_DAY)
            mmin = this.get(Calendar.MINUTE)

            val yy: Int = this.get(Calendar.YEAR)
            val mm: Int = this.get(Calendar.MONTH)
            val dd: Int = this.get(Calendar.DAY_OF_MONTH)

            schedulerModel.day = dd
            schedulerModel.month = mm + 1
            schedulerModel.year = yy
            schedulerModel.hour = mhour
            schedulerModel.min = mmin
            schedulerModel.format = TimeUtils.getAmPmFormat(mhour)

            dateTimePicker.init(yy, mm, dd, this@ScheduleActivity)
            timepicker.setOnTimeChangedListener(this@ScheduleActivity)
        }
    }

    private fun initListener() {
        btnAutoCaller.setOnClickListener {
            viewModel.setLiveScheduler(schedulerModel)
            super.onBackPressed()
        }
    }

    override fun onDateChanged(view: DatePicker?, year: Int, monthOfYear: Int, dayOfMonth: Int) {
        schedulerModel.year = year
        schedulerModel.month = monthOfYear + 1
        schedulerModel.day = dayOfMonth
    }

    override fun onTimeChanged(view: TimePicker?, hourOfDay: Int, minute: Int) {
        schedulerModel.hour = hourOfDay
        schedulerModel.min = minute
        schedulerModel.format = TimeUtils.getAmPmFormat(hourOfDay)
    }
}


```


**(c). `DevInfoActivity.kt`**

> Our `DevInfoActivity` class.

Create a Kotlin file named `DevInfoActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `*` from the `kotlinx.android.synthetic.main.activity_dev_info` package.

Then extend the `BaseActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `initListener() `.
2. `initToolbar()`.

**(a). Our `initListener()` function.**

A function to init listener:

```kotlin
    private fun initListener() {
        btnDev.setOnClickListener {
            BrowserUtils.openBrowser(this, "https://github.com/rrsaikat")
        }

        btnProject.setOnClickListener {
            BrowserUtils.openBrowser(this, "https://github.com/rrsaikat/AutoCallScheduler")
        }
    }
```

**(b). Our `initToolbar()` function.**

A function to init toolbar:

```kotlin
    private fun initToolbar(){
        supportActionBar?.apply {
            title = "Details"
            elevation = 0f
            setDisplayHomeAsUpEnabled(true)
        }
    }
```


Here is the full code:

```kotlin

package replace_with_your_package_name

import android.content.Intent
import android.os.Bundle
import com.rezwan.autocallscheduler.R
import com.rezwan.autocallscheduler.utils.BrowserUtils
import kotlinx.android.synthetic.main.activity_dev_info.*

class DevInfoActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dev_info)
        initToolbar()
        initListener()
        tvDevLink.setHtml("<a href=\"https://github.com/rrsaikat\">https://github.com/rrsaikat</a>")
    }

    private fun initListener() {
        btnDev.setOnClickListener {
            BrowserUtils.openBrowser(this, "https://github.com/rrsaikat")
        }

        btnProject.setOnClickListener {
            BrowserUtils.openBrowser(this, "https://github.com/rrsaikat/AutoCallScheduler")
        }
    }

    private fun initToolbar(){
        supportActionBar?.apply {
            title = "Details"
            elevation = 0f
            setDisplayHomeAsUpEnabled(true)
        }
    }
}


```


**(d). `CallerActivity.kt`**

> Our `CallerActivity` class.

Create a Kotlin file named `CallerActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Toast` from the `android.widget` package.
2. `ActivityCompat` from the `androidx.core.app` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `Observer` from the `androidx.lifecycle` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `BaseActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onCreateOptionsMenu(menu: Menu?): Boolean `.
3. `onTimerFinished() `.
4. `onTimerTicked(remainingTime: String) `.

Then we will be creating the following functions:

1. `onResume() `.
2. `initListeners() `.
3. `setupObservers() `.
4. `startAutoCall() `.
5. `startTimerDurtionCall(parameter)` - Our function will take a `Long` object as a parameter.
6. `directPhoneCall() `.
7. `checkPermission(parameter)` - This function will take a `String` object as a parameter.
8. `requestPermission(parameter)` - We pass a `String` object as a parameter.
9. `hasPermission(parameter)` - We pass a `String` object as a parameter.

**(a). Our `startTimerDurtionCall()` function.**

A function to start timer durtion call:

```kotlin
    private fun startTimerDurtionCall(duration:Long){
        RTimer(duration, 1000).apply {
            start()
            setListener(this@CallerActivity)
        }
    }
```

**(b). Our `directPhoneCall()` function.**

A function to direct phone call:

```kotlin
    private fun directPhoneCall() {
        val phoneNo = getPhoneNoFromFields()
        startActivity(Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phoneNo)))
    }
```

**(c). Our `requestPermission()` function.**

A function to request permission:

```kotlin
    fun requestPermission(permission: String) {
        val PERMISSIONS_STORAGE = arrayOf<String>(permission)
        ActivityCompat.requestPermissions(
            this, PERMISSIONS_STORAGE,
            const.ESSENTIAL_PERMISSIONS_REQUEST_CODE
        )
    }
```

**(d). Our `hasPermission()` function.**

A function to has permission:

```kotlin
    fun hasPermission(permission: String): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            permission
        ) == PackageManager.PERMISSION_GRANTED
    }
```

**(e). Our `checkPermissionsRequestResult()` function.**

A function to check permissions request result:

```kotlin
    fun checkPermissionsRequestResult(
        requestCode: Int,
        grantResults: IntArray
    ): AppViewModel.AppPermissions {
        return when {
            requestCode != const.ESSENTIAL_PERMISSIONS_REQUEST_CODE -> AppViewModel.AppPermissions.NOT_GRANTED()
            grantResults.none { it == PackageManager.PERMISSION_DENIED } -> AppViewModel.AppPermissions.GRANTED()
            ActivityCompat.shouldShowRequestPermissionRationale(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            )
                    || ActivityCompat.shouldShowRequestPermissionRationale(
                this,
                Manifest.permission.CAMERA
            ) -> AppViewModel.AppPermissions.SHOW_RATIONALE()
            else -> AppViewModel.AppPermissions.NOT_GRANTED()
        }
    }
```

**(f). Our `initListeners()` function.**

A function to init listeners:

```kotlin
    private fun initListeners() {
        btnConfirm.setOnClickListener {
            edtNumber.text?.let { input ->
                if (input.isNotEmpty())
                    startActivity(Intent(this, ScheduleActivity::class.java))
                else Toast.makeText(
                    applicationContext,
                    "Please enter your number",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
        btnCall.setOnClickListener {
            edtNumber.text?.let { input ->
                if (input.isNotEmpty())
                    startAutoCall()
                else Toast.makeText(
                    applicationContext,
                    "Please enter your number",
                    Toast.LENGTH_SHORT
                ).show()

            }
        }
        btnClear.setOnClickListener {
            editText2.text?.clear()
            edtNumber.text?.clear()
            editText4.text?.clear()
        }
    }
```

**(g). Our `setupObservers()` function.**

A function to setup observers:

```kotlin
    private fun setupObservers() {
        viewModel.permissionObservable.observe(this, Observer {
            when (it) {
                is AppViewModel.AppPermissions.NO_PERMISSION_REQUIRED -> {
                    directPhoneCall()
                }
                is AppViewModel.AppPermissions.GRANTED -> {
                    directPhoneCall()
                }
                is AppViewModel.AppPermissions.NOT_GRANTED -> {
                    Toast.makeText(this, "Permission is required", Toast.LENGTH_SHORT).show()
                }
                is AppViewModel.AppPermissions.SHOW_RATIONALE -> {
                }
            }
        })

        viewModel.observeScheduler(this, Observer {
            with(it) {
                try {
                    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm aa")
                    val date1 = Date()
                    val date2 = sdf.parse("$year-$month-$day $hour:$min $format")
                    error(this, "date1 $date1    ,    date2 $date2")

                    if (date1.compareTo(date2) > 0) {
                        info("app", "Date1 is after Date2");
                        startAutoCall()
                    } else if (date1.compareTo(date2) < 0) {
                        info("app", "Date1 is before Date2");
                        val duration: Long = date2.getTime() - date1.getTime()
                        startTimerDurtionCall(duration)
                        btnConfirm.visibility = View.INVISIBLE
                    } else if (date1.compareTo(date2) == 0) {
                        info("app", "Date1 is equal to Date2");
                        startAutoCall()
                    }

                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        })
    }
```

**(h). Our `startAutoCall()` function.**

A function to start auto call:

```kotlin
    private fun startAutoCall() {
        if (Build.VERSION.SDK_INT < 23) {
            viewModel.permissionObservable.value =
                AppViewModel.AppPermissions.NO_PERMISSION_REQUIRED()
        } else {
            checkPermission(CALL_PHONE)
        }
    }
```

**(i). Our `checkPermission()` function.**

A function to check permission:

```kotlin
    fun checkPermission(permission: String) {
        if (hasPermission(permission)) {
            viewModel.permissionObservable.value = AppViewModel.AppPermissions.GRANTED()
        } else {
            requestPermission(permission)
        }
    }
```


Here is the full code:

```kotlin

package replace_with_your_package_name

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.View
import android.widget.Toast
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.Observer
import com.rezwan.autocallscheduler.R
import com.rezwan.autocallscheduler.callbacks.TimerTaskListener
import com.rezwan.autocallscheduler.constants.const
import com.rezwan.autocallscheduler.ext.error
import com.rezwan.autocallscheduler.ext.info
import com.rezwan.autocallscheduler.helper.RTimer
import com.rezwan.autocallscheduler.utils.StringUtils
import com.rezwan.autocallscheduler.viewmodel.AppViewModel
import kotlinx.android.synthetic.main.activity_main.*
import java.text.SimpleDateFormat
import java.util.*


class CallerActivity : BaseActivity(), TimerTaskListener {
    private val CALL_PHONE = Manifest.permission.CALL_PHONE

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initListeners()
        setupObservers()
    }

    /* override fun onResume() {
         super.onResume()
         checkPermission(CALL_PHONE)
     }*/

    private fun initListeners() {
        btnConfirm.setOnClickListener {
            edtNumber.text?.let { input ->
                if (input.isNotEmpty())
                    startActivity(Intent(this, ScheduleActivity::class.java))
                else Toast.makeText(
                    applicationContext,
                    "Please enter your number",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
        btnCall.setOnClickListener {
            edtNumber.text?.let { input ->
                if (input.isNotEmpty())
                    startAutoCall()
                else Toast.makeText(
                    applicationContext,
                    "Please enter your number",
                    Toast.LENGTH_SHORT
                ).show()

            }
        }
        btnClear.setOnClickListener {
            editText2.text?.clear()
            edtNumber.text?.clear()
            editText4.text?.clear()
        }
    }

    @SuppressLint("SimpleDateFormat")
    private fun setupObservers() {
        viewModel.permissionObservable.observe(this, Observer {
            when (it) {
                is AppViewModel.AppPermissions.NO_PERMISSION_REQUIRED -> {
                    directPhoneCall()
                }
                is AppViewModel.AppPermissions.GRANTED -> {
                    directPhoneCall()
                }
                is AppViewModel.AppPermissions.NOT_GRANTED -> {
                    Toast.makeText(this, "Permission is required", Toast.LENGTH_SHORT).show()
                }
                is AppViewModel.AppPermissions.SHOW_RATIONALE -> {
                }
            }
        })

        viewModel.observeScheduler(this, Observer {
            with(it) {
                try {
                    val sdf = SimpleDateFormat("yyyy-MM-dd HH:mm aa")
                    val date1 = Date()
                    val date2 = sdf.parse("$year-$month-$day $hour:$min $format")
                    error(this, "date1 $date1    ,    date2 $date2")

                    if (date1.compareTo(date2) > 0) {
                        info("app", "Date1 is after Date2");
                        startAutoCall()
                    } else if (date1.compareTo(date2) < 0) {
                        info("app", "Date1 is before Date2");
                        val duration: Long = date2.getTime() - date1.getTime()
                        startTimerDurtionCall(duration)
                        btnConfirm.visibility = View.INVISIBLE
                    } else if (date1.compareTo(date2) == 0) {
                        info("app", "Date1 is equal to Date2");
                        startAutoCall()
                    }

                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        })
    }

    private fun startAutoCall() {
        if (Build.VERSION.SDK_INT < 23) {
            viewModel.permissionObservable.value =
                AppViewModel.AppPermissions.NO_PERMISSION_REQUIRED()
        } else {
            checkPermission(CALL_PHONE)
        }
    }

    private fun startTimerDurtionCall(duration:Long){
        RTimer(duration, 1000).apply {
            start()
            setListener(this@CallerActivity)
        }
    }

    @SuppressLint("MissingPermission")
    private fun directPhoneCall() {
        val phoneNo = getPhoneNoFromFields()
        startActivity(Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phoneNo)))
    }

    private fun getPhoneNoFromFields() = editText2.text.toString() + edtNumber.text.toString() + editText4.text.toString()

    fun checkPermission(permission: String) {
        if (hasPermission(permission)) {
            viewModel.permissionObservable.value = AppViewModel.AppPermissions.GRANTED()
        } else {
            requestPermission(permission)
        }
    }

    fun requestPermission(permission: String) {
        val PERMISSIONS_STORAGE = arrayOf<String>(permission)
        ActivityCompat.requestPermissions(
            this, PERMISSIONS_STORAGE,
            const.ESSENTIAL_PERMISSIONS_REQUEST_CODE
        )
    }

    fun hasPermission(permission: String): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            permission
        ) == PackageManager.PERMISSION_GRANTED
    }

    fun checkPermissionsRequestResult(
        requestCode: Int,
        grantResults: IntArray
    ): AppViewModel.AppPermissions {
        return when {
            requestCode != const.ESSENTIAL_PERMISSIONS_REQUEST_CODE -> AppViewModel.AppPermissions.NOT_GRANTED()
            grantResults.none { it == PackageManager.PERMISSION_DENIED } -> AppViewModel.AppPermissions.GRANTED()
            ActivityCompat.shouldShowRequestPermissionRationale(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            )
                    || ActivityCompat.shouldShowRequestPermissionRationale(
                this,
                Manifest.permission.CAMERA
            ) -> AppViewModel.AppPermissions.SHOW_RATIONALE()
            else -> AppViewModel.AppPermissions.NOT_GRANTED()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.call_menu, menu)
        return true
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        checkPermissionsRequestResult(requestCode, grantResults)
    }

    override fun onTimerFinished() {
        btnConfirm.visibility = View.VISIBLE
        tvTimer.text = "0:00"
        startAutoCall()
    }

    override fun onTimerTicked(remainingTime: String) {
        runOnUiThread {
            tvTimer.text = StringUtils.timeStringToSpan(remainingTime)
        }
    }
}


```


**(e). `BaseActivity.kt`**

> Our `BaseActivity` class.

Create a Kotlin file named `BaseActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Menu` from the `android.view` package.
3. `MenuItem` from the `android.view` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `Observer` from the `androidx.lifecycle` package.

First override these callbacks: 

1. `onOptionsItemSelected(item: MenuItem): Boolean `.

Here is the full code:

```kotlin

package replace_with_your_package_name

import android.content.Intent
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import com.androidisland.vita.VitaOwner
import com.androidisland.vita.vita
import com.rezwan.autocallscheduler.R
import com.rezwan.autocallscheduler.viewmodel.AppViewModel

abstract class BaseActivity :AppCompatActivity(){
    internal val viewModel by lazy {
        vita.with(VitaOwner.Multiple(this)).getViewModel<AppViewModel>()
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home ->{
                super.onBackPressed()
            }

            R.id.menu_devInfo -> {
                startActivity(Intent(this, DevInfoActivity::class.java))
            }
        }

        return false
    }
}

```


**(f). `SchedulerModel.kt`**

> Our `SchedulerModel` class.

Create a Kotlin file named `SchedulerModel.kt` .

Here is the full code:

```kotlin

package replace_with_your_package_name

data class SchedulerModel(var year:Int, var month:Int,var day:Int,var hour:Int,var min:Int,var format:String)

```


**(g). `TimerTaskListener.kt`**

> Our `TimerTaskListener` class.

Create a Kotlin file named `TimerTaskListener.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin

package replace_with_your_package_name

interface TimerTaskListener {
    fun onTimerFinished()
    fun onTimerTicked(remainingTime: String)
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/rrsaikat/AutoCallScheduler/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/rrsaikat/AutoCallScheduler).|
|3.|Follow code author [here](https://github.com/rrsaikat).|
