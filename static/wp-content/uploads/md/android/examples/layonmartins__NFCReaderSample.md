# NFC Reader Sample

>  Android app sample of how to read an NFC/RFID tag/card informations.

- Kotlin
- NFC
- RFID

### How to test?


- Open the app
- Approach your card or tag NFC or RFID (or HCE emulator i.e: https://github.com/layonmartins/RFID-NFC-CardEmulateSample) behind the smartphone
- The NFC Infos will be printed on screen table
![NFC Reader Tutorial](https://github.com/layonmartins/NFCReaderSample/raw/main/screenshot.png)

Let us look at a full NFC Reader Example based on the project below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable [`view binding`](https://android.camposha.info/en/viewbinding) by setting the `viewBinding` property to true. This will allow us to efficiently reference widgets from layout without explicitly invoking `findViewById()` function or using kotlin synthetics.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:

1. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. Our `Work-runtime-ktx` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    compileSdk 32

    defaultConfig {
        applicationId "com.example.nfcreadersample"
        minSdk 25
        targetSdk 32
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
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
    buildFeatures {
        viewBinding true
    }
}

dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.appcompat:appcompat:1.5.0'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    implementation 'androidx.work:work-runtime-ktx:2.7.0'
}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.camposha.info/en/activity) but we have to register it right here as shown below: We will be defining a `meta-data` tag as well. Here we will add the following permission:

1. Our `NFC` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.nfcreadersample">

    <uses-permission android:name="android.permission.NFC" />
    <uses-feature android:name="android.hardware.nfc" android:required="false" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.NFCReaderSample"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.nfc.action.NDEF_DISCOVERED" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="text/plain" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.nfc.action.TECH_DISCOVERED" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
            <meta-data
                android:name="android.nfc.action.TECH_DISCOVERED"
                android:resource="@xml/nfc_tech_filter" />
        </activity>
    </application>

</manifest>
```
#### Step 3. Create XML

Create a directory known as `xml` inside your `res` directory and add the following xml file:


**(a). `nfc_tech_filter.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">
    <tech-list>
        <tech>android.nfc.tech.IsoDep</tech>
        <tech>android.nfc.tech.NfcA</tech>
        <tech>android.nfc.tech.NfcB</tech>
        <tech>android.nfc.tech.NfcF</tech>
        <tech>android.nfc.tech.NfcV</tech>
        <tech>android.nfc.tech.Ndef</tech>
        <tech>android.nfc.tech.NdefFormatable</tech>
        <tech>android.nfc.tech.MifareClassic</tech>
        <tech>android.nfc.tech.MifareUltralight</tech>
    </tech-list>
</resources>
```

**(b). `data_extraction_rules.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?><!--
   Sample data extraction rules file; uncomment and customize as necessary.
   See https://developer.android.com/about/versions/12/backup-restore#xml-changes
   for details.
-->
<data-extraction-rules>
    <cloud-backup>
        <!-- TODO: Use <include> and <exclude> to control what is backed up.
        <include .../>
        <exclude .../>
        -->
    </cloud-backup>
    <!--
    <device-transfer>
        <include .../>
        <exclude .../>
    </device-transfer>
    -->
</data-extraction-rules>
```

**(c). `backup_rules.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?><!--
   Sample backup rules file; uncomment and customize as necessary.
   See https://developer.android.com/guide/topics/data/autobackup
   for details.
   Note: This file is ignored for devices older that API 31
   See https://developer.android.com/about/versions/12/backup-restore
-->
<full-backup-content>
    <!--
   <include domain="sharedpref" path="."/>
   <exclude domain="sharedpref" path="device.xml"/>
-->
</full-backup-content>
```
#### Step 4. Design Layouts

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`CardView`](https://android.camposha.info/en/cardview)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`TableLayout`](https://android.camposha.info/en/tablelayout)
5. [``](https://android.camposha.info/en/)
6. [`TableRow`](https://android.camposha.info/en/tablerow)
7. [`ScrollView`](https://android.camposha.info/en/scrollview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.cardview.widget.CardView
        android:id="@+id/rfidCardView"
        android:layout_width="300dp"
        android:layout_height="200dp"
        android:layout_gravity="center"
        android:layout_marginStart="24dp"
        android:layout_marginTop="24dp"
        android:layout_marginEnd="24dp"
        android:backgroundTint="#BDBDBD"
        app:cardCornerRadius="20dp"
        app:cardElevation="20dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.0">


        <TextView
            android:id="@+id/reading"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_marginBottom="45dp"
            android:gravity="center|bottom"
            android:text="Reading..."
            android:textColor="@color/black"
            android:textSize="18sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/title2"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_marginBottom="20dp"
            android:gravity="center|bottom"
            android:text="Approach your NFC Tag on your device"
            android:textColor="#454545"
            android:textStyle="bold|italic" />

        <ImageView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_gravity="center_horizontal|center_vertical"
            android:layout_marginBottom="30dp"
            android:contentDescription="@string/app_name"
            android:src="@drawable/nfc" />

    </androidx.cardview.widget.CardView>

    <TableLayout
        android:id="@+id/tableHead"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:stretchColumns="1"
        android:layout_marginTop="24dp"
        android:layout_marginStart="10dp"
        android:layout_marginEnd="10dp"
        android:layout_gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/rfidCardView">

        <TableRow android:background="#CDCDCD">

            <TextView
                android:layout_column="0"
                android:padding="10dip"
                android:gravity="center"
                android:ems="5"
                android:textColor="@color/black"
                android:textStyle="bold"
                android:layout_gravity="center"
                android:text="UID" />

            <TextView
                android:layout_column="1"
                android:padding="10dip"
                android:textStyle="bold"
                android:ems="8"
                android:textColor="@color/black"
                android:gravity="center"
                android:text="Technologies" />

            <TextView
                android:layout_column="2"
                android:gravity="center"
                android:padding="10dip"
                android:textColor="@color/black"
                android:textStyle="bold"
                android:ems="8"
                android:text="Apdu response" />
        </TableRow>
    </TableLayout>

    <ScrollView
        android:id="@+id/scrollView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_margin="10dp"
        android:fillViewport="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tableHead">

        <TableLayout
            android:id="@+id/table"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:stretchColumns="1"
            android:textColor="@color/black"

            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/rfidCardView">


        </TableLayout>
    </ScrollView>


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `Utils.kt`**
> Our `Utils` class.

Create a Kotlin file named `Utils.kt` .

Then we will be creating the following functions:

1. `hexStringToByteArray(parameter)` - Let's pass a `String` object as a parameter.
2. `toHex(parameter)` - This function will take a `ByteArray` object as a parameter.

**(a). Our `hexStringToByteArray()` function**

Write the `hexStringToByteArray()` function as follows:

```kotlin
        fun hexStringToByteArray(data: String) : ByteArray {

            val result = ByteArray(data.length / 2)

            for (i in 0 until data.length step 2) {
                val firstIndex = HEX_CHARS.indexOf(data[i]);
                val secondIndex = HEX_CHARS.indexOf(data[i + 1]);

                val octet = firstIndex.shl(4).or(secondIndex)
                result.set(i.shr(1), octet.toByte())
            }

            return result
        }
```

**(b). Our `toHex()` function**

Write the `toHex()` function as follows:

```kotlin
        fun toHex(byteArray: ByteArray) : String {
            val result = StringBuffer()

            byteArray.forEach {
                val octet = it.toInt()
                val firstIndex = (octet and 0xF0).ushr(4)
                val secondIndex = octet and 0x0F
                result.append(HEX_CHARS_ARRAY[firstIndex])
                result.append(HEX_CHARS_ARRAY[secondIndex])
            }

            return result.toString()
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

class Utils {

    companion object {
        private val HEX_CHARS = "0123456789ABCDEF"
        fun hexStringToByteArray(data: String) : ByteArray {

            val result = ByteArray(data.length / 2)

            for (i in 0 until data.length step 2) {
                val firstIndex = HEX_CHARS.indexOf(data[i]);
                val secondIndex = HEX_CHARS.indexOf(data[i + 1]);

                val octet = firstIndex.shl(4).or(secondIndex)
                result.set(i.shr(1), octet.toByte())
            }

            return result
        }

        private val HEX_CHARS_ARRAY = "0123456789ABCDEF".toCharArray()
        fun toHex(byteArray: ByteArray) : String {
            val result = StringBuffer()

            byteArray.forEach {
                val octet = it.toInt()
                val firstIndex = (octet and 0xF0).ushr(4)
                val secondIndex = octet and 0x0F
                result.append(HEX_CHARS_ARRAY[firstIndex])
                result.append(HEX_CHARS_ARRAY[secondIndex])
            }

            return result.toString()
        }
    }

}

```

**(b). `MainActivity.kt`**
> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Animation` from the `android.view.animation` package.
2. `TableLayout` from the `android.widget` package.
3. `TableRow` from the `android.widget` package.
4. `TextView` from the `android.widget` package.
5. `AppCompatActivity` from the `androidx.appcompat.app` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResume() `.
3. `onPause() `.
4. `onNewIntent(intent: Intent?) `.
5. `onTagDiscovered(tag: Tag?) `.

Then we will be creating the following functions:

1. `addRowOnTable(s1 : String, s2 : String, s3: String) `.
2. `checkIfHasNFCHardware()`.
3. `startBlinkEffect(parameter)` - Let's pass a `TextView` object as a parameter.
4. `enableReadTagByOnNewIntent() `.
5. `enableReadTagByOnTagDiscovered() `.
6. `setupNfcReaderModeBackground() `.
7. `resolveIntent(parameter)` - Pass to this method a `Intent?` object as a parameter.
8. `ByteArrayToHexString(parameter)` - This function will take a `ByteArray` object as a parameter.

**(a). Our `checkIfHasNFCHardware()` function**

Write the `checkIfHasNFCHardware()` function as follows:

```kotlin
    fun checkIfHasNFCHardware(){
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        if (nfcAdapter == null || (nfcAdapter?.isEnabled == false)) {
            //NFC is not available or enabled
            binding.title2.text = "NFC is not available or enabled"
        } else {
            //setupNfcReaderModeBackground() //setup the foreground reader
            startBlinkEffect(binding.reading)
            enableReadTagByOnTagDiscovered()
        }
    }
```

**(b). Our `addRowOnTable()` function**

Write the `addRowOnTable()` function as follows:

```kotlin
    private fun addRowOnTable(s1 : String, s2 : String, s3: String) {
        /* Create a new row to be added. */
        val tr = TableRow(this)
        tr.layoutParams = TableRow.LayoutParams(
            TableRow.LayoutParams.MATCH_PARENT,
            TableRow.LayoutParams.WRAP_CONTENT
        )
        /* Create a TextView to be the row-content. */
        val t1 = TextView(this)
        t1.text = s1
        t1.layoutParams = TableRow.LayoutParams(0).apply {
            this.gravity = Gravity.CENTER
        }

        val t2 = TextView(this)
        t2.text = s2
        t2.layoutParams = TableRow.LayoutParams(1).apply {
            this.gravity = Gravity.CENTER
        }

        val t3 = TextView(this)
        t3.text = s3
        t3.layoutParams = TableRow.LayoutParams(2).apply {
            this.gravity = Gravity.CENTER
        }

        /* Add TextView to row. */
        tr.addView(t1)
        tr.addView(t2)
        tr.addView(t3)

        /* Add row to TableLayout. */
        if(tagDiscoveryCount % 2 == 0){
            tr.setBackgroundColor(resources.getColor(R.color.tableRow, null))
        }

        binding.table.addView(
            tr,
            TableLayout.LayoutParams(
                TableLayout.LayoutParams.MATCH_PARENT,
                TableLayout.LayoutParams.WRAP_CONTENT
            )
        )
    }
```

**(c). Our `enableReadTagByOnTagDiscovered()` function**

Write the `enableReadTagByOnTagDiscovered()` function as follows:

```kotlin
    private fun enableReadTagByOnTagDiscovered() {
        nfcAdapter?.enableReaderMode(
            this, this,
            NfcAdapter.FLAG_READER_NFC_A or
                    NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
            null
        )
    }
```

**(d). Our `enableReadTagByOnNewIntent()` function**

Write the `enableReadTagByOnNewIntent()` function as follows:

```kotlin
    private fun enableReadTagByOnNewIntent() {
         pendingIntent = PendingIntent.getActivity(
             this,
             0,
             Intent(this, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
             PendingIntent.FLAG_MUTABLE
         )
         nfcAdapter?.enableForegroundDispatch(this, pendingIntent, null, null)
    }
```

**(e). Our `startBlinkEffect()` function**

Write the `startBlinkEffect()` function as follows:

```kotlin
    fun startBlinkEffect(text : TextView) {
        val animation = AlphaAnimation(0.1f, 1.0f).also {
            it.duration = 250
            it.repeatMode = Animation.REVERSE
            it.repeatCount = Animation.INFINITE
        }
        text.startAnimation(animation)
    }
```

**(f). Our `resolveIntent()` function**

Write the `resolveIntent()` function as follows:

```kotlin
    private fun resolveIntent(intent : Intent?) {

        Log.d(TAG, "resolveIntent = $intent")

        val action = intent?.action
        Log.d(TAG, "resolveIntent action = $action")
        if(NfcAdapter.ACTION_TAG_DISCOVERED == action ||
            NfcAdapter.ACTION_TECH_DISCOVERED == action ||
            NfcAdapter.ACTION_NDEF_DISCOVERED == action) {

            intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)?.also { rawMessages ->
                val messages: List<NdefMessage> = rawMessages.map { it as NdefMessage }
                // Process the messages array.
                Log.d(TAG, "resolveIntent messages = $messages")
                    messages.forEach {
                        Log.d(TAG, "resolveIntent message = $it")

                    }
            }

            val tag : Tag? = intent?.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            Log.d(TAG, "resolveIntent tag = $tag")
            tag?.let {
                Log.d(TAG, "resolveIntent tag.id = ${tag.id}")
                Log.d(TAG, "resolveIntent tag.id Hex = ${ByteArrayToHexString(tag.id)}")
            }

            val uid = intent?.getByteArrayExtra(NfcAdapter.EXTRA_ID)
            uid?.let {
                val uidHex = ByteArrayToHexString(uid)
                Log.d(TAG, "resolveIntent uidHex = $uidHex")
            }
            Log.d(TAG, "resolveIntent uid = $uid")

            val aid = intent?.getByteArrayExtra(NfcAdapter.EXTRA_AID)
            Log.d(TAG, "resolveIntent aid = $aid")

            val data = intent?.getByteArrayExtra(NfcAdapter.EXTRA_DATA)
            Log.d(TAG, "resolveIntent data = $data")

            val secure = intent?.getByteArrayExtra(NfcAdapter.EXTRA_SECURE_ELEMENT_NAME)
            Log.d(TAG, "resolveIntent secure = $secure")

            val message = intent?.getByteArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)
            Log.d(TAG, "resolveIntent message = $message")

            val state = intent?.getByteArrayExtra(NfcAdapter.EXTRA_ADAPTER_STATE)
            Log.d(TAG, "resolveIntent state = $state")

            val paymentPreferred = intent?.getByteArrayExtra(NfcAdapter.EXTRA_PREFERRED_PAYMENT_CHANGED_REASON)
            Log.d(TAG, "resolveIntent paymentPreferred = $paymentPreferred")

            val readerDelay = intent?.getByteArrayExtra(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY)
            Log.d(TAG, "resolveIntent readerDelay = $readerDelay")

        }
    }
```

**(g). Our `ByteArrayToHexString()` function**

Write the `ByteArrayToHexString()` function as follows:

```kotlin
    fun ByteArrayToHexString(inarray: ByteArray): String? {

        val biStr = BigInteger(inarray)
        val binary = biStr.toString(2)
        val hexadecimal = biStr.toString(16).uppercase()
        val decimal = biStr.toString(10)

        Log.d(TAG, "ByteArrayToHexString binary = $binary")
        Log.d(TAG, "ByteArrayToHexString hex = $hexadecimal")
        Log.d(TAG, "ByteArrayToHexString dec = $decimal")

        return hexadecimal
    }
```

**(h). Our `setupNfcReaderModeBackground()` function**

Write the `setupNfcReaderModeBackground()` function as follows:

```kotlin
    private fun setupNfcReaderModeBackground() {

        val options = Bundle()
        // Work around for some broken Nfc firmware implementations that poll the card too fast
        // Work around for some broken Nfc firmware implementations that poll the card too fast
        options.putInt(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY, 250)

        nfcAdapter?.enableReaderMode(
            this,
            this,
            NfcAdapter.FLAG_READER_NFC_B or
        NfcAdapter.FLAG_READER_NFC_F or
        NfcAdapter.FLAG_READER_NFC_V or
        NfcAdapter.FLAG_READER_NFC_BARCODE,
        options
        )
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.PendingIntent
import android.content.Intent
import android.graphics.Color
import android.nfc.NdefMessage
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.IsoDep
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.animation.AlphaAnimation
import android.view.animation.Animation
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.nfcreadersample.databinding.ActivityMainBinding
import java.math.BigInteger


class MainActivity : AppCompatActivity(), NfcAdapter.ReaderCallback {

    private lateinit var binding: ActivityMainBinding
    private var nfcAdapter: NfcAdapter? = null
    private val TAG = "layon.f"
    private lateinit var pendingIntent : PendingIntent
    private var tagDiscoveryCount = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)
    }

    override fun onResume() {
        super.onResume()
        checkIfHasNFCHardware()
    }

    private fun addRowOnTable(s1 : String, s2 : String, s3: String) {
        /* Create a new row to be added. */
        val tr = TableRow(this)
        tr.layoutParams = TableRow.LayoutParams(
            TableRow.LayoutParams.MATCH_PARENT,
            TableRow.LayoutParams.WRAP_CONTENT
        )
        /* Create a TextView to be the row-content. */
        val t1 = TextView(this)
        t1.text = s1
        t1.layoutParams = TableRow.LayoutParams(0).apply {
            this.gravity = Gravity.CENTER
        }

        val t2 = TextView(this)
        t2.text = s2
        t2.layoutParams = TableRow.LayoutParams(1).apply {
            this.gravity = Gravity.CENTER
        }

        val t3 = TextView(this)
        t3.text = s3
        t3.layoutParams = TableRow.LayoutParams(2).apply {
            this.gravity = Gravity.CENTER
        }

        /* Add TextView to row. */
        tr.addView(t1)
        tr.addView(t2)
        tr.addView(t3)

        /* Add row to TableLayout. */
        if(tagDiscoveryCount % 2 == 0){
            tr.setBackgroundColor(resources.getColor(R.color.tableRow, null))
        }

        binding.table.addView(
            tr,
            TableLayout.LayoutParams(
                TableLayout.LayoutParams.MATCH_PARENT,
                TableLayout.LayoutParams.WRAP_CONTENT
            )
        )
    }

    override fun onPause() {
        super.onPause()
        nfcAdapter?.disableForegroundDispatch(this)
        nfcAdapter?.disableReaderMode(this)
    }

    fun checkIfHasNFCHardware(){
        nfcAdapter = NfcAdapter.getDefaultAdapter(this)
        if (nfcAdapter == null || (nfcAdapter?.isEnabled == false)) {
            //NFC is not available or enabled
            binding.title2.text = "NFC is not available or enabled"
        } else {
            //setupNfcReaderModeBackground() //setup the foreground reader
            startBlinkEffect(binding.reading)
            enableReadTagByOnTagDiscovered()
        }
    }

    fun startBlinkEffect(text : TextView) {
        val animation = AlphaAnimation(0.1f, 1.0f).also {
            it.duration = 250
            it.repeatMode = Animation.REVERSE
            it.repeatCount = Animation.INFINITE
        }
        text.startAnimation(animation)
    }

    private fun enableReadTagByOnNewIntent() {
         pendingIntent = PendingIntent.getActivity(
             this,
             0,
             Intent(this, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
             PendingIntent.FLAG_MUTABLE
         )
         nfcAdapter?.enableForegroundDispatch(this, pendingIntent, null, null)
    }

    private fun enableReadTagByOnTagDiscovered() {
        nfcAdapter?.enableReaderMode(
            this, this,
            NfcAdapter.FLAG_READER_NFC_A or
                    NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
            null
        )
    }

    //used to make the tag opens on background
    private fun setupNfcReaderModeBackground() {

        val options = Bundle()
        // Work around for some broken Nfc firmware implementations that poll the card too fast
        // Work around for some broken Nfc firmware implementations that poll the card too fast
        options.putInt(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY, 250)

        nfcAdapter?.enableReaderMode(
            this,
            this,
            NfcAdapter.FLAG_READER_NFC_B or
        NfcAdapter.FLAG_READER_NFC_F or
        NfcAdapter.FLAG_READER_NFC_V or
        NfcAdapter.FLAG_READER_NFC_BARCODE,
        options
        )
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
        resolveIntent(intent)
    }

    private fun resolveIntent(intent : Intent?) {

        Log.d(TAG, "resolveIntent = $intent")

        val action = intent?.action
        Log.d(TAG, "resolveIntent action = $action")
        if(NfcAdapter.ACTION_TAG_DISCOVERED == action ||
            NfcAdapter.ACTION_TECH_DISCOVERED == action ||
            NfcAdapter.ACTION_NDEF_DISCOVERED == action) {

            intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)?.also { rawMessages ->
                val messages: List<NdefMessage> = rawMessages.map { it as NdefMessage }
                // Process the messages array.
                Log.d(TAG, "resolveIntent messages = $messages")
                    messages.forEach {
                        Log.d(TAG, "resolveIntent message = $it")

                    }
            }

            val tag : Tag? = intent?.getParcelableExtra(NfcAdapter.EXTRA_TAG)
            Log.d(TAG, "resolveIntent tag = $tag")
            tag?.let {
                Log.d(TAG, "resolveIntent tag.id = ${tag.id}")
                Log.d(TAG, "resolveIntent tag.id Hex = ${ByteArrayToHexString(tag.id)}")
            }

            val uid = intent?.getByteArrayExtra(NfcAdapter.EXTRA_ID)
            uid?.let {
                val uidHex = ByteArrayToHexString(uid)
                Log.d(TAG, "resolveIntent uidHex = $uidHex")
            }
            Log.d(TAG, "resolveIntent uid = $uid")

            val aid = intent?.getByteArrayExtra(NfcAdapter.EXTRA_AID)
            Log.d(TAG, "resolveIntent aid = $aid")

            val data = intent?.getByteArrayExtra(NfcAdapter.EXTRA_DATA)
            Log.d(TAG, "resolveIntent data = $data")

            val secure = intent?.getByteArrayExtra(NfcAdapter.EXTRA_SECURE_ELEMENT_NAME)
            Log.d(TAG, "resolveIntent secure = $secure")

            val message = intent?.getByteArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES)
            Log.d(TAG, "resolveIntent message = $message")

            val state = intent?.getByteArrayExtra(NfcAdapter.EXTRA_ADAPTER_STATE)
            Log.d(TAG, "resolveIntent state = $state")

            val paymentPreferred = intent?.getByteArrayExtra(NfcAdapter.EXTRA_PREFERRED_PAYMENT_CHANGED_REASON)
            Log.d(TAG, "resolveIntent paymentPreferred = $paymentPreferred")

            val readerDelay = intent?.getByteArrayExtra(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY)
            Log.d(TAG, "resolveIntent readerDelay = $readerDelay")

        }
    }

    //conver the array of byte to hexadecimal String
    fun ByteArrayToHexString(inarray: ByteArray): String? {

        val biStr = BigInteger(inarray)
        val binary = biStr.toString(2)
        val hexadecimal = biStr.toString(16).uppercase()
        val decimal = biStr.toString(10)

        Log.d(TAG, "ByteArrayToHexString binary = $binary")
        Log.d(TAG, "ByteArrayToHexString hex = $hexadecimal")
        Log.d(TAG, "ByteArrayToHexString dec = $decimal")

        return hexadecimal
    }

    override fun onTagDiscovered(tag: Tag?) {
        Log.d("layon.f", "onTagDiscovered: $tag")
        tag?.let {
            tagDiscoveryCount++
            val id = Utils.toHex(it.id)
            var responseByte : ByteArray? = null
            var responseString : String = "           -           "
            var techs : String = ""
            it.techList.forEach {
                techs = "$techs${if(techs.isNotEmpty()) "," else ""} ${it.split(".").last()}"
            }

            val isoDep = IsoDep.get(tag)
            try {
                isoDep.connect()
                responseByte = isoDep.transceive(
                    Utils.hexStringToByteArray(
                        "00A4040007F0010203040506"
                    )
                )
                responseString = String(responseByte)
                isoDep.close()
            } catch (e: Exception) {
                Log.d("layon.f", "onTagDiscovered error: $e")
            } finally {
                runOnUiThread {
                    addRowOnTable(id, techs, responseString)
                }
            }
        }
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/layonmartins/NFCReaderSample/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/layonmartins/NFCReaderSample).|
|3.|Follow code author [here](https://github.com/layonmartins).|
