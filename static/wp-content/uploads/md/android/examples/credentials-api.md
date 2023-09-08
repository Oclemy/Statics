# Credentials API Examples


In this tutorial you will learn about Credentials API usage via simple step by step examples.


### What is Credentials API

> It is set of facilities that allows us retrieve and save app login credentials.

Through the Smart Lock for Passwords and Connected Accounts API facilitates, you can save and retrieve credentials for your app and associated site. They also help to expedite account creation through credential hints. Integrating with this API will simplify the sign-in experience for users moving between devices where they are signed in to their Google account.

For example, a user may have an account on a website and have saved the credential for this account in Chrome. A new Android app is released for this service to provide a better mobile experience, and users are encouraged to download the app when they visit the site from mobile Chrome. This API allows the app to retrieve the saved password that was used in Chrome, providing a seamless login experience for the user without the need to manually enter credentials.

You can read more [here](https://developers.google.com/android/reference/com/google/android/gms/auth/api/credentials/package-summary).

Let us look at some simple examples:

## Example 1: Credentials API + Google Sign In API

This example teaches you how to use both the Credentials API (SmartLock for Passwords) and the Google Sign In API in the same application.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Go to your `app/build.gradle` and add Google play services auth as follows:

```groovy
    implementation 'com.google.android.gms:play-services-auth:19.0.0'
```

### Step 3: Design Layout

Go to your `activity_main.xml` and design your layout as follows:

**activity_main.xml**

```xml
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:orientation="vertical"
        android:overScrollMode="always">

        <androidx.cardview.widget.CardView xmlns:card_view="http://schemas.android.com/apk/res-auto"
            android:id="@+id/google_sign_in_card"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            card_view:cardCornerRadius="4dp"
            card_view:cardUseCompatPadding="true"
            card_view:contentPadding="10dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:id="@+id/text_google_status"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="10dp"
                    android:text="@string/signed_out" />

                <com.google.android.gms.common.SignInButton
                    android:id="@+id/button_google_sign_in"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content" />

                <Button
                    android:id="@+id/button_google_sign_out"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:enabled="false"
                    android:text="@string/sign_out" />

                <Button
                    android:id="@+id/button_google_revoke"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:enabled="false"
                    android:text="@string/revoke_access" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView xmlns:card_view="http://schemas.android.com/apk/res-auto"
            android:id="@+id/email_sign_in_card"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            card_view:cardCornerRadius="4dp"
            card_view:cardUseCompatPadding="true"
            card_view:contentPadding="10dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:id="@+id/text_email_status"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="10dp"
                    android:text="@string/signed_out" />

                <Button
                    android:id="@+id/button_email_sign_in"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/sign_in_email_cta" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="10dp"
                    android:layout_marginTop="10dp"
                    android:text="Save New Credential" />

                <EditText
                    android:id="@+id/edit_text_email"
                    android:layout_width="fill_parent"
                    android:layout_height="wrap_content"
                    android:hint="Email"
                    android:inputType="textEmailAddress" />

                <EditText
                    android:id="@+id/edit_text_password"
                    android:layout_width="fill_parent"
                    android:layout_height="wrap_content"
                    android:hint="Password"
                    android:inputType="textPassword" />

                <Button
                    android:id="@+id/button_email_save"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Save" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

    </LinearLayout>

</ScrollView>
```

### Step 4: Write Code

Go your `MainActivity.java` and add the following:

**MainActivity.java**

```java

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.auth.api.credentials.Credential;
import com.google.android.gms.auth.api.credentials.CredentialRequest;
import com.google.android.gms.auth.api.credentials.CredentialRequestResponse;
import com.google.android.gms.auth.api.credentials.Credentials;
import com.google.android.gms.auth.api.credentials.CredentialsClient;
import com.google.android.gms.auth.api.credentials.IdentityProviders;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

public class MainActivity extends AppCompatActivity implements
        View.OnClickListener {

    private static final String TAG = "MainActivity";
    private static final String KEY_IS_RESOLVING = "is_resolving";
    private static final String KEY_CREDENTIAL = "key_credential";
    private static final String KEY_CREDENTIAL_TO_SAVE = "key_credential_to_save";

    private static final int RC_SIGN_IN = 1;
    private static final int RC_CREDENTIALS_READ = 2;
    private static final int RC_CREDENTIALS_SAVE = 3;

    private CredentialsClient mCredentialsClient;
    private GoogleSignInClient mSignInClient;
    private ProgressDialog mProgressDialog;
    private boolean mIsResolving = false;
    private Credential mCredential;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (savedInstanceState != null) {
            mIsResolving = savedInstanceState.getBoolean(KEY_IS_RESOLVING, false);
            mCredential = savedInstanceState.getParcelable(KEY_CREDENTIAL);
        }

        // Build CredentialsClient and GoogleSignInClient, don't set account name
        buildClients(null);

        // Sign in button
        SignInButton signInButton = (SignInButton) findViewById(R.id.button_google_sign_in);
        signInButton.setSize(SignInButton.SIZE_WIDE);
        signInButton.setOnClickListener(this);

        // Other buttons
        findViewById(R.id.button_email_sign_in).setOnClickListener(this);
        findViewById(R.id.button_google_revoke).setOnClickListener(this);
        findViewById(R.id.button_google_sign_out).setOnClickListener(this);
        findViewById(R.id.button_email_save).setOnClickListener(this);
    }

    private void buildClients(String accountName) {
        GoogleSignInOptions.Builder gsoBuilder = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail();

        if (accountName != null) {
            gsoBuilder.setAccountName(accountName);
        }

        mCredentialsClient = Credentials.getClient(this);
        mSignInClient = GoogleSignIn.getClient(this, gsoBuilder.build());
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(KEY_IS_RESOLVING, mIsResolving);
        outState.putParcelable(KEY_CREDENTIAL, mCredential);
    }

    @Override
    public void onStart() {
        super.onStart();
        if (!mIsResolving) {
            requestCredentials(true /* shouldResolve */, false /* onlyPasswords */);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult:" + requestCode + ":" + resultCode + ":" + data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleGoogleSignIn(task);
        } else if (requestCode == RC_CREDENTIALS_READ) {
            mIsResolving = false;
            if (resultCode == RESULT_OK) {
                Credential credential = data.getParcelableExtra(Credential.EXTRA_KEY);
                handleCredential(credential);
            }
        } else if (requestCode == RC_CREDENTIALS_SAVE) {
            mIsResolving = false;
            if (resultCode == RESULT_OK) {
                Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show();
            } else {
                Log.w(TAG, "Credential save failed.");
            }
        }
    }

    private void googleSilentSignIn() {
        // Try silent sign-in with Google Sign In API
        Task<GoogleSignInAccount> silentSignIn = mSignInClient.silentSignIn();

        if (silentSignIn.isComplete() && silentSignIn.isSuccessful()) {
            handleGoogleSignIn(silentSignIn);
            return;
        }

        showProgress();
        silentSignIn.addOnCompleteListener(new OnCompleteListener<GoogleSignInAccount>() {
            @Override
            public void onComplete(@NonNull Task<GoogleSignInAccount> task) {
                hideProgress();
                handleGoogleSignIn(task);
            }
        });
    }

    private void handleCredential(Credential credential) {
        mCredential = credential;

        Log.d(TAG, "handleCredential:" + credential.getAccountType() + ":" + credential.getId());
        if (IdentityProviders.GOOGLE.equals(credential.getAccountType())) {
            // Google account, rebuild GoogleApiClient to set account name and then try
            buildClients(credential.getId());
            googleSilentSignIn();
        } else {
            // Email/password account
            String status = String.format("Signed in as %s", credential.getId());
            ((TextView) findViewById(R.id.text_email_status)).setText(status);
        }
    }

    private void handleGoogleSignIn(Task<GoogleSignInAccount> completedTask) {
        Log.d(TAG, "handleGoogleSignIn:" + completedTask);

        boolean isSignedIn = (completedTask != null) && completedTask.isSuccessful();
        if (isSignedIn) {
            // Display signed-in UI
            GoogleSignInAccount gsa = completedTask.getResult();
            String status = String.format("Signed in as %s (%s)", gsa.getDisplayName(),
                    gsa.getEmail());
            ((TextView) findViewById(R.id.text_google_status)).setText(status);

            // Save Google Sign In to SmartLock
            Credential credential = new Credential.Builder(gsa.getEmail())
                    .setAccountType(IdentityProviders.GOOGLE)
                    .setName(gsa.getDisplayName())
                    .setProfilePictureUri(gsa.getPhotoUrl())
                    .build();

            saveCredential(credential);
        } else {
            // Display signed-out UI
            ((TextView) findViewById(R.id.text_google_status)).setText(R.string.signed_out);
        }

        findViewById(R.id.button_google_sign_in).setEnabled(!isSignedIn);
        findViewById(R.id.button_google_sign_out).setEnabled(isSignedIn);
        findViewById(R.id.button_google_revoke).setEnabled(isSignedIn);
    }

    private void requestCredentials(final boolean shouldResolve, boolean onlyPasswords) {
        CredentialRequest.Builder crBuilder = new CredentialRequest.Builder()
                .setPasswordLoginSupported(true);

        if (!onlyPasswords) {
            crBuilder.setAccountTypes(IdentityProviders.GOOGLE);
        }

        showProgress();
        mCredentialsClient.request(crBuilder.build()).addOnCompleteListener(
                new OnCompleteListener<CredentialRequestResponse>() {
                    @Override
                    public void onComplete(@NonNull Task<CredentialRequestResponse> task) {
                        hideProgress();

                        if (task.isSuccessful()) {
                            // Auto sign-in success
                            handleCredential(task.getResult().getCredential());
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException && shouldResolve) {
                            // Getting credential needs to show some UI, start resolution
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_CREDENTIALS_READ);
                        } else {
                            Log.w(TAG, "request: not handling exception", e);
                        }
                    }
                });
    }

    private void resolveResult(ResolvableApiException rae, int requestCode) {
        if (!mIsResolving) {
            try {
                rae.startResolutionForResult(MainActivity.this, requestCode);
                mIsResolving = true;
            } catch (IntentSender.SendIntentException e) {
                Log.e(TAG, "Failed to send Credentials intent.", e);
                mIsResolving = false;
            }
        }
    }

    private void saveCredential(Credential credential) {
        if (credential == null) {
            Log.w(TAG, "Ignoring null credential.");
            return;
        }

        mCredentialsClient.save(mCredential).addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            Log.d(TAG, "save:SUCCESS");
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException) {
                            // Saving the credential can sometimes require showing some UI
                            // to the user, which means we need to fire this resolution.
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_CREDENTIALS_SAVE);
                        } else {
                            Log.w(TAG, "save:FAILURE", e);
                            Toast.makeText(MainActivity.this,
                                    "Unexpected error, see logs for detals",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }
                });
    }

    private void onGoogleSignInClicked() {
        Intent intent = mSignInClient.getSignInIntent();
        startActivityForResult(intent, RC_SIGN_IN);
    }

    private void onGoogleRevokeClicked() {
        if (mCredential != null) {
            mCredentialsClient.delete(mCredential);
        }
        mSignInClient.revokeAccess().addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        handleGoogleSignIn(null);
                    }
                });
    }

    private void onGoogleSignOutClicked() {
        mCredentialsClient.disableAutoSignIn();
        mSignInClient.signOut().addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        handleGoogleSignIn(null);
                    }
                });
    }

    private void onEmailSignInClicked() {
        requestCredentials(true, true);
    }

    private void onEmailSaveClicked() {
        String email = ((EditText) findViewById(R.id.edit_text_email)).getText().toString();
        String password = ((EditText) findViewById(R.id.edit_text_password)).getText().toString();

        if (email.length() == 0|| password.length() == 0) {
            Log.w(TAG, "Blank email or password, can't save Credential.");
            Toast.makeText(this, "Email/Password must not be blank.", Toast.LENGTH_SHORT).show();
            return;
        }

        Credential credential = new Credential.Builder(email)
                .setPassword(password)
                .build();

        saveCredential(credential);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_google_sign_in:
                onGoogleSignInClicked();
                break;
            case R.id.button_google_revoke:
                onGoogleRevokeClicked();
                break;
            case R.id.button_google_sign_out:
                onGoogleSignOutClicked();
                break;
            case R.id.button_email_sign_in:
                onEmailSignInClicked();
                break;
            case R.id.button_email_save:
                onEmailSaveClicked();
                break;
        }
    }

    private void showProgress() {
        if (mProgressDialog == null) {
            mProgressDialog = new ProgressDialog(this);
            mProgressDialog.setIndeterminate(true);
            mProgressDialog.setMessage("Loading...");
        }

        mProgressDialog.show();
    }

    private void hideProgress() {
        if (mProgressDialog != null && mProgressDialog.isShowing()) {
            mProgressDialog.dismiss();
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/android/identity-samples/tree/main/CredentialsSignIn) Example |
| 2. | [Follow](https://github.com/android/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Save and Load Username/Password Credentials

This is an example for the Android Credentials API, which is part of Smartlock for Passwords on Android. This example will show how to save and load username/password credentials from the Credentials API.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Go to your `app/build.gradle` and add Google Play Services Auth and Google API Client as follows:

```groovy
    implementation 'com.google.android.gms:play-services-auth:19.0.0'
    implementation 'com.google.api-client:google-api-client:1.22.0'
```

### Step 3: Add Internet Permission

Add internet permission in your `app/src/main/AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

### Step 4: Design Layout

Design your MainActivity layout as follows:

**activity_main.xml**

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?attr/colorPrimary"
        android:minHeight="?attr/actionBarSize"
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
        app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <ProgressBar
            android:id="@+id/progress_bar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="right"
            android:indeterminate="true"
            android:indeterminateOnly="true"
            android:visibility="invisible"
            tools:visibility="visible" />

    </androidx.appcompat.widget.Toolbar>

    <EditText
        android:id="@+id/edit_text_email"
        android:layout_width="@dimen/width_field"
        android:layout_height="wrap_content"
        android:layout_below="@+id/toolbar"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"
        android:gravity="center_horizontal"
        android:hint="@string/hint_email"
        android:inputType="textEmailAddress" />

    <EditText
        android:id="@+id/edit_text_password"
        android:layout_width="@dimen/width_field"
        android:layout_height="wrap_content"
        android:layout_below="@+id/edit_text_email"
        android:layout_centerHorizontal="true"
        android:gravity="center_horizontal"
        android:hint="@string/hint_password"
        android:inputType="textPassword" />

    <LinearLayout
        android:id="@+id/layout_save_delete"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/edit_text_password"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"
        android:orientation="horizontal">

        <Button
            android:id="@+id/button_save_credential"
            android:layout_width="150dp"
            android:layout_height="wrap_content"
            android:text="@string/action_save_credential" />

        <Button
            android:id="@+id/button_delete_loaded_credential"
            android:layout_width="150dp"
            android:layout_height="wrap_content"
            android:enabled="false"
            android:text="@string/delete_credential" />

    </LinearLayout>

    <LinearLayout
        android:id="@+id/layout_load"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/layout_save_delete"
        android:layout_centerHorizontal="true"
        android:orientation="horizontal">

        <Button
            android:id="@+id/button_load_credentials"
            android:layout_width="150dp"
            android:layout_height="wrap_content"
            android:enabled="true"
            android:text="@string/load_credentials" />

        <Button
            android:id="@+id/button_load_hint"
            android:layout_width="150dp"
            android:layout_height="wrap_content"
            android:enabled="true"
            android:text="@string/load_hint" />

    </LinearLayout>

    <LinearLayout
        android:layout_below="@+id/layout_load"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:orientation="horizontal">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/label_request_id_token"/>

        <CheckBox
            android:id="@+id/checkbox_request_idtoken"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:checked="true"/>
    </LinearLayout>

</RelativeLayout>
```

### Step 5: Create A Mocker Server

Create a `MockServer.java` file and add the following code:

**MockServer.java**

```java
import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.auth.api.credentials.IdentityProviders;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

/**
 * <b>Mock</b> server class to demonstrate how to use the Google APIs Client Library for Java
 * to verify an ID token obtained from a Credential.
 */
public class MockServer extends IntentService {

    public static final String TAG = "MockServer";
    public static final String EXTRA_IDTOKEN = "id_token";

    private static final String PACKAGE_NAME = "com.google.example.credentialsbasic";
    private static final String SHA512_HASH = "YOUR_SHA512_HASH";

    private static final HttpTransport transport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new JacksonFactory();

    // Verifier that checks that the token has the proper issuer and audience
    private static GoogleIdTokenVerifier verifier =
            new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setIssuer(IdentityProviders.GOOGLE)
                    .setAudience(Arrays.asList(getAudienceString(SHA512_HASH, PACKAGE_NAME)))
            .build();

    public MockServer() {
        super(TAG);
    }

    /**
     * Verify an ID token and log the email address and verification status.
     * @param idTokenString ID Token from a Credential.
     */
    private static void verifyIdToken(String idTokenString) {
        // Print the audience to the logs
        logTokenAudience(idTokenString);

        try {
            // Verify ID Token
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                Log.w(TAG, "ID Token Verification Failed, check the README for instructions.");
                return;
            }

            // Extract email address and verification
            GoogleIdToken.Payload payload = idToken.getPayload();
            Log.d(TAG, "IdToken:" + payload.toPrettyString());
            Log.d(TAG, "IdToken:Email:" + payload.getEmail());
            Log.d(TAG, "IdToken:EmailVerified:" + payload.getEmailVerified());
        } catch (GeneralSecurityException e) {
            Log.e(TAG, "verifyIdToken:GeneralSecurityException", e);
        } catch (IOException e) {
            Log.e(TAG, "verifyIdToken:IOException", e);
        }
    }

    /**
     * Print the audience of an unverified token string to the logs.
     * @param idTokenString the ID Token string.
     */
    public static void logTokenAudience(String idTokenString) {
        try {
            GoogleIdToken idToken = GoogleIdToken.parse(jsonFactory, idTokenString);
            Log.d(TAG, "IDToken Audience:" + idToken.getPayload().getAudience());
        } catch (IOException e) {
            Log.e(TAG, "IDToken Audience: Could not parse ID Token", e);
        }
    }

    /**
     * Determine the audience of the ID token based on the sha512 hash and the package name.
     * @param sha512Hash sha512 hash of the application, see README for instructions.
     * @param packageName package name of the application,
     */
    private static String getAudienceString(String sha512Hash, String packageName) {
        String fmtString = "android://%s@%s";
        return String.format(fmtString, sha512Hash, packageName);
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        String idToken = intent.getStringExtra(EXTRA_IDTOKEN);
        if (idToken != null) {
            Log.d(TAG, "Processing ID Token:" + idToken);
            verifyIdToken(idToken);
        }
    }
}
```

### Step 6: MainActivity

Extend the AppCompatActivity and define constants as well as instance fields as follows:

```java
public class MainActivity extends AppCompatActivity implements
        View.OnClickListener {

    private static final String TAG = MainActivity.class.getSimpleName();
    private static final String KEY_IS_RESOLVING = "is_resolving";
    private static final int RC_SAVE = 1;
    private static final int RC_HINT = 2;
    private static final int RC_READ = 3;

    private EditText mEmailField;
    private EditText mPasswordField;

    private CredentialsClient mCredentialsClient;
    private Credential mCurrentCredential;
    private boolean mIsResolving = false;
```

Override the `onCreate()`:

```
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    setSupportActionBar((Toolbar) findViewById(R.id.toolbar));
```

````

Initialize our widgets:

```java
        // Fields
        mEmailField = findViewById(R.id.edit_text_email);
        mPasswordField = findViewById(R.id.edit_text_password);

        // Buttons
        findViewById(R.id.button_save_credential).setOnClickListener(this);
        findViewById(R.id.button_load_credentials).setOnClickListener(this);
        findViewById(R.id.button_load_hint).setOnClickListener(this);
        findViewById(R.id.button_delete_loaded_credential).setOnClickListener(this);</code></pre>
<p>Handle our Instance state:</p>
<pre><code class="language-java">        if (savedInstanceState != null) {
            mIsResolving = savedInstanceState.getBoolean(KEY_IS_RESOLVING);
        }</code></pre>
<p>Instantiate client for interacting with the credentials API. For this demo application we forcibly enable the SmartLock save dialog, which is sometimes disabled when it would conflict with the Android autofill API:</p>
<pre><code class="language-java">        CredentialsOptions options = new CredentialsOptions.Builder()
                .forceEnableSaveDialog()
                .build();
        mCredentialsClient = Credentials.getClient(this, options);
    }</code></pre>
<p>Override the onStart and attempt to auto-sign in:</p>
<pre><code class="language-java">    @Override
    public void onStart() {
        super.onStart();

        // Attempt auto-sign in.
        if (!mIsResolving) {
            requestCredentials();
        }
    }</code></pre>
<p>Override onStaveinstance state and onActivity Result:</p>
<pre><code class="language-java">    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(KEY_IS_RESOLVING, mIsResolving);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult:" + requestCode + ":" + resultCode + ":" + data);
        hideProgress();

        switch (requestCode) {
            case RC_HINT:
                // Drop into handling for RC_READ
            case RC_READ:
                if (resultCode == RESULT_OK) {
                    boolean isHint = (requestCode == RC_HINT);
                    Credential credential = data.getParcelableExtra(Credential.EXTRA_KEY);
                    processRetrievedCredential(credential, isHint);
                } else {
                    Log.e(TAG, "Credential Read: NOT OK");
                    showToast("Credential Read Failed");
                }

                mIsResolving = false;
                break;
            case RC_SAVE:
                if (resultCode == RESULT_OK) {
                    Log.d(TAG, "Credential Save: OK");
                    showToast("Credential Save Success");
                } else {
                    Log.e(TAG, "Credential Save: NOT OK");
                    showToast("Credential Save Failed");
                }

                mIsResolving = false;
                break;
        }
    }</code></pre>
<p>The following will be Called when the save button is clicked.  Reads the entries in the email and password
fields and attempts to save a new Credential to the Credentials API.</p>
<pre><code class="language-java">    private void saveCredentialClicked() {
        String email = mEmailField.getText().toString();
        String password = mPasswordField.getText().toString();

        // Create a Credential with the user's email as the ID and storing the password.  We
        // could also add 'Name' and 'ProfilePictureURL' but that is outside the scope of this
        // minimal sample.
        Log.d(TAG, "Saving Credential:" + email + ":" + anonymizePassword(password));
        final Credential credential = new Credential.Builder(email)
                .setPassword(password)
                .build();

        showProgress();

        // NOTE: this method unconditionally saves the Credential built, even if all the fields
        // are blank or it is invalid in some other way.  In a real application you should contact
        // your app's back end and determine that the credential is valid before saving it to the
        // Credentials backend.
        showProgress();

        mCredentialsClient.save(credential).addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            showToast("Credential saved.");
                            hideProgress();
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException) {
                            // The first time a credential is saved, the user is shown UI
                            // to confirm the action. This requires resolution.
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_SAVE);
                        } else {
                            // Save failure cannot be resolved.
                            Log.w(TAG, "Save failed.", e);
                            showToast("Credential Save Failed");
                            hideProgress();
                        }
                    }
                });
    }</code></pre>
<p>The following will be Called when the Load Credentials button is clicked. Attempts to read the user&#039;s saved Credentials from the Credentials API.  This may show UX, such as a credential picker or an account picker.</p>
<blockquote>
<p><b>Note:</b> in a normal application loading credentials should happen without explicit user
action, this is only connected to a &#039;Load Credentials&#039; button for easier demonstration
in this sample.  Make sure not to load credentials automatically if the user has clicked
a "sign out" button in your application in order to avoid a sign-in loop. You can do this
with the function <code>Auth.CredentialsApi.disableAuthSignIn(...)</code>.</p>
</blockquote>
<pre><code class="language-java">    private void loadCredentialsClicked() {
        requestCredentials();
    }</code></pre>
<p>The following will be Called when the Load Hints button is clicked. Requests a Credential "hint" which will be the basic profile information and an ID token for an account on the device. This is useful to auto-fill sign-up forms with an email address, picture, and name or to do password-free authentication with a server by providing an ID Token.</p>
<pre><code class="language-java">    private void loadHintClicked() {
        HintRequest hintRequest = new HintRequest.Builder()
                .setHintPickerConfig(new CredentialPickerConfig.Builder()
                        .setShowCancelButton(true)
                        .build())
                .setIdTokenRequested(shouldRequestIdToken())
                .setEmailAddressIdentifierSupported(true)
                .setAccountTypes(IdentityProviders.GOOGLE)
                .build();

;
        PendingIntent intent = mCredentialsClient.getHintPickerIntent(hintRequest);
        try {
            startIntentSenderForResult(intent.getIntentSender(), RC_HINT, null, 0, 0, 0);
            mIsResolving = true;
        } catch (IntentSender.SendIntentException e) {
            Log.e(TAG, "Could not start hint picker Intent", e);
            mIsResolving = false;
        }
    }</code></pre>
<p>Here is how we request Credentials from the Credentials API.</p>
<pre><code class="language-java">    private void requestCredentials() {
        // Request all of the user's saved username/password credentials.  We are not using
        // setAccountTypes so we will not load any credentials from other Identity Providers.
        CredentialRequest request = new CredentialRequest.Builder()
                .setPasswordLoginSupported(true)
                .setIdTokenRequested(shouldRequestIdToken())
                .build();

        showProgress();

        mCredentialsClient.request(request).addOnCompleteListener(
                new OnCompleteListener<CredentialRequestResponse>() {
                    @Override
                    public void onComplete(@NonNull Task<CredentialRequestResponse> task) {
                        hideProgress();

                        if (task.isSuccessful()) {
                            // Successfully read the credential without any user interaction, this
                            // means there was only a single credential and the user has auto
                            // sign-in enabled.
                            processRetrievedCredential(task.getResult().getCredential(), false);
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException) {
                            // This is most likely the case where the user has multiple saved
                            // credentials and needs to pick one. This requires showing UI to
                            // resolve the read request.
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_READ);
                            return;
                        }

                        if (e instanceof ApiException) {
                            ApiException ae = (ApiException) e;
                            if (ae.getStatusCode() == CommonStatusCodes.SIGN_IN_REQUIRED) {
                                // This means only a hint is available, but we are handling that
                                // elsewhere so no need to act here.
                            } else {
                                Log.w(TAG, "Unexpected status code: " + ae.getStatusCode());
                            }
                        }
                    }
                });
    }</code></pre>
<p>The following wll be called when the delete credentials button is clicked.  This deletes the last Credential that was loaded using the load button.</p>
<pre><code class="language-java">    private void deleteLoadedCredentialClicked() {
        if (mCurrentCredential == null) {
            showToast("Error: no credential to delete");
            return;
        }

        showProgress();

        mCredentialsClient.delete(mCurrentCredential).addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        hideProgress();

                        if (task.isSuccessful()) {
                            // Credential delete succeeded, disable the delete button because we
                            // cannot delete the same credential twice. Clear text fields.
                            showToast("Credential Delete Success");
                            ((EditText) findViewById(R.id.edit_text_email)).setText("");
                            ((EditText) findViewById(R.id.edit_text_password)).setText("");
                            mCurrentCredential = null;
                        } else {
                            // Credential deletion either failed or was cancelled, this operation
                            // never gives a 'resolution' so we can display the failure message
                            // immediately.
                            Log.e(TAG, "Credential Delete: NOT OK", task.getException());
                            showToast("Credential Delete Failed");
                        }
                    }
                });
    }</code></pre>
<p>We attempt to resolve a non-successful result from an asynchronous request.</p>
<ul>
<li>@param rae the ResolvableApiException to resolve.</li>
<li>@param requestCode the request code to use when starting an Activity for result, this will be passed back to onActivityResult.</li>
</ul>
<pre><code class="language-java">    private void resolveResult(ResolvableApiException rae, int requestCode) {
        // We don't want to fire multiple resolutions at once since that can result
        // in stacked dialogs after rotation or another similar event.
        if (mIsResolving) {
            Log.w(TAG, "resolveResult: already resolving.");
            return;
        }

        Log.d(TAG, "Resolving: " + rae);
        try {
            rae.startResolutionForResult(MainActivity.this, requestCode);
            mIsResolving = true;
        } catch (IntentSender.SendIntentException e) {
            Log.e(TAG, "STATUS: Failed to send resolution.", e);
            hideProgress();
        }
    }

Here is how we Process a Credential object retrieved from a successful request.
* @param credential the Credential to process.
* @param isHint true if the Credential is hint-only, false otherwise.

```java
    private void processRetrievedCredential(Credential credential, boolean isHint) {
        Log.d(TAG, "Credential Retrieved: " + credential.getId() + ":" +
                anonymizePassword(credential.getPassword()));

        // If the Credential is not a hint, we should store it an enable the delete button.
        // If it is a hint, skip this because a hint cannot be deleted.
        if (!isHint) {
            showToast("Credential Retrieved");
            mCurrentCredential = credential;
            findViewById(R.id.button_delete_loaded_credential).setEnabled(true);
        } else {
            showToast("Credential Hint Retrieved");
        }

        mEmailField.setText(credential.getId());
        mPasswordField.setText(credential.getPassword());

        if (!credential.getIdTokens().isEmpty()) {
            IdToken idToken = credential.getIdTokens().get(0);

            // For the purposes of this sample we are using a background service in place of a real
            // web server. The client sends the Id Token to the server which uses the Google
            // APIs Client Library for Java to verify the token and gain a signed assertion
            // of the user's email address. This can be used to confirm the user's identity
            // and sign the user in even without providing a password.
            Intent intent = new Intent(this, MockServer.class)
                    .putExtra(MockServer.EXTRA_IDTOKEN, idToken.getIdToken());
            startService(intent);
        } else {
            // This state is reached if non-Google accounts are added to Gmail:
            // https://support.google.com/mail/answer/6078445
            Log.d(TAG, "Credential does not contain ID Tokens.");
        }
    }
````

We Determine if we should request an ID token with Hints/Credentials. The default behavior is to not request an ID token (for speed purposes) but by setting this value to true an ID token will be returned with Hints/Credentials when possible.

```java
    private boolean shouldRequestIdToken() {
        return ((CheckBox) findViewById(R.id.checkbox_request_idtoken)).isChecked();
    }
```

We encode a password into asterisks of the right length, for logging:

```java
    private String anonymizePassword(String password) {
        if (password == null) {
            return "null";
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < password.length(); i++) {
            sb.append('*');
        }
        return sb.toString();
    }
```

Display a short Toast message

```java
    private void showToast(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
```

Show progress spinner and disable buttons

```java
    private void showProgress() {
        findViewById(R.id.progress_bar).setVisibility(View.VISIBLE);

        // Disable all buttons while progress indicator shows.
        setViewsEnabled(false, R.id.button_load_credentials, R.id.button_load_hint,
                R.id.button_save_credential, R.id.button_delete_loaded_credential);
    }
```

Hide progress spinner and enable buttons :

```java
    private void hideProgress() {
        findViewById(R.id.progress_bar).setVisibility(View.INVISIBLE);

        // Enable buttons once progress indicator is hidden.
        setViewsEnabled(true, R.id.button_load_credentials, R.id.button_load_hint,
                R.id.button_save_credential);
    }
```

Enable or disable multiple views

```java
    private void setViewsEnabled(boolean enabled, int... ids) {
        for (int id : ids) {
            findViewById(id).setEnabled(enabled);
        }
    }
```

Handle clicks:

```java
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_save_credential:
                saveCredentialClicked();
                break;
            case R.id.button_load_credentials:
                loadCredentialsClicked();
                break;
            case R.id.button_load_hint:
                loadHintClicked();
                break;
            case R.id.button_delete_loaded_credential:
                deleteLoadedCredentialClicked();
                break;
        }
    }
}
```

Here is the full code:

**MainActivity.java**

```java
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.auth.api.credentials.Credential;
import com.google.android.gms.auth.api.credentials.CredentialPickerConfig;
import com.google.android.gms.auth.api.credentials.CredentialRequest;
import com.google.android.gms.auth.api.credentials.CredentialRequestResponse;
import com.google.android.gms.auth.api.credentials.Credentials;
import com.google.android.gms.auth.api.credentials.CredentialsClient;
import com.google.android.gms.auth.api.credentials.CredentialsOptions;
import com.google.android.gms.auth.api.credentials.HintRequest;
import com.google.android.gms.auth.api.credentials.IdToken;
import com.google.android.gms.auth.api.credentials.IdentityProviders;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

/**
 * A minimal example of saving and loading username/password credentials from the Credentials API.
 * @author samstern@google.com
 */
public class MainActivity extends AppCompatActivity implements
        View.OnClickListener {

    private static final String TAG = MainActivity.class.getSimpleName();
    private static final String KEY_IS_RESOLVING = "is_resolving";
    private static final int RC_SAVE = 1;
    private static final int RC_HINT = 2;
    private static final int RC_READ = 3;

    private EditText mEmailField;
    private EditText mPasswordField;

    private CredentialsClient mCredentialsClient;
    private Credential mCurrentCredential;
    private boolean mIsResolving = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setSupportActionBar((Toolbar) findViewById(R.id.toolbar));

        // Fields
        mEmailField = findViewById(R.id.edit_text_email);
        mPasswordField = findViewById(R.id.edit_text_password);

        // Buttons
        findViewById(R.id.button_save_credential).setOnClickListener(this);
        findViewById(R.id.button_load_credentials).setOnClickListener(this);
        findViewById(R.id.button_load_hint).setOnClickListener(this);
        findViewById(R.id.button_delete_loaded_credential).setOnClickListener(this);

        // Instance state
        if (savedInstanceState != null) {
            mIsResolving = savedInstanceState.getBoolean(KEY_IS_RESOLVING);
        }

        // Instantiate client for interacting with the credentials API. For this demo
        // application we forcibly enable the SmartLock save dialog, which is sometimes
        // disabled when it would conflict with the Android autofill API.
        CredentialsOptions options = new CredentialsOptions.Builder()
                .forceEnableSaveDialog()
                .build();
        mCredentialsClient = Credentials.getClient(this, options);
    }

    @Override
    public void onStart() {
        super.onStart();

        // Attempt auto-sign in.
        if (!mIsResolving) {
            requestCredentials();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(KEY_IS_RESOLVING, mIsResolving);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(TAG, "onActivityResult:" + requestCode + ":" + resultCode + ":" + data);
        hideProgress();

        switch (requestCode) {
            case RC_HINT:
                // Drop into handling for RC_READ
            case RC_READ:
                if (resultCode == RESULT_OK) {
                    boolean isHint = (requestCode == RC_HINT);
                    Credential credential = data.getParcelableExtra(Credential.EXTRA_KEY);
                    processRetrievedCredential(credential, isHint);
                } else {
                    Log.e(TAG, "Credential Read: NOT OK");
                    showToast("Credential Read Failed");
                }

                mIsResolving = false;
                break;
            case RC_SAVE:
                if (resultCode == RESULT_OK) {
                    Log.d(TAG, "Credential Save: OK");
                    showToast("Credential Save Success");
                } else {
                    Log.e(TAG, "Credential Save: NOT OK");
                    showToast("Credential Save Failed");
                }

                mIsResolving = false;
                break;
        }
    }

    /**
     * Called when the save button is clicked.  Reads the entries in the email and password
     * fields and attempts to save a new Credential to the Credentials API.
     */
    private void saveCredentialClicked() {
        String email = mEmailField.getText().toString();
        String password = mPasswordField.getText().toString();

        // Create a Credential with the user's email as the ID and storing the password.  We
        // could also add 'Name' and 'ProfilePictureURL' but that is outside the scope of this
        // minimal sample.
        Log.d(TAG, "Saving Credential:" + email + ":" + anonymizePassword(password));
        final Credential credential = new Credential.Builder(email)
                .setPassword(password)
                .build();

        showProgress();

        // NOTE: this method unconditionally saves the Credential built, even if all the fields
        // are blank or it is invalid in some other way.  In a real application you should contact
        // your app's back end and determine that the credential is valid before saving it to the
        // Credentials backend.
        showProgress();

        mCredentialsClient.save(credential).addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (task.isSuccessful()) {
                            showToast("Credential saved.");
                            hideProgress();
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException) {
                            // The first time a credential is saved, the user is shown UI
                            // to confirm the action. This requires resolution.
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_SAVE);
                        } else {
                            // Save failure cannot be resolved.
                            Log.w(TAG, "Save failed.", e);
                            showToast("Credential Save Failed");
                            hideProgress();
                        }
                    }
                });
    }

    /**
     * Called when the Load Credentials button is clicked. Attempts to read the user's saved
     * Credentials from the Credentials API.  This may show UX, such as a credential picker
     * or an account picker.
     *
     * <b>Note:</b> in a normal application loading credentials should happen without explicit user
     * action, this is only connected to a 'Load Credentials' button for easier demonstration
     * in this sample.  Make sure not to load credentials automatically if the user has clicked
     * a "sign out" button in your application in order to avoid a sign-in loop. You can do this
     * with the function <code>Auth.CredentialsApi.disableAuthSignIn(...)</code>.
     */
    private void loadCredentialsClicked() {
        requestCredentials();
    }

    /**
     * Called when the Load Hints button is clicked. Requests a Credential "hint" which will
     * be the basic profile information and an ID token for an account on the device. This is useful
     * to auto-fill sign-up forms with an email address, picture, and name or to do password-free
     * authentication with a server by providing an ID Token.
     */
    private void loadHintClicked() {
        HintRequest hintRequest = new HintRequest.Builder()
                .setHintPickerConfig(new CredentialPickerConfig.Builder()
                        .setShowCancelButton(true)
                        .build())
                .setIdTokenRequested(shouldRequestIdToken())
                .setEmailAddressIdentifierSupported(true)
                .setAccountTypes(IdentityProviders.GOOGLE)
                .build();

;
        PendingIntent intent = mCredentialsClient.getHintPickerIntent(hintRequest);
        try {
            startIntentSenderForResult(intent.getIntentSender(), RC_HINT, null, 0, 0, 0);
            mIsResolving = true;
        } catch (IntentSender.SendIntentException e) {
            Log.e(TAG, "Could not start hint picker Intent", e);
            mIsResolving = false;
        }
    }

    /**
     * Request Credentials from the Credentials API.
     */
    private void requestCredentials() {
        // Request all of the user's saved username/password credentials.  We are not using
        // setAccountTypes so we will not load any credentials from other Identity Providers.
        CredentialRequest request = new CredentialRequest.Builder()
                .setPasswordLoginSupported(true)
                .setIdTokenRequested(shouldRequestIdToken())
                .build();

        showProgress();

        mCredentialsClient.request(request).addOnCompleteListener(
                new OnCompleteListener<CredentialRequestResponse>() {
                    @Override
                    public void onComplete(@NonNull Task<CredentialRequestResponse> task) {
                        hideProgress();

                        if (task.isSuccessful()) {
                            // Successfully read the credential without any user interaction, this
                            // means there was only a single credential and the user has auto
                            // sign-in enabled.
                            processRetrievedCredential(task.getResult().getCredential(), false);
                            return;
                        }

                        Exception e = task.getException();
                        if (e instanceof ResolvableApiException) {
                            // This is most likely the case where the user has multiple saved
                            // credentials and needs to pick one. This requires showing UI to
                            // resolve the read request.
                            ResolvableApiException rae = (ResolvableApiException) e;
                            resolveResult(rae, RC_READ);
                            return;
                        }

                        if (e instanceof ApiException) {
                            ApiException ae = (ApiException) e;
                            if (ae.getStatusCode() == CommonStatusCodes.SIGN_IN_REQUIRED) {
                                // This means only a hint is available, but we are handling that
                                // elsewhere so no need to act here.
                            } else {
                                Log.w(TAG, "Unexpected status code: " + ae.getStatusCode());
                            }
                        }
                    }
                });
    }

    /**
     * Called when the delete credentials button is clicked.  This deletes the last Credential
     * that was loaded using the load button.
     */
    private void deleteLoadedCredentialClicked() {
        if (mCurrentCredential == null) {
            showToast("Error: no credential to delete");
            return;
        }

        showProgress();

        mCredentialsClient.delete(mCurrentCredential).addOnCompleteListener(
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        hideProgress();

                        if (task.isSuccessful()) {
                            // Credential delete succeeded, disable the delete button because we
                            // cannot delete the same credential twice. Clear text fields.
                            showToast("Credential Delete Success");
                            ((EditText) findViewById(R.id.edit_text_email)).setText("");
                            ((EditText) findViewById(R.id.edit_text_password)).setText("");
                            mCurrentCredential = null;
                        } else {
                            // Credential deletion either failed or was cancelled, this operation
                            // never gives a 'resolution' so we can display the failure message
                            // immediately.
                            Log.e(TAG, "Credential Delete: NOT OK", task.getException());
                            showToast("Credential Delete Failed");
                        }
                    }
                });
    }

    /**
     * Attempt to resolve a non-successful result from an asynchronous request.
     * @param rae the ResolvableApiException to resolve.
     * @param requestCode the request code to use when starting an Activity for result,
     *                    this will be passed back to onActivityResult.
     */
    private void resolveResult(ResolvableApiException rae, int requestCode) {
        // We don't want to fire multiple resolutions at once since that can result
        // in stacked dialogs after rotation or another similar event.
        if (mIsResolving) {
            Log.w(TAG, "resolveResult: already resolving.");
            return;
        }

        Log.d(TAG, "Resolving: " + rae);
        try {
            rae.startResolutionForResult(MainActivity.this, requestCode);
            mIsResolving = true;
        } catch (IntentSender.SendIntentException e) {
            Log.e(TAG, "STATUS: Failed to send resolution.", e);
            hideProgress();
        }
    }

    /**
     * Process a Credential object retrieved from a successful request.
     * @param credential the Credential to process.
     * @param isHint true if the Credential is hint-only, false otherwise.
     */
    private void processRetrievedCredential(Credential credential, boolean isHint) {
        Log.d(TAG, "Credential Retrieved: " + credential.getId() + ":" +
                anonymizePassword(credential.getPassword()));

        // If the Credential is not a hint, we should store it an enable the delete button.
        // If it is a hint, skip this because a hint cannot be deleted.
        if (!isHint) {
            showToast("Credential Retrieved");
            mCurrentCredential = credential;
            findViewById(R.id.button_delete_loaded_credential).setEnabled(true);
        } else {
            showToast("Credential Hint Retrieved");
        }

        mEmailField.setText(credential.getId());
        mPasswordField.setText(credential.getPassword());

        if (!credential.getIdTokens().isEmpty()) {
            IdToken idToken = credential.getIdTokens().get(0);

            // For the purposes of this sample we are using a background service in place of a real
            // web server. The client sends the Id Token to the server which uses the Google
            // APIs Client Library for Java to verify the token and gain a signed assertion
            // of the user's email address. This can be used to confirm the user's identity
            // and sign the user in even without providing a password.
            Intent intent = new Intent(this, MockServer.class)
                    .putExtra(MockServer.EXTRA_IDTOKEN, idToken.getIdToken());
            startService(intent);
        } else {
            // This state is reached if non-Google accounts are added to Gmail:
            // https://support.google.com/mail/answer/6078445
            Log.d(TAG, "Credential does not contain ID Tokens.");
        }
    }

    /**
     * Determine if we should request an ID token with Hints/Credentials. The default behavior
     * is to not request an ID token (for speed purposes) but by setting this value to true
     * an ID token will be returned with Hints/Credentials when possible.
     */
    private boolean shouldRequestIdToken() {
        return ((CheckBox) findViewById(R.id.checkbox_request_idtoken)).isChecked();
    }

    /** Make a password into asterisks of the right length, for logging. **/
    private String anonymizePassword(String password) {
        if (password == null) {
            return "null";
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < password.length(); i++) {
            sb.append('*');
        }
        return sb.toString();
    }

    /** Display a short Toast message **/
    private void showToast(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }

    /** Show progress spinner and disable buttons **/
    private void showProgress() {
        findViewById(R.id.progress_bar).setVisibility(View.VISIBLE);

        // Disable all buttons while progress indicator shows.
        setViewsEnabled(false, R.id.button_load_credentials, R.id.button_load_hint,
                R.id.button_save_credential, R.id.button_delete_loaded_credential);
    }

    /** Hide progress spinner and enable buttons **/
    private void hideProgress() {
        findViewById(R.id.progress_bar).setVisibility(View.INVISIBLE);

        // Enable buttons once progress indicator is hidden.
        setViewsEnabled(true, R.id.button_load_credentials, R.id.button_load_hint,
                R.id.button_save_credential);
    }

    /** Enable or disable multiple views **/
    private void setViewsEnabled(boolean enabled, int... ids) {
        for (int id : ids) {
            findViewById(id).setEnabled(enabled);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_save_credential:
                saveCredentialClicked();
                break;
            case R.id.button_load_credentials:
                loadCredentialsClicked();
                break;
            case R.id.button_load_hint:
                loadHintClicked();
                break;
            case R.id.button_delete_loaded_credential:
                deleteLoadedCredentialClicked();
                break;
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/android/identity-samples/tree/main/CredentialsQuickstart) Example |
| 2. | [Follow](https://github.com/android/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
