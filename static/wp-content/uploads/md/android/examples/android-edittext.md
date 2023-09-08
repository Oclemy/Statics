# Android EditText Tutorial

_Android EditText Tutorial and Examples._

In this session we look at one of the most usable and needed widgets, the `EditText` class. We look at several short as well as full examples and classes associated with it.


#### What is EditText?

_`EditText` is an android framework widget that allows us input text data into applications._

#### Why EditText?

The mere ability to input data makes edittext one of the really most important widgets. How will users even be able to use many apps if they cannot type inputs into the app? Think of applications like messaging apps, email apps, event the phone dialer where you need to type the phone number to dial.EditText is the primary class that provides this ability. In fact even search widgets are constructed from edittext.

Computers are known to be information processing devices. Unlike devices like Radio and Television, computers are able to obtain a diversity of raw inputs from users and process them. Users can type data into computers and chances are that they are going to be using `EditText` class or it's derivation like SearchView.

#### How to Create a Searchable EditText

Basically we want a custom edittext that looks and behaves like a SearchView. This means it will have a search icon and a delete icon.

We will need to implement the `OnFocusChangeListener` interface, which is defined in the `android.view.View` class.

This then allows us to listen to the `onFocusChange` events:

```java
    @Override
    public void onFocusChange(View arg0, boolean hasFocus) {..}
```

Here's the full class:

```java
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.View;
import android.view.View.OnFocusChangeListener;
import android.widget.EditText;

public class SearchEditText extends EditText implements OnFocusChangeListener{

    private static final String TAG = "SearchEditText";
    /**
    * Whether the icon is on the left by default
    */
    private boolean isIconLeft = false;

    private Drawable[] drawables; // Control image resource
    private Drawable drawableLeft; // Search icon and delete button icon

    public SearchEditText(Context context) {
        this(context, null);
        init();
    }

    public SearchEditText(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public SearchEditText(Context context, AttributeSet attrs) {
        this(context, attrs,android.R.attr.editTextStyle);
        init();
    }

    private void init() {
        setOnFocusChangeListener(this);
        }

    @Override
    public void onFocusChange(View arg0, boolean hasFocus) {
        if(TextUtils.isEmpty(getText().toString()))
            isIconLeft = hasFocus;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        if (isIconLeft) { // If it is the default style, draw directly
            this.setCompoundDrawablesWithIntrinsicBounds(drawableLeft, null, null, null);
            super.onDraw(canvas);
            } else { // If it is not the default style, you need to draw the icon in the middle
            if (drawables == null) drawables = getCompoundDrawables();
            if (drawableLeft == null) drawableLeft = drawables[0];
            float textWidth = getPaint().measureText(getHint().toString());
            int drawablePadding = getCompoundDrawablePadding();
            int drawableWidth = drawableLeft.getIntrinsicWidth();
            float bodyWidth = textWidth + drawableWidth + drawablePadding;
            canvas.translate((getWidth() - bodyWidth - getPaddingLeft() - getPaddingRight()) / 2, 0);
            super.onDraw(canvas);
            }
    }

}
```

##### 2\. How to Set text for EditText and adjust the cursor to the end

You, as the title suggests, want to set text to an edittext, then move the cursor to the end of the edittext. All you have to do is invoke the `setSelection()` method, then obtain and pass the length of the text in the edittext.

```java
    /**
     * Set text for EditText and adjust the cursor to the end
     */
    public static void setTextWithSelectionAtLast(EditText editText, String text) {
        editText.setText(text);
        editText.setSelection(editText.getText().length());
    }
```

##### 3\. How to Enable and Disable EditText

EditText can be enabled and disabled ondemand. This allows you to have control over when users are able to use this widget. If for whatever reason you don't want users to be able to type into an edittext, you don't have to hide the edittext. Instead you can just disable it, then enable it later.

```java
    public static void disableEditText(EditText editText){
        editText.setFocusable(false);
        editText.setFocusableInTouchMode(false);
    }

    public static void enableEditText(EditText editText){
        editText.setFocusable(true);
        editText.setFocusableInTouchMode(true);
        editText.requestFocus();
    }
```

##### 4\. How to Check Multiple Edittexts For Emptyness

You have a bunch of edittexts you need to ensure are empty. One option is to go ahead checking them one by one, whether you have five or a hundred.

Or the second option is to create a simple helper class that receives the EditTexts as a param and loop through them.

Here's a simple reusable method to do that for us.

```java
    /**
     * Determines if all  EditText views supplied are empty.
     *
     * @param views {@link EditText} views to be checked.
     *
     * @return true if all {@link EditText} views are empty, false otherwise.
     */
    public static boolean isEmpty(final EditText... views) {
        for (final EditText view : views) {
            if (view != null) {
                if (!TextUtils.isEmpty(view.getText().toString())) {
                    return false;
                }
            }
        }

        return true;
    }
```

## AppCompatEditText

_Android AppCompatEditText Tutorial and Example._

#### Creating a Custom EditText

Let's say we want to create a custom AppCompatEditText called a `TextBox`.

We will supply a constructorand can override various events as per our wish.

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.KeyEvent;

public class TextBox extends android.support.v7.widget.AppCompatEditText
{
    Context context;

    public TextBox(Context context, AttributeSet attributeSet)
    {
        super(context,attributeSet);
        this.context = context;
    }

    @Override
    public boolean onKeyPreIme(int keyCode, KeyEvent keyEvent)
    {
        if(keyCode == KeyEvent.KEYCODE_BACK) // if back button is pressed
        {
           GameStandard.instance.finish();
        }
        return false;
    }
}
```

## TextInputEditText

_Android TextInputEditText Tutorial._

This is a subclass of `android.widget.EditText` designed to be used as a child of `android.support.design.widget.TextInputLayout`.

`TextInputLayout` itself is important since it wraps an `TextInputEditText` and shows a floating label when the hint is hidden due to the user inputting text.

TextInputEditText is compatible with older versions of the platform in that it derives from `AppCompatEditText`.

This allows it to inherit alot of features and apis.

## TextInputLayout

_Android TextInputLayout Tutorial and Example_

TextInputLayout is a layout that wraps `android.widget.EditText` to show a floating label when the hint is hidden due to the user inputting text.

This layout is normally used with `android.support.design.widget.TextInputEditText`.

Some of the unique features it supports include:

- Enabling and Setting Errors via `setErrorEnable(boolean)` and `setError(CharSequence)`.
- Character counter via `setCounterEnabled(boolean)`.

This class resides in the `android.support.design.widget` package.

```java
package android.support.design.widget;
```

`TextInputEditText` inherits from `LinearLayout`:

```java
public class TextInputLayout extends LinearLayout {}
```

`TextInputLayout` can only contain one EditText. Attempt to add more than one will result to `java.lang.IllegalArgumentException`.

#### Designin Android App Login Page

Let's also see a login page:

```xml

<?xml version="1.0" encoding="utf-8"?>

<ScrollView
    android_layout_width="fill_parent"
    android_background="@color/colorPrimary"
    android_layout_height="fill_parent"
    android_fitsSystemWindows="true">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_paddingTop="56dp"
        android_paddingLeft="24dp"
        android_paddingRight="24dp">

        <ImageView
            android_src="@drawable/ic_local_taxi_black_24dp"
            android_layout_width="72dp"
            android_layout_height="72dp"
            android_layout_marginBottom="24dp"
            android_layout_gravity="center_horizontal" />

        <!-- Email Label -->
        <android.support.design.widget.TextInputLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="8dp"
            android_layout_marginBottom="8dp">
            <EditText android_id="@+id/input_email"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_inputType="textEmailAddress"
                android_textColor="#ffffff"
                android_hint="Email" />
        </android.support.design.widget.TextInputLayout>

        <!-- Password Label -->
        <android.support.design.widget.TextInputLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="8dp"
            android_layout_marginBottom="8dp">
            <EditText android_id="@+id/input_password"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_inputType="textPassword"
                android_textColor="#ffffff"
                android_hint="Password"/>
        </android.support.design.widget.TextInputLayout>

        <android.support.v7.widget.AppCompatButton
            android_id="@+id/btn_login"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginTop="24dp"
            android_layout_marginBottom="24dp"
            android_background="@color/colorPrimaryDark"
            android_padding="12dp"
            android_textColor="#ffffff"
            android_text="Login"/>

        <TextView android_id="@+id/link_signup"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="24dp"
            android_textColor="#ffffff"
            android_text="No account yet? Create one"
            android_gravity="center"
            android_textSize="16dip"/>

    </LinearLayout>
</ScrollView>
```
