# NearBy Connections Example
custom_feilds:

>  Kotlin Android Example Using Nearby Connections API.

For a full NearBy Connections API example project follow the following steps.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `BLUETOOTH` permission.
2. Our `BLUETOOTH_ADMIN` permission.
3. Our `ACCESS_WIFI_STATE` permission.
4. Our `CHANGE_WIFI_STATE` permission.
5. Our `ACCESS_COARSE_LOCATION` permission.
6. Our `ACCESS_FINE_LOCATION` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.github.okwrtdsh.nearbytest">

    <!-- Required for Nearby Connections -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following 4 UI widgets:

1. `RelativeLayout`
2. `TextView`
3. `LinearLayout`
4. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <TextView
        android:id="@+id/textViewLog"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_above="@+id/linearLayoutButtons"
        android:layout_alignParentTop="true"
        android:gravity="bottom"
        android:padding="8dp" />

    <LinearLayout
        android:id="@+id/linearLayoutButtons"
        style="?android:attr/buttonBarStyle"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:gravity="center"
        android:orientation="horizontal">

        <Button
            android:id="@+id/buttonStartAdvertising"
            style="?android:attr/buttonBarButtonStyle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/activity_main_button_start_advertising_text"
            android:textSize="12sp" />

        <Button
            android:id="@+id/buttonStopAdvertising"
            style="?android:attr/buttonBarButtonStyle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/activity_main_button_stop_advertising_text"
            android:textSize="12sp" />

        <Button
            android:id="@+id/buttonStartDiscovery"
            style="?android:attr/buttonBarButtonStyle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/activity_main_button_start_discovery_text"
            android:textSize="12sp" />

        <Button
            android:id="@+id/buttonStopDiscovery"
            style="?android:attr/buttonBarButtonStyle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="@string/activity_main_button_stop_discovery_text"
            android:textSize="12sp" />

    </LinearLayout>

</RelativeLayout>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onStop() `.
3. `onEndpointFound(endpointId: String, info: DiscoveredEndpointInfo) `.
4. `onEndpointLost(endpointId: String) `.
5. `onConnectionInitiated(endpointId: String, connectionInfo: ConnectionInfo) `.
6. `onConnectionResult(endpointId: String, result: ConnectionResolution) `.
7. `onDisconnected(endpointId: String) `.
8. `onPayloadReceived(endpointId: String, payload: Payload) `.
9. `onPayloadTransferUpdate(endpointId: String, update: PayloadTransferUpdate) `.

We will be creating the following methods:

1. `startAdvertising() `.
2. `stopAdvertising() `.
3. `startDiscovery() `.
4. `stopDiscovery() `.
5. `sendString(parameter)` - Let's pass a `String` object as a parameter.
6. `disconnectFromEndpoint() `.
7. `debug(parameter)` - Pass to this method a `String` object as a parameter.

**(a). Our `disconnectFromEndpoint()` function**

Write the `disconnectFromEndpoint()` function as follows:

```kotlin
    private fun disconnectFromEndpoint() {
        mConnectionsClient.disconnectFromEndpoint(mRemoteEndpointId!!)
        mRemoteEndpointId = null
    }
```

**(b). Our `startAdvertising()` function**

Write the `startAdvertising()` function as follows:

```kotlin
    private fun startAdvertising() {
        mConnectionsClient.startAdvertising(
            getNickName(),
            SERVICE_ID,
            mConnectionLifecycleCallback,
            AdvertisingOptions(Strategy.P2P_CLUSTER)
        )
            .addOnSuccessListener {
                debug("Success startAdvertising: $it")
            }
            .addOnFailureListener {
                debug("Failure startDiscovery: $it")
            }
    }
```

**(c). Our `sendString()` function**

Write the `sendString()` function as follows:

```kotlin
    private fun sendString(content: String) {
        mConnectionsClient.sendPayload(
            mRemoteEndpointId!!,
            Payload.fromBytes(content.toByteArray(Charsets.UTF_8))
        )
    }
```

**(d). Our `stopDiscovery()` function**

Write the `stopDiscovery()` function as follows:

```kotlin
    private fun stopDiscovery() {
        mConnectionsClient.stopDiscovery()
        debug("Success stopDiscovery")
    }
```

**(e). Our `debug()` function**

Write the `debug()` function as follows:

```kotlin
    private fun debug(message: String) {
        textViewLog.append(message + "\n")
        Log.d(TAG, message)
    }
```

**(f). Our `stopAdvertising()` function**

Write the `stopAdvertising()` function as follows:

```kotlin
    private fun stopAdvertising() {
        mConnectionsClient.stopAdvertising()
        debug("Success stopAdvertising")
    }
```

**(g). Our `startDiscovery()` function**

Write the `startDiscovery()` function as follows:

```kotlin
    private fun startDiscovery() {
        mConnectionsClient.startDiscovery(
            packageName,
            mEndpointDiscoveryCallback,
            DiscoveryOptions(Strategy.P2P_CLUSTER)
        )
            .addOnSuccessListener {
                debug("Success startDiscovery: $it")
            }
            .addOnFailureListener {
                debug("Failure startDiscovery: $it")
            }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.google.android.gms.nearby.Nearby
import com.google.android.gms.nearby.connection.*
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*


class MainActivity : AppCompatActivity() {

    var mRemoteEndpointId: String? = null
    lateinit var mConnectionsClient: ConnectionsClient

    companion object {
        private const val REQUEST_CODE_PERMISSIONS = 1
        private const val TAG: String = "nearbytest"
        private const val SERVICE_ID: String = "com.github.okwrtdsh.nearbytest"
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        this.applicationContext
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mConnectionsClient = Nearby.getConnectionsClient(this)

        buttonStartAdvertising.setOnClickListener {
            startAdvertising()
        }

        buttonStopAdvertising.setOnClickListener {
            stopAdvertising()
        }

        buttonStartDiscovery.setOnClickListener {
            startDiscovery()
        }

        buttonStopDiscovery.setOnClickListener {
            stopDiscovery()
        }

        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION),
            REQUEST_CODE_PERMISSIONS
        )
    }

    override fun onStop() {
        super.onStop()
        mConnectionsClient.stopAdvertising()
        mConnectionsClient.stopDiscovery()
        mConnectionsClient.stopAllEndpoints()
    }

    private fun startAdvertising() {
        mConnectionsClient.startAdvertising(
            getNickName(),
            SERVICE_ID,
            mConnectionLifecycleCallback,
            AdvertisingOptions(Strategy.P2P_CLUSTER)
        )
            .addOnSuccessListener {
                debug("Success startAdvertising: $it")
            }
            .addOnFailureListener {
                debug("Failure startDiscovery: $it")
            }
    }

    private fun stopAdvertising() {
        mConnectionsClient.stopAdvertising()
        debug("Success stopAdvertising")
    }

    private fun startDiscovery() {
        mConnectionsClient.startDiscovery(
            packageName,
            mEndpointDiscoveryCallback,
            DiscoveryOptions(Strategy.P2P_CLUSTER)
        )
            .addOnSuccessListener {
                debug("Success startDiscovery: $it")
            }
            .addOnFailureListener {
                debug("Failure startDiscovery: $it")
            }
    }

    private fun stopDiscovery() {
        mConnectionsClient.stopDiscovery()
        debug("Success stopDiscovery")
    }

    private fun sendString(content: String) {
        mConnectionsClient.sendPayload(
            mRemoteEndpointId!!,
            Payload.fromBytes(content.toByteArray(Charsets.UTF_8))
        )
    }

    private fun disconnectFromEndpoint() {
        mConnectionsClient.disconnectFromEndpoint(mRemoteEndpointId!!)
        mRemoteEndpointId = null
    }


    private val mEndpointDiscoveryCallback = object : EndpointDiscoveryCallback() {

        override fun onEndpointFound(endpointId: String, info: DiscoveredEndpointInfo) {
            // An endpoint was found. We request a connection to it.
            debug("mEndpointDiscoveryCallback.onEndpointFound $endpointId:$info:${info.endpointName}")

            mConnectionsClient.requestConnection(
                getNickName(),
                endpointId,
                mConnectionLifecycleCallback
            )
                .addOnSuccessListener {
                    // We successfully requested a connection. Now both sides
                    // must accept before the connection is established.
                    debug("Success requestConnection: $it")
                }
                .addOnFailureListener {
                    // Nearby Connections failed to request the connection.
                    // TODO: retry
                    debug("Failure requestConnection: $it")
                }
        }

        override fun onEndpointLost(endpointId: String) {
            // A previously discovered endpoint has gone away.
            debug("mEndpointDiscoveryCallback.onEndpointLost $endpointId")
        }
    }

    private val mConnectionLifecycleCallback = object : ConnectionLifecycleCallback() {

        override fun onConnectionInitiated(endpointId: String, connectionInfo: ConnectionInfo) {
            debug("mConnectionLifecycleCallback.onConnectionInitiated $endpointId:${connectionInfo.endpointName}")

            // Automatically accept the connection on both sides.
            mConnectionsClient.acceptConnection(endpointId, mPayloadCallback)
        }

        override fun onConnectionResult(endpointId: String, result: ConnectionResolution) {
            debug("mConnectionLifecycleCallback.onConnectionResult $endpointId")

            when (result.status.statusCode) {
                ConnectionsStatusCodes.STATUS_OK -> {
                    debug("onnectionsStatusCodes.STATUS_OK $endpointId")
                    // We're connected! Can now start sending and receiving data.
                    mRemoteEndpointId = endpointId

                    sendString("Hello ${mRemoteEndpointId}!")
                }

                ConnectionsStatusCodes.STATUS_CONNECTION_REJECTED -> {
                    // The connection was rejected by one or both sides.
                    debug("onnectionsStatusCodes.STATUS_CONNECTION_REJECTED $endpointId")
                }

                ConnectionsStatusCodes.STATUS_ERROR -> {
                    // The connection broke before it was able to be accepted.
                    debug("onnectionsStatusCodes.STATUS_ERROR $endpointId")
                }
            }
        }

        override fun onDisconnected(endpointId: String) {
            // We've been disconnected from this endpoint. No more data can be
            // sent or received.
            debug("mConnectionLifecycleCallback.onDisconnected $endpointId")
            disconnectFromEndpoint()
        }

    }

    private val mPayloadCallback = object : PayloadCallback() {
        override fun onPayloadReceived(endpointId: String, payload: Payload) {
            debug("mPayloadCallback.onPayloadReceived $endpointId")

            when (payload.type) {
                Payload.Type.BYTES -> {
                    val data = payload.asBytes()!!
                    debug("Payload.Type.BYTES: ${data.toString(Charsets.UTF_8)}")
                }
                Payload.Type.FILE -> {
                    val file = payload.asFile()!!
                    debug("Payload.Type.FILE: size: ${file.size}")
                    // TODO:

                }
                Payload.Type.STREAM -> {
                    val stream = payload.asStream()!!
                    debug("Payload.Type.STREAM")
                    // TODO:
                }
            }
        }

        override fun onPayloadTransferUpdate(endpointId: String, update: PayloadTransferUpdate) {
            // Bytes payloads are sent as a single chunk, so you'll receive a SUCCESS update immediately
            // after the call to onPayloadReceived().
            // debug("mPayloadCallback.onPayloadTransferUpdate $endpointId")
        }
    }


    private fun debug(message: String) {
        textViewLog.append(message + "\n")
        Log.d(TAG, message)
    }

    private fun getNickName() = UUID.randomUUID().toString()
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/okwrtdsh/NearByTest/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/okwrtdsh/NearByTest).|
|3.|Follow code author [here](https://github.com/okwrtdsh).|
