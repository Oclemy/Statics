# CookieBar

>  CookieBar is a lightweight library for showing a brief message at the top or bottom of the screen..

CookieBar is a lightweight library for showing a brief message at the top or bottom of the screen.

### Screenshot

![Toast Library Tutorial](https://github.com/liuguangqiang/CookieBar/raw/master/arts/default.gif)

![Toast Library Tutorial](https://github.com/liuguangqiang/CookieBar/raw/master/arts/custom.gif)



### Step 1: Install

Install the library using the following implementation statement:

```groovy
dependencies {
   	implementation 'com.liuguangqiang.cookie:CookieBar:1.0.1'
}
```

 via Maven:

```xml
<dependency>
  <groupId>com.liuguangqiang.cookie</groupId>
  <artifactId>CookieBar</artifactId>
  <version>1.0.1</version>
  <type>pom</type>
</dependency>
```

### Step 2: Use

Use it as shown in the below examples:

#### A simple CookieBar.

```java
new CookieBar.Builder(MainActivity.this)
                        .setTitle("TITLE")
                        .setMessage("MESSAGE")
                        .show();
```


#### A CookieBar with a icon and a action button.

```java
new CookieBar.Builder(MainActivity.this)
                        .setTitle("TITLE")
                        .setIcon(R.mipmap.ic_launcher)
                        .setMessage("MESSAGE")
                        .setAction("ACTION", new OnActionClickListener() {
                            @Override
                            public void onClick() {
                            }
                        })
                        .show();
```


#### Styling

You can change the default style by set the Theme's attributes.

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
   <item name="cookieTitleColor">@color/default_title_color</item>
   <item name="cookieMessageColor">@color/default_message_color</item>
   <item name="cookieActionColor">@color/default_action_color</item>
   <item name="cookieBackgroundColor">@color/default_bg_color</item>
</style>
```


Or dynamically change the style with a cookie builder. Use the following properties:

- layoutGravity
- backgroundColor
- titleColor
- messageColor
- actionColor
- duration


### Full Example

Let us look at a full `CookieBar` Toast Library Example below.

<!--more-->

#### Step 1. Design Layouts

**(a). activity_main.xml**

> Our `activity_main` layout.

First you inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Furthermore design your XML layout using the following 2 UI widgets and ViewGroups:

1. `LinearLayout`
2. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="64dp">

    <Button
        android:id="@+id/btn_top"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Top cookie" />

    <Button
        android:id="@+id/btn_bottom"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Bottom cookie" />

    <Button
        android:id="@+id/btn_top_with_icon"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Top cookie with a icon" />

    <Button
        android:id="@+id/btn_custom"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="A custom cookie" />
</LinearLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.java**

> Our `MainActivity` class.

Here is the full code for `MainActivity`:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.liuguangqiang.cookie.CookieBar;
import com.liuguangqiang.cookie.OnActionClickListener;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnTop = (Button) findViewById(R.id.btn_top);
        btnTop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new CookieBar.Builder(MainActivity.this)
                        .setTitle(R.string.cookie_title)
                        .setMessage(R.string.cookie_message)
                        .show();
            }
        });

        Button btnBottom = (Button) findViewById(R.id.btn_bottom);
        btnBottom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new CookieBar
                        .Builder(MainActivity.this)
                        .setTitle(R.string.cookie_title)
                        .setIcon(R.mipmap.ic_launcher)
                        .setMessage(R.string.cookie_message)
                        .setLayoutGravity(Gravity.BOTTOM)
                        .setAction(R.string.cookie_action, new OnActionClickListener() {
                            @Override
                            public void onClick() {
                                Toast.makeText(getApplicationContext(), "点击后，我更帅了!", Toast.LENGTH_LONG).show();
                            }
                        })
                        .show();
            }
        });

        Button btnTopWithIcon = (Button) findViewById(R.id.btn_top_with_icon);
        btnTopWithIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new CookieBar.Builder(MainActivity.this)
                        .setMessage(R.string.cookie_message)
                        .setDuration(10000)
                        .setActionWithIcon(R.mipmap.ic_action_close, new OnActionClickListener() {
                            @Override
                            public void onClick() {
                                Toast.makeText(getApplicationContext(), "点击后，我更帅了!", Toast.LENGTH_LONG).show();
                            }
                        })
                        .show();
            }
        });

        Button btnCustom = (Button) findViewById(R.id.btn_custom);
        btnCustom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new CookieBar.Builder(MainActivity.this)
                        .setTitle(R.string.cookie_title)
                        .setMessage(R.string.cookie_message)
                        .setDuration(3000)
                        .setBackgroundColor(R.color.colorPrimary)
                        .setActionColor(android.R.color.white)
                        .setTitleColor(R.color.colorAccent)
                        .setAction(R.string.cookie_action, new OnActionClickListener() {
                            @Override
                            public void onClick() {
                                Toast.makeText(getApplicationContext(), "点击后，我更帅了!", Toast.LENGTH_LONG).show();
                            }
                        })
                        .show();
            }
        });
    }

}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/liuguangqiang/CookieBar/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/liuguangqiang/CookieBar).|
|3.|Follow code author [here](https://github.com/liuguangqiang).|
