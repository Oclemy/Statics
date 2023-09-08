# Best Android Data Passing and Routing Libraries in 2021


In any type of significant project, you will certainly need more than one page. These pages we represent them using Activity or Fragment in android. Routing in this context is the act of navigating from one page to another. The page may be either an activity or fragment.

Data passsing involves passing data from one page to another. That data may be simple primitive types like strings and integers or custom objects, like say a Student or Teacher. You typically use intent and bundles in android but their are libraries that make this process easier, more flexible and less error prone. In this piece we look at these.


## (a). CachePot

> CachePot is a simple open source for data cache management and passing data object between Fragments(Activities) without Pacelable and Serializable.

**Questions CachePot helps answer.**

Here is a summary of the problems cachepot helps you answer:

1. How to Pass Data Between Activities
2. How to Pass Data Between Fragments
3. How to pass multiple data types between activities/fragments.
4. How to Pass Data Between Activities and Fragments
5. How to Pass Data From PageAdapter to Fragments.

**Difference to other similar Libraries**

1. Its easy to use.
2. Complete, encompassing both fragments and activities.
3. Ability to pass single or multiple data or types. Easily pass custom objects or collections for example.
4. No annotations or extension of classes.

### Step 1: Installation

Install cachepot using the following implementation statement:

```groovy
implementation 'com.github.kimkevin:cachepot:1.2.0’
```

### Usage

How to Use CachePot:

#### 1\. Single Type, Single Data

Push your data object to `CachePot` instance in your `Activity` or `Fragment`.

> public void push(Object data)

```java
KoreanFood foodItem = new KoreanFood(1, "Kimchi", "Traditional fermented Korean side dish made of vegetables")
CachePot.getInstance().push(foodItem);
// open your activity or fragment
```

Pop your data object from `CachePot` after view changes

> public Object pop(Class classType)

```java
public class MainFragment extends Fragment{
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        KoreanFood foodItem = CachePot.getInstance().pop(KoreanFood.class);
    }
```

#### In case of Collection or Map

> Push

```java
List<KoreanFood> foodItems = new ArrayList<>();
foodItems.add(new KoreanFood(1, "Kimchi", "Traditional fermented Korean side dish made of vegetables"));
foodItems.add(new KoreanFood(2, "Kkakdugi", "A variety of kimchi in Korean cuisine"));

CachePot.getInstance().push(foodItems);
// open your activity or fragment
```

> Pop

```java
List<KoreanFood> foodItems = CachePot.getInstance().pop(ArrayList.class);
```

#### 2\. Single Type, Multiple Data

How to pass Object(Model) Asynchronously when using ViewPager

First push your data object with `position` or `id` to `CachePot` instance in `FragmentStatePagerAdapter`(or `FragmentPagerAdapter`)

> public void push(long id, Object data)

```java
private class PagerAdapter extends FragmentStatePagerAdapter {
    ...
    public Fragment getItem(int position) {
        KoreanFood foodItem = foodItems.get(position);
        CachePot.getInstance().push(position, foodItem);
        // or
        CachePot.getInstance().push(foodItem.getId(), foodItem);
        ...
    }
}
```

> public Object pop(long id)

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ...
    if (getArguments() != null) {
        final int position = getArguments().getInt(ARG_POSITION);
        foodItem = CachePot.getInstance().pop(position);
        // or
        foodItem = CachePot.getInstance().pop(id);
    }
}
```

**If more complecated views, use TAG**

> public void push(String tag, Object data) public void push(String tag, long id, Object data)

```java
private class PagerAdapter extends FragmentStatePagerAdapter {
    ...
    public Fragment getItem(int position) {
        KoreanFood foodItem = foodItems.get(position);
        CachePot.getInstance().push(TAG, position, foodItem);
        // or
        CachePot.getInstance().push(TAG, foodItem.getId(), foodItem);
        ...
    }
}
```

> public Object pop(String tag) public Object pop(String tag, long id)

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ...
    if (getArguments() != null) {
        final int position = getArguments().getInt(ARG_POSITION);
        foodItem = CachePot.getInstance().pop(TAG, position);
        // or
        foodItem = CachePot.getInstance().pop(TAG, id);
    }
}
```

## (b). RxRouter

> A lightweight, simple, smart and powerful Android routing library.

**Questions RxRouter helps solve**

Here are the common problems RxRouter makes easier:

1. How to pass data between activities
2. Alternative to onActivityResult
3. How to route through classes as well as system and custom actions.

**What makes RxRouter Unique**

Here are the features that stand out in RxRouter:

1. Easy to use
2. Uses reactive programming
3. Provides routing via annotations
4. Pass multiple parameters between activities.
5. Can route through system and custom actions.
6. Firewall system - the ability to intercept a route.

### Step 1: Installation

Install RxRouter:

```groovy
dependencies {
    implementation 'zlc.season:rxrouter:x.y.z'
    annotationProcessor 'zlc.season:rxrouter-compiler:x.y.z'
}
```

For Kotlin you should use kapt instead of annotationProcessor.

### Step 2: Usage

First add the @url annotation to the activity we need to route:

```kotlin
@Url("this is a url")
class UrlActivity : AppCompatActivity() {
    ...
}
```

Then create a class that is annotated with `@Router` to tell RxRouter that there is a router:

```Kotlin
@Router
class MainRouter{
}
```

This class doesn't need to have any remaining code. RxRouter will automatically generate a `RouterProvider` based on the class name of the class. For example, `MainRouter` will generate `MainRouterProvider`.

Then we need to add these routers to `RxRouterProviders`:

```kotlin
class CustomApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        RxRouterProviders.add(MainRouterProvider())
    }
}
```

Finally, we can start our performance:

```kotlin
RxRouter.of(context)
        .route("this is a uri")
        .subscribe()
```

You can have multiple parameters:

```kotlin
RxRouter.of(context)
        .with(10)                           //int value
        .with(true)                         //boolean value
        .with(20.12)                        //double value
        .with("this is a string value")     //string value
        .with(Bundle())                     //Bundle value
        .route("this is a uri")
        .subscribe()
```

You can use rxRouter to replace onActivityResult:

```kotlin
RxRouter.of(context)
        .with(false)
        .with(2000)
        .with(9999999999999999)
        .route("this is a uri")
        .subscribe {
            if (it.resultCode == Activity.RESULT_OK) {
                val intent = it.data
                val stringResult = intent.getStringExtra("result")
                result_text.text = stringResult
                stringResult.toast()
            }
        }
```
