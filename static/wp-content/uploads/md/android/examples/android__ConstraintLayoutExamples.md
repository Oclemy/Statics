# ConstraintLayout Demo Layouts


Here are the sample screenshots of what is created:

![ConstraintLayout Tutorial](https://github.com/android/views-widgets-samples/raw/master/ConstraintLayoutExamples/screenshots/constraint_set_example.png)

![ConstraintLayout Tutorial](https://github.com/android/views-widgets-samples/raw/master/ConstraintLayoutExamples/screenshots/advanced_chains.png)

This example requires the following:

- Android Studio 3.3+
- Constraint Layout library 2.0.0-alpha5+

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 3 dependencies:

1. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
2. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion rootProject.compileSdkVersion
    defaultConfig {
        applicationId "com.example.android.constraintlayoutexamples"
        minSdkVersion 19
        targetSdkVersion rootProject.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables.useSupportLibrary = true
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "androidx.appcompat:appcompat:$rootProject.appCompatVersion"
    implementation "androidx.constraintlayout:constraintlayout:$rootProject.constraintLayoutVersion"
    implementation "com.google.android.material:material:$rootProject.materialVersion"
    testImplementation "junit:junit:$rootProject.junitVersion"
}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:

**(a). `constraint_example_1.xml`**

> Our `constraint_example_1` layout.

This layout will represent our first `ConstraintLayout` sample layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`Button`](https://android.camposha.info/en/button)
2. [`TextView`](https://android.camposha.info/en/textview)

Take note of how the `ConstraintLayout`  `app` and `tool` tags like: ` app:layout_constraintRight_toRightOf` and `tools:layout_constraintTop_creator` are used to constraint the individual buttons. Also note that this a flat hierarchy and there is no nesting of the internal widgets:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button3"
        android:layout_width="201dp"
        android:layout_height="wrap_content"
        android:text="@string/centered_button"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        android:layout_marginTop="31dp"
        app:layout_constraintTop_toBottomOf="@+id/textView2"
        tools:layout_constraintLeft_creator="1" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/centering"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="16dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button31"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="24dp"
        app:layout_constraintLeft_toLeftOf="parent" />

    <Button
        android:id="@+id/button32"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toRightOf="@+id/button31"
        app:layout_constraintLeft_toLeftOf="@+id/button31"
        android:layout_marginBottom="224dp"
        android:layout_marginTop="225dp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="@+id/button31"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintTop_toTopOf="@+id/button3"
        app:layout_constraintHorizontal_bias="0.0" />

    <Button
        android:id="@+id/button33"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toRightOf="@+id/button3"
        app:layout_constraintLeft_toRightOf="@+id/button3"
        app:layout_constraintBottom_toTopOf="@+id/button32"
        app:layout_constraintTop_toTopOf="@+id/button32"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintHorizontal_bias="0.5" />

    <Button
        android:id="@+id/button34"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        android:layout_marginTop="112dp"
        android:layout_marginBottom="113dp"
        app:layout_constraintRight_toRightOf="@+id/button3"
        android:layout_marginStart="16dp"
        app:layout_constraintLeft_toLeftOf="parent"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="@+id/button32"
        app:layout_constraintTop_toTopOf="@+id/button3"
        app:layout_constraintHorizontal_bias="0.52" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `constraint_example_2.xml`**


> Our `constraint_example_2` layout.

This layout will represent our 2nd Example  of `ConstraintLayout` layout. Specify ConstraintLayout as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`Button`](https://android.camposha.info/en/button)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button4"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button_1"
        app:layout_constraintDimensionRatio="w,16:9"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toTopOf="@+id/button5"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="19dp"
        app:layout_constraintLeft_toLeftOf="parent" />

    <Button
        android:id="@+id/button5"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button_text"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toTopOf="@+id/button6"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="16dp"
        app:layout_constraintLeft_toLeftOf="parent" />

    <Button
        android:id="@+id/button6"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button_text_12"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toTopOf="@+id/button7"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintRight_toRightOf="parent"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="16dp"
        app:layout_constraintLeft_toLeftOf="parent" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/arrange"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="16dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button7"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button_text"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toTopOf="@+id/button8"
        app:layout_constraintRight_toRightOf="@+id/button6"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="16dp"
        app:layout_constraintLeft_toLeftOf="@+id/button6" />

    <Button
        android:id="@+id/button8"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/button_text"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="@+id/button7"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="@+id/button7"
        app:layout_constraintBottom_toTopOf="@+id/button27"
        android:layout_marginBottom="104dp"
        app:layout_constraintHorizontal_bias="1.0" />

    <Button
        android:id="@+id/button27"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toLeftOf="@+id/button29"
        app:layout_constraintLeft_toRightOf="@+id/button28"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginBottom="38dp" />

    <Button
        android:id="@+id/button28"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toLeftOf="@+id/button27"
        app:layout_constraintLeft_toLeftOf="parent"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginBottom="38dp" />

    <Button
        android:id="@+id/button29"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button27"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginBottom="38dp" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(c). `constraint_example_3.xml`**


> Our `constraint_example_3` layout.

This layout will represent our 3rd Example of `ConstraintLayout` layout. Specify [`ConstraintLayout`](https://android.camposha.info/en/ConstraintLayout/) as it's root element, then add the following [widgets](https://android.camposha.info/en/view/):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout/)
2. [`Button`](https://android.camposha.info/en/button/)
3. [`TextView`](https://android.camposha.info/en/textview/)
4. [`Guideline`](https://android.camposha.info/en/guideline/)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button4"
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:text="@string/button"
        tools:layout_constraintTop_creator="1"
        android:layout_marginStart="8dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="@+id/guideline"
        android:layout_marginLeft="8dp"
        app:layout_constraintBaseline_toBaselineOf="@+id/button5"
        app:layout_constraintRight_toLeftOf="@+id/guideline3"
        android:layout_marginRight="8dp"
        app:layout_constraintHorizontal_bias="0.9" />

    <Button
        android:id="@+id/button5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toLeftOf="@+id/guideline2"
        android:layout_marginRight="8dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintLeft_toLeftOf="@+id/guideline3"
        android:layout_marginLeft="8dp"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintTop_toTopOf="@+id/guideline4"
        android:layout_marginTop="16dp" />

    <Button
        android:id="@+id/button6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toLeftOf="@+id/guideline2"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        android:layout_marginEnd="5dp"
        android:layout_marginTop="4dp"
        app:layout_constraintTop_toTopOf="@+id/guideline5"
        android:layout_marginRight="8dp"
        android:layout_marginLeft="8dp"
        app:layout_constraintLeft_toLeftOf="@+id/guideline3"
        app:layout_constraintHorizontal_bias="0.5" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/guidelines"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="16dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginLeft="16dp"
        app:layout_constraintHorizontal_bias="0.0"
        android:layout_marginRight="16dp" />

    <Button
        android:id="@+id/button7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        tools:layout_constraintTop_creator="1"
        android:layout_marginStart="8dp"
        app:layout_constraintTop_toBottomOf="@+id/button6"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="@+id/guideline"
        android:layout_marginTop="0dp" />

    <Button
        android:id="@+id/button8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        tools:layout_constraintTop_creator="1"
        android:layout_marginStart="10dp"
        android:layout_marginTop="8dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="@+id/guideline"
        app:layout_constraintTop_toTopOf="@+id/guideline6" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.15" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline2"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.85" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline3"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.5" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline4"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.15" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline5"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.50097847" />

    <androidx.constraintlayout.widget.Guideline
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/guideline6"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.85" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(d). `constraint_example_4.xml`**


> Our `constraint_example_4` layout.

This layout will represent our 4th Example of `ConstraintLayout` layout design. Specify [`ConstraintLayout`](https://android.camposha.info/en/ConstraintLayout/) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`Button`](https://android.camposha.info/en/button)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/one"
        app:layout_constraintTop_toBottomOf="@+id/button5"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@+id/button11"
        app:layout_constraintBottom_toTopOf="@+id/button14" />

    <Button
        android:id="@+id/button5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/four"
        app:layout_constraintTop_toBottomOf="@+id/button7"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@+id/button13"
        app:layout_constraintBottom_toTopOf="@+id/button4" />

    <Button
        android:id="@+id/button6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/six"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button9"
        app:layout_constraintLeft_toRightOf="@+id/button13"
        app:layout_constraintBottom_toTopOf="@+id/button12" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/advanced_arrange"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="20dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/seven"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@+id/button8"
        app:layout_constraintBottom_toTopOf="@+id/button5"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/eight"
        app:layout_constraintLeft_toRightOf="@+id/button7"
        app:layout_constraintRight_toLeftOf="@+id/button9"
        app:layout_constraintBottom_toTopOf="@+id/button13"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/nine"
        app:layout_constraintLeft_toRightOf="@+id/button8"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/button6"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/zero"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button11"
        app:layout_constraintLeft_toRightOf="@+id/button14"
        app:layout_constraintBottom_toBottomOf="parent" />

    <Button
        android:id="@+id/button11"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/two"
        app:layout_constraintTop_toBottomOf="@+id/button13"
        app:layout_constraintRight_toLeftOf="@+id/button12"
        app:layout_constraintLeft_toRightOf="@+id/button4"
        app:layout_constraintBottom_toTopOf="@+id/button10" />

    <Button
        android:id="@+id/button12"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/three"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button6"
        app:layout_constraintLeft_toRightOf="@+id/button11"
        app:layout_constraintBottom_toTopOf="@+id/button10" />

    <Button
        android:id="@+id/button13"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/five"
        app:layout_constraintTop_toBottomOf="@+id/button8"
        app:layout_constraintRight_toLeftOf="@+id/button6"
        app:layout_constraintLeft_toRightOf="@+id/button5"
        app:layout_constraintBottom_toTopOf="@+id/button11" />

    <TextView
        android:id="@+id/textView6"
        android:layout_width="0dp"
        android:layout_height="49dp"
        android:background="#AA9"
        android:text="@string/zero_point_zero"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintBottom_creator="1"
        android:layout_marginStart="16dp"
        app:layout_constraintBottom_toBottomOf="@+id/button7"
        android:layout_marginEnd="16dp"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="69dp"
        tools:layout_constraintLeft_creator="1"
        android:layout_marginBottom="81dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button14"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/dot"
        app:layout_constraintTop_toBottomOf="@+id/button4"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@+id/button10"
        app:layout_constraintBottom_toBottomOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(e). `constraint_example_5.xml`**


> Our `constraint_example_5` layout.

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`ImageButton`](https://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/aspect_ratio"
        android:textSize="30sp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintTop_creator="1" />

    <TextView
        android:id="@+id/textView4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="24dp"
        android:text="@string/big_android_icon"
        android:textSize="24sp"
        app:layout_constraintLeft_toRightOf="@+id/imageButton"
        app:layout_constraintTop_toBottomOf="@+id/imageView"
        tools:layout_constraintTop_creator="1" />

    <TextView
        android:id="@+id/textView5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/textview"
        android:textSize="24sp"
        app:layout_constraintLeft_toLeftOf="@+id/textView4"
        app:layout_constraintTop_toBottomOf="@+id/textView4"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintTop_creator="1" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginEnd="16dp"
        android:layout_marginStart="16dp"
        android:scaleType="centerCrop"
        android:contentDescription="@string/lake_tahoe_image"
        app:layout_constraintDimensionRatio="h,16:9"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:srcCompat="@drawable/lake"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintRight_creator="1"
        android:layout_marginTop="16dp"
        app:layout_constraintTop_toBottomOf="@+id/textView3" />

    <ImageButton
        android:id="@+id/imageButton"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:srcCompat="@drawable/ic_android_black_24dp"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintBottom_toBottomOf="@+id/textView5"
        app:layout_constraintTop_toTopOf="@+id/textView4"
        android:layout_marginStart="16dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintDimensionRatio="w,1:1"
        android:contentDescription="@string/android_button" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(f). `constraint_example_6.xml`**

> Our `constraint_example_6` layout.

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`Button`](https://android.camposha.info/en/button)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toTopOf="@+id/button5"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.74"
        app:layout_constraintRight_toRightOf="@+id/button5"
        app:layout_constraintVertical_chainStyle="packed" />

    <Button
        android:id="@+id/button5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toTopOf="@+id/button6"
        app:layout_constraintTop_toBottomOf="@+id/button4"
        app:layout_constraintRight_toRightOf="@+id/button6" />

    <Button
        android:id="@+id/button6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toTopOf="@+id/button7"
        app:layout_constraintTop_toBottomOf="@+id/button5"
        app:layout_constraintRight_toRightOf="@+id/button7" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="@string/basic_chains"
        android:textSize="30sp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintTop_creator="1" />

    <Button
        android:id="@+id/button7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toTopOf="@+id/button8"
        app:layout_constraintTop_toBottomOf="@+id/button6"
        app:layout_constraintRight_toRightOf="@+id/button8" />

    <Button
        android:id="@+id/button8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button7"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@+id/button9"
        app:layout_constraintHorizontal_bias="0.42" />

    <Button
        android:id="@+id/button9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toLeftOf="@+id/button10"
        app:layout_constraintLeft_toRightOf="@+id/button8"
        app:layout_constraintTop_toTopOf="@+id/button8" />

    <Button
        android:id="@+id/button10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button9"
        app:layout_constraintTop_toTopOf="@+id/button9" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(g). `constraint_example_x1.xml`**


> Our `constraint_example_x1` layout.

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`Button`](https://android.camposha.info/en/button)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/one"
        app:layout_constraintRight_toLeftOf="@+id/button11"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/button14"
        app:layout_constraintTop_toBottomOf="@+id/button5" />

    <Button
        android:id="@+id/button5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/four"
        app:layout_constraintRight_toLeftOf="@+id/button13"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/button4"
        app:layout_constraintTop_toBottomOf="@+id/button7" />

    <Button
        android:id="@+id/button6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/six"
        app:layout_constraintRight_toLeftOf="@+id/button23"
        app:layout_constraintLeft_toRightOf="@+id/button13"
        app:layout_constraintBottom_toTopOf="@+id/button12"
        app:layout_constraintTop_toBottomOf="@+id/button9" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/advanced_chains"
        android:textSize="30sp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="20dp"
        tools:layout_constraintLeft_creator="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp" />

    <Button
        android:id="@+id/button7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/seven"
        app:layout_constraintRight_toLeftOf="@+id/button8"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintBottom_toTopOf="@+id/button5"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/eight"
        app:layout_constraintRight_toLeftOf="@+id/button9"
        app:layout_constraintLeft_toRightOf="@+id/button7"
        app:layout_constraintBottom_toTopOf="@+id/button13"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/nine"
        app:layout_constraintRight_toLeftOf="@+id/button22"
        app:layout_constraintLeft_toRightOf="@+id/button8"
        app:layout_constraintBottom_toTopOf="@+id/button6"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/zero"
        app:layout_constraintRight_toLeftOf="@+id/button25"
        app:layout_constraintLeft_toRightOf="@+id/button14"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button11" />

    <Button
        android:id="@+id/button11"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/two"
        app:layout_constraintRight_toLeftOf="@+id/button12"
        app:layout_constraintLeft_toRightOf="@+id/button4"
        app:layout_constraintBottom_toTopOf="@+id/button10"
        app:layout_constraintTop_toBottomOf="@+id/button13" />

    <Button
        android:id="@+id/button12"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/three"
        app:layout_constraintRight_toLeftOf="@+id/button24"
        app:layout_constraintLeft_toRightOf="@+id/button11"
        app:layout_constraintBottom_toTopOf="@+id/button25"
        app:layout_constraintTop_toBottomOf="@+id/button6" />

    <Button
        android:id="@+id/button13"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/five"
        app:layout_constraintRight_toLeftOf="@+id/button6"
        app:layout_constraintLeft_toRightOf="@+id/button5"
        app:layout_constraintBottom_toTopOf="@+id/button11"
        app:layout_constraintTop_toBottomOf="@+id/button8" />

    <TextView
        android:id="@+id/textView6"
        android:layout_width="0dp"
        android:layout_height="49dp"
        android:background="#BB9"
        android:text="@string/zero_point_zero"
        android:textAlignment="viewEnd"
        android:textSize="30sp"
        app:layout_constraintLeft_toLeftOf="@+id/button7"
        app:layout_constraintRight_toRightOf="@+id/button22"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintRight_creator="1"
        android:layout_marginTop="24dp"
        app:layout_constraintTop_toBottomOf="@+id/textView3"
        tools:layout_constraintLeft_creator="1" />

    <Button
        android:id="@+id/button14"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/dot"
        app:layout_constraintRight_toLeftOf="@+id/button10"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button4" />

    <Button
        android:id="@+id/button22"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/divide"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button9"
        app:layout_constraintBottom_toTopOf="@+id/button23"
        app:layout_constraintTop_toBottomOf="@+id/textView6" />

    <Button
        android:id="@+id/button23"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/multiply"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button6"
        app:layout_constraintBottom_toTopOf="@+id/button24"
        app:layout_constraintTop_toBottomOf="@+id/button22" />

    <Button
        android:id="@+id/button24"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/add"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button12"
        app:layout_constraintBottom_toTopOf="@+id/button26"
        app:layout_constraintTop_toBottomOf="@+id/button23" />

    <Button
        android:id="@+id/button25"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/equals"
        app:layout_constraintRight_toLeftOf="@+id/button26"
        app:layout_constraintLeft_toRightOf="@+id/button10"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button12" />

    <Button
        android:id="@+id/button26"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/subtract"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintLeft_toRightOf="@+id/button25"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button24" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(h). `constraintset_example_big.xml`**


> Our `constraintset_example_big` layout.

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_constraintset_example"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginEnd="24dp"
        android:layout_marginStart="24dp"
        android:layout_marginTop="24dp"
        android:onClick="toggleMode"
        android:scaleType="centerCrop"
        android:src="@drawable/lake"
        app:layout_constraintDimensionRatio="h,16:9"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintRight_creator="1"
        android:contentDescription="@string/lake_tahoe_image" />

    <TextView
        android:id="@+id/textView9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/lake_tahoe_title"
        android:textSize="30sp"
        app:layout_constraintLeft_toLeftOf="@+id/imageView"
        android:layout_marginTop="8dp"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <TextView
        android:id="@+id/textView11"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:text="@string/lake_discription"
        app:layout_constraintLeft_toLeftOf="@+id/textView9"
        android:layout_marginTop="8dp"
        app:layout_constraintTop_toBottomOf="@+id/textView9"
        app:layout_constraintRight_toRightOf="@+id/imageView"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginBottom="16dp"
        tools:layout_constraintTop_creator="1"
        tools:layout_constraintBottom_creator="1"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintVertical_bias="0.0" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(i). `constraintset_example_main.xml`**


> Our `constraintset_example_main` layout.

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_constraintset_example"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="8dp"
        android:onClick="toggleMode"
        android:scaleType="centerCrop"
        android:src="@drawable/lake"
        app:layout_constraintBottom_toBottomOf="@+id/textView9"
        app:layout_constraintDimensionRatio="w,16:9"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="@+id/textView9"
        tools:layout_constraintBottom_creator="1"
        tools:layout_constraintTop_creator="1"
        android:contentDescription="@string/lake_tahoe_image"
        app:layout_constraintVertical_bias="0.0" />

    <TextView
        android:id="@+id/textView9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="16dp"
        android:text="@string/lake_tahoe_title"
        android:textSize="30sp"
        app:layout_constraintLeft_toRightOf="@+id/imageView"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView11"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="24dp"
        android:text="@string/lake_discription"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView"
        tools:layout_constraintBottom_creator="1"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintRight_creator="1"
        tools:layout_constraintTop_creator="1" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(j). `activity_main.xml`**


> Our `activity_main` layout.

This layout will show how to use another layout like `ScrollView` as the root element, with `ConstraintLayoyt` defined as child.

1. [`ScrollView`](https://android.camposha.info/en/scrollview)
2. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
3. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.android.constraintlayoutexamples.MainActivity">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/activity_main"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:id="@+id/button"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:onClick="show"
            android:tag="constraint_example_1"
            android:text="@string/centering_views"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button2"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_2"
            android:text="@string/basic_arrange"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/button"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button15"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_4"
            android:text="@string/advanced_arrangement"
            app:layout_constraintLeft_toLeftOf="@+id/button30"
            app:layout_constraintRight_toRightOf="@+id/button30"
            app:layout_constraintTop_toBottomOf="@+id/button30"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button18"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_5"
            android:text="@string/aspect_ratio"
            app:layout_constraintLeft_toLeftOf="@+id/button15"
            app:layout_constraintRight_toRightOf="@+id/button15"
            app:layout_constraintTop_toBottomOf="@+id/button15"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button19"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_6"
            android:text="@string/basic_chains"
            app:layout_constraintLeft_toLeftOf="@+id/button18"
            app:layout_constraintRight_toRightOf="@+id/button18"
            app:layout_constraintTop_toBottomOf="@+id/button18"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button20"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="showConstraintSetExample"
            android:tag="constraint_example_7"
            android:text="@string/constraintset"
            app:layout_constraintLeft_toLeftOf="@+id/button19"
            app:layout_constraintRight_toRightOf="@+id/button19"
            app:layout_constraintTop_toBottomOf="@+id/button19"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button21"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_x1"
            android:text="@string/advanced_chains"
            app:layout_constraintLeft_toLeftOf="@+id/button20"
            app:layout_constraintRight_toRightOf="@+id/button20"
            app:layout_constraintTop_toBottomOf="@+id/button20"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />

        <Button
            android:id="@+id/button30"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:onClick="show"
            android:tag="constraint_example_3"
            android:text="@string/guidelines"
            app:layout_constraintLeft_toLeftOf="@+id/button2"
            app:layout_constraintRight_toRightOf="@+id/button2"
            app:layout_constraintTop_toBottomOf="@+id/button2"
            tools:layout_constraintLeft_creator="1"
            tools:layout_constraintRight_creator="1" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</ScrollView>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `ConstraintSetExampleActivity.java`**

> Our `ConstraintSetExampleActivity` class.

Create a java file named `ConstraintSetExampleActivity.java`.

Then create a class that extends `AppCompatActivity` and add its contents as follows:

We will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `TransitionManager` from the `android.transition` package.
3. `View` from the `android.view` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `ConstraintLayout` from the `androidx.constraintlayout.widget` package.
6. `ConstraintSet` from the `androidx.constraintlayout.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onSaveInstanceState(Bundle`.

We will be creating the following methods:

1. `toggleMode(View v)`.
2. `applyConfig()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.transition.TransitionManager;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;

/**
 * An example activity that show cases the use of {@link ConstraintSet}.
 * It starts out with a single ConstraintLayout which is then transitioned to
 * a different ConstraintLayout using {@link ConstraintSet#applyTo(ConstraintLayout)}.
 */
public class ConstraintSetExampleActivity extends AppCompatActivity {

    private static final String SHOW_BIG_IMAGE = "showBigImage";

    /**
     * Whether to show an enlarged image
     */
    private boolean mShowBigImage = false;
    /**
     * The ConstraintLayout that any changes are applied to.
     */
    private ConstraintLayout mRootLayout;
    /**
     * The ConstraintSet to use for the normal initial state
     */
    private ConstraintSet mConstraintSetNormal = new ConstraintSet();
    /**
     * ConstraintSet to be applied on the normal ConstraintLayout to make the Image bigger.
     */
    private ConstraintSet mConstraintSetBig = new ConstraintSet();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.constraintset_example_main);

        mRootLayout = (ConstraintLayout) findViewById(R.id.activity_constraintset_example);
        // Note that this can also be achieved by calling
        // `mConstraintSetNormal.load(this, R.layout.constraintset_example_main);`
        // Since we already have an inflated ConstraintLayout in `mRootLayout`, clone() is
        // faster and considered the best practice.
        mConstraintSetNormal.clone(mRootLayout);
        // Load the constraints from the layout where ImageView is enlarged.
        mConstraintSetBig.load(this, R.layout.constraintset_example_big);

        if (savedInstanceState != null) {
            boolean previous = savedInstanceState.getBoolean(SHOW_BIG_IMAGE);
            if (previous != mShowBigImage) {
                mShowBigImage = previous;
                applyConfig();
            }
        }
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(SHOW_BIG_IMAGE, mShowBigImage);
    }

    // Method called when the ImageView within R.layout.constraintset_example_main
    // is clicked.
    public void toggleMode(View v) {
        TransitionManager.beginDelayedTransition(mRootLayout);
        mShowBigImage = !mShowBigImage;
        applyConfig();
    }

    private void applyConfig() {
        if (mShowBigImage) {
            mConstraintSetBig.applyTo(mRootLayout);
        } else {
            mConstraintSetNormal.applyTo(mRootLayout);
        }
    }
}


```

**(b). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Then create a class that extends `AppCompatActivity` and add its contents as follows:

We will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.
2. `Configuration` from the `android.content.res` package.
3. `Bundle` from the `android.os` package.
4. `View` from the `android.view` package.
5. `AppCompatActivity` from the `androidx.appcompat.app` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onConfigurationChanged(Configuration`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `show(View v)`.
2. `showConstraintSetExample(View view)`.
3. `setContentView(String tag)`.

Here is the full java code for this `class`:

```java

package replace_with_your_package_name;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private String mTag = "activity_main";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(mTag);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        setContentView(mTag);
    }

    public void show(View v) {
        mTag = (String) v.getTag();
        setContentView(mTag);
    }

    @Override
    public void onBackPressed() {
        if (!mTag.equals("activity_main")) {
            mTag = "activity_main";
            setContentView(mTag);
        } else {
            super.onBackPressed();
        }
    }

    public void showConstraintSetExample(View view) {
        startActivity(new Intent(this, ConstraintSetExampleActivity.class));
    }

    private void setContentView(String tag) {
        int id = getResources().getIdentifier(tag, "layout", getPackageName());
        setContentView(id);
    }
}

```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|1.|Read more [here](https://github.com/android/views-widgets-samples/blob/master/ConstraintLayoutExamples/README.md).|
