# Kotlin Android About Page Examples


In this article we will look at examples of these pre-designed about us pages. Here's what you will learn:

1. How to create a beautiful about us page.



### What is an About Page?

An About Page is a page within your app or website that tells your users who you are.

### Why an About Page is important

Crafting an about page is essential for not only blogs but also apps. It's gives the opportunity for your users to get to know more about you as a company or person.
The about page should be the best representation of what you are all about.

Your about page tells your users who you are, what you do, and why they should care.

## (a). How to create a fancy about us page in Kotlin android using `FancyAboutPage`

When creating an android app, you may need an about page to use to show some info about your app, your company, your social media links, website etc. One way is to just design your own activity or fragment to show these. This can be done via the android studio editor. Another easier option is to use a predefined page. Then you can just those options.

This example explores how to create an about us page using the fancy about us page library. We use the following technologies:

1. Programming Language: Java
2. IDE: Android Studio

Here are the steps you follow;

### Step 1: Add Dependency

You will need to add the fancy about us page library in your app level build.gradle file:

```groovy
 implementation 'com.github.Shashank02051997:FancyAboutPage-Android:2.6'
```

Then sync your project.

### Step 2: Kotlin Code

Then we will have one activity, our main activity:

**MainActivity.kt**

Start by adding your imports:

```kt
import android.graphics.Color;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
```

Then create the class by extending the appcompatactivity. Also override the onCreate method

```kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Now simply reference the FancyAboutUsPage and set its properties:

```kt
 val fancyAboutPage = findViewById<FancyAboutPage>(R.id.fancyaboutpage)
        //fancyAboutPage.setCoverTintColor(Color.BLUE); //Optional
        fancyAboutPage.setCover(R.drawable.coverimg)
        fancyAboutPage.setName("Shashank Singhal")
        fancyAboutPage.setDescription("Google Certified Associate Android Developer | Android App, Game, Web and Software Developer.")
        fancyAboutPage.setAppIcon(R.drawable.cakepop)
        fancyAboutPage.setAppName("Cake Pop Icon Pack")
        fancyAboutPage.setVersionNameAsAppSubTitle("1.2.3")
        fancyAboutPage.setAppDescription(
            """
    Cake Pop Icon Pack is an icon pack which follows Google's Material Design language.

    This icon pack uses the material design color palette given by google. Every icon is handcrafted with attention to the smallest details!

    A fresh new take on Material Design iconography. Cake Pop offers unique, creative and vibrant icons. Spice up your phones home-screen by giving it a fresh and unique look with Polycon.
    """.trimIndent()
        )
        fancyAboutPage.addEmailLink("shashanksinghal02@gmail.com")
        fancyAboutPage.addFacebookLink("https://www.facebook.com/shashanksinghal02")
        fancyAboutPage.addTwitterLink("https://twitter.com/shashank020597")
        fancyAboutPage.addLinkedinLink("https://www.linkedin.com/in/shashank-singhal-a87729b5/")
        fancyAboutPage.addGitHubLink("https://github.com/Shashank02051997")
```

Here's the full code:

```kotlin
package info.camposha.ms_fancy_aboutpage

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.shashank.sony.fancyaboutpagelib.FancyAboutPage

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        title = "About Page"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN)
        val fancyAboutPage = findViewById<FancyAboutPage>(R.id.fancyaboutpage)
        //fancyAboutPage.setCoverTintColor(Color.BLUE); //Optional
        fancyAboutPage.setCover(R.drawable.coverimg)
        fancyAboutPage.setName("Shashank Singhal")
        fancyAboutPage.setDescription("Google Certified Associate Android Developer | Android App, Game, Web and Software Developer.")
        fancyAboutPage.setAppIcon(R.drawable.cakepop)
        fancyAboutPage.setAppName("Cake Pop Icon Pack")
        fancyAboutPage.setVersionNameAsAppSubTitle("1.2.3")
        fancyAboutPage.setAppDescription(
            """
    Cake Pop Icon Pack is an icon pack which follows Google's Material Design language.

    This icon pack uses the material design color palette given by google. Every icon is handcrafted with attention to the smallest details!

    A fresh new take on Material Design iconography. Cake Pop offers unique, creative and vibrant icons. Spice up your phones home-screen by giving it a fresh and unique look with Polycon.
    """.trimIndent()
        )
        fancyAboutPage.addEmailLink("shashanksinghal02@gmail.com")
        fancyAboutPage.addFacebookLink("https://www.facebook.com/shashanksinghal02")
        fancyAboutPage.addTwitterLink("https://twitter.com/shashank020597")
        fancyAboutPage.addLinkedinLink("https://www.linkedin.com/in/shashank-singhal-a87729b5/")
        fancyAboutPage.addGitHubLink("https://github.com/Shashank02051997")
    }
}
```

### Step 3: Layouts

Add the following code in your main layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FFFFFF">
    <com.shashank.sony.fancyaboutpagelib.FancyAboutPage
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/fancyaboutpage"
        >

        <com.mikhaellopez.circularimageview.CircularImageView
            android:layout_width="140dp"
            android:layout_height="140dp"
            android:layout_marginTop="180dp"
            android:layout_alignParentRight="true"
            android:layout_marginRight="10dp"
            android:src="@drawable/shashankprofileimg"
            app:civ_border_color="#40FFFFFF"
            app:civ_border_width="10dp"
            android:id="@+id/circularImageView" />

    </com.shashank.sony.fancyaboutpagelib.FancyAboutPage>

    </RelativeLayout>
</ScrollView>

    </RelativeLayout>
```

### Step 4: Run

Run the project and you will get the following:

![About Us page Example Kotlin](https://github.com/Oclemy/MsFancyAboutPage/raw/master/MrFancyAboutPage.gif)

### Step 5: Download

Download the code [here](https://github.com/Oclemy/MsFancyAboutPage/archive/refs/heads/master.zip).
