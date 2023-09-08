# Vault Password Manager

 Secure, fast, simple and beautiful password manager

#### Screenshots:

![Vault Password Manager Tutorial](https://github.com/arsvechkarev/Vault/raw/master/android-app/screenshots/screenshot_welcome.png)

![Vault Password Manager Tutorial](https://github.com/arsvechkarev/Vault/raw/master/android-app/screenshots/screenshot_create_master_password.png)

![Vault Password Manager Tutorial](https://github.com/arsvechkarev/Vault/raw/master/android-app/screenshots/screenshot_passwords_list.png)

![Vault Password Manager Tutorial](https://github.com/arsvechkarev/Vault/raw/master/android-app/screenshots/screenshot_service_info.png)

![Vault Password Manager Tutorial](https://github.com/arsvechkarev/Vault/raw/master/android-app/screenshots/screenshot_password_edit.png)


#### Technology stack:

- Kotlin
- Unit testing (junit)
- Custom cicerone-like navigation
- Custom UI library

Let us look at the full Vault Password Manager code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 12 dependencies:


Here is our full `app/build.gradle`:

```groovy
plugins {
  id 'com.android.application'
  id 'kotlin-android'
  id 'kotlin-kapt'
  id 'kotlin-parcelize'
}

android {
  signingConfigs {
    Properties properties = new Properties()
    properties.load(new FileInputStream(file("../../local.properties")))
    release {
      storeFile file(properties["keystoreFile"])
      storePassword properties["keystorePassword"]
      keyAlias properties["keyAlias"]
      keyPassword properties["keyPassword"]
    }
  }
  def ext = rootProject.ext
  compileSdkVersion ext.compileSdkVersion
  defaultConfig {
    applicationId ext.applicationId
    minSdkVersion ext.minSdkVersion
    targetSdkVersion ext.targetSdkVersion
    versionCode ext.versionCode
    versionName ext.versionName
    signingConfig signingConfigs.release
  }
  buildTypes {
    debug {
      buildConfigField("String", "STUB_PASSWORD", "\"qwetu1233\"")
      applicationIdSuffix ".debug"
    }
    release {
      buildConfigField("String", "STUB_PASSWORD", "\"\"")
      minifyEnabled ext.minifyEnabled
      shrinkResources ext.shrinkResources
      proguardFiles(getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro')
    }
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
}

dependencies {

  implementation project(':android-app:buisness-logic')
  implementation project(':android-app:navigation')
  implementation project(':android-app:viewdsl')
  implementation project(':common-crypto')

  def appDependencies = rootProject.ext.applicationDependencies
  implementation appDependencies.kotlin
  implementation appDependencies.appCompat
  implementation appDependencies.coroutinesCore
  implementation appDependencies.coroutinesAndroid
  implementation appDependencies.coordinatorLayout
  implementation appDependencies.constraintLayout
  implementation appDependencies.recyclerView
  implementation appDependencies.zxcvbn
  implementation appDependencies.androidSecurity
  implementation appDependencies.biometric
  implementation appDependencies.timber
  implementation appDependencies.lifecycleRuntime

  def testDependencies = rootProject.ext.testDependencies
  testImplementation testDependencies.junit
  testImplementation testDependencies.gson

//  debugImplementation appDependencies.leakCanary
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/arsvechkarev/Vault/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/arsvechkarev/Vault).|
|3.|Follow code author [here](https://github.com/arsvechkarev).|
