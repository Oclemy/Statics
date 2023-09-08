# Android ChipView Tutorial and Example

_ChipView allows you to create your own chip views or tagviews for the listview all within one adapter._

In this tutorial we see how to use a ChipView to show searchable tags in android.


#### How do I Install ChipView?

ChipView is a third party library and is hosted in `jitpack.io`. Hence first we need to register the `jitpack.io` repository under the project level build.gradle's allProjects DSL.

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then we can come and specify the dependency as an implementation statement. This way gradle will download and add it to our project the moment we click the `sync` button in android studio.

```groovy
dependencies {
            implementation 'com.github.jakebonk:ChipView:1.0.1'
    }
```

It is always appropriate to check for the latest version of the library [here](https://github.com/jakebonk/ChipView).

#### Video Tutorial.

We have a fast growing YouTube channel where we post our video tutorials. We want you to subscribe there if you are interested in a tutorial like this. It's obviously free.

Here's this tutorial in video format.

#### How do I use ChipView?

it's very easy to use ChipView.

First you need to add the ChipView element in layout.

```xml
  <com.allyants.chipview.ChipView
        android_id="@+id/cvTag"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>
```

Then in your java code you start by referencing our ChipView:

```java
    ChipView mChipView = (ChipView)findViewById(R.id.cvTag);
```

Then let's generate some data in an arraylist;

```java
        ArrayList tags = new ArrayList();
        tags.add("Database");
        tags.add("Data Binding");
        tags.add("Widgets");
        tags.add("RecyclerView");
        tags.add("Activity");
        tags.add("Services");
        tags.add("Networking");
```

Then instantiate our SimpleChipAdapter and set it to our ChipView

```java
        SimpleChipAdapter adapter = new SimpleChipAdapter(tags);
        mChipView.setAdapter(adapter);
```

#### Full ChipView Example for Java Android

Let's look at a simple example right here.

Here's the result:

#### Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.+'
    implementation ('com.github.jakebonk:ChipView:1.0.1'){
        exclude module: 'support-v4'
    }

}
```

Note that we are excluding the the `support-v4` as it's already defined in our ChipView library, otherwise we may get `Program type already present: android.support.v4.app.BackStackRecord$Op` error.

##### (b). build.gradle(project)

This is our **project level** **build.gradle** file. It's sometimes called root level `build.gradle` file since it's located at the project's root folder.

Most of the time we modify this file if we want to register another repository where probably one of our dependencies will be downloaded.

We normally register under the allProject's DSL.

```groovy
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}
```

#### Resources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

We create our user interfaces in XML instead of java.

##### Why do most people use XML to create User interfaces instead of Java?

Here are some of the reasons.

| No. | Advantage |
| --- | --- |
| 1. | Declarative creation of widgets and views allows us to use a declarative language XML which makes is easier. |
| 2. | It's easily maintanable as the user interface is decoupled from your Java logic. |
| 3. | It's easier to share or download code and safely test them before runtime. |
| 4. | You can use XML generation tools to generate XML as an alternative to Android Studio. |

Let's start by looking at the layout resources.

##### (a). activity_main.xml

This layout will get inflated into the main [Activity](https://camposha.info/android/activity)'s user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of Activity.

Our layout has a [LinearLayout](https://camposha.info/android/linearlayout) as the root element.

We add the ChipView inside it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context=".MainActivity">

    <com.allyants.chipview.ChipView
        android_id="@+id/mChipView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>

</LinearLayout>
```

#### Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). MainActivity.java

This is our launcher [Activity](https://camposha.info/android/activity) as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this [Activity](https://camposha.info/android/activity) will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main [Activity](https://camposha.info/android/activity) is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

We will start by storing our tags/chips in an arraylist. We are going to reference the ChipView from our layout resource.

We will pass that arraylist of our tags into SimpleChipAdapter constructor and set the instance of the SimpleChipAdapter into our ChipView.

```java
package com.devosha.mrchipview;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import com.allyants.chipview.ChipView;
import com.allyants.chipview.SimpleChipAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ChipView mChipView;

    private void populateTags(){
        ArrayList tags = new ArrayList();
        tags.add("Database");
        tags.add("Data Binding");
        tags.add("Widgets");
        tags.add("RecyclerView");
        tags.add("Activity");
        tags.add("Services");
        tags.add("Networking");
        SimpleChipAdapter adapter = new SimpleChipAdapter(tags);
        mChipView.setAdapter(adapter);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mChipView = findViewById(R.id.mChipView);
        this.populateTags();
    }

}

//end
```

#### Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MrChipView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MrChipView) |

Best Regards,
