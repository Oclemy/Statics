# Reveal Layout Tutorial and Example


In this tutorial we want to look at Reveal Layouts and their examples.


## FABRevealLayout

_Android Awesome FABRevealLayout Example_

This is an android FABRevealLayout tutorial. Basically we have a Floating Action Button that when clicked displays some hidden layout. This occurs with beautiful animations.

##### Why FABRevealLayout

Currently, there are [approximately 2.3 billion devices in use](https://newzoo.com/insights/articles/insights-into-the-2-3-billion-android-smartphones-in-use-around-the-world/). All these devices have apps installed on them. There are [approximately 2.6 million apps](https://www.statista.com/statistics/266210/number-of-available-applications-in-the-google-play-store/) for users in Google Play store.

So to make your app store you have to create amazing modern apps that are easy and intuitive to use. This implies that you need innovative ways of rendering your content.

And one such way is using the FAB Reveal Layout technique. You don't render the whole content to user at first. Instead you allow user to see it on demand by clicking the Floating Action Button.

##### Demo

Here's the gif demo of the project:

Here's it in the landscape mode:

##### Video Tutorial(Recommended)

Here's the video tutorial. I recommend you watch the video tutorial as it contains explantions on step by step process of how to create this. We start from scratch by creating a project and I take you through all the steps and code.

##### 1\. Installing FABRevealLayout

The first step is to install FABRevealLayout as it is a third party library.

You can do that using the following implementation statement:

```groovy
implementation 'com.truizlop.fabreveallayout:library:1.0.0'
```

Also add the following as dependencies in your app level build.gradle:

```groovy
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support:support-v4:28.0.0'
    implementation 'com.android.support:design:28.0.0'
```

I had to add the support-v4 and design only because I was getting conflicts with the support dependency versions that were used in constructing FABRevealLayout.

##### 2\. Preparing Styles - styles.xml

In your styles.xml add the following styles. You can see they are basically attributes for the various widgets we will have in our main layout.

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
    </style>

    <style name="GameCoverStyle">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">0dp</item>
        <item name="android:layout_weight">1</item>
        <item name="android:scaleType">centerCrop</item>
        <item name="android:adjustViewBounds">true</item>
    </style>

    <style name="GameTitleStyle">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">wrap_content</item>
        <item name="android:layout_marginBottom">16dp</item>
        <item name="android:layout_marginLeft">16dp</item>
        <item name="android:layout_marginRight">16dp</item>
        <item name="android:textSize">20sp</item>
        <item name="android:textStyle">bold</item>
        <item name="android:textColor">@color/white</item>
    </style>

    <style name="GameCreatorStyle">
        <item name="android:layout_width">match_parent</item>
        <item name="android:layout_height">wrap_content</item>
        <item name="android:layout_marginLeft">16dp</item>
        <item name="android:layout_marginRight">16dp</item>
        <item name="android:textColor">@color/white</item>
    </style>

</resources>
```

##### 3\. Prepare main Layout

The third step is to modify our layout. This layout will be inflated as the user interface for our main activity.

```xml
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_background="@color/background">

    <ImageView
        android_id="@+id/game_cover_image"
        android_src="@drawable/mgs"
        style="@style/GameCoverStyle" />

    <com.truizlop.fabreveallayout.FABRevealLayout
        android_id="@+id/fab_reveal_layout"
        android_layout_width="match_parent"
        android_layout_height="@dimen/fab_reveal_height"
        >

        <android.support.design.widget.FloatingActionButton
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            app_backgroundTint="@color/fab"
            android_src="@drawable/ic_add_shopping_cart"
            />

        <RelativeLayout
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            >

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_orientation="vertical"
                android_layout_centerInParent="true">

                <TextView
                    android_id="@+id/game_title_text"
                    android_text="@string/game_title"
                    style="@style/GameTitleStyle" />

                <TextView
                    android_id="@+id/creator_name_text"
                    android_text="@string/creator_name"
                    style="@style/GameCreatorStyle" />
            </LinearLayout>

        </RelativeLayout>

        <RelativeLayout
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            >

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="@string/add_to_shopping_cart"
                android_textColor="@color/white"
                android_textSize="16sp"
                android_layout_centerInParent="true"
                />
        </RelativeLayout>

    </com.truizlop.fabreveallayout.FABRevealLayout>
</LinearLayout>
```

##### 4\. Our main activity

Here's our main and only activity. We have three methods: `onCreate()`, `configureFABReveal()` and `prepareBackTransition()`. Inside the `onCreate()` we reference our FABRevealLayout using it's id, then invoke the `configureFABReveal()` method.

In the `configureFABReveal()` method we listen to reveal changes using `RevealChangeListener`, when the seconday view appears we invoke the `prepareBackTransition()` method.

The `prepareBackTransition()` uses a Handler to set the number of milliseconds after which the main viewis revealed.

```java
package info.camposha.mfabreveallayout;

import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.truizlop.fabreveallayout.FABRevealLayout;
import com.truizlop.fabreveallayout.OnRevealChangeListener;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        FABRevealLayout fabRevealLayout = findViewById(R.id.fab_reveal_layout);
        configureFABReveal(fabRevealLayout);
    }

    private void configureFABReveal(FABRevealLayout fabRevealLayout) {
        fabRevealLayout.setOnRevealChangeListener(new OnRevealChangeListener() {
            @Override
            public void onMainViewAppeared(FABRevealLayout fabRevealLayout, View mainView) {}

            @Override
            public void onSecondaryViewAppeared(final FABRevealLayout fabRevealLayout, View secondaryView) {
                prepareBackTransition(fabRevealLayout);
            }
        });
    }

    private void prepareBackTransition(final FABRevealLayout fabRevealLayout) {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                fabRevealLayout.revealMainView();
            }
        }, 2000);
    }

}
//end
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/FABRevealLayout-Sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/FABRevealLayout-Sample) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=8gK2mZmoCfE) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |
