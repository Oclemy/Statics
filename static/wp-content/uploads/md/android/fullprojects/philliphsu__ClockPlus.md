# Clock+

>  Alarm clock, timer, and stopwatch application for Android..

Clock+ is a simple alarm clock, timer, and stopwatch app that offers a delightful user experience for all your timing needs.

Highlights:

- Clean, minimalistic design: Features Material Design throughout.
- List of timers: See all of your timers in one scrollable list, and control each one individually.
- Themes: Choose between light, dark, and black themes.


![Clock+ Tutorial](https://camo.githubusercontent.com/2149f526e69167218eb7eea8f21cb74a756aa43495f7acfeccfe995d40f62028/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e5f62616467655f7765625f67656e657269632e706e67)

![Clock+ Tutorial](https://camo.githubusercontent.com/fefd7089be3e793fb7858c5965f46e046d5bb78eac6d7f5bdd11f3e737b226a4/68747470733a2f2f662d64726f69642e6f72672f62616467652f6765742d69742d6f6e2e706e67)

![Clock+ Tutorial](https://cloud.githubusercontent.com/assets/19766085/19008497/830d2844-8720-11e6-8b8e-ff01ebcc26fe.png)

![Clock+ Tutorial](https://cloud.githubusercontent.com/assets/19766085/19008498/8312eeaa-8720-11e6-9dc8-2079eb9c50f7.png)

![Clock+ Tutorial](https://cloud.githubusercontent.com/assets/19766085/19008382/cc800614-871f-11e6-8fab-d1be69807e91.png)

Let us look at the full Clock+ code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 2 plugins:

1. Our `com.android.application` plugin.
2. Our `com.neenbedankt.android-apt` plugin.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'com.neenbedankt.android-apt'

// =============================================================================
// https://developer.android.com/studio/publish/app-signing.html#secure-shared-keystore

// Create a variable called keystorePropertiesFile, and initialize it to your
// keystore.properties file, in the rootProject folder.
def keystorePropertiesFile = rootProject.file("keystore.properties")

// Initialize a new Properties() object called keystoreProperties.
def keystoreProperties = new Properties()

// Load your keystore.properties file into the keystoreProperties object.
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

// =============================================================================

android {
    signingConfigs {
        config {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    compileSdkVersion 25
    buildToolsVersion "24.0.3"
    defaultConfig {
        applicationId 'com.philliphsu.clock2'
        minSdkVersion 19
        targetSdkVersion 25
        versionCode 113
        versionName "1.1.3"
        // Disabled for now because we're not ready to
        // completely port over to vector drawables
//        vectorDrawables.useSupportLibrary = true
    }
    buildTypes {
        release {
            // https://developer.android.com/studio/build/shrink-code.html#shrink-code
            //
            // Proguard is disabled, because it seems like it is removing
            // ButterKnife generated code and I don't know how to fix it...
            minifyEnabled false
            // "'proguard-android-optimize.txt' includes the same ProGuard rules
            // [as 'proguard-android.txt'], but with other optimizations that
            // perform analysis at the bytecode level—inside and across methods—
            // to reduce your APK size further and help it run faster."
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.config
        }
        debug {
            applicationIdSuffix ".debug"
        }
    }
    productFlavors {
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    testCompile 'org.mockito:mockito-core:1.10.19'
    provided 'com.google.auto.value:auto-value:1.2'
    apt 'com.google.auto.value:auto-value:1.2'
    compile 'com.android.support:appcompat-v7:25.1.0'
    compile 'com.android.support:design:25.1.0'
    compile 'com.android.support:recyclerview-v7:25.1.0'
    compile 'com.android.support:gridlayout-v7:25.1.0'
    compile 'com.android.support:cardview-v7:25.1.0'
    compile 'com.jakewharton:butterknife:7.0.1'
    compile('com.philliphsu:bottomsheetpickers:2.3.2') {
        exclude group: 'com.android.support', module: 'appcompat-v7'
        exclude group: 'com.android.support', module: 'design'
        exclude group: 'com.android.support', module: 'gridlayout-v7'
    }
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 5 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. We will be creating 5 [`Services`](htpps://android.examples.directory/service) which we have to register as well. We will be defining 2 `meta-data` tags as shown below. Here we will add the following permission:

1. Our `VIBRATE` permission.
2. Our `RECEIVE_BOOT_COMPLETED` permission.
3. Our `READ_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>

<manifest package="com.philliphsu.clock2"
          xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.VIBRATE"/>
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:launchMode="singleTask">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

        <receiver
            android:name=".alarms.background.UpcomingAlarmReceiver"
            android:enabled="true"
            android:exported="false">
        </receiver>

        <activity
            android:name=".settings.SettingsActivity"
            android:label="@string/title_activity_settings"
            android:parentActivityName=".MainActivity">
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value="com.philliphsu.clock2.MainActivity"/>
        </activity>

        <receiver
            android:name=".alarms.background.PendingAlarmScheduler"
            android:enabled="true"
            android:exported="false">
        </receiver>
        <receiver
            android:name=".alarms.background.OnBootUpReceiver"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED"/>
            </intent-filter>
        </receiver>

        <service
            android:name=".alarms.background.OnBootUpAlarmScheduler"
            android:enabled="true"
            android:exported="false">
        </service>

        <activity
            android:name=".timers.EditTimerActivity"
            android:label="@string/title_activity_create_timer"
            android:parentActivityName=".MainActivity"
            android:windowSoftInputMode="adjustNothing">
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value="com.philliphsu.clock2.MainActivity"/>
        </activity>

        <service
            android:name=".timers.TimerNotificationService"
            android:exported="false">
        </service>

        <activity
            android:name=".ringtone.TimesUpActivity"
            android:excludeFromRecents="true"
            android:label="@string/title_activity_ringtone"
            android:launchMode="singleTask"
            android:taskAffinity="com.philliphsu.clock2.RingtoneActivity"
            android:screenOrientation="nosensor">
        </activity>
        <activity
            android:name=".ringtone.AlarmActivity"
            android:excludeFromRecents="true"
            android:label="@string/title_activity_ringtone"
            android:launchMode="singleTask"
            android:taskAffinity="com.philliphsu.clock2.RingtoneActivity"
            android:screenOrientation="nosensor">
        </activity>

        <service
            android:name=".ringtone.playback.AlarmRingtoneService"
            android:enabled="true"
            android:exported="false">
        </service>
        <service
            android:name=".ringtone.playback.TimerRingtoneService"
            android:enabled="true"
            android:exported="false">
        </service>
        <service
            android:name=".stopwatch.StopwatchNotificationService"
            android:enabled="true"
            android:exported="false">
        </service>
    </application>

</manifest>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `BaseActivity.java`**

> Our `BaseActivity` class.


Here is the full java code for this `class`:

```java

package replace_with_your_package_name;

import android.media.AudioManager;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.CallSuper;
import android.support.annotation.LayoutRes;
import android.support.annotation.MenuRes;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;

import butterknife.Bind;
import butterknife.ButterKnife;

/**
 * Created by Phillip Hsu on 5/31/2016.
 */
public abstract class BaseActivity extends AppCompatActivity {

    @Nullable
    @Bind(R.id.toolbar)
    Toolbar mToolbar;

    private Menu mMenu;

    @LayoutRes protected abstract int layoutResId();
    @MenuRes   protected abstract int menuResId();

    @CallSuper
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initialize the associated SharedPreferences file with default values
        // for each preference when the user first opens your application.
        // When false, the system sets the default values only if this method has
        // never been called in the past (or the KEY_HAS_SET_DEFAULT_VALUES in the
        // default value shared preferences file is false).
        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);
        // ========================================================================================
        // TOneverDO: Set theme after setContentView()
        final String themeDark = getString(R.string.theme_dark);
        final String themeBlack = getString(R.string.theme_black);
        String theme = PreferenceManager.getDefaultSharedPreferences(this).getString(
                getString(R.string.key_theme), null);
        if (themeDark.equals(theme)) {
            setTheme(R.style.AppTheme_Dark);
        } else if (themeBlack.equals(theme)) {
            setTheme(R.style.AppTheme_Black);
        }
        // ========================================================================================
        setContentView(layoutResId());
        // Direct volume changes to the alarm stream
        setVolumeControlStream(AudioManager.STREAM_ALARM);
        ButterKnife.bind(this);
        if (mToolbar != null) {
            setSupportActionBar(mToolbar);
            ActionBar ab = getSupportActionBar();
            if (ab != null) {
                ab.setDisplayHomeAsUpEnabled(isDisplayHomeUpEnabled());
                ab.setDisplayShowTitleEnabled(isDisplayShowTitleEnabled());
            }
        }
    }

    @Override
    public final boolean onCreateOptionsMenu(Menu menu) {
        if (menuResId() != 0) {
            getMenuInflater().inflate(menuResId(), menu);
            mMenu = menu;
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Nullable
    public final Menu getMenu() {
        return mMenu;
    }

    protected boolean isDisplayHomeUpEnabled() {
        return true;
    }

    protected boolean isDisplayShowTitleEnabled() {
        return false;
    }
}


```

**(b). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `BaseActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Intent` from the `android.content` package.
2. `ColorStateList` from the `android.content.res` package.
3. `Drawable` from the `android.graphics.drawable` package.
4. `Build` from the `android.os` package.
5. `Bundle` from the `android.os` package.
6. `DrawableRes` from the `android.support.annotation` package.
7. `NonNull` from the `android.support.annotation` package.
8. `FloatingActionButton` from the `android.support.design.widget` package.
9. `TabLayout` from the `android.support.design.widget` package.
10. `Fragment` from the `android.support.v4.app` package.
11. `FragmentManager` from the `android.support.v4.app` package.
12. `FragmentPagerAdapter` from the `android.support.v4.app` package.
13. `ContextCompat` from the `android.support.v4.content` package.
14. `Loader` from the `android.support.v4.content` package.
15. `DrawableCompat` from the `android.support.v4.graphics.drawable` package.
16. `ViewPager` from the `android.support.v4.view` package.
17. `Log` from the `android.util` package.
18. `SparseArray` from the `android.util` package.
19. `MenuItem` from the `android.view` package.
20. `View` from the `android.view` package.
21. `ViewGroup` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(final`.
2. `run()`.
3. `onPageScrolled(int`.
4. `onPageSelected(int`.
5. `onClick(View`.
6. `onNewIntent(Intent`.
7. `onActivityResult(int`.
8. `layoutResId()`.
9. `menuResId()`.
10. `isDisplayHomeUpEnabled()`.
11. `onOptionsItemSelected(MenuItem`.
12. `getItem(int`.
13. `instantiateItem(ViewGroup`.
14. `destroyItem(ViewGroup`.
15. `getCount()`.

We will be creating the following methods:

1. `setTabIcon(int index, @DrawableRes int iconRes, @NonNull final ColorStateList color)`.

2. `RecyclerViewFragment#setScrollToStableId(long) setScrollToStableId` - It will return `{@link` object.

3. `switch(requestCode)` - It will return `switch` object.

4. `getFabPixelOffsetForXTranslation()` - It will return `float` object.

5. `SectionsPagerAdapter(FragmentManager fm)` - It will return `public` object.

6. `switch(position)` - It will return `switch` object.

7. `getFragment(int position)` - It will return `Fragment` object.

**(a). Our `getFabPixelOffsetForXTranslation()` method.**

A method to get fab pixel offset for x translation:

```java
    private float getFabPixelOffsetForXTranslation() {
        final int margin;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // Since each side's margin is the same, any side's would do.
            margin = ((ViewGroup.MarginLayoutParams) mFab.getLayoutParams()).rightMargin;
        } else {
            // Pre-Lollipop has measurement issues with FAB margins. This is
            // probably as good as we can get to centering the FAB, without
            // hardcoding some small margin value.
            margin = 0;
        }
        // By adding on half the FAB's width, we effectively rebase the translation
        // relative to the view's center position.
        return mFab.getWidth() / 2f + margin;
    }
```

**(b). Our `SectionsPagerAdapter()` method.**

A method to  sections pager adapter:

```java
        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }
```

**(c). Our `getFragment()` method.**

A method to get fragment:

```java
        public Fragment getFragment(int position) {
            return mFragments.get(position);
        }
```

**(d). Our `()` method.**

Write this method as follows:

```java
        switch (requestCode) {
            case REQUEST_THEME_CHANGE:
                if (data != null && data.getBooleanExtra(SettingsActivity.EXTRA_THEME_CHANGED, false)) {
                    recreate();
                }
                break;
        }
```

**(e). Our `()` method.**

Write this method as follows:

```java
            switch (position) {
                case PAGE_ALARMS:
                    return new AlarmsFragment();
                case PAGE_TIMERS:
                    return new TimersFragment();
                case PAGE_STOPWATCH:
                    return new StopwatchFragment();
                default:
                    throw new IllegalStateException("No fragment can be instantiated for position " + position);
            }
```

**(f). Our `setTabIcon()` method.**

A method to set tab icon:

```java
    private void setTabIcon(int index, @DrawableRes int iconRes, @NonNull final ColorStateList color) {
        TabLayout.Tab tab = mTabLayout.getTabAt(index);
        Drawable icon = Utils.getTintedDrawable(this, iconRes, color);
        DrawableCompat.setTintList(icon, color);
        tab.setIcon(icon);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.DrawableRes;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.Loader;
import android.support.v4.graphics.drawable.DrawableCompat;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.util.SparseArray;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import com.philliphsu.clock2.alarms.ui.AlarmsFragment;
import com.philliphsu.clock2.data.BaseItemCursor;
import com.philliphsu.clock2.list.RecyclerViewFragment;
import com.philliphsu.clock2.settings.SettingsActivity;
import com.philliphsu.clock2.stopwatch.ui.StopwatchFragment;
import com.philliphsu.clock2.timepickers.Utils;
import com.philliphsu.clock2.timers.ui.TimersFragment;

import butterknife.Bind;

import static com.philliphsu.clock2.list.RecyclerViewFragment.ACTION_SCROLL_TO_STABLE_ID;
import static com.philliphsu.clock2.list.RecyclerViewFragment.EXTRA_SCROLL_TO_STABLE_ID;

public class MainActivity extends BaseActivity {
    private static final String TAG = "MainActivity";

    public static final int    PAGE_ALARMS          = 0;
    public static final int    PAGE_TIMERS          = 1;
    public static final int    PAGE_STOPWATCH       = 2;
    public static final int    REQUEST_THEME_CHANGE = 5;
    public static final String EXTRA_SHOW_PAGE      = "com.philliphsu.clock2.extra.SHOW_PAGE";

    private SectionsPagerAdapter mSectionsPagerAdapter;
    private Drawable             mAddItemDrawable;

    @Bind(R.id.container)
    ViewPager mViewPager;

    @Bind(R.id.fab)
    FloatingActionButton mFab;

    @Bind(R.id.tabs)
    TabLayout mTabLayout;

    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final View rootView = ((ViewGroup) findViewById(android.R.id.content)).getChildAt(0);
        // http://stackoverflow.com/a/24035591/5055032
        // http://stackoverflow.com/a/3948036/5055032
        // The views in our layout have begun drawing.
        // There is no lifecycle callback that tells us when our layout finishes drawing;
        // in my own test, drawing still isn't finished by onResume().
        // Post a message in the UI events queue to be executed after drawing is complete,
        // so that we may get their dimensions.
        rootView.post(new Runnable() {
            @Override
            public void run() {
                if (mViewPager.getCurrentItem() == mSectionsPagerAdapter.getCount() - 1) {
                    // Restore the FAB's translationX from a previous configuration.
                    mFab.setTranslationX(mViewPager.getWidth() / -2f + getFabPixelOffsetForXTranslation());
                }
            }
        });

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());
        mViewPager.setAdapter(mSectionsPagerAdapter);
        mViewPager.addOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
            /**
             * @param position Either the current page position if the offset is increasing,
             *                 or the previous page position if it is decreasing.
             * @param positionOffset If increasing from [0, 1), scrolling right and position = currentPagePosition
             *                       If decreasing from (1, 0], scrolling left and position = (currentPagePosition - 1)
             */
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                Log.d(TAG, String.format("pos = %d, posOffset = %f, posOffsetPixels = %d",
                        position, positionOffset, positionOffsetPixels));
                int pageBeforeLast = mSectionsPagerAdapter.getCount() - 2;
                if (position <= pageBeforeLast) {
                    if (position < pageBeforeLast) {
                        // When the scrolling is due to tab selection between multiple tabs apart,
                        // this callback is called for each intermediate page, but each of those pages
                        // will briefly register a sparsely decreasing range of positionOffsets, always
                        // from (1, 0). As such, you would notice the FAB to jump back and forth between
                        // x-positions as each intermediate page is scrolled through.
                        // This is a visual optimization that ends the translation motion, immediately
                        // returning the FAB to its target position.
                        // TODO: The animation visibly skips to the end. We could interpolate
                        // intermediate x-positions if we cared to smooth it out.
                        mFab.setTranslationX(0);
                    } else {
                        // Initially, the FAB's translationX property is zero because, at its original
                        // position, it is not translated. setTranslationX() is relative to the view's
                        // left position, at its original position; this left position is taken to be
                        // the zero point of the coordinate system relative to this view. As your
                        // translationX value is increasingly negative, the view is translated left.
                        // But as translationX is decreasingly negative and down to zero, the view
                        // is translated right, back to its original position.
                        float translationX = positionOffsetPixels / -2f;
                        // NOTE: You MUST scale your own additional pixel offsets by positionOffset,
                        // or else the FAB will immediately translate by that many pixels, appearing
                        // to skip/jump.
                        translationX += positionOffset * getFabPixelOffsetForXTranslation();
                        mFab.setTranslationX(translationX);
                    }
                }
            }

            @Override
            public void onPageSelected(int position) {
                Log.d(TAG, "onPageSelected");
                if (position < mSectionsPagerAdapter.getCount() - 1) {
                    mFab.setImageDrawable(mAddItemDrawable);
                }
                Fragment f = mSectionsPagerAdapter.getFragment(mViewPager.getCurrentItem());
                // NOTE: This callback is fired after a rotation, right after onStart().
                // Unfortunately, the FragmentManager handling the rotation has yet to
                // tell our adapter to re-instantiate the Fragments, so our collection
                // of fragments is empty. You MUST keep this check so we don't cause a NPE.
                if (f instanceof BaseFragment) {
                    ((BaseFragment) f).onPageSelected();
                }
            }
        });

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);

        ColorStateList tabIconColor = ContextCompat.getColorStateList(this, R.color.tab_icon_color);
        setTabIcon(PAGE_ALARMS, R.drawable.ic_alarm_24dp, tabIconColor);
        setTabIcon(PAGE_TIMERS, R.drawable.ic_timer_24dp, tabIconColor);
        setTabIcon(PAGE_STOPWATCH, R.drawable.ic_stopwatch_24dp, tabIconColor);

        // TODO: @OnCLick instead.
        mFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Fragment f = mSectionsPagerAdapter.getFragment(mViewPager.getCurrentItem());
                if (f instanceof RecyclerViewFragment) {
                    ((RecyclerViewFragment) f).onFabClick();
                }
            }
        });

        mAddItemDrawable = ContextCompat.getDrawable(this, R.drawable.ic_add_24dp);
        handleActionScrollToStableId(getIntent(), false);
    }

    private void setTabIcon(int index, @DrawableRes int iconRes, @NonNull final ColorStateList color) {
        TabLayout.Tab tab = mTabLayout.getTabAt(index);
        Drawable icon = Utils.getTintedDrawable(this, iconRes, color);
        DrawableCompat.setTintList(icon, color);
        tab.setIcon(icon);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleActionScrollToStableId(intent, true);
    }

    /**
     * Handles a PendingIntent, fired from e.g. clicking a notification, that tells us to
     * set the ViewPager's current item and scroll to a specific RecyclerView item
     * given by its stable ID.
     *
     * @param performScroll Whether to actually scroll to the stable id, if there is one.
     *                      Pass true if you know {@link
     *                      RecyclerViewFragment#onLoadFinished(Loader, BaseItemCursor) onLoadFinished()}
     *                      had previously been called. Otherwise, pass false so that we can
     *                      {@link RecyclerViewFragment#setScrollToStableId(long) setScrollToStableId(long)}
     *                      and let {@link
     *                      RecyclerViewFragment#onLoadFinished(Loader, BaseItemCursor) onLoadFinished()}
     *                      perform the scroll for us.
     */
    private void handleActionScrollToStableId(@NonNull final Intent intent,
                                              final boolean performScroll) {
        if (ACTION_SCROLL_TO_STABLE_ID.equals(intent.getAction())) {
            final int targetPage = intent.getIntExtra(EXTRA_SHOW_PAGE, -1);
            if (targetPage >= 0 && targetPage <= mSectionsPagerAdapter.getCount() - 1) {
                // #post() works for any state the app is in, especially robust against
                // cases when the app was not previously in memory--i.e. this got called
                // in onCreate().
                mViewPager.post(new Runnable() {
                    @Override
                    public void run() {
                        mViewPager.setCurrentItem(targetPage, true/*smoothScroll*/);
                        final long stableId = intent.getLongExtra(EXTRA_SCROLL_TO_STABLE_ID, -1);
                        if (stableId != -1) {
                            RecyclerViewFragment rvFrag = (RecyclerViewFragment)
                                    mSectionsPagerAdapter.getFragment(targetPage);
                            if (performScroll) {
                                rvFrag.performScrollToStableId(stableId);
                            } else {
                                rvFrag.setScrollToStableId(stableId);
                            }
                        }
                        intent.setAction(null);
                        intent.removeExtra(EXTRA_SHOW_PAGE);
                        intent.removeExtra(EXTRA_SCROLL_TO_STABLE_ID);
                    }
                });
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode != RESULT_OK)
            return;
        // If we get here, either this Activity OR one of its hosted Fragments
        // started a requested Activity for a result. The latter case may seem
        // strange; the Fragment is the one starting the requested Activity, so why
        // does the result end up in its host Activity? Shouldn't it end up in
        // Fragment#onActivityResult()? Actually, the Fragment's host Activity gets the
        // first shot at handling the result, before delegating it to the Fragment
        // in Fragment#onActivityResult().
        //
        // There are subtle points to keep in mind when it is actually the Fragment
        // that should handle the result, NOT this Activity. You MUST start
        // the requested Activity with Fragment#startActivityForResult(), NOT
        // Activity#startActivityForResult(). The former calls
        // FragmentActivity#startActivityFromFragment() to implement its behavior.
        // Among other things (not relevant to the discussion),
        // FragmentActivity#startActivityFromFragment() sets internal bit flags
        // that are necessary to achieve the described behavior (that this Activity
        // should delegate the result to the Fragment). Finally, you MUST call
        // through to the super implementation of Activity#onActivityResult(),
        // i.e. FragmentActivity#onActivityResult(). It is this method where
        // the aforementioned internal bit flags will be read to determine
        // which of this Activity's hosted Fragments started the requested
        // Activity.
        //
        // If you are not careful with these points and instead mistakenly call
        // Activity#startActivityForResult(), THEN YOU WILL ONLY BE ABLE TO
        // HANDLE THE REQUEST HERE; the super implementation of onActivityResult()
        // will not delegate the result to the Fragment, because the requisite
        // internal bit flags are not set with Activity#startActivityForResult().
        //
        // Further reading:
        // http://stackoverflow.com/q/6147884/5055032
        // http://stackoverflow.com/a/24303360/5055032
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQUEST_THEME_CHANGE:
                if (data != null && data.getBooleanExtra(SettingsActivity.EXTRA_THEME_CHANGED, false)) {
                    recreate();
                }
                break;
        }
    }

    @Override
    protected int layoutResId() {
        return R.layout.activity_main;
    }

    @Override
    protected int menuResId() {
        return R.menu.menu_main;
    }

    @Override
    protected boolean isDisplayHomeUpEnabled() {
        return false;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            startActivityForResult(new Intent(this, SettingsActivity.class), REQUEST_THEME_CHANGE);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * @return the positive offset in pixels required to rebase an X-translation of the FAB
     * relative to its center position. An X-translation normally is done relative to a view's
     * left position.
     */
    private float getFabPixelOffsetForXTranslation() {
        final int margin;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // Since each side's margin is the same, any side's would do.
            margin = ((ViewGroup.MarginLayoutParams) mFab.getLayoutParams()).rightMargin;
        } else {
            // Pre-Lollipop has measurement issues with FAB margins. This is
            // probably as good as we can get to centering the FAB, without
            // hardcoding some small margin value.
            margin = 0;
        }
        // By adding on half the FAB's width, we effectively rebase the translation
        // relative to the view's center position.
        return mFab.getWidth() / 2f + margin;
    }

    private static class SectionsPagerAdapter extends FragmentPagerAdapter {
        private final SparseArray<Fragment> mFragments = new SparseArray<>(getCount());

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            switch (position) {
                case PAGE_ALARMS:
                    return new AlarmsFragment();
                case PAGE_TIMERS:
                    return new TimersFragment();
                case PAGE_STOPWATCH:
                    return new StopwatchFragment();
                default:
                    throw new IllegalStateException("No fragment can be instantiated for position " + position);
            }
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            Fragment fragment = (Fragment) super.instantiateItem(container, position);
            mFragments.put(position, fragment);
            return fragment;
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            mFragments.remove(position);
            super.destroyItem(container, position, object);
        }

        @Override
        public int getCount() {
            return 3;
        }

        public Fragment getFragment(int position) {
            return mFragments.get(position);
        }
    }
}


```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/philliphsu/ClockPlus/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/philliphsu/ClockPlus).|
|3.|Follow code author [here](https://github.com/philliphsu).|
