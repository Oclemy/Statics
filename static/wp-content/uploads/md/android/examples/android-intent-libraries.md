# Best Android Intent Libraries

In this tutorial we will look at some of the best android intent libraries.


## (a). Omega Intent Builder

In this piece we want to look at how several intent operations can be done using a library known as Omega Intent Builder. These are common operations that we need in almost all the apps we create. Omega IntentBuilder abstracts these operations allowing us to perform them using only a minimal amount of code.

**Installation**

The first step is to install Omega Intent. It's hosted in jitpack so we have to register jitpack as a repository in our project-level build.gradle file.

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

This library should be installed depending on the language you plan to use.

For Java:

```groovy
dependencies {
    implementation 'com.github.Omega-R.OmegaIntentBuilder:core:1.1.4'
    // For extras
    implementation 'com.github.Omega-R.OmegaIntentBuilder:annotations:1.1.4'
    annotationProcessor 'com.github.Omega-R.OmegaIntentBuilder:processor:1.1.4'

    // AndroidX
    implementation 'com.github.Omega-R.OmegaIntentBuilder:core:1.1.6'
    // For extras
    implementation 'com.github.Omega-R.OmegaIntentBuilder:annotations:1.1.6'
    annotationProcessor 'com.github.Omega-R.OmegaIntentBuilder:processor:1.1.6'
}
```

For Kotlin:

For Kotlin rather than the annotation processor you use kapt:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-kapt'

kapt {
    generateStubs = true
}

android {
    ......
}

dependencies {
    implementation 'com.github.Omega-R.OmegaIntentBuilder:core:1.1.4'
    // For extras
    implementation 'com.github.Omega-R.OmegaIntentBuilder:annotations:1.1.4'
    kapt 'com.github.Omega-R.OmegaIntentBuilder:processor:1.1.4'

    // AndroidX
    implementation 'com.github.Omega-R.OmegaIntentBuilder:core:1.1.5'
    // For extras
    implementation 'com.github.Omega-R.OmegaIntentBuilder:annotations:1.1.5'
    kapt 'com.github.Omega-R.OmegaIntentBuilder:processor:1.1.5'
}
```

Lets proceed.

### 1.Activity

**(a). How to Open Another Activity**

To open an activity without passing any data:

```java
OmegaIntentBuilder.from(this)
                .activity(PhotoCaptureActivity.class)
                .startActivity();
```

**(b). How to Pass Data to an activity**

To pass some extras:

```java
OmegaIntentBuilder.from(this)
                .activity(PhotoCaptureActivity.class)
                .putExtra("Your_key", Integer.MAX_VALUE)
                .putExtra("Your_key2", Integer.MIN_VALUE)
                .startActivity();
```

To catch an exception while passing data:

```java
       OmegaIntentBuilder.from(this)
                .activity(PhotoCaptureActivity.class)
                .putExtra("Your_key", Integer.MAX_VALUE)
                .putExtra("Your_key2", Integer.MIN_VALUE)
                .createIntentHandler()
                .failCallback(new FailCallback() {
                    @Override
                    public void onActivityStartError(@NotNull Exception exc) {
                        // you can handle error here
                    }
                })
                .failToast("Error")
                .startActivity();
```

**(d). Activity Extras**

Simple way to create and put data from one activity to another activity.

- @OmegaActivity - annotation for activity.
- @OmegaExtraModel - annotation for classes, which will be putted to bundle.
- @OmegaExtra - annotation for fields, which will be putted to bundle.

@OmegaExtraModel and @OmegaExtra support prefix for generated method name. If you wan't annotate your class with @OmegaExtra - this class should be implements Serializable

[](https://github.com/Omega-R/OmegaIntentBuilder/wiki/Activity-Extras-builder#first-step---annotate-your-activity-with-omegaactivity)First step - annotate your activity with @OmegaActivity

[](https://github.com/Omega-R/OmegaIntentBuilder/wiki/Activity-Extras-builder#second-step---annotate-fields-with-omegaextramodel-or-omegaextra)Second step - annotate fields with @OmegaExtraModel or @OmegaExtra

```java
@OmegaActivity
public class ShareFilesActivity extends Activity {

    @OmegaExtra
    protected String url1;

    @OmegaExtraModel(prefix = "model")
    Model model = new Model();

    @OmegaExtra()
    Model modelTwo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_share_files);
        AppOmegaIntentBuilder.inject(this);
    }
}
```

Third step - don't forget write AppOmegaIntentBuilder.inject(this); in onCreate method.

Model class

```java
public class Model implements Serializable {
    @OmegaExtra("Var2")
    String url;

    public String getUrl() {
        return url;
    }
}
```

Fourth step - fill out your data and start activity.

```java
public class MainActivity extends Acitity {

AppOmegaIntentBuilder.from(context)
                .appActivities()
                .shareFilesActivity()
                .url1("https://developer.android.com/studio/images/hero_image_studio.png")
                .modelVar2("https://avatars1.githubusercontent.com/u/28600571?s=200&v=4")
                .startActivity();

}
```

Also you cant use @OmegaActivity just for start activity.

```java
AppOmegaIntentBuilder.from(this)
                .appActivities()
                .shareFilesActivity()
                .startActivity();
```

**(d). Fragment Extras Builder**

Simple way to create and put data to fragment.

- @OmegaFragment - annotation for fragments.
- @OmegaExtraModel - annotation for classes, which will be putted to bundle.
- @OmegaExtra - annotation for fields, which will be putted to bundle.

@OmegaExtraModel and @OmegaExtra support prefix for generated method name. If you wan't annotate your class with @OmegaExtra - this class should be implements Serializable

[](https://github.com/Omega-R/OmegaIntentBuilder/wiki/Fragment-Extras-Builder#first-step---annotate-your-fragment-with-omegafragment)First step - annotate your fragment with @OmegaFragment

[](https://github.com/Omega-R/OmegaIntentBuilder/wiki/Fragment-Extras-Builder#second-step---annotate-fields-with-omegaextramodel-or-omegaextra)Second step - annotate fields with @OmegaExtraModel or @OmegaExtra

```java
@OmegaFragment
public class FirstFragment extends BaseFragment {

    @OmegaExtra
    String value;

    @OmegaExtraModel
    Model model;

    public FirstFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        AppOmegaFragmentBuilder.inject(this);
    }
```

Third step - don't forget write AppOmegaFragmentBuilder.inject(this) in onCreate method.

Model class

```java
public class Model implements Serializable {
    @OmegaExtra("Var2")
    String url;

    public String getUrl() {
        return url;
    }
}
```

Fourth step - fill out your data.

```java
AppOmegaFragmentBuilder.secondFragment()
                       .value("Second fragment")
                       .createFragment();
```

## IntentLogger

We use intents to pass messages and content in android and sometimes you want to dump that content in the logcat for debugging purposes. This piece explores how to do it using an open source library.

**Step 1: Installation**

Install the library from jcenter:

```groovy
implementation 'com.drivemode:IntentLogger:1.0.5@aar'
```

**Step 2: Code**

Then call the dump method of the IntentLogger class:

```java
public class MainActivity extends Activity {
    public static final String TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        IntentLogger.dump("test", getIntent());
    }
}
```

**Result**

Here is the log result:

```shell
app V/test﹕ Intent[172e5d96] content:
app V/test﹕ Action   : android.intent.action.MAIN
app V/test﹕ Category : {android.intent.category.LAUNCHER}
app V/test﹕ Data     : null
app V/test﹕ Component: com.drivemode.intentlog.app/com.drivemode.intentlog.app.MainActivity
app V/test﹕ Flags    : 10000001100000000000000000000
app V/test﹕ Flag     : FLAG_RECEIVER_FOREGROUND
app V/test﹕ Flag     : FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY
app V/test﹕ Flag     : FLAG_ACTIVITY_RESET_TASK_IF_NEEDED
app V/test﹕ HasExtras: true
app V/test﹕ Extra[profile] :0
```

That's it.

**Links**

1. Download Code [here](https://github.com/Drivemode/IntentLogger).
2. Thanks to [@Drivemode](https://github.com/Drivemode/) for this example.
