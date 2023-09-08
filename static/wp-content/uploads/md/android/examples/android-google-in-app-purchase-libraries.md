# Best Android In-App Billing Libraries and Examples

There are various ways to monetize an android mobile app. One is by display advertisements. One is by making the app a premium app so that users pay some money before installing the app. Another way is by making parts of your free app only accessible after a user makes a payment. The last option is the most robust way but also does require some work.

In this article we want to look at several easy to use libraries to easen the integration of Google In App Purchase.


## (a). Google IAP

> Android Library for easing Google Play Billing to your apps with support for Subscriptions, In App Purchases and Consumables.

Here are it's features:

- Written in Kotlin
- No boilerplate code
- Easy initialization
- Supports InApp & Subscription products
- Simple configuration for consumable products

Here's a demo:

![Google In App Purchase demo](https://camo.githubusercontent.com/d579fe48e21db538da0a4078659a1c52443cb7e44593c539cdf7a89a2bcd75db/68747470733a2f2f692e706f7374696d672e63632f63483878794c48472f657a6769662d636f6d2d6769662d6d616b65722d332e676966)

### Step 1: Install Google IAP

The library is hosted in jitpack so start by adding jitpack in your root level build.gradle:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then in your app level build.gradle under the dependencies closure, add the following implementation statement:

```groovy
implementation 'com.github.akshaaatt:Google-IAP:1.1.7'
```

### Step 2: Write Code

You start by establishing connection to Google Pay:

```kotlin
 val iapConnector = IapConnector(
            context = this, // activity / context
            nonConsumableKeys = nonConsumablesList, // pass the list of non-consumables
            consumableKeys = consumablesList, // pass the list of consumables
            subscriptionKeys = subsList, // pass the list of subscriptions
            key = "LICENSE KEY" // pass your app's license key
            enableLogging = true // to enable / disable logging
        )
```

Here's how you make a purchase:

```kotlin
iapConnector.purchase(this, "<sku>")
```

And here's how you make a subscription:

```kotlin
iapConnector.susbcribe(this, "<sku>")
```

You can remove the subscription using the following method:

```kotlin
iapConnector.unsubscribe(this, "<sku>")
```

In all these cases the SKU is the product id. You will typically get it after creating a product in your google play store account:

Then you handle the events, whether you are making a purchase or a subscription:

```kotlin
 iapConnector.addPurchaseListener(object : PurchaseServiceListener {
            override fun onPricesUpdated(iapKeyPrices: Map<String, String>) {
                // list of available products will be received here, so you can update UI with prices if needed
            }

            override fun onProductPurchased(purchaseInfo: DataWrappers.PurchaseInfo) {
               // will be triggered whenever purchase succeeded
            }

            override fun onProductRestored(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered fetching owned products using IapConnector
            }
        })

 iapConnector.addSubscriptionListener(object : SubscriptionServiceListener {
            override fun onSubscriptionRestored(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered upon fetching owned subscription upon initialization
            }

            override fun onSubscriptionPurchased(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered whenever subscription succeeded
            }

            override fun onPricesUpdated(iapKeyPrices: Map<String, String>) {
                // list of available products will be received here, so you can update UI with prices if needed
            }
        })
```

### Examples

Let's look at two examples one written in kotlin and the other in java:

```kotlin
package com.limerse.iapsample

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.limerse.iap.DataWrappers
import com.limerse.iap.IapConnector
import com.limerse.iap.PurchaseServiceListener
import com.limerse.iap.SubscriptionServiceListener
import com.limerse.iapsample.databinding.ActivityMainBinding

class KotlinSampleActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.bottomnavview.itemIconTintList = null

        val nonConsumablesList = listOf("lifetime")
        val consumablesList = listOf("base", "moderate", "quite", "plenty", "yearly")
        val subsList = listOf("subscription")

        val iapConnector = IapConnector(
            context = this,
            nonConsumableKeys = nonConsumablesList,
            consumableKeys = consumablesList,
            subscriptionKeys = subsList,
            key = "LICENSE KEY",
            enableLogging = true
        )

        iapConnector.addPurchaseListener(object : PurchaseServiceListener {
            override fun onPricesUpdated(iapKeyPrices: Map<String, String>) {
                // list of available products will be received here, so you can update UI with prices if needed
            }

            override fun onProductPurchased(purchaseInfo: DataWrappers.PurchaseInfo) {
                when (purchaseInfo.sku) {
                    "base" -> {

                    }
                    "moderate" -> {

                    }
                    "quite" -> {

                    }
                    "plenty" -> {

                    }
                    "yearly" -> {

                    }
                }
            }

            override fun onProductRestored(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered fetching owned products using IapConnector;
            }
        })

        iapConnector.addSubscriptionListener(object : SubscriptionServiceListener {
            override fun onSubscriptionRestored(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered upon fetching owned subscription upon initialization
            }

            override fun onSubscriptionPurchased(purchaseInfo: DataWrappers.PurchaseInfo) {
                // will be triggered whenever subscription succeeded
                when(purchaseInfo.sku){
                    "subscription"->{

                    }
                }
            }

            override fun onPricesUpdated(iapKeyPrices: Map<String, String>) {
                // list of available products will be received here, so you can update UI with prices if needed
            }
        })

        binding.btPurchaseCons.setOnClickListener {
            iapConnector.purchase(this, "base")
        }
        binding.btnMonthly.setOnClickListener {
            iapConnector.subscribe(this, "subscription")
        }

        binding.btnYearly.setOnClickListener {
            iapConnector.purchase(this, "yearly")
        }
        binding.btnQuite.setOnClickListener {
            iapConnector.purchase(this, "quite")

        }
        binding.btnModerate.setOnClickListener {
            iapConnector.purchase(this, "moderate")
        }

        binding.btnUltimate.setOnClickListener {
            iapConnector.purchase(this, "plenty")

        }
    }
}
```

As for the Java example:

```java
package com.limerse.iapsample;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.limerse.iap.DataWrappers;
import com.limerse.iap.IapConnector;
import com.limerse.iap.PurchaseServiceListener;
import com.limerse.iap.SubscriptionServiceListener;
import com.limerse.iapsample.databinding.ActivityMainBinding;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

class JavaSampleActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        List<String> nonConsumablesList = Collections.singletonList("lifetime");
        List<String> consumablesList = Arrays.asList("base", "moderate", "quite", "plenty", "yearly");
        List<String> subsList = Collections.singletonList("subscription");

        IapConnector iapConnector = new IapConnector(
                this,
                nonConsumablesList,
                consumablesList,
                subsList,
                "LICENSE KEY",
                true
        );

        iapConnector.addPurchaseListener(new PurchaseServiceListener() {
            public void onPricesUpdated(@NotNull Map iapKeyPrices) {

            }

            public void onProductPurchased(DataWrappers.PurchaseInfo purchaseInfo) {
                if (purchaseInfo.getSku().equals("plenty")) {

                }
                else if (purchaseInfo.getSku().equals("yearly")) {

                }
                else if (purchaseInfo.getSku().equals("moderate")) {

                }
                else if (purchaseInfo.getSku().equals("base")) {

                }
                else if (purchaseInfo.getSku().equals("quite")) {

                }
            }

            public void onProductRestored(DataWrappers.PurchaseInfo purchaseInfo) {

            }
        });
        iapConnector.addSubscriptionListener(new SubscriptionServiceListener() {
            public void onSubscriptionRestored(DataWrappers.PurchaseInfo purchaseInfo) {
            }

            public void onSubscriptionPurchased(DataWrappers.PurchaseInfo purchaseInfo) {
                if (purchaseInfo.getSku().equals("subscription")) {

                }
            }

            public void onPricesUpdated(@NotNull Map iapKeyPrices) {

            }
        });

        binding.btPurchaseCons.setOnClickListener(it ->
                iapConnector.purchase(this, "base")
        );

        binding.btnMonthly.setOnClickListener(it ->
                iapConnector.subscribe(this, "subscription")
        );

        binding.btnYearly.setOnClickListener(it ->
                iapConnector.purchase(this, "yearly")
        );

        binding.btnQuite.setOnClickListener(it ->
                iapConnector.purchase(this, "quite")
        );

        binding.btnModerate.setOnClickListener(it ->
                iapConnector.purchase(this, "moderate")
        );

        binding.btnUltimate.setOnClickListener(it ->
                iapConnector.purchase(this, "plenty")
        );
    }
}
```

Then here's the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorPrimary">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="0dp"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/light_black"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:menu="@menu/top"
        app:navigationIcon="@drawable/ic_wealth"
        app:title="@string/app_name"
        app:titleTextColor="@color/white" />

    <androidx.gridlayout.widget.GridLayout
        android:id="@+id/gridView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:padding="10dp"
        android:paddingLeft="8dp"
        android:paddingTop="8dp"
        android:paddingRight="8dp"
        app:alignmentMode="alignMargins"
        app:columnCount="3"
        app:layout_constraintBottom_toTopOf="@id/bottomnavview"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@id/toolbar"
        app:rowCount="3">

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginEnd="8dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="0"
            app:layout_columnWeight="1"
            app:layout_row="0"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/basic"
                    android:textColor="@color/yellow"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btPurchaseCons"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_money" />

            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="1"
            app:layout_columnWeight="1"
            app:layout_row="0"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/moderate"
                    android:textColor="@color/yellow"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btnModerate"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_earn" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="0"
            app:layout_columnWeight="1"
            app:layout_row="1"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/quite"
                    android:textColor="@color/yellow"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btnQuite"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_rich_man" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="8dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="1"
            app:layout_columnWeight="1"
            app:layout_row="1"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/ultimate"
                    android:textColor="@color/yellow"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btnUltimate"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_money_bag" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="0"
            app:layout_columnWeight="1"
            app:layout_row="2"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/monthly"
                    android:textColor="@color/light_blue"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btnMonthly"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_bonus" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="8dp"
            app:cardBackgroundColor="@color/cardBackground"
            app:cardCornerRadius="8dp"
            app:layout_column="1"
            app:layout_columnWeight="1"
            app:layout_row="2"
            app:layout_rowWeight="1">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:padding="5dp"
                    android:text="@string/yearly"
                    android:textColor="@color/light_blue"
                    android:textSize="@dimen/_16sdp" />

                <ImageView
                    android:id="@+id/btnYearly"
                    android:layout_width="100dp"
                    android:layout_height="100dp"
                    android:src="@drawable/ic_gift_box" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>
    </androidx.gridlayout.widget.GridLayout>

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomnavview"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:background="@color/light_black"
        app:itemTextColor="@color/white"
        app:labelVisibilityMode="labeled"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:menu="@menu/bottom" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

You will need to get do the following first:

- Add your products to the developer console
- Replace the key with your App's License Key

Then Run it and you will get the following:

![](https://camo.githubusercontent.com/16c86fa03b28b81b28530d90696b3746471470a9eddfb7ef144711f61112de2f/68747470733a2f2f692e706f7374696d672e63632f32796a5a683336732f31363131333235313530383630312e6a7067)

### Reference

Find complete reference [here](https://github.com/akshaaatt/Google-IAP).

## (b). Android Checkout

> Library for Android In-App Billing (Version 3+).

Checkout is an implementation of Android In-App Billing API (v3+). Its main goal is to make integration of in-app products as simple and straightforward as possible: developers should not spend much time on implementing boring In-App Billing API but should focus on more important things - their apps. With this in mind, the library was designed to be fast, flexible and secure.

**Checkout** solves common problems that developers face while working with billing on Android, such as:

- How to cancel all billing requests when Activity is destroyed?
- How to query purchase information in the background? See also [Querying for Items Available for Purchase](http://developer.android.com/google/play/billing/billing_integrate.html#QueryDetails)
- How to verify a purchase? See also [Security And Design](http://developer.android.com/google/play/billing/billing_best_practices.html)
- How to load all the purchases using `continuationToken` or SKU details (one request is limited by 20 items)?
- How to add billing with a minimum amount of boilerplate code?

### Step 1: Install Android Checkout

The libraru is hosted in jcenter so start by adding the following implementation statement in your app level build.gardle file:

```groovy
implementation 'org.solovyev.android:checkout:1.2.3'
```

### Step 2: Write Code

Say there is an app that contains one in-app product with "sku_01" id.

**Create Application class**

Then Application class might look like this:

```java
public class MyApplication extends Application {

    private static MyApplication sInstance;

    private final Billing mBilling = new Billing(this, new Billing.DefaultConfiguration() {
        @Override
        public String getPublicKey() {
            return "Your public key, don't forget about encryption";
        }
    });

    public MyApplication() {
        sInstance = this;
    }

    public static MyApplication get() {
        return sInstance;
    }

    public Billing getBilling() {
        return mBilling;
    }
}
```

**Create Activity**

```java
public class MyActivity extends Activity implements View.OnClickListener {

    private class PurchaseListener extends EmptyRequestListener<Purchase> {
        @Override
        public void onSuccess(Purchase purchase) {
           // here you can process the loaded purchase
        }

        @Override
        public void onError(int response, Exception e) {
            // handle errors here
        }
    }

    private class InventoryCallback implements Inventory.Callback {
        @Override
        public void onLoaded(Inventory.Products products) {
            // your code here
        }
    }

    private final ActivityCheckout mCheckout = Checkout.forActivity(this, MyApplication.get().getBilling());
    private Inventory mInventory;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCheckout.start();

        mCheckout.createPurchaseFlow(new PurchaseListener());

        mInventory = mCheckout.makeInventory();
        mInventory.load(Inventory.Request.create()
                .loadAllPurchases()
                .loadSkus(ProductTypes.IN_APP, "sku_01"), new InventoryCallback());
    }

    @Override
    protected void onDestroy() {
        mCheckout.stop();
        super.onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCheckout.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onClick(View v) {
        mCheckout.whenReady(new Checkout.EmptyListener() {
            @Override
            public void onReady(BillingRequests requests) {
                requests.purchase(ProductTypes.IN_APP, "sku_01", null, mCheckout.getPurchaseFlow());
            }
        });
    }
}
```

### Examples

Find example usages of Checkout [here](https://github.com/serso/android-checkout/tree/master/app).

### More

Find complete rerefence [here](https://github.com/serso/android-checkout).

## (c). Android-InApp-Billing-v3

> This is a lightweight implementation of Android In-app Billing Version 3.

This is a simple, straight-forward implementation of the Android v3 In-app billing API. It supports: In-App Product Purchases (both non-consumable and consumable) and Subscriptions.

### Step 1: Install it

Install the library from mavenCentral:

```groovy
repositories {
  mavenCentral()
}
dependencies {
  implementation 'com.anjlab.android.iab.v3:library:1.0.44'
}
```

### Step 2: Add Permission

You need to add billing permission in your android manifest:

```xml
  <uses-permission android:name="com.android.vending.BILLING" />
```

### Step 3: Write Code

Create instance of BillingProcessor class and implement callback in your Activity source code. Constructor will take 3 parameters:

- **Context**
- **Your License Key from Google Developer console.** This will be used to verify purchase signatures. You can pass NULL if you would like to skip this check (_You can find your key in Google Play Console -> Your App Name -> Services & APIs_)
- **IBillingHandler Interface implementation to handle purchase results and errors** (see below)

```java
public class SomeActivity extends Activity implements BillingProcessor.IBillingHandler {
  BillingProcessor bp;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    bp = new BillingProcessor(this, "YOUR LICENSE KEY FROM GOOGLE PLAY CONSOLE HERE", this);
    bp.initialize();
    // or bp = BillingProcessor.newBillingProcessor(this, "YOUR LICENSE KEY FROM GOOGLE PLAY CONSOLE HERE", this);
    // See below on why this is a useful alternative
  }

  // IBillingHandler implementation

  @Override
  public void onBillingInitialized() {
    /*
    * Called when BillingProcessor was initialized and it's ready to purchase
    */
  }

  @Override
  public void onProductPurchased(String productId, TransactionDetails details) {
    /*
    * Called when requested PRODUCT ID was successfully purchased
    */
  }

  @Override
  public void onBillingError(int errorCode, Throwable error) {
    /*
    * Called when some error occurred. See Constants class for more details
    *
    * Note - this includes handling the case where the user canceled the buy dialog:
    * errorCode = Constants.BILLING_RESPONSE_RESULT_USER_CANCELED
    */
  }

  @Override
  public void onPurchaseHistoryRestored() {
    /*
    * Called when purchase history was restored and the list of all owned PRODUCT ID's
    * was loaded from Google Play
    */
  }
}
```

override Activity's `onActivityResult` method:

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (!bp.handleActivityResult(requestCode, resultCode, data)) {
    super.onActivityResult(requestCode, resultCode, data);
  }
}
```

Then Call `purchase` method for a BillingProcessor instance to initiate purchase or `subscribe` to initiate a subscription:

_Without a developer payload:_

```java
bp.purchase(YOUR_ACTIVITY, "YOUR PRODUCT ID FROM GOOGLE PLAY CONSOLE HERE");
bp.subscribe(YOUR_ACTIVITY, "YOUR SUBSCRIPTION ID FROM GOOGLE PLAY CONSOLE HERE");
```

_With a developer payload:_

```java
bp.purchase(YOUR_ACTIVITY, "YOUR PRODUCT ID FROM GOOGLE PLAY CONSOLE HERE", "DEVELOPER PAYLOAD HERE");
bp.subscribe(YOUR_ACTIVITY, "YOUR SUBSCRIPTION ID FROM GOOGLE PLAY CONSOLE HERE", "DEVELOPER PAYLOAD HERE");
```

_IMPORTANT: when you provide a payload, internally the library prepends a string to your_

Finally release you BillingProcessor:

```java
@Override
public void onDestroy() {
  if (bp != null) {
    bp.release();
  }
  super.onDestroy();
}
```

### Reference

Find more below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/anjlab/android-inapp-billing-v3/tree/master/sample) Example |
| 2. | [Read](https://github.com/anjlab/android-inapp-billing-v3/) more |

## (d). pay-me

> Android library for handling In-App-Billing V3.

An Android library for handling In-App-Billing V3 ([IABv3](http://developer.android.com/google/play/billing/api.html)), based on Google's [marketbilling](https://code.google.com/p/marketbilling/) sample code. The goal of this project is to build a reliable and tested library which can easily be included as an [apklib](https://code.google.com/p/maven-android-plugin/wiki/ApkLib) in your (Maven based) projects.

Google's sample code has been refactored and made testable - at the moment there are over 100 unit tests covering most of the code base. It is currently used in the 1.5.x version of [SMS Backup+](https://github.com/jberkel/sms-backup-plus).

### Step 1: Install

Install the apklib to your local maven repository (it has not been published yet).

```shell
$ git clone https://github.com/jberkel/pay-me.git
$ cd pay-me && mvn install
```

### Step 2: Write Code

```kotlin
@Override public void onCreate(Bundle bundle) {
    mIabHelper = new IabHelper(this, "Base64EncodedPublicKey");
    mIabHelper.startSetup(new OnIabSetupFinishedListener() {
        public void onIabSetupFinished(IabResult result) {
          if (result.isSuccess()) {
              // helper is ready to use
              mIabHelper.launchPurchaseFlow(this,
                 "android.test.purchased",
                  ItemType.IN_APP,
                  0,
                  new OnIabPurchaseFinishedListener() {
                     public void onIabPurchaseFinished(IabResult result, Purchase purchase) {
                        // handle purchase result
                     }
                  }, null
              );
          }
        }
    });
}

@Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    mIabHelper.handleActivityResult(requestCode, resultCode, data);
}
```

### Reference

Find more below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/jberkel/pay-me/tree/master/example) Example |
| 2. | [Read](https://github.com/jberkel/pay-me/) more |

## (e). google-inapp-billing

> A simple implementation of the Android In-App Billing API.

It supports: in-app purchases (both consumable and non-consumable) and subscriptions.

Here is a demo:

![](https://camo.githubusercontent.com/9a982d3cdab1f9058670445899c8c169d3553cca9ed2425cff76fba0cc4df7e3/68747470733a2f2f692e706f7374696d672e63632f6b4d5350596235482f476f6f676c652d496e2d4170702d42696c6c696e672d496d6167652e6a7067)

This library requires API 16+.

### Step 1: Install it

Add the JitPack repository to your project's build.gradle file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

### Step 2: Build Setup

#### Important Notice

- For builds that use `minSdkVersion` lower than `24` it is very important to include the following in your app's build.gradle file:

```groovy
android {
  compileOptions {
    coreLibraryDesugaringEnabled true

    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}

dependencies {
  coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

- For builds that use `minSdkVersion` lower than `21` add the above and also this:

```groovy
android {
    defaultConfig {
        multiDexEnabled true
    }
}
```

This step is required to enable support for some APIs on lower SDK versions that aren't available natively only starting from `minSdkVersion 24`.

### Step 3: Add Permission

Add Billing permission in your android manifest:

```xml
  <uses-permission android:name="com.android.vending.BILLING" />
```

Add the dependency in your app's build.gradle file:

```groovy
dependencies {
    implementation 'com.github.moisoni97:google-inapp-billing:1.0.5'
```

### Step 4: Write code

Instantiate BillingConnector class, passing in the Context as well as the License:

```kotlin
billingConnector = new BillingConnector(this, "license_key")
                .setConsumableIds(consumableIds)
                .setNonConsumableIds(nonConsumableIds)
                .setSubscriptionIds(subscriptionIds)
                .autoAcknowledge()
                .autoConsume()
                .enableLogging()
                .connect();
```

- Implement the listener to handle event results and errors:

```java
billingConnector.setBillingEventListener(new BillingEventListener() {
            @Override
            public void onProductsFetched(@NonNull List<SkuInfo> skuDetails) {
                /*Provides a list with fetched products*/
            }

            @Override
            public void onPurchasedProductsFetched(@NonNull List<PurchaseInfo> purchases) {
                /*Provides a list with fetched purchased products*/
            }

            @Override
            public void onProductsPurchased(@NonNull List<PurchaseInfo> purchases) {
                /*Callback after a product is purchased*/
            }

            @Override
            public void onPurchaseAcknowledged(@NonNull PurchaseInfo purchase) {
                /*Callback after a purchase is acknowledged*/

                /*
                 * Grant user entitlement for NON-CONSUMABLE products and SUBSCRIPTIONS here
                 *
                 * Even though onProductsPurchased is triggered when a purchase is successfully made
                 * there might be a problem along the way with the payment and the purchase won't be acknowledged
                 *
                 * Google will refund users purchases that aren't acknowledged in 3 days
                 *
                 * To ensure that all valid purchases are acknowledged the library will automatically
                 * check and acknowledge all unacknowledged products at the startup
                 * */
            }

            @Override
            public void onPurchaseConsumed(@NonNull PurchaseInfo purchase) {
                /*Callback after a purchase is consumed*/

                /*
                 * CONSUMABLE products entitlement can be granted either here or in onProductsPurchased
                 * */
            }

            @Override
            public void onBillingError(@NonNull BillingConnector billingConnector, @NonNull BillingResponse response) {
                /*Callback after an error occurs*/

                switch (response.getErrorType()) {
                    case CLIENT_NOT_READY:
                        //TODO - client is not ready yet
                        break;
                    case CLIENT_DISCONNECTED:
                        //TODO - client has disconnected
                        break;
                    case SKU_NOT_EXIST:
                        //TODO - sku does not exist
                        break;
                    case CONSUME_ERROR:
                        //TODO - error during consumption
                        break;
                    case ACKNOWLEDGE_ERROR:
                        //TODO - error during acknowledgment
                        break;
                    case ACKNOWLEDGE_WARNING:
                        /*
                         * This will be triggered when a purchase can not be acknowledged because the state is PENDING
                         * A purchase can be acknowledged only when the state is PURCHASED
                         *
                         * PENDING transactions usually occur when users choose cash as their form of payment
                         *
                         * Here users can be informed that it may take a while until the purchase complete
                         * and to come back later to receive their purchase
                         * */
                        //TODO - warning during acknowledgment
                        break;
                    case FETCH_PURCHASED_PRODUCTS_ERROR:
                        //TODO - error occurred while querying purchased products
                        break;
                    case BILLING_ERROR:
                        //TODO - error occurred during initialization / querying sku details
                        break;
                    case USER_CANCELED:
                        //TODO - user pressed back or canceled a dialog
                        break;
                    case SERVICE_UNAVAILABLE:
                        //TODO - network connection is down
                        break;
                    case BILLING_UNAVAILABLE:
                        //TODO - billing API version is not supported for the type requested
                        break;
                    case ITEM_UNAVAILABLE:
                        //TODO - requested product is not available for purchase
                        break;
                    case DEVELOPER_ERROR:
                        //TODO - invalid arguments provided to the API
                        break;
                    case ERROR:
                        //TODO - fatal error during the API action
                        break;
                    case ITEM_ALREADY_OWNED:
                        //TODO - failure to purchase since item is already owned
                        break;
                    case ITEM_NOT_OWNED:
                        //TODO - failure to consume since item is not owned
                        break;
                }
            }
        });
```

Then purchase or subscribe:

- Purchase a non-consumable/consumable product:

```java
billingConnector.purchase(this, "sku_id");
```

- Purchase a subscription:

```java
billingConnector.subscribe(this, "sku_id");
```

- Cancel a subscription:

```java
billingConnector.unsubscribe(this, "sku_id");
```

### Reference

Find more below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/moisoni97/google-inapp-billing/tree/master/app) Example |
| 2. | [Read](https://github.com/moisoni97/google-inapp-billing) more |

## (f). Billing-Suspend

> Suspendable Helper for access BillingClient.

It also includes a client-side token validation, if there is not server available.

It features:

- Suspendable Billing Access
- Client-Side Token Validation

Here is how you use it:

### Step 1: Install it

Start by installing it using the following implementation statement:

```groovy
    implementation 'de.charlex.billing:billing-suspend:4.0.2'
```

### Step 2: Handle Purchase

Here's a code sample:

```kotlin
val billingHelper: BillingHelper = BillingHelper(activity) {
    enablePendingPurchases()
}

val purchases = billingHelper.queryPurchases(BillingClient.SkuType.SUBS)

purchases?.forEach {
    if (it.isAcknowledged.not()) {
        billingHelper.acknowledgePurchase(it.purchaseToken)
    }
}

billingHelper.purchase(sku = arrayOf("productId_here"), type = BillingClient.SkuType.SUBS)
```

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Read](https://github.com/ch4rl3x/billing-suspend) more |
| 2. | [Follow](https://github.com/ch4rl3x/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
