# How to Add Firebase to Your Android project

Firebase is the dominant cloud platform especially for mobile development. It is fast and reliable and has a free option for starters. There too is extensive documentation and furthermore it is provided by a giant corperation which is Google.

Thus it's become really popular in the last few years. To use it however you need to learn how to get integrated into your app. This is what this tutorial is about. We will help you integrate firebase into your android studio app step by step.


> Make sure you are targeting Android API level 16 and above, and using Android 4.1 and above

## Option 1: Add Firebase using the Firebase console

Adding Firebase to your app involves tasks both in the [Firebase console](https://console.firebase.google.com/) and in your open Android project (for example, you download Firebase config files from the console, then move them into your Android project).

### Step 1: Sign In

[Sign into Firebase](https://console.firebase.google.com/) using your Google account. Meanwhile open your `Android Studio`.

### Step 2: Create a Firebase project

First you:

**Create a Firebase project**

1. In the [Firebase console](https://console.firebase.google.com/), click **Add project**, then select or enter a **Project name**.
    
    If you have an existing Google Cloud project, you can select the project from the dropdown menu to add Firebase resources to that project.
    
2. _(Optional)_ If you are creating a new project, you can edit the **Project ID**.
    
    Firebase automatically assigns a unique ID to your Firebase project.
    
3. Click **Continue**.
    
4. _(Optional)_ Set up Google Analytics for your project, which enables you to have an optimal experience using any of the following Firebase products:
    
    - [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)
        
    - [Firebase Predictions](https://firebase.google.com/docs/predictions)
        
    - [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
        
    - [Firebase In-App Messaging](https://firebase.google.com/docs/in-app-messaging)
        
    - [Firebase Remote Config](https://firebase.google.com/docs/remote-config)
        
    - [Firebase A/B Testing](https://firebase.google.com/docs/ab-testing).
        
    
    When prompted, select to use an existing [Google Analytics account](https://support.google.com/analytics/answer/1009618?ref_topic=3544906&authuser=0) or to create a new account. If you choose to create a new account, select your [Analytics reporting location](https://firebase.google.com/docs/projects/locations), then accept the data sharing settings and Google Analytics terms for your project.
    
    You can always set up Google Analytics later in the [_Integrations_](https://console.firebase.google.com/project/_/settings/integrations) tab of your settings _Project settings_.
    
5. Click **Create project** (or **Add Firebase**, if you're using an existing Google Cloud project).
    

Firebase automatically provisions resources for your Firebase project. After Firebase has allocated resources for your project, you'll be directed to the overview page for your Firebase project in the Firebase console.

### Step 3: Register your app with Firebase

To use Firebase in your Android app, you need to register your app with your Firebase project. Registering your app is often called "adding" your app to your project.

1. Go to the [Firebase console](https://console.firebase.google.com/).
    
2. In the center of the project overview page, click the **Android** icon or **Add app** to launch the setup workflow.
    
3. Enter your app's package name in the **Android package name** field. The package name, or the Applicatoon ID is responsible for uniquely identifying your app. You can find it in your `app/build.gradle` file or in the `AndroidManifest.xml` file.
    
4. _(Optional)_ Enter other app information: **App nickname** and **Debug signing certificate SHA-1**.
    
5. Click **Register app**.
    

### Step 4: Add a Firebase configuration file

1. Add the Firebase Android configuration file to your app:
    
    1. Click **Download google-services.json** to obtain your Firebase Android config file ( `google-services.json` ).
        
    2. Move your config file into the module (app-level) directory of your app.
        
    
    What do you need to know about this config file?
    
    > - The Firebase config file contains unique, but non-secret identifiers for your project.
    
2. To enable Firebase products in your app, add the [google-services plugin](https://developers.google.com/android/guides/google-services-plugin) to your Gradle files.
    
    1. In your root-level (project-level) Gradle file (`build.gradle`), add rules to include the Google Services Gradle plugin. Check that you have Google's Maven repository, as well.

```groovy
buildscript {

  repositories {
    // Check that you have the following line (if not, add it):
    google()  // Google's Maven repository
  }

  dependencies {
    // ...

    // Add the following line:
    classpath 'com.google.gms:google-services:4.3.10'  // Google Services plugin
  }
}

allprojects {
  // ...

  repositories {
    // Check that you have the following line (if not, add it):
    google()  // Google's Maven repository
    // ...
  }
}
```

In your module (app-level) Gradle file (usually `app/build.gradle`), apply the Google Services Gradle plugin:

```groovy
apply plugin: 'com.android.application'
// Add the following line:
apply plugin: 'com.google.gms.google-services'  // Google Services plugin

android {
  // ...
}
```

### Step 5: Add Firebase SDKs to your app

1. Using the [Firebase Android BoM](https://firebase.google.com/docs/android/learn-more#bom), declare the dependencies for the [Firebase products](https://firebase.google.com/docs/android/setup#available-libraries) that you want to use in your app. Declare them in your **module (app-level) Gradle file** (usually `app/build.gradle`).

```groovy
dependencies {
  // ...

  // Import the Firebase BoM
  implementation platform('com.google.firebase:firebase-bom:28.4.1')

  // When using the BoM, you don't specify versions in Firebase library dependencies

  // Declare the dependencies for the desired Firebase products
  // For example, declare the dependencies for Firebase Authentication and Cloud Firestore
  implementation 'com.google.firebase:firebase-auth'
  implementation 'com.google.firebase:firebase-firestore'
}
```

Then sync your app.

That is it. You have successfully added your Project to Firebase. Now proceed to check coding examples of firebase.

## Option 1: Add Firebase using the Firebase Assistant

The [Firebase Assistant](https://firebase.google.com/docs/android/learn-more#firebase-assistant) registers your app with a Firebase project and adds the necessary Firebase files, plugins, and dependencies to your Android project — all from within Android Studio!

1. Open your Android project in Android Studio, then make sure that you're using the latest versions of Android Studio and the Firebase Assistant:
    
2. Open the Firebase Assistant: **Tools > Firebase**.
    
3. In the _Assistant_ pane, choose a Firebase product to add to your app. Expand its section, then click the tutorial link (for example, **Analytics > Log an Analytics event** ).
    
    1. Click **Connect to Firebase** to connect your Android project with Firebase.
        
        What does this workflow do?
        
        > This workflow automatically creates a new Firebase Android app using your app's [package name](https://developer.android.com/studio/build/application-id). You can create this new Firebase Android app in either an existing Firebase project or a new project.
        
    2. Click the button to add a desired Firebase product (for example, **Add Analytics to your app** ).
        
4. Sync your app to ensure that all dependencies have the necessary versions.
    
5. In the _Assistant_ pane, follow the remaining setup instructions for your selected Firebase product.
    
6. Add as many other Firebase products as you'd like via the Firebase Assistant!
