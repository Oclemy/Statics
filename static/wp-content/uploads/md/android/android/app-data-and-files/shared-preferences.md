# Save key-value data

If you have a relatively small collection of key-values that you'd like to save, you should use the `SharedPreferences` APIs. A `SharedPreferences` object points to a file containing key-value pairs and provides simple methods to read and write them. Each `SharedPreferences` file is managed by the framework and can be private or shared.

This page shows you how to use the `SharedPreferences` APIs to store and retrieve simple values.

> **Note:** The `SharedPreferences` APIs are for reading and writing key-value pairs, and you should not confuse them with the `Preference` APIs, which help you build a user interface for your app settings (although they also use `SharedPreferences` to save the user's settings). For information about the `Preference` APIs, see the Settings developer guide.

You can create a new shared preference file or access an existing one by calling one of these methods:

*   `getSharedPreferences()` — Use this if you need multiple shared preference files identified by name, which you specify with the first parameter. You can call this from any `Context` in your app.
*   `getPreferences()` — Use this from an `Activity` if you need to use only one shared preference file for the activity. Because this retrieves a default shared preference file that belongs to the activity, you don't need to supply a name.

For example, the following code accesses the shared preferences file that's identified by the resource string `R.string.preference_file_key` and opens it using the private mode so the file is accessible by only your app:

### Kotlin

```kotlin
val sharedPref = activity?.getSharedPreferences(
        getString(R.string.preference_file_key), Context.MODE_PRIVATE)
```

### Java

```java
Context context = getActivity();
SharedPreferences sharedPref = context.getSharedPreferences(
        getString(R.string.preference_file_key), Context.MODE_PRIVATE);
```

When naming your shared preference files, you should use a name that's uniquely identifiable to your app. An easy way to do this is prefix the file name with your application ID. For example: `"com.example.myapp.PREFERENCE_FILE_KEY"`

Alternatively, if you need just one shared preference file for your activity, you can use the `getPreferences()` method:

### Kotlin

```kotlin
val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE)
```

### Java

```java
SharedPreferences sharedPref = getActivity().getPreferences(Context.MODE_PRIVATE);
```

> **Caution:** The `MODE_WORLD_READABLE` and `MODE_WORLD_WRITEABLE` modes have been deprecated since API level 17. Starting with Android 7.0 (API level 24), Android throws a `SecurityException` if you use them. If your app needs to share private files with other apps, it may use a `FileProvider` with the `FLAG_GRANT_READ_URI_PERMISSION`. For more information, also see Sharing Files.

If you're using the `SharedPreferences` API to save app settings, you should instead use `getDefaultSharedPreferences()` to get the default shared preference file for your entire app. For more information, see the Settings developer guide.

To write to a shared preferences file, create a `SharedPreferences.Editor` by calling `edit()` on your `SharedPreferences`.

> **Note:** You can edit shared preferences in a more secure way by calling the `edit()` method on an `EncryptedSharedPreferences` object instead of on a `SharedPreferences` object. To learn more, see the guide on how to work with data more securely.

Pass the keys and values you want to write with methods such as `putInt()` and `putString()`. Then call `apply()` or `commit()` to save the changes. For example:

### Kotlin

```kotlin
val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return
with (sharedPref.edit()) {
    putInt(getString(R.string.saved_high_score_key), newHighScore)
    apply()
}
```

### Java

```java
SharedPreferences sharedPref = getActivity().getPreferences(Context.MODE_PRIVATE);
SharedPreferences.Editor editor = sharedPref.edit();
editor.putInt(getString(R.string.saved_high_score_key), newHighScore);
editor.apply();
```

`apply()` changes the in-memory `SharedPreferences` object immediately but writes the updates to disk asynchronously. Alternatively, you can use `commit()` to write the data to disk synchronously. But because `commit()` is synchronous, you should avoid calling it from your main thread because it could pause your UI rendering.

To retrieve values from a shared preferences file, call methods such as `getInt()` and `getString()`, providing the key for the value you want, and optionally a default value to return if the key isn't present. For example:

### Kotlin

```kotlin
val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return
val defaultValue = resources.getInteger(R.integer.saved_high_score_default_key)
val highScore = sharedPref.getInt(getString(R.string.saved_high_score_key), defaultValue)
```

### Java

```java
SharedPreferences sharedPref = getActivity().getPreferences(Context.MODE_PRIVATE);
int defaultValue = getResources().getInteger(R.integer.saved_high_score_default_key);
int highScore = sharedPref.getInt(getString(R.string.saved_high_score_key), defaultValue);
```