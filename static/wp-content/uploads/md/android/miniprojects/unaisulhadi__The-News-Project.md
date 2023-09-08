# Retrofit News-API

>  Simple News Android Application using NewsApi.

### Simple News Android Application using NewsApi

```shell
Add NewsApi key in Constants.JAVA
```


#### Using

- Retrofit
- Lottie
- Custom Tabs
- Shimmer


![The-News-Project Example Tutorial](https://github.com/unaisulhadi/The-News-Project/raw/master/screenshot.jpg)

Let us look at the full Retrofit News-API code.

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

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 16 dependencies:


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
        applicationId "com.hadi.thenewsproject"
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
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'com.google.android.material:material:1.1.0'

    implementation 'com.intuit.sdp:sdp-android:1.0.6'
    implementation 'com.intuit.ssp:ssp-android:1.0.6'
    implementation 'com.airbnb.android:lottie:3.3.0'
    implementation "androidx.viewpager2:viewpager2:1.0.0"

    //RETROFIT
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
    implementation 'com.squareup.retrofit2:converter-gson:2.6.2'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.2.1'

    //GLIDE
    implementation 'com.github.bumptech.glide:glide:4.11.0'
    kapt 'com.github.bumptech.glide:compiler:4.11.0'

    implementation 'com.facebook.shimmer:shimmer:0.5.0'

    implementation 'com.google.code.gson:gson:2.8.6'
    implementation "androidx.browser:browser:1.2.0"

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 5 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. Here we will add the following permission:

1. Our `INTERNET` permission.
2. Our `ACCESS_NETWORK_STATE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.hadi.thenewsproject">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:networkSecurityConfig="@xml/network_security_config"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning">
        <activity android:name=".activity.WebViewActivity"></activity>
        <activity android:name=".activity.NewsViewActivity" />
        <activity
            android:name=".activity.SearchActivity"
            android:windowSoftInputMode="stateVisible" />
        <activity android:name=".activity.MainActivity" />
        <activity
            android:name=".activity.SplashActivity"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        <receiver android:name=".adapter.CustomTabsBroadcastReceiver"
            android:enabled="true">
            <intent-filter>
                <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
            </intent-filter>
        </receiver>
    </application>

</manifest>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `item_latest_placeholder.xml`**

> Our `item_latest_placeholder` layout.

This layout will represent our Placeholder Latest Item's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`CardView`](https://android.examples.directory/cardview)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_65sdp"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:paddingBottom="@dimen/_5sdp"
    android:orientation="vertical">
    
    <androidx.cardview.widget.CardView
        android:id="@+id/cardImg"
        android:layout_width="@dimen/_90sdp"
        android:layout_height="match_parent"
        app:cardCornerRadius="@dimen/_5sdp"
        app:cardBackgroundColor="@color/md_grey_300"
        app:cardElevation="0dp">

        <ImageView
            android:id="@+id/imgNewsLatest"
            android:layout_width="@dimen/_100sdp"
            android:scaleType="centerCrop"
            android:layout_height="match_parent" />


    </androidx.cardview.widget.CardView>



    <TextView
        android:id="@+id/tvNewsTitleLatest"
        style="@style/LatestNews"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/_8sdp"
        android:layout_toEndOf="@id/cardImg"
        android:lines="2"
        android:text=""
        android:background="@color/md_grey_300"
        android:maxLines="2"
        android:textColor="@color/md_black_1000"
        android:textSize="@dimen/_15ssp" />


    <TextView
        android:id="@+id/tvDateLatest"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/tvNewsTitleLatest"
        android:layout_marginStart="@dimen/_8sdp"
        android:layout_marginTop="@dimen/_4sdp"
        android:text=""
        android:background="@color/md_grey_300"
        android:layout_toEndOf="@id/cardImg"
        android:textColor="@color/md_grey_500" />


</RelativeLayout>
```

**(b). `item_latest.xml`**

> Our `item_latest` layout.

This layout will represent our Latest Item's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`CardView`](https://android.examples.directory/cardview)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_60sdp"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical">
    
    <androidx.cardview.widget.CardView
        android:id="@+id/cardImg"
        android:layout_width="@dimen/_90sdp"
        android:layout_height="match_parent"
        app:cardCornerRadius="@dimen/_5sdp"
        app:cardElevation="0dp">

        <ImageView
            android:id="@+id/imgNewsLatest"
            android:layout_width="@dimen/_100sdp"
            android:scaleType="centerCrop"
            android:layout_height="match_parent" />


    </androidx.cardview.widget.CardView>



    <TextView
        android:id="@+id/tvNewsTitleLatest"
        style="@style/LatestNews"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/_8sdp"
        android:layout_toEndOf="@id/cardImg"
        android:lines="2"
        android:text=""
        android:ellipsize="end"
        android:maxLines="2"
        android:textColor="@color/md_black_1000"
        android:textSize="@dimen/_15ssp" />


    <TextView
        android:id="@+id/tvDateLatest"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/tvNewsTitleLatest"
        android:layout_marginStart="@dimen/_8sdp"
        android:layout_marginTop="@dimen/_4sdp"
        android:text=""
        android:layout_toEndOf="@id/cardImg"
        android:textColor="@color/md_grey_500" />


</RelativeLayout>
```

**(c). `item_headline.xml`**

> Our `item_headline` layout.

This layout will represent our Headline Item's layout. Specify [`androidx.cardview.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:cardCornerRadius="@dimen/_8sdp"
    android:background="@color/md_white_1000">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/imgUrl"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scaleType="centerCrop"
            android:contentDescription="@string/news_headline" />

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_alignParentBottom="true"
            android:layout_height="@dimen/_85sdp"
            android:background="@drawable/headline_content_gradient"
            android:padding="@dimen/_5sdp">

            <TextView
                android:id="@+id/tvAuthor"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:textSize="@dimen/_10ssp"
                android:textColor="@color/md_white_1000"
                android:text="@string/author"/>

            <TextView
                android:id="@+id/tvTitle"
                android:layout_below="@id/tvAuthor"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/_5sdp"
                android:maxLines="2"
                android:text="@string/news_title_goes_here"
                android:textColor="@color/md_white_1000"
                android:textSize="@dimen/_12ssp"/>

            <TextView
                android:id="@+id/tvSource"
                android:layout_below="@id/tvTitle"
                android:layout_width="wrap_content"
                android:text="@string/source"
                android:textSize="@dimen/_10ssp"
                android:textColor="@color/md_white_1000"
                android:layout_marginTop="@dimen/_5sdp"
                android:layout_height="wrap_content"/>

            <TextView
                android:id="@+id/tvDate"
                android:layout_below="@id/tvTitle"
                android:layout_width="wrap_content"
                android:layout_marginTop="@dimen/_5sdp"
                android:layout_height="wrap_content"
                android:layout_alignParentEnd="true"
                android:gravity="end"
                android:text="@string/date"
                android:textSize="@dimen/_10ssp"
                android:layout_marginStart="@dimen/_5sdp"
                android:textColor="@color/md_white_1000"
                android:layout_toEndOf="@id/tvSource"/>
        </RelativeLayout>



    </RelativeLayout>



</androidx.cardview.widget.CardView>
```

**(d). `activity_web_view.xml`**

> Our `activity_web_view` layout.

This layout will represent our View Web Activity's layout. Specify [`WebView`](https://android.examples.directory/webview) as it's root element, then add the following [widgets](https://android.examples.directory/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<WebView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.WebViewActivity"/>
```

**(e). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`LottieAnimationView`](https://android.examples.directory/lottieanimationview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#F1F1F1"
    tools:context=".activity.SplashActivity">

    <com.airbnb.lottie.LottieAnimationView
        android:id="@+id/splashhh"
        android:layout_width="@dimen/_100sdp"
        android:layout_height="@dimen/_100sdp"
        app:lottie_loop="true"
        app:lottie_autoPlay="true"
        app:lottie_fileName="newspaper_spinner.json"
        android:layout_centerInParent="true"/>

</RelativeLayout>
```

**(f). `activity_search.xml`**

> Our `activity_search` layout.

This layout will represent our Search Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)
4. [`EditText`](https://android.examples.directory/edittext)
5. [`RecyclerView`](https://android.examples.directory/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#F1F1F1"
    android:orientation="vertical"
    android:padding="@dimen/_8sdp"
    tools:context=".activity.SearchActivity">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/btnBack"
            android:layout_width="@dimen/_25sdp"
            android:layout_height="@dimen/_25sdp"
            android:layout_centerVertical="true"
            android:src="@drawable/ic_back" />

        <TextView
            android:id="@+id/headlineTxt"
            style="@style/AppTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_toEndOf="@+id/btnBack"
            android:layout_marginStart="@dimen/_4sdp"
            android:text="@string/explore"
            android:textColor="@color/md_black_1000" />


    </RelativeLayout>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/_35sdp"
        android:layout_marginTop="@dimen/_8sdp">

        <EditText
            android:id="@+id/edtSearch"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_marginTop="@dimen/_2sdp"
            android:layout_marginBottom="@dimen/_2sdp"
            android:drawableStart="@drawable/search_dr"
            android:drawablePadding="@dimen/_8sdp"
            android:background="@drawable/edt_background"
            android:imeOptions="actionSearch"
            android:singleLine="true"
            android:gravity="center_vertical"
            android:hint="@string/search"
            android:fontFamily="@font/montserrat_medium"
            android:textSize="@dimen/_13sdp" />


    </RelativeLayout>


    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvSearch"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginTop="@dimen/_4sdp"/>

</LinearLayout>
```

**(g). `activity_news_view.xml`**

> Our `activity_news_view` layout.

This layout will represent our View News Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`WebView`](https://android.examples.directory/webview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.NewsViewActivity">

    <WebView
        android:id="@+id/news_webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</RelativeLayout>
```

**(h). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`ViewPager2`](https://android.examples.directory/viewpager2)
5. [`ShimmerFrameLayout`](https://android.examples.directory/shimmerframelayout)
6. [`CardView`](https://android.examples.directory/cardview)
7. [``](https://android.examples.directory/)
8. [`RecyclerView`](https://android.examples.directory/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:shimmer="http://schemas.android.com/apk/res-auto"
    android:background="#F1F1F1"
    android:orientation="vertical"
    android:padding="@dimen/_8sdp"
    tools:context=".activity.MainActivity">


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/headlineTxt"
            style="@style/AppTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/headlines"
            android:textColor="@color/md_black_1000" />

        <ImageView
            android:id="@+id/btnSearch"
            android:layout_width="@dimen/_25sdp"
            android:layout_height="@dimen/_25sdp"
            android:padding="@dimen/_3sdp"
            android:src="@drawable/ic_search"
            android:layout_centerVertical="true"
            android:layout_alignParentEnd="true"/>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="@dimen/_165sdp"
        android:layout_marginTop="@dimen/_4sdp" >


        <androidx.viewpager2.widget.ViewPager2
            android:id="@+id/vp_headlines"
            android:layout_width="match_parent"
            android:layout_height="@dimen/_165sdp"
            android:visibility="gone"/>

        <com.facebook.shimmer.ShimmerFrameLayout
            android:id="@+id/shimmer_headline"
            android:layout_width="match_parent"
            android:layout_height="@dimen/_165sdp">

            <androidx.cardview.widget.CardView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:cardCornerRadius="@dimen/_8sdp"
                app:cardBackgroundColor="@color/md_grey_300"/>

        </com.facebook.shimmer.ShimmerFrameLayout>


    </RelativeLayout>


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="@dimen/_8sdp">

        <TextView
            style="@style/AppTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/latest"
            android:textColor="@color/md_black_1000" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/show_all"
            style="@style/AppContent"
            android:visibility="gone"
            android:background="@drawable/btn_background"
            android:layout_centerVertical="true"
            android:layout_alignParentEnd="true"/>

    </RelativeLayout>


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginTop="@dimen/_5sdp">

        <com.facebook.shimmer.ShimmerFrameLayout
            android:id="@+id/shimmer"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:shimmer_auto_start="true">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="vertical">

                <include layout="@layout/item_latest_placeholder"/>
                <include layout="@layout/item_latest_placeholder"/>
                <include layout="@layout/item_latest_placeholder"/>
                <include layout="@layout/item_latest_placeholder"/>
                <include layout="@layout/item_latest_placeholder"/>

            </LinearLayout>

        </com.facebook.shimmer.ShimmerFrameLayout>

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rv_latest"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:visibility="gone"/>



    </RelativeLayout>



</LinearLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `Utility.java`**

> Our `Utility` class.

Create a java file named `Utility.java`.

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `ConnectivityManager` from the `android.net` package.
3. `NetworkInfo` from the `android.net` package.

We will be creating the following methods:

1. `hasNetwork(Context context)` - It will return `Boolean` object.

**(a). Our `hasNetwork()` method.**

A method to has network:

```java
    public static Boolean hasNetwork(Context context) {
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


public class Utility {

    public static Boolean hasNetwork(Context context) {
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

**(b). `SessionSave.kt`**

> Our `SessionSave` class.

Create a Kotlin file named `SessionSave.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Activity` from the `android.app` package.
2. `Context` from the `android.content` package.

Then we will be creating the following functions:

1. `getUserSession(key: String?, context: Context): String? `.
2. `deleteSession(parameter)` - This function will take a `Context` object as a parameter.

**(a). Our `deleteSession()` function.**

A function to delete session:

```kotlin
    fun deleteSession(context: Context) {
        val editor =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE).edit()
        editor.clear()
        editor.apply()
    }
```

**(b). Our `saveUserSession()` function.**

A function to save user session:

```kotlin
    fun saveUserSession(
        key: String?,
        value: String?,
        context: Context
    ) {
        val editor =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE).edit()
        editor.putString(key, value)
        editor.apply()
    }
```

**(c). Our `getUserSession()` function.**

A function to get user session:

```kotlin
    fun getUserSession(key: String?, context: Context): String? {
        val prefs =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE)
        return prefs.getString(key, "")
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.content.Context


/**
 * This common class to store the require data by using SharedPreferences.
 */
object SessionSave {
    //Store data's into sharedPreference
    fun saveUserSession(
        key: String?,
        value: String?,
        context: Context
    ) {
        val editor =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE).edit()
        editor.putString(key, value)
        editor.apply()
    }

    // Get Data's from SharedPreferences
    fun getUserSession(key: String?, context: Context): String? {
        val prefs =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE)
        return prefs.getString(key, "")
    }

    fun deleteSession(context: Context) {
        val editor =
            context.getSharedPreferences("USER_DETAIL", Activity.MODE_PRIVATE).edit()
        editor.clear()
        editor.apply()
    }
}


```


**(c). `MarginItemDecoration.kt`**

> Our `MarginItemDecoration` class.

Create a Kotlin file named `MarginItemDecoration.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Rect` from the `android.graphics` package.
2. `View` from the `android.view` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.

Then extend the `RecyclerView.ItemDecoration` and add its contents as follows:

First override these callbacks: 


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class MarginItemDecoration(private val spaceHeight: Int) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(outRect: Rect, view: View,
                                parent: RecyclerView, state: RecyclerView.State) {
        with(outRect) {
            //if (parent.getChildAdapterPosition(view) == 0) {
//                top = spaceHeight
            //}
//            left =  spaceHeight
            right = spaceHeight
//            bottom = spaceHeight
        }
    }
}

```


**(d). `LatestItemDecoration.kt`**

> Our `LatestItemDecoration` class.

Create a Kotlin file named `LatestItemDecoration.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Rect` from the `android.graphics` package.
2. `View` from the `android.view` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.

Then extend the `RecyclerView.ItemDecoration` and add its contents as follows:

First override these callbacks: 


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class LatestItemDecoration(private val spaceHeight: Int) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(outRect: Rect, view: View,
                                parent: RecyclerView, state: RecyclerView.State) {
        with(outRect) {
            if (parent.getChildAdapterPosition(view) == 0) {
                top = spaceHeight
            }
//            left =  spaceHeight
//            right = spaceHeight
            bottom = spaceHeight
        }
    }
}

```


**(e). `HorizontalMarginItemDecoration.kt`**

> Our `HorizontalMarginItemDecoration` class.

Create a Kotlin file named `HorizontalMarginItemDecoration.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Context` from the `android.content` package.
2. `Rect` from the `android.graphics` package.
3. `View` from the `android.view` package.
4. `DimenRes` from the `androidx.annotation` package.
5. `RecyclerView` from the `androidx.recyclerview.widget` package.

First override these callbacks: 


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.graphics.Rect
import android.view.View
import androidx.annotation.DimenRes
import androidx.recyclerview.widget.RecyclerView

class HorizontalMarginItemDecoration(context: Context, @DimenRes horizontalMarginInDp: Int) :
    RecyclerView.ItemDecoration() {

    private val horizontalMarginInPx: Int =
        context.resources.getDimension(horizontalMarginInDp).toInt()

    override fun getItemOffsets(
        outRect: Rect, view: View, parent: RecyclerView, state: RecyclerView.State
    ) {
        outRect.right = horizontalMarginInPx
        outRect.left = horizontalMarginInPx
    }

}

```


**(f). `Extension.kt`**

> Our `Extension` class.

Create a Kotlin file named `Extension.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Context` from the `android.content` package.
2. `View` from the `android.view` package.
3. `InputMethodManager` from the `android.view.inputmethod` package.

Then we will be creating the following functions:

1. `View.hideKeyboard() `.

**(a). Our `View.hideKeyboard()` function.**

A function to  view.hide keyboard:

```kotlin
fun View.hideKeyboard() {
    val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(windowToken, 0)
}
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.view.View
import android.view.inputmethod.InputMethodManager

fun View.hideKeyboard() {
    val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(windowToken, 0)
}

```


**(g). `CustomTabHelper.kt`**

> Our `CustomTabHelper` class.

Create a Kotlin file named `CustomTabHelper.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `PackageManager` from the `android.content.pm` package.
3. `Uri` from the `android.net` package.
4. `TextUtils` from the `android.text` package.
5. `CustomTabsService` from the `androidx.browser.customtabs` package.

Then we will be creating the following functions:

1. `getPackageNameToUse(context: Context, url: String): String? `.
2. `hasSpecializedHandlerIntents(context: Context, intent: Intent): Boolean `.

**(a). Our `hasSpecializedHandlerIntents()` function.**

A function to has specialized handler intents:

```kotlin
    private fun hasSpecializedHandlerIntents(context: Context, intent: Intent): Boolean {
        try {
            val pm = context.getPackageManager()
            val handlers = pm.queryIntentActivities(
                    intent,
                    PackageManager.GET_RESOLVED_FILTER)
            if (handlers == null || handlers.size == 0) {
                return false
            }
            for (resolveInfo in handlers) {
                val filter = resolveInfo.filter ?: continue
                if (filter.countDataAuthorities() == 0 || filter.countDataPaths() == 0) continue
                if (resolveInfo.activityInfo == null) continue
                return true
            }
        } catch (e: RuntimeException) {
        }
        return false
    }
```

**(b). Our `getPackageNameToUse()` function.**

A function to get package name to use:

```kotlin
    fun getPackageNameToUse(context: Context, url: String): String? {

        sPackageNameToUse?.let {
            return it
        }

        val pm = context.getPackageManager()

        val activityIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        val defaultViewHandlerInfo = pm.resolveActivity(activityIntent, 0)
        var defaultViewHandlerPackageName: String? = null

        defaultViewHandlerInfo?.let {
            defaultViewHandlerPackageName = it.activityInfo.packageName
        }

        val resolvedActivityList = pm.queryIntentActivities(activityIntent, 0)
        val packagesSupportingCustomTabs = ArrayList<String>()
        for (info in resolvedActivityList) {
            val serviceIntent = Intent()
            serviceIntent.action = CustomTabsService.ACTION_CUSTOM_TABS_CONNECTION
            serviceIntent.setPackage(info.activityInfo.packageName)

            pm.resolveService(serviceIntent, 0)?.let {
                packagesSupportingCustomTabs.add(info.activityInfo.packageName)
            }
        }

        when {
            packagesSupportingCustomTabs.isEmpty() -> sPackageNameToUse = null
            packagesSupportingCustomTabs.size == 1 -> sPackageNameToUse = packagesSupportingCustomTabs.get(0)
            !TextUtils.isEmpty(defaultViewHandlerPackageName)
                    && !hasSpecializedHandlerIntents(context, activityIntent)
                    && packagesSupportingCustomTabs.contains(defaultViewHandlerPackageName) ->
                sPackageNameToUse = defaultViewHandlerPackageName
            packagesSupportingCustomTabs.contains(STABLE_PACKAGE) -> sPackageNameToUse = STABLE_PACKAGE
            packagesSupportingCustomTabs.contains(BETA_PACKAGE) -> sPackageNameToUse = BETA_PACKAGE
            packagesSupportingCustomTabs.contains(DEV_PACKAGE) -> sPackageNameToUse = DEV_PACKAGE
            packagesSupportingCustomTabs.contains(LOCAL_PACKAGE) -> sPackageNameToUse = LOCAL_PACKAGE
        }
        return sPackageNameToUse
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.text.TextUtils
import androidx.browser.customtabs.CustomTabsService

/**
 * Created by akshaynandwana on
 * 08, February, 2019
 **/
class CustomTabHelper {

    companion object {
        var sPackageNameToUse: String? = null
        val STABLE_PACKAGE = "com.android.chrome"
        val BETA_PACKAGE = "com.chrome.beta"
        val DEV_PACKAGE = "com.chrome.dev"
        val LOCAL_PACKAGE = "com.google.android.apps.chrome"
    }

    fun getPackageNameToUse(context: Context, url: String): String? {

        sPackageNameToUse?.let {
            return it
        }

        val pm = context.getPackageManager()

        val activityIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        val defaultViewHandlerInfo = pm.resolveActivity(activityIntent, 0)
        var defaultViewHandlerPackageName: String? = null

        defaultViewHandlerInfo?.let {
            defaultViewHandlerPackageName = it.activityInfo.packageName
        }

        val resolvedActivityList = pm.queryIntentActivities(activityIntent, 0)
        val packagesSupportingCustomTabs = ArrayList<String>()
        for (info in resolvedActivityList) {
            val serviceIntent = Intent()
            serviceIntent.action = CustomTabsService.ACTION_CUSTOM_TABS_CONNECTION
            serviceIntent.setPackage(info.activityInfo.packageName)

            pm.resolveService(serviceIntent, 0)?.let {
                packagesSupportingCustomTabs.add(info.activityInfo.packageName)
            }
        }

        when {
            packagesSupportingCustomTabs.isEmpty() -> sPackageNameToUse = null
            packagesSupportingCustomTabs.size == 1 -> sPackageNameToUse = packagesSupportingCustomTabs.get(0)
            !TextUtils.isEmpty(defaultViewHandlerPackageName)
                    && !hasSpecializedHandlerIntents(context, activityIntent)
                    && packagesSupportingCustomTabs.contains(defaultViewHandlerPackageName) ->
                sPackageNameToUse = defaultViewHandlerPackageName
            packagesSupportingCustomTabs.contains(STABLE_PACKAGE) -> sPackageNameToUse = STABLE_PACKAGE
            packagesSupportingCustomTabs.contains(BETA_PACKAGE) -> sPackageNameToUse = BETA_PACKAGE
            packagesSupportingCustomTabs.contains(DEV_PACKAGE) -> sPackageNameToUse = DEV_PACKAGE
            packagesSupportingCustomTabs.contains(LOCAL_PACKAGE) -> sPackageNameToUse = LOCAL_PACKAGE
        }
        return sPackageNameToUse
    }

    private fun hasSpecializedHandlerIntents(context: Context, intent: Intent): Boolean {
        try {
            val pm = context.getPackageManager()
            val handlers = pm.queryIntentActivities(
                    intent,
                    PackageManager.GET_RESOLVED_FILTER)
            if (handlers == null || handlers.size == 0) {
                return false
            }
            for (resolveInfo in handlers) {
                val filter = resolveInfo.filter ?: continue
                if (filter.countDataAuthorities() == 0 || filter.countDataPaths() == 0) continue
                if (resolveInfo.activityInfo == null) continue
                return true
            }
        } catch (e: RuntimeException) {
        }
        return false
    }
}

```


**(h). `Constatnts.java`**

> Our `Constatnts` class.

Create a java file named `Constatnts.java`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

public class Constatnts {
    public static String API_KEY = "";
    public static String COUNTRY = "in";
    public static String EXTRA_URL = "extra.url";
}


```

**(i). `RetrofitClient.java`**

> Our `RetrofitClient` class.

Create a java file named `RetrofitClient.java`.

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.

We will be creating the following methods:

1. `networkInterceptor()` - It will return `Interceptor` object.

2. `cache(Context context)` - It will return `Cache` object.

3. `offlineInterceptor(Context context)` - It will return `Interceptor` object.

4. `getNews()` - It will return `ApiInterface` object.

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

**(b). Our `cache()` method.**

Write this method as follows:

```java
    private Cache cache(Context context) {
        return new Cache(new File(context.getCacheDir(), "RetrofitMVVM"), cacheSize);
    }
```

**(c). Our `getNews()` method.**

A method to get news:

```java
    public ApiInterface getNews() {
        return retrofit.create(ApiInterface.class);
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

import com.hadi.thenewsproject.utils.Utility;

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
        private static final String BASE_URL = "http://newsapi.org/v2/";
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

    public ApiInterface getNews() {
        return retrofit.create(ApiInterface.class);
    }
}


```

**(j). `ApiInterface.kt`**

> Our `ApiInterface` class.

Create a Kotlin file named `ApiInterface.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import com.hadi.thenewsproject.model.Headlines
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface ApiInterface {

    @GET("top-headlines")
    fun getHeadlines(
        @Query("country") country:String,
        @Query("apiKey") apiKey:String
    ): Call<Headlines>

    @GET("everything")
    fun searchNews(
        @Query("q") query:String,
        @Query("apiKey") apiKey: String
    ) : Call<Headlines>


}

```


**(k). `Source.java`**

> Our `Source` class.

Create a java file named `Source.java`.

We will be overriding the following methods: 

1. `toString(){`.

We will be creating the following methods:

1. `setName(String name)`.

2. `getName()` - It will return `String` object.

3. `setId(Object id)`.

4. `getId()` - It will return `Object` object.

**(a). Our `setName()` method.**

A method to set name:

```java
	public void setName(String name){
		this.name = name;
	}
```

**(b). Our `getName()` method.**

A method to get name:

```java
	public String getName(){
		return name;
	}
```

**(c). Our `setId()` method.**

A method to set id:

```java
	public void setId(Object id){
		this.id = id;
	}
```

**(d). Our `getId()` method.**

A method to get id:

```java
	public Object getId(){
		return id;
	}
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import com.google.gson.annotations.SerializedName;

public class Source{

	@SerializedName("name")
	private String name;

	@SerializedName("id")
	private Object id;

	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setId(Object id){
		this.id = id;
	}

	public Object getId(){
		return id;
	}

	@Override
 	public String toString(){
		return 
			"Source{" + 
			"name = '" + name + '\'' + 
			",id = '" + id + '\'' + 
			"}";
		}
}

```

**(m). `Headlines.java`**

> Our `Headlines` class.

Create a java file named `Headlines.java`.

We will be overriding the following methods: 

1. `toString(){`.

We will be creating the following methods:

1. `setTotalResults(int totalResults)`.

2. `getTotalResults()` - It will return `int` object.

3. `setArticles(List<ArticlesItem> articles)`.

4. `getArticles()` - It will return `List<ArticlesItem>` object.

5. `setStatus(String status)`.

6. `getStatus()` - It will return `String` object.

**(a). Our `setTotalResults()` method.**

A method to set total results:

```java
	public void setTotalResults(int totalResults){
		this.totalResults = totalResults;
	}
```

**(b). Our `setArticles()` method.**

A method to set articles:

```java
	public void setArticles(List<ArticlesItem> articles){
		this.articles = articles;
	}
```

**(c). Our `setStatus()` method.**

A method to set status:

```java
	public void setStatus(String status){
		this.status = status;
	}
```

**(d). Our `getTotalResults()` method.**

A method to get total results:

```java
	public int getTotalResults(){
		return totalResults;
	}
```

**(e). Our `getArticles()` method.**

A method to get articles:

```java
	public List<ArticlesItem> getArticles(){
		return articles;
	}
```

**(f). Our `getStatus()` method.**

A method to get status:

```java
	public String getStatus(){
		return status;
	}
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import java.util.List;
import com.google.gson.annotations.SerializedName;

public class Headlines{

	@SerializedName("totalResults")
	private int totalResults;

	@SerializedName("articles")
	private List<ArticlesItem> articles;

	@SerializedName("status")
	private String status;

	public void setTotalResults(int totalResults){
		this.totalResults = totalResults;
	}

	public int getTotalResults(){
		return totalResults;
	}

	public void setArticles(List<ArticlesItem> articles){
		this.articles = articles;
	}

	public List<ArticlesItem> getArticles(){
		return articles;
	}

	public void setStatus(String status){
		this.status = status;
	}

	public String getStatus(){
		return status;
	}

	@Override
 	public String toString(){
		return 
			"Headlines{" + 
			"totalResults = '" + totalResults + '\'' + 
			",articles = '" + articles + '\'' + 
			",status = '" + status + '\'' + 
			"}";
		}
}

```

**(n). `ArticlesItem.java`**

> Our `ArticlesItem` class.

Create a java file named `ArticlesItem.java`.

We will be overriding the following methods: 

1. `toString(){`.

We will be creating the following methods:

1. `setPublishedAt(String publishedAt)`.

2. `getPublishedAt()` - It will return `String` object.

3. `setAuthor(String author)`.

4. `getAuthor()` - It will return `String` object.

5. `setUrlToImage(String urlToImage)`.

6. `getUrlToImage()` - It will return `String` object.

7. `setDescription(String description)`.

8. `getDescription()` - It will return `String` object.

9. `setSource(Source source)`.

10. `getSource()` - It will return `Source` object.

11. `setTitle(String title)`.

12. `getTitle()` - It will return `String` object.

13. `setUrl(String url)`.

14. `getUrl()` - It will return `String` object.

15. `setContent(String content)`.

16. `getContent()` - It will return `String` object.

**(a). Our `setContent()` method.**

A method to set content:

```java
	public void setContent(String content){
		this.content = content;
	}
```

**(b). Our `getDescription()` method.**

A method to get description:

```java
	public String getDescription(){
		return description;
	}
```

**(c). Our `getUrl()` method.**

A method to get url:

```java
	public String getUrl(){
		return url;
	}
```

**(d). Our `getAuthor()` method.**

A method to get author:

```java
	public String getAuthor(){
		return author;
	}
```

**(e). Our `setSource()` method.**

A method to set source:

```java
	public void setSource(Source source){
		this.source = source;
	}
```

**(f). Our `setTitle()` method.**

A method to set title:

```java
	public void setTitle(String title){
		this.title = title;
	}
```

**(g). Our `getTitle()` method.**

A method to get title:

```java
	public String getTitle(){
		return title;
	}
```

**(h). Our `setUrl()` method.**

A method to set url:

```java
	public void setUrl(String url){
		this.url = url;
	}
```

**(i). Our `setPublishedAt()` method.**

A method to set published at:

```java
	public void setPublishedAt(String publishedAt){
		this.publishedAt = publishedAt;
	}
```

**(j). Our `getUrlToImage()` method.**

A method to get url to image:

```java
	public String getUrlToImage(){
		return urlToImage;
	}
```

**(k). Our `setDescription()` method.**

A method to set description:

```java
	public void setDescription(String description){
		this.description = description;
	}
```

**(m). Our `getPublishedAt()` method.**

A method to get published at:

```java
	public String getPublishedAt(){
		return publishedAt;
	}
```

**(n). Our `setUrlToImage()` method.**

A method to set url to image:

```java
	public void setUrlToImage(String urlToImage){
		this.urlToImage = urlToImage;
	}
```

**(o). Our `setAuthor()` method.**

A method to set author:

```java
	public void setAuthor(String author){
		this.author = author;
	}
```

**(p). Our `getSource()` method.**

A method to get source:

```java
	public Source getSource(){
		return source;
	}
```

**(q). Our `getContent()` method.**

A method to get content:

```java
	public String getContent(){
		return content;
	}
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import com.google.gson.annotations.SerializedName;

public class ArticlesItem{

	@SerializedName("publishedAt")
	private String publishedAt;

	@SerializedName("author")
	private String author;

	@SerializedName("urlToImage")
	private String urlToImage;

	@SerializedName("description")
	private String description;

	@SerializedName("source")
	private Source source;

	@SerializedName("title")
	private String title;

	@SerializedName("url")
	private String url;

	@SerializedName("content")
	private String content;

	public void setPublishedAt(String publishedAt){
		this.publishedAt = publishedAt;
	}

	public String getPublishedAt(){
		return publishedAt;
	}

	public void setAuthor(String author){
		this.author = author;
	}

	public String getAuthor(){
		return author;
	}

	public void setUrlToImage(String urlToImage){
		this.urlToImage = urlToImage;
	}

	public String getUrlToImage(){
		return urlToImage;
	}

	public void setDescription(String description){
		this.description = description;
	}

	public String getDescription(){
		return description;
	}

	public void setSource(Source source){
		this.source = source;
	}

	public Source getSource(){
		return source;
	}

	public void setTitle(String title){
		this.title = title;
	}

	public String getTitle(){
		return title;
	}

	public void setUrl(String url){
		this.url = url;
	}

	public String getUrl(){
		return url;
	}

	public void setContent(String content){
		this.content = content;
	}

	public String getContent(){
		return content;
	}

	@Override
 	public String toString(){
		return 
			"ArticlesItem{" + 
			"publishedAt = '" + publishedAt + '\'' + 
			",author = '" + author + '\'' + 
			",urlToImage = '" + urlToImage + '\'' + 
			",description = '" + description + '\'' + 
			",source = '" + source + '\'' + 
			",title = '" + title + '\'' + 
			",url = '" + url + '\'' + 
			",content = '" + content + '\'' + 
			"}";
		}
}

```

**(o). `LatestAdapter.kt`**

> Our `LatestAdapter` class.

Create a Kotlin file named `LatestAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `ImageView` from the `android.widget` package.
3. `TextView` from the `android.widget` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.item_latest.view` package.

Then extend the `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): LatestViewHolder `.
2. `onBindViewHolder(holder: LatestViewHolder, position: Int) `.

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.hadi.thenewsproject.R
import com.hadi.thenewsproject.model.ArticlesItem
import kotlinx.android.synthetic.main.item_latest.view.*
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

class LatestAdapter(
    val context: Context,
    val list: List<ArticlesItem>,
    val listener: OnItemClickListener
) : RecyclerView.Adapter<LatestAdapter.LatestViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LatestViewHolder {

        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_latest, parent, false)
        return LatestViewHolder(view)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(holder: LatestViewHolder, position: Int) {
        Glide.with(context).load(list[position].urlToImage).into(holder.image)
        holder.title.text = list[position].title


//        val instant = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            val instant = Instant.parse(list[position].publishedAt)
//            instant
//        } else {
//            holder.date.text = list[position].publishedAt.substring(0,10)
//        }

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val dtf = DateTimeFormatter.ISO_DATE_TIME
            val zdt = ZonedDateTime.parse(list[position].publishedAt,dtf)

            val output = "${zdt.year} - ${zdt.month} - ${zdt.dayOfMonth} - ${zdt.dayOfWeek}"
            holder.date.text =output
        }


        holder.itemView.setOnClickListener {
            listener.onItemClick(list[position])
        }

    }

    class LatestViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val image = itemView.imgNewsLatest as ImageView
        val title = itemView.tvNewsTitleLatest as TextView
        val date = itemView.tvDateLatest as TextView
    }

    interface OnItemClickListener {
        fun onItemClick(item: ArticlesItem)
    }

}

```


**(p). `HeadlineAdapter.kt`**

> Our `HeadlineAdapter` class.

Create a Kotlin file named `HeadlineAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `ImageView` from the `android.widget` package.
3. `TextView` from the `android.widget` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.item_headline.view` package.

Then extend the `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): HeadlineViewHolder `.
2. `onBindViewHolder(holder: HeadlineViewHolder, position: Int) `.

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.hadi.thenewsproject.R
import com.hadi.thenewsproject.model.ArticlesItem
import kotlinx.android.synthetic.main.item_headline.view.*
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter

class HeadlineAdapter(
    val context: Context,
    val list: List<ArticlesItem>,
    val listener: OnItemClickListener
) : RecyclerView.Adapter<HeadlineAdapter.HeadlineViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HeadlineViewHolder {

        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_headline, parent, false)
        return HeadlineViewHolder(view)
    }

    override fun getItemCount() = list.size

    override fun onBindViewHolder(holder: HeadlineViewHolder, position: Int) {
        val item = list[position]

        holder.author.text = item.author
        holder.title.text = item.title
        holder.source.text = item.source.name

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val dtf = DateTimeFormatter.ISO_DATE_TIME
            val zdt = ZonedDateTime.parse(list[position].publishedAt,dtf)

            val output = "${zdt.month} - ${zdt.dayOfMonth}"
            holder.date.text =output
        }

        Glide.with(context).load(item.urlToImage).into(holder.image)

        holder.itemView.setOnClickListener {
            listener.onItemClick(list[position])
        }
    }

    class HeadlineViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val image = itemView.imgUrl as ImageView
        val author= itemView.tvAuthor as TextView
        val title = itemView.tvTitle as TextView
        val source = itemView.tvSource as TextView
        val date = itemView.tvDate as TextView
    }

    interface OnItemClickListener {
        fun onItemClick(item: ArticlesItem)
    }

}

```


**(q). `CustomTabsBroadcastReceiver.java`**

> Our `CustomTabsBroadcastReceiver` class.

Create a java file named `CustomTabsBroadcastReceiver.java`.

Inside it create a class that extends `BroadcastReceiver` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `BroadcastReceiver` from the `android.content` package.
2. `Context` from the `android.content` package.
3. `Intent` from the `android.content` package.
4. `PackageInfo` from the `android.content.pm` package.
5. `PackageManager` from the `android.content.pm` package.
6. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onReceive(Context`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.widget.Toast;

public class CustomTabsBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        String url = intent.getDataString();

//        Toast.makeText(context, "Copy link pressed. URL = " + url, Toast.LENGTH_SHORT).show();
//
        PackageManager pm = context.getPackageManager();
        try {
            Intent waIntent = new Intent(Intent.ACTION_SEND);
            waIntent.setType("text/plain");

            waIntent.addFlags(Intent.FLAG_FROM_BACKGROUND);
            waIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            String text = "This is  a Test"; // Replace with your own message.

            PackageInfo info = pm.getPackageInfo("com.whatsapp", PackageManager.GET_META_DATA);
            //Check if package exists or not. If not then code
            //in catch block will be called
            waIntent.setPackage("com.whatsapp");

            waIntent.putExtra(Intent.EXTRA_TEXT, url);
            Intent intent_ = Intent.createChooser(waIntent, "Share with");
            context.startActivity(intent_);

        } catch (PackageManager.NameNotFoundException e) {
            Toast.makeText(context, "WhatsApp not Installed", Toast.LENGTH_SHORT)
                    .show();

        }
    }
}

```

**(r). `WebViewActivity.kt`**

> Our `WebViewActivity` class.

Create a Kotlin file named `WebViewActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
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
import com.hadi.thenewsproject.R

class WebViewActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web_view)
    }
}


```


**(s). `SplashActivity.kt`**

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
3. `onTick(p0: Long) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import com.hadi.thenewsproject.R

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        val timer = object : CountDownTimer(2900, 1000) {

            override fun onFinish() {

                startActivity(Intent(this@SplashActivity,MainActivity::class.java))
                finish()
            }

            override fun onTick(p0: Long) {

            }
        }

        timer.start()

    }
}


```


**(t). `SearchActivity.kt`**

> Our `SearchActivity` class.

Create a Kotlin file named `SearchActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Toast` from the `android.widget` package.
2. `CustomTabsIntent` from the `androidx.browser.customtabs` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_search` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onFailure(call: Call<Headlines?>, t: Throwable) `.
3. `onItemClick(item: ArticlesItem) `.

Then we will be creating the following functions:

1. `init() `.

**(a). Our `init()` function.**

Write this function as follows:

```kotlin
    private fun init() {

        rvSearch.setHasFixedSize(true)
        rvSearch.layoutManager = LinearLayoutManager(this)
        rvSearch.addItemDecoration(LatestItemDecoration(20))

        btnBack.setOnClickListener {
            finish()
        }

        edtSearch.requestFocus()
        edtSearch.setOnEditorActionListener { v, actionId, event ->

            if (!v?.text.isNullOrEmpty()) {

                v.hideKeyboard()


                val query = v?.text.toString()

                val apiInterface = RetrofitClient.getInstance(this)
                val call = apiInterface.news.searchNews(query, API_KEY)

                call.enqueue(object : Callback<Headlines?> {

                    override fun onResponse(
                        call: Call<Headlines?>,
                        response: Response<Headlines?>
                    ) {

                        Log.d(TAG, "Search Response: ${response.body()}");
                        if (response.isSuccessful) {
                            if (response.body()?.status.equals("ok")) {
                                val articles = response.body()?.articles
                                val adapter = LatestAdapter(
                                    this@SearchActivity,
                                    articles as List<ArticlesItem>, this@SearchActivity
                                )

                                rvSearch.adapter = adapter
                            }
                        }else{
                            Toast.makeText(this@SearchActivity, "Error Occured", Toast.LENGTH_SHORT).show();
                        }
                    }

                    override fun onFailure(call: Call<Headlines?>, t: Throwable) {

                    }
                })


            }

            true
        }


    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import com.hadi.inspire.Utils.LatestItemDecoration
import com.hadi.thenewsproject.R
import com.hadi.thenewsproject.adapter.LatestAdapter
import com.hadi.thenewsproject.model.ArticlesItem
import com.hadi.thenewsproject.model.Headlines
import com.hadi.thenewsproject.network.RetrofitClient
import com.hadi.thenewsproject.utils.Constatnts
import com.hadi.thenewsproject.utils.Constatnts.API_KEY
import com.hadi.thenewsproject.utils.CustomTabHelper
import com.hadi.thenewsproject.utils.hideKeyboard
import kotlinx.android.synthetic.main.activity_search.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SearchActivity : AppCompatActivity(), LatestAdapter.OnItemClickListener {

    private val TAG = "SearchActivity"
    private var customTabHelper = CustomTabHelper()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)


        init()
    }

    private fun init() {

        rvSearch.setHasFixedSize(true)
        rvSearch.layoutManager = LinearLayoutManager(this)
        rvSearch.addItemDecoration(LatestItemDecoration(20))

        btnBack.setOnClickListener {
            finish()
        }

        edtSearch.requestFocus()
        edtSearch.setOnEditorActionListener { v, actionId, event ->

            if (!v?.text.isNullOrEmpty()) {

                v.hideKeyboard()


                val query = v?.text.toString()

                val apiInterface = RetrofitClient.getInstance(this)
                val call = apiInterface.news.searchNews(query, API_KEY)

                call.enqueue(object : Callback<Headlines?> {

                    override fun onResponse(
                        call: Call<Headlines?>,
                        response: Response<Headlines?>
                    ) {

                        Log.d(TAG, "Search Response: ${response.body()}");
                        if (response.isSuccessful) {
                            if (response.body()?.status.equals("ok")) {
                                val articles = response.body()?.articles
                                val adapter = LatestAdapter(
                                    this@SearchActivity,
                                    articles as List<ArticlesItem>, this@SearchActivity
                                )

                                rvSearch.adapter = adapter
                            }
                        }else{
                            Toast.makeText(this@SearchActivity, "Error Occured", Toast.LENGTH_SHORT).show();
                        }
                    }

                    override fun onFailure(call: Call<Headlines?>, t: Throwable) {

                    }
                })


            }

            true
        }


    }


    override fun onItemClick(item: ArticlesItem) {

        val builder = CustomTabsIntent.Builder()
        builder.setToolbarColor(ContextCompat.getColor(this@SearchActivity, R.color.colorPrimary))
        builder.addDefaultShareMenuItem()

        val anotherCustomTab = CustomTabsIntent.Builder().build()
        val requestCode = 100
        val intent = anotherCustomTab.intent
        intent.putExtra("URLL", "TEST")
        intent.data = Uri.parse(item.url)

        val pendingIntent = PendingIntent.getBroadcast(
            this,
            requestCode,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT
        )

        // add menu item to overflow
        builder.addMenuItem("Shareee", pendingIntent)

        builder.setShowTitle(true)

        builder.setStartAnimations(this, android.R.anim.fade_in, android.R.anim.fade_out)
        builder.setExitAnimations(this, android.R.anim.fade_in, android.R.anim.fade_out)

        val customTabsIntent = builder.build()

        // check is chrom available
        val packageName = customTabHelper.getPackageNameToUse(this, item.url)

        if (packageName == null) {
            // if chrome not available open in web view
            val intentOpenUri = Intent(this, WebViewActivity::class.java)
            intentOpenUri.putExtra(Constatnts.EXTRA_URL, Uri.parse(item.url).toString())
            startActivity(intentOpenUri)
        } else {
            customTabsIntent.intent.setPackage(packageName)
            customTabsIntent.launchUrl(this, Uri.parse(item.url))
        }


    }
}


```


**(u). `NewsViewActivity.kt`**

> Our `NewsViewActivity` class.

Create a Kotlin file named `NewsViewActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `*` from the `kotlinx.android.synthetic.main.activity_news_view` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.hadi.thenewsproject.R
import kotlinx.android.synthetic.main.activity_news_view.*

class NewsViewActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_news_view)
    }
}


```


**(v). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `CustomTabsIntent` from the `androidx.browser.customtabs` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResponse(call: Call<Headlines?>, response: Response<Headlines?>) `.
3. `onFailure(call: Call<Headlines?>, t: Throwable) `.
4. `onItemClick(item: ArticlesItem) `.

Then we will be creating the following functions:

1. `init() `.
2. `fetchHeadlines() `.

**(a). Our `fetchHeadlines()` function.**

A function to fetch headlines:

```kotlin
    private fun fetchHeadlines() {

        val apiInterface = RetrofitClient.getInstance(this)
        val call = apiInterface.news.getHeadlines(COUNTRY, API_KEY)

        call.enqueue(object : Callback<Headlines?> {

            override fun onResponse(call: Call<Headlines?>, response: Response<Headlines?>) {

                        shimmer.visibility = View.GONE
                        shimmer_headline.visibility = View.GONE
                        vp_headlines.visibility = View.VISIBLE
                        Log.d(TAG, "Headlines : ${response.body().toString()}");

                if(response.body()?.status.equals("ok")) {

                    val articles = response.body()?.articles as MutableList<ArticlesItem>
                    adapter = HeadlineAdapter(this@MainActivity, articles, this@MainActivity)
                    vp_headlines.adapter = adapter

                    articles.shuffle()


                    rv_latest.visibility = View.VISIBLE

                    val latestAdapter =
                        LatestAdapter(this@MainActivity, articles, this@MainActivity)
                    rv_latest.adapter = latestAdapter
                }else{
                    Toast.makeText(this@MainActivity, "Error Occured", Toast.LENGTH_SHORT).show();
                }

            }
            override fun onFailure(call: Call<Headlines?>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Server Error", Toast.LENGTH_SHORT).show();
            }

        })

    }
```

**(b). Our `init()` function.**

Write this function as follows:

```kotlin
    private fun init() {
        vp_headlines.addItemDecoration(MarginItemDecoration(10))


        rv_latest.setHasFixedSize(true)
        rv_latest.layoutManager = LinearLayoutManager(this)
        rv_latest.addItemDecoration(LatestItemDecoration(20))


        //WebView


    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.PendingIntent
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import com.hadi.inspire.Utils.LatestItemDecoration
import com.hadi.inspire.Utils.MarginItemDecoration
import com.hadi.thenewsproject.R
import com.hadi.thenewsproject.adapter.CustomTabsBroadcastReceiver
import com.hadi.thenewsproject.adapter.HeadlineAdapter
import com.hadi.thenewsproject.adapter.LatestAdapter
import com.hadi.thenewsproject.model.ArticlesItem
import com.hadi.thenewsproject.model.Headlines
import com.hadi.thenewsproject.network.RetrofitClient
import com.hadi.thenewsproject.utils.Constatnts.*
import com.hadi.thenewsproject.utils.CustomTabHelper
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class MainActivity : AppCompatActivity(), HeadlineAdapter.OnItemClickListener,
    LatestAdapter.OnItemClickListener {

    private val TAG = "MainActivity"

    lateinit var adapter:HeadlineAdapter
    private var customTabHelper = CustomTabHelper()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        init()
        fetchHeadlines()

        btnSearch.setOnClickListener {
            startActivity(Intent(this,SearchActivity::class.java))
        }

    }

    private fun init() {
        vp_headlines.addItemDecoration(MarginItemDecoration(10))


        rv_latest.setHasFixedSize(true)
        rv_latest.layoutManager = LinearLayoutManager(this)
        rv_latest.addItemDecoration(LatestItemDecoration(20))


        //WebView


    }

    private fun fetchHeadlines() {

        val apiInterface = RetrofitClient.getInstance(this)
        val call = apiInterface.news.getHeadlines(COUNTRY, API_KEY)

        call.enqueue(object : Callback<Headlines?> {

            override fun onResponse(call: Call<Headlines?>, response: Response<Headlines?>) {

                        shimmer.visibility = View.GONE
                        shimmer_headline.visibility = View.GONE
                        vp_headlines.visibility = View.VISIBLE
                        Log.d(TAG, "Headlines : ${response.body().toString()}");

                if(response.body()?.status.equals("ok")) {

                    val articles = response.body()?.articles as MutableList<ArticlesItem>
                    adapter = HeadlineAdapter(this@MainActivity, articles, this@MainActivity)
                    vp_headlines.adapter = adapter

                    articles.shuffle()


                    rv_latest.visibility = View.VISIBLE

                    val latestAdapter =
                        LatestAdapter(this@MainActivity, articles, this@MainActivity)
                    rv_latest.adapter = latestAdapter
                }else{
                    Toast.makeText(this@MainActivity, "Error Occured", Toast.LENGTH_SHORT).show();
                }

            }
            override fun onFailure(call: Call<Headlines?>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Server Error", Toast.LENGTH_SHORT).show();
            }

        })

    }

    override fun onItemClick(item: ArticlesItem) {


        val builder = CustomTabsIntent.Builder()
        builder.setToolbarColor(ContextCompat.getColor(this@MainActivity, R.color.colorPrimary))
        builder.addDefaultShareMenuItem()

        val anotherCustomTab = CustomTabsIntent.Builder().build()
        val requestCode = 100
        //val intent = anotherCustomTab.intent
        val intent = Intent(this,CustomTabsBroadcastReceiver::class.java)
        val label = "Copy link"
        val pendingIntent =
            PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)

        builder.addMenuItem(label, pendingIntent)

        builder.setShowTitle(true)

        builder.setStartAnimations(this, android.R.anim.fade_in, android.R.anim.fade_out)
        builder.setExitAnimations(this, android.R.anim.fade_in, android.R.anim.fade_out)

        val customTabsIntent = builder.build()

        // check is chrome available
        val packageName = customTabHelper.getPackageNameToUse(this, item.url)

        if (packageName == null) {
            // if chrome not available open in web view
            val intentOpenUri = Intent(this, WebViewActivity::class.java)
            intentOpenUri.putExtra(EXTRA_URL, Uri.parse(item.url).toString())
            startActivity(intentOpenUri)
        } else {
            customTabsIntent.intent.setPackage(packageName)
            customTabsIntent.launchUrl(this, Uri.parse(item.url))
        }
    }
}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/unaisulhadi/The-News-Project/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/unaisulhadi/The-News-Project).|
|3.|Follow code author [here](https://github.com/unaisulhadi).|
