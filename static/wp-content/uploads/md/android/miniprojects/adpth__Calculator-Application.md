# Dynamic Calculator

>  This is a basic calculator app whose orientation is Portrait only. I will add more features(scientific calculator) to it by adding orientation to landscape.

![Dynamic Calculator Tutorial](https://user-images.githubusercontent.com/61702243/89101690-e0464e00-d41f-11ea-884e-cc5b5ad8df97.png)


### Tablet demo

![Dynamic Calculator Tutorial](https://user-images.githubusercontent.com/54389203/94729430-8c8dad80-0359-11eb-8473-c39726a3004d.jpeg)


Let us look at the full Dynamic Calculator code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 4 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-kapt` plugin.
4. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'
apply plugin: 'kotlin-kapt'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.1"
    defaultConfig {
        applicationId "com.adpth.calculator"
        minSdkVersion 21
        targetSdkVersion 30
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

    buildFeatures {
        dataBinding = true
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.13'
    kapt 'com.android.databinding:compiler:3.1.4'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    implementation 'androidx.cardview:cardview:1.0.0'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`layout`](https://android.examples.directory/layout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`CardView`](https://android.examples.directory/cardview)
4. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/background_color"
        tools:context=".MainActivity">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginEnd="8dp"
            android:layout_marginRight="8dp"
            android:layout_marginBottom="16dp"
            app:layout_constraintBottom_toTopOf="@+id/cardView_input"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent">

            <TextView
                android:id="@+id/Output"
                android:layout_width="0dp"
                android:layout_height="70dp"
                android:background="@color/background_color"
                android:ems="10"
                android:gravity="end"
                android:singleLine="true"
                android:textAlignment="textEnd"
                android:textColor="@color/white"
                android:textIsSelectable="true"
                android:textSize="55sp"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent" />

        </androidx.constraintlayout.widget.ConstraintLayout>

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView_input"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardBackgroundColor="@color/card_background"
            app:cardPreventCornerOverlap="true"
            app:cardUseCompatPadding="true"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            tools:ignore="NotSibling">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <Button
                    android:id="@+id/btn_clear"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:background="@color/button_text"
                    android:text="@string/clear_entire"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_del"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />

                <Button
                    android:id="@+id/btn_div"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:drawableStart="@drawable/div"
                    android:drawableLeft="@drawable/div"
                    android:paddingStart="35dp"
                    android:paddingLeft="35dp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_percentage"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_del"
                    app:layout_constraintTop_toTopOf="parent"
                    tools:ignore="RtlSymmetry" />

                <Button
                    android:id="@+id/btn_del"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:background="@color/button_text"
                    android:text="@string/delete"
                    android:textSize="25sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_div"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_clear"
                    app:layout_constraintTop_toTopOf="parent" />

                <Button
                    android:id="@+id/btn_7"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginTop="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_7"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_8"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/btn_clear" />

                <Button
                    android:id="@+id/btn_8"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_8"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_9"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_7"
                    app:layout_constraintTop_toTopOf="@+id/btn_7" />

                <Button
                    android:id="@+id/btn_9"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_9"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_mul"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_8"
                    app:layout_constraintTop_toTopOf="@+id/btn_8" />

                <Button
                    android:id="@+id/btn_mul"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:background="@color/button_color"
                    android:drawableStart="@drawable/multiply"
                    android:drawableLeft="@drawable/multiply"
                    android:paddingStart="33sp"
                    android:paddingLeft="33sp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_9"
                    app:layout_constraintTop_toTopOf="@+id/btn_9"
                    tools:ignore="RtlSymmetry" />

                <Button
                    android:id="@+id/btn_4"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginTop="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_4"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_5"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/btn_7" />

                <Button
                    android:id="@+id/btn_5"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_5"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_6"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_4"
                    app:layout_constraintTop_toTopOf="@+id/btn_4" />

                <Button
                    android:id="@+id/btn_6"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_6"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_minus"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_5"
                    app:layout_constraintTop_toTopOf="@+id/btn_5" />

                <Button
                    android:id="@+id/btn_minus"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:background="@color/button_color"
                    android:drawableStart="@drawable/subtract"
                    android:drawableLeft="@drawable/subtract"
                    android:paddingStart="31sp"
                    android:paddingLeft="31sp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_6"
                    app:layout_constraintTop_toTopOf="@+id/btn_6"
                    tools:ignore="RtlSymmetry" />

                <Button
                    android:id="@+id/btn_1"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginTop="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_1"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_2"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/btn_4" />

                <Button
                    android:id="@+id/btn_2"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginStart="3dp"
                    android:layout_marginLeft="3dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_2"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_3"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_1"
                    app:layout_constraintTop_toTopOf="@+id/btn_1" />

                <Button
                    android:id="@+id/btn_3"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_3"
                    android:textSize="30sp"
                    app:layout_constraintEnd_toStartOf="@+id/btn_add"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_2"
                    app:layout_constraintTop_toTopOf="@+id/btn_2" />

                <Button
                    android:id="@+id/btn_add"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:background="@color/button_color"
                    android:drawableStart="@drawable/ic_add"
                    android:drawableLeft="@drawable/ic_add"
                    android:paddingStart="31dp"
                    android:paddingLeft="31dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintHorizontal_bias="0.5"
                    app:layout_constraintStart_toEndOf="@+id/btn_3"
                    app:layout_constraintTop_toTopOf="@+id/btn_3"
                    tools:ignore="RtlSymmetry" />

                <Button
                    android:id="@+id/btn_0"
                    android:layout_width="0dp"
                    android:layout_height="95dp"
                    android:layout_marginTop="3dp"
                    android:layout_marginEnd="3dp"
                    android:layout_marginRight="3dp"
                    android:background="@color/button_text"
                    android:text="@string/_0"
                    android:textSize="30sp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toStartOf="@+id/btn_decimal"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/btn_1" />

                <Button
                    android:id="@+id/btn_decimal"
                    android:layout_width="0dp"
                    android:layout_height="95dp"
                    android:background="@color/button_text"
                    android:text="@string/_dot"
                    android:textSize="30sp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="@+id/btn_3"
                    app:layout_constraintHorizontal_bias="1.0"
                    app:layout_constraintStart_toStartOf="@+id/btn_3"
                    app:layout_constraintTop_toTopOf="@+id/btn_0"
                    app:layout_constraintVertical_bias="0.0" />

                <Button
                    android:id="@+id/btn_result"
                    android:layout_width="0dp"
                    android:layout_height="95dp"
                    android:background="@color/button_color"
                    android:drawableStart="@drawable/equal_sign"
                    android:drawableLeft="@drawable/equal_sign"
                    android:paddingStart="32dp"
                    android:paddingLeft="32dp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="@+id/btn_add"
                    app:layout_constraintTop_toTopOf="@+id/btn_decimal"
                    tools:ignore="RtlSymmetry" />

                <Button
                    android:id="@+id/btn_percentage"
                    android:layout_width="0dp"
                    android:layout_height="100dp"
                    android:background="@color/button_color"
                    android:drawableStart="@drawable/percentage"
                    android:drawableLeft="@drawable/percentage"
                    android:paddingStart="33dp"
                    android:paddingLeft="33dp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toEndOf="@+id/btn_div"
                    app:layout_constraintTop_toTopOf="parent"
                    tools:ignore="RtlSymmetry" />

            </androidx.constraintlayout.widget.ConstraintLayout>

        </androidx.cardview.widget.CardView>

    </androidx.constraintlayout.widget.ConstraintLayout>

</layout>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `View` from the `android.view` package.
4. `DataBindingUtil` from the `androidx.databinding` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `btn_click(parameter)` - Our function will take a `View` object as a parameter.
2. `btn_operation(parameter)` - Our function will take a `View` object as a parameter.
3. `btn_result() `.

**(a). Our `btn_result()` function.**

Write this function as follows:

```kotlin
    fun btn_result() {

        val value = binding.Output.text.toString()
        value2 = value.toDouble()

        when (operator) {

            "+" -> {
                result = value1 + value2
            }
            "-" -> {
                result = value1 - value2
            }
            "/" -> {
                result = value1 / value2
            }
            "%" -> {
                result = value1 % value2
            }
            "*" -> {
                result = value1 * value2
            }
        }
        binding.Output.setText(result.toString())
    }
```

**(b). Our `btn_operation()` function.**

Write this function as follows:

```kotlin
    fun btn_operation(visible: View) {

        when (visible.id) {
            binding.btnAdd.id -> {
                operator = "+"
            }
            binding.btnMinus.id -> {
                operator = "-"
            }
            binding.btnDiv.id -> {
                operator = "/"
            }
            binding.btnPercentage.id -> {
                operator = "%"
            }
            binding.btnMul.id -> {
                operator = "*"
            }
        }

        val value = binding.Output.text.toString()
        if (numberclk) {
            value1 = value.toDouble()
        }
        numberclk = false
        binding.Output.setText("")

    }
```

**(c). Our `btn_click()` function.**

Write this function as follows:

```kotlin
    fun btn_click(visible: View) {

        numberclk = true
        var value = binding.Output.text.toString()

        when (visible.id) {

            binding.btn0.id -> {
                value += "0"
            }
            binding.btn1.id -> {
                value += "1"
            }
            binding.btn2.id -> {
                value += "2"
            }
            binding.btn3.id -> {
                value += "3"
            }
            binding.btn4.id -> {
                value += "4"
            }
            binding.btn5.id -> {
                value += "5"
            }
            binding.btn6.id -> {
                value += "6"
            }
            binding.btn7.id -> {
                value += "7"
            }
            binding.btn8.id -> {
                value += "8"
            }
            binding.btn9.id -> {
                value += "9"
            }
            binding.btnDecimal.id -> {
                value += "."
            }
            binding.btnClear.id -> {
                value = ""
            }
            binding.btnDel.id -> {
                value = binding.Output.text.toString()
                if (value.length > 0) {
                    value = value.substring(0, value.length - 1)
                }
            }

        }
        binding.Output.setText(value)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.databinding.DataBindingUtil
import com.adpth.calculator.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var operator: String = ""
    private var value1: Double = 0.0
    private var value2: Double = 0.0
    private var result: Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        binding.btn0.setOnClickListener { btn_click(binding.btn0) }
        binding.btn1.setOnClickListener { btn_click(binding.btn1) }
        binding.btn2.setOnClickListener { btn_click(binding.btn2) }
        binding.btn3.setOnClickListener { btn_click(binding.btn3) }
        binding.btn4.setOnClickListener { btn_click(binding.btn4) }
        binding.btn5.setOnClickListener { btn_click(binding.btn5) }
        binding.btn6.setOnClickListener { btn_click(binding.btn6) }
        binding.btn7.setOnClickListener { btn_click(binding.btn7) }
        binding.btn8.setOnClickListener { btn_click(binding.btn8) }
        binding.btn9.setOnClickListener { btn_click(binding.btn9) }
        binding.btnDecimal.setOnClickListener { btn_click(binding.btnDecimal) }

        binding.btnClear.setOnClickListener { btn_click(binding.btnClear) }
        binding.btnDel.setOnClickListener { btn_click(binding.btnDel) }

        binding.btnAdd.setOnClickListener { btn_operation(binding.btnAdd) }
        binding.btnMinus.setOnClickListener { btn_operation(binding.btnMinus) }
        binding.btnPercentage.setOnClickListener { btn_operation(binding.btnPercentage) }
        binding.btnMul.setOnClickListener { btn_operation(binding.btnMul) }
        binding.btnDiv.setOnClickListener { btn_operation(binding.btnDiv) }

        binding.btnResult.setOnClickListener { btn_result() }

    }

    var numberclk = false
    fun btn_click(visible: View) {

        numberclk = true
        var value = binding.Output.text.toString()

        when (visible.id) {

            binding.btn0.id -> {
                value += "0"
            }
            binding.btn1.id -> {
                value += "1"
            }
            binding.btn2.id -> {
                value += "2"
            }
            binding.btn3.id -> {
                value += "3"
            }
            binding.btn4.id -> {
                value += "4"
            }
            binding.btn5.id -> {
                value += "5"
            }
            binding.btn6.id -> {
                value += "6"
            }
            binding.btn7.id -> {
                value += "7"
            }
            binding.btn8.id -> {
                value += "8"
            }
            binding.btn9.id -> {
                value += "9"
            }
            binding.btnDecimal.id -> {
                value += "."
            }
            binding.btnClear.id -> {
                value = ""
            }
            binding.btnDel.id -> {
                value = binding.Output.text.toString()
                if (value.length > 0) {
                    value = value.substring(0, value.length - 1)
                }
            }

        }
        binding.Output.setText(value)
    }

    fun btn_operation(visible: View) {

        when (visible.id) {
            binding.btnAdd.id -> {
                operator = "+"
            }
            binding.btnMinus.id -> {
                operator = "-"
            }
            binding.btnDiv.id -> {
                operator = "/"
            }
            binding.btnPercentage.id -> {
                operator = "%"
            }
            binding.btnMul.id -> {
                operator = "*"
            }
        }

        val value = binding.Output.text.toString()
        if (numberclk) {
            value1 = value.toDouble()
        }
        numberclk = false
        binding.Output.setText("")

    }

    fun btn_result() {

        val value = binding.Output.text.toString()
        value2 = value.toDouble()

        when (operator) {

            "+" -> {
                result = value1 + value2
            }
            "-" -> {
                result = value1 - value2
            }
            "/" -> {
                result = value1 / value2
            }
            "%" -> {
                result = value1 % value2
            }
            "*" -> {
                result = value1 * value2
            }
        }
        binding.Output.setText(result.toString())
    }
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/adpth/Calculator-Application/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/adpth/Calculator-Application).|
|3.|Follow code author [here](https://github.com/adpth).|
