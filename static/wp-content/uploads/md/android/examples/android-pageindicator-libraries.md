# Best Android PageIndicator Libraries - 2021

ViewPager2 or ViewPager is such a vital component in android development. One of the most unique features of mobile apps as opposed to desktop ones is navigation through hand gestures like swiping. At the heart of this in android is the `ViewPager` or `ViewPager2`.

However we do need indicators to show us the current page. If you were just swiping without any tabs or indicators you would not know the current page you are in. So page indicators are just simple shapes like dots that show us the current page. You generally can see such shapes for example in galleries in web apps. Users can even navigate via such dots.


This tutorial explores the best page indicators to use. We do not list them in an important order, instead we list them as we find them, with the first being the first to be discovered as opposed to the best one.

## (a). ViewpagerDots

> Simple, compact Kotlin library for ViewPager page indicators.

This library provides a very small, compact, Kotlin-based implementation for ViewPager dots. The dots can of course be switched out for whatever type of Drawable you wish. The animation can be customized as well.

Here is an example of these dots in action:

![ViewPager Dots](https://raw.githubusercontent.com/afollestad/viewpagerdots/master/assets/demo.gif)

Here is how you use this library:

### Step 1: Install it

In your `build.gradle` add the following implementation statement then sync:

```groovy
 implementation 'com.afollestad:viewpagerdots:1.0.0'
```

### Add to Layout

Add `ViewPager2` or `ViewPager` to your layout as follows:

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    >

  <com.afollestad.viewpagerdots.DotsIndicator
      android:id="@+id/dots"
      android:layout_width="match_parent"
      android:layout_height="48dp"
      />

  <androidx.viewpager.widget.ViewPager
      android:id="@+id/pager"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      />

</LinearLayout>
```

Here are some of the customizations you can make declaratively in your layout:

- `app:dot_width` (the width of each individual dot)
- `app:dot_height` (the height of each individual dot)
- `app:dot_margin` (spacing between each dot)
- `app:dot_drawable` (the default icon for each dot)
- `app:dot_drawable_unselected` (defaults to `dot_drawable`)
- `app:dot_tint` (lets you apply a color tint to the above drawables)
- `app:dots_animator` (the animator when a dot becomes selected)
- `app:dots_animator_reverse` (defaults to reversed version of the above)
- `app:dots_orientation` (orientation of the whole strip; defaults to `horizontal`)
- `app:dots_gravity` (gravity of the whole strip; defaults to `center`)

You can also apply some basic changes dynamically in your code:

### Step 3: Attach ViewPager2 to Page Indicator

In your code, you can attach the `ViewPager` or `ViewPager2` to your `DotsIndicator` using the `attachViewPager()` function that is provided the `DotsIndicator`:

```kotlin
val viewPager: ViewPager = // ...
val dots: DotsIndicator = // ...

viewPager.adapter = // ... This must be set before attaching
dots.attachViewPager(viewPager)
```

We had seen how to customize the dots indicator declaratively, here's how you can customize them imperatively via code:

```kotlin
val dots: DotsIndicator = // ...

// This lets you switch out the indicator drawables at runtime.
dots.setDotDrawable(
  indicatorRes = R.drawable.some_drawable,
  unselectedIndicatorRes = R.drawable.other_drawable // optional, defaults to above
)

// These two let you dynamically tint your indicators at runtime.
dots.setDotTint(Color.BLACK)
dots.setDotTintRes(R.color.black)
```

### Reference

Here are reference links

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/afollestad/viewpagerdots/) |
| 2. | [Browse example](https://github.com/afollestad/viewpagerdots/tree/master/sample) |
| 3. | [Follow library author](https://github.com/afollestad/) |

## (b). PageIndicator

> An Instagram like page indicator compatible with RecyclerView and ViewPager.

Here's an example of it in usage with both recyclerview and viewpager:

![PageIndicator example](https://github.com/chahine/pageindicator/raw/master/art/pageindicator.gif)

So how do you use it?

### Step 1: Install it

You need to add jitpack to your root level `build.gradle` as follows:

```groovy
allprojects {
  repositories {
    maven { url 'https://jitpack.io' }
  }
}
```

Then add the implementation statement in your app level `build.gradle` as follows:

```groovy
dependencies {
  implementation 'com.github.chahine:pageindicator:0.2.8'
}
```

### Step 2: Add to Layout

Next you need to add it to your xml layout. Here's it's code:

```xml
  <com.chahinem.pageindicator.PageIndicator
      android:id="@+id/pageIndicator"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      />
```

### Step 3: Attach to RecyclerView or ViewPager

The third step is to attach it to your recyclerview or viewpager. To either, simply invoke the `attachTo()` function and pass either the `Recyclerview` or `Viewpager`.

For Recyclerview:

```kotlin
  pageIndicator.attachTo(recyclerView)
```

By default, attaching to a RecyclerView will end up updating the pageIndicator when the most visible item position changes and expect the RecyclerView items to have the same width. If you would like to customize this behavior, add a scroll listener to your RecyclerView and use `PageIndicator::swipeNext` and `PageIndicator::swipePrevious`; and set the pageIndicator's count

For ViewPager:

```kotlin
  pageIndicator.attachTo(viewPager)
```

If you would like to programmatically move to the next or previous item in the `ViewPager` or `RecyclerView`, use the following methods:

```kotlin
  pageIndicator.swipePrevious()
  pageIndicator.swipeNext()
```

### Reference

Here are the reference links

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/chahine/pageindicator) |
| 2. | [Browse Example](https://github.com/chahine/pageindicator/tree/master/app) |
| 3. | [Follow code author](https://github.com/chahine/) |
