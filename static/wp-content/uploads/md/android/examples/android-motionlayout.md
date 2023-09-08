# Kotlin Android MotionLayout Example


In this tutorial you will learn about motionlayout and look at examples of how to use it to manage animations in your app.


### What is MotionLayout?

But first what is it?

> MotionLayout is a layout type that helps you manage motion and widget animation in your app.

This class subclasses and builds upon the flexible `ConstraintLayout`. It is thus available starting from API level 14. It bridges the gap between layout transitions and complex motion handling, offering a mix of features between the property animation framework, TransitionManager, and CoordinatorLayout.

You can read more about motionlayout [here](https://developer.android.com/training/constraint-layout/motionlayout).

## Example 1: MotionLayout - Parallax Scrolling using MotionLayout

> This is a simple example that introduces you to motionlayout by implementing Parallax scrolling effect on content.

This is important especially on detail pages to provide a modern experience to users. Here's a demonstration of what is being built:

![Android MotionLayout Example](https://github.com/s12u/android-motionlayout-example/raw/master/demo.gif)

### Step 1: Dependencies

No third party dependency is needed for this project.

### Step 2: Define Motions

You need to define motions as xml resource files. First create folder known as `xml` under your `res` directory and add the following two scenes:

**scene_header.xml**

In this file define a root `MotionScene` element:

```xml
<MotionScene
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:motion="http://schemas.android.com/apk/res-auto">

        ....
```

Define a transition, passing in the start, the end as well as duration:

```xml
    <Transition
            motion:constraintSetStart="@+id/start"
            motion:constraintSetEnd="@+id/end"
            motion:duration="1000"
            motion:motionInterpolator="linear">

        <OnSwipe
                motion:touchAnchorId="@+id/image"
                motion:touchAnchorSide="bottom"
                motion:dragDirection="dragUp"/>
```

Here's the full code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
            motion:constraintSetStart="@+id/start"
            motion:constraintSetEnd="@+id/end"
            motion:duration="1000"
            motion:motionInterpolator="linear">
        <OnSwipe
                motion:touchAnchorId="@+id/image"
                motion:touchAnchorSide="bottom"
                motion:dragDirection="dragUp"/>

        <ConstraintSet android:id="@+id/start">
            <Constraint
                    android:id="@id/image"
                    android:layout_width="match_parent"
                    android:layout_height="220dp"
                    android:alpha="1.0"
                    motion:layout_constraintTop_toTopOf="parent"/>
            <Constraint
                    android:id="@id/label"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    motion:layout_constraintBottom_toBottomOf="@+id/guideline"
                    motion:layout_constraintStart_toStartOf="parent"/>
            <Constraint
                    android:id="@id/guideline"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:orientation="horizontal"
                    motion:layout_constraintGuide_begin="210dp"/>
        </ConstraintSet>

        <ConstraintSet android:id="@+id/end">
            <Constraint
                    android:id="@id/image"
                    android:layout_width="match_parent"
                    android:layout_height="220dp"
                    android:alpha="0"
                    android:translationX="0dp"
                    android:translationY="0dp"
                    motion:layout_constraintTop_toTopOf="parent"/>
            <Constraint
                    android:id="@id/label"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:scaleX="0.6"
                    android:scaleY="0.6"
                    motion:layout_constraintBottom_toBottomOf="@+id/guideline"
                    motion:layout_constraintStart_toStartOf="parent"/>
            <Constraint
                    android:id="@id/guideline"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:orientation="horizontal"
                    motion:layout_constraintGuide_begin="56dp"/>
        </ConstraintSet>

    </Transition>

</MotionScene>
```

**scene_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
            motion:constraintSetStart="@+id/start"
            motion:constraintSetEnd="@+id/end"
            motion:duration="300"
            motion:motionInterpolator="linear">

        <OnSwipe
                motion:touchAnchorId="@+id/header"
                motion:touchAnchorSide="bottom"
                motion:dragDirection="dragUp" />

        <ConstraintSet android:id="@+id/start">
            <Constraint
                    android:id="@id/header"
                    android:layout_width="match_parent"
                    android:layout_height="220dp"
                    motion:layout_constraintTop_toTopOf="parent" />

            <Constraint
                    android:id="@id/contents"
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    motion:layout_constraintTop_toBottomOf="@+id/header"
                    motion:layout_constraintBottom_toBottomOf="parent" />
        </ConstraintSet>

        <ConstraintSet android:id="@+id/end">
            <Constraint
                    android:id="@+id/header"
                    android:layout_width="match_parent"
                    android:layout_height="56dp"
                    motion:layout_constraintTop_toTopOf="parent"
                    motion:progress="1"/>

            <Constraint
                    android:id="@id/contents"
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    motion:layout_constraintTop_toBottomOf="@+id/header"
                    motion:layout_constraintBottom_toBottomOf="parent" />
        </ConstraintSet>
    </Transition>

</MotionScene>
```

### Step 3: Create Layouts

The next step is to create your xml layouts. There are three such layouts:

**(a). header_scroll.xml**

The root element in this layout will be the `MotionLayout`:

```xml
<androidx.constraintlayout.motion.widget.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/header"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#000000"
        app:layoutDescription="@xml/scene_header">

    <ImageView
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="220dp"
            android:scaleType="centerCrop"
            android:src="@drawable/flower"/>

    <TextView
            android:id="@+id/label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Lorem Ipsum"
            android:textSize="30dp"
            android:padding="10dp"
            android:textColor="#FFFFFF"/>

    <androidx.constraintlayout.widget.Guideline
            android:id="@+id/guideline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            app:layout_constraintGuide_begin="210dp"/>

</androidx.constraintlayout.motion.widget.MotionLayout>
```

**(b). contents_scroll.xml**

In the content, place a textview inside a NestedScrollView, this will be the widget to show the details content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/contents"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/large_text"
            android:padding="10dp"/>

</androidx.core.widget.NestedScrollView>
```

**(c). activity_main.xml**

This is a simple layou. Simply include the `header_scroll` and `content_scroll` inside a `MotionLayout` in this layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.motion.widget.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/scene_main"
        tools:context=".MainActivity">

    <include layout="@layout/header_scroll"/>
    <include layout="@layout/contents_scroll"/>

</androidx.constraintlayout.motion.widget.MotionLayout>
```

### Step : Write Code

The next step is to write your `MainActivity` code, in this case in Kotlin Programming language. This will be your launcher activity.

Here's the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

### Step : Run Code

Afetr following the abobe steps run the code in android studio. Scroll above to the description of this project to see the result.

### Reference

You can find the download links to the project below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/s12u/android-motionlayout-example/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/s12u/) |

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=motionlayout orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]

Have a good day.
