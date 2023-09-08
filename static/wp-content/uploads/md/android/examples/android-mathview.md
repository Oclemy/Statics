# Kotlin Android - Render Math Equations

This is a simple tutorial on solutions involving rendering math equations via custom views in android.

## (a). Use Math View

> Math View is a Library for displaying math equation in Android.

![](https://user-images.githubusercontent.com/32610660/137457393-2516e36b-6fc7-4a0d-9a88-e3e0b50af8f7.jpg)

Here is how you use it:

### Step 1: Install it

It is hosted in Jitpack so start by declaring Jitpack as a maven repository in your root-level `build.gradle` under the `allProjects{}`

```groovy
allprojects {
  repositories {
      ...
      maven { url 'https://jitpack.io' }
    }
}
```

Then in app-level `build.gradle` declare the implementation statement:

```groovy
dependencies {
  implementation 'com.github.derysudrajat:math-view:1.0.1'
}
```

### Step 2: Add to Layout

Now you need to add it to your xml layout:

```xml
<io.github.derysudrajat.mathview.MathView
  android:id="@+id/mathView"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"/>
```

### Step 3: Render

You can now render your equations:

```kotlin
val formula = "2a+4b\\sqrt{\\frac{4x-2^{6}}{ax^2+57}}+\\frac{3}{2}"
mathView.formula = formula
```

### Full Example

Let us now look at a full example:

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Design Layout

Replace your `activity_main.xml` with the following;

**activity_main.xml**

Add TextInputEditText, a Button and the MathView as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="io.github.derysudrajat.mathsample.MainActivity">

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/tilInputMath"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <com.google.android.material.textfield.TextInputEditText
            android:id="@+id/edtInputMath"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="@string/formula" />
    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/btnRender"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:text="@string/render"
        android:textAllCaps="false"
        android:textColor="@color/white"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tilInputMath" />

    <io.github.derysudrajat.mathview.MathView
        android:id="@+id/mathView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnRender" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Step 4: Write Code

Below is our MainActivity:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.github.derysudrajat.mathsample.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        with(binding) {
            val baseText = "2a+4b\\sqrt{\\frac{4x-2^{6}}{ax^2+57}}+\\frac{3}{2}"
            mathView.formula = baseText

            edtInputMath.setText(baseText)
            btnRender.setOnClickListener {
                val text = edtInputMath.text.toString()
                if (text.isNotBlank()) mathView.formula = text
            }
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/derysudrajat/math-view/tree/master/app) Example |
| 2. | [Follow](https://github.com/derysudrajat/) code author |
