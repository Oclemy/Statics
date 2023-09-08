# BroadcastReceiver Tutorial and Examples


_A BroadcastReceiver is an android component responsible for listening to system-wide broadcast events or intents._

In [Android](https://camposha.info/android/introduction), most system events are broadcast through Intent objects. To do this these Intent objects get sent to the **BroadcastReceivers** using the `Context.sendBroadcast()` methods.


When such an event is broadcasted the BroadcastReceiver will receive the event and react by either creating a status bar notification or performing a given task.

A BroadcastReceiver is an android component like Activity and Service hence most of the times it needs to be registered in the android manifest file.

However unlike the Activity, BroadcastReceivers don't have any user interface.

BroadcastReceiver as a class is abstract, hence normally has a method called `onReceive()` that we do override to do the task we want to happen when the task is received.

Most of the standard system events are defined as action strings and can be found in the API documentation for the Intent class.

Suppose for example, if your app needs to be notified whenever the user connects or disconnects the charger to the device, two broadcast actions defined in the Intent class do that:

1. `ACTION_POWER_DISCONNECTED`
2. `ACTION_POWER_CONNECTED`.

Here's an example.

```java
public class PhoneChargerConnectedListener extends BroadcastReceiver {
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (Intent.ACTION_POWER_CONNECTED.equals(action)) {
            context.startService(
            new Intent(MyService.ACTION_POWER_CONNECTED));
        } else if (Intent.ACTION_POWER_DISCONNECTED.equals(action)) {
        context.startService(
        new Intent(MyService.ACTION_POWER_DISCONNECTED));
        }
    }
}
```

In this method, the only thing you do is call `Context.startService()` to delegate the event to a service that performs the actual work.

#### How do I register BroadcastReceiver?

Well we can register broadcastReceiver in two ways.

##### 1\. Via AndroidManifest.xml

The default method for implementing **BroadcastReceivers** is to declare them in the android manifest. Because of that, it’s possible for the BroadcastReceiver to notify your service even though the user hasn’t started your application.

This is especially useful for applications that should start on certain system events without user interaction.

```xml
<receiver android_name=".PhoneChargerConnectedListener">
    <intent-filter>
        <action android_name="android.intent.action.ACTION_POWER_CONNECTED"/>
        <action android_name="android.intent.action.ACTION_POWER_DISCONNECTED"/>
    </intent-filter>
</receiver>
```

This method is also the easiest way.

By using `AndroidManifest.xml` to register **BroadcastReceiver**, your application will be getting the Broadcasts until you uninstall the application. This means you sacifice a little bit of control or the BroadcastReceiver's lifecycle as you can't just register it and unregister it as you wish.

To do that, you check the next way of registering broadcast receivers.

##### 2\. Programmatically

BroadcastReceivers can also be registered programmatically within [Activities](https://camposha.info/android/activity) and Services.

Infact some broadcast Intents can only be registered programmatically. On the other hand some only work if you declare them in your manifest.

When you register a **BroadcastReceiver** programmatically you also have to remember to unregister it in the matching callback.

Here's an example:

```java
public class MyActivity extends AppCompatActivity {
    private PhoneChargerConnectedListener myPhoneChargerConnectedListener;
    @Override
    protected void onResume() {
        super.onResume();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_POWER_CONNECTED);
        intentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        myPhoneChargerConnectedListener = new PhoneChargerConnectedListener();
        registerReceiver(myPhoneChargerConnectedListener, intentFilter);
    }
    @Override
    protected void onPause() {
        super.onPause();
        unregisterReceiver(myPhoneChargerConnectedListener);
    }
}
```

In this case we have registered the BroadcastReceiver programmatically using the the `registerReceiver()` method of the Context class. By using this method, we can control our BroadcastReceiver's lifecycle by **registering** and **un-registering** them as per our requirement.

## Example 1: BroadcastReceiver Example with AlarmManager

Let's look at a simple broadcast receiver example with alarm manager written in Java.

We will have one activity and one class.

#### (a). MainActivity.java

Start by creating an activity in your android studio.

Here we have Our `MainActivity` class. This class will be Deriving from AppCompatActivity which resides in the support library.

We will have three methods:

1. `onCreate()`,
2. `initializeViews()`,
3. `go()`.

This activity's user interface will be inflated from `content_main.xml` using the `setContentView()` method.

The views we use are EditTexts and Buttons. We Reference them from our layout specification using `findViewById()`.

We will Initialize and start our alarm in the `go()` method.

```java
package com.tutorials.hp.alarmmanagerstarter;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    Button startBtn;
    EditText timeTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

         initializeViews();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews()
    {
        timeTxt= (EditText) findViewById(R.id.timeTxt);
        startBtn= (Button) findViewById(R.id.startBtn);

        startBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               go();
            }
        });
    }

    /*
    INITIALIZE AND START OUR ALARM
     */
    private void go()
    {
        //GET TIME IN SECONDS AND INITIALIZE INTENT
        int time=Integer.parseInt(timeTxt.getText().toString());
        Intent i=new Intent(this,MyReceiver.class);

        //PASS CONTEXT,YOUR PRIVATE REQUEST CODE,INTENT OBJECT AND FLAG
        PendingIntent pi=PendingIntent.getBroadcast(this,0,i,0);

        //INITIALIZE ALARM MANAGER
        AlarmManager alarmManager= (AlarmManager) getSystemService(ALARM_SERVICE);

        //SET THE ALARM
        alarmManager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis()+(time*1000),pi);
        Toast.makeText(MainActivity.this, "Alarm set in "+time+" seconds", Toast.LENGTH_SHORT).show();
    }

}
```

#### (b). MyReciever.java

- Our MyReciever class.
- Derives from android.content.BroadcastReceiver class.
- Methods: onReceive().
- We show a toast message in our`onReceive()` method to simulate alarm ringing.

```java
package com.tutorials.hp.alarmmanagerstarter;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyReceiver extends BroadcastReceiver {
    /*
    RING ALARM WHEN IN WHEN WE RECEIVE OUR BROADCAST
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Alarm Ringing...", Toast.LENGTH_SHORT).show();
    }
}
```

#### (c) activity_main.xml

- Our main activity layout file.
- Shall get inflated to MainActivity.
- Root tag is relativeLayout.
- Contains an EditText and a button.

```xml
<?xml version="1.0" encoding="utf-8"?>

<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.alarmmanagerstarter.MainActivity"
    >

    <EditText
        android_id="@+id/timeTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginTop="28dp"
        android_ems="10"
        android_hint="Number of seconds"
        android_inputType="numberDecimal" />

    <Button
        android_id="@+id/startBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignRight="@+id/timeTxt"
        android_layout_below="@+id/timeTxt"
        android_layout_marginRight="60dp"
        android_layout_marginTop="120dp"
        android_text="Start" />
</RelativeLayout>
```

#### (d). AndroidManifest.xml

We will have to register our BroadcastReceiver class in our android manifest.

Here's my manifest in full:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.alarmmanagerstarter">
    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="@string/app_name"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <receiver android_name="MyReceiver" >
        </receiver>
    </application>

</manifest>
```

## Example 2 : How to Display Notification For Low Battery using BroadcastReceiver

We are creating a simple BatteryManager using the BroadcasteReceiver class. We will show a the Battery Level in a TextView and show the progress in the progressbar.

Here is a demo image:

![BroadcastReceiver Battery Percentage](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/BroadcastReceiver-Battery-Percentage.jpg)

Here are some of the API's you may not know that we use:

**(a). BroadcastReceiver**

This is the base class for code that will receive intents sent by `sendBroadcast()`.

**(b). IntentFilter**

IntentFilter is a Structured description of Intent values to be matched. An IntentFilter can match against `actions`, `categories`, and `data` (either via its type, scheme, and/or path) in an Intent.

**(c). BatteryManager**

This class contains strings and constants used for values in the `ACTION_BATTERY_CHANGED` Intent.

**MainActivity.java**

This is the main activity.

```java
package com.example.ankitkumar.broadcastreceiver_batterymanager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ProgressBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    TextView batteryLevel;
    ProgressBar myProgressBar;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        batteryLevel = (TextView)findViewById(R.id.textView);
        myProgressBar = (ProgressBar)findViewById(R.id.progressBar);
        IntentFilter intentFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        registerReceiver(myBroadcastReceiver, intentFilter);

    }

    BroadcastReceiver myBroadcastReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            context.unregisterReceiver(this);
            int currentLevel = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            int level = -1;
            if (currentLevel >= 0 && scale > 0) {
                level = (currentLevel * 100) / scale;
            }
            batteryLevel.setText("Battery Level remaining :"+  level +"%");
            myProgressBar.setProgress(level);
        }
    };
}
```

**activity_main.xml**

This is the main activity's layout. Here we will have a TextView to show battery level and a progressbar to show battery percentage.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout
        tools_context="com.example.ankitkumar.broadcastreceiver_batterymanager.MainActivity" android_paddingTop="@dimen/activity_vertical_margin" android_paddingRight="@dimen/activity_horizontal_margin" android_paddingLeft="@dimen/activity_horizontal_margin" android_paddingBottom="@dimen/activity_vertical_margin" android_layout_height="match_parent" android_layout_width="match_parent" android_id="@+id/activity_main"  >

<TextView
        android_layout_height="wrap_content" android_layout_width="wrap_content" android_id="@+id/textView" android_layout_centerHorizontal="true" android_layout_centerVertical="true" android_textSize="20sp" android_text="Hello World!"/>

<ProgressBar
        android_layout_height="20dp" android_layout_width="match_parent" android_id="@+id/progressBar" android_layout_alignParentRight="true" android_layout_alignParentEnd="true" android_layout_below="@+id/textView" android_layout_marginTop="25dp" android_max="100" style="?android:attr/progressBarStyleHorizontal"/>

</RelativeLayout>
```

**Download**

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/AnkitKumar111/Android_Assignment18.1/archive/refs/heads/master.zip) |
| 2. | GitHub | [Follow author](https://github.com/AnkitKumar111) |

## Example 3: Use BroadcastReceiver to Listen to InComing SMS and Show it

We listen to that incoming SMS and then read it and show it in a Toast message. Here is the demo screenshot:

![Incoming SMS Broadcastreceiver](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/Incoming-SMS-Broadcastreceiver.jpg)

**MainActivity.java**

This is the main activity.

```java
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //checking wether the permission is already granted
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_SMS}, 1);

        }

    }

}
```

**IcomingSMS.java**

Our `IncomingSMS.java` file. Here are some of the APIs we use:

**(a). SmsManager**

This is a class defined in the `android.telephony` package that is responsible for managemenet of SMS operations such as sending data, text, and pdu SMS messages.

**(b). SmsMessage**

This represents a Short Message Service message.

```java
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.telephony.SmsManager;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;
import static android.telephony.SmsMessage.createFromPdu;

public class IncomingSms extends BroadcastReceiver {

    // Get the object of SmsManager
    final SmsManager sms = SmsManager.getDefault();

    @Override
    public void onReceive(Context context, Intent intent) {

        // Retrieves a map of extended data from the intent.
        final Bundle bundle = intent.getExtras();

        try {

            if (bundle != null) {

                final Object[] pdusObj = (Object[]) bundle.get("pdus");

                for (int i = 0; i < pdusObj.length; i++) {

                    SmsMessage currentMessage = createFromPdu((byte[]) pdusObj[i]);
                    String phoneNumber = currentMessage.getDisplayOriginatingAddress();

                    String senderNum = phoneNumber;
                    String message = currentMessage.getDisplayMessageBody();

                    Log.i("SmsReceiver", "senderNum: " + senderNum + "; message: " + message);

                    int duration = Toast.LENGTH_LONG;
                    final Toast toast = Toast.makeText(context, "senderNum: " + senderNum + ", message: " + message, duration);
                    toast.show();

                    //Countdown Timer for extending normal time of toast notification
                    new CountDownTimer(9000, 1000) {

                        public void onTick(long millisUntilFinished) {
                            toast.show();
                        }

                        public void onFinish() {
                            toast.show();
                        }

                    }.start();
                } // end for loop
            } // bundle is null

        } catch (Exception e) {
            Log.e("SmsReceiver", "Exception smsReceiver" + e);

        }
    }

}
```

**activity_main.xml**

This is the main activity's layout.

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout
        tools_context="com.example.ankitkumar.msgreceive.MainActivity" android_background="#f2f2f2" android_layout_height="match_parent" android_layout_width="match_parent"  >

<ImageView
        android_background="@drawable/ic_sms" android_layout_height="200sp" android_layout_width="200sp" android_contentDescription="@string/app_name" android_layout_centerInParent="true" android_alpha="0.4"/>

</RelativeLayout>
```

**Download**

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/AnkitKumar111/Android_Assignment18.2/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/AnkitKumar111/Android_Assignment18.2) |
| 2. | GitHub | [Original Creator: @AnkitKumar111](https://github.com/AnkitKumar111) |

## Example 4: Kotlin Android BroadcastReceiver Example

Let us now look at a Kotlin example.

The `BroadcastReceiver` is a base class for code that receives and handles broadcast intents sent by `Context.sendBroadcast(Intent)`.

Apps can register to receive specific broadcasts. When a broadcast is sent, the system automatically routes broadcasts to apps that have subscribed to receive that particular type of broadcast.

You can either dynamically register an instance of this class with `Context.registerReceiver()` or statically declare an implementation with the `<receiver>` tag in your `AndroidManifest.xml`.

## Quick BroadcastReceiver Examples

#### 1\. Listen to Network State Changes with BroadcastReceiver

First we need to create a java class, and then have it derive from `android.content.BroadcastReceiver`.

As instance fields we will have a boolean `isNetWorkConnected` which will hold for us the a true or false indicating whether network is connected or not.

We will also have a Context object.

We provide two constructors, one which will inject into our class the `Context` object. Then we override the `onReceive()` method of the `BroadcastReceiver` class. Normally this method receives two objects, one a `Context` object and the other an Intent object.

Here we will initialize a `ConnectivityManager` using the `getSystemService()` ,method of the `Context` class.

Using the `ConnectivityManager` instance, we invoke the `getActiveNetworkInfo()` method to receive network information which we hold in an `android.net.NetworkInfo` object.

Ultimately we set the `isConnected()` value to `isNetWorkConnected` boolean.

Then we also have the `isNetWorkAvailable()` method, which will basically check for us if network is available.

It's just a public method that needs the instance of this class to be invoked as we will see in a short while.

```java
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.Toast;
import java.util.concurrent.CopyOnWriteArrayList;

public class NetWorkStateReceiver extends BroadcastReceiver {
    public boolean isNetWorkConnected;
    private Context mContext;

    public NetWorkStateReceiver() {
        super();
    }
    public NetWorkStateReceiver(Context context) {
        mContext = context;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        ConnectivityManager connectivityManager = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();

        if (networkInfo != null && networkInfo.isConnected()) {
            isNetWorkConnected = true;
        } else {
            isNetWorkConnected = false;
            Toast.makeText(context, "No network Connection", Toast.LENGTH_SHORT).show();
        }

    }

    /**
     * Check if network is available
     * @return boolean value
     */
    public boolean isNetWorkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager)
                mContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        if (networkInfo != null) {
            return networkInfo.isConnected();
        }
        return false;
    }
}
```

Then in your MainActivity or wherever, you can come and start by instantiating the above class:

```java
    publi class MainActivity extends AppCompatActivity{
        NetWorkStateReceiver receiver;
        @Override
        public void onCreate(Bundle savedInstanceState){
            .....
           receiver = new NetWorkStateReceiver(this);
           if(receiver.isNetWorkAvailable())
           {
               //do something network is available
           }
        }
    }
```

In you `AndroidManifest.xml` you must firts add the appropriate permissions as well as register your BroadcastReceiver:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    >

    <uses-permission android_name="android.permission.INTERNET" />
    <uses-permission android_name="android.permission.ACCESS_NETWORK_STATE" />
    <application>
        ....
        <receiver
            android_name=".broadcasts.NetWorkStateReceiver"
            android_enabled="true"
            android_exported="true" />
        ....
    </application>
```

#### 2\. How to create a custom BroadcastReceiver

Here's a custom abstract BroadcastReciever class. Obviously it derives from the `BroadcastReceiver`. We proceed and redefine the important methods in this class like the `registerReceiver()`, `unregisterReceiver()` and `sendBroadcast()` methods.

```java

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;

public abstract class LocalBroadcastCommunicator extends BroadcastReceiver {

    // The action name used to send and alsoe receive intents
    private static String sAction = null;

    private static <T> void registerReceiver(LocalBroadcastCommunicator receiver, Context context) {
        sAction = receiver.getClass().getName();
        LocalBroadcastManager.getInstance(context).registerReceiver(receiver, new IntentFilter(sAction));
    }

    private static <T> void unregisterReceiver(LocalBroadcastCommunicator receiver, Context context) {
        LocalBroadcastManager.getInstance(context).unregisterReceiver(receiver);
    }

    public static void sendBroadcast(Context context, Intent intent) {
        if(sAction == null) {
            /* If sAction is null at this point, no receiver has been registered yet and there's no
             * point in sending a broadcast. */
            return;
        }

        intent.setAction(sAction);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    public void registerReceiver(Context context) {
        registerReceiver(this, context);
    }

    public void unregisterReceiver(Context context) {
        unregisterReceiver(this, context);
    }
}
```

## Android LocalBroadcastManager

_Android LocalBroadcastManager with IntentService Tutorial and Example._

This is an android LocalBroadcastManager tutorial and example. We want to see what LocalBroadcastManager is and how to use with an IntentService.

#### What You Learn in This Tutorial

Here are some of the concpets you will learn in this tutorial.

1. What a LocalBroadcastManager is and it's API Definition.
2. Advantages of LocalBroadcastManager.
3. How to use LocalBroadcastManager with IntentService.

#### What is LocalBroadcastManager?

Well LocalBroadcastManager is a helper class that allows us to register for and send broadcasts of Intents to local objects within our process.

Here's it's API Definition:

```java
public final class LocalBroadcastManager
extends Object

java.lang.Object
   ↳    android.support.v4.content.LocalBroadcastManager
```

#### Advantages of LocalBroadcastManager

Here are some of the advantages of LocalBroadcastManager over sending global broadcasts with `sendBroadcast(Intent)` method:

1. Your application data is kept private as this class works with only loal objects within your application process.
2. It is more secure due to the fact that it works within your application prcess only.
3. It is also more efficient than sending a global broadcast through the system.

#### Demo

Here's the demo for this project.

#### (a). BroadcastSenderIntentService

This is our IntentService class. We will derive from the `android.app.IntentService` and override te `onHandleIntent()` method. Inside this method we will simulate heavy task by invoking the `sleep()` method of our thread class.

```java
package info.camposha.localbroadcastandintentservice;

import android.app.IntentService;
import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

public class BroadcastSenderIntentService extends IntentService {

    public BroadcastSenderIntentService() {
        super("BroadcastSenderIntentService");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        String message = getString(R.string.running);
        Intent broadcastIntent = new Intent();
        broadcastIntent.setAction(MainActivity.MESSAGE_SENT_ACTION);
        broadcastIntent.putExtra(MainActivity.MESSAGE_EXTRA, message);
        LocalBroadcastManager.getInstance(this).sendBroadcast(broadcastIntent);

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }

        message = getString(R.string.finished);
        broadcastIntent = new Intent();
        broadcastIntent.setAction(MainActivity.MESSAGE_SENT_ACTION);
        broadcastIntent.putExtra(MainActivity.MESSAGE_EXTRA, message);
        LocalBroadcastManager.getInstance(this).sendBroadcast(broadcastIntent);
    }

}
```

#### (b). MainActivity.java

Here's our main activity. We start by defining several string constants which will be helpful when sending and receiving our intents as they act as identifiers.

```java
package info.camposha.localbroadcastandintentservice;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    public static final String MESSAGE_SENT_ACTION = "info.camposha.MESSAGE_RECEIVED_ACTION";
    public static final String MESSAGE_EXTRA = "info.camposha.MESSAGE_EXTRA";

    private static final String MESSAGE_FROM_SERVICE_KEY = "info.camposha.MESSAGE_FROM_SERVICE_KEY";

    private BroadcastReceiver receiver;
    private TextView serviceMessageView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        serviceMessageView = findViewById(R.id.service_message_textview);

        if (savedInstanceState != null) {
            serviceMessageView.setText(savedInstanceState.getString(MESSAGE_FROM_SERVICE_KEY));
        }else{
            serviceMessageView.setText("Null");
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        receiver = new BroadcastReceiver() {

            @Override
            public void onReceive(Context context, Intent intent) {
                Bundle bundle = intent.getExtras();
                String message = bundle.getString(MESSAGE_EXTRA);

                serviceMessageView.setText(message);
            }
        };

        LocalBroadcastManager.getInstance(this).registerReceiver(receiver, new IntentFilter(MESSAGE_SENT_ACTION));
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (receiver != null) {
            LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver);
            receiver = null;
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString(MESSAGE_FROM_SERVICE_KEY, serviceMessageView.getText().toString());
    }

    public void onStartServiceClicked(View view) {
        startService(new Intent(this, BroadcastSenderIntentService.class));
    }

}
```

#### activity_main.xml

Here's our main activity's layout. We have textview and button here.

```xml
<?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        tools_context=".MainActivity">

        <TextView
            android_id="@+id/headerLabel"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentTop="true"
            android_layout_centerHorizontal="true"
            android_fontFamily="casual"
            android_text="LocalBroadcastReceiver"
            android_textAllCaps="true"
            android_textSize="24sp"
            android_textStyle="bold" />

        <LinearLayout
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_centerHorizontal="true"
            android_layout_centerVertical="true"
            android_gravity="center"
            android_orientation="vertical" >

            <TextView
                android_id="@+id/textView1"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="@string/service_status"
                android_textSize="16dp" />

            <TextView
                android_id="@+id/service_message_textview"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="@string/not_running"
                android_textSize="16dp" />
        </LinearLayout>

        <Button
            android_id="@+id/button1"
            android_onClick="onStartServiceClicked"
            android_text="@string/start_service"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentBottom="true"
            android_layout_centerHorizontal="true"
            android_layout_marginBottom="12dp"
            android_fontFamily="serif-monospace" />

</RelativeLayout>
```

#### AndroidManifest.xml

In our android manifes you have to make sure that we register the service. Here's mine:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.localbroadcastandintentservice">

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <service
            android_name=".BroadcastSenderIntentService" />
    </application>

</manifest>
```

## Kotlin LocalBroadcastManager Example

A kotlin AndroidX localbroadcastmanager example with IntentService and BroadcastReceiver.

Watch video tutorial here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/M9Z5My5_GMA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Add Dependencies

Add AndroiX localbroadcastmanager as a dependency in your gradle file:

```groovy
    implementation 'androidx.localbroadcastmanager:localbroadcastmanager:1.0.0'
```

### Step 2: Design Layout

Design a layout with a textvew and a button:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/dateText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Initial value"
        android:textSize="20dp"
        android:textStyle="bold"/>

    <Button
        android:id="@+id/startButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="Start Service"/>

</LinearLayout>
```

### Step 3: Create IntentService

We create an intentservice class then override the onHandleIntent method:

```kotlin
package info.camposha.ms_localbroadcastmanager

import android.app.IntentService
import android.content.Intent
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import java.util.*

//IntentService is a ntentService is a base class for Services that handle asynchronous
// requests (expressed as Intents) on demand.
class MyIntentService : IntentService("MyIntentService") {
    override fun onHandleIntent(arg0: Intent?) {
        val intent = Intent(CUSTOM_ACTION)
        //get date to send
        intent.putExtra("DATE", Date().toString())
        Log.d(MyIntentService::class.java.simpleName, "sending broadcast")

        // send local broadcast
        //LocalBroadcastManager is a Helper to register for and send broadcasts of Intents
        // to local objects within your process.
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)
    }

    companion object {
        const val CUSTOM_ACTION = "YOUR_CUSTOM_ACTION"
    }
}
```

### Step 4: Create MainActivity

We cretae our launcher activity:

```kotlin
package info.camposha.ms_localbroadcastmanager

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import kotlinx.android.synthetic.main.activity_main.*

//Our main activity
class MainActivity : AppCompatActivity(), View.OnClickListener {
    //override onCreate
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        startButton.setOnClickListener(this)
    }

    //when activity is paused
    override fun onPause() {
        super.onPause()
        // unregister local broadcast
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mReceiver)
    }

    //when activity is resumed
    override fun onResume() {
        super.onResume()

        // register local broadcast
        val filter = IntentFilter(MyIntentService.CUSTOM_ACTION)
        LocalBroadcastManager.getInstance(this).registerReceiver(mReceiver, filter)
    }

    /**
    Create a BroadcastReceiver

     * BroadcastReceiver is a Base class for code that will receive intents sent by sendBroadcast().
     * Broadcast receiver to receive the data
     */
    private val mReceiver: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val date = intent.getStringExtra("DATE")
            dateText.text = date
        }
    }

    //when user clicks the start button, start our intent service
    override fun onClick(view: View) {
        if (view.id == R.id.startButton) {
            // start intent service
            val intent = Intent(this, MyIntentService::class.java)
            startService(intent)
        }
    }
}
```

### Step 5: Register Components

Register two components in android manifext file:

1. MainActivity
2. IntentService

```xml
 <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <service android:name=".MyIntentService"/>
```

### Step 6: Run

Run Project and ou will get the following: ![Android LocalBroadcastManager Example](https://github.com/Oclemy/MsLocalBroadcastManager/raw/master/MsLocalBroadcastManager.gif)

### Download code

Download code [here](https://github.com/Oclemy/MsLocalBroadcastManager/archive/refs/heads/master.zip).
