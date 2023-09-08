# GridLayout Dashboard-UI

>  Simple Dashboard UI in Android Studio.

Minimal Dashboard UI in Android Studio using GridLayout!

![Dashboard UI Tutorial](https://camo.githubusercontent.com/2cb13f55664639326f8a72c6e11505a341125e27eee2cfb327709df0d88616ff/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f323335323034322f73637265656e73686f74732f393036363833382f6d656469612f34616331323239333965643739306633356561303565633833396663393233632e706e67)


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). build.gradle**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

On top of that we will declare our app dependencies in under the `dependencies` closure. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat` library.
3. Our `Core-ktx` library.
4. Our `Constraintlayout` library.
5. Our `Cardview` library.

> No third party dependency is needed

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "www.sanju.mydashboard"
        minSdkVersion 21
        targetSdkVersion 29
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
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'


    // Cardview Library

    implementation 'androidx.cardview:cardview:1.0.0'
}

```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

First you inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Subsequently design your XML layout using the following 6 UI widgets and ViewGroups:

1. `ScrollView` - Root element
2. `LinearLayout` - Will encompase the other inner elements.
3. `TextView` - Can be used to show texts on Cards.
4. `GridLayout` - WIll arrange dashboard items in a grid
5. `androidx.cardview.widget.CardView` - Will make our individual grids.
6. `ImageView` - Can be used to load icons on our dashboard grid items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/black"
    tools:context=".MainActivity">


    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">


        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="My Dashboard"
            android:fontFamily="@font/googlesans_bold"
            android:textSize="24sp"
            android:textColor="@color/white"
            android:layout_margin="20dp"/>


        <GridLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:rowCount="4"
            android:columnCount="2"
            android:layout_margin="5dp"
            android:alignmentMode="alignMargins"
            android:layout_gravity="center_horizontal"
            android:columnOrderPreserved="false">


            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/idea"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Idea"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>


            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/suggestion"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Suggestion"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/career"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Career"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/medical"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Medical"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/food"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Food"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/gym"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Gym"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/settings"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Settings"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:layout_width="170dp"
                android:layout_height="170dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="5dp"
                app:cardBackgroundColor="@color/gray"
                android:layout_margin="10dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center"
                    >

                    <ImageView
                        android:layout_width="24dp"
                        android:layout_height="24dp"
                        android:src="@drawable/trash"
                        android:layout_marginTop="18dp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Delete"
                        android:fontFamily="@font/googlesans_bold"
                        android:textSize="18sp"
                        android:textColor="@color/white"
                        android:layout_marginTop="20dp"/>

                </LinearLayout>

            </androidx.cardview.widget.CardView>


        </GridLayout>



    </LinearLayout>



</ScrollView>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.kt**

> Our `MainActivity` class.

Then we have our `MainActivity`. You can implement click listeners to the dashboard items here.

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/Dashboard-UI-Android/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/Dashboard-UI-Android).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
