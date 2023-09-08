# Kotlin Android Koin Example

In this tutorial you will learn about Koin in Kotlin Android via simple examples.



### Whar is Koin?

> It is a smart Kotlin injection library to keep you focused on your app, not on your tools.

It is a pragmatic lightweight dependency injection framework for Kotlin.

### How to Install Koin

Add the following Gradle dependencies to add Koin to your project:

```groovy
// Add Maven Central to your repositories if needed
repositories {
    mavenCentral()
}
```

Then declare dependencies as needed:

```kotlin
implementation "io.insert-koin:koin-android:$koin_version"
```

## How to Use Koin

Here is a step by step quickstart tutorial on how to use Koin in Android.

### Step 1: Install it

Install it as has been discussed above.

### Step 2: Create Components

Create a HelloRepository to provide some data:

```kotlin
interface HelloRepository {
    fun giveHello(): String
}

class HelloRepositoryImpl() : HelloRepository {
    override fun giveHello() = "Hello Koin"
}
```

### Step 3: Create Presenter

Then create a presenter class, for consuming this data:

```kotlin
class MySimplePresenter(val repo: HelloRepository) {

    fun sayHello() = "${repo.giveHello()} from $this"
}
```

### Step 4: Create Koin module

Use the `module` function to declare a module. Let's declare our first module:

```kotlin
val appModule = module {

    // single instance of HelloRepository
    single<HelloRepository> { HelloRepositoryImpl() }

    // Simple Presenter Factory
    factory { MySimplePresenter(get()) }
}
```

We declare our MySimplePresenter class as `factory` to have a new instance created each time our Activity need one.

### Step 5: Start Koin

Now that we have a module, let's start it with Koin. Open your application class, or make one (don't forget to declare it in your `manifest.xml`). Just call the `startKoin()` function:

```kotlin
class MyApplication : Application(){
    override fun onCreate() {
        super.onCreate()
        // Start Koin
        startKoin{
            androidLogger()
            androidContext(this@MyApplication)
            modules(appModule)
        }
    }
}
```

### Step 6: Inject Dependencies

The `MySimplePresenter` component will be created with `HelloRepository` instance. To get it into our Activity, let's inject it with the `by inject()` delegate injector:

```kotlin
class MySimpleActivity : AppCompatActivity() {

    // Lazy injected MySimplePresenter
    val firstPresenter: MySimplePresenter by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        //...
    }
}
```

### Download

You can download the code [here](https://downgit.github.io/#/home?url=https://github.com/InsertKoinIO/koin/tree/main/quickstart/getting-started-koin-android) or read more about Koin [here](https://insert-koin.io/).

## Example 1: Kotlin Android Koin and MVP Example

A simple example to get you started with Koin and Model View Presenter in Kotlin Android.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add Koin core and Koin-Android as dependencies:

```groovy
    implementation "org.koin:koin-core:$koinVersion"
    implementation "org.koin:koin-android:$koinVersion"
```

### Step 3: Design Layout

Design your `MainActivity` layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.koin.main.MainActivity">

    <Button
        android:id="@+id/hello_button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="15dp"
        android:layout_marginStart="15dp"
        android:text="@string/show_text"
        app:layout_constraintBottom_toTopOf="@+id/textView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="cursive"
        android:text="Hello World!"
        android:textColor="@android:color/black"
        android:textSize="22sp"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Initialize Koin

**InitApp.kt**

```kotlin
import android.app.Application
import com.developers.koin.main.mainModule
import org.koin.android.ext.android.startKoin

class InitApp : Application() {

    override fun onCreate() {
        super.onCreate()
        startKoin(this, listOf(app, mainModule))
    }
}
```

### Step 4: Create Modules

**AppModule**

```kotlin
import android.app.Application
import org.koin.dsl.module.applicationContext

val app = applicationContext {
    provide { Application() }
}
```

**MainModule.kt**

```kotlin
import org.koin.dsl.module.applicationContext

val mainModule = applicationContext {
    provide { MainPresenter() }
}
```

### Step 5: Create Presenters

**MainPresenter.kt**

```kotlin
class MainPresenter() {

    private var mainView: MainView? = null

    fun attachView(mainView: MainView?) {
        this.mainView = mainView
    }

    fun detachView() {
        mainView = null
    }

    fun showMessage() {
        mainView?.showMessage("Hello this is Injection from Koin")
    }

}
```

### Step 6: Create View

**MainView.kt**

```kotlin
interface MainView {

    fun showMessage(hello: String)

    fun showError(error: String)
}
```

### Step 7: Write MainActivity code

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.developers.koin.R
import kotlinx.android.synthetic.main.activity_main.*
import org.koin.android.ext.android.inject

class MainActivity : AppCompatActivity(), MainView {

    private val presenter by inject<MainPresenter>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        presenter.attachView(this)
        hello_button.setOnClickListener {
            presenter.showMessage()
        }
    }

    override fun showError(error: String) {
        //Show Error here
    }

    override fun showMessage(hello: String) {
        textView.visibility = View.VISIBLE
        textView.text = hello
    }

    override fun onDestroy() {
        super.onDestroy()
        presenter.detachView()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/Koin) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
