# Android Data Encryption and Decryption

If you are like me and has spent some time doing both android and backend web development, you know that security issues, encryption, hashing etc are discussed and emphasised alot in web than in mobile development. This makes sense since the capacity of damage in the web is much greater due to it's interconnected nature.

However, in android there is also an opportunity to encrypt and decrypt sensitive texts like passwords. Mostly if you are building an app that has some sort of user management, you tend to either use a third party service like firebase authentication or roll out your own custom mgmt system. If it is the latter then you will probably have to store user details locally in sharedpreferences. That is a good opportunity to encrypt your data.

Moreover, you may want to send encrypted data over the web rather than plain text. You may decrypt it in the server before persisting to the database or even save the encrypted data directly to database for maximum security.


In this piece we look at some options for you to safely and reliably encrypt and decrypt your data in android.

## (a). Codia

> Easy and Fast android - php - java Encryption Decryption library.

![](https://raw.githubusercontent.com/alirezaashrafi/Codia/master/diagram.jpg)

Here are the top features of Codia:

- Support UTF-8 Characters Arabic Chinese Farsi & .... Characters
- Without adding additional characters
- Extremely fast encrypt 100MB string per second
- Optimized for JSON encryption
- Min Sdk Version api 1

Let's see how to install and use Codia using easy to follow steps.

### Step 1: Install Codia

In your root gradle file add jitpack as follows:

```groovy
    allprojects {
         repositories {
             ...
             maven { url 'https://jitpack.io' }
         }
    }
```

Then specify the dependency in the module gradle file:

```groovy
    implementation 'com.github.alirezaashrafi:codia:2.0.0'
```

### Step 2: Use Codia

You can now use Codia to encrypt and decrypt. In android:

```java
    Codia codia = new Codia("Your Own Private Key");

    String text = "Easy and Fast android - php - java Encryption Decryption library";
    String encoded = codia.encode(text);
    String decoded = codia.decode(encoded);
```

And then in the server in PHP

```php
    require_once __DIR__.'/lib/Codia.php';
    $codia = new Codia("Your Own Private Key");

    $text = "Easy and Fast android - php - java Encryption Decryption library";
    $encodedText = $codia->encode($text);
    $decodedText = $codia->decode($encodedText);
```

Here's an example in Kotlin:

```kotlin
    val text = "Easy and Fast android - php - java Encryption Decryption library"

    val codia = Codia("Your Own Private Key")
    val encodedText = codia.encode(text)
    val decodedText = codia.decode(encodedText)
```

### Step 3: Example

Here's an example usage:

**Kotlin Encryption Example**

```kotlin

package com.alirezaashrafi.codia

import com.alirezaashrafi.library.Codia

/**
 * Android Created by AlirezaAshrafi on 2/16/2018.
 */

class Kotlin {

    private fun kotlin() {
        val text = "Easy and Fast android - php - java Encryption Decryption library"

        val codia = Codia("Your Own Private Key")
        val encodedText = codia.encode(text)
        val decodedText = codia.decode(encodedText)
    }
}
```

**Java Encryption  Example**

```java

package com.alirezaashrafi.codia;

import android.content.ClipboardManager;
import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.alirezaashrafi.library.Codia;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;

import javax.crypto.Cipher;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();

        final Codia codia = new Codia("Your Own Private Key");
        String text = "Easy and Fast android - php - java Encryption Decryption library";
        final String encoded = codia.encode(text);
        String decoded = codia.decode(encoded);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                final Codia codia = new Codia(edtKey.getText().toString());

                String resString = edt.getText().toString();
                edt.setText("");
                if (radioEncrypt.isChecked()) {
                    resString = codia.encode(resString);
                } else if (radioDecrypt.isChecked()) {
                    resString = codia.decode(resString);
                }
                res.setText(resString);
            }
        });
        res.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setText(res.getText());
                Toast.makeText(getApplicationContext(), "Copied to clipboard", Toast.LENGTH_SHORT).show();
            }
        });

    }

    private EditText edtKey;
    private EditText edt;
    private RadioButton radioEncrypt;
    private RadioButton radioDecrypt;
    private TextView res;
    private Button btn;

    public void initViews() {
        edtKey = (EditText) findViewById(R.id.edtKey);
        edt = (EditText) findViewById(R.id.edt);
        radioEncrypt = (RadioButton) findViewById(R.id.radioEncrypt);
        radioDecrypt = (RadioButton) findViewById(R.id.radioDecrypt);
        res = (TextView) findViewById(R.id.res);
        btn = (Button) findViewById(R.id.btn);
    }
}
```

Download full code [here](https://github.com/alirezaashrafi/Codia/tree/master/Android).

## (b). Seguro

> Secure persistence using AES+CBC encryption on Android with no dependencies. Can write to Memory/SharedPreferences/SDCard

### Step 1: How to Install

Install it as a dependency in your gradle file:

```groovy
api "com.cesarferreira:seguro:+"
```

### Step 2: Use

```kotlin
seguro = Seguro.Builder()
    .enableEncryption(encryptKey = true, encryptValue = true)
    .setEncryptionPassword("*QdfKPoRE[gC*vtqVxZ2Eg]ZM7TeWnHyYT")
    .enableLogging(true)
    .setPersistenceType(Seguro.PersistenceType.SDCard(".encrypted_secrets"))
    //.setPersistenceType(Seguro.PersistenceType.InMemory)
    //.setPersistenceType(Seguro.PersistenceType.SharedPreferences(applicationContext))
    .build()
```

#### Persistence types:

> `Seguro.PersistenceType.SDCard`

Persists the values to your SDCARD in the folder you specified in the `folderName`

> `Seguro.PersistenceType.InMemory`

Persists the values to the `memory`

> `Seguro.PersistenceType.SharedPreferences`

Persists the values to your `SharedPreferences`

To write:

```kotlin
seguro.Editor()
    .put("KEY_TIME", Date().time)
    .put("KEY_NAME", "Cesar Ferreira")
    .put("KEY_AGE", 31)
    .commit()
```

Because we chose to encrypt the `key` and the `value`, this will result in:

```
key: A0A7BDDA0D99CB02AC4DA421567535225F5F6013C5C699085D44A52404C97A83, value: D0EA346FE0A8D0C659848B10AADB2B057FE5E5AF3E15C13E195F4E89DA57E6BB
key: 9E9EA39C1F609E42E587458395C1C752DE8F06D2120483F1B08E883B53B8E739, value: 81A2B85774957B916A7067E31A662F699BCA9E87D01394D17F01AE506634BC78
key: 39E365FFA2B81165CB5CFE49098E2AFB520F3B129F092022D0FD3F09B3C5B0B1, value: 7BDC46776B8414C5A5B00FFFF45031E9C9FB8803DC8BF246CC311310EB8191ED
```

To read:

```kotlin
val name = seguro.getString("KEY_NAME") // "Cesar Ferreira"
val age = seguro.getInt("KEY_AGE")      // 31
```

To delete:

```kotlin
seguro.Editor()
    .delete("KEY_NAME")
    .commit()

val name : String? = seguro.getString("KEY_NAME")      // null
```

### Step 3: Example

Kotlin Encryption Example

```kotlin

package com.example.seguro

import android.Manifest
import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import cesarferreira.seguro.library.Seguro
import com.karumi.dexter.Dexter
import com.karumi.dexter.MultiplePermissionsReport
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.multi.MultiplePermissionsListener
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var seguro: Seguro

    @SuppressLint("MissingPermission")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkPermissions()

        seguro = Seguro.Builder()
            .enableEncryption(encryptKey = true, encryptValue = true)
            .setEncryptionPassword("*QdfKPoRE[gC*vtqVxZ2Eg]ZM7TeWnHyYTHU}DuEocJd6QxuZ9WJ")
            .setPersistenceType(Seguro.PersistenceType.SDCard(".${BuildConfig.APPLICATION_ID}"))
            .enableLogging(BuildConfig.DEBUG)
//            .setPersistenceType(Seguro.PersistenceType.InMemory)
//            .setPersistenceType(Seguro.PersistenceType.SharedPreferences(applicationContext))
            .build()

        // READ
        readButton.setOnClickListener {

            val timeDelta = TimeDelta()
            val result = seguro.getString(TIME_KEY) ?: "cant find the TIME"
            timeDelta.finish()

            Log.d("TIME", "READ: " + timeDelta.delta.toString() + " ms")

            textView.text = ""
            textView.text = result
        }

        wipeButton.setOnClickListener {
            textView.text = "all data wiped"
            seguro.clear()
        }

        // WRITE
        writeButton.setOnClickListener {

            val timeDelta = TimeDelta()

            seguro.Editor()
                .put(TIME_KEY, Date().time)
                .put(NAME_KEY, "Cesar Ferreira")
                .commit()

            timeDelta.finish()

            Log.d("TIME", "WRITE: " + timeDelta.delta.toString() + " ms")

            textView.text = "I WROTE TO PERSISTENCE"
        }
    }

    private fun checkPermissions() {
        Dexter.withActivity(this)
            .withPermissions(
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE
            ).withListener(object : MultiplePermissionsListener {
                override fun onPermissionsChecked(report: MultiplePermissionsReport) {}
                override fun onPermissionRationaleShouldBeShown(
                    permissions: List,
                    token: PermissionToken
                ) {
                }
            }).check()
    }

    companion object {
        internal var TIME_KEY = "KEY_TIME"
        internal var NAME_KEY = "KEY_NAME"
    }
}
```

Download Full code [here](https://github.com/cesarferreira/seguro/tree/master/sample).
