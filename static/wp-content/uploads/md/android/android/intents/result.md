# Getting a result from an activity

Starting another activity, whether one within your app or from another app, doesn't need to be a one-way operation. You can also start another activity and receive a result back. For example, your app can start a camera app and receive the captured photo as a result. Or, you might start the Contacts app in order for the user to select a contact and you'll receive the contact details as a result.

While the underlying `startActivityForResult()`) and `onActivityResult()`) APIs are available on the `Activity` class on all API levels, it is strongly recommended to use the Activity Result APIs introduced in AndroidX Activity and Fragment.

The Activity Result APIs provide components for registering for a result, launching the result, and handling the result once it is dispatched by the system.

Registering a callback for an Activity Result
---------------------------------------------

When starting an activity for a result, it is possible (and, in cases of memory-intensive operations such as camera usage, almost certain) that your process and your activity will be destroyed due to low memory.

For this reason, the Activity Result APIs decouple the result callback from the place in your code where you launch the other activity. As the result callback needs to be available when your process and activity are recreated, the callback must be unconditionally registered every time your activity is created, even if the logic of launching the other activity only happens based on user input or other business logic.

When in a `ComponentActivity` or a `Fragment`, the Activity Result APIs provide a `registerForActivityResult()`) API for registering the result callback. `registerForActivityResult()` takes an `ActivityResultContract` and an `ActivityResultCallback` and returns an `ActivityResultLauncher` which you’ll use to launch the other activity.

An `ActivityResultContract` defines the input type needed to produce a result along with the output type of the result. The APIs provide default contracts for basic intent actions like taking a picture, requesting permissions, and so on. You can also create your own custom contracts.

`ActivityResultCallback` is a single method interface with an `onActivityResult()`) method that takes an object of the output type defined in the `ActivityResultContract`:

### Kotlin

```kotlin
val getContent = registerForActivityResult(GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}
```

### Java

```java
// GetContent creates an ActivityResultLauncher<String> to allow you to pass
// in the mime type you'd like to allow the user to select
ActivityResultLauncher<String> mGetContent = registerForActivityResult(new GetContent(),
    new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
            // Handle the returned Uri
        }
});
```

If you have multiple activity result calls that either use different contracts or want separate callbacks, you can call `registerForActivityResult()` multiple times to register multiple `ActivityResultLauncher` instances. You must always call `registerForActivityResult()` in the same order for each creation of your fragment or activity to ensure that the inflight results are delivered to the correct callback.

`registerForActivityResult()` is safe to call before your fragment or activity is created, allowing it to be used directly when declaring member variables for the returned `ActivityResultLauncher` instances.

Launching an activity for result
--------------------------------

While `registerForActivityResult()` registers your callback, it does **not** launch the other activity and kick off the request for a result. Instead, this is the responsibility of the returned `ActivityResultLauncher` instance.

If input exists, the launcher takes the input that matches the type of the `ActivityResultContract`. Calling `launch()`) starts the process of producing the result. When the user is done with the subsequent activity and returns, the `onActivityResult()` from the `ActivityResultCallback` is then executed, as shown in the following example:

### Kotlin

```kotlin
val getContent = registerForActivityResult(GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}

override fun onCreate(savedInstanceState: Bundle?) {
    // ...

    val selectButton = findViewById<Button>(R.id.select_button)

    selectButton.setOnClickListener {
        // Pass in the mime type you'd like to allow the user to select
        // as the input
        getContent.launch("image/*")
    }
}
```

### Java

```java
ActivityResultLauncher<String> mGetContent = registerForActivityResult(new GetContent(),
    new ActivityResultCallback<Uri>() {
        @Override
        public void onActivityResult(Uri uri) {
            // Handle the returned Uri
        }
});

@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    // ...

    Button selectButton = findViewById(R.id.select_button);

    selectButton.setOnClickListener(new OnClickListener() {
        @Override
        public void onClick(View view) {
            // Pass in the mime type you'd like to allow the user to select
            // as the input
            mGetContent.launch("image/*");
        }
    });
}
```

An overloaded version of `launch()`) allows you to pass an `ActivityOptionsCompat` in addition to the input.

Receiving an activity result in a separate class
------------------------------------------------

While the `ComponentActivity` and `Fragment` classes implement the `ActivityResultCaller` interface to allow you to use the `registerForActivityResult()` APIs, you can also receive the activity result in a separate class that does not implement `ActivityResultCaller` by using `ActivityResultRegistry` directly.

For example, you might want to implement a `LifecycleObserver` that handles registering a contract along with launching the launcher:

### Kotlin

```kotlin
class MyLifecycleObserver(private val registry : ActivityResultRegistry)
        : DefaultLifecycleObserver {
    lateinit var getContent : ActivityResultLauncher<String>

    override fun onCreate(owner: LifecycleOwner) {
        getContent = registry.register("key", owner, GetContent()) { uri ->
            // Handle the returned Uri
        }
    }

    fun selectImage() {
        getContent.launch("image/*")
    }
}

class MyFragment : Fragment() {
    lateinit var observer : MyLifecycleObserver

    override fun onCreate(savedInstanceState: Bundle?) {
        // ...

        observer = MyLifecycleObserver(requireActivity().activityResultRegistry)
        lifecycle.addObserver(observer)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val selectButton = view.findViewById<Button>(R.id.select_button)

        selectButton.setOnClickListener {
            // Open the activity to select an image
            observer.selectImage()
        }
    }
}
```

### Java

```java
class MyLifecycleObserver implements DefaultLifecycleObserver {
    private final ActivityResultRegistry mRegistry;
    private ActivityResultLauncher<String> mGetContent;

    MyLifecycleObserver(@NonNull ActivityResultRegistry registry) {
        mRegistry = registry;
    }

    public void onCreate(@NonNull LifecycleOwner owner) {
        // ...

        mGetContent = mRegistry.register(“key”, owner, new GetContent(),
            new ActivityResultCallback<Uri>() {
                @Override
                public void onActivityResult(Uri uri) {
                    // Handle the returned Uri
                }
            });
    }

    public void selectImage() {
        // Open the activity to select an image
        mGetContent.launch("image/*");
    }
}

class MyFragment extends Fragment {
    private MyLifecycleObserver mObserver;

    @Override
    void onCreate(Bundle savedInstanceState) {
        // ...

        mObserver = new MyLifecycleObserver(requireActivity().getActivityResultRegistry());
        getLifecycle().addObserver(mObserver);
    }

    @Override
    void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Button selectButton = findViewById(R.id.select_button);
        selectButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                mObserver.selectImage();
            }
        });
    }
}
```

When using the `ActivityResultRegistry` APIs, it's strongly recommended to use the APIs that take a `LifecycleOwner`, as the `LifecycleOwner` automatically removes your registered launcher when the `Lifecycle` is destroyed. However, in cases where a `LifecycleOwner` is not available, each `ActivityResultLauncher` class allows you to manually call `unregister()`) as an alternative.

Testing
-------

By default, `registerForActivityResult()` automatically uses the `ActivityResultRegistry` provided by the activity. It also provides an overload that allows you to pass in your own instance of `ActivityResultRegistry` that can be used to test your activity result calls without actually launching another activity.

When Testing your app’s fragments, providing a test `ActivityResultRegistry` can be done by using a `FragmentFactory` to pass in the `ActivityResultRegistry` to the fragment’s constructor.

For example, a fragment that uses the `TakePicturePreview` contract to get a thumbnail of the image might be written similar to the following:

### Kotlin

```kotlin
class MyFragment(
    private val registry: ActivityResultRegistry
) : Fragment() {
    val thumbnailLiveData = MutableLiveData<Bitmap?>

    val takePicture = registerForActivityResult(TakePicturePreview(), registry) {
        bitmap: Bitmap? -> thumbnailLiveData.setValue(bitmap)
    }

    // ...
}
```

### Java

```java
public class MyFragment extends Fragment {
    private final ActivityResultRegistry mRegistry;
    private final MutableLiveData<Bitmap> mThumbnailLiveData = new MutableLiveData();
    private final ActivityResultLauncher<Void> mTakePicture =
        registerForActivityResult(new TakePicturePreview(), mRegistry, new ActivityResultCallback<Bitmap>() {
            @Override
            public void onActivityResult(Bitmap thumbnail) {
                mThumbnailLiveData.setValue(thumbnail);
            }
        });

    public MyFragment(@NonNull ActivityResultRegistry registry) {
        super();
        mRegistry = registry;
    }

    @VisibleForTesting
    @NonNull
    ActivityResultLauncher<Void> getTakePicture() {
        return mTakePicture;
    }

    @VisibleForTesting
    @NonNull
    LiveData<Bitmap> getThumbnailLiveData() {
        return mThumbnailLiveData;
    }

    // ...
}
```

When creating a test specific `ActivityResultRegistry`, you must implement the `onLaunch()`) method. Instead of calling `startActivityForResult()`, your test implementation can instead call `dispatchResult()`) directly, providing the exact results you want to use in your test:

```kotlin
    val testRegistry = object : ActivityResultRegistry() {
        override fun <I, O> onLaunch(
                requestCode: Int,
                contract: ActivityResultContract<I, O>,
                input: I,
                options: ActivityOptionsCompat?
        ) {
            dispatchResult(requestCode, expectedResult)
        }
    }
    
```

The complete test would create the expected result, construct a test `ActivityResultRegistry`, pass it to the fragment, trigger the launcher (be it directly or via other test APIs such as Espresso), and then verify the results:

```kotlin
    @Test
    fun activityResultTest {
        // Create an expected result Bitmap
        val expectedResult = Bitmap.createBitmap(1, 1, Bitmap.Config.RGBA_F16)
    
        // Create the test ActivityResultRegistry
        val testRegistry = object : ActivityResultRegistry() {
                override fun <I, O> onLaunch(
                requestCode: Int,
                contract: ActivityResultContract<I, O>,
                input: I,
                options: ActivityOptionsCompat?
            ) {
                dispatchResult(requestCode, expectedResult)
            }
        }
    
        // Use the launchFragmentInContainer method that takes a
        // lambda to construct the Fragment with the testRegistry
        with(launchFragmentInContainer { MyFragment(testRegistry) }) {
                onFragment { fragment ->
                    // Trigger the ActivityResultLauncher
                    fragment.takePicture()
                    // Verify the result is set
                    assertThat(fragment.thumbnailLiveData.value)
                            .isSameInstanceAs(expectedResult)
                }
        }
    }
```

Creating a custom contract
--------------------------

While `ActivityResultContracts` contains a number of prebuilt `ActivityResultContract` classes for use, you can provide your own contracts that provide the precise type safe API you require.

Each `ActivityResultContract` requires defining the input and output classes, using `Void` (in Kotlin, use either `Void?` or `Unit`) as the input type if you do not require any input.

Each contract must implement the `createIntent()`) method, which takes a `Context` and the input and constructs the `Intent` that will be used with `startActivityForResult()`.

Each contract must also implement `parseResult()`), which produces the output from the given `resultCode` (e.g., `Activity.RESULT_OK` or `Activity.RESULT_CANCELED`) and the `Intent`.

Contracts can optionally implement `getSynchronousResult()`) if it is possible to determine the result for a given input without needing to call `createIntent()`, start the other activity, and use `parseResult()` to build the result.

### Kotlin

```kotlin
class PickRingtone : ActivityResultContract<Int, Uri?>() {
    override fun createIntent(context: Context, ringtoneType: Int) =
        Intent(RingtoneManager.ACTION_RINGTONE_PICKER).apply {
            putExtra(RingtoneManager.EXTRA_RINGTONE_TYPE, ringtoneType)
        }

    override fun parseResult(resultCode: Int, result: Intent?) : Uri? {
        if (resultCode != Activity.RESULT_OK) {
            return null
        }
        return result?.getParcelableExtra(RingtoneManager.EXTRA_RINGTONE_PICKED_URI)
    }
}
```

### Java

```java
public class PickRingtone extends ActivityResultContract<Integer, Uri> {
    @NonNull
    @Override
    public Intent createIntent(@NonNull Context context, @NonNull Integer ringtoneType) {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.putExtra(RingtoneManager.EXTRA_RINGTONE_TYPE, ringtoneType.intValue());
        return intent;
    }

    @Override
    public Uri parseResult(int resultCode, @Nullable Intent result) {
        if (resultCode != Activity.RESULT_OK || result == null) {
            return null;
        }
        return result.getParcelableExtra(RingtoneManager.EXTRA_RINGTONE_PICKED_URI);
    }
}
```

If you do not need a custom contract, you can use the `StartActivityForResult` contract. This is a generic contract that takes any `Intent` as an input and returns an `ActivityResult`, allowing you to extract the `resultCode` and `Intent` as part of your callback, as shown in the following example:

### Kotlin

```kotlin
val startForResult = registerForActivityResult(StartActivityForResult()) { result: ActivityResult ->
    if (result.resultCode == Activity.RESULT_OK) {
        val intent = result.data
        // Handle the Intent
    }
}

override fun onCreate(savedInstanceState: Bundle) {
    // ...

    val startButton = findViewById(R.id.start_button)

    startButton.setOnClickListener {
        // Use the Kotlin extension in activity-ktx
        // passing it the Intent you want to start
        startForResult.launch(Intent(this, ResultProducingActivity::class.java))
    }
}
```

### Java

```java
ActivityResultLauncher<Intent> mStartForResult = registerForActivityResult(new StartActivityForResult(),
        new ActivityResultCallback<ActivityResult>() {
    @Override
    public void onActivityResult(ActivityResult result) {
        if (result.getResultCode() == Activity.RESULT_OK) {
            Intent intent = result.getData();
            // Handle the Intent
        }
    }
});

@Override
public void onCreate(@Nullable savedInstanceState: Bundle) {
    // ...

    Button startButton = findViewById(R.id.start_button);

    startButton.setOnClickListener(new OnClickListener() {
        @Override
        public void onClick(View view) {
            // The launcher with the Intent you want to start
            mStartForResult.launch(new Intent(this, ResultProducingActivity.class));
        }
    });
}
```