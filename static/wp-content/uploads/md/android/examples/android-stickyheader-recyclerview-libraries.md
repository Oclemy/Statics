# StickyHeader RecyclerView Libraries


There are several options for adding sticky headers in a recyclerview in android. In this article we want to look at some of them with code samples.


### (a). SmartHeaderFooterRecyclerView

Easy implements Header & Footer view, Support Liner、Grid、StaggeredLayoutManager, With least modify！

![](https://camposha.info/wp-content/uploads/2020/12/stickyheader.png)

Here are its features:

1. No need change anyting with your target adapter
2. It does not interfere with your target adapter position.
3. It Supports dynamic addition and removal.
4. Supports LinearLayoutManager & GridLayoutManager and StaggeredLayoutManager
5. No dependencies code build order

**Step 1: Installation**

Add the library to your project build.gradle:

```groovy
implementation 'com.songhang:smart-headerfooter-recyclerview:1.0.1'
```

**Step 2: Code**

Here is how we use it:

```java
    RecyclerView.Adapter targetAdapter = new RecyclerView.Adapter() { ... };
      SmartRecyclerAdapter smartRecyclerAdapter = new SmartRecyclerAdapter(targetAdapter);
      smartRecyclerAdapter.setFooterView(footerView);
      smartRecyclerAdapter.setHeaderView(headerView);
      recyclerView.setAdapter(smartRecyclerAdapter);
```

**Links**

1. Download the code from [here](https://github.com/songhanghang/Smart-HeaderFooter-RecyclerView).
2. Follow the author from [here](https://github.com/songhanghang/).

### (b). ShrinkingImageLayout

Android layout with an header image sensible to scroll and touch events.

![](https://camposha.info/wp-content/uploads/2020/12/shrinkingimagelayout.gif)

**Step 1: Installation**

Install it from jitpack:

```groovy
allprojects {
  repositories {
    ...
    maven { url "https://jitpack.io" }
  }
}
```

Then:

```groovy
implementation 'com.github.PierfrancescoSoffritti:ShrinkingImageLayout:0.4'
```

**Step 2: Layout**

Add XML Layout:

```xml
<com.pierfrancescosoffritti.shrinkingimagelayout.ShrinkingImageLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/shrinking_image_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

**Step 3: Code**

Then in your code:

```java
shrinkingImageLayout.setupRecyclerView(new RecyclerView(this), new LinearLayoutManager(this), new Adapter(getData()));
```

To add a header on your recyclerview call the method below:

```java
shrinkingImageLayout.addCustomHeader(header);
```

The header can be any View object.

To get a reference to the header imageview:

```java
shrinkingImageLayout.getImageView();
```

On API 21+ the ImageView automatically handles its Z animation when scrolled and touched.

**Links**

1. Download code [here](https://github.com/PierfrancescoSoffritti/ShrinkingImageLayout).
2. Follow library author [here](https://github.com/PierfrancescoSoffritti/).

### (c). StickyHeaders

Adapter and LayoutManager for Android RecyclerView which enables sticky header positioning. StickyHeaders are section headers in a RecyclerView which are positioned "stickily" to the top of the scrollview during scrolling. A common use-case is an address book where the list of people's last names are grouped into sections by the first letter of the last name, and the header for each section shows that letter..

StickyHeaders uses androidx.recyclerview.\* You can use sectioning adapter with a normal androidx.recyclerview.widget.LinearLayoutManager. it works fine, and could be a good way to implement a list like at the root of Android's Settings app.

![](https://camposha.info/wp-content/uploads/2020/12/stickyheaders_callbacks.gif)

**Step 1: Installation**

Install the library using the following statement:

```groovy
implementation 'org.zakariya.stickyheaders:stickyheaders:0.7.10'
```

**Step 2: Code**

To use StickyHeaders, you need to do two things.

1. Implement an adapter by subclassing `org.zakariya.stickyheaders.SectioningAdapter`.
2. Assign a `org.zakariya.stickyheaders.StickyHeaderLayoutManager` to your recyclerview.
3. When handling modifications to your dataset, never call the`RecyclerView.Adapter::notify` methods, instead, call the corresponding methods in `org.zakariya.stickyheaders.SectioningAdapter::notifySection`. The reason for this is SectioningAdapter maintains internal state, and the `notifySection` methods are tailored for adding and removing sections, adding and removing items from sections, etc.

**Links**

1. Download code [here](https://github.com/ShamylZakariya/StickyHeaders).
2. Follow library author [here](https://github.com/ShamylZakariya).
