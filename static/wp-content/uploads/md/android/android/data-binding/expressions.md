# Layouts and binding expressions

The expression language allows you to write expressions that handle events dispatched by the views. The Data Binding Library automatically generates the classes required to bind the views in the layout with your data objects.

Data binding layout files are slightly different and start with a root tag of `layout` followed by a `data` element and a `view` root element. This view element is what your root would be in a non-binding layout file. The following code shows a sample layout file:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android">
       <data>
           <variable name="user" type="com.example.User"/>
       </data>
       <LinearLayout
           android:orientation="vertical"
           android:layout_width="match_parent"
           android:layout_height="match_parent">
           <TextView android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:text="@{user.firstName}"/>
           <TextView android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:text="@{user.lastName}"/>
       </LinearLayout>
    </layout>
```

The `user` variable within `data` describes a property that may be used within this layout.

```xml
    <variable name="user" type="com.example.User" />
```

Expressions within the layout are written in the attribute properties using the "`@{}`" syntax. Here, the `TextView` text is set to the `firstName` property of the `user` variable:

```xml
    <TextView android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="@{user.firstName}" />
```

Data object
-----------

Let's assume for now that you have a plain-old object to describe the `User` entity:

### Kotlin

```kotlin
data class User(val firstName: String, val lastName: String)
```

### Java

```java
public class User {
  public final String firstName;
  public final String lastName;
  public User(String firstName, String lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
}
```

This type of object has data that never changes. It is common in applications to have data that is read once and never changes thereafter. It is also possible to use an object that follows a set of conventions, such as the usage of accessor methods in Java, as shown in the following example:

### Kotlin

```kotlin
// Not applicable in Kotlin.
data class User(val firstName: String, val lastName: String)
```

### Java

```java
public class User {
  private final String firstName;
  private final String lastName;
  public User(String firstName, String lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
  public String getFirstName() {
      return this.firstName;
  }
  public String getLastName() {
      return this.lastName;
  }
}
```

From the perspective of data binding, these two classes are equivalent. The expression `@{user.firstName}` used for the `android:text` attribute accesses the `firstName` field in the former class and the `getFirstName()` method in the latter class. Alternatively, it is also resolved to `firstName()` if that method exists.

Binding data
------------

A binding class is generated for each layout file. By default, the name of the class is based on the name of the layout file, converting it to Pascal case and adding the _Binding_ suffix to it. The above layout filename is `activity_main.xml` so the corresponding generated class is `ActivityMainBinding`. This class holds all the bindings from the layout properties (for example, the `user` variable) to the layout's views and knows how to assign values for the binding expressions.The recommended method to create the bindings is to do it while inflating the layout, as shown in the following example:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val binding: ActivityMainBinding = DataBindingUtil.setContentView(
            this, R.layout.activity_main)

    binding.user = User("Test", "User")
}
```

### Java

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
   User user = new User("Test", "User");
   binding.setUser(user);
}
```

At runtime, the app displays the **Test** user in the UI. Alternatively, you can get the view using a `LayoutInflater`, as shown in the following example:

### Kotlin

```kotlin
val binding: ActivityMainBinding = ActivityMainBinding.inflate(getLayoutInflater())
```

### Java

```java
ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
```

If you are using data binding items inside a `Fragment`, `ListView`, or `RecyclerView` adapter, you may prefer to use the `inflate()`) methods of the bindings classes or the `DataBindingUtil` class, as shown in the following code example:

### Kotlin

```kotlin
val listItemBinding = ListItemBinding.inflate(layoutInflater, viewGroup, false)
// or
val listItemBinding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false)
```

### Java

```java
ListItemBinding binding = ListItemBinding.inflate(layoutInflater, viewGroup, false);
// or
ListItemBinding binding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false);
```

Expression language
-------------------

### Common features

The expression language looks a lot like expressions found in managed code. You can use the following operators and keywords in the expression language:

*   Mathematical `+ - / * %`
*   String concatenation `+`
*   Logical `&& ||`
*   Binary `& | ^`
*   Unary `+ - ! ~`
*   Shift `>> >>> <<`
*   Comparison `== > < >= <=` (Note that `<` needs to be escaped as `&lt;`)
*   `instanceof`
*   Grouping `()`
*   Literals - character, String, numeric, `null`
*   Cast
*   Method calls
*   Field access
*   Array access `[]`
*   Ternary operator `?:`

Examples:

```xml
    android:text="@{String.valueOf(index + 1)}"
    android:visibility="@{age > 13 ? View.GONE : View.VISIBLE}"
    android:transitionName='@{"image_" + id}'
```

### Missing operations

The following operations are missing from the expression syntax that you can use in managed code:

*   `this`
*   `super`
*   `new`
*   Explicit generic invocation

### Null coalescing operator

The null coalescing operator (`??`) chooses the left operand if it isn't `null` or the right if the former is `null`.

```xml
    android:text="@{user.displayName ?? user.lastName}"
    
```

This is functionally equivalent to:

```xml
    android:text="@{user.displayName != null ? user.displayName : user.lastName}"
```

### Property references

An expression can reference a property in a class by using the following format, which is the same for fields, getters, and `ObservableField` objects:

```xml
    android:text="@{user.lastName}"
```

### Avoiding null pointer exceptions

Generated data binding code automatically checks for `null` values and avoid null pointer exceptions. For example, in the expression `@{user.name}`, if `user` is null, `user.name` is assigned its default value of `null`. If you reference `user.age`, where age is of type `int`, then data binding uses the default value of `0`.

### View references

An expression can reference other views in the layout by ID with the following syntax:

```xml
    android:text="@{exampleText.text}"
```

In the following example, the `TextView` view references an `EditText` view in the same layout:

```xml
    <EditText
        android:id="@+id/example_text"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"/>
    <TextView
        android:id="@+id/example_output"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@{exampleText.text}"/>
```

### Collections

Common collections, such as arrays, lists, sparse lists, and maps, can be accessed using the `[]` operator for convenience.

```xml
    <data>
        <import type="android.util.SparseArray"/>
        <import type="java.util.Map"/>
        <import type="java.util.List"/>
        <variable name="list" type="List&lt;String>"/>
        <variable name="sparse" type="SparseArray&lt;String>"/>
        <variable name="map" type="Map&lt;String, String>"/>
        <variable name="index" type="int"/>
        <variable name="key" type="String"/>
    </data>
    …
    android:text="@{list[index]}"
    …
    android:text="@{sparse[index]}"
    …
    android:text="@{map[key]}"
```

You can also refer to a value in the map using the `object.key` notation. For example, `@{map[key]}` in the example above can be replaced with `@{map.key}`.

### String literals

You can use single quotes to surround the attribute value, which allows you to use double quotes in the expression, as shown in the following example:

```xml
    android:text='@{map["firstName"]}'
```

It is also possible to use double quotes to surround the attribute value. When doing so, string literals should be surrounded with back quotes `` ` ``:

```xml
    android:text="@{map[`firstName`]}"
```

### Resources

An expression can reference app resources with the following syntax:

```xml
    android:padding="@{large? @dimen/largePadding : @dimen/smallPadding}"
```

You can evaluate format strings and plurals by providing parameters:

```xml
    android:text="@{@string/nameFormat(firstName, lastName)}"
    android:text="@{@plurals/banana(bananaCount)}"
```

You can pass property references and view references as resource parameters:

```xml
    android:text="@{@string/example_resource(user.lastName, exampleText.text)}"
```

When a plural takes multiple parameters, you must pass all parameters:

```xml 
      Have an orange
      Have %d oranges
    
    android:text="@{@plurals/orange(orangeCount, orangeCount)}"
```

Some resources require explicit type evaluation, as shown in the following table:

Type

Normal reference

Expression reference

String[]

@array

@stringArray

int[]

@array

@intArray

TypedArray

@array

@typedArray

Animator

@animator

@animator

StateListAnimator

@animator

@stateListAnimator

color int

@color

@color

ColorStateList

@color

@colorStateList

Event handling
--------------

Data binding allows you to write expression handling events that are dispatched from the views (for example, the `onClick()` method). Event attribute names are determined by the name of the listener method with a few exceptions. For example, `View.OnClickListener` has a method `onClick()`, so the attribute for this event is `android:onClick`.

There are some specialized event handlers for the click event that need an attribute other than `android:onClick` to avoid a conflict. You can use the following attributes to avoid these type of conflicts:

You can use the following mechanisms to handle an event:

*   Method references: In your expressions, you can reference methods that conform to the signature of the listener method. When an expression evaluates to a method reference, Data binding wraps the method reference and owner object in a listener, and sets that listener on the target view. If the expression evaluates to `null`, Data binding doesn't create a listener and sets a `null` listener instead.
*   Listener bindings: These are lambda expressions that are evaluated when the event happens. Data binding always creates a listener, which it sets on the view. When the event is dispatched, the listener evaluates the lambda expression.

### Method references

Events can be bound to handler methods directly, similar to the way `android:onClick` can be assigned to a method in an activity. One major advantage compared to the `View` `onClick` attribute is that the expression is processed at compile time, so if the method doesn't exist or its signature is incorrect, you receive a compile time error.

The major difference between method references and listener bindings is that the actual listener implementation is created when the data is bound, not when the event is triggered. If you prefer to evaluate the expression when the event happens, you should use listener binding.

To assign an event to its handler, use a normal binding expression, with the value being the method name to call. For example, consider the following example layout data object:

### Kotlin

```kotlin
class MyHandlers {
    fun onClickFriend(view: View) { ... }
}
```

### Java

```java
public class MyHandlers {
    public void onClickFriend(View view) { ... }
}
```

The binding expression can assign the click listener for a view to the `onClickFriend()` method, as follows:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android">
       <data>
           <variable name="handlers" type="com.example.MyHandlers"/>
           <variable name="user" type="com.example.User"/>
       </data>
       <LinearLayout
           android:orientation="vertical"
           android:layout_width="match_parent"
           android:layout_height="match_parent">
           <TextView android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:text="@{user.firstName}"
               android:onClick="@{handlers::onClickFriend}"/>
       </LinearLayout>
    </layout>
```

### Listener bindings

Listener bindings are binding expressions that run when an event happens. They are similar to method references, but they let you run arbitrary data binding expressions. This feature is available with Android Gradle Plugin for Gradle version 2.0 and later.

In method references, the parameters of the method must match the parameters of the event listener. In listener bindings, only your return value must match the expected return value of the listener (unless it is expecting void). For example, consider the following presenter class that has the `onSaveClick()` method:

### Kotlin

```kotlin
class Presenter {
    fun onSaveClick(task: Task){}
}
```

### Java

```java
public class Presenter {
    public void onSaveClick(Task task){}
}
```

Then you can bind the click event to the `onSaveClick()` method, as follows:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android">
        <data>
            <variable name="task" type="com.android.example.Task" />
            <variable name="presenter" type="com.android.example.Presenter" />
        </data>
        <LinearLayout android:layout_width="match_parent" android:layout_height="match_parent">
            <Button android:layout_width="wrap_content" android:layout_height="wrap_content"
            android:onClick="@{() -> presenter.onSaveClick(task)}" />
        </LinearLayout>
    </layout>
```

When a callback is used in an expression, data binding automatically creates the necessary listener and registers it for the event. When the view fires the event, data binding evaluates the given expression. As in regular binding expressions, you still get null and thread safety of data binding while these listener expressions are being evaluated.

In the example above, we haven't defined the `view` parameter that is passed to `onClick(View)`. Listener bindings provide two choices for listener parameters: you can either ignore all parameters to the method or name all of them. If you prefer to name the parameters, you can use them in your expression. For example, the expression above could be written as follows:

```xml
    android:onClick="@{(view) -> presenter.onSaveClick(task)}"
```

Or if you want to use the parameter in the expression, it could work as follows:

### Kotlin

```kotlin
class Presenter {
    fun onSaveClick(view: View, task: Task){}
}
```

### Java

```java
public class Presenter {
    public void onSaveClick(View view, Task task){}
}
```

```xml

    android:onClick="@{(theView) -> presenter.onSaveClick(theView, task)}"
```

You can use a lambda expression with more than one parameter:

### Kotlin

```kotlin
class Presenter {
    fun onCompletedChanged(task: Task, completed: Boolean){}
}
```

### Java

```java
public class Presenter {
    public void onCompletedChanged(Task task, boolean completed){}
}

```

```xml
    <CheckBox android:layout_width="wrap_content" android:layout_height="wrap_content"
          android:onCheckedChanged="@{(cb, isChecked) -> presenter.completeChanged(task, isChecked)}" />
```

If the event you are listening to returns a value whose type isn't `void`, your expressions must return the same type of value as well. For example, if you want to listen for the long click event, your expression should return a boolean.

### Kotlin

```kotlin
class Presenter {
    fun onLongClick(view: View, task: Task): Boolean { }
}
```

### Java

```java
public class Presenter {
    public boolean onLongClick(View view, Task task) { }
}
```

```xml

    android:onLongClick="@{(theView) -> presenter.onLongClick(theView, task)}"
```

If the expression cannot be evaluated due to `null` objects, data binding returns the default value for that type. For example, `null` for reference types, `0` for `int`, `false` for `boolean`, etc.

If you need to use an expression with a predicate (for example, ternary), you can use `void` as a symbol.

```xml
    android:onClick="@{(v) -> v.isVisible() ? doSomething() : void}"
```

#### Avoid complex listeners

Listener expressions are very powerful and can make your code very easy to read. On the other hand, listeners containing complex expressions make your layouts hard to read and maintain. These expressions should be as simple as passing available data from your UI to your callback method. You should implement any business logic inside the callback method that you invoked from the listener expression.

Imports, variables, and includes
--------------------------------

The Data Binding Library provides features such as imports, variables, and includes. Imports make easy to reference classes inside your layout files. Variables allow you to describe a property that can be used in binding expressions. Includes let you reuse complex layouts across your app.

### Imports

Imports allow you to easily reference classes inside your layout file, just like in managed code. Zero or more `import` elements may be used inside the `data` element. The following code example imports the `View` class to the layout file:

```xml
    <data>
        <import type="android.view.View"/>
    </data>
```

Importing the `View` class allows you to reference it from your binding expressions. The following example shows how to reference the `VISIBLE` and `GONE` constants of the `View` class:

```xml
    <TextView
       android:text="@{user.lastName}"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:visibility="@{user.isAdult ? View.VISIBLE : View.GONE}"/>
```

#### Type aliases

When there are class name conflicts, one of the classes may be renamed to an alias. The following example renames the `View` class in the `com.example.real.estate` package to `Vista`:

```xml
    <import type="android.view.View"/>
    <import type="com.example.real.estate.View"
            alias="Vista"/>
```

You can use `Vista` to reference the `com.example.real.estate.View` and `View` may be used to reference `android.view.View` within the layout file.

#### Import other classes

Imported types can be used as type references in variables and expressions. The following example shows `User` and `List` used as the type of a variable:

```xml
    <data>
        <import type="com.example.User"/>
        <import type="java.util.List"/>
        <variable name="user" type="User"/>
        <variable name="userList" type="List&lt;User>"/>
    </data>
```

You can also use the imported types to cast part of an expression. The following example casts the `connection` property to a type of `User`:

```xml
    <TextView
       android:text="@{((User)(user.connection)).lastName}"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"/>
```

Imported types may also be used when referencing static fields and methods in expressions. The following code imports the `MyStringUtils` class and references its `capitalize` method:

```xml
    <data>
        <import type="com.example.MyStringUtils"/>
        <variable name="user" type="com.example.User"/>
    </data>
    …
    <TextView
       android:text="@{MyStringUtils.capitalize(user.lastName)}"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"/>
```

Just as in managed code, `java.lang.*` is imported automatically.

### Variables

You can use multiple `variable` elements inside the `data` element. Each `variable` element describes a property that may be set on the layout to be used in binding expressions within the layout file. The following example declares the `user`, `image`, and `note` variables:

```xml
    <data>
        <import type="android.graphics.drawable.Drawable"/>
        <variable name="user" type="com.example.User"/>
        <variable name="image" type="Drawable"/>
        <variable name="note" type="String"/>
    </data>
```

The variable types are inspected at compile time, so if a variable implements `Observable` or is an observable collection, that should be reflected in the type. If the variable is a base class or interface that doesn't implement the `Observable` interface, the variables _are not_ observed.

When there are different layout files for various configurations (for example, landscape or portrait), the variables are combined. There must not be conflicting variable definitions between these layout files.

The generated binding class has a setter and getter for each of the described variables. The variables take the default managed code values until the setter is called—`null` for reference types, `0` for `int`, `false` for `boolean`, etc.

A special variable named `context` is generated for use in binding expressions as needed. The value for `context` is the `Context` object from the root View's `getContext()` method. The `context` variable is overridden by an explicit variable declaration with that name.

### Includes

Variables may be passed into an included layout's binding from the containing layout by using the app namespace and the variable name in an attribute. The following example shows included `user` variables from the `name.xml` and `contact.xml` layout files:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:bind="http://schemas.android.com/apk/res-auto">
       <data>
           <variable name="user" type="com.example.User"/>
       </data>
       <LinearLayout
           android:orientation="vertical"
           android:layout_width="match_parent"
           android:layout_height="match_parent">
           <include layout="@layout/name"
               bind:user="@{user}"/>
           <include layout="@layout/contact"
               bind:user="@{user}"/>
       </LinearLayout>
    </layout>
```

Data binding doesn't support include as a direct child of a merge element. For example, _the following layout isn't supported:_

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:bind="http://schemas.android.com/apk/res-auto">
       <data>
           <variable name="user" type="com.example.User"/>
       </data>
       <merge><!-- Doesn't work -->
           <include layout="@layout/name"
               bind:user="@{user}"/>
           <include layout="@layout/contact"
               bind:user="@{user}"/>
       </merge>
    </layout>
```