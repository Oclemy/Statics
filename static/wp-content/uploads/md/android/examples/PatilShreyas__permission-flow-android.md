# Permission Flow Android

>  Know about real-time state of a Android app Permissions with Kotlin Flow APIs..

It's a simple and easy to use library. Just Plug and Play. Follow these steps:



### 1. Step 1: Gradle setup

In `build.gradle` of app module, include this dependency

![Permissions with Flow API Tutorial](https://camo.githubusercontent.com/14e59d101437c7b068837381868b2a74afa895d5d6cfec438920165960df5f20/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6465762e73687265796173706174696c2e7065726d697373696f6e2d666c6f772f7065726d697373696f6e2d666c6f772d616e64726f69643f6c6162656c3d4d6176656e25323043656e7472616c266c6f676f3d616e64726f6964267374796c653d666c61742d737175617265)


```groovy
dependencies {
    implementation "dev.shreyaspatil.permission-flow:permission-flow-android:$version"
    
    // For using in Jetpack Compose
    implementation "dev.shreyaspatil.permission-flow:permission-flow-compose:$version"
}
```

### Step 2: Initialization


```kotlin
class MyApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        PermissionFlow.init(this)
    }
}
```


### Step 3. Observing a Permission State


#### 3.1 Observing Permission with StateFlow

`StateFlow` - A permission state can be subscribed by retrieving `StateFlow<PermissionState>` or `StateFlow<MultiplePermissionState>` as follows:

```kotlin
val permissionFlow = PermissionFlow.getInstance()

// Observe state of single permission
suspend fun observePermission() {
    permissionFlow.getPermissionState(android.Manifest.permission.READ_CONTACTS).collect { state ->
        if (state.isGranted) {
            // Do something
        }
    }
}

// Observe state of multiple permissions
suspend fun observeMultiplePermissions() {
    permissionFlow.getMultiplePermissionState(
        android.Manifest.permission.READ_CONTACTS,
        android.Manifest.permission.READ_SMS
    ).collect { state ->
        // All permission states
        val allPermissions = state.permissions

        // Check whether all permissions are granted
        val allGranted = state.allGranted

        // List of granted permissions
        val grantedPermissions = state.grantedPermissions

        // List of denied permissions
        val deniedPermissions = state.deniedPermissions
    }
}
```


#### 3.2 Observing permissions in Jetpack Compose

State of a permission and state of multiple permissions can also be observed in Jetpack Compose application as follows:

```kotlin
@Composable
fun ExampleSinglePermission() {
    val state by rememberPermissionState(Manifest.permission.CAMERA)
    if (state.isGranted) {
        // Render something
    } else {
        // Render something else
    }
}

@Composable
fun ExampleMultiplePermission() {
    val state by rememberMultiplePermissionState(
        Manifest.permission.CAMERA
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.READ_CONTACTS
    )
    
    if (state.allGranted) {
        // Render something
    }
    
    val grantedPermissions = state.grantedPermissions
    // Do something with `grantedPermissions`
    
    val deniedPermissions = state.deniedPermissions
    // Do something with `deniedPermissions`
}
```


### 4. Requesting permission with PermissionFlow


#### 4.1 Request permission from Activity / Fragment

- `registerForPermissionFlowRequestsResult()`:

```kotlin
class ContactsActivity : AppCompatActivity() {

    private val permissionLauncher = registerForPermissionFlowRequestsResult()

    private fun askContactsPermission() {
        permissionLauncher.launch(Manifest.permission.READ_CONTACTS, ...)
    }
}
```


#### 4.2 Request permission in Jetpack Compose

- `rememberPermissionFlowRequestLauncher()`:

```kotlin
@Composable
fun Example() {
    val permissionLauncher = rememberPermissionFlowRequestLauncher()
    
    Button(onClick = { permissionLauncher.launch(android.Manifest.permission.CAMERA, ...) }) {
        Text("Request Permissions")
    } 
}
```


### 5. Manually notifying permission state changes ⚠️

- `PermissionFlow#notifyPermissionsChanged()`:

For example:

```kotlin
class MyActivity: AppCompatActivity() {
    private val permissionFlow = PermissionFlow.getInstance()
    
    private val permissionLauncher = registerForActivityResult(RequestPermission()) { isGranted ->
        permissionFlow.notifyPermissionsChanged(android.Manifest.permission.READ_CONTACTS)
    }
}
```


### 6. Manually Start / Stop Listening ⚠️


```kotlin
fun doSomething() {
    // Stops listening to the state changes of permissions throughout the application.
    // This means the state of permission retrieved with [getMultiplePermissionState] method will not 
    // be updated after stopping listening. 
    permissionFlow.stopListening()
    
    // Starts listening the changes of state of permissions after stopping listening
    permissionFlow.startListening()
}
```

### Reference

|2.|Read more [here](https://github.com/PatilShreyas/permission-flow-android).|
|3.|Follow code author [here](https://github.com/PatilShreyas).|
