# Dagger2 Beginners Tutorial and Examples



> _Android Dagger2 Framework Tutorial and Examples_


### What is Dagger2?

Dagger2 is a static compile-time [dependency injection](http://en.wikipedia.org/wiki/Dependency_injection) Framework for Java,Kotlin and Android.

It should actually be Dagger, Dagger2 simply implies the second version which was a complete re-write of the DI framework. The [earlier version](https://github.com/square/dagger) was created by [Square](http://square.github.io/). Dagger2 is now maintained by Google.

Currently it's one of the most popular Dependency Injection Frameworks and there are a bunch of tutorials and frameworks all over the internet.

However in this guide we will look at several examples starting from beginner level and slowly building to intermediate ones. To view the examples scroll down to the examples section.

### Dagger2 Best Practices

Here are some best practices recommended in the [Android Documentation](https://developer.android.com/training/dependency-injection/dagger-android) regarding Dagger2

- Use constructor injection with `@Inject` to add types to the Dagger graph whenever it's possible. When it's not:
    - Use `@Binds` to tell Dagger which implementation an interface should have.
    - Use `@Provides` to tell Dagger how to provide classes that your project doesn't own.
- You should only declare modules once in a component.
- Name the scope annotations depending on the lifetime where the annotation is used. Examples include `@ApplicationScope`, `@LoggedUserScope`, and `@ActivityScope`.

## Dagger2 Examples.

There are two examples: one in Java then one in Kotlin.

## 1\. Hello World Dagger2 Example with SharedPreferences.

In this tutorial we want to introduce Dagger2 practically with a real world project. We will use the SharedPreferences to:

1. Save Data From Edittext to SharedPreferences.
2. Retrieve Data From SharedPreferences onto an EditText.

Our user interface comprises two edittexts where the user enters a username and his number and then clicks the save button. Then we get the value when the user clicks a get button. We rebind the value in the edittext.

Let's start.

Here's the demo:

![Android Dagger2 Example](https://camposha.info/android-dagger2/demo1.gif)


##### (a). Build.gradle

We start by proceeding to our app level build.gradle and adding our dependencies. Dagger2 is a third party library maintained by Google. We have to fetch it from internet so we start by adding it's dependency via Gradle.

1. Once you've created your android application in android studio, navigate over to the build.gradle located in the app folder and move to the dependencies DSL.
2. Replace them with the following code. You can replace the versions with the latest versions.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation 'com.google.dagger:dagger:2.16'
    annotationProcessor 'com.google.dagger:dagger-compiler:2.16'
}
```

Here are the dependencies we've added:

1. appcompat- A support library which will give us access to the AppCompatActivity class.
2. constraint-layout - To give us the constraint layout.
3. dagger2 - Our third party dependency injection framework. We also add our annotationProcessor. Remember Dagger2 is annotation based framework and we will be using several annotations to annotate our classes, interfaces, methods and fields.

##### (b). activity_main.xml

Next we come to `activity_main.xml`. This layout typically gets inflated into the MainActivity. In this layout we will construct our user interface using several elements all which are indirect or direct subclasses of the View class.

They include

1. [LinearLayout](https://camposha.info/android/linearlayout)\- This will allow us arrange items linearly. In this case it is our container layout and we arrange it's children vertically.
2. TextView - Just to display our header.
3. ImageView - To render our dummy image.
4. EditText - To provide an interface for users to type data to be saved into our SharedPreferences.
5. Button - When clicked we will either save to SharedPreferences or retrieve from them.

Here's the full code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_background="#009688"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers App"
        android_textAlignment="center"
        android_fontFamily="casual"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/white" />

    <ImageView
        android_layout_width="match_parent"
        android_layout_height="300dp"
        android_layout_centerHorizontal="true"
        android_src="@drawable/logo"
        android_contentDescription="@string/app_name"/>

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

    <EditText
        android_id="@+id/usernameTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_margin="8dp"
        android_textColor="@color/white"
        android_hint="Username"
        />

    <EditText
        android_id="@+id/numberTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_below="@+id/usernameTxt"
        android_layout_margin="8dp"
        android_inputType="number"
        android_textColor="@color/white"
        android_hint="Number"
        />

    <Button
        android_id="@+id/saveBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="SAVE"
        android_layout_below="@+id/numberTxt"
        android_layout_toLeftOf="@+id/getBtn"
        android_layout_toStartOf="@+id/getBtn"
        android_layout_marginRight="8dp"
        android_layout_marginEnd="8dp"
        />

    <Button
        android_id="@+id/getBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="GET"
        android_layout_below="@+id/numberTxt"
        android_layout_alignRight="@+id/numberTxt"
        android_layout_alignEnd="@+id/numberTxt"
        />
    </RelativeLayout>

</LinearLayout>
```

##### (d). SharedPrefModule.java

This is our module class. Dagger2 has two main concepts, a module and a component. Basicly the module represents our dependencies while component represents a mapping between the module and it's client/dependent object.

So we come create a module class here. But first we have to start by importing several objects:

1. Context - required by our SharedPreferences class.
2. `SharedPreferences` - We will return it's instance as a dependency to the dependant.
3. `PreferenceManager` - Will provide us our SharedPreference object.
4. `Singleton` - will mark our object as a singleton. A singleton is a shared object. You can have one instance of a singleton object in memory.
5. `Module` - will mark our `SharedPrefModule` class a module.
6. `Provides` - Will mark our provider methods.

Here are the methods we create:

1. `SharedPrefModule(Context context)` : Our constructor. Will take a Context object and assign it to a local instance field.
2. `provideContext()` - a method that wil return us a `Context` object if needed as a dependency.
3. `provideSharedPreferences()` - a method that will return us a SharedPreferences object as a dependency to the dependant.

Here's the full code. Take not that we mark our methods with `Singleton` and `Provides` annotations.

```java
package info.camposha.mrdagger;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;

/**
 * Let's create our module. This will be mapped to our activity by the Component.
 * We will pass it a Context object via the constructor. Then it will provide that
 * Context as well as the SharedPreferences as our dependencies.
 */
@Module
public class SharedPrefModule {
    private Context context;

    public SharedPrefModule(Context context) {
        this.context = context;
    }

    @Singleton
    @Provides
    public Context provideContext() {
        return context;
    }

    @Singleton
    @Provides
    public SharedPreferences provideSharedPreferences(Context context) {
        return PreferenceManager.getDefaultSharedPreferences(context);
    }
}
```

##### (d). MyComponent.java

This is our Dagger Component interface. A Component is a class that provides the mapping between a `Module` and a Dependent object. In this case will be mapping our `SharedPrefModule` to our `MainActivity`. So `MainActivity` is the dependnat object. It depends on the `Module` which is the `SharedPrefModule`. From it can get two methods injected into it as dependencies. Those are methods marked with `@Provides` annotation.

Here are some of our imports:

1. `Component` - This is an annotation that will mark our interface as a daggger component.

Here are the annotations used:

1. `@Singleton` - To mark our interface implementation object as a singleton. Only a single instance of that object can exist in memory.
2. `@Component` - To mark our interface as a component. We provide it our modules/module. In this case we have only a single module. Suppose we had many we would have separated them with commas.

Here are our methods:

1. `void inject(..)` - Will receive our dependant and map it to our module.

Here's the full code:

```java
package info.camposha.mrdagger;

import javax.inject.Singleton;
import dagger.Component;

/**
 * Create our DaggerComponent. It is a singleton.
 * It will map our dependency which is our module to our dependent which is the
 * <code>MainActivity</code>.
 */
@Singleton
@Component(modules = {SharedPrefModule.class})
public interface MyComponent {
    void inject(MainActivity activity);
}
```

##### (e). MainActivity.java

This is our MainActivity class. This will be our launcher activity. It is registered on the android manifest as it is an android component. Here are the things we will do here:

1. Set our contentview for this activity.
2. Initialize widgets like `Buttons` and `Edittexts`.
3. Get data from edittext and insert them into shared preference.
4. Retrieve data from sharedpreferences and bind them to edittexts.
5. Initialize our DaggerComponent and pass it this activity's instance.

[notice] Rebuild you project so that Dagger2 can generate us the `DaggerMyComponent` class. [/notice]

That `DaggerMyComponent` is our `MyComponent` implementation. We will build it and pass it our module. Then we also inject into it our dependant.

**Building The Component**

Here's the method responsible for that:

```java
    private void initializeDaggerComponent(){
        myComponent = DaggerMyComponent
                .builder()
                .sharedPrefModule(new SharedPrefModule(this))
                .build();
        myComponent.inject(this);
    }
```

**How to save to SharedPreferences**

Here's the method for that

```java
    private void saveToSharedPreference(){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("username", usernameTxt.getText().toString().trim());
        editor.putString("number", numberTxt.getText().toString().trim());
        editor.apply();
    }
```

```java
package info.camposha.mrdagger;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import javax.inject.Inject;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    EditText usernameTxt, numberTxt;
    Button saveBtn, getBtn;
    private MyComponent myComponent;
    @Inject
    SharedPreferences sharedPreferences;

    /**
     * Initialize DaggerComponent and inject it our activity
     */
    private void initializeDaggerComponent(){
        myComponent = DaggerMyComponent
                .builder()
                .sharedPrefModule(new SharedPrefModule(this))
                .build();
        myComponent.inject(this);
    }

    /**
     * Initialize Buttons and EditTexts
     */
    private void initializeViews() {
        getBtn      = findViewById(R.id.getBtn);
        saveBtn     = findViewById(R.id.saveBtn);
        usernameTxt  = findViewById(R.id.usernameTxt);
        numberTxt    = findViewById(R.id.numberTxt);

        saveBtn.setOnClickListener(this);
        getBtn.setOnClickListener(this);
    }

    /**
     * Save to shared preference.
     * <code>SharedPreferences.Editor</code> is an interface used for modifying values in a
     * SharedPreferences object.
     * It's putString() will Set a String value in the preferences editor, to be
     * written back once commit() or apply() are called.
     */
    private void saveToSharedPreference(){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("username", usernameTxt.getText().toString().trim());
        editor.putString("number", numberTxt.getText().toString().trim());
        editor.apply();
    }

    /**
     * Retrieve From SharedPreferences and Bind to EditText
     */
    private void retrieveFromSharedPreferences(){
        usernameTxt.setText(sharedPreferences.getString("username", "Default"));
        numberTxt.setText(sharedPreferences.getString("number", "12345"));
    }

    /**
     * When the buttons are clicked
     * @param view
     */
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.getBtn:
                retrieveFromSharedPreferences();
                break;
            case R.id.saveBtn:
                saveToSharedPreference();
                break;
        }

    }
    /**
     * Our onCreate method
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeViews();
        initializeDaggerComponent();
    }
}
```

## Example 2: Kotlin Android Dagger2 Example

Here's another dead simple Dagger2 example written in Kotlin.

### Step 1: Install Dagger2

Start by installing Dagger2 in your `build.gradle`, by specifying the dependency statement as follows:

```groovy
    implementation 'com.google.dagger:dagger:2.24'
    kapt 'com.google.dagger:dagger-compiler:2.24'
```

At the top of the `app/build.gradle` do not forget to apply the `kapt` plugin:

```groovy
apply plugin: 'kotlin-kapt'
```

### Step 2: Design Layout

Add a TextView to your main XML layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.elyeproj.simplestappwithdagger2.MainActivity">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="48sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

### Step 3: Write Code

Go to your main activity and add imports as follows. You may use AndroidX:

```kotlin
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import dagger.Component
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject
```

Create a Component known as `MagicBox` as an interface:

```kotlin
@Component
interface MagicBox {
    fun poke(app: MainActivity)
}
```

Then a class called info.Annotate the constructor with the `@Inject` property:

```kotlin
class Info @Inject constructor() {
    val text = "Hello Dagger 2"
}
```

Then use them as follows in the `MainActivity`:

```kotlin
class MainActivity : AppCompatActivity() {

    @Inject lateinit var info: Info

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        DaggerMagicBox.create().poke(this)
        text_view.text = info.text
    }
}
```

Here is the full code

**MainActivity.kt**

```kotlin
package com.elyeproj.simplestappwithdagger2

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import dagger.Component
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject

class MainActivity : AppCompatActivity() {

    @Inject lateinit var info: Info

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        DaggerMagicBox.create().poke(this)
        text_view.text = info.text
    }
}

class Info @Inject constructor() {
    val text = "Hello Dagger 2"
}

@Component
interface MagicBox {
    fun poke(app: MainActivity)
}
```

### Reference

Download the code [here](https://github.com/elye/demo_android_simplest_dagger2/archive/refs/heads/master.zip)

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=dagger2 orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
