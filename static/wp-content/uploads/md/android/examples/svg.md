# SVG View Examples and Libraries


In this tutorial you will learn about how to view SVG in android as well as libraries associated with it.


### What is SVG?

> Scalable Vector Graphics is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium since 1999. SVG images are defined in a vector graphics format and stored in XML text files.

Here are the libraries with examples of how to use them:

## (a). AnimatedSvgView

> AnimatedSvgView is an animated SVG Drawing for Android.

It's used to view animated SVG files in android.

Here is a demo of it in use:

![](https://github.com/jaredrummler/AnimatedSvgView/raw/master/demo/demo.gif)

### Step 1: Install it

Here are the option for installing this library:

First, you can download [the latest AAR](https://repo1.maven.org/maven2/com/jaredrummler/animated-svg-view/1.0.6/animated-svg-view-1.0.6.aar) or grab via Gradle by adding the following implementation statement in your app-level `build.gradle` file:

```groovy
implementation 'com.jaredrummler:animated-svg-view:1.0.6'
```

You can also fetch this library via Maven. Add the following in your pom dot xml file:

```xml
<dependency>
  <groupId>com.jaredrummler</groupId>
  <artifactId>animated-svg-view</artifactId>
  <version>1.0.6</version>
  <type>aar</type>
</dependency>
```

### Step 2: Use it

Using Animated SVG View is easy. First define a string array. Then add the SVG path data to it:

```xml
<string-array name="google_glyph_strings">
  <item>M142.9,24.2C97.6,39.7,59,73.6,37.5,116.5c-7.5,14.8-12.9,30.5-16.2,46.8c-8.2,40.4-2.5,83.5,16.1,120.3   c12.1,24,29.5,45.4,50.5,62.1c19.9,15.8,43,27.6,67.6,34.1c31,8.3,64,8.1,95.2,1c28.2-6.5,54.9-20,76.2-39.6   c22.5-20.7,38.6-47.9,47.1-77.2c9.3-31.9,10.5-66,4.7-98.8c-58.3,0-116.7,0-175,0c0,24.2,0,48.4,0,72.6c33.8,0,67.6,0,101.4,0   c-3.9,23.2-17.7,44.4-37.2,57.5c-12.3,8.3-26.4,13.6-41,16.2c-14.6,2.5-29.8,2.8-44.4-0.1c-14.9-3-29-9.2-41.4-17.9   c-19.8-13.9-34.9-34.2-42.6-57.1c-7.9-23.3-8-49.2,0-72.4c5.6-16.4,14.8-31.5,27-43.9c15-15.4,34.5-26.4,55.6-30.9   c18-3.8,37-3.1,54.6,2.2c15,4.5,28.8,12.8,40.1,23.6c11.4-11.4,22.8-22.8,34.2-34.2c6-6.1,12.3-12,18.1-18.3   c-17.3-16-37.7-28.9-59.9-37.1C228.2,10.6,183.2,10.3,142.9,24.2z</item>
  <item>M142.9,24.2c40.2-13.9,85.3-13.6,125.3,1.1c22.2,8.2,42.5,21,59.9,37.1c-5.8,6.3-12.1,12.2-18.1,18.3    c-11.4,11.4-22.8,22.8-34.2,34.2c-11.3-10.8-25.1-19-40.1-23.6c-17.6-5.3-36.6-6.1-54.6-2.2c-21,4.5-40.5,15.5-55.6,30.9    c-12.2,12.3-21.4,27.5-27,43.9c-20.3-15.8-40.6-31.5-61-47.3C59,73.6,97.6,39.7,142.9,24.2z</item>
  <item>M21.4,163.2c3.3-16.2,8.7-32,16.2-46.8c20.3,15.8,40.6,31.5,61,47.3c-8,23.3-8,49.2,0,72.4    c-20.3,15.8-40.6,31.6-60.9,47.3C18.9,246.7,13.2,203.6,21.4,163.2z</item>
  <item>M203.7,165.1c58.3,0,116.7,0,175,0c5.8,32.7,4.5,66.8-4.7,98.8c-8.5,29.3-24.6,56.5-47.1,77.2    c-19.7-15.3-39.4-30.6-59.1-45.9c19.5-13.1,33.3-34.3,37.2-57.5c-33.8,0-67.6,0-101.4,0C203.7,213.5,203.7,189.3,203.7,165.1z</item>
  <item>M37.5,283.5c20.3-15.7,40.6-31.5,60.9-47.3c7.8,22.9,22.8,43.2,42.6,57.1c12.4,8.7,26.6,14.9,41.4,17.9    c14.6,3,29.7,2.6,44.4,0.1c14.6-2.6,28.7-7.9,41-16.2c19.7,15.3,39.4,30.6,59.1,45.9c-21.3,19.7-48,33.1-76.2,39.6    c-31.2,7.1-64.2,7.3-95.2-1c-24.6-6.5-47.7-18.2-67.6-34.1C67,328.9,49.6,307.5,37.5,283.5z</item>
</string-array>
```

Next add the colors for each path in an integer-array:

```xml
<color name="google_red">#EA4335</color>
<color name="google_yellow">#FBBC05</color>
<color name="google_blue">#4285F4</color>
<color name="google_green">#34A853</color>

<integer-array name="google_glyph_colors">
  <item>@android:color/white</item>
  <item>@color/google_red</item>
  <item>@color/google_yellow</item>
  <item>@color/google_blue</item>
  <item>@color/google_green</item>
</integer-array>
```

Now add the animated SVG view to your XML layout:

```xml
<com.jaredrummler.android.widget.AnimatedSvgView
    android:id="@+id/animated_svg_view"
    android:layout_width="180dp"
    android:layout_height="180dp"
    android:layout_gravity="center"
    android:layout_marginBottom="25dp"
    app:animatedSvgFillColors="@array/google_glyph_colors"
    app:animatedSvgGlyphStrings="@array/google_glyph_strings"
    app:animatedSvgFillStart="1200"
    app:animatedSvgFillTime="1000"
    app:animatedSvgImageSizeX="400"
    app:animatedSvgImageSizeY="400"
    app:animatedSvgTraceTime="2000"
    app:animatedSvgTraceTimePerGlyph="1000"/>
```

Finally reference the Animated SVG view from your Java or Kotlin code. Then invoke the start() function:

```java
AnimatedSvgView svgView = (AnimatedSvgView) findViewById(R.id.animated_svg_view);
svgView.start();
```

You can also set SVG glyphs and colors dynamically (see the demo).

### Full Example

Here is a full example. You will find the code for layouts in the download.

We have two classes:

\***SVG.java**

This class will contain some SVG data. These data will then be rendered in the animated SVG view. Just create a file known as SVG dot java and add the following code:

```java
package com.jaredrummler.android.animatedsvgview.demo;

import android.graphics.Color;

/**
 * Some SVGs to play with
 */
public enum SVG {
  GOOGLE(
      new String[]{
          "M142.9,24.2c40.2-13.9,85.3-13.6,125.3,1.1c22.2,8.2,42.5,21,59.9,37.1c-5.8,6.3-12.1,12.2-18.1,18.3 c-11.4,11.4-22.8,22.8-34.2,34.2c-11.3-10.8-25.1-19-40.1-23.6c-17.6-5.3-36.6-6.1-54.6-2.2c-21,4.5-40.5,15.5-55.6,30.9 c-12.2,12.3-21.4,27.5-27,43.9c-20.3-15.8-40.6-31.5-61-47.3C59,73.6,97.6,39.7,142.9,24.2z",
          "M21.4,163.2c3.3-16.2,8.7-32,16.2-46.8c20.3,15.8,40.6,31.5,61,47.3c-8,23.3-8,49.2,0,72.4 c-20.3,15.8-40.6,31.6-60.9,47.3C18.9,246.7,13.2,203.6,21.4,163.2z",
          "M203.7,165.1c58.3,0,116.7,0,175,0c5.8,32.7,4.5,66.8-4.7,98.8c-8.5,29.3-24.6,56.5-47.1,77.2 c-19.7-15.3-39.4-30.6-59.1-45.9c19.5-13.1,33.3-34.3,37.2-57.5c-33.8,0-67.6,0-101.4,0C203.7,213.5,203.7,189.3,203.7,165.1z",
          "M37.5,283.5c20.3-15.7,40.6-31.5,60.9-47.3c7.8,22.9,22.8,43.2,42.6,57.1c12.4,8.7,26.6,14.9,41.4,17.9 c14.6,3,29.7,2.6,44.4,0.1c14.6-2.6,28.7-7.9,41-16.2c19.7,15.3,39.4,30.6,59.1,45.9c-21.3,19.7-48,33.1-76.2,39.6 c-31.2,7.1-64.2,7.3-95.2-1c-24.6-6.5-47.7-18.2-67.6-34.1C67,328.9,49.6,307.5,37.5,283.5z"
      },
      new int[]{
          0xFFEA4335,
          0xFFFBBC05,
          0xFF4285F4,
          0xFF34A853
      },
      400, 400
  ),
  GITHUB(
      new String[]{
          "M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"
      },
      new int[]{
          Color.BLACK
      },
      512, 512
  ),
  TWITTER(
      new String[]{
          "m 1999.9999,192.4 c -73.58,32.64 -152.67,54.69 -235.66,64.61 84.7,-50.78 149.77,-131.19 180.41,-227.01 -79.29,47.03 -167.1,81.17 -260.57,99.57 C 1609.3399,49.82 1502.6999,0 1384.6799,0 c -226.6,0 -410.328,183.71 -410.328,410.31 0,32.16 3.628,63.48 10.625,93.51 -341.016,-17.11 -643.368,-180.47 -845.739,-428.72 -35.324,60.6 -55.5583,131.09 -55.5583,206.29 0,142.36 72.4373,267.95 182.5433,341.53 -67.262,-2.13 -130.535,-20.59 -185.8519,-51.32 -0.039,1.71 -0.039,3.42 -0.039,5.16 0,198.803 141.441,364.635 329.145,402.342 -34.426,9.375 -70.676,14.395 -108.098,14.395 -26.441,0 -52.145,-2.578 -77.203,-7.364 52.215,163.008 203.75,281.649 383.304,284.946 -140.429,110.062 -317.351,175.66 -509.5972,175.66 -33.1211,0 -65.7851,-1.949 -97.8828,-5.738 181.586,116.4176 397.27,184.359 628.988,184.359 754.732,0 1167.462,-625.238 1167.462,-1167.47 0,-17.79 -0.41,-35.48 -1.2,-53.08 80.1799,-57.86 149.7399,-130.12 204.7499,-212.41"
      },
      new int[]{
          0xFF00ACED
      },
      2000, 1625.36f
  ),
  JRUMMY_APPS(
      new String[]{
          "M457.9,91.1c0-0.8,0-1.7,0-2.5c-0.1-5.9-0.8-11.9-2-17.7c-5.4-25-20.2-41.4-45.7-46.4c-10.3-2-21.2-2.4-31.8-2.4c-82.8-0.2-165.7-0.1-248.5,0c-7.6,0-15.4,0.1-22.9,1.3c-33,5-53.5,27.2-54,62.7c0,0.6,0,1.1,0,1.7c0,56.6,0,113.2,0,169.8h0v0.4c0,34.6,0,69.3,0.1,103.9c0,5.3,0.5,10.7,1.5,15.8c6.8,31.9,34.9,51.6,67.3,47.2c6.1-0.8,12.1-2.4,17.9-4.2c3.4-1.1,6.5-3.7,5.8-7.8c-0.8-4.3-4.7-3.8-8.1-3.9c-10.6-0.6-21.4-0.5-31.8-2.2c-18.1-3-30.1-13.6-33.8-32.1c-1.5-7.5-2.7-15.1-2.8-22.7c-0.1-31.3-0.1-62.7-0.1-94v-0.4c0-43.2,0-86.5,0-129.7c0-10.6,0.1-21.2,0.5-31.8c0.1-3.5,0.3-7.1,0.5-10.6c0.3-5.2,1.2-10.2,2.7-14.9c0.4-1.2,0.8-2.3,1.3-3.5c2.7-6.4,7-12.1,13.2-16.8c9.6-7.1,20.9-9.6,32.5-9.7c22.6-0.3,45.2-0.1,67.8-0.1c54.1,0,108.2-0.1,162.4,0.1c17.3,0,34.7-0.2,51.9,1.2c22.7,1.8,38.7,19.4,39,41.4c0.4,29,0.9,57.9,0.9,86.9c0,29.2-0.2,58.4-0.3,87.6v0.4c-0.2,33.2-0.4,66.4-0.5,99.6c0,2.5,0,5,0,7.5c-0.1,24.5-18.1,43.7-42.5,43.9c-48.5,0.4-97,0.2-145.5,0.1c-6.9,0-11.2-3.3-12-10.2c-0.7-6.9,0-13.9-0.1-20.8c-0.3-24-0.6-48-1-71.9c-0.1-4.1-0.5-8.3-1.4-12.4c-1.9-9.4-7-14.8-16.5-15.5c-13.9-1-27.9-1.1-41.9-1c-6.1,0-9.7,3.6-10.2,9.7c-0.6,7.4-0.1,14.9-0.2,22.3c-0.3,31-0.5,61.9-0.9,92.9c-0.1,9.6-3.1,18.6-9.7,25.7c-15.7,16.9-35.3,23.2-58,18.6c-12.4-2.5-23.3-8.7-33.9-15.4c-2.2-1.4-4.5-3.4-6.6,0.1c0.1,0.4,0.2,0.8,0.4,1c5.1,5.5,10.3,10.9,15.3,16.5c24.9,28.2,55.4,42.8,93.5,37.3c28.5-4.1,49.9-18.7,62-45.4c2.3-5.1,5.5-8.9,10.5-10.7c5.1-1.8,10.5-3.6,15.9-3.6c47.6-0.6,95.3-0.5,142.9-1.3c15.4-0.3,29.3-5.8,40.3-17.3c12.2-12.7,16.4-28.6,16.4-45.4c0.1-34.8,0.2-69.6,0.2-104.3C458.1,202.3,458,146.7,457.9,91.1z M292.2,246.5c-5.3,4.1-11.1,7.4-17.3,11.4h-0.6c-0.2,0.1-0.4,0.2-0.6,0.4c3.8,5,7.4,9.8,11.2,14.4c18.4,22.4,34.6,46,45.9,72.9c4.9,11.5,10.7,22.6,16,33.9c2.3,4.9,6.1,8.4,11.5,8.4c14,0,27.9-0.3,41.9-1.3c8.5-0.6,13.9-6,15.5-14.6c0.8-4.1,1.2-8.3,1.2-12.4c0-33.9,0-67.8,0-101.7v-0.4c0-55.5,0-111,0-166.6c0-4-0.4-8-1.1-11.9c-1.2-6.6-4.9-11.5-11.8-12.6c-6.4-1-12.8-1.9-19.3-1.9c-79.3-0.1-158.7-0.1-238,0c-10.3,0-20.6,0.5-30.9,1C106,65.9,100,71.1,99.1,80c-0.7,6.8-0.7,13.6-1.2,20.4c-0.3,4.1,1.6,5,5.3,5c36,0.2,72,0.2,107.9,1.2c16.9,0.5,34,1.9,50.5,5.2c28.7,5.7,48.1,22.6,54.9,52c2.6,11.1,2.7,22.4,1.3,33.7C315.6,217.1,308.2,234.1,292.2,246.5z M170,217.5c0.4,9.3,3.3,13.7,11.9,14.4c11.7,0.9,23.6,1.1,35.3,0.1c11.5-1,19.4-8.1,21.4-19.8c1.2-7,1.8-14.3,1.2-21.3c-1.3-16.1-8.8-24.2-23.9-27c-2.4-0.5-5-0.8-7.4-0.8c-10.8,0-21.6,0.1-32.4,0.4c-3.8,0.1-6.2,2.5-6.2,6.5c-0.1,9.8,0,19.5,0,29.3h0.1v17.5C170,216.8,170,217.1,170,217.5z"
      },
      new int[]{
          0xFF1D1D1D
      },
      512, 512
  ),
  BUSYBOX_LOGO(
      new String[]{
          "M481,452.9c0,15.5-12.6,28.1-28.1,28.1H59.1C43.6,481,31,468.4,31,452.9V59.1C31,43.6,43.6,31,59.1,31h393.8c15.5,0,28.1,12.6,28.1,28.1V452.9z",
          "M256.4,397.8l-0.1-0.1l-119.9-71.4v-115l0,0l120.4,64.2l0,0l0.1,0l0,0V398l0,0l-0.1-0.1L256.4,397.8z",
          "M375.7,211.3l-118.8,64.3V398l118.8-71.9L375.7,211.3L375.7,211.3z",
          "M375.7,211.3v84.2L312.3,328l-55.5-52.4v0L375.7,211.3L375.7,211.3z",
          "M433.3,244.4L375.7,274l-64,32.9l-54.8-31.3v0l118.8-64.3l0,0L433.3,244.4z",
          "M255.2,147l120.5,64.3l0,0l54.5-31.3l-54.5-30.7l-63-35.4L255.2,147L255.2,147L255.2,147L255.2,147z",
          "M78.6,178.3l57.6-29.6l64-32.9l54.8,31.3v0l-118.8,64.3l0,0L78.6,178.3z",
          "M255.1,147l1.8,128.7l-0.1,0l-120.5-64.3L255.1,147z",
          "M256.9,275.7L256.9,275.7L255.1,147l0,0l0.1,0l120.5,64.3L256.9,275.7z",
          "M256.9,275.7V350l-91-48.6l9.6-6.1l23.8,13.4L256.9,275.7L256.9,275.7z",
          "M256.8,275.6L256.8,275.6l-0.1,122.3l0.2,0.1L256.8,275.6L256.8,275.6z",
          "M256.8,275.6l-120.5-64.3l0,0l-54.5,31.3l54.5,30.7l63,35.4L256.8,275.6L256.8,275.6L256.8,275.6L256.8,275.6z"
      },
      new int[]{
          0xFF41A4C4,
          0xFFD95545,
          0xFFC54C3F,
          0xFFAA4438,
          0xFFF4F3EE,
          0xFFF4F3EE,
          0xFFF4F3EE,
          0xFFD2D1CC,
          0xFFDCDAD6,
          0xFFC54C3F,
          0xFFD95545,
          0xFFF4F3EE
      },
      512, 512
  );

  public final String[] glyphs;
  public final int[] colors;
  public final float width;
  public final float height;

  SVG(String[] glyphs, int[] colors, float width, float height) {
    this.glyphs = glyphs;
    this.colors = colors;
    this.width = width;
    this.height = height;
  }

}
```

**MainActivity.java**

In the Main Activity file is where we will reference our Animated SVG widget and subsequently play the SVG data. Add the following in your `Main Activity dot java`:

```java
package com.jaredrummler.android.animatedsvgview.demo;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import com.jaredrummler.android.widget.AnimatedSvgView;

public class MainActivity extends AppCompatActivity {

  /*package*/ AnimatedSvgView svgView;
  /*package*/ int index = -1;

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    svgView = (AnimatedSvgView) findViewById(R.id.animated_svg_view);

    svgView.postDelayed(new Runnable() {

      @Override public void run() {
        svgView.start();
      }
    }, 500);

    svgView.setOnClickListener(new View.OnClickListener() {

      @Override public void onClick(View v) {
        if (svgView.getState() == AnimatedSvgView.STATE_FINISHED) {
          svgView.start();
        }
      }
    });

    svgView.setOnStateChangeListener(new AnimatedSvgView.OnStateChangeListener() {

      @Override public void onStateChange(@AnimatedSvgView.State int state) {
        if (state == AnimatedSvgView.STATE_TRACE_STARTED) {
          findViewById(R.id.btn_previous).setEnabled(false);
          findViewById(R.id.btn_next).setEnabled(false);
        } else if (state == AnimatedSvgView.STATE_FINISHED) {
          findViewById(R.id.btn_previous).setEnabled(index != -1);
          findViewById(R.id.btn_next).setEnabled(true);
          if (index == -1) index = 0; // first time
        }
      }
    });
  }

  public void onNext(View view) {
    if (++index >= SVG.values().length) index = 0;
    setSvg(SVG.values()[index]);
  }

  public void onPrevious(View view) {
    if (--index < 0) index = SVG.values().length - 1;
    setSvg(SVG.values()[index]);
  }

  private void setSvg(SVG svg) {
    svgView.setGlyphStrings(svg.glyphs);
    svgView.setFillColors(svg.colors);
    svgView.setViewportSize(svg.width, svg.height);
    svgView.setTraceResidueColor(0x32000000);
    svgView.setTraceColors(svg.colors);
    svgView.rebuildGlyphData();
    svgView.start();
  }

}
```

### Reference

You will find the reference and download links below:

| Number | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/jaredrummler/AnimatedSvgView/tree/master/demo) |
| 2. | [Read More](https://github.com/jaredrummler/AnimatedSvgView) |
| 3. | [Follow](https://github.com/jaredrummler) code author |

## (b). android-pathview

> This library allows you to animate svg or normal Paths, change the color, pathWidth or add svg.

You can also use it to animate the "procentage" property to make the animation.

### Step 1: Install it

Install the library using the following statement:

```groovy
dependencies {
    implementation 'com.eftimoff:android-pathview:1.0.8@aar'
}
```

### Step 2: Use it

There are two types of paths :

**1\. From Svg**

```xml
<com.eftimoff.androipathview.PathView
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/pathView"
    android:layout_width="150dp"
    android:layout_height="150dp"
    app:pathColor="@android:color/white"
    app:svg="@raw/settings"
    app:pathWidth="5dp"/>
```

Here is what you get:

![svg](https://github.com/geftimov/android-pathview/blob/master/art/settings.gif)

**2\. From Path**

```xml
<com.eftimoff.androipathview.PathView
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/pathView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:pathColor="@android:color/white"
    app:pathWidth="3dp"/>
```

In Code

```java
    final Path path = new Path();
        path.moveTo(0.0f, 0.0f);
        path.lineTo(length / 4f, 0.0f);
        path.lineTo(length, height / 2.0f);
        path.lineTo(length / 4f, height);
        path.lineTo(0.0f, height);
        path.lineTo(length * 3f / 4f, height / 2f);
        path.lineTo(0.0f, 0.0f);
        path.close();

pathView.setPath(path);
```

Here is what you get:

![svg](https://github.com/geftimov/android-pathview/blob/master/art/path.gif)

Here is an example of how to use the animator for parallel animation

```java
    pathView.getPathAnimator()
        .delay(100)
        .duration(500)
        .listenerStart(new AnimationListenerStart())
        .listenerEnd(new AnimationListenerEnd())
        .interpolator(new AccelerateDecelerateInterpolator())
        .start();
```

Here is an example of how to Use the animator for sequential animation:

```java
    pathView.getSequentialPathAnimator()
        .delay(100)
        .duration(500)
        .listenerStart(new AnimationListenerStart())
        .listenerEnd(new AnimationListenerEnd())
        .interpolator(new AccelerateDecelerateInterpolator())
        .start();
```

If you want to use the svg colors:

```java
    pathView.useNaturalColors();
```

If you want to draw the real SVG after the path animation:

> It is in still in development:

```java
    pathView.setFillAfter(true);
```

![path](https://github.com/geftimov/android-pathview/blob/master/art/fill-after-resize-new.gif)

### Limitations

> When working with SVGs you can not WRAP_CONTENT your views.

### Full Example

> Find the full source code in the download link provided below.

**SecondActivity.java**

```java
package com.eftimoff.empty;

import android.graphics.Path;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;

import com.eftimoff.androipathview.PathView;

public class SecondActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        final PathView pathView = (PathView) findViewById(R.id.pathView);
//        final Path path = makeConvexArrow(50, 100);
//        pathView.setPath(path);
        //       pathView.setFillAfter(true);
      //  pathView.useNaturalColors();
        pathView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pathView.getPathAnimator().
                //pathView.getSequentialPathAnimator().
                        delay(100).
                        duration(1500).
                        interpolator(new AccelerateDecelerateInterpolator()).
                        start();
            }
        });
    }

    private Path makeConvexArrow(float length, float height) {
        final Path path = new Path();
        path.moveTo(0.0f, 0.0f);
        path.lineTo(length / 4f, 0.0f);
        path.lineTo(length, height / 2.0f);
        path.lineTo(length / 4f, height);
        path.lineTo(0.0f, height);
        path.lineTo(length * 3f / 4f, height / 2f);
        path.lineTo(0.0f, 0.0f);
        path.close();
        return path;
    }

}
```

### Reference

Read more using the following links:

| Number | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/geftimov/android-pathview/tree/master/sample) |
| 2. | [Read More](https://github.com/geftimov/android-pathview) |
| 3. | [Follow](https://github.com/geftimov) code author |

## (c). CustomShapeImageView

> This is a library for supporting custom shaped ImageView(s) using SVGs and paint shapes.

Here is a demo:

![main](https://raw.githubusercontent.com/MostafaGazar/CustomShapeImageView/master/Screenshot_2016-01-19-09-17-37.png)

### Step 1: Install it

Add the `customshapeimageview` dependency to your `build.gradle` file:

```groovy
dependencies {
    ...
    implementation 'com.mostafagazar:customshapeimageview:1.0.4'
    ...
}
```

You can also use this gist [https://gist.github.com/MostafaGazar/ee345987fa6c8924d61b](https://gist.github.com/MostafaGazar/ee345987fa6c8924d61b) if you do not want to add this library project to your codebase.

### Step 2: Use it

First add in XML layout:

```xml
<com.meg7.widget.CustomShapeImageView
    android:layout_width="64dp"
    android:layout_height="64dp"
    android:src="@drawable/sample"
    app:shape="circle"
    android:scaleType="centerCrop" />

<com.meg7.widget.CircleImageView
    android:layout_width="64dp"
    android:layout_height="64dp"
    android:src="@drawable/sample"
    android:scaleType="centerCrop" />

<com.meg7.widget.RectangleImageView
    android:layout_width="64dp"
    android:layout_height="64dp"
    android:src="@drawable/sample"
    android:scaleType="centerCrop" />

<com.meg7.widget.SvgImageView
    android:layout_width="64dp"
    android:layout_height="64dp"
    android:src="@drawable/sample"
    app:svg_raw_resource="@raw/shape_star"
    android:scaleType="centerCrop" />
```

> Proguard

If you're using proguard for code shrinking and obfuscation, make sure to add the following:

```proguard
   -keep class com.meg7.widget.** { *; }
```

### Full Example

Here is the full example. See the result of this example in the screenshot shown while describing this library:

**SamplesActivity.java**

```java
package com.meg7.samples;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;

import com.meg7.widget.CustomShapeImageView;
import com.meg7.widget.CustomShapeSquareImageView;

import java.util.ArrayList;
import java.util.List;

public class SamplesActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_samples);

        GridView gridView = (GridView) findViewById(R.id.gridview);
        gridView.setAdapter(new SvgImagesAdapter(this));
    }

    private class SvgImagesAdapter extends BaseAdapter {
        private List<Integer> mSvgRawResourceIds = new ArrayList<>();

        private Context mContext;

        public SvgImagesAdapter(Context context) {
            mContext = context;

            mSvgRawResourceIds.add(R.raw.shape_star);
            mSvgRawResourceIds.add(R.raw.shape_heart);
            mSvgRawResourceIds.add(R.raw.shape_flower);
            mSvgRawResourceIds.add(R.raw.shape_star_2);
            mSvgRawResourceIds.add(R.raw.shape_star_3);
            mSvgRawResourceIds.add(R.raw.shape_circle_2);
            mSvgRawResourceIds.add(R.raw.shape_5);
        }

        @Override
        public int getCount() {
            return mSvgRawResourceIds.size();
        }

        @Override
        public Integer getItem(int i) {
            return mSvgRawResourceIds.get(i);
        }

        @Override
        public long getItemId(int i) {
            return mSvgRawResourceIds.get(i);
        }

        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            return new CustomShapeSquareImageView(mContext, R.drawable.sample_1,CustomShapeImageView.Shape.SVG, getItem(i));// It is just a sample ;)
        }

    }

}
```

### Reference

Read more using the following links:

| Number | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/MostafaGazar/CustomShapeImageView/tree/master/samples) |
| 2. | [Read More](https://github.com/MostafaGazar/CustomShapeImageView) |
| 3. | [Follow](https://github.com/MostafaGazar) code author |

## (d). Android SVG viewer

> This library uses [native webview](http://developer.android.com/reference/android/webkit/WebView.html) for rendering SVG.

It adds an intent filter so you can open SVG files from a file manager application such as [CMFileManager](https://github.com/jruesga/CMFileManager).

### Step 1: Installation

1. Download the source code and build it yourself or induce it in your project.

> If you don't want to build it yourself, you can install this application via the [Google Play store](https://play.google.com/store/apps/details?id=biz.codefuture.svgviewer) or [F-Droid](https://f-droid.org/repository/browse/?fdid=biz.codefuture.svgviewer).

### Reference

Browse the code using the following links:

| Number | Link |
| --- | --- |
| 1. | [Read More](https://github.com/cw/svg-viewer-android) |
| 2. | [Follow](https://github.com/cw) code author |

## (e). SvgImageView

> SvgImageView is an android SVG vector graphics for theme skinning.

Here is a demo:

[![Image](https://github.com/wy749814530/SvgImageView/raw/master/res/4C25A000C5F25BFEDB90AE3A005755B7.jpg)](https://github.com/wy749814530/SvgImageView/blob/master/res/4C25A000C5F25BFEDB90AE3A005755B7.jpg)

### Step 1. Install it

Start by adding the Jitpack repository to your root build file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then declare the dependency in your module build file:

```groovy
dependencies {
            implementation 'com.github.wy749814530:SvgImageView:1.1.1'
    }
```

### Step 2: Add to Layout

Next add `SvgImageView` in your xml layout

```xml
    <com.svg.SvgImageView
        android:id="@+id/svgImageView"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_margin="18dp"
        appL:image="@drawable/ic_car"
     />
```

### Step 3: Write Code

Start by referencing it:

```java
     SvgImageView svgImageView = findViewById(R.id.svgImageView);
```

Then use it as follows:

```java
    /**
      * Modify layer color
     *
     * @param view
*/
    svgImageView . setGroupColorByIndex( 0 , getResources() . getColor( R . color . colorAccent));

    /**
      * Modify Path color
     *
     * @param view
*/
    svgImageView . setPathColorByIndex( 0 , getResources() . getColor( R . color . colorAccent));

    /**
      * Modify so Path color
     *
     * @param view
*/
    svgImageView . setPathsColor(getResources() . getColor( R . color . colorAccent));

    /**
      * Restore the original color of the SVG image
     *
     * @param view
*/ public void onRestore( View view) {

        svgImageView.resetColors();
    }
```

### Full Example

Here is a full example:

> You will find the layout code in the download link below:

**MainActivity.java**

```java
package com.test;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.svg.SvgImageView;

public class MainActivity extends AppCompatActivity {

    SvgImageView svgImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        svgImageView = findViewById(R.id.svgImageView);
    }

    /**
     * @param view
     */
    public void onViewClick1(View view) {
        svgImageView.setGroupColorByIndex(0, getResources().getColor(R.color.colorAccent));
    }

    public void onViewClick2(View view) {
        svgImageView.setGroupColorByIndex(1, getResources().getColor(R.color.colorAaccee));
    }

    public void onViewClick3(View view) {
        svgImageView.setGroupColorByIndex(2, getResources().getColor(R.color.blue));
    }

    public void onViewClick4(View view) {
        svgImageView.setGroupColorByIndex(3, getResources().getColor(R.color.red));
    }

    /**
     * @param view
     */
    public void onPathClick1(View view) {
        svgImageView.setPathColorByIndex(0, getResources().getColor(R.color.colorAccent));
    }

    public void onPathClick2(View view) {
        svgImageView.setPathColorByIndex(1, getResources().getColor(R.color.colorAccent));
    }

    public void onPathClick3(View view) {
        svgImageView.setPathColorByIndex(2, getResources().getColor(R.color.colorAccent));
    }

    /**
     *
     * @param view
     */
    public void onPathClickAll(View view) {
        svgImageView.setPathsColor(getResources().getColor(R.color.colorAccent));
    }

    /**
     *
     * @param view
     */
    public void onRestore(View view) {
        svgImageView.resetColors();
    }

}
```

### Reference

Read more using the following links:

| Number | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/wy749814530/SvgImageView/tree/master/app) |
| 1. | [Read More](https://github.com/wy749814530/SvgImageView) |
| 2. | [Follow](https://github.com/wy749814530) code author |

## (f). SVGMapView

> [No Longer Support]
> 
> It was a SVG indoor map engine for Android.

### Step 1: Use it

First add the View in the Layout:

```xml
<com.jiahuan.svgmapview.SVGMapView
  android:id="@+id/mapView"
  android:layout_width="match_parent"
  android:layout_height="match_parent">
</com.jiahuan.svgmapview.SVGMapView>
```

Then in your java/kotlin code:

```java
SVGMapView mapView = (SVGMapView) findViewById(R.id.mapView);
```

Here is how you make in work well with the lifecycle callbacks:

```java
@Override
protected void onPause()
{
  super.onPause();
  mapView.onPause();
}

@Override
protected void onResume()
{
  super.onResume();
  mapView.onResume();
}

@Override
protected void onDestroy()
{
  super.onDestroy();
  mapView.onDestroy();
}
```

Then here is how you load the map:

```java
// load svg string
mapView.loadMap(AssetsHelper.getContent(this, "sample2.svg"));
```

SVGMapView also provides some common overlays, which are normally seen in map applications.

Here is an example of Location overlay:

```java
SVGMapLocationOverlay locationOverlay = new SVGMapLocationOverlay(mapView);
locationOverlay.setIndicatorArrowBitmap(BitmapFactory.decodeResource(getResources(), R.mipmap.indicator_arrow));
locationOverlay.setPosition(new PointF(400, 500));
locationOverlay.setIndicatorCircleRotateDegree(90);
locationOverlay.setMode(SVGMapLocationOverlay.MODE_COMPASS);
locationOverlay.setIndicatorArrowRotateDegree(-45);
mapView.getOverLays().add(locationOverlay);
mapView.refresh();
```

Here is Map Control:

```java
mapView.getController().sparkAtPoint(new PointF(random.nextInt(1000), random.nextInt(1000)), 100, color, 10);
```

### Reference

Read more using the following links:

| Number | Link |
| --- | --- |
| 1. | [Read More](https://github.com/jiahuanyu/SVGMapView) |
| 2. | [Follow](https://github.com/jiahuanyu) code author |
