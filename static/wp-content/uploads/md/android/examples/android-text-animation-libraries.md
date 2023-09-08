# Text Animations


So you are developing your app and you have the space for alittle modernization. How about animating some of your text? Well this is what this tutorial is dedicated for. We want to see how to animate texts in android.


## (a). TextSurface

> A little animation framework which could help you to show message in a nice looking way.

Here's an example:

![Android Text Animation](https://github.com/elevenetc/TextSurface/raw/master/docs/demo.gif)

### Step 1: Install TextSurface

First add jitpack as a maven url in your allProjects closure in the project-level build.gradle file:

```groovy
 maven { url "https://jitpack.io" }
```

Then specify the dependency in the build.gradle file:

```groovy
implementation 'com.github.elevenetc:textsurface:0.9.1'
```

### Step 2: Add to Layout

The next step is to add TextSurface to your XML layout:

```xml
<su.levenetc.android.textsurface.TextSurface
        android:id="@+id/text_surface"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```

### Step 3: Write Code

- Create [`TextSurface`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/TextSurface.java) instance or add it in your layout.
- Create [`Text`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/Text.java) instancies with [`TextBuilder`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/TextBuilder.java) defining appearance of text and position:

```java
Text textDaai = TextBuilder
        .create("Daai")
        .setSize(64)
        .setAlpha(0)
        .setColor(Color.WHITE)
        .setPosition(Align.SURFACE_CENTER).build();
```

Create animations and pass them to the [`TextSurface`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/TextSurface.java) instance:

```java
textSurface.play(
        new Sequential(
                Slide.showFrom(Side.TOP, textDaai, 500),
                Delay.duration(500),
                Alpha.hide(textDaai, 1500)
        )
);
```

### Adjusting animations

- To play animations sequentially use [`Sequential.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/Sequential.java)
    
- To play animations simultaneously use [`Parallel.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/Parallel.java)
    
- Animations/effects could be combined like this:
    
    ```java
    new Parallel(Alpha.show(textA, 500), ChangeColor.to(textA, 500, Color.RED))
    ```
    
    i.e. alpha and color of text will be changed simultaneously in 500ms
    

### Adding your own animations/effects

There're two basic classes which you could extend to add custom animation:

- [`AbstractSurfaceAnimation.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/AbstractSurfaceAnimation.java) to animate basic parameters like `alpha`, `translation`, `scale` and others. (See [`Alpha.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/Alpha.java) or [`ChangeColor.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/ChangeColor.java))
- [`ITextEffect.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/interfaces/ITextEffect.java) interface which could be used for more complex animations. (See [`Rotate3D.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/Rotate3D.java) or [`ShapeReveal.java`](https://github.com/elevenetc/TextSurface/blob/master/library/src/main/java/su/levenetc/android/textsurface/animations/ShapeReveal.java))

### [](#proguard-configuration)Proguard configuration

The framework is based on standard android animation classes which uses `reflection` extensively. To avoid obfuscation you need to exclude classes of the framework:

```groovy
-keep class su.levenetc.android.textsurface.** { *; }
```

### Example

**Text Scaling Example**

Here is an example that scales text:

```java
public class ScaleTextSample {
    public static void run(TextSurface textSurface) {
//      Text textA = TextBuilder.create("oat cake")
////                .setScale(2.0f, Pivot.RIGHT)
//              .build();
//
//      textSurface.play(TYPE.SEQUENTIAL,
//              //Just.show(textA)
//              new Scale(textA, 1000, 0.1f, 1.5f, Pivot.RIGHT)
//      );

        Text textA = TextBuilder.create("textA")
//              .setPosition(Align.SURFACE_CENTER)
                .build();

        Text textB = TextBuilder.create("textB")
                .setPosition(Align.LEFT_OF, textA)
                .build();

        Text textC = TextBuilder.create("textC")
                .setPosition(Align.RIGHT_OF, textA)
                .build();

        Text textD = TextBuilder.create("textD")
                .setPosition(Align.LEFT_OF, textB)
                .build();

        Text textE = TextBuilder.create("textE")
                .setPosition(Align.RIGHT_OF, textC)
                .build();

        textSurface.play(TYPE.PARALLEL,
                Just.show(textA, textB),
                new Sequential(new Scale(textA, 1000, 1, 2, Pivot.CENTER), new Scale(textA, 1000, 2, 1, Pivot.CENTER))
//              new Parallel(new Scale(textA, 500, 1.5f, 1f, Pivot.LEFT), new Scale(textA, 500, 1, 1.5f, Pivot.LEFT)),
//              new Sequential(Delay.duration(250), new Parallel(new Scale(textB, 500, 1.5f, 1f, Pivot.LEFT), new Scale(textB, 500, 1, 1.5f, Pivot.LEFT))),
//              new Sequential(Delay.duration(500), new Parallel(new Scale(textC, 500, 1.5f, 1f, Pivot.LEFT), new Scale(textC, 500, 1, 1.5f, Pivot.LEFT))),
//              new Sequential(Delay.duration(750), new Parallel(new Scale(textD, 500, 1.5f, 1f, Pivot.LEFT), new Scale(textD, 500, 1, 1.5f, Pivot.LEFT)))
        );
    }
}
```

**SurfaceScale example**

Here is a surface scale example:

```java
public class SurfaceScaleSample {
    public static void play(TextSurface textSurface) {

        Text textA = TextBuilder.create("How are you?").setPosition(Align.SURFACE_CENTER).build();
        Text textB = TextBuilder.create("Would you mind?").setPosition(Align.BOTTOM_OF | Align.CENTER_OF, textA).build();
        Text textC = TextBuilder.create("Yes!").setPosition(Align.BOTTOM_OF | Align.CENTER_OF, textB).build();

        textSurface.play(TYPE.SEQUENTIAL,
                Alpha.show(textA, 500),
                new AnimationsSet(TYPE.PARALLEL,
                        new AnimationsSet(TYPE.PARALLEL, Alpha.show(textB, 500), Alpha.hide(textA, 500)),
                        new ScaleSurface(500, textB, Fit.WIDTH)
                ),
                Delay.duration(1000),
                new AnimationsSet(TYPE.PARALLEL,
                        new AnimationsSet(TYPE.PARALLEL, Alpha.show(textC, 500), Alpha.hide(textB, 500)),
                        new ScaleSurface(500, textC, Fit.WIDTH)
                )
        );
    }
}
```

**3D Rotation Example**

Here is an example of 3D text rotation:

```java
public class Rotation3DSample {
    public static void play(TextSurface textSurface) {
        Text textA = TextBuilder.create("How are you?").setPosition(Align.SURFACE_CENTER).build();
        Text textB = TextBuilder.create("I'm fine! And you?").setPosition(Align.SURFACE_CENTER, textA).build();
        Text textC = TextBuilder.create("Haaay!").setPosition(Align.SURFACE_CENTER, textB).build();
        int duration = 2750;

        textSurface.play(TYPE.SEQUENTIAL,
                new AnimationsSet(TYPE.SEQUENTIAL,
                        Rotate3D.showFromCenter(textA, duration, Direction.CLOCK, Axis.X),
                        Rotate3D.hideFromCenter(textA, duration, Direction.CLOCK, Axis.Y)
                ),
                new AnimationsSet(TYPE.SEQUENTIAL,
                        Rotate3D.showFromSide(textB, duration, Pivot.LEFT),
                        Rotate3D.hideFromSide(textB, duration, Pivot.RIGHT)
                ),
                new AnimationsSet(TYPE.SEQUENTIAL,
                        Rotate3D.showFromSide(textC, duration, Pivot.TOP),
                        Rotate3D.hideFromSide(textC, duration, Pivot.BOTTOM)
                )
        );
    }
}
```

Find a full example [here](https://github.com/elevenetc/TextSurface/tree/master/app).

### Reference

Find complete reference [here](https://github.com/elevenetc/TextSurface).

## (b). Ticker

> An Android text view with scrolling text change animation.

![Android Text Ticker](https://github.com/robinhood/ticker/raw/master/assets/ticker_main.gif)

Ticker is a simple Android UI component for displaying scrolling text. Think about how an odometer scrolls when going from one number to the next, that is similar to what Ticker does. The Ticker handles smooth animations between strings and also string resizing (e.g. animate from "9999" to "10000").

You can specify how the animations proceed by defining an array of characters in order. Each character displayed by Ticker is controlled by this array which dictates how to animate from a starting character to a target character. For example, if you just use a basic ASCII character list, when animating from 'A' to 'Z', it will go from 'A' -> 'B' -> ... 'Z'. We will perform wrap-around animation when it's faster (e.g. 'Z' to 'A' will just animate 'Z' -> 'A').

Here's how to use it.

### Step 1: Install it

Install it using the following implementation statement:

```groovy
implementation 'com.robinhood.ticker:ticker:2.0.2'
```

### Step 2: Add to Layout

After installation you need to add it to your xml layout as follows:

```xml
<com.robinhood.ticker.TickerView
    android:id="@+id/tickerView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### Step 3: Use it in Code

Then in your java or kotlin code you use like below:

```java
final TickerView tickerView = findViewById(R.id.tickerView);
tickerView.setCharacterLists(TickerUtils.provideNumberList());
```

**How to Customize**

It has basic customization attributes for example:

```xml
android:gravity="center"
android:textColor="@color/colorPrimary"
android:textSize="16sp"
app:ticker_animationDuration="1500"
app:ticker_preferredScrollingDirection="any"
```

Or tocustomize it programmatically:

```java
tickerView.setTextColor(textColor);
tickerView.setTextSize(textSize);
tickerView.setTypeface(myCustomTypeface);
tickerView.setAnimationDuration(500);
tickerView.setAnimationInterpolator(new OvershootInterpolator());
tickerView.setGravity(Gravity.START);
tickerView.setPreferredScrollingDirection(TickerView.ScrollingDirection.ANY);
```

### Example

Find full example [here](https://github.com/robinhood/ticker/tree/master/ticker-sample)

### Reference

| No. | Link |
| --- | --- |
| 1. | [Example](https://github.com/robinhood/ticker/tree/master/ticker-sample) |
| 2. | [Reference](https://github.com/robinhood/ticker) |
| 3. | [Author](https://github.com/robinhood) |

## (c). CountAnimationTextView

> A tiny Android library makes very easier count animation of TextView.

Here is the demo:

![Counter TextView](https://github.com/MasayukiSuda/CountAnimationTextView/raw/master/art/demo.gif)

Let's proceed and see how to use this CounterAnimationTextView

### Step 1: Install it

Install it using the following implementation statement:

```groovy
implementation 'com.daasuu:CountAnimationTextView:0.1.2'
```

### Step 2: Add to Layout

The next step after installation is to add it to your XML layout:

```xml
    <com.daasuu.cat.CountAnimationTextView
        android:id="@+id/count_animation_textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        />
```

### Step 3: Write Code

The first step is to reference the widget from the layout:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mCountAnimationTextView = (CountAnimationTextView) findViewById(R.id.count_animation_textView);
    }
```

Now you can animate with duration as follows:

```java
    mCountAnimationTextView
        .setAnimationDuration(5000)
        .countAnimation(0, 99999);
```

Or with a decimal format as follows:

```java
    mCountAnimationTextView
        .setDecimalFormat(new DecimalFormat("###,###,###"))
        .setAnimationDuration(10000)
        .countAnimation(0, 9999999);
```

To animate with an interpolator:

```java
    mCountAnimationTextView
        .setInterpolator(new AccelerateInterpolator())
        .countAnimation(0, 9999999);
```

### Example

Here is a full example. Start by installing the library as has been discussed.

**activity_main.xml**

Now design the main activity layout as follows;

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.daasuu.countanimationtextview.MainActivity">

    <Button
        android:id="@+id/btn_count_anim_0"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="count up 0 to 99999"
        android:textAllCaps="false" />

    <Button
        android:id="@+id/btn_count_anim_1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="count down 99999 to 0"
        android:textAllCaps="false" />

    <Button
        android:id="@+id/btn_count_anim_2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="count up 0 to 9999999 with \nDemicalFormat of '###,###,###'"
        android:textAllCaps="false" />

    <com.daasuu.cat.CountAnimationTextView
        android:id="@+id/count_animation_textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        android:textSize="32sp" />
</LinearLayout>
```

**MainActivity.java**

Now come and write your java code as follows:

```java
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.daasuu.cat.CountAnimationTextView;

import java.text.DecimalFormat;

public class MainActivity extends AppCompatActivity {

    private CountAnimationTextView mCountAnimationTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mCountAnimationTextView = (CountAnimationTextView) findViewById(R.id.count_animation_textView);

        Button button0 = (Button) findViewById(R.id.btn_count_anim_0);
        button0.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mCountAnimationTextView
                        .setAnimationDuration(5000)
                        .countAnimation(0, 99999);
            }
        });

        Button button1 = (Button) findViewById(R.id.btn_count_anim_1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mCountAnimationTextView
                        .setAnimationDuration(5000)
                        .countAnimation(99999, 0);
            }
        });

        Button button2 = (Button) findViewById(R.id.btn_count_anim_2);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mCountAnimationTextView
                        .setDecimalFormat(new DecimalFormat("###,###,###"))
                        .setAnimationDuration(10000)
                        .countAnimation(0, 9999999);
            }
        });

        mCountAnimationTextView.setCountAnimationListener(new CountAnimationTextView.CountAnimationListener() {
            @Override
            public void onAnimationStart(Object animatedValue) {
                // do nothing
            }

            @Override
            public void onAnimationEnd(Object animatedValue) {
                mCountAnimationTextView.clearDecimalFormat();
            }
        });

    }
}
```

### Reference

Find the download links below:

| No. | Link |
| --- | --- |
| 1. | [Browse](https://github.com/MasayukiSuda/CountAnimationTextView/tree/master/sample) Example |
| 2. | [Read](https://github.com/MasayukiSuda/CountAnimationTextView/) more |
| 3. | [Follow](https://github.com/MasayukiSuda/) code author |
