# StepProgressBar Examples


Let us look at a Android StepProgressBar example.

### What is StepProgressBar?

*   `StepProgressBar` is progressBar for easy display steps
*   You can display your step progressbar
*   For example, You can show customer's current trade step.

![](https://github.com/PRNDcompany/StepProgressBar/raw/master/arts/heydealer_example.png)

Here is a demo screenshot:
  
![](https://github.com/PRNDcompany/StepProgressBar/raw/master/arts/screenshot_1.png)

### Step 1: Install it

Install via Gradle from Maven Central:

[![Maven Central](https://camo.githubusercontent.com/ade3da0b0aa215523448d82117aa2658ee5d4fd9a3dc32d7b6e5ae05b6e04fe9/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6b722e636f2e70726e642f7374657070726f67726573736261722e7376673f6c6162656c3d4d6176656e25323043656e7472616c)](https://search.maven.org/search?q=g:%22kr.co.prnd%22%20AND%20a:%stepprogressbar%22)

```groovy
dependencies {
    implementation 'kr.co.prnd:stepprogressbar:x.x.x'
    //implementation 'kr.co.prnd:stepprogressbar:1.0.0-alpha1'    
}

```

### Step 2: Add to Layout

Next add it to your xml layout:

```xml
 <kr.co.prnd.StepProgressBar
        android:layout_width="match_parent"
        android:layout_height="8dp"
        android:layout_marginTop="24dp"
        app:max="10"
        app:step="6"
        app:stepDoneColor="#ff0000"
        app:stepMargin="8dp"
        app:stepUndoneColor="#dedede" />
```

  

### Customize

You can change your `StepProgressBar` attribute programmatically

*   `setMax()`
*   `setStep()`
*   `setStepDoneColor()`
*   `setStepUndoneColor()`
*   `setStepMargin()`


## Full Example

This example will comprise the following files:

- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

Install it as has been described above.

### Step 3: Design Layouts

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">


    <kr.co.prnd.StepProgressBar
        android:id="@+id/stepProgressBar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp" />


    <kr.co.prnd.StepProgressBar
        android:layout_width="300dp"
        android:layout_height="8dp"
        android:layout_marginTop="24dp"
        app:max="10"
        app:step="5" />

    <kr.co.prnd.StepProgressBar
        android:layout_width="match_parent"
        android:layout_height="8dp"
        android:layout_marginTop="24dp"
        app:max="10"
        app:step="6"
        app:stepDoneColor="#ff0000"
        app:stepMargin="8dp"
        app:stepUndoneColor="#dedede" />


</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`

Here is the full code

```kotlin
package com.example.stepprogressbardemo

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kr.co.prnd.StepProgressBar

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<StepProgressBar>(R.id.stepProgressBar).apply {
            max = 5
            step = 1
            stepDoneColor = Color.GREEN
            stepUndoneColor = Color.GRAY
        }

    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/PRNDcompany/StepProgressBar/archive/refs/heads/master.zip) code or Browse [here](https://github.com/PRNDcompany/StepProgressBar).
2. [Follow](https://github.com/PRNDcompany/) code author.


