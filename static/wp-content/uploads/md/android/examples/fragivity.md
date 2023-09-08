# Fragivity Example


> Fragivity : Use Fragment like Activity

Fragivity is a library used to build APP with "Single Activity + Multi-Fragments" Architecture

-   **Reasonable Lifecycle：** Lifecycle is consistent with Activity when screen changed
-   **Multiple LaunchModes：** Supports multiple modes, such as Standard, SingleTop and SingleTask
-   **Transition animation：** Supports Transition or SharedElement animation when switching screens
-   **Efficient communication：** Simple and direct communication based on callback
-   **Friendly Backpress：** Supports onBackPressed interception and SwipeBack
-   **Deep Links：** Routes to the specified screen by URI
-   **Dialog：** Supports DialogFragment

### Step 1; Installation

Add in your root build.gradle at the end of repositories:

```groovy
allprojects {
    repositories { 
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

```groovy
implementation 'com.github.vitaviva.fragivity:core:$latest_version'
```

### Step 2: Declare NavHostFragment in layout

Like `Navigation`, Fragivity needs a `NavHostFragment` as the host of ChildFragments

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:fitsSystemWindows="true">

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/nav_host"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true" />
</FrameLayout>
```

### Step 3: load HomeFragment in Activity

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        proxyFragmentFactory()
        // with java
        // Fragivity.proxyFragmentFactory(this)

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host) as NavHostFragment

        navHostFragment.loadRoot(HomeFragment::class)
        
        //or loadRoot with factory
        //navHostFragment.loadRoot{ HomeFragment() }

    }
}
```

> !Note: Add `proxyFragmentFactory()` to ensure that the fragments can run to `onStart/onStop`，before `super.onCreate()`

### Step 4. navigate to destination Fragment

```kotlin
//in HomeFragment
navigator.push(DestinationFragment::class) {
    arguments = bundleOf(KEY_ARGUMENT1 to "arg1", KEY_ARGUMENT2 to "arg2")
    //or 
    applyArguments(KEY_ARGUMENT1 to "arg1", KEY_ARGUMENT2 to "arg2")
}
```

### Launch Mode

Support multiple launch modes

```kotlin
navigator.push(DestinationFragment::class) {
    launchMode = LaunchMode.STANDARD //default
    //or LaunchMode.SINGLE_TOP, LaunchMode.SINGLE_TASK
}
```

### Transition Animation

```kotlin
navigator.push(DestinationFragment::class) {
    //animator
    enterAnim = R.anim.slide_in
    exitAnim = R.anim.slide_out
    popEnterAnim = R.anim.slide_in_pop
    popExitAnim = R.anim.slide_out_pop
    
    //sharedElements
    sharedElements = sharedElementsOf(imageView to "id")
}
```

Here is a demo GIF:

![https://github.com/vitaviva/fragivity/raw/main/screenshot/transition.gif](https://github.com/vitaviva/fragivity/raw/main/screenshot/transition.gif)

### Communication

You can simply setup communication between two fragments

#### 1\. start destination Fragment with a callback

```kotlin
class HomeFragment : Fragment() {
    private val cb: (Int) -> Unit = { checked ->
        //...
    }

    //...

    fun startDestination() {
        navigator.push {
            DestinationFragment(cb)
        }
    }
  
    //...
}
```

#### 2\. callback to source Fragment

```kotlin
class DestinationFragment(val cb: (Int) -> Unit) : Fragment() {
    //...
    cb.invoke(xxx)
    //...
}

```

### Show Dialog

#### 1\. declare a DialogFragment

```kotlin
class DialogFragment : DialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_dialog, container, false)
        return root
    }
}
```

#### 2\. show it

```kotlin
navigator.showDialog(DialogFragment::class)
```

### Deep links

#### 1.  add kapt dependencies

```groovy
kapt 'com.github.fragivity:processor:$latest_version'
```

#### 2. declare URI with `@Deeplink` annotation

```kotlin
@DeepLink(uri = "myapp://fragitiy.github.com/")
class DeepLinkFragment : Fragment() {
    //...
}
```

#### 3\. handle intent in MainActivity

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        //...
        
        navHostFragment.handleDeepLink(intent)

    }
}
```

#### 4. start Activity with URI

```kotlin
val intent = Intent(Intent.ACTION_VIEW, Uri.parse("myapp://fragitiy.github.com/"))
startActivity(intent)
```

### Router

#### 1.composable Fragment in Activity

```kotlin
with(navHostFragment) {
    composable("feed") { FeedFragment.newInstance() }
    composable("search?keyword={keyword}", stringArgument("keyword")) {
        SearchFragment.newInstance()
    }
}
```

#### 2.navigate to destination Fragment

```kotlin
navigator.push("search?keyword=$value")
// or
navigator.push("search") {
    arguments = bundleOf("keyword" to value.toString())
}

navigator.popTo("search")
```

### Full Example

Here is an example:

**DemoApp.kt**

```kotlin
package com.github.fragivity.example

import android.app.Application
import android.content.Context
import androidx.multidex.MultiDex
import com.github.fragivity.NavOptions
import com.github.fragivity.applyHorizontalInOut
import com.github.fragivity.navOptions

class DemoApp : Application() {
    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
        MultiDex.install(base)
    }

    override fun onCreate() {
        super.onCreate()
        NavOptions.setNavOptionsFactory {
            navOptions(isRaw = true) {
                applyHorizontalInOut()
            }
        }
    }
}

```

**SplashFragment.kt**

```kotlin
package com.github.fragivity.example

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.github.fragivity.applySlideInOut
import com.github.fragivity.navigator
import com.github.fragivity.push
import kotlinx.coroutines.delay

class SplashFragment : Fragment() {

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return TextView(inflater.context).apply {
            gravity = Gravity.CENTER
            textSize = 20f
            text = "Welcome"
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        lifecycleScope.launchWhenResumed {
            delay(500)
            navigator.push(HomeFragment::class) {
                popSelf = true
                applySlideInOut()
            }
        }
    }

}

```

**HomeFragment.kt**

```kotlin
package com.github.fragivity.example

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.addCallback
import androidx.core.os.bundleOf
import com.github.fragivity.applySlideInOut
import com.github.fragivity.dialog.showDialog
import com.github.fragivity.example.backpress.BackPressFragment
import com.github.fragivity.example.base.showToast
import com.github.fragivity.example.communicate.CommFragment
import com.github.fragivity.example.databinding.FragmentHomeBinding
import com.github.fragivity.example.deeplink.sendNotification
import com.github.fragivity.example.dialog.DialogFragment
import com.github.fragivity.example.flow.ui.MainActivity
import com.github.fragivity.example.launchmode.LaunchModeFragment
import com.github.fragivity.example.listscreen.Leaderboard
import com.github.fragivity.example.nested.NestedFragment
import com.github.fragivity.example.swipeback.SwipeBackFragment
import com.github.fragivity.example.viewbinding.viewBinding
import com.github.fragivity.finish
import com.github.fragivity.navigator
import com.github.fragivity.push

class HomeFragment : AbsBaseFragment(false) {

    private val binding by viewBinding(FragmentHomeBinding::bind)

    private var lastClickTime = 0L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnLaunchmode.setOnClickListener {
            navigator.push(LaunchModeFragment::class)
        }

        binding.btnTransition.setOnClickListener {
            navigator.push(Leaderboard::class)
        }

        binding.btnDeeplink.setOnClickListener {
            context?.sendNotification()
            finish()
        }

        binding.btnBackpress.setOnClickListener {
            navigator.push(BackPressFragment::class)
        }

        binding.btnCommunication.setOnClickListener {
            navigator.push(CommFragment::class)
        }

        binding.btnSwipeback.setOnClickListener {
            navigator.push(SwipeBackFragment::class) {
                applySlideInOut()
            }
        }

        binding.btnDialog.setOnClickListener {
            navigator.showDialog(DialogFragment::class)
        }

        binding.btnNested.setOnClickListener {
            navigator.push(NestedFragment::class)
        }

        binding.btnRouter.setOnClickListener {
            navigator.push("feed") {
                arguments = bundleOf("isShowBackSearch" to false)
            }
        }

        binding.btnGoToFlow.setOnClickListener {
            startActivity(Intent(requireContext(), MainActivity::class.java))
        }
    }

    override val titleName: String
        get() = "Fragivity"

}

```

**BackPressFragment.kt**

```kotlin
package com.github.fragivity.example.backpress

import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import com.github.fragivity.example.AbsBaseFragment
import com.github.fragivity.example.R
import com.github.fragivity.navigator
import com.github.fragivity.pop


class BackPressFragment : AbsBaseFragment() {

    private var extime: Long = 0
    private val cb by lazy {
        object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (System.currentTimeMillis() - extime > 1000) {
                    Toast.makeText(context, "Click again to return", Toast.LENGTH_SHORT).show()
                    extime = System.currentTimeMillis()
                } else {
                    navigator.pop()
                }
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_back_press, container, false)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        Handler().post {
            //make sure this will run before NavController.onBackPressed when Configurations changed
            requireActivity().onBackPressedDispatcher.addCallback(this, cb)
        }
    }

    override fun onPause() {
        super.onPause()
        cb.isEnabled = false
    }

    override fun onResume() {
        super.onResume()
        cb.isEnabled = true
    }

    override fun onDestroy() {
        super.onDestroy()
        cb.remove() //not necessary
    }

    override val titleName: String?
        get() = "Back Press"

}

```

**DialogFragment.kt**

```kotlin
package com.github.fragivity.example.dialog

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.github.fragivity.example.R

class DialogFragment : DialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_dialog, container, false)
    }
}

```

**DeepLinkFragment.kt**

```kotlin
package com.github.fragivity.example.deeplink

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.NotificationCompat
import com.github.fragivity.annotation.DeepLink
import com.github.fragivity.example.AbsBaseFragment
import com.github.fragivity.example.R


const val URI = "myapp://fragitiy.github.com/"

@DeepLink(uri = URI)
class DeepLinkFragment : AbsBaseFragment() {
    override val titleName: String?
        get() = "Deep Links"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_deep_link, container, false)
    }
}

fun Context.sendNotification() {

    val manager =
        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        //NotificationChannel和createNotificationChannel都是Android8.0以后新增的API
        val channel = NotificationChannel(
            "important",
            "Important",
            NotificationManager.IMPORTANCE_HIGH
        )
        manager.createNotificationChannel(channel)
    }

    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(URI))
    val pi = PendingIntent.getActivity(this, 0, intent, 0)//点击通知栏后跳转到相应的activity
    val notification = NotificationCompat.Builder(this, "important")//使用NotificationCompat兼容8.0以前的系统
        .setContentTitle("Fragivity Example")
        .setContentText(
            "This is a notification for testing fragivity deep links"
        )//默认显示文本，过长会省略
        .setStyle(
            NotificationCompat.BigTextStyle()
                .bigText("This is a notification for testing fragivity deep links. In Android, a deep link is a link that takes you directly to a specific destination within an app.")
        )//通知中显示完整长文字
        .setStyle(
            NotificationCompat.BigPictureStyle()
                .bigPicture(BitmapFactory.decodeResource(resources, R.drawable.ic_launcher))
        )
        .setSmallIcon(R.drawable.ic_launcher)
        .setLargeIcon(BitmapFactory.decodeResource(resources, R.drawable.ic_launcher))
        .setContentIntent(pi)
        .setAutoCancel(true)
        .build()
    manager.notify(1, notification)
}

```

> Find full code example [here](https://github.com/vitaviva/fragivity/tree/main/app).

### Reference

> Download code [here](https://github.com/vitaviva/fragivity/archive/refs/heads/main.zip).
> Read more [here](https://github.com/vitaviva/fragivity/).
> Follow code author [here](https://github.com/vitaviva/).
