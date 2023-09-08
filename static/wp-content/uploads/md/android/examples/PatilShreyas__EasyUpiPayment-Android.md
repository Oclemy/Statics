# EasyUpiPayment-Android

>  `EasyUpiPayment` is an Android Library to implement UPI Payment integration easily in Android App.


### Easy UPI Payment - Android Library

It is available in Maven:

![UPI Payment Implementation Tutorial](https://camo.githubusercontent.com/2c5429305f452971cee5891fe4fb382abf587835891ffe88399ba5b390594e8f/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6465762e73687265796173706174696c2e456173795570695061796d656e742f456173795570695061796d656e743f6c6162656c3d6d6176656e43656e7472616c)

And supports `API 19+`.

![UPI Payment Implementation Tutorial](https://camo.githubusercontent.com/4b77bd224fa83c91add5d32112b163cd25eb2af1be7ad31a549c4220dd985a87/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d31392532422d627269676874677265656e2e737667)


### Full Example

Follow these steps to create a full UPI Payment Implementation example.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.easyupipayment">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning">
        <activity android:name=".kotlin.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 9 UI widgets and ViewGroups:

1. `ScrollView`
2. `EditText`
3. `TextView`
4. `RadioGroup`
5. `RadioButton`
6. `Button`
7. `ImageView`
8. `LinearLayout`

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp"
        tools:context=".java.MainActivity">

        <EditText
            android:id="@+id/field_vpa"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="VPA" />

        <EditText
            android:id="@+id/field_name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Payee Name" />

        <EditText
            android:id="@+id/field_payee_merchant_code"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Payee Merchant Code" />

        <EditText
            android:id="@+id/field_transaction_id"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Transaction ID" />

        <EditText
            android:id="@+id/field_transaction_ref_id"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Transaction Ref ID" />

        <EditText
            android:id="@+id/field_description"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Description" />

        <EditText
            android:id="@+id/field_amount"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Amount (XX.XX)" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="16dp"
            android:text="UPI App :"
            android:textColor="#000000"
            android:textSize="18sp" />

        <RadioGroup
            android:id="@+id/radioAppChoice"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <RadioButton
                android:id="@+id/app_default"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:checked="true"
                android:text="Default" />

            <RadioButton
                android:id="@+id/app_amazonpay"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="AmazonPay" />

            <RadioButton
                android:id="@+id/app_bhim_upi"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="BHIM UPI" />

            <RadioButton
                android:id="@+id/app_google_pay"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Google Pay" />

            <RadioButton
                android:id="@+id/app_phonepe"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="PhonePe" />

            <RadioButton
                android:id="@+id/app_paytm"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="PayTm" />
        </RadioGroup>

        <Button
            android:id="@+id/button_pay"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="Pay with UPI" />

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="128dp"
            android:layout_height="128dp"
            android:layout_gravity="center" />

        <TextView
            android:id="@+id/textView_status"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_marginTop="16dp"
            android:text="Click above button to Pay"
            android:textColor="#000000"
            android:textSize="19sp" />
    </LinearLayout>
</ScrollView>
```
#### Step 3. Write Code

Finally we need to write our code as follows:

**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `Log` from the `android.util` package.
3. `Toast` from the `android.widget` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onTransactionCompleted(transactionDetails: TransactionDetails) `.
3. `onTransactionCancelled() `.

We will be creating the following methods:

1. `initViews() `.
2. `pay() `.
3. `onTransactionSuccess() `.
4. `onTransactionSubmitted() `.
5. `onTransactionFailed() `.
6. `toast(parameter)` - Let's pass a `String` object as a parameter.
7. `onDestroy() `.

**(a). Our `onTransactionFailed()` function**

Write the `onTransactionFailed()` function as follows:

```kotlin
	private fun onTransactionFailed() {
		// Payment Failed
		toast("Failed")
		imageView.setImageResource(R.drawable.ic_failed)
	}
```

**(b). Our `onTransactionSuccess()` function**

Write the `onTransactionSuccess()` function as follows:

```kotlin
	private fun onTransactionSuccess() {
		// Payment Success
		toast("Success")
		imageView.setImageResource(R.drawable.ic_success)
	}
```

**(c). Our `onTransactionSubmitted()` function**

Write the `onTransactionSubmitted()` function as follows:

```kotlin
	private fun onTransactionSubmitted() {
		// Payment Pending
		toast("Pending | Submitted")
		imageView.setImageResource(R.drawable.ic_success)
	}
```

**(d). Our `initViews()` function**

Write the `initViews()` function as follows:

```kotlin
	private fun initViews() {
		val transactionId = "TID" + System.currentTimeMillis()
		field_transaction_id.setText(transactionId)
		field_transaction_ref_id.setText(transactionId)

		// Setup click listener for Pay button
		button_pay.setOnClickListener { pay() }
	}
```

**(e). Our `onDestroy()` function**

Write the `onDestroy()` function as follows:

```kotlin
//	override fun onDestroy() {
//		super.onDestroy()
//		easyUpiPayment.removePaymentStatusListener()
//	}
}
```

**(f). Our `pay()` function**

Write the `pay()` function as follows:

```kotlin
	private fun pay() {
		val payeeVpa = field_vpa.text.toString()
		val payeeName = field_name.text.toString()
		val transactionId = field_transaction_id.text.toString()
		val transactionRefId = field_transaction_ref_id.text.toString()
		val payeeMerchantCode = field_payee_merchant_code.text.toString()
		val description = field_description.text.toString()
		val amount = field_amount.text.toString()
		val paymentAppChoice = radioAppChoice

		val paymentApp = when (paymentAppChoice.checkedRadioButtonId) {
			R.id.app_default -> PaymentApp.ALL
			R.id.app_amazonpay -> PaymentApp.AMAZON_PAY
			R.id.app_bhim_upi -> PaymentApp.BHIM_UPI
			R.id.app_google_pay -> PaymentApp.GOOGLE_PAY
			R.id.app_phonepe -> PaymentApp.PHONE_PE
			R.id.app_paytm -> PaymentApp.PAYTM
			else -> throw IllegalStateException("Unexpected value: " + paymentAppChoice.id)
		}

		try {
			// START PAYMENT INITIALIZATION
			easyUpiPayment = EasyUpiPayment(this) {
				this.paymentApp = paymentApp
				this.payeeVpa = payeeVpa
				this.payeeName = payeeName
				this.transactionId = transactionId
				this.transactionRefId = transactionRefId
				this.payeeMerchantCode = payeeMerchantCode
				this.description = description
				this.amount = amount
			}
			// END INITIALIZATION

			// Register Listener for Events
			easyUpiPayment.setPaymentStatusListener(this)

			// Start payment / transaction
			easyUpiPayment.startPayment()
		} catch (e: Exception) {
			e.printStackTrace()
			toast("Error: ${e.message}")
		}
	}
```

**(g). Our `toast()` function**

Write the `toast()` function as follows:

```kotlin
	private fun toast(message: String) {
		Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
	}
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.easyupipayment.R
import dev.shreyaspatil.easyupipayment.EasyUpiPayment
import dev.shreyaspatil.easyupipayment.listener.PaymentStatusListener
import dev.shreyaspatil.easyupipayment.model.PaymentApp
import dev.shreyaspatil.easyupipayment.model.TransactionDetails
import dev.shreyaspatil.easyupipayment.model.TransactionStatus
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), PaymentStatusListener {

	private lateinit var easyUpiPayment: EasyUpiPayment

	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContentView(R.layout.activity_main)

		initViews()
	}

	private fun initViews() {
		val transactionId = "TID" + System.currentTimeMillis()
		field_transaction_id.setText(transactionId)
		field_transaction_ref_id.setText(transactionId)

		// Setup click listener for Pay button
		button_pay.setOnClickListener { pay() }
	}

	private fun pay() {
		val payeeVpa = field_vpa.text.toString()
		val payeeName = field_name.text.toString()
		val transactionId = field_transaction_id.text.toString()
		val transactionRefId = field_transaction_ref_id.text.toString()
		val payeeMerchantCode = field_payee_merchant_code.text.toString()
		val description = field_description.text.toString()
		val amount = field_amount.text.toString()
		val paymentAppChoice = radioAppChoice

		val paymentApp = when (paymentAppChoice.checkedRadioButtonId) {
			R.id.app_default -> PaymentApp.ALL
			R.id.app_amazonpay -> PaymentApp.AMAZON_PAY
			R.id.app_bhim_upi -> PaymentApp.BHIM_UPI
			R.id.app_google_pay -> PaymentApp.GOOGLE_PAY
			R.id.app_phonepe -> PaymentApp.PHONE_PE
			R.id.app_paytm -> PaymentApp.PAYTM
			else -> throw IllegalStateException("Unexpected value: " + paymentAppChoice.id)
		}

		try {
			// START PAYMENT INITIALIZATION
			easyUpiPayment = EasyUpiPayment(this) {
				this.paymentApp = paymentApp
				this.payeeVpa = payeeVpa
				this.payeeName = payeeName
				this.transactionId = transactionId
				this.transactionRefId = transactionRefId
				this.payeeMerchantCode = payeeMerchantCode
				this.description = description
				this.amount = amount
			}
			// END INITIALIZATION

			// Register Listener for Events
			easyUpiPayment.setPaymentStatusListener(this)

			// Start payment / transaction
			easyUpiPayment.startPayment()
		} catch (e: Exception) {
			e.printStackTrace()
			toast("Error: ${e.message}")
		}
	}

	override fun onTransactionCompleted(transactionDetails: TransactionDetails) {
		// Transaction Completed
		Log.d("TransactionDetails", transactionDetails.toString())
		textView_status.text = transactionDetails.toString()

		when (transactionDetails.transactionStatus) {
			TransactionStatus.SUCCESS -> onTransactionSuccess()
			TransactionStatus.FAILURE -> onTransactionFailed()
			TransactionStatus.SUBMITTED -> onTransactionSubmitted()
		}
	}

	override fun onTransactionCancelled() {
		// Payment Cancelled by User
		toast("Cancelled by user")
		imageView.setImageResource(R.drawable.ic_failed)
	}

	private fun onTransactionSuccess() {
		// Payment Success
		toast("Success")
		imageView.setImageResource(R.drawable.ic_success)
	}

	private fun onTransactionSubmitted() {
		// Payment Pending
		toast("Pending | Submitted")
		imageView.setImageResource(R.drawable.ic_success)
	}

	private fun onTransactionFailed() {
		// Payment Failed
		toast("Failed")
		imageView.setImageResource(R.drawable.ic_failed)
	}

	private fun toast(message: String) {
		Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
	}

//    Uncomment this if you have inherited [android.app.Activity] and not [androidx.appcompat.app.AppCompatActivity]
//
//	override fun onDestroy() {
//		super.onDestroy()
//		easyUpiPayment.removePaymentStatusListener()
//	}
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/PatilShreyas/EasyUpiPayment-Android/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/PatilShreyas/EasyUpiPayment-Android).|
|3.|Follow code author [here](https://github.com/PatilShreyas).|
