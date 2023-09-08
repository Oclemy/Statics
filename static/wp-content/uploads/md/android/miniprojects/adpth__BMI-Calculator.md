# Beautiful BMI Calculator

>  This App concept is basically used to calculate BMI value and corresponding weight status while taking age into consideration..


The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration.

### Screenshots

![Beautiful BMI Calculator Tutorial](https://github.com/adpth/BMI-Calculator/raw/master/screenshots/screens.png)


### BMI Range Table


|Category|BMI range - kg/m²|
|------|------|
|Severe Thinness|<15|
|Moderate Thinness|15 - 16|
|Mild Thinness|16 - 18.5|
|Normal|18.5 - 25|
|Overweight|25 - 30|
|Obese Classes|>30|

### Library & Features


- View Binding - provides the views to bind with the activity which is ongoing.
- Navigation - Handle everything needed for in-app navigation.
- Animations & Transitions - Move widgets and transition between screens.
- Fragment - A basic unit of composable UI.
- Sharing - uses Intents and their associated extras to allow users to share information quickly and easily, using their favorite apps.

[View Binding](https://developer.android.com/topic/libraries/data-binding/) - provides the views to bind with the activity which is ongoing.

[Navigation](https://developer.android.com/topic/libraries/architecture/navigation/) - Handle everything needed for in-app navigation.

[Animations & Transitions](https://developer.android.com/training/animation/) - Move widgets and transition between screens.

[Fragment](https://developer.android.com/guide/components/fragments) - A basic unit of composable UI.

[Sharing](https://developer.android.com/training/sharing/send) - uses Intents and their associated extras to allow users to share information quickly and easily, using their favorite apps.

[Splash Screen API](https://developer.android.com/guide/topics/ui/splash-screen/migrate) - implemented a custom splash screen that displays correctly in Android 12 and higher.


Let us look at the full Beautiful BMI Calculator code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable [`view binding`](https://android.examples.directory/viewbinding) by setting the `viewBinding` property to true. This will allow us to efficiently reference widgets from layout without explicitly invoking `findViewById()` function or using kotlin synthetics.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 9 dependencies:


Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'androidx.navigation.safeargs.kotlin'
}

android {
    compileSdk 31

    defaultConfig {
        applicationId "com.tharun.bmicalculator"
        minSdk 21
        targetSdk 31
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables.useSupportLibrary = true
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

    implementation 'androidx.core:core-ktx:1.8.0'
    implementation 'androidx.appcompat:appcompat:1.4.2'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.5.0'
    implementation 'androidx.navigation:navigation-ui-ktx:2.5.0'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation "androidx.fragment:fragment-ktx:1.5.0"
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

    implementation "androidx.core:core-splashscreen:1.0.0-rc01"
}
```

#### Step 2. Create [Animations](https://android.examples.directory/animation/)

Create a directory known as `anim` inside your `res` directory and add the following xml file:


**(a). `slide_out_right.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="100%"
        android:fromYDelta="0%" android:toYDelta="0%"
        android:duration="200"/>
</set>
```

**(b). `slide_out_left.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0%" android:toXDelta="-100%"
        android:fromYDelta="0%" android:toYDelta="0%"
        android:duration="200"/>
</set>
```

**(c). `slide_in_right.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="100%" android:toXDelta="0%"
        android:fromYDelta="0%" android:toYDelta="0%"
        android:duration="200"/>
</set>
```

**(d). `slide_in_left.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="-100%" android:toXDelta="0%"
        android:fromYDelta="0%" android:toYDelta="0%"
        android:duration="200"/>
</set>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `fragment_result.xml`**

> Our `fragment_result` layout.

This layout will represent our Result Fragment's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`CardView`](https://android.examples.directory/cardview)
3. [`LinearLayout`](https://android.examples.directory/linearlayout)
4. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ResultFragment">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:layout_marginEnd="16dp"
        android:text="@string/your_result"
        android:textColor="@android:color/white"
        android:textSize="30sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/result_card"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.cardview.widget.CardView
        android:id="@+id/result_card"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginRight="16dp"
        app:cardBackgroundColor="@color/card_background"
        app:cardCornerRadius="10sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="vertical"
            android:padding="20dp">

            <TextView
                android:id="@+id/condition"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="15dp"
                android:textColor="@color/green"
                android:textSize="20sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/your_bmi"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:textColor="@android:color/white"
                android:textSize="50sp"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:text="@string/normal_bmi_range"
                android:textColor="#8D8E99"
                android:textSize="22sp"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/_18_5_25_kg_m2"
                android:textColor="@android:color/white"
                android:textSize="18sp" />

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:layout_marginBottom="8dp"
                android:gravity="center"
                android:orientation="horizontal">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/your_age"
                    android:textColor="@color/colorAccent"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/ageTxt"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="5dp"
                    android:textColor="@android:color/white"
                    android:textSize="20sp" />

            </LinearLayout>

        </LinearLayout>

    </androidx.cardview.widget.CardView>

    <androidx.cardview.widget.CardView
        android:id="@+id/sug_container"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginRight="16dp"
        app:cardCornerRadius="10sp"
        app:cardBackgroundColor="@color/card_background"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/result_card">

        <TextView
            android:id="@+id/suggestion"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="20sp"/>

    </androidx.cardview.widget.CardView>

    <ImageView
        android:id="@+id/share"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="32dp"
        android:padding="15dp"
        android:src="@drawable/ic_share"
        android:contentDescription="@string/share"
        android:background="@drawable/result_btn"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/recalculate"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/sug_container"
        app:layout_constraintVertical_bias="1.0" />

    <ImageView
        android:id="@+id/recalculate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="32dp"
        android:padding="15dp"
        android:contentDescription="@string/recalculate"
        android:src="@drawable/ic_refresh"
        android:background="@drawable/result_btn"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/share"
        app:layout_constraintTop_toBottomOf="@+id/sug_container"
        app:layout_constraintVertical_bias="1.0"
        app:shapeAppearanceOverlay="@style/circleImageView"/>


</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `fragment_home.xml`**

> Our `fragment_home` layout.

This layout will represent our Home Fragment's layout. Specify [`androidx.core.widget.NestedScrollView`](https://android.examples.directory/nestedscrollview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`CardView`](https://android.examples.directory/cardview)
3. [`TextView`](https://android.examples.directory/textview)
4. [`LinearLayout`](https://android.examples.directory/linearlayout)
5. [`SeekBar`](https://android.examples.directory/seekbar)
6. [`RelativeLayout`](https://android.examples.directory/relativelayout)
7. [`ImageView`](https://android.examples.directory/imageview)
8. [`MaterialButton`](https://android.examples.directory/materialbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".HomeFragment">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView_male"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="32dp"
            android:layout_marginEnd="8dp"
            app:cardBackgroundColor="@color/card_background"
            app:cardCornerRadius="10dp"
            app:layout_constraintBottom_toTopOf="@+id/cardView5"
            app:layout_constraintEnd_toStartOf="@+id/cardView_female"
            app:layout_constraintHorizontal_chainStyle="spread"
            app:layout_constraintHorizontal_weight="1"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_bias="1.0">

            <TextView
                android:id="@+id/maleTxt"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center|bottom"
                android:drawablePadding="5sp"
                android:padding="20dp"
                android:text="@string/male"
                android:textAlignment="center"
                android:textColor="@color/tint"
                android:textSize="20sp"
                android:textStyle="bold"
                app:drawableTopCompat="@drawable/male" />

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView_female"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="16dp"
            app:layout_constraintHorizontal_weight="1"
            app:cardBackgroundColor="@color/card_background"
            app:cardCornerRadius="10dp"
            app:layout_constraintBottom_toBottomOf="@+id/cardView_male"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/cardView_male"
            app:layout_constraintTop_toTopOf="@+id/cardView_male">

            <TextView
                android:id="@+id/femaleTxt"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center|bottom"
                android:drawablePadding="5sp"
                android:padding="20dp"
                android:text="@string/female"
                android:textAlignment="center"
                android:textColor="@color/tint"
                android:textSize="20sp"
                android:textStyle="bold"
                app:drawableTopCompat="@drawable/female" />

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView5"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="16dp"
            app:cardBackgroundColor="@color/card_background"
            app:cardCornerRadius="10dp"
            app:layout_constraintBottom_toTopOf="@+id/cardView3"
            app:layout_constraintHorizontal_chainStyle="spread"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/cardView_male">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:gravity="center"
                android:orientation="vertical"
                android:padding="20dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/height"
                    android:textColor="#8D8E99"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/height_txt"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/_0cm"
                    android:textColor="@android:color/white"
                    android:textSize="50sp"
                    android:textStyle="bold" />

                <SeekBar
                    android:id="@+id/Seekbar"
                    style="?android:attr/progressBarStyleHorizontal"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="10dp"
                    android:max="200"
                    android:thumbTint="@color/colorAccent"
                    android:progressBackgroundTint="#888994"
                    android:progressTint="@android:color/white" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView3"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintHorizontal_weight="1"
            app:cardBackgroundColor="@color/card_background"
            app:cardCornerRadius="10dp"
            app:layout_constraintBottom_toTopOf="@+id/calculate"
            app:layout_constraintEnd_toStartOf="@+id/cardView4"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/cardView5">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:gravity="center_horizontal"
                android:orientation="vertical"
                android:padding="15dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/weight"
                    android:textColor="#8D8E99"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/weight_txt"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="center"
                    android:text="@string/_50"
                    android:textColor="@android:color/white"
                    android:textSize="50sp"
                    android:textStyle="bold" />

                <LinearLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:baselineAligned="false"
                    android:gravity="center_horizontal"
                    android:weightSum="2">

                    <RelativeLayout
                        android:id="@+id/weight_minus"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginEnd="5dp"
                        android:layout_weight="1"
                        android:background="@drawable/stepper_background">

                        <ImageView
                            android:layout_width="60dp"
                            android:layout_height="60dp"
                            android:contentDescription="@string/minus"
                            android:padding="14dp"
                            app:srcCompat="@drawable/subtract" />

                    </RelativeLayout>


                    <RelativeLayout
                        android:id="@+id/weight_plus"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="5dp"
                        android:layout_weight="1"
                        android:background="@drawable/stepper_background">

                        <ImageView
                            android:layout_width="60dp"
                            android:layout_height="60dp"
                            android:contentDescription="@string/plus"
                            android:padding="3dp"
                            app:srcCompat="@drawable/ic_add" />

                    </RelativeLayout>

                </LinearLayout>

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
            android:id="@+id/cardView4"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginEnd="16dp"
            app:cardBackgroundColor="@color/card_background"
            app:cardCornerRadius="10dp"
            app:layout_constraintHorizontal_weight="1"
            app:layout_constraintBottom_toBottomOf="@+id/cardView3"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/cardView3"
            app:layout_constraintTop_toTopOf="@+id/cardView3">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:gravity="center_horizontal"
                android:orientation="vertical"
                android:padding="15dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:text="@string/age"
                    android:textColor="#8D8E99"
                    android:textSize="20sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/age"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/_19"
                    android:textColor="@android:color/white"
                    android:textSize="50sp"
                    android:textStyle="bold" />

                <LinearLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:baselineAligned="false"
                    android:gravity="center_horizontal"
                    android:weightSum="2">

                    <RelativeLayout
                        android:id="@+id/age_minus"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginEnd="5dp"
                        android:layout_weight="1"
                        android:background="@drawable/stepper_background">

                        <ImageView
                            android:layout_width="60dp"
                            android:layout_height="60dp"
                            android:contentDescription="@string/minus"
                            android:padding="14dp"
                            app:srcCompat="@drawable/subtract" />

                    </RelativeLayout>


                    <RelativeLayout
                        android:id="@+id/age_plus"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="5dp"
                        android:layout_weight="1"
                        android:background="@drawable/stepper_background">

                        <ImageView
                            android:layout_width="60dp"
                            android:layout_height="60dp"
                            android:contentDescription="@string/plus"
                            android:padding="3dp"
                            app:srcCompat="@drawable/ic_add" />

                    </RelativeLayout>

                </LinearLayout>

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/calculate"
            android:layout_width="match_parent"
            android:layout_height="55dp"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginRight="16dp"
            android:layout_marginBottom="24dp"
            app:cornerRadius="7dp"
            android:backgroundTint="@color/colorAccent"
            android:text="@string/calculate"
            android:textColor="@android:color/white"
            android:textSize="17sp"
            android:textStyle="bold"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/cardView3" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</androidx.core.widget.NestedScrollView>
```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`FragmentContainerView`](https://android.examples.directory/fragmentcontainerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/fragmentContainer"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        android:name="androidx.navigation.fragment.NavHostFragment"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/nav_graph"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `Utils.kt`**

> Our `Utils` class.

Create a Kotlin file named `Utils.kt` .

Then we will be creating the following functions:

1. `checkAdult(age: Int, result: Float): String `.
2. `getAdultCategory(parameter)` - Let's pass a `Float` object as a parameter.
3. `getChildCategory(parameter)` - This function will take a `Float` object as a parameter.
4. `getSuggestions(parameter)` - Pass to this method a `Float` object as a parameter.

**(a). Our `getAdultCategory()` function.**

A function to get adult category:

```kotlin
    private fun getAdultCategory(result: Float): String {
        val category: String = if (result < 15) {
            "Severe Thinness"
        } else if (result in 15.0..16.0) {
            "Moderate Thinness"
        } else if (result > 16 && result <= 18.5) {
            "Mild Thinness"
        } else if (result > 18.5 && result <= 25) {
            "Normal"
        } else if (result > 25 && result <= 30) {
            "Overweight"
        } else if (result > 30 && result <= 35) {
            "Obese Class I"
        } else if (result > 35 && result <= 40) {
            "Obese Class II"
        } else {
            "Obese Class III"
        }
        return category
    }
```

**(b). Our `getChildCategory()` function.**

A function to get child category:

```kotlin
    private fun getChildCategory(result: Float): String {
        val category: String = when {
            result < 15 -> {
                "very severely underweight"
            }
            result in 15.0..16.0 -> {
                "severely underweight"
            }
            result > 16 && result <= 18.5 -> {
                "underweight"
            }
            result > 18.5 && result <= 25 -> {
                "normal (healthy weight)"
            }
            result > 25 && result <= 30 -> {
                "overweight"
            }
            result > 30 && result <= 35 -> {
                "moderately obese"
            }
            result > 35 && result <= 40 -> {
                "severely obese"
            }
            else -> {
                "very severely obese"
            }
        }
        return category
    }
```

**(c). Our `checkAdult()` function.**

A function to check adult:

```kotlin
    fun checkAdult(age: Int, result: Float): String {
        val category:String = when (age) {
            in 2..19 -> {
                getAdultCategory(result)
            }
            else -> {
                getChildCategory(result)
            }
        }
        return category
    }
```

**(d). Our `getSuggestions()` function.**

A function to get suggestions:

```kotlin
    fun getSuggestions(result: Float): String {
        val suggestion: String = when {
            result < 18.5 -> {
                "A BMI of under 18.5 indicates that a person has insufficient weight, so they may need to put on some weight. They should ask a doctor or dietitian for advice."
            }
            result in 18.5..24.9 -> {
                "A BMI of 18.5–24.9 indicates that a person has a healthy weight for their height. By maintaining a healthy weight, they can lower their risk of developing serious health problems."
            }
            result < 25 && result >=29.9 -> {
                "A BMI of 25–29.9 indicates that a person is slightly overweight. A doctor may advise them to lose some weight for health reasons. They should talk with a doctor or dietitian for advice."
            }
            else -> {
                "A BMI of over 30 indicates that a person has obesity. Their health may be at risk if they do not lose weight. They should talk with a doctor or dietitian for advice."
            }
        }
        return suggestion
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

object Utils {

    fun checkAdult(age: Int, result: Float): String {
        val category:String = when (age) {
            in 2..19 -> {
                getAdultCategory(result)
            }
            else -> {
                getChildCategory(result)
            }
        }
        return category
    }

    private fun getAdultCategory(result: Float): String {
        val category: String = if (result < 15) {
            "Severe Thinness"
        } else if (result in 15.0..16.0) {
            "Moderate Thinness"
        } else if (result > 16 && result <= 18.5) {
            "Mild Thinness"
        } else if (result > 18.5 && result <= 25) {
            "Normal"
        } else if (result > 25 && result <= 30) {
            "Overweight"
        } else if (result > 30 && result <= 35) {
            "Obese Class I"
        } else if (result > 35 && result <= 40) {
            "Obese Class II"
        } else {
            "Obese Class III"
        }
        return category
    }

    private fun getChildCategory(result: Float): String {
        val category: String = when {
            result < 15 -> {
                "very severely underweight"
            }
            result in 15.0..16.0 -> {
                "severely underweight"
            }
            result > 16 && result <= 18.5 -> {
                "underweight"
            }
            result > 18.5 && result <= 25 -> {
                "normal (healthy weight)"
            }
            result > 25 && result <= 30 -> {
                "overweight"
            }
            result > 30 && result <= 35 -> {
                "moderately obese"
            }
            result > 35 && result <= 40 -> {
                "severely obese"
            }
            else -> {
                "very severely obese"
            }
        }
        return category
    }

    fun getSuggestions(result: Float): String {
        val suggestion: String = when {
            result < 18.5 -> {
                "A BMI of under 18.5 indicates that a person has insufficient weight, so they may need to put on some weight. They should ask a doctor or dietitian for advice."
            }
            result in 18.5..24.9 -> {
                "A BMI of 18.5–24.9 indicates that a person has a healthy weight for their height. By maintaining a healthy weight, they can lower their risk of developing serious health problems."
            }
            result < 25 && result >=29.9 -> {
                "A BMI of 25–29.9 indicates that a person is slightly overweight. A doctor may advise them to lose some weight for health reasons. They should talk with a doctor or dietitian for advice."
            }
            else -> {
                "A BMI of over 30 indicates that a person has obesity. Their health may be at risk if they do not lose weight. They should talk with a doctor or dietitian for advice."
            }
        }
        return suggestion
    }
}

```


**(b). `ResultFragment.kt`**

> Our `ResultFragment` class.

Create a Kotlin file named `ResultFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `Toast` from the `android.widget` package.
4. `Fragment` from the `androidx.fragment.app` package.
5. `navArgs` from the `androidx.navigation.fragment` package.

Then extend the `Fragment` and add its contents as follows:

First override these callbacks: 

1. `onDestroyView() `.

Then we will be creating the following functions:

1. `category(parameter)` - Let's pass a `Int` object as a parameter.
2. `shareContent(parameter)` - Pass to this method a `Float` object as a parameter.

**(a). Our `shareContent()` function.**

A function to share content:

```kotlin
    private fun shareContent(bmi: Float) {
        try {

            val strShareMessage = "Hello!! my BMI is ${bmi}\n\n" +
                    "my current condition: ${binding.condition.text}\n" +
                    "my age is: ${binding.ageTxt.text}\n\n" +
                    "App suggested me that: ${binding.suggestion.text}"

            val i = Intent(Intent.ACTION_SEND)
            i.putExtra(Intent.EXTRA_TEXT, strShareMessage)
            i.type = "text/plain"
            startActivity(Intent.createChooser(i, "Select App to Share with your friends"))

        } catch (e: Exception) {

            Toast.makeText(requireContext(),e.toString(),Toast.LENGTH_LONG).show()
        }
    }
```

**(b). Our `category()` function.**

Write this function as follows:

```kotlin
    private fun category(age: Int): String {
        val category:String = when (age) {
            in 2..19 -> {
                "Teenage"
            }
            else -> {
                "Adult"
            }
        }
        return category
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.navArgs
import com.tharun.bmicalculator.databinding.FragmentResultBinding
import kotlin.math.roundToInt

class ResultFragment : Fragment() {

    private var _binding: FragmentResultBinding? = null
    private val binding get() = _binding!!
    private val args: ResultFragmentArgs by navArgs()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding =  FragmentResultBinding.inflate(inflater, container, false)

        val bmi = (args.bmi * 100 / 100).roundToInt().toFloat()
        val age = args.age

        binding.apply {

            yourBmi.text = bmi.toString()
            condition.text = Utils.checkAdult(age.toInt(),bmi)
            //category.text = Utils.checkAdult(age.toInt(),bmi)

            recalculate.setOnClickListener {
                requireActivity().onBackPressed()
            }

            val spannable = SpannableString("Suggestion: ${Utils.getSuggestions(bmi)}")

            val fColor = ForegroundColorSpan(Color.parseColor("#FE0049"))
            spannable.setSpan(fColor,0,11,SpannableString.SPAN_INCLUSIVE_EXCLUSIVE)

            suggestion.text = spannable

            val spannable1 = SpannableString("$age (${category(age.toInt())})")

            ageTxt.text = spannable1

            share.setOnClickListener {
                shareContent(bmi)
            }

        }

        return binding.root
    }

    private fun category(age: Int): String {
        val category:String = when (age) {
            in 2..19 -> {
                "Teenage"
            }
            else -> {
                "Adult"
            }
        }
        return category
    }

    private fun shareContent(bmi: Float) {
        try {

            val strShareMessage = "Hello!! my BMI is ${bmi}\n\n" +
                    "my current condition: ${binding.condition.text}\n" +
                    "my age is: ${binding.ageTxt.text}\n\n" +
                    "App suggested me that: ${binding.suggestion.text}"

            val i = Intent(Intent.ACTION_SEND)
            i.putExtra(Intent.EXTRA_TEXT, strShareMessage)
            i.type = "text/plain"
            startActivity(Intent.createChooser(i, "Select App to Share with your friends"))

        } catch (e: Exception) {

            Toast.makeText(requireContext(),e.toString(),Toast.LENGTH_LONG).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

```


**(c). `HomeFragment.kt`**

> Our `HomeFragment` class.

Create a Kotlin file named `HomeFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `SeekBar` from the `android.widget` package.
3. `Toast` from the `android.widget` package.
4. `Fragment` from the `androidx.fragment.app` package.
5. `findNavController` from the `androidx.navigation.fragment` package.

Then extend the `Fragment` and add its contents as follows:

First override these callbacks: 

1. `onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) `.
2. `onStartTrackingTouch(seekBar: SeekBar) `.
3. `onStopTrackingTouch(seekBar: SeekBar) `.
4. `onDestroyView() `.

Then we will be creating the following functions:

1. `initComponents() `.
2. `calculateBMI(parameter)` - Pass to this method a `String` object as a parameter.

**(a). Our `calculateBMI()` function.**

A function to calculate b m i:

```kotlin
    private fun calculateBMI(age: String) {
        val bmi = weight / (height*height)
        val action = HomeFragmentDirections.actionHomeFragmentToResultFragment(bmi,age)
        findNavController().navigate(action)
    }
```

**(b). Our `initComponents()` function.**

A function to init components:

```kotlin
    private fun initComponents() {

        binding.apply {

            Seekbar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                    val ht = progress.toString() + resources.getString(R.string.cm)
                    binding.heightTxt.text = ht
                    height = progress.toFloat() / 100
                }

                override fun onStartTrackingTouch(seekBar: SeekBar) {}
                override fun onStopTrackingTouch(seekBar: SeekBar) {}
            })

            weightPlus.setOnClickListener {
                binding.weightTxt.text = countWeight++.toString()
            }

            weightMinus.setOnClickListener {
                binding.weightTxt.text = countWeight--.toString()
            }

            agePlus.setOnClickListener {
                binding.age.text = countAge++.toString()
            }

            ageMinus.setOnClickListener {
                binding.age.text = countAge--.toString()
            }

            calculate.setOnClickListener {
                if(!chosen) {
                    if(height.equals(0f)) {
                        Toast.makeText(requireContext(),"Height cannot be Zero, Try again", Toast.LENGTH_SHORT).show()
                    }
                    else {
                        weight = binding.weightTxt.text.toString().toFloat()
                        calculateBMI(age.text.toString())
                    }
                }
                else {
                    Toast.makeText(requireContext(),"Choose your gender", Toast.LENGTH_SHORT).show()
                }
            }

            cardViewMale.setOnClickListener {
                if(chosen) {
                    maleTxt.setTextColor(Color.parseColor("#FFFFFF"))
                    maleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.male_white, 0, 0)
                    cardViewFemale.isEnabled = false
                    chosen = false

                } else {
                    maleTxt.setTextColor(Color.parseColor("#8D8E99"))
                    maleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.male, 0, 0)
                    cardViewFemale.isEnabled = true
                    chosen = true
                }
            }

            cardViewFemale.setOnClickListener {
                if(chosen) {
                    femaleTxt.setTextColor(Color.parseColor("#FFFFFF"))
                    femaleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.female_white, 0, 0)
                    cardViewMale.isEnabled = false
                    chosen = false

                } else {
                    femaleTxt.setTextColor(Color.parseColor("#8D8E99"))
                    femaleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.female, 0, 0)
                    cardViewMale.isEnabled = true
                    chosen = true
                }
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SeekBar
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.tharun.bmicalculator.databinding.FragmentHomeBinding

class HomeFragment : Fragment() {

    private var height: Float = 0f
    private var weight: Float = 0f
    private var countWeight = 50
    private var countAge = 19
    private var chosen: Boolean = true
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        initComponents()

        return binding.root
    }

    private fun initComponents() {

        binding.apply {

            Seekbar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                    val ht = progress.toString() + resources.getString(R.string.cm)
                    binding.heightTxt.text = ht
                    height = progress.toFloat() / 100
                }

                override fun onStartTrackingTouch(seekBar: SeekBar) {}
                override fun onStopTrackingTouch(seekBar: SeekBar) {}
            })

            weightPlus.setOnClickListener {
                binding.weightTxt.text = countWeight++.toString()
            }

            weightMinus.setOnClickListener {
                binding.weightTxt.text = countWeight--.toString()
            }

            agePlus.setOnClickListener {
                binding.age.text = countAge++.toString()
            }

            ageMinus.setOnClickListener {
                binding.age.text = countAge--.toString()
            }

            calculate.setOnClickListener {
                if(!chosen) {
                    if(height.equals(0f)) {
                        Toast.makeText(requireContext(),"Height cannot be Zero, Try again", Toast.LENGTH_SHORT).show()
                    }
                    else {
                        weight = binding.weightTxt.text.toString().toFloat()
                        calculateBMI(age.text.toString())
                    }
                }
                else {
                    Toast.makeText(requireContext(),"Choose your gender", Toast.LENGTH_SHORT).show()
                }
            }

            cardViewMale.setOnClickListener {
                if(chosen) {
                    maleTxt.setTextColor(Color.parseColor("#FFFFFF"))
                    maleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.male_white, 0, 0)
                    cardViewFemale.isEnabled = false
                    chosen = false

                } else {
                    maleTxt.setTextColor(Color.parseColor("#8D8E99"))
                    maleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.male, 0, 0)
                    cardViewFemale.isEnabled = true
                    chosen = true
                }
            }

            cardViewFemale.setOnClickListener {
                if(chosen) {
                    femaleTxt.setTextColor(Color.parseColor("#FFFFFF"))
                    femaleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.female_white, 0, 0)
                    cardViewMale.isEnabled = false
                    chosen = false

                } else {
                    femaleTxt.setTextColor(Color.parseColor("#8D8E99"))
                    femaleTxt.setCompoundDrawablesWithIntrinsicBounds(0, R.drawable.female, 0, 0)
                    cardViewMale.isEnabled = true
                    chosen = true
                }
            }
        }
    }


    private fun calculateBMI(age: String) {
        val bmi = weight / (height*height)
        val action = HomeFragmentDirections.actionHomeFragmentToResultFragment(bmi,age)
        findNavController().navigate(action)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

```


**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `installSplashScreen` from the `androidx.core.splashscreen.SplashScreen.Companion` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.tharun.bmicalculator.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        installSplashScreen()

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/adpth/BMI-Calculator/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/adpth/BMI-Calculator).|
|3.|Follow code author [here](https://github.com/adpth).|
