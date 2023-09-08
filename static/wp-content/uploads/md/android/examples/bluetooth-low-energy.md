# Android Bluetooth Low Energy Examples

Learn about BLE or Bluetooth Low Energy using the following examples.


## Example 1: Android Bluetooth Low Energy Example

This is a simple example written in java.

### Step 1: Create Project

1. Open your `Android Studio` IDE.
2. In the menu go to `File --> Create New Project`.
3. Choose `Empty Project` template.


### Step 2: Add Dependencies

No special dependencies are needed for this project.


### Step 3: Design Layouts

Go to your `res/layout` directory so as to design your user interface.

We have only 1 layout:

1. activity_main.xml

First create a file known as `activity_main.xml` and add the following code:

**(a). activity_main.xml**

Specify the root element as a `LinearLayout`. Then add buttons, textview and spinner:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">


   <Button
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:text="@string/bluetooth_on"
       android:id="@+id/btnbleon"
       android:layout_gravity="center_horizontal"
       android:padding="@dimen/_10dp"
       android:layout_margin="@dimen/_10dp"
       />
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/bluetooth_off"
        android:id="@+id/btnbleoff"
        android:layout_gravity="center_horizontal"
        android:padding="@dimen/_10dp"
        android:layout_margin="@dimen/_10dp"
        />
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/bluetooth_dis"
        android:id="@+id/btnbledis"
        android:layout_gravity="center_horizontal"
        android:padding="@dimen/_10dp"
        android:layout_margin="@dimen/_10dp"
        />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/available_devices"/>
    <Spinner
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/spinner">

    </Spinner>


</LinearLayout>
```



### Step 4: Write Code

Next create a file known as `MainActivity.java` and add the following code:

Start by specifying imports including `android.bluetooth.BluetoothAdapter` and `android.bluetooth.BluetoothDevice`:

```kotlin
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;
```

Extend the `AppCompatActivity`:

```java
public class MainActivity extends AppCompatActivity {
```
Declare the widgets as well as the BluetoothAdapter:

```java
    private Button mbtnBLEOn,mbtnBLEOff,mbtnBLEDiscover;
    private Spinner mspinnerAvailableDev;
    private BluetoothAdapter mBluetoothAdapter;
```

Override the onCreateand initialize the widgets. Initialize the BluetoothAdapter using the `getDefaultAdapter()` method:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBluetoothAdapter=BluetoothAdapter.getDefaultAdapter();
        mbtnBLEOn=findViewById(R.id.btnbleon);
        mbtnBLEOff=findViewById(R.id.btnbleoff);
        mbtnBLEDiscover=findViewById(R.id.btnbledis);
        mspinnerAvailableDev=findViewById(R.id.spinner);
```

When the On button is clicked, first check that bluetoothAdapter is not enabled. If so then enable it by instantiating an Intent object and passing in the `BluetoothAdapter.ACTION_REQUEST_ENABLE`,then passing the Intent to the `startActivityForResult()`:

```java
        mbtnBLEOn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!mBluetoothAdapter.isEnabled()){
                    Intent i=new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                    startActivityForResult(i,0);
                    Toast.makeText(MainActivity.this, "Bluetooth turned on!", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(MainActivity.this, "Bluetooth already on!", Toast.LENGTH_SHORT).show();
                }
            }
        });
```

If off button is clicked switch off bluetooth by invoking the `disable()` method:

```java
        mbtnBLEOff.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBluetoothAdapter.disable();
                Toast.makeText(MainActivity.this, "Bluetooth turned off!", Toast.LENGTH_SHORT).show();
            }
        });
```

If the discover button is clicked do the following:

```java
        mbtnBLEDiscover.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent i=new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                startActivityForResult(i,1);

                ArrayList<String> devices=new ArrayList<>();
                for(BluetoothDevice btDevice:mBluetoothAdapter.getBondedDevices()){
                    devices.add(btDevice.getName());

                }
                ArrayAdapter<String> adapter=new ArrayAdapter<>(MainActivity.this,R.layout.support_simple_spinner_dropdown_item,devices);
                mspinnerAvailableDev.setAdapter(adapter);
            }
        });

    }
}
```


Here is the full code: 

**MainActivity.java**

```kotlin
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private Button mbtnBLEOn,mbtnBLEOff,mbtnBLEDiscover;
    private Spinner mspinnerAvailableDev;
    private BluetoothAdapter mBluetoothAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBluetoothAdapter=BluetoothAdapter.getDefaultAdapter();
        mbtnBLEOn=findViewById(R.id.btnbleon);
        mbtnBLEOff=findViewById(R.id.btnbleoff);
        mbtnBLEDiscover=findViewById(R.id.btnbledis);
        mspinnerAvailableDev=findViewById(R.id.spinner);
        mbtnBLEOn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!mBluetoothAdapter.isEnabled()){
                    Intent i=new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                    startActivityForResult(i,0);
                    Toast.makeText(MainActivity.this, "Bluetooth turned on!", Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(MainActivity.this, "Bluetooth already on!", Toast.LENGTH_SHORT).show();
                }
            }
        });
        mbtnBLEOff.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBluetoothAdapter.disable();
                Toast.makeText(MainActivity.this, "Bluetooth turned off!", Toast.LENGTH_SHORT).show();
            }
        });
        mbtnBLEDiscover.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent i=new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
                startActivityForResult(i,1);

                ArrayList<String> devices=new ArrayList<>();
                for(BluetoothDevice btDevice:mBluetoothAdapter.getBondedDevices()){
                    devices.add(btDevice.getName());

                }
                ArrayAdapter<String> adapter=new ArrayAdapter<>(MainActivity.this,R.layout.support_simple_spinner_dropdown_item,devices);
                mspinnerAvailableDev.setAdapter(adapter);
            }
        });

    }
}
```


### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/urvishjarvis1/androidbasics/BLEManager) Example|
|2.|[Follow](https://github.com/urvishjarvis1/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|

