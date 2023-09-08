# Kotlin Android - Check Internet Connectivity Example


Learn how to check internet connectivity in kotlin android using simple step by step examples.


## Example 1: Check Internet Connectivity

> Learn how to check connection in Kotlin using this simple example.

The `isNetworkConnected()` will return a boolean indicating the availability of the connection.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Add Permissions

Go to your `AndroidManifest.xml` and add the following permissions:

```xml
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
```

### Step 4: Design Layout

Here's our layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Write code

Go to `MainActivity.kt` file and add the following imports:

```kotlin
import android.content.Context
import android.net.ConnectivityManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
```

The extend the `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Then define a function to show a Toast message:

```kotlin
    fun toast(msg: String)
    {
        Toast.makeText(this,msg,Toast.LENGTH_SHORT).show()
    }
```

The following function will check if internet is available or not:

```kotlin
    fun CheckConnectionType()
    {
        val connectionManager = this.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val wifi_Connection = connectionManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI)
        val mobile_data_connection = connectionManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE)

        if (wifi_Connection.isConnectedOrConnecting)
        {
            toast("WIFI Connection is on")
        }
        else
        {
            if (mobile_data_connection.isConnectedOrConnecting)
            {
                toast("Mobile Data Connection is on")
            }
            else
            {
                toast("No Network Connection")
            }
        }
    }
```

Here's the full code:

**MainActivity.kt**

```kotlin
import android.content.Context
import android.net.ConnectivityManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        CheckConnectionType()
    }

    fun CheckConnectionType()
    {
        val connectionManager = this.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val wifi_Connection = connectionManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI)
        val mobile_data_connection = connectionManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE)

        if (wifi_Connection.isConnectedOrConnecting)
        {
            toast("WIFI Connection is on")
        }
        else
        {
            if (mobile_data_connection.isConnectedOrConnecting)
            {
                toast("Mobile Data Connection is on")
            }
            else
            {
                toast("No Network Connection")
            }
        }
    }

    fun toast(msg: String)
    {
        Toast.makeText(this,msg,Toast.LENGTH_SHORT).show()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Check-Internet-Connection-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
