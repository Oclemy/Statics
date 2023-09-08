# Inspire - Quotes App Retrofit

>  Inspire is an android application for Quotes. Users can view,share and save quotes..


Inspire is an android application for Quotes. Users can view,share and save quotes.

### Screenshot

![Inspire Example Tutorial](https://github.com/unaisulhadi/Inspire/raw/master/screenshot_inspire.jpg)


### DEMO

![Inspire Example Tutorial](https://github.com/unaisulhadi/Inspire/raw/master/DEMO.gif)


### Using

- Retrofit
- Room
- ViewPager2
- Lottie


Let us look at the full Inspire - Quotes App Retrofit code.

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

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 20 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

apply plugin: 'kotlin-kapt'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "com.hadi.inspire"
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
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {

    def room_version = "2.2.3"

    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation "androidx.viewpager2:viewpager2:1.0.0"
    implementation 'com.intuit.sdp:sdp-android:1.0.6'
    implementation 'com.google.android.material:material:1.0.0'
    //RETROFIT
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
    implementation 'com.squareup.retrofit2:converter-gson:2.6.2'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.2.1'

    implementation 'com.karumi:dexter:5.0.0'
    implementation 'com.airbnb.android:lottie:3.3.0'
    implementation 'org.apache.commons:commons-io:1.3.2'

    implementation "androidx.room:room-runtime:$room_version"
    kapt "androidx.room:room-compiler:$room_version"
    implementation "androidx.room:room-ktx:$room_version"
    implementation "androidx.room:room-rxjava2:$room_version"

    implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
    implementation 'io.reactivex.rxjava2:rxjava:2.2.17'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 4 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. Here we will add the following permission:

1. Our `ACCESS_NETWORK_STATE` permission.
2. Our `INTERNET` permission.
3. Our `WRITE_EXTERNAL_STORAGE` permission.
4. Our `READ_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.hadi.inspire">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="AllowBackup,GoogleAppIndexingWarning">
        <activity android:name=".Activity.SavedViewActivity"></activity>
        <activity
            android:name=".Activity.SavedActivity"
            android:theme="@style/AppTheme" />
        <activity
            android:name=".Activity.SplashActivity"
            android:theme="@style/AppTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".Activity.MainActivity"
            android:launchMode="singleTask"
            android:theme="@style/AppTheme.Transparent" />
    </application>

</manifest>
```
#### Step 3. Create [Animations](https://android.examples.directory/animation/)

Create a directory known as `anim` inside your `res` directory and add the following xml file:


**(a). `fade_out.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator">
    <alpha
        android:duration="2000"
        android:fromAlpha="1.0"
        android:toAlpha="0.1" >
    </alpha>
</set>
```

**(b). `fade_in.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" android:interpolator="@android:anim/linear_interpolator">
    <alpha
        android:duration="2000"
        android:fromAlpha="0.1"
        android:toAlpha="1.0">
    </alpha>
</set>
```

**(c). `animation_on.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha
        android:fromAlpha="0"
        android:toAlpha="1"
        android:duration="150" >
    </alpha>
</set>
```

**(d). `animation_off.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha
        android:startOffset="100"
        android:fromAlpha="1"
        android:toAlpha="0"
        android:duration="100" >
    </alpha>
</set>
```
#### Step 4. Design Layouts

For this project let's create the following layouts:


**(a). `popup_screen.xml`**

> Our `popup_screen` layout.

This layout will represent our Screen Popup's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/pop_bg"
    android:background="#80000000">


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/md_white_1000"
        android:layout_marginLeft="@dimen/_35sdp"
        android:layout_marginRight="@dimen/_35sdp"
        android:layout_marginTop="@dimen/_70sdp"
        android:layout_marginBottom="@dimen/_70sdp">

        <ImageView
            android:id="@+id/img_alert"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_margin="@dimen/_10sdp"
            android:scaleType="centerCrop"
            android:layout_above="@id/ll_share"/>


        <LinearLayout
            android:id="@+id/ll_share"
            android:layout_width="match_parent"
            android:layout_height="@dimen/_50sdp"
            android:layout_marginLeft="@dimen/_10sdp"
            android:layout_marginRight="@dimen/_10sdp"
            android:layout_marginBottom="@dimen/_10sdp"
            android:orientation="horizontal"
            android:layout_alignParentBottom="true">

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:gravity="center"
                android:layout_weight="1">

                <ImageView
                    android:id="@+id/wa"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:layout_margin="@dimen/_10sdp"
                    android:src="@drawable/ic_whatsapp"/>

            </LinearLayout>

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:gravity="center">

                <ImageView
                    android:id="@+id/insta"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:layout_margin="@dimen/_10sdp"
                    android:src="@drawable/ic_instagram_sketched"/>

            </LinearLayout>

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:gravity="center">

                <ImageView
                    android:id="@+id/dwnld"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:layout_margin="@dimen/_10sdp"
                    android:src="@drawable/ic_more" />

            </LinearLayout>

        </LinearLayout>


        <ImageView
            android:id="@+id/close"
            android:layout_width="@dimen/_30sdp"
            android:layout_height="@dimen/_30sdp"
            android:padding="@dimen/_8sdp"
            android:layout_margin="@dimen/_10sdp"
            android:src="@drawable/ic_close_"
            android:layout_alignParentEnd="true"/>


    </RelativeLayout>



</LinearLayout>
```

**(b). `item_saved.xml`**

> Our `item_saved` layout.

This layout will represent our Saved Item's layout. Specify [`androidx.cardview.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_height="wrap_content"
    android:layout_width="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    app:cardCornerRadius="@dimen/_5sdp"
    android:elevation="@dimen/_5sdp">

    <RelativeLayout
        android:id="@+id/sv_bg"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:background="@color/md_blue_400"
        android:transitionName="quoteBg"
        android:paddingLeft="@dimen/_8sdp"
        android:paddingRight="@dimen/_8sdp"
        android:paddingTop="@dimen/_5sdp"
        android:paddingBottom="@dimen/_5sdp"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/quote_saved"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/crimson_semibold"
            android:text="Your quote goes here"
            android:transitionName="quoteText"
            android:textSize="@dimen/_15sdp"
            android:textColor="@color/md_white_1000"/>

        <TextView
            android:id="@+id/author_saved"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="- Author"
            android:transitionName="quoteAuthor"
            android:textColor="@color/md_white_1000"
            android:fontFamily="@font/ps_bold"
            android:textSize="@dimen/_12sdp"
            android:layout_marginTop="@dimen/_5sdp"
            android:layout_below="@id/quote_saved"
            android:layout_alignParentRight="true"/>


    </RelativeLayout>

</androidx.cardview.widget.CardView>

```

**(c). `item_quote.xml`**

> Our `item_quote` layout.

This layout will represent our Quote Item's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:id="@+id/quote_bg"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1">



            <TextView
                android:layout_width="0dp"
                android:layout_height="@dimen/_50sdp"
                android:layout_weight="2"
                android:fontFamily="@font/ps_regular"
                android:gravity="center"
                android:layout_gravity="bottom"
                android:text="@string/inspire_quotes"
                android:textColor="@color/md_white_1000"
                android:textSize="@dimen/_20sdp" />




    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:orientation="vertical"
        android:gravity="center_vertical"
        android:padding="@dimen/_10sdp"
        android:layout_weight="3">


        <ImageView
            android:layout_width="@dimen/_30sdp"
            android:layout_height="@dimen/_30sdp"
            android:src="@drawable/ic_quote_left"
            android:tint="@color/md_white_1000"/>

        <TextView
            android:id="@+id/quote_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="@dimen/_5sdp"
            android:textSize="@dimen/_24sdp"
            android:lineHeight="@dimen/_30sdp"
            android:fontFamily="@font/crimson_bold"
            android:textColor="@color/md_white_1000"/>


        <TextView
            android:id="@+id/by_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ps_bold"
            android:layout_marginTop="@dimen/_10sdp"
            android:textColor="@color/md_white_1000"
            android:textSize="@dimen/_15sdp"
            android:layout_gravity="end"/>


    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1.5">


    </LinearLayout>

</LinearLayout>
```

**(d). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)
4. [`FloatingActionButton`](https://android.examples.directory/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="@dimen/_16sdp"
    tools:context=".Activity.SplashActivity">


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">


            <ImageView
                android:id="@+id/saved"
                android:layout_width="@dimen/_30sdp"
                android:layout_height="@dimen/_30sdp"
                android:layout_marginTop="@dimen/_10sdp"
                android:padding="@dimen/_2sdp"
                android:transitionName="backTrans"
                android:src="@drawable/ic_bookmark_white"
                android:layout_alignParentEnd="true"/>


            <RelativeLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center_vertical">

                <ImageView
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:src="@drawable/ic_quote_left"/>


                <RelativeLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="@dimen/_18sdp">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:fontFamily="@font/crimson_roman"
                        android:text="Get"
                        android:textColor="@color/md_black_1000"
                        android:textSize="@dimen/_40sdp" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="@dimen/_42sdp"
                        android:fontFamily="@font/crimson_semibold"
                        android:text="@string/inspire"
                        android:textColor="@color/md_black_1000"
                        android:textSize="@dimen/_40sdp" />

                </RelativeLayout>

            </RelativeLayout>




            <com.google.android.material.floatingactionbutton.FloatingActionButton
                android:id="@+id/btn_go"
                android:layout_width="@dimen/_120sdp"
                android:layout_height="@dimen/_120sdp"
                android:layout_alignParentBottom="true"
                android:layout_centerHorizontal="true"
                android:src="@drawable/ic_arrow_point_to_right"
                android:layout_marginBottom="@dimen/_30sdp"/>

        </RelativeLayout>




    </RelativeLayout>



</LinearLayout>
```

**(e). `activity_saved_view.xml`**

> Our `activity_saved_view` layout.

This layout will represent our View Saved Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`!--`](https://android.examples.directory/!--)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`View`](https://android.examples.directory/view)
5. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/bg_"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/md_blue_400"
    android:transitionName="quoteBg"
    tools:context=".Activity.SavedViewActivity">


<!--    <androidx.viewpager2.widget.ViewPager2-->
<!--        android:id="@+id/vp_"-->
<!--        android:layout_width="match_parent"-->
<!--        android:layout_height="match_parent"-->
<!--        android:visibility="visible"/>-->

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/bg_quote"

        android:orientation="vertical">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:gravity="center_horizontal">


            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="@dimen/_50sdp"
                android:layout_marginTop="@dimen/_18sdp"
                android:gravity="center">

                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_50sdp"
                    android:layout_weight="1"
                    android:gravity="center_vertical">

                    <ImageView
                        android:id="@+id/back__"
                        android:layout_width="@dimen/_30sdp"
                        android:layout_height="@dimen/_30sdp"
                        android:layout_marginStart="@dimen/_10sdp"
                        android:padding="@dimen/_5sdp"
                        android:transitionName="backTrans"
                        android:visibility="visible"
                        android:src="@drawable/ic_back_" />

                </LinearLayout>


                <View
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_1sdp"
                    android:layout_weight="1"
                    android:visibility="gone" />

                <TextView
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_50sdp"
                    android:layout_weight="2"
                    android:fontFamily="@font/ps_regular"
                    android:gravity="center"
                    android:text=""
                    android:textColor="@color/md_white_1000"
                    android:textSize="@dimen/_20sdp" />

                <View
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_1sdp"
                    android:layout_weight="1" />

            </LinearLayout>


        </LinearLayout>


        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="3"
            android:gravity="center_vertical"
            android:orientation="vertical"
            android:padding="@dimen/_10sdp">


            <ImageView
                android:layout_width="@dimen/_30sdp"
                android:layout_height="@dimen/_30sdp"
                android:src="@drawable/ic_quote_left"
                android:tint="@color/md_white_1000" />

            <TextView
                android:id="@+id/quote_text"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/_5sdp"
                android:fontFamily="@font/crimson_bold"
                android:lineHeight="@dimen/_30sdp"
                android:transitionName="quoteText"
                android:textColor="@color/md_white_1000"
                android:textSize="@dimen/_24sdp" />


            <TextView
                android:id="@+id/by_text"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="end"
                android:layout_marginTop="@dimen/_10sdp"
                android:fontFamily="@font/ps_bold"
                android:transitionName="quoteAuthor"
                android:textColor="@color/md_white_1000"
                android:textSize="@dimen/_15sdp" />


        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1.5"
            android:paddingBottom="@dimen/_10sdp"
            android:gravity="center">


            <ImageView
                android:id="@+id/btn_delete"
                android:layout_width="@dimen/_40sdp"
                android:layout_height="@dimen/_40sdp"
                android:layout_marginEnd="@dimen/_10sdp"
                android:background="@drawable/round"
                android:src="@drawable/ic_bin"
                android:visibility="invisible"/>

            <ImageView
                android:id="@+id/btn_share"
                android:layout_width="@dimen/_40sdp"
                android:layout_height="@dimen/_40sdp"
                android:layout_marginStart="@dimen/_10sdp"
                android:background="@drawable/round"
                android:src="@drawable/ic_share"
                android:visibility="invisible"/>


        </LinearLayout>

    </LinearLayout>

</RelativeLayout>

```

**(f). `activity_saved.xml`**

> Our `activity_saved` layout.

This layout will represent our Saved Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`RecyclerView`](https://android.examples.directory/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="@dimen/_16sdp"
    android:paddingRight="@dimen/_12sdp"
    android:paddingLeft="@dimen/_12sdp"
    tools:context=".Activity.SavedActivity">


    <ImageView
        android:id="@+id/back_saved"
        android:layout_width="@dimen/_30sdp"
        android:layout_height="@dimen/_30sdp"
        android:layout_marginTop="@dimen/_10sdp"
        android:padding="@dimen/_5sdp"
        android:src="@drawable/ic_back_"
        android:transitionName="backTrans"
        android:tint="@color/md_black_1000" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rv_saved"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/back_saved"
        android:layout_marginTop="@dimen/_5sdp"/>


</RelativeLayout>
```

**(g). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ViewPager2`](https://android.examples.directory/viewpager2)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`View`](https://android.examples.directory/view)
5. [`TextView`](https://android.examples.directory/textview)
6. [`LottieAnimationView`](https://android.examples.directory/lottieanimationview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/bg_"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/md_blue_400"
    tools:context=".Activity.MainActivity">

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/vp"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:visibility="visible"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:gravity="center_horizontal">


            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="@dimen/_50sdp"
                android:layout_marginTop="@dimen/_18sdp"
                android:gravity="center">

                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_50sdp"
                    android:layout_weight="1"
                    android:gravity="center_vertical">

                    <ImageView
                        android:id="@+id/back_"
                        android:layout_width="@dimen/_30sdp"
                        android:layout_height="@dimen/_30sdp"
                        android:layout_marginStart="@dimen/_10sdp"
                        android:onClick="closeChoice"
                        android:padding="@dimen/_5sdp"
                        android:src="@drawable/ic_back_" />

                </LinearLayout>


                <View
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_1sdp"
                    android:layout_weight="1"
                    android:visibility="gone" />

                <TextView
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_50sdp"
                    android:layout_weight="2"
                    android:fontFamily="@font/ps_regular"
                    android:gravity="center"
                    android:text=""
                    android:textColor="@color/md_white_1000"
                    android:textSize="@dimen/_20sdp" />

                <View
                    android:layout_width="0dp"
                    android:layout_height="@dimen/_1sdp"
                    android:layout_weight="1" />

            </LinearLayout>


        </LinearLayout>


        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="3"
            android:gravity="center">


            <com.airbnb.lottie.LottieAnimationView
                android:id="@+id/lottie"
                android:layout_width="@dimen/_100sdp"
                android:layout_height="@dimen/_100sdp"
                app:lottie_autoPlay="true"
                app:lottie_loop="true"
                app:lottie_fileName="loading_loop.json"/>


        </LinearLayout>


        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1.5"
            android:paddingBottom="@dimen/_10sdp"
            android:gravity="center">


            <ImageView
                android:id="@+id/btn_save"
                android:layout_width="@dimen/_40sdp"
                android:layout_height="@dimen/_40sdp"
                android:layout_marginEnd="@dimen/_10sdp"
                android:background="@drawable/round"
                android:src="@drawable/ic_heart" />

            <ImageView
                android:id="@+id/btn_share"
                android:layout_width="@dimen/_40sdp"
                android:layout_height="@dimen/_40sdp"
                android:layout_marginStart="@dimen/_10sdp"
                android:background="@drawable/round"
                android:src="@drawable/ic_share" />



        </LinearLayout>

    </LinearLayout>

</RelativeLayout>

```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `QuoteModel.java`**

> Our `QuoteModel` class.

Create a java file named `QuoteModel.java`.

We will be overriding the following methods: 

1. `toString(){`.

We will be creating the following methods:

1. `setCount(int count)`.

2. `getCount()` - It will return `int` object.

3. `setResults(List<ResultsItem> results)`.

4. `getResults()` - It will return `List<ResultsItem>` object.

**(a). Our `getCount()` method.**

A method to get count:

```java
	public int getCount(){
		return count;
	}
```

**(b). Our `setCount()` method.**

A method to set count:

```java
	public void setCount(int count){
		this.count = count;
	}
```

**(c). Our `getResults()` method.**

A method to get results:

```java
	public List<ResultsItem> getResults(){
		return results;
	}
```

**(d). Our `setResults()` method.**

A method to set results:

```java
	public void setResults(List<ResultsItem> results){
		this.results = results;
	}
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import java.util.List;
import com.google.gson.annotations.SerializedName;

public class QuoteModel{

	@SerializedName("count")
	private int count;

	@SerializedName("results")
	private List<ResultsItem> results;

	public void setCount(int count){
		this.count = count;
	}

	public int getCount(){
		return count;
	}

	public void setResults(List<ResultsItem> results){
		this.results = results;
	}

	public List<ResultsItem> getResults(){
		return results;
	}

	@Override
 	public String toString(){
		return 
			"QuoteModel{" + 
			"count = '" + count + '\'' + 
			",results = '" + results + '\'' + 
			"}";
		}
}

```

**(b). `ResultsItem.java`**

> Our `ResultsItem` class.

Create a java file named `ResultsItem.java`.

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.

We will be overriding the following methods: 

1. `toString()`.

We will be creating the following methods:

1. `setQuoteText(String quoteText)`.

2. `getQuoteText()` - It will return `String` object.

3. `setQuoteAuthor(String quoteAuthor)`.

4. `getQuoteAuthor()` - It will return `String` object.

5. `setId(String id)`.

6. `getId()` - It will return `String` object.

7. `toString()` - It will return `String` object.

**(a). Our `setQuoteText()` method.**

A method to set quote text:

```java
	public void setQuoteText(String quoteText){
		this.quoteText = quoteText;
	}
```

**(b). Our `setId()` method.**

A method to set id:

```java
	public void setId(String id){
		this.id = id;
	}
```

**(c). Our `getQuoteText()` method.**

A method to get quote text:

```java
	public String getQuoteText(){
		return quoteText;
	}
```

**(d). Our `setQuoteAuthor()` method.**

A method to set quote author:

```java
	public void setQuoteAuthor(String quoteAuthor){
		this.quoteAuthor = quoteAuthor;
	}
```

**(e). Our `getQuoteAuthor()` method.**

A method to get quote author:

```java
	public String getQuoteAuthor(){
		return quoteAuthor;
	}
```

**(f). Our `getId()` method.**

A method to get id:

```java
	public String getId(){
		return id;
	}
```

**(g). Our `toString()` method.**

A method to to string:

```java
// 	public String toString(){
//		return
//			"ResultsItem{" +
//			"quoteText = '" + quoteText + '\'' +
//			",quoteAuthor = '" + quoteAuthor + '\'' +
//			",_id = '" + id + '\'' +
//			"}";
//		}


	@NonNull
	@Override
	public String toString() {
		return quoteText+" "+quoteAuthor;
	}
}
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;

import com.google.gson.annotations.SerializedName;

public class ResultsItem{

	@SerializedName("quoteText")
	private String quoteText;

	@SerializedName("quoteAuthor")
	private String quoteAuthor;

	@SerializedName("_id")
	private String id;

	public ResultsItem(String quoteText, String quoteAuthor, String id) {
		this.quoteText = quoteText;
		this.quoteAuthor = quoteAuthor;
		this.id = id;
	}

	public void setQuoteText(String quoteText){
		this.quoteText = quoteText;
	}

	public String getQuoteText(){
		return quoteText;
	}

	public void setQuoteAuthor(String quoteAuthor){
		this.quoteAuthor = quoteAuthor;
	}

	public String getQuoteAuthor(){
		return quoteAuthor;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

//	@Override
// 	public String toString(){
//		return
//			"ResultsItem{" +
//			"quoteText = '" + quoteText + '\'' +
//			",quoteAuthor = '" + quoteAuthor + '\'' +
//			",_id = '" + id + '\'' +
//			"}";
//		}


	@NonNull
	@Override
	public String toString() {
		return quoteText+" "+quoteAuthor;
	}
}

```

**(c). `ApiInterface.kt`**

> Our `ApiInterface` class.

Create a Kotlin file named `ApiInterface.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.hadi.inspire.Model.QuoteModel
import retrofit2.Call
import retrofit2.http.GET

interface ApiInterface {

    @get:GET("quotes/all")
    val getQuote: Call<QuoteModel>

}

```


**(d). `RetrofitClient.java`**

> Our `RetrofitClient` class.

Create a java file named `RetrofitClient.java`.

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.

We will be creating the following methods:

1. `networkInterceptor()` - It will return `Interceptor` object.

2. `cache(Context context)` - It will return `Cache` object.

3. `offlineInterceptor(Context context)` - It will return `Interceptor` object.

4. `getQuote()` - It will return `ApiInterface` object.

**(a). Our `networkInterceptor()` method.**

A method to network interceptor:

```java
    private static Interceptor networkInterceptor() {
        return chain -> {
            Response response = chain.proceed(chain.request());
            CacheControl cacheControl = new CacheControl.Builder()
                    .maxAge(30, TimeUnit.SECONDS) // Cache the response only for 30 sec, so if a request comes within 30sec it will show from cache
                    .build();
            return response.newBuilder()
                    .removeHeader(HEADER_PRAGMA)
                    .removeHeader(HEADER_CACHE_CONTROL) // removes cache control from the server
                    .header(HEADER_CACHE_CONTROL, cacheControl.toString()) // applying our cache control
                    .build();
        };
    }
```

**(b). Our `getQuote()` method.**

A method to get quote:

```java
    public ApiInterface getQuote() {
        return retrofit.create(ApiInterface.class);
    }
```

**(c). Our `cache()` method.**

Write this method as follows:

```java
    private Cache cache(Context context) {
        return new Cache(new File(context.getCacheDir(), "RetrofitMVVM"), cacheSize);
    }
```

**(d). Our `offlineInterceptor()` method.**

A method to offline interceptor:

```java
    private Interceptor offlineInterceptor(Context context) {
        return chain -> {
            Request request = chain.request();
            if (!Utility.hasNetwork(context)) { // makes the network is not available only
                CacheControl cacheControl = new CacheControl.Builder()
                        .maxStale(5, TimeUnit.DAYS)
                        .build();

                request = request.newBuilder()
                        .removeHeader(HEADER_PRAGMA)
                        .removeHeader(HEADER_CACHE_CONTROL)
                        .cacheControl(cacheControl)
                        .build();
            }
            return chain.proceed(request);
        };
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;

import com.hadi.inspire.Model.QuoteModel;

import java.io.File;
import java.util.concurrent.TimeUnit;

import okhttp3.Cache;
import okhttp3.CacheControl;
import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
        private static final String BASE_URL = "https://quote-garden.herokuapp.com/";
//    private static final String BASE_URL = "https://testintegration.000webhostapp.com/";
    private static final String HEADER_CACHE_CONTROL = "Cache-Control"; // removes Cache-Control header from the server, and apply our own cache control
    private static final String HEADER_PRAGMA = "Pragma"; // overrides "Not to use caching scenario"
    private static final long cacheSize = 5 * 1024 * 1024; // 5 MB
    private static RetrofitClient mInstance;
    private final Retrofit retrofit;

    public static synchronized RetrofitClient getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new RetrofitClient(context);
        }
        return mInstance;
    }

    private RetrofitClient(Context context) {
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.cache(cache(context));
        httpClient.addInterceptor(offlineInterceptor(context));
        httpClient.addNetworkInterceptor(networkInterceptor()); // only used when network is on

        /* If there are any headers its adds in here */
//        httpClient.addInterceptor(chain -> {
//            Request original = chain.request();
//            Request.Builder requestBuilder = original.newBuilder()
//                    .header("Authorization", Utility.getRetrofitHeader()) // Headers
//                    .header(Constants.X_HEADER, Utility.getSecureUniqueHardwareID());
//            Request request = requestBuilder.build();
//            return chain.proceed(request);
//        });

//        if (Constants.DEBUG_MODE) {
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
            logging.level(HttpLoggingInterceptor.Level.BODY);
            httpClient.addInterceptor(logging);
//        }
//
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient.build())
                .build();
    }

    /**
     * This interceptor will be called ONLY if the network is available
     */
    private static Interceptor networkInterceptor() {
        return chain -> {
            Response response = chain.proceed(chain.request());
            CacheControl cacheControl = new CacheControl.Builder()
                    .maxAge(30, TimeUnit.SECONDS) // Cache the response only for 30 sec, so if a request comes within 30sec it will show from cache
                    .build();
            return response.newBuilder()
                    .removeHeader(HEADER_PRAGMA)
                    .removeHeader(HEADER_CACHE_CONTROL) // removes cache control from the server
                    .header(HEADER_CACHE_CONTROL, cacheControl.toString()) // applying our cache control
                    .build();
        };
    }

    private Cache cache(Context context) {
        return new Cache(new File(context.getCacheDir(), "RetrofitMVVM"), cacheSize);
    }

    /**
     * This interceptor will be called both if the network is available and the network is not available
     */
    private Interceptor offlineInterceptor(Context context) {
        return chain -> {
            Request request = chain.request();
            if (!Utility.hasNetwork(context)) { // makes the network is not available only
                CacheControl cacheControl = new CacheControl.Builder()
                        .maxStale(5, TimeUnit.DAYS)
                        .build();

                request = request.newBuilder()
                        .removeHeader(HEADER_PRAGMA)
                        .removeHeader(HEADER_CACHE_CONTROL)
                        .cacheControl(cacheControl)
                        .build();
            }
            return chain.proceed(request);
        };
    }

    public ApiInterface getQuote() {
        return retrofit.create(ApiInterface.class);
    }
}


```

**(e). `Utility.java`**

> Our `Utility` class.

Create a java file named `Utility.java`.

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `ConnectivityManager` from the `android.net` package.
3. `NetworkInfo` from the `android.net` package.
4. `ImageView` from the `android.widget` package.
5. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
6. `RecyclerView` from the `androidx.recyclerview.widget` package.

We will be creating the following methods:

1. `hasNetwork(Context context)` - It will return `Boolean` object.

**(a). Our `hasNetwork()` method.**

A method to has network:

```java
    static Boolean hasNetwork(Context context) {
        ConnectivityManager cm =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo activeNetwork = null;
        if (cm != null) {
            activeNetwork = cm.getActiveNetworkInfo();
        }
        return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.ImageView;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


class Utility {

    static Boolean hasNetwork(Context context) {
        ConnectivityManager cm =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo activeNetwork = null;
        if (cm != null) {
            activeNetwork = cm.getActiveNetworkInfo();
        }
        return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
    }
}


```

**(f). `Quote.java`**

> Our `Quote` class.

Create a java file named `Quote.java`.

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `ColumnInfo` from the `androidx.room` package.
3. `Entity` from the `androidx.room` package.
4. `PrimaryKey` from the `androidx.room` package.

We will be creating the following methods:

1. `setPosition(int position)`.

2. `getPosition()` - It will return `int` object.

3. `getId()` - It will return `String` object.

4. `setId(String id)`.

5. `getAuthor()` - It will return `String` object.

6. `setAuthor(String author)`.

7. `isSelected()` - It will return `boolean` object.

8. `setSelected(boolean selected)`.

9. `toString()` - It will return `String` object.

**(a). Our `getPosition()` method.**

A method to get position:

```java
    public int getPosition() {
        return position;
    }
```

**(b). Our `getId()` method.**

A method to get id:

```java
    public String getId() {
        return id;
    }
```

**(c). Our `setPosition()` method.**

A method to set position:

```java
    public void setPosition(int position) {
        this.position = position;
    }
```

**(d). Our `setId()` method.**

A method to set id:

```java
    public void setId(String id) {
        this.id = id;
    }
```

**(e). Our `setAuthor()` method.**

A method to set author:

```java
    public void setAuthor(String author) {
        this.author = author;
    }
```

**(f). Our `setSelected()` method.**

A method to set selected:

```java
    public void setSelected(boolean selected) {
        isSelected = selected;
    }
```

**(g). Our `toString()` method.**

A method to to string:

```java
//    public String toString() {
//        return quote.substring(0,5)+" "+author.substring(0,5);
//    }
}
```

**(h). Our `isSelected()` method.**

A method to is selected:

```java
    public boolean isSelected() {
        return isSelected;
    }
```

**(i). Our `getAuthor()` method.**

A method to get author:

```java
    public String getAuthor() {
        return author;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import java.io.Serializable;

@Entity
public class Quote implements Serializable {

    @PrimaryKey
    @NonNull
    private String id;


    @ColumnInfo(name = "quote")
    private String quote;


    @ColumnInfo(name = "author")
    private String author;

    @ColumnInfo(name = "position")
    private int position;

    public Quote() {
    }

    public Quote(@NonNull String id, String quote, String author) {
        this.id = id;
        this.quote = quote;
        this.author = author;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getPosition() {
        return position;
    }

    private boolean isSelected;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

//    @NonNull
//    @Override
//    public String toString() {
//        return quote.substring(0,5)+" "+author.substring(0,5);
//    }
}


```

**(g). `QuoteDao.java`**

> Our `QuoteDao` class.

Create a java file named `QuoteDao.java`.

Here are some of the imports we will use in this particular class:

1. `Dao` from the `androidx.room` package.
2. `Delete` from the `androidx.room` package.
3. `Insert` from the `androidx.room` package.
4. `OnConflictStrategy` from the `androidx.room` package.
5. `Query` from the `androidx.room` package.
6. `Update` from the `androidx.room` package.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

import io.reactivex.Flowable;

@Dao
public interface QuoteDao {

    @Query("SELECT * FROM quote")
    Flowable<List<Quote>> getAll();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Quote quote);

    @Delete
    void delete(Quote quote);

    @Update
    void update(Quote quote);

}


```

**(h). `DatabaseClient.java`**

> Our `DatabaseClient` class.

Create a java file named `DatabaseClient.java`.

We will be creating the following methods:

1. `getAppDatabase()` - It will return `AppDatabase` object.

**(a). Our `getAppDatabase()` method.**

A method to get app database:

```java
        public AppDatabase getAppDatabase() {
            return appDatabase;
        }
```


Here is the full java code for this `class`:

```java
    package com.hadi.inspire.Components;


    import android.content.Context;

    import androidx.room.Room;

    public class DatabaseClient {

        private Context mCtx;
        private static DatabaseClient mInstance;

        //our app database object
        private AppDatabase appDatabase;

        private DatabaseClient(Context mCtx) {
            this.mCtx = mCtx;

            //creating the app database with Room database builder
            //MyToDos is the name of the database
            appDatabase = Room.databaseBuilder(mCtx, AppDatabase.class, "MyQuotes").build();
        }

        public static synchronized DatabaseClient getInstance(Context mCtx) {
            if (mInstance == null) {
                mInstance = new DatabaseClient(mCtx);
            }
            return mInstance;
        }

        public AppDatabase getAppDatabase() {
            return appDatabase;
        }
    }

```

**(i). `AppDatabase.java`**

> Our `AppDatabase` class.

Create a java file named `AppDatabase.java`.

Inside it create a class that extends `RoomDatabase` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Database` from the `androidx.room` package.
2. `RoomDatabase` from the `androidx.room` package.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {Quote.class}, version = 1 , exportSchema = false)
public abstract class AppDatabase extends RoomDatabase {
    public abstract QuoteDao quoteDao();
}

```

**(j). `SavedAdapter.kt`**

> Our `SavedAdapter` class.

Create a Kotlin file named `SavedAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ActivityOptionsCompat` from the `androidx.core.app` package.
2. `ContextCompat` from the `androidx.core.content` package.
3. `Pair` from the `androidx.core.util` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.item_saved.view` package.

Then extend the `RecyclerView.Adapter<SavedAdapter.SavedViewHolder>` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): SavedViewHolder `.
2. `getItemCount(): Int `.
3. `onBindViewHolder(holder: SavedViewHolder, position: Int) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.app.ActivityOptionsCompat
import androidx.core.content.ContextCompat
import androidx.core.util.Pair
import androidx.recyclerview.widget.RecyclerView
import com.hadi.inspire.Activity.MainActivity
import com.hadi.inspire.Activity.SavedActivity.Companion.saved_list
import com.hadi.inspire.Activity.SavedViewActivity
import com.hadi.inspire.Components.Quote
import com.hadi.inspire.R
import com.hadi.inspire.Utils.ColorStore
import com.hadi.inspire.Utils.ColorStore.colorList
import kotlinx.android.synthetic.main.item_saved.view.*


class SavedAdapter (val context: Context,val list:List<Quote>) : RecyclerView.Adapter<SavedAdapter.SavedViewHolder>(){


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SavedViewHolder {
        val v = LayoutInflater.from(context).inflate(R.layout.item_saved,parent,false)
        return SavedViewHolder(v)
    }

    override fun getItemCount(): Int {
        return list.size
    }

    override fun onBindViewHolder(holder: SavedViewHolder, position: Int) {

        holder.bg.setBackgroundColor(ContextCompat.getColor(context,R.color.md_blue_400))
        holder.quote.text = list.get(position).quote
        holder.auth.text = "- ${list.get(position).author}"



        holder.bg.setOnClickListener {

            val intent = Intent(context,SavedViewActivity::class.java)
            intent.putExtra("QUOTE",list[position])

            Log.d("SAVEDDD__",list[position].toString())

//            val pairbg = Pair.create<View,String>(holder.bg,"quoteBg")
            val pairText = Pair.create<View,String>(holder.quote,"quoteText")
            val pairAuth = Pair.create<View,String>(holder.auth,"quoteAuthor")

            val options = ActivityOptionsCompat.makeSceneTransitionAnimation(context as Activity,pairText,pairAuth)
            context.startActivity(intent,options.toBundle())


        }
    }

    class SavedViewHolder(itemView:View):RecyclerView.ViewHolder(itemView){
        val bg = itemView.sv_bg
        val quote = itemView.quote_saved
        val auth = itemView.author_saved
    }

}

```


**(k). `QuoteAdapter.kt`**

> Our `QuoteAdapter` class.

Create a Kotlin file named `QuoteAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.item_quote.view` package.

Then extend the `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): QuoteViewHolder `.
2. `onBindViewHolder(holder: QuoteViewHolder, position: Int) `.

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.hadi.inspire.Model.ResultsItem
import com.hadi.inspire.R
import com.hadi.inspire.Utils.ColorStore
import com.hadi.inspire.Utils.ColorStore.colorList
import kotlinx.android.synthetic.main.item_quote.view.*
import java.util.*
import kotlin.collections.ArrayList

class QuoteAdapter(
    val context: Context,
    val list: ArrayList<ResultsItem>,
    val listener: OnItemClickListener
) : RecyclerView.Adapter<QuoteAdapter.QuoteViewHolder>() {

    var i = 0;

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): QuoteViewHolder {

        val view = LayoutInflater.from(context)
            .inflate(R.layout.item_quote, parent, false)
        return QuoteViewHolder(view)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(holder: QuoteViewHolder, position: Int) {



        holder.quote.text = list[position].quoteText
        holder.quote_by.text = "- ${list[position].quoteAuthor}"


        ColorStore()

//        if(position <= colorList.size){
//            i++;
//            holder.quote_bg.setBackgroundColor(ContextCompat.getColor(context, colorList.get(i)));
//        }
//        if (position == colorList.size){
//            i=0;
//        }

        if (position == 0) {
            holder.quote_bg.setBackgroundColor(ContextCompat.getColor(context, R.color.md_blue_400))
        } else {
            holder.quote_bg.setBackgroundColor(ContextCompat.getColor(context, colorList.random()))
        }
        holder.quote_bg.setOnClickListener {
            holder.quote_bg.setBackgroundColor(ContextCompat.getColor(context, colorList.random()))
        }



    }

    class QuoteViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val quote = itemView.quote_text
        val quote_by = itemView.by_text
        val quote_bg = itemView.quote_bg
    }

    interface OnItemClickListener {
        fun onItemClick(item: ResultsItem)
    }

}

```


**(m). `LinePagerIndicatorDecoration.java`**

> Our `LinePagerIndicatorDecoration` class.

Create a java file named `LinePagerIndicatorDecoration.java`.

Inside it create a class that extends `RecyclerView.ItemDecoration` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Resources` from the `android.content.res` package.
2. `Canvas` from the `android.graphics` package.
3. `Paint` from the `android.graphics` package.
4. `Rect` from the `android.graphics` package.
5. `View` from the `android.view` package.
6. `AccelerateDecelerateInterpolator` from the `android.view.animation` package.
7. `Interpolator` from the `android.view.animation` package.
8. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
9. `RecyclerView` from the `androidx.recyclerview.widget` package.

We will be overriding the following methods: 

1. `onDrawOver(Canvas`.
2. `getItemOffsets(Rect`.

We will be creating the following methods:

1. `drawInactiveIndicators(Canvas c, float indicatorStartX, float indicatorPosY, int itemCount)`.

**(a). Our `drawInactiveIndicators()` method.**

A method to draw inactive indicators:

```java
  private void drawInactiveIndicators(Canvas c, float indicatorStartX, float indicatorPosY, int itemCount) {
    mPaint.setColor(colorInactive);

    // width of item indicator including padding
    final float itemWidth = mIndicatorItemLength + mIndicatorItemPadding;

    float start = indicatorStartX;
    for (int i = 0; i < itemCount; i++) {
      // draw the line for every item
      c.drawLine(start, indicatorPosY, start + mIndicatorItemLength, indicatorPosY, mPaint);
      start += itemWidth;
    }
  }
```


Here is the full java code for this `class`:

```java
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 David Medenjak
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package replace_with_your_package_name;

import android.content.res.Resources;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Interpolator;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class LinePagerIndicatorDecoration extends RecyclerView.ItemDecoration {

  private int colorActive = 0xFFFFFFFF;
  private int colorInactive = 0x66FFFFFF;

  private static final float DP = Resources.getSystem().getDisplayMetrics().density;

  /**
   * Height of the space the indicator takes up at the bottom of the view.
   */
  private final int mIndicatorHeight = (int) (DP * 16);

  /**
   * Indicator stroke width.
   */
  private final float mIndicatorStrokeWidth = DP * 2;

  /**
   * Indicator width.
   */
  private final float mIndicatorItemLength = DP * 16;
  /**
   * Padding between indicators.
   */
  private final float mIndicatorItemPadding = DP * 4;

  /**
   * Some more natural animation interpolation
   */
  private final Interpolator mInterpolator = new AccelerateDecelerateInterpolator();

  private final Paint mPaint = new Paint();

  public LinePagerIndicatorDecoration() {
    mPaint.setStrokeCap(Paint.Cap.ROUND);
    mPaint.setStrokeWidth(mIndicatorStrokeWidth);
    mPaint.setStyle(Paint.Style.STROKE);
    mPaint.setAntiAlias(true);
  }

  @Override
  public void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state) {
    super.onDrawOver(c, parent, state);

    int itemCount = parent.getAdapter().getItemCount();

    // center horizontally, calculate width and subtract half from center
    float totalLength = mIndicatorItemLength * itemCount;
    float paddingBetweenItems = Math.max(0, itemCount - 1) * mIndicatorItemPadding;
    float indicatorTotalWidth = totalLength + paddingBetweenItems;
    float indicatorStartX = (parent.getWidth() - indicatorTotalWidth) / 2F;

    // center vertically in the allotted space
    float indicatorPosY = parent.getHeight() - mIndicatorHeight / 2F;

    drawInactiveIndicators(c, indicatorStartX, indicatorPosY, itemCount);


    // find active page (which should be highlighted)
    LinearLayoutManager layoutManager = (LinearLayoutManager) parent.getLayoutManager();
    int activePosition = layoutManager.findFirstVisibleItemPosition();
    if (activePosition == RecyclerView.NO_POSITION) {
      return;
    }

    // find offset of active page (if the user is scrolling)
    final View activeChild = layoutManager.findViewByPosition(activePosition);
    int left = activeChild.getLeft();
    int width = activeChild.getWidth();

    // on swipe the active item will be positioned from [-width, 0]
    // interpolate offset for smooth animation
    float progress = mInterpolator.getInterpolation(left * -1 / (float) width);

    drawHighlights(c, indicatorStartX, indicatorPosY, activePosition, progress, itemCount);
  }

  private void drawInactiveIndicators(Canvas c, float indicatorStartX, float indicatorPosY, int itemCount) {
    mPaint.setColor(colorInactive);

    // width of item indicator including padding
    final float itemWidth = mIndicatorItemLength + mIndicatorItemPadding;

    float start = indicatorStartX;
    for (int i = 0; i < itemCount; i++) {
      // draw the line for every item
      c.drawLine(start, indicatorPosY, start + mIndicatorItemLength, indicatorPosY, mPaint);
      start += itemWidth;
    }
  }

  private void drawHighlights(Canvas c, float indicatorStartX, float indicatorPosY,
                              int highlightPosition, float progress, int itemCount) {
    mPaint.setColor(colorActive);

    // width of item indicator including padding
    final float itemWidth = mIndicatorItemLength + mIndicatorItemPadding;

    if (progress == 0F) {
      // no swipe, draw a normal indicator
      float highlightStart = indicatorStartX + itemWidth * highlightPosition;
      c.drawLine(highlightStart, indicatorPosY,
          highlightStart + mIndicatorItemLength, indicatorPosY, mPaint);
    } else {
      float highlightStart = indicatorStartX + itemWidth * highlightPosition;
      // calculate partial highlight
      float partialLength = mIndicatorItemLength * progress;

      // draw the cut off highlight
      c.drawLine(highlightStart + partialLength, indicatorPosY,
          highlightStart + mIndicatorItemLength, indicatorPosY, mPaint);

      // draw the highlight overlapping to the next item as well
      if (highlightPosition < itemCount - 1) {
        highlightStart += itemWidth;
        c.drawLine(highlightStart, indicatorPosY,
            highlightStart + partialLength, indicatorPosY, mPaint);
      }
    }
  }

  @Override
  public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
    super.getItemOffsets(outRect, view, parent, state);
    outRect.bottom = mIndicatorHeight;
  }
}


```

**(n). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `ActivityCompat` from the `androidx.core.app` package.
3. `ActivityOptionsCompat` from the `androidx.core.app` package.
4. `ViewCompat` from the `androidx.core.view` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_splash` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `startRevealActivity(parameter)` - Our function will take a `View` object as a parameter.
2. `getSaved() `.

**(a). Our `getSaved()` function.**

A function to get saved:

```kotlin
    private fun getSaved() {
//        val compositeDisposable = CompositeDisposable()
//        val disposable =
        roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", "DATA:$t ");
            }
//        compositeDisposable.add(disposable)
//        compositeDisposable.dispose()


    }
```

**(b). Our `startRevealActivity()` function.**

A function to start reveal activity:

```kotlin
    private fun startRevealActivity(v:View){

        //calculates the center of the View v you are passing
        val revealX = (v.x + v.width / 2).toInt()
        val revealY = (v.y + v.height / 2).toInt()

        //create an intent, that launches the second activity and pass the x and y coordinates
        //create an intent, that launches the second activity and pass the x and y coordinates
        val intent = Intent(this@SplashActivity, MainActivity::class.java)
        intent.putExtra(RevealAnimation.EXTRA_CIRCULAR_REVEAL_X, revealX)
        intent.putExtra(RevealAnimation.EXTRA_CIRCULAR_REVEAL_Y, revealY)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //just start the activity as an shared transition, but set the options bundle to null
        //just start the activity as an shared transition, but set the options bundle to null
        ActivityCompat.startActivity(this, intent, null)
        //startActivity(intent)
        //to prevent strange behaviours override the pending transitions
        //to prevent strange behaviours override the pending transitions
        overridePendingTransition(0, 0)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.ActivityOptions
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.util.Pair
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.ActivityOptionsCompat
import androidx.core.view.ViewCompat
import com.hadi.inspire.Components.AppDatabase
import com.hadi.inspire.Components.DatabaseClient
import com.hadi.inspire.R
import com.hadi.inspire.Utils.RevealAnimation
import com.hadi.inspire.Utils.ViewPressEffectHelper
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_splash.*

class SplashActivity : AppCompatActivity() {


    lateinit var roomDb: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)


        roomDb = DatabaseClient.getInstance(this).appDatabase
        var fade = AnimationUtils.loadAnimation(this,R.anim.fade_in)


        getSaved()


        this.window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)

        //saved.startAnimation(fade)

        btn_go.setOnClickListener {
            startRevealActivity(it)
        }

        ViewPressEffectHelper.attach(saved)
        saved.setOnClickListener{

            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
                val pairIcon = Pair.create<View,String>(saved,"backTrans")
                val pairList = ArrayList<Pair<View,String>>()
                pairList.add(pairIcon)

                val pairArray = pairList.toTypedArray()
//                val options = ActivityOptionsCompat.makeSceneTransitionAnimation(this,saved,ViewCompat.getTransitionName(saved) as String)

                val options = ActivityOptions.makeSceneTransitionAnimation(this@SplashActivity,pairIcon)

                val intent = Intent(this,SavedActivity::class.java)
                startActivity(intent,options.toBundle())
            }else{
                val intent = Intent(this,SavedActivity::class.java)
                startActivity(intent)
            }

        }


    }

    private fun startRevealActivity(v:View){

        //calculates the center of the View v you are passing
        val revealX = (v.x + v.width / 2).toInt()
        val revealY = (v.y + v.height / 2).toInt()

        //create an intent, that launches the second activity and pass the x and y coordinates
        //create an intent, that launches the second activity and pass the x and y coordinates
        val intent = Intent(this@SplashActivity, MainActivity::class.java)
        intent.putExtra(RevealAnimation.EXTRA_CIRCULAR_REVEAL_X, revealX)
        intent.putExtra(RevealAnimation.EXTRA_CIRCULAR_REVEAL_Y, revealY)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //just start the activity as an shared transition, but set the options bundle to null
        //just start the activity as an shared transition, but set the options bundle to null
        ActivityCompat.startActivity(this, intent, null)
        //startActivity(intent)
        //to prevent strange behaviours override the pending transitions
        //to prevent strange behaviours override the pending transitions
        overridePendingTransition(0, 0)
    }

    private fun getSaved() {
//        val compositeDisposable = CompositeDisposable()
//        val disposable =
        roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", "DATA:$t ");
            }
//        compositeDisposable.add(disposable)
//        compositeDisposable.dispose()


    }

}


```


**(o). `SavedViewActivity.kt`**

> Our `SavedViewActivity` class.

Create a Kotlin file named `SavedViewActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `PopupWindow` from the `android.widget` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_saved_view` package.
5. `*` from the `kotlinx.android.synthetic.main.popup_screen.view` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `takeSS(parameter)` - Pass to this method a `View` object as a parameter.
2. `init()`.
3. `popup_image(img: Bitmap, sharepath: String) `.
4. `share(parameter)` - Our function will take a `String` object as a parameter.

**(a). Our `popup_image()` function.**

Write this function as follows:

```kotlin
    fun popup_image(img: Bitmap, sharepath: String) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)
        val path = saveDir + "/" + now + ".jpeg"

        val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val image_popup = inflater.inflate(R.layout.popup_screen, null)
        val mPopupWindow = PopupWindow(
            image_popup,
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        image_popup.img_alert.setImageBitmap(img)


        image_popup.close.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.pop_bg.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.wa.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.whatsapp"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.insta.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.instagram.android"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.dwnld.setOnClickListener {

            share(sharePath)

        }


        if (Build.VERSION.SDK_INT >= 21) {
            mPopupWindow.elevation = 5.0f
        }

        mPopupWindow.isFocusable = true
        mPopupWindow.animationStyle = R.style.popupAnimation
        mPopupWindow.showAtLocation(bg_, Gravity.CENTER, 0, 0)
    }
```

**(b). Our `takeSS()` function.**

A function to take s s:

```kotlin
    private fun takeSS(v: View) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)

        try {
            // image naming and path  to include sd card  appending name you choose for file
            val mPath = dirPath + "/" + now + ".jpeg"

            // create bitmap screen capture
            v.isDrawingCacheEnabled = true
            val bitmap = Bitmap.createBitmap(v.drawingCache)
            v.isDrawingCacheEnabled = false

            val imageFile = File(mPath)

            val outputStream = FileOutputStream(imageFile)
            val quality = 100
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)




            outputStream.flush()
            outputStream.close()

            //setting screenshot in imageview
            val filePath = imageFile.path

            val ssbitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
            //img_item!!.setImageBitmap(ssbitmap)
            sharePath = filePath;
            //share(sharePath)
            popup_image(bitmap, sharePath)
        } catch (e: Throwable) {
            // Several error may come out with file handling or DOM
            e.printStackTrace()
        }

    }
```

**(c). Our `init()` function.**

Write this function as follows:

```kotlin
    private fun init(){

        val quote = intent.getSerializableExtra("QUOTE") as Quote

        quote_text.text = quote.quote;
        by_text.text = quote.author

    }
```

**(d). Our `share()` function.**

Write this function as follows:

```kotlin
    private fun share(sharePath: String) {

        val file = File(sharePath)
        val uri = Uri.fromFile(file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "image/*"
            putExtra(Intent.EXTRA_STREAM, uri)
        }
        startActivity(Intent.createChooser(intent, "Share Quote.."))
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.PopupWindow
import androidx.core.content.ContextCompat
import com.hadi.inspire.Components.Quote
import com.hadi.inspire.R
import com.hadi.inspire.Utils.ColorStore
import com.hadi.inspire.Utils.ColorStore.colorList
import kotlinx.android.synthetic.main.activity_saved_view.*
import kotlinx.android.synthetic.main.popup_screen.view.*
import java.io.File
import java.io.FileOutputStream
import java.util.*

class SavedViewActivity : AppCompatActivity() {

    private var sharePath = ""
    internal var dirPath = ""
    internal var saveDir = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_saved_view)
       // overridePendingTransition(0,0)

        init()
        ColorStore()


        bg_quote.setOnClickListener {
            bg_quote.setBackgroundColor(ContextCompat.getColor(applicationContext,colorList.random()))
        }

        back__.setOnClickListener {
            finishAfterTransition()
        }

        btn_share.setOnClickListener {
           takeSS(bg_)
        }
    }

    private fun takeSS(v: View) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)

        try {
            // image naming and path  to include sd card  appending name you choose for file
            val mPath = dirPath + "/" + now + ".jpeg"

            // create bitmap screen capture
            v.isDrawingCacheEnabled = true
            val bitmap = Bitmap.createBitmap(v.drawingCache)
            v.isDrawingCacheEnabled = false

            val imageFile = File(mPath)

            val outputStream = FileOutputStream(imageFile)
            val quality = 100
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)




            outputStream.flush()
            outputStream.close()

            //setting screenshot in imageview
            val filePath = imageFile.path

            val ssbitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
            //img_item!!.setImageBitmap(ssbitmap)
            sharePath = filePath;
            //share(sharePath)
            popup_image(bitmap, sharePath)
        } catch (e: Throwable) {
            // Several error may come out with file handling or DOM
            e.printStackTrace()
        }

    }


    private fun init(){

        val quote = intent.getSerializableExtra("QUOTE") as Quote

        quote_text.text = quote.quote;
        by_text.text = quote.author

    }

    fun popup_image(img: Bitmap, sharepath: String) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)
        val path = saveDir + "/" + now + ".jpeg"

        val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val image_popup = inflater.inflate(R.layout.popup_screen, null)
        val mPopupWindow = PopupWindow(
            image_popup,
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        image_popup.img_alert.setImageBitmap(img)


        image_popup.close.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.pop_bg.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.wa.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.whatsapp"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.insta.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.instagram.android"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.dwnld.setOnClickListener {

            share(sharePath)

        }


        if (Build.VERSION.SDK_INT >= 21) {
            mPopupWindow.elevation = 5.0f
        }

        mPopupWindow.isFocusable = true
        mPopupWindow.animationStyle = R.style.popupAnimation
        mPopupWindow.showAtLocation(bg_, Gravity.CENTER, 0, 0)
    }

    private fun share(sharePath: String) {

        val file = File(sharePath)
        val uri = Uri.fromFile(file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "image/*"
            putExtra(Intent.EXTRA_STREAM, uri)
        }
        startActivity(Intent.createChooser(intent, "Share Quote.."))
    }
}


```


**(p). `SavedActivity.kt`**

> Our `SavedActivity` class.

Create a Kotlin file named `SavedActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `Toast` from the `android.widget` package.
3. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
4. `StaggeredGridLayoutManager` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_saved` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `getSaved()`.

**(a). Our `getSaved()` function.**

A function to get saved:

```kotlin
    fun getSaved(){
        roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", ":$t ");
                saved_list = t

                adapter = SavedAdapter(this@SavedActivity,saved_list)
                rv_saved.adapter = adapter
            }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.hadi.inspire.Adapter.QuoteAdapter
import com.hadi.inspire.Adapter.SavedAdapter
import com.hadi.inspire.Components.AppDatabase
import com.hadi.inspire.Components.DatabaseClient
import com.hadi.inspire.Components.Quote
import com.hadi.inspire.Model.ResultsItem
import com.hadi.inspire.R
import com.hadi.inspire.Utils.MarginItemDecoration
import com.hadi.inspire.Utils.RecyclerItemClickListener
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_saved.*

class SavedActivity : AppCompatActivity() {

    lateinit var roomDb: AppDatabase
    var saved_list = mutableListOf<Quote>()
    lateinit var adapter:SavedAdapter

    companion object{
        var saved_list= arrayListOf<Quote>()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_saved)

        roomDb = DatabaseClient.getInstance(this).appDatabase

        rv_saved.setHasFixedSize(true)
        rv_saved.layoutManager = StaggeredGridLayoutManager(2,LinearLayoutManager.VERTICAL)
        rv_saved.addItemDecoration(MarginItemDecoration(10))

        getSaved()




        back_saved.setOnClickListener {
            finish()
        }
    }

    @SuppressLint("CheckResult")
    fun getSaved(){
        roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", ":$t ");
                saved_list = t

                adapter = SavedAdapter(this@SavedActivity,saved_list)
                rv_saved.adapter = adapter
            }
    }
}



```


**(q). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `PagerSnapHelper` from the `androidx.recyclerview.widget` package.
2. `RecyclerView` from the `androidx.recyclerview.widget` package.
3. `ViewPager2` from the `androidx.viewpager2.widget` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_main` package.
5. `*` from the `kotlinx.android.synthetic.main.popup_screen.view` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onPageSelected(position: Int) `.
3. `onResponse(call: Call<QuoteModel?>, response: Response<QuoteModel?>) `.
4. `onFailure(call: Call<QuoteModel?>, t: Throwable) `.
5. `onItemClick(item: ResultsItem) `.
6. `onPermissionsChecked(report: MultiplePermissionsReport) `.
7. `onBackPressed() `.

Then we will be creating the following functions:

1. `init()`.
2. `getSaved() `.
3. `getQuotes() `.
4. `popup_image(img: Bitmap, sharepath: String) `.
5. `requestReadPermissions() `.
6. `takeSS(parameter)` - Pass to this method a `View` object as a parameter.
7. `share(parameter)` - Our function will take a `String` object as a parameter.
8. `closeChoice(parameter)` - Pass to this method a `View` object as a parameter.
9. `showSettingsDialog() `.
10. `openSettings() `.

**(a). Our `openSettings()` function.**

A function to open settings:

```kotlin
    private fun openSettings() {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        val uri = Uri.fromParts("package", packageName, null)
        intent.data = uri
        startActivityForResult(intent, 101)
    }
```

**(b). Our `init()` function.**

Write this function as follows:

```kotlin
    fun init(){
        val builder = StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure()

        roomDb = DatabaseClient.getInstance(this).appDatabase

        this.window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)

        background = findViewById(R.id.bg_)
        val intent =
            this.intent //get the intent to receive the x and y coords, that you passed before
        val rootLayout =
            findViewById<RelativeLayout>(R.id.bg_) //there you have to get the root layout of your second activity
        mRevealAnimation = RevealAnimation(rootLayout, intent, this)


        btn_save.isEnabled = false
        btn_share.isEnabled = false

        requestReadPermissions()


//        if(getIntent()!=null){
//            val quote = intent.getSerializableExtra("QUOTE") as Quote
//
//            val pos = quote.position
//            val id = quote.id
//            val auth = quote.author
//            val text = quote.quote
//            val isSelected = true
//
//            val res = ResultsItem(text,auth,id)
//            var _list = arrayListOf<ResultsItem>()
//            _list.add(res)
//
//            val adapter = QuoteAdapter(this,list,this)
//            vp.adapter = adapter
//
//
//
//            val poss = intent.getIntExtra("QUOTE_POS",0)
//            vp.currentItem = poss
//
//
//        }else{
            getSaved()
            getQuotes()
//        }
    }
```

**(c). Our `showSettingsDialog()` function.**

A function to show settings dialog:

```kotlin
    private fun showSettingsDialog() {
        val builder: AlertDialog.Builder = AlertDialog.Builder(this)
        builder.setTitle("Need Permissions")
        builder.setMessage("This app needs permission to use this feature. You can grant them in app settings.")
        builder.setPositiveButton("GOTO SETTINGS",
            DialogInterface.OnClickListener { dialog, which ->
                dialog.cancel()
                openSettings()
            })
        builder.setNegativeButton("Cancel",
            DialogInterface.OnClickListener { dialog, which -> dialog.cancel() })
        builder.show()
    }
```

**(d). Our `getSaved()` function.**

A function to get saved:

```kotlin
    private fun getSaved() {

            roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", ":$t ");
                saved_list = t
            }

    }
```

**(e). Our `closeChoice()` function.**

A function to close choice:

```kotlin
    fun closeChoice(view: View) {
        mRevealAnimation.unRevealActivity()
    }
```

**(f). Our `popup_image()` function.**

Write this function as follows:

```kotlin
    fun popup_image(img: Bitmap, sharepath: String) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)
        val path = saveDir + "/" + now + ".jpeg"

        val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val image_popup = inflater.inflate(R.layout.popup_screen, null)
        val mPopupWindow = PopupWindow(
            image_popup,
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        image_popup.img_alert.setImageBitmap(img)


        image_popup.close.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.pop_bg.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.wa.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.whatsapp"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.insta.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.instagram.android"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.dwnld.setOnClickListener {

            share(sharePath)

        }


        if (Build.VERSION.SDK_INT >= 21) {
            mPopupWindow.elevation = 5.0f
        }

        mPopupWindow.isFocusable = true
        mPopupWindow.animationStyle = R.style.popupAnimation
        mPopupWindow.showAtLocation(bg_, Gravity.CENTER, 0, 0)
    }
```

**(g). Our `requestReadPermissions()` function.**

A function to request read permissions:

```kotlin
    private fun requestReadPermissions() {

        Dexter.withActivity(this)
            .withPermissions(
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
            .withListener(object : MultiplePermissionsListener {
                override fun onPermissionsChecked(report: MultiplePermissionsReport) { // check if all permissions are granted
                    if (report.areAllPermissionsGranted()) {

                        file_loc = File(
                            "" +
                                    Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/"
                                    + "Inspire"
                        );


                        //FileUtils.deleteDirectory(file_loc)


                        if (!file_loc.exists()) {
                            file_loc.mkdir()
                        } else {

                            var files = file_loc.listFiles()
                            if(files.isNotEmpty()) {
                                for (i in 0..files.lastIndex) {
                                    files.get(i).delete()
                                }
                            }

                        }

                        dirPath = file_loc.absolutePath



                    }
                    // check for permanent denial of any permission
                    if (report.isAnyPermissionPermanentlyDenied) { // show alert dialog navigating to Settings
                        //showSettingsDialog()
                        Toast.makeText(
                            this@MainActivity,
                            "Storage Permission Required.!",
                            Toast.LENGTH_SHORT
                        ).show();
                    }
                }

                override fun onPermissionRationaleShouldBeShown(
                    permissions: List<PermissionRequest>,
                    token: PermissionToken
                ) {
                    token.continuePermissionRequest()
                }
            }).withErrorListener {
                Toast.makeText(applicationContext, "Error occurred! ", Toast.LENGTH_SHORT).show()
            }
            .onSameThread()
            .check()
    }
```

**(h). Our `getQuotes()` function.**

A function to get quotes:

```kotlin
    private fun getQuotes() {
        lottie.playAnimation()

        val apiInterface = RetrofitClient.getInstance(this)
        val call = apiInterface.quote.getQuote

        call.enqueue(object : Callback<QuoteModel?>, QuoteAdapter.OnItemClickListener {

            override fun onResponse(call: Call<QuoteModel?>, response: Response<QuoteModel?>) {

//                progress.visibility = View.GONE

                lottie.cancelAnimation()
                lottie.visibility = View.GONE

                if (response.isSuccessful) {


                    btn_save.isEnabled = true
                    btn_share.isEnabled = true

                    //Log.d("RESSSSSSS", response.body().toString())

                    val data = response.body()
                    list = data?.results as ArrayList
                    //list.shuffle()

                    adapter = QuoteAdapter(this@MainActivity, list, this)
                    vp.adapter = adapter


//                    for( i in 0..list.lastIndex){
//                        quote_list.add(Quote(list.get(i).id,list[i].quoteText,list[i].quoteAuthor))
//                    }

                } else {
                    Toast.makeText(
                        this@MainActivity,
                        response.errorBody().toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onFailure(call: Call<QuoteModel?>, t: Throwable) {
                Toast.makeText(this@MainActivity, t.message, Toast.LENGTH_SHORT).show()
                lottie.cancelAnimation()

                lottie.visibility = View.GONE
                btn_save.isEnabled = false
                btn_share.isEnabled = false
            }

            override fun onItemClick(item: ResultsItem) {

            }
        })
    }
```

**(i). Our `takeSS()` function.**

A function to take s s:

```kotlin
    private fun takeSS(v: View) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)

        try {
            // image naming and path  to include sd card  appending name you choose for file
            val mPath = dirPath + "/" + now + ".jpeg"

            // create bitmap screen capture
            v.isDrawingCacheEnabled = true
            val bitmap = Bitmap.createBitmap(v.drawingCache)
            v.isDrawingCacheEnabled = false

            val imageFile = File(mPath)

            val outputStream = FileOutputStream(imageFile)
            val quality = 100
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)




            outputStream.flush()
            outputStream.close()

            //setting screenshot in imageview
            val filePath = imageFile.path

            val ssbitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
            sharePath = filePath;
            //share(sharePath)
            popup_image(bitmap, sharePath)
        } catch (e: Throwable) {
            // Several error may come out with file handling or DOM
            e.printStackTrace()
        }

    }
```

**(j). Our `share()` function.**

Write this function as follows:

```kotlin
    private fun share(sharePath: String) {

        val file = File(sharePath)
        val uri = Uri.fromFile(file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "image/*"
            putExtra(Intent.EXTRA_STREAM, uri)
        }
        startActivity(Intent.createChooser(intent, "Share Quote.."))
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.os.StrictMode
import android.provider.Settings
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.PopupWindow
import android.widget.RelativeLayout
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.PagerSnapHelper
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.hadi.inspire.Adapter.QuoteAdapter
import com.hadi.inspire.Components.AppDatabase
import com.hadi.inspire.Components.DatabaseClient
import com.hadi.inspire.Components.Quote
import com.hadi.inspire.Model.QuoteModel
import com.hadi.inspire.Model.ResultsItem
import com.hadi.inspire.Network.RetrofitClient
import com.hadi.inspire.R
import com.hadi.inspire.Utils.RevealAnimation
import com.hadi.inspire.Utils.ViewPressEffectHelper
import com.karumi.dexter.Dexter
import com.karumi.dexter.MultiplePermissionsReport
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.multi.MultiplePermissionsListener
import io.reactivex.Completable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.popup_screen.view.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileOutputStream
import java.util.*

class MainActivity : AppCompatActivity(), QuoteAdapter.OnItemClickListener {

    var list = arrayListOf<ResultsItem>()
    var quote_list = mutableListOf<Quote>()
    var saved_list = mutableListOf<Quote>()
    lateinit var background: View
    lateinit var mRevealAnimation: RevealAnimation
    val colorList = arrayListOf<Int>()
    lateinit var adapter: QuoteAdapter
    var rv_pos = 0;
    private var sharePath = "no"
    internal var dirPath = ""
    internal var saveDir = ""
    lateinit var file_loc: File
    lateinit var file_saved: File
    lateinit var roomDb: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        init()





        ViewPressEffectHelper.attach(btn_save)
        btn_save.setOnClickListener {



            var id_list = arrayListOf<String>()
            for(i in 0..saved_list.lastIndex){
                id_list.add(saved_list[i].id)
            }


            if(saved_list.isEmpty()){

                val quote = Quote()

                quote.id = list[rv_pos].id
                quote.author = list[rv_pos].quoteAuthor
                quote.quote = list[rv_pos].quoteText

                Completable.fromAction {
                    roomDb.quoteDao().insert(quote)
                }.subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe {
                        //Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show();
                        btn_save.setImageResource(R.drawable.ic_heart_fill)
                    }

            }
            else{

                val quote = Quote()

                quote.id = list[rv_pos].id
                quote.author = list[rv_pos].quoteAuthor
                quote.quote = list[rv_pos].quoteText
                quote.position = rv_pos


                for( i in 0..saved_list.lastIndex){

                    if(saved_list[i].id == list[rv_pos].id){

                        Completable.fromAction {
                            roomDb.quoteDao().delete(saved_list.get(i))
                        }.subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe {
                                //Toast.makeText(this, "Removed", Toast.LENGTH_SHORT).show();
                                btn_save.setImageResource(R.drawable.ic_heart)
                            }

                    }else{

                        Completable.fromAction {
                            roomDb.quoteDao().insert(quote)
                        }.subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe {
                                //Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show();
                                btn_save.setImageResource(R.drawable.ic_heart_fill)
                            }

                    }

                }

            }


        }

        ViewPressEffectHelper.attach(btn_share)
        btn_share.setOnClickListener {

            //takeSS(rv_quote.findViewHolderForAdapterPosition(rv_pos)!!.itemView)
            takeSS(vp)
        }

        //vp.orientation = ViewPager2.ORIENTATION_VERTICAL

        vp.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {

            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)

                rv_pos = position;

                var id_list = arrayListOf<String>()

                for(i in 0..saved_list.lastIndex){
                    id_list.add(saved_list[i].id)
                }

                if(id_list.contains(list[position].id)){
                   // Toast.makeText(this@MainActivity,"TRUE",Toast.LENGTH_SHORT).show()
                    btn_save.setImageResource(R.drawable.ic_heart_fill)
                }else{
                    //Toast.makeText(this@MainActivity,"FALSE",Toast.LENGTH_SHORT).show()
                    btn_save.setImageResource(R.drawable.ic_heart)
                }
            }
        })

    }

    fun init(){
        val builder = StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure()

        roomDb = DatabaseClient.getInstance(this).appDatabase

        this.window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)

        background = findViewById(R.id.bg_)
        val intent =
            this.intent //get the intent to receive the x and y coords, that you passed before
        val rootLayout =
            findViewById<RelativeLayout>(R.id.bg_) //there you have to get the root layout of your second activity
        mRevealAnimation = RevealAnimation(rootLayout, intent, this)


        btn_save.isEnabled = false
        btn_share.isEnabled = false

        requestReadPermissions()


//        if(getIntent()!=null){
//            val quote = intent.getSerializableExtra("QUOTE") as Quote
//
//            val pos = quote.position
//            val id = quote.id
//            val auth = quote.author
//            val text = quote.quote
//            val isSelected = true
//
//            val res = ResultsItem(text,auth,id)
//            var _list = arrayListOf<ResultsItem>()
//            _list.add(res)
//
//            val adapter = QuoteAdapter(this,list,this)
//            vp.adapter = adapter
//
//
//
//            val poss = intent.getIntExtra("QUOTE_POS",0)
//            vp.currentItem = poss
//
//
//        }else{
            getSaved()
            getQuotes()
//        }
    }

    @SuppressLint("CheckResult")
    private fun getSaved() {

            roomDb.quoteDao().all.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t ->
                Log.d("SAVED_LI", ":$t ");
                saved_list = t
            }

    }



    private fun getQuotes() {
        lottie.playAnimation()

        val apiInterface = RetrofitClient.getInstance(this)
        val call = apiInterface.quote.getQuote

        call.enqueue(object : Callback<QuoteModel?>, QuoteAdapter.OnItemClickListener {

            override fun onResponse(call: Call<QuoteModel?>, response: Response<QuoteModel?>) {

//                progress.visibility = View.GONE

                lottie.cancelAnimation()
                lottie.visibility = View.GONE

                if (response.isSuccessful) {


                    btn_save.isEnabled = true
                    btn_share.isEnabled = true

                    //Log.d("RESSSSSSS", response.body().toString())

                    val data = response.body()
                    list = data?.results as ArrayList
                    //list.shuffle()

                    adapter = QuoteAdapter(this@MainActivity, list, this)
                    vp.adapter = adapter


//                    for( i in 0..list.lastIndex){
//                        quote_list.add(Quote(list.get(i).id,list[i].quoteText,list[i].quoteAuthor))
//                    }

                } else {
                    Toast.makeText(
                        this@MainActivity,
                        response.errorBody().toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onFailure(call: Call<QuoteModel?>, t: Throwable) {
                Toast.makeText(this@MainActivity, t.message, Toast.LENGTH_SHORT).show()
                lottie.cancelAnimation()

                lottie.visibility = View.GONE
                btn_save.isEnabled = false
                btn_share.isEnabled = false
            }

            override fun onItemClick(item: ResultsItem) {

            }
        })
    }

    fun popup_image(img: Bitmap, sharepath: String) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)
        val path = saveDir + "/" + now + ".jpeg"

        val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val image_popup = inflater.inflate(R.layout.popup_screen, null)
        val mPopupWindow = PopupWindow(
            image_popup,
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        image_popup.img_alert.setImageBitmap(img)


        image_popup.close.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.pop_bg.setOnClickListener {
            mPopupWindow.dismiss()
        }

        image_popup.wa.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.whatsapp"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.insta.setOnClickListener {
            val file = File(sharePath)
            val uri = Uri.fromFile(file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "image/*"
                putExtra(Intent.EXTRA_STREAM, uri)
                `package` = "com.instagram.android"
            }
            startActivity(Intent.createChooser(intent, "Share Quote.."))
        }

        image_popup.dwnld.setOnClickListener {

            share(sharePath)

        }


        if (Build.VERSION.SDK_INT >= 21) {
            mPopupWindow.elevation = 5.0f
        }

        mPopupWindow.isFocusable = true
        mPopupWindow.animationStyle = R.style.popupAnimation
        mPopupWindow.showAtLocation(bg_, Gravity.CENTER, 0, 0)
    }

    private fun requestReadPermissions() {

        Dexter.withActivity(this)
            .withPermissions(
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
            .withListener(object : MultiplePermissionsListener {
                override fun onPermissionsChecked(report: MultiplePermissionsReport) { // check if all permissions are granted
                    if (report.areAllPermissionsGranted()) {

                        file_loc = File(
                            "" +
                                    Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/"
                                    + "Inspire"
                        );


                        //FileUtils.deleteDirectory(file_loc)


                        if (!file_loc.exists()) {
                            file_loc.mkdir()
                        } else {

                            var files = file_loc.listFiles()
                            if(files.isNotEmpty()) {
                                for (i in 0..files.lastIndex) {
                                    files.get(i).delete()
                                }
                            }

                        }

                        dirPath = file_loc.absolutePath



                    }
                    // check for permanent denial of any permission
                    if (report.isAnyPermissionPermanentlyDenied) { // show alert dialog navigating to Settings
                        //showSettingsDialog()
                        Toast.makeText(
                            this@MainActivity,
                            "Storage Permission Required.!",
                            Toast.LENGTH_SHORT
                        ).show();
                    }
                }

                override fun onPermissionRationaleShouldBeShown(
                    permissions: List<PermissionRequest>,
                    token: PermissionToken
                ) {
                    token.continuePermissionRequest()
                }
            }).withErrorListener {
                Toast.makeText(applicationContext, "Error occurred! ", Toast.LENGTH_SHORT).show()
            }
            .onSameThread()
            .check()
    }

    private fun takeSS(v: View) {
        val now = Date()
        android.text.format.DateFormat.format("yyyy-MM-dd_hh:mm:ss", now)

        try {
            // image naming and path  to include sd card  appending name you choose for file
            val mPath = dirPath + "/" + now + ".jpeg"

            // create bitmap screen capture
            v.isDrawingCacheEnabled = true
            val bitmap = Bitmap.createBitmap(v.drawingCache)
            v.isDrawingCacheEnabled = false

            val imageFile = File(mPath)

            val outputStream = FileOutputStream(imageFile)
            val quality = 100
            bitmap.compress(Bitmap.CompressFormat.JPEG, quality, outputStream)




            outputStream.flush()
            outputStream.close()

            //setting screenshot in imageview
            val filePath = imageFile.path

            val ssbitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
            sharePath = filePath;
            //share(sharePath)
            popup_image(bitmap, sharePath)
        } catch (e: Throwable) {
            // Several error may come out with file handling or DOM
            e.printStackTrace()
        }

    }


    private fun share(sharePath: String) {

        val file = File(sharePath)
        val uri = Uri.fromFile(file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "image/*"
            putExtra(Intent.EXTRA_STREAM, uri)
        }
        startActivity(Intent.createChooser(intent, "Share Quote.."))
    }


    override fun onBackPressed() {
        mRevealAnimation.unRevealActivity()
        //finish()
    }

    fun closeChoice(view: View) {
        mRevealAnimation.unRevealActivity()
    }

    private fun showSettingsDialog() {
        val builder: AlertDialog.Builder = AlertDialog.Builder(this)
        builder.setTitle("Need Permissions")
        builder.setMessage("This app needs permission to use this feature. You can grant them in app settings.")
        builder.setPositiveButton("GOTO SETTINGS",
            DialogInterface.OnClickListener { dialog, which ->
                dialog.cancel()
                openSettings()
            })
        builder.setNegativeButton("Cancel",
            DialogInterface.OnClickListener { dialog, which -> dialog.cancel() })
        builder.show()
    }

    private fun openSettings() {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        val uri = Uri.fromParts("package", packageName, null)
        intent.data = uri
        startActivityForResult(intent, 101)
    }

    override fun onItemClick(item: ResultsItem) {

    }
}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/unaisulhadi/Inspire/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/unaisulhadi/Inspire).|
|3.|Follow code author [here](https://github.com/unaisulhadi).|
