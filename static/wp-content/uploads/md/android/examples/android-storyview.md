# StoryView Examples and Libraries


What if you want an easy way to show quick stories in your app? One way would to be create full blown fragments and maybe use a viewpager to swipe through them. While this provides unlimited customizations options, it's not ideal if you only want to display say title, subtitle and image. There are libraries that make this capability easier. We call these libraries, storyView libraries and we want to examine them in this tutorial alongside full examples.


## (a). StoryView

> StoryView is an Android Library for displaying stories like Facebook.

StoryView allows you create stories with the following:

1. Title
2. Subtitle
3. Image

It requires API 17+.

### Step 1: Install it

The first step is installation. The library is hosted in jitpack, so you add this in your project level build.gradle:

```groovy
maven { url 'https://jitpack.io' }
```

And this in your module level build.gradle:

```groovy
 implementation 'com.github.OMARIHAMZA:StoryView:1.0.2-alpha'
```

### Step 2: Create Stories

You have two options when creating a story:

1. Use same header for all images in the story.

```java
new StoryView.Builder(getSupportFragmentManager())
                .setStoriesList(myStories) // Required
                .setStoryDuration(5000) // Default is 2000 Millis (2 Seconds)
                .setTitleText("Hamza Al-Omari") // Default is Hidden
                .setSubtitleText("Damascus") // Default is Hidden
                .setTitleLogoUrl("some-link") // Default is Hidden
                .setStoryClickListeners(new StoryClickListeners() {
                    @Override
                    public void onDescriptionClickListener(int position) {
                //your action
                    }

                    @Override
                    public void onTitleIconClickListener(int position) {
                        //your action
            }
                }) // Optional Listeners
                .build() // Must be called before calling show method
                .show();
```

2. Or use different headers for each image.

First:

```java
ArrayList<StoryViewHeaderInfo> headerInfoArrayList = new ArrayList<>();

for (Story story : data) {
            headerInfoArrayList.add(new StoryViewHeaderInfo(
                    story.getUsername(),
                    story.getUserLocation(),
                    story.getUserImageUrl()
            ));
        }
```

Then :

```java
new StoryView.Builder(getSupportFragmentManager())
                .setStoriesList(myStories) // MyStory's ArrayList
                .setStoryDuration(5000) // Optional, default is 2000 Millis
                .setHeadingInfoList(headerInfoArrayList) // StoryViewHeaderInfo's ArrayList
                .setStoryClickListeners(new StoryClickListeners() {
                    @Override
                    public void onDescriptionClickListener(int position) {
                        // your action
                    }

                    @Override
                    public void onTitleIconClickListener(int position) {
                        // your action
            }
                }) // Optional Listeners
                .build() // Must be called before show method
                .show();
```

You create stories as follows:

```java
MyStory currentStory = new MyStory(
                    "dummy-link",
                    simpleDateFormat.parse("20-10-2019 10:00:00"),
                    null
            );
```

Or like this:

```java
 MyStory currentStory = new MyStory(
                    "dummy-link",
                    simpleDateFormat.parse("20-10-2019 10:00:00"),
            );
```

Now add the stories to an arraylist:

```java
ArrayList<Story> data = ....;
...
ArrayList<MyStory> myStories = new ArrayList<>();

for(Story story: data){
    myStories.add(new MyStory(
                    story.getImageUrl(),
                    story.getDate()
            ));
}
```

### Reference

Find source code reference [here](https://github.com/OMARIHAMZA/StoryView).

### Full Example - How to Create a StoryView in Kotlin

In this example we look at how to create a storyview using the library we've examine above. The example will be written in Kotlin.

#### Step 1: Install the library

Install the library as we'd looked above.

Then after installing it we'll also enable ViewBinding. This will allow us reference widgets defined in our layouts in our kotlin code.

#### Step 2: Create layout

There is nothing special about our `activity_main.xml` layout. We only a button that will trigger the displaying ofthe storyview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Stories"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Step 3: Write Kotlin Code

Start by creating the main activity:

```kotlin
class MainActivity : AppCompatActivity() {
```

Now declare the `ActivityMainBinding` class. It is a generated class. It is generated by the compiler based on the name we assigned the layout file.

```kotlin
    private var binding: ActivityMainBinding? = null
```

Now create a showstories function. This is the fuction responsible for creating and showing our stories:

```kotlin
    fun showStories() {
        val myStories = ArrayList<MyStory>()
        val simpleDateFormat = SimpleDateFormat("dd-MM-yyyy hh:mm:ss")
        try {
            val story1 = MyStory(
                "https://media.pri.org/s3fs-public/styles/story_main/public/images/2019/09/092419-germany-climate.jpg?itok=P3FbPOp-",
                simpleDateFormat.parse("20-10-2019 10:00:00")
            )
            myStories.add(story1)
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        try {
            val story2 = MyStory(
                "http://i.imgur.com/0BfsmUd.jpg",
                simpleDateFormat.parse("26-10-2019 15:00:00"),
                "#TEAM_STANNIS"
            )
            myStories.add(story2)
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        val story3 = MyStory(
            "https://mfiles.alphacoders.com/681/681242.jpg"
        )
        myStories.add(story3)
        StoryView.Builder(supportFragmentManager)
            .setStoriesList(myStories)
            .setStoryDuration(5000)
            .setTitleText("Hamza Al-Omari")
            .setSubtitleText("Damascus")
            .setStoryClickListeners(object : StoryClickListeners {
                override fun onDescriptionClickListener(position: Int) {
                    Toast.makeText(
                        this@MainActivity,
                        "Clicked: " + myStories[position].description,
                        Toast.LENGTH_SHORT
                    ).show()
                }

                override fun onTitleIconClickListener(position: Int) {}
            })
            .setOnStoryChangedCallback { position ->
                Toast.makeText(
                    this@MainActivity,
                    position.toString() + "",
                    Toast.LENGTH_SHORT
                ).show()
            }
            .setStartingIndex(0)
            .build()
            .show()
    }
```

Here's the full code:

**MainActivity.kt**

```kotlin
package info.camposha.mr_storyview

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import info.camposha.mr_storyview.databinding.ActivityMainBinding
import omari.hamza.storyview.StoryView
import omari.hamza.storyview.callback.StoryClickListeners
import omari.hamza.storyview.model.MyStory
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {
    private var binding: ActivityMainBinding? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding!!.root)
        binding!!.btn.setOnClickListener { showStories() }
    }

    fun showStories() {
        val myStories = ArrayList<MyStory>()
        val simpleDateFormat = SimpleDateFormat("dd-MM-yyyy hh:mm:ss")
        try {
            val story1 = MyStory(
                "https://media.pri.org/s3fs-public/styles/story_main/public/images/2019/09/092419-germany-climate.jpg?itok=P3FbPOp-",
                simpleDateFormat.parse("20-10-2019 10:00:00")
            )
            myStories.add(story1)
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        try {
            val story2 = MyStory(
                "http://i.imgur.com/0BfsmUd.jpg",
                simpleDateFormat.parse("26-10-2019 15:00:00"),
                "#TEAM_STANNIS"
            )
            myStories.add(story2)
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        val story3 = MyStory(
            "https://mfiles.alphacoders.com/681/681242.jpg"
        )
        myStories.add(story3)
        StoryView.Builder(supportFragmentManager)
            .setStoriesList(myStories)
            .setStoryDuration(5000)
            .setTitleText("Hamza Al-Omari")
            .setSubtitleText("Damascus")
            .setStoryClickListeners(object : StoryClickListeners {
                override fun onDescriptionClickListener(position: Int) {
                    Toast.makeText(
                        this@MainActivity,
                        "Clicked: " + myStories[position].description,
                        Toast.LENGTH_SHORT
                    ).show()
                }

                override fun onTitleIconClickListener(position: Int) {}
            })
            .setOnStoryChangedCallback { position ->
                Toast.makeText(
                    this@MainActivity,
                    position.toString() + "",
                    Toast.LENGTH_SHORT
                ).show()
            }
            .setStartingIndex(0)
            .build()
            .show()
    }
}
```

#### Run

Run the code in android studio. However make sure you've added internet connectivity permission in your android manifest.

Here's the demo:

![Android StoryView Example](https://github.com/Oclemy/MrStoryView/raw/master/MrStoryView.gif)

#### Download

Download the code [here](https://github.com/Oclemy/MrStoryView/archive/refs/heads/master.zip)

Cheers.
