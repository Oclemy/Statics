# Neumorphic BMI Calculator

>  Android Application to calculate BMI with Soft UI (Neumorphism).

### A simple Android Application to calculate BMI

![Neumorphic BMI Calculator Tutorial](https://raw.githubusercontent.com/unaisulhadi/Neumorphic-BMI-App/master/infographic.jpg)


### Neumorphic or Soft UI


### Neumorphism, or soft UI, is a visual style that combines background colors, shapes, gradients, highlights, and shadows to ensure graphic intense buttons and switches. All that allows achieving a soft, extruded plastic look, and almost 3D styling.


### Unlike normal cardview in android, both background and cards holds same color. Cards are elevated and contains bi-color shadows.


### In light soft ui, Top - Left shadows shows light shadow and Bottom - Right shadows shows little more dark shadow.


### Neumorphic Light

![Neumorphic BMI Calculator Tutorial](https://raw.githubusercontent.com/unaisulhadi/Neumorphic-BMI-App/master/LIGHT.jpg)


### Neumorphic Dark

![Neumorphic BMI Calculator Tutorial](https://raw.githubusercontent.com/unaisulhadi/Neumorphic-BMI-App/master/DARK.jpg)


Let us look at the full Neumorphic BMI Calculator Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 4 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `kotlin-kapt` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 10 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.hadi.bmicalculator"
        minSdkVersion 21
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
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    implementation 'com.google.android.material:material:1.1.0'
    implementation 'com.intuit.sdp:sdp-android:1.0.6'
    implementation 'com.intuit.ssp:ssp-android:1.0.6'
    implementation 'com.airbnb.android:lottie:3.3.0'

    // Glide
    implementation 'com.github.bumptech.glide:glide:4.11.0'
    kapt 'com.github.bumptech.glide:compiler:4.11.0'

    implementation 'com.github.fornewid:neumorphism:0.1.10'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```

#### Step 2. Create [Animations](https://android.examples.directory/animation/)

Create a directory known as `anim` inside your `res` directory and add the following xml file:


**(a). `slide_out_right.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="350"
        android:fromXDelta="0"
        android:toXDelta="100%p" />
</set>
```

**(b). `slide_out_left.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="350"
        android:fromXDelta="0"
        android:toXDelta="-100%p" />
</set>
```

**(c). `slide_in_right.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="350"
        android:fromXDelta="100%p"
        android:toXDelta="0" />
</set>
```

**(d). `slide_in_left.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:duration="350"
        android:fromXDelta="-100%p"
        android:toXDelta="0" />
</set>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`NeumorphCardView`](https://android.examples.directory/neumorphcardview)
2. [`RelativeLayout`](https://android.examples.directory/relativelayout)
3. [`LottieAnimationView`](https://android.examples.directory/lottieanimationview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    style="@style/ScreenBackground"
    tools:context=".ui.SplashActivity">


    <soup.neumorphism.NeumorphCardView
        android:id="@+id/bmiView"
        android:layout_width="@dimen/_150sdp"
        android:layout_height="@dimen/_150sdp"
        android:scaleType="centerInside"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:neumorph_shapeAppearance="@style/CustomShapeAppearanceBMIView">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center">

        <com.airbnb.lottie.LottieAnimationView
            android:id="@+id/splashLottie"
            android:layout_width="@dimen/_120sdp"
            android:layout_height="@dimen/_120sdp"
            app:lottie_autoPlay="true"
            app:lottie_imageAssetsFolder="images"
            app:lottie_loop="true"
            app:lottie_rawRes="@raw/medical_health" />

        </RelativeLayout>

    </soup.neumorphism.NeumorphCardView>




</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_results.xml`**

> Our `activity_results` layout.

This layout will represent our Results Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`NeumorphCardView`](https://android.examples.directory/neumorphcardview)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    style="@style/ScreenBackground"
    android:orientation="vertical"
    android:paddingTop="@dimen/_16sdp"
    android:paddingLeft="@dimen/_6sdp"
    android:paddingRight="@dimen/_6sdp"
    android:paddingBottom="@dimen/_6sdp"
    tools:context=".ui.ResultsActivity">


    <RelativeLayout
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_50sdp"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/back"
            android:layout_width="@dimen/_50sdp"
            android:layout_height="@dimen/_50sdp"
            android:scaleType="centerInside"
            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <ImageView
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:padding="@dimen/_10sdp"
                    android:src="@drawable/ic_back_arrow"
                    android:contentDescription="@string/back_button"/>

            </LinearLayout>


        </soup.neumorphism.NeumorphCardView>



        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/bmi_results"
            style="@style/TitleTextStyle"
            android:textSize="@dimen/_16ssp"
            android:layout_centerInParent="true"/>

    </RelativeLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:layout_below="@+id/toolbar"
        android:layout_above="@id/showDetails"
        android:gravity="center">

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/bmiView"
            android:layout_width="@dimen/_200sdp"
            android:layout_height="@dimen/_200sdp"
            android:scaleType="centerInside"
            android:layout_marginBottom="@dimen/_20sdp"
            app:layout_constraintBottom_toBottomOf="@+id/minusHeight"
            app:layout_constraintEnd_toStartOf="@+id/minusHeight"
            app:layout_constraintStart_toStartOf="parent"
            app:neumorph_shapeAppearance="@style/CustomShapeAppearanceBMIView">

            <RelativeLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center">

                <ProgressBar
                    android:id="@+id/progress"
                    android:layout_width="@dimen/_200sdp"
                    android:layout_height="@dimen/_200sdp"
                    android:indeterminate="false"
                    android:layout_centerInParent="true"
                    android:progressDrawable="@drawable/circular_progress_bar"
                    android:background="@drawable/circle_shape"
                    style="?android:attr/progressBarStyleHorizontal" />


                <TextView
                    android:id="@+id/tvBmiValue"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/temp_bmi"
                    android:includeFontPadding="false"
                    android:layout_centerInParent="true"
                    style="@style/RegularTextStyle"
                    android:textSize="@dimen/_35ssp"/>

            </RelativeLayout>


        </soup.neumorphism.NeumorphCardView>


        <TextView
            android:id="@+id/tvBmiStatus"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/temp_bmi_status"
            style="@style/RegularTextStyle"/>





    </LinearLayout>

    <soup.neumorphism.NeumorphCardView
        android:id="@+id/showDetails"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_60sdp"
        android:layout_marginBottom="@dimen/_8sdp"
        android:layout_marginStart="@dimen/_40sdp"
        android:layout_marginEnd="@dimen/_40sdp"
        android:clickable="true"
        android:focusable="true"
        app:neumorph_backgroundColor="@color/colorSecondary"
        android:layout_alignParentBottom="true">

        <TextView
            style="@style/RegularTextStyle"
            android:layout_gravity="center"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:text="@string/show_details"
            android:textColor="@color/lightColor"
            android:textAllCaps="false" />
    </soup.neumorphism.NeumorphCardView>


</RelativeLayout>
```

**(c). `activity_details.xml`**

> Our `activity_details` layout.

This layout will represent our Details Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`NeumorphCardView`](https://android.examples.directory/neumorphcardview)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`ScrollView`](https://android.examples.directory/scrollview)
6. [`View`](https://android.examples.directory/view)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    style="@style/ScreenBackground"
    android:orientation="vertical"
    android:paddingTop="@dimen/_16sdp"
    android:paddingLeft="@dimen/_6sdp"
    android:paddingRight="@dimen/_6sdp"
    android:paddingBottom="@dimen/_6sdp"
    tools:context=".ui.DetailsActivity">

    <RelativeLayout
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_50sdp"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/back"
            android:layout_width="@dimen/_50sdp"
            android:layout_height="@dimen/_50sdp"
            android:scaleType="centerInside"
            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <ImageView
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:padding="@dimen/_10sdp"
                    android:src="@drawable/ic_back_arrow"
                    android:contentDescription="@string/back_button"/>

            </LinearLayout>


        </soup.neumorphism.NeumorphCardView>



        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/bmi_info"
            style="@style/TitleTextStyle"
            android:textSize="@dimen/_16ssp"
            android:layout_centerInParent="true"/>

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/info"
            android:layout_width="@dimen/_50sdp"
            android:layout_height="@dimen/_50sdp"
            android:scaleType="centerInside"
            android:layout_alignParentEnd="true"
            android:visibility="gone"
            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <ImageView
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:padding="@dimen/_8sdp"
                    android:src="@drawable/ic_info"
                    android:contentDescription="@string/back_button"/>

            </LinearLayout>


        </soup.neumorphism.NeumorphCardView>

    </RelativeLayout>

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/toolbar"
        android:layout_above="@+id/shareResult"
        android:fillViewport="true">
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:gravity="center_horizontal">

            <soup.neumorphism.NeumorphCardView
                android:id="@+id/bmiView"
                android:layout_width="match_parent"
                android:layout_height="@dimen/_100sdp"
                android:scaleType="centerInside"
                android:layout_marginTop="@dimen/_12sdp"
                app:layout_constraintBottom_toBottomOf="@+id/minusHeight"
                app:layout_constraintEnd_toStartOf="@+id/minusHeight"
                app:layout_constraintStart_toStartOf="parent"
                app:neumorph_shapeAppearance="@style/ShapeAppearance.Neumorph.CardView">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:weightSum="2">

                    <TextView
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:layout_weight="1"
                        android:text="Your BMI"
                        style="@style/RegularTextStyle"
                        android:paddingEnd="@dimen/_8sdp"
                        android:includeFontPadding="false"
                        android:gravity="center_vertical|end"
                        android:textColor="@color/yourBmiColor"
                        android:textSize="@dimen/_14ssp"/>

                    <TextView
                        android:id="@+id/detailBmiValue"
                        android:layout_width="wrap_content"
                        android:layout_height="match_parent"
                        android:text="24.53"
                        android:includeFontPadding="false"
                        android:textSize="@dimen/_30ssp"
                        android:fontFamily="@font/helvetica_neue_light"
                        style="@style/RegularTextStyle"
                        android:textColor="@color/infoColor"
                        android:gravity="center_vertical"/>

                    <TextView
                        android:id="@+id/detailStatus"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:layout_weight="1"
                        android:text="Normal"
                        android:includeFontPadding="false"
                        style="@style/RegularTextStyle"
                        android:paddingStart="@dimen/_8sdp"
                        android:gravity="center_vertical|start"
                        android:textColor="@color/yourBmiColor"
                        android:textSize="@dimen/_14ssp"/>

                </LinearLayout>


            </soup.neumorphism.NeumorphCardView>


            <soup.neumorphism.NeumorphCardView
                android:id="@+id/bmiRangeView"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:scaleType="centerInside"
                android:layout_marginTop="@dimen/_12sdp"
                app:layout_constraintBottom_toBottomOf="@+id/minusHeight"
                app:layout_constraintEnd_toStartOf="@+id/minusHeight"
                app:layout_constraintStart_toStartOf="parent"
                app:neumorph_shapeAppearance="@style/ShapeAppearance.Neumorph.CardView">


                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical"
                    android:padding="@dimen/_14sdp">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/less_than_16"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/severely_underweight"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/underweight_range"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/underweight"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/normal_range"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/normal"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/overweight_range"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/overweight"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/obese1_range"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/obesity_class_i"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/obese2_range"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/obesity_class_ii"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                    <View
                        android:layout_width="match_parent"
                        android:layout_height="@dimen/_1sdp"
                        android:layout_marginTop="@dimen/_10sdp"
                        android:layout_marginBottom="@dimen/_10sdp"
                        android:background="#80BDBDBD"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/greater_than_40"
                            style="@style/RegularTextStyle2"
                            android:textColor="@color/yourBmiColor"
                            android:layout_gravity="start"/>

                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="@string/obesity_class_iii"
                            style="@style/RegularTextStyle2"
                            android:gravity="end"/>
                    </LinearLayout>

                </LinearLayout>

            </soup.neumorphism.NeumorphCardView>

        </LinearLayout>


    </ScrollView>

    <soup.neumorphism.NeumorphCardView
        android:visibility="gone"
        android:id="@+id/shareResult"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_60sdp"
        android:layout_marginBottom="@dimen/_8sdp"
        android:layout_marginStart="@dimen/_40sdp"
        android:layout_marginEnd="@dimen/_40sdp"
        android:clickable="true"
        android:focusable="true"
        app:neumorph_backgroundColor="@color/colorSecondary"
        android:layout_alignParentBottom="true">

        <TextView
            style="@style/RegularTextStyle"
            android:layout_gravity="center"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:text="@string/share_result"
            android:textColor="@color/lightColor"
            android:textAllCaps="false" />
    </soup.neumorphism.NeumorphCardView>

</RelativeLayout>
```

**(d). `activity_info.xml`**

> Our `activity_info` layout.

This layout will represent our Info Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`NeumorphCardView`](https://android.examples.directory/neumorphcardview)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`ScrollView`](https://android.examples.directory/scrollview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    style="@style/ScreenBackground"
    android:orientation="vertical"
    android:paddingTop="@dimen/_16sdp"
    android:paddingLeft="@dimen/_6sdp"
    android:paddingRight="@dimen/_6sdp"
    android:paddingBottom="@dimen/_6sdp"
    tools:context=".ui.InfoActivity">

    <RelativeLayout
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_50sdp"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/back"
            android:layout_width="@dimen/_50sdp"
            android:layout_height="@dimen/_50sdp"
            android:scaleType="centerInside"
            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <ImageView
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:padding="@dimen/_10sdp"
                    android:src="@drawable/ic_back_arrow"
                    android:contentDescription="@string/back_button"/>

            </LinearLayout>


        </soup.neumorphism.NeumorphCardView>



        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/about"
            style="@style/TitleTextStyle"
            android:textSize="@dimen/_16ssp"
            android:layout_centerInParent="true"/>

    </RelativeLayout>


    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/toolbar">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent">

            <TextView
                android:id="@+id/tvAbout"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                style="@style/RegularTextStyle"
                android:text="@string/aboutContent"/>


        </LinearLayout>


    </ScrollView>

</RelativeLayout>
```

**(e). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`LinearLayout`](https://android.examples.directory/linearlayout)
5. [`NeumorphCardView`](https://android.examples.directory/neumorphcardview)
6. [`Guideline`](https://android.examples.directory/guideline)
7. [`VerticalSeekbar`](https://android.examples.directory/verticalseekbar)
8. [`EditText`](https://android.examples.directory/edittext)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/ScreenBackground"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="@dimen/_24sdp"
    android:paddingLeft="@dimen/_6sdp"
    android:paddingRight="@dimen/_6sdp"
    android:paddingBottom="@dimen/_6sdp"
    tools:context=".ui.MainActivity">

    <RelativeLayout
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="@dimen/_8sdp"
        android:layout_marginStart="@dimen/_8sdp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            style="@style/TitleTextStyle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="start"
            android:textSize="@dimen/_16ssp"
            android:text="@string/bmi_calculator"/>

        <ImageView
            android:id="@+id/light_mode"
            android:layout_width="@dimen/_25sdp"
            android:layout_height="@dimen/_25sdp"
            android:layout_alignParentEnd="true"
            android:visibility="gone"
            android:src="@drawable/ic_moon_dark"/>

    </RelativeLayout>



    <LinearLayout
        android:id="@+id/linearLayout2"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_60sdp"
        android:layout_marginTop="@dimen/_16sdp"
        android:orientation="horizontal"
        app:layout_constraintTop_toBottomOf="@+id/textView">

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/maleCard"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center"
            android:clickable="true"
            android:focusable="true">

            <LinearLayout
                android:id="@+id/male"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="horizontal"
                android:background="@drawable/card_bg"
                android:backgroundTint="@color/colorSecondary">

                <ImageView
                    android:id="@+id/maleIcon"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:padding="@dimen/_5sdp"
                    android:src="@drawable/ic_male_1"
                    android:tint="@color/lightColor"
                    android:contentDescription="@string/male"/>

                <TextView
                    android:id="@+id/maleText"
                    style="@style/RegularTextStyle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="@dimen/_5sdp"
                    android:textColor="@color/lightColor"
                    android:text="@string/male" />

            </LinearLayout>

        </soup.neumorphism.NeumorphCardView>

        <soup.neumorphism.NeumorphCardView
            android:id="@+id/femaleCard"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center"
            android:clickable="true"
            android:focusable="true">

            <LinearLayout
                android:id="@+id/female"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center"
                android:orientation="horizontal"
                android:background="@drawable/card_bg"
                android:backgroundTint="@color/colorPrimary">

                <ImageView
                    android:id="@+id/femaleIcon"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:padding="@dimen/_5sdp"
                    android:src="@drawable/ic_female_1"
                    android:contentDescription="@string/female"/>

                <TextView
                    android:id="@+id/femaleText"
                    style="@style/RegularTextStyle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="@dimen/_5sdp"
                    android:text="@string/female" />

            </LinearLayout>


        </soup.neumorphism.NeumorphCardView>
    </LinearLayout>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/constraintLayout"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:weightSum="2"
        android:layout_marginTop="@dimen/_8sdp"
        android:layout_marginBottom="@dimen/_8sdp"
        app:layout_constraintBottom_toTopOf="@+id/calculateBmi"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout2">


        <androidx.constraintlayout.widget.Guideline
            android:id="@+id/guideline_center"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            app:layout_constraintGuide_percent=".5" />

        <soup.neumorphism.NeumorphCardView
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_weight="1"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/guideline_center"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:neumorph_strokeWidth="@dimen/_2sdp">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center_horizontal"
                android:padding="@dimen/_8sdp">


                <TextView
                    android:id="@+id/titleHeight"
                    style="@style/RegularTextStyle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/_4sdp"
                    android:text="@string/height"
                    android:textColor="@color/md_grey_600"
                    android:textSize="@dimen/_14ssp"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />


                <com.hadi.bmicalculator.utils.VerticalSeekbar
                    android:id="@+id/seekbar"
                    android:layout_width="wrap_content"
                    android:layout_height="0dp"
                    android:progress="160"
                    android:progressDrawable="@drawable/seekbar_style"
                    android:thumb="@drawable/custom_thumb"
                    android:splitTrack="false"
                    android:min="1"
                    android:max="250"
                    android:layout_marginTop="@dimen/_4sdp"
                    android:layout_marginBottom="@dimen/_4sdp"
                    app:layout_constraintBottom_toTopOf="@+id/valueHeight"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toBottomOf="@+id/titleHeight" />

                <TextView
                    android:id="@+id/valueHeight"
                    style="@style/RegularTextStyle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_alignParentBottom="true"
                    android:layout_marginBottom="@dimen/_4sdp"
                    android:text="@string/temp_height"
                    android:textSize="@dimen/_15ssp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toStartOf="parent" />


            </androidx.constraintlayout.widget.ConstraintLayout>

        </soup.neumorphism.NeumorphCardView>


        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="@+id/guideline_center"
            app:layout_constraintTop_toTopOf="parent">

            <androidx.constraintlayout.widget.Guideline
                android:id="@+id/guideline3"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:orientation="horizontal"
                app:layout_constraintGuide_percent="0.5" />

            <soup.neumorphism.NeumorphCardView
                android:layout_width="match_parent"
                android:layout_height="0dp"
                app:layout_constraintBottom_toTopOf="@+id/guideline3"
                app:layout_constraintTop_toTopOf="parent">

                <androidx.constraintlayout.widget.ConstraintLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:gravity="center_horizontal"
                    android:padding="@dimen/_8sdp">

                    <TextView
                        android:id="@+id/titleWeight"
                        style="@style/RegularTextStyle"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="@dimen/_4sdp"
                        android:text="@string/weight"
                        android:textColor="@color/md_grey_600"
                        android:textSize="@dimen/_14ssp"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent"
                        app:layout_constraintTop_toTopOf="parent" />


                    <EditText
                        android:id="@+id/valueWeight"
                        style="@style/RegularTextStyle"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_alignParentBottom="true"
                        android:background="@android:color/transparent"
                        android:cursorVisible="false"
                        android:gravity="center"
                        android:imeOptions="actionDone"
                        android:includeFontPadding="false"
                        android:inputType="number"
                        android:maxLength="3"
                        android:minWidth="@dimen/_20sdp"
                        android:singleLine="true"
                        android:text="@string/temp_weight"
                        android:textSize="@dimen/_32ssp"
                        app:layout_constraintBottom_toTopOf="@+id/linearLayout"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent"
                        app:layout_constraintTop_toBottomOf="@+id/titleWeight" />

                    <TextView
                        style="@style/RegularTextStyle"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="4dp"
                        android:includeFontPadding="false"
                        android:text="@string/kg"
                        app:layout_constraintBottom_toBottomOf="@+id/valueWeight"
                        app:layout_constraintStart_toEndOf="@+id/valueWeight"
                        app:layout_constraintTop_toTopOf="@+id/valueWeight"
                        app:layout_constraintVertical_bias="0.68" />

                    <LinearLayout
                        android:id="@+id/linearLayout"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal"
                        android:layout_marginBottom="@dimen/_4sdp"
                        app:layout_constraintBottom_toBottomOf="parent"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent">

                        <soup.neumorphism.NeumorphCardView
                            android:id="@+id/plusWeight"
                            android:layout_width="@dimen/_50sdp"
                            android:layout_height="@dimen/_50sdp"
                            android:scaleType="centerInside"
                            app:layout_constraintBottom_toBottomOf="@+id/minusHeight"
                            app:layout_constraintEnd_toStartOf="@+id/minusHeight"
                            app:layout_constraintStart_toStartOf="parent"
                            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent">

                                <ImageView
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:padding="@dimen/_10sdp"
                                    android:src="@drawable/ic_plus" />


                            </LinearLayout>


                        </soup.neumorphism.NeumorphCardView>

                        <soup.neumorphism.NeumorphCardView
                            android:id="@+id/minusWeight"
                            android:layout_width="@dimen/_50sdp"
                            android:layout_height="@dimen/_50sdp"
                            android:scaleType="centerInside"
                            app:layout_constraintBottom_toBottomOf="parent"
                            app:layout_constraintEnd_toEndOf="parent"
                            app:layout_constraintTop_toBottomOf="@+id/valueWeight"
                            app:layout_constraintVertical_bias="1.0"
                            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent">

                                <ImageView
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:padding="@dimen/_10sdp"
                                    android:src="@drawable/ic_minus" />


                            </LinearLayout>


                        </soup.neumorphism.NeumorphCardView>

                    </LinearLayout>



                </androidx.constraintlayout.widget.ConstraintLayout>


            </soup.neumorphism.NeumorphCardView>


            <soup.neumorphism.NeumorphCardView
                android:layout_width="match_parent"
                android:layout_height="0dp"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="@+id/guideline3">

                <androidx.constraintlayout.widget.ConstraintLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:gravity="center_horizontal"
                    android:padding="@dimen/_8sdp">

                    <TextView
                        android:id="@+id/titleAge"
                        style="@style/RegularTextStyle"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="@dimen/_4sdp"
                        android:text="@string/age"
                        android:textColor="@color/md_grey_600"
                        android:textSize="@dimen/_14ssp"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent"
                        app:layout_constraintTop_toTopOf="parent" />


                    <EditText
                        android:id="@+id/valueAge"
                        style="@style/RegularTextStyle"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:minWidth="@dimen/_50sdp"
                        android:gravity="center"
                        android:layout_alignParentBottom="true"
                        android:text="@string/temp_age"
                        android:imeOptions="actionDone"
                        android:singleLine="true"
                        android:inputType="number"
                        android:maxLength="3"
                        android:textSize="@dimen/_32ssp"
                        android:background="@android:color/transparent"
                        app:layout_constraintBottom_toTopOf="@+id/linearLayoutAge"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent"
                        app:layout_constraintTop_toBottomOf="@+id/titleAge" />

                    <LinearLayout
                        android:id="@+id/linearLayoutAge"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal"
                        android:layout_marginBottom="@dimen/_4sdp"
                        app:layout_constraintBottom_toBottomOf="parent"
                        app:layout_constraintEnd_toEndOf="parent"
                        app:layout_constraintStart_toStartOf="parent">

                        <soup.neumorphism.NeumorphCardView
                            android:id="@+id/plusAge"
                            android:layout_width="@dimen/_50sdp"
                            android:layout_height="@dimen/_50sdp"
                            android:scaleType="centerInside"
                            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent">

                                <ImageView
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:padding="@dimen/_10sdp"
                                    android:src="@drawable/ic_plus" />


                            </LinearLayout>


                        </soup.neumorphism.NeumorphCardView>

                        <soup.neumorphism.NeumorphCardView
                            android:id="@+id/minusAge"
                            android:layout_width="@dimen/_50sdp"
                            android:layout_height="@dimen/_50sdp"
                            android:scaleType="centerInside"
                            app:neumorph_shapeAppearance="@style/CustomShapeAppearance">

                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="match_parent">

                                <ImageView
                                    android:layout_width="match_parent"
                                    android:layout_height="match_parent"
                                    android:padding="@dimen/_10sdp"
                                    android:src="@drawable/ic_minus" />


                            </LinearLayout>


                        </soup.neumorphism.NeumorphCardView>

                    </LinearLayout>



                </androidx.constraintlayout.widget.ConstraintLayout>



            </soup.neumorphism.NeumorphCardView>




        </androidx.constraintlayout.widget.ConstraintLayout>


    </androidx.constraintlayout.widget.ConstraintLayout>


    <soup.neumorphism.NeumorphCardView
        android:id="@+id/calculateBmi"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_60sdp"
        android:layout_marginBottom="@dimen/_8sdp"
        android:clickable="true"
        android:focusable="true"
        app:neumorph_backgroundColor="@color/colorSecondary"
        app:layout_constraintBottom_toBottomOf="parent">

        <TextView
            style="@style/RegularTextStyle"
            android:layout_gravity="center"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:textColor="@color/lightColor"
            android:text="@string/let_s_begin"
            android:textAllCaps="false" />
    </soup.neumorphism.NeumorphCardView>


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `VerticalSeekbar.java`**

> Our `VerticalSeekbar` class.

Create a java file named `VerticalSeekbar.java`.

Inside it create a class that extends `AppCompatSeekBar` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `Canvas` from the `android.graphics` package.
3. `AttributeSet` from the `android.util` package.
4. `MotionEvent` from the `android.view` package.
5. `AppCompatSeekBar` from the `androidx.appcompat.widget` package.

We will be overriding the following methods: 

1. `onMeasure(int`.
2. `onTouchEvent(MotionEvent`.

We will be creating the following methods:

1. `onSizeChanged(int w, int h, int oldw, int oldh)`.

2. `onDraw(Canvas c)`.

**(a). Our `onDraw()` method.**

A method to on draw:

```java
    protected void onDraw(Canvas c) {
        c.rotate(-90);
        c.translate(-getHeight(), 0);

        super.onDraw(c);
    }
```

**(b). Our `onSizeChanged()` method.**

A method to on size changed:

```java
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(h, w, oldh, oldw);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.view.MotionEvent;
import androidx.appcompat.widget.AppCompatSeekBar;

public class VerticalSeekbar extends AppCompatSeekBar {

    public VerticalSeekbar(Context context) {
        super(context);
    }

    public VerticalSeekbar(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public VerticalSeekbar(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(h, w, oldh, oldw);
    }

    @Override
    protected synchronized void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(heightMeasureSpec, widthMeasureSpec);
        setMeasuredDimension(getMeasuredHeight(), getMeasuredWidth());
    }

    protected void onDraw(Canvas c) {
        c.rotate(-90);
        c.translate(-getHeight(), 0);

        super.onDraw(c);
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (!isEnabled()) {
            return false;
        }

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
            case MotionEvent.ACTION_MOVE:
            case MotionEvent.ACTION_UP:
                setProgress(getMax() - (int) (getMax() * event.getY() / getHeight()));
                onSizeChanged(getWidth(), getHeight(), 0, 0);
                break;

            case MotionEvent.ACTION_CANCEL:
                break;
        }
        return true;
    }
}


```

**(b). `CircleProgressBar.java`**

> Our `CircleProgressBar` class.

Create a java file named `CircleProgressBar.java`.

Inside it create a class that extends `View` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `ObjectAnimator` from the `android.animation` package.
2. `Context` from the `android.content` package.
3. `TypedArray` from the `android.content.res` package.
4. `Canvas` from the `android.graphics` package.
5. `Color` from the `android.graphics` package.
6. `Paint` from the `android.graphics` package.
7. `RectF` from the `android.graphics` package.
8. `AttributeSet` from the `android.util` package.
9. `View` from the `android.view` package.
10. `DecelerateInterpolator` from the `android.view.animation` package.
11. `ColorRes` from the `androidx.annotation` package.

We will be overriding the following methods: 

1. `onDraw(Canvas`.
2. `onMeasure(int`.

We will be creating the following methods:

1. `getStrokeWidth()` - It will return `float` object.

2. `setStrokeWidth(float strokeWidth)`.

3. `setProgressColor(@ColorRes int progressColor)`.

4. `getProgress()` - It will return `float` object.

5. `setProgress(float progress)`.

6. `getMin()` - It will return `int` object.

7. `setMin(int min)`.

8. `getMax()` - It will return `int` object.

9. `setMax(int max)`.

10. `getColor()` - It will return `int` object.

11. `setColor(int color)`.

12. `init(Context context, AttributeSet attrs)`.

13. `lightenColor(int color, float factor)` - It will return `int` object.

14. `adjustAlpha(int color, float factor)` - It will return `int` object.

15. `setProgressWithAnimation(float progress)`.

**(a). Our `setProgressColor()` method.**

A method to set progress color:

```java
    public void setProgressColor(@ColorRes int progressColor){

        color = progressColor;
    }
```

**(b). Our `setProgressWithAnimation()` method.**

A method to set progress with animation:

```java
    public void setProgressWithAnimation(float progress) {

        ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(this, "progress", progress);
        objectAnimator.setDuration(1000);
        objectAnimator.setInterpolator(new DecelerateInterpolator());
        objectAnimator.start();
    }
```

**(c). Our `getMin()` method.**

A method to get min:

```java
    public int getMin() {
        return min;
    }
```

**(d). Our `getColor()` method.**

A method to get color:

```java
    public int getColor() {
        return color;
    }
```

**(e). Our `setMin()` method.**

A method to set min:

```java
    public void setMin(int min) {
        this.min = min;
        invalidate();
    }
```

**(f). Our `getStrokeWidth()` method.**

A method to get stroke width:

```java
    public float getStrokeWidth() {
        return strokeWidth;
    }
```

**(g). Our `lightenColor()` method.**

A method to lighten color:

```java
    public int lightenColor(int color, float factor) {
        float r = Color.red(color) * factor;
        float g = Color.green(color) * factor;
        float b = Color.blue(color) * factor;
        int ir = Math.min(255, (int) r);
        int ig = Math.min(255, (int) g);
        int ib = Math.min(255, (int) b);
        int ia = Color.alpha(color);
        return (Color.argb(ia, ir, ig, ib));
    }
```

**(h). Our `init()` method.**

Write this method as follows:

```java
    private void init(Context context, AttributeSet attrs) {
        rectF = new RectF();
        TypedArray typedArray = context.getTheme().obtainStyledAttributes(
                attrs,
                R.styleable.CircleProgressBar,
                0, 0);
        //Reading values from the XML layout
        try {
            strokeWidth = typedArray.getDimension(R.styleable.CircleProgressBar_progressBarThickness, strokeWidth);
            progress = typedArray.getFloat(R.styleable.CircleProgressBar_progress, progress);
            color = typedArray.getInt(R.styleable.CircleProgressBar_progressbarColor, color);
            min = typedArray.getInt(R.styleable.CircleProgressBar_min, min);
            max = typedArray.getInt(R.styleable.CircleProgressBar_max, max);
        } finally {
            typedArray.recycle();
        }

        backgroundPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        backgroundPaint.setColor(adjustAlpha(color, 0.3f));
        backgroundPaint.setStyle(Paint.Style.STROKE);
        backgroundPaint.setStrokeWidth(strokeWidth);

        foregroundPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        foregroundPaint.setColor(color);
        foregroundPaint.setStyle(Paint.Style.STROKE);
        foregroundPaint.setStrokeWidth(strokeWidth);
    }
```

**(i). Our `setProgress()` method.**

A method to set progress:

```java
    public void setProgress(float progress) {
        this.progress = progress;
        invalidate();
    }
```

**(j). Our `setStrokeWidth()` method.**

A method to set stroke width:

```java
    public void setStrokeWidth(float strokeWidth) {
        this.strokeWidth = strokeWidth;
        backgroundPaint.setStrokeWidth(strokeWidth);
        foregroundPaint.setStrokeWidth(strokeWidth);
        invalidate();
        requestLayout();//Because it should recalculate its bounds
    }
```

**(k). Our `setColor()` method.**

A method to set color:

```java
    public void setColor(int color) {
        this.color = color;
        backgroundPaint.setColor(adjustAlpha(color, 0.3f));
        foregroundPaint.setColor(color);
        invalidate();
        requestLayout();
    }
```

**(m). Our `getProgress()` method.**

A method to get progress:

```java
    public float getProgress() {
        return progress;
    }
```

**(n). Our `getMax()` method.**

A method to get max:

```java
    public int getMax() {
        return max;
    }
```

**(o). Our `setMax()` method.**

A method to set max:

```java
    public void setMax(int max) {
        this.max = max;
        invalidate();
    }
```

**(p). Our `adjustAlpha()` method.**

A method to adjust alpha:

```java
    public int adjustAlpha(int color, float factor) {
        int alpha = Math.round(Color.alpha(color) * factor);
        int red = Color.red(color);
        int green = Color.green(color);
        int blue = Color.blue(color);
        return Color.argb(alpha, red, green, blue);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.animation.ObjectAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.DecelerateInterpolator;

import androidx.annotation.ColorRes;

import com.hadi.bmicalculator.R;

public class CircleProgressBar extends View {


    /**
     * ProgressBar's line thickness
     */
    private float strokeWidth = 4;
    private float progress = 0;
    private int min = 0;
    private int max = 100;
    /**
     * Start the progress at 12 o'clock
     */
    private int startAngle = -90;
    private int color = Color.DKGRAY;
    private RectF rectF;
    private Paint backgroundPaint;
    private Paint foregroundPaint;

    public float getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(float strokeWidth) {
        this.strokeWidth = strokeWidth;
        backgroundPaint.setStrokeWidth(strokeWidth);
        foregroundPaint.setStrokeWidth(strokeWidth);
        invalidate();
        requestLayout();//Because it should recalculate its bounds
    }

    public void setProgressColor(@ColorRes int progressColor){

        color = progressColor;
    }

    public float getProgress() {
        return progress;
    }

    public void setProgress(float progress) {
        this.progress = progress;
        invalidate();
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
        invalidate();
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
        invalidate();
    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
        backgroundPaint.setColor(adjustAlpha(color, 0.3f));
        foregroundPaint.setColor(color);
        invalidate();
        requestLayout();
    }

    public CircleProgressBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        rectF = new RectF();
        TypedArray typedArray = context.getTheme().obtainStyledAttributes(
                attrs,
                R.styleable.CircleProgressBar,
                0, 0);
        //Reading values from the XML layout
        try {
            strokeWidth = typedArray.getDimension(R.styleable.CircleProgressBar_progressBarThickness, strokeWidth);
            progress = typedArray.getFloat(R.styleable.CircleProgressBar_progress, progress);
            color = typedArray.getInt(R.styleable.CircleProgressBar_progressbarColor, color);
            min = typedArray.getInt(R.styleable.CircleProgressBar_min, min);
            max = typedArray.getInt(R.styleable.CircleProgressBar_max, max);
        } finally {
            typedArray.recycle();
        }

        backgroundPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        backgroundPaint.setColor(adjustAlpha(color, 0.3f));
        backgroundPaint.setStyle(Paint.Style.STROKE);
        backgroundPaint.setStrokeWidth(strokeWidth);

        foregroundPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        foregroundPaint.setColor(color);
        foregroundPaint.setStyle(Paint.Style.STROKE);
        foregroundPaint.setStrokeWidth(strokeWidth);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawOval(rectF, backgroundPaint);
        float angle = 360 * progress / max;
        canvas.drawArc(rectF, startAngle, angle, false, foregroundPaint);

    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {

        final int height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        final int width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        final int min = Math.min(width, height);
        setMeasuredDimension(min, min);
        rectF.set(0 + strokeWidth / 2, 0 + strokeWidth / 2, min - strokeWidth / 2, min - strokeWidth / 2);
    }

    /**
     * Lighten the given color by the factor
     *
     * @param color  The color to lighten
     * @param factor 0 to 4
     * @return A brighter color
     */
    public int lightenColor(int color, float factor) {
        float r = Color.red(color) * factor;
        float g = Color.green(color) * factor;
        float b = Color.blue(color) * factor;
        int ir = Math.min(255, (int) r);
        int ig = Math.min(255, (int) g);
        int ib = Math.min(255, (int) b);
        int ia = Color.alpha(color);
        return (Color.argb(ia, ir, ig, ib));
    }

    /**
     * Transparent the given color by the factor
     * The more the factor closer to zero the more the color gets transparent
     *
     * @param color  The color to transparent
     * @param factor 1.0f to 0.0f
     * @return int - A transplanted color
     */
    public int adjustAlpha(int color, float factor) {
        int alpha = Math.round(Color.alpha(color) * factor);
        int red = Color.red(color);
        int green = Color.green(color);
        int blue = Color.blue(color);
        return Color.argb(alpha, red, green, blue);
    }

    /**
     * Set the progress with an animation.
     * Note that the {@link android.animation.ObjectAnimator} Class automatically set the progress
     * so don't call the {@link CircleProgressBar#setProgress(float)} directly within this method.
     *
     * @param progress The progress it should animate to it.
     */
    public void setProgressWithAnimation(float progress) {

        ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(this, "progress", progress);
        objectAnimator.setDuration(1000);
        objectAnimator.setInterpolator(new DecelerateInterpolator());
        objectAnimator.start();
    }
}


```

**(c). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Bundle` from the `android.os` package.
4. `CountDownTimer` from the `android.os` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onFinish() `.
3. `onTick(millisUntilFinished: Long) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import com.hadi.bmicalculator.R

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        val timer = object : CountDownTimer(1500,1000){
            override fun onFinish() {
                startActivity(Intent(this@SplashActivity,
                    MainActivity::class.java))
                finish()
                overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
            }

            override fun onTick(millisUntilFinished: Long) {

            }
        }

        timer.start()
    }
}


```


**(d). `ResultsActivity.kt`**

> Our `ResultsActivity` class.

Create a Kotlin file named `ResultsActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `DecelerateInterpolator` from the `android.view.animation` package.
3. `Toast` from the `android.widget` package.
4. `ContextCompat` from the `androidx.core.content` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_results` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `finish() `.

Then we will be creating the following functions:

1. `init()`.
2. `interpretBMI(parameter)` - We pass a `Float` object as a parameter.

**(a). Our `init()` function.**

Write this function as follows:

```kotlin
    private fun init(){

        var bmi_ = intent.getStringExtra("BMI_VALUE")
        bmiValue = bmi_.toFloat()

        //Toast.makeText(this,"$bmiValue",Toast.LENGTH_SHORT).show()


        back.setOnClickListener {
            finish()
        }



        progress.max = 25
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            progress.setProgress(bmiValue.toInt(),true)
        }else{
            progress.setProgress(bmiValue.toInt())
        }

//        progressAnimator = ObjectAnimator.ofInt(progress,"progress",bmiValue.toInt())
//        progressAnimator.duration = 1000
//        progressAnimator.setInterpolator(DecelerateInterpolator());
//        progressAnimator.start()


        tvBmiValue.text = bmiValue.toString()

        tvBmiStatus.text = interpretBMI(bmiValue)


        showDetails.setOnClickListener {
            val intent = Intent(this,DetailsActivity::class.java)
            intent.putExtra("BMI_VALUE",bmiValue)
            startActivity(intent)
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
        }

    }
```

**(b). Our `interpretBMI()` function.**

A function to interpret b m i:

```kotlin
    fun interpretBMI(bmiValue: Float): String {
        if (bmiValue < 16) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.severeUnderWeight))
            return "You are Severely Underweight"
        } else if (bmiValue < 18.5) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.underWeight))
            return "You are Underweight"
        } else if (bmiValue < 25) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.normalWeight))
            return "You have Normal Body Weight"
        } else if (bmiValue < 30) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.md_amber_600))
            return "You are Overweight"
        } else if (bmiValue < 35) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass1))
            return "You have Obesity Class I"
        } else if (bmiValue < 40) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass2))
            return "You have Obesity Class II"
        }else{
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass3))
            return "You have Obesity Class III"
        }

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.animation.ObjectAnimator
import android.content.Intent
import android.content.res.ColorStateList
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.animation.DecelerateInterpolator
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.hadi.bmicalculator.R
import kotlinx.android.synthetic.main.activity_results.*

class ResultsActivity : AppCompatActivity() {

    var bmiValue = 0F
    lateinit var progressAnimator: ObjectAnimator


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_results)

        init()
    }

    private fun init(){

        var bmi_ = intent.getStringExtra("BMI_VALUE")
        bmiValue = bmi_.toFloat()

        //Toast.makeText(this,"$bmiValue",Toast.LENGTH_SHORT).show()


        back.setOnClickListener {
            finish()
        }



        progress.max = 25
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            progress.setProgress(bmiValue.toInt(),true)
        }else{
            progress.setProgress(bmiValue.toInt())
        }

//        progressAnimator = ObjectAnimator.ofInt(progress,"progress",bmiValue.toInt())
//        progressAnimator.duration = 1000
//        progressAnimator.setInterpolator(DecelerateInterpolator());
//        progressAnimator.start()


        tvBmiValue.text = bmiValue.toString()

        tvBmiStatus.text = interpretBMI(bmiValue)


        showDetails.setOnClickListener {
            val intent = Intent(this,DetailsActivity::class.java)
            intent.putExtra("BMI_VALUE",bmiValue)
            startActivity(intent)
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
        }

    }

    fun interpretBMI(bmiValue: Float): String {
        if (bmiValue < 16) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.severeUnderWeight))
            return "You are Severely Underweight"
        } else if (bmiValue < 18.5) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.underWeight))
            return "You are Underweight"
        } else if (bmiValue < 25) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.normalWeight))
            return "You have Normal Body Weight"
        } else if (bmiValue < 30) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.md_amber_600))
            return "You are Overweight"
        } else if (bmiValue < 35) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass1))
            return "You have Obesity Class I"
        } else if (bmiValue < 40) {
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass2))
            return "You have Obesity Class II"
        }else{
            progress.progressTintList = ColorStateList.valueOf(ContextCompat.getColor(this,R.color.obesityClass3))
            return "You have Obesity Class III"
        }

    }

    override fun finish() {
        super.finish()
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right)
    }


}


```


**(e). `InfoActivity.kt`**

> Our `InfoActivity` class.

Create a Kotlin file named `InfoActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.hadi.bmicalculator.R

class InfoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_info)
    }
}


```


**(f). `DetailsActivity.kt`**

> Our `DetailsActivity` class.

Create a Kotlin file named `DetailsActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_details` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `finish() `.

Then we will be creating the following functions:

1. `init()`.
2. `interpretBMI(parameter)` - We pass a `Float` object as a parameter.

**(a). Our `init()` function.**

Write this function as follows:

```kotlin
    fun init(){

        val bmi = intent.getFloatExtra("BMI_VALUE",24.53F)
        detailBmiValue.text = bmi.toString()
        detailStatus.text = interpretBMI(bmi)


        back.setOnClickListener {
            finish()
        }
    }
```

**(b). Our `interpretBMI()` function.**

A function to interpret b m i:

```kotlin
    fun interpretBMI(bmiValue: Float): String {
        if (bmiValue < 16) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.severeUnderWeight))
            return "Severely Underweight"
        } else if (bmiValue < 18.5) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.underWeight))
            return "Underweight"
        } else if (bmiValue < 25) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.normalWeight))
            return "Normal"
        } else if (bmiValue < 30) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.overWeight))
            return "Overweight"
        } else if (bmiValue < 35) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass1))
            return "Obesity Class I"
        } else if (bmiValue < 40) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass2))
            return "Obesity Class II"
        }else{
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass3))
            return "Obesity Class III"
        }

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.content.ContextCompat
import com.hadi.bmicalculator.R
import kotlinx.android.synthetic.main.activity_details.*

class DetailsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_details)

        init()
    }

    fun init(){

        val bmi = intent.getFloatExtra("BMI_VALUE",24.53F)
        detailBmiValue.text = bmi.toString()
        detailStatus.text = interpretBMI(bmi)


        back.setOnClickListener {
            finish()
        }
    }


    fun interpretBMI(bmiValue: Float): String {
        if (bmiValue < 16) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.severeUnderWeight))
            return "Severely Underweight"
        } else if (bmiValue < 18.5) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.underWeight))
            return "Underweight"
        } else if (bmiValue < 25) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.normalWeight))
            return "Normal"
        } else if (bmiValue < 30) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.overWeight))
            return "Overweight"
        } else if (bmiValue < 35) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass1))
            return "Obesity Class I"
        } else if (bmiValue < 40) {
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass2))
            return "Obesity Class II"
        }else{
            detailStatus.setTextColor(ContextCompat.getColor(this,R.color.obesityClass3))
            return "Obesity Class III"
        }

    }

    override fun finish() {
        super.finish()
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right)
    }
}


```


**(g). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TextView` from the `android.widget` package.
2. `Toast` from the `android.widget` package.
3. `AppCompatDelegate` from the `androidx.appcompat.app` package.
4. `ContextCompat` from the `androidx.core.content` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onEditorAction(v: TextView?, actionId: Int, event: KeyEvent?): Boolean `.
3. `onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) `.
4. `onStartTrackingTouch(seekBar: SeekBar?) `.
5. `onStopTrackingTouch(seekBar: SeekBar?) `.

Then we will be creating the following functions:

1. `init() `.
2. `bmi_calc(height: Float, weight: Float): Float `.

**(a). Our `bmi_calc()` function.**

Write this function as follows:

```kotlin
    fun bmi_calc(height: Float, weight: Float): Float {

        var heightInMeter = height/100

        var bmi_Val = weight / (heightInMeter * heightInMeter)
        return bmi_Val
    }
```

**(b). Our `init()` function.**

Write this function as follows:

```kotlin
    fun init() {

//        if(delegate.localNightMode == AppCompatDelegate.MODE_NIGHT_YES){
//            light_mode.setImageResource(R.drawable.ic_light)
//        }else{
//            light_mode.setImageResource(R.drawable.ic_moon_dark)
//        }


        maleCard.setOnClickListener {
            male.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorSecondary
                ))
            female.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorPrimary
                ))


            maleText.setTextColor(ContextCompat.getColor(this,R.color.lightColor))
            maleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.lightColor
            ))

            femaleText.setTextColor(ContextCompat.getColor(this,R.color.black))
            femaleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.black
            ))


            gender = "Male"

            //Toast.makeText(this, gender, Toast.LENGTH_SHORT).show()
        }

        femaleCard.setOnClickListener {
            male.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorPrimary
                ))

            maleText.setTextColor(ContextCompat.getColor(this,R.color.black))
            maleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.black
            ))

            femaleText.setTextColor(ContextCompat.getColor(this,R.color.lightColor))
            femaleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.lightColor
            ))


            female.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorSecondary
                ))


            gender = "Female"

            //Toast.makeText(this, gender, Toast.LENGTH_SHORT).show()
        }

        valueWeight.setOnClickListener {
            valueWeight.isCursorVisible = true
        }

        valueAge.setOnClickListener {
            valueAge.isCursorVisible = true
        }

        valueWeight.setOnEditorActionListener(object : TextView.OnEditorActionListener {
            override fun onEditorAction(v: TextView?, actionId: Int, event: KeyEvent?): Boolean {
                valueWeight.isCursorVisible = false
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    valueWeight.isCursorVisible = false

                    if (valueWeight.text.toString().isEmpty() || valueWeight.text.toString().toInt() == 0)  {
                        weight = 75
                        valueWeight.setText(weight.toString())
                    } else {
                        weight = valueWeight.text.toString().toInt()
                    }
                }

                return false
            }
        })

        valueAge.setOnEditorActionListener(object : TextView.OnEditorActionListener {
            override fun onEditorAction(v: TextView?, actionId: Int, event: KeyEvent?): Boolean {
                valueAge.isCursorVisible = false
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    valueAge.isCursorVisible = false


                    if (valueAge.text.toString().isEmpty() || valueAge.text.toString().toInt() == 0) {
                        age = 25
                        valueAge.setText(age.toString())
                    } else {
                        age = valueAge.text.toString().toInt()
                    }
                }

                return false
            }
        })

        plusWeight.setOnClickListener {
            if (weight < 999) {
                weight += 1
                valueWeight.setText(weight.toString())
            }
        }

        minusWeight.setOnClickListener {

            if (weight > 1) {
                weight -= 1
                valueWeight.setText(weight.toString())
            }
        }

        plusAge.setOnClickListener {
            if (age < 999) {
                age += 1
                valueAge.setText(age.toString())
            }
        }

        minusAge.setOnClickListener {
            if (age > 1) {
                age -= 1
                valueAge.setText(age.toString())
            }
        }

        seekbar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                height = progress
                valueHeight.text = "$progress cm"
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })

        calculateBmi.setOnClickListener {

            when {
                TextUtils.isEmpty(valueWeight.text.toString()) -> {
                    Toast.makeText(this,"Please enter correct Weight",Toast.LENGTH_SHORT).show()
                }
                TextUtils.isEmpty(valueAge.text.toString()) -> {
                    Toast.makeText(this,"Please enter correct Age",Toast.LENGTH_SHORT).show()
                }
                else -> {
                    age = valueAge.text.toString().toInt()
                    weight = valueWeight.text.toString().toInt()

                    var bmi = String.format("%.02f",bmi_calc(height.toFloat(),weight.toFloat()))

                    //Toast.makeText(this,"$height  $weight  $age $bmi",Toast.LENGTH_SHORT).show()

                    val intent =Intent(this,ResultsActivity::class.java)
                    intent.putExtra("BMI_VALUE",bmi)
                    startActivity(intent)
                    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                }
            }


        }

//        light_mode.setOnClickListener {
//
//            if(delegate.localNightMode == AppCompatDelegate.MODE_NIGHT_YES){
//                delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
//            }else{
//                delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
//            }
//        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.animation.ObjectAnimator
import android.content.Intent
import android.content.res.ColorStateList
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.view.KeyEvent
import android.view.inputmethod.EditorInfo
import android.widget.SeekBar
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.ContextCompat
import com.hadi.bmicalculator.R
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    var gender = "Male"
    var height = 175
    var weight = 75
    var age = 25



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

//        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)

        setContentView(R.layout.activity_main)

        init()

    }

    fun init() {

//        if(delegate.localNightMode == AppCompatDelegate.MODE_NIGHT_YES){
//            light_mode.setImageResource(R.drawable.ic_light)
//        }else{
//            light_mode.setImageResource(R.drawable.ic_moon_dark)
//        }


        maleCard.setOnClickListener {
            male.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorSecondary
                ))
            female.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorPrimary
                ))


            maleText.setTextColor(ContextCompat.getColor(this,R.color.lightColor))
            maleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.lightColor
            ))

            femaleText.setTextColor(ContextCompat.getColor(this,R.color.black))
            femaleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.black
            ))


            gender = "Male"

            //Toast.makeText(this, gender, Toast.LENGTH_SHORT).show()
        }

        femaleCard.setOnClickListener {
            male.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorPrimary
                ))

            maleText.setTextColor(ContextCompat.getColor(this,R.color.black))
            maleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.black
            ))

            femaleText.setTextColor(ContextCompat.getColor(this,R.color.lightColor))
            femaleIcon.imageTintList = ColorStateList.valueOf(ContextCompat.getColor(this,
                R.color.lightColor
            ))


            female.backgroundTintList =
                ColorStateList.valueOf(ContextCompat.getColor(this,
                    R.color.colorSecondary
                ))


            gender = "Female"

            //Toast.makeText(this, gender, Toast.LENGTH_SHORT).show()
        }

        valueWeight.setOnClickListener {
            valueWeight.isCursorVisible = true
        }

        valueAge.setOnClickListener {
            valueAge.isCursorVisible = true
        }

        valueWeight.setOnEditorActionListener(object : TextView.OnEditorActionListener {
            override fun onEditorAction(v: TextView?, actionId: Int, event: KeyEvent?): Boolean {
                valueWeight.isCursorVisible = false
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    valueWeight.isCursorVisible = false

                    if (valueWeight.text.toString().isEmpty() || valueWeight.text.toString().toInt() == 0)  {
                        weight = 75
                        valueWeight.setText(weight.toString())
                    } else {
                        weight = valueWeight.text.toString().toInt()
                    }
                }

                return false
            }
        })

        valueAge.setOnEditorActionListener(object : TextView.OnEditorActionListener {
            override fun onEditorAction(v: TextView?, actionId: Int, event: KeyEvent?): Boolean {
                valueAge.isCursorVisible = false
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    valueAge.isCursorVisible = false


                    if (valueAge.text.toString().isEmpty() || valueAge.text.toString().toInt() == 0) {
                        age = 25
                        valueAge.setText(age.toString())
                    } else {
                        age = valueAge.text.toString().toInt()
                    }
                }

                return false
            }
        })

        plusWeight.setOnClickListener {
            if (weight < 999) {
                weight += 1
                valueWeight.setText(weight.toString())
            }
        }

        minusWeight.setOnClickListener {

            if (weight > 1) {
                weight -= 1
                valueWeight.setText(weight.toString())
            }
        }

        plusAge.setOnClickListener {
            if (age < 999) {
                age += 1
                valueAge.setText(age.toString())
            }
        }

        minusAge.setOnClickListener {
            if (age > 1) {
                age -= 1
                valueAge.setText(age.toString())
            }
        }

        seekbar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                height = progress
                valueHeight.text = "$progress cm"
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })

        calculateBmi.setOnClickListener {

            when {
                TextUtils.isEmpty(valueWeight.text.toString()) -> {
                    Toast.makeText(this,"Please enter correct Weight",Toast.LENGTH_SHORT).show()
                }
                TextUtils.isEmpty(valueAge.text.toString()) -> {
                    Toast.makeText(this,"Please enter correct Age",Toast.LENGTH_SHORT).show()
                }
                else -> {
                    age = valueAge.text.toString().toInt()
                    weight = valueWeight.text.toString().toInt()

                    var bmi = String.format("%.02f",bmi_calc(height.toFloat(),weight.toFloat()))

                    //Toast.makeText(this,"$height  $weight  $age $bmi",Toast.LENGTH_SHORT).show()

                    val intent =Intent(this,ResultsActivity::class.java)
                    intent.putExtra("BMI_VALUE",bmi)
                    startActivity(intent)
                    overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                }
            }


        }

//        light_mode.setOnClickListener {
//
//            if(delegate.localNightMode == AppCompatDelegate.MODE_NIGHT_YES){
//                delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
//            }else{
//                delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
//                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
//            }
//        }
    }

    fun bmi_calc(height: Float, weight: Float): Float {

        var heightInMeter = height/100

        var bmi_Val = weight / (heightInMeter * heightInMeter)
        return bmi_Val
    }




}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/unaisulhadi/Neumorphic-BMI-App/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/unaisulhadi/Neumorphic-BMI-App).|
|3.|Follow code author [here](https://github.com/unaisulhadi).|
