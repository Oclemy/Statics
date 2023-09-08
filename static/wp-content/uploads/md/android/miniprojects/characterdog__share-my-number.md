# Share My Number

>  Share your contact information with ease.


![Share My Number Tutorial](https://camo.githubusercontent.com/e479b23531070552219a94c887be75fffa3702317a899970027a7e10e9b5ae89/68747470733a2f2f6170692e7472617669732d63692e636f6d2f636861726163746572646f672f73686172652d6d792d6e756d6265722e7376673f6272616e63683d6d6173746572)

![Share My Number Tutorial](https://camo.githubusercontent.com/55352972bee9c5c153e1fa22f6eedb8d3e3d9cf715397d81b7e51f5b4d7ea972/68747470733a2f2f64333232637174353834626f346f2e636c6f756466726f6e742e6e65742f73686172652d6d792d6e756d6265722f6c6f63616c697a65642e737667)


This app displays a business card and a QR code. Other people can add your number to their contact app by scanning the QR code.

It's possible to configure three independent profiles: private, company and other. The profile names are just suggestions. Feel free to change them in the settings.

You can share the following information:

- Name
- Phone number
- E-mail
- Address
- Company
- Title
- Website


![Share My Number Tutorial](https://camo.githubusercontent.com/fefd7089be3e793fb7858c5965f46e046d5bb78eac6d7f5bdd11f3e737b226a4/68747470733a2f2f662d64726f69642e6f72672f62616467652f6765742d69742d6f6e2e706e67)

![Share My Number Tutorial](https://camo.githubusercontent.com/2149f526e69167218eb7eea8f21cb74a756aa43495f7acfeccfe995d40f62028/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e5f62616467655f7765625f67656e657269632e706e67)

![Share My Number Tutorial](https://github.com/characterdog/share-my-number/raw/master/fastlane/metadata/android/en-US/images/icon.png)

![Share My Number Tutorial](https://github.com/characterdog/share-my-number/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/1.png)

![Share My Number Tutorial](https://github.com/characterdog/share-my-number/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/2.png)

![Share My Number Tutorial](https://github.com/characterdog/share-my-number/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/3.png)


Let us look at the full Share My Number Project code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 8 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.github.characterdog.share_my_number"
        minSdkVersion 14
        targetSdkVersion 28
        versionCode 3
        versionName "1.3"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables.useSupportLibrary = true
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    lintOptions {
        abortOnError false
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'androidx.vectordrawable:vectordrawable:1.0.1'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.google.android.material:material:1.1.0-alpha01'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-alpha2'

    implementation 'com.github.kenglxn.QRGen:android:2.5.0'
    implementation 'com.github.daniel-stoneuk:material-about-library:2.4.2'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'
    androidTestImplementation 'androidx.test:rules:1.1.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 3 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.github.characterdog.share_my_number">

    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning"
        android:allowBackup="true"
        android:fullBackupContent="true">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".PreferenceActivity"
            android:label="@string/action_settings"
            android:parentActivityName=".MainActivity" />
        <activity
            android:name=".AboutActivity"
            android:label="@string/action_about"
            android:parentActivityName=".MainActivity" />
    </application>

</manifest>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `privacy_policy_fragment.xml`**

> Our `privacy_policy_fragment` layout.

This layout will represent our Fragment Policy Privacy's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <TextView
            android:id="@+id/privacy_policy"
            android:singleLine="false"
            android:padding="8dp"
            android:textSize="20sp"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"/>

</LinearLayout>
```

**(b). `fragment_tabbed.xml`**

> Our `fragment_tabbed` layout.

This layout will represent our Tabbed Fragment's layout. Specify [`ScrollView`](https://android.examples.directory/scrollview) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`Button`](https://android.examples.directory/button)
3. [`CardView`](https://android.examples.directory/cardview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`View`](https://android.examples.directory/view)
6. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:fillViewport="true"
    tools:context=".MainActivity$ContactInfoFragment">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:id="@+id/open_settings"
            style="@style/Widget.AppCompat.Button.Borderless.Colored"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_marginLeft="8dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            android:layout_marginRight="8dp"
            android:layout_marginBottom="8dp"
            android:text="@string/open_settings"
            android:visibility="invisible"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:visibility="invisible" />

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="12dp"
            android:layout_marginRight="12dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <TextView
                    android:id="@+id/email"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/phoneNumber"
                    tools:text="E-mail" />

                <TextView
                    android:id="@+id/name"
                    style="@style/TextAppearance.AppCompat.Large"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="8dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    android:textColor="@color/colorPrimaryDark"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent"
                    tools:text="Name" />

                <TextView
                    android:id="@+id/address"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/email"
                    tools:text="address" />

                <TextView
                    android:id="@+id/title"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintHorizontal_bias="1.0"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/company"
                    tools:text="Title" />

                <TextView
                    android:id="@+id/company"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@id/name"
                    tools:text="company" />

                <TextView
                    android:id="@+id/phoneNumber"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@id/title"
                    tools:text="phoneNumber" />

                <TextView
                    android:id="@+id/website"
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="8dp"
                    android:layout_marginLeft="8dp"
                    android:layout_marginTop="6dp"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/address"
                    tools:text="website" />

                <View
                    android:id="@+id/view"
                    android:layout_width="0dp"
                    android:layout_height="8dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/website"
                    tools:ignore="MissingConstraints" />
            </androidx.constraintlayout.widget.ConstraintLayout>

        </androidx.cardview.widget.CardView>

        <ImageView
                android:id="@+id/qr"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="8dp"
                android:layout_marginTop="8dp"
                android:layout_marginRight="8dp"
                android:layout_marginBottom="64dp"
                android:contentDescription="@string/qr_code"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintLeft_toLeftOf="parent"
                app:layout_constraintRight_toRightOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/cardView"
                app:srcCompat="@drawable/ic_hourglass_full_teal_24dp"/>
    </androidx.constraintlayout.widget.ConstraintLayout>
</ScrollView>
```

**(c). `activity_about.xml`**

> Our `activity_about` layout.

This layout will represent our About Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:id="@+id/about_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
</LinearLayout>
```

**(d). `activity_tabbed.xml`**

> Our `activity_tabbed` layout.

This layout will represent our Tabbed Activity's layout. Specify [`androidx.coordinatorlayout.widget.CoordinatorLayout`](https://android.examples.directory/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`AppBarLayout`](https://android.examples.directory/appbarlayout)
2. [`Toolbar`](https://android.examples.directory/toolbar)
3. [`TabLayout`](https://android.examples.directory/tablayout)
4. [`TabItem`](https://android.examples.directory/tabitem)
5. [`ViewPager`](https://android.examples.directory/viewpager)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="@dimen/appbar_padding_top"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:layout_weight="1"
            android:background="?attr/colorPrimary"
            app:layout_scrollFlags="scroll|enterAlways"
            app:popupTheme="@style/AppTheme.PopupOverlay"
            app:title="@string/app_name">

        </androidx.appcompat.widget.Toolbar>

        <com.google.android.material.tabs.TabLayout
            android:id="@+id/tabs"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <com.google.android.material.tabs.TabItem
                android:id="@+id/tab_private"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/tab_private" />

            <com.google.android.material.tabs.TabItem
                android:id="@+id/tab_work"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/tab_work" />

            <com.google.android.material.tabs.TabItem
                android:id="@+id/tab_other"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/tab_other" />
        </com.google.android.material.tabs.TabLayout>
    </com.google.android.material.appbar.AppBarLayout>

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `SummaryShowingEditTextPreference.java`**

> Our `SummaryShowingEditTextPreference` class.

Create a java file named `SummaryShowingEditTextPreference.java`.

Inside it create a class that extends `EditTextPreference` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `EditTextPreference` from the `android.preference` package.
3. `TextUtils` from the `android.text` package.
4. `AttributeSet` from the `android.util` package.

We will be overriding the following methods: 

1. `getSummary()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.preference.EditTextPreference;
import android.text.TextUtils;
import android.util.AttributeSet;

public class SummaryShowingEditTextPreference extends EditTextPreference {

    public SummaryShowingEditTextPreference(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public SummaryShowingEditTextPreference(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SummaryShowingEditTextPreference(Context context) {
        super(context);
    }

    // According to ListPreference implementation
    @Override
    public CharSequence getSummary() {
        String text = getText();
        if (TextUtils.isEmpty(text)) {
            CharSequence hint = getEditText().getHint();
            if (!TextUtils.isEmpty(hint) || super.getSummary().equals("%s")) {
                return hint;
            } else {
                return super.getSummary();
            }
        } else {
            CharSequence summary = super.getSummary();
            if (!TextUtils.isEmpty(summary)) {
                return String.format(summary.toString(), text);
            } else {
                return summary;
            }
        }
    }
}

```

**(b). `PreferenceActivity.java`**

> Our `PreferenceActivity` class.

Create a java file named `PreferenceActivity.java`.

Inside it create a class that extends `AppCompatPreferenceActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Bundle` from the `android.os` package.
2. `MenuItem` from the `android.view` package.
3. `ActionBar` from the `androidx.appcompat.app` package.
4. `AppCompatDelegate` from the `androidx.appcompat.app` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onOptionsItemSelected(MenuItem`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.view.MenuItem;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatDelegate;

public class PreferenceActivity extends AppCompatPreferenceActivity {
    public final static String PREF_PRIVATE_PROFILE = "profile_private";
    public final static String PREF_PRIVATE_NAME = "name_private";
    public final static String PREF_PRIVATE_EMAIL = "email_private";
    public final static String PREF_PRIVATE_ADDRESS = "address_private";
    public final static String PREF_PRIVATE_TITLE = "title_private";
    public final static String PREF_PRIVATE_COMPANY = "company_private";
    public final static String PREF_PRIVATE_PHONE = "phoneNumber_private";
    public final static String PREF_PRIVATE_WEBSITE = "website_private";

    public final static String PREF_COMPANY_PROFILE = "profile_company";
    public final static String PREF_COMPANY_NAME = "name_company";
    public final static String PREF_COMPANY_EMAIL = "email_company";
    public final static String PREF_COMPANY_ADDRESS = "address_company";
    public final static String PREF_COMPANY_TITLE = "title_company";
    public final static String PREF_COMPANY_COMPANY = "company_company";
    public final static String PREF_COMPANY_PHONE = "phoneNumber_company";
    public final static String PREF_COMPANY_WEBSITE = "website_company";

    public final static String PREF_OTHER_PROFILE = "profile_other";
    public final static String PREF_OTHER_NAME = "name_other";
    public final static String PREF_OTHER_EMAIL = "email_other";
    public final static String PREF_OTHER_ADDRESS = "address_other";
    public final static String PREF_OTHER_TITLE = "title_other";
    public final static String PREF_OTHER_COMPANY = "company_other";
    public final static String PREF_OTHER_PHONE = "phoneNumber_other";
    public final static String PREF_OTHER_WEBSITE = "website_other";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }
        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true);
        addPreferencesFromResource(R.xml.preferences);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
        }

        return super.onOptionsItemSelected(item);
    }
}


```

**(c). `AppCompatPreferenceActivity.java`**

> Our `AppCompatPreferenceActivity` class.

Create a java file named `AppCompatPreferenceActivity.java`.

Inside it create a class that extends `PreferenceActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Configuration` from the `android.content.res` package.
2. `Bundle` from the `android.os` package.
3. `PreferenceActivity` from the `android.preference` package.
4. `LayoutRes` from the `androidx.annotation` package.
5. `Nullable` from the `androidx.annotation` package.
6. `ActionBar` from the `androidx.appcompat.app` package.
7. `AppCompatDelegate` from the `androidx.appcompat.app` package.
8. `Toolbar` from the `androidx.appcompat.widget` package.
9. `MenuInflater` from the `android.view` package.
10. `View` from the `android.view` package.
11. `ViewGroup` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onPostCreate(Bundle`.
3. `getMenuInflater()`.
4. `setContentView(@LayoutRes`.
5. `setContentView(View`.
6. `setContentView(View`.
7. `addContentView(View`.
8. `onPostResume()`.
9. `onTitleChanged(CharSequence`.
10. `onConfigurationChanged(Configuration`.
11. `onStop()`.
12. `onDestroy()`.

We will be creating the following methods:

1. `getSupportActionBar()` - It will return `ActionBar` object.

2. `setSupportActionBar(@Nullable Toolbar toolbar)`.

3. `invalidateOptionsMenu()`.

4. `getDelegate()` - It will return `AppCompatDelegate` object.

**(a). Our `invalidateOptionsMenu()` method.**

A method to invalidate options menu:

```java
    public void invalidateOptionsMenu() {
        getDelegate().invalidateOptionsMenu();
    }
```

**(b). Our `setSupportActionBar()` method.**

A method to set support action bar:

```java
    public void setSupportActionBar(@Nullable Toolbar toolbar) {
        getDelegate().setSupportActionBar(toolbar);
    }
```

**(c). Our `getDelegate()` method.**

A method to get delegate:

```java
    private AppCompatDelegate getDelegate() {
        if (mDelegate == null) {
            mDelegate = AppCompatDelegate.create(this, null);
        }
        return mDelegate;
    }
```

**(d). Our `getSupportActionBar()` method.**

A method to get support action bar:

```java
    public ActionBar getSupportActionBar() {
        return getDelegate().getSupportActionBar();
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.res.Configuration;
import android.os.Bundle;
import android.preference.PreferenceActivity;
import androidx.annotation.LayoutRes;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.appcompat.widget.Toolbar;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * A {@link android.preference.PreferenceActivity} which implements and proxies the necessary calls
 * to be used with AppCompat.
 */
public abstract class AppCompatPreferenceActivity extends PreferenceActivity {

    private AppCompatDelegate mDelegate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getDelegate().installViewFactory();
        getDelegate().onCreate(savedInstanceState);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        getDelegate().onPostCreate(savedInstanceState);
    }

    public ActionBar getSupportActionBar() {
        return getDelegate().getSupportActionBar();
    }

    public void setSupportActionBar(@Nullable Toolbar toolbar) {
        getDelegate().setSupportActionBar(toolbar);
    }

    @Override
    public MenuInflater getMenuInflater() {
        return getDelegate().getMenuInflater();
    }

    @Override
    public void setContentView(@LayoutRes int layoutResID) {
        getDelegate().setContentView(layoutResID);
    }

    @Override
    public void setContentView(View view) {
        getDelegate().setContentView(view);
    }

    @Override
    public void setContentView(View view, ViewGroup.LayoutParams params) {
        getDelegate().setContentView(view, params);
    }

    @Override
    public void addContentView(View view, ViewGroup.LayoutParams params) {
        getDelegate().addContentView(view, params);
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();
        getDelegate().onPostResume();
    }

    @Override
    protected void onTitleChanged(CharSequence title, int color) {
        super.onTitleChanged(title, color);
        getDelegate().setTitle(title);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        getDelegate().onConfigurationChanged(newConfig);
    }

    @Override
    protected void onStop() {
        super.onStop();
        getDelegate().onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        getDelegate().onDestroy();
    }

    public void invalidateOptionsMenu() {
        getDelegate().invalidateOptionsMenu();
    }

    private AppCompatDelegate getDelegate() {
        if (mDelegate == null) {
            mDelegate = AppCompatDelegate.create(this, null);
        }
        return mDelegate;
    }
}


```

**(d). `AboutActivity.java`**

> Our `AboutActivity` class.

Create a java file named `AboutActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `Intent` from the `android.content` package.
3. `Drawable` from the `android.graphics.drawable` package.
4. `Uri` from the `android.net` package.
5. `Bundle` from the `android.os` package.
6. `LayoutInflater` from the `android.view` package.
7. `MenuItem` from the `android.view` package.
8. `View` from the `android.view` package.
9. `ViewGroup` from the `android.view` package.
10. `TextView` from the `android.widget` package.
11. `AppCompatActivity` from the `androidx.appcompat.app` package.
12. `Fragment` from the `androidx.fragment.app` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onOptionsItemSelected(MenuItem`.
3. `onCreateView(LayoutInflater`.
4. `onResume()`.
5. `getMaterialAboutList(final`.
6. `onClick()`.
7. `getTheme()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.danielstone.materialaboutlibrary.ConvenienceBuilder;
import com.danielstone.materialaboutlibrary.MaterialAboutFragment;
import com.danielstone.materialaboutlibrary.items.MaterialAboutActionItem;
import com.danielstone.materialaboutlibrary.items.MaterialAboutItemOnClickAction;
import com.danielstone.materialaboutlibrary.items.MaterialAboutTitleItem;
import com.danielstone.materialaboutlibrary.model.MaterialAboutCard;
import com.danielstone.materialaboutlibrary.model.MaterialAboutList;
import com.danielstone.materialaboutlibrary.util.OpenSourceLicense;

public class AboutActivity extends AppCompatActivity {
    public final static String EXTRA_PRIVACY_POLICY = "privacy_policy";
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about);

        if (savedInstanceState == null) {
            Fragment f;
            if (getIntent().getBooleanExtra(EXTRA_PRIVACY_POLICY, false)) {
                f = new ShowPrivacyPolicyFragment();
            } else {
                f = new MyMaterialAboutFragment();
            }

            getSupportFragmentManager()
                    .beginTransaction()
                    .add(R.id.about_container, f)
                    .commit();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public static class ShowPrivacyPolicyFragment extends Fragment {
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            return inflater.inflate(R.layout.privacy_policy_fragment, container, false);
        }

        @Override
        public void onResume() {
            super.onResume();
            TextView privacyPolicy = getView().findViewById(R.id.privacy_policy);
            privacyPolicy.setText(getString(R.string.privacy_policy_content));
        }
    }

    public static class MyMaterialAboutFragment extends MaterialAboutFragment {
        private static String PLAY_STORE_LINK;

        @Override
        protected MaterialAboutList getMaterialAboutList(final Context activityContext) {
            PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=" + activityContext.getPackageName();
            MaterialAboutCard.Builder firstCard = new MaterialAboutCard.Builder();
            firstCard.addItem(new MaterialAboutTitleItem.Builder()
                    .text(getString(R.string.app_name))
                    .icon(R.mipmap.ic_launcher)
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.author))
                    .subText("CharacterDog")
                    .icon(R.drawable.ic_person_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog"));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.help_translating_this_app))
                    .icon(R.drawable.ic_language_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://crowdin.com/project/share-my-number"));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.rate_in_play_store))
                    .icon(R.drawable.ic_star_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(PLAY_STORE_LINK));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.share_with_friends))
                    .icon(R.drawable.ic_share_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent sendIntent = new Intent();
                            sendIntent.setAction(Intent.ACTION_SEND);
                            sendIntent.putExtra(Intent.EXTRA_TEXT,
                                    String.format(activityContext.getString(R.string.check_out),
                                            getString(R.string.app_name), PLAY_STORE_LINK));
                            sendIntent.setType("text/plain");
                            startActivity(sendIntent);
                        }
                    })
                    .build());

            MaterialAboutCard.Builder legalCard = new MaterialAboutCard.Builder();
            legalCard.title(activityContext.getString(R.string.legal));
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.license))
                    .subText("GNU General Public License v3.0")
                    .icon(R.drawable.ic_account_balance_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog/share-my-number/blob/master/LICENSE"));
                            startActivity(intent);
                        }
                    })
                    .build());
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.privacy_policy))
                    .icon(R.drawable.ic_security_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            ShowPrivacyPolicyFragment f = new ShowPrivacyPolicyFragment();
                            getActivity().getSupportFragmentManager()
                                    .beginTransaction()
                                    .replace(R.id.about_container, f)
                                    .addToBackStack(null)
                                    .commit();
                        }
                    })
                    .build());

            Drawable codeDrawable = activityContext.getResources().getDrawable(R.drawable.ic_code_teal_24dp);

            MaterialAboutCard materialAboutLibraryLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "material-about-library", "2016", "Daniel Stone",
                            OpenSourceLicense.APACHE_2);

            MaterialAboutCard qrGenLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "QRGen", "2018", "Ken Gullaksen",
                            OpenSourceLicense.APACHE_2);

            MaterialAboutCard iconLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "Material Design icons", "2018", "Google",
                            OpenSourceLicense.APACHE_2);

            return new MaterialAboutList.Builder()
                    .addCard(firstCard.build())
                    .addCard(legalCard.build())
                    .addCard(materialAboutLibraryLicenseCard)
                    .addCard(qrGenLicenseCard)
                    .addCard(iconLicenseCard)
                    .build();
        }

        @Override
        protected int getTheme() {
            return R.style.AppTheme_MaterialAboutActivity_Fragment;
        }
    }
}

```

**(e). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `Intent` from the `android.content` package.
3. `SharedPreferences` from the `android.content` package.
4. `Bitmap` from the `android.graphics` package.
5. `Point` from the `android.graphics` package.
6. `AsyncTask` from the `android.os` package.
7. `Bundle` from the `android.os` package.
8. `PreferenceManager` from the `android.preference` package.
9. `IdRes` from the `androidx.annotation` package.
10. `Fragment` from the `androidx.fragment.app` package.
11. `FragmentManager` from the `androidx.fragment.app` package.
12. `FragmentPagerAdapter` from the `androidx.fragment.app` package.
13. `FragmentStatePagerAdapter` from the `androidx.fragment.app` package.
14. `PagerAdapter` from the `androidx.viewpager.widget` package.
15. `ViewPager` from the `androidx.viewpager.widget` package.
16. `AppCompatActivity` from the `androidx.appcompat.app` package.
17. `Toolbar` from the `androidx.appcompat.widget` package.
18. `TextUtils` from the `android.text` package.
19. `Log` from the `android.util` package.
20. `Display` from the `android.view` package.
21. `LayoutInflater` from the `android.view` package.
22. `Menu` from the `android.view` package.
23. `MenuItem` from the `android.view` package.
24. `View` from the `android.view` package.
25. `ViewGroup` from the `android.view` package.
26. `WindowManager` from the `android.view` package.
27. `Button` from the `android.widget` package.
28. `ImageView` from the `android.widget` package.
29. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onResume()`.
3. `onCreateOptionsMenu(Menu`.
4. `onOptionsItemSelected(MenuItem`.
5. `onCreateView(LayoutInflater`.
6. `onResume()`.
7. `onClick(View`.
8. `doInBackground(SetQrCodeTaskBundle...`.
9. `onPostExecute(Bitmap`.
10. `getItem(int`.
11. `getCount()`.

We will be creating the following methods:

1. `ContactInfoFragment()` - It will return `public` object.

2. `newInstance(int sectionNumber)` - It will return `ContactInfoFragment` object.

3. `setUiNoInformation(boolean noInformation, View view)`.

4. `setTextToTextViewOrHide(String value, @IdRes int id, View view)`.

5. `getVCard()` - It will return `VCard` object.

6. `getQrSize()` - It will return `int` object.

7. `SectionsPagerAdapter(FragmentManager fm)` - It will return `public` object.

**(a). Our `getVCard()` method.**

A method to get v card:

```java
            VCard getVCard() {
                return mVCard;
            }
```

**(b). Our `SectionsPagerAdapter()` method.**

A method to  sections pager adapter:

```java
        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }
```

**(c). Our `ContactInfoFragment()` method.**

A method to  contact info fragment:

```java
        public ContactInfoFragment() {
        }
```

**(d). Our `SetQrCodeTaskBundle()` method.**

A method to  set qr code task bundle:

```java
            SetQrCodeTaskBundle(VCard vCard, int qrSize) {
                mVCard = vCard;
                mQrSize = qrSize;
            }
```

**(e). Our `getQrSize()` method.**

A method to get qr size:

```java
            int getQrSize() {
                return mQrSize;
            }
```

**(f). Our `newInstance()` method.**

A method to new instance:

```java
        public static ContactInfoFragment newInstance(int sectionNumber) {
            ContactInfoFragment fragment = new ContactInfoFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }
```

**(g). Our `setUiNoInformation()` method.**

A method to set ui no information:

```java
        private void setUiNoInformation(boolean noInformation, View view) {
            view.findViewById(R.id.qr).setVisibility(noInformation ? View.GONE : View.VISIBLE);
            view.findViewById(R.id.cardView).setVisibility(noInformation ? View.GONE : View.VISIBLE);
            Button openSettingsButton = view.findViewById(R.id.open_settings);
            openSettingsButton.setVisibility(noInformation ? View.VISIBLE : View.GONE);
            if (noInformation) {
                openSettingsButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent i = new Intent(getContext(), PreferenceActivity.class);
                        startActivity(i);
                    }
                });
            } else {
                openSettingsButton.setOnClickListener(null);
            }
        }
```

**(h). Our `setTextToTextViewOrHide()` method.**

A method to set text to text view or hide:

```java
        private void setTextToTextViewOrHide(String value, @IdRes int id, View view) {
            TextView textView = view.findViewById(id);
            if (TextUtils.isEmpty(value)) {
                textView.setVisibility(View.GONE);
            } else {
                textView.setText(value);
            }
        }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Point;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceManager;
import androidx.annotation.IdRes;

import com.google.android.material.tabs.TabLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.PagerAdapter;
import androidx.viewpager.widget.ViewPager;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.zxing.EncodeHintType;

import net.glxn.qrgen.android.QRCode;
import net.glxn.qrgen.core.scheme.VCard;

import static com.github.characterdog.share_my_number.AboutActivity.EXTRA_PRIVACY_POLICY;
import static com.github.characterdog.share_my_number.PreferenceActivity.*;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getSimpleName();

    public static final int TAB_PRIVATE = 1;
    public static final int TAB_WORK = 2;
    public static final int TAB_OTHER = 3;

    /**
     * The {@link PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link FragmentStatePagerAdapter}.
     */
    private SectionsPagerAdapter mSectionsPagerAdapter;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.i(TAG, "onCreate()");
        setContentView(R.layout.activity_tabbed);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));

        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);
    }

    @Override
    protected void onResume() {
        super.onResume();
        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        try {
            tabLayout.getTabAt(TAB_PRIVATE - 1).setText(sharedPreferences.getString(PREF_PRIVATE_PROFILE, getString(R.string.tab_private)));
            tabLayout.getTabAt(TAB_WORK - 1).setText(sharedPreferences.getString(PREF_COMPANY_PROFILE, getString(R.string.tab_work)));
            tabLayout.getTabAt(TAB_OTHER - 1).setText(sharedPreferences.getString(PREF_OTHER_PROFILE, getString(R.string.tab_other)));
        } catch (Exception e) {
            Log.e(TAG, "Error setting tab title", e);
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            Intent i = new Intent(this, PreferenceActivity.class);
            startActivity(i);
            return true;
        } else if (id == R.id.action_about) {
            Intent i = new Intent(this, AboutActivity.class);
            startActivity(i);
            return true;
        } else if (id == R.id.action_privacy) {
            Intent i = new Intent(this, AboutActivity.class);
            i.putExtra(EXTRA_PRIVACY_POLICY, true);
            startActivity(i);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public static class ContactInfoFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String TAG = ContactInfoFragment.class.getSimpleName();
        private static final String ARG_SECTION_NUMBER = "section_number";


        public ContactInfoFragment() {
        }

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static ContactInfoFragment newInstance(int sectionNumber) {
            ContactInfoFragment fragment = new ContactInfoFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            Log.i(TAG, "onCreateView()");
            return inflater.inflate(R.layout.fragment_tabbed, container, false);
        }

        @Override
        public void onResume() {
            Log.i(TAG, "onResume()");
            super.onResume();
            View view = getView();
            if (view == null) {
                Log.e(TAG, "view is null!");
                return;
            }
            SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getContext());
            String name;
            String email;
            String address;
            String title;
            String company;
            String phoneNumber;
            String website;
            int tab = getArguments() != null ? getArguments().getInt(ARG_SECTION_NUMBER, TAB_PRIVATE) : TAB_PRIVATE;
            if (tab == TAB_PRIVATE) {
                name = sharedPreferences.getString(PREF_PRIVATE_NAME, null);
                email = sharedPreferences.getString(PREF_PRIVATE_EMAIL, null);
                address = sharedPreferences.getString(PREF_PRIVATE_ADDRESS, null);
                title = sharedPreferences.getString(PREF_PRIVATE_TITLE, null);
                company = sharedPreferences.getString(PREF_PRIVATE_COMPANY, null);
                phoneNumber = sharedPreferences.getString(PREF_PRIVATE_PHONE, null);
                website = sharedPreferences.getString(PREF_PRIVATE_WEBSITE, null);
            } else if (tab == TAB_WORK) {
                name = sharedPreferences.getString(PREF_COMPANY_NAME, null);
                email = sharedPreferences.getString(PREF_COMPANY_EMAIL, null);
                address = sharedPreferences.getString(PREF_COMPANY_ADDRESS, null);
                title = sharedPreferences.getString(PREF_COMPANY_TITLE, null);
                company = sharedPreferences.getString(PREF_COMPANY_COMPANY, null);
                phoneNumber = sharedPreferences.getString(PREF_COMPANY_PHONE, null);
                website = sharedPreferences.getString(PREF_COMPANY_WEBSITE, null);
            } else {
                name = sharedPreferences.getString(PREF_OTHER_NAME, null);
                email = sharedPreferences.getString(PREF_OTHER_EMAIL, null);
                address = sharedPreferences.getString(PREF_OTHER_ADDRESS, null);
                title = sharedPreferences.getString(PREF_OTHER_TITLE, null);
                company = sharedPreferences.getString(PREF_OTHER_COMPANY, null);
                phoneNumber = sharedPreferences.getString(PREF_OTHER_PHONE, null);
                website = sharedPreferences.getString(PREF_OTHER_WEBSITE, null);
            }

            if (TextUtils.isEmpty(name) && TextUtils.isEmpty(email) && TextUtils.isEmpty(address)
                    && TextUtils.isEmpty(title) && TextUtils.isEmpty(company)
                    && TextUtils.isEmpty(phoneNumber) && TextUtils.isEmpty(website)) {
                setUiNoInformation(true, view);
                return;
            }
            setUiNoInformation(false, view);

            ImageView qrCode = view.findViewById(R.id.qr);
            qrCode.setImageDrawable(getResources().getDrawable(R.drawable.ic_hourglass_full_teal_24dp));

            if (TextUtils.isEmpty(name)) {
                name = getString(R.string.no_name);
            }

            VCard vCard = new VCard(name)
                    .setEmail(email)
                    .setAddress(address)
                    .setTitle(title)
                    .setCompany(company)
                    .setPhoneNumber(phoneNumber)
                    .setWebsite(website);

            WindowManager wm = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
            view.getHeight();
            Display display = wm.getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            int qrSize = (int) (0.8 * (double) Math.min(size.x, size.y));

            setTextToTextViewOrHide(name, R.id.name, view);
            setTextToTextViewOrHide(email, R.id.email, view);
            setTextToTextViewOrHide(address, R.id.address, view);
            setTextToTextViewOrHide(title, R.id.title, view);
            setTextToTextViewOrHide(company, R.id.company, view);
            setTextToTextViewOrHide(phoneNumber, R.id.phoneNumber, view);
            setTextToTextViewOrHide(website, R.id.website, view);

            new SetQrCodeTask().execute(new SetQrCodeTaskBundle(vCard, qrSize));
        }

        private void setUiNoInformation(boolean noInformation, View view) {
            view.findViewById(R.id.qr).setVisibility(noInformation ? View.GONE : View.VISIBLE);
            view.findViewById(R.id.cardView).setVisibility(noInformation ? View.GONE : View.VISIBLE);
            Button openSettingsButton = view.findViewById(R.id.open_settings);
            openSettingsButton.setVisibility(noInformation ? View.VISIBLE : View.GONE);
            if (noInformation) {
                openSettingsButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        Intent i = new Intent(getContext(), PreferenceActivity.class);
                        startActivity(i);
                    }
                });
            } else {
                openSettingsButton.setOnClickListener(null);
            }
        }

        private void setTextToTextViewOrHide(String value, @IdRes int id, View view) {
            TextView textView = view.findViewById(id);
            if (TextUtils.isEmpty(value)) {
                textView.setVisibility(View.GONE);
            } else {
                textView.setText(value);
            }
        }

        private class SetQrCodeTaskBundle {
            private VCard mVCard;
            private int mQrSize;

            SetQrCodeTaskBundle(VCard vCard, int qrSize) {
                mVCard = vCard;
                mQrSize = qrSize;
            }

            VCard getVCard() {
                return mVCard;
            }

            int getQrSize() {
                return mQrSize;
            }
        }

        private class SetQrCodeTask extends AsyncTask<SetQrCodeTaskBundle, Void, Bitmap> {
            private final String TAG = SetQrCodeTask.class.getSimpleName();

            @Override
            protected Bitmap doInBackground(SetQrCodeTaskBundle... setQrCodeTaskBundles) {
                Log.d(TAG, "Generate QR code");
                return QRCode
                        .from(setQrCodeTaskBundles[0].getVCard())
                        .withColor(0xFF000000, 0x00000000)
                        .withSize(setQrCodeTaskBundles[0].getQrSize(), setQrCodeTaskBundles[0].getQrSize())
                        .withHint(EncodeHintType.CHARACTER_SET, "UTF-8")
                        .bitmap();
            }

            @Override
            protected void onPostExecute(Bitmap bitmap) {
                Log.d(TAG, "Set QR code");
                View view = getView();
                if (view == null) {
                    Log.e(TAG, "View is null");
                    return;
                }
                ImageView qrCode = getView().findViewById(R.id.qr);
                qrCode.setImageBitmap(bitmap);
            }
        }
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return ContactInfoFragment.newInstance(position + 1);
        }

        @Override
        public int getCount() {
            return 3;
        }
    }
}


```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/characterdog/share-my-number/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/characterdog/share-my-number).|
|3.|Follow code author [here](https://github.com/characterdog).|
