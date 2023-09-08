Animation resources
===================

>   On this page you will learn:

*   Property animation
*   View animation
    *   Tween animation
    *   Frame animation

An animation resource can define one of two types of animations:

Property Animation Creates an animation by modifying an object's property values over a set period of time with an `Animator`. View Animation

There are two types of animations that you can do with the view animation framework:

*   Tween animation: Creates an animation by performing a series of transformations on a single image with an `Animation`
*   Frame animation: or creates an animation by showing a sequence of images in order with an `AnimationDrawable`.

Property animation
------------------

An animation defined in XML that modifies properties of the target object, such as background color or alpha value, over a set amount of time.

file location: `res/animator/_filename_.xml`
The filename will be used as the resource ID. compiled resource datatype: Resource pointer to a `ValueAnimator`, `ObjectAnimator`, or `AnimatorSet`. resource reference: In Java-based or Kotlin code: `R.animator._filename_`
In XML: `@[_package_:]animator/_filename_` syntax:

```xml
<set
 android:ordering=["together" | "sequentially"]>

  <objectAnimator
    android:propertyName="_string_"
    android:duration="_int_"
    android:valueFrom="_float_ | _int_ | _color_"
    android:valueTo="_float_ | _int_ | _color_"
    android:startOffset="_int_"
    android:repeatCount="_int_"
    android:repeatMode=["restart" | "reverse"]
    android:valueType=["intType" | "floatType"]/>

  <animator
    android:duration="_int_"
    android:valueFrom="_float_ | _int_ | _color_"
    android:valueTo="_float_ | _int_ | _color_"
    android:startOffset="_int_"
    android:repeatCount="_int_"
    android:repeatMode=["restart" | "reverse"]
    android:valueType=["intType" | "floatType"]/>

  <set\>
    ...
  </set>
</set>
```

The file must have a single root element: either `<set>`, `<objectAnimator>`, or `<valueAnimator>`. You can group animation elements together inside the `<set>` element, including other `<set>` elements.

elements: `<set>` A container that holds other animation elements (`<objectAnimator>`, `<valueAnimator>`, or other `<set>` elements). Represents an `AnimatorSet`.

You can specify nested `<set>` tags to further group animations together. Each `<set>` can define its own `ordering` attribute.

attributes:

`android:ordering` _Keyword_. Specifies the play ordering of animations in this set.

| Value | Description |
| --- | --- |
| `sequentially` | Play animations in this set sequentially |
| `together` (default) | Play animations in this set at the same time. |

`<objectAnimator>` Animates a specific property of an object over a specific amount of time. Represents an `ObjectAnimator`.

attributes:

`android:propertyName` _String_. **Required**. The object's property to animate, referenced by its name. For example you can specify `"alpha"` or `"backgroundColor"` for a View object. The `objectAnimator` element does not expose a `target` attribute, however, so you cannot set the object to animate in the XML declaration. You have to inflate your animation XML resource by calling `loadAnimator())` and call `setTarget())` to set the target object that contains this property. `android:valueTo` _float, int, or color_. **Required**. The value where the animated property ends. Colors are represented as six digit hexadecimal numbers (for example, #333333). `android:valueFrom` _float, int, or color_. The value where the animated property starts. If not specified, the animation starts at the value obtained by the property's get method. Colors are represented as six digit hexadecimal numbers (for example, #333333). `android:duration` _int_. The time in milliseconds of the animation. 300 milliseconds is the default. `android:startOffset` _int_. The amount of milliseconds the animation delays after `start())` is called. `android:repeatCount` _int_. How many times to repeat an animation. Set to `"-1"` to infinitely repeat or to a positive integer. For example, a value of `"1"` means that the animation is repeated once after the initial run of the animation, so the animation plays a total of two times. The default value is `"0"`, which means no repetition. `android:repeatMode` _int_. How an animation behaves when it reaches the end of the animation. `android:repeatCount` must be set to a positive integer or `"-1"` for this attribute to have an effect. Set to `"reverse"` to have the animation reverse direction with each iteration or `"restart"` to have the animation loop from the beginning each time. `android:valueType` _Keyword_. Do not specify this attribute if the value is a color. The animation framework automatically handles color values

| Value | Description |
| --- | --- |
| `intType` | Specifies that the animated values are integers |
| `floatType` (default) | Specifies that the animated values are floats |

`<animator>` Performs an animation over a specified amount of time. Represents a `ValueAnimator`.

attributes:

`android:valueTo` _float, int, or color_. **Required**. The value where the animation ends. Colors are represented as six digit hexadecimal numbers (for example, #333333). `android:valueFrom` _float, int, or color_. **Required**. The value where the animation starts. Colors are represented as six digit hexadecimal numbers (for example, #333333). `android:duration` _int_. The time in milliseconds of the animation. 300ms is the default. `android:startOffset` _int_. The amount of milliseconds the animation delays after `start())` is called. `android:repeatCount` _int_. How many times to repeat an animation. Set to `"-1"` to infinitely repeat or to a positive integer. For example, a value of `"1"` means that the animation is repeated once after the initial run of the animation, so the animation plays a total of two times. The default value is `"0"`, which means no repetition. `android:repeatMode` _int_. How an animation behaves when it reaches the end of the animation. `android:repeatCount` must be set to a positive integer or `"-1"` for this attribute to have an effect. Set to `"reverse"` to have the animation reverse direction with each iteration or `"restart"` to have the animation loop from the beginning each time. `android:valueType` _Keyword_. Do not specify this attribute if the value is a color. The animation framework automatically handles color values.

| Value | Description |
| --- | --- |
| `intType` | Specifies that the animated values are integers |
| `floatType` (default) | Specifies that the animated values are floats |

example: XML file saved at `res/animator/property_animator.xml`:

```xml
<set android:ordering="sequentially">
  <set>
    <objectAnimator
      android:propertyName="x"
      android:duration="500"
      android:valueTo="400"
      android:valueType="intType"/>
    <objectAnimator
      android:propertyName="y"
      android:duration="500"
      android:valueTo="300"
      android:valueType="intType"/>
  </set>
  <objectAnimator
    android:propertyName="alpha"
    android:duration="500"
    android:valueTo="1f"/>
</set>
```

In order to run this animation, you must inflate the XML resources in your code to an `AnimatorSet` object, and then set the target objects for all of the animations before starting the animation set. Calling `setTarget())` sets a single target object for all children of the `AnimatorSet` as a convenience. The following code shows how to do this:

**Kotlin**

```kotlin
val set: AnimatorSet = AnimatorInflater.loadAnimator(myContext, R.animator.property_animator)
  .apply {
    setTarget(myObject)
    start()
  }

```

**Java**

```java
AnimatorSet set = (AnimatorSet) AnimatorInflater.loadAnimator(myContext,
  R.animator.property_animator);
set.setTarget(myObject);
set.start();
```

see also:

*   Property Animation
*   API Demos for examples on how to use the property animation system.

View animation
--------------

The view animation framework supports both tween and frame by frame animations, which can both be declared in XML. The following sections describe how to use both methods.

### Tween animation

An animation defined in XML that performs transitions such as rotating, fading, moving, and stretching on a graphic.

file location: `res/anim/_filename_.xml`
The filename will be used as the resource ID. compiled resource datatype: Resource pointer to an `Animation`. resource reference: In Java: `R.anim._filename_`
In XML: `@[_package_:]anim/_filename_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
  android:interpolator="@[package:]anim/_interpolator_resource_"
  android:shareInterpolator=["true" | "false"] >
  <alpha
    android:fromAlpha="_float_"
    android:toAlpha="_float_" />
  <scale
    android:fromXScale="_float_"
    android:toXScale="_float_"
    android:fromYScale="_float_"
    android:toYScale="_float_"
    android:pivotX="_float_"
    android:pivotY="_float_" />
  <translate
    android:fromXDelta="_float_"
    android:toXDelta="_float_"
    android:fromYDelta="_float_"
    android:toYDelta="_float_" />
  <rotate
    android:fromDegrees="_float_"
    android:toDegrees="_float_"
    android:pivotX="_float_"
    android:pivotY="_float_" />
  <set\>
    ...
  </set>
</set>
```

The file must have a single root element: either an `<alpha>`, `<scale>`, `<translate>`, `<rotate>`, or `<set>` element that holds a group (or groups) of other animation elements (even nested `<set>` elements).

elements: `<set>` A container that holds other animation elements (`<alpha>`, `<scale>`, `<translate>`, `<rotate>`) or other `<set>` elements. Represents an `AnimationSet`.

attributes:

`android:interpolator` _Interpolator resource_. An `Interpolator` to apply on the animation. The value must be a reference to a resource that specifies an interpolator (not an interpolator class name). There are default interpolator resources available from the platform or you can create your own interpolator resource. See the discussion below for more about Interpolators. `android:shareInterpolator` _Boolean_. "true" if you want to share the same interpolator among all child elements. `<alpha>` A fade-in or fade-out animation. Represents an `AlphaAnimation`.

attributes:

`android:fromAlpha` _Float_. Starting opacity offset, where 0.0 is transparent and 1.0 is opaque. `android:toAlpha` _Float_. Ending opacity offset, where 0.0 is transparent and 1.0 is opaque.

For more attributes supported by `<alpha>`, see the `Animation` class reference (of which, all XML attributes are inherited by this element).

`<scale>` A resizing animation. You can specify the center point of the image from which it grows outward (or inward) by specifying `pivotX` and `pivotY`. For example, if these values are 0, 0 (top-left corner), all growth will be down and to the right. Represents a `ScaleAnimation`.

attributes:

`android:fromXScale` _Float_. Starting X size offset, where 1.0 is no change. `android:toXScale` _Float_. Ending X size offset, where 1.0 is no change. `android:fromYScale` _Float_. Starting Y size offset, where 1.0 is no change. `android:toYScale` _Float_. Ending Y size offset, where 1.0 is no change. `android:pivotX` _Float_. The X coordinate to remain fixed when the object is scaled. `android:pivotY` _Float_. The Y coordinate to remain fixed when the object is scaled.

For more attributes supported by `<scale>`, see the `Animation` class reference (of which, all XML attributes are inherited by this element).

`<translate>` A vertical and/or horizontal motion. Supports the following attributes in any of the following three formats: values from -100 to 100 ending with "%", indicating a percentage relative to itself; values from -100 to 100 ending in "%p", indicating a percentage relative to its parent; a float value with no suffix, indicating an absolute value. Represents a `TranslateAnimation`.

attributes:

`android:fromXDelta` _Float or percentage_. Starting X offset. Expressed either: in pixels relative to the normal position (such as `"5"`), in percentage relative to the element width (such as `"5%"`), or in percentage relative to the parent width (such as `"5%p"`). `android:toXDelta` _Float or percentage_. Ending X offset. Expressed either: in pixels relative to the normal position (such as `"5"`), in percentage relative to the element width (such as `"5%"`), or in percentage relative to the parent width (such as `"5%p"`). `android:fromYDelta` _Float or percentage_. Starting Y offset. Expressed either: in pixels relative to the normal position (such as `"5"`), in percentage relative to the element height (such as `"5%"`), or in percentage relative to the parent height (such as `"5%p"`). `android:toYDelta` _Float or percentage_. Ending Y offset. Expressed either: in pixels relative to the normal position (such as `"5"`), in percentage relative to the element height (such as `"5%"`), or in percentage relative to the parent height (such as `"5%p"`).

For more attributes supported by `<translate>`, see the `Animation` class reference (of which, all XML attributes are inherited by this element).

`<rotate>` A rotation animation. Represents a `RotateAnimation`.

attributes:

`android:fromDegrees` _Float_. Starting angular position, in degrees. `android:toDegrees` _Float_. Ending angular position, in degrees. `android:pivotX` _Float or percentage_. The X coordinate of the center of rotation. Expressed either: in pixels relative to the object's left edge (such as `"5"`), in percentage relative to the object's left edge (such as `"5%"`), or in percentage relative to the parent container's left edge (such as `"5%p"`). `android:pivotY` _Float or percentage_. The Y coordinate of the center of rotation. Expressed either: in pixels relative to the object's top edge (such as `"5"`), in percentage relative to the object's top edge (such as `"5%"`), or in percentage relative to the parent container's top edge (such as `"5%p"`).

For more attributes supported by `<rotate>`, see the `Animation` class reference (of which, all XML attributes are inherited by this element).

example: XML file saved at `res/anim/hyperspace_jump.xml`:

```xml
<set xmlns:android="http://schemas.android.com/apk/res/android"
  android:shareInterpolator="false">
  <scale
    android:interpolator="@android:anim/accelerate_decelerate_interpolator"
    android:fromXScale="1.0"
    android:toXScale="1.4"
    android:fromYScale="1.0"
    android:toYScale="0.6"
    android:pivotX="50%"
    android:pivotY="50%"
    android:fillAfter="false"
    android:duration="700" />
  <set
    android:interpolator="@android:anim/accelerate_interpolator"
    android:startOffset="700">
    <scale
      android:fromXScale="1.4"
      android:toXScale="0.0"
      android:fromYScale="0.6"
      android:toYScale="0.0"
      android:pivotX="50%"
      android:pivotY="50%"
      android:duration="400" />
    <rotate
      android:fromDegrees="0"
      android:toDegrees="-45"
      android:toYScale="0.0"
      android:pivotX="50%"
      android:pivotY="50%"
      android:duration="400" />
  </set>
</set>
```

This application code will apply the animation to an `ImageView` and start the animation:


**Kotlin**

```kotlin
val image: ImageView = findViewById(R.id.image)
val hyperspaceJump: Animation = AnimationUtils.`loadAnimation)`(this, R.anim.hyperspace_jump)
image.`startAnimation)`(hyperspaceJump)
```

**Java**

```java
ImageView image = (ImageView) findViewById(R.id.image);
Animation hyperspaceJump = AnimationUtils.`loadAnimation)`(this, R.anim.hyperspace_jump);
image.`startAnimation)`(hyperspaceJump);
```
see also:

*   2D Graphics: Tween Animation

#### Interpolators

An interpolator is an animation modifier defined in XML that affects the rate of change in an animation. This allows your existing animation effects to be accelerated, decelerated, repeated, bounced, etc.

An interpolator is applied to an animation element with the `android:interpolator` attribute, the value of which is a reference to an interpolator resource.

All interpolators available in Android are subclasses of the `Interpolator` class. For each interpolator class, Android includes a public resource you can reference in order to apply the interpolator to an animation using the `android:interpolator` attribute. The following table specifies the resource to use for each interpolator:

| Interpolator class | Resource ID |
| --- | --- |
| `AccelerateDecelerateInterpolator` | `@android:anim/accelerate_decelerate_interpolator` |
| `AccelerateInterpolator` | `@android:anim/accelerate_interpolator` |
| `AnticipateInterpolator` | `@android:anim/anticipate_interpolator` |
| `AnticipateOvershootInterpolator` | `@android:anim/anticipate_overshoot_interpolator` |
| `BounceInterpolator` | `@android:anim/bounce_interpolator` |
| `CycleInterpolator` | `@android:anim/cycle_interpolator` |
| `DecelerateInterpolator` | `@android:anim/decelerate_interpolator` |
| `LinearInterpolator` | `@android:anim/linear_interpolator` |
| `OvershootInterpolator` | `@android:anim/overshoot_interpolator` |

Here's how you can apply one of these with the `android:interpolator` attribute:

```xml
<set android:interpolator="@android:anim/accelerate_interpolator">
  ...
</set>
```
#### Custom interpolators

If you're not satisfied with the interpolators provided by the platform (listed in the table above), you can create a custom interpolator resource with modified attributes. For example, you can adjust the rate of acceleration for the `AnticipateInterpolator`, or adjust the number of cycles for the `CycleInterpolator`. In order to do so, you need to create your own interpolator resource in an XML file.

file location: `res/anim/_filename_.xml`
The filename will be used as the resource ID. compiled resource datatype: Resource pointer to the corresponding interpolator object. resource reference: In XML: `@[_package_:]anim/_filename_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<_InterpolatorName_ xmlns:android="http://schemas.android.com/apk/res/android"
  android:_attribute_name_\="_value_"
  />
```

If you don't apply any attributes, then your interpolator will function exactly the same as those provided by the platform (listed in the table above).

elements: Notice that each `Interpolator` implementation, when defined in XML, begins its name in lowercase.

`<accelerateDecelerateInterpolator>` The rate of change starts and ends slowly but accelerates through the middle.

No attributes.

`<accelerateInterpolator>` The rate of change starts out slowly, then accelerates.

attributes:

`android:factor` _Float_. The acceleration rate (default is 1). `<anticipateInterpolator>` The change starts backward then flings forward.

attributes:

`android:tension` _Float_. The amount of tension to apply (default is 2). `<anticipateOvershootInterpolator>` The change starts backward, flings forward and overshoots the target value, then settles at the final value.

attributes:

`android:tension` _Float_. The amount of tension to apply (default is 2). `android:extraTension` _Float_. The amount by which to multiply the tension (default is 1.5). `<bounceInterpolator>` The change bounces at the end.

No attributes

`<cycleInterpolator>` Repeats the animation for a specified number of cycles. The rate of change follows a sinusoidal pattern.

attributes:

`android:cycles` _Integer_. The number of cycles (default is 1). `<decelerateInterpolator>` The rate of change starts out quickly, then decelerates.

attributes:

`android:factor` _Float_. The deceleration rate (default is 1). `<linearInterpolator>` The rate of change is constant.

No attributes.

`<overshootInterpolator>` The change flings forward and overshoots the last value, then comes back.

attributes:

`android:tension` _Float_. The amount of tension to apply (default is 2). example:

XML file saved at `res/anim/my_overshoot_interpolator.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<overshootInterpolator xmlns:android="http://schemas.android.com/apk/res/android"
  android:tension="7.0"
  />
```

This animation XML will apply the interpolator:

```xml
<scale xmlns:android="http://schemas.android.com/apk/res/android"
  android:interpolator="@anim/my_overshoot_interpolator"
  android:fromXScale="1.0"
  android:toXScale="3.0"
  android:fromYScale="1.0"
  android:toYScale="3.0"
  android:pivotX="50%"
  android:pivotY="50%"
  android:duration="700" />
```
### Frame animation

An animation defined in XML that shows a sequence of images in order (like a film).

file location: `res/drawable/_filename_.xml`
The filename will be used as the resource ID. compiled resource datatype: Resource pointer to an `AnimationDrawable`. resource reference: In Java: `R.drawable._filename_`
In XML: `@[_package_:]drawable._filename_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
  android:oneshot=["true" | "false"] >
  <item
    android:drawable="@[package:]drawable/_drawable_resource_name_"
    android:duration="_integer_" />
</animation-list>
```

elements: `<animation-list>` **Required**. This must be the root element. Contains one or more `<item>` elements.

attributes:

`android:oneshot` _Boolean_. "true" if you want to perform the animation once; "false" to loop the animation. `<item>` A single frame of animation. Must be a child of a `<animation-list>` element.

attributes:

`android:drawable` _Drawable resource_. The drawable to use for this frame. `android:duration` _Integer_. The duration to show this frame, in milliseconds. example: XML file saved at `res/drawable/rocket_thrust.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<animation-list xmlns:android="http://schemas.android.com/apk/res/android"
  android:oneshot="false">
  <item android:drawable="@drawable/rocket_thrust1" android:duration="200" />
  <item android:drawable="@drawable/rocket_thrust2" android:duration="200" />
  <item android:drawable="@drawable/rocket_thrust3" android:duration="200" />
</animation-list>
```

This application code will set the animation as the background for a View, then play the animation:


**Kotlin**

```java
val rocketImage: ImageView = findViewById(R.id.rocket_image)
rocketImage.`setBackgroundResource)`(R.drawable.rocket_thrust)

val rocketAnimation = rocketImage.`background)`
if (rocketAnimation is `Animatable`) {
  rocketAnimation.`start())`
}
```

**Java**

```java
ImageView rocketImage = (ImageView) findViewById(R.id.rocket_image);
rocketImage.`setBackgroundResource)`(R.drawable.rocket_thrust);

rocketAnimation = rocketImage.`getBackground())`;
if (rocketAnimation instanceof `Animatable`) {
  ((Animatable)rocketAnimation).`start())`;
}
```