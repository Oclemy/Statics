# Frest TimeTracker

A simple time tracker for Android. Allows you to create projects, track them, and watch your statistics

### Screenshots:

![Frest TimeTracker Tutorial](https://github.com/arsvechkarev/Frest/raw/master/screenshots/img_projects.png)

![Frest TimeTracker Tutorial](https://github.com/arsvechkarev/Frest/raw/master/screenshots/img_timeline.png)

![Frest TimeTracker Tutorial](https://github.com/arsvechkarev/Frest/raw/master/screenshots/img_daily_reports.png)

![Frest TimeTracker Tutorial](https://github.com/arsvechkarev/Frest/raw/master/screenshots/img_project_reports.png)

Let us look at the full Frest TimeTracker code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 4 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `kotlin-kapt` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 12 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'

android {
  signingConfigs {
    release {
      Properties properties = new Properties()
      properties.load(project.rootProject.file('local.properties').newDataInputStream())

      def keystorePath = properties.getProperty('keystore.path')
      def keystorePassword = properties.getProperty('keystore.storePassword')
      def keystoreKeyAlias = properties.getProperty('keystore.keyAlias')
      def keystoreKeyPassword = properties.getProperty('keystore.keyPassword')

      storeFile file(keystorePath)
      storePassword(keystorePassword)
      keyAlias = keystoreKeyAlias
      keyPassword(keystoreKeyPassword)
    }
  }

  def configs = rootProject.ext

  compileSdkVersion configs.compileSdkVersion
  defaultConfig {
    applicationId configs.applicationId
    minSdkVersion configs.minSdkVersion
    targetSdkVersion configs.targetSdkVersion
    versionCode configs.versionCode
    versionName configs.versionName
    testInstrumentationRunner configs.testInstrumentationRunner
    vectorDrawables.useSupportLibrary = configs.useSupportLibraryInVectorDrawables
  }
  buildTypes {
    release {
      minifyEnabled configs.minifyEnabled
      shrinkResources configs.shrinkResources
      proguardFiles(getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro')
      signingConfig signingConfigs.release
    }
  }
  compileOptions {
    sourceCompatibility = '1.8'
    targetCompatibility = '1.8'
  }
}

repositories {
  mavenCentral()
}

dependencies {
  def appDependencies = rootProject.ext.applicationDependencies
  def testDependencies = rootProject.ext.testDependencies

  implementation appDependencies.kotlin
  implementation appDependencies.appCompat
  implementation appDependencies.legacySupport
  implementation appDependencies.vectorDrawable
  implementation appDependencies.materialDesign
  implementation appDependencies.constraintLayout

  implementation appDependencies.recyclerView
  implementation appDependencies.eventBus
  implementation appDependencies.mpAndroidChart
  implementation appDependencies.coroutines

  implementation appDependencies.butterknife
  annotationProcessor appDependencies.butterknifeCompiler
  kapt appDependencies.butterknifeCompiler

  implementation appDependencies.timerx

  testImplementation testDependencies.junit
  testImplementation testDependencies.mockito
  androidTestImplementation testDependencies.testRunner
  androidTestImplementation testDependencies.espresso
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/arsvechkarev/Frest/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/arsvechkarev/Frest).|
|3.|Follow code author [here](https://github.com/arsvechkarev).|
