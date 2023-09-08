# BodhiTimer

>  Elegant, minimalist countdown timer for Android.

Bodhi Timer is an elegant, minimalist countdown timer. It is designed mainly for use as a meditation timer but can easily be used for any similar purpose. Bodhi Timer is free and [open-source](https://github.com/yuttadhammo/BodhiTimer) software. It collects no data and uses the minimal permissions necessary.

### Install

![BodhiTimer Tutorial](https://camo.githubusercontent.com/fefd7089be3e793fb7858c5965f46e046d5bb78eac6d7f5bdd11f3e737b226a4/68747470733a2f2f662d64726f69642e6f72672f62616467652f6765742d69742d6f6e2e706e67)


### Screenshots

|Timer|Setting up timer|Customization|Settings|![BodhiTimer Tutorial](https://github.com/yuttadhammo/BodhiTimer/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/1_en-US.png)

![BodhiTimer Tutorial](https://github.com/yuttadhammo/BodhiTimer/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/2_en-US.png)

![BodhiTimer Tutorial](https://github.com/yuttadhammo/BodhiTimer/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/3_en-US.png)

![BodhiTimer Tutorial](https://github.com/yuttadhammo/BodhiTimer/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/4_en-US.png)


### How to use


Set the time via the clock icon in the top left. You may set presets by choosing a time then holding down on one of the three preset buttons.

Pause / resume via the button in the bottom left, and stop the timer via the button in the bottom right. The top right button is the preference button.

Animation may be toggled between an image and one of four circle animations, chosen from the preferences screen.

It uses Android's built-in notification system to trigger the alarm, which means it works even when your device is asleep.

### Features


- minimalist full screen UI, no clutter
- uses scroll and fling gestures to set the time
- set up to three presets on the time chooser
- option for timer auto-repeating
- option to set multiple consecutive timers via the "adv" button
- speech recognition via long-press on clock button (set multiple timers separated by the word "again")
- displays two animation types: fade in static image (defaults to Bodhi leaf) and animated circle
- option to use custom image for fade in
- four themes for the animated circle: three colour themes and a draw in Zen Enso (brush circle)
- includes different meditation timer sounds (Burmese bell, Tibetan bell, Tibetan singing bowls, Zen gong, and bird song)
- option to use any ring tone as timer sound
- option to use custom sound file as timer sound
- vibration and LED blinking options
- other apps can start an alarm using a deep link like bodhi://timer?times=60,120
- licensed under the GPL 3+

minimalist full screen UI, no clutter

uses scroll and fling gestures to set the time

set up to three presets on the time chooser

option for timer auto-repeating

option to set multiple consecutive timers via the "adv" button

speech recognition via long-press on clock button (set multiple timers separated by the word "again")

displays two animation types: fade in static image (defaults to Bodhi leaf) and animated circle

option to use custom image for fade in

four themes for the animated circle: three colour themes and a draw in Zen Enso (brush circle)

includes different meditation timer sounds (Burmese bell, Tibetan bell, Tibetan singing bowls, Zen gong, and bird song)

option to use any ring tone as timer sound

option to use custom sound file as timer sound

vibration and LED blinking options

other apps can start an alarm using a deep link like `bodhi://timer?times=60,120`

licensed under the [GPL 3+](https://www.gnu.org/licenses/gpl.html)

Let us look at the full BodhiTimer code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 2 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 8 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'

def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "org.yuttadhammo.BodhiTimer"
        minSdkVersion 23
        targetSdkVersion 33
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-project.txt'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    namespace 'org.yuttadhammo.BodhiTimer'

}

dependencies {
    def lifecycle_version = '2.5.1'

    implementation 'androidx.vectordrawable:vectordrawable:1.1.0'
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    implementation "com.jakewharton.timber:timber:5.0.1"
    implementation 'androidx.preference:preference-ktx:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'com.google.android.material:material:1.7.0'
    androidTestImplementation 'tools.fastlane:screengrab:2.1.1'
    implementation "androidx.core:core-ktx:1.9.0"
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.0'
    androidTestImplementation 'androidx.test:runner:1.5.1'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'tools.fastlane:screengrab:2.1.1'
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
|1.|[Download Full Code](https://github.com/yuttadhammo/BodhiTimer/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/yuttadhammo/BodhiTimer).|
|3.|Follow code author [here](https://github.com/yuttadhammo).|
