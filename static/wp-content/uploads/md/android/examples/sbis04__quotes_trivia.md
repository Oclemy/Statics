# Quotes Trivia Game Navigation Component

>  Android sample app to get familiarized with Navigation Component.

Quotes Trivia is simple trivia game where you have to pick the notable humans in history that originally said the memorable quote in a multiple-choice challenge. At the end of each game you will get a score based on the number of correct answers you have selected. You can also share you score with others.

### App in action

Here is the demo GIF of the app:

![quotes_trivia Example Tutorial](https://github.com/sbis04/quotes_trivia/raw/master/screenshot/app_anim.gif)

### Navigation Graph

It manages your app's navigation. It is a resource file that consists of the destinations along with the actions, which are used for navigating to another destination from the current one.

The Navigation Graph of the Quotes Trivia looks like this:

![quotes_trivia Example Tutorial](https://github.com/sbis04/quotes_trivia/raw/master/screenshot/nav_graph_complete.png)


Let us look at the full code below:

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 4 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `androidx.navigation.safeargs.kotlin` plugin.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 8 dependencies:

1. `Kotlin-stdlib` - So that we can use Kotlin as our programming language.
2. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
3. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
4. Our `Legacy-support-v4` support library. Feel free to use newer AndroidX versions.
5. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
6. Our `Navigation-fragment-ktx` library.
7. Our `Navigation-ui-ktx` library.
8. `Material` - Collection of Modular and customizable Material Design UI components for Android.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id "org.sonarqube" version "3.0"
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: "androidx.navigation.safeargs.kotlin"

android {
    compileSdkVersion 30
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.souvikbiswas.quotestrivia"
        minSdkVersion 21
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_1_8.toString()
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        dataBinding true
    }
}

dependencies {
    // Kotlin
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'

    // Constraint Layout
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'

    // Navigation
    implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
    implementation "androidx.navigation:navigation-ui-ktx:$nav_version"

    // Material Design
    implementation "com.google.android.material:material:$material_version"


    // Testing
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.camposha.info/en/activity) but we have to register it right here as shown below: We will be defining a `meta-data` tag as well which allows us to set our font resources via the `android:resource` tag. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.souvikbiswas.quotestrivia">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <meta-data
            android:name="preloaded_fonts"
            android:resource="@array/preloaded_fonts" />
    </application>

</manifest>
```
#### Step 3. Create [Navigation](https://android.camposha.info/en/navigation-component/) Rules

Create a directory known as `navigation` inside your `res` directory and add the following navigation rules:

**(a). `navigation.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_root"
    app:startDestination="@id/welcomeFragment">

    <fragment
        android:id="@+id/welcomeFragment"
        android:name="com.souvikbiswas.quotestrivia.WelcomeFragment"
        tools:layout="@layout/fragment_welcome">
        <action
            android:id="@+id/action_welcomeFragment_to_triviaFragment"
            app:destination="@id/triviaFragment"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right" />
    </fragment>
    <fragment
        android:id="@+id/triviaFragment"
        android:name="com.souvikbiswas.quotestrivia.TriviaFragment"
        tools:layout="@layout/fragment_trivia">
        <action
            android:id="@+id/action_triviaFragment_to_wonFragment"
            app:destination="@id/wonFragment"
            app:enterAnim="@anim/fade_in"
            app:exitAnim="@anim/fade_out"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right"
            app:popUpTo="@id/triviaFragment"
            app:popUpToInclusive="true" />
        <action
            android:id="@+id/action_triviaFragment_to_lostFragment"
            app:destination="@id/lostFragment"
            app:enterAnim="@anim/slide_in_left"
            app:exitAnim="@anim/slide_out_right"
            app:popEnterAnim="@anim/slide_in_right"
            app:popExitAnim="@anim/slide_out_left"
            app:popUpTo="@id/triviaFragment"
            app:popUpToInclusive="true" />
    </fragment>
    <fragment
        android:id="@+id/wonFragment"
        android:name="com.souvikbiswas.quotestrivia.WonFragment"
        tools:layout="@layout/fragment_won">
        <argument
            android:name="numQuestions"
            app:argType="integer" />
        <argument
            android:name="numCorrect"
            app:argType="integer" />
        <action
            android:id="@+id/action_wonFragment_to_triviaFragment"
            app:destination="@id/triviaFragment"
            app:enterAnim="@anim/slide_in_left"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right"
            app:popUpTo="@id/wonFragment"
            app:popUpToInclusive="true" />
    </fragment>
    <fragment
        android:id="@+id/lostFragment"
        android:name="com.souvikbiswas.quotestrivia.LostFragment"
        tools:layout="@layout/fragment_lost">
        <argument
            android:name="numQuestions"
            app:argType="integer" />
        <argument
            android:name="numCorrect"
            app:argType="integer" />
        <action
            android:id="@+id/action_lostFragment_to_triviaFragment"
            app:destination="@id/triviaFragment"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right"
            app:popUpTo="@id/lostFragment"
            app:popUpToInclusive="true" />
    </fragment>
    <fragment
        android:id="@+id/aboutFragment"
        android:name="com.souvikbiswas.quotestrivia.AboutFragment"
        android:label="@string/about_title"
        tools:layout="@layout/fragment_about" />
    <fragment
        android:id="@+id/rulesFragment"
        android:name="com.souvikbiswas.quotestrivia.RulesFragment"
        android:label="@string/rules_title"
        tools:layout="@layout/fragment_rules" />
</navigation>
```
#### Step 4. Create [Menus](https://android.camposha.info/en/menu/)

Create a directory known as `menu` inside your `res` directory and add the following menu files:

**(a). `share_menu.xml`**

Inside your `/res/menu/` directory create a menu resource file named `share_menu.xml` and add menu items as shown below:

- Share - To share the app

```xml
<?xml version="1.0" encoding="utf-8"?>

<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/share"
        android:enabled="true"
        android:icon="@drawable/ic_share"
        android:title="@string/share_title"
        android:visible="true"
        app:showAsAction="ifRoom" />

</menu>
```

**(b). `overflow_menu.xml`**

Inside your `/res/menu/` directory create another menu resource file named `overflow_menu.xml` and add menu items as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/aboutFragment"
        android:title="@string/about_title" />
</menu>
```

**(c). `navdrawer_menu.xml`**

Last but not least create another menu resource file named `navdrawer_menu.xml` and add menu items as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/rulesFragment"
        android:icon="@drawable/ic_rules"
        android:title="@string/rules_title" />
    <item
        android:id="@+id/aboutFragment"
        android:icon="@drawable/ic_about"
        android:title="@string/about_title" />
</menu>
```

#### Step 5. Create [Animations](https://android.camposha.info/en/animation/)

Create a directory known as `anim` inside your `res` directory and add the following xml file:

**(a). `fade_in.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha
        android:duration="@android:integer/config_mediumAnimTime"
        android:fromAlpha="0.0"
        android:toAlpha="1.0" />
</set>
```

> You will find more animation xml files in the sample download.

#### Step 6. Write Code

Finally we need to write our code as follows:

**(a). `AboutFragment.kt`**

> Our `AboutFragment` class.

Create a Kotlin file named `AboutFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `Fragment` from the `androidx.fragment.app` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.

Then extend the `Fragment` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class AboutFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_about, container, false)
    }
}

```

**(b). `WelcomeFragment.kt`**

> Our `WelcomeFragment` class.

Create a Kotlin file named `WelcomeFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ActionBar` from the `androidx.appcompat.app` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `DataBindingUtil` from the `androidx.databinding` package.
4. `findNavController` from the `androidx.navigation` package.
5. `NavigationUI` from the `androidx.navigation.ui` package.

Then extend the `Fragment` and add its contents as follows:

First override these callbacks: 

1. `onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) `.
2. `onOptionsItemSelected(item: MenuItem): Boolean `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.*
import androidx.fragment.app.Fragment
import androidx.appcompat.app.ActionBar
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import androidx.navigation.ui.NavigationUI
import com.souvikbiswas.quotestrivia.databinding.FragmentWelcomeBinding

class WelcomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val actionBar: ActionBar? = (activity as AppCompatActivity).supportActionBar

        actionBar?.elevation = 0f
        actionBar?.title = ""

        val binding: FragmentWelcomeBinding = DataBindingUtil.inflate(
            inflater, R.layout.fragment_welcome, container, false
        )

        binding.startButton.setOnClickListener { view: View ->
            view.findNavController()
                .navigate(WelcomeFragmentDirections.actionWelcomeFragmentToTriviaFragment())
        }

        setHasOptionsMenu(true)

        return binding.root
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        super.onCreateOptionsMenu(menu, inflater)
        inflater.inflate(R.menu.overflow_menu, menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return NavigationUI.onNavDestinationSelected(
            item,
            requireView().findNavController()
        ) || super.onOptionsItemSelected(item)
    }
}

```

**(c). `RulesFragment.kt`**

> Our `RulesFragment` class.

Create a Kotlin file named `RulesFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `Fragment` from the `androidx.fragment.app` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.

Then extend the `Fragment` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class RulesFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_rules, container, false)
    }
}

```

**(d). `TriviaFragment.kt`**

> Our `TriviaFragment` class.

Create a Kotlin file named `TriviaFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TextView` from the `android.widget` package.
2. `Toast` from the `android.widget` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.
4. `DataBindingUtil` from the `androidx.databinding` package.
5. `findNavController` from the `androidx.navigation` package.

Then extend the `Fragment` and add its contents as follows:


We will be creating the following functions:

1. `randomizeQuestions() `.
2. `setQuestion() `.

**(a). Our `randomizeQuestions()` function**

Write the `randomizeQuestions()` function as follows:

```kotlin
    private fun randomizeQuestions() {
        questions.shuffle()
        questionIndex = 0
        setQuestion()
    }
```

**(b). Our `setQuestion()` function**

Write the `setQuestion()` function as follows:

```kotlin
    private fun setQuestion() {
        currentQuestion = questions[questionIndex]
        answers = currentQuestion.answers.toMutableList()
        answers.shuffle()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.souvikbiswas.quotestrivia.databinding.FragmentTriviaBinding
import com.souvikbiswas.quotestrivia.databinding.FragmentWelcomeBinding
import kotlin.math.min
import kotlin.math.round

class TriviaFragment : Fragment() {
    data class Question(val quote: String, val answers: List<String>)

    private val questions: MutableList<Question> = mutableListOf(
        Question(
            quote = "\"I have nothing to offer but blood, toil, tears and sweat.\"",
            answers = listOf(
                "Winston Churchill", "Sitting Bull", "Nikita Khrushchev", "Charles de Gaulle"
            )
        ),
        Question(
            quote = "\"I consider myself the luckiest man on the face of the earth.\"",
            answers = listOf(
                "Lou Gehrig", "Bill Gates", "Adolf Hitler", "George Washington"
            )
        ),
        Question(
            quote = "\"A desperate disease requires a dangerous remedy.\"",
            answers = listOf(
                "Guy Fawkes", "Louis Pasteur", "David Lloyd George", "Alexander Fleming"
            )
        ),
        Question(
            quote = "\"To appreciate the importance of fitting every human soul for independent action, think for a moment of the immeasurable solitude of self.\"",
            answers = listOf(
                "Elizabeth Cady Stanton",
                "Pope John Paul II",
                "Queen Victoria",
                "George Washington Carver"
            )
        )
    )

    lateinit var currentQuestion: Question
    lateinit var questionNumberText: TextView
    lateinit var answers: MutableList<String>
    private var questionIndex = 0
    private var correctAnswers = 0
    private val numQuestions = 4

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentTriviaBinding = DataBindingUtil.inflate(
            inflater, R.layout.fragment_trivia, container, false
        )

        randomizeQuestions()

        binding.trivia = this

        questionNumberText = binding.questionNumberText

        questionNumberText.text = "${questionIndex + 1} / $numQuestions"

        binding.submitButton.setOnClickListener { view: View ->
            val checkedId = binding.answerChoiceGroup.checkedRadioButtonId
            if (-1 != checkedId) {
                var answerIndex = 0
                when (checkedId) {
                    R.id.secondChoiceButton -> answerIndex = 1
                    R.id.thirdChoiceButton -> answerIndex = 2
                    R.id.fourthChoiceButton -> answerIndex = 3
                }
                questionIndex++

                if (answers[answerIndex] == currentQuestion.answers[0]) {
                    correctAnswers++
                }

                if (questionIndex < numQuestions) {
                    currentQuestion = questions[questionIndex]
                    setQuestion()
                    binding.invalidateAll()
                    questionNumberText.text = "${questionIndex + 1} / $numQuestions"
                } else {
                    if (correctAnswers < round(0.8 * numQuestions)) {
                        view.findNavController()
                            .navigate(TriviaFragmentDirections.actionTriviaFragmentToLostFragment(numQuestions, correctAnswers))
                    } else {
                        view.findNavController().navigate(TriviaFragmentDirections.actionTriviaFragmentToWonFragment(numQuestions, correctAnswers))
                    }
                }
            }
        }

        return binding.root
    }

    private fun randomizeQuestions() {
        questions.shuffle()
        questionIndex = 0
        setQuestion()
    }

    private fun setQuestion() {
        currentQuestion = questions[questionIndex]
        answers = currentQuestion.answers.toMutableList()
        answers.shuffle()
    }

}

```

**(e). `WonFragment.kt`**

> Our `WonFragment` class.

First override these callbacks: 

1. `onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) `.
2. `onOptionsItemSelected(item: MenuItem): Boolean `.

Then we will be creating the following functions:

1. `getShareIntent(): Intent `.
2. `shareSuccess() `.

**(a). Our `shareSuccess()` function**

Write the `shareSuccess()` function as follows:

```kotlin
    private fun shareSuccess() {
        startActivity(getShareIntent())
    }
```

**(b). Our `getShareIntent()` function**

Write the `getShareIntent()` function as follows:

```kotlin
    private fun getShareIntent(): Intent {
        val args = WonFragmentArgs.fromBundle(requireArguments())
        val shareIntent = Intent(Intent.ACTION_SEND)
        shareIntent.setType("text/plain")
            .putExtra(
                Intent.EXTRA_TEXT,
                getString(R.string.share_text, args.numCorrect, args.numQuestions)
            )
        return shareIntent
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.os.Bundle
import android.view.*
import androidx.fragment.app.Fragment
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.souvikbiswas.quotestrivia.databinding.FragmentWonBinding

class WonFragment : Fragment() {

    private lateinit var correctAnswersText: TextView
    private lateinit var totalQuestionsText: TextView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val binding: FragmentWonBinding = DataBindingUtil.inflate(
            inflater, R.layout.fragment_won, container, false
        )

        binding.nextMatchButton.setOnClickListener { view: View ->
            view.findNavController()
                .navigate(WonFragmentDirections.actionWonFragmentToTriviaFragment())
        }

        correctAnswersText = binding.correctAnswersText
        totalQuestionsText = binding.totalQuestionsText

        val args = WonFragmentArgs.fromBundle(requireArguments())

        correctAnswersText.text = args.numCorrect.toString()
        totalQuestionsText.text = args.numQuestions.toString()

        setHasOptionsMenu(true)

        return binding.root
    }

    private fun getShareIntent(): Intent {
        val args = WonFragmentArgs.fromBundle(requireArguments())
        val shareIntent = Intent(Intent.ACTION_SEND)
        shareIntent.setType("text/plain")
            .putExtra(
                Intent.EXTRA_TEXT,
                getString(R.string.share_text, args.numCorrect, args.numQuestions)
            )
        return shareIntent
    }

    private fun shareSuccess() {
        startActivity(getShareIntent())
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        super.onCreateOptionsMenu(menu, inflater)
        inflater.inflate(R.menu.share_menu, menu)

        if (null == getShareIntent().resolveActivity(requireActivity().packageManager)) {
            menu.findItem(R.id.share)?.isVisible = false
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.share -> shareSuccess()
        }

        return super.onOptionsItemSelected(item)
    }
}

```

**(f). `LostFragment.kt`**

> Our `LostFragment` class.

Create a Kotlin file named `LostFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `TextView` from the `android.widget` package.
4. `DataBindingUtil` from the `androidx.databinding` package.
5. `findNavController` from the `androidx.navigation` package.

Then extend the `Fragment` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.souvikbiswas.quotestrivia.databinding.FragmentLostBinding

class LostFragment : Fragment() {

    private lateinit var correctAnswersText: TextView
    private lateinit var totalQuestionsText: TextView

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentLostBinding = DataBindingUtil.inflate(
            inflater, R.layout.fragment_lost, container, false
        )

        binding.playAgainButton.setOnClickListener { view: View ->
            view.findNavController()
                .navigate(LostFragmentDirections.actionLostFragmentToTriviaFragment())
        }

        correctAnswersText = binding.correctAnswersText
        totalQuestionsText = binding.totalQuestionsText

        val args = LostFragmentArgs.fromBundle(requireArguments())

        correctAnswersText.text = args.numCorrect.toString()
        totalQuestionsText.text = args.numQuestions.toString()

        return binding.root
    }
}

```

**(g). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `NavDestination` from the `androidx.navigation` package.
2. `findNavController` from the `androidx.navigation` package.
3. `NavHostFragment` from the `androidx.navigation.fragment` package.
4. `AppBarConfiguration` from the `androidx.navigation.ui` package.
5. `NavigationUI` from the `androidx.navigation.ui` package.

Then extend the `AppCompatActivity` and add its contents as follows:

Override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onSupportNavigateUp(): Boolean `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.NavController
import androidx.navigation.NavDestination
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI
import com.souvikbiswas.quotestrivia.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding =
            DataBindingUtil.setContentView<ActivityMainBinding>(this, R.layout.activity_main)

        drawerLayout = binding.drawerLayout

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.myNavHostFragment) as NavHostFragment
        val navController = navHostFragment.navController
        NavigationUI.setupActionBarWithNavController(this, navController, drawerLayout)

        appBarConfiguration = AppBarConfiguration(navController.graph, drawerLayout)

        navController.addOnDestinationChangedListener { nc: NavController, nd: NavDestination, _: Bundle? ->
            if (nd.id == nc.graph.startDestination) {
                drawerLayout.setDrawerLockMode(DrawerLayout.LOCK_MODE_UNLOCKED)
            } else {
                drawerLayout.setDrawerLockMode(DrawerLayout.LOCK_MODE_LOCKED_CLOSED)
            }
        }

        NavigationUI.setupWithNavController(binding.navView, navController)
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = this.findNavController(R.id.myNavHostFragment)
        return NavigationUI.navigateUp(navController, drawerLayout)
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/sbis04/quotes_trivia/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/sbis04/quotes_trivia).|
|3.|Follow code author [here](https://github.com/sbis04).|
