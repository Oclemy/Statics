# ProgressBars Timer App

>  Android countdown / timer app.

![ProgressBars Timer App Tutorial](https://camo.githubusercontent.com/16dfb987afb6c25d8d861680d279611161f98237503e0607d97e28461a259354/68747470733a2f2f6664726f69642e6769746c61622e696f2f617274776f726b2f62616467652f6765742d69742d6f6e2e706e67)

![ProgressBars Timer App Tutorial](https://camo.githubusercontent.com/68b69c9e16ee529bdd2540b7f7033afc8de0535966d2c36ee3878410f799f270/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e2d706c61792d62616467652e706e67)


ProgressBars is a simple timer / countdown app for Android.
![ProgressBars Timer App Tutorial](https://github.com/mattvchandler/ProgressBars/raw/master/metadata/en-US/images/phoneScreenshots/scrn_phone_land_1.png?raw=true)


### Basic Features

- Countdown/up to/from a specified time
- Percentage complete for a time interval
- Notifications on timer completion
- Swipe to delete timers
- Drag to reorder timers

- Years
- Months
- Weeks
- Days
- Hours
- Minutes
- Seconds

Android countdown / timer app

Let us look at the full ProgressBars Timer App code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 8 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    dataBinding.enabled = true
    defaultConfig {
        applicationId "org.mattvchandler.progressbars"
        minSdkVersion 19
        targetSdkVersion 29
        versionName "2.1.1"
        // version code is <MIN_SDK>0<2-digit MAJOR><2-digit MINOR><2-digit PATCH>
        versionCode 190020101
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables.useSupportLibrary = true
    }
    compileOptions {
        sourceCompatibility = 1.8
        targetCompatibility = 1.8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    productFlavors {
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.core:core-ktx:1.3.0-alpha01'
    implementation 'androidx.core:core:1.3.0-alpha01'
    implementation 'androidx.preference:preference:1.1.0'
    implementation 'androidx.recyclerview:recyclerview:1.2.0-alpha01'
    implementation 'com.google.android.material:material:1.2.0-alpha05'
}
repositories {
    mavenCentral()
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/mattvchandler/ProgressBars/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/mattvchandler/ProgressBars).|
|3.|Follow code author [here](https://github.com/mattvchandler).|
