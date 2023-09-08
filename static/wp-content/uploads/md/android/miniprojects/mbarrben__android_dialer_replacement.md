# Adndrod Dialer Replacement

>  Android dialer replacement sample app.


A sample project about how to implement a working dialer replacement app for Android.

In this project we'll have a simple app that:

- Requests the user to be selected as default phone app.
- Once selected, captures call states and displays a UI showing info about the call and allowing to answer, reject and cancel calls.

### Images

![Dialer Tutorial](https://github.com/mbarrben/android_dialer_replacement/raw/master/media/default_dialer_dialog.png)

![Dialer Tutorial](https://github.com/mbarrben/android_dialer_replacement/raw/master/media/incoming_call.png)


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib-jre7` library.
2. Our `Appcompat-v7` library.
3. Our `Constraint-layout` library.
4. Our `Rxkotlin` library.
5. Our `Rxandroid` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
  compileSdkVersion 27
  defaultConfig {
    applicationId "com.mbarrben.dialer"
    minSdkVersion 19
    targetSdkVersion 27
    versionCode 1
    versionName "1.0"
    testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
  }
  buildTypes {
    release {
      minifyEnabled false
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
  }
}

dependencies {
  implementation "org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
  implementation 'com.android.support:appcompat-v7:27.1.0'
  implementation 'com.android.support.constraint:constraint-layout:1.0.2'
  implementation 'io.reactivex.rxjava2:rxkotlin:2.2.0'
  implementation 'io.reactivex.rxjava2:rxandroid:2.0.2'

  testImplementation 'junit:junit:4.12'

  androidTestImplementation 'com.android.support.test:runner:1.0.1'
  androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.1'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 2 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. We will be creating a single [`Service`](htpps://android.examples.directory/service) so we have to register it as well. We will be defining a `meta-data` tag as well. Here we will add the following permission:

1. Our `BIND_INCALL_SERVICE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mbarrben.dialer">

  <application
      android:allowBackup="true"
      android:icon="@mipmap/ic_launcher"
      android:label="@string/app_name"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:supportsRtl="true"
      android:theme="@style/AppTheme">
    <activity android:name=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>

        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>

      <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <action android:name="android.intent.action.DIAL"/>

        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>

        <data android:scheme="tel"/>
      </intent-filter>
      <intent-filter>
        <action android:name="android.intent.action.DIAL"/>

        <category android:name="android.intent.category.DEFAULT"/>
      </intent-filter>

    </activity>

    <activity
        android:name=".CallActivity"
        android:theme="@style/AppTheme.CallScreen"/>

    <service
        android:name=".CallService"
        android:permission="android.permission.BIND_INCALL_SERVICE">
      <meta-data
          android:name="android.telecom.IN_CALL_SERVICE_UI"
          android:value="true"/>

      <intent-filter>
        <action android:name="android.telecom.InCallService"/>
      </intent-filter>
    </service>

  </application>

</manifest>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `activity_call.xml`**

> Our `activity_call` layout.

This layout will represent our Call Activity's layout. Specify [`android.support.constraint.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="false"
    tools:context=".CallActivity"
    >

  <ImageView
      android:id="@+id/imageBackground"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:background="@drawable/cat"
      android:fitsSystemWindows="false"
      android:foreground="#33000000"
      />

  <TextView
      android:id="@+id/textDisplayName"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginTop="50dp"
      android:gravity="center_horizontal"
      android:textColor="@android:color/white"
      android:textSize="32sp"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      tools:text="@tools:sample/full_names"
      />

  <TextView
      android:id="@+id/textStatus"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginTop="8dp"
      android:gravity="center_horizontal"
      android:textColor="@android:color/white"
      android:textSize="16sp"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@+id/textDisplayName"
      tools:text="Calling…"
      />

  <TextView
      android:id="@+id/textDuration"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginTop="8dp"
      android:gravity="center_horizontal"
      android:text="00:00:00"
      android:textColor="@android:color/white"
      android:textSize="16sp"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@+id/textStatus"
      />

  <ImageView
      android:id="@+id/buttonHangup"
      android:layout_width="80dp"
      android:layout_height="80dp"
      android:layout_marginBottom="24dp"
      android:layout_marginStart="40dp"
      android:background="@drawable/ic_hangup_button_background"
      android:clickable="true"
      android:focusable="true"
      android:scaleType="center"
      android:src="@drawable/ic_call_end"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toStartOf="@id/buttonAnswer"
      app:layout_constraintHorizontal_chainStyle="spread_inside"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_goneMarginEnd="40dp"
      />

  <ImageView
      android:id="@+id/buttonAnswer"
      android:layout_width="80dp"
      android:layout_height="80dp"
      android:layout_marginBottom="24dp"
      android:layout_marginEnd="40dp"
      android:background="@drawable/ic_answer_button_background"
      android:clickable="true"
      android:focusable="true"
      android:scaleType="center"
      android:src="@drawable/ic_call"
      android:visibility="gone"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toEndOf="@id/buttonHangup"
      tools:visibility="visible"
      />

</android.support.constraint.ConstraintLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`android.support.constraint.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
		xmlns:android="http://schemas.android.com/apk/res/android"
		xmlns:tools="http://schemas.android.com/tools"
		xmlns:app="http://schemas.android.com/apk/res-auto"
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
			app:layout_constraintTop_toTopOf="parent"/>

</android.support.constraint.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `Mappers.kt`**

> Our `Mappers` class.

Create a Kotlin file named `Mappers.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TargetApi` from the `android.annotation` package.
2. `Build` from the `android.os` package.
3. `Call` from the `android.telecom` package.

Then we will be creating the following functions:

1. `Int.toGsmCallStatus() = when (this) `.

**(a). Our `Int.toGsmCallStatus()` function.**

A function to  int.to gsm call status:

```kotlin
private fun Int.toGsmCallStatus() = when (this) {
  Call.STATE_ACTIVE -> GsmCall.Status.ACTIVE
  Call.STATE_RINGING -> GsmCall.Status.RINGING
  Call.STATE_CONNECTING -> GsmCall.Status.CONNECTING
  Call.STATE_DIALING -> GsmCall.Status.DIALING
  Call.STATE_DISCONNECTED -> GsmCall.Status.DISCONNECTED
  else -> GsmCall.Status.UNKNOWN
}
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.TargetApi
import android.os.Build
import android.telecom.Call

@TargetApi(Build.VERSION_CODES.M)
fun Call.toGsmCall() = GsmCall(
	status = state.toGsmCallStatus(),
	displayName = details.handle.schemeSpecificPart
)

private fun Int.toGsmCallStatus() = when (this) {
  Call.STATE_ACTIVE -> GsmCall.Status.ACTIVE
  Call.STATE_RINGING -> GsmCall.Status.RINGING
  Call.STATE_CONNECTING -> GsmCall.Status.CONNECTING
  Call.STATE_DIALING -> GsmCall.Status.DIALING
  Call.STATE_DISCONNECTED -> GsmCall.Status.DISCONNECTED
  else -> GsmCall.Status.UNKNOWN
}


```


**(b). `GsmCall.kt`**

> Our `GsmCall` class.

Create a Kotlin file named `GsmCall.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class GsmCall(val status: GsmCall.Status, val displayName: String?) {

  enum class Status {
    CONNECTING,
    DIALING,
    RINGING,
    ACTIVE,
    DISCONNECTED,
    UNKNOWN
  }
}

```


**(c). `CallService.kt`**

> Our `CallService` class.

Create a Kotlin file named `CallService.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Build` from the `android.os` package.
3. `Call` from the `android.telecom` package.
4. `InCallService` from the `android.telecom` package.
5. `Log` from the `android.util` package.

Then extend the `InCallService` and add its contents as follows:

First override these callbacks: 

1. `onCallAdded(call: Call) `.
2. `onCallRemoved(call: Call) `.
3. `onStateChanged(call: Call, state: Int) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.TargetApi
import android.content.Intent
import android.os.Build
import android.telecom.Call
import android.telecom.InCallService
import android.util.Log

@TargetApi(Build.VERSION_CODES.M)
class CallService : InCallService() {

  companion object {
    private const val LOG_TAG = "CallService"
  }

  override fun onCallAdded(call: Call) {
    super.onCallAdded(call)
    Log.i(LOG_TAG, "onCallAdded: $call")
    call.registerCallback(callCallback)
    startActivity(Intent(this, CallActivity::class.java))
    CallManager.updateCall(call)
  }

  override fun onCallRemoved(call: Call) {
    super.onCallRemoved(call)
    Log.i(LOG_TAG, "onCallRemoved: $call")
    call.unregisterCallback(callCallback)
    CallManager.updateCall(null)
  }

  private val callCallback = object : Call.Callback() {
    override fun onStateChanged(call: Call, state: Int) {
      Log.i(LOG_TAG, "Call.Callback onStateChanged: $call, state: $state")
      CallManager.updateCall(call)
    }
  }

}

```


**(d). `CallManager.kt`**

> Our `CallManager` class.

Create a Kotlin file named `CallManager.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TargetApi` from the `android.annotation` package.
2. `Build` from the `android.os` package.
3. `Call` from the `android.telecom` package.
4. `Log` from the `android.util` package.

Then we will be creating the following functions:

1. `updateCall(parameter)` - Let's pass a `Call?` object as a parameter.
2. `cancelCall() `.
3. `acceptCall() `.
4. `rejectCall() `.
5. `disconnectCall() `.

**(a). Our `rejectCall()` function.**

A function to reject call:

```kotlin
  private fun rejectCall() {
    Log.i(LOG_TAG, "rejectCall")
    currentCall?.reject(false, "")
  }
```

**(b). Our `cancelCall()` function.**

A function to cancel call:

```kotlin
  fun cancelCall() {
    currentCall?.let {
      when (it.state) {
        Call.STATE_RINGING -> rejectCall()
        else               -> disconnectCall()
      }
    }
  }
```

**(c). Our `updateCall()` function.**

A function to update call:

```kotlin
  fun updateCall(call: Call?) {
    currentCall = call
    call?.let {
      subject.onNext(it.toGsmCall())
    }
  }
```

**(d). Our `disconnectCall()` function.**

A function to disconnect call:

```kotlin
  private fun disconnectCall() {
    Log.i(LOG_TAG, "disconnectCall")
    currentCall?.disconnect()
  }
```

**(e). Our `acceptCall()` function.**

A function to accept call:

```kotlin
  fun acceptCall() {
    Log.i(LOG_TAG, "acceptCall")
    currentCall?.let {
      it.answer(it.details.videoState)
    }
  }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.TargetApi
import android.os.Build
import android.telecom.Call
import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject

@TargetApi(Build.VERSION_CODES.M)
object CallManager {

  private const val LOG_TAG = "CallManager"

  private val subject = BehaviorSubject.create<GsmCall>()

  private var currentCall: Call? = null

  fun updates(): Observable<GsmCall> = subject

  fun updateCall(call: Call?) {
    currentCall = call
    call?.let {
      subject.onNext(it.toGsmCall())
    }
  }

  fun cancelCall() {
    currentCall?.let {
      when (it.state) {
        Call.STATE_RINGING -> rejectCall()
        else               -> disconnectCall()
      }
    }
  }

  fun acceptCall() {
    Log.i(LOG_TAG, "acceptCall")
    currentCall?.let {
      it.answer(it.details.videoState)
    }
  }

  private fun rejectCall() {
    Log.i(LOG_TAG, "rejectCall")
    currentCall?.reject(false, "")
  }

  private fun disconnectCall() {
    Log.i(LOG_TAG, "disconnectCall")
    currentCall?.disconnect()
  }
}


```


**(e). `CallActivity.kt`**

> Our `CallActivity` class.

Create a Kotlin file named `CallActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `Log` from the `android.util` package.
3. `View` from the `android.view` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResume() `.
3. `onPause() `.

Then we will be creating the following functions:

1. `updateView(parameter)` - Let's pass a `GsmCall` object as a parameter.
2. `hideBottomNavigationBar() `.
3. `startTimer() `.
4. `stopTimer() `.

**(a). Our `startTimer()` function.**

A function to start timer:

```kotlin
  private fun startTimer() {
    timerDisposable = Observable.interval(1, TimeUnit.SECONDS)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe { textDuration.text = it.toDurationString() }
  }
```

**(b). Our `stopTimer()` function.**

A function to stop timer:

```kotlin
  private fun stopTimer() {
    timerDisposable.dispose()
  }
```

**(c). Our `updateView()` function.**

A function to update view:

```kotlin
  private fun updateView(gsmCall: GsmCall) {
    textStatus.visibility = when (gsmCall.status) {
      GsmCall.Status.ACTIVE -> View.GONE
      else                  -> View.VISIBLE
    }
    textStatus.text = when (gsmCall.status) {
      GsmCall.Status.CONNECTING   -> "Connecting…"
      GsmCall.Status.DIALING      -> "Calling…"
      GsmCall.Status.RINGING      -> "Incoming call"
      GsmCall.Status.ACTIVE       -> ""
      GsmCall.Status.DISCONNECTED -> "Finished call"
      GsmCall.Status.UNKNOWN      -> ""
    }
    textDuration.visibility = when (gsmCall.status) {
      GsmCall.Status.ACTIVE -> View.VISIBLE
      else                  -> View.GONE
    }
    buttonHangup.visibility = when (gsmCall.status) {
      GsmCall.Status.DISCONNECTED -> View.GONE
      else                        -> View.VISIBLE
    }

    if (gsmCall.status == GsmCall.Status.DISCONNECTED) {
      buttonHangup.postDelayed({ finish() }, 3000)
    }

    when (gsmCall.status) {
      GsmCall.Status.ACTIVE       -> startTimer()
      GsmCall.Status.DISCONNECTED -> stopTimer()
      else                        -> Unit
    }

    textDisplayName.text = gsmCall.displayName ?: "Unknown"

    buttonAnswer.visibility = when (gsmCall.status) {
      GsmCall.Status.RINGING -> View.VISIBLE
      else                   -> View.GONE
    }
  }
```

**(d). Our `hideBottomNavigationBar()` function.**

A function to hide bottom navigation bar:

```kotlin
  private fun hideBottomNavigationBar() {
    window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
  }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.view.View
import com.mbarrben.dialer.R.id.buttonAnswer
import com.mbarrben.dialer.R.id.buttonHangup
import com.mbarrben.dialer.R.id.textDisplayName
import com.mbarrben.dialer.R.id.textDuration
import com.mbarrben.dialer.R.id.textStatus
import io.reactivex.Observable
import io.reactivex.disposables.Disposables
import java.util.concurrent.TimeUnit

class CallActivity : AppCompatActivity() {

  companion object {
    private const val LOG_TAG = "CallActivity"
  }

  private var updatesDisposable = Disposables.empty()
  private var timerDisposable = Disposables.empty()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_call)

    hideBottomNavigationBar()

    buttonHangup.setOnClickListener { CallManager.cancelCall() }
    buttonAnswer.setOnClickListener { CallManager.acceptCall() }
  }

  override fun onResume() {
    super.onResume()
    updatesDisposable = CallManager.updates()
        .doOnEach { Log.i(LOG_TAG, "updated call: $it") }
        .doOnError { throwable -> Log.e(LOG_TAG, "Error processing call", throwable) }
        .subscribe { updateView(it) }
  }

  private fun updateView(gsmCall: GsmCall) {
    textStatus.visibility = when (gsmCall.status) {
      GsmCall.Status.ACTIVE -> View.GONE
      else                  -> View.VISIBLE
    }
    textStatus.text = when (gsmCall.status) {
      GsmCall.Status.CONNECTING   -> "Connecting…"
      GsmCall.Status.DIALING      -> "Calling…"
      GsmCall.Status.RINGING      -> "Incoming call"
      GsmCall.Status.ACTIVE       -> ""
      GsmCall.Status.DISCONNECTED -> "Finished call"
      GsmCall.Status.UNKNOWN      -> ""
    }
    textDuration.visibility = when (gsmCall.status) {
      GsmCall.Status.ACTIVE -> View.VISIBLE
      else                  -> View.GONE
    }
    buttonHangup.visibility = when (gsmCall.status) {
      GsmCall.Status.DISCONNECTED -> View.GONE
      else                        -> View.VISIBLE
    }

    if (gsmCall.status == GsmCall.Status.DISCONNECTED) {
      buttonHangup.postDelayed({ finish() }, 3000)
    }

    when (gsmCall.status) {
      GsmCall.Status.ACTIVE       -> startTimer()
      GsmCall.Status.DISCONNECTED -> stopTimer()
      else                        -> Unit
    }

    textDisplayName.text = gsmCall.displayName ?: "Unknown"

    buttonAnswer.visibility = when (gsmCall.status) {
      GsmCall.Status.RINGING -> View.VISIBLE
      else                   -> View.GONE
    }
  }

  override fun onPause() {
    super.onPause()
    updatesDisposable.dispose()
  }

  private fun hideBottomNavigationBar() {
    window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
  }

  private fun startTimer() {
    timerDisposable = Observable.interval(1, TimeUnit.SECONDS)
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe { textDuration.text = it.toDurationString() }
  }

  private fun stopTimer() {
    timerDisposable.dispose()
  }

  private fun Long.toDurationString() = String.format("%02d:%02d:%02d", this / 3600, (this % 3600) / 60, (this % 60))
}


```


**(f). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Build` from the `android.os` package.
2. `Bundle` from the `android.os` package.
3. `AppCompatActivity` from the `android.support.v7.app` package.
4. `TelecomManager` from the `android.telecom` package.
5. `Toast` from the `android.widget` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onStart() `.
3. `onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) `.

Then we will be creating the following functions:

1. `checkDefaultDialer() `.
2. `checkSetDefaultDialerResult(parameter)` - We pass a `Int` object as a parameter.

**(a). Our `checkSetDefaultDialerResult()` function.**

A function to check set default dialer result:

```kotlin
  private fun checkSetDefaultDialerResult(resultCode: Int) {
    val message = when (resultCode) {
      RESULT_OK       -> "User accepted request to become default dialer"
      RESULT_CANCELED -> "User declined request to become default dialer"
      else            -> "Unexpected result code $resultCode"
    }

    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
  }
```

**(b). Our `checkDefaultDialer()` function.**

A function to check default dialer:

```kotlin
  private fun checkDefaultDialer() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return

    val telecomManager = getSystemService(TELECOM_SERVICE) as TelecomManager
    val isAlreadyDefaultDialer = packageName == telecomManager.defaultDialerPackage
    if (isAlreadyDefaultDialer) return

    val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
        .putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, packageName)
    startActivityForResult(intent, REQUEST_CODE_SET_DEFAULT_DIALER)
  }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity.RESULT_CANCELED
import android.app.Activity.RESULT_OK
import android.content.Context.TELECOM_SERVICE
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.telecom.TelecomManager
import android.widget.Toast

class MainActivity : AppCompatActivity() {

  companion object {
    private const val REQUEST_CODE_SET_DEFAULT_DIALER = 123
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
  }

  override fun onStart() {
    super.onStart()
    checkDefaultDialer()
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    when (requestCode) {
      REQUEST_CODE_SET_DEFAULT_DIALER -> checkSetDefaultDialerResult(resultCode)
    }
  }

  private fun checkDefaultDialer() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return

    val telecomManager = getSystemService(TELECOM_SERVICE) as TelecomManager
    val isAlreadyDefaultDialer = packageName == telecomManager.defaultDialerPackage
    if (isAlreadyDefaultDialer) return

    val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
        .putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, packageName)
    startActivityForResult(intent, REQUEST_CODE_SET_DEFAULT_DIALER)
  }

  private fun checkSetDefaultDialerResult(resultCode: Int) {
    val message = when (resultCode) {
      RESULT_OK       -> "User accepted request to become default dialer"
      RESULT_CANCELED -> "User declined request to become default dialer"
      else            -> "Unexpected result code $resultCode"
    }

    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
  }
}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/mbarrben/android_dialer_replacement/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/mbarrben/android_dialer_replacement).|
|3.|Follow code author [here](https://github.com/mbarrben).|
