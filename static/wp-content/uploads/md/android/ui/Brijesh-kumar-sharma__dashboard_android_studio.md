# Dashboard Android Studio

>  In This repo you find the dashboard which is created in android studio using card views you can easily set on click listner using button ids.

![Dashboard Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/94218999-95ced400-fe9a-11ea-8339-7221bb9a52bd.jpeg)


Let us look at the full Dashboard Android Studio code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 3 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.example.dashboarddesign"
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
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    implementation 'androidx.cardview:cardview:1.0.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_truck.xml`**

> Our `activity_truck` layout.

This layout will represent our Truck Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".truck">

    <TextView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:text="truck"
        android:textSize="40sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"></TextView>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ScrollView`](https://android.examples.directory/scrollview)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`CardView`](https://android.examples.directory/cardview)
4. [`ImageView`](https://android.examples.directory/imageview)
5. [`TextView`](https://android.examples.directory/textview)
6. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ScrollView
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:layout_alignParentLeft="true"
        android:background="#272424"
        android:layout_alignParentTop="true">


        <LinearLayout
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:orientation="vertical">
            <RelativeLayout
                android:layout_width="fill_parent"
                android:layout_height="fill_parent">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="200dp"
                android:orientation="vertical"
                android:gravity="center"
                android:background="@drawable/trainn">

                <androidx.cardview.widget.CardView
                    android:layout_width="50dp"
                    android:layout_height="50dp"
                    android:layout_marginLeft="135dp"
                    android:layout_marginTop="105dp"
                    app:cardCornerRadius="50dp"
                    >
                    <ImageView
                        android:layout_width="match_parent"
                        android:layout_height="match_parent"
                        android:scaleType="centerCrop"
                        android:src="@drawable/user">

                    </ImageView>

                </androidx.cardview.widget.CardView>

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Brijesh"
                    android:textColor="#ffffff"
                    android:textSize="20sp"
                    android:textStyle="bold"
                    android:layout_marginTop="2dp"
                    android:layout_marginLeft="135dp"
                    ></TextView>
            </LinearLayout>
                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="10dp"
                    android:layout_marginRight="10dp"
                    android:layout_marginTop="220dp"
                    android:orientation="vertical"
                    >
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="135dp"
                        android:orientation="horizontal"
                        android:layout_marginBottom="10dp">
                        
                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview1"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/truck">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Truck"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview1"
                                    android:layout_marginLeft="55dp"
                                    android:layout_marginBottom="10dp">
                                    
                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button1"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview2"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/car">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Car"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview2"
                                    android:layout_marginLeft="65dp"
                                    android:layout_marginBottom="10dp">

                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button2"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="135dp"
                        android:orientation="horizontal"
                        android:layout_marginBottom="10dp">

                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview3"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/cycle">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Cycle"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview3"
                                    android:layout_marginLeft="55dp"
                                    android:layout_marginBottom="10dp">

                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button3"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview4"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/bus">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Bus"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview4"
                                    android:layout_marginLeft="65dp"
                                    android:layout_marginBottom="10dp">

                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button4"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="135dp"
                        android:orientation="horizontal"
                        android:layout_marginBottom="10dp">

                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview5"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/ship">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Ship"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview5"
                                    android:layout_marginLeft="55dp"
                                    android:layout_marginBottom="10dp">

                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button5"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                        <androidx.cardview.widget.CardView
                            android:layout_width="0dp"
                            android:layout_height="match_parent"
                            android:layout_marginRight="5dp"
                            android:layout_weight="1"
                            app:cardUseCompatPadding="true"
                            app:cardCornerRadius="4dp"
                            android:elevation="5dp"
                            app:cardMaxElevation="5dp"
                            android:gravity="center"
                            android:orientation="vertical">
                            <RelativeLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                >
                                <ImageView
                                    android:layout_width="50dp"
                                    android:layout_height="50dp"
                                    android:id="@+id/imageview6"
                                    android:layout_centerInParent="true"
                                    android:src="@drawable/plane">

                                </ImageView>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text="Plane"
                                    android:textSize="18sp"
                                    android:layout_below="@id/imageview6"
                                    android:layout_marginLeft="65dp"
                                    android:layout_marginBottom="10dp">

                                </TextView>
                                <Button
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:id="@+id/button6"
                                    android:background="@android:color/transparent"></Button>


                            </RelativeLayout>

                        </androidx.cardview.widget.CardView>

                    </LinearLayout>

                </LinearLayout>


            </RelativeLayout>
        </LinearLayout>
    </ScrollView>
</RelativeLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `truck.java`**

> Our `truck` class.

Create a java file named `truck.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class truck extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_truck);
    }
}

```

**(b). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Intent` from the `android.content` package.
3. `Bundle` from the `android.os` package.
4. `View` from the `android.view` package.
5. `Button` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private Button truck;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();
        truck=findViewById(R.id.button1);
        truck.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this,truck.class);
                startActivity(intent);
            }
        });
    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/dashboard_android_studio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/dashboard_android_studio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|
