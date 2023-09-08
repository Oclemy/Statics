# Android Notifications Tutorial and Examples

A notification is a message that android displays outside an app’s UI to provide reminders, communication with other people or timely information from your app.

Then when the user taps the notification, the app is opened or an action can be directly taken.


Let's look at several examples

## Example 1: Android Status Bar Notification Example with Vibration

Let's now look at a simple Notification example in Java. This example will do the following for us:

1. Show a Flaoting Action Button that when clicked will show a status bar notification.
2. When the user clicks the Notification, we will bring up a new activity where we will be receiving a Notification ID.
3. We will vibrate the device when the notification is displayed.

Here is the video tutorial:

<iframe width="788" height="443" src="https://www.youtube.com/embed/79ZsNVstPAk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### MainActivity

- MainActivity class.
- Create and show Notification with alarm sound as well.
- Increment messageCount.
- When notifictaion is clicked open new [activity](https://camposha.info/android/activity)

```java
package com.tutorials.hp.hellonotifications;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.TaskStackBuilder;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.NotificationCompat;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    private int messageCount = 0;
    private static Uri alarmSound;
    // Vibration pattern long array
    private final long[] pattern = { 100, 300, 300, 300 };
    private NotificationManager mNotificationManager;

    /*
    - When activity is created.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // DEFAULT ALARM SOUND
        alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        // INITIALIZE NOTIFICATION MANAGER
        mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showNotification();
            }
        });
    }
    /*
    - Create Notification
    - Show Notification
     */
    protected void showNotification() {
        Log.i("Start", "notification");

        // Invoking the default notification service
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(MainActivity.this);

        mBuilder.setContentTitle("ProgrammingWizards TV");
        mBuilder.setContentText("We've just released a new android video at our channel");
        mBuilder.setTicker("New Message Alert!");
        mBuilder.setSmallIcon(R.drawable.series);

        //Increment message count when a new message arrives
        mBuilder.setNumber(++messageCount);
        mBuilder.setSound(alarmSound);
        mBuilder.setVibrate(pattern);

        // Explicit intent to open notifactivity
        Intent i = new Intent(MainActivity.this,NotifActivity.class);
        i.putExtra("notificationId", 111);
        i.putExtra("message", "http://www.camposha.info");

        // Task builder to maintain task for pending intent
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
        stackBuilder.addParentStack(NotifActivity.class);

        // Adds the Intent that starts the Activity to the top of the stack
        stackBuilder.addNextIntent(i);

        //PASS REQUEST CODE AND FLAG
        PendingIntent pendingIntent = stackBuilder.getPendingIntent(0,PendingIntent.FLAG_UPDATE_CURRENT);
        mBuilder.setContentIntent(pendingIntent);

        // notificationID allows you to update the notification later on.
        mNotificationManager.notify(111, mBuilder.build());
    }
    //end
}
```

**NotifActivity.java**

#### NotifActivity

Here are our `NotifActivity.java` file.

- Our NotifActivity class.
- Opened when notification message is clicked.
- Receives notifictaion id as well as message and displays in a textview.
- Then clears the statusbar of the notification once its read

```java
package com.tutorials.hp.hellonotifications;

import android.app.NotificationManager;
import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.util.Linkify;
import android.widget.TextView;

public class NotifActivity extends AppCompatActivity {
    /*
    - Set received notification to textview.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notif);

        TextView receivedTxt = (TextView) findViewById(R.id.notificationTxt);
        receivedTxt.setText(receiveData());
        Linkify.addLinks(receivedTxt, Linkify.ALL);
    }
    /*
    - Receive intent data and return
    - Then clear notification it from statusbar
     */
    private String receiveData()
    {
        String message = "";
        int id = 0;

        Bundle extras = getIntent().getExtras();// get intent data
        if (extras == null) {
            // If it is null then show error
            message = "Error";
        } else {
            // get id and message
            id = extras.getInt("notificationId");
            message = extras.getString("message");
        }
        message = "Notification Id : " + id + "n Message : " + message;
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        // remove the notification with the specific id
        mNotificationManager.cancel(id);

        return message;
    }
}
```

**activity_main.xml**

Here is our `activity_main.xml` layout file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.hellonotifications.MainActivity">

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
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

**content_main.xml**

Here is our `content_main.xml` layout file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#fff"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.hellonotifications.MainActivity"
    tools_showIn="@layout/activity_main">

</android.support.constraint.ConstraintLayout>
```

**activity_notif.xml**

Here is our `activity_notif.xml` layout file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
     android_background="#fff"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.hellonotifications.NotifActivity">

    <TextView
        android_id="@+id/notificationTxt"
        android_layout_width="fill_parent"
        android_layout_height="wrap_content"
        android_gravity="center"
        android_padding="5dp"
        android_textColor="#000000"
        android_textSize="20sp" />

</android.support.constraint.ConstraintLayout>
```

**build.gradle**

Here are our dependencies in our app level `build.gradle` file.

```gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    implementation 'com.android.support:design:26.+'
}
```

## Example 2: Android InBoxStyle Notification Example

Let us now look at the InBoxStyle Notification Example in Java. Here is a demo image:

![InBox Style Notification Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/InBox-Style-Notification-Example.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Design Layouts

We will have three layouts:

**(a). activity_inbox.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_inbox_"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.ankitkumar.inboxstylenotification.MainActivity">

    <TextView
        android:text="This is the Inbox and is open now"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_marginLeft="86dp"
        android:layout_marginStart="86dp"
        android:layout_marginTop="162dp"
        android:id="@+id/textView_inbox" />
</RelativeLayout>
```

**(b). activity_reply_activity.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_reply_activity"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.ankitkumar.inboxstylenotification.MainActivity">
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="This is the reply activity"
    android:textSize="20dp"/>
</RelativeLayout>
```

**(c). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.ankitkumar.inboxstylenotification.MainActivity">
    <Button
        android:text="Open Inxbox notification"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="228dp"
        android:onClick="inboxclick"
        android:id="@+id/button_inbox_notification" />
</RelativeLayout>
```

### Step 4: Create Activities

We will have three activities:

**(a). Inbox_Activity.java**

```java
public class Inbox_Activity extends AppCompatActivity {
    TextView txt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inbox_);
        txt= (TextView) findViewById(R.id.textView_inbox);
    }
}
```

**(b). Reply_activity.java**

```java
public class Reply_activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reply_activity);
    }
}
```

**(c). MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {
    Button btn_inbox_notification;
    private static final int INBOX_ID=100;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn_inbox_notification= (Button) findViewById(R.id.button_inbox_notification);
    }
    public void inboxclick(View view)
    {
        switch (view.getId())
        {
            case R.id.button_inbox_notification:
                showinboxstylenotification();
                break;
        }
    }

    private void showinboxstylenotification()
    {
        //Style of notifiction is inbox style
        NotificationCompat.InboxStyle inboxstyle=new NotificationCompat.InboxStyle();
        inboxstyle.setBigContentTitle("Inbox style notification");
        inboxstyle.addLine("Line one");
        inboxstyle.addLine("Line two");
        inboxstyle.addLine("Line three");

        NotificationCompat.Builder builder=new NotificationCompat.Builder(MainActivity.this);
        builder.setContentTitle("Inbox Style Notification");
        builder.setContentText("Hello all \n This is my first inbox style notification");
        builder.setSmallIcon(R.drawable.ic_action_email);
        builder.setTicker("Inbox Notification");
        builder.setAutoCancel(true);
        builder.setStyle(inboxstyle);

        Intent i=new Intent(MainActivity.this,Inbox_Activity.class);
        TaskStackBuilder stackbuilder=TaskStackBuilder.create(MainActivity.this);
        stackbuilder.addParentStack(Inbox_Activity.class);
        stackbuilder.addNextIntent(i);
        PendingIntent pending_intent=stackbuilder.getPendingIntent(0,PendingIntent.FLAG_UPDATE_CURRENT);

        //for the actio button
        Intent replyintent=new Intent(MainActivity.this,Reply_activity.class);
        TaskStackBuilder stackbuilder_reply=TaskStackBuilder.create(MainActivity.this);
        stackbuilder_reply.addParentStack(Reply_activity.class);
        stackbuilder_reply.addNextIntent(replyintent);
        PendingIntent pending_intent_reply=stackbuilder_reply.getPendingIntent(0,PendingIntent.FLAG_UPDATE_CURRENT);

        builder.setContentIntent(pending_intent);
        builder.setContentIntent(pending_intent_reply);
        builder.addAction(R.drawable.ic_action_email,"Reply",pending_intent_reply);

        Notification notification=builder.build();
        NotificationManager manager=(NotificationManager)this.getSystemService(NOTIFICATION_SERVICE);
        manager.notify(INBOX_ID,notification);
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment18.3/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
