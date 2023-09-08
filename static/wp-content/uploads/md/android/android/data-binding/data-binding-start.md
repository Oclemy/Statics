# App Architecture: UI Layer - Get Started - Android Developers

Learn how to get your development environment ready to work with the Data Binding Library, including support for data binding code in Android Studio.

The Data Binding Library offers both flexibility and broad compatibility—it's a support library, so you can use it with devices running Android 4.0 (API level 14) or higher.

It's recommended to use the latest Android Plugin for Gradle in your project. However, data binding is supported on version 1.5.0 and higher. For more information, see how to update the Android Plugin for Gradle.

Build environment
-----------------

To get started with data binding, download the library from the **Support Repository** in the Android SDK manager. For more information, see Update the IDE and SDK Tools.

To configure your app to use data binding, enable the `dataBinding` build option in your `build.gradle` file in the app module, as shown in the following example:

```groovy
    android {
        ...
        buildFeatures {
            dataBinding true
        }
    }
```

Android Studio support for data binding
---------------------------------------

Android Studio supports many of the editing features for data binding code. For example, it supports the following features for data binding expressions:

*   Syntax highlighting
*   Flagging of expression language syntax errors
*   XML code completion
*   References, including navigation (such as navigate to a declaration) and quick documentation

The **Preview** pane in **Layout Editor** displays the default value of data binding expressions, if provided. For example, the **Preview** pane displays the `my_default` value on the `TextView` widget declared in the following example:

```xml
    <TextView android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@{user.firstName, default=my_default}"/>
```

If you need to display a default value only during the design phase of your project, you can use `tools` attributes instead of default expression values, as described in Tools Attributes Reference.