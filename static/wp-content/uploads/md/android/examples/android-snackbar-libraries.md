# SnackBar Library



Snackbars provide lightweight feedback about an operation. They show a brief message at the bottom of the screen on mobile and lower left on larger devices. Snackbars appear above all other elements on screen and only one can be displayed at a time.

They automatically disappear after a timeout or after user interaction elsewhere on the screen, particularly after interactions that summon a new surface or activity. [Snackbars](https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar) can be swiped off screen.

In this tutorial we will look at the top Snackbar libraries alongside examples of how to use those libraries.


If you prefer to use the default or standard Android SDK SnackBar then we have several examples [here](https://camposha.info/android-examples/android-snackbar/).

## (a). TSnackbar

> Android Snackbar from the Top.

Here is the demo:

![TSnackBar Demo](https://raw.githubusercontent.com/AndreiD/TSnackBar/master/app/snackbar.gif)

### Step 1: Install it

To install if first register jitpack in your project-level `build.gradle` under the `allProjects` closure:

```groovy
        maven {
            url 'https://jitpack.io'
        }
```

Then declare the dependency statement in the `app/build.gradle` under the dependencies closure:

```groovy
implementation 'com.github.Redman1037:TSnackBar:V2.0.0'
```

Sync.

### Step 2: Show SnackBar

For example to show a simple snackbar:

```kotlin
TSnackbar.make(findViewById(android.R.id.content),"Hello from TSnackBar.",TSnackbar.LENGTH_LONG).show();
```

To create a custom callback for example with different colors:

```kotlin
TSnackbar snackbar = TSnackbar.make(findViewById(android.R.id.content), "A Snackbar is a lightweight material design method for providing feedback to a user, while optionally providing an action to the user.", TSnackbar.LENGTH_LONG);
snackbar.setActionTextColor(Color.WHITE);
View snackbarView = snackbar.getView();
snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
textView.setTextColor(Color.YELLOW);
snackbar.show();
```

Here are more customization examples:

```kotlin
//vectordrawable
TSnackbar snackbar = TSnackbar
        .make(relative_layout_main, "Snacking with VectorDrawable", TSnackbar.LENGTH_LONG);
        snackbar.setActionTextColor(Color.WHITE);
        snackbar.setIconLeft(R.drawable.ic_android_green_24dp, 24);
        View snackbarView = snackbar.getView();
        snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
        TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
        textView.setTextColor(Color.YELLOW);
        snackbar.show();

  //left and right icon
 TSnackbar snackbar = TSnackbar
         .make(relative_layout_main, "Snacking Left & Right", TSnackbar.LENGTH_LONG);
         snackbar.setActionTextColor(Color.WHITE);
         snackbar.setIconLeft(R.mipmap.ic_core, 24); //Size in dp - 24 is great!
         snackbar.setIconRight(R.drawable.ic_android_green_24dp, 48); //Resize to bigger dp
         snackbar.setIconPadding(8);
         snackbar.setMaxWidth(3000); //if you want fullsize on tablets
         View snackbarView = snackbar.getView();
         snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
         TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
         textView.setTextColor(Color.YELLOW);
         snackbar.show();
```

### Full Example

Here's a full example. You will find more code like the layouts in the download.

**MainActivity.kt**

```kotlin
package com.androidadvance.tsnackbar;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.androidadvance.topsnackbar.TSnackbar;

public class MainActivity extends AppCompatActivity {

    private RelativeLayout relative_layout_main;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button_example_1 =  findViewById(R.id.button_example_1);
        Button button_example_2 =  findViewById(R.id.button_example_2);
        Button button_example_3 =  findViewById(R.id.button_example_3);
        Button button_example_4 =  findViewById(R.id.button_example_4);
        Button button_example_5 =  findViewById(R.id.button_example_5);
        Button button_example_6 =  findViewById(R.id.button_example_6);
        Button button_toolbar =  findViewById(R.id.button_example_toolbar);

        relative_layout_main =  findViewById(R.id.relative_layout_main);

        button_example_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TSnackbar.make(relative_layout_main, "Hello from VSnackBar 1", TSnackbar.LENGTH_LONG)
                        .show();
            }
        });

        button_example_2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                TSnackbar snackbar = TSnackbar
                        .make(relative_layout_main, "Had a snack at Snackbar", TSnackbar.LENGTH_LONG)
                        .setAction("Undo", new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Log.d("Action Button", "onClick triggered");
                            }
                        });
                snackbar.setActionTextColor(Color.LTGRAY);
                snackbar.setIconLeft(R.mipmap.ic_core, 24);
                View snackbarView = snackbar.getView();
                snackbarView.setBackgroundColor(Color.parseColor("#555555"));
                TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
                textView.setTextColor(Color.WHITE);
                snackbar.show();

            }
        });

        button_example_3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                TSnackbar snackbar = TSnackbar
                        .make(relative_layout_main, "Had a snack at Snackbar", TSnackbar.LENGTH_LONG)
                        .setAction("Action", new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                Log.d("CLICKED Action", "CLIDKED Action");
                            }
                        });
                snackbar.setActionTextColor(Color.WHITE);
                View snackbarView = snackbar.getView();
                snackbarView.setBackgroundColor(Color.parseColor("#0000CC"));
                TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
                textView.setTextColor(Color.WHITE);
                snackbar.show();

            }
        });

        button_example_4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                TSnackbar snackbar = TSnackbar
                        .make(relative_layout_main, "Had a snack at Snackbar  Had a snack at Snackbar  Had a snack at Snackbar Had a snack at Snackbar Had a snack at Snackbar Had a snack at Snackbar", TSnackbar.LENGTH_LONG);
                snackbar.setActionTextColor(Color.WHITE);
                View snackbarView = snackbar.getView();
                snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
                TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
                textView.setTextColor(Color.YELLOW);
                snackbar.show();

            }
        });

        button_example_5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                TSnackbar snackbar = TSnackbar
                        .make(relative_layout_main, "Snacking with VectorDrawable", TSnackbar.LENGTH_LONG);
                snackbar.setActionTextColor(Color.WHITE);
                snackbar.setIconLeft(R.drawable.ic_android_green_24dp, 24);
                View snackbarView = snackbar.getView();
                snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
                TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
                textView.setTextColor(Color.YELLOW);
                snackbar.show();

            }
        });

        button_example_6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                TSnackbar snackbar = TSnackbar
                        .make(relative_layout_main, "Snacking Left & Right", TSnackbar.LENGTH_LONG);
                snackbar.setActionTextColor(Color.WHITE);
                snackbar.setIconLeft(R.mipmap.ic_core, 24); //Size in dp - 24 is great!
                snackbar.setIconRight(R.drawable.ic_android_green_24dp, 48); //Resize to bigger dp
                snackbar.setIconPadding(8);
                snackbar.setMaxWidth(3000);
                View snackbarView = snackbar.getView();
                snackbarView.setBackgroundColor(Color.parseColor("#CC00CC"));
                TextView textView = (TextView) snackbarView.findViewById(com.androidadvance.topsnackbar.R.id.snackbar_text);
                textView.setTextColor(Color.YELLOW);
                snackbar.show();

            }
        });

        button_toolbar.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, ToolbarActivityExample.class));
            }
        });
    }
}
```

### Reference

below are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/AndreiD/TSnackBar/tree/master/app) Example |
| 2. | [Read](https://github.com/AndreiD/TSnackBar/) more |
| 3. | [Follow](https://github.com/AndreiD/) library author |

## (b). Light

> Light is just the usual Snackbar, but elegant.

below are the demos:

| success | Info | warning |
| --- | --- | --- |
| [![Success](https://github.com/TonnyL/Light/raw/master/images/success.png)](https://github.com/TonnyL/Light/blob/master/images/success.png) | [![Info](https://github.com/TonnyL/Light/raw/master/images/info.png)](https://github.com/TonnyL/Light/blob/master/images/info.png) | [![Warning](https://github.com/TonnyL/Light/raw/master/images/warning.png)](https://github.com/TonnyL/Light/blob/master/images/warning.png) |

| Error | Normal | Custom |
| --- | --- | --- |
| [![Error](https://github.com/TonnyL/Light/raw/master/images/error.png)](https://github.com/TonnyL/Light/blob/master/images/error.png) | [![Normal](https://github.com/TonnyL/Light/raw/master/images/normal.png)](https://github.com/TonnyL/Light/blob/master/images/normal.png) | [![Custom](https://github.com/TonnyL/Light/raw/master/images/custom.png)](https://github.com/TonnyL/Light/blob/master/images/custom.png) |

### Step 1: Install it

Start by installing it using the following implementation statement:

```groovy
dependencies {
    implementation 'io.github.tonnyl:light:1.0.0'
}
```

Or copy the project from [here](https://github.com/TonnyL/Light/tree/master/light).

### Step 2: Show SnackBar

With Light, each method always returns a `Snackbar` object which you can then customize. If you call `show()` the snackbar gets shown.

For example to show a success snackbar:

```kotlin
// Kotlin
import io.github.tonnyl.light.success

success(fab, "Success", Snackbar.LENGTH_SHORT)
    .setAction("Action", {
        Toast.makeText(this@MainActivity, "Hello, Light!", Toast.LENGTH_SHORT).show()
    })
    .show()
```

To display an info snackbar;

```kotlin
// Kotlin
import io.github.tonnyl.light.info

info(fab, "Info", Snackbar.LENGTH_SHORT).show()
```

To display a warning snackbar:

```kotlin
// Kotlin
import io.github.tonnyl.light.warning

warning(fab, "Warning", Snackbar.LENGTH_SHORT).show()
```

To display an error:

```kotlin
// Kotlin
import io.github.tonnyl.light.error

error(fab, "Error", Snackbar.LENGTH_SHORT).show()
```

To display the default snackbar:

```kotlin
// Kotlin
import io.github.tonnyl.light.normal

normal(fab, "Normal", Snackbar.LENGTH_SHORT).show()
```

Here's an example of how to create a custom snackbar:

```kotlin
// Kotlin
import io.github.tonnyl.light.make

make(
    fab, // // The view to find a parent from.
    "Awesome Snackbar", // The message to show.
    Snackbar.LENGTH_INDEFINITE, // How long to display the message.
    R.drawable.ic_album_white_24dp, // The left icon of message to show.
    R.color.color_cyan, // The background color of Snackbar.
    android.R.color.white, // The color of text to show.
    R.drawable.ic_done_all_white_24dp,
    R.color.colorAccent) // The left icon of action text.
    .setAction("Done all", {
        // Do whatever you want to do.
        Toast.makeText(this@MainActivity, "Hello, Light!", Toast.LENGTH_SHORT).show()
    })
    .show()
```

### Full Example

Here's a full example. More code will be found in the download:

**MainActivity.kt**

```kotlin
import android.content.Intent
import android.graphics.Typeface.BOLD_ITALIC
import android.os.Bundle
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.StyleSpan
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import io.github.tonnyl.light.*
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*

class MainActivity : AppCompatActivity() {

    private var position = BOTTOM

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        button_success.setOnClickListener {
            success(fab, R.string.success, Snackbar.LENGTH_SHORT, position)
                    .setAction("Action", {
                        Toast.makeText(this@MainActivity, "Hello, Light!", Toast.LENGTH_SHORT).show()
                    })
                    .show()
        }

        button_info.setOnClickListener {
            info(fab, R.string.info, Snackbar.LENGTH_SHORT, position).show()
        }

        button_warning.setOnClickListener {
            warning(fab, R.string.warning, Snackbar.LENGTH_SHORT, position).show()
        }

        button_error.setOnClickListener {
            error(fab, R.string.error, Snackbar.LENGTH_SHORT, position).show()
        }

        button_normal.setOnClickListener {
            val prefix = "Formatted "
            val highlight = "bold italic"
            val suffix = " text"
            val ssb = SpannableStringBuilder(prefix)
                    .append(highlight)
                    .append(suffix)
                    .apply {
                        setSpan(StyleSpan(BOLD_ITALIC), prefix.length, prefix.length + highlight.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                    }
            normal(fab, ssb.toString(), Snackbar.LENGTH_SHORT, position).show()
        }

        button_custom.setOnClickListener {
            make(
                    fab,
                    "Awesome Snackbar",
                    Snackbar.LENGTH_SHORT,
                    R.drawable.ic_album_white_24dp,
                    R.color.color_cyan,
                    android.R.color.white,
                    R.drawable.ic_done_all_white_24dp,
                    R.color.colorAccent, position)
                    .setAction("Done all", {
                        Toast.makeText(this@MainActivity, "Hello, Light!", Toast.LENGTH_SHORT).show()
                    })
                    .show()
        }

    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_settings -> {
                startActivity(Intent(this@MainActivity, SettingsActivity::class.java))
            }
            else -> {
                position = if (position == BOTTOM) {
                    item.title = "TOP"
                    TOP
                } else {
                    item.title = "BOTTOM"
                    BOTTOM
                }
            }
        }
        return true
    }

}
```

### Reference

below are the reference links;

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/TonnyL/Light/tree/master/sample) Example |
| 2. | [Read](https://github.com/TonnyL/Light/) more |
| 3. | [Follow](https://github.com/TonnyL/) library author |
