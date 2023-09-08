# ViewBinding Tutorial


In this lesson we will look at ViewBinding, it's advantages, how to set it up and how to use it.

**What is ViewBinding?**

According to android's documentation:

> View binding is a feature that allows you to more easily write code that interacts with views.

You can think of viewBinding as a replacement for findViewById function.

You enable it first in the build.gradle file and after that it will generate binding classes for your XML layouts. The instance of those generated classes will contain direct references to all views that have IDs.


## How to setup ViewBinding

### Step 1: Enable ViewBinding in Gradle

Go to your app level build.gradle file add the following inside the android closure:

```groovy
    buildFeatures {
        viewBinding true
    }
```

### Step 2: Your Layouts

There is nothing you need to add to your layouts for them to be eligible for ViewBinding. However if you want a layout to be ignore, then add the `tools:viewBindingIgnore="true"` as follows:

```xml
<LinearLayout
        ...
        tools:viewBindingIgnore="true" >
    ...
</LinearLayout>
```

### Step 3: Code

In your activity declare the following:

```kotlin
 private lateinit var binding: ActivityMainBinding
```

> Take note that our layout file is `activity_main.xml`.

Then in your onCreate method inflate the ActivityMainBinding:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
```

Now obtain the root and set it as the contentView:

```kotlin
        setContentView(binding.root)
```

Now you can reference views, for example to reference a recyclerview with id \``rvMain`:

```kotlin
        recyclerView = binding.rvMain
```

### Advantages of ViewBinding

- Null safety — Same as data binding
- Type safety — Same as data binding
- No boilerplate code — Unlike in data binding, all layouts are by default eligible for the generation of binding class without any tag.
- No impact on build time — Unlike in data binding, there is no negative impact on the build time.
- Supports both Kotlin and Java.

## Top ViewBinding Questions

### ViewBinding vs Kotlin Android Extensions with synthetic views

#### Configuration

#### Kotlin Android Extensions

1. Import appropriate layout synthetic extensions: `import kotlinx.android.synthetic.main.<layout>.*`
2. Reference views in code via their ids: `textView.text = "Hello, world!"`. These extensions work on: `Activities`, `Fragments` and `Views`.

#### View Binding

1. Create binding reference inside your class: `private lateinit var binding YourClassBinding`
2. Inflate your binding `binding = YourClassBinding.inflate(layoutInflater)` inside `Activity`'s `onCreate` and call `setContentView(binding.root)`, or inflate it in `Fragment`'s `onCreateView` then return it: `return binding.root`
3. Reference views in code via binding using their ids `binding.textView.text = "Hello, world!"`

* * *

#### Type safety

**Kotlin Android Extensions** and **ViewBinding** are type safe by definition, because referenced views are already casted to appropriate types.

* * *

#### Null safety

**Kotlin Android Extensions** and **ViewBinding** are both null safe. **ViewBinding doesn't have any advantage here**. In case of **KAE**, if view is present only in some layout configurations, IDE will point that out for you:

[![enter image description here](https://i.stack.imgur.com/AL9Z6.png)](https://i.stack.imgur.com/AL9Z6.png)

So you just treat it as any other nullable type in Kotlin, and the error will disappear:

[![enter image description here](https://i.stack.imgur.com/Wq20F.png)](https://i.stack.imgur.com/Wq20F.png)

* * *

#### Applying layout changes

In case of **Kotlin Android Extensions**, layout changes instantly translate to generation of synthetic extensions, so you can use them right away. In case of **ViewBinding**, you have to build your project

* * *

#### Incorrect layout usage

In case of **Kotlin Android Extensions**, it is possible to import incorrect layout synthetic extensions, thus causing `NullPointerException`. The same applies to **ViewBinding**, since we can import wrong `Binding` class. Although, it is more probable to overlook incorrect import than incorrect class name, especially if layout file is well named after `Activity`/`Fragment`/`View`, so **ViewBinding** has upper hand here.

### Data Binding vs ViewBinding

#### ViewBinding

Only binding views to code.

#### DataBinding

Binding data (from code) to views + ViewBinding (Binding views to code)

There are three important differences

1. With view binding, the layouts do not need a layout tag
    
2. You can't use viewbinding to bind layouts with data in xml (No binding expressions, no BindingAdapters nor two-way binding with viewbinding)
    
3. The main advantages of viewbinding are speed and efficiency. It has a shorter build time because it avoids the overhead and performance issues associated with databinding due to annotation processors affecting databinding's build time.
    

In short, there is nothing viewbinding can do that databinding cannot do (though at cost of longer build times) and there are a lot databinding can do that viewbinding can"t

**Also**:

**Differences Between View Binding and Data Binding**

1. View Binding library is faster than Data Binding library as it is not utilising annotation processors underneath, and when it comes to compile time speed View Binding is more efficient.
    
2. The one and only function of View Binding is to bind the views in the code. While Data Binding offers some more options like Binding Expressions, which allows us to write expressions the connect variables to the views in the layout.
    
3. Data Binding library works with Observable Data objects, you don't have to worry about refreshing the UI when underlying data changes.
    
4. Data Binding library provides us with Binding Adapters.
    
5. Data Binding library provides us with Two way Data Binding, this is a technique of binding your objects to xml layouts, so that both object and layout can send data to each other.
    

### Reference

[StackOverflow](https://stackoverflow.com/questions/58351239/viewbinding-vs-kotlin-android-extensions-with-synthetic-views)

That's it.
