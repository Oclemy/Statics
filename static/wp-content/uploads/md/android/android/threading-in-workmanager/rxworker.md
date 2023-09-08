# Threading in RxWorker

We provide interoperability between WorkManager and RxJava. To get started, include `work-rxjava3` dependency in addition to `work-runtime` in your gradle file. There is also a `work-rxjava2` dependency that supports rxjava2 instead.

Then, instead of extending `Worker`, you should extend`RxWorker`. Finally override the `RxWorker.createWork()`) method to return a `Single<Result>` indicating the `Result` of your execution, as follows:

### Kotlin

```kotlin
class RxDownloadWorker(
        context: Context,
        params: WorkerParameters
) : RxWorker(context, params) {
    override fun createWork(): Single<Result> {
        return Observable.range(0, 100)
                .flatMap { download("https://www.example.com") }
                .toList()
                .map { Result.success() }
    }
}
```

### Java

```java
public class RxDownloadWorker extends RxWorker {

    public RxDownloadWorker(Context context, WorkerParameters params) {
        super(context, params);
    }

    @NonNull
    @Override
    public Single<Result> createWork() {
        return Observable.range(0, 100)
            .flatMap { download("https://www.example.com") }
            .toList()
            .map { Result.success() };
    }
}
```

Note that `RxWorker.createWork()` is _called_ on the main thread, but the return value is _subscribed_ on a background thread by default. You can override `RxWorker.getBackgroundScheduler()`) to change the subscribing thread.

When an `RxWorker` is `onStopped()`, the subscription will get disposed of, so you don't need to handle work stoppages in any special way.