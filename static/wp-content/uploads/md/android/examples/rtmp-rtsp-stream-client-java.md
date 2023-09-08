# RTMP RTSP Stream-client Example


This is an Android RTMP RTSP Stream-client Example.

This example will comprise the following files:

- `BackgroundActivity.kt`
- `ConnectCheckerRtp.kt`
- `RtpService.kt`
- `RtmpActivity.java`
- `RtspActivity.java`
- `ExampleRtmpActivity.java`
- `ExampleRtspActivity.java`
- `DisplayActivity.java`
- `DisplayService.kt`
- `RtmpFromFileActivity.java`
- `RtspFromFileActivity.java`
- `MainActivity.java`
- `OpenGlRtmpActivity.java`
- `OpenGlRtspActivity.java`
- `RotationExampleActivity.kt`
- `StreamService.kt`
- `SurfaceModeRtmpActivity.java`
- `SurfaceModeRtspActivity.java`
- `TextureModeRtmpActivity.java`
- `TextureModeRtspActivity.java`
- `ActivityLink.java`
- `ImageAdapter.java`
- `PathUtils.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


In your `app/build.gradle` add dependencies as shown below:

Enable Viewbinding:
```groovy

  buildFeatures {
    viewBinding true
  }
}
```

Import the project library:

```groovy
dependencies {
  implementation project(':rtplibrary')
  //..
}
```

### Step 3: Design Layouts

***(a). `activity_background.xml`**

Create a file named `activity_background.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_example_rtmp"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <com.pedro.rtplibrary.view.OpenGlView
      android:id="@+id/surfaceView"
      android:layout_width="match_parent"
      android:layout_height="match_parent"/>

  <EditText
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

    <Button
        android:text="@string/start_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="20dp"
        android:id="@+id/b_start_stop"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        />
</androidx.constraintlayout.widget.ConstraintLayout>
```
***(b). `activity_custom.xml`**

Create a file named `activity_custom.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:openDrawer="start"
    android:id="@+id/activity_custom"
    >

  <androidx.constraintlayout.widget.ConstraintLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      >

    <SurfaceView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/surfaceView"
        />

    <EditText
        android:textColor="@color/appColor"
        android:textColorHint="@color/appColor"
        android:inputType="textUri"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:layout_margin="20dp"
        android:id="@+id/et_rtp_url"
        app:layout_constraintTop_toTopOf="parent"
        />

    <Button
        android:text="@string/start_record"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/b_record"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toStartOf="@id/b_start_stop"
        app:layout_constraintHorizontal_chainStyle="spread"
        android:layout_marginBottom="20dp"
        />

    <Button
        android:text="@string/start_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/b_start_stop"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toEndOf="@id/b_record"
        app:layout_constraintEnd_toStartOf="@id/switch_camera"
        android:layout_marginBottom="20dp"
        />

    <Button
        android:text="@string/switch_camera_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/switch_camera"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@id/b_start_stop"
        android:layout_marginBottom="20dp"
        />

    <TextView
        android:textColor="@color/appColor"
        android:id="@+id/tv_bitrate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        app:layout_constraintTop_toBottomOf="@id/et_rtp_url"
        app:layout_constraintEnd_toEndOf="parent"
        />
  </androidx.constraintlayout.widget.ConstraintLayout>

  <com.google.android.material.navigation.NavigationView
      android:layout_width="wrap_content"
      android:layout_height="match_parent"
      android:layout_gravity="start"
      android:paddingBottom="30dp"
      android:fitsSystemWindows="true"
      app:headerLayout="@xml/options_header"
      android:id="@+id/nv_rtp"
      >
  </com.google.android.material.navigation.NavigationView>
</androidx.drawerlayout.widget.DrawerLayout>
```
***(c). `activity_display.xml`**

Create a file named `activity_display.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_example_rtmp"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <SurfaceView
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:id="@+id/surfaceView"
      />

  <EditText
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

  <Button
      android:text="@string/start_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_start_stop"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      android:layout_marginBottom="20dp"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```
***(d). `activity_example.xml`**

Create a file named `activity_example.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_example_rtmp"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <SurfaceView
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:id="@+id/surfaceView"
      />

  <EditText
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

  <Button
      android:text="@string/start_record"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_record"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintEnd_toStartOf="@id/b_start_stop"
      app:layout_constraintHorizontal_chainStyle="spread"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/start_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_start_stop"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_record"
      app:layout_constraintEnd_toStartOf="@id/switch_camera"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/switch_camera_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/switch_camera"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_start_stop"
      android:layout_marginBottom="20dp"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```
***(e). `activity_from_file.xml`**

Create a file named `activity_from_file.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/black"
    >

  <EditText
      android:hint="@string/hint_rtmp"
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

  <Button
      android:text="@string/start_record"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_record"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintEnd_toStartOf="@id/b_start_stop"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/start_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_start_stop"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_record"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/select_file"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_select_file"
      android:layout_above="@+id/seek_bar"
      app:layout_constraintStart_toEndOf="@id/b_re_sync"
      app:layout_constraintBottom_toTopOf="@id/seek_bar"
      app:layout_constraintEnd_toEndOf="parent"
      android:layout_marginBottom="20dp"
      android:layout_marginEnd="20dp"
      android:layout_marginRight="20dp" />

  <Button
      android:text="@string/resync_file"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_above="@+id/seek_bar"
      android:id="@+id/b_re_sync"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintBottom_toTopOf="@id/seek_bar"
      app:layout_constraintEnd_toStartOf="@id/b_select_file"
      app:layout_constraintHorizontal_chainStyle="spread_inside"
      android:layout_marginStart="20dp"
      android:layout_marginBottom="20dp"
      android:layout_marginLeft="20dp" />

  <SeekBar
      style="?android:attr/progressBarStyleHorizontal"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_centerHorizontal="true"
      android:id="@+id/seek_bar"
      app:layout_constraintBottom_toTopOf="@id/b_record"
      android:layout_marginBottom="20dp"
      android:layout_marginStart="20dp"
      android:layout_marginEnd="20dp"
      />

  <TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/tv_file"
      android:layout_above="@+id/b_select_file"
      android:layout_centerHorizontal="true"
      android:textColor="@color/appColor"
      android:layout_margin="10dp"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```
***(f). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    >

  <TextView
      android:id="@+id/tv_version"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:textColor="@color/appColor"
      android:textSize="12sp"
      android:layout_marginTop="@dimen/grid_2"
      android:layout_marginLeft="@dimen/grid_2"
      android:layout_marginRight="@dimen/grid_2"
      />
  <TextView
      android:id="@+id/tv_select"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginTop="@dimen/grid_2"
      android:layout_marginLeft="@dimen/grid_2"
      android:layout_marginRight="@dimen/grid_2"
      android:text="@string/tv_select"
      android:textColor="@color/appColor"
      android:textSize="22sp"
      />

  <GridView
      android:id="@+id/list"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:layout_marginTop="@dimen/grid_1"
      android:columnWidth="40dp"
      android:gravity="center"
      android:horizontalSpacing="@dimen/grid_2"
      android:numColumns="2"
      android:padding="@dimen/grid_2"
      android:stretchMode="columnWidth"
      android:verticalSpacing="@dimen/grid_2"
      />
</LinearLayout>
```
***(g). `activity_open_gl.xml`**

Create a file named `activity_open_gl.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_example_rtmp"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >
  <com.pedro.rtplibrary.view.OpenGlView
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:id="@+id/surfaceView"
      app:keepAspectRatio="true"
      app:aspectRatioMode="adjust"
      app:AAEnabled="false"
      app:numFilters="1"
      app:isFlipHorizontal="false"
      app:isFlipVertical="false"
      />

  <EditText
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

  <Button
      android:text="@string/start_record"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_record"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintEnd_toStartOf="@id/b_start_stop"
      app:layout_constraintHorizontal_chainStyle="spread"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/start_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_start_stop"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_record"
      app:layout_constraintEnd_toStartOf="@id/switch_camera"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/switch_camera_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/switch_camera"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_start_stop"
      android:layout_marginBottom="20dp"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```
***(h). `activity_texture_mode.xml`**

Create a file named `activity_texture_mode.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_example_rtmp"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/black">

  <!-- necessary LinearLayout to work with AutoFitTextureView -->
  <LinearLayout
      android:orientation="horizontal"
      android:layout_width="match_parent"
      android:layout_height="match_parent">

    <com.pedro.rtplibrary.view.AutoFitTextureView
        android:id="@+id/textureView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />
  </LinearLayout>

  <EditText
      android:textColor="@color/appColor"
      android:textColorHint="@color/appColor"
      android:inputType="textUri"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:layout_margin="20dp"
      android:id="@+id/et_rtp_url"
      app:layout_constraintTop_toTopOf="parent"
      />

  <Button
      android:text="@string/start_record"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_record"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintEnd_toStartOf="@id/b_start_stop"
      app:layout_constraintHorizontal_chainStyle="spread"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/start_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/b_start_stop"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_record"
      app:layout_constraintEnd_toStartOf="@id/switch_camera"
      android:layout_marginBottom="20dp"
      />

  <Button
      android:text="@string/switch_camera_button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/switch_camera"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toEndOf="@id/b_start_stop"
      android:layout_marginBottom="20dp"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `BackgroundActivity.kt`**

Create a file named `BackgroundActivity.kt`


Here is the full code

```kotlin
package com.pedro.rtpstreamer.backgroundexample

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.SurfaceHolder
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pedro.rtpstreamer.R
import com.pedro.rtpstreamer.databinding.ActivityBackgroundBinding

@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
class BackgroundActivity : AppCompatActivity(), SurfaceHolder.Callback {

  private lateinit var binding: ActivityBackgroundBinding

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    binding = ActivityBackgroundBinding.inflate(layoutInflater)
    setContentView(binding.root)
    RtpService.init(this)
    binding.bStartStop.setOnClickListener {
      if (isMyServiceRunning(RtpService::class.java)) {
        stopService(Intent(applicationContext, RtpService::class.java))
        binding.bStartStop.setText(R.string.start_button)
      } else {
        val intent = Intent(applicationContext, RtpService::class.java)
        intent.putExtra("endpoint", binding.etRtpUrl.text.toString())
        startService(intent)
        binding.bStartStop.setText(R.string.stop_button)
      }
    }
    binding.surfaceView.holder.addCallback(this)
  }

  override fun surfaceChanged(holder: SurfaceHolder, p1: Int, p2: Int, p3: Int) {
    RtpService.setView(binding.surfaceView)
    RtpService.startPreview()
  }

  override fun surfaceDestroyed(holder: SurfaceHolder) {
    RtpService.setView(applicationContext)
    RtpService.stopPreview()
  }

  override fun surfaceCreated(holder: SurfaceHolder) {

  }

  override fun onResume() {
    super.onResume()
    if (isMyServiceRunning(RtpService::class.java)) {
      binding.bStartStop.setText(R.string.stop_button)
    } else {
      binding.bStartStop.setText(R.string.start_button)
    }
  }

  @Suppress("DEPRECATION")
  private fun isMyServiceRunning(serviceClass: Class<*>): Boolean {
    val manager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    for (service in manager.getRunningServices(Integer.MAX_VALUE)) {
      if (serviceClass.name == service.service.className) {
        return true
      }
    }
    return false
  }
}
```

**(b). `ConnectCheckerRtp.kt`**

Create a file named `ConnectCheckerRtp.kt`


Here is the full code

```kotlin
package com.pedro.rtpstreamer.backgroundexample

import com.pedro.rtmp.utils.ConnectCheckerRtmp
import com.pedro.rtsp.utils.ConnectCheckerRtsp

/**
 * (Only working in kotlin)
 * Mix both connect interfaces to support RTMP and RTSP in service with same code.
 */
interface ConnectCheckerRtp: ConnectCheckerRtmp, ConnectCheckerRtsp {

  /**
   * Commons
   */
  fun onConnectionStartedRtp(rtpUrl: String)

  fun onConnectionSuccessRtp()

  fun onConnectionFailedRtp(reason: String)

  fun onNewBitrateRtp(bitrate: Long)

  fun onDisconnectRtp()

  fun onAuthErrorRtp()

  fun onAuthSuccessRtp()

  /**
   * RTMP
   */
  override fun onConnectionStartedRtmp(rtmpUrl: String) {
    onConnectionStartedRtp(rtmpUrl)
  }

  override fun onConnectionSuccessRtmp() {
    onConnectionSuccessRtp()
  }

  override fun onConnectionFailedRtmp(reason: String) {
    onConnectionFailedRtp(reason)
  }

  override fun onNewBitrateRtmp(bitrate: Long) {
    onNewBitrateRtp(bitrate)
  }

  override fun onDisconnectRtmp() {
    onDisconnectRtp()
  }

  override fun onAuthErrorRtmp() {
    onAuthErrorRtp()
  }

  override fun onAuthSuccessRtmp() {
    onAuthSuccessRtp()
  }

  /**
   * RTSP
   */
  override fun onConnectionStartedRtsp(rtspUrl: String) {
    onConnectionStartedRtp(rtspUrl)
  }

  override fun onConnectionSuccessRtsp() {
    onConnectionSuccessRtp()
  }

  override fun onConnectionFailedRtsp(reason: String) {
    onConnectionFailedRtp(reason)
  }

  override fun onNewBitrateRtsp(bitrate: Long) {
    onNewBitrateRtp(bitrate)
  }

  override fun onDisconnectRtsp() {
    onDisconnectRtp()
  }

  override fun onAuthErrorRtsp() {
    onAuthErrorRtp()
  }

  override fun onAuthSuccessRtsp() {
    onAuthSuccessRtp()
  }
}
```

**(c). `RtpService.kt`**

Create a file named `RtpService.kt`


Here is the full code

```kotlin
package com.pedro.rtpstreamer.backgroundexample

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.pedro.rtplibrary.base.Camera2Base
import com.pedro.rtplibrary.rtmp.RtmpCamera2
import com.pedro.rtplibrary.rtsp.RtspCamera2
import com.pedro.rtplibrary.view.OpenGlView
import com.pedro.rtpstreamer.R


/**
 * Basic RTMP/RTSP service streaming implementation with camera2
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
class RtpService : Service() {

  private var endpoint: String? = null

  override fun onCreate() {
    super.onCreate()
    Log.e(TAG, "RTP service create")
    notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channel = NotificationChannel(channelId, channelId, NotificationManager.IMPORTANCE_HIGH)
      notificationManager?.createNotificationChannel(channel)
    }
    keepAliveTrick()
  }

  private fun keepAliveTrick() {
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
      val notification = NotificationCompat.Builder(this, channelId)
          .setOngoing(true)
          .setContentTitle("")
          .setContentText("").build()
      startForeground(1, notification)
    } else {
      startForeground(1, Notification())
    }
  }

  override fun onBind(p0: Intent?): IBinder? {
    return null
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    Log.e(TAG, "RTP service started")
    endpoint = intent?.extras?.getString("endpoint")
    if (endpoint != null) {
      prepareStreamRtp()
      startStreamRtp(endpoint!!)
    }
    return START_STICKY
  }

  companion object {
    private const val TAG = "RtpService"
    private const val channelId = "rtpStreamChannel"
    private const val notifyId = 123456
    private var notificationManager: NotificationManager? = null
    private var camera2Base: Camera2Base? = null
    private var openGlView: OpenGlView? = null
    private var contextApp: Context? = null

    fun setView(openGlView: OpenGlView) {
      this.openGlView = openGlView
      camera2Base?.replaceView(openGlView)
    }

    fun setView(context: Context) {
      contextApp = context
      this.openGlView = null
      camera2Base?.replaceView(context)
    }

    fun startPreview() {
      camera2Base?.startPreview()
    }

    fun init(context: Context) {
      contextApp = context
      if (camera2Base == null) camera2Base = RtmpCamera2(context, true, connectCheckerRtp)
    }

    fun stopStream() {
      if (camera2Base != null) {
        if (camera2Base!!.isStreaming) camera2Base!!.stopStream()
      }
    }

    fun stopPreview() {
      if (camera2Base != null) {
        if (camera2Base!!.isOnPreview) camera2Base!!.stopPreview()
      }
    }


    private val connectCheckerRtp = object : ConnectCheckerRtp {
      override fun onConnectionStartedRtp(rtpUrl: String) {
        showNotification("Stream connection started")
      }

      override fun onConnectionSuccessRtp() {
        showNotification("Stream started")
        Log.e(TAG, "RTP service destroy")
      }

      override fun onNewBitrateRtp(bitrate: Long) {

      }

      override fun onConnectionFailedRtp(reason: String) {
        showNotification("Stream connection failed")
        Log.e(TAG, "RTP service destroy")
      }

      override fun onDisconnectRtp() {
        showNotification("Stream stopped")
      }

      override fun onAuthErrorRtp() {
        showNotification("Stream auth error")
      }

      override fun onAuthSuccessRtp() {
        showNotification("Stream auth success")
      }
    }

    private fun showNotification(text: String) {
      contextApp?.let {
        val notification = NotificationCompat.Builder(it, channelId)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle("RTP Stream")
            .setContentText(text).build()
        notificationManager?.notify(notifyId, notification)
      }
    }
  }

  override fun onDestroy() {
    super.onDestroy()
    Log.e(TAG, "RTP service destroy")
    stopStream()
  }

  private fun prepareStreamRtp() {
    stopStream()
    stopPreview()
    if (endpoint!!.startsWith("rtmp")) {
      camera2Base = if (openGlView == null) {
        RtmpCamera2(baseContext, true, connectCheckerRtp)
      } else {
        RtmpCamera2(openGlView, connectCheckerRtp)
      }
    } else {
      camera2Base = if (openGlView == null) {
        RtspCamera2(baseContext, true, connectCheckerRtp)
      } else {
        RtspCamera2(openGlView, connectCheckerRtp)
      }
    }
  }

  private fun startStreamRtp(endpoint: String) {
    if (!camera2Base!!.isStreaming) {
      if (camera2Base!!.prepareVideo() && camera2Base!!.prepareAudio()) {
        camera2Base!!.startStream(endpoint)
      }
    } else {
      showNotification("You are already streaming :(")
    }
  }
}
```

**(d). `RtmpActivity.java`**

Create a file named `RtmpActivity.java`


Here is the full code

```java
package com.pedro.rtpstreamer.customexample;

import android.hardware.Camera;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import com.google.android.material.navigation.NavigationView;
import com.pedro.encoder.input.video.CameraHelper;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera1}
 */
public class RtmpActivity extends AppCompatActivity
    implements Button.OnClickListener, ConnectCheckerRtmp, SurfaceHolder.Callback,
    View.OnTouchListener {

  private Integer[] orientations = new Integer[] { 0, 90, 180, 270 };

  private RtmpCamera1 rtmpCamera1;
  private Button bStartStop, bRecord;
  private EditText etUrl;
  private String currentDateAndTime = "";
  private File folder;
  //options menu
  private DrawerLayout drawerLayout;
  private NavigationView navigationView;
  private ActionBarDrawerToggle actionBarDrawerToggle;
  private RadioGroup rgChannel;
  private Spinner spResolution;
  private CheckBox cbEchoCanceler, cbNoiseSuppressor;
  private EditText etVideoBitrate, etFps, etAudioBitrate, etSampleRate, etWowzaUser,
      etWowzaPassword;
  private String lastVideoBitrate;
  private TextView tvBitrate;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_custom);
    folder = PathUtils.getRecordPath();
    getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    getSupportActionBar().setHomeButtonEnabled(true);

    SurfaceView surfaceView = findViewById(R.id.surfaceView);
    surfaceView.getHolder().addCallback(this);
    surfaceView.setOnTouchListener(this);
    rtmpCamera1 = new RtmpCamera1(surfaceView, this);
    prepareOptionsMenuViews();
    tvBitrate = findViewById(R.id.tv_bitrate);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    bStartStop = findViewById(R.id.b_start_stop);
    bStartStop.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
  }

  private void prepareOptionsMenuViews() {
    drawerLayout = findViewById(R.id.activity_custom);
    navigationView = findViewById(R.id.nv_rtp);

    navigationView.inflateMenu(R.menu.options_rtmp);
    actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.rtmp_streamer,
        R.string.rtmp_streamer) {

      public void onDrawerOpened(View drawerView) {
        actionBarDrawerToggle.syncState();
        lastVideoBitrate = etVideoBitrate.getText().toString();
      }

      public void onDrawerClosed(View view) {
        actionBarDrawerToggle.syncState();
        if (lastVideoBitrate != null && !lastVideoBitrate.equals(
            etVideoBitrate.getText().toString()) && rtmpCamera1.isStreaming()) {
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            int bitrate = Integer.parseInt(etVideoBitrate.getText().toString()) * 1024;
            rtmpCamera1.setVideoBitrateOnFly(bitrate);
            Toast.makeText(RtmpActivity.this, "New bitrate: " + bitrate, Toast.LENGTH_SHORT).
                show();
          } else {
            Toast.makeText(RtmpActivity.this, "Bitrate on fly ignored, Required min API 19",
                Toast.LENGTH_SHORT).show();
          }
        }
      }
    };
    drawerLayout.addDrawerListener(actionBarDrawerToggle);
    //checkboxs
    cbEchoCanceler =
        (CheckBox) navigationView.getMenu().findItem(R.id.cb_echo_canceler).getActionView();
    cbNoiseSuppressor =
        (CheckBox) navigationView.getMenu().findItem(R.id.cb_noise_suppressor).getActionView();
    //radiobuttons
    RadioButton rbTcp =
        (RadioButton) navigationView.getMenu().findItem(R.id.rb_tcp).getActionView();
    rgChannel = (RadioGroup) navigationView.getMenu().findItem(R.id.channel).getActionView();
    rbTcp.setChecked(true);
    //spinners
    spResolution = (Spinner) navigationView.getMenu().findItem(R.id.sp_resolution).getActionView();

    ArrayAdapter<Integer> orientationAdapter =
        new ArrayAdapter<>(this, R.layout.support_simple_spinner_dropdown_item);
    orientationAdapter.addAll(orientations);

    ArrayAdapter<String> resolutionAdapter =
        new ArrayAdapter<>(this, R.layout.support_simple_spinner_dropdown_item);
    List<String> list = new ArrayList<>();
    for (Camera.Size size : rtmpCamera1.getResolutionsBack()) {
      list.add(size.width + "X" + size.height);
    }
    resolutionAdapter.addAll(list);
    spResolution.setAdapter(resolutionAdapter);
    //edittexts
    etVideoBitrate =
        (EditText) navigationView.getMenu().findItem(R.id.et_video_bitrate).getActionView();
    etFps = (EditText) navigationView.getMenu().findItem(R.id.et_fps).getActionView();
    etAudioBitrate =
        (EditText) navigationView.getMenu().findItem(R.id.et_audio_bitrate).getActionView();
    etSampleRate = (EditText) navigationView.getMenu().findItem(R.id.et_samplerate).getActionView();
    etVideoBitrate.setText("2500");
    etFps.setText("30");
    etAudioBitrate.setText("128");
    etSampleRate.setText("44100");
    etWowzaUser = (EditText) navigationView.getMenu().findItem(R.id.et_user).getActionView();
    etWowzaPassword =
        (EditText) navigationView.getMenu().findItem(R.id.et_password).getActionView();
  }

  @Override
  protected void onPostCreate(@Nullable Bundle savedInstanceState) {
    super.onPostCreate(savedInstanceState);
    actionBarDrawerToggle.syncState();
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
      case android.R.id.home:
        if (!drawerLayout.isDrawerOpen(GravityCompat.START)) {
          drawerLayout.openDrawer(GravityCompat.START);
        } else {
          drawerLayout.closeDrawer(GravityCompat.START);
        }
        return true;
      case R.id.microphone:
        if (!rtmpCamera1.isAudioMuted()) {
          item.setIcon(getResources().getDrawable(R.drawable.icon_microphone_off));
          rtmpCamera1.disableAudio();
        } else {
          item.setIcon(getResources().getDrawable(R.drawable.icon_microphone));
          rtmpCamera1.enableAudio();
        }
        return true;
      default:
        return false;
    }
  }

  @Override
  public void onClick(View v) {
    switch (v.getId()) {
      case R.id.b_start_stop:
        Log.d("TAG_R", "b_start_stop: ");
        if (!rtmpCamera1.isStreaming()) {
          bStartStop.setText(getResources().getString(R.string.stop_button));
          String user = etWowzaUser.getText().toString();
          String password = etWowzaPassword.getText().toString();
          if (!user.isEmpty() && !password.isEmpty()) {
            rtmpCamera1.setAuthorization(user, password);
          }
          if (rtmpCamera1.isRecording() || prepareEncoders()) {
            rtmpCamera1.startStream(etUrl.getText().toString());
          } else {
            //If you see this all time when you start stream,
            //it is because your encoder device dont support the configuration
            //in video encoder maybe color format.
            //If you have more encoder go to VideoEncoder or AudioEncoder class,
            //change encoder and try
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
            bStartStop.setText(getResources().getString(R.string.start_button));
          }
        } else {
          bStartStop.setText(getResources().getString(R.string.start_button));
          rtmpCamera1.stopStream();
        }
        break;
      case R.id.b_record:
        Log.d("TAG_R", "b_start_stop: ");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          if (!rtmpCamera1.isRecording()) {
            try {
              if (!folder.exists()) {
                folder.mkdir();
              }
              SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
              currentDateAndTime = sdf.format(new Date());
              if (!rtmpCamera1.isStreaming()) {
                if (prepareEncoders()) {
                  rtmpCamera1.startRecord(
                      folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                  bRecord.setText(R.string.stop_record);
                  Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
                } else {
                  Toast.makeText(this, "Error preparing stream, This device cant do it",
                      Toast.LENGTH_SHORT).show();
                }
              } else {
                rtmpCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              }
            } catch (IOException e) {
              rtmpCamera1.stopRecord();
              PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.start_record);
              Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
          } else {
            rtmpCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this,
                "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
                Toast.LENGTH_SHORT).show();
            currentDateAndTime = "";
          }
        } else {
          Toast.makeText(this, "You need min JELLY_BEAN_MR2(API 18) for do it...",
              Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.switch_camera:
        try {
          rtmpCamera1.switchCamera();
        } catch (final CameraOpenException e) {
          Toast.makeText(RtmpActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      default:
        break;
    }
  }

  private boolean prepareEncoders() {
    Camera.Size resolution =
        rtmpCamera1.getResolutionsBack().get(spResolution.getSelectedItemPosition());
    int width = resolution.width;
    int height = resolution.height;
    return rtmpCamera1.prepareVideo(width, height, Integer.parseInt(etFps.getText().toString()),
        Integer.parseInt(etVideoBitrate.getText().toString()) * 1024,
        CameraHelper.getCameraOrientation(this)) && rtmpCamera1.prepareAudio(
        Integer.parseInt(etAudioBitrate.getText().toString()) * 1024,
        Integer.parseInt(etSampleRate.getText().toString()),
        rgChannel.getCheckedRadioButtonId() == R.id.rb_stereo, cbEchoCanceler.isChecked(),
        cbNoiseSuppressor.isChecked());
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
            .show();
        rtmpCamera1.stopStream();
        bStartStop.setText(getResources().getString(R.string.start_button));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2
            && rtmpCamera1.isRecording()) {
          rtmpCamera1.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtmpActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(final long bitrate) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        tvBitrate.setText(bitrate + " bps");
      }
    });
  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2
            && rtmpCamera1.isRecording()) {
          rtmpCamera1.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtmpActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {
    drawerLayout.openDrawer(GravityCompat.START);
  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtmpCamera1.startPreview();
    // optionally:
    //rtmpCamera1.startPreview(CameraHelper.Facing.BACK);
    //or
    //rtmpCamera1.startPreview(CameraHelper.Facing.FRONT);
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2 && rtmpCamera1.isRecording()) {
      rtmpCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtmpCamera1.isStreaming()) {
      rtmpCamera1.stopStream();
      bStartStop.setText(getResources().getString(R.string.start_button));
    }
    rtmpCamera1.stopPreview();
  }

  @Override
  public boolean onTouch(View view, MotionEvent motionEvent) {
    int action = motionEvent.getAction();
    if (motionEvent.getPointerCount() > 1) {
      if (action == MotionEvent.ACTION_MOVE) {
        rtmpCamera1.setZoom(motionEvent);
      }
    } else if (action == MotionEvent.ACTION_DOWN) {
      rtmpCamera1.tapToFocus(view, motionEvent);
    }
    return true;
  }
}
```

**(e). `RtspActivity.java`**

Create a file named `RtspActivity.java`


Here is the full code

```java
package com.pedro.rtpstreamer.customexample;

import android.hardware.Camera;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.navigation.NavigationView;
import com.pedro.encoder.input.video.CameraHelper;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtplibrary.rtsp.RtspCamera1;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.rtsp.Protocol;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtsp.RtspCamera1}
 */
public class RtspActivity extends AppCompatActivity
    implements Button.OnClickListener, ConnectCheckerRtsp, SurfaceHolder.Callback,
    View.OnTouchListener {

  private Integer[] orientations = new Integer[] { 0, 90, 180, 270 };

  private RtspCamera1 rtspCamera1;
  private SurfaceView surfaceView;
  private Button bStartStop, bRecord;
  private EditText etUrl;
  private String currentDateAndTime = "";
  private File folder;
  //options menu
  private DrawerLayout drawerLayout;
  private NavigationView navigationView;
  private ActionBarDrawerToggle actionBarDrawerToggle;
  private RadioGroup rgChannel;
  private RadioButton rbTcp, rbUdp;
  private Spinner spResolution;
  private CheckBox cbEchoCanceler, cbNoiseSuppressor;
  private EditText etVideoBitrate, etFps, etAudioBitrate, etSampleRate, etWowzaUser,
      etWowzaPassword;
  private String lastVideoBitrate;
  private TextView tvBitrate;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_custom);
    folder = PathUtils.getRecordPath();
    getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    getSupportActionBar().setHomeButtonEnabled(true);

    surfaceView = findViewById(R.id.surfaceView);
    surfaceView.getHolder().addCallback(this);
    surfaceView.setOnTouchListener(this);
    rtspCamera1 = new RtspCamera1(surfaceView, this);
    prepareOptionsMenuViews();

    tvBitrate = findViewById(R.id.tv_bitrate);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    bStartStop = findViewById(R.id.b_start_stop);
    bStartStop.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
  }

  private void prepareOptionsMenuViews() {
    drawerLayout = findViewById(R.id.activity_custom);
    navigationView = findViewById(R.id.nv_rtp);
    navigationView.inflateMenu(R.menu.options_rtsp);
    actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.rtsp_streamer,
        R.string.rtsp_streamer) {

      public void onDrawerOpened(View drawerView) {
        actionBarDrawerToggle.syncState();
        lastVideoBitrate = etVideoBitrate.getText().toString();
      }

      public void onDrawerClosed(View view) {
        actionBarDrawerToggle.syncState();
        if (lastVideoBitrate != null && !lastVideoBitrate.equals(
            etVideoBitrate.getText().toString()) && rtspCamera1.isStreaming()) {
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            int bitrate = Integer.parseInt(etVideoBitrate.getText().toString()) * 1024;
            rtspCamera1.setVideoBitrateOnFly(bitrate);
            Toast.makeText(RtspActivity.this, "New bitrate: " + bitrate, Toast.LENGTH_SHORT).
                show();
          } else {
            Toast.makeText(RtspActivity.this, "Bitrate on fly ignored, Required min API 19",
                Toast.LENGTH_SHORT).show();
          }
        }
      }
    };
    drawerLayout.addDrawerListener(actionBarDrawerToggle);
    //checkboxs
    cbEchoCanceler =
        (CheckBox) navigationView.getMenu().findItem(R.id.cb_echo_canceler).getActionView();
    cbNoiseSuppressor =
        (CheckBox) navigationView.getMenu().findItem(R.id.cb_noise_suppressor).getActionView();
    //radiobuttons
    rbTcp = (RadioButton) navigationView.getMenu().findItem(R.id.rb_tcp).getActionView();
    rbUdp = (RadioButton) navigationView.getMenu().findItem(R.id.rb_udp).getActionView();
    rgChannel = (RadioGroup) navigationView.getMenu().findItem(R.id.channel).getActionView();
    rbTcp.setChecked(true);
    rbTcp.setOnClickListener(this);
    rbUdp.setOnClickListener(this);
    //spinners
    spResolution = (Spinner) navigationView.getMenu().findItem(R.id.sp_resolution).getActionView();

    ArrayAdapter<Integer> orientationAdapter =
        new ArrayAdapter<>(this, R.layout.support_simple_spinner_dropdown_item);
    orientationAdapter.addAll(orientations);

    ArrayAdapter<String> resolutionAdapter =
        new ArrayAdapter<>(this, R.layout.support_simple_spinner_dropdown_item);
    List<String> list = new ArrayList<>();
    for (Camera.Size size : rtspCamera1.getResolutionsBack()) {
      list.add(size.width + "X" + size.height);
    }
    resolutionAdapter.addAll(list);
    spResolution.setAdapter(resolutionAdapter);
    //edittexts
    etVideoBitrate =
        (EditText) navigationView.getMenu().findItem(R.id.et_video_bitrate).getActionView();
    etFps = (EditText) navigationView.getMenu().findItem(R.id.et_fps).getActionView();
    etAudioBitrate =
        (EditText) navigationView.getMenu().findItem(R.id.et_audio_bitrate).getActionView();
    etSampleRate = (EditText) navigationView.getMenu().findItem(R.id.et_samplerate).getActionView();
    etVideoBitrate.setText("2500");
    etFps.setText("30");
    etAudioBitrate.setText("128");
    etSampleRate.setText("44100");
    etWowzaUser = (EditText) navigationView.getMenu().findItem(R.id.et_user).getActionView();
    etWowzaPassword =
        (EditText) navigationView.getMenu().findItem(R.id.et_password).getActionView();
  }

  @Override
  protected void onPostCreate(@Nullable Bundle savedInstanceState) {
    super.onPostCreate(savedInstanceState);
    actionBarDrawerToggle.syncState();
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
      case android.R.id.home:
        if (!drawerLayout.isDrawerOpen(GravityCompat.START)) {
          drawerLayout.openDrawer(GravityCompat.START);
        } else {
          drawerLayout.closeDrawer(GravityCompat.START);
        }
        return true;
      case R.id.microphone:
        if (!rtspCamera1.isAudioMuted()) {
          item.setIcon(getResources().getDrawable(R.drawable.icon_microphone_off));
          rtspCamera1.disableAudio();
        } else {
          item.setIcon(getResources().getDrawable(R.drawable.icon_microphone));
          rtspCamera1.enableAudio();
        }
        return true;
      default:
        return false;
    }
  }

  @Override
  public void onClick(View v) {
    switch (v.getId()) {
      case R.id.b_start_stop:
        if (!rtspCamera1.isStreaming()) {
          bStartStop.setText(getResources().getString(R.string.stop_button));
          if (rbTcp.isChecked()) {
            rtspCamera1.setProtocol(Protocol.TCP);
          } else {
            rtspCamera1.setProtocol(Protocol.UDP);
          }
          String user = etWowzaUser.getText().toString();
          String password = etWowzaPassword.getText().toString();
          if (!user.isEmpty() && !password.isEmpty()) {
            rtspCamera1.setAuthorization(user, password);
          }
          if (rtspCamera1.isRecording() || prepareEncoders()) {
            rtspCamera1.startStream(etUrl.getText().toString());
          } else {
            //If you see this all time when you start stream,
            //it is because your encoder device dont support the configuration
            //in video encoder maybe color format.
            //If you have more encoder go to VideoEncoder or AudioEncoder class,
            //change encoder and try
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
            bStartStop.setText(getResources().getString(R.string.start_button));
          }
        } else {
          bStartStop.setText(getResources().getString(R.string.start_button));
          rtspCamera1.stopStream();
        }
        break;
      case R.id.b_record:
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          if (!rtspCamera1.isRecording()) {
            try {
              if (!folder.exists()) {
                folder.mkdir();
              }
              SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
              currentDateAndTime = sdf.format(new Date());
              if (!rtspCamera1.isStreaming()) {
                if (prepareEncoders()) {
                  rtspCamera1.startRecord(
                      folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                  bRecord.setText(R.string.stop_record);
                  Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
                } else {
                  Toast.makeText(this, "Error preparing stream, This device cant do it",
                      Toast.LENGTH_SHORT).show();
                }
              } else {
                rtspCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              }
            } catch (IOException e) {
              rtspCamera1.stopRecord();
              PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.start_record);
              Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
          } else {
            rtspCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this,
                "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
                Toast.LENGTH_SHORT).show();
          }
        } else {
          Toast.makeText(this, "You need min JELLY_BEAN_MR2(API 18) for do it...",
              Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.switch_camera:
        try {
          rtspCamera1.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      //options menu
      case R.id.rb_tcp:
        if (rbUdp.isChecked()) {
          rbUdp.setChecked(false);
          rbTcp.setChecked(true);
        }
        break;
      case R.id.rb_udp:
        if (rbTcp.isChecked()) {
          rbTcp.setChecked(false);
          rbUdp.setChecked(true);
        }
        break;
      default:
        break;
    }
  }

  private boolean prepareEncoders() {
    Camera.Size resolution =
        rtspCamera1.getResolutionsBack().get(spResolution.getSelectedItemPosition());
    int width = resolution.width;
    int height = resolution.height;
    return rtspCamera1.prepareVideo(width, height, Integer.parseInt(etFps.getText().toString()),
        Integer.parseInt(etVideoBitrate.getText().toString()) * 1024,
        CameraHelper.getCameraOrientation(this)) && rtspCamera1.prepareAudio(
        Integer.parseInt(etAudioBitrate.getText().toString()) * 1024,
        Integer.parseInt(etSampleRate.getText().toString()),
        rgChannel.getCheckedRadioButtonId() == R.id.rb_stereo, cbEchoCanceler.isChecked(),
        cbNoiseSuppressor.isChecked());
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
            .show();
        rtspCamera1.stopStream();
        bStartStop.setText(getResources().getString(R.string.start_button));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2
            && rtspCamera1.isRecording()) {
          rtspCamera1.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtspActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(final long bitrate) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        tvBitrate.setText(bitrate + " bps");
      }
    });
  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2
            && rtspCamera1.isRecording()) {
          rtspCamera1.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtspActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        bStartStop.setText(getResources().getString(R.string.start_button));
        rtspCamera1.stopStream();
        Toast.makeText(RtspActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2
            && rtspCamera1.isRecording()) {
          rtspCamera1.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtspActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {
    drawerLayout.openDrawer(GravityCompat.START);
  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtspCamera1.startPreview();
    // optionally:
    //rtspCamera1.startPreview(CameraHelper.Facing.BACK);
    //or
    //rtspCamera1.startPreview(CameraHelper.Facing.FRONT);
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2 && rtspCamera1.isRecording()) {
      rtspCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtspCamera1.isStreaming()) {
      rtspCamera1.stopStream();
      bStartStop.setText(getResources().getString(R.string.start_button));
    }
    rtspCamera1.stopPreview();
  }

  @Override
  public boolean onTouch(View view, MotionEvent motionEvent) {
    int action = motionEvent.getAction();
    if (motionEvent.getPointerCount() > 1) {
      if (action == MotionEvent.ACTION_MOVE) {
        rtspCamera1.setZoom(motionEvent);
      }
    } else if (action == MotionEvent.ACTION_DOWN) {
      rtspCamera1.tapToFocus(view, motionEvent);
    }
    return true;
  }
}
```

**(f). `ExampleRtmpActivity.java`**

Create a file named `ExampleRtmpActivity.java`


Here is the full code

```java
package com.pedro.rtpstreamer.defaultexample;

import android.os.Build;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera1}
 */
public class ExampleRtmpActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener, SurfaceHolder.Callback {

  private RtmpCamera1 rtmpCamera1;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_example);
    folder = PathUtils.getRecordPath();
    SurfaceView surfaceView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    rtmpCamera1 = new RtmpCamera1(surfaceView, this);
    rtmpCamera1.setReTries(10);
    surfaceView.getHolder().addCallback(this);
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtmpActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (rtmpCamera1.reTry(5000, reason, null)) {
          Toast.makeText(ExampleRtmpActivity.this, "Retry", Toast.LENGTH_SHORT)
              .show();
        } else {
          Toast.makeText(ExampleRtmpActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
              .show();
          rtmpCamera1.stopStream();
          button.setText(R.string.start_button);
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(final long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtmpActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtmpActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
        rtmpCamera1.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtmpActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtmpCamera1.isStreaming()) {
          if (rtmpCamera1.isRecording()
              || rtmpCamera1.prepareAudio() && rtmpCamera1.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtmpCamera1.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtmpCamera1.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtmpCamera1.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          if (!rtmpCamera1.isRecording()) {
            try {
              if (!folder.exists()) {
                folder.mkdir();
              }
              SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
              currentDateAndTime = sdf.format(new Date());
              if (!rtmpCamera1.isStreaming()) {
                if (rtmpCamera1.prepareAudio() && rtmpCamera1.prepareVideo()) {
                  rtmpCamera1.startRecord(
                      folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                  bRecord.setText(R.string.stop_record);
                  Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
                } else {
                  Toast.makeText(this, "Error preparing stream, This device cant do it",
                      Toast.LENGTH_SHORT).show();
                }
              } else {
                rtmpCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              }
            } catch (IOException e) {
              rtmpCamera1.stopRecord();
              PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.start_record);
              Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
          } else {
            rtmpCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this,
                "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
                Toast.LENGTH_SHORT).show();
          }
        } else {
          Toast.makeText(this, "You need min JELLY_BEAN_MR2(API 18) for do it...",
              Toast.LENGTH_SHORT).show();
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtmpCamera1.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2 && rtmpCamera1.isRecording()) {
      rtmpCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtmpCamera1.isStreaming()) {
      rtmpCamera1.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtmpCamera1.stopPreview();
  }
}
```

**(g). `ExampleRtspActivity.java`**

Create a file named `ExampleRtspActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.defaultexample;

import android.os.Build;
import android.os.Bundle;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtplibrary.rtsp.RtspCamera1;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtsp.RtspCamera1}
 */
public class ExampleRtspActivity extends AppCompatActivity
    implements ConnectCheckerRtsp, View.OnClickListener, SurfaceHolder.Callback {

  private RtspCamera1 rtspCamera1;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_example);
    folder = PathUtils.getRecordPath();
    SurfaceView surfaceView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    rtspCamera1 = new RtspCamera1(surfaceView, this);
    rtspCamera1.setReTries(10);
    surfaceView.getHolder().addCallback(this);
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtspActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (rtspCamera1.reTry(5000, reason, null)) {
          Toast.makeText(ExampleRtspActivity.this, "Retry", Toast.LENGTH_SHORT)
              .show();
        } else {
          Toast.makeText(ExampleRtspActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
              .show();
          rtspCamera1.stopStream();
          button.setText(R.string.start_button);
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(final long bitrate) {

  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtspActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtspActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
        rtspCamera1.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(ExampleRtspActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtspCamera1.isStreaming()) {
          if (rtspCamera1.isRecording()
              || rtspCamera1.prepareAudio() && rtspCamera1.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtspCamera1.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtspCamera1.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtspCamera1.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
          if (!rtspCamera1.isRecording()) {
            try {
              if (!folder.exists()) {
                folder.mkdir();
              }
              SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
              currentDateAndTime = sdf.format(new Date());
              if (!rtspCamera1.isStreaming()) {
                if (rtspCamera1.prepareAudio() && rtspCamera1.prepareVideo()) {
                  rtspCamera1.startRecord(
                      folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                  bRecord.setText(R.string.stop_record);
                  Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
                } else {
                  Toast.makeText(this, "Error preparing stream, This device cant do it",
                      Toast.LENGTH_SHORT).show();
                }
              } else {
                rtspCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              }
            } catch (IOException e) {
              rtspCamera1.stopRecord();
              PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.start_record);
              Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
            }
          } else {
            rtspCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this,
                "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
                Toast.LENGTH_SHORT).show();
          }
        } else {
          Toast.makeText(this, "You need min JELLY_BEAN_MR2(API 18) for do it...",
              Toast.LENGTH_SHORT).show();
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtspCamera1.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2 && rtspCamera1.isRecording()) {
      rtspCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtspCamera1.isStreaming()) {
      rtspCamera1.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtspCamera1.stopPreview();
  }
}
```

**(h). `DisplayActivity.java`**

Create a file named `DisplayActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.displayexample;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtpstreamer.R;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.DisplayBase}
 * {@link com.pedro.rtplibrary.rtmp.RtmpDisplay}
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class DisplayActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener {

  private Button button;
  private EditText etUrl;
  private final int REQUEST_CODE_STREAM = 179; //random num
  private final int REQUEST_CODE_RECORD = 180; //random num

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_display);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    DisplayService displayService = DisplayService.Companion.getINSTANCE();
    //No streaming/recording start service
    if (displayService == null) {
      startService(new Intent(this, DisplayService.class));
    }
    if (displayService != null && displayService.isStreaming()) {
      button.setText(R.string.stop_button);
    } else {
      button.setText(R.string.start_button);
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    DisplayService displayService = DisplayService.Companion.getINSTANCE();
    if (displayService != null && !displayService.isStreaming() && !displayService.isRecording()) {
      //stop service only if no streaming or recording
      stopService(new Intent(this, DisplayService.class));
    }
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(DisplayActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(DisplayActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
            .show();
        DisplayService displayService = DisplayService.Companion.getINSTANCE();
        if (displayService != null) {
          displayService.stopStream();
        }
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(DisplayActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(DisplayActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(DisplayActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (data != null && (requestCode == REQUEST_CODE_STREAM
        || requestCode == REQUEST_CODE_RECORD && resultCode == Activity.RESULT_OK)) {
      DisplayService displayService = DisplayService.Companion.getINSTANCE();
      if (displayService != null) {
        String endpoint =  etUrl.getText().toString();
        displayService.prepareStreamRtp(endpoint, resultCode, data);
        displayService.startStreamRtp(endpoint);
      }
    } else {
      Toast.makeText(this, "No permissions available", Toast.LENGTH_SHORT).show();
      button.setText(R.string.start_button);
    }
  }

  @Override
  public void onClick(View view) {
    DisplayService displayService = DisplayService.Companion.getINSTANCE();
    if (displayService != null) {
      switch (view.getId()) {
        case R.id.b_start_stop:
          if (!displayService.isStreaming()) {
            button.setText(R.string.stop_button);
            startActivityForResult(displayService.sendIntent(), REQUEST_CODE_STREAM);
          } else {
            button.setText(R.string.start_button);
            displayService.stopStream();
          }
          break;
        default:
          break;
      }
    }
  }
}
```

**(i). `DisplayService.kt`**

Create a file named `DisplayService.kt`


Here is the full code

```kotlin


package com.pedro.rtpstreamer.displayexample

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.pedro.rtplibrary.base.DisplayBase
import com.pedro.rtplibrary.rtmp.RtmpDisplay
import com.pedro.rtplibrary.rtsp.RtspDisplay
import com.pedro.rtpstreamer.R
import com.pedro.rtpstreamer.backgroundexample.ConnectCheckerRtp


/**
 * Basic RTMP/RTSP service streaming implementation with camera2
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
class DisplayService : Service() {

  override fun onCreate() {
    super.onCreate()
    INSTANCE = this
    Log.i(TAG, "RTP Display service create")
    notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channel = NotificationChannel(channelId, channelId, NotificationManager.IMPORTANCE_HIGH)
      notificationManager?.createNotificationChannel(channel)
    }
    keepAliveTrick()
  }

  private fun keepAliveTrick() {
    val notification = NotificationCompat.Builder(this, channelId)
      .setSmallIcon(R.drawable.notification_icon)
      .setSilent(true)
      .setOngoing(false)
      .build()
    startForeground(1, notification)
  }

  override fun onBind(p0: Intent?): IBinder? {
    return null
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    INSTANCE = this
    Log.i(TAG, "RTP Display service started")
    displayBase = RtmpDisplay(baseContext, true, connectCheckerRtp)
    displayBase?.glInterface?.setForceRender(true)
    return START_STICKY
  }

  companion object {
    private const val TAG = "DisplayService"
    private const val channelId = "rtpDisplayStreamChannel"
    const val notifyId = 123456
    var INSTANCE: DisplayService? = null
  }

  private var notificationManager: NotificationManager? = null
  private var displayBase: DisplayBase? = null

  fun sendIntent(): Intent? {
    return displayBase?.sendIntent()
  }

  fun isStreaming(): Boolean {
    return displayBase?.isStreaming ?: false
  }

  fun isRecording(): Boolean {
    return displayBase?.isRecording ?: false
  }

  fun stopStream() {
    if (displayBase?.isStreaming == true) {
      displayBase?.stopStream()
      notificationManager?.cancel(notifyId)
    }
  }

  private val connectCheckerRtp = object : ConnectCheckerRtp {

    override fun onConnectionStartedRtp(rtpUrl: String) {
    }

    override fun onConnectionSuccessRtp() {
      showNotification("Stream started")
      Log.i(TAG, "RTP service destroy")
    }

    override fun onNewBitrateRtp(bitrate: Long) {

    }

    override fun onConnectionFailedRtp(reason: String) {
      showNotification("Stream connection failed")
      Log.i(TAG, "RTP service destroy")
    }

    override fun onDisconnectRtp() {
      showNotification("Stream stopped")
    }

    override fun onAuthErrorRtp() {
      showNotification("Stream auth error")
    }

    override fun onAuthSuccessRtp() {
      showNotification("Stream auth success")
    }
  }

  private fun showNotification(text: String) {
    val notification = NotificationCompat.Builder(baseContext, channelId)
      .setSmallIcon(R.drawable.notification_icon)
      .setContentTitle("RTP Display Stream")
      .setContentText(text)
      .setOngoing(false)
      .build()
    notificationManager?.notify(notifyId, notification)
  }

  override fun onDestroy() {
    super.onDestroy()
    Log.i(TAG, "RTP Display service destroy")
    stopStream()
    INSTANCE = null
  }

  fun prepareStreamRtp(endpoint: String, resultCode: Int, data: Intent) {
    stopStream()
    if (endpoint.startsWith("rtmp")) {
      displayBase = RtmpDisplay(baseContext, true, connectCheckerRtp)
      displayBase?.setIntentResult(resultCode, data)
    } else {
      displayBase = RtspDisplay(baseContext, true, connectCheckerRtp)
      displayBase?.setIntentResult(resultCode, data)
    }
    displayBase?.glInterface?.setForceRender(true)
  }

  fun startStreamRtp(endpoint: String) {
    if (displayBase?.isStreaming != true) {
      if (displayBase?.prepareVideo() == true && displayBase?.prepareAudio() == true) {
        displayBase?.startStream(endpoint)
      }
    } else {
      showNotification("You are already streaming :(")
    }
  }
}
```

**(j). `RtmpFromFileActivity.java`**

Create a file named `RtmpFromFileActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.filestreamexample;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import com.pedro.encoder.input.decoder.AudioDecoderInterface;
import com.pedro.encoder.input.decoder.VideoDecoderInterface;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtplibrary.rtmp.RtmpFromFile;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.FromFileBase}
 * {@link com.pedro.rtplibrary.rtmp.RtmpFromFile}
 */
@RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
public class RtmpFromFileActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener, VideoDecoderInterface,
    AudioDecoderInterface, SeekBar.OnSeekBarChangeListener {

  private RtmpFromFile rtmpFromFile;
  private Button button, bSelectFile, bReSync, bRecord;
  private SeekBar seekBar;
  private EditText etUrl;
  private TextView tvFile;
  private String filePath = "";
  private boolean touching = false;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_from_file);
    folder = PathUtils.getRecordPath();
    button = findViewById(R.id.b_start_stop);
    bSelectFile = findViewById(R.id.b_select_file);
    button.setOnClickListener(this);
    bSelectFile.setOnClickListener(this);
    bReSync = findViewById(R.id.b_re_sync);
    bReSync.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    seekBar = findViewById(R.id.seek_bar);
    seekBar.getProgressDrawable().setColorFilter(Color.RED, PorterDuff.Mode.SRC_IN);
    tvFile = findViewById(R.id.tv_file);
    rtmpFromFile = new RtmpFromFile(this, this, this);
    seekBar.setOnSeekBarChangeListener(this);
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (rtmpFromFile.isRecording()) {
      rtmpFromFile.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
    }
    if (rtmpFromFile.isStreaming()) {
      rtmpFromFile.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpFromFileActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpFromFileActivity.this, "Connection failed. " + reason,
            Toast.LENGTH_SHORT).show();
        rtmpFromFile.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpFromFileActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpFromFileActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtmpFromFileActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == 5 && data != null) {
      filePath = PathUtils.getPath(this, data.getData());
      Toast.makeText(this, filePath, Toast.LENGTH_SHORT).show();
      tvFile.setText(filePath);
    }
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtmpFromFile.isStreaming()) {
          try {
            if (!rtmpFromFile.isRecording()) {
              if (prepare()) {
                button.setText(R.string.stop_button);
                rtmpFromFile.startStream(etUrl.getText().toString());
                seekBar.setMax(Math.max((int) rtmpFromFile.getVideoDuration(),
                    (int) rtmpFromFile.getAudioDuration()));
                updateProgress();
              } else {
                button.setText(R.string.start_button);
                rtmpFromFile.stopStream();
                /*This error could be 2 things.
                 Your device cant decode or encode this file or
                 the file is not supported for the library.
                The file need has h264 video codec and acc audio codec*/
                Toast.makeText(this, "Error: unsupported file", Toast.LENGTH_SHORT).show();
              }
            } else {
              button.setText(R.string.stop_button);
              rtmpFromFile.startStream(etUrl.getText().toString());
            }
          } catch (IOException e) {
            //Normally this error is for file not found or read permissions
            Toast.makeText(this, "Error: file not found", Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtmpFromFile.stopStream();
        }
        break;
      case R.id.b_select_file:
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        startActivityForResult(intent, 5);
        break;
      //sometimes async is produced when you move in file several times
      case R.id.b_re_sync:
        rtmpFromFile.reSyncFile();
        break;
      case R.id.b_record:
        if (!rtmpFromFile.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtmpFromFile.isStreaming()) {
              if (prepare()) {
                rtmpFromFile.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                seekBar.setMax(Math.max((int) rtmpFromFile.getVideoDuration(),
                    (int) rtmpFromFile.getAudioDuration()));
                updateProgress();
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtmpFromFile.startRecord(
                  folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtmpFromFile.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtmpFromFile.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  private boolean prepare() throws IOException {
    boolean result = rtmpFromFile.prepareVideo(filePath);
    result |= rtmpFromFile.prepareAudio(filePath);
    return result;
  }

  private void updateProgress() {
    new Thread(new Runnable() {
      @Override
      public void run() {
        while (rtmpFromFile.isStreaming() || rtmpFromFile.isRecording()) {
          try {
            Thread.sleep(1000);
            if (!touching) {
              runOnUiThread(new Runnable() {
                @Override
                public void run() {
                  seekBar.setProgress(Math.max((int) rtmpFromFile.getVideoTime(),
                      (int) rtmpFromFile.getAudioTime()));
                }
              });
            }
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      }
    }).start();
  }

  @Override
  public void onVideoDecoderFinished() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (rtmpFromFile.isRecording()) {
          rtmpFromFile.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtmpFromFileActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        if (rtmpFromFile.isStreaming()) {
          button.setText(R.string.start_button);
          Toast.makeText(RtmpFromFileActivity.this, "Video stream finished", Toast.LENGTH_SHORT)
              .show();
          rtmpFromFile.stopStream();
        }
      }
    });
  }

  @Override
  public void onAudioDecoderFinished() {

  }

  @Override
  public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

  }

  @Override
  public void onStartTrackingTouch(SeekBar seekBar) {
    touching = true;
  }

  @Override
  public void onStopTrackingTouch(SeekBar seekBar) {
    if (rtmpFromFile.isStreaming()) rtmpFromFile.moveTo(seekBar.getProgress());
    touching = false;
  }
}

```

**(k). `RtspFromFileActivity.java`**

Create a file named `RtspFromFileActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.filestreamexample;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.PorterDuff;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import com.pedro.encoder.input.decoder.AudioDecoderInterface;
import com.pedro.encoder.input.decoder.VideoDecoderInterface;
import com.pedro.rtplibrary.rtsp.RtspFromFile;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.FromFileBase}
 * {@link com.pedro.rtplibrary.rtsp.RtspFromFile}
 */
@RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
public class RtspFromFileActivity extends AppCompatActivity
    implements ConnectCheckerRtsp, View.OnClickListener, VideoDecoderInterface,
    AudioDecoderInterface, SeekBar.OnSeekBarChangeListener {

  private RtspFromFile rtspFromFile;
  private Button button, bSelectFile, bReSync, bRecord;
  private SeekBar seekBar;
  private EditText etUrl;
  private TextView tvFile;
  private String filePath = "";
  private boolean touching = false;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_from_file);
    folder = PathUtils.getRecordPath();
    button = findViewById(R.id.b_start_stop);
    bSelectFile = findViewById(R.id.b_select_file);
    button.setOnClickListener(this);
    bSelectFile.setOnClickListener(this);
    bReSync = findViewById(R.id.b_re_sync);
    bReSync.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    seekBar = findViewById(R.id.seek_bar);
    seekBar.getProgressDrawable().setColorFilter(Color.RED, PorterDuff.Mode.SRC_IN);
    seekBar.setOnSeekBarChangeListener(this);
    tvFile = findViewById(R.id.tv_file);
    rtspFromFile = new RtspFromFile(this, this, this);
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (rtspFromFile.isRecording()) {
      rtspFromFile.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
    }
    if (rtspFromFile.isStreaming()) {
      rtspFromFile.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspFromFileActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspFromFileActivity.this, "Connection failed. " + reason,
            Toast.LENGTH_SHORT).show();
        rtspFromFile.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(long bitrate) {

  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspFromFileActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspFromFileActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(RtspFromFileActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == 5 && data != null) {
      filePath = PathUtils.getPath(this, data.getData());
      Toast.makeText(this, filePath, Toast.LENGTH_SHORT).show();
      tvFile.setText(filePath);
    }
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtspFromFile.isStreaming()) {
          try {
            if (!rtspFromFile.isRecording()) {
              if (prepare()) {
                button.setText(R.string.stop_button);
                rtspFromFile.startStream(etUrl.getText().toString());
                seekBar.setMax(Math.max((int) rtspFromFile.getVideoDuration(),
                    (int) rtspFromFile.getAudioDuration()));
                updateProgress();
              } else {
                button.setText(R.string.start_button);
                rtspFromFile.stopStream();
                /*This error could be 2 things.
                 Your device cant decode or encode this file or
                 the file is not supported for the library.
                The file need has h264 video codec and acc audio codec*/
                Toast.makeText(this, "Error: unsupported file", Toast.LENGTH_SHORT).show();
              }
            } else {
              button.setText(R.string.stop_button);
              rtspFromFile.startStream(etUrl.getText().toString());
            }
          } catch (IOException e) {
            //Normally this error is for file not found or read permissions
            Toast.makeText(this, "Error: file not found", Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtspFromFile.stopStream();
        }
        break;
      case R.id.b_select_file:
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        startActivityForResult(intent, 5);
        break;
      //sometimes async is produced when you move in file several times
      case R.id.b_re_sync:
        rtspFromFile.reSyncFile();
        break;
      case R.id.b_record:
        if (!rtspFromFile.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtspFromFile.isStreaming()) {
              if (prepare()) {
                rtspFromFile.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                seekBar.setMax(Math.max((int) rtspFromFile.getVideoDuration(),
                    (int) rtspFromFile.getAudioDuration()));
                updateProgress();
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtspFromFile.startRecord(
                  folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtspFromFile.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtspFromFile.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  private boolean prepare() throws IOException {
    boolean result = rtspFromFile.prepareVideo(filePath);
    result |= rtspFromFile.prepareAudio(filePath);
    return result;
  }

  private void updateProgress() {
    new Thread(new Runnable() {
      @Override
      public void run() {
        while (rtspFromFile.isStreaming() || rtspFromFile.isRecording()) {
          try {
            Thread.sleep(1000);
            if (!touching) {
              runOnUiThread(new Runnable() {
                @Override
                public void run() {
                  seekBar.setProgress(Math.max((int) rtspFromFile.getVideoTime(),
                      (int) rtspFromFile.getAudioTime()));
                }
              });
            }
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      }
    }).start();
  }

  @Override
  public void onVideoDecoderFinished() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (rtspFromFile.isRecording()) {
          rtspFromFile.stopRecord();
          PathUtils.updateGallery(getApplicationContext(), folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(RtspFromFileActivity.this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        if (rtspFromFile.isStreaming()) {
          button.setText(R.string.start_button);
          Toast.makeText(RtspFromFileActivity.this, "Video stream finished", Toast.LENGTH_SHORT)
              .show();
          rtspFromFile.stopStream();
        }
      }
    });
  }

  @Override
  public void onAudioDecoderFinished() {

  }

  @Override
  public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

  }

  @Override
  public void onStartTrackingTouch(SeekBar seekBar) {
    touching = true;
  }

  @Override
  public void onStopTrackingTouch(SeekBar seekBar) {
    if (rtspFromFile.isStreaming()) rtspFromFile.moveTo(seekBar.getProgress());
    touching = false;
  }
}
```

**(m). `MainActivity.java`**

Create a file named `MainActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import com.pedro.rtpstreamer.backgroundexample.BackgroundActivity;
import com.pedro.rtpstreamer.customexample.RtmpActivity;
import com.pedro.rtpstreamer.customexample.RtspActivity;
import com.pedro.rtpstreamer.defaultexample.ExampleRtmpActivity;
import com.pedro.rtpstreamer.defaultexample.ExampleRtspActivity;
import com.pedro.rtpstreamer.displayexample.DisplayActivity;
import com.pedro.rtpstreamer.filestreamexample.RtmpFromFileActivity;
import com.pedro.rtpstreamer.filestreamexample.RtspFromFileActivity;
import com.pedro.rtpstreamer.openglexample.OpenGlRtmpActivity;
import com.pedro.rtpstreamer.openglexample.OpenGlRtspActivity;
import com.pedro.rtpstreamer.rotation.RotationExampleActivity;
import com.pedro.rtpstreamer.surfacemodeexample.SurfaceModeRtmpActivity;
import com.pedro.rtpstreamer.surfacemodeexample.SurfaceModeRtspActivity;
import com.pedro.rtpstreamer.texturemodeexample.TextureModeRtmpActivity;
import com.pedro.rtpstreamer.texturemodeexample.TextureModeRtspActivity;
import com.pedro.rtpstreamer.utils.ActivityLink;
import com.pedro.rtpstreamer.utils.ImageAdapter;

import java.util.ArrayList;
import java.util.List;

import static android.os.Build.VERSION_CODES.JELLY_BEAN;
import static android.os.Build.VERSION_CODES.JELLY_BEAN_MR2;
import static android.os.Build.VERSION_CODES.LOLLIPOP;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

  private GridView list;
  private List<ActivityLink> activities;

  private final String[] PERMISSIONS = {
      Manifest.permission.RECORD_AUDIO, Manifest.permission.CAMERA,
      Manifest.permission.WRITE_EXTERNAL_STORAGE
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    overridePendingTransition(R.transition.slide_in, R.transition.slide_out);
    TextView tvVersion = findViewById(R.id.tv_version);
    tvVersion.setText(getString(R.string.version, BuildConfig.VERSION_NAME));

    list = findViewById(R.id.list);
    createList();
    setListAdapter(activities);

    if (!hasPermissions(this, PERMISSIONS)) {
      ActivityCompat.requestPermissions(this, PERMISSIONS, 1);
    }
  }

  @SuppressLint("NewApi")
  private void createList() {
    activities = new ArrayList<>();
    activities.add(new ActivityLink(new Intent(this, RtmpActivity.class),
        getString(R.string.rtmp_streamer), JELLY_BEAN));
    activities.add(new ActivityLink(new Intent(this, RtspActivity.class),
        getString(R.string.rtsp_streamer), JELLY_BEAN));
    activities.add(new ActivityLink(new Intent(this, ExampleRtmpActivity.class),
        getString(R.string.default_rtmp), JELLY_BEAN));
    activities.add(new ActivityLink(new Intent(this, ExampleRtspActivity.class),
        getString(R.string.default_rtsp), JELLY_BEAN));
    activities.add(new ActivityLink(new Intent(this, RtmpFromFileActivity.class),
        getString(R.string.from_file_rtmp), JELLY_BEAN_MR2));
    activities.add(new ActivityLink(new Intent(this, RtspFromFileActivity.class),
        getString(R.string.from_file_rtsp), JELLY_BEAN_MR2));
    activities.add(new ActivityLink(new Intent(this, SurfaceModeRtmpActivity.class),
        getString(R.string.surface_mode_rtmp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, SurfaceModeRtspActivity.class),
        getString(R.string.surface_mode_rtsp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, TextureModeRtmpActivity.class),
        getString(R.string.texture_mode_rtmp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, TextureModeRtspActivity.class),
        getString(R.string.texture_mode_rtsp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, OpenGlRtmpActivity.class),
        getString(R.string.opengl_rtmp), JELLY_BEAN_MR2));
    activities.add(new ActivityLink(new Intent(this, OpenGlRtspActivity.class),
        getString(R.string.opengl_rtsp), JELLY_BEAN_MR2));
    activities.add(new ActivityLink(new Intent(this, DisplayActivity.class),
        getString(R.string.display_rtmp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, BackgroundActivity.class),
        getString(R.string.service_rtp), LOLLIPOP));
    activities.add(new ActivityLink(new Intent(this, RotationExampleActivity.class),
        getString(R.string.rotation_rtmp), LOLLIPOP));
  }

  private void setListAdapter(List<ActivityLink> activities) {
    list.setAdapter(new ImageAdapter(activities));
    list.setOnItemClickListener(this);
  }

  @Override
  public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
    if (hasPermissions(this, PERMISSIONS)) {
      ActivityLink link = activities.get(i);
      int minSdk = link.getMinSdk();
      if (Build.VERSION.SDK_INT >= minSdk) {
        startActivity(link.getIntent());
        overridePendingTransition(R.transition.slide_in, R.transition.slide_out);
      } else {
        showMinSdkError(minSdk);
      }
    } else {
      showPermissionsErrorAndRequest();
    }
  }

  private void showMinSdkError(int minSdk) {
    String named;
    switch (minSdk) {
      case JELLY_BEAN_MR2:
        named = "JELLY_BEAN_MR2";
        break;
      case LOLLIPOP:
        named = "LOLLIPOP";
        break;
      default:
        named = "JELLY_BEAN";
        break;
    }
    Toast.makeText(this, "You need min Android " + named + " (API " + minSdk + " )",
        Toast.LENGTH_SHORT).show();
  }

  private void showPermissionsErrorAndRequest() {
    Toast.makeText(this, "You need permissions before", Toast.LENGTH_SHORT).show();
    ActivityCompat.requestPermissions(this, PERMISSIONS, 1);
  }

  private boolean hasPermissions(Context context, String... permissions) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && context != null && permissions != null) {
      for (String permission : permissions) {
        if (ActivityCompat.checkSelfPermission(context, permission)
            != PackageManager.PERMISSION_GRANTED) {
          return false;
        }
      }
    }
    return true;
  }
}
```

**(n). `OpenGlRtmpActivity.java`**

Create a file named `OpenGlRtmpActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.openglexample;

import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.SurfaceTexture;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import com.pedro.encoder.input.gl.SpriteGestureController;
import com.pedro.encoder.input.gl.render.filters.AnalogTVFilterRender;
import com.pedro.encoder.input.gl.render.filters.AndroidViewFilterRender;
import com.pedro.encoder.input.gl.render.filters.BasicDeformationFilterRender;
import com.pedro.encoder.input.gl.render.filters.BeautyFilterRender;
import com.pedro.encoder.input.gl.render.filters.BlackFilterRender;
import com.pedro.encoder.input.gl.render.filters.BlurFilterRender;
import com.pedro.encoder.input.gl.render.filters.BrightnessFilterRender;
import com.pedro.encoder.input.gl.render.filters.CartoonFilterRender;
import com.pedro.encoder.input.gl.render.filters.ChromaFilterRender;
import com.pedro.encoder.input.gl.render.filters.CircleFilterRender;
import com.pedro.encoder.input.gl.render.filters.ColorFilterRender;
import com.pedro.encoder.input.gl.render.filters.ContrastFilterRender;
import com.pedro.encoder.input.gl.render.filters.DuotoneFilterRender;
import com.pedro.encoder.input.gl.render.filters.EarlyBirdFilterRender;
import com.pedro.encoder.input.gl.render.filters.EdgeDetectionFilterRender;
import com.pedro.encoder.input.gl.render.filters.ExposureFilterRender;
import com.pedro.encoder.input.gl.render.filters.FireFilterRender;
import com.pedro.encoder.input.gl.render.filters.GammaFilterRender;
import com.pedro.encoder.input.gl.render.filters.GlitchFilterRender;
import com.pedro.encoder.input.gl.render.filters.GreyScaleFilterRender;
import com.pedro.encoder.input.gl.render.filters.HalftoneLinesFilterRender;
import com.pedro.encoder.input.gl.render.filters.Image70sFilterRender;
import com.pedro.encoder.input.gl.render.filters.LamoishFilterRender;
import com.pedro.encoder.input.gl.render.filters.MoneyFilterRender;
import com.pedro.encoder.input.gl.render.filters.NegativeFilterRender;
import com.pedro.encoder.input.gl.render.filters.NoFilterRender;
import com.pedro.encoder.input.gl.render.filters.PixelatedFilterRender;
import com.pedro.encoder.input.gl.render.filters.PolygonizationFilterRender;
import com.pedro.encoder.input.gl.render.filters.RGBSaturationFilterRender;
import com.pedro.encoder.input.gl.render.filters.RainbowFilterRender;
import com.pedro.encoder.input.gl.render.filters.RippleFilterRender;
import com.pedro.encoder.input.gl.render.filters.RotationFilterRender;
import com.pedro.encoder.input.gl.render.filters.SaturationFilterRender;
import com.pedro.encoder.input.gl.render.filters.SepiaFilterRender;
import com.pedro.encoder.input.gl.render.filters.SharpnessFilterRender;
import com.pedro.encoder.input.gl.render.filters.SnowFilterRender;
import com.pedro.encoder.input.gl.render.filters.SwirlFilterRender;
import com.pedro.encoder.input.gl.render.filters.TemperatureFilterRender;
import com.pedro.encoder.input.gl.render.filters.ZebraFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.GifObjectFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.ImageObjectFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.SurfaceFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.TextObjectFilterRender;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.encoder.utils.gl.TranslateTo;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtplibrary.rtmp.RtmpCamera1;
import com.pedro.rtplibrary.view.OpenGlView;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera1}
 */
@RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
public class OpenGlRtmpActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener, SurfaceHolder.Callback,
    View.OnTouchListener {

  private RtmpCamera1 rtmpCamera1;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;
  private OpenGlView openGlView;
  private SpriteGestureController spriteGestureController = new SpriteGestureController();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_open_gl);
    folder = PathUtils.getRecordPath();
    openGlView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    rtmpCamera1 = new RtmpCamera1(openGlView, this);
    openGlView.getHolder().addCallback(this);
    openGlView.setOnTouchListener(this);
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.gl_menu, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    //Stop listener for image, text and gif stream objects.
    spriteGestureController.stopListener();
    switch (item.getItemId()) {
      case R.id.e_d_fxaa:
        rtmpCamera1.getGlInterface().enableAA(!rtmpCamera1.getGlInterface().isAAEnabled());
        Toast.makeText(this,
            "FXAA " + (rtmpCamera1.getGlInterface().isAAEnabled() ? "enabled" : "disabled"),
            Toast.LENGTH_SHORT).show();
        return true;
      //filters. NOTE: You can change filter values on fly without reset the filter.
      // Example:
      // ColorFilterRender color = new ColorFilterRender()
      // rtmpCamera1.setFilter(color);
      // color.setRGBColor(255, 0, 0); //red tint
      case R.id.no_filter:
        rtmpCamera1.getGlInterface().setFilter(new NoFilterRender());
        return true;
      case R.id.analog_tv:
        rtmpCamera1.getGlInterface().setFilter(new AnalogTVFilterRender());
        return true;
      case R.id.android_view:
        AndroidViewFilterRender androidViewFilterRender = new AndroidViewFilterRender();
        androidViewFilterRender.setView(findViewById(R.id.switch_camera));
        rtmpCamera1.getGlInterface().setFilter(androidViewFilterRender);
        return true;
      case R.id.basic_deformation:
        rtmpCamera1.getGlInterface().setFilter(new BasicDeformationFilterRender());
        return true;
      case R.id.beauty:
        rtmpCamera1.getGlInterface().setFilter(new BeautyFilterRender());
        return true;
      case R.id.black:
        rtmpCamera1.getGlInterface().setFilter(new BlackFilterRender());
        return true;
      case R.id.blur:
        rtmpCamera1.getGlInterface().setFilter(new BlurFilterRender());
        return true;
      case R.id.brightness:
        rtmpCamera1.getGlInterface().setFilter(new BrightnessFilterRender());
        return true;
      case R.id.cartoon:
        rtmpCamera1.getGlInterface().setFilter(new CartoonFilterRender());
        return true;
      case R.id.chroma:
        ChromaFilterRender chromaFilterRender = new ChromaFilterRender();
        rtmpCamera1.getGlInterface().setFilter(chromaFilterRender);
        chromaFilterRender.setImage(BitmapFactory.decodeResource(getResources(), R.drawable.bg_chroma));
        return true;
      case R.id.circle:
        rtmpCamera1.getGlInterface().setFilter(new CircleFilterRender());
        return true;
      case R.id.color:
        rtmpCamera1.getGlInterface().setFilter(new ColorFilterRender());
        return true;
      case R.id.contrast:
        rtmpCamera1.getGlInterface().setFilter(new ContrastFilterRender());
        return true;
      case R.id.duotone:
        rtmpCamera1.getGlInterface().setFilter(new DuotoneFilterRender());
        return true;
      case R.id.early_bird:
        rtmpCamera1.getGlInterface().setFilter(new EarlyBirdFilterRender());
        return true;
      case R.id.edge_detection:
        rtmpCamera1.getGlInterface().setFilter(new EdgeDetectionFilterRender());
        return true;
      case R.id.exposure:
        rtmpCamera1.getGlInterface().setFilter(new ExposureFilterRender());
        return true;
      case R.id.fire:
        rtmpCamera1.getGlInterface().setFilter(new FireFilterRender());
        return true;
      case R.id.gamma:
        rtmpCamera1.getGlInterface().setFilter(new GammaFilterRender());
        return true;
      case R.id.glitch:
        rtmpCamera1.getGlInterface().setFilter(new GlitchFilterRender());
        return true;
      case R.id.gif:
        setGifToStream();
        return true;
      case R.id.grey_scale:
        rtmpCamera1.getGlInterface().setFilter(new GreyScaleFilterRender());
        return true;
      case R.id.halftone_lines:
        rtmpCamera1.getGlInterface().setFilter(new HalftoneLinesFilterRender());
        return true;
      case R.id.image:
        setImageToStream();
        return true;
      case R.id.image_70s:
        rtmpCamera1.getGlInterface().setFilter(new Image70sFilterRender());
        return true;
      case R.id.lamoish:
        rtmpCamera1.getGlInterface().setFilter(new LamoishFilterRender());
        return true;
      case R.id.money:
        rtmpCamera1.getGlInterface().setFilter(new MoneyFilterRender());
        return true;
      case R.id.negative:
        rtmpCamera1.getGlInterface().setFilter(new NegativeFilterRender());
        return true;
      case R.id.pixelated:
        rtmpCamera1.getGlInterface().setFilter(new PixelatedFilterRender());
        return true;
      case R.id.polygonization:
        rtmpCamera1.getGlInterface().setFilter(new PolygonizationFilterRender());
        return true;
      case R.id.rainbow:
        rtmpCamera1.getGlInterface().setFilter(new RainbowFilterRender());
        return true;
      case R.id.rgb_saturate:
        RGBSaturationFilterRender rgbSaturationFilterRender = new RGBSaturationFilterRender();
        rtmpCamera1.getGlInterface().setFilter(rgbSaturationFilterRender);
        //Reduce green and blue colors 20%. Red will predominate.
        rgbSaturationFilterRender.setRGBSaturation(1f, 0.8f, 0.8f);
        return true;
      case R.id.ripple:
        rtmpCamera1.getGlInterface().setFilter(new RippleFilterRender());
        return true;
      case R.id.rotation:
        RotationFilterRender rotationFilterRender = new RotationFilterRender();
        rtmpCamera1.getGlInterface().setFilter(rotationFilterRender);
        rotationFilterRender.setRotation(90);
        return true;
      case R.id.saturation:
        rtmpCamera1.getGlInterface().setFilter(new SaturationFilterRender());
        return true;
      case R.id.sepia:
        rtmpCamera1.getGlInterface().setFilter(new SepiaFilterRender());
        return true;
      case R.id.sharpness:
        rtmpCamera1.getGlInterface().setFilter(new SharpnessFilterRender());
        return true;
      case R.id.snow:
        rtmpCamera1.getGlInterface().setFilter(new SnowFilterRender());
        return true;
      case R.id.swirl:
        rtmpCamera1.getGlInterface().setFilter(new SwirlFilterRender());
        return true;
      case R.id.surface_filter:
        SurfaceFilterRender surfaceFilterRender =
            new SurfaceFilterRender(new SurfaceFilterRender.SurfaceReadyCallback() {
              @Override
              public void surfaceReady(SurfaceTexture surfaceTexture) {
                //You can render this filter with other api that draw in a surface. for example you can use VLC
                MediaPlayer mediaPlayer =
                    MediaPlayer.create(OpenGlRtmpActivity.this, R.raw.big_bunny_240p);
                mediaPlayer.setSurface(new Surface(surfaceTexture));
                mediaPlayer.start();
              }
            });
        rtmpCamera1.getGlInterface().setFilter(surfaceFilterRender);
        //Video is 360x240 so select a percent to keep aspect ratio (50% x 33.3% screen)
        surfaceFilterRender.setScale(50f, 33.3f);
        spriteGestureController.setBaseObjectFilterRender(surfaceFilterRender); //Optional
        return true;
      case R.id.temperature:
        rtmpCamera1.getGlInterface().setFilter(new TemperatureFilterRender());
        return true;
      case R.id.text:
        setTextToStream();
        return true;
      case R.id.zebra:
        rtmpCamera1.getGlInterface().setFilter(new ZebraFilterRender());
        return true;
      default:
        return false;
    }
  }

  private void setTextToStream() {
    TextObjectFilterRender textObjectFilterRender = new TextObjectFilterRender();
    rtmpCamera1.getGlInterface().setFilter(textObjectFilterRender);
    textObjectFilterRender.setText("Hello world", 22, Color.RED);
    textObjectFilterRender.setDefaultScale(rtmpCamera1.getStreamWidth(),
        rtmpCamera1.getStreamHeight());
    textObjectFilterRender.setPosition(TranslateTo.CENTER);
    spriteGestureController.setBaseObjectFilterRender(textObjectFilterRender); //Optional
  }

  private void setImageToStream() {
    ImageObjectFilterRender imageObjectFilterRender = new ImageObjectFilterRender();
    rtmpCamera1.getGlInterface().setFilter(imageObjectFilterRender);
    imageObjectFilterRender.setImage(
        BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher));
    imageObjectFilterRender.setDefaultScale(rtmpCamera1.getStreamWidth(),
        rtmpCamera1.getStreamHeight());
    imageObjectFilterRender.setPosition(TranslateTo.RIGHT);
    spriteGestureController.setBaseObjectFilterRender(imageObjectFilterRender); //Optional
    spriteGestureController.setPreventMoveOutside(false); //Optional
  }

  private void setGifToStream() {
    try {
      GifObjectFilterRender gifObjectFilterRender = new GifObjectFilterRender();
      gifObjectFilterRender.setGif(getResources().openRawResource(R.raw.banana));
      rtmpCamera1.getGlInterface().setFilter(gifObjectFilterRender);
      gifObjectFilterRender.setDefaultScale(rtmpCamera1.getStreamWidth(),
          rtmpCamera1.getStreamHeight());
      gifObjectFilterRender.setPosition(TranslateTo.BOTTOM);
      spriteGestureController.setBaseObjectFilterRender(gifObjectFilterRender); //Optional
    } catch (IOException e) {
      Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
    }
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtmpActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtmpActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
            .show();
        rtmpCamera1.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtmpActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtmpActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtmpActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtmpCamera1.isStreaming()) {
          if (rtmpCamera1.isRecording()
              || rtmpCamera1.prepareAudio() && rtmpCamera1.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtmpCamera1.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtmpCamera1.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtmpCamera1.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtmpCamera1.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtmpCamera1.isStreaming()) {
              if (rtmpCamera1.prepareAudio() && rtmpCamera1.prepareVideo()) {
                rtmpCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtmpCamera1.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtmpCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtmpCamera1.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtmpCamera1.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (rtmpCamera1.isRecording()) {
      rtmpCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtmpCamera1.isStreaming()) {
      rtmpCamera1.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtmpCamera1.stopPreview();
  }

  @Override
  public boolean onTouch(View view, MotionEvent motionEvent) {
    if (spriteGestureController.spriteTouched(view, motionEvent)) {
      spriteGestureController.moveSprite(view, motionEvent);
      spriteGestureController.scaleSprite(motionEvent);
      return true;
    }
    return false;
  }
}
```

**(o). `OpenGlRtspActivity.java`**

Create a file named `OpenGlRtspActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.openglexample;

import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.SurfaceTexture;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.pedro.encoder.input.gl.SpriteGestureController;
import com.pedro.encoder.input.gl.render.filters.AnalogTVFilterRender;
import com.pedro.encoder.input.gl.render.filters.AndroidViewFilterRender;
import com.pedro.encoder.input.gl.render.filters.BasicDeformationFilterRender;
import com.pedro.encoder.input.gl.render.filters.BeautyFilterRender;
import com.pedro.encoder.input.gl.render.filters.BlackFilterRender;
import com.pedro.encoder.input.gl.render.filters.BlurFilterRender;
import com.pedro.encoder.input.gl.render.filters.BrightnessFilterRender;
import com.pedro.encoder.input.gl.render.filters.CartoonFilterRender;
import com.pedro.encoder.input.gl.render.filters.ChromaFilterRender;
import com.pedro.encoder.input.gl.render.filters.CircleFilterRender;
import com.pedro.encoder.input.gl.render.filters.ColorFilterRender;
import com.pedro.encoder.input.gl.render.filters.ContrastFilterRender;
import com.pedro.encoder.input.gl.render.filters.DuotoneFilterRender;
import com.pedro.encoder.input.gl.render.filters.EarlyBirdFilterRender;
import com.pedro.encoder.input.gl.render.filters.EdgeDetectionFilterRender;
import com.pedro.encoder.input.gl.render.filters.ExposureFilterRender;
import com.pedro.encoder.input.gl.render.filters.FireFilterRender;
import com.pedro.encoder.input.gl.render.filters.GammaFilterRender;
import com.pedro.encoder.input.gl.render.filters.GlitchFilterRender;
import com.pedro.encoder.input.gl.render.filters.GreyScaleFilterRender;
import com.pedro.encoder.input.gl.render.filters.HalftoneLinesFilterRender;
import com.pedro.encoder.input.gl.render.filters.Image70sFilterRender;
import com.pedro.encoder.input.gl.render.filters.LamoishFilterRender;
import com.pedro.encoder.input.gl.render.filters.MoneyFilterRender;
import com.pedro.encoder.input.gl.render.filters.NegativeFilterRender;
import com.pedro.encoder.input.gl.render.filters.NoFilterRender;
import com.pedro.encoder.input.gl.render.filters.PixelatedFilterRender;
import com.pedro.encoder.input.gl.render.filters.PolygonizationFilterRender;
import com.pedro.encoder.input.gl.render.filters.RGBSaturationFilterRender;
import com.pedro.encoder.input.gl.render.filters.RainbowFilterRender;
import com.pedro.encoder.input.gl.render.filters.RippleFilterRender;
import com.pedro.encoder.input.gl.render.filters.RotationFilterRender;
import com.pedro.encoder.input.gl.render.filters.SaturationFilterRender;
import com.pedro.encoder.input.gl.render.filters.SepiaFilterRender;
import com.pedro.encoder.input.gl.render.filters.SharpnessFilterRender;
import com.pedro.encoder.input.gl.render.filters.SnowFilterRender;
import com.pedro.encoder.input.gl.render.filters.SwirlFilterRender;
import com.pedro.encoder.input.gl.render.filters.TemperatureFilterRender;
import com.pedro.encoder.input.gl.render.filters.ZebraFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.GifObjectFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.ImageObjectFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.SurfaceFilterRender;
import com.pedro.encoder.input.gl.render.filters.object.TextObjectFilterRender;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.encoder.utils.gl.TranslateTo;
import com.pedro.rtplibrary.rtsp.RtspCamera1;
import com.pedro.rtplibrary.view.OpenGlView;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import org.jetbrains.annotations.NotNull;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera1Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera1}
 */
@RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
public class OpenGlRtspActivity extends AppCompatActivity
    implements ConnectCheckerRtsp, View.OnClickListener, SurfaceHolder.Callback,
    View.OnTouchListener {

  private RtspCamera1 rtspCamera1;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;
  private OpenGlView openGlView;
  private SpriteGestureController spriteGestureController = new SpriteGestureController();

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_open_gl);
    folder = PathUtils.getRecordPath();
    openGlView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    rtspCamera1 = new RtspCamera1(openGlView, this);
    openGlView.getHolder().addCallback(this);
    openGlView.setOnTouchListener(this);
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.gl_menu, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    //Stop listener for image, text and gif stream objects.
    spriteGestureController.stopListener();
    switch (item.getItemId()) {
      case R.id.e_d_fxaa:
        rtspCamera1.getGlInterface().enableAA(!rtspCamera1.getGlInterface().isAAEnabled());
        Toast.makeText(this,
            "FXAA " + (rtspCamera1.getGlInterface().isAAEnabled() ? "enabled" : "disabled"),
            Toast.LENGTH_SHORT).show();
        return true;
      //filters. NOTE: You can change filter values on fly without reset the filter.
      // Example:
      // ColorFilterRender color = new ColorFilterRender()
      // rtmpCamera1.setFilter(color);
      // color.setRGBColor(255, 0, 0); //red tint
      case R.id.no_filter:
        rtspCamera1.getGlInterface().setFilter(new NoFilterRender());
        return true;
      case R.id.analog_tv:
        rtspCamera1.getGlInterface().setFilter(new AnalogTVFilterRender());
        return true;
      case R.id.android_view:
        AndroidViewFilterRender androidViewFilterRender = new AndroidViewFilterRender();
        androidViewFilterRender.setView(findViewById(R.id.switch_camera));
        rtspCamera1.getGlInterface().setFilter(androidViewFilterRender);
        return true;
      case R.id.basic_deformation:
        rtspCamera1.getGlInterface().setFilter(new BasicDeformationFilterRender());
        return true;
      case R.id.beauty:
        rtspCamera1.getGlInterface().setFilter(new BeautyFilterRender());
        return true;
      case R.id.black:
        rtspCamera1.getGlInterface().setFilter(new BlackFilterRender());
        return true;
      case R.id.blur:
        rtspCamera1.getGlInterface().setFilter(new BlurFilterRender());
        return true;
      case R.id.brightness:
        rtspCamera1.getGlInterface().setFilter(new BrightnessFilterRender());
        return true;
      case R.id.cartoon:
        rtspCamera1.getGlInterface().setFilter(new CartoonFilterRender());
        return true;
      case R.id.chroma:
        ChromaFilterRender chromaFilterRender = new ChromaFilterRender();
        rtspCamera1.getGlInterface().setFilter(chromaFilterRender);
        chromaFilterRender.setImage(BitmapFactory.decodeResource(getResources(), R.drawable.bg_chroma));
        return true;
      case R.id.circle:
        rtspCamera1.getGlInterface().setFilter(new CircleFilterRender());
        return true;
      case R.id.color:
        rtspCamera1.getGlInterface().setFilter(new ColorFilterRender());
        return true;
      case R.id.contrast:
        rtspCamera1.getGlInterface().setFilter(new ContrastFilterRender());
        return true;
      case R.id.duotone:
        rtspCamera1.getGlInterface().setFilter(new DuotoneFilterRender());
        return true;
      case R.id.early_bird:
        rtspCamera1.getGlInterface().setFilter(new EarlyBirdFilterRender());
        return true;
      case R.id.edge_detection:
        rtspCamera1.getGlInterface().setFilter(new EdgeDetectionFilterRender());
        return true;
      case R.id.exposure:
        rtspCamera1.getGlInterface().setFilter(new ExposureFilterRender());
        return true;
      case R.id.fire:
        rtspCamera1.getGlInterface().setFilter(new FireFilterRender());
        return true;
      case R.id.gamma:
        rtspCamera1.getGlInterface().setFilter(new GammaFilterRender());
        return true;
      case R.id.glitch:
        rtspCamera1.getGlInterface().setFilter(new GlitchFilterRender());
        return true;
      case R.id.gif:
        setGifToStream();
        return true;
      case R.id.grey_scale:
        rtspCamera1.getGlInterface().setFilter(new GreyScaleFilterRender());
        return true;
      case R.id.halftone_lines:
        rtspCamera1.getGlInterface().setFilter(new HalftoneLinesFilterRender());
        return true;
      case R.id.image:
        setImageToStream();
        return true;
      case R.id.image_70s:
        rtspCamera1.getGlInterface().setFilter(new Image70sFilterRender());
        return true;
      case R.id.lamoish:
        rtspCamera1.getGlInterface().setFilter(new LamoishFilterRender());
        return true;
      case R.id.money:
        rtspCamera1.getGlInterface().setFilter(new MoneyFilterRender());
        return true;
      case R.id.negative:
        rtspCamera1.getGlInterface().setFilter(new NegativeFilterRender());
        return true;
      case R.id.pixelated:
        rtspCamera1.getGlInterface().setFilter(new PixelatedFilterRender());
        return true;
      case R.id.polygonization:
        rtspCamera1.getGlInterface().setFilter(new PolygonizationFilterRender());
        return true;
      case R.id.rainbow:
        rtspCamera1.getGlInterface().setFilter(new RainbowFilterRender());
        return true;
      case R.id.rgb_saturate:
        RGBSaturationFilterRender rgbSaturationFilterRender = new RGBSaturationFilterRender();
        rtspCamera1.getGlInterface().setFilter(rgbSaturationFilterRender);
        //Reduce green and blue colors 20%. Red will predominate.
        rgbSaturationFilterRender.setRGBSaturation(1f, 0.8f, 0.8f);
        return true;
      case R.id.ripple:
        rtspCamera1.getGlInterface().setFilter(new RippleFilterRender());
        return true;
      case R.id.rotation:
        RotationFilterRender rotationFilterRender = new RotationFilterRender();
        rtspCamera1.getGlInterface().setFilter(rotationFilterRender);
        rotationFilterRender.setRotation(90);
        return true;
      case R.id.saturation:
        rtspCamera1.getGlInterface().setFilter(new SaturationFilterRender());
        return true;
      case R.id.sepia:
        rtspCamera1.getGlInterface().setFilter(new SepiaFilterRender());
        return true;
      case R.id.sharpness:
        rtspCamera1.getGlInterface().setFilter(new SharpnessFilterRender());
        return true;
      case R.id.snow:
        rtspCamera1.getGlInterface().setFilter(new SnowFilterRender());
        return true;
      case R.id.swirl:
        rtspCamera1.getGlInterface().setFilter(new SwirlFilterRender());
        return true;
      case R.id.surface_filter:
        SurfaceFilterRender surfaceFilterRender =
            new SurfaceFilterRender(new SurfaceFilterRender.SurfaceReadyCallback() {
              @Override
              public void surfaceReady(SurfaceTexture surfaceTexture) {
                //You can render this filter with other api that draw in a surface. for example you can use VLC
                MediaPlayer mediaPlayer =
                    MediaPlayer.create(OpenGlRtspActivity.this, R.raw.big_bunny_240p);
                mediaPlayer.setSurface(new Surface(surfaceTexture));
                mediaPlayer.start();
              }
            });
        rtspCamera1.getGlInterface().setFilter(surfaceFilterRender);
        MediaPlayer mediaPlayer = MediaPlayer.create(this, R.raw.big_bunny_240p);
        mediaPlayer.setSurface(surfaceFilterRender.getSurface());
        mediaPlayer.start();
        //Video is 360x240 so select a percent to keep aspect ratio (50% x 33.3% screen)
        surfaceFilterRender.setScale(50f, 33.3f);
        spriteGestureController.setBaseObjectFilterRender(surfaceFilterRender); //Optional
        return true;
      case R.id.temperature:
        rtspCamera1.getGlInterface().setFilter(new TemperatureFilterRender());
        return true;
      case R.id.text:
        setTextToStream();
        return true;
      case R.id.zebra:
        rtspCamera1.getGlInterface().setFilter(new ZebraFilterRender());
        return true;
      default:
        return false;
    }
  }

  private void setTextToStream() {
    TextObjectFilterRender textObjectFilterRender = new TextObjectFilterRender();
    rtspCamera1.getGlInterface().setFilter(textObjectFilterRender);
    textObjectFilterRender.setText("Hello world", 22, Color.RED);
    textObjectFilterRender.setDefaultScale(rtspCamera1.getStreamWidth(),
        rtspCamera1.getStreamHeight());
    textObjectFilterRender.setPosition(TranslateTo.CENTER);
    spriteGestureController.setBaseObjectFilterRender(textObjectFilterRender); //Optional
  }

  private void setImageToStream() {
    ImageObjectFilterRender imageObjectFilterRender = new ImageObjectFilterRender();
    rtspCamera1.getGlInterface().setFilter(imageObjectFilterRender);
    imageObjectFilterRender.setImage(
        BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher));
    imageObjectFilterRender.setDefaultScale(rtspCamera1.getStreamWidth(),
        rtspCamera1.getStreamHeight());
    imageObjectFilterRender.setPosition(TranslateTo.RIGHT);
    spriteGestureController.setBaseObjectFilterRender(imageObjectFilterRender); //Optional
    spriteGestureController.setPreventMoveOutside(false); //Optional
  }

  private void setGifToStream() {
    try {
      GifObjectFilterRender gifObjectFilterRender = new GifObjectFilterRender();
      rtspCamera1.getGlInterface().setFilter(gifObjectFilterRender);
      gifObjectFilterRender.setGif(getResources().openRawResource(R.raw.banana));
      gifObjectFilterRender.setDefaultScale(rtspCamera1.getStreamWidth(),
          rtspCamera1.getStreamHeight());
      gifObjectFilterRender.setPosition(TranslateTo.BOTTOM);
      spriteGestureController.setBaseObjectFilterRender(gifObjectFilterRender); //Optional
    } catch (IOException e) {
      Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
    }
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtspActivity.this, "Connection success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtspActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT)
            .show();
        rtspCamera1.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(long bitrate) {

  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtspActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtspActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(OpenGlRtspActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtspCamera1.isStreaming()) {
          if (rtspCamera1.isRecording()
              || rtspCamera1.prepareAudio() && rtspCamera1.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtspCamera1.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtspCamera1.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtspCamera1.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtspCamera1.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtspCamera1.isStreaming()) {
              if (rtspCamera1.prepareAudio() && rtspCamera1.prepareVideo()) {
                rtspCamera1.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtspCamera1.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtspCamera1.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtspCamera1.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtspCamera1.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (rtspCamera1.isRecording()) {
      rtspCamera1.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtspCamera1.isStreaming()) {
      rtspCamera1.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtspCamera1.stopPreview();
  }

  @Override
  public boolean onTouch(View view, MotionEvent motionEvent) {
    if (spriteGestureController.spriteTouched(view, motionEvent)) {
      spriteGestureController.moveSprite(view, motionEvent);
      spriteGestureController.scaleSprite(motionEvent);
      return true;
    }
    return false;
  }
}
```

**(p). `RotationExampleActivity.kt`**

Create a file named `RotationExampleActivity.kt`


Here is the full code

```kotlin
package com.pedro.rtpstreamer.rotation

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.SurfaceHolder
import android.view.WindowManager
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.pedro.rtplibrary.util.sources.VideoManager
import com.pedro.rtpstreamer.R
import com.pedro.rtpstreamer.databinding.ActivityExampleBinding
import com.pedro.rtpstreamer.utils.PathUtils
import java.text.SimpleDateFormat
import java.util.*

/**
 * Created by pedro on 22/3/22.
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
class RotationExampleActivity: AppCompatActivity(), SurfaceHolder.Callback {

  private val REQUEST_CODE_SCREEN_VIDEO = 1
  private val REQUEST_CODE_INTERNAL_AUDIO = 2
  private var askingMediaProjection = false
  private lateinit var binding: ActivityExampleBinding
  private var service: StreamService? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    binding = ActivityExampleBinding.inflate(layoutInflater)
    setContentView(binding.root)
    binding.etRtpUrl.setHint(R.string.hint_rtmp)
    binding.surfaceView.holder.addCallback(this)
    StreamService.observer.observe(this) {
      if (it != null) {
        service = if (!it.prepare()) {
          Toast.makeText(this, "Prepare method failed", Toast.LENGTH_SHORT).show()
          null
        } else it
      }
      startPreview()
    }

    binding.bStartStop.setOnClickListener {
      if (service?.isStreaming() != true) {
        service?.startStream(binding.etRtpUrl.text.toString())
        binding.bStartStop.setText(R.string.stop_button)
      } else {
        service?.stopStream()
        binding.bStartStop.setText(R.string.start_button)
      }
    }
    binding.bRecord.setOnClickListener {
      if (service?.isRecording() != true) {
        val folder = PathUtils.getRecordPath()
        if (!folder.exists()) folder.mkdir()
        val sdf = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault())
        val fileName = sdf.format(Date())
        service?.startRecord("${folder.absolutePath}/$fileName.mp4")
        binding.bRecord.setText(R.string.stop_record)
      } else {
        service?.stopRecord()
        binding.bRecord.setText(R.string.start_record)
      }
    }
    binding.switchCamera.setOnClickListener {
      service?.switchCamera()
    }
  }

  override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.rotation_menu, menu)
    return true
  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
      R.id.video_source_camera1 -> {
        service?.changeVideoSourceCamera(VideoManager.Source.CAMERA1)
      }
      R.id.video_source_camera2 -> {
        service?.changeVideoSourceCamera(VideoManager.Source.CAMERA2)
      }
      R.id.video_source_screen -> {
        askingMediaProjection = true
        val mediaProjectionManager = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
        val intent = mediaProjectionManager.createScreenCaptureIntent()
        startActivityForResult(intent, REQUEST_CODE_SCREEN_VIDEO)
      }
      R.id.audio_source_microphone -> {
        service?.changeAudioSourceMicrophone()
      }
      R.id.audio_source_internal -> {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
          askingMediaProjection = true
          val mediaProjectionManager = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
          val intent = mediaProjectionManager.createScreenCaptureIntent()
          startActivityForResult(intent, REQUEST_CODE_INTERNAL_AUDIO)
        } else {
          Toast.makeText(this, "Android 10+ required", Toast.LENGTH_SHORT).show()
        }
      }
      else -> return false
    }
    return super.onOptionsItemSelected(item)
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (data != null && resultCode == RESULT_OK) {
      if (requestCode == REQUEST_CODE_SCREEN_VIDEO) {
        askingMediaProjection = false
        service?.changeVideoSourceScreen(this, resultCode, data)
      } else if (requestCode == REQUEST_CODE_INTERNAL_AUDIO && Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        askingMediaProjection = false
        service?.changeAudioSourceInternal(this, resultCode, data)
      }
    }
  }

  override fun onResume() {
    super.onResume()
    if (!isMyServiceRunning(StreamService::class.java)) {
      val intent = Intent(applicationContext, StreamService::class.java)
      startService(intent)
    }
    if (service?.isStreaming() == true) {
      binding.bStartStop.setText(R.string.stop_button)
    } else {
      binding.bStartStop.setText(R.string.start_button)
    }
    if (service?.isRecording() == true) {
      binding.bRecord.setText(R.string.stop_record)
    } else {
      binding.bRecord.setText(R.string.start_record)
    }
  }

  override fun onPause() {
    super.onPause()
    if (!isChangingConfigurations && !askingMediaProjection) { //stop if no rotation activity
      if (service?.isStreaming() == true) service?.stopStream()
      if (service?.isOnPreview() == true) service?.stopPreview()
      service = null
      stopService(Intent(applicationContext, StreamService::class.java))
    }
  }

  override fun surfaceChanged(holder: SurfaceHolder, p1: Int, p2: Int, p3: Int) {
    startPreview()
  }

  override fun surfaceDestroyed(holder: SurfaceHolder) {
    if (service?.isOnPreview() == true) service?.stopPreview()
  }

  override fun surfaceCreated(holder: SurfaceHolder) {

  }

  private fun startPreview() {
    //check if onPreview and if surface is valid
    if (service?.isOnPreview() != true && binding.surfaceView.holder.surface.isValid) {
      service?.startPreview(binding.surfaceView)
    }
  }

  @Suppress("DEPRECATION")
  private fun isMyServiceRunning(serviceClass: Class<*>): Boolean {
    val manager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    for (service in manager.getRunningServices(Integer.MAX_VALUE)) {
      if (serviceClass.name == service.service.className) {
        return true
      }
    }
    return false
  }
}
```

**(q). `StreamService.kt`**

Create a file named `StreamService.kt`


Here is the full code

```kotlin
package com.pedro.rtpstreamer.rotation

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import android.view.SurfaceView
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import androidx.lifecycle.MutableLiveData
import com.pedro.rtmp.utils.ConnectCheckerRtmp
import com.pedro.rtplibrary.rtmp.RtmpStream
import com.pedro.rtplibrary.util.SensorRotationManager
import com.pedro.rtplibrary.util.sources.VideoManager
import com.pedro.rtpstreamer.R

/**
 * Created by pedro on 22/3/22.
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
class StreamService: Service(), ConnectCheckerRtmp {

  companion object {
    private const val TAG = "StreamService"
    private const val channelId = "rtpStreamChannel"
    private const val notifyId = 123456
    private var notificationManager: NotificationManager? = null
    val observer = MutableLiveData<StreamService?>()
  }

  private var rtmpCamera: RtmpStream? = null
  private var sensorRotationManager: SensorRotationManager? = null
  private var currentOrientation = -1
  private var prepared = false

  override fun onBind(p0: Intent?): IBinder? {
    return null
  }

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    Log.i(TAG, "RTP service started")
    return START_STICKY
  }

  override fun onCreate() {
    super.onCreate()
    Log.i(TAG, "$TAG create")
    notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channel = NotificationChannel(channelId, channelId, NotificationManager.IMPORTANCE_HIGH)
      notificationManager?.createNotificationChannel(channel)
    }
    keepAliveTrick()
    rtmpCamera = RtmpStream(applicationContext, this)
    sensorRotationManager = SensorRotationManager(applicationContext) {
      //0 = portrait, 90 = landscape, 180 = reverse portrait, 270 = reverse landscape
      if (currentOrientation != it) {
        rtmpCamera?.setOrientation(it)
        currentOrientation = it
      }
    }
    sensorRotationManager?.start()
    observer.postValue(this)
  }

  override fun onDestroy() {
    super.onDestroy()
    Log.i(TAG, "RTP service destroy")
    stopRecord()
    stopStream()
    stopPreview()
    sensorRotationManager?.stop()
    prepared = false
    observer.postValue(null)
  }

  private fun keepAliveTrick() {
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
      val notification = NotificationCompat.Builder(this, channelId)
        .setOngoing(true)
        .setContentTitle("")
        .setContentText("").build()
      startForeground(1, notification)
    } else {
      startForeground(1, Notification())
    }
  }

  private fun showNotification(text: String) {
    val notification = NotificationCompat.Builder(applicationContext, channelId)
      .setSmallIcon(R.mipmap.ic_launcher)
      .setContentTitle("RTP Stream")
      .setContentText(text).build()
    notificationManager?.notify(notifyId, notification)
  }

  fun prepare(): Boolean {
    if (!prepared) {
      prepared = rtmpCamera?.prepareVideo(640, 480, 1200 * 1000) ?: false &&
          rtmpCamera?.prepareAudio(44100, true, 128 * 1000) ?: false
    }
    return prepared
  }

  fun startPreview(surfaceView: SurfaceView) {
    rtmpCamera?.startPreview(surfaceView)
  }

  fun stopPreview() {
    rtmpCamera?.stopPreview()
  }

  fun switchCamera() {
    rtmpCamera?.switchCamera()
  }

  fun isStreaming(): Boolean = rtmpCamera?.isStreaming ?: false

  fun isRecording(): Boolean = rtmpCamera?.isRecording ?: false

  fun isOnPreview(): Boolean = rtmpCamera?.isOnPreview ?: false

  fun startStream(endpoint: String) {
    rtmpCamera?.startStream(endpoint)
  }

  fun stopStream() {
    rtmpCamera?.stopStream()
  }

  fun startRecord(path: String) {
    rtmpCamera?.startRecord(path) {
      Log.i(TAG, "record state: ${it.name}")
    }
  }

  fun stopRecord() {
    rtmpCamera?.stopRecord()
  }

  fun changeVideoSourceCamera(source: VideoManager.Source) {
    rtmpCamera?.changeVideoSourceCamera(source)
  }

  fun changeVideoSourceScreen(context: Context, resultCode: Int, data: Intent) {
    val mediaProjectionManager = context.applicationContext.getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
    val mediaProjection = mediaProjectionManager.getMediaProjection(resultCode, data)
    rtmpCamera?.changeVideoSourceScreen(mediaProjection)
  }

  fun changeAudioSourceMicrophone() {
    rtmpCamera?.changeAudioSourceMicrophone()
  }

  @RequiresApi(Build.VERSION_CODES.Q)
  fun changeAudioSourceInternal(context: Context, resultCode: Int, data: Intent) {
    val mediaProjectionManager = context.applicationContext.getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
    val mediaProjection = mediaProjectionManager.getMediaProjection(resultCode, data)
    rtmpCamera?.changeAudioSourceInternal(mediaProjection)
  }

  override fun onConnectionStartedRtmp(rtmpUrl: String) {
    showNotification("Stream connection started")
  }

  override fun onConnectionSuccessRtmp() {
    showNotification("Stream started")
  }

  override fun onNewBitrateRtmp(bitrate: Long) {

  }

  override fun onConnectionFailedRtmp(reason: String) {
    showNotification("Stream connection failed")
  }

  override fun onDisconnectRtmp() {
    showNotification("Stream stopped")
  }

  override fun onAuthErrorRtmp() {
    showNotification("Stream auth error")
  }

  override fun onAuthSuccessRtmp() {
    showNotification("Stream auth success")
  }
}
```

**(r). `SurfaceModeRtmpActivity.java`**

Create a file named `SurfaceModeRtmpActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.surfacemodeexample;

import android.os.Build;
import android.os.Bundle;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtplibrary.rtmp.RtmpCamera2;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera2Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera2}
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class SurfaceModeRtmpActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener, SurfaceHolder.Callback {

  private RtmpCamera2 rtmpCamera2;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_example);
    folder = PathUtils.getRecordPath();
    SurfaceView surfaceView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    rtmpCamera2 = new RtmpCamera2(surfaceView, this);
    rtmpCamera2.setReTries(10);
    surfaceView.getHolder().addCallback(this);
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtmpActivity.this, "Connection success", Toast.LENGTH_SHORT)
            .show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        //Wait 5s and retry connect stream
        if (rtmpCamera2.reTry(5000, reason, null)) {
          Toast.makeText(SurfaceModeRtmpActivity.this, "Retry", Toast.LENGTH_SHORT)
              .show();
        } else {
          Toast.makeText(SurfaceModeRtmpActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT).show();
          rtmpCamera2.stopStream();
          button.setText(R.string.start_button);
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtmpActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtmpActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtmpActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtmpCamera2.isStreaming()) {
          if (rtmpCamera2.isRecording()
              || rtmpCamera2.prepareAudio() && rtmpCamera2.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtmpCamera2.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtmpCamera2.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtmpCamera2.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtmpCamera2.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtmpCamera2.isStreaming()) {
              if (rtmpCamera2.prepareAudio() && rtmpCamera2.prepareVideo()) {
                rtmpCamera2.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtmpCamera2.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtmpCamera2.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtmpCamera2.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtmpCamera2.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (rtmpCamera2.isRecording()) {
      rtmpCamera2.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtmpCamera2.isStreaming()) {
      rtmpCamera2.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtmpCamera2.stopPreview();
  }
}
```

**(s). `SurfaceModeRtspActivity.java`**

Create a file named `SurfaceModeRtspActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.surfacemodeexample;

import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtplibrary.rtsp.RtspCamera2;
import com.pedro.rtpstreamer.R;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera2Base}
 * {@link com.pedro.rtplibrary.rtsp.RtspCamera2}
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class SurfaceModeRtspActivity extends AppCompatActivity
    implements ConnectCheckerRtsp, View.OnClickListener, SurfaceHolder.Callback {

  private RtspCamera2 rtspCamera2;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_example);
    folder = PathUtils.getRecordPath();
    SurfaceView surfaceView = findViewById(R.id.surfaceView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    rtspCamera2 = new RtspCamera2(surfaceView, this);
    rtspCamera2.setReTries(10);
    surfaceView.getHolder().addCallback(this);
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtspActivity.this, "Connection success", Toast.LENGTH_SHORT)
            .show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        //Wait 5s and retry connect stream
        if (rtspCamera2.reTry(5000, reason, null)) {
          Toast.makeText(SurfaceModeRtspActivity.this, "Retry", Toast.LENGTH_SHORT)
              .show();
        } else {
          Toast.makeText(SurfaceModeRtspActivity.this, "Connection failed. " + reason, Toast.LENGTH_SHORT).show();
          rtspCamera2.stopStream();
          button.setText(R.string.start_button);
        }
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(long bitrate) {

  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtspActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtspActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(SurfaceModeRtspActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtspCamera2.isStreaming()) {
          if (rtspCamera2.isRecording()
              || rtspCamera2.prepareAudio() && rtspCamera2.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtspCamera2.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtspCamera2.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtspCamera2.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtspCamera2.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtspCamera2.isStreaming()) {
              if (rtspCamera2.prepareAudio() && rtspCamera2.prepareVideo()) {
                rtspCamera2.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtspCamera2.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtspCamera2.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtspCamera2.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void surfaceCreated(SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    rtspCamera2.startPreview();
  }

  @Override
  public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    if (rtspCamera2.isRecording()) {
      rtspCamera2.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtspCamera2.isStreaming()) {
      rtspCamera2.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtspCamera2.stopPreview();
  }
}
```

**(t). `TextureModeRtmpActivity.java`**

Create a file named `TextureModeRtmpActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.texturemodeexample;

import android.graphics.SurfaceTexture;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.TextureView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtmp.utils.ConnectCheckerRtmp;
import com.pedro.rtpstreamer.R;
import com.pedro.rtplibrary.rtmp.RtmpCamera2;
import com.pedro.rtplibrary.view.AutoFitTextureView;
import com.pedro.rtpstreamer.utils.PathUtils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera2Base}
 * {@link com.pedro.rtplibrary.rtmp.RtmpCamera2}
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class TextureModeRtmpActivity extends AppCompatActivity
    implements ConnectCheckerRtmp, View.OnClickListener, TextureView.SurfaceTextureListener {

  private RtmpCamera2 rtmpCamera2;
  private AutoFitTextureView textureView;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_texture_mode);
    folder = PathUtils.getRecordPath();
    textureView = findViewById(R.id.textureView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtmp);
    rtmpCamera2 = new RtmpCamera2(textureView, this);
    textureView.setSurfaceTextureListener(this);
  }

  @Override
  public void onConnectionStartedRtmp(String rtmpUrl) {
  }

  @Override
  public void onConnectionSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtmpActivity.this, "Connection success", Toast.LENGTH_SHORT)
            .show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtmp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtmpActivity.this, "Connection failed. " + reason,
            Toast.LENGTH_SHORT).show();
        rtmpCamera2.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtmp(long bitrate) {

  }

  @Override
  public void onDisconnectRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtmpActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtmpActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtmp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtmpActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtmpCamera2.isStreaming()) {
          if (rtmpCamera2.isRecording()
              || rtmpCamera2.prepareAudio() && rtmpCamera2.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtmpCamera2.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtmpCamera2.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtmpCamera2.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtmpCamera2.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtmpCamera2.isStreaming()) {
              if (rtmpCamera2.prepareAudio() && rtmpCamera2.prepareVideo()) {
                rtmpCamera2.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtmpCamera2.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtmpCamera2.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtmpCamera2.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void onSurfaceTextureAvailable(SurfaceTexture surfaceTexture, int i, int i1) {
    textureView.setAspectRatio(480, 640);
  }

  @Override
  public void onSurfaceTextureSizeChanged(SurfaceTexture surfaceTexture, int i, int i1) {
    rtmpCamera2.startPreview();
  }

  @Override
  public boolean onSurfaceTextureDestroyed(SurfaceTexture surfaceTexture) {
    if (rtmpCamera2.isRecording()) {
      rtmpCamera2.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtmpCamera2.isStreaming()) {
      rtmpCamera2.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtmpCamera2.stopPreview();

    return true;
  }

  @Override
  public void onSurfaceTextureUpdated(SurfaceTexture surfaceTexture) {

  }
}
```

**(u). `TextureModeRtspActivity.java`**

Create a file named `TextureModeRtspActivity.java`


Here is the full code

```java


package com.pedro.rtpstreamer.texturemodeexample;

import android.graphics.SurfaceTexture;
import android.os.Build;
import android.os.Bundle;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import android.view.TextureView;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.pedro.encoder.input.video.CameraOpenException;
import com.pedro.rtpstreamer.R;
import com.pedro.rtplibrary.rtsp.RtspCamera2;
import com.pedro.rtplibrary.view.AutoFitTextureView;
import com.pedro.rtpstreamer.utils.PathUtils;
import com.pedro.rtsp.utils.ConnectCheckerRtsp;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * More documentation see:
 * {@link com.pedro.rtplibrary.base.Camera2Base}
 * {@link com.pedro.rtplibrary.rtsp.RtspCamera2}
 */
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class TextureModeRtspActivity extends AppCompatActivity
    implements ConnectCheckerRtsp, View.OnClickListener, TextureView.SurfaceTextureListener {

  private RtspCamera2 rtspCamera2;
  private AutoFitTextureView textureView;
  private Button button;
  private Button bRecord;
  private EditText etUrl;

  private String currentDateAndTime = "";
  private File folder;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    setContentView(R.layout.activity_texture_mode);
    folder = PathUtils.getRecordPath();
    textureView = findViewById(R.id.textureView);
    button = findViewById(R.id.b_start_stop);
    button.setOnClickListener(this);
    bRecord = findViewById(R.id.b_record);
    bRecord.setOnClickListener(this);
    Button switchCamera = findViewById(R.id.switch_camera);
    switchCamera.setOnClickListener(this);
    etUrl = findViewById(R.id.et_rtp_url);
    etUrl.setHint(R.string.hint_rtsp);
    rtspCamera2 = new RtspCamera2(textureView, this);
    textureView.setSurfaceTextureListener(this);
  }

  @Override
  public void onConnectionStartedRtsp(@NotNull String rtspUrl) {
  }

  @Override
  public void onConnectionSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtspActivity.this, "Connection success", Toast.LENGTH_SHORT)
            .show();
      }
    });
  }

  @Override
  public void onConnectionFailedRtsp(final String reason) {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtspActivity.this, "Connection failed. " + reason,
            Toast.LENGTH_SHORT).show();
        rtspCamera2.stopStream();
        button.setText(R.string.start_button);
      }
    });
  }

  @Override
  public void onNewBitrateRtsp(long bitrate) {

  }

  @Override
  public void onDisconnectRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtspActivity.this, "Disconnected", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthErrorRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtspActivity.this, "Auth error", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onAuthSuccessRtsp() {
    runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Toast.makeText(TextureModeRtspActivity.this, "Auth success", Toast.LENGTH_SHORT).show();
      }
    });
  }

  @Override
  public void onClick(View view) {
    switch (view.getId()) {
      case R.id.b_start_stop:
        if (!rtspCamera2.isStreaming()) {
          if (rtspCamera2.isRecording()
              || rtspCamera2.prepareAudio() && rtspCamera2.prepareVideo()) {
            button.setText(R.string.stop_button);
            rtspCamera2.startStream(etUrl.getText().toString());
          } else {
            Toast.makeText(this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT).show();
          }
        } else {
          button.setText(R.string.start_button);
          rtspCamera2.stopStream();
        }
        break;
      case R.id.switch_camera:
        try {
          rtspCamera2.switchCamera();
        } catch (CameraOpenException e) {
          Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
        break;
      case R.id.b_record:
        if (!rtspCamera2.isRecording()) {
          try {
            if (!folder.exists()) {
              folder.mkdir();
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            currentDateAndTime = sdf.format(new Date());
            if (!rtspCamera2.isStreaming()) {
              if (rtspCamera2.prepareAudio() && rtspCamera2.prepareVideo()) {
                rtspCamera2.startRecord(
                    folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
                bRecord.setText(R.string.stop_record);
                Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
              } else {
                Toast.makeText(this, "Error preparing stream, This device cant do it",
                    Toast.LENGTH_SHORT).show();
              }
            } else {
              rtspCamera2.startRecord(folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
              bRecord.setText(R.string.stop_record);
              Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show();
            }
          } catch (IOException e) {
            rtspCamera2.stopRecord();
            PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
            bRecord.setText(R.string.start_record);
            Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        } else {
          rtspCamera2.stopRecord();
          PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
          bRecord.setText(R.string.start_record);
          Toast.makeText(this,
              "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
              Toast.LENGTH_SHORT).show();
          currentDateAndTime = "";
        }
        break;
      default:
        break;
    }
  }

  @Override
  public void onSurfaceTextureAvailable(SurfaceTexture surfaceTexture, int i, int i1) {
    textureView.setAspectRatio(480, 640);
  }

  @Override
  public void onSurfaceTextureSizeChanged(SurfaceTexture surfaceTexture, int i, int i1) {
    rtspCamera2.startPreview();
  }

  @Override
  public boolean onSurfaceTextureDestroyed(SurfaceTexture surfaceTexture) {
    if (rtspCamera2.isRecording()) {
      rtspCamera2.stopRecord();
      PathUtils.updateGallery(this, folder.getAbsolutePath() + "/" + currentDateAndTime + ".mp4");
      bRecord.setText(R.string.start_record);
      Toast.makeText(this,
          "file " + currentDateAndTime + ".mp4 saved in " + folder.getAbsolutePath(),
          Toast.LENGTH_SHORT).show();
      currentDateAndTime = "";
    }
    if (rtspCamera2.isStreaming()) {
      rtspCamera2.stopStream();
      button.setText(getResources().getString(R.string.start_button));
    }
    rtspCamera2.stopPreview();
    return true;
  }

  @Override
  public void onSurfaceTextureUpdated(SurfaceTexture surfaceTexture) {

  }

  @Override
  public void onPointerCaptureChanged(boolean hasCapture) {

  }
}
```

**(v). `ActivityLink.java`**

Create a file named `ActivityLink.java`


Here is the full code

```java


package com.pedro.rtpstreamer.utils;

import android.content.Intent;

public class ActivityLink {
  private final int minSdk;
  private final String label;
  private final Intent intent;

  public ActivityLink(Intent intent, String label, int minSdk) {
    this.intent = intent;
    this.label = label;
    this.minSdk = minSdk;
  }

  public String getLabel() {
    return label;
  }

  public Intent getIntent() {
    return intent;
  }

  public int getMinSdk() {
    return minSdk;
  }
}
```

**(w). `ImageAdapter.java`**

Create a file named `ImageAdapter.java`


Here is the full code

```java


package com.pedro.rtpstreamer.utils;

import android.content.res.Resources;
import androidx.core.content.res.ResourcesCompat;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.TextView;
import com.pedro.rtpstreamer.R;
import java.util.List;

import static android.view.ViewGroup.LayoutParams.MATCH_PARENT;
import static android.view.ViewGroup.LayoutParams.WRAP_CONTENT;

public class ImageAdapter extends BaseAdapter {

  private List<ActivityLink> links;

  public ImageAdapter(List<ActivityLink> links) {
    this.links = links;
  }

  public int getCount() {
    return links.size();
  }

  public ActivityLink getItem(int position) {
    return links.get(position);
  }

  public long getItemId(int position) {
    return position;
  }

  @Override
  public View getView(int position, View convertView, ViewGroup parent) {
    TextView button;
    Resources resources = parent.getResources();
    float fontSize = resources.getDimension(R.dimen.menu_font);
    int paddingH = resources.getDimensionPixelSize(R.dimen.grid_2);
    int paddingV = resources.getDimensionPixelSize(R.dimen.grid_5);
    if (convertView == null) {
      button = new TextView(parent.getContext());
      button.setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);
      button.setTextColor(ResourcesCompat.getColor(resources, R.color.white, null));
      button.setBackgroundColor(ResourcesCompat.getColor(resources, R.color.appColor, null));
      button.setLayoutParams(new GridView.LayoutParams(MATCH_PARENT, WRAP_CONTENT));
      button.setPadding(paddingH, paddingV, paddingH, paddingV);
      button.setGravity(Gravity.CENTER);
      convertView = button;
    } else {
      button = (TextView) convertView;
    }
    button.setText(links.get(position).getLabel());
    return convertView;
  }
}
```

**(x). `PathUtils.java`**

Create a file named `PathUtils.java`


Here is the full code

```java


package com.pedro.rtpstreamer.utils;

import android.content.ContentUris;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;

import java.io.File;

/**
 * Created by pedro on 21/06/17.
 * Get absolute path from onActivityResult
 * https://stackoverflow.com/questions/33295300/how-to-get-absolute-path-in-android-for-file
 */

public class PathUtils {

  public static File getRecordPath() {
    File storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES);
    return new File(storageDir.getAbsolutePath() + "/rtmp-rtsp-stream-client-java");
  }

  public static String getPath(final Context context, final Uri uri) {

    // DocumentProvider
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && DocumentsContract.isDocumentUri(
        context, uri)) {

      if (isExternalStorageDocument(uri)) {// ExternalStorageProvider
        final String docId = DocumentsContract.getDocumentId(uri);
        final String[] split = docId.split(":");
        final String type = split[0];
        String storageDefinition;

        if ("primary".equalsIgnoreCase(type)) {

          return Environment.getExternalStorageDirectory() + "/" + split[1];
        } else {

          if (Environment.isExternalStorageRemovable()) {
            storageDefinition = "EXTERNAL_STORAGE";
          } else {
            storageDefinition = "SECONDARY_STORAGE";
          }

          return System.getenv(storageDefinition) + "/" + split[1];
        }
      } else if (isDownloadsDocument(uri)) {// DownloadsProvider

        final String id = DocumentsContract.getDocumentId(uri);
        final Uri contentUri =
            ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"),
                Long.valueOf(id));

        return getDataColumn(context, contentUri, null, null);
      } else if (isMediaDocument(uri)) {// MediaProvider
        final String docId = DocumentsContract.getDocumentId(uri);
        final String[] split = docId.split(":");
        final String type = split[0];

        Uri contentUri = null;
        if ("image".equals(type)) {
          contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        } else if ("video".equals(type)) {
          contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
        } else if ("audio".equals(type)) {
          contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        }

        final String selection = "_id=?";
        final String[] selectionArgs = new String[] {
            split[1]
        };

        return getDataColumn(context, contentUri, selection, selectionArgs);
      }
    } else if ("content".equalsIgnoreCase(uri.getScheme())) {// MediaStore (and general)

      // Return the remote address
      if (isGooglePhotosUri(uri)) return uri.getLastPathSegment();

      return getDataColumn(context, uri, null, null);
    } else if ("file".equalsIgnoreCase(uri.getScheme())) {// File
      return uri.getPath();
    }

    return null;
  }

  private static String getDataColumn(Context context, Uri uri, String selection,
      String[] selectionArgs) {

    Cursor cursor = null;
    final String column = "_data";
    final String[] projection = {
        column
    };

    try {
      cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs, null);
      if (cursor != null && cursor.moveToFirst()) {
        final int column_index = cursor.getColumnIndexOrThrow(column);
        return cursor.getString(column_index);
      }
    } finally {
      if (cursor != null) cursor.close();
    }
    return null;
  }

  private static boolean isExternalStorageDocument(Uri uri) {
    return "com.android.externalstorage.documents".equals(uri.getAuthority());
  }

  private static boolean isDownloadsDocument(Uri uri) {
    return "com.android.providers.downloads.documents".equals(uri.getAuthority());
  }

  private static boolean isMediaDocument(Uri uri) {
    return "com.android.providers.media.documents".equals(uri.getAuthority());
  }

  private static boolean isGooglePhotosUri(Uri uri) {
    return "com.google.android.apps.photos.content".equals(uri.getAuthority());
  }

  public static void updateGallery(Context context, String path) {
    context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(path))));
  }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java/archive/refs/heads/master.zip) code or Browse [here](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java).
2. [Follow](https://github.com/pedroSG94/) code author.


