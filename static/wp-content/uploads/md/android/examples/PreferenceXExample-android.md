# PreferenceX Example


Let us look at a Android PreferenceXExample-android-master example.

This example will comprise the following files:

- `MainActivity.kt`
- `SettingsFragment.kt`
- `SettingsSyncFragment.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


In your `app/build.gradle` add dependencies as shown below. Include the `androidx.preference:preference` as a dependency:

```groovy
    implementation "androidx.preference:preference:1.1.0-alpha01"

```

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <FrameLayout
        android:id="@+id/container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />


</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
***(b). `content_main.xml`**

Create a file named `content_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        tools:showIn="@layout/activity_main"
        tools:context=".MainActivity">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World!"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt` and implement the `PreferenceFragmentCompat.OnPreferenceStartFragmentCallback` interface then override the `onPreferenceStartFragment` function:

```kotlin
    override fun onPreferenceStartFragment(caller: PreferenceFragmentCompat?, pref: Preference?): Boolean = false

```

Here is the full code

```kotlin
package com.numero.preference_androidx

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), PreferenceFragmentCompat.OnPreferenceStartFragmentCallback {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        supportFragmentManager.beginTransaction()
                .replace(R.id.container, SettingsFragment())
                .commit()
    }

    override fun onPreferenceStartFragment(caller: PreferenceFragmentCompat?, pref: Preference?): Boolean = false
}
```

**(b). `SettingsFragment.kt`**

Create a file named `SettingsFragment.kt` and extend the `PreferenceFragmentCompat` then override the `onCreatePreferences` as shown below:

```kotlin
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings, rootKey)
    }
```

Here is the full code

```kotlin
package com.numero.preference_androidx

import android.os.Bundle
import androidx.preference.PreferenceFragmentCompat

class SettingsFragment : PreferenceFragmentCompat() {
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings, rootKey)
    }
}
```

**(c). `SettingsSyncFragment.kt`**

Create a file named `SettingsSyncFragment.kt` and extend the `PreferenceFragmentCompat` then override the `onCreatePreferences` and `onCreate` functions as shown:

```kotlin
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings_sync, rootKey)
    }
```

Here is the full code

```kotlin
package com.numero.preference_androidx

import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import androidx.preference.SwitchPreferenceCompat

class SettingsSyncFragment : PreferenceFragmentCompat() {
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings_sync, rootKey)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val syncSummaryProvider = Preference.SummaryProvider<SwitchPreferenceCompat> { preference ->
            if (preference.isChecked) {
                "Checked"
            } else {
                "Non checked"
            }
        }

        findPreference("enable_sync").summaryProvider = syncSummaryProvider
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/NUmeroAndDev/PreferenceXExample-android-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/NUmeroAndDev/PreferenceXExample-android).
2. [Follow](https://github.com/NUmeroAndDev/) code author.


