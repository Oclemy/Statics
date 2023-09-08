# PayView

>  💳 This is a Payment View library for Credit and Debit Card..

It requires a minimum SDK version 21:

![Credit CardView Tutorial](https://camo.githubusercontent.com/a05a54d005013841cf29ac57361136623697028285f4ecb2c153df14bd9fbf5d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d696e53646b56657273696f6e2d32312d79656c6c6f77677265656e)


Here is the demo GIF:

![Credit CardView Tutorial](https://github.com/fevziomurtekin/PayView/raw/master/art/newrecord.gif)

Use it as follows

### Step 1: Install it

Install it via Gradle

```groovy
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
  
  .....

dependencies {
      implementation 'com.github.fevziomurtekin:PayView:1.0.3'
  }
}
```


### Step 2: Add to Layout

Add the following to your layout:

```xml
<com.fevziomurtekin.payview.Payview
        android:id="@+id/payview"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:cardBgColor="@android:color/holo_blue_light"
        app:cardFgColor="@android:color/white"
        app:cardTextColor="@color/black"
        app:cardNameHelperText="Enter to card name. Max 25 characters."
        app:cardCvTextSize="14"
        app:cardNoTextSize="14"
        app:cardNumberHelperText="You must enter your 16-digit card number."
        app:cardYearTextSize="13"
        app:cardNameTextSize="15"
        app:cardMonthTextSize="13"
        app:cardAnimationType="vertical"
        app:cardCvErrorText="You must enter 3-digit characters"
        app:cardMonthErrorText="You must enter 2-digit characters and you'll enter to number the most digit-value is '12'"
        app:cardYearErrorText="You must enter 2-digit characters and you'll enter to number the most digit-value is '99'"
        app:cardExpiredErrorText="Your card has expired. Please enter the usage date correctly."
    />
```


### Step 3: Setup Listeners

Setup your dataChanged Listeners:

```kotlin
payview.setOnDataChangedListener(object : Payview.OnChangelistener{
            override fun onChangelistener(payModel: PayModel?, isFillAllComponent: Boolean) {
                Log.d("PayView", "data : ${payModel?.cardOwnerName} \n " +
                        "is Fill all form component : $isFillAllComponents")

            }

        })
        
    payview.setPayOnclickListener(View.OnClickListener {
        Log.d("PayView "," clicked. iss Fill all form Component : ${payview.isFillAllComponents}")

    })
```


### Attributes

Here are its attributes:

- `cardBgColor`
- `cardFgColor`
- `cardTextColor`
- `cardAnimationType`
- `cardNameTextSize`
- `cardNoTextSize`
- `cardYearTextSize`
- `cardMonthTextSize`
- `cardCvTextSize`
- `cardNumberHelperText`
- `cardNameHelperText`
- `cardCvErrorText`
- `cardMonthErrorText`
- `cardYearErrorText`
- `cardExpiredErrorText`

Let us look at a full Credit CardView Example based on this library:

> After installing the library follow these steps:

#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.camposha.info/en/relativelayout) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`Payview`](https://android.camposha.info/en/payview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:app="http://schemas.android.com/apk/res-auto"
                android:orientation="vertical"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <com.fevziomurtekin.payview.Payview
        android:id="@+id/payview"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:cardBgColor="@android:color/holo_blue_light"
        app:cardFgColor="@android:color/white"
        app:cardTextColor="@color/black"
        app:cardNameHelperText="Enter to card name. Max 25 characters."
        app:cardCvTextSize="14"
        app:cardNoTextSize="14"
        app:cardNumberHelperText="You must enter your 16-digit card number."
        app:cardYearTextSize="13"
        app:cardNameTextSize="15"
        app:cardMonthTextSize="13"
        app:cardAnimationType="vertical"
        app:cardCvErrorText="You must enter 3-digit characters"
        app:cardMonthErrorText="You must enter 2-digit characters and you'll enter to number the most digit-value is '12'"
        app:cardYearErrorText="You must enter 2-digit characters and you'll enter to number the most digit-value is '99'"
        app:cardExpiredErrorText="Your card has expired. Please enter the usage date correctly."
    />


</RelativeLayout>
```

#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `ActivityMain.kt`**

> Our `ActivityMain` class.

Create a Kotlin file named `ActivityMain.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Log` from the `android.util` package.
2. `View` from the `android.view` package.
3. `AnimationSet` from the `android.view.animation` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onChangelistener(payModel: PayModel?,isFillAllComponents:Boolean) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.animation.Animator
import android.animation.AnimatorInflater
import android.animation.AnimatorSet
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.animation.AnimationSet
import androidx.appcompat.app.AppCompatActivity
import com.fevziomurtekin.payview.Payview
import com.fevziomurtekin.payview.data.PayModel
import kotlinx.android.synthetic.main.activity_main.*

class ActivityMain : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        payview.setOnDataChangedListener(object : Payview.OnChangelistener{
            override fun onChangelistener(payModel: PayModel?,isFillAllComponents:Boolean) {
                Log.d("PayView", "data : ${payModel?.cardOwnerName} \n " +
                        "is Fill all form component : $isFillAllComponents")

            }

        })

        payview.setPayOnclickListener(View.OnClickListener {
            Log.d("PayView "," clicked. iss Fill all form Component : ${payview.isFillAllComponents}")
        })

    }


}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/fevziomurtekin/PayView/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/fevziomurtekin/PayView).|
|3.|Follow code author [here](https://github.com/fevziomurtekin).|
