# Android BadgedImageView Example

Let's say you are showing a list or grid of products in a recyclerview. You may want to show badges on those products. For example a badge may show an a current offer or whether the item is out of stock.

You can use a BadgedImageview for such a purpose. This tutorial aims to teach you how to create an imageview with badges.


## (a). Use BadgedImageview

> BadgedImageView is a library that allows you show a badge into a Imageview.

Here are the capabilities of this library:

- set badge color
- set badge padding
- set badge text
- set badge gravity
- set foreground
- show and hide the badge programmatically

Here is a demo of what will be created:

![Android badgedimageview example](https://github.com/yesidlazaro/BadgedImageview/raw/master/art/demo.png)

### Step 1: Install it

To install this library, start by registering the `jitpack` as a maven repository in your project `build.gradle` file, under the `allProjects` closure:

```groovy
 allProjects{
        // ...
        maven { url "https://jitpack.io" }
 }
```

Then in your `app/build.gradle` declare the library as a dependency:

```groovy
implementation 'com.github.yesidlazaro:BadgedImageview:1.0.2'
```

Then sync.

### Step 2: Add to Layout

To use the `BadgedImageView` add it to your xml layout as follows;

```xml
 <com.creativityapps.badgedimageviews.BadgedFourThreeImageView
            android:id="@+id/badge_dog"
            android:layout_width="300dp"
            android:layout_height="200dp"
            android:src="@drawable/dog"
            app:badgeGravity="end|bottom"
            app:badgePadding="@dimen/padding_normal"
            app:badgeText="@string/lab_gif" />
```

Check the example below.

### Full Example

1. Start by creating an android project.
2. Install the library.
3. Create Layouts

**activity_main.xml**

Here is the xml layout for the main activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:orientation="vertical"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        tools:context="com.creativityapps.badgeimageviewlibrary.MainActivity">

        <com.creativityapps.badgedimageviews.BadgedFourThreeImageView
            android:id="@+id/badge_dog"
            android:layout_width="300dp"
            android:layout_height="200dp"
            android:src="@drawable/dog"
            app:badgeGravity="end|bottom"
            app:badgePadding="@dimen/padding_normal" />

        <com.creativityapps.badgedimageviews.BadgedSquareImageView
            android:id="@+id/badge_person_video"
            android:layout_width="200dp"
            android:layout_height="200dp"
            android:layout_marginTop="@dimen/padding_normal"
            android:src="@drawable/me"
            app:badgeColor="@color/colorAccent"
            app:badgeGravity="top|right"
            app:badgePadding="@dimen/padding_normal"
            app:badgeText="@string/lab_video" />

        <com.creativityapps.badgedimageviews.BadgedSquareImageView
            android:id="@+id/badge_person_gif"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/padding_normal"
            android:foreground="?selectableItemBackground"
            android:src="@drawable/me"
            app:badgeGravity="top|left"
            app:badgePadding="@dimen/padding_normal"
            app:badgeText="@string/lab_gif" />

        <com.creativityapps.badgedimageviews.BadgedImageView
            android:id="@+id/badge_person_full_width"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:layout_marginTop="@dimen/padding_normal"
            android:foreground="?selectableItemBackground"
            android:scaleType="centerCrop"
            android:src="@drawable/me"
            app:badgeGravity="top|left"
            app:badgePadding="@dimen/padding_normal"
            app:badgeText="@string/lab_full_width" />
    </LinearLayout>

</ScrollView>
```

**MainActivity.java**

Replace your MainActivity code with the following:

```java

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private BadgedFourThreeImageView badgedImageViewDog;
    private BadgedSquareImageView badgedImageViewPersonVideo;
    private BadgedSquareImageView badgedImageViewPersonGif;
    private BadgedImageView badgedImageViewPersonFullWidth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        badgedImageViewDog = (BadgedFourThreeImageView) findViewById(R.id.badge_dog);
        badgedImageViewPersonVideo = (BadgedSquareImageView) findViewById(R.id.badge_person_video);
        badgedImageViewPersonGif = (BadgedSquareImageView) findViewById(R.id.badge_person_gif);
        badgedImageViewPersonFullWidth = (BadgedImageView) findViewById(R.id.badge_person_full_width);

        badgedImageViewDog.showBadge(true);
        badgedImageViewDog.setBadgeText(getString(R.string.lab_gif));

        badgedImageViewPersonVideo.showBadge(true);

        badgedImageViewPersonGif.showBadge(true);
        badgedImageViewPersonGif.setBadgeText("JPG");
        badgedImageViewPersonGif.setBadgeColor(getResources().getColor(R.color.gray_50));
        badgedImageViewPersonGif.setOnClickListener(this);

        badgedImageViewPersonFullWidth.showBadge(true);
    }

    @Override
    public void onClick(View v) {
        if (badgedImageViewPersonGif.isBadgeVisible()) {
            badgedImageViewPersonGif.showBadge(false);
        } else {
            badgedImageViewPersonGif.showBadge(true);
        }
    }

}
```

### Reference

Below are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/yesidlazaro/BadgedImageview/tree/master/app) Example |
| 2. | [Read](https://github.com/yesidlazaro/BadgedImageview/) more |
