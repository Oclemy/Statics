# Kotlin Android EmojiCompat Example


This is an android EmojiCompat example and tutorial.


### What is EmojiCompat?

> The EmojiCompat is the main class to keep Android devices up to date with the newest emojis by adding EmojiSpans to a given `CharSequence`.

It is a singleton class that can be configured using a `EmojiCompat.Config` instance.

EmojiCompat has to be initialized using `init(EmojiCompat.Config)` function before it can process a `CharSequence`:

```kotlin
EmojiCompat.init(/* a config instance */);
```

> It is suggested to make the initialization as early as possible in your app.

Here is the demo screenshot:

![Kotlin Android EmojiCompat Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/01/emoji.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add `emoji-bundled` in your `app/build.gradle`:

```groovy
    implementation "androidx.emoji:emoji-bundled:$supportVer"
```

### Step 3: Design Layout

Design layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.emojicompat.MainActivity">

    <Button
        android:id="@+id/ok_button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="@string/ok_button_text" />

    <TextView
        android:id="@+id/emoji_text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:textSize="25sp"/>

</LinearLayout>
```

### Step 4: Initialize EmojiCompat

**InitApp.kt**

```kotlin
package com.developers.emojicompat

import android.app.Application
import androidx.emoji.text.EmojiCompat
import androidx.emoji.text.FontRequestEmojiCompatConfig
import androidx.core.provider.FontRequest
import java.util.logging.Logger

class InitApp : Application() {

    companion object {
        val Log = Logger.getLogger(InitApp::class.java.name)
    }

    override fun onCreate() {
        super.onCreate()
        val fontRequest = FontRequest(
                "com.google.android.gms.fonts",
                "com.google.android.gms",
                "Noto Color Emoji Compat",
                R.array.com_google_android_gms_fonts_certs)
        val config = FontRequestEmojiCompatConfig(this, fontRequest)
        EmojiCompat.init(config)
    }
}
```

### Step : Write MainActivity code

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.emoji.text.EmojiCompat
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val WOMAN_TECHNOLOGIST = "\uD83D\uDC69\u200D\uD83D\uDCBB"
    private val WOMAN_SINGER = "\uD83D\uDC69\u200D\uD83C\uDFA4"
    private val emojiContent: String = WOMAN_TECHNOLOGIST + " " + WOMAN_SINGER

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        ok_button.setOnClickListener {
            EmojiCompat.get().registerInitCallback(object : EmojiCompat.InitCallback() {
                override fun onInitialized() {
                    super.onInitialized()
                    Log.d("MainActivity", "EmojiCompat initialized successfully")
                    val processed = EmojiCompat.get().process(emojiContent)
                    emoji_text_view.text = processed
                }

                override fun onFailed(throwable: Throwable?) {
                    super.onFailed(throwable)
                    Toast.makeText(this@MainActivity,
                            throwable?.message ?: "", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/EmojiCompat) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
