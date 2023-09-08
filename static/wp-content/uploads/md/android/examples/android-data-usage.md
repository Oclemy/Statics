# How to Programmatically Monitor Data Usage in Android

Most android apps do need some ability to connect to internet. This is guaranteed to cost users money. Thus you may need the ability to programmatically monitor data usage in your android app.


In this article we want to look at options available for this.

### (a) Solution 1: Use Android Data Usage Library

The first solution is to use an already made library to implement this.

**Installation**

This library is yet to be published so you need to manually add it to your project. This is not a big deal since you need to copy only about 5 filess. The library is written in Kotlin and code is readable.

Download the code from [here](https://github.com/ibrahimsn98/android-datausage/tree/master/library).

**Add Permissions**

Then add these permissions in your android manifest:

```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />

<uses-permission
    android:name="android.permission.PACKAGE_USAGE_STATS"
    tools:ignore="ProtectedPermissions" />
```

**Usage**

Then in your code:

```kotlin
val networkStatsManager = getSystemService(Context.NETWORK_STATS_SERVICE) as NetworkStatsManager
val telephonyManager = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

val manager = DataUsageManager(networkStatsManager, telephonyManager.subscriberId)

// Monitor single interval
manager.getUsage(Interval.today, NetworkType.MOBILE)

// Monitor multiple interval
manager.getMultiUsage(listOf(Interval.month, Interval.last30days), NetworkType.WIFI)

// Observe realtime usage
manager.getRealtimeUsage(NetworkType.WIFI).subscribe()
```

**Full Code**

Here is the full code:

```kotlin
import android.app.usage.NetworkStatsManager
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.telephony.TelephonyManager
import android.util.Log
import me.ibrahimsn.library.DataUsageManager
import me.ibrahimsn.library.Interval
import me.ibrahimsn.library.NetworkType

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        //ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_PHONE_STATE), 34)

        val networkStatsManager = getSystemService(Context.NETWORK_STATS_SERVICE) as NetworkStatsManager
        val telephonyManager = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

        val manager = DataUsageManager(networkStatsManager, telephonyManager.subscriberId)

        // Monitor single interval
        manager.getUsage(Interval.today, NetworkType.MOBILE)

        // Monitor multiple interval
        manager.getMultiUsage(listOf(Interval.month, Interval.last30days), NetworkType.WIFI)

        // Observe realtime usage
        manager.getRealtimeUsage(NetworkType.WIFI).subscribe()
    }
}
```

**Download**

Download code [here](https://github.com/ibrahimsn98/android-datausage).
