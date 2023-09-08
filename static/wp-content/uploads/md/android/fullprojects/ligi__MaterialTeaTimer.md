# Material Tea Timer

>  A material tea-timer for android.

![Material Tea Timer Tutorial](https://camo.githubusercontent.com/1e5a037109325fd92af819813285f3e273684cbfb07e5cf135e6e69ea6e08297/687474703a2f2f6c6967692e64652f696d672f706c61795f62616467652e706e67)

![Material Tea Timer Tutorial](https://camo.githubusercontent.com/3ecb237f76c63e861913fa885f0aa0dd72ec35264b3fd793d36e387955c4895d/687474703a2f2f6c6967692e64652f696d672f6664726f69645f62616467652e706e67)


### What is this

This project emerged as a tea-timer is something I nearly use every day and the app I was using so far was not ideal to me. I used the only tea timer so far on FDroid which was working but visually not really pleasing and required more clicks than needed.

![MaterialTeaTimer Example Tutorial](https://github.com/ligi/MaterialTeaTimer/raw/master/assets/1024x500.png)


Let us look at the full Material Tea Timer code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 8 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `de.mobilej.unmock` plugin.
5. Our `com.github.ben-manes.versions` plugin.
6. Our `com.trevjonez.composer` plugin.
7. Our `org.jetbrains.kotlin.android.extensions` plugin.
8. Our `com.google.gms.google-services` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 10 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'de.mobilej.unmock'
apply plugin: 'com.github.ben-manes.versions'
apply plugin: 'com.trevjonez.composer'
apply plugin: 'org.jetbrains.kotlin.android.extensions'

android {
    compileSdkVersion 28

    defaultConfig {
        applicationId "org.ligi.materialteatimer"
        minSdkVersion 14
        targetSdkVersion 28
        versionCode 14
        versionName "1.4"
        vectorDrawables.useSupportLibrary = true
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        archivesBaseName = "MaterialTeaTimer-$versionName"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    flavorDimensions "fire", "store"

    productFlavors {

        withFirebase {
            dimension "fire"
        }

        noFirebase {
            dimension "fire"
        }

        forFDroid {
            dimension "store"
            buildConfigField 'String', 'STORE', '"fdroid"'
        }

        forAmazon {
            dimension "store"
            buildConfigField 'String', 'STORE', '"amazon"'
        }

        forPlay {
            dimension "store"
            buildConfigField 'String', 'STORE', '"play"'
        }
    }

    android.variantFilter { variant ->
        def fireBase = variant.getFlavors().get(0).name
        def store = variant.getFlavors().get(1).name

        variant.setIgnore((project.hasProperty("singleFlavor") && (store != 'forPlay') && (build != 'prod')) ||
                ((store == 'forAmazon' || store == 'forPlay') && fireBase == 'noFirebase') ||
                (store == 'forFDroid' && fireBase != 'noFirebase'))

    }


    packagingOptions {
        // needed for assertJ
        exclude 'asm-license.txt'
        exclude 'LICENSE'
        exclude 'NOTICE'

        // hack for instrumentation testing :-(
        exclude 'LICENSE.txt'

        exclude 'META-INF/maven/com.google.guava/guava/pom.properties'
        exclude 'META-INF/maven/com.google.guava/guava/pom.xml'
    }

    lintOptions {
        warning 'MissingTranslation'
    }
}

dependencies {

    testImplementation 'junit:junit:4.12'
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"

    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.percentlayout:percentlayout:1.0.0'

    implementation "com.chibatching.kotpref:kotpref:$kotpref_version"
    implementation "com.chibatching.kotpref:initializer:$kotpref_version"

    implementation 'com.github.ligi:ExtraCompats:1.0'
    implementation 'com.github.ligi:KAXT:1.0'

    withFirebaseImplementation 'com.google.firebase:firebase-core:11.8.0'

    androidTestImplementation 'androidx.appcompat:appcompat:1.0.2'
    androidTestImplementation 'com.google.android.material:material:1.0.0'

    androidTestImplementation 'androidx.test.espresso:espresso-intents:3.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.2.0'
    androidTestImplementation 'com.github.ligi:trulesk:0.28'
}

if (hasProperty("gms")) {
    apply plugin: 'com.google.gms.google-services'
}

android.applicationVariants.all { variant ->
    if (!variant.name.contains("oFirebase")) {
        project.tasks.each { t ->
            if (t.name.contains("GoogleServices")) {
                // Remove google services plugin
                variant.getVariantData().resourceGenTask.getTaskDependencies().values.remove(t);
            }
        }
    }
}
```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/ligi/MaterialTeaTimer/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/ligi/MaterialTeaTimer).|
|3.|Follow code author [here](https://github.com/ligi).|
