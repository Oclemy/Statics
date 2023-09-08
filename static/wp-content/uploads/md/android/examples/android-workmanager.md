# WorkManager Example


In this tutorial we will explore WorkManager, what it is as well as some examples. The WorkManager API makes it easy to schedule deferrable, asynchronous tasks that must be run reliably. These APIs let you create a task and hand it off to WorkManager to run when the work constraints are met.

> [WorkManager](https://developer.android.com/reference/androidx/work/WorkManager) is an API that makes it easy to schedule [reliable, asynchronous tasks](#reliable) that are expected to run even if the app exits or the device restarts.

It replaces previous Android background scheduling APIs like FirebaseJobDispatcher, GcmNetworkManager and Job Scheduler.


WorkManager supports API 14+ and is more battery friendly. Let's look at some examples.

## Example 1: Kotlin Simple WorkManager Example with Coroutines

Follow the following steps:

### Step 1: Install WorkManager

In you app levelbuild.gradle install workmanager by adding it as a gradle dependency using the following implementation statement:

```groovy
    implementation 'androidx.work:work-runtime-ktx:2.5.0'
```

Then sync for it to be installed in your project.

### Step 2: Create a ForegroundWorker

Create a class called ForegroundWorker and add extend the CoroutineWorker,passing in the context and WorkerParameters as arguments to the class:

```kotlin
class ForegroundWorker(context: Context, parameters: WorkerParameters) :
    CoroutineWorker(context, parameters) {
```

Prepare a notification manager as an instance of this class:

```kotlin
    private val notificationManager =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
```

Override the `doWork()` function:

```kotlin
    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        setForeground(createForegroundInfo())
        return@withContext runCatching {
            runTask()
            Result.success()
        }.getOrElse {
            Result.failure()
        }
    }
```

Define a function that creates a notification channel:

```kotlin
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createChannel(id: String, channelName: String) {
        notificationManager.createNotificationChannel(
            NotificationChannel(id, channelName, NotificationManager.IMPORTANCE_DEFAULT)
        )
    }
```

Create Foregroundinfo:

```kotlin
    //Creates notifications for service
    private fun createForegroundInfo(): ForegroundInfo {
        val id = "1225"
        val channelName = "Downloads Notification"
        val title = "Downloading"
        val cancel = "Cancel"
        val body = "Long running task is running"

        val intent = WorkManager.getInstance(applicationContext)
            .createCancelPendingIntent(getId())

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createChannel(id, channelName)
        }

        val notification = NotificationCompat.Builder(applicationContext, id)
            .setContentTitle(title)
            .setTicker(title)
            .setContentText(body)
            .setSmallIcon(R.drawable.ic_notification)
            .setOngoing(true)
            .addAction(android.R.drawable.ic_delete, cancel, intent)
            .build()

        return ForegroundInfo(1, notification)
    }
```

Create a function to represent the task to be performed:

```kotlin
    //Fake long running task for 60 seconds
    private suspend fun runTask() {
        delay(60000)
    }
```

Now override the doWork() function and invoke the above functions:

```kotlin
    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        setForeground(createForegroundInfo())
        return@withContext runCatching {
            runTask()
            Result.success()
        }.getOrElse {
            Result.failure()
        }
    }
```

Here's the full code for the class:

**ForegroundWorker.kt**

```kotlin
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import androidx.work.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext

class ForegroundWorker(context: Context, parameters: WorkerParameters) :
    CoroutineWorker(context, parameters) {

    private val notificationManager =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        setForeground(createForegroundInfo())
        return@withContext runCatching {
            runTask()
            Result.success()
        }.getOrElse {
            Result.failure()
        }
    }

    //Fake long running task for 60 seconds
    private suspend fun runTask() {
        delay(60000)
    }

    //Creates notifications for service
    private fun createForegroundInfo(): ForegroundInfo {
        val id = "1225"
        val channelName = "Downloads Notification"
        val title = "Downloading"
        val cancel = "Cancel"
        val body = "Long running task is running"

        val intent = WorkManager.getInstance(applicationContext)
            .createCancelPendingIntent(getId())

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createChannel(id, channelName)
        }

        val notification = NotificationCompat.Builder(applicationContext, id)
            .setContentTitle(title)
            .setTicker(title)
            .setContentText(body)
            .setSmallIcon(R.drawable.ic_notification)
            .setOngoing(true)
            .addAction(android.R.drawable.ic_delete, cancel, intent)
            .build()

        return ForegroundInfo(1, notification)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun createChannel(id: String, channelName: String) {
        notificationManager.createNotificationChannel(
            NotificationChannel(id, channelName, NotificationManager.IMPORTANCE_DEFAULT)
        )
    }
}
```

### Step 3: Schedule work using WorkManager

In your main activity instantiate the workmanager using the `getInstance()` method, passing in the context:

```kotlin
WorkManager.getInstance(this)
```

Then begin enqueue work and observer its state:

```kotlin
.beginUniqueWork("ForegroundWorker", ExistingWorkPolicy.APPEND_OR_REPLACE,
            OneTimeWorkRequest.from(ForegroundWorker::class.java)).enqueue().state
            .observe(this) { state ->
                Log.d(TAG, "ForegroundWorker: $state")
            }
```

Here's the full code:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.core.content.ContextCompat
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        WorkManager.getInstance(this)
            .beginUniqueWork("ForegroundWorker", ExistingWorkPolicy.APPEND_OR_REPLACE,
            OneTimeWorkRequest.from(ForegroundWorker::class.java)).enqueue().state
            .observe(this) { state ->
                Log.d(TAG, "ForegroundWorker: $state")
            }
    }
}
```

### Reference

Find code reference below:

| No. | Link |
| --- | --- |
| 1. | Download Code [here](https://github.com/iambaljeet/ForegroundWorkManager/archive/refs/heads/master.zip) |
| 2. | Browse code [here](https://github.com/iambaljeet/ForegroundWorkManager/) |
| 3. | Follow Code Author [here](https://github.com/iambaljeet) |

## Example 2: Kotlin Android WorkManager + Pending Notification Example

This app will demonstrate workmanager and pending notification usage. Here are the features of the app created:

1. Backwards compatible up to API 14
2. Uses JobScheduler on devices with API 23+
3. Uses a combination of BroadcastReceiver + 4. AlarmManager on devices with API 14-22
4. Add work constraints like network availability or charging status
5. Schedule asynchronous one-off or periodic tasks
6. Monitor and manage scheduled tasks
7. Chain tasks together
8. Ensures task execution, even if the app or device restarts
9. Adheres to power-saving features like Doze mode

Here is the demo of what is created:

![Kotlin ANdroid WorkManager Example](https://camo.githubusercontent.com/908ca0665490a081efc955ad5c63c38271ea7265ba1bff5675795ade885da133/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d514c7664594250325367552f58654b76386a6f6d6e34492f41414141414141414835732f4e707642744451625536454d427a4c48394b48534b684451316656334641614d51434b38424741735948672f73302f323031392d31312d33302e6a7067)

![Kotlin Android WorkManager with Pending notification](https://camo.githubusercontent.com/103e1df4d23254e47f516addf9d269752f9640bf9bd315441b08190be09700a3/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d44514e53712d436c776c6f2f58654b77576645453962492f41414141414141414835342f577a457179746c4274357376784b346f332d435632506c576b616d4951424c4851434b38424741735948672f73302f323031392d31312d33302e6a7067)

### Step 1: Dependencies

In your gradle script make sure you add the following dependency for workmanager:

```groovy
    implementation "androidx.work:work-runtime-ktx:2.2.0"
```

### Step 2: Design Layout

Now design your xml layout for the main activity as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="viewModel"
            type="com.mili.workmanagerandpendingnotification.MainViewModel" />

        <variable
            name="view"
            type="android.view.View" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical"
        android:padding="16dp"
        tools:context=".MainActivity">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:layout_margin="8dp"
            android:textColor="@android:color/black"
            android:text="Please enter time in minutes and minimum value should be 15 " />

        <com.google.android.material.textfield.TextInputLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="8dp"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.Dense">

            <com.google.android.material.textfield.TextInputEditText
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/et_periodic_time"
                android:inputType="number"
                android:text="@={viewModel.data}" />
        </com.google.android.material.textfield.TextInputLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btn_set_period_work"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:onClick="@{() -> viewModel.setPeriodicWorkButtonClicked()}"
            android:text="Set Periodic Work"
            android:layout_margin="8dp"
            android:visibility="@{viewModel.data.toString().length() > 0 ? (Integer.parseInt(viewModel.data.toString()) > 14 ? view.VISIBLE : view.GONE):view.GONE }" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="8dp"
            android:textColor="@android:color/black"
            android:text="OR" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:layout_margin="8dp"
            android:textColor="@android:color/black"
            android:text="Please Enter Description for one time work" />

        <com.google.android.material.textfield.TextInputLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="8dp"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.Dense">

            <com.google.android.material.textfield.TextInputEditText
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/et_one_time_work_description"
                android:text="@={viewModel.oneTimeWorkData}" />
        </com.google.android.material.textfield.TextInputLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btn_set_instant_work"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:onClick="@{() -> viewModel.setOneTimeWorkButtonClicked()}"
            android:text="Run One Time Work"
            android:layout_margin="8dp"
            android:visibility="@{viewModel.oneTimeWorkData.toString().length() > 0 ? view.VISIBLE : view.GONE }"
            />

    </LinearLayout>
</layout>
```

### Step 3: Create Constants

Create an object class called constants that will hold for us variables which don't change. For example, such variables may be used to represent channel IDs for periodic work or for one time work etc:

**Constants.kt**

```kotlin
object Constants {
    const val CHANNEL_ID_PERIOD_WORK = "PERIODIC_APP_UPDATES"
    const val CHANNEL_ID_ONE_TIME_WORK = "INSTANT_APP_UPDATES"
    const val ONETIME_WORK_DESCRIPTION = "ONETIME_WORK_DESCRIPTION"
    const val LAST_PERIODIC_TIME = "LAST_PERIODIC_TIME"
}
```

### Step 4: Create SharedPreference Helpers

These helpers will be used to save key/value pairs locally. This function for example writes to shared preferences:

```kotlin
    fun writeToSharedPreferences(context: Context, key: String, @NonNull value:String) {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = sharedPreferences.edit()
        editor.putString(key,value)
        editor.apply()
    }
```

While this one reads from it:

```kotlin
    fun readFromSharedPreferences(context: Context, key: String, @NonNull defaultValue:String) : String? {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        return sharedPreferences.getString(key,defaultValue)
    }
```

Here is the full class:

**SharedPrefHelpers.kt**

```kotlin
import android.content.Context
import android.preference.PreferenceManager
import androidx.annotation.NonNull

object SharedPrefHelpers {

    fun readFromSharedPreferences(context: Context, key: String, @NonNull defaultValue:String) : String? {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        return sharedPreferences.getString(key,defaultValue)
    }

    fun writeToSharedPreferences(context: Context, key: String, @NonNull value:String) {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = sharedPreferences.edit()
        editor.putString(key,value)
        editor.apply()
    }
}
```

### Step 5: Create a One Time Background Notification

Start by creating a class known as `OnetimeBackgroundNotification` and make it extend the `androidx.work.Worker` class:

```kotlin
class OnetimeBackgroundNotification(private val context: Context, private val workerParameters: WorkerParameters) : Worker(context,workerParameters) {
  //....
```

Inside the class create a function to show notification. The following function allows you to show notification:

```kotlin
    private fun showNotification() {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent = TaskStackBuilder.create(context).run {
            // Add the intent, which inflates the back stack
            addNextIntentWithParentStack(intent)
            // Get the PendingIntent containing the entire back stack
            getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT)
        }

        val notification = NotificationCompat.Builder(context, Constants.CHANNEL_ID_ONE_TIME_WORK).apply {
            setContentIntent(pendingIntent)
        }
        notification.setContentTitle("ONE TIME WORK")
        notification.setContentText(workerParameters.inputData.getString(ONETIME_WORK_DESCRIPTION))
        notification.priority = NotificationCompat.PRIORITY_HIGH
        notification.setCategory(NotificationCompat.CATEGORY_ALARM)
        notification.setSmallIcon(R.drawable.ic_notifications_none_blac)
        val sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
        notification.setSound(sound)
        val vibrate = longArrayOf(0, 100, 200, 300)
        notification.setVibrate(vibrate)

        with(NotificationManagerCompat.from(context)) {
            notify(2, notification.build())
        }
    }
```

Override the `doWork` function and invoke the `showNotification()` function:

```kotlin
    override fun doWork(): Result {
        showNotification()
        return Result.success()
    }
```

Here is the full class:

**OnetimeBackgroundNotification.kt**

```kotlin
import android.app.PendingIntent
import android.app.TaskStackBuilder
import android.content.Context
import android.content.Intent
import android.media.RingtoneManager
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.mili.workmanagerandpendingnotification.Constants.ONETIME_WORK_DESCRIPTION

class OnetimeBackgroundNotification(private val context: Context, private val workerParameters: WorkerParameters) : Worker(context,workerParameters) {
    override fun doWork(): Result {
        showNotification()
        return Result.success()
    }

    private fun showNotification() {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent = TaskStackBuilder.create(context).run {
            // Add the intent, which inflates the back stack
            addNextIntentWithParentStack(intent)
            // Get the PendingIntent containing the entire back stack
            getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT)
        }

        val notification = NotificationCompat.Builder(context, Constants.CHANNEL_ID_ONE_TIME_WORK).apply {
            setContentIntent(pendingIntent)
        }
        notification.setContentTitle("ONE TIME WORK")
        notification.setContentText(workerParameters.inputData.getString(ONETIME_WORK_DESCRIPTION))
        notification.priority = NotificationCompat.PRIORITY_HIGH
        notification.setCategory(NotificationCompat.CATEGORY_ALARM)
        notification.setSmallIcon(R.drawable.ic_notifications_none_blac)
        val sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
        notification.setSound(sound)
        val vibrate = longArrayOf(0, 100, 200, 300)
        notification.setVibrate(vibrate)

        with(NotificationManagerCompat.from(context)) {
            notify(2, notification.build())
        }
    }
}
```

### Step 6: Create Periodic Notifications

This time you create periodic notifications as opposed to one time notifications. You follow the above pattern: extend the `androidx.work.Worker`, create a function to show a notification, then invoke it inside the `dowWork()` method:

**PeriodicBackgroundNotification.kt**

```kotlin
import android.app.PendingIntent
import android.app.TaskStackBuilder
import android.content.Context
import android.content.Intent
import android.media.Ringtone
import android.media.RingtoneManager
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.mili.workmanagerandpendingnotification.Constants.CHANNEL_ID_PERIOD_WORK
import com.mili.workmanagerandpendingnotification.Constants.LAST_PERIODIC_TIME

class PeriodicBackgroundNotification(private val context: Context, workerParameters: WorkerParameters) : Worker(context, workerParameters) {
    override fun doWork(): Result {
        showNotification()
        return Result.success()
    }

    private fun showNotification() {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent = TaskStackBuilder.create(context).run {
            // Add the intent, which inflates the back stack
            addNextIntentWithParentStack(intent)
            // Get the PendingIntent containing the entire back stack
            getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT)
        }

        val notification = NotificationCompat.Builder(context, CHANNEL_ID_PERIOD_WORK).apply {
            setContentIntent(pendingIntent)
        }
        notification.setContentTitle("PERIOD WORK")
        notification.setContentText(SharedPrefHelpers.readFromSharedPreferences(context,
            LAST_PERIODIC_TIME,"0"))
        notification.priority = NotificationCompat.PRIORITY_HIGH
        notification.setCategory(NotificationCompat.CATEGORY_ALARM)
        notification.setSmallIcon(R.drawable.ic_notifications_none_blac)
        val sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
        notification.setSound(sound)
        val vibrate = longArrayOf(0, 100, 200, 300)
        notification.setVibrate(vibrate)

        with(NotificationManagerCompat.from(context)) {
            notify(1, notification.build())
        }
    }

}
```

### Step 7: Create a ViewModel

The next step is to create the viewmodel class for the main activity:

**MainViewModel.kt**

```kotlin
import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class MainViewModel(application: Application) : AndroidViewModel(application) {
    val data = MutableLiveData<String>()
    val oneTimeWorkData = MutableLiveData<String>()
    private val time = MutableLiveData<Int>()
    private val oneTimeWorkDescription = MutableLiveData<String>()

    fun setPeriodicWorkButtonClicked() {
        time.value = data.value?.toInt()
    }

    fun setPeriodWork() : LiveData<Int> {
        return time
    }

    fun setOneTimeWorkButtonClicked() {
        oneTimeWorkDescription.value = oneTimeWorkData.value
    }

    fun setOneTimeWork() : LiveData<String> {
        return oneTimeWorkDescription
    }
}
```

### Step 8: Create Application Class

Do this by extending the `android.app.Application` class:

```kotlin
class App() : Application() {
```

In it define a function to create a notification channel as follows:

```kotlin
    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channelPeriodic = NotificationChannel(CHANNEL_ID_PERIOD_WORK, "Period Work Request", importance)
            channelPeriodic.description = "Periodic Work"
            val channelInstant = NotificationChannel(CHANNEL_ID_ONE_TIME_WORK, "One Time Work Request", importance)
            channelInstant.description  = "One Time Work"
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            val notificationManager = applicationContext.getSystemService(
                NotificationManager::class.java
            )
            notificationManager!!.createNotificationChannel(channelPeriodic)
            notificationManager.createNotificationChannel(channelInstant)
        }
    }
```

Override the `onCreate()` method and invoke the `createNotificationChannel()` method:

```kotlin

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }
```

Here is the full code

**App.kt**

```kotlin
import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import com.mili.workmanagerandpendingnotification.Constants.CHANNEL_ID_ONE_TIME_WORK
import com.mili.workmanagerandpendingnotification.Constants.CHANNEL_ID_PERIOD_WORK

class App() : Application() {

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channelPeriodic = NotificationChannel(CHANNEL_ID_PERIOD_WORK, "Period Work Request", importance)
            channelPeriodic.description = "Periodic Work"
            val channelInstant = NotificationChannel(CHANNEL_ID_ONE_TIME_WORK, "One Time Work Request", importance)
            channelInstant.description  = "One Time Work"
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            val notificationManager = applicationContext.getSystemService(
                NotificationManager::class.java
            )
            notificationManager!!.createNotificationChannel(channelPeriodic)
            notificationManager.createNotificationChannel(channelInstant)
        }
    }
}
```

### Step 9: Create MainActivity

This is the laucher and only activity for this project. In this activity define a function that will observer changes for both One time work as well as the periodic work and report them to the UI:

```kotlin
    private fun observeChanges() {
        viewModel.setPeriodWork().observe(this , Observer {
            val periodWork = PeriodicWorkRequest.Builder(PeriodicBackgroundNotification::class.java,it.toLong(),TimeUnit.MINUTES)
                .addTag("periodic-pending-notification")
                .setConstraints(constraints)
                .build()
            SharedPrefHelpers.writeToSharedPreferences(this, LAST_PERIODIC_TIME, System.currentTimeMillis().toString())
            WorkManager.getInstance(this).enqueueUniquePeriodicWork("periodic-pending-notification", ExistingPeriodicWorkPolicy.KEEP, periodWork)
        })

        viewModel.setOneTimeWork().observe(this, Observer {
            val onetimeWork = OneTimeWorkRequest.Builder(OnetimeBackgroundNotification::class.java)
            onetimeWork.setConstraints(constraints)
            val data = Data.Builder()
            data.putString(ONETIME_WORK_DESCRIPTION,it)
            onetimeWork.setInputData(data.build())

            WorkManager.getInstance(this).enqueue(onetimeWork.build())
        })
    }
```

Here is the full activity:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.work.*
import com.mili.workmanagerandpendingnotification.Constants.LAST_PERIODIC_TIME
import com.mili.workmanagerandpendingnotification.Constants.ONETIME_WORK_DESCRIPTION
import com.mili.workmanagerandpendingnotification.databinding.ActivityMainBinding
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var viewModel: MainViewModel
    private val constraints = Constraints.Builder()
        .setRequiresBatteryNotLow(true)
        .build()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this,R.layout.activity_main)
        viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        binding.lifecycleOwner = this
        binding.viewModel = viewModel

        observeChanges()
    }

    private fun observeChanges() {
        viewModel.setPeriodWork().observe(this , Observer {
            val periodWork = PeriodicWorkRequest.Builder(PeriodicBackgroundNotification::class.java,it.toLong(),TimeUnit.MINUTES)
                .addTag("periodic-pending-notification")
                .setConstraints(constraints)
                .build()
            SharedPrefHelpers.writeToSharedPreferences(this, LAST_PERIODIC_TIME, System.currentTimeMillis().toString())
            WorkManager.getInstance(this).enqueueUniquePeriodicWork("periodic-pending-notification", ExistingPeriodicWorkPolicy.KEEP, periodWork)
        })

        viewModel.setOneTimeWork().observe(this, Observer {
            val onetimeWork = OneTimeWorkRequest.Builder(OnetimeBackgroundNotification::class.java)
            onetimeWork.setConstraints(constraints)
            val data = Data.Builder()
            data.putString(ONETIME_WORK_DESCRIPTION,it)
            onetimeWork.setInputData(data.build())

            WorkManager.getInstance(this).enqueue(onetimeWork.build())
        })
    }
}
```

### Run

Run the project.

### Reference

Find the download link below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/manoj-mili/workmanager-notification/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/manoj-mili/workmanager-notification/) code |
| 3. | [Download](https://github.com/manoj-mili/) code |
