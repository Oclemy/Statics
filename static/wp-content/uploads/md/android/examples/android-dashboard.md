# How to Create a Dashboard Page - Kotlin Android

In this tutorial we will look at how to design and create a dashboard page in android.You can use a dashboard page as your home activity in android, to provide a centralized navigation page. We will be using cardviews, collapsing toolbar layout and imageviews to create a stunning dashboard page.


Here's a video tutorial for this lesson:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Kxaa8QMmmVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Add Dependencies

We don't use any third party library in this project.

### Step 2: Design Layout

We have only a single layout called activity_main.xml:

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

### Step 3: Write Code

We write our code in Kotlin. Mostly our code involves event handlers for our cardviews. For example when the user clicks a single cardview you can open a page or show a toast message:

```kotlin
package info.camposha.msdashboard

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

### Step 4: Run

Run the project.

### Step 5: Download

Download the source code [here](https://github.com/Oclemy/MsDashboard/archive/refs/heads/master.zip).
