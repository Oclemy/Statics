# Android Activity - Tutorial, Types and Basic Examples

An activity is a single focused thing that the user can do. They provide the platform for interaction with users in android. First it creates a window which the users can interact with.

Such windows typically get inflated from an xml layout which you design by placing components like buttons, textviews etc. While in most UI frameworks the launching point of an application is the main method, in android that launching point is an activity.

Thus they are extremely crucial to how android works and in fact they are categorized as a core and fundamental component of android.

Even though we can have an `activity` without visual components, most activities get created to host views and widgets by which users can interact with.

Activities can therefore vaguely refer to the whole screen with which the user will interact with.

[lwtoc]

With this way of thinking here are some of the things we can do to our activity:

| No. | Action | Description |
| --- | --- | --- |
| 1. | Open new `activity` | This then replaces the current `activity` or screen. |
| 2. | Close the current `activity` | So that it's no longer visible to us. Android System will not kill it completely, just put in the background,lest you come back to it again. |
| 3. | Rotate the device | Say you are watching a video or playing a game from this app and you want to view it in different layout. This process causes the recreation of the `activity` so as to cater for your layout needs. |

Doing things like the above causes android system to raise various life cycle callbacks. These are basically methods that get raised in an event driven manner at various stages in the lifecycle of an `activity`. For example, creation, pausing, resuming, starting,restarting,stopping etc.

##### Presentation mechanisms for an `Activity`

`Activities` can be presented in various ways in android:

| No. | Mechanism | Description |
| --- | --- | --- |
| 1. | **Full Screen Window** : | Most common way of presenting an `activity`.With this they cover the full screen. |
| 2. | **Floating Windows** : | `Activities` can be set to as floating windows via a theme with `windowIsFloating` attribute set. |
| 3. | **Embedding** : | Activities can also be embedded inside another `activity` using `ActivityGroup`. |

However note that embedding is no longer attractive as the ActivityGroup was deprecated with the introduction of `Fragments` way back in `API level 13`. `Fragments` and Fragment Transaction APIs does this in a better, more modular way.If anything fragments are basically subactivities howevr, with their own lifecycle.

##### `Activity` class Definition

Let's also see a programmatic description of an `activity`.

First it belongs to `android.app` package:

```java
package android.app;
```

`Activity` is a class like any other class but also unique in its own way too. It's also public, so it's visible and usable within other packages outside its own.

```java
public class Activity..{}
```

Being a class makes it also have Object Oriented features that other classes do have like:

1. Ability to derive from other classes and be derived from.
2. Ability to implement interfaces.
3. Ability to have its own methods, fields and inner classes.

In fact the `Activity` class derives from ContextThemeWrapper class.

```java
public class Activity extends ContextThemeWrapper..{}
```

The `ContextThemeWrapper` gives the class the ability to manipulate and modify the theme from what is in the wrapped context.

Furthermore an `Activity` implements several interfaces:

```java
public class Activity extends ContextThemeWrapper implements LayoutInflater.Factory2 Window.Callback KeyEvent.Callback View.OnCreateContextMenuListener ComponentCallbacks2{}
```

##### Activity's Children and GrandChildren

That is activity's direct subclasses and indirect subclasses.

Here are the direct subclasses:

| No. | Activity | Description |
| --- | --- | --- |
| 1. | **FragmentActivity** | The super class used by activities wanting to Fragments and Loader APIs using support library |
| 2. | **NativeActivity** | For those who want a convenient activity to be implemented purely in native code. |
| 3. | **ListActivity** | An activity specializing in a displaying a list of items bound to a data source. |
| 4. | ExpandableListActivity | An activity specializing in displaying expandable list of items bound to a data source. |
| 5. | **AliasActivity** | Provides alias-like mechanism to an activity. It does this by launching another activity then killing itself. |
| 6. | **AccountAuthenticatorActivity** | Super class to create activities that implement AbstractAccountAuthenticator. |
| 7. | **~ActivityGroup~** | Deprecated back in the API 13 after the introduction of Fragments. Before that it was the way to create to create a screen that has multiple embedded activities. |

Well those are the activity's children.

Let's now look at the grandchildren/indirect subclasses.

| No. | Activity | Main Parent | Description |
| --- | --- | --- | --- |
| 1. | **AppCompatActivity** | FragmentActivity | AppCompatActivity is the super clas for activities planning to utilize action bar features. |
| 2. | ~**ActionBarActivity**~ | AppCompatActivity | Deprecated. Before that it was used to provide action bar features to activities. Now that role has gone to AppCompatActivity. |
| 3. | ~**TabActivity**~ | ActivityGroup | Deprecated way back in the API level 13. Before that it was used to create Tabbed Activities.Now Fragments can do that. |
| 4. | **PreferenceActivity** | ListActivity | The super class to be used for those intending to show a hierarchy of preferences to users. |
| 5. | LauncherActivity | ListActivity | This will display a list of all activities which can be performed for a given intent. |

#### Capabilities Activity class provides its children

We can, and have said that activities represent single focused thing a user can do.

So we know it allows us use and render views and widgets that users can interact with.

However, let's now come and explore more detailed and specific functionalities from a lower level that the `Activity` class gives to it's children.

##### 1\. Context capabilities

1. **Checking various permissions** : For example: the `checkPermission(String permission, int pid, int uid)` will determine whether a particular process and user ID running in the system has the passed permission,`checkUriPermission(Uri uri, int pid, int uid, int modeFlags)` will determine whether a particular process and user ID running in the system has permission to access the passed Uri etc.
2. **Connect to or create application service** : Context can be used to connect to application service or create it if needed.This done via the `bindService(Intent service, ServiceConnection conn, int flags)` method call. 3.**Create other Contexts** : For example `createConfigurationContext(Configuration overrideConfiguration)` will create a new Context object for the current context but with resources adjusted to the passed configuration,`createPackageContext(String packageName, int flags)` returns a new Context object for the given application name.
3. **List Associated Databases and Files** : `databaseList()` will provide us with a string array with the private databases associated with this Context's application package while `fileList()` returns a string array with the private files associated with this Context's application package.
4. **Delete Associated Database and File** : Context provides us methods: `deleteDatabase(String name)` to delete the SQLiteDatabase associated with this Context's application's package and `deleteFile(String name)` to delete the given private file associated with this Context's application package. 6.**Getting Application Context** : Context's `getApplicationContext()` will return us the single global Application object of the current process. 7.**Getting Application Information** : Via the `getApplicationInfo()` we can get the full application information of the current Context's package.

#### Quick Activity Examples

##### 1\. How to Start an `Activity`

To start an `activity` you need an `Intent` object. Let's create a method that can start for us an `activity`. This method will take a context object as well as the class name for the target `activity`, that is the `activity` we want to open.

```java
    void start(Context c, Class e){
        Intent i = new Intent(,e);
        c.startActivity(i);
        //a.finish();
    }
```

##### 2\. How to Finish/Kill an `Activity`

To finish an `activity` we use the `finish()` method.

```java
    void killIntent(Context c){
        Intent i = new Intent(c,MainActivity.class);
        c.startActivity(i);
        c.finish();
    }
```

##### 3\. How to determine if an `activity` is in the foreground

This example method can determine for us if an `activity` is in the Foreground or not. It returns a boolean value based on the result.

```java
    public static boolean isForeground(Context context, String className) {
        if (context == null || TextUtils.isEmpty(className)) {
            returnfalse;
        }
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> list = am.getRunningTasks(1);
        if (list != null && list.size() > 0) {
            ComponentName cpn = list.get(0).topActivity;
            if (className.equals(cpn.getClassName())) {
                return true;
            }
        }
        returnfalse;
    }

    public static boolean isForeground(Activity activity) {
        return isForeground(activity, activity.getClass().getName());
    }
```

##### 4\. How to Handle Backpress

Let's say you want to properly handle backpress in that you maybe want to show user an alert dialog before just exiting the current activity. In that case you create a `handleBackPress()` method.

```java
    public void handleBackPress() {
        mExitDialog = true;
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity(), R.style
                .AlertDialogStyle);
        builder.setTitle(R.string.leave_chat)
                .setMessage(R.string.leave_chat_desc)
                .setCancelable(false)
                .setNegativeButton(R.string.cancel,
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                mExitDialog = false;
                                dialog.cancel();
                            }
                        })
                .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        //showSaveHistoryDialog();
                    }
                });
        AlertDialog alert = builder.create();
        alert.show();
        alert.getWindow().setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color
                .black14)));
    }
```

In the above case we are showing an alertdialog to user when he clicks the back button.

## Android AppCompatActivity

`AppCompatActivity` is a class that acts as the super class for activities that want to take advantage of the support library action bar features.

The requirement to use the `android.support.v7.app.ActionBar` inside you activity are:

1. To be running `API level 7` or higher.
2. Then extend this class.
3. Set you activity theme to `android.support.v7.appcompat.R.style#Theme_AppCompat Theme.AppCompat` or similar theme.

Themes do get set in the `AndroidManifest.xml` e.g

```xml
<activity
      android_name=".MainActivity"
      android_label="@string/app_name"
      android_theme="@style/AppTheme.NoActionBar">....</activity>
```

`AppCompatActivity` is defined inside the `android.support.v7.app` package:

```java
package android.support.v7.app;
```

It derives from `android.support.v4.app.FragmentActivity`:

```java
public class AppCompatActivity extends FragmentActivity{}
```

And implements several interfaces:

```java
public class AppCompatActivity extends FragmentActivity implements AppCompatCallback,TaskStackBuilder.SupportParentable, ActionBarDrawerToggle.DelegateProvider {}
```

\\===

Here's an example of a class deriving from AppCompatActivity:

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

#### Setting `AppCompatActivity` theme

`AppCompatActivity` like other activity themes can be set either via androidmanifest

```xml
<activity
      android_name=".MainActivity"
      android_label="@string/app_name"
      android_theme="@style/AppTheme.NoActionBar">....</activity>
```

or programmatically via the `setTheme()` method:

```java
public void setTheme(@StyleRes final int resid) {}
```

We can create a custom material theme to be used by AppCompatActivity:

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

Then we can also set that theme globally to the whole application this way using the `android:theme="..."` attribute:

```xml
<application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity android_name=".MainActivity">

        </activity>
    </application>
```

#### Retrieving `AppCompatActivity` ActionBar

`AppCompatActivity` gives us a method to retrieve a reference to its action bar:

```java
public ActionBar getSupportActionBar(){}
```

If it doesn't have one then `null` gets returned.

#### Using ToolBar as an ActionBar in AppCompatActivity

We can use `android.support.v7.widget.Toolbar` instead of an actionbar. Toolbars have the advantage of flexibility in use and customizations.

ActionBars are normally part of the Activity's opaque window decor. Hence they are controlled by the framework.

ToolBars on the other hand can be used within your application's layout. Hence they are flexible.

Say that we have a toolbar defined as follows:

```xml
...
<android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />
...
```

inside our `activity_main.xml`.

We can use it as action bar using the `setSupportActionBar()` where we pass the `toolbar` reference as a parameter.

```java
public void setSupportActionBar(@Nullable Toolbar toolbar) {}
```

Example:

```java
Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
setSupportActionBar(toolbar);
```

To clear it you pass `null`.

## Android Studio - Creating Empty Activity Project

_How to Create an Empty Activity in Android Studio_

How to Create a Project in android studio with Empty Activity template. We see how to use Android studio to create an empty activity.

Empty Activity is just a template for android development. It is the easiest template to get started with as it generates for us a single java file and a single xml layout file.

Here's the process.

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty activity.
5. Click Finish.

This will generate for us a project with the following:

| No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1. | activity_main.xml | XML Layout | Will get inflated into MainActivity View.You add your views and widgets here. |
| 2. | MainActivity.java | Class | Your Launcher activity |

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an application component. If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />
                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our MainActivity as launcher activity. Launcher activities get executed first when th android app is run.

## Android Studio - Creating Basic Activity Project

_How to Create a Project in android studio with Basic Activity template._

This is tutorial for beginners to see how to create an android project based on the basic template.

Here's the process:

1. First create a new project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Basic activity.
5. Click Finish.

Basic activity will have a toolbar and floating action button already added in the layout

Normally two layouts get generated with this option:

| No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1. | activity_main.xml | XML Layout | Will get inflated into MainActivity Layout.Typically contains appbarlayout with toolbar.Also has a floatingactionbutton. |
| 2. | content_main.xml | XML Layout | Will be included into activity_main.xml.You add your views and widgets here. |
| 3. | MainActivity.java | Class | Main Activity. |

In this example I used a basic activity.

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an application component.

If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml

        <activity android_name=".MainActivity">

            <intent-filter>

                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />

            </intent-filter>

        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our MainActivity as launcher activity. Launcher activities get executed first when th android app is run.

#### Advantage of Creating Basic Activity project

You can optionally choose empty activity over basic activity for this project.

However basic activity has the following advantages:

| No. | Advantage |
| --- | --- |
| 1. | Provides us a readymade toolbar which gives us actionbar features yet easily customizable |
| 2. | Provides us with appbar layout which implements material design appbar concepts. |
| 3. | Provides a FloatinActionButton which we can readily use to initiate quick actions especially in examples like these. |
| 4. | Decouples our custom content views and widgets from the templating features like toolbar. |

#### Generated Project Structure

AndroidStudio will generate for you a project with default configurations via a set of files and directories.

Here are the most important of them:

| No. | File | Major Responsibility |
| --- | --- | --- |
| 1. | `build/` | A directory containing resources that have been compiled from the building of application and the classes generated by android tools. Such a tool is the `R.java` file. `R.java` file normally holds the references to application resources. |
| 2. | `libs/` | To hold libraries we use in our project. |
| 3. | `src/main/` | To hold the source code of our application.This is the main folder you work with. |
| 4. | `src/main/java/` | Contains our java classes organized as packages. |
| 5. | `src/main/res/` | Contains our project resources folders as follows. |
| 6. | `src/main/res/drawable/` | Contains our drawable resources. |
| 7. | `src/main/res/layout/` | Contains our layout resources. |
| 8. | `src/main/res/menu/` | Contains our menu resources XML code. |
| 9. | `src/main/res/values/` | Contains our values resources XML code.These define sets of name-value pairs and can be strings, styles and colors. |
| 10. | `AndroidManifest.xml` | This file gets autogenerated when we create an android project.It will define basic information needed by the android system like application name,package name,permissions,activities,intents etc. |
| 11. | `build.gradle` | Gradle Script used to build the android app. |

## Android Activities - Pass Primitives From One Activity To Another

Let's see how to pass primitive data types from one activity to another. We pass:

- Strings
- Integer
- Boolean(Via CheckBox)

First Activity

Second Activity

to a second activity and show them in the second activity.

#### Gradle Files

We'll add dependencies in the app level `build.gradle` file.

##### 1\. Build.gradle

Here's our app level in the build.gradle file:

```groovy
    dependencies {
        implementation fileTree(dir: 'libs', include: ['*.jar'])
        testImplementation 'junit:junit:4.12'
        implementation 'com.android.support:appcompat-v7:24.2.1'
        implementation 'com.android.support:design:24.2.1'
    }
```

### LAYOUT RESOURCES

We have three xml layouts;

1. activity_main.xml
2. content_main.xml
3. activity_second.xml

#### 1\. activity_main.xml

- The template layout for our main activity.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.primitivespassing.MainActivity">

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
            android_src="@android:drawable/ic_dialog_email" />

    </android.support.design.widget.CoordinatorLayout>
```

#### 2\. content_main.xml

- Let's add our edittexts and checkbox here.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        tools_context="com.tutorials.hp.primitivespassing.MainActivity"
        tools_showIn="@layout/activity_main">

        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="vertical">

            <android.support.design.widget.TextInputEditText
                android_id="@+id/nameTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_enabled="true"
                android_focusable="true"
                android_hint="Name"
                android_textSize="25dp"
                android_textStyle="bold" />

            <android.support.design.widget.TextInputEditText
                android_id="@+id/txtID"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_enabled="true"
                android_focusable="true"
                android_hint="ID"
                android_textSize="25dp"
                android_textStyle="bold" />

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_orientation="horizontal"
                android_padding="5dp">

                <TextView
                    android_layout_width="250dp"
                    android_layout_height="wrap_content"
                    android_text="Technology Exists ??"
                    android_textSize="25dp"
                    android_textStyle="bold" />

                <CheckBox
                    android_id="@+id/techExists"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_checked="true"
                    android_textSize="25dp" />
            </LinearLayout>
            <Button android_id="@+id/sendBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Send"
                android_clickable="true"
                android_padding="5dp"
                android_background="#009968"
                android_textColor="@android:color/white"
                android_textStyle="bold"
                android_textSize="20dp" />
        </LinearLayout>
    </RelativeLayout>
```

#### 3\. activity_second.xml

- Here's the code for the second activity.
- This activity will receive data from the main activity and show it here.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context="com.tutorials.hp.primitivespassing.SecondActivity">

        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="vertical">

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_orientation="horizontal"
                android_padding="5dp">

                <TextView
                    android_layout_width="250dp"
                    android_layout_height="wrap_content"
                    android_text="NAME"
                    android_textSize="25dp"
                    android_textStyle="bold" />

                <TextView
                    android_id="@+id/nameTxtSecond"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_text="value received"
                    android_textSize="25dp" />
            </LinearLayout>

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_orientation="horizontal"
                android_padding="5dp">

                <TextView
                    android_layout_width="250dp"
                    android_layout_height="wrap_content"
                    android_text="ID"
                    android_textSize="25dp"
                    android_textStyle="bold" />

                <TextView
                    android_id="@+id/txtIDSecond"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_text="value received"
                    android_textSize="25dp" />
            </LinearLayout>

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_orientation="horizontal"
                android_padding="5dp">

                <TextView
                    android_layout_width="250dp"
                    android_layout_height="wrap_content"
                    android_text="Technology Exists ??"
                    android_textSize="25dp"
                    android_textStyle="bold" />

                <CheckBox
                    android_id="@+id/techExistsSecond"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_checked="true"
                    android_textSize="25dp" />
            </LinearLayout>
        </LinearLayout>
    </RelativeLayout>
```

### JAVA CLASSES

We have two classes or two activities:

1. MainActivity.java
2. SecondActivity.java

#### 1\. MainActivity class

- Our MainActivity.
- We'll pass data from this activity ti the second activity.

```java
    package com.tutorials.hp.primitivespassing;

    import android.content.Intent;
    import android.os.Bundle;
    import android.support.design.widget.FloatingActionButton;
    import android.support.design.widget.TextInputEditText;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
    import android.widget.Button;
    import android.widget.CheckBox;

    public class MainActivity extends AppCompatActivity {

        //DECLARE VIEWS
        private TextInputEditText txtName, txtID;
        private CheckBox chkTechnologyExists;
        private Button sendBtn;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            this.initializeViews();

            FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                }
            });

            //WHEN SEND BTN IS CLICKED,SEND
            sendBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    sendData();
                }
            });
        }

        /*
        REFERENCE VIEWS WE ARE USING
         */
        private void initializeViews() {
            txtName = (TextInputEditText) findViewById(R.id.nameTxt);
            txtID = (TextInputEditText) findViewById(R.id.txtID);
            chkTechnologyExists = (CheckBox) findViewById(R.id.techExists);
            sendBtn = (Button) findViewById(R.id.sendBtn);

        }

        /*
        SEND DATA TO SECOND ACTIVITY
         */
        private void sendData() {
            //GET PRIMITIVE VALUES TO SEND
            String name = txtName.getText().toString();
            int id = Integer.parseInt(txtID.getText().toString());
            Boolean techExists = chkTechnologyExists.isChecked();

            //PACK THEM IN AN INTENT OBJECT
            Intent i = new Intent(this, SecondActivity.class);
            i.putExtra("NAME_KEY", name);
            i.putExtra("ID_KEY", id);
            i.putExtra("TECHEXISTS_KEY", techExists);

            //LETS LEAVE OUR TXTS CLEARED
            txtName.setText("");
            txtID.setText("");

            //START SECOND ACTIVITY
            this.startActivity(i);
        }
    }
```

#### 2\. Second Activity class

- Our second activity.
- Will receive data from main activity and show them in textviews and checkbox.

```java
    package com.tutorials.hp.primitivespassing;

    import android.support.design.widget.TextInputEditText;
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.widget.CheckBox;
    import android.widget.Spinner;
    import android.widget.TextView;
    import android.widget.Toast;

    public class SecondActivity extends AppCompatActivity {

        //DECALRE SECOND ACTIVITY VIEWS
        TextView txtName2;
        TextView txtID2;
        CheckBox chkTechnologyExists2;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_second);

            //INITIALIZE THESE VIEWS
            txtName2 = (TextView) findViewById(R.id.nameTxtSecond);
            txtID2 = (TextView) findViewById(R.id.txtIDSecond);
            chkTechnologyExists2 = (CheckBox) findViewById(R.id.techExistsSecond);

            //RECEIVE DATA FROM MAIN ACTIVITY
            String name = getIntent().getStringExtra("NAME_KEY");
            int id = getIntent().getIntExtra("ID_KEY", 0);
            Boolean techExists = getIntent().getBooleanExtra("TECHEXISTS_KEY", false);

            //SHOW A TOAST
            Toast.makeText(SecondActivity.this, name, Toast.LENGTH_LONG).show();

            //SET THE DATA TO OUR LOCAL VIEWS
            txtName2.setText(name);
            txtID2.setText(String.valueOf(id));
            chkTechnologyExists2.setChecked(techExists);
        }
    }
```

## Android ListActivity

> Android ListActivity Tutorial and Examples.

A ListActivity is an [activity](https://camposha.info/android/activity) that displays a list of items by binding to a data source such as an array or Cursor. ListActivity also exposes to us event handlers when the user selects an item.

This is a class that derives from the [Activity](https://camposha.info/android/activity) class. ListActivity is meant to be used when you plan to use a [ListView](https://camposha.info/android/listview). In fact it does host a ListView object that can be bound to different data sources, typically either an array or a Cursor holding query results.

### ListActivity API Definition

ListActivity, as we've said derives from the Activity class.

```java
public class ListActivity extends Activity
```

Here's it's inheritance hierarchy:

```java
java.lang.Object
   ↳    android.content.Context
       ↳    android.content.ContextWrapper
           ↳    android.view.ContextThemeWrapper
               ↳    android.app.Activity
                   ↳    android.app.ListActivity
```

### List Activity Subclasses

Here are the classes that derive from ListActivity:

| No. | Class | Description |
| --- | --- | --- |
| 1. | LauncherActivity | A class that Displays a list of all activities which can be performed for a given intent. Launches when clicked. |
| 2. | PreferenceActivity | The base class for an activity to show a hierarchy of preferences to the user. |

### Screen Layout

ListActivity has a default layout that consists of a single, full-screen list in the center of the screen. However, if you desire, you can customize the screen layout by setting your own view layout with `setContentView()` in `onCreate()`. To do this, your own view MUST contain a ListView object with the id `"@android:id/list"` (or list if it's in code)

Optionally, your custom view can contain another view object of any type to display when the list view is empty. This "empty list" notifier must have an id `"android:id/empty"`. Note that when an empty view is present, the list view will be hidden when there is no data to display.

The following code demonstrates an (ugly) custom screen layout. It has a list with a green background, and an alternate red "no data" message.

```xml
 <?xml version="1.0" encoding="utf-8"?>
 <LinearLayout
         android_orientation="vertical"
         android_layout_width="match_parent"
         android_layout_height="match_parent"
         android_paddingLeft="8dp"
         android_paddingRight="8dp">

     <ListView android_id="@android:id/list"
               android_layout_width="match_parent"
               android_layout_height="match_parent"
               android_background="#00FF00"
               android_layout_weight="1"
               android_drawSelectorOnTop="false"/>

     <TextView android_id="@android:id/empty"
               android_layout_width="match_parent"
               android_layout_height="match_parent"
               android_background="#FF0000"
               android_text="No data"/>
 </LinearLayout>
```

### Top Android ListActivity Examples

In this section we will look at several full ListActivity examples.

#### 1\. ListActivity and OnItemClick

In this first example we will look at how to populate a ListActivity with data from a simple array. Then we see how to handle OnItemClick events.

##### API's we use

Let's start by defining the several APIs we will use in this example.

**(a). ListActivity**

This class belongs to `android.app`. It is an [activity](https://camposha.info/android/activity) that displays a list of items by binding to a data source such as an array or Cursor, and exposes event handlers when the user selects an item.

**(b). Bundle**

Bundle is a mapping from String values to various Parcelable types.

Read about bundle here.

**(c). View**

This is a class represents the basic building block for user interface components. A View occupies a rectangular area on the screen and is responsible for drawing and event handling.

Read about views here.

**(c). ArrayAdapter**

An arrayadapter is a concrete BaseAdapter that is backed by an array of arbitrary objects. By default this class expects that the provided resource id references a single TextView.

Read about ArrayAdapter here.

**(d). ListView**

A ListView is a view that shows items in a vertically scrolling list. The items come from the ListAdapter associated with this view.

Read about ListView [here](https://camposha.info/android/listview).

#### MyListActivity.java

```java
import android.app.ListActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

public class MyListActivity extends ListActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_my_list);

        String[] values = new String[] { "Android", "iPhone", "WindowsMobile",
                "Blackberry", "WebOS", "Ubuntu", "Windows7", "Max OS X",
                "Linux", "OS/2" };
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,values);
        setListAdapter(adapter);

    }
    @Override
    protected  void  onListItemClick(ListView l, View v, int position, long id){

        String item = (String) getListAdapter().getItem(position);
        Toast.makeText(this, item + " selected", Toast.LENGTH_LONG).show();

    }
}
```

#### activity_my_list.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.codekul.myandroidlistactivity.MyListActivity">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!"
        app_layout_constraintBottom_toBottomOf="parent"
        app_layout_constraintLeft_toLeftOf="parent"
        app_layout_constraintRight_toRightOf="parent"
        app_layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Browse](https://github.com/1sumit/ListActivity/tree/master/app) |
| 2. | GitHub | [Original Creator: @1sumit](https://github.com/1sumit) |

### 2\. ListActivity and ArrayAdapter Example

Let's populate a ListActivity with CatNames then handle Click events. We don't need a layout for this.

#### MainActivity.java

```java
import android.app.ListActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MainActivity extends ListActivity {

    final String[] catNamesArray = new String[] { "Рыжик", "Барсик", "Мурзик",
            "Мурка", "Васька", "Томасина", "Бобик", "Кристина", "Пушок",
            "Дымка", "Кузя", "Китти", "Барбос", "Масяня", "Симба" };
    private ArrayAdapter<String> mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mAdapter = new ArrayAdapter<>(this,
                android.R.layout.simple_list_item_1, catNamesArray);
        setListAdapter(mAdapter);

    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        super.onListItemClick(l, v, position, id);
    }
}
```

Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/disiol/ListActivity/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/disiol/ListActivity/) |
| 2. | GitHub | [Original Creator: @disiol](https://github.com/disiol) |

#### 3\. ListActivity with AsyncTask

#### MainActivity.java

```java

import android.app.ListActivity;
import android.content.Intent;
import android.os.AsyncTask;
import android.view.View;
import android.widget.Adapter;
import android.widget.ListView;

import java.util.List;

public final class AppPickerActivity extends ListActivity {

  private AsyncTask<Object,Object,List<AppInfo>> backgroundTask;

  @Override
  protected void onResume() {
    super.onResume();
    backgroundTask = new LoadPackagesAsyncTask(this);
    backgroundTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
  }

  @Override
  protected void onPause() {
    AsyncTask<?,?,?> task = backgroundTask;
    if (task != null) {
      task.cancel(true);
      backgroundTask = null;
    }
    super.onPause();
  }

  @Override
  protected void onListItemClick(ListView l, View view, int position, long id) {
    Adapter adapter = getListAdapter();
    if (position >= 0 && position < adapter.getCount()) {
      String packageName = ((AppInfo) adapter.getItem(position)).getPackageName();
      Intent intent = new Intent();
      intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
      intent.putExtra("url", "market://details?id=" + packageName);
      setResult(RESULT_OK, intent);
    } else {
      setResult(RESULT_CANCELED);
    }
    finish();
  }

}
```

### 4\. ListActivity - Click to Open New Activity

This is a ListActivity example where we look at how to show items in a ListActivity. Then when the user clicks a single item we open a new activity.

#### MainActivity.java

```java
import android.app.Activity;
import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MainActivity extends ListActivity {

    String[] names;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);

        names = getResources().getStringArray(R.array.friends);
        setListAdapter(new ArrayAdapter<String>(this, R.layout.friend_item, names));

    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        super.onListItemClick(l, v, position, id);

        Intent in = new Intent(this, SecondActivity.class);

        in.putExtra("message", getString(R.string.show_greetings)+ " " + names[(int) id] + "!" );

        startActivity(in);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
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

#### SecondActivity.java

```java
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

public class SecondActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        Intent in = getIntent();

        TextView txtName = (TextView) findViewById(R.id.txtGreetingName);
        txtName.setText(in.getStringExtra("message"));
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_second, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
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

#### activity_main.xml

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    android_paddingBottom="@dimen/activity_vertical_margin"
    tools_context=".MainActivity">

    <TextView android_text="@string/hello_world"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_textSize="24sp"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_layout_marginTop="54dp" />

</RelativeLayout>
```

#### activity_second.xml

```xml
<RelativeLayout
     android_layout_width="match_parent"
    android_layout_height="match_parent" android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    android_paddingBottom="@dimen/activity_vertical_margin"
    tools_context="com.example.paulorogerio.friendgreeting.SecondActivity">

    <TextView android_text="@string/hello_world"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_textSize="24sp"
        android_gravity="center_vertical|center_horizontal"
        android_id="@+id/txtGreetingName"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_layout_marginTop="55dp" />

</RelativeLayout>
```

#### friend_item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android_layout_width="match_parent" android_layout_height="match_parent"
    android_text="Friend Name"
    android_gravity="center_vertical|center_horizontal"
    android_textSize="24sp"
    android_padding="20dp">

</TextView>
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/paulonova/FriendGreeting/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/paulonova/FriendGreeting/) |
| 2. | GitHub | [Original Creator: @paulonova](https://github.com/paulonova) |

#### 5\. ListActivity - Populate From XML stored in Assets

In this example we will look at how to use XmlPullParser to parse XML document stored in the Assets directory of our application. We will then show the parsed xml results which will comprise images and text in our ListActivity.

We will be loading from our XML document title, link and images into our ListView. We will open our XML from the assets folder into an InputStream. Then we will have a `ParseXML()` method which will parse our XML using the XmlPullParser.

ImagesAdapter class will adapt the images and text from the XML into the a custom ListView. It will use the ArrayAdapter as the base adapter class.

#### ParseXML.java

This `ParseXML` is the main activity.

```java
package com.example.parsexml;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.widget.ListView;

public class ParseXML extends Activity {
    InputStream xmlStream;
    ArrayList<ItemData> list;
    XMLHandler handler;
    ListView listView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parse_xml);
        try {
            xmlStream = this.getAssets().open("ItemXML.xml");
            ParseXML();
            list = handler.getItemList();
            LoadImagesFromUrl();
            ImageAdapter adapter = new ImageAdapter(ParseXML.this, R.layout.imagelist, list);
            listView = (ListView) findViewById(R.id.imageList);
            listView.setAdapter(adapter);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_parse_xml, menu);
        return true;
    }

    public void ParseXML(){

        try {
            SAXParserFactory spf = SAXParserFactory.newInstance();
            SAXParser sp = spf.newSAXParser();
            XMLReader reader = sp.getXMLReader();
            handler = new XMLHandler();
            reader.setContentHandler(handler);
            reader.parse(new InputSource(xmlStream));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    public void LoadImagesFromUrl(){
        for (int i=0; i<list.size();i++){
            LoadChart loader = new LoadChart(ParseXML.this, list.get(i).link);
            loader.execute();
            list.get(i).bitmap = loader.getBitmap();
        }
    }
}
```

#### ItemData.java

This is the model class and represents a single XML element that will comprise our ListView item. We will have title, link as well as bitmap.

```java
package com.example.parsexml;

import android.graphics.Bitmap;

public class ItemData {
    String title;
    String link;
    Bitmap bitmap;
    public Bitmap getBitmap() {
        return bitmap;
    }
    public void setBitmap(Bitmap bitmap) {
        this.bitmap = bitmap;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getLink() {
        return link;
    }
    public void setLink(String link) {
        this.link = link;
    }

}
```

#### ImageAdapter.java

This is the custom adapter class, deriving from the `ArrayAdapter`. It uses the ViewHolder pattern to hold the views to be recycled. That ViewHolder is just a simple class to hold TextView and ImageView widgets for recycling, instead of them being inflated everytime the `getView()` method is called.

```java
package com.example.parsexml;

import java.util.List;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class ImageAdapter extends ArrayAdapter{
    ViewHolder holder;
    Context ctx;
    List<ItemData> list;
    LoadChart loader;
    public ImageAdapter(Context context, int textViewResourceId,
            List<ItemData> objects) {
        super(context, textViewResourceId, objects);
        ctx = context;
        list = objects;

        // TODO Auto-generated constructor stub
    }
    private class ViewHolder{
        TextView titleView;
        ImageView img;
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // TODO Auto-generated method stub
        if(convertView == null){
            LayoutInflater inflater = (LayoutInflater) ctx.getSystemService(ctx.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.imagelist, null);
            holder = new ViewHolder();
            holder.img = (ImageView) convertView.findViewById(R.id.linkimage);
            holder.titleView = (TextView) convertView.findViewById(R.id.title);

            convertView.setTag(holder);

        }
        else{
            holder = (ViewHolder) convertView.getTag();
        }
        holder.titleView.setText(list.get(position).title);
        loader = new LoadChart(ctx, holder.img, list.get(position).link);
        loader.execute();

        return convertView;

    }

}
```

#### XMLHandler.java

This class will derive from the `org.xml.sax.helpers.DefaultHandler` class. DefaultHandler is the Default base class for SAX2 event handlers. In this class we override several methods like the `startElement()`, `endElement()` and `characters()`.

```java
package com.example.parsexml;

import java.util.ArrayList;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class XMLHandler extends DefaultHandler{
    private ArrayList<ItemData> itemList = new ArrayList<ItemData>();
    String value = "";
    ItemData item = null;
    Boolean flag = false;

    public ArrayList<ItemData> getItemList() {
        return itemList;
    }

    public void setItemList(ArrayList<ItemData> itemList) {
        this.itemList = itemList;
    }

    @Override
    public void characters(char[] ch, int start, int length)
            throws SAXException {
        // TODO Auto-generated method stub
        if(flag){
            value = new String(ch, start, length);
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName)
            throws SAXException {
        // TODO Auto-generated method stub
        flag = false;

        if(localName.equalsIgnoreCase("title")){
            item.setTitle(value);
        }
        if(localName.equalsIgnoreCase("link")){
            item.setLink(value);
        }
        if(localName.equalsIgnoreCase("item")){
            itemList.add(item);
        }

    }

    @Override
    public void startElement(String uri, String localName, String qName,
            Attributes attributes) throws SAXException {
        // TODO Auto-generated method stub
        flag = true;
        value = "";
        if(localName.equalsIgnoreCase("item")){
            item = new ItemData();

        }
    }

}
```

#### LoadChart.java

This class will derive from the abstract asynctask class. Thus this allows us load our XML in a separate thread.

```java
package com.example.parsexml;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

public class LoadChart extends AsyncTask<Void, Void, Bitmap> {
    private ImageView img;
    private Context con;
    static String urlString ;
    Bitmap bitmap= null;

    public Bitmap getBitmap() {
        return bitmap;
    }

    public void setBitmap(Bitmap bitmap) {
        this.bitmap = bitmap;
    }

    public LoadChart(Context context, ImageView img1, String url) {
        this.img = img1;
        this.con = context;
        urlString = url;
    }

    public LoadChart(Context context, String url) {
        this.urlString = url;
        this.con = context;
    }

    @Override
    protected void onPreExecute() {

        super.onPreExecute();
    }

    @Override
    protected Bitmap doInBackground(Void... params) {

        Bitmap bitmap = DownloadImage();

        return bitmap;
    }

    @Override
    protected void onPostExecute(Bitmap bitmap) {
        this.bitmap = bitmap;
        //img.setImageBitmap(bitmap);

    }

    private static InputStream OpenHttpConnection(String urlString)
            throws IOException {

        Log.d("palval", "OpenHttpConnection");
        InputStream in = null;
        int response = -1;

        URL url = new URL(urlString);
        URLConnection conn = url.openConnection();

        if (!(conn instanceof HttpURLConnection))
            throw new IOException("Not an HTTP connection");

        try {
            HttpURLConnection httpConn = (HttpURLConnection) conn;
            httpConn.setAllowUserInteraction(false);
            httpConn.setInstanceFollowRedirects(true);
            httpConn.setRequestMethod("GET");
            httpConn.connect();

            response = httpConn.getResponseCode();

            if (response == HttpURLConnection.HTTP_OK) {
                in = httpConn.getInputStream();
            }

            String res = Integer.toString(response);
        } catch (Exception ex) {
            throw new IOException("Error connecting");
        }
        return in;
    }

    public static Bitmap DownloadImage() {
        Log.d("palval", "DownloadImage");
        Bitmap bitmap = null;
        InputStream in = null;
        try {

             //in = OpenHttpConnection("https://chart.googleapis.com/chart?chs=440x220&chd=t:60,40&cht=p3&chl=Hello|World");
            in = OpenHttpConnection(urlString);
            bitmap = BitmapFactory.decodeStream(in);
            in.close();
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        return bitmap;
    }

}
```

**Download**

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | Download |
| 2. | GitHub | [Browse](https://github.com/bansal2211/ParseXML) |
| 2. | GitHub | [Original Creator: @bansal2211](https://github.com/bansal2211) |

## Android ListActivity - With Images,Text and OnItemClick ArrayAdapter

_Android ListActivity Images Text_

This is an android custom listview tutorial.How to show images and text in a listview.We are using arrayadapter as our adapter of choice.We also see how to handle custom listview itemclicks.

#### Section 1 : CustomAdapter Class

This is our CustomAdapter class. It will subclass `android.widget.ArrayAdapter`. Read more about ArrayAdapter here.

It is our Adapter class.

```java
    package com.tutorials.customlistviewarrayadapter;

    import android.content.Context;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.ArrayAdapter;
    import android.widget.ImageView;
    import android.widget.TextView;

    public class CustomAdapter extends ArrayAdapter<String>{

      final Context c;
      String[] values;

      //CONSTRUCTOR
      public CustomAdapter(Context context, String[] values) {
        super(context,R.layout.activity_main, values);

        this.c=context;
        this.values=values;

      }

      @Override
      public View getView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflator=(LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        //INFLATE OUR XML LAYOUT TO ROW
        View row=inflator.inflate(R.layout.activity_main, parent,false);

        //DECLARE FIELDS CONTAINED IN OUR LAYOUR
        TextView tv=(TextView) row.findViewById(R.id.textView1);
        ImageView img=(ImageView) row.findViewById(R.id.imageView1);

        //GET AN ITEM FROM ARRAY
        String item=values[position];

        //DYNAMICALLY SET TEXT AND IMAGES DEPENDING ON ITEM IN ARRAY
        if(item.equals("android"))
        {
          tv.setText(item+" Programming language");
          img.setImageResource(R.drawable.android);
        }else if(item.equals("java"))
        {
          tv.setText(item+" Programming language");
          img.setImageResource(R.drawable.java);
        }else if(item.equals("c#"))
        {
          tv.setText(item+" Programming language");
          img.setImageResource(R.drawable.csharp);
        }else if(item.equals("mysql"))
        {
          tv.setText(item+" Database language");
          img.setImageResource(R.drawable.mysql);
        }else if(item.equals("access"))
        {
          tv.setText(item+" Database language");
          img.setImageResource(R.drawable.access);
        }else if(item.equals("excel"))
        {
          tv.setText(item+" Microsoft");
          img.setImageResource(R.drawable.excel);
        }

        return row;
      }

    }
```

#### Section 2 : MainActivity

Our main activity. It will subclass the ListActivity class.

```java
package com.tutorials.customlistviewarrayadapter;

import android.app.ListActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;
import android.widget.Toast;

public class MainActivity extends ListActivity {

  String[] languages={"android","java","c#","mysql","access","excel"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
      //  setContentView(R.layout.activity_main);

        CustomAdapter adapter=new CustomAdapter(this, languages);
        setListAdapter(adapter);
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        // TODO Auto-generated method stub
        super.onListItemClick(l, v, position, id);

        String item=(String) getListAdapter().getItem(position);

        Toast.makeText(getApplicationContext(),"Welcome to "+ item+" Programming language", Toast.LENGTH_SHORT).show();
    }
}
```

````

#### Section 3 : Layouts

##### ActivityMain.xml
Our main activity's layout.
```xml
    
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context=".MainActivity" >

        

        

    
````

Good day.
