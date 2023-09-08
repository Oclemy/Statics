# Show a biometric authentication dialog

One method of protecting sensitive information or premium content within your app is to request biometric authentication, such as using face recognition or fingerprint recognition. This guide explains how to support biometric login flows in your app.

Declare the types of authentication that your app supports
----------------------------------------------------------

To define the types of authentication that your app supports, use the `BiometricManager.Authenticators` interface. The system lets you declare the following types of authentication:

`BIOMETRIC_STRONG`

Authentication using a **Class 3** biometric, as defined on the Android compatibility definition page.

`BIOMETRIC_WEAK`

Authentication using a **Class 2** biometric, as defined on the Android compatibility definition page.

`DEVICE_CREDENTIAL`

Authentication using a screen lock credential – the user's PIN, pattern, or password.

To begin using an authenticator, the user needs to create a PIN, pattern, or password. If the user doesn't already have one, the biometric enrollment flow prompts them to create one.

To define the types of biometric authentication that your app accepts, pass an authentication type or a bitwise combination of types into the `setAllowedAuthenticators()`) method. The following code snippet shows how to support authentication using either a Class 3 biometric or a screen lock credential.

### Kotlin

```kotlin
// Lets the user authenticate using either a Class 3 biometric or
// their lock screen credential (PIN, pattern, or password).
promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
        .build()
```

### Java

```java
// Lets user authenticate using either a Class 3 biometric or
// their lock screen credential (PIN, pattern, or password).
promptInfo = new BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        .setAllowedAuthenticators(BIOMETRIC_STRONG | DEVICE_CREDENTIAL)
        .build();
```

The following combinations of authenticator types aren't supported on Android 10 (API level 29) and lower: `DEVICE_CREDENTIAL` and `BIOMETRIC_STRONG | DEVICE_CREDENTIAL`. To check for the presence of a PIN, pattern, or password on Android 10 and lower, use the `KeyguardManager.isDeviceSecure()`) method.

Check that biometric authentication is available
------------------------------------------------

After you decide which authentication elements your app supports, check whether these elements are available. To do so, pass the same bitwise combination of types that you declared using the `setAllowedAuthenticators()` method into the `canAuthenticate()`) method. If necessary, invoke the `ACTION_BIOMETRIC_ENROLL` intent action. In the intent extra, provide the set of authenticators that your app accepts. This intent prompts the user to register credentials for an authenticator that your app accepts.

### Kotlin

```kotlin
val biometricManager = BiometricManager.from(this)
when (biometricManager.canAuthenticate(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)) {
    BiometricManager.BIOMETRIC_SUCCESS ->
        Log.d("MY_APP_TAG", "App can authenticate using biometrics.")
    BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE ->
        Log.e("MY_APP_TAG", "No biometric features available on this device.")
    BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE ->
        Log.e("MY_APP_TAG", "Biometric features are currently unavailable.")
    BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> {
        // Prompts the user to create credentials that your app accepts.
        val enrollIntent = Intent(Settings.ACTION_BIOMETRIC_ENROLL).apply {
            putExtra(Settings.EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED,
                BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
        }
        startActivityForResult(enrollIntent, REQUEST_CODE)
    }
}
```

### Java

```java
BiometricManager biometricManager = BiometricManager.from(this);
switch (biometricManager.canAuthenticate(BIOMETRIC_STRONG | DEVICE_CREDENTIAL)) {
    case BiometricManager.BIOMETRIC_SUCCESS:
        Log.d("MY_APP_TAG", "App can authenticate using biometrics.");
        break;
    case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
        Log.e("MY_APP_TAG", "No biometric features available on this device.");
        break;
    case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
        Log.e("MY_APP_TAG", "Biometric features are currently unavailable.");
        break;
    case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
        // Prompts the user to create credentials that your app accepts.
        final Intent enrollIntent = new Intent(Settings.ACTION_BIOMETRIC_ENROLL);
        enrollIntent.putExtra(Settings.EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED,
                BIOMETRIC_STRONG | DEVICE_CREDENTIAL);
        startActivityForResult(enrollIntent, REQUEST_CODE);
        break;
}
```

After the user authenticates, you can check whether the user authenticated using a device credential or a biometric credential by calling `getAuthenticationType()`).

Display the login prompt
------------------------

To display a system prompt that requests the user to authenticate using biometric credentials, use the Biometric library. This system-provided dialog is consistent across the apps that use it, creating a more trustworthy user experience. An example dialog appears in figure 1.

![Screenshot showing dialog](https://developer.android.com/static/images/training/sign-in/biometric-dialog-auth.svg)

**Figure 1.** System dialog requesting biometric authentication.

To add biometric authentication to your app using the Biometric library, complete the following steps:

1.  In your app module's `build.gradle` file, add a dependency on the `androidx.biometric` library.
    
2.  In the activity or fragment that hosts the biometric login dialog, display the dialog using the logic shown in the following code snippet:
    
    ### Kotlin

```kotlin    
    private lateinit var executor: Executor
    private lateinit var biometricPrompt: BiometricPrompt
    private lateinit var promptInfo: BiometricPrompt.PromptInfo
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor,
                object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationError(errorCode: Int,
                    errString: CharSequence) {
                super.onAuthenticationError(errorCode, errString)
                Toast.makeText(applicationContext,
                    "Authentication error: $errString", Toast.LENGTH_SHORT)
                    .show()
            }
    
            override fun onAuthenticationSucceeded(
                    result: BiometricPrompt.AuthenticationResult) {
                super.onAuthenticationSucceeded(result)
                Toast.makeText(applicationContext,
                    "Authentication succeeded!", Toast.LENGTH_SHORT)
                    .show()
            }
    
            override fun onAuthenticationFailed() {
                super.onAuthenticationFailed()
                Toast.makeText(applicationContext, "Authentication failed",
                    Toast.LENGTH_SHORT)
                    .show()
            }
        })
    
        promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric login for my app")
                .setSubtitle("Log in using your biometric credential")
                .setNegativeButtonText("Use account password")
                .build()
    
        // Prompt appears when user clicks "Log in".
        // Consider integrating with the keystore to unlock cryptographic operations,
        // if needed by your app.
        val biometricLoginButton =
                findViewById<Button>(R.id.biometric_login)
        biometricLoginButton.setOnClickListener {
            biometricPrompt.authenticate(promptInfo)
        }
    }
```

    ### Java

    ```kotlin    
    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        executor = ContextCompat.getMainExecutor(this);
        biometricPrompt = new BiometricPrompt(MainActivity.this,
                executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode,
                    @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                Toast.makeText(getApplicationContext(),
                    "Authentication error: " + errString, Toast.LENGTH_SHORT)
                    .show();
            }
    
            @Override
            public void onAuthenticationSucceeded( @NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                Toast.makeText(getApplicationContext(),
                    "Authentication succeeded!", Toast.LENGTH_SHORT).show();
            }
    
            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                Toast.makeText(getApplicationContext(), "Authentication failed",
                    Toast.LENGTH_SHORT)
                    .show();
            }
        });
    
        promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric login for my app")
                .setSubtitle("Log in using your biometric credential")
                .setNegativeButtonText("Use account password")
                .build();
    
        // Prompt appears when user clicks "Log in".
        // Consider integrating with the keystore to unlock cryptographic operations,
        // if needed by your app.
        Button biometricLoginButton = findViewById(R.id.biometric_login);
        biometricLoginButton.setOnClickListener(view -> {
                biometricPrompt.authenticate(promptInfo);
        });
    }
```

Use a cryptographic solution that depends on authentication
-----------------------------------------------------------

To further protect sensitive information within your app, you can incorporate cryptography into your biometric authentication workflow using an instance of `CryptoObject`. The framework supports the following cryptographic objects: `Signature`, `Cipher`, and `Mac`.

After the user authenticates successfully using a biometric prompt, your app can perform a cryptographic operation. For example, if you authenticate using a `Cipher` object, your app can then perform encryption and decryption using a `SecretKey` object.

The following sections go through examples of using a `Cipher` object and a `SecretKey` object to encrypt data. Each example makes use of the following methods:

### Kotlin

```kotlin
private fun generateSecretKey(keyGenParameterSpec: KeyGenParameterSpec) {
    val keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
    keyGenerator.init(keyGenParameterSpec)
    keyGenerator.generateKey()
}

private fun getSecretKey(): SecretKey {
    val keyStore = KeyStore.getInstance("AndroidKeyStore")

    // Before the keystore can be accessed, it must be loaded.
    keyStore.load(null)
    return keyStore.getKey(KEY_NAME, null) as SecretKey
}

private fun getCipher(): Cipher {
    return Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES + "/"
            + KeyProperties.BLOCK_MODE_CBC + "/"
            + KeyProperties.ENCRYPTION_PADDING_PKCS7)
}
```

### Java

```java
private void generateSecretKey(KeyGenParameterSpec keyGenParameterSpec) {
    KeyGenerator keyGenerator = KeyGenerator.getInstance(
            KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
    keyGenerator.init(keyGenParameterSpec);
    keyGenerator.generateKey();
}

private SecretKey getSecretKey() {
    KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");

    // Before the keystore can be accessed, it must be loaded.
    keyStore.load(null);
    return ((SecretKey)keyStore.getKey(KEY_NAME, null));
}

private Cipher getCipher() {
    return Cipher.getInstance(KeyProperties.KEY_ALGORITHM_AES + "/"
            + KeyProperties.BLOCK_MODE_CBC + "/"
            + KeyProperties.ENCRYPTION_PADDING_PKCS7);
}
```

### Authenticate using only biometric credentials

If your app uses a secret key that requires biometric credentials to unlock, the user must authenticate their biometric credentials _each time_ before your app accesses the key.

To encrypt sensitive information only after the user authenticates using biometric credentials, complete the following steps:

1.  Generate a key that uses the following `KeyGenParameterSpec` configuration:
    
    ### Kotlin

```kotlin    
    generateSecretKey(KeyGenParameterSpec.Builder(
            KEY_NAME,
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
            .setUserAuthenticationRequired(true)
            // Invalidate the keys if the user has registered a new biometric
            // credential, such as a new fingerprint. Can call this method only
            // on Android 7.0 (API level 24) or higher. The variable
            // "invalidatedByBiometricEnrollment" is true by default.
            .setInvalidatedByBiometricEnrollment(true)
            .build())
    ```
    
    ### Java
    
```java
    generateSecretKey(new KeyGenParameterSpec.Builder(
            KEY_NAME,
            KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
            .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
            .setUserAuthenticationRequired(true)
            // Invalidate the keys if the user has registered a new biometric
            // credential, such as a new fingerprint. Can call this method only
            // on Android 7.0 (API level 24) or higher. The variable
            // "invalidatedByBiometricEnrollment" is true by default.
            .setInvalidatedByBiometricEnrollment(true)
            .build());
```

2.  Start a biometric authentication workflow that incorporates a cipher:
    
    ### Kotlin

```kotlin    
    biometricLoginButton.setOnClickListener {
        // Exceptions are unhandled within this snippet.
        val cipher = getCipher()
        val secretKey = getSecretKey()
        cipher.init(Cipher.ENCRYPT_MODE, secretKey)
        biometricPrompt.authenticate(promptInfo,
                BiometricPrompt.CryptoObject(cipher))
    }
```

    ### Java

```java    
    biometricLoginButton.setOnClickListener(view -> {
        // Exceptions are unhandled within this snippet.
        Cipher cipher = getCipher();
        SecretKey secretKey = getSecretKey();
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        biometricPrompt.authenticate(promptInfo,
                new BiometricPrompt.CryptoObject(cipher));
    });
```

3.  Within your biometric authentication callbacks, use the secret key to encrypt the sensitive information:
    
    ### Kotlin

```kotlin    
    override fun onAuthenticationSucceeded(
            result: BiometricPrompt.AuthenticationResult) {
        val encryptedInfo: ByteArray = result.cryptoObject.cipher?.doFinal(
                plaintext-string.toByteArray(Charset.defaultCharset())
        )
        Log.d("MY_APP_TAG", "Encrypted information: " +
                Arrays.toString(encryptedInfo))
    }
```

    ### Java

```java    
    @Override
    public void onAuthenticationSucceeded( @NonNull BiometricPrompt.AuthenticationResult result) {
        // NullPointerException is unhandled; use Objects.requireNonNull().
        byte[] encryptedInfo = result.getCryptoObject().getCipher().doFinal(
                plaintext-string.getBytes(Charset.defaultCharset()));
        Log.d("MY_APP_TAG", "Encrypted information: " +
                Arrays.toString(encryptedInfo));
    }
    
```

### Authenticate using either biometric or lock screen credentials

You can use a secret key that allows for authentication using either biometric credentials or lock screen credentials (PIN, pattern, or password). When configuring this key, specify a validity time period. During this time period, your app can perform multiple cryptographic operations without the user needing to re-authenticate.

To encrypt sensitive information after the user authenticates using biometric or lock screen credentials, complete the following steps:

1.  Generate a key that uses the following `KeyGenParameterSpec` configuration:
    
    ### Kotlin

```kotlin    
    generateSecretKey(KeyGenParameterSpec.Builder(
        KEY_NAME,
        KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .setUserAuthenticationRequired(true)
        .setUserAuthenticationParameters(VALIDITY_DURATION_SECONDS,
                ALLOWED_AUTHENTICATORS)
        .build())
```

    ### Java

```java    
    generateSecretKey(new KeyGenParameterSpec.Builder(
        KEY_NAME,
        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
        .setUserAuthenticationRequired(true)
        .setUserAuthenticationParameters(VALIDITY_DURATION_SECONDS,
                ALLOWED_AUTHENTICATORS)
        .build());
```

2.  Within a time period of `VALIDITY_DURATION_SECONDS` after the user authenticates, encrypt the sensitive information:
    
    ### Kotlin

```kotlin    
    private fun encryptSecretInformation() {
        // Exceptions are unhandled for getCipher() and getSecretKey().
        val cipher = getCipher()
        val secretKey = getSecretKey()
        try {
            cipher.init(Cipher.ENCRYPT_MODE, secretKey)
            val encryptedInfo: ByteArray = cipher.doFinal(
                    plaintext-string.toByteArray(Charset.defaultCharset()))
            Log.d("MY_APP_TAG", "Encrypted information: " +
                    Arrays.toString(encryptedInfo))
        } catch (e: InvalidKeyException) {
            Log.e("MY_APP_TAG", "Key is invalid.")
        } catch (e: UserNotAuthenticatedException) {
            Log.d("MY_APP_TAG", "The key's validity timed out.")
            biometricPrompt.authenticate(promptInfo)
        }
```

    ### Java

```java    
    private void encryptSecretInformation() {
        // Exceptions are unhandled for getCipher() and getSecretKey().
        Cipher cipher = getCipher();
        SecretKey secretKey = getSecretKey();
        try {
            // NullPointerException is unhandled; use Objects.requireNonNull().
            ciper.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedInfo = cipher.doFinal(
                    plaintext-string.getBytes(Charset.defaultCharset()));
        } catch (InvalidKeyException e) {
            Log.e("MY_APP_TAG", "Key is invalid.");
        } catch (UserNotAuthenticatedException e) {
            Log.d("MY_APP_TAG", "The key's validity timed out.");
            biometricPrompt.authenticate(promptInfo);
        }
    }
```

### Authenticate using auth-per-use keys

You can provide support for auth-per-use keys within your instance of `BiometricPrompt`. Such a key requires the user to present either a biometric credential or a device credential each time your app needs to access data that's guarded by that key. Auth-per-use keys can be useful for high-value transactions, such as making a large payment or updating a person's health records.

To associate a `BiometricPrompt` object with an auth-per-use key, add code similar to the following:

### Kotlin

```kotlin
val authPerOpKeyGenParameterSpec =
        KeyGenParameterSpec.Builder("myKeystoreAlias", key-purpose)
    // Accept either a biometric credential or a device credential.
    // To accept only one type of credential, include only that type as the
    // second argument.
    .setUserAuthenticationParameters(0 /* duration */,
            KeyProperties.AUTH_BIOMETRIC_STRONG or
            KeyProperties.AUTH_DEVICE_CREDENTIAL)
    .build()
```

### Java

```java
KeyGenParameterSpec authPerOpKeyGenParameterSpec =
        new KeyGenParameterSpec.Builder("myKeystoreAlias", key-purpose)
    // Accept either a biometric credential or a device credential.
    // To accept only one type of credential, include only that type as the
    // second argument.
    .setUserAuthenticationParameters(0 /* duration */,
            KeyProperties.AUTH_BIOMETRIC_STRONG |
            KeyProperties.AUTH_DEVICE_CREDENTIAL)
    .build();
```

By default, the system requires users to perform a specific action, such as pressing a button, after their biometric credentials are accepted. This configuration is preferable if your app is showing the dialog to confirm a sensitive or high-risk action, such as making a purchase.

If your app shows a biometric authentication dialog for a lower-risk action, however, you can provide a hint to the system that the user doesn't need to confirm authentication. This hint can allow the user to view content in your app more quickly after re-authenticating using a passive modality, such as face- or iris-based recognition. To provide this hint, pass `false` into the `setConfirmationRequired()`) method.

Figure 2 shows two versions of the same dialog. One version requires an explicit user action, and the other version doesn't.

The following code snippet shows how to present a dialog that **doesn't** require an explicit user action to complete the authentication process:

### Kotlin

```kotlin
// Lets the user authenticate without performing an action, such as pressing a
// button, after their biometric credential is accepted.
promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        .setNegativeButtonText("Use account password")
        .setConfirmationRequired(false)
        .build()
```

### Java

```java
// Lets the user authenticate without performing an action, such as pressing a
// button, after their biometric credential is accepted.
promptInfo = new BiometricPrompt.PromptInfo.Builder()
        .setTitle("Biometric login for my app")
        .setSubtitle("Log in using your biometric credential")
        .setNegativeButtonText("Use account password")
        .setConfirmationRequired(false)
        .build();
```

Allow for fallback to non-biometric credentials
-----------------------------------------------

If you want your app to allow authentication using either biometric or device credentials, you can declare that your app supports device credentials by including `DEVICE_CREDENTIAL` in the set of values that you pass into `setAllowedAuthenticators()`).

If your app currently uses `createConfirmDeviceCredentialIntent()`) or `setDeviceCredentialAllowed()`) to provide this capability, switch to using `setAllowedAuthenticators()`.
