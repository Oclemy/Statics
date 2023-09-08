# Kotlin Android Jetpack Navigation Component Examples

In this piece you will learn about Navigation Component through step by step android examples in Kotlin.


But first what is Navigation?

> `Navigation` refers to the interactions that allow users to navigate across, into, and back out from the different pieces of content within your app.

Android Jetpack's Navigation component helps you implement navigation, from simple button clicks to more complex patterns, such as app bars and the navigation drawer. The Navigation component also ensures a consistent and predictable user experience by adhering to an established set of principles.

### Parts of a Navigation Component

The Navigation component consists of three key parts that are described below:

- `Navigation graph`: An XML resource that contains all navigation-related information in one centralized location. This includes all of the individual content areas within your app, called _destinations_, as well as the possible paths that a user can take through your app.
- `NavHost`: An empty container that displays destinations from your navigation graph. The Navigation component contains a default `NavHost` implementation, [`NavHostFragment`](https://developer.android.com/reference/androidx/navigation/fragment/NavHostFragment), that displays fragment destinations.
- `NavController`: An object that manages app navigation within a `NavHost`. The `NavController` orchestrates the swapping of destination content in the `NavHost` as users move throughout your app.

### Advantages of using a Navigation Component

The Navigation Component provides several advantages over traditional navigation pattersm. These include:

- It handles fragment transactions for you.
- It handles Up and Back actions for you.
- It provides standardized resources for animations and transitions.
- It provides Implementation and handling of deep linking.
- Through it you can Include Navigation UI patterns, such as navigation drawers and bottom navigation, with minimal additional work.
- [Safe Args](https://developer.android.com/guide/navigation/navigation-pass-data#Safe-args) - a Gradle plugin that provides type safety when navigating and passing data between destinations.
- `ViewModel` support - you can scope a `ViewModel` to a navigation graph to share UI-related data between the graph's destinations.

## Example 1: Kotlin Android Navigation Component with Fragments

Let's look at a simple example to help you learn Jetpack Component Navigation. The pages will be Fragments.

### Step 1: Dependencies

Add the following Navigation Component dependencies in your gradle file:

```groovy
    // Kotlin
    implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
    implementation "androidx.navigation:navigation-ui-ktx:$nav_version"

    // Feature module Support
    implementation "androidx.navigation:navigation-dynamic-features-fragment:$nav_version"
```

### Step 2: Create a Navigation Graph

The Navigation Graph as we had said is simply an XML resource that will contain all the navigation related information in one place. To create it, start by creating a folder known as `navigation` in your `res` directory. Then in this folder create a file called `simple_navigation.xml` and add the following code:

**`simple_navigation.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/simple_navigation"
    app:startDestination="@id/homeFragment">

    <fragment
        android:id="@+id/homeFragment"
        android:name="com.example.mvvmnavigation.view.fragment.HomeFragment"
        android:label="fragment_home"
        tools:layout="@layout/fragment_home" >
        <action
            android:id="@+id/action_homeFragment_to_searchFragment"
            app:destination="@id/searchFragment"
            app:enterAnim="@anim/nav_default_pop_enter_anim"
            app:exitAnim="@anim/nav_default_pop_exit_anim" />
    </fragment>
    <fragment
        android:id="@+id/searchFragment"
        android:name="com.example.mvvmnavigation.view.fragment.SearchFragment"
        android:label="fragment_search"
        tools:layout="@layout/fragment_search" >
        <action
            android:id="@+id/action_searchFragment_to_homeFragment"
            app:destination="@id/homeFragment" />
        <action
            android:id="@+id/action_searchFragment_to_responsFragment"
            app:destination="@id/responsFragment"
            app:enterAnim="@anim/nav_default_pop_enter_anim"
            app:exitAnim="@anim/nav_default_pop_exit_anim" />
    </fragment>
    <fragment
        android:id="@+id/responsFragment"
        android:name="com.example.mvvmnavigation.view.fragment.ResponsFragment"
        android:label="fragment_respons"
        tools:layout="@layout/fragment_respons" >
        <action
            android:id="@+id/action_responsFragment_to_searchFragment"
            app:destination="@id/searchFragment" />
    </fragment>
</navigation>
```

### Step 3: Create Fragment Layouts

In your layouts folder, create the XML UI designs for the Navigation Destinations. In this case we will have three fragments:

**`fragment_search.xml`**

In this fragment add three widgets: a `TextView`, a Button and a `MultiAutoCompleteTextView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".view.fragment.SearchFragment">

    <MultiAutoCompleteTextView
        android:id="@+id/multiAutoCompleteTextView_searchFragment_Search"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Search"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView_searchFragment_listSearch"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:background="#FFFFFF"
        android:elevation="6dp"
        android:gravity="center"
        android:padding="5dp"
        android:text="@string/str_list_search"
        app:layout_constraintBottom_toTopOf="@+id/btn_searchFragment_Search"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/multiAutoCompleteTextView_searchFragment_Search" />

    <Button
        android:id="@+id/btn_searchFragment_Search"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="104dp"
        android:text="Search"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/multiAutoCompleteTextView_searchFragment_Search"
        app:layout_constraintVertical_bias="0.987" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**`fragment_respons.xml`**

Add two textview here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".view.fragment.ResponsFragment"
    android:padding="10dp">

    <TextView
        android:id="@+id/textView_ResponsFragment_AboutMe"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/str_about_me"
        android:padding="10dp"
        android:layout_margin="10dp"
        android:layout_marginLeft="10dp"
        android:layout_marginRight="10dp"
        android:background="#FFFFFF"
        android:elevation="6dp"
        android:gravity="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView_ResponsFragment_Respons"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text=""
        android:padding="10dp"
        android:layout_margin="10dp"
        android:background="#FFFFFF"
        android:elevation="6dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView_ResponsFragment_AboutMe" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**`fragment_home.xml`**

Add a button here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".view.fragment.HomeFragment">

    <Button
        android:id="@+id/btn_homeFragment_search"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Go To Search"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create Fragments

In this step you will write the code for the individual fragments. There are three fragments:

**(a). `SearchFragment.kt`**

Create the fragment by extending the `Fragment` class. Initialize the Button and MultiAutoCompleteTextView. The `MultiAutoCompleteTextView` will be used to search/filter the list. The search result will be transfered to the `ResponsFragment` via a `Bundle` object.

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.MultiAutoCompleteTextView
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import com.example.mvvmnavigation.R

class SearchFragment : Fragment() {

    lateinit var btn_search: Button
    lateinit var autoTextView: MultiAutoCompleteTextView

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_search, container, false)

        Cast(view)

        return view
    }

    private fun Cast(view: View) {

        autoTextView = view.findViewById(R.id.multiAutoCompleteTextView_searchFragment_Search)
        btn_search = view.findViewById(R.id.btn_searchFragment_Search)

        val dataSearch = listOf(
                "ali",
                "reza",
                "mvvm",
                "nav",
                "android",
                "alireza",
                "mmd",
                "mvp",
                "kotlin",
                "java",
                "python",
                "telegram",
                "api",
                "android 10",
                "android 11",
                "android studio"
                )

        autoTextView.setAdapter(ArrayAdapter(view.context,android.R.layout.simple_list_item_1,dataSearch))
        autoTextView.threshold = 1
        autoTextView.setTokenizer(MultiAutoCompleteTextView.CommaTokenizer())

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        btn_search.setOnClickListener {

            val data = Bundle()
            data.putString("data", autoTextView.text.toString())
            Navigation.findNavController(btn_search).navigate(R.id.action_searchFragment_to_responsFragment,data)

        }
    }

}
```

**(b). `ResponsFragment.kt`**

Here you inflate the `fragment_respons.xml` layout then initialize the textview defined in it. This textview will be showing the search results. You receive these search results from the Search Fragment.

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.mvvmnavigation.R

class ResponsFragment : Fragment() {

    lateinit var txt: TextView

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_respons, container, false)

        Cast(view)

        return view
    }

    private fun Cast(view: View) {
        txt = view.findViewById(R.id.textView_ResponsFragment_Respons)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val data: String? = arguments?.getString("data")

        if (data?.length ?: 0 >= 1)
            txt.text = data
        else
            txt.text = "Null"

    }

}
```

**(a). `HomeFragment.kt`**

From this home fragment you will navigate over to the `SearchFragment`. From there you will navigate over to the `ResponseFragment`. This fragment contains a button that when clicked initiates that navigation:

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.navigation.Navigation
import com.example.mvvmnavigation.R

class HomeFragment : Fragment() {

    lateinit var btn_go_to_search : Button

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        Cast(view)

        return view
    }

    private fun Cast(view: View){

        btn_go_to_search = view.findViewById(R.id.btn_homeFragment_search)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        btn_go_to_search.setOnClickListener {

            val navDirections = HomeFragmentDirections.actionHomeFragmentToSearchFragment()
            Navigation.findNavController(btn_go_to_search).navigate(navDirections)

        }

    }

}
```

### Step 5: Create Main Activity

Fragments need to be hosted in an activity. For us this will be the `MainActivity`, our launcher activity. Here we will attach the `NavigationController` to the `NavHost`. Here is the full code:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.example.mvvmnavigation.R
import com.example.mvvmnavigation.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        navController = Navigation.findNavController(this, R.id.fragment)
        NavigationUI.setupActionBarWithNavController(this, navController)

    }
}
```

### Run

Finally run the project.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/alirezabashi98/navigation-component/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/alirezabashi98/navigation-component/archive/refs/heads/master.zip) |
| 3. | [Navigation Component Reference](https://developer.android.com/guide/navigation/navigation-getting-started) |

## Example 2: Kotlin Android Navigation Component Example with Fragments and TransitionAnimations

Our pages will be Fragments. We will apply transition animations when moving from one Fragment to another.

This example will teach you the following:

- Material Design
- View binding
- Jetpack Navigation Component
- Safe Args
- Deep links

Here are the demo screenshots of what is created:

**Screenshots:**

![](https://camo.githubusercontent.com/e63147ed43b3446b6115b68f9961625481c585b90fbe63d07142526584603114/68747470733a2f2f692e696d6775722e636f6d2f764639384c6a512e6a7067)

[![Italian Trulli](https://camo.githubusercontent.com/d8d8a8bc9d971d2464c9fd2a1044711cf0b987242ca67fff3ab5904b3d939e4e/68747470733a2f2f692e696d6775722e636f6d2f52644d696b77492e6a7067)

[![Italian Trulli](https://camo.githubusercontent.com/da191e22807b10793d15b41da02553c5d7257628996908bcf7345ef6b37efad3/68747470733a2f2f692e696d6775722e636f6d2f6478696e4171722e6a7067)

[![Italian Trulli](https://camo.githubusercontent.com/2aec200ad24567ddcb401ad55d14d92917f065bfc3dd73821bd7b00199c72121/68747470733a2f2f692e696d6775722e636f6d2f6d77307674654f2e6a7067)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

In your `app/build.gradle` add the following Jetpack Navigation Component Libraries:

```groovy
    // navigation component
    implementation "androidx.navigation:navigation-fragment-ktx:2.3.2"
    implementation "androidx.navigation:navigation-ui-ktx:2.3.2"
}
```

### Step 3: Enable ViewBinding and Java8

Still in the `app/build.gradle`, but under the `android{}` closure, enable viewBinding and Java8 as follows:

```groovy
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    buildFeatures {
        viewBinding true
    }
```

### Step 4: Create Transition Animations

Create a folder known as `anim` under the `res` directory and inside it add transition animations. Here are some of the animations:

**slide_in_right**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="200"
        android:fromXDelta="100%"
        android:toXDelta="0%" />
</set>
```

**slide_out_left.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="200"
        android:fromXDelta="0%"
        android:toXDelta="-100%" />
</set>
```

> NB/= You wil find more transition animations in the source code download.

### Step 5: Create a Navigation Graph

Under the `res` create a folder known as `navigation` and inside it create a navigation graph as follows:

**nav_graph.xml**

We will also reference our animations. We have the animation files in the `res/anim` folder.

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph"
    app:startDestination="@id/homeFragment">

    <action
        android:id="@+id/action_global_termsFragment"
        app:destination="@id/termsFragment"
        app:enterAnim="@anim/slide_in_top"
        app:exitAnim="@anim/slide_out_bottom"
        app:popEnterAnim="@anim/slide_in_bottom"
        app:popExitAnim="@anim/slide_out_bottom" />

    <fragment
        android:id="@+id/homeFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.HomeFragment"
        android:label="@string/home"
        tools:layout="@layout/fragment_home">
        <action
            android:id="@+id/action_homeFragment_to_loginFragment"
            app:destination="@id/loginFragment"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right" />
    </fragment>
    <fragment
        android:id="@+id/loginFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.LoginFragment"
        android:label="@string/login"
        tools:layout="@layout/fragment_login">
        <action
            android:id="@+id/action_loginFragment_to_welcomeFragment"
            app:destination="@id/welcomeFragment"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right" />
        <argument
            android:name="username"
            android:defaultValue="@null"
            app:argType="string"
            app:nullable="true" />
        <deepLink
            android:id="@+id/deepLink"
            app:uri="gravity.xyz/login/{username}" />
    </fragment>
    <fragment
        android:id="@+id/welcomeFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.WelcomeFragment"
        android:label="{username}"
        tools:layout="@layout/fragment_welcome" >
        <argument
            android:name="username"
            app:argType="string" />
        <argument
            android:name="password"
            app:argType="string" />
        <action
            android:id="@+id/action_welcomeFragment_to_homeFragment"
            app:destination="@id/homeFragment"
            app:enterAnim="@anim/slide_in_left"
            app:exitAnim="@anim/slide_out_right"
            app:popUpTo="@id/homeFragment"
            app:popUpToInclusive="true" />
    </fragment>
    <fragment
        android:id="@+id/settingsFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.SettingsFragment"
        android:label="@string/settings"
        tools:layout="@layout/fragment_settings" />
    <fragment
        android:id="@+id/termsFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.TermsFragment"
        android:label="@string/terms_and_conditions"
        tools:layout="@layout/fragment_terms" />
    <fragment
        android:id="@+id/searchFragment"
        android:name="xyz.teamgravity.navigationcomponent.fragment.SearchFragment"
        android:label="@string/search"
        tools:layout="@layout/fragment_search" />
</navigation>
```

### Step 6: Create Options Menu

We will use Options Menu to navigate our fragments, therefore create the following two:

**(a). options_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/settingsFragment"
        android:menuCategory="secondary"
        android:orderInCategory="1"
        android:title="@string/settings"
        app:showAsAction="never" />

    <item
        android:id="@+id/termsAndConditions"
        android:orderInCategory="2"
        android:title="@string/terms_and_conditions"
        app:showAsAction="never" />
</menu>
```

**(b). navigation_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/homeFragment"
        android:icon="@drawable/ic_home"
        android:title="@string/home" />

    <item
        android:id="@+id/searchFragment"
        android:icon="@drawable/ic_search"
        android:title="@string/search" />
</menu>
```

### Step 7: Design Layouts

We will have the following layouts:

1. MainActivity layout - activity_main.xml
2. Home Fragment Layout - fragment_home.xml
3. Login Fragment Layout - fragment_login.xml
4. Search Fragment Layout - fragment_search.xml
5. Settings Fragment Layout - fragment_settings.xml
6. Terms Fragment Layout - fragment_terms.xml
7. Welcome Fragment Layout - fragment_welcome.xml

Here is the code for the main activity layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.MainActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="?attr/colorPrimary"
            android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
            app:layout_constraintTop_toTopOf="parent"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />

        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/nav_host_fragment"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:defaultNavHost="true"
            app:layout_constraintBottom_toTopOf="@id/bottom_navigation"
            app:layout_constraintTop_toBottomOf="@id/toolbar"
            app:navGraph="@navigation/nav_graph" />

        <com.google.android.material.bottomnavigation.BottomNavigationView
            android:id="@+id/bottom_navigation"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_constraintBottom_toBottomOf="parent"
            app:menu="@menu/navigation_menu" />
    </androidx.constraintlayout.widget.ConstraintLayout>

    <com.google.android.material.navigation.NavigationView
        android:id="@+id/navigation_drawer"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        app:menu="@menu/navigation_menu" />
</androidx.drawerlayout.widget.DrawerLayout>
```

> NB/=You will find more layouts codes in the source code download.

### Step 8: Create Fragments

We will have the following fragments:

1. HomeFragment
2. LoginFragment
3. SearchFragment
4. SettingsFragment
5. TermsFragment
6. WelcomeFragment

**HomeFragment.kt**

Here is the code for this fragment:

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import xyz.teamgravity.navigationcomponent.databinding.FragmentHomeBinding

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        // login button
        binding.loginB.setOnClickListener {
            val action = HomeFragmentDirections.actionHomeFragmentToLoginFragment()
            findNavController().navigate(action)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
```

> NB/= You will find the code for other Fragments in the source code download

### Step 9: Create MainActivity

Here is the code for the `MainActivity`:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.*
import xyz.teamgravity.navigationcomponent.NavGraphDirections
import xyz.teamgravity.navigationcomponent.R
import xyz.teamgravity.navigationcomponent.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private lateinit var navController: NavController
    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        binding.apply {
            setContentView(root)

            // find nav controller
            val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
            navController = navHostFragment.findNavController()

            // hide back button from top level fragments
            appBarConfiguration = AppBarConfiguration(setOf(R.id.homeFragment, R.id.searchFragment), binding.drawerLayout)

            setSupportActionBar(toolbar)
            setupActionBarWithNavController(navController, appBarConfiguration)

            bottomNavigation.setupWithNavController(navController)
            navigationDrawer.setupWithNavController(navController)

            // hide bottom navigation
            navController.addOnDestinationChangedListener { _, destination, _ ->
                when (destination.id) {
                    R.id.termsFragment, R.id.settingsFragment ->
                        bottomNavigation.visibility = View.GONE
                    else ->
                        bottomNavigation.visibility = View.VISIBLE
                }
            }
        }
    }

    // in order to respond back button in toolbar from fragment
    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.options_menu, menu)
        return true
    }

    // to navigate fragments in menu with nav controller
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return if (item.itemId == R.id.termsAndConditions) {
            val action = NavGraphDirections.actionGlobalTermsFragment()
            navController.navigate(action)
            true
        } else {
            item.onNavDestinationSelected(navController) || super.onOptionsItemSelected(item)
        }
    }
}
```

### Run

Download code in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/raheemadamboev/navigation-component-app/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/raheemadamboev/) code author |

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=navigation-component orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
