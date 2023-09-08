# Android SensorManager Example

In this tutorial you will learn about SensorManager via simple step by step examples.


## Example 1: SensorManager

A simple SensorManager example.

### Step 1: Create Project

1. Open your `Android Studio` IDE.
2. In the menu go to `File --> Create New Project`.
3. Choose `Empty Project` template.


### Step 2: Add Dependencies

No special dependencies are needed for this project.


### Step 3: Design Layouts

Go to your `res/layout` directory so as to design your user interface.

We will have 2 layouts:

1. activity_main.xml
2. list_item.xml


First create a file known as `activity_main.xml` and add the following code:

**(a). activity_main.xml**

This is our `MainActivity's layout`. Our root element will be a `LinearLayout`. Inside it we will place a `TextView` and `ListView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <TextView
        android:id="@+id/sensors"
        android:text="@string/sensors"
        android:textAppearance="@style/Base.TextAppearance.AppCompat.Display1"
        android:layout_gravity="center_horizontal"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
    />
    <ListView
        android:id="@+id/list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

    </ListView>

</LinearLayout>
```



Next create a `list_item.xml` file and add the following code:

**(b). list_item.xml**

This will represent a single item in our ListView. Add two TextViews:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="hello!"
        android:id="@+id/title"
        android:textAppearance="@style/Base.TextAppearance.AppCompat.Large"
        android:textStyle="bold"
        android:padding="@dimen/_10dp"/>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="hello!"
        android:id="@+id/sensordata"
        app:layout_constraintTop_toBottomOf="@id/title"
        android:padding="@dimen/_10dp"/>
</android.support.constraint.ConstraintLayout>
```



### Step 4 : Create Adapter

Next create a file known as `ListAdapter.java` and add the following code:

```kotlin
import android.content.Context;
import android.hardware.Sensor;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import java.util.List;
```

Then extend the `ArrayAdapter` from the `android.widget` package:

```java
public class ListAdapter extends ArrayAdapter {
```

Then define the following instance fields:
```java

    private Context mContext;
    private List<Sensor> mSensors;
```

Receive them via the constructor:
```java
    public ListAdapter(@NonNull Context context, int resource, List<Sensor> mSensors) {
        super(context, resource,mSensors);
        mContext=context;
        this.mSensors = mSensors;
    }
```

Override the `getView` function:
```java
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater=(LayoutInflater)mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View v=layoutInflater.inflate(R.layout.list_item,null,false);
        TextView title=v.findViewById(R.id.title);
        title.setText(mSensors.get(position).getName());
        TextView sensorId=v.findViewById(R.id.sensordata);
        sensorId.setText(mSensors.get(position).getVendor());
        Log.d("sdlc",mSensors.get(position).toString());

        Log.d("sdlc","adapter");
        return v;


    }
}
```


Here is the full code:

**ListAdapter.java**


```kotlin
package com.example.volansys.sensormanager;

import android.content.Context;
import android.hardware.Sensor;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class ListAdapter extends ArrayAdapter {


    private Context mContext;
    private List<Sensor> mSensors;
    public ListAdapter(@NonNull Context context, int resource, List<Sensor> mSensors) {
        super(context, resource,mSensors);
        mContext=context;
        this.mSensors = mSensors;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater=(LayoutInflater)mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View v=layoutInflater.inflate(R.layout.list_item,null,false);
        TextView title=v.findViewById(R.id.title);
        title.setText(mSensors.get(position).getName());
        TextView sensorId=v.findViewById(R.id.sensordata);
        sensorId.setText(mSensors.get(position).getVendor());
        Log.d("sdlc",mSensors.get(position).toString());

        Log.d("sdlc","adapter");
        return v;


    }
}
```


### Step 5: Create MainActivity

Next create a file known as `MainActivity.java` and add the following code:

```kotlin
    import android.hardware.Sensor;
    import android.hardware.SensorEvent;
    import android.hardware.SensorEventListener;
    import android.hardware.SensorManager;

    import android.support.v7.app.AlertDialog;
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.util.Log;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.ListView;

    import java.util.EventListener;
    import java.util.List;
```

Extend the `AppCompatActivity` and implement the `SensorEventListener`:

```java
    public class MainActivity extends AppCompatActivity implements SensorEventListener {
```

Declare a SensorManager, Sensor object, a string, a List of Sensor objects and an AlertDialog.Builder object as shown below:

```java
        private SensorManager mSensorManager;
        private Sensor mSensor;
        private String data;
        List<Sensor> mSensorList;
        private AlertDialog.Builder mAlertDialog;
```

Override the onCreate with the following code:

```java
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            mAlertDialog= new AlertDialog.Builder(MainActivity.this);
            mSensorManager=(SensorManager) getSystemService(SENSOR_SERVICE);
            mSensorList=mSensorManager.getSensorList(Sensor.TYPE_ALL);
            Log.d("sdlc","count:"+mSensorList.size());
             Log.d("sdlc","mainactivity");
            ListView listView=findViewById(R.id.list);
            ListAdapter listAdapter=new ListAdapter(this,R.layout.list_item,mSensorList);
            listView.setAdapter(listAdapter);
            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    mSensor=mSensorManager.getDefaultSensor(mSensorList.get(position).getType());
                    mAlertDialog.setTitle(mSensorList.get(position).getName());
                    mAlertDialog.create().show();

                }
            });
        }
```

Override the other activity callback methods as shown below:

```java

        @Override
        protected void onResume() {
            super.onResume();
            for(Sensor s:mSensorList)
            mSensorManager.registerListener(this,s,SensorManager.SENSOR_DELAY_NORMAL);
        }

        @Override
        protected void onPause() {
            super.onPause();
            for(Sensor s:mSensorList)
                mSensorManager.unregisterListener(this);
        }

        @Override
        public void onSensorChanged(SensorEvent event) {
            data="";
            int i=0;
            while (i<event.values.length){
                data=data+"\n"+event.values[i];
                i++;
            }
            mAlertDialog.setMessage(data);
            Log.d("sdlc",data);

        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }
```


Here is the full code:

**MainActivity.java**


```kotlin
    package com.example.volansys.sensormanager;

    import android.hardware.Sensor;
    import android.hardware.SensorEvent;
    import android.hardware.SensorEventListener;
    import android.hardware.SensorManager;

    import android.support.v7.app.AlertDialog;
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.util.Log;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.ListView;

    import java.util.EventListener;
    import java.util.List;

    public class MainActivity extends AppCompatActivity implements SensorEventListener {
        private SensorManager mSensorManager;
        private Sensor mSensor;
        private String data;
        List<Sensor> mSensorList;
        private AlertDialog.Builder mAlertDialog;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            mAlertDialog= new AlertDialog.Builder(MainActivity.this);
            mSensorManager=(SensorManager) getSystemService(SENSOR_SERVICE);
            mSensorList=mSensorManager.getSensorList(Sensor.TYPE_ALL);
            Log.d("sdlc","count:"+mSensorList.size());
             Log.d("sdlc","mainactivity");
            ListView listView=findViewById(R.id.list);
            ListAdapter listAdapter=new ListAdapter(this,R.layout.list_item,mSensorList);
            listView.setAdapter(listAdapter);
            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    mSensor=mSensorManager.getDefaultSensor(mSensorList.get(position).getType());
                    mAlertDialog.setTitle(mSensorList.get(position).getName());
                    mAlertDialog.create().show();

                }
            });
        }


        @Override
        protected void onResume() {
            super.onResume();
            for(Sensor s:mSensorList)
            mSensorManager.registerListener(this,s,SensorManager.SENSOR_DELAY_NORMAL);
        }

        @Override
        protected void onPause() {
            super.onPause();
            for(Sensor s:mSensorList)
                mSensorManager.unregisterListener(this);
        }

        @Override
        public void onSensorChanged(SensorEvent event) {
            data="";
            int i=0;
            while (i<event.values.length){
                data=data+"\n"+event.values[i];
                i++;
            }
            mAlertDialog.setMessage(data);
            Log.d("sdlc",data);

        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    }
```


### Run


Copy the code or download it in the link below, build and run.


### Reference

Here are the reference links:


|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/urvishjarvis1/androidbasics/SensorManager) Example|
|2.|[Follow](https://github.com/urvishjarvis1/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|

