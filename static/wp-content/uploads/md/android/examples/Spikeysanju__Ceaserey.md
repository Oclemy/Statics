# Ceaserey

>  Caesar Cipher Encryption.

### Full Example

Let us look at a full android Caesar Encryption sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). build.gradle**

> Our app-level `build.gradle`.

No special dependency is needed. 

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'
}

```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**

> Our `activity_main` layout.

Then inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Next design your XML layout using the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
3. `Button`
4. `EditText`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <TextView
        android:id="@+id/textView7"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="27dp"
        android:layout_marginEnd="27dp"
        android:layout_marginBottom="25dp"
        android:textSize="40sp"
        android:gravity="center_horizontal|center_vertical"
        android:padding="20dp"
        android:textColor="@android:color/black"
        android:fontFamily="@font/googlesans_bold"
        android:background="@color/trans_yellow"
        app:layout_constraintBottom_toTopOf="@+id/messageED"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView8" />

    <TextView
        android:id="@+id/textView8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="30dp"
        android:layout_marginTop="42dp"
        android:layout_marginBottom="36dp"
        android:fontFamily="@font/googlesans_bold"
        android:text="Cipher Ceasar"
        android:textColor="@android:color/black"
        android:textSize="28sp"
        app:layout_constraintBottom_toTopOf="@+id/textView7"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button7"
        android:layout_width="0dp"
        android:layout_height="50dp"
        android:layout_marginStart="30dp"
        android:layout_marginEnd="30dp"
        android:background="@android:color/black"
        android:fontFamily="@font/googlesans_bold"
        android:text="Encrypt"
        android:textColor="@android:color/white"
        app:layout_constraintBaseline_toBaselineOf="@+id/button8"
        app:layout_constraintEnd_toStartOf="@+id/button8"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/button8"
        android:layout_width="165dp"
        android:layout_height="49dp"
        android:layout_marginEnd="31dp"
        android:layout_marginBottom="90dp"
        android:background="@android:color/black"
        android:fontFamily="@font/googlesans_bold"
        android:text="Decrypt"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/button7"
        app:layout_constraintTop_toBottomOf="@+id/keyED" />

    <EditText
        android:id="@+id/messageED"
        android:layout_width="0dp"
        android:layout_height="50dp"
        android:layout_marginStart="32dp"
        android:layout_marginEnd="32dp"
        android:layout_marginBottom="20dp"
        android:fontFamily="@font/googlesans_regular"
        android:hint="Your Message"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toTopOf="@+id/cipherED"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView7" />

    <EditText
        android:id="@+id/cipherED"
        android:layout_width="356dp"
        android:layout_height="50dp"
        android:layout_marginStart="29dp"
        android:layout_marginEnd="29dp"
        android:layout_marginBottom="17dp"
        android:fontFamily="@font/googlesans_regular"
        android:hint="Cipher Text"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toTopOf="@+id/keyED"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/messageED" />


    <EditText
        android:id="@+id/keyED"
        android:layout_width="356dp"
        android:layout_height="50dp"
        android:inputType="number"
        android:layout_marginStart="29dp"
        android:layout_marginEnd="29dp"
        android:layout_marginBottom="21dp"
        android:fontFamily="@font/googlesans_regular"
        android:hint="Key"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toTopOf="@+id/button8"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/cipherED" />


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). Utility.java**

> Our `Utility` class.

First and foremost Generate a java file named `Utility.java`.

Next we will be creating the following methods:

1. `encrypt(String plainText, int encryptionKey)` - To encrypt our text. It takes in the text to encrypt and an encryption key. It will return `String` object.
2. `decrypt(String cipherText, int decryptionKey)` - It takes as parameters the text to decrypt and the decryption key. It will return `String` object.
3. `reset()`.

Here is the full code:

```java
package replace_with_your_package_name;

public class Utility {

    //the alphabet
    private static String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //                               "01234567890123456789012345" this line is to read index of each letter

    private static int index;
    private static int updated_index;
    private static int final_index;
    private static int index_p_t_l; // index of plaintext letter
    private static int index_s_t_l; // index of ciphertext letter
    private static String plaintxt;
    private static String ciphertxt;
    private static String finaltext;

    /**
     * this method encrypts an English text using Caesar Cipher encryption method
     *
     * @param plainText     the plain text to encrypt
     * @param encryptionKey the encryption key
     * @return ciphered text
     */
    public static String encrypt(String plainText, int encryptionKey) {
        reset();
        plainText = plainText.toUpperCase();
//        System.out.println("Here is the chars of the plain text.."
//                + "\nwith its index in the alphabet, the new index after adding the encryption key, and the final value of index.");

        for (index = 0; index < plainText.length(); index++) {

            //to find each char in plaintxt
//            System.out.print(plainText.charAt(index) + " ");

            if (plainText.charAt(index) != ' ') { //to find the index of each plaintxt's letter IN THE ALPHABET
                index_p_t_l = alphabet.indexOf(plainText.charAt(index));
//                System.out.print(index_p_t_l + " ");

                updated_index = encryptionKey + alphabet.indexOf(plainText.charAt(index)); //then add the encryption key to the index of each letter we found IN ALPHABET
//                System.out.print(updated_index + " ");

                if (updated_index >= alphabet.length()) {    //If the new index is > than alphabet.length subtract alphabet.length
                    final_index = updated_index - alphabet.length();
                } else {
                    final_index = updated_index;
                }
//                System.out.println(final_index);

                ciphertxt = alphabet.substring(final_index, final_index + 1);  //find the char of each index in alphabet

                finaltext = finaltext + ciphertxt; //concatenate the whole chars of cipher text..
            } else {
//                System.out.println("\n");
            }

        }
        //System.out.println(finaltext);
        return finaltext;
    }


    /**
     * this method encrypts an English text using Caesar Cipher encryption method
     *
     * @param cipherText
     * @param decryptionKey
     * @return
     */
    public static String decrypt(String cipherText, int decryptionKey) {
        reset();
        cipherText = cipherText.toUpperCase();

//        System.out.println("Here is the chars of the cipher text.."
//                + "\nwith its index in the alphabet, the new index after adding the decryption key, and the final value of index.");


        for (index = 0; index < cipherText.length(); index++) {

            //to find and display each char in ciphertxt
//            System.out.print(cipherText.charAt(index) + " ");

            if (cipherText.charAt(index) != ' ') {
                index_p_t_l = alphabet.indexOf(cipherText.charAt(index));


                index_s_t_l = index_p_t_l; //to find the index of each plaintxt's letter IN THE ALPHABET
//                System.out.print(index_s_t_l + " ");

                //then subtract the encryption key from the index of each letter we found IN ALPHABET
                updated_index = alphabet.indexOf(cipherText.charAt(index)) - decryptionKey;
//                System.out.print(updated_index + " ");

                //If the new index is < than a.length subtract a.length
                if (updated_index < 0) {
                    final_index = updated_index + alphabet.length();
                } else {
                    final_index = updated_index;
                }
//                System.out.println(final_index);

                //find the char of each index in alphabet
                plaintxt = alphabet.substring(final_index, final_index + 1);

                //concatenate the whole chars of plain text..
                finaltext = finaltext + plaintxt;
            } else {
//                System.out.println("\n");
            }
        }
//        System.out.println(finaltext );
        return finaltext;
    }

    private static void reset() {
        finaltext = "";
    }
}


```

**(c). MainActivity.java**

> Our `MainActivity` class.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.

Then we will be creating the following methods:

1. `decode(String cipher, int key)`.

Here is the full code:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private Button encrpyt, decrypt;
    private EditText message, cipher, key;
    private TextView myOutput;


    private static final String[] ALPHABETARRAY = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r"
            , "s", "t", "u", "v", "w", "x", "y", "z"};

    private static final String ALPHABETSTRING = "abcdefghijklmnopqrstuvwxyz";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        encrpyt = findViewById(R.id.button7);
        decrypt = findViewById(R.id.button8);
        myOutput = findViewById(R.id.textView7);

        message = findViewById(R.id.messageED);
        cipher = findViewById(R.id.cipherED);
        key = findViewById(R.id.keyED);


        encrpyt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                encryptt(message.getText().toString(), Integer.parseInt(key.getText().toString()));
            }
        });

        decrypt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               // decryptt(cipher.getText().toString(), Integer.parseInt(key.getText().toString()));
//                decryptt(encryptt(myOutput.getText().toString(), Integer.parseInt(key.getText().toString())),
//                        Integer.parseInt(key.getText().toString()));

                decode(cipher.getText().toString(), Integer.parseInt(key.getText().toString()));
            }
        });


    }

    public void decode(String cipher, int key) {


        myOutput.setText(Utility.decrypt(cipher, key).toLowerCase());

        //return encryptt(enc, 26-offset);


    }


    public String encryptt(String message, int shiftKey)
    {
        message = message.toLowerCase();
        String cipherText = "";
        for (int i = 0; i < message.length(); i++)
        {
            int charPosition = ALPHABETSTRING.indexOf(message.charAt(i));
            int keyVal = (shiftKey + charPosition) % 26;
            char replaceVal = ALPHABETSTRING.charAt(keyVal);
            cipherText += replaceVal;

            myOutput.setText(cipherText);
            cipher.setText(cipherText);

        }
        return cipherText;
    }


    public  String decryptt(String cipherText, int shiftKey)
    {
        cipherText = cipherText.toLowerCase();
        String plainText = "";
        for (int i = 0; i < cipherText.length(); i++)
        {
            int charPosition = ALPHABETSTRING.indexOf(cipherText.charAt(i));
            int keyVal = (charPosition - shiftKey) % 26;
            if (keyVal < 0)
            {
                keyVal = ALPHABETSTRING.length() + keyVal;
            }
            char replaceVal = ALPHABETSTRING.charAt(keyVal);
            plainText += replaceVal;
        }
        return plainText;
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/Ceaserey/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/Ceaserey).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
