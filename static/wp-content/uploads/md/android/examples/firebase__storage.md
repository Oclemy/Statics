# Firebase Cloud Storage Quickstart

Learn about Cloud Storage for Firebase using this example.

Here is the screenshot of what is created:

![Firebase Cloud Storage Tutorial](https://github.com/firebase/quickstart-android/raw/master/storage/app/src/screen.png)


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 10 dependencies:

1. Our `Internal` library.
2. Our `Firebase-bom` library.
3. Our `Com.google.firebase` library.
4. Our `Activity-ktx` library.
5. Our `Appcompat` library.
6. Our `Material` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

check.dependsOn 'assembleDebugAndroidTest'

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.firebase.quickstart.firebasestorage"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Cloud Storage for Firebase (Java)
    implementation 'com.google.firebase:firebase-storage'

    // Cloud Storage for Firebase (Kotlin)
    implementation 'com.google.firebase:firebase-storage-ktx'

    // Firebase Authentication (Java)
    implementation 'com.google.firebase:firebase-auth'

    // Firebase Authentication (Kotlin)
    implementation 'com.google.firebase:firebase-auth-ktx'

    implementation 'androidx.activity:activity-ktx:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'com.google.android.material:material:1.6.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test.espresso:espresso-intents:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `WRITE_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.quickstart.firebasestorage">

    <!-- Used only for testing purposes, not required for Firebase Storage -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".java.MainActivity"
            android:launchMode="singleTask">
        </activity>

        <activity
            android:name=".kotlin.MainActivity"
            android:launchMode="singleTask">
        </activity>

        <service
            android:name=".java.MyDownloadService"
            android:exported="false"/>

        <service
            android:name=".java.MyUploadService"
            android:exported="false" />

        <service
            android:name=".kotlin.MyDownloadService"
            android:exported="false"/>

        <service
            android:name=".kotlin.MyUploadService"
            android:exported="false" />

    </application>

</manifest>

```
#### Step 4. Create XML

Create a directory known as `xml` inside your `res` directory and add the following xml file:


**(a). `file_paths.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-path name="external" path="photos/" />
</paths>

```
#### Step 5. Create Menus

Create a directory known as `menu` inside your `res` directory and add the following menu files:


**(a). `menu_main.xml`**


Inside your `/res/menu/` directory create a menu resource file named `menu_main.xml` and add menu items as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item android:id="@+id/action_logout"
        android:title="@string/log_out"
        app:showAsAction="never" />
</menu>

```
#### Step 6. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following 6 UI widgets and ViewGroups:

1. `ScrollView`
2. `LinearLayout`
3. `ProgressBar`
4. `TextView`
5. `ImageView`
6. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:fillViewport="true"
    android:scrollbars="vertical"
    tools:context="com.google.firebase.quickstart.firebasestorage.java.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:orientation="vertical">

        <ProgressBar
            android:id="@+id/progressBar"
            android:indeterminate="true"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="invisible"
            style="?android:attr/progressBarStyleHorizontal"/>

        <TextView
            android:id="@+id/caption"
            android:textAlignment="center"
            android:textColor="@color/colorAccent"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal" />

        <ImageView
            android:id="@+id/firebaseLogo"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:layout_marginBottom="@dimen/margin_2"
            android:src="@drawable/firebase_lockup_400" />

        <LinearLayout
            android:id="@+id/layoutSignin"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            tools:visibility="gone">

            <TextView
                android:id="@+id/statusSignIn"
                style="@style/TextAppearance.AppCompat.Medium"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginBottom="@dimen/margin_1"
                android:text="@string/sign_in_prompt" />

            <Button
                android:id="@+id/buttonSignIn"
                android:layout_width="@dimen/standard_field_width"
                android:layout_height="wrap_content"
                android:text="@string/sign_in_anonymously" />

        </LinearLayout>

        <LinearLayout
            android:id="@+id/layoutStorage"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:visibility="gone"
            tools:visibility="visible">

            <TextView
                style="@style/TextAppearance.AppCompat.Medium"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginBottom="@dimen/margin_1"
                android:text="@string/take_photo_prompt" />

            <Button
                android:id="@+id/buttonCamera"
                android:layout_width="@dimen/standard_field_width"
                android:layout_height="wrap_content"
                android:text="@string/camera_button_text" />

        </LinearLayout>

        <LinearLayout
            android:id="@+id/layoutDownload"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:visibility="gone"
            tools:visibility="visible">

            <TextView
                style="@style/TextAppearance.AppCompat.Medium"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginBottom="@dimen/margin_1"
                android:layout_marginTop="@dimen/margin_2"
                android:text="@string/label_link" />

            <TextView
                android:id="@+id/pictureDownloadUri"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:autoLink="web"
                tools:text="http://www.example.com/?id=UAOJNVKBMQUGPYZKCQZRZKJEXRCRXMRSMFBZBMBODWUSVTDXJCPJMYOKQQBODSGPYHPZUR" />

            <TextView
                style="@style/TextAppearance.AppCompat.Medium"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginBottom="@dimen/margin_1"
                android:layout_marginTop="@dimen/margin_2"
                android:text="@string/label_download" />

            <Button
                android:id="@+id/buttonDownload"
                android:layout_width="@dimen/standard_field_width"
                android:layout_height="wrap_content"
                android:text="@string/download" />
        </LinearLayout>

    </LinearLayout>

</ScrollView>

```
#### Step 7. Write Code

Finally we need to write our code as follows:

**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`. Next create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Storage quickstart written in Java.",
                        Intent(this, com.google.firebase.quickstart.firebasestorage.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase In App Messaging quickstart written in Kotlin.",
                        Intent(this, com.google.firebase.quickstart.firebasestorage.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `MyUploadService.kt`**

> Our `MyUploadService` class.

Create a Kotlin file named `MyUploadService.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.
2. `IntentFilter` from the `android.content` package.
3. `Uri` from the `android.net` package.
4. `Build` from the `android.os` package.
5. `IBinder` from the `android.os` package.
6. `Log` from the `android.util` package.
7. `LocalBroadcastManager` from the `androidx.localbroadcastmanager.content` package.

Next create a class that derives from `MyBaseTaskService` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate() `.
2. `onBind(intent: Intent): IBinder? `.
3. `onStartCommand(intent: Intent, flags: Int, startId: Int): Int `.

We will be creating the following methods:

1. `uploadFromUri(parameter)` - This function will take a `Uri` object as a parameter.
2. `broadcastUploadFinished(downloadUrl: Uri?, fileUri: Uri?): Boolean `.
3. `showUploadFinishedNotification(downloadUrl: Uri?, fileUri: Uri?) `.

**(a). Our `showUploadFinishedNotification()` function**

Write the `showUploadFinishedNotification()` function as follows:

```kotlin
    private fun showUploadFinishedNotification(downloadUrl: Uri?, fileUri: Uri?) {
        // Hide the progress notification
        dismissProgressNotification()

        // Make Intent to MainActivity
        val intent = Intent(this, MainActivity::class.java)
                .putExtra(EXTRA_DOWNLOAD_URL, downloadUrl)
                .putExtra(EXTRA_FILE_URI, fileUri)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)

        val success = downloadUrl != null
        val caption = if (success) getString(R.string.upload_success) else getString(R.string.upload_failure)
        showFinishedNotification(caption, intent, success)
    }
```

**(b). Our `uploadFromUri()` function**

Write the `uploadFromUri()` function as follows:

```kotlin
    private fun uploadFromUri(fileUri: Uri) {
        Log.d(TAG, "uploadFromUri:src:$fileUri")

        // [START_EXCLUDE]
        taskStarted()
        showProgressNotification(getString(R.string.progress_uploading), 0, 0)
        // [END_EXCLUDE]

        // [START get_child_ref]
        // Get a reference to store file at photos/<FILENAME>.jpg
        fileUri.lastPathSegment?.let {
            val photoRef = storageRef.child("photos")
                    .child(it)
            // [END get_child_ref]

            // Upload file to Firebase Storage
            Log.d(TAG, "uploadFromUri:dst:" + photoRef.path)
            photoRef.putFile(fileUri).addOnProgressListener { (bytesTransferred, totalByteCount) ->
                showProgressNotification(getString(R.string.progress_uploading),
                        bytesTransferred,
                        totalByteCount)
            }.continueWithTask { task ->
                // Forward any exceptions
                if (!task.isSuccessful) {
                    throw task.exception!!
                }

                Log.d(TAG, "uploadFromUri: upload success")

                // Request the public download URL
                photoRef.downloadUrl
            }.addOnSuccessListener { downloadUri ->
                // Upload succeeded
                Log.d(TAG, "uploadFromUri: getDownloadUri success")

                // [START_EXCLUDE]
                broadcastUploadFinished(downloadUri, fileUri)
                showUploadFinishedNotification(downloadUri, fileUri)
                taskCompleted()
                // [END_EXCLUDE]
            }.addOnFailureListener { exception ->
                // Upload failed
                Log.w(TAG, "uploadFromUri:onFailure", exception)

                // [START_EXCLUDE]
                broadcastUploadFinished(null, fileUri)
                showUploadFinishedNotification(null, fileUri)
                taskCompleted()
                // [END_EXCLUDE]
            }
        }
    }
```

**(c). Our `broadcastUploadFinished()` function**

Write the `broadcastUploadFinished()` function as follows:

```kotlin
    private fun broadcastUploadFinished(downloadUrl: Uri?, fileUri: Uri?): Boolean {
        val success = downloadUrl != null

        val action = if (success) UPLOAD_COMPLETED else UPLOAD_ERROR

        val broadcast = Intent(action)
                .putExtra(EXTRA_DOWNLOAD_URL, downloadUrl)
                .putExtra(EXTRA_FILE_URI, fileUri)
        return LocalBroadcastManager.getInstance(applicationContext)
                .sendBroadcast(broadcast)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.firebasestorage.R
import com.google.firebase.storage.StorageReference
import com.google.firebase.storage.ktx.component1
import com.google.firebase.storage.ktx.component2
import com.google.firebase.storage.ktx.storage

/**
 * Service to handle uploading files to Firebase Storage.
 */
class MyUploadService : MyBaseTaskService() {

    // [START declare_ref]
    private lateinit var storageRef: StorageReference
    // [END declare_ref]

    override fun onCreate() {
        super.onCreate()

        // [START get_storage_ref]
        storageRef = Firebase.storage.reference
        // [END get_storage_ref]
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        Log.d(TAG, "onStartCommand:$intent:$startId")
        if (ACTION_UPLOAD == intent.action) {
            val fileUri = intent.getParcelableExtra<Uri>(EXTRA_FILE_URI)!!

            // Make sure we have permission to read the data
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                contentResolver.takePersistableUriPermission(
                        fileUri,
                        Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }

            uploadFromUri(fileUri)
        }

        return START_REDELIVER_INTENT
    }

    // [START upload_from_uri]
    private fun uploadFromUri(fileUri: Uri) {
        Log.d(TAG, "uploadFromUri:src:$fileUri")

        // [START_EXCLUDE]
        taskStarted()
        showProgressNotification(getString(R.string.progress_uploading), 0, 0)
        // [END_EXCLUDE]

        // [START get_child_ref]
        // Get a reference to store file at photos/<FILENAME>.jpg
        fileUri.lastPathSegment?.let {
            val photoRef = storageRef.child("photos")
                    .child(it)
            // [END get_child_ref]

            // Upload file to Firebase Storage
            Log.d(TAG, "uploadFromUri:dst:" + photoRef.path)
            photoRef.putFile(fileUri).addOnProgressListener { (bytesTransferred, totalByteCount) ->
                showProgressNotification(getString(R.string.progress_uploading),
                        bytesTransferred,
                        totalByteCount)
            }.continueWithTask { task ->
                // Forward any exceptions
                if (!task.isSuccessful) {
                    throw task.exception!!
                }

                Log.d(TAG, "uploadFromUri: upload success")

                // Request the public download URL
                photoRef.downloadUrl
            }.addOnSuccessListener { downloadUri ->
                // Upload succeeded
                Log.d(TAG, "uploadFromUri: getDownloadUri success")

                // [START_EXCLUDE]
                broadcastUploadFinished(downloadUri, fileUri)
                showUploadFinishedNotification(downloadUri, fileUri)
                taskCompleted()
                // [END_EXCLUDE]
            }.addOnFailureListener { exception ->
                // Upload failed
                Log.w(TAG, "uploadFromUri:onFailure", exception)

                // [START_EXCLUDE]
                broadcastUploadFinished(null, fileUri)
                showUploadFinishedNotification(null, fileUri)
                taskCompleted()
                // [END_EXCLUDE]
            }
        }
    }
    // [END upload_from_uri]

    /**
     * Broadcast finished upload (success or failure).
     * @return true if a running receiver received the broadcast.
     */
    private fun broadcastUploadFinished(downloadUrl: Uri?, fileUri: Uri?): Boolean {
        val success = downloadUrl != null

        val action = if (success) UPLOAD_COMPLETED else UPLOAD_ERROR

        val broadcast = Intent(action)
                .putExtra(EXTRA_DOWNLOAD_URL, downloadUrl)
                .putExtra(EXTRA_FILE_URI, fileUri)
        return LocalBroadcastManager.getInstance(applicationContext)
                .sendBroadcast(broadcast)
    }

    /**
     * Show a notification for a finished upload.
     */
    private fun showUploadFinishedNotification(downloadUrl: Uri?, fileUri: Uri?) {
        // Hide the progress notification
        dismissProgressNotification()

        // Make Intent to MainActivity
        val intent = Intent(this, MainActivity::class.java)
                .putExtra(EXTRA_DOWNLOAD_URL, downloadUrl)
                .putExtra(EXTRA_FILE_URI, fileUri)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)

        val success = downloadUrl != null
        val caption = if (success) getString(R.string.upload_success) else getString(R.string.upload_failure)
        showFinishedNotification(caption, intent, success)
    }

    companion object {

        private const val TAG = "MyUploadService"

        /** Intent Actions  */
        const val ACTION_UPLOAD = "action_upload"
        const val UPLOAD_COMPLETED = "upload_completed"
        const val UPLOAD_ERROR = "upload_error"

        /** Intent Extras  */
        const val EXTRA_FILE_URI = "extra_file_uri"
        const val EXTRA_DOWNLOAD_URL = "extra_download_url"

        val intentFilter: IntentFilter
            get() {
                val filter = IntentFilter()
                filter.addAction(UPLOAD_COMPLETED)
                filter.addAction(UPLOAD_ERROR)

                return filter
            }
    }
}


```

**(c). `MyDownloadService.kt`**

> Our `MyDownloadService` class.

Create a Kotlin file named `MyDownloadService.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Service` from the `android.app` package.
2. `Intent` from the `android.content` package.
3. `IntentFilter` from the `android.content` package.
4. `IBinder` from the `android.os` package.
5. `Log` from the `android.util` package.
6. `LocalBroadcastManager` from the `androidx.localbroadcastmanager.content` package.

Next create a class that derives from `MyBaseTaskService` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate() `.
2. `onBind(intent: Intent): IBinder? `.
3. `onStartCommand(intent: Intent, flags: Int, startId: Int): Int `.

We will be creating the following methods:

1. `downloadFromPath(parameter)` - Pass to this method a `String` object as a parameter.
2. `broadcastDownloadFinished(downloadPath: String, bytesDownloaded: Long): Boolean `.
3. `showDownloadFinishedNotification(downloadPath: String, bytesDownloaded: Int) `.

**(a). Our `broadcastDownloadFinished()` function**

Write the `broadcastDownloadFinished()` function as follows:

```kotlin
    private fun broadcastDownloadFinished(downloadPath: String, bytesDownloaded: Long): Boolean {
        val success = bytesDownloaded != -1L
        val action = if (success) DOWNLOAD_COMPLETED else DOWNLOAD_ERROR

        val broadcast = Intent(action)
                .putExtra(EXTRA_DOWNLOAD_PATH, downloadPath)
                .putExtra(EXTRA_BYTES_DOWNLOADED, bytesDownloaded)
        return LocalBroadcastManager.getInstance(applicationContext)
                .sendBroadcast(broadcast)
    }
```

**(b). Our `downloadFromPath()` function**

Write the `downloadFromPath()` function as follows:

```kotlin
    private fun downloadFromPath(downloadPath: String) {
        Log.d(TAG, "downloadFromPath:$downloadPath")

        // Mark task started
        taskStarted()
        showProgressNotification(getString(R.string.progress_downloading), 0, 0)

        // Download and get total bytes
        storageRef.child(downloadPath).getStream { (_, totalBytes), inputStream ->
            var bytesDownloaded: Long = 0

            val buffer = ByteArray(1024)
            var size: Int = inputStream.read(buffer)

            while (size != -1) {
                bytesDownloaded += size.toLong()
                showProgressNotification(getString(R.string.progress_downloading),
                        bytesDownloaded, totalBytes)

                size = inputStream.read(buffer)
            }

            // Close the stream at the end of the Task
            inputStream.close()
        }.addOnSuccessListener { (_, totalBytes) ->
            Log.d(TAG, "download:SUCCESS")

            // Send success broadcast with number of bytes downloaded
            broadcastDownloadFinished(downloadPath, totalBytes)
            showDownloadFinishedNotification(downloadPath, totalBytes.toInt())

            // Mark task completed
            taskCompleted()
        }.addOnFailureListener { exception ->
            Log.w(TAG, "download:FAILURE", exception)

            // Send failure broadcast
            broadcastDownloadFinished(downloadPath, -1)
            showDownloadFinishedNotification(downloadPath, -1)

            // Mark task completed
            taskCompleted()
        }
    }
```

**(c). Our `showDownloadFinishedNotification()` function**

Write the `showDownloadFinishedNotification()` function as follows:

```kotlin
    private fun showDownloadFinishedNotification(downloadPath: String, bytesDownloaded: Int) {
        // Hide the progress notification
        dismissProgressNotification()

        // Make Intent to MainActivity
        val intent = Intent(this, MainActivity::class.java)
                .putExtra(EXTRA_DOWNLOAD_PATH, downloadPath)
                .putExtra(EXTRA_BYTES_DOWNLOADED, bytesDownloaded)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)

        val success = bytesDownloaded != -1
        val caption = if (success) {
            getString(R.string.download_success)
        } else {
            getString(R.string.download_failure)
        }

        showFinishedNotification(caption, intent, true)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Service
import android.content.Intent
import android.content.IntentFilter
import android.os.IBinder
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.firebasestorage.R
import com.google.firebase.storage.StorageReference
import com.google.firebase.storage.ktx.component1
import com.google.firebase.storage.ktx.component2
import com.google.firebase.storage.ktx.storage

class MyDownloadService : MyBaseTaskService() {

    private lateinit var storageRef: StorageReference

    override fun onCreate() {
        super.onCreate()

        // Initialize Storage
        storageRef = Firebase.storage.reference
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        Log.d(TAG, "onStartCommand:$intent:$startId")

        if (ACTION_DOWNLOAD == intent.action) {
            // Get the path to download from the intent
            val downloadPath = intent.getStringExtra(EXTRA_DOWNLOAD_PATH)!!
            downloadFromPath(downloadPath)
        }

        return Service.START_REDELIVER_INTENT
    }

    private fun downloadFromPath(downloadPath: String) {
        Log.d(TAG, "downloadFromPath:$downloadPath")

        // Mark task started
        taskStarted()
        showProgressNotification(getString(R.string.progress_downloading), 0, 0)

        // Download and get total bytes
        storageRef.child(downloadPath).getStream { (_, totalBytes), inputStream ->
            var bytesDownloaded: Long = 0

            val buffer = ByteArray(1024)
            var size: Int = inputStream.read(buffer)

            while (size != -1) {
                bytesDownloaded += size.toLong()
                showProgressNotification(getString(R.string.progress_downloading),
                        bytesDownloaded, totalBytes)

                size = inputStream.read(buffer)
            }

            // Close the stream at the end of the Task
            inputStream.close()
        }.addOnSuccessListener { (_, totalBytes) ->
            Log.d(TAG, "download:SUCCESS")

            // Send success broadcast with number of bytes downloaded
            broadcastDownloadFinished(downloadPath, totalBytes)
            showDownloadFinishedNotification(downloadPath, totalBytes.toInt())

            // Mark task completed
            taskCompleted()
        }.addOnFailureListener { exception ->
            Log.w(TAG, "download:FAILURE", exception)

            // Send failure broadcast
            broadcastDownloadFinished(downloadPath, -1)
            showDownloadFinishedNotification(downloadPath, -1)

            // Mark task completed
            taskCompleted()
        }
    }

    /**
     * Broadcast finished download (success or failure).
     * @return true if a running receiver received the broadcast.
     */
    private fun broadcastDownloadFinished(downloadPath: String, bytesDownloaded: Long): Boolean {
        val success = bytesDownloaded != -1L
        val action = if (success) DOWNLOAD_COMPLETED else DOWNLOAD_ERROR

        val broadcast = Intent(action)
                .putExtra(EXTRA_DOWNLOAD_PATH, downloadPath)
                .putExtra(EXTRA_BYTES_DOWNLOADED, bytesDownloaded)
        return LocalBroadcastManager.getInstance(applicationContext)
                .sendBroadcast(broadcast)
    }

    /**
     * Show a notification for a finished download.
     */
    private fun showDownloadFinishedNotification(downloadPath: String, bytesDownloaded: Int) {
        // Hide the progress notification
        dismissProgressNotification()

        // Make Intent to MainActivity
        val intent = Intent(this, MainActivity::class.java)
                .putExtra(EXTRA_DOWNLOAD_PATH, downloadPath)
                .putExtra(EXTRA_BYTES_DOWNLOADED, bytesDownloaded)
                .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP)

        val success = bytesDownloaded != -1
        val caption = if (success) {
            getString(R.string.download_success)
        } else {
            getString(R.string.download_failure)
        }

        showFinishedNotification(caption, intent, true)
    }

    companion object {

        private const val TAG = "Storage#DownloadService"

        /** Actions  */
        const val ACTION_DOWNLOAD = "action_download"
        const val DOWNLOAD_COMPLETED = "download_completed"
        const val DOWNLOAD_ERROR = "download_error"

        /** Extras  */
        const val EXTRA_DOWNLOAD_PATH = "extra_download_path"
        const val EXTRA_BYTES_DOWNLOADED = "extra_bytes_downloaded"

        val intentFilter: IntentFilter
            get() {
                val filter = IntentFilter()
                filter.addAction(DOWNLOAD_COMPLETED)
                filter.addAction(DOWNLOAD_ERROR)

                return filter
            }
    }
}


```

**(d). `MyBaseTaskService.kt`**

> Our `MyBaseTaskService` class.

Create a Kotlin file named `MyBaseTaskService.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `NotificationChannel` from the `android.app` package.
2. `NotificationManager` from the `android.app` package.
3. `PendingIntent` from the `android.app` package.
4. `Service` from the `android.app` package.
5. `Context` from the `android.content` package.
6. `Intent` from the `android.content` package.
7. `Build` from the `android.os` package.
8. `NotificationCompat` from the `androidx.core.app` package.
9. `Log` from the `android.util` package.

Next create a class that derives from `Service` and add its contents as follows:

We will be creating the following methods:

1. `taskStarted() `.
2. `taskCompleted() `.
3. `changeNumberOfTasks(parameter)` - Let's pass a `Int` object as a parameter.
4. `createDefaultChannel() `.
5. `showProgressNotification(caption: String, completedUnits: Long, totalUnits: Long) `.
6. `showFinishedNotification(caption: String, intent: Intent, success: Boolean) `.
7. `dismissProgressNotification() `.

**(a). Our `changeNumberOfTasks()` function**

Write the `changeNumberOfTasks()` function as follows:

```kotlin
    private fun changeNumberOfTasks(delta: Int) {
        Log.d(TAG, "changeNumberOfTasks:$numTasks:$delta")
        numTasks += delta

        // If there are no tasks left, stop the service
        if (numTasks <= 0) {
            Log.d(TAG, "stopping")
            stopSelf()
        }
    }
```

**(b). Our `taskCompleted()` function**

Write the `taskCompleted()` function as follows:

```kotlin
    fun taskCompleted() {
        changeNumberOfTasks(-1)
    }
```

**(c). Our `createDefaultChannel()` function**

Write the `createDefaultChannel()` function as follows:

```kotlin
    private fun createDefaultChannel() {
        // Since android Oreo notification channel is needed.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID_DEFAULT,
                    "Default",
                    NotificationManager.IMPORTANCE_DEFAULT)
            manager.createNotificationChannel(channel)
        }
    }
```

**(d). Our `showFinishedNotification()` function**

Write the `showFinishedNotification()` function as follows:

```kotlin
    protected fun showFinishedNotification(caption: String, intent: Intent, success: Boolean) {
        // Make PendingIntent for notification
        val pendingIntent = PendingIntent.getActivity(this, 0 /* requestCode */, intent,
                PendingIntent.FLAG_UPDATE_CURRENT)

        val icon = if (success) R.drawable.ic_check_white_24 else R.drawable.ic_error_white_24dp

        createDefaultChannel()
        val builder = NotificationCompat.Builder(this, CHANNEL_ID_DEFAULT)
                .setSmallIcon(icon)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(caption)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)

        manager.notify(FINISHED_NOTIFICATION_ID, builder.build())
    }
```

**(e). Our `taskStarted()` function**

Write the `taskStarted()` function as follows:

```kotlin
    fun taskStarted() {
        changeNumberOfTasks(1)
    }
```

**(f). Our `showProgressNotification()` function**

Write the `showProgressNotification()` function as follows:

```kotlin
    protected fun showProgressNotification(caption: String, completedUnits: Long, totalUnits: Long) {
        var percentComplete = 0
        if (totalUnits > 0) {
            percentComplete = (100 * completedUnits / totalUnits).toInt()
        }

        createDefaultChannel()
        val builder = NotificationCompat.Builder(this, CHANNEL_ID_DEFAULT)
                .setSmallIcon(R.drawable.ic_file_upload_white_24dp)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(caption)
                .setProgress(100, percentComplete, false)
                .setOngoing(true)
                .setAutoCancel(false)

        manager.notify(PROGRESS_NOTIFICATION_ID, builder.build())
    }
```

**(g). Our `dismissProgressNotification()` function**

Write the `dismissProgressNotification()` function as follows:

```kotlin
    protected fun dismissProgressNotification() {
        manager.cancel(PROGRESS_NOTIFICATION_ID)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import android.util.Log
import com.google.firebase.quickstart.firebasestorage.R

/**
 * Base class for Services that keep track of the number of active jobs and self-stop when the
 * count is zero.
 */
abstract class MyBaseTaskService : Service() {

    private var numTasks = 0

    private val manager by lazy {
        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    }

    fun taskStarted() {
        changeNumberOfTasks(1)
    }

    fun taskCompleted() {
        changeNumberOfTasks(-1)
    }

    @Synchronized
    private fun changeNumberOfTasks(delta: Int) {
        Log.d(TAG, "changeNumberOfTasks:$numTasks:$delta")
        numTasks += delta

        // If there are no tasks left, stop the service
        if (numTasks <= 0) {
            Log.d(TAG, "stopping")
            stopSelf()
        }
    }

    private fun createDefaultChannel() {
        // Since android Oreo notification channel is needed.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID_DEFAULT,
                    "Default",
                    NotificationManager.IMPORTANCE_DEFAULT)
            manager.createNotificationChannel(channel)
        }
    }

    /**
     * Show notification with a progress bar.
     */
    protected fun showProgressNotification(caption: String, completedUnits: Long, totalUnits: Long) {
        var percentComplete = 0
        if (totalUnits > 0) {
            percentComplete = (100 * completedUnits / totalUnits).toInt()
        }

        createDefaultChannel()
        val builder = NotificationCompat.Builder(this, CHANNEL_ID_DEFAULT)
                .setSmallIcon(R.drawable.ic_file_upload_white_24dp)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(caption)
                .setProgress(100, percentComplete, false)
                .setOngoing(true)
                .setAutoCancel(false)

        manager.notify(PROGRESS_NOTIFICATION_ID, builder.build())
    }

    /**
     * Show notification that the activity finished.
     */
    protected fun showFinishedNotification(caption: String, intent: Intent, success: Boolean) {
        // Make PendingIntent for notification
        val pendingIntent = PendingIntent.getActivity(this, 0 /* requestCode */, intent,
                PendingIntent.FLAG_UPDATE_CURRENT)

        val icon = if (success) R.drawable.ic_check_white_24 else R.drawable.ic_error_white_24dp

        createDefaultChannel()
        val builder = NotificationCompat.Builder(this, CHANNEL_ID_DEFAULT)
                .setSmallIcon(icon)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(caption)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)

        manager.notify(FINISHED_NOTIFICATION_ID, builder.build())
    }

    /**
     * Dismiss the progress notification.
     */
    protected fun dismissProgressNotification() {
        manager.cancel(PROGRESS_NOTIFICATION_ID)
    }

    companion object {

        private const val CHANNEL_ID_DEFAULT = "default"

        internal const val PROGRESS_NOTIFICATION_ID = 0
        internal const val FINISHED_NOTIFICATION_ID = 1

        private const val TAG = "MyBaseTaskService"
    }
}


```

**(e). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `BroadcastReceiver` from the `android.content` package.
2. `Context` from the `android.content` package.
3. `Intent` from the `android.content` package.
4. `Uri` from the `android.net` package.
5. `Bundle` from the `android.os` package.
6. `Log` from the `android.util` package.
7. `Menu` from the `android.view` package.
8. `MenuItem` from the `android.view` package.
9. `View` from the `android.view` package.
10. `ActivityResultContracts` from the `androidx.activity.result.contract` package.
11. `AlertDialog` from the `androidx.appcompat.app` package.
12. `AppCompatActivity` from the `androidx.appcompat.app` package.
13. `LocalBroadcastManager` from the `androidx.localbroadcastmanager.content` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onReceive(context: Context, intent: Intent) `.
3. `onCreateOptionsMenu(menu: Menu): Boolean `.
4. `onOptionsItemSelected(item: MenuItem): Boolean `.
5. `onClick(v: View) `.

We will be creating the following methods:

1. `onNewIntent(parameter)` - This function will take a `Intent` object as a parameter.
2. `onStart() `.
3. `onStop() `.
4. `onSaveInstanceState(parameter)` - This function will take a `Bundle` object as a parameter.
5. `uploadFromUri(parameter)` - This function will take a `Uri` object as a parameter.
6. `beginDownload() `.
7. `launchCamera() `.
8. `signInAnonymously() `.
9. `onUploadResultIntent(parameter)` - This function will take a `Intent` object as a parameter.
10. `updateUI(parameter)` - Pass to this method a `FirebaseUser?` object as a parameter.
11. `showMessageDialog(title: String, message: String) `.
12. `showProgressBar(parameter)` - Let's pass a `String` object as a parameter.
13. `hideProgressBar() `.

**(a). Our `beginDownload()` function**

Write the `beginDownload()` function as follows:

```kotlin
    private fun beginDownload() {
        fileUri?.let {
            // Get path
            val path = "photos/" + it.lastPathSegment

            // Kick off MyDownloadService to download the file
            val intent = Intent(this, MyDownloadService::class.java)
                    .putExtra(MyDownloadService.EXTRA_DOWNLOAD_PATH, path)
                    .setAction(MyDownloadService.ACTION_DOWNLOAD)
            startService(intent)

            // Show loading spinner
            showProgressBar(getString(R.string.progress_downloading))
        }
    }
```

**(b). Our `hideProgressBar()` function**

Write the `hideProgressBar()` function as follows:

```kotlin
    private fun hideProgressBar() {
        with(binding) {
            caption.text = ""
            progressBar.visibility = View.INVISIBLE
        }
    }
```

**(c). Our `showMessageDialog()` function**

Write the `showMessageDialog()` function as follows:

```kotlin
    private fun showMessageDialog(title: String, message: String) {
        val ad = AlertDialog.Builder(this)
                .setTitle(title)
                .setMessage(message)
                .create()
        ad.show()
    }
```

**(d). Our `onStart()` function**

Write the `onStart()` function as follows:

```kotlin
    public override fun onStart() {
        super.onStart()
        updateUI(auth.currentUser)

        // Register receiver for uploads and downloads
        val manager = LocalBroadcastManager.getInstance(this)
        manager.registerReceiver(broadcastReceiver, MyDownloadService.intentFilter)
        manager.registerReceiver(broadcastReceiver, MyUploadService.intentFilter)
    }
```

**(e). Our `onSaveInstanceState()` function**

Write the `onSaveInstanceState()` function as follows:

```kotlin
    public override fun onSaveInstanceState(out: Bundle) {
        super.onSaveInstanceState(out)
        out.putParcelable(KEY_FILE_URI, fileUri)
        out.putParcelable(KEY_DOWNLOAD_URL, downloadUrl)
    }
```

**(f). Our `uploadFromUri()` function**

Write the `uploadFromUri()` function as follows:

```kotlin
    private fun uploadFromUri(uploadUri: Uri) {
        Log.d(TAG, "uploadFromUri:src: $uploadUri")

        // Save the File URI
        fileUri = uploadUri

        // Clear the last download, if any
        updateUI(auth.currentUser)
        downloadUrl = null

        // Start MyUploadService to upload the file, so that the file is uploaded
        // even if this Activity is killed or put in the background
        startService(Intent(this, MyUploadService::class.java)
                .putExtra(MyUploadService.EXTRA_FILE_URI, uploadUri)
                .setAction(MyUploadService.ACTION_UPLOAD))

        // Show loading spinner
        showProgressBar(getString(R.string.progress_uploading))
    }
```

**(g). Our `updateUI()` function**

Write the `updateUI()` function as follows:

```kotlin
    private fun updateUI(user: FirebaseUser?) {
        with(binding) {
            // Signed in or Signed out
            if (user != null) {
                layoutSignin.visibility = View.GONE
                layoutStorage.visibility = View.VISIBLE
            } else {
                layoutSignin.visibility = View.VISIBLE
                layoutStorage.visibility = View.GONE
            }

            // Download URL and Download button
            if (downloadUrl != null) {
                pictureDownloadUri.text = downloadUrl.toString()
                layoutDownload.visibility = View.VISIBLE
            } else {
                pictureDownloadUri.text = null
                layoutDownload.visibility = View.GONE
            }
        }
    }
```

**(h). Our `onStop()` function**

Write the `onStop()` function as follows:

```kotlin
    public override fun onStop() {
        super.onStop()

        // Unregister download receiver
        LocalBroadcastManager.getInstance(this).unregisterReceiver(broadcastReceiver)
    }
```

**(i). Our `onUploadResultIntent()` function**

Write the `onUploadResultIntent()` function as follows:

```kotlin
    private fun onUploadResultIntent(intent: Intent) {
        // Got a new intent from MyUploadService with a success or failure
        downloadUrl = intent.getParcelableExtra(MyUploadService.EXTRA_DOWNLOAD_URL)
        fileUri = intent.getParcelableExtra(MyUploadService.EXTRA_FILE_URI)

        updateUI(auth.currentUser)
    }
```

**(j). Our `launchCamera()` function**

Write the `launchCamera()` function as follows:

```kotlin
    private fun launchCamera() {
        Log.d(TAG, "launchCamera")

        // Pick an image from storage
        val intentLauncher = registerForActivityResult(ActivityResultContracts.OpenDocument()) { fileUri ->
            if (fileUri != null) {
                uploadFromUri(fileUri)
            } else {
                Log.w(TAG, "File URI is null")
            }
        }
        intentLauncher.launch(arrayOf("image/*"))
    }
```

**(k). Our `signInAnonymously()` function**

Write the `signInAnonymously()` function as follows:

```kotlin
    private fun signInAnonymously() {
        // Sign in anonymously. Authentication is required to read or write from Firebase Storage.
        showProgressBar(getString(R.string.progress_auth))
        auth.signInAnonymously()
                .addOnSuccessListener(this) { authResult ->
                    Log.d(TAG, "signInAnonymously:SUCCESS")
                    hideProgressBar()
                    updateUI(authResult.user)
                }
                .addOnFailureListener(this) { exception ->
                    Log.e(TAG, "signInAnonymously:FAILURE", exception)
                    hideProgressBar()
                    updateUI(null)
                }
    }
```

**(m). Our `onNewIntent()` function**

Write the `onNewIntent()` function as follows:

```kotlin
    public override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)

        // Check if this Activity was launched by clicking on an upload notification
        if (intent.hasExtra(MyUploadService.EXTRA_DOWNLOAD_URL)) {
            onUploadResultIntent(intent)
        }
    }
```

**(n). Our `showProgressBar()` function**

Write the `showProgressBar()` function as follows:

```kotlin
    private fun showProgressBar(progressCaption: String) {
        with(binding) {
            caption.text = progressCaption
            progressBar.visibility = View.VISIBLE
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.firebasestorage.R
import com.google.firebase.quickstart.firebasestorage.databinding.ActivityMainBinding
import java.util.Locale

/**
 * Activity to upload and download photos from Firebase Storage.
 *
 * See [MyUploadService] for upload example.
 * See [MyDownloadService] for download example.
 */
class MainActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var broadcastReceiver: BroadcastReceiver
    private lateinit var auth: FirebaseAuth

    private var downloadUrl: Uri? = null
    private var fileUri: Uri? = null

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize Firebase Auth
        auth = Firebase.auth

        // Click listeners
        with(binding) {
            buttonCamera.setOnClickListener(this@MainActivity)
            buttonSignIn.setOnClickListener(this@MainActivity)
            buttonDownload.setOnClickListener(this@MainActivity)
        }

        // Local broadcast receiver
        broadcastReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                Log.d(TAG, "onReceive:$intent")
                hideProgressBar()

                when (intent.action) {
                    MyDownloadService.DOWNLOAD_COMPLETED -> {
                        // Get number of bytes downloaded
                        val numBytes = intent.getLongExtra(MyDownloadService.EXTRA_BYTES_DOWNLOADED, 0)

                        // Alert success
                        showMessageDialog(getString(R.string.success), String.format(Locale.getDefault(),
                                "%d bytes downloaded from %s",
                                numBytes,
                                intent.getStringExtra(MyDownloadService.EXTRA_DOWNLOAD_PATH)))
                    }
                    MyDownloadService.DOWNLOAD_ERROR ->
                        // Alert failure
                        showMessageDialog("Error", String.format(Locale.getDefault(),
                                "Failed to download from %s",
                                intent.getStringExtra(MyDownloadService.EXTRA_DOWNLOAD_PATH)))
                    MyUploadService.UPLOAD_COMPLETED, MyUploadService.UPLOAD_ERROR -> onUploadResultIntent(intent)
                }
            }
        }

        // Restore instance state
        savedInstanceState?.let {
            fileUri = it.getParcelable(KEY_FILE_URI)
            downloadUrl = it.getParcelable(KEY_DOWNLOAD_URL)
        }
        onNewIntent(intent)
    }

    public override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)

        // Check if this Activity was launched by clicking on an upload notification
        if (intent.hasExtra(MyUploadService.EXTRA_DOWNLOAD_URL)) {
            onUploadResultIntent(intent)
        }
    }

    public override fun onStart() {
        super.onStart()
        updateUI(auth.currentUser)

        // Register receiver for uploads and downloads
        val manager = LocalBroadcastManager.getInstance(this)
        manager.registerReceiver(broadcastReceiver, MyDownloadService.intentFilter)
        manager.registerReceiver(broadcastReceiver, MyUploadService.intentFilter)
    }

    public override fun onStop() {
        super.onStop()

        // Unregister download receiver
        LocalBroadcastManager.getInstance(this).unregisterReceiver(broadcastReceiver)
    }

    public override fun onSaveInstanceState(out: Bundle) {
        super.onSaveInstanceState(out)
        out.putParcelable(KEY_FILE_URI, fileUri)
        out.putParcelable(KEY_DOWNLOAD_URL, downloadUrl)
    }

    private fun uploadFromUri(uploadUri: Uri) {
        Log.d(TAG, "uploadFromUri:src: $uploadUri")

        // Save the File URI
        fileUri = uploadUri

        // Clear the last download, if any
        updateUI(auth.currentUser)
        downloadUrl = null

        // Start MyUploadService to upload the file, so that the file is uploaded
        // even if this Activity is killed or put in the background
        startService(Intent(this, MyUploadService::class.java)
                .putExtra(MyUploadService.EXTRA_FILE_URI, uploadUri)
                .setAction(MyUploadService.ACTION_UPLOAD))

        // Show loading spinner
        showProgressBar(getString(R.string.progress_uploading))
    }

    private fun beginDownload() {
        fileUri?.let {
            // Get path
            val path = "photos/" + it.lastPathSegment

            // Kick off MyDownloadService to download the file
            val intent = Intent(this, MyDownloadService::class.java)
                    .putExtra(MyDownloadService.EXTRA_DOWNLOAD_PATH, path)
                    .setAction(MyDownloadService.ACTION_DOWNLOAD)
            startService(intent)

            // Show loading spinner
            showProgressBar(getString(R.string.progress_downloading))
        }
    }

    private fun launchCamera() {
        Log.d(TAG, "launchCamera")

        // Pick an image from storage
        val intentLauncher = registerForActivityResult(ActivityResultContracts.OpenDocument()) { fileUri ->
            if (fileUri != null) {
                uploadFromUri(fileUri)
            } else {
                Log.w(TAG, "File URI is null")
            }
        }
        intentLauncher.launch(arrayOf("image/*"))
    }

    private fun signInAnonymously() {
        // Sign in anonymously. Authentication is required to read or write from Firebase Storage.
        showProgressBar(getString(R.string.progress_auth))
        auth.signInAnonymously()
                .addOnSuccessListener(this) { authResult ->
                    Log.d(TAG, "signInAnonymously:SUCCESS")
                    hideProgressBar()
                    updateUI(authResult.user)
                }
                .addOnFailureListener(this) { exception ->
                    Log.e(TAG, "signInAnonymously:FAILURE", exception)
                    hideProgressBar()
                    updateUI(null)
                }
    }

    private fun onUploadResultIntent(intent: Intent) {
        // Got a new intent from MyUploadService with a success or failure
        downloadUrl = intent.getParcelableExtra(MyUploadService.EXTRA_DOWNLOAD_URL)
        fileUri = intent.getParcelableExtra(MyUploadService.EXTRA_FILE_URI)

        updateUI(auth.currentUser)
    }

    private fun updateUI(user: FirebaseUser?) {
        with(binding) {
            // Signed in or Signed out
            if (user != null) {
                layoutSignin.visibility = View.GONE
                layoutStorage.visibility = View.VISIBLE
            } else {
                layoutSignin.visibility = View.VISIBLE
                layoutStorage.visibility = View.GONE
            }

            // Download URL and Download button
            if (downloadUrl != null) {
                pictureDownloadUri.text = downloadUrl.toString()
                layoutDownload.visibility = View.VISIBLE
            } else {
                pictureDownloadUri.text = null
                layoutDownload.visibility = View.GONE
            }
        }
    }

    private fun showMessageDialog(title: String, message: String) {
        val ad = AlertDialog.Builder(this)
                .setTitle(title)
                .setMessage(message)
                .create()
        ad.show()
    }

    private fun showProgressBar(progressCaption: String) {
        with(binding) {
            caption.text = progressCaption
            progressBar.visibility = View.VISIBLE
        }
    }

    private fun hideProgressBar() {
        with(binding) {
            caption.text = ""
            progressBar.visibility = View.INVISIBLE
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val i = item.itemId
        return if (i == R.id.action_logout) {
            FirebaseAuth.getInstance().signOut()
            updateUI(null)
            true
        } else {
            super.onOptionsItemSelected(item)
        }
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.buttonCamera -> launchCamera()
            R.id.buttonSignIn -> signInAnonymously()
            R.id.buttonDownload -> beginDownload()
        }
    }

    companion object {

        private const val TAG = "Storage#MainActivity"

        private const val KEY_FILE_URI = "key_file_uri"
        private const val KEY_DOWNLOAD_URL = "key_download_url"
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/storage/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
