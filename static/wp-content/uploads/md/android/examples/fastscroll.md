# Kotlin Android - Best FastScroll with ScrollBar Solutions


Tobe able to quickly scroll through a large text blob or even a list of items, a scrollbar can really be convenient. In this tutorial we want to explore the best third party solutions you can use if that's your object, to provide your users with a quick and convenient way of scrolling content.


## (a). Standalone ScrollBar

> A Standalone scrollbar for Android.

### Step 1: Install it

Install using the following statement:

```groovy
implementation 'com.dev.hieupt:android-standalone-scroll-bar:1.1.2'
```

### Step 2: Add to Layout

Next add it to the xml layout alongside the content or list:

```xml
<androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

<com.hieupt.android.standalonescrollbar.StandaloneScrollBar
        android:id="@+id/scrollbar"
        android:layout_width="wrap_content"
        android:layout_height="match_parent" />
```

Or you can attach it programmatically as follows:

```java
scrollbar.attachTo(recyclerView)
```

And to use with a NestedScrollview for example:

```java
scrollbar.attachTo(nestedScrollView2)
```

### Example

Find full examples by downloading this project.

### Reference

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/hieupham1993/android-standalone-scroll-bar/tree/master/sample) code |
| 2. | [Read](https://github.com/hieupham1993/android-standalone-scroll-bar) more |

## (b). Use FastScroll

> This is a FastScroll UI for ScrollView and EditText.

Here is a demo:

![FastScroll](https://raw.githubusercontent.com/NenkaLab/FastScroll/master/20191216_151107.jpg)

### Step 1: Install it

Install it by downloading the following AAR file and adding it to your android project. Download it from [here](https://github.com/NenkaLab/FastScroll/raw/master/FastScroll.aar).

### Step 2: Add to Layout

The next step is to add FastScroll to your xml layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="horizontal"
        tools:context=".activity.Main">

    <androidx.core.widget.NestedScrollView
            android:id="@+id/scroll"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:clipChildren="false"
            android:fillViewport="true"
            android:clipToPadding="true">
        <LinearLayout
                android:id="@+id/content"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:orientation="vertical"/>
    </androidx.core.widget.NestedScrollView>

    <io.nenkalab.fastscroll.FastScroll
            android:id="@+id/handle"
            android:layout_width="30dp"
            android:layout_height="match_parent"
            android:layout_gravity="end|center"
            app:scroll="@+id/scroll"/>
</FrameLayout>
```

Here are the applicable attributes:

```xml
<io.nenkalab.fastscroll.FastScroll
    app:scroll="reference"
    app:scrollThumb="reference"
    app:scrollThumbTint="color"
    app:scrollThumbTintMode="enum[PorterDuff.Mode]"
    app:scrollThumbColor="color"
    app:autoHide="boolean"
    app:scrollThumbRotation="enum[start, end]" />
```

### Reference

Below are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/NenkaLab/FastScroll) code |
