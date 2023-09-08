# ConnectivityManager and NotificationManager.

>  Kotlin Android Example Using ConnectivityManager and NotificationManager.

For a full ConnectivityManager example project follow the following steps.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `ACCESS_NETWORK_STATE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.github.okwrtdsh.connectivitytest">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

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

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following 2 UI widgets and ViewGroups:

1. `LinearLayout`
2. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:layout_centerVertical="true"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/buttonStart"
        android:text="@string/start"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_weight="1" />

    <Button
        android:id="@+id/buttonStop"
        android:text="@string/stop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_weight="1" />

</LinearLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Manifest` from the `android` package.
2. `NotificationChannel` from the `android.app` package.
3. `NotificationManager` from the `android.app` package.
4. `PendingIntent` from the `android.app` package.
5. `Context` from the `android.content` package.
6. `Intent` from the `android.content` package.
7. `Color` from the `android.graphics` package.
8. `ConnectivityManager` from the `android.net` package.
9. `Network` from the `android.net` package.
10. `NetworkCapabilities` from the `android.net` package.
11. `NetworkRequest` from the `android.net` package.
12. `Bundle` from the `android.os` package.
13. `Log` from the `android.util` package.
14. `AppCompatActivity` from the `androidx.appcompat.app` package.
15. `ActivityCompat` from the `androidx.core.app` package.
16. `NotificationCompat` from the `androidx.core.app` package.
17. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `registerCallback() `.
2. `unregisterCallback() `.
3. `checkConnection() `.
4. `notify(title: String, text: String) `.
5. `debug(parameter)` - Let's pass a `String` object as a parameter.

**(a). Our `checkConnection()` function**

Write the `checkConnection()` function as follows:

```kotlin
    private fun checkConnection() {
        val activeNetworks = cm.allNetworks.mapNotNull {
            cm.getNetworkCapabilities(it)
        }.filter {
            it.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                    it.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
        }

        val isConnected = activeNetworks.isNotEmpty()
        val isWiFi = activeNetworks.any { it.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) }

        notify(TAG, "isConnected: ${isConnected}, isWiFi: ${isWiFi}")
    }
```

**(b). Our `notify()` function**

Write the `notify()` function as follows:

```kotlin
    private fun notify(title: String, text: String) {
        debug("notify(title: $title, text: $text)")
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (manager.getNotificationChannel(channelId) == null)
            NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
                .apply {
                    description = channelDescription
                    lightColor = Color.BLUE
                    setSound(null, null)
                    enableLights(false)
                    enableVibration(false)
                }
                .run {
                    manager.createNotificationChannel(this)
                }

        NotificationCompat
            .Builder(this, channelId)
            .apply {
                setContentTitle(title)
                setContentText(text)
                setSmallIcon(R.drawable.ic_launcher_background)
                setAutoCancel(true)
                setContentIntent(
                    PendingIntent.getActivity(
                        applicationContext,
                        0,
                        Intent(applicationContext, MainActivity::class.java)
                            .apply {
                                flags =
                                    Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED or Intent.FLAG_ACTIVITY_NEW_TASK
                            },
                        PendingIntent.FLAG_CANCEL_CURRENT
                    )
                )
            }
            .build()
            .run {
                manager.notify(1, this)
            }
    }
```

**(c). Our `debug()` function**

Write the `debug()` function as follows:

```kotlin
    private fun debug(message: String) {
        Log.d(TAG, message)
    }
```

**(d). Our `registerCallback()` function**

Write the `registerCallback()` function as follows:

```kotlin
    private fun registerCallback() {
        if (!isRegister) {
            NetworkRequest
                .Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
                .build()
                .run {
                    cm.registerNetworkCallback(this, mNetworkCallback)
                }
            isRegister = true
            debug("Start")
        }
    }
```

**(e). Our `unregisterCallback()` function**

Write the `unregisterCallback()` function as follows:

```kotlin
    private fun unregisterCallback() {
        if (isRegister) {
            cm.unregisterNetworkCallback(mNetworkCallback)
            isRegister = false
            debug("Stop")

        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {
    private lateinit var cm: ConnectivityManager
    private var isRegister = false

    companion object {
        private const val TAG: String = "connectivitytest"
        private const val channelId = "com.github.okwrtdsh.connectivitytest"
        private const val channelDescription = "Description"
        private const val channelName = "connectivity_test"
        private const val REQUEST_CODE_PERMISSIONS = 1
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        cm = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager

        buttonStart.setOnClickListener {
            registerCallback()
        }

        buttonStop.setOnClickListener {
            unregisterCallback()
        }
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.ACCESS_NETWORK_STATE),
            REQUEST_CODE_PERMISSIONS
        )

    }

    private fun registerCallback() {
        if (!isRegister) {
            NetworkRequest
                .Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
                .build()
                .run {
                    cm.registerNetworkCallback(this, mNetworkCallback)
                }
            isRegister = true
            debug("Start")
        }
    }

    private fun unregisterCallback() {
        if (isRegister) {
            cm.unregisterNetworkCallback(mNetworkCallback)
            isRegister = false
            debug("Stop")

        }
    }

    private val mNetworkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network?) = checkConnection()
        override fun onLost(network: Network?) = checkConnection()
    }

    private fun checkConnection() {
        val activeNetworks = cm.allNetworks.mapNotNull {
            cm.getNetworkCapabilities(it)
        }.filter {
            it.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) &&
                    it.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
        }

        val isConnected = activeNetworks.isNotEmpty()
        val isWiFi = activeNetworks.any { it.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) }

        notify(TAG, "isConnected: ${isConnected}, isWiFi: ${isWiFi}")
    }

    private fun notify(title: String, text: String) {
        debug("notify(title: $title, text: $text)")
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (manager.getNotificationChannel(channelId) == null)
            NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
                .apply {
                    description = channelDescription
                    lightColor = Color.BLUE
                    setSound(null, null)
                    enableLights(false)
                    enableVibration(false)
                }
                .run {
                    manager.createNotificationChannel(this)
                }

        NotificationCompat
            .Builder(this, channelId)
            .apply {
                setContentTitle(title)
                setContentText(text)
                setSmallIcon(R.drawable.ic_launcher_background)
                setAutoCancel(true)
                setContentIntent(
                    PendingIntent.getActivity(
                        applicationContext,
                        0,
                        Intent(applicationContext, MainActivity::class.java)
                            .apply {
                                flags =
                                    Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED or Intent.FLAG_ACTIVITY_NEW_TASK
                            },
                        PendingIntent.FLAG_CANCEL_CURRENT
                    )
                )
            }
            .build()
            .run {
                manager.notify(1, this)
            }
    }

    private fun debug(message: String) {
        Log.d(TAG, message)
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/okwrtdsh/ConnectivityTest/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/okwrtdsh/ConnectivityTest).|
|3.|Follow code author [here](https://github.com/okwrtdsh).|
