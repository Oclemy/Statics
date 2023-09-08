# Colored BMI Calculator

>  Android App that calculates BMI ( Body Mass Index ) & then report its status to the user.


Android App that calculates BMI ( Body Mass Index ) & then report its status to the user

### Project Idea 💡 🌟

This project consist on creating an Android App that calculates BMI ( Body Mass Index ) & then report its status with some advices to the user ...

This idea exists already but as a bigginer in kotlin I thought that it might be a good idea to start with.

In this project I tried to simplify all the process using the most simple formula & deviding the BMI state into just 3 categories...

BMI Formulat : bmi= weight (kg) / ( height^2 (m))

BMI Categories:

- Normal : 18.4 < bmi < 25.1

### Screenshots 📷

here is the project preview:

|Main UI|Reporting BMI State (case Normal)|![BMI-Calculator Example Tutorial](https://github.com/NINadjem/BMI-Calculator/raw/master/Screenshots/mainPage.png)

![BMI-Calculator Example Tutorial](https://github.com/NINadjem/BMI-Calculator/raw/master/Screenshots/normalW.png)



|Reporting BMI State (case OverWeight)|Reporting BMI State (case UnderWeight)|![BMI-Calculator Example Tutorial](https://github.com/NINadjem/BMI-Calculator/raw/master/Screenshots/overW.png)

![BMI-Calculator Example Tutorial](https://github.com/NINadjem/BMI-Calculator/raw/master/Screenshots/underW.png)


### IDE & Programming language 🔧


This Application was devlopped with 💜 Kotlin 💜 using the one and the only in the world 😍 Android Studio 😍

### Running The App 🔌


No requirements you just have to set your device 📱 & click that green button ▶️ then fill your infos & check your body state 😃

Android App that calculates BMI ( Body Mass Index ) & then report its status to the user

Let us look at the full Colored BMI Calculator code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 6 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "com.nadjemni.bmicalculator"
        minSdkVersion 15
        targetSdkVersion 29
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
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.annotation:annotation:1.0.0'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_result.xml`**

> Our `activity_result` layout.

This layout will represent our Result Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/containerL"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorGreen"
    android:gravity="top|start"
    android:orientation="vertical"
    tools:context=".ResultActivity">
    <ImageView
        android:layout_width="55dp"
        android:layout_height="55dp"
        android:src="@drawable/icon"
        android:id="@+id/skipResultBTN"
        android:layout_gravity="right"
        android:paddingRight="2dp"
        android:paddingTop="2dp"
        android:paddingLeft="20dp"
        android:paddingBottom="10dp"
        android:visibility="invisible"
        />
    <LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="top|start"
        android:orientation="vertical"
        android:paddingLeft="30dp"
        android:paddingRight="30dp"
        android:paddingBottom="30dp"
        android:paddingTop="2dp"
        >
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="horizontal"
            android:paddingTop="20dp"
            android:paddingBottom="10dp"
            >

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginRight="10dp"
                android:text="Your BMI = "
                android:textColor="@color/colorBlack"
                android:textSize="30sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/bmiValueTV"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="25.5"
                android:textColor="@color/colorWhite"
                android:textSize="35sp"
                android:textStyle="bold" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:layout_marginBottom="30dp"
            android:gravity="center"
            android:orientation="vertical">

            <ImageView
                android:id="@+id/bmiFlagImgView"
                android:layout_width="80dp"
                android:layout_height="80dp"
                android:layout_marginBottom="10dp"
                android:src="@drawable/correct" />

            <TextView
                android:id="@+id/bmiLabelTV"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="You have a Normal Weight!"
                android:textColor="@color/colorWhite"
                android:textSize="22sp"
                android:textStyle="bold" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:orientation="vertical">

            <TextView
                android:id="@+id/commentTV"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginBottom="10dp"
                android:text="Here are some advices To help you keep your weight"
                android:textColor="@color/colorBlack"
                android:textSize="15sp"
                android:textStyle="italic|bold" />

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:layout_marginBottom="10dp"
                android:gravity="center|left"
                android:orientation="horizontal">

                <ImageView
                    android:layout_width="40dp"
                    android:layout_height="40dp"
                    android:layout_marginRight="15dp"
                    android:src="@drawable/active"
                    android:id="@+id/advice1IMG"
                    />

                <TextView
                    android:id="@+id/advice1TV"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="2dp"
                    android:text="Stay active."
                    android:textColor="@color/colorBlack"
                    android:textSize="13sp" />

            </LinearLayout>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:layout_marginBottom="10dp"
                android:gravity="left|center"
                android:orientation="horizontal">

                <ImageView
                    android:layout_width="40dp"
                    android:layout_height="40dp"
                    android:layout_marginRight="15dp"
                    android:src="@drawable/salad"
                    android:id="@+id/advice2IMG"/>

                <TextView
                    android:id="@+id/advice2TV"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="2dp"
                    android:text="Choose the right foods and Cook by yourself."
                    android:textColor="@color/colorBlack"
                    android:textSize="13sp" />

            </LinearLayout>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:layout_marginBottom="10dp"
                android:gravity="left|center"
                android:orientation="horizontal">

                <ImageView
                    android:layout_width="40dp"
                    android:layout_height="40dp"
                    android:layout_marginRight="15dp"
                    android:src="@drawable/sleep"
                    android:id="@+id/advice3IMG"/>

                <TextView
                    android:id="@+id/advice3TV"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="2dp"
                    android:text="Focus on relaxation and sleep."
                    android:textColor="@color/colorBlack"
                    android:textSize="13sp" />

            </LinearLayout>

        </LinearLayout>

    </LinearLayout>





</LinearLayout>

```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`GridLayout`](https://android.examples.directory/gridlayout)
4. [`EditText`](https://android.examples.directory/edittext)
5. [`Space`](https://android.examples.directory/space)
6. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="top|left"
    android:orientation="vertical"
    android:padding="30dp"
    android:id="@+id/container"
    tools:context=".MainActivity">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:gravity="center"
        android:layout_marginTop="20dp"
        >
      <ImageView
          android:layout_width="100dp"
          android:layout_height="100dp"
          android:src="@drawable/logo"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="3dp"
            android:text="@string/app_name"
            android:textSize="22sp"
            android:textStyle="bold"
            android:textColor="@color/colorGray"
            />
    </LinearLayout>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="60dp"
        android:gravity="left"
        android:text="Please fill your information below :"
        android:textSize="18sp"
        android:textStyle="italic" />

    <GridLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:layout_marginBottom="50dp"
        android:gravity="center"
        android:columnCount="3">
        <ImageView
            android:layout_width="30dp"
            android:layout_height="30dp"
            android:layout_marginRight="10dp"
            android:layout_gravity="center"
            android:src="@drawable/weight"
            />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginRight="10dp"
            android:text="Weight(kg)" />

        <EditText
            android:id="@+id/weightEDTX"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="numberDecimal"
            android:maxLength="5"
            android:paddingLeft="5dp"
            android:textColor="@color/colorBlack" />

        <Space
            android:layout_width="wrap_content"
            android:layout_height="20dp"
            android:visibility="invisible" />

        <Space
            android:layout_width="wrap_content"
            android:layout_height="20dp"
            android:visibility="invisible" />
        <Space
            android:layout_width="wrap_content"
            android:layout_height="20dp"
            android:visibility="invisible" />
        <ImageView
            android:layout_width="30dp"
            android:layout_height="30dp"
            android:src="@drawable/height"
            android:layout_marginRight="10dp"
            android:layout_gravity="center"
            />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginRight="10dp"
            android:text="Height(cm)" />

        <EditText
            android:id="@+id/heightEDTX"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="number"
            android:maxLength="3"
            android:paddingLeft="5dp"
            android:textColor="@color/colorBlack" />
    </GridLayout>

    <Button
        android:id="@+id/calculateBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="@color/colorGreen"
        android:padding="15dp"
        android:text="CALCULATE BMI"
        android:textColor="@color/colorWhite"
        android:textStyle="bold" />
</LinearLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `ResultActivity.kt`**

> Our `ResultActivity` class.

Create a Kotlin file named `ResultActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Bundle` from the `android.os` package.
4. `View` from the `android.view` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_result` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_result.*

class ResultActivity : AppCompatActivity() {
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)
        skipResultBTN.setOnClickListener {
            startActivity( Intent(this@ResultActivity,  MainActivity::class.java))
        }
        val bmi = intent.getDoubleExtra("bmi", -1.0)
        if (bmi == -1.0) {
            containerL.visibility= View.GONE
        } else {
            bmiValueTV.text=bmi.toString()
                if (bmi < 18.5) {
                    containerL.setBackgroundResource(R.color.colorYellow)
                    bmiFlagImgView.setImageResource(R.drawable.exclamationmark)
                    bmiLabelTV.text="You have an UnderWeight!"
                    commentTV.text="Here are some advices To help you increase your weight"
                    advice1IMG.setImageResource(R.drawable.nowater)
                    advice1TV.text="Don't drink water before meals"
                    advice2IMG.setImageResource(R.drawable.bigmeal)
                    advice2TV.text="Use bigger plates"
                    advice3TV.text="Get quality sleep"

                } else {
                    if (bmi > 25) {
                        containerL.setBackgroundResource(R.color.colorRed)
                        bmiFlagImgView.setImageResource(R.drawable.warning)
                        bmiLabelTV.text="You have an OverWeight!"
                        commentTV.text="Here are some advices To help you decrease your weight"
                        advice1IMG.setImageResource(R.drawable.water)
                        advice1TV.text="Drink water a half hour before meals"
                        advice2IMG.setImageResource(R.drawable.twoeggs)
                        advice2TV.text="Eeat only two meals per day and make sure that they contains a high protein"
                        advice3IMG.setImageResource(R.drawable.nosugar)
                        advice3TV.text="Drink coffee or tea and Avoid sugary food"
                    }
                }
            }
        }
}


```


**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Bundle` from the `android.os` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `showErrorSnack(parameter)` - Let's pass a `String` object as a parameter.

**(a). Our `showErrorSnack()` function.**

A function to show error snack:

```kotlin
    private fun showErrorSnack(errorMsg: String) {
        val snackbar = Snackbar.make(container, "error : $errorMsg !", Snackbar.LENGTH_LONG)
        snackbar.view.setBackgroundResource(R.color.colorRed)
        snackbar.show()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.activity_main.*
import java.math.BigDecimal
import java.math.RoundingMode

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        actionBar?.setIcon(R.drawable.logo)
        calculateBtn.setOnClickListener {
            if (heightEDTX.text.isNotEmpty() && weightEDTX.text.isNotEmpty()) {
                val weight = weightEDTX.text.toString().toDouble()
                val height = heightEDTX.text.toString().toDouble()/100
                if (weight > 0 && weight < 600 && height >= 0.50 && height < 2.50) {
                    val intent = Intent(this@MainActivity, ResultActivity::class.java)
                    intent.putExtra("bmi", calculateBMI(weight, height))
                    startActivity(intent)
                } else {
                    showErrorSnack("Incorrect Values")
                }
            } else {
                showErrorSnack("A filed is missing")
            }
        }
    }

    private fun showErrorSnack(errorMsg: String) {
        val snackbar = Snackbar.make(container, "error : $errorMsg !", Snackbar.LENGTH_LONG)
        snackbar.view.setBackgroundResource(R.color.colorRed)
        snackbar.show()
    }

    private fun calculateBMI(weight: Double, height: Double) = BigDecimal(weight / (height * height))
        .setScale(2, RoundingMode.HALF_EVEN).toDouble()

}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/NINadjem/BMI-Calculator/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/NINadjem/BMI-Calculator).|
|3.|Follow code author [here](https://github.com/NINadjem).|
