# ZoomRecylerLayout

>  Zoom Recycler Layout Manager For Android Kotlin.

A beautiful Zoom Animation Library for RecyclerView Items in Android using Kotlin.

### Preview

Here are the GIF screenshots:

![ZoomRecylerLayout Example Tutorial](https://github.com/Spikeysanju/ZoomRecylerLayout/raw/master/horizontal_scroll.gif)

![ZoomRecylerLayout Example Tutorial](https://github.com/Spikeysanju/ZoomRecylerLayout/raw/master/horizontal_scroll.gif)

![ZoomRecylerLayout Example Tutorial](https://github.com/Spikeysanju/ZoomRecylerLayout/raw/master/vertical_scroll.gif)

Use it by following these steps:

### Step 1: Add as a Dependency

Step 1. Add the JitPack repository to your build file
Add it in your root build.gradle at the end of repositories:

```groovy
allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
```


Then Add dependency in your app module:

```groovy
dependencies {
	        implementation 'com.github.Spikeysanju:ZoomRecylerLayout:1.0'
	}
```


### Step 2: Usage

Initialize the layoutManager:


```kotlin
val linearLayoutManager = ZoomRecyclerLayout(this)
```


### Detailed Usage


```kotlin
val linearLayoutManager = ZoomRecyclerLayout(this)
        linearLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        linearLayoutManager.reverseLayout = true
        linearLayoutManager.stackFromEnd = true
        recyclerView.layoutManager = linearLayoutManager // Add your recycler view to this ZoomRecycler layout
```


### Orientation Types


```kotlin
linearLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        linearLayoutManager.orientation = LinearLayoutManager.VERTICAL
```


### Use SnapHelper for Auto Center Views


```kotlin
val snapHelper = LinearSnapHelper()
        snapHelper.attachToRecyclerView(recyclerView) // Add your recycler view here
        recyclerView.isNestedScrollingEnabled = false
```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/ZoomRecylerLayout/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/ZoomRecylerLayout).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
