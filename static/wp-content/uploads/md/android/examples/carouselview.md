# Best Android CarouselView Solutions and Libraries in 2022

Let us look at the best libraries and solutions to implement a CarouselView in android.


## Solution 1: CarouselLayoutManager

> This is an Android LayoutManager for RecyclerView to support Carousel view style

Here are demos

![Example](resources/carousel_work_small.gif "working example")

![Example](resources/carousel_double_work_small.gif "working example")

### Step 1: Install it

Add the following implementation statement in yoru `app/build.gradle`:

```groovt
    implementation 'com.mig35:carousellayoutmanager:version'
```

> Please replace `version` with the latest version: <a href="https://maven-badges.herokuapp.com/maven-central/com.mig35/carousellayoutmanager"><img src="https://maven-badges.herokuapp.com/maven-central/com.mig35/carousellayoutmanager/badge.svg" /></a>

### Step 2: Create Carousel

This LayoutManager works only with fixedSized items in `adapter`. To use this LayoutManager add gradle (maven) dependence and use this code (you can use `CarouselLayoutManager.HORIZONTAL` as well):

```java
    final CarouselLayoutManager layoutManager = new CarouselLayoutManager(CarouselLayoutManager.VERTICAL);

    final RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
    recyclerView.setLayoutManager(layoutManager);
    recyclerView.setHasFixedSize(true);
```

To enable items center scrolling add this CenterScrollListener:

```java
    recyclerView.addOnScrollListener(new CenterScrollListener());
```
To enable zoom effects that is enabled in gif add this line:

```java
    layoutManager.setPostLayoutListener(new CarouselZoomPostLayoutListener());
```
Full code from this sample:

```java
    // vertical and cycle layout
    final CarouselLayoutManager layoutManager = new CarouselLayoutManager(CarouselLayoutManager.VERTICAL, true);
    layoutManager.setPostLayoutListener(new CarouselZoomPostLayoutListener());

    final RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
    recyclerView.setLayoutManager(layoutManager);
    recyclerView.setHasFixedSize(true);
    recyclerView.setAdapter(new TestAdapter(this));
    recyclerView.addOnScrollListener(new CenterScrollListener());
```

### Step 3: Customize

You can enable and disable circular loop using two arguments constructor. Pass true to enable loop and false to disable.

You can make carousel Vertically and Horizontally by changing first argument.

You can change zoom level of bottom cards by changing `scaleMultiplier` argument in `CarouselZoomPostLayoutListener`. Big thanks to [JeneaVranceanu](https://github.com/JeneaVranceanu)!


### Reference

Read more [here](https://github.com/Azoft/CarouselLayoutManager). Follow library author [here](https://github.com/Azoft).



## Solution 2: CarouselView

> This is a Useful library for showing list in sliding mode or carousel mode

It allows you do the following:

- use horizontal and vertical mode.
- auto scroll images (with pause/resume)
- change scroll listener
- slider mode/ carousel mode
- change scrolling speed

Here is the demo:

<img src="https://raw.githubusercontent.com/alirezat775/CarouselView/master/assets/demo.gif" width="200" height="400" />


Here are the steps to using it: 

### Usage

In your root `build.gradle`:

```groovy
    maven { url "https://jitpack.io" }
```

then add to module build.gradle:

```groovy
    implementation 'com.github.alirezat775:carousel-view:{latest-version}'
```

### Reference

Read more [here](https://github.com/alirezat775/carousel-view)

## Solution 3: CarouselRecyclerview

> This library allows you to Create carousel effect in recyclerview with the CarouselRecyclerview in a simple way.

![Layout manager](./preview/lm.jpg)


### Step 1: Install it

Add below codes to your **root** `build.gradle` file (not your module build.gradle file);

```Gradle
allprojects {
    repositories {
          mavenCentral()
    }
}
```

And add a dependency code to your **module**'s `build.gradle` file:

```gradle
dependencies {
   implementation 'com.github.sparrow007:carouselrecyclerview:1.2.4'
}
```

### Step 2: Create Carousel

Here are simple examples:

#### Basic Example for Kotlin

Here is a basic example of implementing carousel recyclerview in koltin files (activity or fragment) with attribute.

```kotlin
  binding.carouselRecyclerview.adapter = adapter
  binding.carouselRecyclerview.apply {
   set3DItem(true)
   setAlpha(true)
   setInfinite(true)
  }
```
### Basic Example for XML
Here is a basic example of implementing carousel recyclerview in layout xml.

```xml
<com.jackandphantom.carouselrecyclerview.CarouselRecyclerview
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:id="@+id/carouselRecyclerview"/>
```


### API Methods

-  `fun set3DItem(is3DItem: Boolean)` - Make the view tilt according to their position, middle position does not tilt.
- `fun setInfinite(isInfinite: Boolean)` - Create the loop of the given view means there is no start or end, but provided position in the interface will be correct.
- `fun setFlat(isFlat: Boolean)` - Make the flat layout in the layout manager of the reyclerview.
- `fun setAlpha(isAlpha: Boolean)` - Set the alpha for each item depends on the position in the layout manager.
-` fun setIntervalRatio(ratio: Float) `- Set the interval ratio which is gap between items (views) in layout manager.
- `fun getCarouselLayoutManager(): CarouselLayoutManager` - Get the carousel layout manager instance.
- `fun getSelectedPosition(): Int` - Get selected position from the layout manager.
- `fun setIsScrollingEnabled(isScrollingEnabled: Boolean)` - Set scrolling disabled or enabled.

  ### API Methods Usage

  ```Kotlin
  val carouselRecyclerview = findViewById<CarouselRecyclerview>(R.id.recycler)
        carouselRecyclerview.adapter = adapter
        carouselRecyclerview.set3DItem(true)
        carouselRecyclerview.setInfinite(true)
        carouselRecyclerview.setAlpha(true)
        carouselRecyclerview.setFlat(true)
        carouselRecyclerview.setIsScrollingEnabled(true)

        val carouselLayoutManager = carouselRecyclerview.getCarouselLayoutManager()
        val currentlyCenterPosition = carouselRecyclerview.getSelectedPosition()
  
  ```
  ### Item Position Listener

  You can listen to the position whenever the scroll happens you will get notified about the position, following are codes for listener

  ```Kotlin
   carouselRecyclerview.setItemSelectListener(object : OnSelected {
            override fun onItemSelected(position: Int) {
                //Cente item
            }
        })
  
  ```

### Reflection ImageView

You see in the demo that there is a mirror image (reflection imageview), for this i already created custom imageview for this.


Use ReflectionImageView in xml layout and provide src

```xml
 <com.jackandphantom.carouselrecyclerview.view.ReflectionImageView
     android:layout_width="120dp"
     android:layout_height="120dp"
     android:scaleType="fitXY"
     android:src="@drawable/hacker"
    />
```

### Reflection Layout

<img src= "https://user-images.githubusercontent.com/7668602/114284225-14244980-9a6c-11eb-8e49-aa7b191a6d1d.png" align="right" width="22%"/>

Now you can show reflection in more efficient way and 3x faster than ReflectionImageView see the codes below

```XML
<?xml version="1.0" encoding="utf-8"?>
<com.jackandphantom.carouselrecyclerview.view.ReflectionViewContainer
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    xmlns:android="http://schemas.android.com/apk/res/android"
    app:reflect_relativeDepth="0.5"
    app:reflect_gap="0dp"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    >
    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/guypro"
        android:scaleType="fitXY"
        android:id="@+id/image" />
</com.jackandphantom.carouselrecyclerview.view.ReflectionViewContainer>

```
> It is recommended you to use image loading library like Glide for loading image in reflection image for better performance


### Reference

Read more [here](https://github.com/sparrow007/CarouselRecyclerview). Follow  library author [here](https://github.com/sparrow007/).

## Solution 4: CarouselView

This library is updated version of [Android 3D Carousel](http://www.codeproject.com/Articles/146145/Android-3D-Carousel).

Here is a demo GIF:

![](https://s31.postimg.org/h5zmkihzv/ezgif_com_video_to_gif.gif)

It has improved the following:

- Fixed touch gesture
- Improved performance
- Closed issue with battery life
- Added opportunity to add layout content
- New parameters for carousel view.


Optional for widget view:

```java
    /**
     * Default min quantity of views.
     */
    static final int MIN_QUANTITY = 3;

    /**
     * Default max quantity of views.
     */
    static final int MAX_QUANTITY = 12;

    /**
     * Set diameter distortion, 1.0 = perfect circle
     */
    static final float DIAMETER_SCALE = 0.4f;
    
    /**
     * Rate to shrink objects as they appear further back in the depth field. Typical values 1.0,
     * linear, 2.0 twice as fast.
     */
    static  final float DEPTH_SCALE = 0.8f;
    
    /**
     * Tilt angle, negative lifts up back, positive lowers back.
     */
    static float TILT = -0.3f;  
    
    /**
     * Limit depth scale used to shrink far objects to not fall below this minimum scale.
     */
    static final float MIN_SCALE = 0.4f;        
    
    /**
     * Max velocity for scrolling.
     */
    static final int MAX_SCROLLING_VELOCITY = 16000;

    /**
     * Max scrolling distance.
     */
    static final int MAX_SCROLLING_DISTANCE = 13;

    /**
     * Duration in milliseconds from the start of a scroll during which we're
     * unsure whether the user is scrolling or flinging.
     */
    static final int SCROLL_TO_FLING_UNCERTAINTY_TIMEOUT = 100;

    /**
     * Duration in milliseconds from the start of animation to end.
     */
    static final int ANIMATION_DURATION = 200;

    /**
     * Default value for rotation scroll threshold.
     */
    static final int SCROLLING_THRESHOLD = 150;

    /**
     * Default min alpha value.
     */
    static final int MIN_ALPHA = 30;  

    /**
     * Defines default selected item.
     */
    static final int DEFAULT_SELECTED_ITEM = 0;
    
    /**
     * Configures size of items which are not in front.
     */
    static final int CAROUSEL_ITEM_Z_POSITION = 1;
    
    /**
     * Configures vertical shift of non-front items.
     */
    static final float CAROUSEL_ITEM_Y_POSITION= 1.0f;
```


### Reference

> Read more [here](https://github.com/binaryroot/CarouselView). 
> Follow library author [here](https://github.com/binaryroot/). 

## Solution 5: CarouselView

> A wonderful library to display 2D fancy carousels for Android.

Here are GIF demos:

![TimeMachineViewTransformer Demo](https://gtomato.github.io/carouselview/media/timemachine.gif) ![FlatMerryGoRoundTransformer Demo](https://gtomato.github.io/carouselview/media/merrygoround-flat.gif)

Please read [the website](https://gtomato.github.io/carouselview/) for more information.


### Step 1: Install it

Install via Gradle:
```groovy
implementation 'com.gtomato.android.library:carouselview:<version>'
```


### Step 2: Add Carousel

Layout XML:

```xml
	<com.gtomato.android.ui.widget.CarouselView
		android:id="@+id/carousel"
		android:layout_width="match_parent"
		android:layout_height="150dp"
		android:layout_centerInParent="true"/>
```

### Step 3: Config:

Config:

```java
carousel.setTransformer(new FlatMerryGoRoundTransformer());
carousel.setAdapter(new MyDataAdapter());
```


### Reference

> Read more [here](https://github.com/gtomato/carouselview).
> Follow code author [here](https://github.com/gtomato/).

## Solution 6: CarouselView RecyclerView

> An android carousel library for RecyclerView.

You will find [Examples here](https://github.com/jama5262/CarouselView/tree/master/app/src/main/java/com/jama/carouselviewexample/examples).

Here are some demos:

<img src="https://github.com/jama5262/CarouselView/blob/master/app/src/main/res/drawable/image1.gif" alt="alt text" height="500px"> 

<img src="https://github.com/jama5262/CarouselView/blob/master/app/src/main/res/drawable/image2.gif" alt="alt text" height="500px"> 

<img src="https://github.com/jama5262/CarouselView/blob/master/app/src/main/res/drawable/image3.gif" height="500px">

### Step 1: Install it

Current Version: [![](https://jitpack.io/v/jama5262/CarouselView.svg)](https://jitpack.io/#jama5262/CarouselView)

Add the following in your root-level `build.gradle`

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then declare the dependency as follows:

```groovy
dependencies {
    implementation 'com.github.jama5262:CarouselView:1.2.2'
}
```

### Step 2: Add to Layout

Below is all the XML attributes that the CarouselView has

```xml
<com.jama.carouselview.CarouselView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:enableSnapping="true"
    app:scaleOnScroll="false"
    app:setAutoPlay="true"
    app:setAutoPlayDelay="3000"
    app:carouselOffset="center"
    app:indicatorAnimationType="drop"
    app:indicatorRadius="5"
    app:indicatorPadding="5"
    app:indicatorSelectedColor="@color/colorAccent"
    app:indicatorUnselectedColor="@color/colorPrimary"
    app:size="10"
    app:spacing="10"
    app:resource="@layout/image_carousel_item"/>
```

### Step 3: Kotlin Example

```Kotlin
class CarouselActivity : AppCompatActivity() {

    private val images = arrayListOf(R.drawable.boardwalk_by_the_ocean, 
            R.drawable.journal_and_coffee_at_table, R.drawable.tying_down_tent_fly)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_carousel)

        val carouselView = findViewById<CarouselView>(R.id.carouselView)

        carouselView.apply {
            size = images.size
            resource = R.layout.carousel_item
            autoPlay = true
            indicatorAnimationType = IndicatorAnimationType.THIN_WORM
            carouselOffset = OffsetType.CENTER
            setCarouselViewListener { view, position ->
                // Example here is setting up a full image carousel
                val imageView = view.findViewById<ImageView>(R.id.imageView)
                imageView.setImageDrawable(resources.getDrawable(images[position]))
            }
            // After you finish setting up, show the CarouselView
            show()
        }
    }
}
```

### Step 4:  Java Example

```java
class CenteredCarouselActivity extends AppCompatActivity {

  private int[] images = {R.drawable.boardwalk_by_the_ocean,
      R.drawable.journal_and_coffee_at_table, R.drawable.tying_down_tent_fly};

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_centered_carousel);
    
    CarouselView carouselView = findViewById(R.id.carouselView);
    
    carouselView.setSize(images.length);
    carouselView.setResource(R.layout.center_carousel_item);
    carouselView.setAutoPlay(true);
    carouselView.setIndicatorAnimationType(IndicatorAnimationType.THIN_WORM);
    carouselView.setCarouselOffset(OffsetType.CENTER);
    carouselView.setCarouselViewListener(new CarouselViewListener() {
      @Override
      public void onBindView(View view, int position) {
        // Example here is setting up a full image carousel
        ImageView imageView = view.findViewById(R.id.imageView);
        imageView.setImageDrawable(getResources().getDrawable(images[position]));
      }
    });
    // After you finish setting up, show the CarouselView
    carouselView.show();
  }
}
```

### Reference

> Read more [here](https://github.com/jama5262/CarouselView).
> Follows author [here](https://github.com/jama5262/).

## Solution 7: CarouselView

> A simple yet flexible library to add carousel view in your android application.

Here is the demo image:

<img src="/sample/src/main/assets/carousel_gif.gif" title="sample" width="500" height="460" />

### Step 1: Install it

Add the following in your `app/build.gradle`:

```groovy
implementation 'com.synnapps:carouselview:0.1.5'
```

### Step 2: Add to Layout

Add to layout:

```xml
    <com.synnapps.carouselview.CarouselView
        android:id="@+id/carouselView"
        android:layout_width="match_parent"
        android:layout_height="200dp"
        app:fillColor="#FFFFFFFF"
        app:pageColor="#00000000"
        app:radius="6dp"
        app:slideInterval="3000"
        app:strokeColor="#FF777777"
        app:strokeWidth="1dp"/>
```

### Step 3: Write Code

Write your Java/Kotlin code:

```java
public class SampleCarouselViewActivity extends AppCompatActivity {

    CarouselView carouselView;

    int[] sampleImages = {R.drawable.image_1, R.drawable.image_2, R.drawable.image_3, R.drawable.image_4, R.drawable.image_5};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample_carousel_view);

        carouselView = (CarouselView) findViewById(R.id.carouselView);
        carouselView.setPageCount(sampleImages.length);

        carouselView.setImageListener(imageListener);
    }

    ImageListener imageListener = new ImageListener() {
        @Override
        public void setImageForPosition(int position, ImageView imageView) {
            imageView.setImageResource(sampleImages[position]);
        }
    };

}
```

### Step 4:  Implementing custom view ```ViewListener```:


```java
public class SampleCarouselViewActivity extends AppCompatActivity {

    CarouselView customCarouselView;
    int NUMBER_OF_PAGES = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sample_carousel_view);

        customCarouselView = (CarouselView) findViewById(R.id.customCarouselView);
        customCarouselView.setPageCount(NUMBER_OF_PAGES);
        // set ViewListener for custom view 
        customCarouselView.setViewListener(viewListener);
    }

    ViewListener viewListener = new ViewListener() {
    
        @Override
        public View setViewForPosition(int position) {
            View customView = getLayoutInflater().inflate(R.layout.view_custom, null);
            //set view attributes here
            
            return customView;
        }
    };

```

### Step 5:  Touch Events

```java
customCarouselView.setImageClickListener(new ImageClickListener() {
            @Override
            public void onClick(int position) {
                Toast.makeText(SampleCarouselViewActivity.this, "Clicked item: "+ position, Toast.LENGTH_SHORT).show();
            }
        });
```

### Step 6: ProGuard 

Add this line to your proguard-rules.proif you are using proguard:

```groovy
-keep class com.synnapps.carouselview.** { *; }
```

### Reference

> Read more [here](https://github.com/sayyam/carouselview).
> Follow code author  [here](https://github.com/sayyam/caroselview).

## Solution 8: MotionLayoutCarousel

> A Simple Carousel built with MotionLayout.

here are demo GIFs:

![alt tag](https://raw.githubusercontent.com/faob-dev/MotionLayoutCarousel/master/screenshots/motion_layout.gif)

![alt tag](https://raw.githubusercontent.com/faob-dev/MotionLayoutCarousel/master/screenshots/motion_layout2.gif)

### Reference

Obtain code  [here](https://github.com/faob-dev/MotionLayoutCarousel).

## Solution 9: Turn Layout Manager

> A simple carousel for RecyclerView.

Here is the demo:

![Demo](https://github.com/cdflynn/turn-layout-manager/blob/master/app/img/turn_demo.gif?raw=true)

## How It Works

`TurnLayoutManager` uses the base functionality of `LinearLayoutManager` with some slight modifications.  Child views are positioned normally as `LinearLayoutManager` does, but they're offset along the rotation radius and peek distance.  This involves some trade offs.

##### Benefits:

- Automatically **supports predictive animations**, including mutations to radius and peek distance.
- Inherits stable support for different scroll directions and therefore can introduce support for `Gravity`.
- Does not attempt to re-solve the huge variety of edge cases that `LinearLayoutManager` already solves, and thus avoids re-introducing those exceptions.

##### Drawbacks:

- It's less efficient than a from-scratch implementation of `LayoutManager`.  Specifically, `TurnLayoutManager` will have a strictly longer layout pass than `LinearLayoutManager`, and for very heavyweight list rows it may drop a frame that `LinearLayoutManager` otherwise would not.  _No matter what layout manager you use, try to keep your item layouts efficient._  
- List items are not forced to adjust their position parallel to the scroll direction, only their perpendicular offset.  Items enter and leave the screen a bit faster than they would on a real turning surface, though the effect is subtle.

A full re-implementation of a new `LayoutManager` could potentially solve those drawbacks.  

### Step 1: Install it

Add the JitPack repository to your root `build.gradle`:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Add the dependency to your module's` build.gradle`:

```groovy
dependencies {
    implementation 'com.github.cdflynn:turn-layout-manager:v1.3.1'
}
```



### Step 2: Use it

Just create a new `TurnLayoutManager` using the constructor:
```java
TurnLayoutManager(context,              // provide a context
                  Gravity.START,        // from which direction should the list items orbit? 
                  Orientation.VERTICAL, // Is this a vertical or horizontal scroll?
                  radius,               // The radius of the item rotation
                  peek,                 // Extra offset distance
                  shouldRotate);        // should list items angle towards the center? true/false.
```

Just like a `LinearLayoutManager`, a `TurnLayoutManager` specifies an orientation, either `VERTICAL` or `HORIZONTAL` for vertical and horizontal scrolling respectively.  

In addition to orientation, supply a `Gravity` (either `START` or `END`).  Together, these define the axis of rotation.

```
Gravity.START
Orientation.VERTICAL

┏─────────┓
┃ x       ┃
┃  x      ┃
┃   x     ┃
┃   x     ┃
┃   x     ┃
┃  x      ┃
┃ x       ┃
┗─────────┛
```

```
Gravity.END
Orientation.VERTICAL
┏─────────┓
┃       x ┃
┃      x  ┃
┃     x   ┃
┃     x   ┃
┃     x   ┃
┃      x  ┃
┃       x ┃
┗─────────┛
     
```

```
Gravity.START
Orientation.HORIZONTAL
┏─────────┓
┃x       x┃
┃ x     x ┃
┃   xxx   ┃
┃         ┃
┃         ┃
┃         ┃
┃         ┃
┗─────────┛

```

```
Gravity.END
Orientation.HORIZONTAL
┏─────────┓
┃         ┃
┃         ┃
┃         ┃
┃         ┃
┃   xxx   ┃
┃ x     x ┃
┃x       x┃
┗─────────┛
```



### Reference

> Read more [here](https://github.com/cdflynn/turn-layout-manager).
> Follow code author [here](https://github.com/cdflynn/).


