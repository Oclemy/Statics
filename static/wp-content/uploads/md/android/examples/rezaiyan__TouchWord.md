# How to Get an Individual Touched Word in a TextView


>  Get the Touched individual word from a TextView with a paragraph.

A sample app to how to get touched a word on the TextView.

Here is the demo:

![TextView Tutorial](https://github.com/rezaiyan/TouchWord/raw/master/art/p1.jpg)


#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        tools:text="@string/sampleText"
        android:padding="8dp"
        android:textSize="16sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Log` from the `android.util` package.
2. `View` from the `android.view` package.
3. `Toast` from the `android.widget` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onClick(widget: View) `.
3. `updateDrawState(ds: TextPaint) `.

Then we will be creating the following functions:

1. `getClickableSpan(parameter)` - We pass a `String` object as a parameter.

**(a). Our `getClickableSpan()` function**

Write the `getClickableSpan()` function as follows:

```kotlin
    private fun getClickableSpan(word: String): ClickableSpan? {
        return object : ClickableSpan() {
            override fun onClick(widget: View) {
                Log.d("tapped on:", word)
                Toast.makeText(widget.context, word, Toast.LENGTH_SHORT)
                        .show()
            }

            override fun updateDrawState(ds: TextPaint) {
                ds.isUnderlineText = false
                ds.isAntiAlias = true
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Build
import android.os.Bundle
import android.text.Html
import android.text.Spannable
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.text.BreakIterator
import java.util.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val sampleText = getString(R.string.sampleText)

        textView.movementMethod = LinkMovementMethod.getInstance()

        val htmlText = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            Html.fromHtml(sampleText, Html.FROM_HTML_MODE_LEGACY);
        } else {
            Html.fromHtml(sampleText);
        }

        textView.text = htmlText
        val rawText = textView.text.toString()
        val iterator = BreakIterator.getWordInstance(Locale.US)

        iterator.setText(rawText)

        var start = iterator.first()
        var end = iterator.next()

        while (end != BreakIterator.DONE) {
            val possibleWord = rawText.substring(start, end)
            if (Character.isLetterOrDigit(possibleWord[0])) {
                val clickSpan = getClickableSpan(possibleWord)
                (textView.text as Spannable).setSpan(clickSpan, start, end,
                        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
            }
            start = end
            end = iterator.next()
        }
    }

    private fun getClickableSpan(word: String): ClickableSpan? {
        return object : ClickableSpan() {
            override fun onClick(widget: View) {
                Log.d("tapped on:", word)
                Toast.makeText(widget.context, word, Toast.LENGTH_SHORT)
                        .show()
            }

            override fun updateDrawState(ds: TextPaint) {
                ds.isUnderlineText = false
                ds.isAntiAlias = true
            }
        }
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/rezaiyan/TouchWord/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/rezaiyan/TouchWord).|
|3.|Follow code author [here](https://github.com/rezaiyan).|
