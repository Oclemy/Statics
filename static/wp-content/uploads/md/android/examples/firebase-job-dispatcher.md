# Kotlin Android Firebase Job Dispatcher Example

Learn about Firebase Job Dispatcher using this step by step example.


### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Declare `firebase-jobdispatcher` as a dependency in your `app/build.gradle` file:

```groovy
    implementation "com.firebase:firebase-jobdispatcher:$firebaseJobDispatcherVer"
```

### Step 4: Create a Job Service

**MyJobService.kt**

```kotlin
import com.firebase.jobdispatcher.JobParameters
import com.firebase.jobdispatcher.JobService
import java.util.logging.Logger

class MyJobService : JobService() {

    companion object {
        val log = Logger.getLogger(MyJobService::class.java.name)
    }

    override fun onStopJob(job: JobParameters?): Boolean {
        log.info("Stopped Job")
        return false
    }

    override fun onStartJob(job: JobParameters?): Boolean {
        log.info("Started Job")
        return false
    }

}
```

### Step 5: Register the Service

Register the Job service in the `AndroidMainifest.xml` as shown:

```xml
        <service
            android:name=".MyJobService"
            android:exported="false">
            <intent-filter>
                <action android:name="com.firebase.jobdispatcher.ACTION_EXECUTE" />
            </intent-filter>
        </service>
```

### Step 6: Create MainActivity

Create your main activity as below:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.firebase.jobdispatcher.FirebaseJobDispatcher
import com.firebase.jobdispatcher.GooglePlayDriver
import com.firebase.jobdispatcher.Trigger

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val dispatcher = FirebaseJobDispatcher(GooglePlayDriver(this))
        val job = dispatcher.newJobBuilder()
                .setService(MyJobService::class.java)
                .setRecurring(true)
                //setTrigger(x,y)
                //x is know as windowStart, which is the earliest time (in seconds) the job should
                // be considered eligible to run. Calculated from when the job was scheduled (for new jobs)
                //y is known as windowEnd,
                // The latest time (in seconds) the job should be run in an ideal world. Calculated in the same way as windowStart.
                .setTrigger(Trigger.executionWindow(0, 60))
                .setTag("my_tag")
                .build()
        dispatcher.mustSchedule(job)

    }
}

```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/UsingFirebaseJobDispatcher) Example|
|2.|[Follow](https://github.com/amanjeetsingh150/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|


