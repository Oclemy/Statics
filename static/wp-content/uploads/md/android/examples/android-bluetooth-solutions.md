# Android Bluetooth Examples and Libraries

In this tutorial we will look at solutions relating to bluetooth, be it classic implementation or low energy. Mostly we will look at open source examples then libraries as well.

## Examples

Let's statt by looking at somebluettoth libraries if you don't want to use third party libraries. Note that you will need real devices to run the examples and not emulators.

## (a). Simple Bluetooth Example

This is a simple example that connects two devices via bluetooth.

### Step 1: Dependencies

No special dependencies are needed. However some androidx dependencies are used:

```groovy
implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation "androidx.navigation:navigation-fragment:2.3.2"
    implementation "androidx.navigation:navigation-ui:2.3.2"
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
```

### Step 2: Add Permissions

In your android manifesta dd the following permissions:

```xml
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

### Step 3: Write Code

there will 4 classes:

1. Client Fragment
2. HelpFragment

4. MainActivity

**ClientFragment.java**

```java
public class Client_Fragment extends Fragment {
    static final String TAG = "client";
    TextView output;
    Button btn_start, btn_device;
    BluetoothAdapter mBluetoothAdapter = null;
    BluetoothDevice device;
    BluetoothDevice remoteDevice;

    public Client_Fragment() {
        // Required empty public constructor
    }

    private Handler handler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(Message msg) {
            output.append(msg.getData().getString("msg"));
            return true;
        }

    });

    public void mkmsg(String str) {
        //handler junk, because thread can't update screen!
        Message msg = new Message();
        Bundle b = new Bundle();
        b.putString("msg", str);
        msg.setData(b);
        handler.sendMessage(msg);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_client, container, false);

        //output textview
        output = myView.findViewById(R.id.ct_output);
        btn_device = myView.findViewById(R.id.which_device);
        btn_device.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                querypaired();

            }
        });
        btn_start = myView.findViewById(R.id.start_client);
        btn_start.setEnabled(false);
        btn_start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                output.append("Starting client\n");
                startClient();
            }
        });
        //setup the bluetooth adapter.
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (mBluetoothAdapter == null) {
            // Device does not support Bluetooth
            output.append("No bluetooth device.\n");
            btn_start.setEnabled(false);
            btn_device.setEnabled(false);
        }
        Log.v(TAG, "bluetooth");

        return myView;
    }

    public void querypaired() {
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
        // If there are paired devices
        if (pairedDevices.size() > 0) {
            // Loop through paired devices
            output.append("at least 1 paired device\n");
            final BluetoothDevice blueDev[] = new BluetoothDevice[pairedDevices.size()];
            String[] items = new String[blueDev.length];
            int i = 0;
            for (BluetoothDevice devicel : pairedDevices) {
                blueDev[i] = devicel;
                items[i] = blueDev[i].getName() + ": " + blueDev[i].getAddress();
                output.append("Device: " + items[i] + "\n");
                //mArrayAdapter.add(device.getName() + "\n" + device.getAddress());
                i++;
            }
            AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
            builder.setTitle("Choose Bluetooth:");
            builder.setSingleChoiceItems(items, -1, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int item) {
                    dialog.dismiss();
                    if (item >= 0 && item < blueDev.length) {
                        device = blueDev[item];
                        btn_device.setText("device: " + blueDev[item].getName());
                        btn_start.setEnabled(true);
                    }

                }
            });
            AlertDialog alert = builder.create();
            alert.show();
        }
    }

    public void startClient() {
        if (device != null) {
            new Thread(new ConnectThread(device)).start();
        }
    }

    /**
     * This thread runs while attempting to make an outgoing connection
     * with a device. It runs straight through; the connection either
     * succeeds or fails.
     */

    private class ConnectThread extends Thread {
        private BluetoothSocket socket;
        private final BluetoothDevice mmDevice;

        public ConnectThread(BluetoothDevice device) {
            mmDevice = device;
            BluetoothSocket tmp = null;

            // Get a BluetoothSocket for a connection with the
            // given BluetoothDevice
            try {
                tmp = device.createRfcommSocketToServiceRecord(MainActivity.MY_UUID);
            } catch (IOException e) {
                mkmsg("Client connection failed: " + e.getMessage() + "\n");
            }
            socket = tmp;

        }

        public void run() {
            mkmsg("Client running\n");
            // Always cancel discovery because it will slow down a connection
            mBluetoothAdapter.cancelDiscovery();

            // Make a connection to the BluetoothSocket
            try {
                // This is a blocking call and will only return on a
                // successful connection or an exception
                socket.connect();
            } catch (IOException e) {
                mkmsg("Connect failed\n");
                try {
                    socket.close();
                    socket = null;
                } catch (IOException e2) {
                    mkmsg("unable to close() socket during connection failure: " + e2.getMessage() + "\n");
                    socket = null;
                }
                // Start the service over to restart listening mode   
            }
            // If a connection was accepted
            if (socket != null) {
                mkmsg("Connection made\n");
                mkmsg("Remote device address: " + socket.getRemoteDevice().getAddress() + "\n");
                //Note this is copied from the TCPdemo code.
                try {
                    PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())), true);
                    mkmsg("Attempting to send message ...\n");
                    out.println("hello from Bluetooth Demo Client");
                    out.flush();
                    mkmsg("Message sent...\n");

                    mkmsg("Attempting to receive a message ...\n");
                    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                    String str = in.readLine();
                    mkmsg("received a message:\n" + str + "\n");

                    mkmsg("We are done, closing connection\n");
                } catch (Exception e) {
                    mkmsg("Error happened sending/receiving\n");

                } finally {
                    try {
                        socket.close();
                    } catch (IOException e) {
                        mkmsg("Unable to close socket" + e.getMessage() + "\n");
                    }
                }
            } else {
                mkmsg("Made connection, but socket is null\n");
            }
            mkmsg("Client ending \n");

        }

        public void cancel() {
            try {
                socket.close();
            } catch (IOException e) {
                mkmsg("close() of connect socket failed: " + e.getMessage() + "\n");
            }
        }
    }

}
```

**2\. ServerFragment**

```java

/**
 * most of the work is done in the fragments.  You will need to install this example onto 2 devices
 * with bluetooth in order to make this example work.
 * <p>
 * The help fragment starts up first, to check and see if this example will work.
 * Server fragment is the for the "server" code version with bluetooth.
 * Client fragment is will connect to the server code.
 */

public class MainActivity extends AppCompatActivity  {

    public static final UUID MY_UUID = UUID.fromString("fa87c0d0-afac-11de-8a39-0800200c9a66");
    public static final String NAME = "BluetoothDemo";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
```

**3\. Help Fragment.java**

```java
public class Help_Fragment extends Fragment {

    //bluetooth device and code to turn the device on if needed.
    BluetoothAdapter mBluetoothAdapter = null;
    private static final int REQUEST_ENABLE_BT = 2;
    Button btn_client, btn_server;
    TextView logger;

    public Help_Fragment() {
        // Required empty public constructor
    }

    //A simple method to append data to the logger textview.
    //so I don't have to think about it in the code.
    public void mkmsg(String msg) {
        logger.append(msg + "\n");
    }

    //This code will check to see if there is a bluetooth device and
    //turn it on if is it turned off.
    public void startbt() {
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (mBluetoothAdapter == null) {
            // Device does not support Bluetooth
            mkmsg("This device does not support bluetooth");
            return;
        }
        //make sure bluetooth is enabled.
        if (!mBluetoothAdapter.isEnabled()) {
            mkmsg("There is bluetooth, but turned off");
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        } else {
            mkmsg("The bluetooth is ready to use.");
            //bluetooth is on, so list paired devices from here.
            querypaired();
        }
    }

    /**
     * This method will query the bluetooth device and ask for a list of all
     * paired devices.  It will then display to the screen the name of the device and the address
     * In client fragment we need this address to so we can connect to the bluetooth device that is acting as the server.
     */

    public void querypaired() {
        mkmsg("Paired Devices:");
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
        // If there are paired devices
        if (pairedDevices.size() > 0) {
            // Loop through paired devices
            final BluetoothDevice blueDev[] = new BluetoothDevice[pairedDevices.size()];
            String item;
            int i = 0;
            for (BluetoothDevice devicel : pairedDevices) {
                blueDev[i] = devicel;
                item = blueDev[i].getName() + ": " + blueDev[i].getAddress();
                mkmsg("Device: " + item);
                i++;
            }

        } else {
            mkmsg("There are no paired devices");
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_help, container, false);
        logger = myView.findViewById(R.id.logger1);

        btn_client = myView.findViewById(R.id.button2);
        btn_client.setOnClickListener(Navigation.createNavigateOnClickListener(R.id.action_help_to_client, null));
        btn_server = myView.findViewById(R.id.button1);
        btn_server.setOnClickListener(Navigation.createNavigateOnClickListener(R.id.action_help_to_server, null));

        startbt();

        return myView;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_ENABLE_BT) {
            //bluetooth result code.
            if (resultCode == Activity.RESULT_OK) {
                mkmsg("Bluetooth is on.");
                querypaired();
            } else {
                mkmsg("Please turn the bluetooth on.");
            }
        }
    }
}
```

**4\. MainActivity.java**

```java

/**
 * most of the work is done in the fragments.  You will need to install this example onto 2 devices
 * with bluetooth in order to make this example work.
 * <p>
 * The help fragment starts up first, to check and see if this example will work.
 * Server fragment is the for the "server" code version with bluetooth.
 * Client fragment is will connect to the server code.
 */

public class MainActivity extends AppCompatActivity  {

    public static final UUID MY_UUID = UUID.fromString("fa87c0d0-afac-11de-8a39-0800200c9a66");
    public static final String NAME = "BluetoothDemo";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
```

This code has been written by [@JimSeeker](https://github.com/JimSeker). Download Full Source code [here](https://github.com/JimSeker/bluetooth/tree/master/blueToothDemo)

# Libraries

## (a). Use AndroidBluetoothLibrary

> A Library for easy implementation of Serial Bluetooth Classic and Low Energy on Android.

This library provides two implementations:

1. Bluetooth Classic working from Android 2.1 (API 7)
2. Bluetooth Low Energy working from Android 4.3 (API 18)

### Step 1: Install it

Start by registering jitpack in your project level build file as a maven repository:

```groovy
allprojects {
  repositories {
    ...
    maven { url "https://jitpack.io" }
  }
}
```

Now you need to choose the implementation you need. If it is classic:

```groovy
implementation 'com.github.douglasjunior.AndroidBluetoothLibrary:BluetoothClassicLibrary:0.3.5'
```

If it is low energy:

```groovy
implementation 'com.github.douglasjunior.AndroidBluetoothLibrary:BluetoothLowEnergyLibrary:0.3.5'
```

### Step 2 : Add Permissions

Add bluetooth permissions in your android manifest:

```xml
<manifest ...>
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-permission android:name="android.permission.BLUETOOTH_PRIVILEGED" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  ...
</manifest>
```

### Step 3: Write Code

**Classic Bluetooth**

Start by creating a configuration:

```java
BluetoothConfiguration config = new BluetoothConfiguration();
```

Attach a context onto it:

```java
config.context = getApplicationContext();
```

Choose the implementation, whether classic or low energy:

```java
config.bluetoothServiceClass = BluetoothClassicService.class;
```

Add more configurations:

```java
config.bufferSize = 1024;
config.characterDelimiter = '\n';
config.deviceName = "Your App Name";
config.callListenersInMainThread = true;

config.uuid = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb"); // Required

BluetoothService.init(config);
```

**Blueetooth Low Energy**

```java
BluetoothConfiguration config = new BluetoothConfiguration();
config.context = getApplicationContext();
config.bluetoothServiceClass = BluetoothLeService.class;
config.bufferSize = 1024;
config.characterDelimiter = '\n';
config.deviceName = "Your App Name";
config.callListenersInMainThread = true;

config.uuidService = UUID.fromString("e7810a71-73ae-499d-8c15-faa9aef0c3f2"); // Required
config.uuidCharacteristic = UUID.fromString("bef8d6c9-9c21-4c9e-b632-bd58c1009f9f"); // Required
config.transport = BluetoothDevice.TRANSPORT_LE; // Required for dual-mode devices
config.uuid = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb"); // Used to filter found devices. Set null to find all devices.

BluetoothService.init(config);
```

If you want to obtain the blueetooth service:

```java
BluetoothService service = BluetoothService.getDefaultInstance();
```

If you want to scan for available devices, start by attaching the scan callback to the bluetooth service:

```java
service.setOnScanCallback(new BluetoothService.OnBluetoothScanCallback() {
    @Override
    public void onDeviceDiscovered(BluetoothDevice device, int rssi) {
    }

    @Override
    public void onStartScan() {
    }

    @Override
    public void onStopScan() {
    }
});
```

You can then start or stop the scan using the following methods:

```java
service.startScan(); // See also service.stopScan();
```

To connect:

```java
service.setOnEventCallback(new BluetoothService.OnBluetoothEventCallback() {
    @Override
    public void onDataRead(byte[] buffer, int length) {
    }

    @Override
    public void onStatusChange(BluetoothStatus status) {
    }

    @Override
    public void onDeviceName(String deviceName) {
    }

    @Override
    public void onToast(String message) {
    }

    @Override
    public void onDataWrite(byte[] buffer) {
    }
});

service.connect(device); // See also
```

To disconnect:

```java
service.disconnect();
```

### Example

Here is an example in kotlin:

```kotlin
class MainActivity : AppCompatActivity(), BluetoothService.OnBluetoothScanCallback, BluetoothService.OnBluetoothEventCallback, DeviceItemAdapter.OnAdapterItemClickListener {

    private var pgBar: ProgressBar? = null
    private var mMenu: Menu? = null
    private var mRecyclerView: RecyclerView? = null
    private var mAdapter: DeviceItemAdapter? = null

    private var mBluetoothAdapter: BluetoothAdapter? = null
    private var mService: BluetoothService? = null
    private var mScanning: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar = findViewById<View>(R.id.toolbar) as Toolbar
        setSupportActionBar(toolbar)

        pgBar = findViewById<View>(R.id.pg_bar) as ProgressBar
        pgBar!!.visibility = View.GONE

        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter()

        mRecyclerView = findViewById<View>(R.id.rv) as RecyclerView
        val lm = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        mRecyclerView!!.layoutManager = lm

        mAdapter = DeviceItemAdapter(this, mBluetoothAdapter!!.bondedDevices)
        mAdapter!!.setOnAdapterItemClickListener(this)
        mRecyclerView!!.adapter = mAdapter

        mService = BluetoothService.getDefaultInstance()

        mService!!.setOnScanCallback(this)
        mService!!.setOnEventCallback(this)
    }

    override fun onResume() {
        super.onResume()
        mService!!.setOnEventCallback(this)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        mMenu = menu
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val id = item.itemId

        if (id == R.id.action_scan) {
            startStopScan()
            return true
        }

        return super.onOptionsItemSelected(item)
    }

    private fun startStopScan() {
        if (!mScanning) {
            mService!!.startScan()
        } else {
            mService!!.stopScan()
        }
    }

    override fun onDeviceDiscovered(device: BluetoothDevice, rssi: Int) {
        Log.d(TAG, "onDeviceDiscovered: " + device.name + " - " + device.address + " - " + Arrays.toString(device.uuids))
        val dv = BluetoothDeviceDecorator(device, rssi)
        val index = mAdapter!!.devices.indexOf(dv)
        if (index < 0) {
            mAdapter!!.devices.add(dv)
            mAdapter!!.notifyItemInserted(mAdapter!!.devices.size - 1)
        } else {
            mAdapter!!.devices[index].device = device
            mAdapter!!.devices[index].rssi = rssi
            mAdapter!!.notifyItemChanged(index)
        }
    }

    override fun onStartScan() {
        Log.d(TAG, "onStartScan")
        mScanning = true
        pgBar!!.visibility = View.VISIBLE
        mMenu!!.findItem(R.id.action_scan).setTitle(R.string.action_stop)
    }

    override fun onStopScan() {
        Log.d(TAG, "onStopScan")
        mScanning = false
        pgBar!!.visibility = View.GONE
        mMenu!!.findItem(R.id.action_scan).setTitle(R.string.action_scan)
    }

    override fun onDataRead(buffer: ByteArray, length: Int) {
        Log.d(TAG, "onDataRead")
    }

    override fun onStatusChange(status: BluetoothStatus) {
        Log.d(TAG, "onStatusChange: $status")
        Toast.makeText(this, status.toString(), Toast.LENGTH_SHORT).show()

        if (status == BluetoothStatus.CONNECTED) {
            val colors = arrayOf<CharSequence>("Try text", "Try picture")

            val builder = AlertDialog.Builder(this)
            builder.setTitle("Select")
            builder.setItems(colors) { dialog, which ->
                if (which == 0) {
                    startActivity(Intent(this@MainActivity, DeviceActivity::class.java))
                } else {
                    startActivity(Intent(this@MainActivity, BitmapActivity::class.java))
                }
            }
            builder.setCancelable(false)
            builder.show()
        }

    }

    override fun onDeviceName(deviceName: String) {
        Log.d(TAG, "onDeviceName: $deviceName")
    }

    override fun onToast(message: String) {
        Log.d(TAG, "onToast")
    }

    override fun onDataWrite(buffer: ByteArray) {
        Log.d(TAG, "onDataWrite")
    }

    override fun onItemClick(device: BluetoothDeviceDecorator, position: Int) {
        mService!!.connect(device.device)
    }

    companion object {

        val TAG = "BluetoothExampleKotlin"
    }
}
```

Find the full code [here](https://github.com/douglasjunior/AndroidBluetoothLibrary/tree/master/SampleKotlin)

### Reference

Find complete reference [here](https://github.com/douglasjunior/AndroidBluetoothLibrary).
