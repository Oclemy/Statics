# Speech To Text and Text to Speech Converter

>  Speech-Text Converter is a simple task that enable the user to convert the speech to text or convert text to speech (by Mic).

Speech-Text Converter is a simple task that enable the user to convert the speech to text or convert text to speech (by Mic)

#### 1.Home Screen

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191107-440439c9-e796-46d6-9ea9-bb90d5681971.png)


#### 2.Convert Text to Speech

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191408-583cb114-b7f0-4bcf-8a7b-b18b9b54c097.png)


#### 3.How Are you Sound On

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191492-56de6f3b-9630-4856-b3e2-3e36b66b8aea.png)


#### 4.Convert Speech to Text

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191588-5cc21980-6e60-4e37-9284-63b9a684c79b.png)


#### 5.Mic On, Record a Voice

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191674-23299d78-07a7-42fd-96a0-861272bd4089.png)


#### 6.Voice Converted to Text

![Speech Recognition Tutorial](https://user-images.githubusercontent.com/52586356/138191789-12195d40-599d-49a9-95b6-ba383758c7ae.png)


Let us look at a full android Speech Recognition sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 4 dependencies:

1. Our `Kotlin-stdlib` library.
2. Our `Core-ktx` library.
3. Our `Appcompat` library.
4. Our `Constraintlayout` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"

    defaultConfig {
        applicationId "com.example.speech_textconverter"
        minSdkVersion 26
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        viewBinding true
    }

}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.3.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

}
```
#### Step 2. Design Layouts

Let's create the following layouts:

**(a). `activity_splash.xml`**

> Our `activity_splash` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_splash.xml` and add the following 5 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `ImageView`
3. `TextView`
4. `LinearLayout`
5. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".SplashActivity"
    android:background="@color/colorPrimary">

    <ImageView
        android:id="@+id/Mic_Icon"
        android:layout_width="150dp"
        android:layout_height="180dp"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"
        android:src="@drawable/mic"/>

    <TextView
        android:id="@+id/welcome_message"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/Mic_Icon"
        android:text="@string/welcome_message"
        android:textSize="28dp"
        android:textStyle="bold"
        android:textColor="#FFF"/>

    <LinearLayout
        android:id="@+id/container"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:orientation="horizontal">

        <Button
            android:id="@+id/go_textToSpeech"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:layout_margin="5dp"
            android:padding="5dp"
            android:background="@drawable/btn"
            android:text="@string/textToSpeech"
            android:textSize="20dp"
            android:textColor="#DAFFFFFF"/>

        <Button
            android:id="@+id/go_speechToText"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:layout_margin="5dp"
            android:padding="5dp"
            android:background="@drawable/btn"
            android:text="@string/speechToText"
            android:textSize="20dp"
            android:textColor="#DAFFFFFF"/>

    </LinearLayout>

</RelativeLayout>
```

**(b). `activity_speech_to_text.xml`**

> Our `activity_speech_to_text` layout.

Create an xml layout file named `activity_speech_to_text.xml` then add the following:

1. `RelativeLayout`
2. `TextView`
3. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".SpeechToTextActivity"
    android:background="@color/colorPrimary">

    <TextView
        android:id="@+id/convert_speech"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="100dp"
        android:gravity="center"
        android:text="@string/convert_speech"
        android:textSize="28dp"
        android:textStyle="bold"
        android:textColor="#FFF"/>

    <Button
        android:id="@+id/mic_btn"
        android:layout_width="200dp"
        android:layout_height="50dp"
        android:layout_centerInParent="true"
        android:layout_marginTop="30dp"
        android:background="@drawable/btn"
        android:text="@string/mic"
        android:textSize="17dp"
        android:textColor="#FFF"/>


    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:minHeight="50dp"
        android:layout_height="wrap_content"
        android:layout_below="@id/mic_btn"
        android:layout_marginTop="30dp"
        android:layout_marginLeft="10dp"
        android:text="@string/text"
        android:textSize="20dp"
        android:textStyle="italic"
        android:textColor="#FFF"/>

</RelativeLayout>
```

**(c). `activity_main.xml`**


> Our `activity_main` layout.

1. `RelativeLayout`
2. `TextView`
3. `EditText`
4. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:background="@color/colorPrimary">

    <TextView
        android:id="@+id/convert_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="100dp"
        android:gravity="center"
        android:text="@string/convert_text"
        android:textSize="28dp"
        android:textStyle="bold"
        android:textColor="#FFF"/>

    <EditText
        android:id="@+id/edit_text"
        android:layout_width="300dp"
        android:minHeight="50dp"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:gravity="center"
        android:background="@drawable/btn2"
        android:padding="5dp"
        android:hint="@string/enter_text"
        android:textColorHint="#FFF"
        android:textSize="20dp"
        android:textColor="#FFF"/>

    <Button
        android:id="@+id/convert_bnt"
        android:layout_width="200dp"
        android:layout_height="50dp"
        android:layout_below="@id/edit_text"
        android:layout_centerHorizontal="true"
        android:background="@drawable/btn"
        android:layout_marginTop="30dp"
        android:text="@string/convert"
        android:textSize="17dp"
        android:textColor="#FFF"/>

</RelativeLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt`then create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.speech_textconverter.databinding.ActivitySplashBinding

class SplashActivity : AppCompatActivity() {
    lateinit var binding: ActivitySplashBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setTitle("")

        binding.goTextToSpeech.setOnClickListener{
            startActivity(Intent(this, MainActivity::class.java))
        }
        binding.goSpeechToText.setOnClickListener{
            startActivity(Intent(this, SpeechToTextActivity::class.java))
        }

    }
}

```

**(b). `SpeechToTextActivity.kt`**

> Our `SpeechToTextActivity` class.

Create a Kotlin file named `SpeechToTextActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `RecognizerIntent` from the `android.speech` package.
4. `Toast` from the `android.widget` package.
5. `Nullable` from the `androidx.annotation` package.
6. `AppCompatActivity` from the `androidx.appcompat.app` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onActivityResult(requestCode: Int, resultCode: Int, @Nullable data: Intent?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.os.Bundle
import android.speech.RecognizerIntent
import android.widget.Toast
import androidx.annotation.Nullable
import androidx.appcompat.app.AppCompatActivity
import com.example.speech_textconverter.databinding.ActivitySpeechToTextBinding
import java.util.*

class SpeechToTextActivity : AppCompatActivity() {
    lateinit var binding: ActivitySpeechToTextBinding
    val REQUEST_CODE_SPEECH_INPUT:Int = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySpeechToTextBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setTitle("")

        binding.micBtn.setOnClickListener {
            var intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            intent.putExtra(
                RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
            )
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
            intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speech to Text")

            try {
                startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT)
            } catch (e: Exception) {
                Toast.makeText(this, " " + e.message, Toast.LENGTH_SHORT).show()
            }
        }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, @Nullable data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_SPEECH_INPUT) {
            if (resultCode == RESULT_OK && data != null) {
                val result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                val text = Objects.requireNonNull(result)?.get(0)
                binding.textView.setText("Text: "+text)
            }
        }
    }

}

```

**(c). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `TextToSpeech` from the `android.speech.tts` package.
3. `Toast` from the `android.widget` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.speech_textconverter.databinding.ActivityMainBinding
import java.util.*

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    lateinit var textToSpeech: TextToSpeech

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setTitle("")

        textToSpeech = TextToSpeech(applicationContext) { status ->
            if (status != TextToSpeech.ERROR) {
                textToSpeech.language = Locale.UK
            }
        }

        binding.convertBnt.setOnClickListener {
            val toSpeech: String = binding.editText.text.toString()
            if(!toSpeech.isEmpty()) {
                Toast.makeText(this, toSpeech, Toast.LENGTH_LONG).show()
                textToSpeech.speak(toSpeech, TextToSpeech.QUEUE_FLUSH, null)
            }else Toast.makeText(this, "Enter a Text", Toast.LENGTH_SHORT).show()
        }

    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/kareem983/Speech_Text_Converter/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/kareem983/Speech_Text_Converter).|
|3.|Follow code author [here](https://github.com/kareem983).|
