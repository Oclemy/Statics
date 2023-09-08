# Cofi

>  Simple coffee timer.

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/featureGraphic.jpg)

![Cofi Example Tutorial](https://github.com/rozPierog/Cofi/workflows/Android%20CI/badge.svg)

![Cofi Tutorial](https://camo.githubusercontent.com/4aea0768f5e45f03105ffb928c3def4f27536aa13749ba002711a65b46b034c1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d32332532422d626c75653f6c6f676f3d616e64726f69642d73747564696f)

![Cofi Tutorial](https://camo.githubusercontent.com/20f71a5027d60f0f69d7218f207a9598a707dac55a9245191f42a069e3052fd7/68747470733a2f2f696d672e736869656c64732e696f2f662d64726f69642f762f636f6d2e6f6d656c616e2e636f66692e737667)

![Cofi Tutorial](https://camo.githubusercontent.com/d62fa8336ef9a3adc8c19f9f1d70da01cbc873d80e96241f68016e4e2cecd657/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f726f7a506965726f672f436f66692e7376673f696e636c7564655f70726572656c65617365733f6c6f676f3d676974687562)


### Download

![Cofi Tutorial](https://user-images.githubusercontent.com/23499434/105481420-4f9e4b80-5ca7-11eb-93a8-68ec63e55d00.png)

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/docs/assets/get-github.png)

![Cofi Tutorial](https://camo.githubusercontent.com/16dfb987afb6c25d8d861680d279611161f98237503e0607d97e28461a259354/68747470733a2f2f6664726f69642e6769746c61622e696f2f617274776f726b2f62616467652f6765742d69742d6f6e2e706e67)


### Screenshots
|
|Android|![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/docs/assets/cofi_showcase.gif)

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/1_en-US.png)

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/5_en-US.png)

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/4_en-US.png)


|WearOS|![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/wearScreenshots/1_en-US.png)

![Cofi Tutorial](https://github.com/rozPierog/Cofi/raw/main/fastlane/metadata/android/en-US/images/wearScreenshots/2_en-US.png)


[GNU GENERAL PUBLIC LICENSE Version 3](/rozPierog/Cofi/blob/main/LICENSE)


Let us look at the full Cofi code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 13 dependencies:


Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'kotlin-kapt'
    id 'com.jaredsburrows.license'
}

def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        if (keystoreProperties.containsKey('storeFile')) {
            release {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile rootProject.file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }

    defaultConfig {
        applicationId "com.omelan.cofi"
        minSdkVersion 25
        targetSdkVersion 33
        compileSdkVersion 33
        versionCode 102
        versionName "1.11.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        resConfigs 'en', 'pl', 'it', 'de', 'tr', 'nl'
        manifestPlaceholders = [profileable: false]

    }

    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig keystoreProperties.containsKey('storeFile') ?
                    signingConfigs.release : signingConfigs.debug
        }

        debug {
            debuggable true
            applicationIdSuffix ".debug"
            versionNameSuffix "-debug"
        }

        benchmark {
            signingConfig signingConfigs.debug
            minifyEnabled true
            manifestPlaceholders["profileable"] = true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            applicationIdSuffix ".benchmark"
            versionNameSuffix "-benchmark"
        }
    }

    flavorDimensions "version"
    productFlavors {
        instant {
            dimension "version"
            versionCode android.defaultConfig.versionCode - 1
            versionNameSuffix "-instant"
            minSdkVersion 26
        }
        playStore {
            dimension "version"
        }
        full {
            dimension "version"
            versionCode android.defaultConfig.versionCode
        }
    }

    buildFeatures {
        // Enables Jetpack Compose for this module
        compose true
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11

    }


    kotlinOptions {
        jvmTarget = "11"
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.3.0"
    }
    packagingOptions {
        resources {
            excludes += ['META-INF/DEPENDENCIES',
                         'META-INF/LICENSE',
                         'META-INF/LICENSE.txt',
                         'META-INF/license.txt',
                         'META-INF/NOTICE',
                         'META-INF/NOTICE.txt',
                         'META-INF/notice.txt',
                         'META-INF/ASL2.0',
                         'META-INF/AL2.0',
                         'META-INF/LGPL2.1',
                         'META-INF/*.kotlin_module']
        }
    }


    sourceSets {
        // Adds exported schema location as test app assets.
        androidTest.assets.srcDirs += files("$projectDir/schemas".toString())
    }
    namespace 'com.omelan.cofi'

}

licenseReport {
    generateCsvReport = false
    generateHtmlReport = false
    generateJsonReport = true
    // These options are ignored for Java projects
    copyHtmlReportToAssets = false
    copyHtmlReportToAssets = false
    copyJsonReportToAssets = true
}

configurations {
    ktlint
}

dependencies {
    implementation project(path: ':cofi-share')
    ktlint("com.pinterest:ktlint:0.47.1") {
        attributes {
            attribute(Bundling.BUNDLING_ATTRIBUTE, getObjects().named(Bundling, Bundling.EXTERNAL))
        }
    }

    instantImplementation('com.google.android.gms:play-services-instantapps:18.0.1')
    playStoreImplementation 'com.google.android.gms:play-services-wearable:18.0.0'
    playStoreImplementation "androidx.wear:wear-remote-interactions:1.0.0"

    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.6.4'

    // Tooling support (Previews, etc.)
    debugImplementation "androidx.compose.ui:ui-tooling:$compose_version"
    implementation "androidx.compose.ui:ui-tooling-preview:$compose_version"

    // Material Design
    implementation "androidx.compose.material3:material3:1.0.1"
    implementation "androidx.compose.material3:material3-window-size-class:1.0.1"

    implementation 'com.github.KieronQuinn:MonetCompat:0.2.1'
    implementation 'androidx.palette:palette-ktx:1.0.0'
    // Navigation
    implementation "androidx.navigation:navigation-compose:2.5.3"

    // Integration with observables
    implementation "androidx.compose.runtime:runtime-livedata:$compose_version"
    // Jetpack Utils
    implementation "com.google.accompanist:accompanist-flowlayout:0.26.4-beta"
    implementation "com.google.accompanist:accompanist-systemuicontroller:0.26.4-beta"
    implementation "com.google.accompanist:accompanist-navigation-animation:0.26.4-beta"
    implementation "androidx.compose.animation:animation-graphics:$compose_version"

    implementation "androidx.activity:activity-compose:1.6.1"

    // UI Tests
    androidTestImplementation "androidx.compose.ui:ui-test-junit4:$compose_version"
    testImplementation 'junit:junit:4.13.2'
}

task ktlint(type: JavaExec, group: "verification") {
    description = "Check Kotlin code style."
    classpath = configurations.ktlint
    mainClass.set("com.pinterest.ktlint.Main")
    args "src/**/*.kt"
    jvmArgs("--add-opens", "java.base/java.lang=ALL-UNNAMED")
}
check.dependsOn ktlint

task ktlintFormat(type: JavaExec, group: "formatting") {
    description = "Fix Kotlin code style deviations."
    classpath = configurations.ktlint
    mainClass.set("com.pinterest.ktlint.Main")
    args "-F", "src/**/*.kt"
    jvmArgs("--add-opens", "java.base/java.lang=ALL-UNNAMED")
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/rozPierog/Cofi/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/rozPierog/Cofi).|
|3.|Follow code author [here](https://github.com/rozPierog).|
