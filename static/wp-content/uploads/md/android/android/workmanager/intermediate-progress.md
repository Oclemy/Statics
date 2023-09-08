# Observing intermediate Worker progress

WorkManager `2.3.0-alpha01` adds first-class support for setting and observing intermediate progress for workers. If the worker was running while the app was in the foreground, this information can also be shown to the user using APIs which return the `LiveData` of `WorkInfo`.

`ListenableWorker` now supports the `setProgressAsync()`) API, which allows it to persist intermediate progress. These APIs allow developers to set intermediate progress that can be observed by the UI. Progress is represented by the `Data` type, which is a serializable container of properties (similar to `input` and `output`, and subject to the same restrictions).

Progress information can only be observed and updated while the `ListenableWorker` is running. Attempts to set progress on a `ListenableWorker` after it has completed its execution are ignored. You can also observe progress information by using the one of the `getWorkInfoBy…()` or `getWorkInfoBy…LiveData()`) methods. These methods return instances of `WorkInfo`, which has a new `getProgress()`) method that returns `Data`.

Updating Progress
-----------------

For Java developers using a `ListenableWorker` or a `Worker`, the `setProgressAsync()`) API returns a `ListenableFuture<Void>`; updating progress is asynchronous, given that the update process involves storing progress information in a database. In Kotlin, you can use the `CoroutineWorker` object's `setProgress()` extension function to update progress information.

This example shows a simple `ProgressWorker`. The `Worker` sets its progress to 0 when it starts, and upon completion updates the progress value to 100.

### Kotlin

```kotlin
import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.Data
import androidx.work.WorkerParameters
import kotlinx.coroutines.delay

class ProgressWorker(context: Context, parameters: WorkerParameters) :
    CoroutineWorker(context, parameters) {

    companion object {
        const val Progress = "Progress"
        private const val delayDuration = 1L
    }

    override suspend fun doWork(): Result {
        val firstUpdate = workDataOf(Progress to 0)
        val lastUpdate = workDataOf(Progress to 100)
        setProgress(firstUpdate)
        delay(delayDuration)
        setProgress(lastUpdate)
        return Result.success()
    }
}
```

### Java

```java
import android.content.Context;
import androidx.annotation.NonNull;
import androidx.work.Data;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class ProgressWorker extends Worker {

    private static final String PROGRESS = "PROGRESS";
    private static final long DELAY = 1000L;

    public ProgressWorker(
        @NonNull Context context,
        @NonNull WorkerParameters parameters) {
        super(context, parameters);
        // Set initial progress to 0
        setProgressAsync(new Data.Builder().putInt(PROGRESS, 0).build());
    }

    @NonNull
    @Override
    public Result doWork() {
        try {
            // Doing work.
            Thread.sleep(DELAY);
        } catch (InterruptedException exception) {
            // ... handle exception
        }
        // Set progress to 100 after you are done doing your work.
        setProgressAsync(new Data.Builder().putInt(PROGRESS, 100).build());
        return Result.success();
    }
}
```

Observing Progress
------------------

Observing progress information is also simple. You can use the `getWorkInfoBy…()` or `getWorkInfoBy…LiveData()`) methods, and get a reference to `WorkInfo`.

Here is an example which uses the `getWorkInfoByIdLiveData` API.

### Kotlin

```kotlin
WorkManager.getInstance(applicationContext)
    // requestId is the WorkRequest id
    .getWorkInfoByIdLiveData(requestId)
    .observe(observer, Observer { workInfo: WorkInfo? ->
            if (workInfo != null) {
                val progress = workInfo.progress
                val value = progress.getInt(Progress, 0)
                // Do something with progress information
            }
    })
```

### Java

```java
WorkManager.getInstance(getApplicationContext())
     // requestId is the WorkRequest id
     .getWorkInfoByIdLiveData(requestId)
     .observe(lifecycleOwner, new Observer<WorkInfo>() {
             @Override
             public void onChanged(@Nullable WorkInfo workInfo) {
                 if (workInfo != null) {
                     Data progress = workInfo.getProgress();
                     int value = progress.getInt(PROGRESS, 0)
                     // Do something with progress
             }
      }
});
```

For more documentation on observing `Worker` objects, read Work States and observing work.