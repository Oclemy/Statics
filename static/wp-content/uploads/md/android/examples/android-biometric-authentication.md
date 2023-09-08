# Kotlin Android Biometric Authentication Example

To provide a much more tighter authentication before exposing sensitive parts of your app, you can implement Biometric Authentication techniques. This is an example of how to implement Biometric Authentication dialog in kotlin android.


![Kotlin Android Biometric Authentication](https://github.com/fajarca/biometric-authentication/raw/master/screenshot/authentication_dialog.png)

### Step 1: Add AndroidX Biometric Dependency

In your app level build.gradle add the Biometric implementation statement as follows:

```groovy
    //Biometric
    implementation 'androidx.biometric:biometric:1.0.1'
```

### Step 2: Design Layout

There are two layouts, one for main activity and one for home activity.

**activity_main.xml**

The layout for the main activity. Includes an imageview some textviews. The textview prompts the user to authenticate him/herself. The other textview will show an error message if the authentication fails:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="Please authenticate yourself"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ivAuthenticate" />

    <ImageView
        android:id="@+id/ivAuthenticate"
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:background="@drawable/fingerprint_selector"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.35" />

    <TextView
        android:id="@+id/tvErrorNotice"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        tools:text="Too many attempt"
        android:textColor="@android:color/holo_red_dark"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**activity_home.xml**

This layout will be inflated into the home activity. It will be opened when the authentication succeeds:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".HomeActivity">

    <ImageView
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        app:srcCompat="@drawable/ic_checkmark"/>

    <TextView
        android:layout_width="wrap_content"
        android:layout_gravity="center"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:textAppearance="@style/TextAppearance.AppCompat.Body2"
        android:text="Authentication successful"/>

</LinearLayout>
```

### Step 3: Write Code

Start by creating some activity extension methods:

**ActivityExtension.kt**

```kotlin
package io.fajarca.project.biometricauthentication.helper

import android.content.Intent
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

fun AppCompatActivity.toast(message : String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

inline fun <reified T : AppCompatActivity> AppCompatActivity.navigateTo() {
    val intent = Intent(this, T::class.java)
    startActivity(intent)
}
```

Then create a class to represent the authentication error states:

**AuthenticationError.kt**

```kotlin
package io.fajarca.project.biometricauthentication.helper

enum class AuthenticationError(val errorCode : Int) {
    CANCELLED(13),
    AUTHENTICATION_DIALOG_DISMISSED(10),
    TOO_MANY_ATTEMPT(7)
}
```

Now create the protected page, the page that will be opened only after authentication:

**HomeActivity.kt**

```kotlin
package io.fajarca.project.biometricauthentication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class HomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
    }
}
```

Finally the launcher activity:

**MainActivity.kt**

Create the activity:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import io.fajarca.project.biometricauthentication.helper.AuthenticationError
import io.fajarca.project.biometricauthentication.helper.navigateTo
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
```

Prepare two instance fields, a BiometricPrompt object and BiometricManager object:

```kotlin
    private lateinit var biometricPrompt : BiometricPrompt
    private lateinit var biometricManager: BiometricManager
```

Create a method to setup biometric authentication:

```kotlin
    private fun setupBiometricAuthentication() {
        biometricManager = BiometricManager.from(this)
        val executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor, biometricCallback)
    }
```

Then create a function to check the biometric feature state:

```kotlin
   private fun checkBiometricFeatureState() {
        when (biometricManager.canAuthenticate()) {
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> setErrorNotice("Sorry. It seems your device has no biometric hardware")
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> setErrorNotice("Biometric features are currently unavailable.")
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> setErrorNotice("You have not registered any biometric credentials")
            BiometricManager.BIOMETRIC_SUCCESS -> {}
        }
    }
```

Then create a function to build biometric prompt:

```kotlin
    private fun buildBiometricPrompt(): BiometricPrompt.PromptInfo {
        return BiometricPrompt.PromptInfo.Builder()
            .setTitle("Verify your identity")
            .setDescription("Confirm your identity so we can verify it's you")
            .setNegativeButtonText("Cancel")
            .setConfirmationRequired(false) //Allows user to authenticate without performing an action, such as pressing a button, after their biometric credential is accepted.
            .build()
    }
```

The following function will check if a biometric feature is supported:

```kotlin
    private fun isBiometricFeatureAvailable(): Boolean {
        return biometricManager.canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS
    }
```

Then handle biometric authentication callbacks:

```kotlin
    private val biometricCallback = object : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
            super.onAuthenticationSucceeded(result)
            navigateTo<HomeActivity>()
        }

        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
            super.onAuthenticationError(errorCode, errString)

            if (errorCode != AuthenticationError.AUTHENTICATION_DIALOG_DISMISSED.errorCode && errorCode != AuthenticationError.CANCELLED.errorCode) {
                setErrorNotice(errString.toString())
            }
        }
    }
```

Here is the full code

```kotlin
package io.fajarca.project.biometricauthentication

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import io.fajarca.project.biometricauthentication.helper.AuthenticationError
import io.fajarca.project.biometricauthentication.helper.navigateTo
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var biometricPrompt : BiometricPrompt
    private lateinit var biometricManager: BiometricManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setupBiometricAuthentication()
        checkBiometricFeatureState()

        ivAuthenticate.setOnClickListener {
            if (isBiometricFeatureAvailable()) {
                biometricPrompt.authenticate(buildBiometricPrompt())
            }
        }

    }

    private fun setupBiometricAuthentication() {
        biometricManager = BiometricManager.from(this)
        val executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor, biometricCallback)
    }

    private fun checkBiometricFeatureState() {
        when (biometricManager.canAuthenticate()) {
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> setErrorNotice("Sorry. It seems your device has no biometric hardware")
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> setErrorNotice("Biometric features are currently unavailable.")
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> setErrorNotice("You have not registered any biometric credentials")
            BiometricManager.BIOMETRIC_SUCCESS -> {}
        }
    }

    private fun buildBiometricPrompt(): BiometricPrompt.PromptInfo {
        return BiometricPrompt.PromptInfo.Builder()
            .setTitle("Verify your identity")
            .setDescription("Confirm your identity so we can verify it's you")
            .setNegativeButtonText("Cancel")
            .setConfirmationRequired(false) //Allows user to authenticate without performing an action, such as pressing a button, after their biometric credential is accepted.
            .build()
    }

    private fun isBiometricFeatureAvailable(): Boolean {
        return biometricManager.canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS
    }

    private val biometricCallback = object : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
            super.onAuthenticationSucceeded(result)
            navigateTo<HomeActivity>()
        }

        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
            super.onAuthenticationError(errorCode, errString)

            if (errorCode != AuthenticationError.AUTHENTICATION_DIALOG_DISMISSED.errorCode && errorCode != AuthenticationError.CANCELLED.errorCode) {
                setErrorNotice(errString.toString())
            }
        }
    }

    private fun setErrorNotice(errorMessage: String) {
        tvErrorNotice.text = errorMessage
    }
}
```

### Reference

Find code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/fajarca/biometric-authentication/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/fajarca/biometric-authentication) code |
| 3. | [Follow](https://github.com/fajarca/) code author |
