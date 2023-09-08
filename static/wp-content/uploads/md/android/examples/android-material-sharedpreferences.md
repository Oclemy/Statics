# Android Material SharedPreferences Tutorial and Example

_Android MaterialPreferences Tutorial and Example_

In this class we want to explore then look at example of MaterialPrefences library. We look at what it is, why it's important and an example.


#### What is MaterialPrefences?

_It is a highly flexible set of lovely looking views that provides functionality of preferences._

MaterialPreferences is a set of VIEWS (not Preferences) and is aimed to solve this problems:

1. Preferences look ugly on pre-lollipop.
2. Preferences are not flexible. For example, it can be problematic to embed them to another screen (especially for fragment-haters).
3. Preferences don't allow you to show custom selection dialogs.

![Android MaterialPreferences](https://raw.githubusercontent.com/yarolegovich/materialpreferences/master/art/screenshots.png)

#### How do I Install MaterialPreferences?

Then we can come and specify the dependency as an implementation statement. This way gradle will download and add it to our project the moment we click the `sync` button in android studio.

```groovy
dependencies {
            implementation 'com.yarolegovich:mp:1.0.9'
    }
```

If you want to use `LovelyInput` you will also need this:

```groovy
implementation 'com.yarolegovich:lovelyinput:1.0.9'
```

It is always appropriate to check for the latest version of the library [here](https://github.com/yarolegovich/MaterialPreferences).

#### Video tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Types of MaterialPrefences

There are two main types of MaterialPreferences:

1. MaterialPreferenceScreen
2. MaterialPreferenceCategory

We also have the following `AbsMaterialPreference` subclasses:

1. MaterialStandardPreference
2. MaterialRightIconPreference
3. AbsMaterialTextValuePreference
4. AbsMaterialListPreference
    1. MaterialChoicePreference
    2. MaterialMultiChoicePreference
5. MaterialEditTextPreference
6. AbsMaterialCheckablePreference
7. MaterialSwitchPreference
8. MaterialCheckboxPreference
9. MaterialColorPreference
10. MaterialSeekBarPreference

Each preference contains optional title, summary and icon (icon can be tinted). Also for some preferences it is mandatory to set default value and key (at least when dealing with SharedPreference as `StorageModule`).

```xml
<com.yarolegovich.mp.AnyAbsMaterialPreferenceSubclass

    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    app_mp_icon="@drawable/your_icon"
    app_mp_icon_tint="@color/textSecondary"
    app_mp_title="@string/your_title"
    app_mp_summary="@string/your_summary"
    app_mp_key="@string/pkey_your_key"
    app_mp_default_value="42|true|any string"/>
```

#### How do I use MaterialPrefences?

it's very easy to use MaterialPrefences.

First you need to add the ChipView element in layout.

```xml
<com.yarolegovich.mp.AnyAbsMaterialPreferenceSubclass

    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    app_mp_icon="@drawable/your_icon"
    app_mp_icon_tint="@color/textSecondary"
    app_mp_title="@string/your_title"
    app_mp_summary="@string/your_summary"
    app_mp_key="@string/pkey_your_key"
    app_mp_default_value="42|true|any string"/>
```

#### Full Android MaterialPreference Example for Java Android

Let's look at a simple example right here.

Here's the result:

#### Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation "com.yarolegovich:mp:1.0.9"
    implementation "com.yarolegovich:lovelyinput:1.0.9"
    implementation 'com.android.support:appcompat-v7:28.0.0-alpha3'
    implementation 'com.android.support:design:28.0.0-alpha3'
}
```

#### Resources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

We create our user interfaces in XML instead of java.

##### (a). activity_main.xml

This layout will get inflated into the main [Activity](https://camposha.info/android/activity)'s user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of Activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.yarolegovich.mp.MaterialPreferenceScreen

    android_id="@+id/preference_screen"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    tools_context="com.devosha.materialpreference.MainActivity">

    <FrameLayout
        android_layout_width="match_parent"
        android_layout_height="200dp">

        <ImageView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_scaleType="centerCrop"
            android_src="@drawable/app_icon" />
    </FrameLayout>

    <com.yarolegovich.mp.MaterialPreferenceCategory
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <com.yarolegovich.mp.MaterialSwitchPreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_icon="@drawable/ic_insert_emoticon_black_24dp"
            app_mp_key="@string/pkey_use_lovely"
            app_mp_title="@string/use_lovely_module" />

        <com.yarolegovich.mp.MaterialStandardPreference
            android_id="@+id/pref_configs"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_icon="@drawable/ic_settings_black_24dp"
            app_mp_title="@string/app_configs" />

        <com.yarolegovich.mp.MaterialStandardPreference
            android_id="@+id/pref_form"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_icon="@drawable/ic_supervisor_account_black_24dp"
            app_mp_title="@string/fill_the_form" />

    </com.yarolegovich.mp.MaterialPreferenceCategory>

</com.yarolegovich.mp.MaterialPreferenceScreen>
```

##### (b). activity_form.xml

Our `activity_form.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".FormActivity">

    <com.yarolegovich.mp.MaterialPreferenceScreen
        android_id="@+id/preference_screen"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <include layout="@layout/toolbar" />

        <com.yarolegovich.mp.MaterialPreferenceCategory
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mpc_title="@string/experience">

            <com.yarolegovich.mp.MaterialMultiChoicePreference
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                app_mp_entry_values="@array/technologies"
                app_mp_key="@string/pkey_techs"
                app_mp_show_value="onBottom"
                app_mp_title="@string/techs_you_know" />

            <com.yarolegovich.mp.MaterialSeekBarPreference
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                app_mp_default_value="2"
                app_mp_key="@string/pkey_experience"
                app_mp_max_val="10"
                app_mp_min_val="1"
                app_mp_show_val="true"
                app_mp_title="@string/years_of_exp" />

        </com.yarolegovich.mp.MaterialPreferenceCategory>

        <com.yarolegovich.mp.MaterialPreferenceCategory
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mpc_title="@string/personal">

            <com.yarolegovich.mp.MaterialColorPreference
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                app_mp_key="@string/pkey_color"
                app_mp_title="@string/fav_color" />

            <com.yarolegovich.mp.MaterialCheckboxPreference
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                app_mp_key="@string/pkey_adequate"
                app_mp_title="@string/adequate" />

        </com.yarolegovich.mp.MaterialPreferenceCategory>

    </com.yarolegovich.mp.MaterialPreferenceScreen>

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|right"
        android_layout_margin="16dp"
        android_onClick="submitForm"
        android_src="@drawable/ic_done_white_24dp" />

</FrameLayout>
```

##### (c). activity_settings_.xml

Our `activity_settings_.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.yarolegovich.mp.MaterialPreferenceScreen

    android_id="@+id/preference_screen"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    tools_context="com.devosha.materialpreference.MainActivity">

    <include layout="@layout/toolbar" />

    <com.yarolegovich.mp.MaterialPreferenceCategory
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_mpc_title="@string/performance">

        <com.yarolegovich.mp.MaterialChoicePreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="24 hours"
            app_mp_entry_values="@array/update_intervals"
            app_mp_key="@string/pkey_update_interval"
            app_mp_show_value="onRight"
            app_mp_title="@string/update_interval" />

        <com.yarolegovich.mp.MaterialSwitchPreference
            android_id="@+id/pref_auto_loc"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="true"
            app_mp_key="@string/pkey_auto_location"
            app_mp_title="@string/auto_location" />

        <com.yarolegovich.mp.MaterialEditTextPreference
            android_id="@+id/pref_location"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="@string/pdef_location"
            app_mp_key="@string/pkey_location"
            app_mp_show_value="onRight"
            app_mp_title="@string/location" />

    </com.yarolegovich.mp.MaterialPreferenceCategory>

    <com.yarolegovich.mp.MaterialPreferenceCategory
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_mpc_title="@string/appearance">

        <com.yarolegovich.mp.MaterialChoicePreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="@string/pdef_temp_units"
            app_mp_entry_values="@array/temperature_units"
            app_mp_key="@string/pkey_temperature"
            app_mp_show_value="onRight"
            app_mp_title="@string/temp_units" />

        <com.yarolegovich.mp.MaterialChoicePreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="Tue, Apr 20"
            app_mp_entry_values="@array/date_formats"
            app_mp_key="@string/pkey_date_format"
            app_mp_show_value="onRight"
            app_mp_title="@string/date_format" />

        <com.yarolegovich.mp.MaterialChoicePreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_default_value="HH:mm"
            app_mp_entry_descriptions="@array/time_format_descriptions"
            app_mp_entry_values="@array/time_formats"
            app_mp_key="@string/pkey_time_format"
            app_mp_show_value="onRight"
            app_mp_title="@string/time_format" />

    </com.yarolegovich.mp.MaterialPreferenceCategory>

    <com.yarolegovich.mp.MaterialPreferenceCategory
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_mpc_title="@string/help_improve">

        <com.yarolegovich.mp.MaterialRightIconPreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_icon="@drawable/ic_star_border_black_24dp"
            app_mp_icon_tint="@color/textSecondary"
            app_mp_title="@string/rate_the_lib" />

        <com.yarolegovich.mp.MaterialRightIconPreference
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_mp_icon="@drawable/ic_local_atm_black_24dp"
            app_mp_icon_tint="@color/textSecondary"
            app_mp_title="@string/donate" />

    </com.yarolegovich.mp.MaterialPreferenceCategory>

</com.yarolegovich.mp.MaterialPreferenceScreen>
```

##### (d). toolbar.xml

Our `toolbar.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.AppBarLayout

    android_layout_width="match_parent"
    android_layout_height="wrap_content">

    <android.support.v7.widget.Toolbar
        android_id="@+id/toolbar"
        android_layout_width="match_parent"
        android_layout_height="?attr/actionBarSize"
        android_background="@color/colorPrimary"
        android_gravity="center_vertical"
        android_theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app_popupTheme="@style/ThemeOverlay.AppCompat.Light" />
</android.support.design.widget.AppBarLayout>
```

#### Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). MainActivity.java

This is our launcher [Activity](https://camposha.info/android/activity) as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this [Activity](https://camposha.info/android/activity) will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main [Activity](https://camposha.info/android/activity) is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

- Our MainActivity class.
- Implements the `View.OnClickListener` and `SharedPreferences.OnSharedPreferenceChangeListener`
- interfaces.
- MAIN ROLE : Is our launcher activity.

```java
package com.devosha.materialpreference;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.yarolegovich.lovelyuserinput.LovelyInput;
import com.yarolegovich.mp.io.MaterialPreferences;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements View.OnClickListener,
        SharedPreferences.OnSharedPreferenceChangeListener {

    /**
     * Our MainActivity's `onCreate()` method.
     * @param savedInstanceState - a Bundle object
     * First we initialize our Prefs class, then reference our preferences form
     * and preferences configuration screen and listen to their click events.
     * We will also initialize the SharedPreferences interface.
     * `SharedPreferences` is an interface for accessing and modifying preference
     * data returned by getSharedPreferences(String, int)
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Prefs.init(this);

        findViewById(R.id.pref_form).setOnClickListener(this);
        findViewById(R.id.pref_configs).setOnClickListener(this);

        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(this);
        prefs.registerOnSharedPreferenceChangeListener(this);
        setUserInputModule(prefs.getBoolean(Prefs.keys().KEY_USE_LOVELY, false));
    }

    /**
     * Our `onDestroy()` callback.
     * We unregister the SharedPrefenceChangeListener event here.
     */
    @Override
    protected void onDestroy() {
        super.onDestroy();
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(this);
        prefs.unregisterOnSharedPreferenceChangeListener(this);
    }

    /**
     * Our `onClick()` event.
     * MAIN ROLE: Listen to click events and open either Preferences Form or Preferences
     * Settings
     * @param v
     */
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.pref_form:
                startActivity(new Intent(this, FormActivity.class));
                break;
            case R.id.pref_configs:
                startActivity(new Intent(this, SettingsActivity.class));
                break;
        }
    }

    /**
     * Listen to PreferenceChange events,
     * @param sharedPreferences
     * @param key
     */
    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
        if (key.equals(Prefs.keys().KEY_USE_LOVELY)) {
            setUserInputModule(sharedPreferences.getBoolean(key, false));
        }
    }

    /**
     * Our setUserInputModule() method.
     *
     * @param shouldUseLovelyModule
     */
    private void setUserInputModule(boolean shouldUseLovelyModule) {
        if (shouldUseLovelyModule) {
            MaterialPreferences.instance().setUserInputModule(createLovelyInputModule());
        } else {
            MaterialPreferences.instance().setDefault();
        }
    }

    /**
     * Our `createLovelyInputModule()` method.
     * Creates us nice input elements.
     * @return
     */
    private LovelyInput createLovelyInputModule() {
        Map<String, Integer> iconMappings = new HashMap<>();
        Prefs keys = Prefs.keys();
        iconMappings.put(keys.KEY_UPDATE_INTERVAL, R.drawable.ic_access_time_white_36dp);
        iconMappings.put(keys.KEY_LOCATION, R.drawable.ic_location_on_white_36dp);
        iconMappings.put(keys.KEY_TEMPERATURE, R.drawable.ic_thermometer_lines_white_36dp);
        iconMappings.put(keys.KEY_DATE_FORMAT, R.drawable.ic_date_range_white_36dp);
        iconMappings.put(keys.KEY_TIME_FORMAT, R.drawable.ic_access_time_white_36dp);
        iconMappings.put(keys.KEY_TECHNOLOGIES, R.drawable.ic_computer_white_36dp);
        int topColor = ContextCompat.getColor(this, R.color.lovelyDialogTop);
        return new LovelyInput.Builder()
                .setKeyIconMappings(iconMappings)
                .setTopColor(topColor)
                .build();
    }
}
//end
```

##### (b). Form.java

Our `Form` class.

- Our Form class. Our Form data object class.
- MAIN ROLE : Get and set Form values.

```java
package com.devosha.materialpreference;

import android.graphics.Color;
import java.util.HashSet;
import java.util.Set;

public class Form {
    /**
     * Our instance fields
     */
    private int yearsOfExp;
    private int favoriteColor;
    private boolean isAdequate;
    private Set<String> technologies;

    /**
     * Our Form constructor.
     * Initialize and set Form values.
     */
    public Form() {
        technologies = new HashSet<>();
        favoriteColor = Color.CYAN;
        yearsOfExp = 5;
    }

    /**
     * Our Getter and Setter methods.
     *
     */
    public int getYearsOfExperience() { return yearsOfExp; }
    public void setYearsOfExp(int yearsOfExp) { this.yearsOfExp = yearsOfExp;}
    public int getFavoriteColor() { return favoriteColor; }
    public void setFavoriteColor(int favoriteColor) { this.favoriteColor = favoriteColor; }
    public boolean isAdequate() {return isAdequate; }
    public void setIsAdequate(boolean isAdequate) { this.isAdequate = isAdequate; }
    public Set<String> getTechnologies() { return technologies; }
    public void setTechnologies(Set<String> technologies) { this.technologies = technologies; }

    /**
     * Our toString() method. We are overriding this method.
     * @return string representation of this `Form` class.
     */
    @Override
    public String toString() {
        return "Form{" +
                "yearsOfExp=" + yearsOfExp +
                ", favoriteColor=" + favoriteColor +
                ", isAdequate=" + isAdequate +
                ", technologies=" + technologies +
                '}';
    }
    //end
}
```

##### (c). Prefs.java

Our `Prefs` class.

- Our Prefs class.
- MAIN ROLE : Contains string constants to be used as keys with values retrieved from `strings.xml`.

```java
package com.devosha.materialpreference;

import android.content.Context;

public class Prefs {
    private static Prefs instance;
    /**
     * Our static init method.
     * We instantiate the Prefs class here.
     * @param context
     */
    public static void init(Context context) {
        instance = new Prefs(context);
    }

    /**
     * Our `keys()` method.
     * @return instance of Prefs class.
     */
    public static Prefs keys() {
        return instance;
    }

    /**
     * Our string constant declarations.
     */
    public final String KEY_USE_LOVELY;
    public final String KEY_YEARS_OF_EXP;
    public final String KEY_IS_ADEQUATE;
    public final String KEY_TECHNOLOGIES;
    public final String KEY_FAV_COLOR;
    public final String KEY_UPDATE_INTERVAL;
    public final String KEY_AUTO_LOCATION;
    public final String KEY_LOCATION;
    public final String KEY_TEMPERATURE;
    public final String KEY_DATE_FORMAT;
    public final String KEY_TIME_FORMAT;

    /**
     * Our Prefs constructor. We set our constant values.
     * We are referencing our values from `strings.xml`.
     * @param context
     */
    private Prefs(Context context) {
        KEY_USE_LOVELY = context.getString(R.string.pkey_use_lovely);

        KEY_YEARS_OF_EXP = context.getString(R.string.pkey_experience);
        KEY_IS_ADEQUATE = context.getString(R.string.pkey_adequate);
        KEY_TECHNOLOGIES = context.getString(R.string.pkey_techs);
        KEY_FAV_COLOR = context.getString(R.string.pkey_color);

        KEY_UPDATE_INTERVAL = context.getString(R.string.pkey_update_interval);
        KEY_AUTO_LOCATION = context.getString(R.string.pkey_auto_location);
        KEY_LOCATION = context.getString(R.string.pkey_location);
        KEY_TEMPERATURE = context.getString(R.string.pkey_temperature);
        KEY_DATE_FORMAT = context.getString(R.string.pkey_date_format);
        KEY_TIME_FORMAT = context.getString(R.string.pkey_time_format);
    }
}
```

##### (d). FormInitializer.java

Our `FormInitializer` class.

- Our FormInitializer class.
- This class will implement the `StorageModule` defined in the `com.yarolegovich.mp.io` package.

```java
package com.devosha.materialpreference;

import android.os.Bundle;

import com.yarolegovich.mp.io.StorageModule;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class FormInitializer implements StorageModule {

    private Form form;

    /**
     * Our FormInitializer constructor.
     * @param form - Form object
     */
    public FormInitializer(Form form) {
        this.form = form;
    }

    /**
     * Save isAdequate value of our Form.
     * @param key - string
     * @param value - value
     */
    @Override
    public void saveBoolean(String key, boolean value) {
        form.setIsAdequate(value);
    }

    @Override
    public void saveString(String key, String value) {

    }

    /**
     * Save integers in our preference.
     * In this case we save the FAV_COLOR and YEARS_OF_EXP.
     * @param key
     * @param value
     */
    @Override
    public void saveInt(String key, int value) {
        if (key.equals(Prefs.keys().KEY_FAV_COLOR)) {
            form.setFavoriteColor(value);
        } else if (key.equals(Prefs.keys().KEY_YEARS_OF_EXP)) {
            form.setYearsOfExp(value);
        }
    }

    /**
     * Save the Technologies.
     * @param key - the key to identify the value.
     * @param value - a Set of strings
     */
    @Override
    public void saveStringSet(String key, Set<String> value) {
        form.setTechnologies(value);
    }

    /**
     * Retrieve the isAdequate value
     * @param key
     * @param defaultVal
     * @return
     */
    @Override
    public boolean getBoolean(String key, boolean defaultVal) {
        return form.isAdequate();
    }

    @Override
    public String getString(String key, String defaultVal) {
        return "";
    }

    /**
     * Retrieve the FAV_COLOR and YEARS_OF_EXP
     * @param key
     * @param defaultVal
     * @return
     */
    @Override
    public int getInt(String key, int defaultVal) {
        if (key.equals(Prefs.keys().KEY_FAV_COLOR)) {
            return form.getFavoriteColor();
        } else if (key.equals(Prefs.keys().KEY_YEARS_OF_EXP)) {
            return form.getYearsOfExperience();
        } else {
            throw new IllegalArgumentException("key not supported");
        }
    }

    /**
     * Retrieve the technologies.
     * @param key
     * @param defaultVal
     * @return - `Set` of Strings
     */
    @Override
    public Set<String> getStringSet(String key, Set<String> defaultVal) {
        return form.getTechnologies();
    }

    /**
     * Save/Serialize the Form state
     * @param outState
     */
    @Override
    public void onSaveInstanceState(Bundle outState) {
        Prefs keys = Prefs.keys();
        outState.putInt(keys.KEY_YEARS_OF_EXP, form.getYearsOfExperience());
        outState.putInt(keys.KEY_FAV_COLOR, form.getFavoriteColor());
        outState.putStringArrayList(keys.KEY_TECHNOLOGIES, new ArrayList<>(form.getTechnologies()));
        outState.putBoolean(keys.KEY_IS_ADEQUATE, form.isAdequate());
    }

    /**
     * Deserialize/Restore the Form state
     * @param savedState
     */
    @Override
    public void onRestoreInstanceState(Bundle savedState) {
        if (savedState != null) {
            Prefs keys = Prefs.keys();
            form.setTechnologies(new HashSet<>(savedState.getStringArrayList(keys.KEY_TECHNOLOGIES)));
            form.setYearsOfExp(savedState.getInt(keys.KEY_YEARS_OF_EXP));
            form.setFavoriteColor(savedState.getInt(keys.KEY_FAV_COLOR));
            form.setIsAdequate(savedState.getBoolean(keys.KEY_IS_ADEQUATE));
        }
    }
    //end
}
```

##### (e). FormActivity.java

Our `FormActivity` class.

- Our FormActivity. Derives from `ToolbarActivity`.
- Use the `FormInitializer` class to save the Form state, restore it and set it as the storage module of our MaterialPreferenceScreen.

```java
package com.devosha.materialpreference;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.yarolegovich.mp.MaterialPreferenceScreen;

public class FormActivity extends ToolbarActivity {

    private Form form = new Form();

    /**
     * Our onCreate() callback.
     * First we reference our MaterialPreferenceScreen from our `activity_form`.
     * Then we instantiate our FormInitializer and restore the Form state.
     * Then we set our StorageModule, which is the FormInitializer class to the
     * {@link MaterialPreferenceScreen}
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form);

        setupToolbar();

        MaterialPreferenceScreen screen = (MaterialPreferenceScreen) findViewById(R.id.preference_screen);
        FormInitializer formInitializer = new FormInitializer(form);
        formInitializer.onRestoreInstanceState(savedInstanceState);
        screen.setStorageModule(formInitializer);
    }

    /**
     * Save the Form state
     * @param outState - Bundle object to hold the Form state.
     */
    @Override
    public void onSaveInstanceState(Bundle outState) {
        new FormInitializer(form).onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    /**
     * Our `submitForm()`.
     * This method will simply show the submitted values in a Toast message.
     * @param v - View object.
     */
    public void submitForm(View v) {
        Toast.makeText(this,
                "Form submitted!n" + form.toString(),
                Toast.LENGTH_SHORT)
                .show();
    }
    //end
}
```

##### (f). SettingsActivity.java

Our `SettingsActivity` class.

- Our SettingsActivity Activity.
- This class derives from ToolbarActivity.

```java
package com.devosha.materialpreference;

import android.os.Bundle;
import com.yarolegovich.mp.MaterialPreferenceScreen;
import java.util.Arrays;

public class SettingsActivity extends ToolbarActivity {

    /**
     * Our onCreate() method.
     * First we set the activity_settings layout as our content view.
     * Then we setup the toolbar by invoking the `setupToolbar()` method defined in
     * the ToolbarActivity.
     * @param savedInstanceState
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        setupToolbar();

        MaterialPreferenceScreen screen = findViewById(R.id.preference_screen);
        screen.setVisibilityController(R.id.pref_auto_loc, Arrays.asList(R.id.pref_location), false);
    }

}
```

##### (g). ToolbarActivity.java

Our `ToolbarActivity` class.

- Our ToolBarActivity.

```java
package com.devosha.materialpreference;

import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

public class ToolbarActivity extends AppCompatActivity {

    /**
     * Setup our ToolBar
     */
    @SuppressWarnings("ConstantConditions")
    protected void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }
}
```

#### Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MrMaterialPreference/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MrMaterialPreference) |

Best Regards,

Oclemy.
