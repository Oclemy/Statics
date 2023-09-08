# TreeView Examples


In this piece we want to look at TreeView examples in android. TreeView isn't built into the android sdk but developers have created a few libraries that allow us implement a treeview with most of the features that you would expect in such a widget.


## Example 1: Android DraggableTreeView – Drag and Nest TreeNodes

This is an android draggabletreeview tutorial. This is a custom adapter view that can render items in a tree manner. The nodes in the tree can then be dragged and nested infinitely.

It's quite easy to use, once we've added dragtreeview component in our xml layout, we then reference it inside our mainactivity. We then instantiate as many treenodes as we like.

We can nest the items by adding them as children to specific treenodes. Of course we can do this programmatically in code or at runtime.

Views are nestable even at runtime. This is an adapterview, so we have SimpleTreeViewAdapter class. We instantiate it passing in the context as well as our root treenode. We this set adapter to our draggabletreeview.

It's that simple. We use a DraggableTreeView library by Jake Bonk. The library is hosted in jitpack.io. You can find more details about the library [here](https://github.com/jakebonk/DraggableTreeView).

### Screenshot

- Here's the screenshot of the project.

Android DraggableTreeView Example

![Android DraggableTreeView ](https://image.prntscr.com/image/qVfXIP2_RlGvQ09Mucd_vg.png)

## Common Questions this example explores

- Android DraggableTreeView Example.
- Android TreeView example tutorial java.
- How to drag and drop item views in a treeview in android.
- Android nesting views with draggabletreeview.
- Android Drag tree tutorial and example.
- Android SimpleTreeview adapter

## Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : DraggableTreeView, TreeView Adapter, Drag Drop treenodes

## Libaries Used

- We use [Android DraggableTreeView library](https://github.com/jakebonk/DraggableTreeView) by Jake Bonk.

## Let's go.

## **1\. Build.Gradle(Project)**

Lets jump directly to the source code. Build.Gradle(Project)

- Project-level build.gradle.
- We specify the repository where our draggabletreeview library will be fetched from, in this jitpack.io.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven{url 'https://jitpack.io'}
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## **2\. Build.Gradle(App)**

- App-level build.gradle.
- We add dependencies here. Add the dependency for draggabletreeview as shown below.
- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 25
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.dragtree"
        minSdkVersion 15
        targetSdkVersion 25
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    compile 'com.android.support:appcompat-v7:25.3.1'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:design:25.3.1'
    compile 'com.github.jakebonk:DraggableTreeView:1.0.1'
    testCompile 'junit:junit:4.12'
}
```

## **3\. MainActivity.java**

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We use DraggableTreeView as our adapterview and SimpleTreeViewAdapter as our adapter.
- We instantiate and add nodes here.

```java
package com.tutorials.hp.dragtree;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import com.allyants.draggabletreeview.DraggableTreeView;
import com.allyants.draggabletreeview.SimpleTreeViewAdapter;
import com.allyants.draggabletreeview.TreeNode;

public class MainActivity extends AppCompatActivity {

    //DECALARTIONS
    DraggableTreeView draggableTreeView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        this.initializeViews();
        this.bindTreeData();

    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews() {
        draggableTreeView = (DraggableTreeView) findViewById(R.id.mDraggableTreeView);
    }

    /*
    BIND TREE DATA
     */
    private void bindTreeData()
    {
        TreeNode root=new TreeNode(this);
        TreeNode milkyway=new TreeNode("Milky Way");
        TreeNode andromeda=new TreeNode("Andromeda");

        TreeNode sun=new TreeNode("Sun");
        sun.addChild(new TreeNode("Earth"));
        sun.addChild(new TreeNode("Jupiter"));
        sun.addChild(new TreeNode("Saturn"));
        sun.addChild(new TreeNode("Africa"));
        sun.addChild(new TreeNode("Uropa"));
    sun.addChild(new TreeNode("Universe"));

        milkyway.addChild(sun);
        milkyway.addChild(new TreeNode("Alpha Centauri"));
        milkyway.addChild(new TreeNode("Proxima Centauri"));
    milkyway.addChild(new TreeNode("Mars"));

        root.addChild(new TreeNode("Whirlpool"));
        root.addChild(new TreeNode("Neptune"));
        root.addChild(new TreeNode("Galaxy"));
        root.addChild(new TreeNode("Canis Majos"));
    root.addChild(new TreeNode("North America"));
        root.addChild(new TreeNode("Asia"));
    root.addChild(new TreeNode("New York"));
    root.addChild(new TreeNode("Nairobi"));

        root.addChild(andromeda);
        root.addChild(milkyway);

        SimpleTreeViewAdapter adapter=new SimpleTreeViewAdapter(this,root);
        draggableTreeView.setAdapter(adapter);
    }
}
```

## **4\. ActivityMain.xml**

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.dragtree.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## **5\. ContentMain.xml**

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- In this case its a simple draggabletreeview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.dragtree.MainActivity"
    tools_showIn="@layout/activity_main">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!"
        app_layout_constraintBottom_toBottomOf="parent"
        app_layout_constraintLeft_toLeftOf="parent"
        app_layout_constraintRight_toRightOf="parent"
        app_layout_constraintTop_toTopOf="parent" />

    <com.allyants.draggabletreeview.DraggableTreeView
        android_id="@+id/mDraggableTreeView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"></com.allyants.draggabletreeview.DraggableTreeView>

</android.support.constraint.ConstraintLayout>
```

## **How To Run**

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

## **Conclusion.**

This was a simple android draggabletreeview example. How to bind data using simpletreeadapter, add treenodes and nest them both programmatically and at runtime.

## **More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/DraggableTree) |
| GitHub Download Link | [Download](https://github.com/Oclemy/DraggableTree/archive/master.zip) |
| Video | [YouTube Video](https://www.youtube.com/watch?v=KGcEGj6IyzA) |
