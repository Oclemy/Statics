# Kotlin Android App Shortcuts Example

> In this tutorial you will learn how to create, update and disable shortcuts in an android app. Learn how to create both static and dynamic shortcuts.

When creating your app, you can create launchable shortcuts to specific actions or activities within your app. This gives users easy accessibility directly to your coolest functionalities. This can be especially important if you have a big app with many pages. The shortcuts can be displayed in a supported launcher or assistant.

### What is ShortcutManager?

ShortcutManager executes operations on an app's set of shortcuts, which represent specific tasks and actions that users can perform within your app.

Read more about ShortcutManager [here](https://developer.android.com/reference/android/content/pm/ShortcutManager).

## Example 1: Create, Update, Disable Dynamic and Static ShortCuts

App Shortcuts are great for exposing actions of your app and bring back users into your flow they can be static or dynamic static are set in stone once you define them (you can only update them with an app redeploy) dynamic can be changed on the fly.

By setting a custom rank to a dynamic shortcut we can control the order they appear when revealed:

- the higher the rank, the most top the shortcut goes.
- the rank of a static shortcut cannot be changed they will be shown in the order they're defined in the shortcuts.xml file.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed for this project:

```groovy
    implementation "androidx.appcompat:appcompat:$appCompat"
    implementation "com.google.android.material:material:$supportLibVer"
```

### Step 3: Design Layouts

We will design three layouts:

**(a). activity\_static\_shortcuts.xml**

The layout for our Static Shortcuts Activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_static_shortcut"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="github.nisrulz.sample.appshortcuts.StaticShortcutActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="welcome to static shortcut Activity"
        android:layout_centerInParent="true"
        android:textSize="18sp"/>

</RelativeLayout>
```

**(b). activity\_dynamic\_shortcuts.xml**

The layout for our Dynamic Shortcuts Activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_dynamic_shortcut"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="github.nisrulz.sample.appshortcuts.DynamicShortcutActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="welcome to Dynamic shortuct Activity"
        android:layout_centerInParent="true"
        android:textSize="18sp"/>
</RelativeLayout>
```

**(c). activity\_main.xml**

The layout for the MainActivity. Add two buttons one for updating shortcuts and disabling shortcuts:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="github.nisrulz.sample.appshortcuts.MainActivity">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:orientation="vertical">

        <Button
            android:id="@+id/update_shortcuts"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Update Shortcuts"
            android:layout_gravity="center_horizontal"
            android:fontFamily="monospace"
            android:layout_marginBottom="8dp"/>

        <Button
            android:id="@+id/disable_shortcut"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Disable dynamic shortcut"
            android:fontFamily="monospace"/>
    </LinearLayout>

</RelativeLayout>
```

### Step 4: Create Shortcuts Activities

We will have two shortcuts activities:

**(a). StaticShortcutsActivity.java**

In this activity we will inflate the `activity_static_shortcut.xml` layout:

```java
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class StaticShortcutActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_static_shortcut);
    }
}
```

**(b). DynamicShortcutsActivity.java**

Inflate the `activity_dynamic_shortcut.xml`:

```java
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class DynamicShortcutActivity extends AppCompatActivity {

    public static final String ACTION = BuildConfig.APPLICATION_ID + ".OPEN_DYNAMIC_SHORTCUT";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dynamic_shortcut);
    }
}
```

### Step 5: Create MainActivity

Start by adding the following imports:

```java
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.util.Arrays;
```

Extend the AppCompatActivity and override the `onCreate()` callback:

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
```

Initialize the ShortcutManager by invoking the `getSystemService(ShortcutManager.class)`:

```java
        final ShortcutManager shortcutManager = getSystemService(ShortcutManager.class);
```

Construct a Browser shortcut using `ShortcutInfo` builder pattern:

```java
        ShortcutInfo browserShortcut = new ShortcutInfo.Builder(this, "shortcut_browser")
                .setShortLabel("google.com")
                .setLongLabel("open google.com")
                .setDisabledMessage("dynamic shortcut disable")
                .setIcon(Icon.createWithResource(this, R.drawable.ic_open_in_browser))
                .setIntent(new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com")))
                .setRank(0)
                .build();
```

Now come and create a dynamic Shortcut as follows:

```java
        ShortcutInfo dynamicShortcut = new ShortcutInfo.Builder(this, "dynamic shortcut")
                .setShortLabel("Dynamic")
                .setLongLabel("Open dynamic shortcut")
                .setIcon(Icon.createWithResource(this, R.drawable.ic_dynamic))
                .setIntents(
                        new Intent[]{
                                new Intent(Intent.ACTION_MAIN, Uri.EMPTY, this, MainActivity.class).setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK),
                                new Intent(DynamicShortcutActivity.ACTION)
                        })
                .setRank(1)
                .build();
```

Add the two shortcuts above into our `ShortcutManager` using the `setDynamicShortcuts()` method:

```java
        shortcutManager.setDynamicShortcuts(Arrays.asList(browserShortcut, dynamicShortcut));
```

Let us now see how to update shortucts when a button is clicked:

```java
        Button updateShortcutsBtn = (Button) findViewById(R.id.update_shortcuts);
        updateShortcutsBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
```

We will be changing the foreground or text color of the shortcut:

```java
                ForegroundColorSpan colorSpan = new ForegroundColorSpan(getResources().getColor(android.R.color.holo_red_light, getTheme()));
                String label = "open google.com";

                SpannableStringBuilder colouredLabel = new SpannableStringBuilder(label);
                colouredLabel.setSpan(colorSpan, 0, label.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);
```

Rebuild our two shortcuts using the `ShortcutInfo` builder pattern:

```java

                ShortcutInfo browserShortcut = new ShortcutInfo.Builder(MainActivity.this, "shortcut_browser")
                        .setShortLabel(colouredLabel)
                        .setRank(1)
                        .build();

                ShortcutInfo dynamicShortcut = new ShortcutInfo.Builder(MainActivity.this, "dynamic shortcut")
                        .setRank(0)
                        .build();
```

Then update them using the `updateShortcuts()` method:

```java
                shortcutManager.updateShortcuts(Arrays.asList(browserShortcut, dynamicShortcut));

                Toast.makeText(MainActivity.this, "Shortcuts Updated :)", Toast.LENGTH_SHORT).show();
            }
        });
```

Let us also see how to disable an app shortcut. This makes the pinned shortcut unlaunchable.We use the `disableShortcuts()` method:

```java
        Button disableShortcutBtn = (Button) findViewById(R.id.disable_shortcut);
        disableShortcutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                shortcutManager.disableShortcuts(Arrays.asList("dynamic shortcut"));
                Toast.makeText(MainActivity.this, "Dynamic shortcut Disabled !!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

Here is the full code:

**MainActivity.java**

```java
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.util.Arrays;

/** This is a small demo project for setting up the new App Shortcuts feature from Android 7.1
 *  The official documentation can be found at: https://developer.android.com/preview/shortcuts.html
 */
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /** App Shortcuts are great for exposing actions of your app and bring back users into your flow
         * they can be static or dynamic
         * static are set in stone once you define them (you can only update them with an app redeploy)
         * dynamic can be changed on the fly
         */

        final ShortcutManager shortcutManager = getSystemService(ShortcutManager.class);

        /**
         * Dynamic Shortcuts
         * By setting a custom rank to a dynamic shortcut we can control the order they appear when revealed:
         * the higher the rank, the most top the shortcut goes.
         * the rank of a static shortcut cannot be changed they will be shown in the order they're defined in the shortcuts.xml file.
         */

        ShortcutInfo browserShortcut = new ShortcutInfo.Builder(this, "shortcut_browser")
                .setShortLabel("google.com")
                .setLongLabel("open google.com")
                .setDisabledMessage("dynamic shortcut disable")
                .setIcon(Icon.createWithResource(this, R.drawable.ic_open_in_browser))
                .setIntent(new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com")))
                .setRank(0)
                .build();

        ShortcutInfo dynamicShortcut = new ShortcutInfo.Builder(this, "dynamic shortcut")
                .setShortLabel("Dynamic")
                .setLongLabel("Open dynamic shortcut")
                .setIcon(Icon.createWithResource(this, R.drawable.ic_dynamic))
                .setIntents(
                        new Intent[]{
                                new Intent(Intent.ACTION_MAIN, Uri.EMPTY, this, MainActivity.class).setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK),
                                new Intent(DynamicShortcutActivity.ACTION)
                        })
                .setRank(1)
                .build();

        shortcutManager.setDynamicShortcuts(Arrays.asList(browserShortcut, dynamicShortcut));

        /**
         * updating the shortcuts
         * we can updates the shortcut by making the use of updateShortcuts() method.
         */
        Button updateShortcutsBtn = (Button) findViewById(R.id.update_shortcuts);
        updateShortcutsBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ForegroundColorSpan colorSpan = new ForegroundColorSpan(getResources().getColor(android.R.color.holo_red_light, getTheme()));
                String label = "open google.com";

                SpannableStringBuilder colouredLabel = new SpannableStringBuilder(label);
                colouredLabel.setSpan(colorSpan, 0, label.length(), Spanned.SPAN_INCLUSIVE_INCLUSIVE);

                ShortcutInfo browserShortcut = new ShortcutInfo.Builder(MainActivity.this, "shortcut_browser")
                        .setShortLabel(colouredLabel)
                        .setRank(1)
                        .build();

                ShortcutInfo dynamicShortcut = new ShortcutInfo.Builder(MainActivity.this, "dynamic shortcut")
                        .setRank(0)
                        .build();

                shortcutManager.updateShortcuts(Arrays.asList(browserShortcut, dynamicShortcut));

                Toast.makeText(MainActivity.this, "Shortcuts Updated :)", Toast.LENGTH_SHORT).show();
            }
        });

        /**
         * Disabling app shortcut
         * disableShortcuts(List) will remove the specified dynamic shortcuts and also make any
         * specified pinned shortcuts un-launchable.
         */

        Button disableShortcutBtn = (Button) findViewById(R.id.disable_shortcut);
        disableShortcutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                shortcutManager.disableShortcuts(Arrays.asList("dynamic shortcut"));
                Toast.makeText(MainActivity.this, "Dynamic shortcut Disabled !!", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

### Step 6: Configure Shortcuts

First create a folder in your `res` directory called `xml` and add the following code:

**res/shortcuts.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">

    <!--Static Shortcut -->
    <shortcut
        android:enabled="true"
        android:icon="@drawable/ic_open"
        android:shortcutDisabledMessage="@string/static_shortcut_disabled_message"
        android:shortcutId="static"
        android:shortcutLongLabel="@string/static_shortcut_long_label"
        android:shortcutShortLabel="@string/static_shortcut_short_label">
        <intent
            android:action="android.intent.action.MAIN"
            android:targetClass="github.nisrulz.sample.appshortcuts.MainActivity"
            android:targetPackage="github.nisrulz.sample.appshortcuts" />

        <intent
            android:action="android.intent.action.VIEW"
            android:targetClass="github.nisrulz.sample.appshortcuts.StaticShortcutActivity"
            android:targetPackage="github.nisrulz.sample.appshortcuts"/>
    </shortcut>
</shortcuts>
```

We need to make some changes to our `AndroidManifest.xml`:

```xml
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <meta-data
                android:name="android.app.shortcuts"
                android:resource="@xml/shortcuts" />
        </activity>
        <activity
            android:name=".StaticShortcutActivity"
            android:label="Static Shortcut Activity"
            android:parentActivityName=".MainActivity" />
        <activity
            android:name=".DynamicShortcutActivity"
            android:label="Dynamic Shortcut Activity">

            <intent-filter>
                <action android:name="github.nisrulz.sample.appshortcuts.OPEN_DYNAMIC_SHORTCUT" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
    </application>
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/nisrulz/android-examples/tree/develop/AppShortcuts) Example |
| 2. | [Follow](https://github.com/nisrulz/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |



## Example 2: AndroidShortcuts Example

Here are the demo screenshots:

![](https://raw.githubusercontent.com/pcevikogullari/AndroidShortcuts/master/shortcut1.gif) 

![](https://raw.githubusercontent.com/pcevikogullari/AndroidShortcuts/master/shortcut2.gif)

### Step 1: Manifest

Add meta-data before ```</activity>``` tag in Manifest.xml

```xml
<meta-data android:name="android.app.shortcuts"
    android:resource="@xml/shortcuts" />
```

### Step 2:  Add Shortcut
To add or edit a new shotcut, go to `/res/xml/shortcuts.xml`:

```xml
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
    <shortcut
        android:shortcutId="shortcut1"
        android:enabled="true"
        android:icon="@drawable/ic_directions_run_black_24dp"
        android:shortcutShortLabel="@string/shortcut1"
        android:shortcutLongLabel="@string/shortcut1_long"
        android:shortcutDisabledMessage="@string/shortcut1_disabled">
        <intent
            android:action="custom_action"
            android:targetPackage="com.pamir.shortcuts"
            android:targetClass="com.pamir.shortcuts.MainActivity" />
    </shortcut>
</shortcuts>
```

### Handle Actions

To handle shortcuts, just add new constant:

```java
private final static String CUSTOM_ACTION = "custom_action";
```

and check the intent for custom action :

```java
switch (getIntent().getAction()){
    case CUSTOM_ACTION:
        textView.setText(CUSTOM_ACTION);
        break;
    default:
        break;
}
```

Here are the full code. This example will comprise the following files:

- `MainActivity.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


In your `app/build.gradle` add dependencies as shown below:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 25
    buildToolsVersion "24.0.2"
    defaultConfig {
        applicationId "com.pamir.shortcuts"
        minSdkVersion 25
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
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:25.0.0'
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:design:25.0.0'
}
```

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.pamir.shortcuts.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:id="@+id/textview"
        android:layout_gravity="center"
        android:text="Hello World!" />

</FrameLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `MainActivity.java`**

Create a file named `MainActivity.java`


Here is the full code

```java
package com.pamir.shortcuts;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private final static String ACTION_1 = "action1";
    private final static String ACTION_2 = "action2";
    private final static String ACTION_3 = "action3";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView textView = (TextView) findViewById(R.id.textview);

        switch (getIntent().getAction()){
            case ACTION_1:
                textView.setText(ACTION_1);
                break;
            case ACTION_2:
                textView.setText(ACTION_2);
                break;
            case ACTION_3:
                textView.setText(ACTION_3);
                break;
            default:
                break;
        }
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

> Download code [here](https://github.com/pcevikogullari/AndroidShortcuts-master).
> Follow code author [here](https://github.com/pcevikogullari/).


## Example 3: Kotlin Android Shortcuts Demo

Here is the demo screenshots:

![](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image3.jpg)

![](https://github.com/leiyun1993/ShortcutsDemo/raw/master/screenshots/image4.jpg)

This example will comprise the following files:

- `DynamicTestActivity.kt`
- `MainActivity.kt`
- `StaticTestActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

No special dependency is needed for this project.

### Step 3: Design Layouts

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/pageInfo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

### Step 4: AndroidManifest

```xml
    <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <meta-data
                android:name="android.app.shortcuts"
                android:resource="@xml/shortcuts" />
        </activity>


        <activity android:name=".StaticTestActivity" />
        <activity android:name=".DynamicTestActivity" />
```

### Step 5: Write Code

Write Code as follows:

***(a). `DynamicTestActivity.kt`**

Create a file named `DynamicTestActivity.kt`


Here is the full code

```kotlin
package com.githubly.shortcutsdemo

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

/**
 * 类名：DynamicTestActivity
 * 作者：Yun.Lei
 * 功能：
 * 创建日期：2018-09-27 11:25
 * 修改人：
 * 修改时间：
 * 修改备注：
 */
class DynamicTestActivity:AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val info = intent?.getStringExtra("info")?:"Dynamic shortcuts target class"

        pageInfo.text = info
    }
}
```

***(b). `MainActivity.kt`**

Create a file named `MainActivity.kt`


Here is the full code

```kotlin
package com.githubly.shortcutsdemo

import android.content.Intent
import android.content.pm.ShortcutInfo
import android.content.pm.ShortcutManager
import android.graphics.drawable.Icon
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import kotlinx.android.synthetic.main.activity_main.*

/**
 * shortcuts
 */
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        pageInfo.text = "main activity"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            val shortcutManager = getSystemService(ShortcutManager::class.java)

            val count = shortcutManager.maxShortcutCountPerActivity
            Log.e("count",count.toString())

            val list = mutableListOf<ShortcutInfo>()
            addShortcutWithIntent1()?.let {
                list.add(it)
            }
            /*addShortcutWithIntent2()?.let {
                list.add(it)
            }*/
            addShortcutWithIntents()?.let {
                list.add(it)
            }
            shortcutManager.dynamicShortcuts =list
        }


    }

    private fun addShortcutWithIntent1(): ShortcutInfo? {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            ShortcutInfo.Builder(this, "Dynamic1").apply {
                setShortLabel("动态快捷1")
                setLongLabel("DynamicShortcutLong1")
                setIcon(Icon.createWithResource(this@MainActivity, R.mipmap.icon3))
                setIntent(Intent().apply {
                    action = Intent.ACTION_MAIN
                    setClass(this@MainActivity, DynamicTestActivity::class.java)
                    putExtra("info", "Dynamic shortcuts target class with intent1")
                })
            }.build()
        } else {
            null
        }
    }

    private fun addShortcutWithIntent2(): ShortcutInfo? {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            ShortcutInfo.Builder(this, "Dynamic2").apply {
                setShortLabel("动态快捷2")
                setLongLabel("DynamicShortcutLong2")
                setIcon(Icon.createWithResource(this@MainActivity, R.mipmap.icon4))
                setIntent(Intent().apply {
                    action = Intent.ACTION_MAIN
                    setClass(this@MainActivity, DynamicTestActivity::class.java)
                    putExtra("info", "Dynamic shortcuts target class with intent2")
                })
            }.build()
        } else {
            null
        }
    }

    private fun addShortcutWithIntents(): ShortcutInfo? {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            ShortcutInfo.Builder(this, "Dynamic3").apply {
                setShortLabel("动态快捷3")
                setLongLabel("DynamicShortcutLong3")
                setIcon(Icon.createWithResource(this@MainActivity, R.mipmap.icon5))
                setIntents(arrayOf(
                        Intent().apply {
                            action = Intent.ACTION_MAIN
                            setClass(this@MainActivity, MainActivity::class.java)
                            flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                        },
                        Intent().apply {
                            action = Intent.ACTION_MAIN
                            setClass(this@MainActivity, DynamicTestActivity::class.java)
                            flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                            putExtra("info", "Dynamic shortcuts target class with intents")
                        }
                )
                )
            }.build()
        } else {
            null
        }
    }
}
```

***(c). `StaticTestActivity.kt`**

Create a file named `StaticTestActivity.kt`


Here is the full code

```kotlin
package com.githubly.shortcutsdemo

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class StaticTestActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        pageInfo.text = "static shortcuts target class"
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

> Download code [here](https://github.com/leiyun1993/ShortcutsDemo-master).
> Follow code author [here](https://github.com/leiyun1993/).


## Example 4: Kotlin Android Oreo ShortcutManager

Here is the demo screenshot:

![](https://github.com/takeo-asai/oreo-shortcut-manager/raw/master/docs/screenshot.png)

This example will comprise the following files:

- `MainActivity.kt`
- `ShortcutActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

No special dependency is needed.

### Step 3: Design Layouts

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.github.spitson.takeo.myshortcut.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="MainActivity"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button"
        android:layout_width="129dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="127dp"
        android:layout_marginStart="128dp"
        android:onClick="openShortcut"
        android:text="Open another"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        tools:layout_editor_absoluteX="128dp"
        tools:layout_editor_absoluteY="296dp"
        android:layout_marginTop="30dp"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="createShortcut"
        android:text="Create Shortcut"
        tools:layout_editor_absoluteX="116dp"
        tools:layout_editor_absoluteY="370dp"
        app:layout_constraintStart_toStartOf="parent"
        android:layout_marginStart="116dp"
        android:layout_marginEnd="115dp"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="27dp"
        app:layout_constraintTop_toBottomOf="@+id/button" />

    <Button
        android:id="@+id/button3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="100dp"
        android:layout_marginTop="28dp"
        android:onClick="createShortcutOld"
        android:text="Create Old Shortcut"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button2"
        tools:layout_editor_absoluteX="102dp"
        app:layout_constraintStart_toStartOf="parent"
        android:layout_marginStart="102dp" />

</android.support.constraint.ConstraintLayout>
```
***(b). `activity_shortcut.xml`**

Create a file named `activity_shortcut.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.github.spitson.takeo.myshortcut.ShortcutActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Shortcut Activity"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

### Step 4: AndroidManifest

```xml
  <uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".ShortcutActivity">
            <intent-filter>
                <category android:name="android.intent.category.DEFAULT" />
                <action android:name="android.intent.action.VIEW" />
            </intent-filter>
        </activity>
    </application>
```

### Step 5: Write Code

Write Code as follows:

***(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`


Here is the full code

```kotlin
package com.github.spitson.takeo.myshortcut

import android.content.Context
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.content.Intent
import android.content.pm.ShortcutInfo
import android.view.View
import android.content.pm.ShortcutManager
import android.graphics.drawable.Icon
import android.os.Build

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun openShortcut(view: View) {
        val intent = Intent(this, ShortcutActivity::class.java)
        startActivity(intent)
    }

    fun createShortcut(view: View) {
        // ShortcutManager#requestPinShortcut needs API 26
        if (Build.VERSION.SDK_INT < 26) {
            return
        }

        val manager = getSystemService(Context.SHORTCUT_SERVICE) as ShortcutManager
        if (manager.isRequestPinShortcutSupported) {
            val intent = Intent(this, ShortcutActivity::class.java).apply {
                action = Intent.ACTION_VIEW
            }

            val info = ShortcutInfo.Builder(this, "shortcut-id")
                    .setShortLabel("label")
                    .setIcon(Icon.createWithResource(this, R.mipmap.ic_launcher_round))
                    .setIntent(intent)
                    .build()
            manager.requestPinShortcut(info, null)
        }
    }

    fun createShortcutOld(view: View) {
        val targetIntent = Intent(this, ShortcutActivity::class.java).apply {
            action = Intent.ACTION_VIEW
        }
        val icon = Intent.ShortcutIconResource.fromContext(this, R.mipmap.ic_launcher_round)
        val intent = Intent("com.android.launcher.action.INSTALL_SHORTCUT").apply {
            putExtra(Intent.EXTRA_SHORTCUT_INTENT, targetIntent)
            putExtra(Intent.EXTRA_SHORTCUT_ICON_RESOURCE, icon)
            putExtra(Intent.EXTRA_SHORTCUT_NAME, "label")
        }
        sendBroadcast(intent)
    }
}
```

***(b). `ShortcutActivity.kt`**

Create a file named `ShortcutActivity.kt`


Here is the full code

```kotlin
package com.github.spitson.takeo.myshortcut

import android.os.Bundle
import android.support.v7.app.AppCompatActivity

class ShortcutActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_shortcut)
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

> Download code [here](https://github.com/takeo-asai/oreo-shortcut-manager-master).
> Follow code author [here](https://github.com/takeo-asai/).




