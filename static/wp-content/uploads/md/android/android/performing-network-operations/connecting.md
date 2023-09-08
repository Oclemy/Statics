# Connect to the network

To perform network operations in your application, your manifest must include the following permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Best practices for secure network communication
-----------------------------------------------

Before you add networking functionality to your app, you need to ensure that data and information within your app stays safe when transmitting it over a network. To do so, follow these networking security best practices:

*   Minimize the amount of sensitive or personal user data that you transmit over the network.
*   Send all network traffic from your app over SSL.
*   Consider creating a network security configuration, which lets your app trust custom certificate authorities (CAs) or restrict the set of system CAs that it trusts for secure communication.

For more information on how to apply secure networking principles, see networking security tips.

Choose an HTTP client
---------------------

Most network-connected apps use HTTP to send and receive data. The Android platform includes the `HttpsURLConnection` client, which supports TLS, streaming uploads and downloads, configurable timeouts, IPv6, and connection pooling. In this topic, we use the Retrofit HTTP client library, which lets you create an HTTP client declaratively. Retrofit also supports automatic serialization of request bodies and deserialization of response bodies.

Resolve DNS queries
-------------------

Devices that run Android 10 (API level 29) and higher have native support for specialized DNS lookups through both cleartext lookups and DNS-over-TLS mode. The `DnsResolver` API provides generic, asynchronous resolution, which lets you look up `SRV`, `NAPTR`, and other record types. Note that parsing the response is left to the app to perform.

On devices that run Android 9 (API level 28) and lower, the platform DNS resolver supports only `A` and `AAAA` records. This lets you look up the IP addresses associated with a name but doesn't support any other record types.

For NDK-based apps, see `android_res_nsend`.

Encapsulate network operations with a repository
------------------------------------------------

To simplify the process of performing network operations and reduce code duplication in various parts of your app, you can use the repository design pattern. A repository is a class that handles data operations and provides a clean API abstraction over some specific data or resource.

You can use Retrofit to declare an interface that specifies the HTTP method, URL, arguments, and response type for network operations, as in the following example:

### Kotlin

```kotlin
interface UserService {
    @GET("/users/{id}")
    suspend fun getUser(@Path("id") id: String): User
}
```

### Java

```java
public interface UserService {
    @GET("/user/{id}")
    Call<User> getUserById(@Path("id") String id);
}
```

Within a repository class, functions can encapsulate network operations and expose their results. This encapsulation ensures that the components that call the repository don't need to know how the data is stored. Any future changes to how the data is stored are isolated to the repository class as well.

### Kotlin

```kotlin
class UserRepository constructor(
    private val userService: UserService
) {
    suspend fun getUserById(id: String): User {
        return userService.getUser(id)
    }
}
```

### Java

```java
class UserRepository {
    private UserService userService;

    public UserRepository(
            UserService userService
    ) {
        this.userService = userService;
    }

    public Call<User> getUserById(String id) {
        return userService.getUser(id);
    }
}
```

To avoid creating an unresponsive UI, don't perform network operations on the main thread. By default, Android requires you to perform network operations on a thread other than the main UI thread; if you don't, a `NetworkOnMainThreadException` is thrown. In the `UserRepository` class shown in the previous code example, the network operation isn't actually triggered. The caller of the `UserRepository` must implement the threading either using coroutines or using the `enqueue()` function.

Survive configuration changes
-----------------------------

When a configuration change occurs, such as a screen rotation, your fragment or activity is destroyed and recreated. Any data that isn’t saved in the instance state for your fragment or activity, which should hold only small amounts of data, is lost and you might need to make your network requests again.

You can use a `ViewModel` to ensure that your data survives configuration changes. A `ViewModel` is a component that's designed to store and manage UI-related data in a lifecycle-conscious way. Using the `UserRepository` created above, the `ViewModel` can make the necessary network requests and provide the result to your fragment or activity using `LiveData`:

### Kotlin

```kotlin
class MainViewModel constructor(
    savedStateHandle: SavedStateHandle,
    userRepository: UserRepository
) : ViewModel() {
    private val userId: String = savedStateHandle["uid"] ?:
        throw IllegalArgumentException("Missing user ID")

    private val _user = MutableLiveData<User>()
    val user = _user as LiveData<User>

    init {
        viewModelScope.launch {
            try {
                // Calling the repository is safe as it will move execution off
                // the main thread
                val user = userRepository.getUserById(userId)
                _user.value = user
            } catch (error: Exception) {
                // show error message to user
            }

        }
    }
}
```

### Java

```java
class MainViewModel extends ViewModel {

    private final MutableLiveData<User> _user = new MutableLiveData<>();
    LiveData<User> user = (LiveData<User>) _user;

    public MainViewModel(
            SavedStateHandle savedStateHandle,
            UserRepository userRepository
    ) {
        String userId = savedStateHandle.get("uid");
        Call<User> userCall = userRepository.getUserById(userId);
        userCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    _user.setValue(response.body());
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                // show error message to user
            }
        });
    }
}
```

To learn more about this topic, see the following related guides:

*   Optimize battery life
*   Transfer data without draining the battery
*   Web apps
*   Application fundamentals
*   Guide to app architecture