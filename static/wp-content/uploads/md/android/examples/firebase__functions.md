# Firebase Cloud Functions Quickstart


This is an example about Firebase Cloud functions.

### Getting Started

Follow these steps first:

- Add Firebase to your Android Project. You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.
- Run the sample on Android device or emulator.
- Add Firebase to your Android Project.
- Deploy the provided cloud functions:

```shell
# Move to the `functions` subdirectory of quickstart-android
cd functions

# Install all of the dependencies of the cloud functions
cd functions
npm install
cd ../

# Deploy functions to your Firebase project
firebase --project=YOUR_PROJECT_ID deploy --only functions
```


### Screenshots

Run the sample on Android device or emulator. Here is what you will get:

![Firebase Cloud Functions Tutorial](https://github.com/firebase/quickstart-android/raw/master/functions/app/src/screen.png)

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 14 dependencies:

1. Our `Activity-ktx` library.
2. Our `Fragment-ktx` library.
3. Our `Appcompat` library.
4. Our `Material` library.
5. Our `Firebase-bom` library.
6. Our `Com.google.firebase` library.
7. Our `Firebase-ui-auth` library.
8. Our `Play-services-auth` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

android {
    // Changes the test build type for instrumented tests to "stage".
    testBuildType "release"
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.samples.quickstart.functions"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            testProguardFiles getDefaultProguardFile('proguard-android.txt'), 'test-proguard-rules.pro'
            signingConfig signingConfigs.debug
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    implementation 'androidx.activity:activity-ktx:1.6.0'
    implementation 'androidx.fragment:fragment-ktx:1.5.3'
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'com.google.android.material:material:1.6.1'

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Cloud Functions for Firebase (Java)
    implementation 'com.google.firebase:firebase-functions'

    // Cloud Functions for Firebase (Kotlin)
    implementation 'com.google.firebase:firebase-functions-ktx'

    // Firebase Authentication (Java)
    implementation 'com.google.firebase:firebase-auth'

    // Firebase Authentication (Kotlin)
    implementation 'com.google.firebase:firebase-auth-ktx'

    // Firebase Cloud Messaging
    implementation 'com.google.firebase:firebase-messaging'

    // Firebase UI
    implementation 'com.firebaseui:firebase-ui-auth:8.0.2'
    
    // Google Play services
    implementation 'com.google.android.gms:play-services-auth:20.3.0'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>

<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.samples.quickstart.functions">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:networkSecurityConfig="@xml/network_security_config">


        <activity android:name=".java.MainActivity"/>
        <activity android:name=".kotlin.MainActivity"/>

        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".java.FunctionsMessagingService"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

        <service
            android:name=".kotlin.FunctionsMessagingService"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

    </application>

</manifest>
```

#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following components:

1. `ScrollView`
2. `LinearLayout`
3. `ImageView`
4. `com.google.android.material.card.MaterialCardView`
5. `androidx.constraintlayout.widget.ConstraintLayout`
6. `TextView`
7. `EditText`
8. `com.google.android.material.button.MaterialButton`

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.google.samples.quickstart.functions.java.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:gravity="center_horizontal"
        android:orientation="vertical">

        <ImageView
            android:id="@+id/icon"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="16dp"
            android:src="@drawable/firebase_lockup_400" />

        <com.google.android.material.card.MaterialCardView
            android:id="@+id/card_add_numbers"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="20dp"
            app:cardBackgroundColor="@android:color/white"
            app:cardUseCompatPadding="true">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:padding="16dp">

                <TextView
                    android:id="@+id/header_add_numbers"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/heading_add_numbers"
                    android:textSize="20sp"
                    android:textStyle="bold"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />

                <EditText
                    android:id="@+id/fieldFirstNumber"
                    android:layout_width="50dp"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:inputType="number"
                    app:layout_constraintStart_toStartOf="@+id/header_add_numbers"
                    app:layout_constraintTop_toBottomOf="@+id/header_add_numbers"
                    tools:text="1" />

                <TextView
                    android:id="@+id/labelPlus"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/plus"
                    android:textSize="14sp"
                    android:textStyle="bold"
                    app:layout_constraintBottom_toBottomOf="@+id/fieldFirstNumber"
                    app:layout_constraintStart_toEndOf="@+id/fieldFirstNumber"
                    app:layout_constraintTop_toTopOf="@+id/fieldFirstNumber" />

                <EditText
                    android:id="@+id/fieldSecondNumber"
                    android:layout_width="50dp"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:inputType="number"
                    tools:text="1"
                    app:layout_constraintBottom_toBottomOf="@+id/labelPlus"
                    app:layout_constraintStart_toEndOf="@+id/labelPlus"
                    app:layout_constraintTop_toTopOf="@+id/labelPlus" />

                <TextView
                    android:id="@+id/labelEquals"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/equals"
                    android:textSize="14sp"
                    android:textStyle="bold"
                    app:layout_constraintBottom_toBottomOf="@+id/fieldSecondNumber"
                    app:layout_constraintStart_toEndOf="@+id/fieldSecondNumber"
                    app:layout_constraintTop_toTopOf="@+id/fieldSecondNumber" />

                <EditText
                    android:id="@+id/fieldAddResult"
                    android:layout_width="50dp"
                    android:layout_height="wrap_content"
                    android:enabled="false"
                    android:gravity="center"
                    android:inputType="number"
                    tools:text="2"
                    app:layout_constraintBottom_toBottomOf="@+id/labelEquals"
                    app:layout_constraintStart_toEndOf="@+id/labelEquals"
                    app:layout_constraintTop_toTopOf="@+id/labelEquals" />


                <com.google.android.material.button.MaterialButton
                    android:id="@+id/buttonCalculate"
                    style="@style/Widget.MaterialComponents.Button.TextButton"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/calculate"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/fieldFirstNumber" />

            </androidx.constraintlayout.widget.ConstraintLayout>

        </com.google.android.material.card.MaterialCardView>

        <com.google.android.material.card.MaterialCardView
            android:id="@+id/card_add_message"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardBackgroundColor="@android:color/white"
            app:cardUseCompatPadding="true">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:padding="16dp">

                <TextView
                    android:id="@+id/header_add_message"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/heading_add_message"
                    android:textSize="20sp"
                    android:textStyle="bold"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />

                <EditText
                    android:id="@+id/fieldMessageInput"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:hint="@string/input"
                    android:inputType="text"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/header_add_message"
                    tools:text="some bad message" />

                <EditText
                    android:id="@+id/fieldMessageOutput"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:enabled="false"
                    android:hint="@string/output"
                    android:inputType="text"
                    app:layout_constraintEnd_toEndOf="@+id/fieldMessageInput"
                    app:layout_constraintStart_toStartOf="@+id/fieldMessageInput"
                    app:layout_constraintTop_toBottomOf="@+id/fieldMessageInput"
                    tools:text="some clean message" />

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/buttonSignIn"
                    style="@style/Widget.MaterialComponents.Button.TextButton"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_alignTop="@+id/buttonAddMessage"
                    android:layout_toStartOf="@+id/buttonAddMessage"
                    android:layout_toLeftOf="@+id/buttonAddMessage"
                    android:text="@string/sign_in"
                    app:layout_constraintEnd_toStartOf="@+id/buttonAddMessage"
                    app:layout_constraintTop_toBottomOf="@+id/fieldMessageOutput" />

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/buttonAddMessage"
                    style="@style/Widget.MaterialComponents.Button.TextButton"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/add_message"
                    app:layout_constraintEnd_toEndOf="@+id/fieldMessageOutput"
                    app:layout_constraintTop_toBottomOf="@+id/fieldMessageOutput" />

            </androidx.constraintlayout.widget.ConstraintLayout>

        </com.google.android.material.card.MaterialCardView>

    </LinearLayout>

</ScrollView>

```

#### Step 4. Write JavaScript Code

We need to write our JavaScript code to be placed on the cloud as follows:

**(a). `sanitizer.js`**

```javascript
'use strict';

const capitalizeSentence = require('capitalize-sentence');
const Filter = require('bad-words');
const badWordsFilter = new Filter();

// Sanitizes the given text if needed by replacing bad words with '*'.
exports.sanitizeText = (text) => {
  // Re-capitalize if the user is Shouting.
  if (isShouting(text)) {
    console.log('User is shouting. Fixing sentence case...');
    text = stopShouting(text);
  }

  // Moderate if the user uses SwearWords.
  if (containsSwearwords(text)) {
    console.log('User is swearing. moderating...');
    text = replaceSwearwords(text);
  }

  return text;
};

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
  return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function replaceSwearwords(message) {
  return badWordsFilter.clean(message);
}

// Detect if the current message is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(message) {
  return message.replace(/[^A-Z]/g, '').length > message.length / 2 || message.replace(/[^!]/g, '').length >= 3;
}

// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(message) {
  return capitalizeSentence(message.toLowerCase()).replace(/!+/g, '.');
}

```

**(b). `index.js`**

```javascript
'use strict';

const functions = require('firebase-functions');
const sanitizer = require('./sanitizer');
const admin = require('firebase-admin');
admin.initializeApp();

// [START allAdd]
// [START addFunctionTrigger]
// Adds two numbers to each other.
exports.addNumbers = functions.https.onCall((data) => {
// [END addFunctionTrigger]
  // [START readAddData]
  // Numbers passed from the client.
  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;
  // [END readAddData]

  // [START addHttpsError]
  // Checking that attributes are present and are numbers.
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
  }
  // [END addHttpsError]

  // [START returnAddData]
  // returning result.
  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
  };
  // [END returnAddData]
});
// [END allAdd]

// [START messageFunctionTrigger]
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data, context) => {
  // [START_EXCLUDE]
  // [START readMessageData]
  // Message text passed from the client.
  const text = data.text;
  // [END readMessageData]
  // [START messageHttpsErrors]
  // Checking attribute.
  if (!(typeof text === 'string') || text.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "text" containing the message text to add.');
  }
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }
  // [END messageHttpsErrors]

  // [START authIntegration]
  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid;
  const name = context.auth.token.name || null;
  const picture = context.auth.token.picture || null;
  const email = context.auth.token.email || null;
  // [END authIntegration]

  // [START returnMessageAsync]
  // Saving the new message to the Realtime Database.
  const sanitizedMessage = sanitizer.sanitizeText(text); // Sanitize the message.
  return admin.database().ref('/messages').push({
    text: sanitizedMessage,
    author: { uid, name, picture, email },
  }).then(() => {
    // Optionally send a push notification with the message.
    if (data.push && context.instanceIdToken) {
      return admin.messaging().send({
        token: context.instanceIdToken,
        data: { text: sanitizedMessage },
      });
    }
  }).then(() => {
    console.log('New Message written');
    return sanitizedMessage;
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
  // [END returnMessageAsync]
  // [END_EXCLUDE]
});
// [END messageFunctionTrigger]

```

### Step 5: Write Kotlin Code

Let us write our Kotlin code:

**(1). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice
import com.google.samples.quickstart.functions.java.MainActivity

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Functions quickstart written in Java.",
                        Intent(this, MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Functions quickstart written in Kotlin.",
                        Intent(
                            this,
                            com.google.samples.quickstart.functions.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `FunctionsMessagingService.kt`**

> Our `FunctionsMessagingService` class.

Create a Kotlin file named `FunctionsMessagingService.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `NotificationChannel` from the `android.app` package.
2. `NotificationManager` from the `android.app` package.
3. `Build` from the `android.os` package.
4. `NotificationCompat` from the `androidx.core.app` package.
5. `NotificationManagerCompat` from the `androidx.core.app` package.
6. `Log` from the `android.util` package.

Next create a class that derives from `FirebaseMessagingService` and add its contents as follows:

We will be overriding the following functions: 

1. `onMessageReceived(remoteMessage: RemoteMessage) `.

We will be creating the following methods:

1. `createNotificationChannel() `.

**(a). Our `createNotificationChannel()` function**

Write the `createNotificationChannel()` function as follows:

```kotlin
    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel("Messages", "Messages", importance)
            channel.description = "All messages."
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.google.samples.quickstart.functions.R

class FunctionsMessagingService : FirebaseMessagingService() {

    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel("Messages", "Messages", importance)
            channel.description = "All messages."
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
        }
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        createNotificationChannel()

        // Check if message contains a data payload.
        if (remoteMessage.data.isNotEmpty()) {
            Log.d(TAG, "Message data payload: " + remoteMessage.data)
            val manager = NotificationManagerCompat.from(this)
            val notification = NotificationCompat.Builder(this, "Messages")
                    .setContentText(remoteMessage.data["text"])
                    .setContentTitle("New message")
                    .setSmallIcon(R.drawable.ic_stat_notification)
                    .build()
            manager.notify(0, notification)
        }
    }

    companion object {
        private const val TAG = "MessagingService"
    }
}


```

**(c). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onClick(view: View) `.

We will be creating the following methods:

1. `addNumbers(a: Int, b: Int): Task<Int> `.
2. `addMessage(parameter)` - Let's pass a `String` object as a parameter.
3. `onCalculateClicked() `.
4. `onAddMessageClicked() `.
5. `onSignInClicked() `.
6. `showSnackbar(parameter)` - Our function will take a `String` object as a parameter.
7. `signIn() `.
8. `hideKeyboard() `.
9. `onSignInResult(parameter)` - We pass a `FirebaseAuthUIAuthenticationResult` object as a parameter.
10. `askNotificationPermission() `.

**(a). Our `addMessage()` function**

Write the `addMessage()` function as follows:

```kotlin
    private fun addMessage(text: String): Task<String> {
        // Create the arguments to the callable function.
        val data = hashMapOf(
            "text" to text,
            "push" to true
        )

        return functions
                .getHttpsCallable("addMessage")
                .call(data)
                .continueWith { task ->
                    // This continuation runs on either success or failure, but if the task
                    // has failed then result will throw an Exception which will be
                    // propagated down.
                    val result = task.result?.data as String
                    result
                }
    }
```

**(b). Our `addNumbers()` function**

Write the `addNumbers()` function as follows:

```kotlin
    private fun addNumbers(a: Int, b: Int): Task<Int> {
        // Create the arguments to the callable function, which are two integers
        val data = hashMapOf(
            "firstNumber" to a,
            "secondNumber" to b
        )

        // Call the function and extract the operation from the result
        return functions
                .getHttpsCallable("addNumbers")
                .call(data)
                .continueWith { task ->
                    // This continuation runs on either success or failure, but if the task
                    // has failed then task.result will throw an Exception which will be
                    // propagated down.
                    val result = task.result?.data as Map<String, Any>
                    result["operationResult"] as Int
                }
    }
```

**(c). Our `onCalculateClicked()` function**

Write the `onCalculateClicked()` function as follows:

```kotlin
    private fun onCalculateClicked() {
        val firstNumber: Int
        val secondNumber: Int

        hideKeyboard()

        try {
            firstNumber = Integer.parseInt(binding.fieldFirstNumber.text.toString())
            secondNumber = Integer.parseInt(binding.fieldSecondNumber.text.toString())
        } catch (e: NumberFormatException) {
            showSnackbar("Please enter two numbers.")
            return
        }

        // [START call_add_numbers]
        addNumbers(firstNumber, secondNumber)
                .addOnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        val e = task.exception
                        if (e is FirebaseFunctionsException) {

                            // Function error code, will be INTERNAL if the failure
                            // was not handled properly in the function call.
                            val code = e.code

                            // Arbitrary error details passed back from the function,
                            // usually a Map<String, Any>.
                            val details = e.details
                        }

                        // [START_EXCLUDE]
                        Log.w(TAG, "addNumbers:onFailure", e)
                        showSnackbar("An error occurred.")
                        return@addOnCompleteListener
                        // [END_EXCLUDE]
                    }

                    // [START_EXCLUDE]
                    val result = task.result
                    binding.fieldAddResult.setText(result.toString())
                    // [END_EXCLUDE]
                }
        // [END call_add_numbers]
    }
```

**(d). Our `onSignInClicked()` function**

Write the `onSignInClicked()` function as follows:

```kotlin
    private fun onSignInClicked() {
        if (Firebase.auth.currentUser != null) {
            showSnackbar("Signed in.")
            return
        }

        signIn()
    }
```

**(e). Our `showSnackbar()` function**

Write the `showSnackbar()` function as follows:

```kotlin
    private fun showSnackbar(message: String) {
        Snackbar.make(findViewById(android.R.id.content), message, Snackbar.LENGTH_SHORT).show()
    }
```

**(f). Our `onSignInResult()` function**

Write the `onSignInResult()` function as follows:

```kotlin
    private fun onSignInResult(result: FirebaseAuthUIAuthenticationResult) {
        if (result.resultCode == Activity.RESULT_OK) {
            showSnackbar("Signed in.")
        } else {
            showSnackbar("Error signing in.")

            val response = result.idpResponse
            Log.w(TAG, "signIn", response?.error)
        }
    }
```

**(g). Our `onAddMessageClicked()` function**

Write the `onAddMessageClicked()` function as follows:

```kotlin
    private fun onAddMessageClicked() {
        val inputMessage = binding.fieldMessageInput.text.toString()

        if (TextUtils.isEmpty(inputMessage)) {
            showSnackbar("Please enter a message.")
            return
        }

        // [START call_add_message]
        addMessage(inputMessage)
                .addOnCompleteListener(OnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        val e = task.exception
                        if (e is FirebaseFunctionsException) {
                            val code = e.code
                            val details = e.details
                        }

                        // [START_EXCLUDE]
                        Log.w(TAG, "addMessage:onFailure", e)
                        showSnackbar("An error occurred.")
                        return@OnCompleteListener
                        // [END_EXCLUDE]
                    }

                    // [START_EXCLUDE]
                    val result = task.result
                    binding.fieldMessageOutput.setText(result)
                    // [END_EXCLUDE]
                })
        // [END call_add_message]
    }
```

**(h). Our `signIn()` function**

Write the `signIn()` function as follows:

```kotlin
    private fun signIn() {
        val signInLauncher = registerForActivityResult(
            FirebaseAuthUIActivityResultContract()
        ) { result -> this.onSignInResult(result)}

        val signInIntent = AuthUI.getInstance()
                .createSignInIntentBuilder()
                .setAvailableProviders(listOf(AuthUI.IdpConfig.EmailBuilder().build()))
                .setIsSmartLockEnabled(false)
                .build()

        signInLauncher.launch(signInIntent)
    }
```

**(i). Our `hideKeyboard()` function**

Write the `hideKeyboard()` function as follows:

```kotlin
    private fun hideKeyboard() {
        val view = this.currentFocus
        if (view != null) {
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(view.windowToken, 0)
        }
    }
```

**(j). Our `askNotificationPermission()` function**

Write the `askNotificationPermission()` function as follows:

```kotlin
    private fun askNotificationPermission() {
        // This is only necessary for API Level > 33 (TIRAMISU)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
                PackageManager.PERMISSION_GRANTED
            ) {
                // FCM SDK (and your app) can post notifications.
            } else {
                // Directly ask for the permission
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.firebase.ui.auth.AuthUI
import com.firebase.ui.auth.FirebaseAuthUIActivityResultContract
import com.firebase.ui.auth.data.model.FirebaseAuthUIAuthenticationResult
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.gms.tasks.Task
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.auth.ktx.auth
import com.google.firebase.functions.FirebaseFunctions
import com.google.firebase.functions.FirebaseFunctionsException
import com.google.firebase.functions.ktx.functions
import com.google.firebase.ktx.Firebase
import com.google.samples.quickstart.functions.R
import com.google.samples.quickstart.functions.databinding.ActivityMainBinding

/**
 * This activity demonstrates the Android SDK for Callable Functions.
 *
 * For more information, see the documentation for Cloud Functions for Firebase:
 * https://firebase.google.com/docs/functions/
 */
class MainActivity : AppCompatActivity(), View.OnClickListener {

    // [START define_functions_instance]
    private lateinit var functions: FirebaseFunctions
    // [END define_functions_instance]

    private lateinit var binding: ActivityMainBinding

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted: Boolean ->
        if (isGranted) {
            Toast.makeText(this, "Notifications permission granted",Toast.LENGTH_SHORT)
                .show()
        } else {
            Toast.makeText(this, "FCM can't post notifications without POST_NOTIFICATIONS permission",
                Toast.LENGTH_LONG).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        with(binding) {
            buttonCalculate.setOnClickListener(this@MainActivity)
            buttonAddMessage.setOnClickListener(this@MainActivity)
            buttonSignIn.setOnClickListener(this@MainActivity)
        }

        // [START initialize_functions_instance]
        functions = Firebase.functions
        // [END initialize_functions_instance]

        askNotificationPermission()
    }

    // [START function_add_numbers]
    private fun addNumbers(a: Int, b: Int): Task<Int> {
        // Create the arguments to the callable function, which are two integers
        val data = hashMapOf(
            "firstNumber" to a,
            "secondNumber" to b
        )

        // Call the function and extract the operation from the result
        return functions
                .getHttpsCallable("addNumbers")
                .call(data)
                .continueWith { task ->
                    // This continuation runs on either success or failure, but if the task
                    // has failed then task.result will throw an Exception which will be
                    // propagated down.
                    val result = task.result?.data as Map<String, Any>
                    result["operationResult"] as Int
                }
    }
    // [END function_add_numbers]

    // [START function_add_message]
    private fun addMessage(text: String): Task<String> {
        // Create the arguments to the callable function.
        val data = hashMapOf(
            "text" to text,
            "push" to true
        )

        return functions
                .getHttpsCallable("addMessage")
                .call(data)
                .continueWith { task ->
                    // This continuation runs on either success or failure, but if the task
                    // has failed then result will throw an Exception which will be
                    // propagated down.
                    val result = task.result?.data as String
                    result
                }
    }
    // [END function_add_message]

    private fun onCalculateClicked() {
        val firstNumber: Int
        val secondNumber: Int

        hideKeyboard()

        try {
            firstNumber = Integer.parseInt(binding.fieldFirstNumber.text.toString())
            secondNumber = Integer.parseInt(binding.fieldSecondNumber.text.toString())
        } catch (e: NumberFormatException) {
            showSnackbar("Please enter two numbers.")
            return
        }

        // [START call_add_numbers]
        addNumbers(firstNumber, secondNumber)
                .addOnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        val e = task.exception
                        if (e is FirebaseFunctionsException) {

                            // Function error code, will be INTERNAL if the failure
                            // was not handled properly in the function call.
                            val code = e.code

                            // Arbitrary error details passed back from the function,
                            // usually a Map<String, Any>.
                            val details = e.details
                        }

                        // [START_EXCLUDE]
                        Log.w(TAG, "addNumbers:onFailure", e)
                        showSnackbar("An error occurred.")
                        return@addOnCompleteListener
                        // [END_EXCLUDE]
                    }

                    // [START_EXCLUDE]
                    val result = task.result
                    binding.fieldAddResult.setText(result.toString())
                    // [END_EXCLUDE]
                }
        // [END call_add_numbers]
    }

    private fun onAddMessageClicked() {
        val inputMessage = binding.fieldMessageInput.text.toString()

        if (TextUtils.isEmpty(inputMessage)) {
            showSnackbar("Please enter a message.")
            return
        }

        // [START call_add_message]
        addMessage(inputMessage)
                .addOnCompleteListener(OnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        val e = task.exception
                        if (e is FirebaseFunctionsException) {
                            val code = e.code
                            val details = e.details
                        }

                        // [START_EXCLUDE]
                        Log.w(TAG, "addMessage:onFailure", e)
                        showSnackbar("An error occurred.")
                        return@OnCompleteListener
                        // [END_EXCLUDE]
                    }

                    // [START_EXCLUDE]
                    val result = task.result
                    binding.fieldMessageOutput.setText(result)
                    // [END_EXCLUDE]
                })
        // [END call_add_message]
    }

    private fun onSignInClicked() {
        if (Firebase.auth.currentUser != null) {
            showSnackbar("Signed in.")
            return
        }

        signIn()
    }

    private fun showSnackbar(message: String) {
        Snackbar.make(findViewById(android.R.id.content), message, Snackbar.LENGTH_SHORT).show()
    }

    private fun signIn() {
        val signInLauncher = registerForActivityResult(
            FirebaseAuthUIActivityResultContract()
        ) { result -> this.onSignInResult(result)}

        val signInIntent = AuthUI.getInstance()
                .createSignInIntentBuilder()
                .setAvailableProviders(listOf(AuthUI.IdpConfig.EmailBuilder().build()))
                .setIsSmartLockEnabled(false)
                .build()

        signInLauncher.launch(signInIntent)
    }

    private fun hideKeyboard() {
        val view = this.currentFocus
        if (view != null) {
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(view.windowToken, 0)
        }
    }

    private fun onSignInResult(result: FirebaseAuthUIAuthenticationResult) {
        if (result.resultCode == Activity.RESULT_OK) {
            showSnackbar("Signed in.")
        } else {
            showSnackbar("Error signing in.")

            val response = result.idpResponse
            Log.w(TAG, "signIn", response?.error)
        }
    }

    override fun onClick(view: View) {
        when (view.id) {
            R.id.buttonCalculate -> onCalculateClicked()
            R.id.buttonAddMessage -> onAddMessageClicked()
            R.id.buttonSignIn -> onSignInClicked()
        }
    }

    private fun askNotificationPermission() {
        // This is only necessary for API Level > 33 (TIRAMISU)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
                PackageManager.PERMISSION_GRANTED
            ) {
                // FCM SDK (and your app) can post notifications.
            } else {
                // Directly ask for the permission
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }
    }

    companion object {
        private const val TAG = "MainActivity"
    }
}


```


### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/functions/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
