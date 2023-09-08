# FloatingToast

>  Android library to create customizable floating animated toasts like in Clash Royale app.

An android library to make customisable floating animated toasts.

![Toast Library Tutorial](https://camo.githubusercontent.com/120407b88aef5823c49bcd9b30ecbc25ce0fb1eec5b3960af0eb7ceb9edaf959/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f5a784c624c76557434394f3057744c4575662f67697068792e676966)


To use it follow these steps:

### Step 1: Add as a dependency

In your `build.gradle`

Maven Central

```groovy
dependencies {
    implementation 'io.github.hariprasanths:floating-toast:0.1.1'
}
```

jcenter

```groovy
dependencies {
    implementation 'hari.floatingtoast:floatingtoast:0.1.1'
}
```


### Step 2: Usage

#### Create Floating Toasts


```java
Button button = findViewById(R.id.button);
    String text = "Hello toast!";
    int duration = FloatingToast.LENGTH_MEDIUM;

    button.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            FloatingToast toast = FloatingToast.makeToast(button, text, FloatingToast.LENGTH_MEDIUM);
            toast.show();
        }
    });
```

You can also chain your methods and avoid holding on to the Toast object, like this:

```java
FloatingToast.makeToast(button, text, FloatingToast.LENGTH_MEDIUM).show();
```

You can use the activity context to instantiate the FloatingToast object, like this:

```java
FloatingToast.makeToast(MainActivity.this, text, FloatingToast.LENGTH_MEDIUM).show();
```


> NOTE: Always use the view (which was used to call the toast) to create the FloatingToast object wherever possible rather than using the activity context.

An example with all the customisations:

```java
Typeface customFont = Typeface.createFromAsset(getContext().getAssets(), "fonts/custom_font.ttf");

    //Duration of 1250 millis
    //Gravity - Mid Top                 (Default is Center)
    //Fade out duration of 1000 millis  (Default is 750 millis)
    //Text size - 12dp                  (Default is 16dp)
    //Background blur - On              (Default is On)
    //Float distance - 30px             (Default is 40px)
    //Text color - White
    //Text shadow - On                  (Default is Off)
    //Custom font                       (No custom font is provided by default)
    FloatingToast.makeToast(button, text, FloatingToast.LENGTH_LONG)
            .setGravity(FloatingToast.GRAVITY_MID_TOP)
            .setFadeOutDuration(FloatingToast.FADE_DURATION_LONG)
            .setTextSizeInDp(12)
            .setBackgroundBlur(true)
            .setFloatDistance(FloatingToast.DISTANCE_SHORT)
            .setTextColor(Color.parseColor("#ffffff"))
            .setShadowLayer(5, 1, 1, Color.parseColor("#000000"))
            .setTextTypeface(customFont)
            .show();    //Show toast at the specified fixed position
```


```java
FloatingToast.makeToast(button, text, FloatingToast.LENGTH_MEDIUM)
            .showAtTouchPosition();
```

### Public methods

### makeToast


```kotlin
makeToast (View view, String text, int duration)
```

`View:`
`String:`
`int:`

### makeToast


```kotlin
makeToast (View view, int resId, int duration)
```

`View:`
`int:`
`int:`

### makeToast


```kotlin
makeToast (Activity activity, String text, int duration)
```

`Activity:`
`String:`
`int:`

### makeToast


```kotlin
makeToast (Activity activity, int resId, int duration)
```

`Activity:`
`int:`
`int:`

### setGravity


```kotlin
setGravity (int gravity)
```

Set the location at which the notification should appear on the screen.
`int:`

### setGravity


```kotlin
setGravity (int gravity, int xOffset, int yOffset)
```

Set the location at which the notification should appear on the screen.
`int:`
`int:`
`int:`

### setFadeOutDuration


```kotlin
setFadeOutDuration (int fadeOutDuration)
```

Set the fade out duration of the toast. Total animation time of the toast - duration + fadeOutDuration
`int:`

### setTextColor


```kotlin
setTextColor (int color)
```

Sets the text color for all the states (normal, selected, focused) to be this color.
`int:`

### setTextTypeface


```kotlin
setTextTypeface (Typeface typeface)
```

`Typeface`

### setTextStyle


```kotlin
setTextStyle (int style)
```

`int`

### setTextSizeInSp


```kotlin
setTextSizeInSp (float sizeInSp)
```

`float:`

### setTextSizeInDp


```kotlin
setTextSizeInDp (int sizeInDp)
```

`int:`

### setTextSizeCustomUnit


```kotlin
setTextSizeCustomUnit (int unit, float size)
```

`int:`
`float:`

### setFloatDistance


```kotlin
setFloatDistance (float floatDistance)
```

Sets the distance of the toast till which it floats.
`float:`

### setShadowLayer


```kotlin
setShadowLayer (float shadowRadius, float shadowDx, float shadowDy, int shadowColor)
```

`float`
`float`
`float`
`int`

### setBackgroundBlur


```kotlin
setBackgroundBlur (boolean bool)
```

Sets the blur background for the text in the toast.
`boolean:`

### showAtTouchPosition


```kotlin
showAtTouchPosition (View view)
```

Show the view for the specified duration at the touch position.
`View:`

### show


```kotlin
show()
```

Show the view for the specified duration.

### Reference

|2.|Read more [here](https://github.com/hariprasanths/FloatingToast).|
|3.|Follow code author [here](https://github.com/hariprasanths).|
