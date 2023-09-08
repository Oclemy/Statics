# Expandable ConstraintLayout

>  An expandable/collapsible implementation of a ConstraintLayout.

![Expandable ConstraintLayout Tutorial](https://camo.githubusercontent.com/74e74cf99d33f45b650dacbcf74d3cc3506557eb2f3b6ec865d587c91d95d89e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f43757272656e7425323056657273696f6e2d312e302e302d627269676874677265656e2e737667)

![Expandable ConstraintLayout Tutorial](https://camo.githubusercontent.com/105c23336e8cf46d018408c686ffcd412c050e8d57d6d59c41f702033d8782b1/68747470733a2f2f6a69747061636b2e696f2f762f726a737669656972612f657870616e6461626c65436f6e73747261696e744c61796f75742e737667)

![Expandable ConstraintLayout Tutorial](https://camo.githubusercontent.com/5d292342681f44140cb759d227670d42ed743ebfd7445b12ad5d8b16640c5167/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d696e53646b56657273696f6e2532302d31342d626c75652e737667)

![Expandable ConstraintLayout Tutorial](https://github.com/rjsvieira/expandableConstraintLayout/raw/master/images/expconslayout.gif)

```groovy
allprojects {
  repositories {
  ...
  maven { url 'https://jitpack.io' }
  }
}
```


```groovy
dependencies {
  implementation 'com.github.rjsvieira:expandableConstraintLayout:1.0.0'
}
```

Initialize your `ExpandaConstraintLayout` just like any other `ConstraintLayout`

```java
ExpandableConstraintLayout ecl = (ExpandableConstraintLayout) findViewById(R.id.ecl);
```


```java
void setInterpolator(TimeInterpolator interpolator)
void setAnimationDuration(int animationDuration)
```


```java
void toggle()
void expand()
void collapse()
```

The ExpandableConstraintLayout allows the implementation of a listener :

```kotlin
setAnimationListener(@NonNull ExpandableConstraintLayoutListener listener)
```

This listener will track the following events :

```java
/**
* Notifies the start of the animation.
* Sync from android.animation.Animator.AnimatorListener.onAnimationStart(Animator animation)
*/
void onAnimationStart(ExpandableConstraintLayoutStatus status);

/**
* Notifies the end of the animation.
* Sync from android.animation.Animator.AnimatorListener.onAnimationEnd(Animator animation)
*/
void onAnimationEnd(ExpandableConstraintLayoutStatus status);

/**
* Notifies the layout is going to open.
*/
void onPreOpen();

/**
* Notifies the layout is going to equal close size.
*/
void onPreClose();

/**
* Notifies the layout opened.
*/
void onOpened();

/**
* Notifies the layout size equal closed size.
*/
void onClosed();
```


### Reference

|No.|Link|
|----|-----|
|1.|Read more [here](https://github.com/rjsvieira/expandableConstraintLayout).|
|2.|Follow code author [here](https://github.com/rjsvieira).|
