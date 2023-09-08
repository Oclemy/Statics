# Android FrameLayout Tutorial and Examples

_Android FrameLayout Tutorial and Examples_

FrameLayout is a ViewGroup designed to block out an area on the screen which then you can use to display a single item.

Normally you use a FrameLayout to hold only a single view. Think of it as a placeholder.

if you use to hold multiple views, then it becomes hard to present them in a way that's scalable to different screen sizes without the children overlapping each other.


If you really have to add multiple views to a FrameLayout, then you go ahead add them but use the `android:layout_gravity` attribute to control their positions.

FrameLayout's child views will be painted in a stack. The one on top is the most recently added.

A FrameLayout's size resembles that of it's largets child. That child of course can have padding(in which case the padding is added also) and may be visible or not.

If you want to control size of the FrameLayout using children that are hidden by the `View.GONE` attribute thenyou have to make sure `setConsiderGoneChildrenWhenMeasuring()` is set to `true`.

#### FrameLayout API Definition

FrameLayout is a concrete class defined in the `android.widget` package.

It also derives from the ViewGroup class.

```java
public class FrameLayout extends ViewGroup
```

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
```

#### FrameLayout Subclasses

FrameLayout has very many powerful and popular subclasses. These include:

| No. | Name | Description |
| --- | --- | --- |
| 1. | ScrollView | A viewgroup that allows the view hierarchy placed within it to be scrolled. |
| 2. | HorizontalScrollView | Layout container for a view hierarchy that can be scrolled by the user, allowing it to be larger than the physical display. |
| 3. | [DatePicker](https://camposha.info/android/datepicker) | A widget that allows us select a date |
| 4. | TimePicker | A widget for selecting the time of day, in either 24-hour or AM/PM mode. |

#### Quick FrameLayout Examples

##### 1\. How to create a Square FrameLayout

```java

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class SquareFramelayout extends FrameLayout {
    public SquareFramelayout(Context context) {
        super(context);
    }

    public SquareFramelayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public SquareFramelayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }
}
```
