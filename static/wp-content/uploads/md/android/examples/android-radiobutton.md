# Kotlin Android RadioGroup and RadioButton Tutorial and Example


In this tutorial we want to explore RadioGroup and RadioButton, see how to work with these two.

RadioButton is a compound button and is normally used in conjuction with RadioGroup. Thus checking one RadioButton unchecks the others.

In this tutorial we want to look at some radiobutton examples. These examples are written in either Kotlin or Java. Android Studio is used to build them.


## Example 1: Kotlin Android Simple RadioButton Example

This is a simple example written in Kotlin.

### Step 1: Dependencies

No special dependencies are needed.

### Step 2: Layouts

In your main activity layout, wrap your radiobutton with a radiogroup as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity"
    android:textDirection="ltr"
    android:layoutDirection="ltr">

    <RadioGroup
        android:id="@+id/rdg_main_color"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="40dp"
        android:layout_marginTop="60dp">

        <RadioButton
            android:id="@+id/rdb_main_red"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"
            android:text="Red" />

        <RadioButton
            android:id="@+id/rdb_main_green"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Green" />

        <RadioButton
            android:id="@+id/rdb_main_blue"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Blue" />

    </RadioGroup>

    <RadioGroup
        android:id="@+id/rdg_main_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="40dp"
        android:layout_marginTop="40dp">

        <RadioButton
            android:id="@+id/rdb_main_ali"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"
            android:text="Ali" />

        <RadioButton
            android:id="@+id/rdb_main_reza"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Reza" />

        <RadioButton
            android:id="@+id/rdb_main_Alireza"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Alireza" />

    </RadioGroup>

    <TextView
        android:id="@+id/tv_main_result"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="60dp"
        android:gravity="center"
        android:textColor="@color/colorBlack"
        android:textSize="35dp"
        tools:text="name" />

    <Button
        android:id="@+id/btn_main_result"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="10dp"
        android:layout_marginTop="30dp"
        android:layout_marginRight="10dp"
        android:padding="10dp"
        android:text="View Result"
        android:textAllCaps="false" />

</LinearLayout>
```

### Step 3: Write code

This example comprises only a single activity.

**MainActivity.kt**

```kotlin
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.RadioGroup
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    var color: Int = Color.RED
    var name: String = "Ali"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

//        on click item radio gruop color
        rdg_main_color.setOnCheckedChangeListener { group, checkedId ->
            color = when(checkedId){
                R.id.rdb_main_red -> Color.RED
                R.id.rdb_main_green -> Color.GREEN
                R.id.rdb_main_blue -> Color.BLUE
                else -> Color.BLACK
            }
        }

//        on click item radio gruop name
        rdg_main_name.setOnCheckedChangeListener { group, checkedId ->
            name = when(checkedId){
                R.id.rdb_main_ali -> "Ali"
                R.id.rdb_main_reza -> "Reza"
                R.id.rdb_main_Alireza -> "Alireza"
                else -> ""
            }
        }

//        on click button result
        btn_main_result.setOnClickListener {
            tv_main_result.text = name
            tv_main_result.setTextColor(color)
        }

    }
}
```

### Reference

Download the code below:

| No | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-RadioButton-in-android-kotlin/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-RadioButton-in-android-kotlin/) Code |
| 3. | [Follow](https://github.com/alirezabashi98) Code author |

## Example 2: RadioButton and RadioGroup Example

Let's look at an example.

### Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

#### (a). activity_main.xml

First we will create our `activity_main.xml` layout. At the root we have a [RelativeLayout](https://camposha.info/android/relativelayout).

Inside the relativelayout we have our header label, basically a TextView widget which will show our header text.

Then we create a RadioGroup, this RadioGroup will wrap our RadioButtons.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.msradiobutton.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_fontFamily="casual"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_text="RadioGroup and RadioButton"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />
    <RadioGroup
        android_id="@+id/myRadioGroup"
        android_layout_centerInParent="true"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content">
        <RadioButton
            android_id="@+id/americaRadioButton"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="America"
            android_padding="5dp" />
        <RadioButton
            android_id="@+id/europeRadioButton"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="Europe"
            android_padding="5dp" />
        <RadioButton
            android_id="@+id/asiaRadioButton"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="Asia"
            android_padding="5dp" />
        <RadioButton
            android_id="@+id/africaRadioButton"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="Africa"
            android_padding="5dp" />
    </RadioGroup>
</RelativeLayout>
```

### MainActivity.java

Here's our main [activity](https://camposha.info/android/activity) file. Its deriving from `android.app.Activity`.

As instance fields we will have a RadioGroup and multiple RadioButtons.

Then we will initialize them using the `findViewById()` method.

We will then listen to the `CheckedChangeListener` listener of our radiogroup.

When any RadioButton in our radioGroup is checked, we will first obtain it's id:

```java
int checkedItemId = myRadioGroup.getCheckedRadioButtonId();
```

Then we can use the id to to find the actual radiobutton:

```java
RadioButton checkedRadioButton=findViewById(checkedItemId);
```

Then get it's value and show in a Toast message:

```java
Toast.makeText(MainActivity.this,checkedRadioButton.getText(),Toast.LENGTH_SHORT).show();
```

here's the full code:

```java
package info.camposha.msradiobutton;

import android.app.Activity;
import android.os.Bundle;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

public class MainActivity extends Activity {

    RadioGroup myRadioGroup;
    RadioButton americaRadioButton,europeRadioButton,asiaRadioButton,africaRadioButton;

    /*
    Initialize Widgets
     */
    private void initializeWidgets()
    {
        //reference the widgets
        myRadioGroup=findViewById(R.id.myRadioGroup);
        americaRadioButton=findViewById(R.id.americaRadioButton);
        europeRadioButton=findViewById(R.id.europeRadioButton);
        asiaRadioButton=findViewById(R.id.asiaRadioButton);
        africaRadioButton=findViewById(R.id.africaRadioButton);

        //when any radiobutton in our radiogroup is checked, show its value
        myRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                int checkedItemId = myRadioGroup.getCheckedRadioButtonId();
                RadioButton checkedRadioButton=findViewById(checkedItemId);
                Toast.makeText(MainActivity.this,checkedRadioButton.getText(),Toast.LENGTH_SHORT).show();
            }
        });

    }
    /*
    when activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeWidgets();
    }
}
```
