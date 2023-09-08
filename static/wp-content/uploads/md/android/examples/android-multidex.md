# How to Accelerate MultiDex - Android

In this post we look at various solutions for accelerating multidex. This is crucial if your app's methods exceeds the 64K limit and is even more crucial if you are targeting older devices.


### What is MultiDex

According to Android Documentation:

Android app (APK) files contain executable bytecode files in the form of [Dalvik](https://source.android.com/devices/tech/dalvik/) Executable (DEX) files, which contain the compiled code used to run your app. The Dalvik Executable specification limits the total number of methods that can be referenced within a single DEX file to 65,536—including Android framework methods, library methods, and methods in your own code. In the context of computer science, the term [_Kilo, K_](https://en.wikipedia.org/wiki/Kilo-), denotes 1024 (or 2^10). Because 65,536 is equal to 64 X 1024, this limit is referred to as the '64K reference limit'.

When your app and the libraries it references exceed 65,536 methods, you encounter a build error that indicates your app has reached the limit of the Android build architecture.

According to StackOverflow:

A single .dex file can have 65,536 methods(references) so if the number of references exceeds 65,536, you go with multidex.

**More Explanation!**

An android application program is compiled into a .dex file which in turn zipped to a single .apk file. DVM (Dalvik Virtual Machine) uses .dex file/files to execute bytecodes.

What causes the number of references to exceed 65,536 limits? Methods written by you + Android Framework methods + Third party library(eg Volley,Retrofit, Facebook SDK etc) methods. I have read "somewhere" App Compat 24.2.1 contains 16.5k methods Google Play Services GCM 9.6.1 contains 16.7k methods So if you have created a simple Hello world application which has App Compat 24.2.1, you are already 1/4 way to cross the single dex methods limit

### What is Dex?

Dex stands for Dalvik Executable, which is what Google's virtual machine processor (Dalvik) uses to handle Android Applications. Android was built with small and simple apps in mind and the constraints on one single Dalvik Executable pinned the roof of code references at 65,536 methods. Because of this issue and the way the Dalvik machine handles code execution there were some compiling and invocation issues, until the Monkey Patch or MultiDex integration. MultiDex integration in Android Studio allows Android Developers the ability to compile and execute a code-base with over 65,536 methods!

### How to Enable MultiDex in android app

In case your app exceeds the 64K methods limit then here is how you enable multidex.

**Step 1 - Add MultiDex Dependency**

Add dependency in your app-leve build.gradle:

```groovy
implementation 'com.android.support:multidex:1.0.3'
```

**Step 2 - Inherit MultiDexApplication and Install MultiDex**

You do these in the app class of your project:

```java
    public class App extends MultiDexApplication {

    private static App instance;

    @Override
    public void onCreate() {
        MultiDex.install(this);
        super.onCreate();
        instance = this;
    }

    public static App getInstance ()
    {
        return instance;
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
```

**Step 3: Register the App class**

Register the app in the android manifest file:

```xml
   <application
     android:name=".App"
 </application>
```

Now how do you accelerate multiDex?

### Solution: Use BoostMultiDex Library

**What is BoostMultiDex?**

BoostMultiDex is a solution for quickly loading multiple dex files on low Android version devices (4.X and below, SDK <21). It is provided by bytedance(the company behind the popular tiktok platform).

According to their documentation:

It is produced by the TikTok/Tiktok Android technical team.

Compared with the Android official original MultiDex solution, it can reduce the waiting time of the black screen by more than 80% and save the upgrade installation experience for users of lower versions of Android. Moreover, unlike all optimization solutions in the industry, the BoostMultiDex solution starts from the underlying mechanism of the Android Dalvik virtual machine, which fundamentally solves the problem of the long time-consuming execution of MultiDex for the first time after installing the APK.

## Background

We know that devices with lower Android versions (4.X and below, SDK <21) use the Dalvik virtual machine as the Java runtime environment. Compared with the high version, the biggest problem is that it takes a long time for the first cold start after installation or upgrade. This often takes tens of seconds or even a few minutes, and the user has to face a black screen. After this period of time, the APP can be used normally.

This greatly affects the user experience. Especially overseas, such as Southeast Asia and Latin America, there are still a lot of low-end machines. Although there are relatively few users of lower versions below 4.X, for apps with billions of users such as Douyin and Tiktok, even if they account for 10%, the number is tens of millions. Therefore, if you want to open up the sinking market, the use and upgrade experience of these users can never be ignored.

The root cause of this problem is that it takes too long for the first MultiDex after installation or upgrade. In order to solve this problem, we explored the underlying system mechanism of the Dalvik virtual machine, redesigned the DEX related processing logic, and finally launched the BoostMultiDex solution to save the upgrade installation experience of low-version Android users.

## Technical points

The technical implementation points of the BoostMultiDex solution are as follows:

1. Use system hidden functions to directly load the original DEX bytecode to avoid time-consuming ODEX
2. Multi-level loading, select the most suitable product from DEX bytecode, DEX file, and ODEX file to start APP
3. A separate process does OPT, and realizes a reasonable interruption and recovery mechanism

More importantly, BoostMultiDex has been verified by Douyin/TikTok billions of global users. It can be said that it covers Android models in various countries and various complex situations. At present, it is difficult for other large apps in the industry to involve such a wide scale. . As a result, we have also solved various strange compatibility issues and ensured the stability of the technical solution to the greatest extent.

### How to Install it

It is hosted in the jcenter:

```groovy
dependencies {
... ...
    // For specific version number, please refer to app demo
    implementation 'com.bytedance.boost_multidex:boost_multidex:${ARTIFACT_VERSION}'
}
```

You will find version code [here](https://github.com/bytedance/BoostMultiDex).

### How to Use

It's very similar to how you setup the framework multidex, only that you install it in the attachBaseContext method:

```java
public class YourApplication extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

        BoostMultiDex.install(base);

... ...
    }
```

### Reference and Code samples

Find more documentation and code samples [here](https://github.com/bytedance/BoostMultiDex).

## Multidex support for Android 5.0 and higher

Android 5.0 (API level 21) and higher uses a runtime called ART which natively supports loading multiple DEX files from APK files. ART performs pre-compilation at app install time which scans for `classesN.dex` files and compiles them into a single `.oat` file for execution by the Android device. Therefore, if your `minSdkVersion` is 21 or higher multidex is enabled by default, and you do not need the multidex library.

For more information on the Android 5.0 runtime, read [ART and Dalvik](https://source.android.com/devices/tech/dalvik/).

References:

1. [Android Developers Documentation](https://developer.android.com/studio/build/multidex)
2. [StackOverflow](https://stackoverflow.com/questions/33588459/what-is-android-multidex).
