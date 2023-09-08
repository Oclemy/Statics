# Android Intent Tutorial and Examples

_Android Intent Tutorial and Examples._

_An Intent with respect to android development is a mechanism for describing operations that need to be performed in an abstract manner._


As a class Intent belongs to `android.content` package.

```java
package android.content;
```

It does implement Parcelable and Cloneable.

```java
public class Intent implements Parcelable, Cloneable {}
```

#### Creating Intents

Intents can be created by instantiating the `android.content.Intent` class. Different Parameters can then be passed depending on the reason for the creation of the intent.

```java
public Intent() {}
```

```java
public Intent(Intent o) {}
```

```java
public Intent(String action) {}
```

```java
public Intent(String action, Uri uri) {}
```

```java
public Intent(Context packageContext, Class<?> cls){}
```

Example

```java
Intent i = new Intent(MainActivity.this, SecondActivity.class);
```

Intents have several methods commonly used.

#### Specifying Intent Actions

For example the `getAction()` method. This method gets used to get the general action to be performed. This action will then generally specify the way in which the information in the Intent should be interpreted.

```java
public String getAction() {}
```

The actions can be set using the `setAction()` method.

```java
public Intent setAction(String action){}
```

#### Limiting Intents to Packages

Intents can be limited to packages. We can do this explicitly using the `setPackage()`. We can then retrieve the package the intent is limited to using the `getPackage()`.

```java
public String getPackage() {}
```

```java
public Intent setPackage(String packageName){}
```

#### Intent Categories

Categories do give out additional detaisl about the action the intent performs. During the resolution of an intent, only activities that provide all the requested categories get used.

Intent categories can be added, retrieved, removed or even checked.

To add an intent category you use the `addCategory()` method:

```java
public Intent addCategory(String category) {}
```

We can retrieve a collection or set of categories:

```java
public Set<String> getCategories() {}
```

We can also check if an intent has a given category:

```java
 public boolean hasCategory(String category) {}
```

We can also remove intent category:

```java
public void removeCategory(String category) {}
```

#### Putting Data To Intents

Let's now get to more common usage of intents. Intents get used alot to transfer data between [activities](https://camposha.info/android/activity).

We can pack data to intents, then start use them to start an activity and retrieve those data from the target activity.

1.First and foremost we instantiate the intent:

```java
Intent i=new Intent(MainActivity.this, PageOne.class);
```

where the `PageOne.class` is the target activity. The first parameter in this case is a Context object while the second parameter target class.

2.Secondly we invoke the `putExtra()` methods of the Intent object. The intent class has a variations of these putExtra() methods with various parameters. These variations exist so as to enable us transfer various data types via intents. Some of the data types that can be transfered via intents include:

#### Simple Data Types

These are the simple data types that can be transfered via intent:

1. **Boolean** : `public Intent putExtra(String name, boolean value)`
2. **Byte** : `public Intent putExtra(String name, byte value)`
3. **Char** : `public Intent putExtra(String name, char value)`
4. **Int** : `public Intent putExtra(String name, int value)`
5. **Long** : `public Intent putExtra(String name, long value)`
6. **Short** : `public Intent putExtra(String name, short value)`
7. **Float** : `public Intent putExtra(String name, float value)`
8. **Double** : `public Intent putExtra(String name, float value)`
9. **Double** : `public Intent putExtra(String name, double value)`
10. **CharSequence** : `public Intent putExtra(String name, CharSequence value)`

#### Parceled Data types

A parceled/parcelable type is a class whose instance can be written to and read from a parcel. A Parcel is final class belonging to `android.os` package and is a container for data and object references that are sendable through an IBinder. T Here are built in methods for transferring such data:

1. **Parcelable** : `public Intent putExtra(String name, Parcelable value)`|
2. **Parcelable[]** :`public Intent putExtra(String name, Parcelable[] value)`

#### Transferring ArrayLists via Intents

These are teh built-in methods for transferring arraylists:

1. **`ArrayList<Parcelable>`** : `public Intent putParcelableArrayListExtra(String name, ArrayList<? extends Parcelable>) value`
2. **`ArrayList<Integer>`** : `public Intent putIntegerArrayListExtra(String name, ArrayList<Integer> value)`
3. **`ArrayList<String>`** : `public Intent putStringArrayListExtra(String name, ArrayList<String> value)`
4. **`ArrayList<CharSequence>`** : `public Intent putCharSequenceArrayListExtra(String name, ArrayList<CharSequence> value)`

#### Transferring Arrays via Intents

You can transfer the arrays of our simple data types via intents using the following methods:

| column | column |
| --- | --- |
| Boolean[] | public Intent putExtra(String name, boolean[] value) |
| Byte[] | public Intent putExtra(String name, byte[] value) |
| Char[] | public Intent putExtra(String name, char[] value) |
| Int[] | public Intent putExtra(String name, int[] value) |
| Long[] | public Intent putExtra(String name, long[] value) |
| Float[] | public Intent putExtra(String name, float[] value) |
| Double[] | public Intent putExtra(String name, double[] value) |
| String[] | public Intent putExtra(String name, String[] value) |
| CharSequence[] | public Intent putExtra(String name, CharSequence[] value) |

#### Transferring a Bundle via Intent

A Bundle is a data structure which maps strings to Parcelable values. They can also be packed via this method:

1. **Bundle** : `public Intent putExtra(String name, Bundle value`

#### Transferring Serialized data via Intent

Serialization is the process of converting in memory objects into a rigid binary representation. This binary form is basically a sequence of bytes that can be passed around then be deserialized back into memory.

This is one of the techniques that can be used to pass around complex objects between activities.

Once we have the serialized class, we can pass it into the below method.

1. **Serializable** : public Intent putExtra(String name, Serializable value)

#### EXAMPLES

###### Sending Data

Let's say we have two activities: `MainActivity.java` and `PageOne.java`. All these two are activities:

| Activity | Description |
| --- | --- |
| **MainActivity.java** | Will contain a button that when we clicked we open the Second Activity(PageOne.java).We then transfer a simple string to that PageOne.java activity |
| **PageOne.java** | Will contain a textview to display a string it will receive from MainActivity. But first it will need to unpack that data via the key specified in the MainActivity. |

So say we do this in a button click:

```java
openBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent i=new Intent(MainActivity.this, PageOne.class);
                i.putExtra("MY_KEY","Hello World");
                MainActivity.this.startActivity(i);
            }
        });
```

So you can see from the above that:

| Code | Description |
| --- | --- |
| `Intent i=new Intent(MainActivity.this, PageOne.class);` | Create an Intent Object with a constructor taking two parameters, a Context object and Class type. |
| `i.putExtra("MY_KEY","Hello World");` | Invoke the `putExtra()` method of the intent class, passing in two parameters: a String key and String value. |
| `MainActivity.this.startActivity(i);` | Invoke the startActivity() method of the Activity class. We pass the Intent object as a parameter. |

Well that will send data to SecondActivity.

##### Receiving Data

Now we need to receive data from MainActivity and show in a textview:

We can just do this inside the onCreate() method of that activity:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_one);

        TextView greetingTxt= (TextView) findViewById(R.id.myGreetingTxt);
        greetingTxt.setText(getIntent().getExtras().getString("MY_KEY"));
    }
```

1. `TextView greetingTxt= (TextView) findViewById(R.id.myGreetingTxt);` : Just references us a TextView that we can use to display our greeting.
2. `greetingTxt.setText(getIntent().getExtras().getString("MY_KEY"));` : First we retrieve an Intent object from this Activity by calling the `getIntent()` method. All activities have an Intent object that did start them. Once we have the Intent object we call it's `getString()` method passing in our key. This gives us a string data from the intent or null if it does exist. We set the data into our `setText()` method of the TextView.

#### Example - Send Data From MainActivity to Second Activity.

Say we have these two activities:

1. MainActivity. java
2. SecondActivity.java

And these two layouts for the layous above respectively:

1. activity_main.xml
2. activity_second.xml

Here's how we will send data to the second activity. These data we are receiving from an edittext named `nameTxt` and a spinner named `launchYearSpinner` for selecting a year:

```java
    private void sendData()
    {
        Intent i=new Intent(this,SecondActivity.class);
        i.putExtra("NAME_KEY",nameTxt.getText().toString());
        i.putExtra("YEAR_KEY",launchYearSpinner.getSelectedItem().toString());
        startActivity(i);
    }
```

We pack data using the `putExtra` method. We start the second activity using the `startActivity` method of the [activity](https://camposha.info/android/activity) class.

Then in the second activity we will receive our data. First we obtain the Intent using the `getIntent()` method.

Then we use the following methods from the **Intent** class:

1. `getStringExtra` - we pass it a key. It allows us get a string from our intent.
2. `getIntExtra` - we pass the key and a default value, in this case `0`. This will give us an integer that we passed from the main activity.

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        nameTxt= (TextView) findViewById(R.id.nameTxt2);
        yearTxt= (TextView) findViewById(R.id.propellantTxt2);

        Intent i=this.getIntent();
        String name=i.getStringExtra("NAME_KEY");
        int year=i.getIntExtra("YEAR_KEY",0);

        nameTxt.setText("NAME : "+name);
        yearTxt.setText("LAUNCH YEAR : "+String.valueOf(year));

    }
```

#### Full Code:

##### 1\. Layouts

###### (a). activity_main.xml

This layout will be inflated into the main activit's layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.dataactivity_activity.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

###### (a). content_main.xml

This layout will be included in the activity_main.xml.

We have an edittext where users will type the data they want to pass to the second activity.

We also have a spinner where the user will select the year. The year will be an integer.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.dataactivity_activity.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_layout_width="match_parent"
        android_orientation="vertical"
        android_layout_height="match_parent">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="FIRST ACTIVITY" />

    <android.support.design.widget.TextInputLayout
        android_id="@+id/nameLayout"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <EditText
            android_id="@+id/nameEditTxt"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_singleLine="true"
            android_hint= "Name" />
    </android.support.design.widget.TextInputLayout>

           <Spinner
            android_id="@+id/sp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
             />

    </LinearLayout>
</RelativeLayout>
```

###### (b). activity_second.xml

This activity will be inflated into the second activity's user interface.

We pass two TextViews.

These will show the data that we will receive from the main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.dataactivity_activity.SecondActivity">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content">
        <TextView
            android_id="@+id/nameTxt2"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="NAME" />
        <TextView
            android_id="@+id/propellantTxt2"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="PROPELLANT" />
    </LinearLayout>

</RelativeLayout>
```

##### 2\. Activities

(a). MainActivity.java

```java
package com.tutorials.hp.dataactivity_activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

public class MainActivity extends AppCompatActivity {

    private EditText nameTxt;
    private Spinner launchYearSpinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        nameTxt= (EditText) findViewById(R.id.nameEditTxt);
        launchYearSpinner= (Spinner) findViewById(R.id.sp);

        fillYears();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sendData();
            }
        });
    }

    /*
    SEND DATA TO SECOND ACTIVITY
     */
    private void sendData()
    {
        Intent i=new Intent(this,SecondActivity.class);
        i.putExtra("NAME_KEY",nameTxt.getText().toString());
        i.putExtra("YEAR_KEY",launchYearSpinner.getSelectedItem().toString());
        startActivity(i);

    }

    private void fillYears()
    {
        ArrayAdapter adapter=new ArrayAdapter(this,android.R.layout.simple_list_item_1);
        adapter.add("2017");
        adapter.add("2018");
        adapter.add("2019");
        adapter.add("2020");
        adapter.add("2021");
        adapter.add("2022");

        launchYearSpinner.setAdapter(adapter);

    }

}
```

(b). SecondActivity.java

```java
package com.tutorials.hp.dataactivity_activity;

import android.content.Intent;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class SecondActivity extends AppCompatActivity {

    TextView nameTxt,yearTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        nameTxt= (TextView) findViewById(R.id.nameTxt2);
        yearTxt= (TextView) findViewById(R.id.propellantTxt2);

        Intent i=this.getIntent();
        String name=i.getStringExtra("NAME_KEY");
        int year=i.getIntExtra("YEAR_KEY",0);

        nameTxt.setText("NAME : "+name);
        yearTxt.setText("LAUNCH YEAR : "+String.valueOf(year));

    }

}
```

#### Quick Android Intent HowTos and Examples

##### 1\. How to Send an Email via Intent

Say you want users to send feedback via email.

First you need to instantiate the Intent with `Intent.ACTION_SENDTO` action passed as a parameter:

```java
        Intent send = new Intent(Intent.ACTION_SENDTO);
```

Then may be get the text to be send from an EditText. Then build a Uri text, parse it and pass it over to the `setData()` method of the Intent class.

Then invoke the `startActivity()` assuming you are inside an activity. If you are in a Fragment then you need the activity reference or a Context object.

Here's a method to send us email.

```java
void sendFeedback()
{
    String feedback;

    String subject = "Feedback";
    feedback=fftext.getText().toString();
    if(!feedback.trim().isEmpty())
    {

        Log.i("Send email", "");
        String TO = "youremail@gmail.com";

        Intent send = new Intent(Intent.ACTION_SENDTO);
        String uriText = "mailto:" + Uri.encode(TO) +
                "?subject=" + Uri.encode(subject) +
                "&body=" + Uri.encode(feedback);
        Uri uri = Uri.parse(uriText);

        send.setData(uri);
        startActivity(Intent.createChooser(send, "Send mail..."));
    }
    else
    {
        Toast.makeText(getApplicationContext(), "Please Enter Text in Feedback Details", Toast.LENGTH_SHORT).show();
    }
}
```

##### 2\. One static method to reuse in sending emails

This method returns you an Intent object which then you can use to show dialog for sending email.

```java
    public static Intent newEmailIntent(Context context, String address, String subject,
            String body, String cc) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_EMAIL, new String[] { address });
        intent.putExtra(Intent.EXTRA_TEXT, body);
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
        intent.putExtra(Intent.EXTRA_CC, cc);
        intent.setType("message/rfc822");
        return intent;
    }
```

##### 3\. How to Resolve Photo/Image from Intent

At the end of the day we want to return the image path.

```java
public static String resolvePhotoFromIntent(Context context , Intent intent , String appPath) {
        if(context == null || intent == null || appPath == null) {
            LogUtil.e(LogUtil.getLogUtilsTag(HelpUtils.class), "resolvePhotoFromIntent fail, invalid argument");
            return null;
        }
        Uri uri = Uri.parse(intent.toURI());
        Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
        try {

            String pathFromUri = null;
            if(cursor != null && cursor.getCount() > 0) {
                cursor.moveToFirst();
                int columnIndex = cursor.getColumnIndex(MediaStore.MediaColumns.DATA);
                // if it is a picasa image on newer devices with OS 3.0 and up
                if(uri.toString().startsWith("content://com.google.android.gallery3d")) {
                    // Do this in a background thread, since we are fetching a large image from the web
                    pathFromUri =  saveBitmapToLocal(appPath, createChattingImageByUri(intent.getData()));
                } else {
                    // it is a regular local image file
                    pathFromUri =  cursor.getString(columnIndex);
                }
                cursor.close();
                LogUtil.d(TAG, "photo from resolver, path: " + pathFromUri);
                return pathFromUri;
            } else {

                if(intent.getData() != null) {
                    pathFromUri = intent.getData().getPath();
                    if(new File(pathFromUri).exists()) {
                        LogUtil.d(TAG, "photo from resolver, path: " + pathFromUri);
                        return pathFromUri;
                    }
                }

                // some devices (OS versions return an URI of com.android instead of com.google.android
                if((intent.getAction() != null) && (!(intent.getAction().equals("inline-data")))){
                    // use the com.google provider, not the com.android provider.
                    // Uri.parse(intent.getData().toString().replace("com.android.gallery3d","com.google.android.gallery3d"));
                    pathFromUri =  saveBitmapToLocal(appPath, (Bitmap)intent.getExtras().get("data"));
                    LogUtil.d(TAG, "photo from resolver, path: " + pathFromUri);
                    return pathFromUri;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(cursor != null) {
                cursor.close();
            }
        }

        LogUtil.e(TAG, "resolve photo from intent failed ");
        return null;
    }
```

##### 4\. How to open a web browser via Intent

```java
 Uri uri = Uri.parse("http://www.example.com");
 Intent intent = new Intent(Intent.ACTION_VIEW, uri);
 startActivity(intent);
```

##### 5\. How to open a Phone Dialer

This method will create us an intent which when fired, will launch the phone's dialer. You pass the phone number to be dialed as a parameter.

```java

    public static Intent newDialNumberIntent(final String phoneNum) {
        return IntentBuilder.with(Intent.ACTION_DIAL)
                            .addData(Uri.parse("tel:" + phoneNum.replace(" ", "")))
                            .isExternal()
                            .build();
    }
```

##### 6\. How to launch Google Maps via Intent

This method will Create us an intent which when fired, will launch Google Maps. We pass the address to be displayed on the map as well as the title for the address.

```java
    public static Intent newMapIntent(final String address, final String title) {
        final StringBuilder request = new StringBuilder();

        request.append("geo:0,0?q=");
        request.append(Uri.encode(address));

        if (!TextUtils.isEmpty(title)) {
            final String encoded = String.format("(%s)", title);

            request.append(encoded);
        }

        request.append("&hl=");
        request.append(Locale.getDefault().getLanguage());

        return IntentBuilder.with(Intent.ACTION_VIEW).addData(Uri.parse(request.toString())).build();
    }
```

##### 7\. How to launch the the phone's picture gallery to select a picture from it via Intent

As a parameter we will pass a title to be used with the Intent chooser.

```java
    public static Intent newSelectPictureIntent(final String title) {
        return Intent.createChooser(IntentBuilder.with(Intent.ACTION_PICK).addType("image/*").build(), title);
    }
```

##### 8\. How to launch the Camera to take Picture that's saved to a temporary file via Intent

The advantage of this is that picture can be used directly since it's saved in a temporary directory. We pass the File object which will be used to temporarily store the picture.

```java

    public static Intent takePictureIntent(final File file) {
        return IntentBuilder.with(MediaStore.ACTION_IMAGE_CAPTURE)
                            .add(MediaStore.EXTRA_OUTPUT, Uri.fromFile(file))
                            .build();
    }
```

##### 9\. How to Check Intent Availability

```java
    /**
     * Indicates whether the specified action can be used as an intent. This
     * method queries the package manager for installed packages that can
     * respond to an intent with the specified action. If no suitable package is
     * found, this method returns false.
     *
     * @param context {@link Context} used to retrieve the {@link PackageManager}.
     * @param intent  {@link Intent} to check for availability.
     *
     * @return true if an Intent with the specified action can be sent and responded to, false otherwise.
     */
    private static boolean isIntentAvailable(final Context context, final Intent intent) {
        final PackageManager packageManager = context.getPackageManager();
        final List<ResolveInfo> list;

        if (packageManager == null) {
            return false;
        }

        list = packageManager.queryIntentActivities(intent, PackageManager.MATCH_DEFAULT_ONLY);

        return list.size() > 0;
    }
```

##### 10\. How to Start an Activity via Intent

You supply us the Intent as a parameter as well as the Context. Then we start the activity using the `startActivity()` method of the Context class. The Context will be used in getting the PackageManager.

This method will make use of the above `isIntentAvailable()` method.

```java

    public static void startActivityByIntent(final Context context, final Intent intent) {
        if (IntentUtils.isIntentAvailable(context, intent)) {
            context.startActivity(intent);
        }
    }
```
