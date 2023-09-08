# Kotlin Android Firebase Authentication Examples


With Firebase Authentication, you can provide personalized access to your app features, as well as securely save user data in the cloud thus providing controlled access across a myriad of devices. This is possible since Firebase Authentication provides provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app.

It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more. Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.


### Key Features

Here are the main features of Firebase Authentication:

1. Drop-in authentication solution - FirebaseUI provides a drop-in auth solution that handles the UI flows for signing in users with email addresses and passwords, phone numbers, and with popular federated identity providers, including Google Sign-In and Facebook Login.
2. Email and password based authentication.
3. Federated identity provider integration - Authenticate users by integrating with federated identity providers. The Firebase Authentication SDK provides methods that allow users to sign in with their Google, Facebook, Twitter, and GitHub accounts.
4. Phone number authentication.
5. Custom auth system integration - Connect your app's existing sign-in system to the Firebase Authentication SDK and gain access to Firebase Realtime Database and other Firebase services.
6. Anonymous auth - Use features that require authentication without requiring users to sign in first by creating temporary anonymous accounts. If the user later chooses to sign up, you can upgrade the anonymous account to a regular account, so the user can continue where they left off.

Let us look at some examples.

## Example 1:

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Add Firebase to your project

If you do not know how to add firebase to your project then follow the instructions [here](https://camposha.info/android-examples/add-firebase-to-android/).

### Step 3: Dependencies and Gradle

First go to your project-level(located in the root folder of your project) `build.gradle` and be sure to add google services classpath:

```groovy
buildscript {
    repositories {
        mavenLocal()
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.0.0'
        classpath 'com.google.gms:google-services:4.3.8'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.21'
    }
}
```

Then go to your `app/build.gradle` and start by ensuring you register the `com.google.gms.google-services` as a plugin as shown below. Add this at the very top of the file:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}
```

Here are the dependencies we will use:

```groovy
    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:28.3.0')

    // Firebase Authentication (Java)
    implementation 'com.google.firebase:firebase-auth'

    // Firebase Authentication (Kotlin)
    implementation 'com.google.firebase:firebase-auth-ktx'

    // Google Sign In SDK (only required for Google Sign In)
    implementation 'com.google.android.gms:play-services-auth:19.2.0'

    // Firebase UI
    // Used in FirebaseUIActivity.
    implementation 'com.firebaseui:firebase-ui-auth:8.0.0'

    // Facebook Android SDK (only required for Facebook Login)
    // Used in FacebookLoginActivity.
    implementation 'com.facebook.android:facebook-login:8.1.0'
    implementation 'androidx.browser:browser:1.0.0'
```

### Step 4: Implement Desired Authentication

For example, let us look at how to implement different types of authentication:

#### (a). Anonymous Authentication

With Anonymous Authentication you can use features that require authentication without requiring users to sign in first by creating temporary anonymous accounts. If the user later chooses to sign up, you can upgrade the anonymous account to a regular account, so the user can continue where they left off.

To sign a user in anonymously, invoke the `signInAnonymously()` function of `FirebaseAuth` class:

```kotlin
    private fun signInAnonymously() {
        showProgressBar()
        auth.signInAnonymously()
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInAnonymously:success")
                        val user = auth.currentUser
                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "signInAnonymously:failure", task.exception)
                        Toast.makeText(context, "Authentication failed.",
                                Toast.LENGTH_SHORT).show()
                        updateUI(null)
                    }

                    hideProgressBar()
                }
    }
```

And to sign out invoke the `signOut()` function of that class:

```kotlin
    private fun signOut() {
        auth.signOut()
        updateUI(null)
    }
```

#### (b). Email/Password Authentication

You can also authenticate users via the classic email password combination. The Firebase Authentication SDK provides methods to create and manage users that use their email addresses and passwords to sign in. Firebase Authentication also handles sending password reset emails.

To create an account you need to invoke the `createUserWithEmailAndPassword()` function of the `FirebaseAuth` class, passing in the email and password. You can then attach a listener like `OnCompleteListener`. In that listener you can check if the account creation has been successful via the `isSuccessful()` function of the `Task` class.

Here is an example in Kotlin:

```kotlin

    private fun createAccount(email: String, password: String) {
        Log.d(TAG, "createAccount:$email")
        if (!validateForm()) {
            return
        }

        showProgressBar()

        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "createUserWithEmail:success")
                        val user = auth.currentUser
                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "createUserWithEmail:failure", task.exception)
                        Toast.makeText(context, "Authentication failed.",
                                Toast.LENGTH_SHORT).show()
                        updateUI(null)
                    }

                    hideProgressBar()
                }
    }
```

To sign in a user you need to invoke the `signInWithEmailAndPassword()` function of the FirebaseAuth class, and pass the email and password as parameters. You can also attach a completion listener and check if the login task has been successful.

Here's an example in Kotlin:

```kotlin
    private fun signIn(email: String, password: String) {
        Log.d(TAG, "signIn:$email")
        if (!validateForm()) {
            return
        }

        showProgressBar()

        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInWithEmail:success")
                        val user = auth.currentUser
                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "signInWithEmail:failure", task.exception)
                        Toast.makeText(context, "Authentication failed.",
                                Toast.LENGTH_SHORT).show()
                        updateUI(null)
                        checkForMultiFactorFailure(task.exception!!)
                    }

                    if (!task.isSuccessful) {
                        binding.status.setText(R.string.auth_failed)
                    }
                    hideProgressBar()
                }
    }
```

to sign out you simply invoke the `signOut()` function of the `FirebaseAuth` class:

```kotlin
    private fun signOut() {
        auth.signOut()
        updateUI(null)
    }
```

If you want to send an email verification you need to start by obtaining the current user, then invike the `sendVerification()` function and attach a completion listener:

```kotlin
    private fun sendEmailVerification() {
        // Disable button
        binding.verifyEmailButton.isEnabled = false

        // Send verification email
        val user = auth.currentUser!!
        user.sendEmailVerification()
                .addOnCompleteListener(requireActivity()) { task ->
                    // Re-enable button
                    binding.verifyEmailButton.isEnabled = true

                    if (task.isSuccessful) {
                        Toast.makeText(context,
                                "Verification email sent to ${user.email} ",
                                Toast.LENGTH_SHORT).show()
                    } else {
                        Log.e(TAG, "sendEmailVerification", task.exception)
                        Toast.makeText(context,
                                "Failed to send verification email.",
                                Toast.LENGTH_SHORT).show()
                    }
                }
    }
```

If you want to reload or refresh a FirebaseUser you need to invoke the `reload()` function:

```kotlin
    private fun reload() {
        auth.currentUser!!.reload().addOnCompleteListener { task ->
            if (task.isSuccessful) {
                updateUI(auth.currentUser)
                Toast.makeText(context, "Reload successful!", Toast.LENGTH_SHORT).show()
            } else {
                Log.e(TAG, "reload", task.exception)
                Toast.makeText(context, "Failed to reload user.", Toast.LENGTH_SHORT).show()
            }
        }
    }
```

#### (c). Phone Number Authentication

You can also authenticate users by sending SMS messages to their phones.

To sign in a user invoke the `signInWithCredential()` function and pass it a `PhoneAuthCredential` instance. Then attach a completion listener and then check for success:

```kotlin
    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        auth.signInWithCredential(credential)
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInWithCredential:success")

                        val user = task.result?.user
                        updateUI(STATE_SIGNIN_SUCCESS, user)
                    } else {
                        // Sign in failed, display a message and update the UI
                        Log.w(TAG, "signInWithCredential:failure", task.exception)
                        if (task.exception is FirebaseAuthInvalidCredentialsException) {
                            // The verification code entered was invalid
                            binding.fieldVerificationCode.error = "Invalid code."
                        }
                        // Update UI
                        updateUI(STATE_SIGNIN_FAILED)
                    }
                }
    }
```

To sign out a user invoke the `signOut()` function:

```kotlin
    private fun signOut() {
        auth.signOut()
        updateUI(STATE_INITIALIZED)
    }
```

To initiate phone verification, first construct a `PhoneAuthOptions` object using the builder pattern then pass it to `verifyPhoneNumber()` function of the `PhoneAuthProvider` class:

```kotlin

    private fun startPhoneNumberVerification(phoneNumber: String) {
        val options = PhoneAuthOptions.newBuilder(auth)
            .setPhoneNumber(phoneNumber)       // Phone number to verify
            .setTimeout(60L, TimeUnit.SECONDS) // Timeout and unit
            .setActivity(requireActivity())                 // Activity (for callback binding)
            .setCallbacks(callbacks)          // OnVerificationStateChangedCallbacks
            .build()
        PhoneAuthProvider.verifyPhoneNumber(options)

        verificationInProgress = true
    }
```

To verify phone number with code:

```kotlin
    private fun verifyPhoneNumberWithCode(verificationId: String?, code: String) {
        val credential = PhoneAuthProvider.getCredential(verificationId!!, code)
        signInWithPhoneAuthCredential(credential)
    }
```

To resend verification code:

```kotlin
    private fun resendVerificationCode(
        phoneNumber: String,
        token: PhoneAuthProvider.ForceResendingToken?
    ) {
        val optionsBuilder = PhoneAuthOptions.newBuilder(auth)
            .setPhoneNumber(phoneNumber)       // Phone number to verify
            .setTimeout(60L, TimeUnit.SECONDS) // Timeout and unit
            .setActivity(requireActivity())                 // Activity (for callback binding)
            .setCallbacks(callbacks)          // OnVerificationStateChangedCallbacks
        if (token != null) {
            optionsBuilder.setForceResendingToken(token) // callback's ForceResendingToken
        }
        PhoneAuthProvider.verifyPhoneNumber(optionsBuilder.build())
    }
```

#### (d). Passwordless Authentication

You can also authenticate users without passwords, by sending links to their emails.

To send a sign-in link to a provided email, invoke the `sendSignInLinkToEmail()` function and pass in an email as well as an action code settings. Then listen to the completion listener and check for success using the `isSuccessful()` function:

```kotlin
    private fun sendSignInLink(email: String) {
        val settings = actionCodeSettings {
            setAndroidPackageName(
                    packageName,
                    false, null/* minimum app version */)/* install if not available? */
            handleCodeInApp = true
            url = "https://kotlin.auth.example.com/emailSignInLink"
        }

        hideKeyboard(binding.fieldEmail)
        showProgressBar()

        auth.sendSignInLinkToEmail(email, settings)
                .addOnCompleteListener { task ->
                    hideProgressBar()

                    if (task.isSuccessful) {
                        Log.d(TAG, "Link sent")
                        showSnackbar("Sign-in link sent!")

                        pendingEmail = email
                        binding.status.setText(R.string.status_email_sent)
                    } else {
                        val e = task.exception
                        Log.w(TAG, "Could not send link", e)
                        showSnackbar("Failed to send link.")

                        if (e is FirebaseAuthInvalidCredentialsException) {
                            binding.fieldEmail.error = "Invalid email address."
                        }
                    }
                }
    }
```

Sign in using an email address and a link, the link is passed to the Activity from the dynamic link contained in the email.

```kotlin
    private fun signInWithEmailLink(email: String, link: String?) {
        Log.d(TAG, "signInWithLink:" + link!!)

        hideKeyboard(binding.fieldEmail)
        showProgressBar()

        auth.signInWithEmailLink(email, link)
                .addOnCompleteListener { task ->
                    hideProgressBar()
                    if (task.isSuccessful) {
                        Log.d(TAG, "signInWithEmailLink:success")

                        binding.fieldEmail.text = null
                        updateUI(task.result?.user)
                    } else {
                        Log.w(TAG, "signInWithEmailLink:failure", task.exception)
                        updateUI(null)

                        if (task.exception is FirebaseAuthActionCodeException) {
                            showSnackbar("Invalid or expired sign-in link.")
                        }
                    }
                }
    }
```

To sign out simply invoke the `signOut()` function:

```kotlin
    private fun onSignOutClicked() {
        auth.signOut()

        updateUI(null)
        binding.status.setText(R.string.status_email_not_sent)
    }
```

#### (e). Google Sign In

You can also sign in with Google, as a Federated identity provider.

You will need to start by configuring Google Sign In:

```kotlin
        // Configure Google Sign In
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build()

        googleSignInClient = GoogleSignIn.getClient(requireContext(), gso)

        // Initialize Firebase Auth
        auth = Firebase.auth
```

Here is how to sign in using Firebase Auth with Google:

```kotlin
    private fun firebaseAuthWithGoogle(idToken: String) {
        showProgressBar()
        val credential = GoogleAuthProvider.getCredential(idToken, null)
        auth.signInWithCredential(credential)
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInWithCredential:success")
                        val user = auth.currentUser
                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "signInWithCredential:failure", task.exception)
                        val view = binding.mainLayout
                        Snackbar.make(view, "Authentication Failed.", Snackbar.LENGTH_SHORT).show()
                        updateUI(null)
                    }

                    hideProgressBar()
                }
    }
```

Here is how to sign out:

```kotlin

    private fun signOut() {
        // Firebase sign out
        auth.signOut()

        // Google sign out
        googleSignInClient.signOut().addOnCompleteListener(requireActivity()) {
            updateUI(null)
        }
    }
```

To revoke access;

```kotlin
    private fun revokeAccess() {
        // Firebase sign out
        auth.signOut()

        // Google revoke access
        googleSignInClient.revokeAccess().addOnCompleteListener(requireActivity()) {
            updateUI(null)
        }
    }
```

#### (f). Facebook Authentication

You can also authenticate using Facebook.

Here is how you sign in:

```kotlin
    private fun handleFacebookAccessToken(token: AccessToken) {
        Log.d(TAG, "handleFacebookAccessToken:$token")
        showProgressBar()

        val credential = FacebookAuthProvider.getCredential(token.token)
        auth.signInWithCredential(credential)
                .addOnCompleteListener(requireActivity()) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInWithCredential:success")
                        val user = auth.currentUser
                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "signInWithCredential:failure", task.exception)
                        Toast.makeText(context, "Authentication failed.",
                                Toast.LENGTH_SHORT).show()
                        updateUI(null)
                    }

                    hideProgressBar()
                }
    }
```

Here is how you sign out:

```kotlin
    fun signOut() {
        auth.signOut()
        LoginManager.getInstance().logOut()

        updateUI(null)
    }
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/firebase/quickstart-android/tree/master/auth) Example |
| 2. | [Follow](https://github.com/firebase/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
