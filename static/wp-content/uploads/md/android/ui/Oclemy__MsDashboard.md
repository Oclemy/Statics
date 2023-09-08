# Dashboard UI

>  How to designn a dashboard with cardviews and collapsing toolbar layout..

Here is the demo:

![MsDashboard Example Tutorial](https://github.com/Oclemy/MsDashboard/raw/master/MsDashboard.gif)

How to designn a dashboard with cardviews and collapsing toolbar layout.

Let us look at the full Dashboard UI Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 6 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.3"

    defaultConfig {
        applicationId "info.camposha.msdashboard"
        minSdkVersion 14
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'


}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.coordinatorlayout.widget.CoordinatorLayout`](https://android.examples.directory/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`AppBarLayout`](https://android.examples.directory/appbarlayout)
2. [`CollapsingToolbarLayout`](https://android.examples.directory/collapsingtoolbarlayout)
3. [`Toolbar`](https://android.examples.directory/toolbar)
4. [`NestedScrollView`](https://android.examples.directory/nestedscrollview)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)
6. [`CardView`](https://android.examples.directory/cardview)
7. [`ImageView`](https://android.examples.directory/imageview)
8. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:background="#fcfcfc">

    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/appbar"
        android:layout_height="300dp"
        android:layout_width="match_parent"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <com.google.android.material.appbar.CollapsingToolbarLayout
            android:id="@+id/colapsingtoolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_scrollFlags="exitUntilCollapsed|scroll"
            app:contentScrim="@color/colorPrimary"
            app:title="App Title"
            app:expandedTitleMarginStart="48dp"
            app:expandedTitleMarginEnd="64dp"
            android:background="@drawable/orig"
            >
            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbarid"
                app:popupTheme="@style/AlertDialog.AppCompat.Light"
                app:layout_collapseMode="pin"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"/>


        </com.google.android.material.appbar.CollapsingToolbarLayout>

    </com.google.android.material.appbar.AppBarLayout>
<androidx.core.widget.NestedScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="10dp"
        android:orientation="vertical"
        android:background="@color/lightgray"
        android:gravity="center"
        >

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:clipToPadding="false"
            android:gravity="center">

            <androidx.cardview.widget.CardView
                android:layout_width="160dp"
                android:layout_height="190dp"
                android:foreground="?android:attr/selectableItemBackground"
                android:clickable="true"
                android:layout_margin="10dp">

                <LinearLayout
                    android:id="@+id/first"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:gravity="center"
                    android:orientation="vertical">

                    <ImageView
                        android:layout_width="64dp"
                        android:layout_height="64dp"
                        android:background="@drawable/cerclebackgroundpurple"
                        android:padding="10dp"
                        android:src="@drawable/ic_mood_black_24dp" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="10dp"
                        android:text="Mood"
                        android:textStyle="bold" />


                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:padding="5dp"
                        android:text="Check your Mood..Be Happy.."
                        android:textColor="@android:color/darker_gray" />

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="160dp"
                android:layout_height="190dp"
                android:layout_margin="10dp"
                android:foreground="?android:attr/selectableItemBackground"
                android:clickable="true">

                <LinearLayout
                    android:id="@+id/second"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:gravity="center"
                    android:orientation="vertical">

                    <ImageView
                        android:layout_width="64dp"
                        android:layout_height="64dp"
                        android:background="@drawable/cerclebackgroundpink"
                        android:padding="10dp"
                        android:src="@drawable/ic_directions_bike_black_24dp" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="10dp"
                        android:text="Cycle Ride"
                        android:textStyle="bold" />


                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:padding="5dp"
                        android:text="Go Green .. Use Cycle.."
                        android:textColor="@android:color/darker_gray" />

                </LinearLayout>

            </androidx.cardview.widget.CardView>
        </LinearLayout>

        <LinearLayout
            android:gravity="center"
            android:clipToPadding="false"
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <androidx.cardview.widget.CardView
                android:layout_width="160dp"
                android:layout_height="190dp"
                android:layout_margin="10dp"
                android:foreground="?android:attr/selectableItemBackground"
                android:clickable="true">

                <LinearLayout
                    android:id="@+id/third"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <ImageView
                        android:layout_width="64dp"
                        android:layout_height="64dp"
                        android:background="@drawable/cerclebackgroundgreen"
                        android:src="@drawable/ic_cloud_circle_black_24dp"
                        android:padding="10dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:textStyle="bold"
                        android:layout_marginTop="10dp"
                        android:text="Enviroment" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:padding="5dp"
                        android:textColor="@android:color/darker_gray"
                        android:text="Cloudy..." />

                </LinearLayout>

            </androidx.cardview.widget.CardView>
            <androidx.cardview.widget.CardView
                android:layout_width="160dp"
                android:layout_height="190dp"
                android:layout_margin="10dp"
                android:foreground="?android:attr/selectableItemBackground"
                android:clickable="true">

                <LinearLayout
                    android:id="@+id/fourth"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <ImageView
                        android:layout_width="64dp"
                        android:layout_height="64dp"
                        android:background="@drawable/cerclebackgroundyello"
                        android:src="@drawable/ic_lock_open_black_24dp"
                        android:padding="10dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:textStyle="bold"
                        android:layout_marginTop="10dp"
                        android:text="Security" />


                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:padding="5dp"
                        android:textColor="@android:color/darker_gray"
                        android:text="Open lock with your private password" />

                </LinearLayout>

            </androidx.cardview.widget.CardView>
        </LinearLayout>



    </LinearLayout>




</androidx.core.widget.NestedScrollView>


</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `Toast` from the `android.widget` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        first.setOnClickListener {
            Toast.makeText(this@MainActivity, "First", Toast.LENGTH_SHORT).show()
        }
        second.setOnClickListener {
            Toast.makeText(this@MainActivity, "Second", Toast.LENGTH_SHORT).show()
        }
        third.setOnClickListener {
            Toast.makeText(this@MainActivity, "Third", Toast.LENGTH_SHORT).show()
        }
        fourth.setOnClickListener {
            Toast.makeText(this@MainActivity, "Fourth", Toast.LENGTH_SHORT).show()
        }
    }
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Oclemy/MsDashboard/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Oclemy/MsDashboard).|
|3.|Follow code author [here](https://github.com/Oclemy).|
