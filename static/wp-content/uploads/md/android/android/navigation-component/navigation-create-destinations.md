# Create destinations

You can create a destination from an existing fragment or activity. You can also use the Navigation Editor to create a new destination or create a placeholder to later replace with a fragment or activity.

Create a destination from an existing fragment or activity
----------------------------------------------------------

In the Navigation Editor, if you have an existing destination type that you'd like to add to your navigation graph, click **New Destination** , and then click on the corresponding destination in the dropdown that appears. You can now see a preview of the destination in the **Design** view along with the corresponding XML in the **Text** view of your navigation graph.

Create a new fragment destination
---------------------------------

To add a new destination type using the Navigation Editor, do the following:

1.  In the Navigation Editor, click the **New Destination** icon , and then click **Create new destination**.
2.  In the **New Android Component** dialog that appears, create your fragment. For more information on fragments, see the fragment documentation.

Back in the Navigation Editor, notice that Android Studio has added this destination to the graph.

Figure 1 shows an example of a destination and a placeholder destination.

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-destination-and-placeholder_2x.png)

**Figure 1.** A destination and a placeholder

Create a destination from a DialogFragment
------------------------------------------

If you have an existing `DialogFragment`, you can use the `<dialog>` element to add the dialog to your navigation graph, as shown in the following example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:id="@+id/nav_graph">

...

<dialog
    android:id="@+id/my_dialog_fragment"
    android:name="androidx.navigation.myapp.MyDialogFragment">
    <argument android:name="myarg" android:defaultValue="@null" />
        <action
            android:id="@+id/myaction"
            app:destination="@+id/another_destination"/>
</dialog>

...

</navigation>
```

Create a new activity destination
---------------------------------

Creating an `Activity` destination is similar to creating a `Fragment` destination. However, the nature of an `Activity` destination is quite different.

By default, the Navigation library attaches the `NavController` to an `Activity` layout, and the active navigation graph is scoped to the active `Activity`. If a user navigates to a different `Activity`, the current navigation graph is no longer in scope. This means that an `Activity` destination should be considered an endpoint within a navigation graph.

To add an `Activity` destination, specify the destination `Activity` with its fully-qualified class name:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation_graph"
    app:startDestination="@id/simpleFragment">

    <activity
        android:id="@+id/sampleActivityDestination"
        android:name="com.example.android.navigation.activity.DestinationActivity"
        android:label="@string/sampleActivityTitle" />
</navigation>
```

This XML is equivalent to the following call to `startActivity()`:

### Kotlin

```kotlin
startActivity(Intent(context, DestinationActivity::class.java))
```

### Java

```java
startActivity(new Intent(context, DestinationActivity.class));
```

You might have cases where this approach is not appropriate. For example, you might not have a compile-time dependency on the activity class, or you might prefer the level of indirection of going through an implicit intent. The `intent-filter` in the manifest entry for the destination `Activity` dictates how you need to structure the `Activity` destination.

For example, consider the following manifest file:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example.android.navigation.activity">
        <application>
            <activity android:name=".DestinationActivity">
                <intent-filter>
                    <action android:name="android.intent.action.VIEW" />
                    <data
                        android:host="example.com"
                        android:scheme="https" />
                    <category android:name="android.intent.category.BROWSABLE" />
                    <category android:name="android.intent.category.DEFAULT" />
                </intent-filter>
            </activity>
        </application>
    </manifest>
```

The corresponding `Activity` destination needs to be configured with `action`) and `data`) attributes matching those in the manifest entry:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation_graph"
    app:startDestination="@id/simpleFragment">
    <activity
        android:id="@+id/localDestinationActivity"
        android:label="@string/localActivityTitle"
        app:action="android.intent.action.VIEW"
        app:data="https://example.com"
        app:targetPackage="${applicationId}" />
</navigation>
```

Specifying `targetPackage`) to the current `applicationId` limits the scope to the current application, which includes the main app.

The same mechanism can be used for cases where you want a specific app to be the destination. The following example defines a destination to be an app with an `applicationId` of `com.example.android.another.app`.

```xml
<?xml version="1.0" encoding="utf-8"?>`
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation_graph"
    app:startDestination="@id/simpleFragment">
    <activity
        android:id="@+id/localDestinationActivity"
        android:label="@string/localActivityTitle"
        app:action="android.intent.action.VIEW"
        app:data="https://example.com"
        app:targetPackage="com.example.android.another.app" />
</navigation>
```

### Dynamic arguments

The previous examples used fixed URLs to navigate to destinations. You might also need to support dynamic URLs where additional info is sent as part of the URL. For example, you might send a user ID in a URL with a format similar to `https://example.com?userId=<actual user ID>`.

In this case, instead of the `data`) attribute, use `dataPattern`). You can then supply arguments to be substituted for named placeholders within the `dataPattern` value:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation_graph"
    app:startDestination="@id/simpleFragment">
    <activity
        android:id="@+id/localDestinationActivity"
        android:label="@string/localActivityTitle"
        app:action="android.intent.action.VIEW"
        app:dataPattern="https://example.com?userId={userId}"
        app:targetPackage="com.example.android.another.app">
        <argument
            android:name="userId"
            app:argType="string" />
    </activity>
</navigation>
```

In this example, you can specify a `userId` value using either Safe Args or with a `Bundle`:

### Kotlin

```kotlin
navController.navigate(
    R.id.localDestinationActivity,
    bundleOf("userId" to "someUser")
)
```

### Java

```java
Bundle args = new Bundle();
args.putString("userId", "someUser");
navController.navigate(R.id.localDestinationActivity, args);
```

This example substitutes `someUser` for `{userId}` and creates a URI value of `https://example.com?userId=someUser`.

Placeholder destinations
------------------------

You can use _placeholders_ to represent unimplemented destinations. A placeholder serves as a visual representation of a destination. Within the Navigation Editor, you can use placeholders just as you would any other destination.