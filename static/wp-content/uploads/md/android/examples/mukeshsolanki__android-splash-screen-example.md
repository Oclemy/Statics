# Splash Screen Example


>An example showcasing how to properly implement the splash screen like the youtube app - mukeshsolanki/android-splash-screen-example: 

### Step 1: Dependencies

Our dependencies will be as follows:

```groovy
dependencies {
  implementation fileTree(dir: 'libs', include: ['*.jar'])
  implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
  implementation 'androidx.appcompat:appcompat:1.0.0-beta01'
  implementation 'androidx.core:core-ktx:1.1.0-alpha05'
  implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
}

```

### Step 2: Design Layout

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@color/colorActivityBackground"
  tools:context=".MainActivity">

  <TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello World!"
    android:textColor="@android:color/white"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

### Step 3: Write Code

Below is our main activity:

**MainActivity.kt**

```kotlin
package `in`.madapps.splashscreen

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    //To mimic the black screen when data is being loaded in the activity
    Thread.sleep(2000)
    setContentView(R.layout.activity_main)
  }
}

```

### Download

Download the code  [here](https://github.com/mukeshsolanki/android-splash-screen-example/blob/master/screenshot/demo.gif?raw=true).
