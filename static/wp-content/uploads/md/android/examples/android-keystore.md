# Kotlin Android KeyStore Tutorial and Example


This is a tutorial on the `KeyStore` class, which is a class that represents a storage facility for cryptographic keys and certificates.


A `KeyStore` manages different types of entries. Each type of entry implements the `KeyStore.Entry` interface. Three basic `KeyStore.Entry` implementations are provided:

- **KeyStore.PrivateKeyEntry**
    
    This type of entry holds a cryptographic `PrivateKey`, which is optionally stored in a protected format to prevent unauthorized access. It is also accompanied by a certificate chain for the corresponding public key.
    
- **KeyStore.SecretKeyEntry**
    
    This type of entry holds a cryptographic `SecretKey`, which is optionally stored in a protected format to prevent unauthorized access.
    
- **KeyStore.TrustedCertificateEntry**
    
    This type of entry contains a single public key `Certificate` belonging to another party. It is called a _trusted certificate_ because the keystore owner trusts that the public key in the certificate indeed belongs to the identity identified by the _subject_ (owner) of the certificate.
    

Let's now look at some examples.

## Example 1: Simple Kotlin Android KeyStore Secure Storage Example

Let's look at simple example step by step.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependency is needed.

### Step 3: Design Layout

We will just have a dummy layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Here is how we obtain a secret key:

```kotlin
    fun getKey(): SecretKey {
        val keystore = KeyStore.getInstance("AndroidKeyStore")
        keystore.load(null)

        val secretKeyEntry = keystore.getEntry("MyKeyAlias", null) as KeyStore.SecretKeyEntry
        return secretKeyEntry.secretKey
    }
```

Here is how we encrypt data:

```kotlin
    fun encryptData(data: String): Pair<ByteArray, ByteArray> {
        val cipher = Cipher.getInstance("AES/CBC/NoPadding")

        var temp = data
        while (temp.toByteArray().size % 16 != 0)
            temp += "\u0020"

        cipher.init(Cipher.ENCRYPT_MODE, getKey())

        val ivBytes = cipher.iv
        val encryptedBytes = cipher.doFinal(temp.toByteArray(Charsets.UTF_8))

        return Pair(ivBytes, encryptedBytes)
    }
```

And here is how we decrypt data:

```kotlin
    fun decryptData(ivBytes: ByteArray, data: ByteArray): String{
        val cipher = Cipher.getInstance("AES/CBC/NoPadding")
        val spec = IvParameterSpec(ivBytes)

        cipher.init(Cipher.DECRYPT_MODE, getKey(), spec)
        return cipher.doFinal(data).toString(Charsets.UTF_8).trim()
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import androidx.appcompat.app.AppCompatActivity
import java.security.KeyPairGenerator
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.IvParameterSpec

class MainActivity : AppCompatActivity() {

    companion object {
        val TRANSFORMATION = "AES/GCM/NoPadding"
        val ANDROID_KEY_STORE = "AndroidKeyStore"
        val SAMPLE_ALIAS = "MYALIAS"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
        val keyGenParameterSpec = KeyGenParameterSpec.Builder("MyKeyAlias",
                KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build()

        keyGenerator.init(keyGenParameterSpec)
        keyGenerator.generateKey()

        val pair = encryptData("Test this encryption")

        val decryptedData = decryptData(pair.first, pair.second)

        val encrypted = pair.second.toString(Charsets.UTF_8)
        println("Encrypted data: $encrypted")
        println("Decrypted data: $decryptedData")

    }
    fun getKey(): SecretKey {
        val keystore = KeyStore.getInstance("AndroidKeyStore")
        keystore.load(null)

        val secretKeyEntry = keystore.getEntry("MyKeyAlias", null) as KeyStore.SecretKeyEntry
        return secretKeyEntry.secretKey
    }

    fun encryptData(data: String): Pair<ByteArray, ByteArray> {
        val cipher = Cipher.getInstance("AES/CBC/NoPadding")

        var temp = data
        while (temp.toByteArray().size % 16 != 0)
            temp += "\u0020"

        cipher.init(Cipher.ENCRYPT_MODE, getKey())

        val ivBytes = cipher.iv
        val encryptedBytes = cipher.doFinal(temp.toByteArray(Charsets.UTF_8))

        return Pair(ivBytes, encryptedBytes)
    }

    fun decryptData(ivBytes: ByteArray, data: ByteArray): String{
        val cipher = Cipher.getInstance("AES/CBC/NoPadding")
        val spec = IvParameterSpec(ivBytes)

        cipher.init(Cipher.DECRYPT_MODE, getKey(), spec)
        return cipher.doFinal(data).toString(Charsets.UTF_8).trim()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/allefsousa/Secure-Storage-Android/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/allefsousa/) code author |
