# Simple Clock

>  Combination of a beautiful clock with widget, alarm, stopwatch & timer, no ads.

![Simple Clock Tutorial](https://github.com/SimpleMobileTools/Simple-Clock/raw/master/graphics/icon.png)


This clock app has multiple functions related to timing. It can be used as a clock widget or as a alarm clock. It is made to help you regulate your daily life and sleep better. You can also use the stopwatch in this app to count your time when you are running for healthy lifestyle or for any other purpose. This app can also be placed on your home screen for easy navigation.

As a clock widget you can enable displaying times from other time zones, or use the simple, but customizable and resizable clock widget. The text color of the clock widget can be customized, as well as the color and the alpha of the background. You can also change the shape of clock widget according to your choice and show it on the home screen.

The alarm contains all the expected features as day selecting, vibration toggling, ringtone selecting, snooze or adding a custom label. Waking up will be a pleasure. It supports as many alarms as you want, so there won't be any more excuses for not waking up and sleep better :) Gradual volume increasing is supported too, enabled by default. A customizable Snooze button is available too, just in case you really had a good reason for using it. The alarm clock provided by this app as simple as it can get. You simply have to add how many times you want and turn them on. During this, you can also take help from a guide built in this alarm clock app to help you navigate through this app to sleep better. You can sleep better so this app can wake you up on the set time without disturbing your lifestyle. This alarm can be placed on the home screen to make it easy for you to access the alarm while you can work on other things on your device. The main goal of keeping the alarm in this clock widget is to help you schedule your time more effectively.

With the stopwatch you can easily measure a longer period of time, or individual laps. You can sort the laps in a few different ways. It contains optional vibrations on button presses too, just to let you know that the button was pressed in case you cannot look at the device for some reason, or you are in a hurry. This stopwatch can help you getting in shape if you are doing yoga or having a run in the park. You can put the stopwatch on home screen so that you can easily access it and alter it according to your needs without opening the menu and finding it.

You can easily setup a timer to be notified of some events. You can both change its ringtone, or toggle vibrations. You will never burn that pizza again. The timer countdown can be paused too, not just stopped.

Additional features include for example preventing the device from falling asleep while the app is in foreground or toggling between 12 or 24 hour time format. Last but not least you can decide if the week should start on Sunday, or Monday.

It comes with material design and dark theme by default, provides great user experience for easy usage. The lack of internet access gives you more privacy, security and stability than other apps. The dark theme in this clock widget can help you setting your alarm clock at night without blinding your eyes with sharp color of your mobile alarm.

It comes with material design and dark theme by default, provides great user experience for easy usage. The lack of internet access gives you more privacy, security and stability than other apps.

Contains no ads or unnecessary permissions. It is fully opensource, provides customizable colors.

Let us look at the full Simple Clock code.

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

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 13 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'

def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.simplemobiletools.clock"
        minSdkVersion 23
        targetSdkVersion 33
        versionCode 34
        versionName "5.9.4"
        setProperty("archivesBaseName", "clock")
        vectorDrawables.useSupportLibrary = true
    }

    signingConfigs {
        if (keystorePropertiesFile.exists()) {
            release {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix ".debug"
        }
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            if (keystorePropertiesFile.exists()) {
                signingConfig signingConfigs.release
            }
        }
    }

    flavorDimensions "variants"
    productFlavors {
        core {}
        fdroid {}
        prepaid {}
    }

    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }

    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }
}

dependencies {
    implementation 'com.github.SimpleMobileTools:Simple-Commons:db51b86628'
    implementation 'com.facebook.stetho:stetho:1.5.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'com.shawnlin:number-picker:2.4.6'
    implementation "androidx.preference:preference-ktx:1.2.0"
    implementation "androidx.work:work-runtime-ktx:2.7.1"
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.4.1'
    implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.1'
    implementation 'org.greenrobot:eventbus:3.3.1'
    implementation 'androidx.lifecycle:lifecycle-extensions:2.2.0'
    implementation 'me.grantland:autofittextview:0.2.1'

    implementation 'androidx.room:room-runtime:2.4.3'
    kapt 'androidx.room:room-compiler:2.4.3'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 28 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. We will be creating 3 [`Services`](htpps://android.examples.directory/service) which we have to register as well. We will be defining 2 `meta-data` tags as shown below. Here we will add the following permission:

1. Our `VIBRATE` permission.
2. Our `RECEIVE_BOOT_COMPLETED` permission.
3. Our `USE_FULL_SCREEN_INTENT` permission.
4. Our `SCHEDULE_EXACT_ALARM` permission.
5. Our `FOREGROUND_SERVICE` permission.
6. Our `SYSTEM_ALERT_WINDOW` permission.
7. Our `WAKE_LOCK` permission.
8. Our `POST_NOTIFICATIONS` permission.
9. Our `ACCESS_NETWORK_STATE` permission.
10. Our `USE_FINGERPRINT` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.simplemobiletools.clock">

    <uses-permission android:name="com.android.alarm.permission.SET_ALARM" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <uses-permission
        android:name="android.permission.ACCESS_NETWORK_STATE"
        tools:node="remove" />

    <uses-permission
        android:name="android.permission.USE_FINGERPRINT"
        tools:node="remove" />

    <application
        android:name=".App"
        android:allowBackup="true"
        android:appCategory="productivity"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_launcher_name"
        android:roundIcon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme">

        <activity
            android:name=".activities.SplashActivity"
            android:exported="true"
            android:launchMode="singleTask"
            android:theme="@style/SplashTheme">

            <intent-filter>
                <action android:name="com.simplemobiletools.clock.TOGGLE_STOPWATCH" />
                <action android:name="android.intent.action.SHOW_ALARMS" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <activity
            android:name=".activities.MainActivity"
            android:exported="false"
            android:launchMode="singleTask"
            android:windowSoftInputMode="adjustPan" />

        <activity
            android:name=".activities.ReminderActivity"
            android:exported="false"
            android:launchMode="singleTask"
            android:showOnLockScreen="true" />

        <activity
            android:name=".activities.SettingsActivity"
            android:exported="true"
            android:label="@string/settings"
            android:parentActivityName=".activities.MainActivity">

            <intent-filter>
                <action android:name="android.intent.action.APPLICATION_PREFERENCES" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <activity
            android:name="com.simplemobiletools.commons.activities.AboutActivity"
            android:exported="false"
            android:label="@string/about"
            android:parentActivityName=".activities.MainActivity" />

        <activity
            android:name="com.simplemobiletools.commons.activities.CustomizationActivity"
            android:exported="false"
            android:label="@string/customize_colors"
            android:parentActivityName=".activities.SettingsActivity" />

        <activity
            android:name=".activities.SnoozeReminderActivity"
            android:exported="false"
            android:theme="@style/Theme.Transparent" />

        <activity
            android:name=".activities.WidgetDigitalConfigureActivity"
            android:exported="true"
            android:theme="@style/MyWidgetConfigTheme">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_CONFIGURE" />
            </intent-filter>
        </activity>

        <activity
            android:name=".activities.WidgetAnalogueConfigureActivity"
            android:exported="true"
            android:theme="@style/MyWidgetConfigTheme">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_CONFIGURE" />
            </intent-filter>
        </activity>

        <service android:name=".services.SnoozeService" />

        <service android:name=".services.TimerService" />

        <service android:name=".services.StopwatchService" />

        <receiver android:name=".receivers.AlarmReceiver" />

        <receiver android:name=".receivers.HideTimerReceiver" />

        <receiver android:name=".receivers.HideAlarmReceiver" />

        <receiver
            android:name=".receivers.BootCompletedReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                <action android:name="com.htc.intent.action.QUICKBOOT_POWERON" />
            </intent-filter>
        </receiver>

        <receiver
            android:name=".helpers.MyDigitalTimeWidgetProvider"
            android:exported="true"
            android:label="@string/digital_clock">

            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="android.appwidget.action.APPWIDGET_ENABLED" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_digital_clock_info" />
        </receiver>

        <receiver
            android:name=".helpers.MyAnalogueTimeWidgetProvider"
            android:exported="true"
            android:label="@string/analogue_clock">

            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="android.appwidget.action.APPWIDGET_ENABLED" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_analogue_clock_info" />
        </receiver>

        <receiver
            android:name=".receivers.UpdateWidgetReceiver"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.TIME_SET" />
                <action android:name="android.intent.action.TIMEZONE_CHANGED" />
                <action android:name="android.app.action.NEXT_ALARM_CLOCK_CHANGED" />
            </intent-filter>
        </receiver>

        <activity-alias
            android:name=".activities.SplashActivity.Red"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_red"
            android:roundIcon="@mipmap/ic_launcher_red"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Pink"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_pink"
            android:roundIcon="@mipmap/ic_launcher_pink"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Purple"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_purple"
            android:roundIcon="@mipmap/ic_launcher_purple"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Deep_purple"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_deep_purple"
            android:roundIcon="@mipmap/ic_launcher_deep_purple"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Indigo"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_indigo"
            android:roundIcon="@mipmap/ic_launcher_indigo"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Blue"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_blue"
            android:roundIcon="@mipmap/ic_launcher_blue"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Light_blue"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_light_blue"
            android:roundIcon="@mipmap/ic_launcher_light_blue"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Cyan"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_cyan"
            android:roundIcon="@mipmap/ic_launcher_cyan"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Teal"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_teal"
            android:roundIcon="@mipmap/ic_launcher_teal"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Green"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_green"
            android:roundIcon="@mipmap/ic_launcher_green"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Light_green"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_light_green"
            android:roundIcon="@mipmap/ic_launcher_light_green"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Lime"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_lime"
            android:roundIcon="@mipmap/ic_launcher_lime"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Yellow"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_yellow"
            android:roundIcon="@mipmap/ic_launcher_yellow"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Amber"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_amber"
            android:roundIcon="@mipmap/ic_launcher_amber"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Orange"
            android:enabled="true"
            android:exported="true"
            android:icon="@mipmap/ic_launcher"
            android:roundIcon="@mipmap/ic_launcher"
            android:targetActivity=".activities.SplashActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Deep_orange"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_deep_orange"
            android:roundIcon="@mipmap/ic_launcher_deep_orange"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Brown"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_brown"
            android:roundIcon="@mipmap/ic_launcher_brown"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Blue_grey"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_blue_grey"
            android:roundIcon="@mipmap/ic_launcher_blue_grey"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <activity-alias
            android:name=".activities.SplashActivity.Grey_black"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_grey_black"
            android:roundIcon="@mipmap/ic_launcher_grey_black"
            android:targetActivity=".activities.SplashActivity">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>
    </application>
</manifest>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `WindowManager` from the `android.view` package.
3. `ImageView` from the `android.widget` package.
4. `TextView` from the `android.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `SimpleActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResume() `.
3. `onPause() `.
4. `onNewIntent(intent: Intent) `.
5. `onActivityResult(requestCode: Int, resultCode: Int, resultData: Intent?) `.

Then we will be creating the following functions:

1. `checkShortcuts() `.
2. `getLaunchStopwatchShortcut(parameter)` - We pass a `Int` object as a parameter.
3. `setupOptionsMenu() `.
4. `refreshMenuItems() `.
5. `storeStateVariables() `.
6. `storeNewAlarmSound(parameter)` - Let's pass a `Intent` object as a parameter.
7. `updateClockTabAlarm() `.
8. `initFragments() `.
9. `setupTabs() `.
10. `setupTabColors() `.
11. `getInactiveTabIndexes(activeIndex: Int) = arrayListOf(0, 1, 2, 3).filter `.
12. `launchSettings() `.
13. `launchAbout() `.

**(a). Our `checkShortcuts()` function.**

A function to check shortcuts:

```kotlin
    private fun checkShortcuts() {
        val appIconColor = config.appIconColor
        if (isNougatMR1Plus() && config.lastHandledShortcutColor != appIconColor) {
            val launchDialpad = getLaunchStopwatchShortcut(appIconColor)

            try {
                shortcutManager.dynamicShortcuts = listOf(launchDialpad)
                config.lastHandledShortcutColor = appIconColor
            } catch (ignored: Exception) {
            }
        }
    }
```

**(b). Our `setupTabColors()` function.**

A function to setup tab colors:

```kotlin
    private fun setupTabColors() {
        val activeView = main_tabs_holder.getTabAt(view_pager.currentItem)?.customView
        updateBottomTabItemColors(activeView, true)

        getInactiveTabIndexes(view_pager.currentItem).forEach { index ->
            val inactiveView = main_tabs_holder.getTabAt(index)?.customView
            updateBottomTabItemColors(inactiveView, false)
        }

        main_tabs_holder.getTabAt(view_pager.currentItem)?.select()
        val bottomBarColor = getBottomNavigationBackgroundColor()
        main_tabs_holder.setBackgroundColor(bottomBarColor)
        updateNavigationBarColor(bottomBarColor)
    }
```

**(c). Our `refreshMenuItems()` function.**

A function to refresh menu items:

```kotlin
    private fun refreshMenuItems() {
        main_toolbar.menu.apply {
            findItem(R.id.sort).isVisible = view_pager.currentItem == TAB_ALARM
        }
    }
```

**(d). Our `setupTabs()` function.**

A function to setup tabs:

```kotlin
    private fun setupTabs() {
        main_tabs_holder.removeAllTabs()
        val tabDrawables = arrayOf(R.drawable.ic_clock_vector, R.drawable.ic_alarm_vector, R.drawable.ic_stopwatch_vector, R.drawable.ic_hourglass_vector)
        val tabLabels = arrayOf(R.string.clock, R.string.alarm, R.string.stopwatch, R.string.timer)

        tabDrawables.forEachIndexed { i, drawableId ->
            main_tabs_holder.newTab().setCustomView(R.layout.bottom_tablayout_item).apply {
                customView?.findViewById<ImageView>(R.id.tab_item_icon)?.setImageDrawable(getDrawable(drawableId))
                customView?.findViewById<TextView>(R.id.tab_item_label)?.setText(tabLabels[i])
                AutofitHelper.create(customView?.findViewById(R.id.tab_item_label))
                main_tabs_holder.addTab(this)
            }
        }

        main_tabs_holder.onTabSelectionChanged(
            tabUnselectedAction = {
                updateBottomTabItemColors(it.customView, false)
            },
            tabSelectedAction = {
                view_pager.currentItem = it.position
                updateBottomTabItemColors(it.customView, true)
            }
        )
    }
```

**(e). Our `launchSettings()` function.**

A function to launch settings:

```kotlin
    private fun launchSettings() {
        startActivity(Intent(applicationContext, SettingsActivity::class.java))
    }
```

**(f). Our `initFragments()` function.**

A function to init fragments:

```kotlin
    private fun initFragments() {
        val viewPagerAdapter = ViewPagerAdapter(supportFragmentManager)
        view_pager.adapter = viewPagerAdapter
        view_pager.onPageChangeListener {
            main_tabs_holder.getTabAt(it)?.select()
            refreshMenuItems()
        }

        val tabToOpen = intent.getIntExtra(OPEN_TAB, config.lastUsedViewPagerPage)
        intent.removeExtra(OPEN_TAB)
        if (tabToOpen == TAB_TIMER) {
            val timerId = intent.getIntExtra(TIMER_ID, INVALID_TIMER_ID)
            viewPagerAdapter.updateTimerPosition(timerId)
        }

        if (tabToOpen == TAB_STOPWATCH) {
            config.toggleStopwatch = intent.getBooleanExtra(TOGGLE_STOPWATCH, false)
        }

        view_pager.offscreenPageLimit = TABS_COUNT - 1
        view_pager.currentItem = tabToOpen
    }
```

**(g). Our `getLaunchStopwatchShortcut()` function.**

A function to get launch stopwatch shortcut:

```kotlin
    private fun getLaunchStopwatchShortcut(appIconColor: Int): ShortcutInfo {
        val newEvent = getString(R.string.start_stopwatch)
        val drawable = resources.getDrawable(R.drawable.shortcut_stopwatch)
        (drawable as LayerDrawable).findDrawableByLayerId(R.id.shortcut_stopwatch_background).applyColorFilter(appIconColor)
        val bmp = drawable.convertToBitmap()

        val intent = Intent(this, SplashActivity::class.java).apply {
            putExtra(OPEN_TAB, TAB_STOPWATCH)
            putExtra(TOGGLE_STOPWATCH, true)
            action = STOPWATCH_TOGGLE_ACTION
        }

        return ShortcutInfo.Builder(this, STOPWATCH_SHORTCUT_ID)
            .setShortLabel(newEvent)
            .setLongLabel(newEvent)
            .setIcon(Icon.createWithBitmap(bmp))
            .setIntent(intent)
            .build()
    }
```

**(h). Our `setupOptionsMenu()` function.**

A function to setup options menu:

```kotlin
    private fun setupOptionsMenu() {
        main_toolbar.setOnMenuItemClickListener { menuItem ->
            when (menuItem.itemId) {
                R.id.sort -> getViewPagerAdapter()?.showAlarmSortDialog()
                R.id.settings -> launchSettings()
                R.id.about -> launchAbout()
                else -> return@setOnMenuItemClickListener false
            }
            return@setOnMenuItemClickListener true
        }
    }
```

**(i). Our `updateClockTabAlarm()` function.**

A function to update clock tab alarm:

```kotlin
    fun updateClockTabAlarm() {
        getViewPagerAdapter()?.updateClockTabAlarm()
    }
```

**(j). Our `launchAbout()` function.**

A function to launch about:

```kotlin
    private fun launchAbout() {
        val licenses = LICENSE_STETHO or LICENSE_NUMBER_PICKER or LICENSE_RTL or LICENSE_AUTOFITTEXTVIEW

        val faqItems = arrayListOf(
            FAQItem(R.string.faq_1_title, R.string.faq_1_text),
            FAQItem(R.string.faq_1_title_commons, R.string.faq_1_text_commons),
            FAQItem(R.string.faq_4_title_commons, R.string.faq_4_text_commons),
            FAQItem(R.string.faq_9_title_commons, R.string.faq_9_text_commons)
        )

        if (!resources.getBoolean(R.bool.hide_google_relations)) {
            faqItems.add(FAQItem(R.string.faq_2_title_commons, R.string.faq_2_text_commons))
            faqItems.add(FAQItem(R.string.faq_6_title_commons, R.string.faq_6_text_commons))
        }

        startAboutActivity(R.string.app_name, licenses, BuildConfig.VERSION_NAME, faqItems, true)
    }
```

**(k). Our `storeStateVariables()` function.**

A function to store state variables:

```kotlin
    private fun storeStateVariables() {
        storedTextColor = getProperTextColor()
        storedBackgroundColor = getProperBackgroundColor()
        storedPrimaryColor = getProperPrimaryColor()
    }
```

**(m). Our `storeNewAlarmSound()` function.**

A function to store new alarm sound:

```kotlin
    private fun storeNewAlarmSound(resultData: Intent) {
        val newAlarmSound = storeNewYourAlarmSound(resultData)

        when (view_pager.currentItem) {
            TAB_ALARM -> getViewPagerAdapter()?.updateAlarmTabAlarmSound(newAlarmSound)
            TAB_TIMER -> getViewPagerAdapter()?.updateTimerTabAlarmSound(newAlarmSound)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.ShortcutInfo
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Icon
import android.graphics.drawable.LayerDrawable
import android.os.Bundle
import android.view.WindowManager
import android.widget.ImageView
import android.widget.TextView
import com.simplemobiletools.clock.BuildConfig
import com.simplemobiletools.clock.R
import com.simplemobiletools.clock.adapters.ViewPagerAdapter
import com.simplemobiletools.clock.extensions.config
import com.simplemobiletools.clock.extensions.getNextAlarm
import com.simplemobiletools.clock.extensions.rescheduleEnabledAlarms
import com.simplemobiletools.clock.extensions.updateWidgets
import com.simplemobiletools.clock.helpers.*
import com.simplemobiletools.commons.extensions.*
import com.simplemobiletools.commons.helpers.*
import com.simplemobiletools.commons.models.FAQItem
import kotlinx.android.synthetic.main.activity_main.*
import me.grantland.widget.AutofitHelper

class MainActivity : SimpleActivity() {
    private var storedTextColor = 0
    private var storedBackgroundColor = 0
    private var storedPrimaryColor = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        appLaunched(BuildConfig.APPLICATION_ID)
        setupOptionsMenu()
        refreshMenuItems()
        storeStateVariables()
        initFragments()
        setupTabs()
        updateWidgets()

        if (getNextAlarm().isEmpty()) {
            ensureBackgroundThread {
                rescheduleEnabledAlarms()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        setupToolbar(main_toolbar)
        val configTextColor = getProperTextColor()
        if (storedTextColor != configTextColor) {
            getInactiveTabIndexes(view_pager.currentItem).forEach {
                main_tabs_holder.getTabAt(it)?.icon?.applyColorFilter(configTextColor)
            }
        }

        val configBackgroundColor = getProperBackgroundColor()
        if (storedBackgroundColor != configBackgroundColor) {
            main_tabs_holder.background = ColorDrawable(configBackgroundColor)
        }

        val configPrimaryColor = getProperPrimaryColor()
        if (storedPrimaryColor != configPrimaryColor) {
            main_tabs_holder.setSelectedTabIndicatorColor(getProperPrimaryColor())
            main_tabs_holder.getTabAt(view_pager.currentItem)?.icon?.applyColorFilter(getProperPrimaryColor())
        }

        if (config.preventPhoneFromSleeping) {
            window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }

        setupTabColors()
        checkShortcuts()
    }

    @SuppressLint("NewApi")
    private fun checkShortcuts() {
        val appIconColor = config.appIconColor
        if (isNougatMR1Plus() && config.lastHandledShortcutColor != appIconColor) {
            val launchDialpad = getLaunchStopwatchShortcut(appIconColor)

            try {
                shortcutManager.dynamicShortcuts = listOf(launchDialpad)
                config.lastHandledShortcutColor = appIconColor
            } catch (ignored: Exception) {
            }
        }
    }

    @SuppressLint("NewApi")
    private fun getLaunchStopwatchShortcut(appIconColor: Int): ShortcutInfo {
        val newEvent = getString(R.string.start_stopwatch)
        val drawable = resources.getDrawable(R.drawable.shortcut_stopwatch)
        (drawable as LayerDrawable).findDrawableByLayerId(R.id.shortcut_stopwatch_background).applyColorFilter(appIconColor)
        val bmp = drawable.convertToBitmap()

        val intent = Intent(this, SplashActivity::class.java).apply {
            putExtra(OPEN_TAB, TAB_STOPWATCH)
            putExtra(TOGGLE_STOPWATCH, true)
            action = STOPWATCH_TOGGLE_ACTION
        }

        return ShortcutInfo.Builder(this, STOPWATCH_SHORTCUT_ID)
            .setShortLabel(newEvent)
            .setLongLabel(newEvent)
            .setIcon(Icon.createWithBitmap(bmp))
            .setIntent(intent)
            .build()
    }


    override fun onPause() {
        super.onPause()
        storeStateVariables()
        if (config.preventPhoneFromSleeping) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
        config.lastUsedViewPagerPage = view_pager.currentItem
    }

    private fun setupOptionsMenu() {
        main_toolbar.setOnMenuItemClickListener { menuItem ->
            when (menuItem.itemId) {
                R.id.sort -> getViewPagerAdapter()?.showAlarmSortDialog()
                R.id.settings -> launchSettings()
                R.id.about -> launchAbout()
                else -> return@setOnMenuItemClickListener false
            }
            return@setOnMenuItemClickListener true
        }
    }

    private fun refreshMenuItems() {
        main_toolbar.menu.apply {
            findItem(R.id.sort).isVisible = view_pager.currentItem == TAB_ALARM
        }
    }

    override fun onNewIntent(intent: Intent) {
        if (intent.extras?.containsKey(OPEN_TAB) == true) {
            val tabToOpen = intent.getIntExtra(OPEN_TAB, TAB_CLOCK)
            view_pager.setCurrentItem(tabToOpen, false)
            if (tabToOpen == TAB_TIMER) {
                val timerId = intent.getIntExtra(TIMER_ID, INVALID_TIMER_ID)
                (view_pager.adapter as ViewPagerAdapter).updateTimerPosition(timerId)
            }
            if (tabToOpen == TAB_STOPWATCH) {
                if (intent.getBooleanExtra(TOGGLE_STOPWATCH, false)) {
                    (view_pager.adapter as ViewPagerAdapter).startStopWatch()
                }
            }
        }
        super.onNewIntent(intent)
    }

    private fun storeStateVariables() {
        storedTextColor = getProperTextColor()
        storedBackgroundColor = getProperBackgroundColor()
        storedPrimaryColor = getProperPrimaryColor()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, resultData: Intent?) {
        super.onActivityResult(requestCode, resultCode, resultData)
        if (requestCode == PICK_AUDIO_FILE_INTENT_ID && resultCode == RESULT_OK && resultData != null) {
            storeNewAlarmSound(resultData)
        }
    }

    private fun storeNewAlarmSound(resultData: Intent) {
        val newAlarmSound = storeNewYourAlarmSound(resultData)

        when (view_pager.currentItem) {
            TAB_ALARM -> getViewPagerAdapter()?.updateAlarmTabAlarmSound(newAlarmSound)
            TAB_TIMER -> getViewPagerAdapter()?.updateTimerTabAlarmSound(newAlarmSound)
        }
    }

    fun updateClockTabAlarm() {
        getViewPagerAdapter()?.updateClockTabAlarm()
    }

    private fun getViewPagerAdapter() = view_pager.adapter as? ViewPagerAdapter

    private fun initFragments() {
        val viewPagerAdapter = ViewPagerAdapter(supportFragmentManager)
        view_pager.adapter = viewPagerAdapter
        view_pager.onPageChangeListener {
            main_tabs_holder.getTabAt(it)?.select()
            refreshMenuItems()
        }

        val tabToOpen = intent.getIntExtra(OPEN_TAB, config.lastUsedViewPagerPage)
        intent.removeExtra(OPEN_TAB)
        if (tabToOpen == TAB_TIMER) {
            val timerId = intent.getIntExtra(TIMER_ID, INVALID_TIMER_ID)
            viewPagerAdapter.updateTimerPosition(timerId)
        }

        if (tabToOpen == TAB_STOPWATCH) {
            config.toggleStopwatch = intent.getBooleanExtra(TOGGLE_STOPWATCH, false)
        }

        view_pager.offscreenPageLimit = TABS_COUNT - 1
        view_pager.currentItem = tabToOpen
    }

    private fun setupTabs() {
        main_tabs_holder.removeAllTabs()
        val tabDrawables = arrayOf(R.drawable.ic_clock_vector, R.drawable.ic_alarm_vector, R.drawable.ic_stopwatch_vector, R.drawable.ic_hourglass_vector)
        val tabLabels = arrayOf(R.string.clock, R.string.alarm, R.string.stopwatch, R.string.timer)

        tabDrawables.forEachIndexed { i, drawableId ->
            main_tabs_holder.newTab().setCustomView(R.layout.bottom_tablayout_item).apply {
                customView?.findViewById<ImageView>(R.id.tab_item_icon)?.setImageDrawable(getDrawable(drawableId))
                customView?.findViewById<TextView>(R.id.tab_item_label)?.setText(tabLabels[i])
                AutofitHelper.create(customView?.findViewById(R.id.tab_item_label))
                main_tabs_holder.addTab(this)
            }
        }

        main_tabs_holder.onTabSelectionChanged(
            tabUnselectedAction = {
                updateBottomTabItemColors(it.customView, false)
            },
            tabSelectedAction = {
                view_pager.currentItem = it.position
                updateBottomTabItemColors(it.customView, true)
            }
        )
    }

    private fun setupTabColors() {
        val activeView = main_tabs_holder.getTabAt(view_pager.currentItem)?.customView
        updateBottomTabItemColors(activeView, true)

        getInactiveTabIndexes(view_pager.currentItem).forEach { index ->
            val inactiveView = main_tabs_holder.getTabAt(index)?.customView
            updateBottomTabItemColors(inactiveView, false)
        }

        main_tabs_holder.getTabAt(view_pager.currentItem)?.select()
        val bottomBarColor = getBottomNavigationBackgroundColor()
        main_tabs_holder.setBackgroundColor(bottomBarColor)
        updateNavigationBarColor(bottomBarColor)
    }

    private fun getInactiveTabIndexes(activeIndex: Int) = arrayListOf(0, 1, 2, 3).filter { it != activeIndex }

    private fun launchSettings() {
        startActivity(Intent(applicationContext, SettingsActivity::class.java))
    }

    private fun launchAbout() {
        val licenses = LICENSE_STETHO or LICENSE_NUMBER_PICKER or LICENSE_RTL or LICENSE_AUTOFITTEXTVIEW

        val faqItems = arrayListOf(
            FAQItem(R.string.faq_1_title, R.string.faq_1_text),
            FAQItem(R.string.faq_1_title_commons, R.string.faq_1_text_commons),
            FAQItem(R.string.faq_4_title_commons, R.string.faq_4_text_commons),
            FAQItem(R.string.faq_9_title_commons, R.string.faq_9_text_commons)
        )

        if (!resources.getBoolean(R.bool.hide_google_relations)) {
            faqItems.add(FAQItem(R.string.faq_2_title_commons, R.string.faq_2_text_commons))
            faqItems.add(FAQItem(R.string.faq_6_title_commons, R.string.faq_6_text_commons))
        }

        startAboutActivity(R.string.app_name, licenses, BuildConfig.VERSION_NAME, faqItems, true)
    }
}


```


**(b). `ReminderActivity.kt`**

> Our `ReminderActivity` class.

Create a Kotlin file named `ReminderActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `MotionEvent` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `WindowManager` from the `android.view` package.
4. `AnimationUtils` from the `android.view.animation` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_reminder` package.

Then extend the `SimpleActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResume() `.
3. `onNewIntent(intent: Intent?) `.
4. `onDestroy() `.

Then we will be creating the following functions:

1. `setupButtons() `.
2. `setupAlarmButtons() `.
3. `setupTimerButtons() `.
4. `setupEffects() `.
5. `scheduleVolumeIncrease() `.
6. `destroyEffects() `.
7. `snoozeAlarm() `.
8. `finishActivity() `.
9. `showOverLockscreen() `.

**(a). Our `setupButtons()` function.**

A function to setup buttons:

```kotlin
    private fun setupButtons() {
        if (isAlarmReminder) {
            setupAlarmButtons()
        } else {
            setupTimerButtons()
        }
    }
```

**(b). Our `showOverLockscreen()` function.**

A function to show over lockscreen:

```kotlin
    private fun showOverLockscreen() {
        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD or
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        )

        if (isOreoMr1Plus()) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
            (getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager).requestDismissKeyguard(this, null)
        }
    }
```

**(c). Our `finishActivity()` function.**

A function to finish activity:

```kotlin
    private fun finishActivity() {
        if (!wasAlarmSnoozed && alarm != null && alarm!!.days > 0) {
            scheduleNextAlarm(alarm!!, false)
        }

        destroyEffects()
        finish()
        overridePendingTransition(0, 0)
    }
```

**(d). Our `setupAlarmButtons()` function.**

A function to setup alarm buttons:

```kotlin
    private fun setupAlarmButtons() {
        reminder_stop.beGone()
        reminder_draggable_background.startAnimation(AnimationUtils.loadAnimation(this, R.anim.pulsing_animation))
        reminder_draggable_background.applyColorFilter(getProperPrimaryColor())

        val textColor = getProperTextColor()
        reminder_dismiss.applyColorFilter(textColor)
        reminder_draggable.applyColorFilter(textColor)
        reminder_snooze.applyColorFilter(textColor)

        var minDragX = 0f
        var maxDragX = 0f
        var initialDraggableX = 0f

        reminder_dismiss.onGlobalLayout {
            minDragX = reminder_snooze.left.toFloat()
            maxDragX = reminder_dismiss.left.toFloat()
            initialDraggableX = reminder_draggable.left.toFloat()
        }

        reminder_draggable.setOnTouchListener { v, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    dragDownX = event.x
                    reminder_draggable_background.animate().alpha(0f)
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    dragDownX = 0f
                    if (!didVibrate) {
                        reminder_draggable.animate().x(initialDraggableX).withEndAction {
                            reminder_draggable_background.animate().alpha(0.2f)
                        }

                        reminder_guide.animate().alpha(1f).start()
                        swipeGuideFadeHandler.removeCallbacksAndMessages(null)
                        swipeGuideFadeHandler.postDelayed({
                            reminder_guide.animate().alpha(0f).start()
                        }, 2000L)
                    }
                }
                MotionEvent.ACTION_MOVE -> {
                    reminder_draggable.x = Math.min(maxDragX, Math.max(minDragX, event.rawX - dragDownX))
                    if (reminder_draggable.x >= maxDragX - 50f) {
                        if (!didVibrate) {
                            reminder_draggable.performHapticFeedback()
                            didVibrate = true
                            finishActivity()
                        }

                        if (isOreoPlus()) {
                            notificationManager.cancelAll()
                        }
                    } else if (reminder_draggable.x <= minDragX + 50f) {
                        if (!didVibrate) {
                            reminder_draggable.performHapticFeedback()
                            didVibrate = true
                            snoozeAlarm()
                        }

                        if (isOreoPlus()) {
                            notificationManager.cancelAll()
                        }
                    }
                }
            }
            true
        }
    }
```

**(e). Our `scheduleVolumeIncrease()` function.**

A function to schedule volume increase:

```kotlin
    private fun scheduleVolumeIncrease() {
        increaseVolumeHandler.postDelayed({
            lastVolumeValue = Math.min(lastVolumeValue + 0.1f, 1f)
            mediaPlayer?.setVolume(lastVolumeValue, lastVolumeValue)
            scheduleVolumeIncrease()
        }, INCREASE_VOLUME_DELAY)
    }
```

**(f). Our `destroyEffects()` function.**

A function to destroy effects:

```kotlin
    private fun destroyEffects() {
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
        vibrator?.cancel()
        vibrator = null
    }
```

**(g). Our `setupTimerButtons()` function.**

A function to setup timer buttons:

```kotlin
    private fun setupTimerButtons() {
        reminder_stop.background = resources.getColoredDrawableWithColor(R.drawable.circle_background_filled, getProperPrimaryColor())
        arrayOf(reminder_snooze, reminder_draggable_background, reminder_draggable, reminder_dismiss).forEach {
            it.beGone()
        }

        reminder_stop.setOnClickListener {
            finishActivity()
        }
    }
```

**(h). Our `snoozeAlarm()` function.**

A function to snooze alarm:

```kotlin
    private fun snoozeAlarm() {
        destroyEffects()
        if (config.useSameSnooze) {
            setupAlarmClock(alarm!!, config.snoozeTime * MINUTE_SECONDS)
            wasAlarmSnoozed = true
            finishActivity()
        } else {
            showPickSecondsDialog(config.snoozeTime * MINUTE_SECONDS, true, cancelCallback = { finishActivity() }) {
                config.snoozeTime = it / MINUTE_SECONDS
                setupAlarmClock(alarm!!, it)
                wasAlarmSnoozed = true
                finishActivity()
            }
        }
    }
```

**(i). Our `setupEffects()` function.**

A function to setup effects:

```kotlin
    private fun setupEffects() {
        if (!isAlarmReminder || !config.increaseVolumeGradually) {
            lastVolumeValue = 1f
        }

        val doVibrate = if (alarm != null) alarm!!.vibrate else config.timerVibrate
        if (doVibrate && isOreoPlus()) {
            val pattern = LongArray(2) { 500 }
            vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
            vibrator?.vibrate(VibrationEffect.createWaveform(pattern, 0))
        }

        val soundUri = if (alarm != null) {
            alarm!!.soundUri
        } else {
            config.timerSoundUri
        }

        if (soundUri != SILENT) {
            try {
                mediaPlayer = MediaPlayer().apply {
                    setAudioStreamType(AudioManager.STREAM_ALARM)
                    setDataSource(this@ReminderActivity, Uri.parse(soundUri))
                    setVolume(lastVolumeValue, lastVolumeValue)
                    isLooping = true
                    prepare()
                    start()
                }

                if (config.increaseVolumeGradually) {
                    scheduleVolumeIncrease()
                }
            } catch (e: Exception) {
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.MotionEvent
import android.view.ViewGroup
import android.view.WindowManager
import android.view.animation.AnimationUtils
import com.simplemobiletools.clock.R
import com.simplemobiletools.clock.extensions.*
import com.simplemobiletools.clock.helpers.ALARM_ID
import com.simplemobiletools.clock.helpers.getPassedSeconds
import com.simplemobiletools.clock.models.Alarm
import com.simplemobiletools.commons.extensions.*
import com.simplemobiletools.commons.helpers.*
import kotlinx.android.synthetic.main.activity_reminder.*

class ReminderActivity : SimpleActivity() {
    private val INCREASE_VOLUME_DELAY = 3000L

    private val increaseVolumeHandler = Handler()
    private val maxReminderDurationHandler = Handler()
    private val swipeGuideFadeHandler = Handler()
    private var isAlarmReminder = false
    private var didVibrate = false
    private var wasAlarmSnoozed = false
    private var alarm: Alarm? = null
    private var mediaPlayer: MediaPlayer? = null
    private var vibrator: Vibrator? = null
    private var lastVolumeValue = 0.1f
    private var dragDownX = 0f

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reminder)
        showOverLockscreen()
        updateTextColors(reminder_holder as ViewGroup)

        val id = intent.getIntExtra(ALARM_ID, -1)
        isAlarmReminder = id != -1
        if (id != -1) {
            alarm = dbHelper.getAlarmWithId(id) ?: return
        }

        val label = if (isAlarmReminder) {
            if (alarm!!.label.isEmpty()) {
                getString(R.string.alarm)
            } else {
                alarm!!.label
            }
        } else {
            getString(R.string.timer)
        }

        reminder_title.text = label
        reminder_text.text = if (isAlarmReminder) getFormattedTime(getPassedSeconds(), false, false) else getString(R.string.time_expired)

        val maxDuration = if (isAlarmReminder) config.alarmMaxReminderSecs else config.timerMaxReminderSecs
        maxReminderDurationHandler.postDelayed({
            finishActivity()
        }, maxDuration * 1000L)

        setupButtons()
        setupEffects()
    }

    override fun onResume() {
        super.onResume()
        setupToolbar(reminder_toolbar)
    }

    private fun setupButtons() {
        if (isAlarmReminder) {
            setupAlarmButtons()
        } else {
            setupTimerButtons()
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun setupAlarmButtons() {
        reminder_stop.beGone()
        reminder_draggable_background.startAnimation(AnimationUtils.loadAnimation(this, R.anim.pulsing_animation))
        reminder_draggable_background.applyColorFilter(getProperPrimaryColor())

        val textColor = getProperTextColor()
        reminder_dismiss.applyColorFilter(textColor)
        reminder_draggable.applyColorFilter(textColor)
        reminder_snooze.applyColorFilter(textColor)

        var minDragX = 0f
        var maxDragX = 0f
        var initialDraggableX = 0f

        reminder_dismiss.onGlobalLayout {
            minDragX = reminder_snooze.left.toFloat()
            maxDragX = reminder_dismiss.left.toFloat()
            initialDraggableX = reminder_draggable.left.toFloat()
        }

        reminder_draggable.setOnTouchListener { v, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    dragDownX = event.x
                    reminder_draggable_background.animate().alpha(0f)
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    dragDownX = 0f
                    if (!didVibrate) {
                        reminder_draggable.animate().x(initialDraggableX).withEndAction {
                            reminder_draggable_background.animate().alpha(0.2f)
                        }

                        reminder_guide.animate().alpha(1f).start()
                        swipeGuideFadeHandler.removeCallbacksAndMessages(null)
                        swipeGuideFadeHandler.postDelayed({
                            reminder_guide.animate().alpha(0f).start()
                        }, 2000L)
                    }
                }
                MotionEvent.ACTION_MOVE -> {
                    reminder_draggable.x = Math.min(maxDragX, Math.max(minDragX, event.rawX - dragDownX))
                    if (reminder_draggable.x >= maxDragX - 50f) {
                        if (!didVibrate) {
                            reminder_draggable.performHapticFeedback()
                            didVibrate = true
                            finishActivity()
                        }

                        if (isOreoPlus()) {
                            notificationManager.cancelAll()
                        }
                    } else if (reminder_draggable.x <= minDragX + 50f) {
                        if (!didVibrate) {
                            reminder_draggable.performHapticFeedback()
                            didVibrate = true
                            snoozeAlarm()
                        }

                        if (isOreoPlus()) {
                            notificationManager.cancelAll()
                        }
                    }
                }
            }
            true
        }
    }

    private fun setupTimerButtons() {
        reminder_stop.background = resources.getColoredDrawableWithColor(R.drawable.circle_background_filled, getProperPrimaryColor())
        arrayOf(reminder_snooze, reminder_draggable_background, reminder_draggable, reminder_dismiss).forEach {
            it.beGone()
        }

        reminder_stop.setOnClickListener {
            finishActivity()
        }
    }

    private fun setupEffects() {
        if (!isAlarmReminder || !config.increaseVolumeGradually) {
            lastVolumeValue = 1f
        }

        val doVibrate = if (alarm != null) alarm!!.vibrate else config.timerVibrate
        if (doVibrate && isOreoPlus()) {
            val pattern = LongArray(2) { 500 }
            vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
            vibrator?.vibrate(VibrationEffect.createWaveform(pattern, 0))
        }

        val soundUri = if (alarm != null) {
            alarm!!.soundUri
        } else {
            config.timerSoundUri
        }

        if (soundUri != SILENT) {
            try {
                mediaPlayer = MediaPlayer().apply {
                    setAudioStreamType(AudioManager.STREAM_ALARM)
                    setDataSource(this@ReminderActivity, Uri.parse(soundUri))
                    setVolume(lastVolumeValue, lastVolumeValue)
                    isLooping = true
                    prepare()
                    start()
                }

                if (config.increaseVolumeGradually) {
                    scheduleVolumeIncrease()
                }
            } catch (e: Exception) {
            }
        }
    }

    private fun scheduleVolumeIncrease() {
        increaseVolumeHandler.postDelayed({
            lastVolumeValue = Math.min(lastVolumeValue + 0.1f, 1f)
            mediaPlayer?.setVolume(lastVolumeValue, lastVolumeValue)
            scheduleVolumeIncrease()
        }, INCREASE_VOLUME_DELAY)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        finishActivity()
    }

    override fun onDestroy() {
        super.onDestroy()
        increaseVolumeHandler.removeCallbacksAndMessages(null)
        maxReminderDurationHandler.removeCallbacksAndMessages(null)
        swipeGuideFadeHandler.removeCallbacksAndMessages(null)
        destroyEffects()
    }

    private fun destroyEffects() {
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
        vibrator?.cancel()
        vibrator = null
    }

    private fun snoozeAlarm() {
        destroyEffects()
        if (config.useSameSnooze) {
            setupAlarmClock(alarm!!, config.snoozeTime * MINUTE_SECONDS)
            wasAlarmSnoozed = true
            finishActivity()
        } else {
            showPickSecondsDialog(config.snoozeTime * MINUTE_SECONDS, true, cancelCallback = { finishActivity() }) {
                config.snoozeTime = it / MINUTE_SECONDS
                setupAlarmClock(alarm!!, it)
                wasAlarmSnoozed = true
                finishActivity()
            }
        }
    }

    private fun finishActivity() {
        if (!wasAlarmSnoozed && alarm != null && alarm!!.days > 0) {
            scheduleNextAlarm(alarm!!, false)
        }

        destroyEffects()
        finish()
        overridePendingTransition(0, 0)
    }

    private fun showOverLockscreen() {
        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD or
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
        )

        if (isOreoMr1Plus()) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
            (getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager).requestDismissKeyguard(this, null)
        }
    }
}


```


**(c). `SettingsActivity.kt`**

> Our `SettingsActivity` class.

Create a Kotlin file named `SettingsActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `*` from the `kotlinx.android.synthetic.main.activity_settings` package.

Then extend the `SimpleActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResume() `.

Then we will be creating the following functions:

1. `setupPurchaseThankYou() `.
2. `setupCustomizeColors() `.
3. `setupUseEnglish() `.
4. `setupLanguage() `.
5. `setupPreventPhoneFromSleeping() `.
6. `setupSundayFirst() `.
7. `setupAlarmMaxReminder() `.
8. `setupUseSameSnooze() `.
9. `checkSnoozeButtonBackgrounds() `.
10. `setupSnoozeTime() `.
11. `setupTimerMaxReminder() `.
12. `setupIncreaseVolumeGradually() `.
13. `updateSnoozeText() `.
14. `updateAlarmMaxReminderText() `.
15. `updateTimerMaxReminderText() `.
16. `setupCustomizeWidgetColors() `.

**(a). Our `setupAlarmMaxReminder()` function.**

A function to setup alarm max reminder:

```kotlin
    private fun setupAlarmMaxReminder() {
        updateAlarmMaxReminderText()
        settings_alarm_max_reminder_holder.setOnClickListener {
            showPickSecondsDialog(config.alarmMaxReminderSecs, true, true) {
                config.alarmMaxReminderSecs = if (it != 0) it else DEFAULT_MAX_ALARM_REMINDER_SECS
                updateAlarmMaxReminderText()
            }
        }
    }
```

**(b). Our `setupUseEnglish()` function.**

A function to setup use english:

```kotlin
    private fun setupUseEnglish() {
        settings_use_english_holder.beVisibleIf((config.wasUseEnglishToggled || Locale.getDefault().language != "en") && !isTiramisuPlus())
        settings_use_english.isChecked = config.useEnglish
        settings_use_english_holder.setOnClickListener {
            settings_use_english.toggle()
            config.useEnglish = settings_use_english.isChecked
            exitProcess(0)
        }
    }
```

**(c). Our `setupSundayFirst()` function.**

A function to setup sunday first:

```kotlin
    private fun setupSundayFirst() {
        settings_sunday_first.isChecked = config.isSundayFirst
        settings_sunday_first_holder.setOnClickListener {
            settings_sunday_first.toggle()
            config.isSundayFirst = settings_sunday_first.isChecked
        }
    }
```

**(d). Our `setupLanguage()` function.**

A function to setup language:

```kotlin
    private fun setupLanguage() {
        settings_language.text = Locale.getDefault().displayLanguage
        settings_language_holder.beVisibleIf(isTiramisuPlus())

        if (settings_use_english_holder.isGone() && settings_language_holder.isGone() && settings_purchase_thank_you_holder.isGone()) {
            settings_prevent_phone_from_sleeping_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
        }

        settings_language_holder.setOnClickListener {
            launchChangeAppLanguageIntent()
        }
    }
```

**(e). Our `updateSnoozeText()` function.**

A function to update snooze text:

```kotlin
    private fun updateSnoozeText() {
        settings_snooze_time.text = formatMinutesToTimeString(config.snoozeTime)
    }
```

**(f). Our `setupPreventPhoneFromSleeping()` function.**

A function to setup prevent phone from sleeping:

```kotlin
    private fun setupPreventPhoneFromSleeping() {
        settings_prevent_phone_from_sleeping.isChecked = config.preventPhoneFromSleeping
        settings_prevent_phone_from_sleeping_holder.setOnClickListener {
            settings_prevent_phone_from_sleeping.toggle()
            config.preventPhoneFromSleeping = settings_prevent_phone_from_sleeping.isChecked
        }
    }
```

**(g). Our `setupCustomizeColors()` function.**

A function to setup customize colors:

```kotlin
    private fun setupCustomizeColors() {
        settings_customize_colors_label.text = getCustomizeColorsString()
        settings_customize_colors_holder.setOnClickListener {
            handleCustomizeColorsClick()
        }
    }
```

**(h). Our `setupIncreaseVolumeGradually()` function.**

A function to setup increase volume gradually:

```kotlin
    private fun setupIncreaseVolumeGradually() {
        settings_increase_volume_gradually.isChecked = config.increaseVolumeGradually
        settings_increase_volume_gradually_holder.setOnClickListener {
            settings_increase_volume_gradually.toggle()
            config.increaseVolumeGradually = settings_increase_volume_gradually.isChecked
        }
    }
```

**(i). Our `updateTimerMaxReminderText()` function.**

A function to update timer max reminder text:

```kotlin
    private fun updateTimerMaxReminderText() {
        settings_timer_max_reminder.text = formatSecondsToTimeString(config.timerMaxReminderSecs)
    }
```

**(j). Our `setupCustomizeWidgetColors()` function.**

A function to setup customize widget colors:

```kotlin
    private fun setupCustomizeWidgetColors() {
        settings_customize_widget_colors_holder.setOnClickListener {
            Intent(this, WidgetDigitalConfigureActivity::class.java).apply {
                putExtra(IS_CUSTOMIZING_COLORS, true)
                startActivity(this)
            }
        }
    }
```

**(k). Our `setupTimerMaxReminder()` function.**

A function to setup timer max reminder:

```kotlin
    private fun setupTimerMaxReminder() {
        updateTimerMaxReminderText()
        settings_timer_max_reminder_holder.setOnClickListener {
            showPickSecondsDialog(config.timerMaxReminderSecs, true, true) {
                config.timerMaxReminderSecs = if (it != 0) it else DEFAULT_MAX_TIMER_REMINDER_SECS
                updateTimerMaxReminderText()
            }
        }
    }
```

**(m). Our `updateAlarmMaxReminderText()` function.**

A function to update alarm max reminder text:

```kotlin
    private fun updateAlarmMaxReminderText() {
        settings_alarm_max_reminder.text = formatSecondsToTimeString(config.alarmMaxReminderSecs)
    }
```

**(n). Our `setupUseSameSnooze()` function.**

A function to setup use same snooze:

```kotlin
    private fun setupUseSameSnooze() {
        settings_snooze_time_holder.beVisibleIf(config.useSameSnooze)
        settings_use_same_snooze.isChecked = config.useSameSnooze
        checkSnoozeButtonBackgrounds()
        settings_use_same_snooze_holder.setOnClickListener {
            settings_use_same_snooze.toggle()
            config.useSameSnooze = settings_use_same_snooze.isChecked
            settings_snooze_time_holder.beVisibleIf(config.useSameSnooze)
            checkSnoozeButtonBackgrounds()
        }
    }
```

**(o). Our `checkSnoozeButtonBackgrounds()` function.**

A function to check snooze button backgrounds:

```kotlin
    private fun checkSnoozeButtonBackgrounds() {
        val backgroundId = if (settings_use_same_snooze.isChecked) {
            R.drawable.ripple_background
        } else {
            R.drawable.ripple_bottom_corners
        }

        settings_use_same_snooze_holder.background = resources.getDrawable(backgroundId, theme)
    }
```

**(p). Our `setupPurchaseThankYou()` function.**

A function to setup purchase thank you:

```kotlin
    private fun setupPurchaseThankYou() {
        settings_purchase_thank_you_holder.beGoneIf(isOrWasThankYouInstalled())

        // make sure the corners at ripple fit the stroke rounded corners
        if (settings_purchase_thank_you_holder.isGone()) {
            settings_use_english_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
            settings_language_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
        }

        settings_purchase_thank_you_holder.setOnClickListener {
            launchPurchaseThankYouIntent()
        }
    }
```

**(q). Our `setupSnoozeTime()` function.**

A function to setup snooze time:

```kotlin
    private fun setupSnoozeTime() {
        updateSnoozeText()
        settings_snooze_time_holder.setOnClickListener {
            showPickSecondsDialog(config.snoozeTime * MINUTE_SECONDS, true) {
                config.snoozeTime = it / MINUTE_SECONDS
                updateSnoozeText()
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.os.Bundle
import com.simplemobiletools.clock.R
import com.simplemobiletools.clock.extensions.config
import com.simplemobiletools.clock.helpers.DEFAULT_MAX_ALARM_REMINDER_SECS
import com.simplemobiletools.clock.helpers.DEFAULT_MAX_TIMER_REMINDER_SECS
import com.simplemobiletools.commons.extensions.*
import com.simplemobiletools.commons.helpers.IS_CUSTOMIZING_COLORS
import com.simplemobiletools.commons.helpers.MINUTE_SECONDS
import com.simplemobiletools.commons.helpers.NavigationIcon
import com.simplemobiletools.commons.helpers.isTiramisuPlus
import kotlinx.android.synthetic.main.activity_settings.*
import java.util.*
import kotlin.system.exitProcess

class SettingsActivity : SimpleActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)
    }

    override fun onResume() {
        super.onResume()
        setupToolbar(settings_toolbar, NavigationIcon.Arrow)

        setupPurchaseThankYou()
        setupCustomizeColors()
        setupUseEnglish()
        setupLanguage()
        setupPreventPhoneFromSleeping()
        setupSundayFirst()
        setupAlarmMaxReminder()
        setupUseSameSnooze()
        setupSnoozeTime()
        setupTimerMaxReminder()
        setupIncreaseVolumeGradually()
        setupCustomizeWidgetColors()
        updateTextColors(settings_holder)

        arrayOf(
            settings_color_customization_label,
            settings_general_settings_label,
            settings_alarm_tab_label,
            settings_timer_tab_label,
        ).forEach {
            it.setTextColor(getProperPrimaryColor())
        }

        arrayOf(
            settings_color_customization_holder,
            settings_general_settings_holder,
            settings_alarm_tab_holder,
            settings_timer_tab_holder,
        ).forEach {
            it.background.applyColorFilter(getProperBackgroundColor().getContrastColor())
        }
    }

    private fun setupPurchaseThankYou() {
        settings_purchase_thank_you_holder.beGoneIf(isOrWasThankYouInstalled())

        // make sure the corners at ripple fit the stroke rounded corners
        if (settings_purchase_thank_you_holder.isGone()) {
            settings_use_english_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
            settings_language_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
        }

        settings_purchase_thank_you_holder.setOnClickListener {
            launchPurchaseThankYouIntent()
        }
    }

    private fun setupCustomizeColors() {
        settings_customize_colors_label.text = getCustomizeColorsString()
        settings_customize_colors_holder.setOnClickListener {
            handleCustomizeColorsClick()
        }
    }

    private fun setupUseEnglish() {
        settings_use_english_holder.beVisibleIf((config.wasUseEnglishToggled || Locale.getDefault().language != "en") && !isTiramisuPlus())
        settings_use_english.isChecked = config.useEnglish
        settings_use_english_holder.setOnClickListener {
            settings_use_english.toggle()
            config.useEnglish = settings_use_english.isChecked
            exitProcess(0)
        }
    }

    private fun setupLanguage() {
        settings_language.text = Locale.getDefault().displayLanguage
        settings_language_holder.beVisibleIf(isTiramisuPlus())

        if (settings_use_english_holder.isGone() && settings_language_holder.isGone() && settings_purchase_thank_you_holder.isGone()) {
            settings_prevent_phone_from_sleeping_holder.background = resources.getDrawable(R.drawable.ripple_top_corners, theme)
        }

        settings_language_holder.setOnClickListener {
            launchChangeAppLanguageIntent()
        }
    }

    private fun setupPreventPhoneFromSleeping() {
        settings_prevent_phone_from_sleeping.isChecked = config.preventPhoneFromSleeping
        settings_prevent_phone_from_sleeping_holder.setOnClickListener {
            settings_prevent_phone_from_sleeping.toggle()
            config.preventPhoneFromSleeping = settings_prevent_phone_from_sleeping.isChecked
        }
    }

    private fun setupSundayFirst() {
        settings_sunday_first.isChecked = config.isSundayFirst
        settings_sunday_first_holder.setOnClickListener {
            settings_sunday_first.toggle()
            config.isSundayFirst = settings_sunday_first.isChecked
        }
    }

    private fun setupAlarmMaxReminder() {
        updateAlarmMaxReminderText()
        settings_alarm_max_reminder_holder.setOnClickListener {
            showPickSecondsDialog(config.alarmMaxReminderSecs, true, true) {
                config.alarmMaxReminderSecs = if (it != 0) it else DEFAULT_MAX_ALARM_REMINDER_SECS
                updateAlarmMaxReminderText()
            }
        }
    }

    private fun setupUseSameSnooze() {
        settings_snooze_time_holder.beVisibleIf(config.useSameSnooze)
        settings_use_same_snooze.isChecked = config.useSameSnooze
        checkSnoozeButtonBackgrounds()
        settings_use_same_snooze_holder.setOnClickListener {
            settings_use_same_snooze.toggle()
            config.useSameSnooze = settings_use_same_snooze.isChecked
            settings_snooze_time_holder.beVisibleIf(config.useSameSnooze)
            checkSnoozeButtonBackgrounds()
        }
    }

    private fun checkSnoozeButtonBackgrounds() {
        val backgroundId = if (settings_use_same_snooze.isChecked) {
            R.drawable.ripple_background
        } else {
            R.drawable.ripple_bottom_corners
        }

        settings_use_same_snooze_holder.background = resources.getDrawable(backgroundId, theme)
    }

    private fun setupSnoozeTime() {
        updateSnoozeText()
        settings_snooze_time_holder.setOnClickListener {
            showPickSecondsDialog(config.snoozeTime * MINUTE_SECONDS, true) {
                config.snoozeTime = it / MINUTE_SECONDS
                updateSnoozeText()
            }
        }
    }

    private fun setupTimerMaxReminder() {
        updateTimerMaxReminderText()
        settings_timer_max_reminder_holder.setOnClickListener {
            showPickSecondsDialog(config.timerMaxReminderSecs, true, true) {
                config.timerMaxReminderSecs = if (it != 0) it else DEFAULT_MAX_TIMER_REMINDER_SECS
                updateTimerMaxReminderText()
            }
        }
    }

    private fun setupIncreaseVolumeGradually() {
        settings_increase_volume_gradually.isChecked = config.increaseVolumeGradually
        settings_increase_volume_gradually_holder.setOnClickListener {
            settings_increase_volume_gradually.toggle()
            config.increaseVolumeGradually = settings_increase_volume_gradually.isChecked
        }
    }

    private fun updateSnoozeText() {
        settings_snooze_time.text = formatMinutesToTimeString(config.snoozeTime)
    }

    private fun updateAlarmMaxReminderText() {
        settings_alarm_max_reminder.text = formatSecondsToTimeString(config.alarmMaxReminderSecs)
    }

    private fun updateTimerMaxReminderText() {
        settings_timer_max_reminder.text = formatSecondsToTimeString(config.timerMaxReminderSecs)
    }

    private fun setupCustomizeWidgetColors() {
        settings_customize_widget_colors_holder.setOnClickListener {
            Intent(this, WidgetDigitalConfigureActivity::class.java).apply {
                putExtra(IS_CUSTOMIZING_COLORS, true)
                startActivity(this)
            }
        }
    }
}


```


**(d). `SimpleActivity.kt`**

> Our `SimpleActivity` class.

Create a Kotlin file named `SimpleActivity.kt` .

Then extend the `BaseSimpleActivity` and add its contents as follows:

First override these callbacks: 


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.simplemobiletools.clock.R
import com.simplemobiletools.commons.activities.BaseSimpleActivity

open class SimpleActivity : BaseSimpleActivity() {
    override fun getAppIconIDs() = arrayListOf(
            R.mipmap.ic_launcher_red,
            R.mipmap.ic_launcher_pink,
            R.mipmap.ic_launcher_purple,
            R.mipmap.ic_launcher_deep_purple,
            R.mipmap.ic_launcher_indigo,
            R.mipmap.ic_launcher_blue,
            R.mipmap.ic_launcher_light_blue,
            R.mipmap.ic_launcher_cyan,
            R.mipmap.ic_launcher_teal,
            R.mipmap.ic_launcher_green,
            R.mipmap.ic_launcher_light_green,
            R.mipmap.ic_launcher_lime,
            R.mipmap.ic_launcher_yellow,
            R.mipmap.ic_launcher_amber,
            R.mipmap.ic_launcher,
            R.mipmap.ic_launcher_deep_orange,
            R.mipmap.ic_launcher_brown,
            R.mipmap.ic_launcher_blue_grey,
            R.mipmap.ic_launcher_grey_black
    )

    override fun getAppLauncherName() = getString(R.string.app_launcher_name)
}


```


**(e). `SnoozeReminderActivity.kt`**

> Our `SnoozeReminderActivity` class.

Create a Kotlin file named `SnoozeReminderActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `dialogCancelled() `.
2. `finishActivity() `.

**(a). Our `finishActivity()` function.**

A function to finish activity:

```kotlin
    private fun finishActivity() {
        finish()
        overridePendingTransition(0, 0)
    }
```

**(b). Our `dialogCancelled()` function.**

A function to dialog cancelled:

```kotlin
    private fun dialogCancelled() {
        finishActivity()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.simplemobiletools.clock.extensions.config
import com.simplemobiletools.clock.extensions.dbHelper
import com.simplemobiletools.clock.extensions.hideNotification
import com.simplemobiletools.clock.extensions.setupAlarmClock
import com.simplemobiletools.clock.helpers.ALARM_ID
import com.simplemobiletools.commons.extensions.showPickSecondsDialog
import com.simplemobiletools.commons.helpers.MINUTE_SECONDS

class SnoozeReminderActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val id = intent.getIntExtra(ALARM_ID, -1)
        val alarm = dbHelper.getAlarmWithId(id) ?: return
        hideNotification(id)
        showPickSecondsDialog(config.snoozeTime * MINUTE_SECONDS, true, cancelCallback = { dialogCancelled() }) {
            config.snoozeTime = it / MINUTE_SECONDS
            setupAlarmClock(alarm, it)
            finishActivity()
        }
    }

    private fun dialogCancelled() {
        finishActivity()
    }

    private fun finishActivity() {
        finish()
        overridePendingTransition(0, 0)
    }
}


```


**(f). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.

Then extend the `BaseSplashActivity` and add its contents as follows:

First override these callbacks: 

1. `initActivity() `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.simplemobiletools.clock.helpers.*
import com.simplemobiletools.commons.activities.BaseSplashActivity

class SplashActivity : BaseSplashActivity() {
    override fun initActivity() {
        when {
            intent?.action == "android.intent.action.SHOW_ALARMS" -> {
                Intent(this, MainActivity::class.java).apply {
                    putExtra(OPEN_TAB, TAB_ALARM)
                    startActivity(this)
                }
            }
            intent?.action == STOPWATCH_TOGGLE_ACTION -> {
                Intent(this, MainActivity::class.java).apply {
                    putExtra(OPEN_TAB, TAB_STOPWATCH)
                    putExtra(TOGGLE_STOPWATCH, intent.getBooleanExtra(TOGGLE_STOPWATCH, false))
                    startActivity(this)
                }
            }
            intent.extras?.containsKey(OPEN_TAB) == true -> {
                Intent(this, MainActivity::class.java).apply {
                    putExtra(OPEN_TAB, intent.getIntExtra(OPEN_TAB, TAB_CLOCK))
                    putExtra(TIMER_ID, intent.getIntExtra(TIMER_ID, INVALID_TIMER_ID))
                    startActivity(this)
                }
            }
            else -> startActivity(Intent(this, MainActivity::class.java))
        }
        finish()
    }
}


```


**(g). `WidgetAnalogueConfigureActivity.kt`**

> Our `WidgetAnalogueConfigureActivity` class.

Create a Kotlin file named `WidgetAnalogueConfigureActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ColorStateList` from the `android.content.res` package.
2. `Color` from the `android.graphics` package.
3. `Bundle` from the `android.os` package.
4. `SeekBar` from the `android.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.widget_config_analogue` package.

Then extend the `SimpleActivity` and add its contents as follows:

First override these callbacks: 

1. `onResume() `.
2. `onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) `.
3. `onStartTrackingTouch(seekBar: SeekBar) `.
4. `onStopTrackingTouch(seekBar: SeekBar) `.

Then we will be creating the following functions:

1. `onCreate(parameter)` - This function will take a `Bundle?` object as a parameter.
2. `initVariables() `.
3. `saveConfig() `.
4. `storeWidgetColors() `.
5. `pickBackgroundColor() `.
6. `requestWidgetUpdate() `.
7. `updateBackgroundColor() `.

**(a). Our `pickBackgroundColor()` function.**

A function to pick background color:

```kotlin
    private fun pickBackgroundColor() {
        ColorPickerDialog(this, mBgColorWithoutTransparency) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mBgColorWithoutTransparency = color
                updateBackgroundColor()
            }
        }
    }
```

**(b). Our `initVariables()` function.**

A function to init variables:

```kotlin
    private fun initVariables() {
        mBgColor = config.widgetBgColor
        mBgAlpha = Color.alpha(mBgColor) / 255.toFloat()
        mBgColorWithoutTransparency = Color.rgb(Color.red(mBgColor), Color.green(mBgColor), Color.blue(mBgColor))

        config_analogue_bg_seekbar.setOnSeekBarChangeListener(bgSeekbarChangeListener)
        config_analogue_bg_seekbar.progress = (mBgAlpha * 100).toInt()
        updateBackgroundColor()
    }
```

**(c). Our `saveConfig()` function.**

A function to save config:

```kotlin
    private fun saveConfig() {
        storeWidgetColors()
        requestWidgetUpdate()

        Intent().apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mWidgetId)
            setResult(Activity.RESULT_OK, this)
        }
        finish()
    }
```

**(d). Our `storeWidgetColors()` function.**

A function to store widget colors:

```kotlin
    private fun storeWidgetColors() {
        config.apply {
            widgetBgColor = mBgColor
        }
    }
```

**(e). Our `requestWidgetUpdate()` function.**

A function to request widget update:

```kotlin
    private fun requestWidgetUpdate() {
        Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE, null, this, MyAnalogueTimeWidgetProvider::class.java).apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(mWidgetId))
            sendBroadcast(this)
        }
    }
```

**(f). Our `updateBackgroundColor()` function.**

A function to update background color:

```kotlin
    private fun updateBackgroundColor() {
        mBgColor = mBgColorWithoutTransparency.adjustAlpha(mBgAlpha)
        config_analogue_bg_color.setFillWithStroke(mBgColor, mBgColor)
        config_analogue_background.applyColorFilter(mBgColor)
        config_analogue_save.backgroundTintList = ColorStateList.valueOf(getProperPrimaryColor())
    }
```

**(g). Our `onCreate()` function.**

A function to on create:

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        useDynamicTheme = false
        super.onCreate(savedInstanceState)
        setResult(Activity.RESULT_CANCELED)
        setContentView(R.layout.widget_config_analogue)
        initVariables()

        val isCustomizingColors = intent.extras?.getBoolean(IS_CUSTOMIZING_COLORS) ?: false
        mWidgetId = intent.extras?.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        if (mWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID && !isCustomizingColors) {
            finish()
        }

        config_analogue_save.setOnClickListener { saveConfig() }
        config_analogue_save.setTextColor(getProperPrimaryColor().getContrastColor())
        config_analogue_bg_color.setOnClickListener { pickBackgroundColor() }

        val primaryColor = getProperPrimaryColor()
        config_analogue_bg_seekbar.setColors(getProperTextColor(), primaryColor, primaryColor)

        if (!isCustomizingColors && !isOrWasThankYouInstalled()) {
            mFeatureLockedDialog = FeatureLockedDialog(this) {
                if (!isOrWasThankYouInstalled()) {
                    finish()
                }
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.widget.SeekBar
import com.simplemobiletools.clock.R
import com.simplemobiletools.clock.extensions.config
import com.simplemobiletools.clock.helpers.MyAnalogueTimeWidgetProvider
import com.simplemobiletools.commons.dialogs.ColorPickerDialog
import com.simplemobiletools.commons.dialogs.FeatureLockedDialog
import com.simplemobiletools.commons.extensions.*
import com.simplemobiletools.commons.helpers.IS_CUSTOMIZING_COLORS
import kotlinx.android.synthetic.main.widget_config_analogue.*

class WidgetAnalogueConfigureActivity : SimpleActivity() {
    private var mBgAlpha = 0f
    private var mWidgetId = 0
    private var mBgColor = 0
    private var mBgColorWithoutTransparency = 0
    private var mFeatureLockedDialog: FeatureLockedDialog? = null

    public override fun onCreate(savedInstanceState: Bundle?) {
        useDynamicTheme = false
        super.onCreate(savedInstanceState)
        setResult(Activity.RESULT_CANCELED)
        setContentView(R.layout.widget_config_analogue)
        initVariables()

        val isCustomizingColors = intent.extras?.getBoolean(IS_CUSTOMIZING_COLORS) ?: false
        mWidgetId = intent.extras?.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        if (mWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID && !isCustomizingColors) {
            finish()
        }

        config_analogue_save.setOnClickListener { saveConfig() }
        config_analogue_save.setTextColor(getProperPrimaryColor().getContrastColor())
        config_analogue_bg_color.setOnClickListener { pickBackgroundColor() }

        val primaryColor = getProperPrimaryColor()
        config_analogue_bg_seekbar.setColors(getProperTextColor(), primaryColor, primaryColor)

        if (!isCustomizingColors && !isOrWasThankYouInstalled()) {
            mFeatureLockedDialog = FeatureLockedDialog(this) {
                if (!isOrWasThankYouInstalled()) {
                    finish()
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        setupToolbar(config_toolbar)
        if (mFeatureLockedDialog != null && isOrWasThankYouInstalled()) {
            mFeatureLockedDialog?.dismissDialog()
        }
    }

    private fun initVariables() {
        mBgColor = config.widgetBgColor
        mBgAlpha = Color.alpha(mBgColor) / 255.toFloat()
        mBgColorWithoutTransparency = Color.rgb(Color.red(mBgColor), Color.green(mBgColor), Color.blue(mBgColor))

        config_analogue_bg_seekbar.setOnSeekBarChangeListener(bgSeekbarChangeListener)
        config_analogue_bg_seekbar.progress = (mBgAlpha * 100).toInt()
        updateBackgroundColor()
    }

    private fun saveConfig() {
        storeWidgetColors()
        requestWidgetUpdate()

        Intent().apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mWidgetId)
            setResult(Activity.RESULT_OK, this)
        }
        finish()
    }

    private fun storeWidgetColors() {
        config.apply {
            widgetBgColor = mBgColor
        }
    }

    private fun pickBackgroundColor() {
        ColorPickerDialog(this, mBgColorWithoutTransparency) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mBgColorWithoutTransparency = color
                updateBackgroundColor()
            }
        }
    }

    private fun requestWidgetUpdate() {
        Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE, null, this, MyAnalogueTimeWidgetProvider::class.java).apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(mWidgetId))
            sendBroadcast(this)
        }
    }

    private fun updateBackgroundColor() {
        mBgColor = mBgColorWithoutTransparency.adjustAlpha(mBgAlpha)
        config_analogue_bg_color.setFillWithStroke(mBgColor, mBgColor)
        config_analogue_background.applyColorFilter(mBgColor)
        config_analogue_save.backgroundTintList = ColorStateList.valueOf(getProperPrimaryColor())
    }

    private val bgSeekbarChangeListener = object : SeekBar.OnSeekBarChangeListener {
        override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
            mBgAlpha = progress.toFloat() / 100.toFloat()
            updateBackgroundColor()
        }

        override fun onStartTrackingTouch(seekBar: SeekBar) {}

        override fun onStopTrackingTouch(seekBar: SeekBar) {}
    }
}


```


**(h). `WidgetDigitalConfigureActivity.kt`**

> Our `WidgetDigitalConfigureActivity` class.

Create a Kotlin file named `WidgetDigitalConfigureActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Color` from the `android.graphics` package.
2. `Build` from the `android.os` package.
3. `Bundle` from the `android.os` package.
4. `SeekBar` from the `android.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.widget_config_digital` package.

Then extend the `SimpleActivity` and add its contents as follows:

First override these callbacks: 

1. `onResume() `.
2. `onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) `.
3. `onStartTrackingTouch(seekBar: SeekBar) `.
4. `onStopTrackingTouch(seekBar: SeekBar) `.

Then we will be creating the following functions:

1. `onCreate(parameter)` - Pass to this method a `Bundle?` object as a parameter.
2. `initVariables() `.
3. `saveConfig() `.
4. `storeWidgetColors() `.
5. `pickBackgroundColor() `.
6. `pickTextColor() `.
7. `requestWidgetUpdate() `.
8. `updateTextColor() `.
9. `updateBackgroundColor() `.

**(a). Our `pickBackgroundColor()` function.**

A function to pick background color:

```kotlin
    private fun pickBackgroundColor() {
        ColorPickerDialog(this, mBgColorWithoutTransparency) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mBgColorWithoutTransparency = color
                updateBackgroundColor()
            }
        }
    }
```

**(b). Our `initVariables()` function.**

A function to init variables:

```kotlin
    private fun initVariables() {
        mBgColor = config.widgetBgColor
        mBgAlpha = Color.alpha(mBgColor) / 255.toFloat()
        mBgColorWithoutTransparency = Color.rgb(Color.red(mBgColor), Color.green(mBgColor), Color.blue(mBgColor))

        config_digital_bg_seekbar.setOnSeekBarChangeListener(bgSeekbarChangeListener)
        config_digital_bg_seekbar.progress = (mBgAlpha * 100).toInt()
        updateBackgroundColor()

        mTextColor = config.widgetTextColor
        updateTextColor()
    }
```

**(c). Our `updateTextColor()` function.**

A function to update text color:

```kotlin
    private fun updateTextColor() {
        config_digital_text_color.setFillWithStroke(mTextColor, mTextColor)
        config_digital_time.setTextColor(mTextColor)
        config_digital_date.setTextColor(mTextColor)
        config_digital_save.setTextColor(getProperPrimaryColor().getContrastColor())
    }
```

**(d). Our `saveConfig()` function.**

A function to save config:

```kotlin
    private fun saveConfig() {
        storeWidgetColors()
        requestWidgetUpdate()

        Intent().apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mWidgetId)
            setResult(Activity.RESULT_OK, this)
        }
        finish()
    }
```

**(e). Our `storeWidgetColors()` function.**

A function to store widget colors:

```kotlin
    private fun storeWidgetColors() {
        config.apply {
            widgetBgColor = mBgColor
            widgetTextColor = mTextColor
        }
    }
```

**(f). Our `requestWidgetUpdate()` function.**

A function to request widget update:

```kotlin
    private fun requestWidgetUpdate() {
        Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE, null, this, MyDigitalTimeWidgetProvider::class.java).apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(mWidgetId))
            sendBroadcast(this)
        }
    }
```

**(g). Our `updateBackgroundColor()` function.**

A function to update background color:

```kotlin
    private fun updateBackgroundColor() {
        mBgColor = mBgColorWithoutTransparency.adjustAlpha(mBgAlpha)
        config_digital_bg_color.setFillWithStroke(mBgColor, mBgColor)
        config_digital_background.applyColorFilter(mBgColor)
        config_digital_save.backgroundTintList = ColorStateList.valueOf(getProperPrimaryColor())
    }
```

**(h). Our `onCreate()` function.**

A function to on create:

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        useDynamicTheme = false
        super.onCreate(savedInstanceState)
        setResult(Activity.RESULT_CANCELED)
        setContentView(R.layout.widget_config_digital)
        initVariables()

        mWidgetId = intent.extras?.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        if (!config.wasInitialWidgetSetUp && Build.BRAND.equals(SIMPLE_PHONE, true)) {
            saveConfig()
            config.wasInitialWidgetSetUp = true
            return
        }

        val isCustomizingColors = intent.extras?.getBoolean(IS_CUSTOMIZING_COLORS) ?: false
        if (mWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID && !isCustomizingColors) {
            finish()
        }

        config_digital_save.setOnClickListener { saveConfig() }
        config_digital_bg_color.setOnClickListener { pickBackgroundColor() }
        config_digital_text_color.setOnClickListener { pickTextColor() }

        val primaryColor = getProperPrimaryColor()
        config_digital_bg_seekbar.setColors(mTextColor, primaryColor, primaryColor)

        if (!isCustomizingColors && !isOrWasThankYouInstalled()) {
            mFeatureLockedDialog = FeatureLockedDialog(this) {
                if (!isOrWasThankYouInstalled()) {
                    finish()
                }
            }
        }
    }
```

**(i). Our `pickTextColor()` function.**

A function to pick text color:

```kotlin
    private fun pickTextColor() {
        ColorPickerDialog(this, mTextColor) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mTextColor = color
                updateTextColor()
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.widget.SeekBar
import com.simplemobiletools.clock.R
import com.simplemobiletools.clock.extensions.config
import com.simplemobiletools.clock.helpers.MyDigitalTimeWidgetProvider
import com.simplemobiletools.clock.helpers.SIMPLE_PHONE
import com.simplemobiletools.commons.dialogs.ColorPickerDialog
import com.simplemobiletools.commons.dialogs.FeatureLockedDialog
import com.simplemobiletools.commons.extensions.*
import com.simplemobiletools.commons.helpers.IS_CUSTOMIZING_COLORS
import kotlinx.android.synthetic.main.widget_config_digital.*

class WidgetDigitalConfigureActivity : SimpleActivity() {
    private var mBgAlpha = 0f
    private var mWidgetId = 0
    private var mBgColor = 0
    private var mTextColor = 0
    private var mBgColorWithoutTransparency = 0
    private var mFeatureLockedDialog: FeatureLockedDialog? = null

    public override fun onCreate(savedInstanceState: Bundle?) {
        useDynamicTheme = false
        super.onCreate(savedInstanceState)
        setResult(Activity.RESULT_CANCELED)
        setContentView(R.layout.widget_config_digital)
        initVariables()

        mWidgetId = intent.extras?.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        if (!config.wasInitialWidgetSetUp && Build.BRAND.equals(SIMPLE_PHONE, true)) {
            saveConfig()
            config.wasInitialWidgetSetUp = true
            return
        }

        val isCustomizingColors = intent.extras?.getBoolean(IS_CUSTOMIZING_COLORS) ?: false
        if (mWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID && !isCustomizingColors) {
            finish()
        }

        config_digital_save.setOnClickListener { saveConfig() }
        config_digital_bg_color.setOnClickListener { pickBackgroundColor() }
        config_digital_text_color.setOnClickListener { pickTextColor() }

        val primaryColor = getProperPrimaryColor()
        config_digital_bg_seekbar.setColors(mTextColor, primaryColor, primaryColor)

        if (!isCustomizingColors && !isOrWasThankYouInstalled()) {
            mFeatureLockedDialog = FeatureLockedDialog(this) {
                if (!isOrWasThankYouInstalled()) {
                    finish()
                }
            }
        }
    }

    override fun onResume() {
        super.onResume()
        setupToolbar(config_toolbar)
        if (mFeatureLockedDialog != null && isOrWasThankYouInstalled()) {
            mFeatureLockedDialog?.dismissDialog()
        }
    }

    private fun initVariables() {
        mBgColor = config.widgetBgColor
        mBgAlpha = Color.alpha(mBgColor) / 255.toFloat()
        mBgColorWithoutTransparency = Color.rgb(Color.red(mBgColor), Color.green(mBgColor), Color.blue(mBgColor))

        config_digital_bg_seekbar.setOnSeekBarChangeListener(bgSeekbarChangeListener)
        config_digital_bg_seekbar.progress = (mBgAlpha * 100).toInt()
        updateBackgroundColor()

        mTextColor = config.widgetTextColor
        updateTextColor()
    }

    private fun saveConfig() {
        storeWidgetColors()
        requestWidgetUpdate()

        Intent().apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mWidgetId)
            setResult(Activity.RESULT_OK, this)
        }
        finish()
    }

    private fun storeWidgetColors() {
        config.apply {
            widgetBgColor = mBgColor
            widgetTextColor = mTextColor
        }
    }

    private fun pickBackgroundColor() {
        ColorPickerDialog(this, mBgColorWithoutTransparency) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mBgColorWithoutTransparency = color
                updateBackgroundColor()
            }
        }
    }

    private fun pickTextColor() {
        ColorPickerDialog(this, mTextColor) { wasPositivePressed, color ->
            if (wasPositivePressed) {
                mTextColor = color
                updateTextColor()
            }
        }
    }

    private fun requestWidgetUpdate() {
        Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE, null, this, MyDigitalTimeWidgetProvider::class.java).apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(mWidgetId))
            sendBroadcast(this)
        }
    }

    private fun updateTextColor() {
        config_digital_text_color.setFillWithStroke(mTextColor, mTextColor)
        config_digital_time.setTextColor(mTextColor)
        config_digital_date.setTextColor(mTextColor)
        config_digital_save.setTextColor(getProperPrimaryColor().getContrastColor())
    }

    private fun updateBackgroundColor() {
        mBgColor = mBgColorWithoutTransparency.adjustAlpha(mBgAlpha)
        config_digital_bg_color.setFillWithStroke(mBgColor, mBgColor)
        config_digital_background.applyColorFilter(mBgColor)
        config_digital_save.backgroundTintList = ColorStateList.valueOf(getProperPrimaryColor())
    }

    private val bgSeekbarChangeListener = object : SeekBar.OnSeekBarChangeListener {
        override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
            mBgAlpha = progress.toFloat() / 100.toFloat()
            updateBackgroundColor()
        }

        override fun onStartTrackingTouch(seekBar: SeekBar) {}

        override fun onStopTrackingTouch(seekBar: SeekBar) {}
    }
}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/SimpleMobileTools/Simple-Clock/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/SimpleMobileTools/Simple-Clock).|
|3.|Follow code author [here](https://github.com/SimpleMobileTools).|
