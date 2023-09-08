# Custom Navigator Example


> A simple example of how to implement Navigation Architecture Component using a custom `Navigator`.

### Step 1: Dependencies

Add the following `AndroidX` and `Navigation` Libraries:

```groovy
    implementation 'androidx.core:core-ktx:0.3'
    implementation 'android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha02'
    implementation 'android.arch.navigation:navigation-ui-ktx:1.0.0-alpha02'
```

### Step 2: Create Navigation rules

In your `res` directory create a folder called `navigation` and add the following xml file:

**/navigation/navigation.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/navigation"
    app:startDestination="@id/firstView">

    <custom_view
        android:id="@+id/firstView"
        android:label="FirstView"
        app:layout="@layout/first_view">
        <action
            android:id="@+id/action_firstView_to_secondView"
            app:destination="@id/secondView" />
    </custom_view>

    <custom_view
        android:id="@+id/secondView"
        android:label="SecondView"
        app:layout="@layout/second_view">
        <action
            android:id="@+id/action_secondView_to_thirdView"
            app:destination="@id/thirdView" />
    </custom_view>

    <custom_view
        android:id="@+id/thirdView"
        android:label="ThirdView"
        app:layout="@layout/third_view" />
</navigation>

```

### Step 3: Design Layouts

Design 4 layouts as follows:

**(a). first_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="First View"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_first"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="16dp"
        android:text="Next"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/text_view" />

</android.support.constraint.ConstraintLayout>

```

**(b). second_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Second View"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button_second"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="16dp"
        android:text="Next"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/text_view" />

</android.support.constraint.ConstraintLayout>

```

**(c). third_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Third View"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>

```

**(d). third_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.star_zero.customnavigation.CustomNavHost
        android:id="@+id/custom_nav_host"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:navGraph="@navigation/navigation" />

</android.support.constraint.ConstraintLayout>

```

### Step 4: Write Code

We will have three classes:

**(a). CustomNavHost.kt**

```kotlin
package com.star_zero.customnavigation

import android.content.Context
import android.os.Bundle
import android.os.Parcel
import android.os.Parcelable
import android.util.AttributeSet
import android.widget.FrameLayout
import androidx.core.content.withStyledAttributes
import androidx.navigation.NavController
import androidx.navigation.NavHost
import androidx.navigation.Navigation
import androidx.navigation.plusAssign

class CustomNavHost @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr), NavHost {

    private val navController = NavController(context)

    private var graphId = 0

    init {
        Navigation.setViewNavController(this, navController)

        navController.navigatorProvider += CustomNavigator(this)

        context.withStyledAttributes(attrs, R.styleable.CustomNavHost, 0, 0, {
            graphId = getResourceId(R.styleable.CustomNavHost_navGraph, 0)
        })
    }

    override fun getNavController() = navController

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()

        if (navController.graph == null) {
            navController.setGraph(graphId)
        }
    }


    override fun onSaveInstanceState(): Parcelable {
        val superState = super.onSaveInstanceState()
        val ss = SavedState(superState)
        ss.navControllerState = navController.saveState()
        return ss
    }

    override fun onRestoreInstanceState(state: Parcelable) {
        if (state is SavedState) {
            super.onRestoreInstanceState(state.superState)
            navController.restoreState(state.navControllerState)
        } else {
            super.onRestoreInstanceState(state)
        }
    }

    class SavedState: BaseSavedState {
        var navControllerState: Bundle? = null

        constructor(superState: Parcelable): super(superState)

        constructor(source: Parcel): super(source) {
            navControllerState = source.readBundle(javaClass.classLoader)
        }

        override fun writeToParcel(out: Parcel?, flags: Int) {
            super.writeToParcel(out, flags)
            out?.writeBundle(navControllerState)
        }

        companion object CREATOR : Parcelable.Creator<SavedState> {
            override fun createFromParcel(parcel: Parcel): SavedState {
                return SavedState(parcel)
            }

            override fun newArray(size: Int): Array<SavedState?> {
                return arrayOfNulls(size)
            }
        }
    }
}

```

**(b). CustomNavigator.kt**

```kotlin
package com.star_zero.customnavigation

import android.content.Context
import android.os.Bundle
import android.support.annotation.LayoutRes
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.withStyledAttributes
import androidx.core.view.plusAssign
import androidx.navigation.NavDestination
import androidx.navigation.NavOptions
import androidx.navigation.Navigator
import java.util.*

@Navigator.Name("custom_view") 
class CustomNavigator(private val container: ViewGroup) : Navigator<CustomNavigator.Destination>() {

    data class NavLayout(val id: Int, @LayoutRes val layout: Int)

    private val backStack: ArrayDeque<NavLayout> = ArrayDeque()

    override fun navigate(destination: Destination, args: Bundle?, navOptions: NavOptions?) {

        val navLayout = NavLayout(destination.id, destination.layout)
        backStack.push(navLayout)
        replaceView(navLayout.layout)

        dispatchOnNavigatorNavigated(navLayout.id, BACK_STACK_DESTINATION_ADDED)
    }

    override fun createDestination() = Destination(this)

    override fun popBackStack(): Boolean {

        return if (backStack.size < 2) {
            false
        } else {
            backStack.pop()
            val navLayout = backStack.peek()
            replaceView(navLayout.layout)
            dispatchOnNavigatorNavigated(navLayout.id, BACK_STACK_DESTINATION_POPPED)
            true
        }
    }

    private fun replaceView(@LayoutRes layout: Int) {
        container.removeAllViews()
        val view = LayoutInflater.from(container.context).inflate(layout, container, false)
        container += view
    }

    class Destination(navigator: Navigator<out NavDestination>) : NavDestination(navigator) {

        @LayoutRes
        var layout: Int = 0

        override fun onInflate(context: Context, attrs: AttributeSet) {
            super.onInflate(context, attrs)

            context.withStyledAttributes(attrs, R.styleable.CustomNavigator, 0, 0, {
                layout = getResourceId(R.styleable.CustomNavigator_layout, 0)
            })
        }
    }

    override fun onSaveState(): Bundle? {
        val bundle = Bundle()
        val id = IntArray(backStack.size)
        val layout = IntArray(backStack.size)

        backStack.forEachIndexed({ index, navLayout ->
            id[index] = navLayout.id
            layout[index] = navLayout.layout
        })

        bundle.putIntArray("id", id)
        bundle.putIntArray("layout", layout)

        return bundle
    }

    override fun onRestoreState(savedState: Bundle) {
        val id = savedState.getIntArray("id")
        val layout = savedState.getIntArray("layout")

        backStack.clear()
        id.forEachIndexed { index, _ ->
            backStack.add(NavLayout(id[index], layout[index]))
        }

        replaceView(backStack.peek().layout)
        dispatchOnNavigatorNavigated(backStack.peek().id, BACK_STACK_DESTINATION_ADDED)
    }

}

```

**(c). MainActivity.kt**

```kotlin
package com.star_zero.customnavigation

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.NavigationUI.setupActionBarWithNavController

class MainActivity : AppCompatActivity() {

    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        navController = findNavController(R.id.custom_nav_host)

        navController.addOnNavigatedListener { controller, destination ->

            when (destination.id) {
                R.id.firstView -> {
                    findViewById<View>(R.id.button_first).setOnClickListener {
                        controller.navigate(R.id.action_firstView_to_secondView)
                    }
                }
                R.id.secondView -> {
                    findViewById<View>(R.id.button_second).setOnClickListener {
                        controller.navigate(R.id.action_secondView_to_thirdView)
                    }
                }
            }
        }

        setupActionBarWithNavController(this, navController)
    }

    override fun onSupportNavigateUp() = navController.navigateUp()

    override fun onBackPressed() {
        if (!navController.popBackStack()) {
            super.onBackPressed()
        }
    }
}

```

### Reference

- Download full code [here](https://github.com/STAR-ZERO/custom-navigation-sample/archive/refs/heads/master.zip).
- Follow code author [here](https://github.com/STAR-ZERO/).
