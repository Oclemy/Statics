# Android LiveData Tutorial and Examples

In this tutorial we will learn LiveData using simple examples.


### What is LiveData?

One of the sweetest introductions to to android development as part of android jetpack was the LiveData. LiveData is a class used to hold data that then become live. By being live the changes made to the held data is immediately available to the observer. The Observer is the object that needs to be notified when the changes occur. You can have multiple observers.

However what makes LiveData especially different from other observables is the fact that it is lifecycle-aware. Thus it respects the lifecycle of the app components. Remember android has several components like activities, fragments and services, each with it's own unique lifecycle callbacks. LiveData respects these by providing updates to only components that in active state. To LiveData, an active component or rather a component in active state is one that has either been started or resumed already.

### The problem LiveData solves

Before Android Architecture components were introduced by Google, developers had already come up with several design patterns like Model View Presenter and Model View Controller. These helped solve the problem of spaghetti code where you bundle logic, data and User interface code within activities and fragments thus leading to unmaintenability. Using those patterns allowed developers to be able to write more maintenable code.

However those are just development patterns and have no knowledge of android components lifecycle. This is an important problem because android's fundamental building are it's components and these components have unique lifecycle. The components' state depend on the lifecycle. Generally that state can either be active or inactive. So we have to explicitly cater for this situation when passing data to our various components. This adds complexity since we have to cater for the unique lifecycle of the each component we intend to work with.

Thus android engineers introduced android jetpack, a colection of libraries, tools, and guidance to help developers write high-quality apps easier. Part of the introduced libraries include the ViewModel as well as the LiveData classes. These generally work hand in hand to allow us pass data to the UI. ViewModel is lifecycle aware and uses LiveData to pass data to the UI. The data is listened to by observers.

LiveData can be listened to by various observers. These observers can be in different states, some active and some inactive. However this is no problem as LiveData is lifecycle aware and will only update the observers in active state. This is an advantage of LiveData over other observable mechanisms like the RxJava.

With LiveData you won't need to be checking states of components or even unsubscribing your subscribers when the component is being paused,stopped or destroyed.When the component is being resumed, LiveData will automatically notify the observer in that component of any updates.

### Implementations of LiveData

As an abstract class LiveData can't be instantiated and used directly. Instead we can use some of the concrete implementations that have been provided for us.

These include:

#### (a). MutableLiveData

The most commonly used. All you need to do is instantiate it using the `new` keyword.

```java
    private MutableLiveData<Integer> mutableLiveData=new MutableLiveData<>();
```

The above indicates using the generic parameter that we will hold an integer.

In kotlin:

```kotlin
val mutableLiveData = MutableLiveData<String>()
```

The above indicates that we will hold a String.

NB/= It's recommended you do this in the ViewModel class.

Then you need an Observer that defines the `onChanged()` method. It is through this method that we will be notified of updates.

```java
        Observer<Integer> liveDataObserver=new Observer<Integer>() {
            @Override
            public void onChanged(@Nullable Integer integer) {
                timerTV.setText("Elapsed : "+integer+ " s");
            }
        };
```

The above code is our observer. In order to actually register it we:

```java
        myViewModel.getLiveData().observe(this,liveDataObserver);
```

### Full MutableLiveData Example

#### (a). Creating an infinte timer

We want to create a simple timer that will count for us time from a specified beginning upto an infinite time, or until the app is closed or paused. We will use classes, Timer and TimerTask for scheduling our timer.

The seconds will be passed to the user interface from our ViewModel class using the MutableLiveData.

#### Video Tutorial

Here is a video tutorial:

##### Step 1: Add Lifecycle Extensions and Compiler in your gradle scripts.

Go to your app level build gradle and add them as follows:

```groovy
    // Lifecycle components
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.0.0'
```

Here is the whole dependencies closure:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'

    // Lifecycle components
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.0.0'
}
```

##### Step 2: Prepare Layout

Here is the activity_main.xml layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.cardview.widget.CardView
        android:layout_width="160dp"
        android:layout_height="190dp"
        android:layout_margin="10dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:foreground="?android:attr/selectableItemBackground">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center"
            android:orientation="vertical">

            <ImageView
                android:layout_width="64dp"
                android:layout_height="64dp"
                android:background="@drawable/m_circle_bg_pink"
                android:padding="10dp"
                android:src="@drawable/m_info" />

            <TextView
                android:id="@+id/tvCounter"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:text="Seconds: "
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:gravity="center"
                android:padding="5dp"
                android:text="Android LiveData Example"
                android:textColor="@android:color/darker_gray" />

        </LinearLayout>

    </androidx.cardview.widget.CardView>

</androidx.constraintlayout.widget.ConstraintLayout>
```

##### Step 3: Create ViewModel Class

Create a class called `MyViewModel.java` and add imports as follows:

```java
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.util.Timer;
import java.util.TimerTask;

public class MyViewModel extends ViewModel {
```

Instantiate our MutableLiveData and initialize other fields:

```java
    //MutableLiveData is a LiveData which publicly exposes setValue(T) and
    // postValue(T) method.
    private MutableLiveData<Integer> mutableLiveData=new MutableLiveData<>();

    private static int BEGIN_AFTER = 1000, INTERVAL = 1000;
    private static int counter = 0;
```

Then define a method to start our timer at a specified moment then increment it after a given interval:

```java
    private void startTimer(){
        Timer timer=new Timer();
        //Schedule the specified task for repeated fixed-rate execution,
        // beginning after the specified delay. Subsequent executions
        // take place at approximately regular intervals, separated by
        // the specified period.
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                mutableLiveData.postValue(counter++);
            }
        },BEGIN_AFTER,INTERVAL);
    }
```

Let's start the timer in our constructor:

```java
    //Constructor
    public MyViewModel(){
       startTimer();
    }
```

Then publicly expose our MutableLiveData to any observer:

```java
    public MutableLiveData<Integer> getLiveData() {
        return mutableLiveData;
    }
```

**FULL CODE : MyVideModel.java**

```java
package info.camposha.counterlivedata;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.util.Timer;
import java.util.TimerTask;

public class MyViewModel extends ViewModel {

    //MutableLiveData is a LiveData which publicly exposes setValue(T) and
    // postValue(T) method.
    private MutableLiveData<Integer> mutableLiveData=new MutableLiveData<>();

    private static int BEGIN_AFTER = 1000, INTERVAL = 1000;
    private static int counter = 0;

    private void startTimer(){
        Timer timer=new Timer();
        //Schedule the specified task for repeated fixed-rate execution,
        // beginning after the specified delay. Subsequent executions
        // take place at approximately regular intervals, separated by
        // the specified period.
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                mutableLiveData.postValue(counter++);
            }
        },BEGIN_AFTER,INTERVAL);
    }
    //Constructor
    public MyViewModel(){
       startTimer();
    }
    public MutableLiveData<Integer> getLiveData() {
        return mutableLiveData;
    }
}
//end
```

### Step 4: Create our MainActivity

Here we will create our Observer then subscribe it to our MutableLiveData:

```java
    private void renderUpdates(){
        final TextView timerTV=findViewById(R.id.tvCounter);
        MyViewModel myViewModel = ViewModelProviders.of(this).get(MyViewModel.class);

        Observer<Integer> liveDataObserver=new Observer<Integer>() {
            @Override
            public void onChanged(@Nullable Integer integer) {
                timerTV.setText("Elapsed : "+integer+ " s");
            }
        };
        myViewModel.getLiveData().observe(this,liveDataObserver);
    }
```

**FULL CODE: MainActivity.java**

```java
package info.camposha.counterlivedata;

import android.os.Bundle;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

public class MainActivity extends AppCompatActivity {

    private void renderUpdates(){
        final TextView timerTV=findViewById(R.id.tvCounter);
        MyViewModel myViewModel = ViewModelProviders.of(this).get(MyViewModel.class);

        Observer<Integer> liveDataObserver=new Observer<Integer>() {
            @Override
            public void onChanged(@Nullable Integer integer) {
                timerTV.setText("Elapsed : "+integer+ " s");
            }
        };
        myViewModel.getLiveData().observe(this,liveDataObserver);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.renderUpdates();
    }
}
```

### Download

Download

References: [Android Developers Documentation](https://developer.android.com/topic/libraries/architecture/livedata).

## 2\. Android LiveData and ViewModel with RecyclerView Example

In the second example, we want to look at howto use LiveData alongside a ViewModel and RecyclerView. RecyclerView will be rendering images and text. Data will be prepared in the ViewModel.

### What this Example Teaches You

- How to use LiveData with RecyclerView and ViewModel.
- How to render an Observable list.

### Step 1: Install Dependencies

First we install dependencies including the androidx lifecycle extensions:

```groovy
    implementation 'androidx.lifecycle:lifecycle-extensions:2.2.0'
```

We will also enable ViewBinding:

```groovy
    buildFeatures {
        viewBinding true
    }
```

### Step 2: Prepare Layouts

We will prepare our UI layouts. We will have two of them:

1. activity_main.xml - Our main layout. Will be inflated into our main activity.
2. model.xml - Our list item layout.

You will find the layut code in the source code download file.

### Step 3: Create a User Data class

A class to represent our user:

```kotlin
class User {
    var name: String? = ""
    var description: String? = ""
    var img: Int = R.drawable.male_young_64
}
```

The user will have a name, description and profile image.

### Step 4: Our ViewModel

This is the class where we will prepare data for our UI.

Start by creating the class by extending the ViewModel class:

```kotlin
class MainViewModel : ViewModel() {
```

Now prepare our Mutablelivedata:

```kotlin
    var userMutableLiveData: MutableLiveData<ArrayList<User>?> = MutableLiveData()
```

Now create a function to populate our users:

```kotlin
fun populateList() {
        var user = User()
        user.name = "John Doe"
        user.description = "A very great guy"
        user.img=R.drawable.male_young_64
        userArrayList = ArrayList()
        userArrayList!!.add(user)
        user = User()
        user.name = "Jane Doe"
        user.description = "A very good girl"
        user.img=R.drawable.female_64
        userArrayList!!.add(user)
        user = User()
        user.name = "Kael Doe"
        user.description = "A very powerful guy"
        user.img=R.drawable.male_office_64
        userArrayList!!.add(user)
        user = User()
        user.name = "Teresa Doe"
        user.description = "A very beautiful girl"
        user.img=R.drawable.feamle_avatar_64
        userArrayList!!.add(user)
        user = User()
        user.name = "Ronnie Doe"
        user.description = "A very kind guy"
        user.img=R.drawable.male_grandma_64
        userArrayList!!.add(user)
        user = User()
        user.name = "Mary Doe"
        user.description = "A very helpful girl"
        user.img=R.drawable.female_afro_mp4
        userArrayList!!.add(user)
    }
```

### Step 5: Our RecyclerView Adapter

To render items on recyclerview, we need an adapter class:

```kotlin
class RecyclerViewAdapter(context: Context?, userArrayList: ArrayList<User>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder?>() {
    var context: Context? = context
    var users: ArrayList<User> = userArrayList
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val rootView: View = LayoutInflater.from(context).inflate(R.layout.model, parent, false)
        return RecyclerViewViewHolder(rootView)
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val user = users[position]
        val viewHolder = holder as RecyclerViewViewHolder
        viewHolder.nameTV.text = user.name
        viewHolder.descTV.text = user.description
        viewHolder.mImg.setImageResource(user.img)
    }

    override fun getItemCount(): Int {
        return users.size
    }

    internal inner class RecyclerViewViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var mImg: ImageView
        var nameTV: TextView
        var descTV: TextView

        init {
            mImg = itemView.findViewById(R.id.imgView_icon)
            nameTV = itemView.findViewById(R.id.txtView_title)
            descTV = itemView.findViewById(R.id.txtView_description)
        }
    }

}
```

### Step 6: Our Main Activity

We now come toour main activity. This is our only activity. Here is the code:

```kotlin
class MainActivity : AppCompatActivity(), LifecycleOwner {
    var viewModel: MainViewModel? = null
    var recyclerView: RecyclerView? = null
    var recyclerViewAdapter: RecyclerViewAdapter? = null
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        recyclerView = binding.rvMain

        viewModel = ViewModelProvider(this).get(MainViewModel::class.java)
        viewModel?.userMutableLiveData?.observe(this, userListUpdateObserver)
    }

    var userListUpdateObserver: Observer<ArrayList<User>?> =
        Observer<ArrayList<User>?> { userArrayList ->
            recyclerViewAdapter = RecyclerViewAdapter(this@MainActivity, userArrayList)
            recyclerView!!.layoutManager = LinearLayoutManager(this@MainActivity)
            recyclerView!!.adapter = recyclerViewAdapter
        }
}
```

### Run

Run the Project

### Download Code

Download the full source code [here](https://github.com/Oclemy/MsLiveDataRecyclerView/archive/refs/heads/master.zip).

# LiveData Libraries

Let's also look at some libraries that empower you to fully take advantage of LiveData in some common situations.

## (a). LiveData Extensions

## 1\. Lives

> Add RxJava-like operators to your LiveData objects with ease, usable in Kotlin (as extension functions) and Java (as static functions to a class called Lives).

### Step 1: How to Install

Install as gradle dependency:

```groovy
implementation 'com.snakydesign.livedataextensions:lives:1.3.0'
implementation 'android.arch.lifecycle:extensions:x.x.x' // If you are using the AndroidX version, that's fine too, as the Jetifier will take care of the conversion.
```

If you plan to use it in Java then you also need to add:

```groovy
implementation 'org.jetbrains.kotlin:kotlin-stdlib:x.x.x'
```

### Step 2: How to Use

**Import the functions**

```kotlin
    import com.snakydesign.livedataextensions.*
```

**Creating LiveData**

- `liveDataOf` : Create a LiveData object from a value (like `just` in RxJava, although it immediately emits the value)

```kotlin
    val liveData = liveDataOf(2) //liveData will produce 2 (as Int) when observed
```

- `from` : Creates a LiveData that emits the value that the `callable` function produces, and immediately emits it.

```kotlin
    val liveData = liveDataOf {computePI()}
```

- `emptyLiveData` : Creates an empty LiveData

```kotlin
    val liveData = emptyLiveData<Int>()
```

**Filtering**

- `distinct` : Emits the items that are different from all the values that have been emitted so far

```kotlin
    val originalLiveData = MutableLiveData<Int>()
    val newLiveData = originalLiveData.distinct()
    originalLiveData.value = 2
    originalLiveData.value = 2 // newLiveData will not produce this
    originalLiveData.value = 3 // newLiveData will produce
    originalLiveData.value = 2 // newLiveData will not produce this
```

- `distinctUntilChanged` : Emits the items that are different from the last item

```kotlin
    val originalLiveData = MutableLiveData<Int>()
    val newLiveData = originalLiveData.distinctUntilChanged()
    originalLiveData.value = 2
    originalLiveData.value = 2 // newLiveData will not produce this
    originalLiveData.value = 3 // newLiveData will produce
    originalLiveData.value = 2 // newLiveData will produce
```

- `filter` :Emits the items that pass through the predicate

```kotlin
    val originalLiveData = MutableLiveData<Int>()
    val newLiveData = originalLiveData.filter { it > 2 }
    originalLiveData.value = 3 // newLiveData will produce
    originalLiveData.value = 2 // newLiveData will not produce this
```

- `first()` : produces a SingleLiveData that produces only one Item.
- `take(n:Int)` : produces a LiveData that produces only the first n Items.
- `takeUntil(predicate)` : Takes until a certain predicate is met, and does not emit anything after that, whatever the value.
- `skip(n)` : Skips the first n values.
- `skipUntil(predicate)` : Skips all values until a certain predicate is met (the item that actives the predicate is also emitted).
- `elementAt(index)` : emits the item that was emitted at `index` position
- `nonNull()` : Will never emit the nulls to the observers.
- `defaultIfNull(value)`: Will produce the `value` when `null` is received.

**Combining**

- `merge(List<LiveData>)` : Merges multiple LiveData, and emits any item that was emitted by any of them
- `LiveData.merge(LiveData)` : Merges this LiveData with another one, and emits any item that was emitted by any of them
- `concat(LiveData...)` : Concats multiple LiveData objects (and converts them to `SingleLiveData` if necessary, and emits their first item in order. (Please check the note below.)
- `LiveData.then(LiveData)` : Concats the first LiveData with the given one. (Please check the note below.)
- `startWith(startingValue)`: Emits the `startingValue` before any other value.
- `zip(firstLiveData, secondLiveData, zipFunction)`: zips both of the LiveDatas using the zipFunction and emits a value after both of them have emitted their values, after that, emits values whenever any of them emits a value.
- `combineLatest(firstLiveData, secondLiveData, combineFunction)`: combines both of the LiveDatas using the combineFunction and emits a value after any of them have emitted a value.
- `LiveData.sampleWith(otherLiveData)`: Samples the current live data with other live data, resulting in a live data that emits the last value emitted by the original live data (if any) whenever the other live data emits

**Transforming**

- `map(mapperFunction)` : Map each value emitted to another value (and type) with the given function
- `switchMap(mapperFunction)` : Maps any values that were emitted by the LiveData to the given function that produces another LiveData
- `doBeforeNext(OnNextAction)` : Does the `onNext` function before everything actually emitting the item to the observers
- `doAfterNext(OnNextAction)` : Does the `onNext` function after emitting the item to the observers(function) : Does the `onNext` function before everything actually emitting the item to the observers
- `buffer(count)` : Buffers the items emitted by the LiveData, and emits them when they reach the `count` as a List.
- `scan(accumulator)` : Applies the accumulator function to each emitted item, starting with the second emitted item. Initial value of the accumulator is the first item.
- `scan(seed, accumulator)` : Applies the accumulator function to each emitted item, starting with the initial seed.
- `amb(LiveData...)` : Emits the items of the first LiveData that emits the item. Items of other LiveDatas will never be emitted and are not considered.
- `toMutableLiveData()` : Converts a LiveData to a MutableLiveData with the initial value set by this LiveData's value

### Step 3: Reference

Find complete documentation [here](https://github.com/adibfara/Lives).

## (b). LiveData Testing

## 1\. livedata-testing

> TestObserver to easily test LiveData and make assertions on them.

- Test pretends to be an Activity
- No Android framework mocking or Robolectric - just standard fast JUnit tests
- Fluent API inspired by RxJava TestObserver
- Easy to write fast executing tests - possibly TDD

![](https://github.com/jraska/livedata-testing/raw/master/img/livedata-testing.png)

### Step 1: How to Install

##### Kotlin users:

```groovy
testImplementation 'com.jraska.livedata:testing-ktx:1.2.0'
```

##### Java users:

```groovy
testImplementation 'com.jraska.livedata:testing:1.2.0'
```

### Step 2: How to Use

Having `LiveData<Integer>` of counter from 0 to 4:

Kotlin - see [ExampleTest.kt](https://github.com/jraska/livedata-testing/blob/master/testing-ktx/src/test/java/com/jraska/livedata/example/ExampleTest.kt)

```java
liveData.test()
  .awaitValue()
  .assertHasValue()
  .assertValue { it > 3 }
  .assertValue(4)
  .assertHistorySize(5)
  .assertNever { it > 4 }

// Assertion on structures with a lot of nesting
viewLiveData.map { it.items[0].header.title }
  .assertValue("Expected title")
```

Java - see [ExampleTest.java](https://github.com/jraska/livedata-testing/blob/master/testing-ktx/src/test/java/com/jraska/livedata/example/ExampleJavaTest.java)

```java
TestObserver.test(liveData)
  .awaitValue()
  .assertHasValue()
  .assertValue(value -> value > 3)
  .assertValue(4)
  .assertHistorySize(5)
  .assertNever(value -> value > 4);
```

Don't forget to use `InstantTaskExecutorRule` from `androidx.arch.core:core-testing` to make your LiveData test run properly.

### Step 3: Reference

Find complete reference [here](https://github.com/jraska/livedata-testing).

## (c). LiveData Adapters

Some awesome RecyclerView adapters related to LiveData.

## 1\. LiveAdapter

**Don't write a RecyclerView adapter again. Not even a ViewHolder!**

- Based on [**Android Data Binding**](https://developer.android.com/topic/libraries/data-binding/index.html)
- Written in [**Kotlin**](http://kotlinlang.org)
- Supports [**LiveData**](https://developer.android.com/topic/libraries/architecture/livedata)
- No need to write the adapter
- No need to write the ViewHolders
- No need to modify your model classes
- No need to notify the adapter when data set changes
- Supports multiple item view types
- Optional Callbacks/Listeners
- Very fast — no reflection
- Super easy API
- Minimum Android SDK: **19**

### Step 1: How to Install

Add it in your root build.gradle at the end of repositories:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Add the dependency to module build.gradle

```groovy
// apply plugin: 'kotlin-kapt' // this line only for Kotlin projects

android {
    ...
    dataBinding.enabled true
}

dependencies {
    implementation 'com.github.RaviKoradiya:LiveAdapter:1.3.3'
    // kapt 'com.android.databinding:compiler:GRADLE_PLUGIN_VERSION' // this line only for Kotlin projects
}
```

### Step 2: How to Use

Create your item layouts with `<layout>` as root:

```xml
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>
        <variable name="item" type="com.github.RaviKoradiya.LiveAdapter.item.Header"/>
    </data>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@{item.text}"/>

</layout>
```

**It is important for all the item types to have the same variable name**, in this case "item". This name is passed to the adapter builder as BR.variableName, in this case BR.item:

##### [](#observablelist-or-simple-list)ObservableList or simple List

```java
// Java
new LiveAdapter(listOfItems, BR.item)
           .map(Header.class, R.layout.item_header)
           .map(Point.class, R.layout.item_point)
           .into(recyclerView);
```

```kotlin
// Kotlin
LiveAdapter(listOfItems, BR.item)
           .map<Header>(R.layout.item_header)
           .map<Point>(R.layout.item_point)
           .into(recyclerView)
```

The list of items can be an `ObservableList` or `LiveData<List>` if you want to get the adapter **automatically updated** when its content changes, or a simple `List` if you don't need to use this feature.

##### LiveData

```kotlin
// Kotlin sample
LiveAdapter(
            data = liveListOfItems,
            lifecycleOwner = this@MainActivity,
            variable = BR.item )
           .map<Header, ItemHeaderBinding>(R.layout.item_header) {
               areContentsTheSame { old: Header, new: Header ->
                   return@areContentsTheSame old.text == new.text
               }
           }
           .map<Point, ItemPointBinding>(R.layout.item_point) {
               areContentsTheSame { old: Point, new: Point ->
                   return@areContentsTheSame old.id == new.id
               }
           }
           .into(recyclerview)
```

I suggest to implement `DiffUtil ItemCallback` while using `LiveData`.

### Step 3: Example and Reference

Find example and reference [here](https://github.com/RaviKoradiya/LiveAdapter).

Good day.
