# Navigation Architecture Component + DialogFragment


> How to implement Jetpack Navigation Architecture Component with a DialogFragment in Kotlin.

### Step 1: Dependencies

Include the following as part of your dependency specifications:

```groovy

    implementation 'com.jakewharton.timber:timber:4.7.1'
    implementation "androidx.lifecycle:lifecycle-extensions:2.0.0"
    implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha06"
    implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha06"
```

### Step 2: Create Navigation Rules

Create a folder named `navigation` inside the `res` directory and add the following file:

**/navigation/navigation.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation"
    app:startDestination="@id/mainFragment">

    <fragment
        android:id="@+id/mainFragment"
        android:name="com.example.navigationdialog.MainFragment"
        android:label="MainFragment">
        <action
            android:id="@+id/action_mainFragment_to_secondFragment"
            app:destination="@id/secondFragment" />
    </fragment>

    <fragment
        android:id="@+id/secondFragment"
        android:name="com.example.navigationdialog.SecondFragment"
        android:label="SecondFragment" />

    <dialog_fragment
        android:id="@+id/simpleDialog"
        android:name="com.example.navigationdialog.SimpleDialog"
        android:label="SimpleDialog">
        <argument
            android:name="title"
            app:argType="string" />
        <argument
            android:name="message"
            app:argType="string" />
        <argument
            android:name="requestCode"
            app:argType="integer" />
    </dialog_fragment>
    <action
        android:id="@+id/action_global_simpleDialog"
        app:destination="@id/simpleDialog" />
</navigation>

```

### Step 3: Design Layouts

Design three layouts: two Fragments and One Activity:

**(a). fragment_second.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <Button
            android:id="@+id/button_back"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:text="Back"
            app:layout_constraintBottom_toTopOf="@+id/button_dialog"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_chainStyle="packed" />

        <Button
            android:id="@+id/button_dialog"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:text="Show Dialog Second"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/button_back" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

**(b). fragment_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <Button
            android:id="@+id/button_next"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="8dp"
            android:layout_marginBottom="16dp"
            android:text="Next"
            app:layout_constraintBottom_toTopOf="@+id/button_dialog"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_chainStyle="packed" />

        <Button
            android:id="@+id/button_dialog"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:text="Show Dialog Main"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/button_next" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

**(c). activity_main.xml**

Place our `NavHostFragment` here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <fragment
            android:id="@+id/nav_host"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:defaultNavHost="true" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

### Step 4: Initialize Timber

Do this initialization in the `App` class:

**App.kt**

```kotlin
package com.example.navigationdialog

import android.app.Application
import timber.log.Timber

class App : Application() {

    override fun onCreate() {
        super.onCreate()

        Timber.plant(Timber.DebugTree())
    }
}

```

### Step 5: Create DialogFragment

Create a DialogFragment by extending the `DialogFragment` class:

**SimpleDialog.kt**

```kotlin
package com.example.navigationdialog

import android.app.Dialog
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment

class SimpleDialog : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val args = SimpleDialogArgs.fromBundle(arguments)

        return AlertDialog.Builder(requireActivity())
                .setTitle(args.title)
                .setMessage(args.message)
                .setPositiveButton("OK") { _, which ->
                    sendResult(which)
                }
                .create()
    }

    private fun sendResult(which: Int) {
        targetFragment?.onActivityResult(targetRequestCode, which, null)
    }
}

```

### Step 6: Create Fragments

Create two Fragments as follows:

**(a). SecondFragment.kt**

```kotlin
package com.example.navigationdialog

import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import com.example.navigationdialog.databinding.FragmentSecondBinding
import timber.log.Timber

class SecondFragment : Fragment() {

    companion object {
        private const val DIALOG_REQUEST_CODE = 1
    }

    private lateinit var binding: FragmentSecondBinding

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        binding = FragmentSecondBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.buttonBack.setOnClickListener { view ->
            view.findNavController().navigateUp()
        }

        binding.buttonDialog.setOnClickListener { view ->
            val action = SimpleDialogDirections.actionGlobalSimpleDialog(
                "Sample Title2",
                "Sample Message2",
                DIALOG_REQUEST_CODE
            )
            view.findNavController().navigate(action)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (DIALOG_REQUEST_CODE == requestCode && DialogInterface.BUTTON_POSITIVE == resultCode) {
            Timber.d("Click button positive")
        }
    }
}

```

**(b). MainFragment.kt**

```kotlin
package com.example.navigationdialog

import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import com.example.navigationdialog.databinding.FragmentMainBinding
import timber.log.Timber

class MainFragment : Fragment() {

    companion object {
        private const val DIALOG_REQUEST_CODE = 1
    }

    private lateinit var binding: FragmentMainBinding

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        binding = FragmentMainBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.buttonNext.setOnClickListener { view ->
            view.findNavController().navigate(R.id.action_mainFragment_to_secondFragment)
        }

        binding.buttonDialog.setOnClickListener { view ->
            val action = SimpleDialogDirections.actionGlobalSimpleDialog(
                "Sample Title1",
                "Sample Message1",
                DIALOG_REQUEST_CODE
            )
            view.findNavController().navigate(action)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (DIALOG_REQUEST_CODE == requestCode && DialogInterface.BUTTON_POSITIVE == resultCode) {
            Timber.d("Click button positive")
        }
    }
}

```

### Step 7: Create DialogNavigator

Create a custom `DialogNavigator` class as follows:

```kotlin
package com.example.navigationdialog

import android.content.Context
import android.os.Bundle
import android.util.AttributeSet
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.FragmentManager
import androidx.navigation.NavDestination
import androidx.navigation.NavOptions
import androidx.navigation.Navigator

@Navigator.Name("dialog_fragment") 
class DialogNavigator(
    private val fragmentManager: FragmentManager
) : Navigator<DialogNavigator.Destination>() {

    companion object {
        private const val TAG = "dialog"
    }

    override fun navigate(destination: Destination, args: Bundle?, navOptions: NavOptions?, navigatorExtras: Extras?) {
        val fragment = destination.createFragment(args)

        fragment.setTargetFragment(fragmentManager.primaryNavigationFragment, SimpleDialogArgs.fromBundle(args).requestCode)

        fragment.show(fragmentManager, TAG)

        dispatchOnNavigatorNavigated(destination.id, BACK_STACK_UNCHANGED)
    }

    override fun createDestination(): Destination {
        return Destination(this)
    }

    override fun popBackStack(): Boolean {
        return true
    }

    class Destination(navigator: Navigator<out NavDestination>) : NavDestination(navigator) {

        private var fragmentClass: Class<out DialogFragment>? = null

        override fun onInflate(context: Context, attrs: AttributeSet) {
            super.onInflate(context, attrs)

            val a = context.resources.obtainAttributes(attrs, R.styleable.FragmentNavigator)
            a.getString(R.styleable.FragmentNavigator_android_name)?.let { className ->
                fragmentClass = parseClassFromName(context, className, DialogFragment::class.java)
            }
            a.recycle()
        }

        fun createFragment(args: Bundle?): DialogFragment {
            val fragment = fragmentClass?.newInstance()
                ?: throw IllegalStateException("fragment class not set")

            args?.let {
                fragment.arguments = it
            }
            return fragment
        }
    }
}

```

### Step 8: MainActivity

Write your `MainActivity` code as follows:

**MainActivity.kt**

```kotlin
package com.example.navigationdialog

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.plusAssign
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val navController = findNavController(R.id.nav_host)

        val dialogNavigator = DialogNavigator(nav_host.childFragmentManager)
        navController.navigatorProvider += dialogNavigator

        val graph = navController.navInflater.inflate(R.navigation.navigation)
        navController.graph = graph
    }
}

```

### Reference

- Download full code [here](https://github.com/STAR-ZERO/navigation-dialog-sample/archive/refs/heads/master.zip).
- Follow code author [here](https://github.com/STAR-ZERO/).
