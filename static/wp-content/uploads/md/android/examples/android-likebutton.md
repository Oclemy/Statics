# Android LikeButton Examples

If you need to implement a like or love or a favorite button then this tutorial is for you. We will explore some open source solutions that can allow you achieve that. We do this in a step by step manner using code samples.


## (a). LikeButton

> LikeButton is a library that allows you to create a button with animation effects similar to Twitter's heart when you like something.

Here is the demonstration:

![Android LikeButton](https://camo.githubusercontent.com/a8bba8de12530e6701a2a9c22bd9ad7cd559631b1b05d7e1cab6cf592bce2c39/687474703a2f2f692e67697068792e636f6d2f336f386470347571334b34767652314d4a4f2e676966)

### Step 1: Installation

**Repository**

Start by registering the Repository:

Add this in your root build.gradle file (not your module build.gradle file):

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

**Dependency**

Then add the following `implementation` statetment in your module's `build.gradle` file:

```groovy
    implementation 'com.github.jd-alexander:LikeButton:0.2.3'
```

By default you will get the heart button with the above code.

### Step 2: Add to Layout

The next step is to add the LikeButton in your xml layout:

```xml
<com.like.LikeButton
            app:icon_type="heart"
            app:icon_size="25dp"
            android:id="@+id/star_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
```

Explore the attributes you can use with this library below:

```xml
<com.like.LikeButton
app:icon_type="Star"
app:circle_start_color="@color/colorPrimary"
app:like_drawable="@drawable/thumb_on"
app:unlike_drawable="@drawable/thumb_off"
app:dots_primary_color="@color/colorAccent"
app:dots_secondary_color="@color/colorPrimary"
app:circle_end_color="@color/colorAccent"
app:icon_size="25dp"
app:liked="true"
app:anim_scale_factor="2"
app:is_enabled="false"
/>
```

Here is how you can for example set an icon resource type declaratively:

```xml
app:icon_type="heart"
```

### Step 3: Listen to Events

Now you can programmatically attach an event handler to the button in your code, and listen to like/unlike events:

```java
likeButton.setOnLikeListener(new OnLikeListener() {
            @Override
            public void liked(LikeButton likeButton) {

            }

            @Override
            public void unLiked(LikeButton likeButton) {

            }
        });
```

You can also programmatically set an icon type as below:

```java
likeButton.setIcon(IconType.Star);
```

And to set the icon size:

```java
likeButton.setIconSizePx(40);
likeButton.setIconSizeDp(20);
```

### Reference

Below is the download link for the example project.

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/jd-alexander/LikeButton/) |
| 2. | [Download](https://downgit.github.io/#/home?url=https://github.com/jd-alexander/LikeButton/tree/master/app) |
| 3. | [Follow code author](https://github.com/jd-alexander/) |

## (b). MaterialFavoriteButton

> An Animated favorite/star/like button for android.

Here is the demonstration of this library:

![MaterialFavoriteButton](https://cloud.githubusercontent.com/assets/6000572/10363036/ad97cfae-6dba-11e5-980a-1f5d82afd773.gif)

Let's see how to use this package.

### Step 1: Install it

Start by installing it. Add the following implementation statement in your module-level `build.gradle`:

```groovy
implementation 'com.github.ivbaranov:materialfavoritebutton:0.1.5'
```

Then sync to download it.

### Step 2: Add to Layout

Next you need to add MaterialFavoriteButton to your xml layout:

```xml
<com.github.ivbaranov.mfb.MaterialFavoriteButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

Here are the xml attributes that can be used:

```xml
app:mfb_state="false"                            // default button state
app:mfb_animate_favorite="true"                  // to animate favoriting
app:mfb_animate_unfavorite="false"               // to animate unfavoriting
app:mfb_padding="12"                             // image padding
app:mfb_favorite_image="@drawable/ic_fav"        // custom favorite resource
app:mfb_not_favorite_image="@drawable/ic_not_fav"// custom not favorite resource
app:mfb_rotation_duration="400"                  // rotation duration
app:mfb_rotation_angle="360"                     // rotation angle
app:mfb_bounce_duration="300"                    // bounce duration
app:mfb_color="black"                            // black or white default resources (enum)
app:mfb_type="star"                              // star or heart shapes (enum)
app:mfb_size="48"                                // button size
```

### Step 3: Write Code

You can then write your code either in kotlin or java. For example you can programmatically create the MaterialFavoriteButton without adding it to layout. You do that as follows:

```java
MaterialFavoriteButton favorite = new MaterialFavoriteButton.Builder(this)
        .create();
```

To get favorite/unfavorite or like/unlike status, you attach an event handler as follows:

```java
favorite.setOnFavoriteChangeListener(
        new MaterialFavoriteButton.OnFavoriteChangeListener() {
          @Override
          public void onFavoriteChanged(MaterialFavoriteButton buttonView, boolean favorite) {
            //
          }
        });
```

**Usage in RecyclerView**

To avoid triggering animation while re-rendering item view make sure you set favorite button state in onBindViewHolder without animation:

```java
favoriteButton.setFavorite(isFavorite(data.get(position)));
```

### Full Example

Let's now look at a full example written in Java. You start by installing the library as we had discussed earlier.

Then create an xml layout:

**content_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scrollbars="none"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:showIn="@layout/activity_main"
    tools:context=".MainActivity">

  <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:orientation="vertical">

    <android.support.v7.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/card_margin">

      <LinearLayout
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:orientation="vertical">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="@dimen/text_padding"
            android:text="Basic"
            android:textAppearance="@style/TextAppearance.AppCompat.Title" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="@dimen/text_padding"
            android:text="@string/ipsum_1" />

        <com.github.ivbaranov.mfb.MaterialFavoriteButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

      </LinearLayout>

    </android.support.v7.widget.CardView>

    <android.support.v7.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/card_margin">

      <LinearLayout
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:orientation="vertical">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="@dimen/text_padding"
            android:text="Nice"
            android:textAppearance="@style/TextAppearance.AppCompat.Title" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="@dimen/text_padding"
            android:text="@string/ipsum_en_1914_1" />

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

          <TextView
              android:id="@+id/counter_text"
              android:layout_width="wrap_content"
              android:layout_height="match_parent"
              android:layout_centerVertical="true"
              android:layout_marginLeft="@dimen/starred_margin"
              android:text="@string/starred" />

          <TextView
              android:id="@+id/counter_value"
              android:layout_width="wrap_content"
              android:layout_height="match_parent"
              android:layout_centerVertical="true"
              android:layout_toRightOf="@+id/counter_text"
              android:layout_marginLeft="@dimen/counter_value_margin" />

          <com.github.ivbaranov.mfb.MaterialFavoriteButton
              android:id="@+id/favorite_nice"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:layout_alignParentRight="true"
              app:mfb_rotation_duration="400"
              app:mfb_rotation_angle="216"
              app:mfb_bounce_duration="700" />

        </RelativeLayout>

      </LinearLayout>

    </android.support.v7.widget.CardView>

    <android.support.v7.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/card_margin">

      <LinearLayout
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:orientation="vertical">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

          <TextView
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:padding="@dimen/text_padding"
              android:text="Custom"
              android:textAppearance="@style/TextAppearance.AppCompat.Title" />

          <com.github.ivbaranov.mfb.MaterialFavoriteButton
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:layout_alignParentRight="true"
              app:mfb_rotation_duration="700"
              app:mfb_rotation_angle="360"
              app:mfb_favorite_image="@drawable/ic_event_available_black_24dp"
              app:mfb_not_favorite_image="@drawable/ic_event_busy_black_24dp"
              app:mfb_animate_unfavorite="true"
              app:mfb_bounce_duration="0" />

        </RelativeLayout>

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="@dimen/text_padding"
            android:text="@string/ipsum_2" />

      </LinearLayout>

    </android.support.v7.widget.CardView>

  </LinearLayout>

</ScrollView>
```

You then replace your `MainActivity` code with the following:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {
  private TextView niceCounter;
  private int niceCounterValue = 37;

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    //in the toolbar
    MaterialFavoriteButton toolbarFavorite = new MaterialFavoriteButton.Builder(this) //
        .favorite(true)
        .color(MaterialFavoriteButton.STYLE_WHITE)
        .type(MaterialFavoriteButton.STYLE_HEART)
        .rotationDuration(400)
        .create();
    toolbar.addView(toolbarFavorite);
    toolbarFavorite.setOnFavoriteChangeListener(
        new MaterialFavoriteButton.OnFavoriteChangeListener() {
          @Override
          public void onFavoriteChanged(MaterialFavoriteButton buttonView, boolean favorite) {
            Snackbar.make(buttonView, getString(R.string.toolbar_favorite_snack) + favorite,
                Snackbar.LENGTH_SHORT).show();
          }
        });

    //nice cardview
    niceCounter = (TextView) findViewById(R.id.counter_value);
    niceCounter.setText(String.valueOf(niceCounterValue));
    MaterialFavoriteButton materialFavoriteButtonNice =
        (MaterialFavoriteButton) findViewById(R.id.favorite_nice);
    materialFavoriteButtonNice.setFavorite(true, false);
    materialFavoriteButtonNice.setOnFavoriteChangeListener(
        new MaterialFavoriteButton.OnFavoriteChangeListener() {
          @Override
          public void onFavoriteChanged(MaterialFavoriteButton buttonView, boolean favorite) {
            if (favorite) {
              niceCounterValue++;
            } else {
              niceCounterValue--;
            }
          }
        });
    materialFavoriteButtonNice.setOnFavoriteAnimationEndListener(
        new MaterialFavoriteButton.OnFavoriteAnimationEndListener() {
          @Override
          public void onAnimationEnd(MaterialFavoriteButton buttonView, boolean favorite) {
            niceCounter.setText(String.valueOf(niceCounterValue));
          }
        });
  }

  @Override public boolean onCreateOptionsMenu(Menu menu) {
    // Inflate the menu; this adds items to the action bar if it is present.
    getMenuInflater().inflate(R.menu.menu_main, menu);
    return true;
  }

  @Override public boolean onOptionsItemSelected(MenuItem item) {
    // Handle action bar item clicks here. The action bar will
    // automatically handle clicks on the Home/Up button, so long
    // as you specify a parent activity in AndroidManifest.xml.
    int id = item.getItemId();

    //noinspection SimplifiableIfStatement
    if (id == R.id.action_settings) {
      return true;
    }

    return super.onOptionsItemSelected(item);
  }
}
```

### Reference

Find the download link below:

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/IvBaranov/MaterialFavoriteButton) |
| 2. | [Download](https://downgit.github.io/#/home?url=https://github.com/IvBaranov/MaterialFavoriteButton/tree/master/example) |
| 3. | [Follow code author](https://github.com/IvBaranov) |

## (c). SparkButton

> Android library to create buttons with Twitter's heart like animation.

This library supports API 14+.

Here is a demo of it in use:

![SparkButton Example Android](https://github.com/varunest/SparkButton/raw/master/art/showcase.gif)

To use it:

### Step 1: Install it

You need to install it first. Because it is hosted in jitpack, register jitpack as follows in your root-level `build.gradle` file:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then add your implementation statement:

```groovy
    implementation 'com.github.varunest:sparkbutton:1.0.6'
```

Sync to download it.

### Step 2: Add to Layout

Now you need to add `SparkButton` to your xml layout:

```xml
        <com.varunest.sparkbutton.SparkButton
            android:id="@+id/spark_button"
            android:layout_width="40dp"
            android:layout_height="40dp"
            app:sparkbutton_activeImage="@drawable/active_image"
            app:sparkbutton_inActiveImage="@drawable/inactive_image"
            app:sparkbutton_iconSize="40dp"
            app:sparkbutton_primaryColor="@color/primary_color"
            app:sparkbutton_secondaryColor="@color/secondary_color" />
```

Here are the applicable attributes:

```xml
<attr name="sparkbutton_iconSize" format="dimension|reference" />
<attr name="sparkbutton_activeImage" format="reference" />
<attr name="sparkbutton_disabledImage" format="reference" />
<attr name="sparkbutton_primaryColor" format="reference" />
<attr name="sparkbutton_secondaryColor" format="reference" />
<attr name="sparkbutton_pressOnTouch" format="boolean" />
<attr name="sparkbutton_animationSpeed" format="float" />
```

### Step 3: Write code

You can also create the button programmatically and set the attributes via java:

```java
            SparkButton button  = new SparkButtonBuilder(context)
                .setActiveImage(R.drawable.active_image)
                .setInActiveImage(R.drawable.inactive_image)
                .setDisabledImage(R.drawable.disabled_image)
                .setImageSizePx(getResources().getDimensionPixelOffset(R.dimen.button_size))
                .setPrimaryColor(ContextCompat.getColor(context, R.color.primary_color))
                .setSecondaryColor(ContextCompat.getColor(context, R.color.secondary_color))
                .build();
```

### Reference

Find the download link below:

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/varunest/SparkButton) |
| 2. | [Download](https://downgit.github.io/#/home?url=https://github.com/varunest/SparkButton/tree/master/app) |
| 3. | [Follow code author](https://github.com/varunest/) |

Have a good day.
