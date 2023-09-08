# Binding adapters

Binding adapters are responsible for making the appropriate framework calls to set values. One example is setting a property value like calling the `setText()` method. Another example is setting an event listener like calling the `setOnClickListener()` method.

The Data Binding Library allows you to specify the method called to set a value, provide your own binding logic, and specify the type of the returned object by using adapters.

Setting attribute values
------------------------

Whenever a bound value changes, the generated binding class must call a setter method on the view with the binding expression. You can allow the Data Binding Library to automatically determine the method, explicitly declare the method, or provide custom logic to select a method.

### Automatic method selection

For an attribute named `example`, the library automatically tries to find the method `setExample(arg)` that accepts compatible types as the argument. The namespace of the attribute isn't considered, only the attribute name and type are used when searching for a method.

For example, given the `android:text="@{user.name}"` expression, the library looks for a `setText(arg)` method that accepts the type returned by `user.getName()`. If the return type of `user.getName()` is `String`, the library looks for a `setText()` method that accepts a `String` argument. If the expression returns an `int` instead, the library searches for a `setText()` method that accepts an `int` argument. The expression must return the correct type, you can cast the return value if necessary.

Data binding works even if no attribute exists with the given name. You can then create attributes for any setter by using data binding. For example, the support class `DrawerLayout` doesn't have any attributes, but plenty of setters. The following layout automatically uses the `setScrimColor(int)` and `setDrawerListener(DrawerListener)` methods as the setter for the `app:scrimColor` and `app:drawerListener` attributes, respectively:

```xml
    <android.support.v4.widget.DrawerLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:scrimColor="@{@color/scrim}"
        app:drawerListener="@{fragment.drawerListener}">
```

### Specify a custom method name

Some attributes have setters that don't match by name. In these situations, an attribute may be associated with the setter using the `BindingMethods` annotation. The annotation is used with a class and can contain multiple `BindingMethod` annotations, one for each renamed method. Binding methods are annotations that can be added to any class in your app. In the following example, the `android:tint` attribute is associated with the `setImageTintList(ColorStateList)` method, not with the `setTint()` method:

### Kotlin

```kotlin
@BindingMethods(value = [
    BindingMethod( type = android.widget.ImageView::class,
        attribute = "android:tint",
        method = "setImageTintList")])
```

### Java

```java
@BindingMethods({
       @BindingMethod(type = "android.widget.ImageView",
                      attribute = "android:tint",
                      method = "setImageTintList"),
})
```

Most of the time, you don't need to rename setters in Android framework classes. The attributes already have implemented using the name convention for to automatically find matching methods.

### Provide custom logic

Some attributes need custom binding logic. For example, there is no associated setter for the `android:paddingLeft` attribute. Instead, the `setPadding(left, top, right, bottom)` method is provided. A static binding adapter method with the `BindingAdapter` annotation allows you to customize how a setter for an attribute is called.

The attributes of the Android framework classes already have `BindingAdapter` annotations created. For example, the following example shows the binding adapter for the `paddingLeft` attribute:

### Kotlin

```kotlin
@BindingAdapter("android:paddingLeft")
fun setPaddingLeft(view: View, padding: Int) {
    view.setPadding(padding,
                view.getPaddingTop(),
                view.getPaddingRight(),
                view.getPaddingBottom())
}
```

### Java

```java
@BindingAdapter("android:paddingLeft")
public static void setPaddingLeft(View view, int padding) {
  view.setPadding(padding,
                  view.getPaddingTop(),
                  view.getPaddingRight(),
                  view.getPaddingBottom());
}
```

The parameter types are important. The first parameter determines the type of the view that is associated with the attribute. The second parameter determines the type accepted in the binding expression for the given attribute.

Binding adapters are useful for other types of customization. For example, a custom loader can be called from a worker thread to load an image.

The binding adapters that you define override the default adapters provided by the Android framework when there is a conflict.

You can also have adapters that receive multiple attributes, as shown in the following example:

### Kotlin

```kotlin
@BindingAdapter("imageUrl", "error")
fun loadImage(view: ImageView, url: String, error: Drawable) {
    Picasso.get().load(url).error(error).into(view)
}
```

### Java

```java
@BindingAdapter({"imageUrl", "error"})
public static void loadImage(ImageView view, String url, Drawable error) {
  Picasso.get().load(url).error(error).into(view);
}
```

You can use the adapter in your layout as shown in the following example. Note that `@drawable/venueError` refers to a resource in your app. Surrounding the resource with `@{}` makes it a valid binding expression.

```xml
    <ImageView app:imageUrl="@{venue.imageUrl}" app:error="@{@drawable/venueError}" />
```

The adapter is called if both `imageUrl` and `error` are used for an `ImageView` object and `imageUrl` is a string and `error` is a `Drawable`. If you want the adapter to be called when _any_ of the attributes is set, you can set the optional `requireAll`) flag of the adapter to `false`, as shown in the following example:

### Kotlin

```kotlin
@BindingAdapter(value = ["imageUrl", "placeholder"], requireAll = false)
fun setImageUrl(imageView: ImageView, url: String?, placeHolder: Drawable?) {
    if (url == null) {
        imageView.setImageDrawable(placeholder);
    } else {
        MyImageLoader.loadInto(imageView, url, placeholder);
    }
}
```

### Java

```java
@BindingAdapter(value={"imageUrl", "placeholder"}, requireAll=false)
public static void setImageUrl(ImageView imageView, String url, Drawable placeHolder) {
  if (url == null) {
    imageView.setImageDrawable(placeholder);
  } else {
    MyImageLoader.loadInto(imageView, url, placeholder);
  }
}
```

Binding adapter methods may optionally take the old values in their handlers. A method taking old and new values should declare _all_ old values for the attributes first, followed by the new values, as shown in the example below:

### Kotlin

```kotlin
@BindingAdapter("android:paddingLeft")
fun setPaddingLeft(view: View, oldPadding: Int, newPadding: Int) {
    if (oldPadding != newPadding) {
        view.setPadding(newPadding,
                    view.getPaddingTop(),
                    view.getPaddingRight(),
                    view.getPaddingBottom())
    }
}
```

### Java

```java
@BindingAdapter("android:paddingLeft")
public static void setPaddingLeft(View view, int oldPadding, int newPadding) {
  if (oldPadding != newPadding) {
      view.setPadding(newPadding,
                      view.getPaddingTop(),
                      view.getPaddingRight(),
                      view.getPaddingBottom());
   }
}
```

Event handlers may only be used with interfaces or abstract classes with one abstract method, as shown in the following example:

### Kotlin

```kotlin
@BindingAdapter("android:onLayoutChange")
fun setOnLayoutChangeListener(
        view: View,
        oldValue: View.OnLayoutChangeListener?,
        newValue: View.OnLayoutChangeListener?
) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
        if (oldValue != null) {
            view.removeOnLayoutChangeListener(oldValue)
        }
        if (newValue != null) {
            view.addOnLayoutChangeListener(newValue)
        }
    }
}
```

### Java

```java
@BindingAdapter("android:onLayoutChange")
public static void setOnLayoutChangeListener(View view, View.OnLayoutChangeListener oldValue,
       View.OnLayoutChangeListener newValue) {
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
    if (oldValue != null) {
      view.removeOnLayoutChangeListener(oldValue);
    }
    if (newValue != null) {
      view.addOnLayoutChangeListener(newValue);
    }
  }
}
```

Use this event handler in your layout as follows:

```xml
    <View android:onLayoutChange="@{() -> handler.layoutChanged()}"/>
```

When a listener has multiple methods, it must be split into multiple listeners. For example, `View.OnAttachStateChangeListener` has two methods: `onViewAttachedToWindow(View)` and `onViewDetachedFromWindow(View)`. The library provides two interfaces to differentiate the attributes and handlers for them:

### Kotlin

```kotlin
// Translation from provided interfaces in Java:
@TargetApi(Build.VERSION_CODES.HONEYCOMB_MR1)
interface OnViewDetachedFromWindow {
    fun onViewDetachedFromWindow(v: View)
}

@TargetApi(Build.VERSION_CODES.HONEYCOMB_MR1)
interface OnViewAttachedToWindow {
    fun onViewAttachedToWindow(v: View)
}
```

### Java

```java
@TargetApi(VERSION_CODES.HONEYCOMB_MR1)
public interface OnViewDetachedFromWindow {
  void onViewDetachedFromWindow(View v);
}

@TargetApi(VERSION_CODES.HONEYCOMB_MR1)
public interface OnViewAttachedToWindow {
  void onViewAttachedToWindow(View v);
}
```

Because changing one listener can also affect the other, you need an adapter that works for either attribute or for both. You can set `requireAll`) to `false` in the annotation to specify that not every attribute must be assigned a binding expression, as shown in the following example:

### Kotlin

```kotlin
@BindingAdapter(
        "android:onViewDetachedFromWindow",
        "android:onViewAttachedToWindow",
        requireAll = false
)
fun setListener(view: View, detach: OnViewDetachedFromWindow?, attach: OnViewAttachedToWindow?) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR1) {
        val newListener: View.OnAttachStateChangeListener?
        newListener = if (detach == null && attach == null) {
            null
        } else {
            object : View.OnAttachStateChangeListener {
                override fun onViewAttachedToWindow(v: View) {
                    attach.onViewAttachedToWindow(v)
                }

                override fun onViewDetachedFromWindow(v: View) {
                    detach.onViewDetachedFromWindow(v)
                }
            }
        }

        val oldListener: View.OnAttachStateChangeListener? =
                ListenerUtil.trackListener(view, newListener, R.id.onAttachStateChangeListener)
        if (oldListener != null) {
            view.removeOnAttachStateChangeListener(oldListener)
        }
        if (newListener != null) {
            view.addOnAttachStateChangeListener(newListener)
        }
    }
}
```

### Java

```java
@BindingAdapter({"android:onViewDetachedFromWindow", "android:onViewAttachedToWindow"}, requireAll=false)
public static void setListener(View view, OnViewDetachedFromWindow detach, OnViewAttachedToWindow attach) {
    if (VERSION.SDK_INT >= VERSION_CODES.HONEYCOMB_MR1) {
        OnAttachStateChangeListener newListener;
        if (detach == null && attach == null) {
            newListener = null;
        } else {
            newListener = new OnAttachStateChangeListener() {
                @Override
                public void onViewAttachedToWindow(View v) {
                    if (attach != null) {
                        attach.onViewAttachedToWindow(v);
                    }
                }
                @Override
                public void onViewDetachedFromWindow(View v) {
                    if (detach != null) {
                        detach.onViewDetachedFromWindow(v);
                    }
                }
            };
        }

        OnAttachStateChangeListener oldListener = ListenerUtil.trackListener(view, newListener,
                R.id.onAttachStateChangeListener);
        if (oldListener != null) {
            view.removeOnAttachStateChangeListener(oldListener);
        }
        if (newListener != null) {
            view.addOnAttachStateChangeListener(newListener);
        }
    }
}
```

The above example is slightly more complicated than normal because the `View` class uses the `addOnAttachStateChangeListener()` and `removeOnAttachStateChangeListener()` methods instead of a setter method for `OnAttachStateChangeListener`. The `android.databinding.adapters.ListenerUtil` class helps keep track of the previous listeners so that they may be removed in the binding adapter.

By annotating the interfaces `OnViewDetachedFromWindow` and `OnViewAttachedToWindow` with `@TargetApi(VERSION_CODES.HONEYCOMB_MR1)`, the data binding code generator knows that the listener should only be generated when running on Android 3.1 (API level 12) and higher, the same version supported by the `addOnAttachStateChangeListener()` method.

Object conversions
------------------

### Automatic object conversion

When an `Object` is returned from a binding expression, the library chooses the method used to set the value of the property. The `Object` is cast to a parameter type of the chosen method. This behavior is convenient in apps using the `ObservableMap` class to store data, as shown in the following example:

```xml
    <TextView
       android:text='@{userMap["lastName"]}'
       android:layout_width="wrap_content"
       android:layout_height="wrap_content" />
    
```

The `userMap` object in the expression returns a value, which is automatically cast to the parameter type found in the `setText(CharSequence)` method used to set the value of the `android:text` attribute. If the parameter type is ambiguous, you must cast the return type in the expression.

### Custom conversions

In some situations, a custom conversion is required between specific types. For example, the `android:background` attribute of a view expects a `Drawable`, but the `color` value specified is an integer. The following example shows an attribute that expects a `Drawable`, but an integer is provided instead:

```xml
    <View
       android:background="@{isError ? @color/red : @color/white}"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"/>
```

Whenever a `Drawable` is expected and an integer is returned, the `int` should be converted to a `ColorDrawable`. The conversion can be done using a static method with a `BindingConversion` annotation, as follows:

### Kotlin

```kotlin
@BindingConversion
fun convertColorToDrawable(color: Int) = ColorDrawable(color)
```

### Java

```java
@BindingConversion
public static ColorDrawable convertColorToDrawable(int color) {
    return new ColorDrawable(color);
}
```

However, the value types provided in the binding expression must be consistent. You cannot use different types in the same expression, as shown in the following example:

```xml
    <View
       android:background="@{isError ? @drawable/error : @color/white}"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"/>
```