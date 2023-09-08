# Two-way data binding

Using one-way data binding, you can set a value on an attribute and set a listener that reacts to a change in that attribute:

```xml
<CheckBox
    android:id="@+id/rememberMeCheckBox"
    android:checked="@{viewmodel.rememberMe}"
    android:onCheckedChanged="@{viewmodel.rememberMeChanged}"
/>
```

Two-way data binding provides a shortcut to this process:

```xml
<CheckBox
    android:id="@+id/rememberMeCheckBox"
    android:checked="@={viewmodel.rememberMe}"
/>
```

The `@={}` notation, which importantly includes the "=" sign, receives data changes to the property and listen to user updates at the same time.

In order to react to changes in the backing data, you can make your layout variable an implementation of `Observable`, usually `BaseObservable`, and use a `@Bindable` annotation, as shown in the following code snippet:

### Kotlin

```kotlin
class LoginViewModel : BaseObservable {
    // val data = ...

    @Bindable
    fun getRememberMe(): Boolean {
        return data.rememberMe
    }

    fun setRememberMe(value: Boolean) {
        // Avoids infinite loops.
        if (data.rememberMe != value) {
            data.rememberMe = value

            // React to the change.
            saveData()

            // Notify observers of a new value.
            notifyPropertyChanged(BR.remember_me)
        }
    }
}
```

### Java

```java
public class LoginViewModel extends BaseObservable {
    // private Model data = ...

    @Bindable
    public Boolean getRememberMe() {
        return data.rememberMe;
    }

    public void setRememberMe(Boolean value) {
        // Avoids infinite loops.
        if (data.rememberMe != value) {
            data.rememberMe = value;

            // React to the change.
            saveData();

            // Notify observers of a new value.
            notifyPropertyChanged(BR.remember_me);
        }
    }
}
```

Because the bindable property's getter method is called `getRememberMe()`, the property's corresponding setter method automatically uses the name `setRememberMe()`.

For more information on using `BaseObservable` and `@Bindable`, see Work with observable data objects.

Two-way data binding using custom attributes
--------------------------------------------

The platform provides two-way data binding implementations for the most common two-way attributes and change listeners, which you can use as part of your app. If you want to use two-way data binding with custom attributes, you need to work with the `@InverseBindingAdapter` and `@InverseBindingMethod` annotations.

For example, if you want to enable two-way data binding on a `"time"` attribute in a custom view called `MyView`, complete the following steps:

1.  Annotate the method that sets the initial value and updates when the value changes using `@BindingAdapter`:
    
    ### Kotlin

```kotlin    
    @BindingAdapter("time")
    @JvmStatic fun setTime(view: MyView, newValue: Time) {
        // Important to break potential infinite loops.
        if (view.time != newValue) {
            view.time = newValue
        }
    }
```

### Java

```java    
    @BindingAdapter("time")
    public static void setTime(MyView view, Time newValue) {
        // Important to break potential infinite loops.
        if (view.time != newValue) {
            view.time = newValue;
        }
    }
```

2.  Annotate the method that reads the value from the view using `@InverseBindingAdapter`:
    
### Kotlin

```kotlin    
    @InverseBindingAdapter("time")
    @JvmStatic fun getTime(view: MyView) : Time {
        return view.getTime()
    }
```

### Java

```java    
    @InverseBindingAdapter("time")
    public static Time getTime(MyView view) {
        return view.getTime();
    }
```

At this point, data binding knows what to do when the data changes (it calls the method annotated with `@BindingAdapter`) and what to call when the view attribute changes (it calls the `InverseBindingListener`). However, it doesn't know when or how the attribute changes.

For that, you need to set a listener on the view. It can be a custom listener associated with your custom view, or it can be a generic event, such as a loss of focus or a text change. Add the `@BindingAdapter` annotation to the method that sets the listener for changes on the property:

### Kotlin

```kotlin
@BindingAdapter("app:timeAttrChanged")
@JvmStatic fun setListeners(
        view: MyView,
        attrChange: InverseBindingListener
) {
    // Set a listener for click, focus, touch, etc.
}
```

### Java

```java
@BindingAdapter("app:timeAttrChanged")
public static void setListeners(
        MyView view, final InverseBindingListener attrChange) {
    // Set a listener for click, focus, touch, etc.
}
```

The listener includes an `InverseBindingListener` as a parameter. You use the `InverseBindingListener` to tell the data binding system that the attribute has changed. The system can then start calling the method annotated using `@InverseBindingAdapter`, and so on.

In practice, this listener includes some non-trivial logic, including listeners for one-way data binding. For an example, see the adapter for the text attribute change, `TextViewBindingAdapter`.

Converters
----------

If the variable that's bound to a `View` object needs to be formatted, translated, or changed somehow before being displayed, it's possible to use a `Converter` object.

For example, take an `EditText` object that shows a date:

```xml
    <EditText
        android:id="@+id/birth_date"
        android:text="@={Converter.dateToString(viewmodel.birthDate)}"
    />
```

The `viewmodel.birthDate` attribute contains a value of type `Long`, so it needs to be formatted by using a converter.

Because a two-way expression is being used, there also needs to be an _inverse converter_ to let the library know how to convert the user-provided string back to the backing data type, in this case `Long`. This process is done by adding the `@InverseMethod` annotation to one of the converters and have this annotation reference the inverse converter. An example of this configuration appears in the following code snippet:

### Kotlin

```kotlin
object Converter {
    @InverseMethod("stringToDate")
    @JvmStatic fun dateToString(
        view: EditText, oldValue: Long,
        value: Long
    ): String {
        // Converts long to String.
    }

    @JvmStatic fun stringToDate(
        view: EditText, oldValue: String,
        value: String
    ): Long {
        // Converts String to long.
    }
}
```

### Java

```java
public class Converter {
    @InverseMethod("stringToDate")
    public static String dateToString(EditText view, long oldValue,
            long value) {
        // Converts long to String.
    }

    public static long stringToDate(EditText view, String oldValue,
            String value) {
        // Converts String to long.
    }
}
```

Infinite loops using two-way data binding
-----------------------------------------

Be careful not to introduce infinite loops when using two-way data binding. When the user changes an attribute, the method annotated using `@InverseBindingAdapter` is called, and the value is assigned to the backing property. This, in turn, would call the method annotated using `@BindingAdapter`, which would trigger another call to the method annotated using `@InverseBindingAdapter`, and so on.

For this reason, it's important to break possible infinite loops by comparing new and old values in the methods annotated using `@BindingAdapter`.

Two-way attributes
------------------

The platform provides built-in support for two-way data binding when you use the attributes in the following table. For details on how the platform provides this support, see the implementations for the corresponding binding adapters: