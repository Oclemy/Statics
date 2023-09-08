# Firestore Restaurants Rating App Quickstart 


This is a full comprehensive app that will teach you various aspects of Firebase Firestore. It is a restaurants rating app and you can see it's screenshot below:

![Firestore Restaurants Rating App Tutorial](https://github.com/firebase/quickstart-android/raw/master/firestore/docs/home.png)


### To run the app

- Download the code.
- Run the app on an Android device or emulator.
- Use the package name `com.google.firebase.example.fireeats`
- This app uses FirebaseUI for authentication.

### Security Rules


```java
service cloud.firestore {  
  match /databases/{database}/documents {
    // Anyone can read a restaurant, only authorized
    // users can create or update. Deletes are not allowed.
  	 match /restaurants/{restaurantId} {
    	 allow read: if true;
    	 allow create, update: if request.auth.uid != null;
    }
    
    // Anyone can read a rating. Only the user who made the rating
    // can delete it. Ratings can never be updated.
    match /restaurants/{restaurantId}/ratings/{ratingId} {
    	 allow read: if true;
      allow create: if request.auth.uid != null;
    	 allow delete: if request.resource.data.userId == request.auth.uid;
    	 allow update: if false;
    }
  }
}
```

### Indexes


```kotlin
com.google.firebase.example.fireeats W/Firestore Adapter: onEvent:error
com.google.firebase.firestore.FirebaseFirestoreException: FAILED_PRECONDITION: The query requires an index. You can create it here: https://console.firebase.google.com/project/...
```

![Firestore Restaurants Rating App Tutorial](https://github.com/firebase/quickstart-android/raw/master/firestore/docs/index.png)

### Let's start

Follow these steps to create a full Firestore Restaurants Rating App example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 20 dependencies:


1. Our `Firebase-bom` library.
2. Our `Com.google.firebase` library.
3. Our `Play-services-auth` library.
4. Our `Firebase-ui-auth` library.
5. Our `Activity-ktx` library.
6. Our `Appcompat` library.
7. Our `Core-ktx` library.
8. Our `Vectordrawable-animated` library.
9. Our `Cardview` library.
10. Our `Browser` library.
12. Our `Material` library.
13. Our `Media` library.
14. Our `Recyclerview` library.
15. Our `Multidex` library.
16. Our `Navigation-fragment-ktx` library.
17. Our `Navigation-ui-ktx` library.
18. Our `Lifecycle-runtime-ktx` library.
19. Our `Lifecycle-extensions` library.
20. Our `Glide` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
    id 'androidx.navigation.safeargs'
}

android {
    testBuildType "release"
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.firebase.example.fireeats"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true

        vectorDrawables.useSupportLibrary true

        lintOptions {
          disable 'InvalidPackage'
        }
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled true
            testProguardFiles getDefaultProguardFile('proguard-android.txt'), 'test-proguard-rules.pro'
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.debug
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firestore (Java)
    implementation 'com.google.firebase:firebase-firestore'

    // Firestore (Kotlin)
    implementation 'com.google.firebase:firebase-firestore-ktx'

    // Firebase Authentication (Java)
    implementation 'com.google.firebase:firebase-auth'

    // Firebase Authentication (Kotlin)
    implementation 'com.google.firebase:firebase-auth-ktx'

    // Google Play services
    implementation 'com.google.android.gms:play-services-auth:20.3.0'

    // FirebaseUI (for authentication)
    implementation 'com.firebaseui:firebase-ui-auth:8.0.2'

    // Support Libs
    implementation 'androidx.activity:activity-ktx:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'androidx.core:core-ktx:1.9.0'
    implementation 'androidx.vectordrawable:vectordrawable-animated:1.1.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.browser:browser:1.0.0'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.media:media:1.6.0'
    implementation 'androidx.recyclerview:recyclerview:1.2.1'
    implementation 'androidx.multidex:multidex:2.0.1'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.5.2'
    implementation 'androidx.navigation:navigation-ui-ktx:2.5.2'

    // Android architecture components
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.5.1'
    implementation 'androidx.lifecycle:lifecycle-extensions:2.2.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.5.1'

    // Third-party libraries
    implementation 'me.zhanghai.android.materialratingbar:library:1.4.0'
    implementation 'com.github.bumptech.glide:glide:4.12.0'

    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
    androidTestImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'org.hamcrest:hamcrest-library:2.2'
    androidTestImplementation 'com.google.firebase:firebase-auth'

}

```

#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.example.fireeats">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:name="androidx.multidex.MultiDexApplication">

        <activity android:name=".EntryChoiceActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.EntryChoice"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".java.MainActivity"
            android:theme="@style/AppTheme.Activity" />

        <activity
            android:name=".kotlin.MainActivity"
            android:theme="@style/AppTheme.Activity" />
    </application>

</manifest>

```
#### Step 4. Create Navigation Rules

Create a directory known as `navigation` inside your `res` directory and add the following navigation rules:

**(a). `nav_graph_kotlin.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph_kotlin"
    app:startDestination="@id/MainFragment">

    <fragment
        android:id="@+id/MainFragment"
        android:name="com.google.firebase.example.fireeats.kotlin.MainFragment"
        tools:layout="@layout/fragment_main" >
        <action
            android:id="@+id/action_MainFragment_to_RestaurantDetailFragment"
            app:destination="@id/RestaurantDetailFragment"
            app:enterAnim="@anim/slide_in_from_right"
            app:exitAnim="@anim/slide_out_to_left"
            app:popEnterAnim="@anim/slide_in_from_left"
            app:popExitAnim="@anim/slide_out_to_right" />
    </fragment>

    <fragment
        android:id="@+id/RestaurantDetailFragment"
        android:name="com.google.firebase.example.fireeats.kotlin.RestaurantDetailFragment"
        tools:layout="@layout/fragment_restaurant_detail" >
        <argument
            android:name="key_restaurant_id"
            app:argType="string" />
    </fragment>

</navigation>

```

#### Step 5. Create Menus

Create a directory known as `menu` inside your `res` directory and add the following menu files:

**(a). `menu_main.xml`**

Inside your `/res/menu/` directory create a menu resource file named `menu_main.xml` and add menu items as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/menu_sign_out"
        android:title="@string/sign_out" />

    <item
        android:id="@+id/menu_add_items"
        android:title="@string/add_random_items" />

</menu>

```
#### Step 6. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `item_restaurant.xml`**

> Our `item_restaurant` layout.

Inside your `/res/layout/` directory create an xml layout file named `item_restaurant.xml`.

Design your XML layout using the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `TextView`
4. `me.zhanghai.android.materialratingbar.MaterialRatingBar`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="?attr/selectableItemBackground"
    android:orientation="vertical"
    android:padding="8dp">

    <ImageView
        android:id="@+id/restaurantItemImage"
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:background="#757575"
        android:scaleType="centerCrop"
        android:src="@drawable/food_1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/restaurantItemName"
        style="@style/AppTheme.Subheader"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:ellipsize="end"
        android:maxLines="1"
        app:layout_constraintStart_toEndOf="@+id/restaurantItemImage"
        app:layout_constraintTop_toTopOf="@+id/restaurantItemImage"
        tools:text="Foo's Bar" />

    <me.zhanghai.android.materialratingbar.MaterialRatingBar
        android:id="@+id/restaurantItemRating"
        style="@style/Widget.MaterialRatingBar.RatingBar.Indicator.Small"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        app:layout_constraintStart_toStartOf="@+id/restaurantItemName"
        app:layout_constraintTop_toBottomOf="@+id/restaurantItemName" />

    <TextView
        android:id="@+id/restaurantItemNumRatings"
        style="@style/AppTheme.Caption"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="4dp"
        android:layout_marginLeft="4dp"
        android:textColor="@color/greyDisabled"
        app:layout_constraintBottom_toBottomOf="@+id/restaurantItemRating"
        app:layout_constraintStart_toEndOf="@+id/restaurantItemRating"
        app:layout_constraintTop_toTopOf="@+id/restaurantItemRating"
        tools:text="(10)" />

    <TextView
        android:id="@+id/restaurantItemCategory"
        style="@style/AppTheme.Body1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:textColor="@color/greySecondary"
        app:layout_constraintStart_toStartOf="@+id/restaurantItemRating"
        app:layout_constraintTop_toBottomOf="@+id/restaurantItemRating"
        tools:text="Italian" />

    <TextView
        android:id="@+id/restaurantItemCityDivider"
        style="@style/AppTheme.TextDivider"
        android:layout_marginStart="4dp"
        android:layout_marginLeft="4dp"
        android:text="@string/divider_bullet"
        app:layout_constraintStart_toEndOf="@+id/restaurantItemCategory"
        app:layout_constraintTop_toTopOf="@+id/restaurantItemCategory" />

    <TextView
        android:id="@+id/restaurantItemCity"
        style="@style/AppTheme.Body1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="4dp"
        android:layout_marginLeft="4dp"
        android:textColor="@color/greySecondary"
        app:layout_constraintStart_toEndOf="@+id/restaurantItemCityDivider"
        app:layout_constraintTop_toTopOf="@+id/restaurantItemCategory"
        tools:text="San Francisco" />

    <TextView
        android:id="@+id/restaurantItemPrice"
        style="@style/AppTheme.Caption"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/greySecondary"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/restaurantItemName"
        tools:text="$$$" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(b). `item_rating.xml`**

> Our `item_rating` layout.

Create an xml layout file named `item_rating.xml`.

Design your XML layout using the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
3. `me.zhanghai.android.materialratingbar.MaterialRatingBar`
4. `View`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingTop="16dp"
    android:paddingLeft="16dp"
    android:paddingRight="16dp">

    <TextView
        android:id="@+id/ratingItemName"
        style="@style/AppTheme.Body1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:maxWidth="120dp"
        android:maxLines="1"
        android:textColor="@color/greySecondary"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="John Doe" />

    <TextView
        android:id="@+id/ratingItemDivider"
        style="@style/AppTheme.TextDivider"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="4dp"
        android:layout_marginLeft="4dp"
        android:text="@string/divider_bullet"
        app:layout_constraintBottom_toBottomOf="@+id/ratingItemName"
        app:layout_constraintStart_toEndOf="@+id/ratingItemName"
        app:layout_constraintTop_toTopOf="@+id/ratingItemName" />

    <TextView
        android:id="@+id/ratingItemDate"
        style="@style/AppTheme.Body1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="4dp"
        android:layout_marginLeft="4dp"
        android:textColor="@color/greySecondary"
        app:layout_constraintBottom_toBottomOf="@+id/ratingItemName"
        app:layout_constraintStart_toEndOf="@+id/ratingItemDivider"
        app:layout_constraintTop_toTopOf="@+id/ratingItemName"
        tools:text="9/27/2017" />

    <me.zhanghai.android.materialratingbar.MaterialRatingBar
        android:id="@+id/ratingItemRating"
        style="@style/Widget.MaterialRatingBar.RatingBar.Indicator.Small"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/ratingItemText"
        style="@style/AppTheme.Subheader"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:textColor="@color/greyPrimary"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ratingItemName"
        tools:text="I thought it was pretty great! And I really have a ton to say wow." />

    <View
        android:id="@+id/view4"
        style="@style/AppTheme.Divider"
        android:layout_marginTop="16dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/ratingItemText" />
</androidx.constraintlayout.widget.ConstraintLayout>

```

**(c). `fragment_restaurant_detail.xml`**


> Our `fragment_restaurant_detail` layout.

Inside your `/res/layout/` directory create an xml layout file named `fragment_restaurant_detail.xml`.

Design your XML layout using the following 9 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `View`
4. `TextView`
5. `me.zhanghai.android.materialratingbar.MaterialRatingBar`
6. `com.google.android.material.floatingactionbutton.FloatingActionButton`
7. `androidx.recyclerview.widget.RecyclerView`
8. `LinearLayout`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#E0E0E0"
    tools:ignore="ContentDescription">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/restaurant_top_card"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:elevation="4dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <ImageView
            android:id="@+id/restaurantImage"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:alpha="1.0"
            android:scaleType="centerCrop"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            tools:src="@drawable/food_1" />

        <View
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:background="@drawable/gradient_up"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="@+id/restaurantImage"
            />

        <!-- Back button -->
        <ImageView
            android:id="@+id/restaurantButtonBack"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:background="?attr/selectableItemBackground"
            app:srcCompat="@drawable/ic_close_white_24px"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="@+id/restaurantName"
            />

        <TextView
            android:id="@+id/restaurantName"
            style="@style/AppTheme.Title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="8dp"
            android:layout_marginStart="8dp"
            android:textColor="@android:color/white"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/restaurantRating"
            tools:text="Some Restaurant"
            />

        <me.zhanghai.android.materialratingbar.MaterialRatingBar
            android:id="@+id/restaurantRating"
            style="@style/Widget.MaterialRatingBar.RatingBar.Indicator"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_above="@+id/restaurantCategory"
            app:mrb_progressTint="@android:color/white"
            app:mrb_secondaryProgressTint="@android:color/white"
            app:layout_constraintBottom_toTopOf="@+id/restaurantCategory"
            app:layout_constraintStart_toStartOf="@+id/restaurantName"
            />

        <TextView
            android:id="@+id/restaurantNumRatings"
            style="@style/AppTheme.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="4dp"
            android:layout_marginStart="4dp"
            android:textColor="@android:color/white"
            app:layout_constraintTop_toTopOf="@+id/restaurantRating"
            app:layout_constraintBottom_toBottomOf="@+id/restaurantRating"
            app:layout_constraintStart_toEndOf="@+id/restaurantRating"
            tools:text="(10)" />

        <TextView
            android:id="@+id/restaurantCategory"
            style="@style/AppTheme.Subheader"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_marginLeft="8dp"
            android:layout_marginBottom="8dp"
            android:textColor="@android:color/white"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            tools:text="Italian" />

        <TextView
            android:id="@+id/restaurantCity_divider"
            style="@style/AppTheme.TextDivider"
            android:text="@string/divider_bullet"
            android:textColor="@android:color/white"
            app:layout_constraintTop_toTopOf="@+id/restaurantCategory"
            app:layout_constraintStart_toEndOf="@+id/restaurantCategory"
            />

        <TextView
            android:id="@+id/restaurantCity"
            style="@style/AppTheme.Subheader"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@android:color/white"
            tools:text="San Francisco"
            app:layout_constraintTop_toTopOf="@+id/restaurantCategory"
            app:layout_constraintStart_toEndOf="@+id/restaurantCategory"
            />

        <TextView
            android:id="@+id/restaurantPrice"
            style="@style/AppTheme.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginRight="8dp"
            android:layout_marginEnd="8dp"
            android:textColor="@android:color/white"
            android:textStyle="bold"
            app:layout_constraintTop_toTopOf="@+id/restaurantName"
            app:layout_constraintEnd_toEndOf="parent"
            tools:text="$$$"
            />

    </androidx.constraintlayout.widget.ConstraintLayout>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fabShowRatingDialog"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginRight="8dp"
        android:translationY="-28dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/restaurant_top_card"
        app:srcCompat="@drawable/ic_add_white_24px" />

    <!-- Ratings -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerRatings"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:background="@android:color/transparent"
        android:clipToPadding="false"
        android:paddingTop="28dp"
        android:paddingBottom="16dp"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/restaurant_top_card"
        tools:listitem="@layout/item_rating"
        tools:visibility="invisible" />

    <!-- View for empty ratings -->
    <LinearLayout
        android:id="@+id/viewEmptyRatings"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:orientation="vertical"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/restaurant_top_card"
        tools:visibility="visible"
        tools:ignore="UseCompoundDrawables">

        <ImageView
            style="@style/AppTheme.PizzaGuy"
            android:src="@drawable/pizza_monster"
            tools:ignore="ContentDescription" />

        <TextView
            style="@style/AppTheme.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/message_no_reviews"
            android:textColor="@color/greyDisabled" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(d). `fragment_main.xml`**


> Our `fragment_main` layout.

Create an xml layout file named `fragment_main.xml`and design your XML layout using the following 9 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `FrameLayout`
3. `androidx.cardview.widget.CardView`
4. `ImageView`
5. `TextView`
6. `androidx.recyclerview.widget.RecyclerView`
7. `View`
8. `LinearLayout`
9. `ProgressBar`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#E0E0E0">

    <FrameLayout
        android:id="@+id/filterBarContainer"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        android:paddingLeft="12dp"
        android:paddingRight="12dp"
        android:paddingBottom="12dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <androidx.cardview.widget.CardView
            android:id="@+id/filterBar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:clickable="true"
            android:elevation="12dp"
            android:foreground="?attr/selectableItemBackground">

            <androidx.constraintlayout.widget.ConstraintLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:paddingTop="8dp"
                android:paddingBottom="8dp">

                <ImageView
                    android:id="@+id/buttonFilter"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerVertical="true"
                    android:layout_marginLeft="8dp"
                    android:layout_marginRight="8dp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent"
                    app:srcCompat="@drawable/ic_filter_list_white_24px"
                    app:tint="@color/greySecondary" />

                <TextView
                    android:id="@+id/textCurrentSearch"
                    style="@style/AppTheme.Body1"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="16dp"
                    android:layout_marginLeft="16dp"
                    android:text="@string/all_restaurants"
                    android:textColor="@color/greySecondary"
                    app:layout_constraintStart_toEndOf="@+id/buttonFilter"
                    app:layout_constraintTop_toTopOf="parent"
                    tools:text="Filter" />

                <TextView
                    android:id="@+id/textCurrentSortBy"
                    style="@style/AppTheme.Caption"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/sorted_by_rating"
                    android:textColor="@color/greyDisabled"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintStart_toStartOf="@+id/textCurrentSearch"
                    app:layout_constraintTop_toBottomOf="@+id/textCurrentSearch" />

                <ImageView
                    android:id="@+id/buttonClearFilter"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerVertical="true"
                    android:layout_marginEnd="8dp"
                    android:layout_marginRight="8dp"
                    android:padding="8dp"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintTop_toTopOf="parent"
                    app:srcCompat="@drawable/ic_close_white_24px"
                    app:tint="@color/greySecondary" />

            </androidx.constraintlayout.widget.ConstraintLayout>

        </androidx.cardview.widget.CardView>

    </FrameLayout>

    <!-- Main Restaurants recycler -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerRestaurants"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:background="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/filterBarContainer"
        tools:listitem="@layout/item_restaurant" />

    <!-- Shadow below toolbar -->
    <View
        android:id="@+id/view"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:background="@drawable/bg_shadow"
        app:layout_constraintTop_toBottomOf="@+id/filterBarContainer"
        />

    <!-- Empty list (pizza guy) view -->
    <LinearLayout
        android:id="@+id/viewEmpty"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="parent"
        tools:ignore="UseCompoundDrawables"
        tools:visibility="gone">

        <ImageView
            style="@style/AppTheme.PizzaGuy"
            android:src="@drawable/pizza_monster" />

        <TextView
            style="@style/AppTheme.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/message_no_results"
            android:textColor="@color/greyDisabled" />

    </LinearLayout>

    <ProgressBar
        android:id="@+id/progressLoading"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="@+id/recyclerRestaurants"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/recyclerRestaurants"
        />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(e). `dialog_rating.xml`**


> Our `dialog_rating` layout.

Then create an xml layout file named `dialog_rating.xml` and add the following:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
3. `me.zhanghai.android.materialratingbar.MaterialRatingBar`
4. `EditText`
5. `View`
6. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/textView"
        style="@style/AppTheme.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/filter_add_review"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <me.zhanghai.android.materialratingbar.MaterialRatingBar
        android:id="@+id/restaurantFormRating"
        style="@style/Widget.MaterialRatingBar.RatingBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:maxHeight="24dp"
        android:minHeight="24dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <EditText
        android:id="@+id/restaurantFormText"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="8dp"
        android:hint="@string/hint_review"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/restaurantFormRating" />


    <View
        android:id="@+id/view3"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:visibility="invisible"
        app:layout_constraintBottom_toBottomOf="@+id/restaurantFormCancel"
        app:layout_constraintEnd_toStartOf="@+id/restaurantFormCancel"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/restaurantFormCancel" />

    <Button
        android:id="@+id/restaurantFormCancel"
        style="@style/Base.Widget.AppCompat.Button.Borderless"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/cancel"
        android:textColor="@color/greySecondary"
        android:theme="@style/ThemeOverlay.FilterButton"
        app:layout_constraintEnd_toStartOf="@+id/restaurantFormButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/view3"
        app:layout_constraintTop_toTopOf="@+id/restaurantFormButton" />


    <Button
        android:id="@+id/restaurantFormButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/submit"
        android:theme="@style/ThemeOverlay.FilterButton"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/restaurantFormCancel"
        app:layout_constraintTop_toBottomOf="@+id/restaurantFormText" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(f). `dialog_filters.xml`**


> Our `dialog_filters` layout.

Create an xml layout file named `dialog_filters.xml` and add these:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
4. `ImageView`
5. `Spinner`
6. `View`
7. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/filters_form"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp">

    <TextView
        android:id="@+id/filterDialogTitle"
        style="@style/AppTheme.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/header_filters"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <!-- Food Type -->
    <ImageView
        android:id="@+id/icon_category"
        style="@style/AppTheme.FilterIcon"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        app:layout_constraintBottom_toBottomOf="@+id/spinnerCategory"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/spinnerCategory"
        app:srcCompat="@drawable/ic_fastfood_white_24dp"
        app:tint="@color/greySecondary" />

    <Spinner
        android:id="@+id/spinnerCategory"
        style="@style/AppTheme.FilterSpinner"
        android:layout_width="0dp"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:entries="@array/categories"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/icon_category"
        app:layout_constraintTop_toBottomOf="@+id/filterDialogTitle" />


    <!-- Location -->
    <ImageView
        android:id="@+id/icon_city"
        style="@style/AppTheme.FilterIcon"
        app:layout_constraintBottom_toBottomOf="@+id/spinnerCity"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/spinnerCity"
        app:srcCompat="@drawable/ic_place_white_24px"
        app:tint="@color/greySecondary" />

    <Spinner
        android:id="@+id/spinnerCity"
        style="@style/AppTheme.FilterSpinner"
        android:layout_width="0dp"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:entries="@array/cities"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/icon_city"
        app:layout_constraintTop_toBottomOf="@+id/spinnerCategory" />

    <!-- Price -->
    <ImageView
        android:id="@+id/icon_price"
        style="@style/AppTheme.FilterIcon"
        app:layout_constraintBottom_toBottomOf="@+id/spinnerPrice"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/spinnerPrice"
        app:srcCompat="@drawable/ic_monetization_on_white_24px"
        app:tint="@color/greySecondary" />

    <Spinner
        android:id="@+id/spinnerPrice"
        style="@style/AppTheme.FilterSpinner"
        android:layout_width="0dp"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:entries="@array/prices"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/icon_price"
        app:layout_constraintTop_toBottomOf="@+id/spinnerCity" />

    <!-- Sort By -->
    <ImageView
        android:id="@+id/icon_sort"
        style="@style/AppTheme.FilterIcon"
        app:layout_constraintBottom_toBottomOf="@+id/spinnerSort"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/spinnerSort"
        app:srcCompat="@drawable/ic_sort_white_24px"
        app:tint="@color/greySecondary" />

    <Spinner
        android:id="@+id/spinnerSort"
        style="@style/AppTheme.FilterSpinner"
        android:layout_width="0dp"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:entries="@array/sort_by"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/icon_sort"
        app:layout_constraintTop_toBottomOf="@+id/spinnerPrice" />

    <!-- Cancel and apply buttons -->
    <View
        android:id="@+id/view2"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:visibility="invisible"
        app:layout_constraintBottom_toBottomOf="@+id/buttonCancel"
        app:layout_constraintEnd_toStartOf="@+id/buttonCancel"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/buttonCancel" />

    <Button
        android:id="@+id/buttonCancel"
        style="@style/Base.Widget.AppCompat.Button.Borderless"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/cancel"
        android:textColor="@color/greySecondary"
        android:theme="@style/ThemeOverlay.FilterButton"
        app:layout_constraintEnd_toStartOf="@+id/buttonSearch"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/view2"
        app:layout_constraintTop_toTopOf="@+id/buttonSearch" />


    <Button
        android:id="@+id/buttonSearch"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="@string/apply"
        android:theme="@style/ThemeOverlay.FilterButton"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/buttonCancel"
        app:layout_constraintTop_toBottomOf="@+id/spinnerSort" />

</androidx.constraintlayout.widget.ConstraintLayout>


```

**(g). `activity_main.xml`**


> Our `activity_main` layout.

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `androidx.appcompat.widget.Toolbar`
3. `fragment`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:tools="http://schemas.android.com/tools"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:viewBindingIgnore="true">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        android:theme="@style/AppTheme"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:logo="@drawable/ic_restaurant_white_24px"
        app:popupTheme="@style/Theme.AppCompat.Light.DarkActionBar"
        app:title="@string/app_name"
        app:titleMarginStart="24dp"
        app:titleTextColor="@android:color/white" />

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/toolbar" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 7. Write Code

Finally we need to write our code as follows:


**(a). `Restaurant.kt`**

> Our `Restaurant` class.

Create a Kotlin file named `Restaurant.kt`.

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.firestore.IgnoreExtraProperties

/**
 * Restaurant POJO.
 */
@IgnoreExtraProperties
data class Restaurant(
    var name: String? = null,
    var city: String? = null,
    var category: String? = null,
    var photo: String? = null,
    var price: Int = 0,
    var numRatings: Int = 0,
    var avgRating: Double = 0.toDouble()
) {

    companion object {

        const val FIELD_CITY = "city"
        const val FIELD_CATEGORY = "category"
        const val FIELD_PRICE = "price"
        const val FIELD_POPULARITY = "numRatings"
        const val FIELD_AVG_RATING = "avgRating"
    }
}


```

**(b). `Rating.kt`**

> Our `Rating` class.

Create a Kotlin file named `Rating.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `TextUtils` from the `android.text` package.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.text.TextUtils
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

/**
 * Model POJO for a rating.
 */
data class Rating(
    var userId: String? = null,
    var userName: String? = null,
    var rating: Double = 0.toDouble(),
    var text: String? = null,
    @ServerTimestamp var timestamp: Date? = null
) {

    constructor(user: FirebaseUser, rating: Double, text: String) : this() {
        this.userId = user.uid
        this.userName = user.displayName
        if (TextUtils.isEmpty(this.userName)) {
            this.userName = user.email
        }

        this.rating = rating
        this.text = text
    }
}


```

**(c). `RestaurantUtil.kt`**

> Our `RestaurantUtil` class.

Create a Kotlin file named `RestaurantUtil.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.

We will be creating the following methods:

1. `getRandom(parameter)` - Let's pass a `Context` object as a parameter.
2. `getRandomImageUrl(parameter)` - Our function will take a `Random` object as a parameter.
3. `getPriceString(parameter)` - This function will take a `Restaurant` object as a parameter.
4. `getPriceString(parameter)` - This function will take a `Int` object as a parameter.
5. `getRandomName(parameter)` - This function will take a `Random` object as a parameter.
6. `getRandomString(array: Array<String>, random: Random): String `.
7. `getRandomInt(array: IntArray, random: Random): Int `.

**(a). Our `getRandomImageUrl()` function**

Write the `getRandomImageUrl()` function as follows:

```kotlin
    private fun getRandomImageUrl(random: Random): String {
        // Integer between 1 and MAX_IMAGE_NUM (inclusive)
        val id = random.nextInt(MAX_IMAGE_NUM) + 1

        return String.format(Locale.getDefault(), RESTAURANT_URL_FMT, id)
    }
```

**(b). Our `getRandomName()` function**

Write the `getRandomName()` function as follows:

```kotlin
    private fun getRandomName(random: Random): String {
        return (getRandomString(NAME_FIRST_WORDS, random) + " " +
                getRandomString(NAME_SECOND_WORDS, random))
    }
```

**(c). Our `getPriceString()` function**

Write the `getPriceString()` function as follows:

```kotlin
    fun getPriceString(priceInt: Int): String {
        when (priceInt) {
            1 -> return "$"
            2 -> return "$$"
            3 -> return "$$$"
            else -> return "$$$"
        }
    }
```

**(d). Our `getRandomString()` function**

Write the `getRandomString()` function as follows:

```kotlin
    private fun getRandomString(array: Array<String>, random: Random): String {
        val ind = random.nextInt(array.size)
        return array[ind]
    }
```

**(e). Our `getRandomInt()` function**

Write the `getRandomInt()` function as follows:

```kotlin
    private fun getRandomInt(array: IntArray, random: Random): Int {
        val ind = random.nextInt(array.size)
        return array[ind]
    }
```

**(f). Our `getPriceString()` function**

Write the `getPriceString()` function as follows:

```kotlin
    fun getPriceString(restaurant: Restaurant): String {
        return getPriceString(restaurant.price)
    }
```

**(g). Our `getRandom()` function**

Write the `getRandom()` function as follows:

```kotlin
    fun getRandom(context: Context): Restaurant {
        val restaurant = Restaurant()
        val random = Random()

        // Cities (first elemnt is 'Any')
        var cities = context.resources.getStringArray(R.array.cities)
        cities = Arrays.copyOfRange(cities, 1, cities.size)

        // Categories (first element is 'Any')
        var categories = context.resources.getStringArray(R.array.categories)
        categories = Arrays.copyOfRange(categories, 1, categories.size)

        val prices = intArrayOf(1, 2, 3)

        restaurant.name = getRandomName(random)
        restaurant.city = getRandomString(cities, random)
        restaurant.category = getRandomString(categories, random)
        restaurant.photo = getRandomImageUrl(random)
        restaurant.price = getRandomInt(prices, random)
        restaurant.numRatings = random.nextInt(20)

        // Note: average rating intentionally not set

        return restaurant
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import java.util.Arrays
import java.util.Locale
import java.util.Random

/**
 * Utilities for Restaurants.
 */
object RestaurantUtil {

    private const val RESTAURANT_URL_FMT = "https://storage.googleapis.com/firestorequickstarts.appspot.com/food_%d.png"
    private const val MAX_IMAGE_NUM = 22

    private val NAME_FIRST_WORDS = arrayOf(
            "Foo", "Bar", "Baz", "Qux", "Fire", "Sam's", "World Famous", "Google", "The Best")

    private val NAME_SECOND_WORDS = arrayOf(
            "Restaurant", "Cafe", "Spot", "Eatin' Place", "Eatery", "Drive Thru", "Diner")

    /**
     * Create a random Restaurant POJO.
     */
    fun getRandom(context: Context): Restaurant {
        val restaurant = Restaurant()
        val random = Random()

        // Cities (first elemnt is 'Any')
        var cities = context.resources.getStringArray(R.array.cities)
        cities = Arrays.copyOfRange(cities, 1, cities.size)

        // Categories (first element is 'Any')
        var categories = context.resources.getStringArray(R.array.categories)
        categories = Arrays.copyOfRange(categories, 1, categories.size)

        val prices = intArrayOf(1, 2, 3)

        restaurant.name = getRandomName(random)
        restaurant.city = getRandomString(cities, random)
        restaurant.category = getRandomString(categories, random)
        restaurant.photo = getRandomImageUrl(random)
        restaurant.price = getRandomInt(prices, random)
        restaurant.numRatings = random.nextInt(20)

        // Note: average rating intentionally not set

        return restaurant
    }

    /**
     * Get a random image.
     */
    private fun getRandomImageUrl(random: Random): String {
        // Integer between 1 and MAX_IMAGE_NUM (inclusive)
        val id = random.nextInt(MAX_IMAGE_NUM) + 1

        return String.format(Locale.getDefault(), RESTAURANT_URL_FMT, id)
    }

    /**
     * Get price represented as dollar signs.
     */
    fun getPriceString(restaurant: Restaurant): String {
        return getPriceString(restaurant.price)
    }

    /**
     * Get price represented as dollar signs.
     */
    fun getPriceString(priceInt: Int): String {
        when (priceInt) {
            1 -> return "$"
            2 -> return "$$"
            3 -> return "$$$"
            else -> return "$$$"
        }
    }

    private fun getRandomName(random: Random): String {
        return (getRandomString(NAME_FIRST_WORDS, random) + " " +
                getRandomString(NAME_SECOND_WORDS, random))
    }

    private fun getRandomString(array: Array<String>, random: Random): String {
        val ind = random.nextInt(array.size)
        return array[ind]
    }

    private fun getRandomInt(array: IntArray, random: Random): Int {
        val ind = random.nextInt(array.size)
        return array[ind]
    }
}


```

**(d). `RatingUtil.kt`**

> Our `RatingUtil` class.

Create a Kotlin file named `RatingUtil.kt`.


We will be creating the following methods:

1. `getRandomList(parameter)` - Pass to this method a `Int` object as a parameter.
2. `getAverageRating(parameter)` - This function will take a `List<Rating>` object as a parameter.

**(a). Our `getAverageRating()` function**

Write the `getAverageRating()` function as follows:

```kotlin
    fun getAverageRating(ratings: List<Rating>): Double {
        var sum = 0.0

        for (rating in ratings) {
            sum += rating.rating
        }

        return sum / ratings.size
    }
```

**(b). Our `getRandomList()` function**

Write the `getRandomList()` function as follows:

```kotlin
    fun getRandomList(length: Int): List<Rating> {
        val result = ArrayList<Rating>()

        for (i in 0 until length) {
            result.add(random)
        }

        return result
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.example.fireeats.kotlin.model.Rating
import java.util.ArrayList
import java.util.Random
import java.util.UUID

/**
 * Utilities for Ratings.
 */
object RatingUtil {

    private val REVIEW_CONTENTS = arrayOf(
            // 0 - 1 stars
            "This was awful! Totally inedible.",

            // 1 - 2 stars
            "This was pretty bad, would not go back.",

            // 2 - 3 stars
            "I was fed, so that's something.",

            // 3 - 4 stars
            "This was a nice meal, I'd go back.",

            // 4 - 5 stars
            "This was fantastic!  Best ever!")

    /**
     * Create a random Rating POJO.
     */
    private val random: Rating
        get() {
            val rating = Rating()

            val random = Random()

            val score = random.nextDouble() * 5.0
            val text = REVIEW_CONTENTS[Math.floor(score).toInt()]

            rating.userId = UUID.randomUUID().toString()
            rating.userName = "Random User"
            rating.rating = score
            rating.text = text

            return rating
        }

    /**
     * Get a list of random Rating POJOs.
     */
    fun getRandomList(length: Int): List<Rating> {
        val result = ArrayList<Rating>()

        for (i in 0 until length) {
            result.add(random)
        }

        return result
    }

    /**
     * Get the average rating of a List.
     */
    fun getAverageRating(ratings: List<Rating>): Double {
        var sum = 0.0

        for (rating in ratings) {
            sum += rating.rating
        }

        return sum / ratings.size
    }
}


```

**(e). `RestaurantAdapter.kt`**

> Our `RestaurantAdapter` class.

Create a Kotlin file named `RestaurantAdapter.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `LayoutInflater` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `RecyclerView.ViewHolder(binding.root)` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
2. `onBindViewHolder(holder: ViewHolder, position: Int) `.

We will be creating the following methods:


**(a). Our `bind()` function**

Write the `bind()` function as follows:

```kotlin
        fun bind(
            snapshot: DocumentSnapshot,
            listener: OnRestaurantSelectedListener?
        ) {

            val restaurant = snapshot.toObject<Restaurant>()
            if (restaurant == null) {
                return
            }

            val resources = binding.root.resources

            // Load image
            Glide.with(binding.restaurantItemImage.context)
                    .load(restaurant.photo)
                    .into(binding.restaurantItemImage)

            val numRatings: Int = restaurant.numRatings

            binding.restaurantItemName.text = restaurant.name
            binding.restaurantItemRating.rating = restaurant.avgRating.toFloat()
            binding.restaurantItemCity.text = restaurant.city
            binding.restaurantItemCategory.text = restaurant.category
            binding.restaurantItemNumRatings.text = resources.getString(
                    R.string.fmt_num_ratings,
                    numRatings)
            binding.restaurantItemPrice.text = RestaurantUtil.getPriceString(restaurant)

            // Click listener
            binding.root.setOnClickListener {
                listener?.onRestaurantSelected(snapshot)
            }
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.databinding.ItemRestaurantBinding
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import com.google.firebase.example.fireeats.kotlin.util.RestaurantUtil
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.toObject

/**
 * RecyclerView adapter for a list of Restaurants.
 */
open class RestaurantAdapter(query: Query, private val listener: OnRestaurantSelectedListener) :
        FirestoreAdapter<RestaurantAdapter.ViewHolder>(query) {

    interface OnRestaurantSelectedListener {

        fun onRestaurantSelected(restaurant: DocumentSnapshot)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(ItemRestaurantBinding.inflate(
                LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getSnapshot(position), listener)
    }

    class ViewHolder(val binding: ItemRestaurantBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(
            snapshot: DocumentSnapshot,
            listener: OnRestaurantSelectedListener?
        ) {

            val restaurant = snapshot.toObject<Restaurant>()
            if (restaurant == null) {
                return
            }

            val resources = binding.root.resources

            // Load image
            Glide.with(binding.restaurantItemImage.context)
                    .load(restaurant.photo)
                    .into(binding.restaurantItemImage)

            val numRatings: Int = restaurant.numRatings

            binding.restaurantItemName.text = restaurant.name
            binding.restaurantItemRating.rating = restaurant.avgRating.toFloat()
            binding.restaurantItemCity.text = restaurant.city
            binding.restaurantItemCategory.text = restaurant.category
            binding.restaurantItemNumRatings.text = resources.getString(
                    R.string.fmt_num_ratings,
                    numRatings)
            binding.restaurantItemPrice.text = RestaurantUtil.getPriceString(restaurant)

            // Click listener
            binding.root.setOnClickListener {
                listener?.onRestaurantSelected(snapshot)
            }
        }
    }
}


```

**(f). `RatingAdapter.kt`**

> Our `RatingAdapter` class.

Create a Kotlin file named `RatingAdapter.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `LayoutInflater` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `FirestoreAdapter<RatingAdapter.ViewHolder>(query)` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
2. `onBindViewHolder(holder: ViewHolder, position: Int) `.

We will be creating the following methods:

1. `bind(parameter)` - Our function will take a `Rating?` object as a parameter.

**(a). Our `bind()` function**

Write the `bind()` function as follows:

```kotlin
        fun bind(rating: Rating?) {
            if (rating == null) {
                return
            }

            binding.ratingItemName.text = rating.userName
            binding.ratingItemRating.rating = rating.rating.toFloat()
            binding.ratingItemText.text = rating.text

            if (rating.timestamp != null) {
                binding.ratingItemDate.text = FORMAT.format(rating.timestamp)
            }
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.example.fireeats.databinding.ItemRatingBinding
import com.google.firebase.example.fireeats.kotlin.model.Rating
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.toObject
import java.text.SimpleDateFormat
import java.util.Locale

/**
 * RecyclerView adapter for a list of [Rating].
 */
open class RatingAdapter(query: Query) : FirestoreAdapter<RatingAdapter.ViewHolder>(query) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(ItemRatingBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getSnapshot(position).toObject<Rating>())
    }

    class ViewHolder(val binding: ItemRatingBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(rating: Rating?) {
            if (rating == null) {
                return
            }

            binding.ratingItemName.text = rating.userName
            binding.ratingItemRating.rating = rating.rating.toFloat()
            binding.ratingItemText.text = rating.text

            if (rating.timestamp != null) {
                binding.ratingItemDate.text = FORMAT.format(rating.timestamp)
            }
        }

        companion object {

            private val FORMAT = SimpleDateFormat(
                    "MM/dd/yyyy", Locale.US)
        }
    }
}


```

**(g). `FirestoreAdapter.kt`**

> Our `FirestoreAdapter` class.

Create a Kotlin file named `FirestoreAdapter.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `RecyclerView` from the `androidx.recyclerview.widget` package.
2. `Log` from the `android.util` package.

Next create a class that derives from `RecyclerView.ViewHolder>(private` and add its contents as follows:

We will be overriding the following functions: 

1. `onEvent(documentSnapshots: QuerySnapshot?, e: FirebaseFirestoreException?) `.
2. `getItemCount(): Int `.

We will be creating the following methods:

1. `startListening() `.
2. `stopListening() `.
3. `setQuery(parameter)` - Pass to this method a `Query` object as a parameter.
4. `onError(parameter)` - Our function will take a `FirebaseFirestoreException` object as a parameter.
5. `onDataChanged() `.
6. `getSnapshot(parameter)` - This function will take a `Int` object as a parameter.
7. `onDocumentAdded(parameter)` - Our function will take a `DocumentChange` object as a parameter.
8. `onDocumentModified(parameter)` - Let's pass a `DocumentChange` object as a parameter.
9. `onDocumentRemoved(parameter)` - This function will take a `DocumentChange` object as a parameter.

**(a). Our `stopListening()` function**

Write the `stopListening()` function as follows:

```kotlin
    fun stopListening() {
        registration?.remove()
        registration = null

        snapshots.clear()
        notifyDataSetChanged()
    }
```

**(b). Our `onDocumentAdded()` function**

Write the `onDocumentAdded()` function as follows:

```kotlin
    private fun onDocumentAdded(change: DocumentChange) {
        snapshots.add(change.newIndex, change.document)
        notifyItemInserted(change.newIndex)
    }
```

**(c). Our `getSnapshot()` function**

Write the `getSnapshot()` function as follows:

```kotlin
    protected fun getSnapshot(index: Int): DocumentSnapshot {
        return snapshots[index]
    }
```

**(d). Our `setQuery()` function**

Write the `setQuery()` function as follows:

```kotlin
    fun setQuery(query: Query) {
        // Stop listening
        stopListening()

        // Clear existing data
        snapshots.clear()
        notifyDataSetChanged()

        // Listen to new query
        this.query = query
        startListening()
    }
```

**(e). Our `onDocumentModified()` function**

Write the `onDocumentModified()` function as follows:

```kotlin
    private fun onDocumentModified(change: DocumentChange) {
        if (change.oldIndex == change.newIndex) {
            // Item changed but remained in same position
            snapshots[change.oldIndex] = change.document
            notifyItemChanged(change.oldIndex)
        } else {
            // Item changed and changed position
            snapshots.removeAt(change.oldIndex)
            snapshots.add(change.newIndex, change.document)
            notifyItemMoved(change.oldIndex, change.newIndex)
        }
    }
```

**(f). Our `onError()` function**

Write the `onError()` function as follows:

```kotlin
    open fun onError(e: FirebaseFirestoreException) {
        Log.w(TAG, "onError", e)
    }
```

**(g). Our `onDocumentRemoved()` function**

Write the `onDocumentRemoved()` function as follows:

```kotlin
    private fun onDocumentRemoved(change: DocumentChange) {
        snapshots.removeAt(change.oldIndex)
        notifyItemRemoved(change.oldIndex)
    }
```

**(h). Our `startListening()` function**

Write the `startListening()` function as follows:

```kotlin
    fun startListening() {
        if (query != null && registration == null) {
            registration = query!!.addSnapshotListener(this)
        }
    }
```

**(i). Our `onDataChanged()` function**

Write the `onDataChanged()` function as follows:

```kotlin
    open fun onDataChanged() {}

    override fun getItemCount(): Int {
        return snapshots.size
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.recyclerview.widget.RecyclerView
import android.util.Log
import com.google.firebase.firestore.DocumentChange
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.EventListener
import com.google.firebase.firestore.FirebaseFirestoreException
import com.google.firebase.firestore.ListenerRegistration
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.QuerySnapshot
import java.util.ArrayList

/**
 * RecyclerView adapter for displaying the results of a Firestore [Query].
 *
 * Note that this class forgoes some efficiency to gain simplicity. For example, the result of
 * [DocumentSnapshot.toObject] is not cached so the same object may be deserialized
 * many times as the user scrolls.
 */
abstract class FirestoreAdapter<VH : RecyclerView.ViewHolder>(private var query: Query?) :
        RecyclerView.Adapter<VH>(),
        EventListener<QuerySnapshot> {

    private var registration: ListenerRegistration? = null

    private val snapshots = ArrayList<DocumentSnapshot>()

    override fun onEvent(documentSnapshots: QuerySnapshot?, e: FirebaseFirestoreException?) {
        if (e != null) {
            Log.w(TAG, "onEvent:error", e)
            onError(e)
            return
        }

        if (documentSnapshots == null) {
            return
        }

        // Dispatch the event
        Log.d(TAG, "onEvent:numChanges:" + documentSnapshots.documentChanges.size)
        for (change in documentSnapshots.documentChanges) {
            when (change.type) {
                DocumentChange.Type.ADDED -> onDocumentAdded(change)
                DocumentChange.Type.MODIFIED -> onDocumentModified(change)
                DocumentChange.Type.REMOVED -> onDocumentRemoved(change)
            }
        }

        onDataChanged()
    }

    fun startListening() {
        if (query != null && registration == null) {
            registration = query!!.addSnapshotListener(this)
        }
    }

    fun stopListening() {
        registration?.remove()
        registration = null

        snapshots.clear()
        notifyDataSetChanged()
    }

    fun setQuery(query: Query) {
        // Stop listening
        stopListening()

        // Clear existing data
        snapshots.clear()
        notifyDataSetChanged()

        // Listen to new query
        this.query = query
        startListening()
    }

    open fun onError(e: FirebaseFirestoreException) {
        Log.w(TAG, "onError", e)
    }

    open fun onDataChanged() {}

    override fun getItemCount(): Int {
        return snapshots.size
    }

    protected fun getSnapshot(index: Int): DocumentSnapshot {
        return snapshots[index]
    }

    private fun onDocumentAdded(change: DocumentChange) {
        snapshots.add(change.newIndex, change.document)
        notifyItemInserted(change.newIndex)
    }

    private fun onDocumentModified(change: DocumentChange) {
        if (change.oldIndex == change.newIndex) {
            // Item changed but remained in same position
            snapshots[change.oldIndex] = change.document
            notifyItemChanged(change.oldIndex)
        } else {
            // Item changed and changed position
            snapshots.removeAt(change.oldIndex)
            snapshots.add(change.newIndex, change.document)
            notifyItemMoved(change.oldIndex, change.newIndex)
        }
    }

    private fun onDocumentRemoved(change: DocumentChange) {
        snapshots.removeAt(change.oldIndex)
        notifyItemRemoved(change.oldIndex)
    }

    companion object {

        private const val TAG = "FirestoreAdapter"
    }
}


```

**(h). `MainActivityViewModel.kt`**

> Our `MainActivityViewModel` class.

Create a Kotlin file named `MainActivityViewModel.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `ViewModel` from the `androidx.lifecycle` package.

Next create a class that derives from `ViewModel` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.lifecycle.ViewModel
import com.google.firebase.example.fireeats.kotlin.Filters

/**
 * ViewModel for [com.google.firebase.example.fireeats.MainActivity].
 */

class MainActivityViewModel : ViewModel() {

    var isSigningIn: Boolean = false
    var filters: Filters = Filters.default
}


```

**(i). `Filters.kt`**

> Our `Filters` class.

Create a Kotlin file named `Filters.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `TextUtils` from the `android.text` package.

We will be creating the following methods:

1. `hasCategory(): Boolean `.
2. `hasCity(): Boolean `.
3. `hasPrice(): Boolean `.
4. `hasSortBy(): Boolean `.
5. `getSearchDescription(parameter)` - Our function will take a `Context` object as a parameter.
6. `getOrderDescription(parameter)` - Pass to this method a `Context` object as a parameter.

**(a). Our `hasCity()` function**

Write the `hasCity()` function as follows:

```kotlin
    fun hasCity(): Boolean {
        return !TextUtils.isEmpty(city)
    }
```

**(b). Our `hasCategory()` function**

Write the `hasCategory()` function as follows:

```kotlin
    fun hasCategory(): Boolean {
        return !TextUtils.isEmpty(category)
    }
```

**(c). Our `hasPrice()` function**

Write the `hasPrice()` function as follows:

```kotlin
    fun hasPrice(): Boolean {
        return price > 0
    }
```

**(d). Our `getSearchDescription()` function**

Write the `getSearchDescription()` function as follows:

```kotlin
    fun getSearchDescription(context: Context): String {
        val desc = StringBuilder()

        if (category == null && city == null) {
            desc.append("<b>")
            desc.append(context.getString(R.string.all_restaurants))
            desc.append("</b>")
        }

        if (category != null) {
            desc.append("<b>")
            desc.append(category)
            desc.append("</b>")
        }

        if (category != null && city != null) {
            desc.append(" in ")
        }

        if (city != null) {
            desc.append("<b>")
            desc.append(city)
            desc.append("</b>")
        }

        if (price > 0) {
            desc.append(" for ")
            desc.append("<b>")
            desc.append(RestaurantUtil.getPriceString(price))
            desc.append("</b>")
        }

        return desc.toString()
    }
```

**(e). Our `hasSortBy()` function**

Write the `hasSortBy()` function as follows:

```kotlin
    fun hasSortBy(): Boolean {
        return !TextUtils.isEmpty(sortBy)
    }
```

**(f). Our `getOrderDescription()` function**

Write the `getOrderDescription()` function as follows:

```kotlin
    fun getOrderDescription(context: Context): String {
        return when (sortBy) {
            Restaurant.FIELD_PRICE -> context.getString(R.string.sorted_by_price)
            Restaurant.FIELD_POPULARITY -> context.getString(R.string.sorted_by_popularity)
            else -> context.getString(R.string.sorted_by_rating)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.text.TextUtils
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import com.google.firebase.example.fireeats.kotlin.util.RestaurantUtil
import com.google.firebase.firestore.Query

/**
 * Object for passing filters around.
 */
class Filters {

    var category: String? = null
    var city: String? = null
    var price = -1
    var sortBy: String? = null
    var sortDirection: Query.Direction = Query.Direction.DESCENDING

    fun hasCategory(): Boolean {
        return !TextUtils.isEmpty(category)
    }

    fun hasCity(): Boolean {
        return !TextUtils.isEmpty(city)
    }

    fun hasPrice(): Boolean {
        return price > 0
    }

    fun hasSortBy(): Boolean {
        return !TextUtils.isEmpty(sortBy)
    }

    fun getSearchDescription(context: Context): String {
        val desc = StringBuilder()

        if (category == null && city == null) {
            desc.append("<b>")
            desc.append(context.getString(R.string.all_restaurants))
            desc.append("</b>")
        }

        if (category != null) {
            desc.append("<b>")
            desc.append(category)
            desc.append("</b>")
        }

        if (category != null && city != null) {
            desc.append(" in ")
        }

        if (city != null) {
            desc.append("<b>")
            desc.append(city)
            desc.append("</b>")
        }

        if (price > 0) {
            desc.append(" for ")
            desc.append("<b>")
            desc.append(RestaurantUtil.getPriceString(price))
            desc.append("</b>")
        }

        return desc.toString()
    }

    fun getOrderDescription(context: Context): String {
        return when (sortBy) {
            Restaurant.FIELD_PRICE -> context.getString(R.string.sorted_by_price)
            Restaurant.FIELD_POPULARITY -> context.getString(R.string.sorted_by_popularity)
            else -> context.getString(R.string.sorted_by_rating)
        }
    }

    companion object {

        val default: Filters
            get() {
                val filters = Filters()
                filters.sortBy = Restaurant.FIELD_AVG_RATING
                filters.sortDirection = Query.Direction.DESCENDING

                return filters
            }
    }
}


```

**(j). `FilterDialogFragment.kt`**

> Our `FilterDialogFragment` class.

Create a Kotlin file named `FilterDialogFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.
6. `DialogFragment` from the `androidx.fragment.app` package.

Next create a class that derives from `DialogFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onDestroyView() `.
2. `onAttach(context: Context) `.
3. `onResume() `.

We will be creating the following methods:

1. `onSearchClicked() `.
2. `onCancelClicked() `.
3. `resetFilters() `.

**(a). Our `onFilter()` function**

Write the `onFilter()` function as follows:

```kotlin
        fun onFilter(filters: Filters)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = DialogFiltersBinding.inflate(inflater, container, false)

        binding.buttonSearch.setOnClickListener { onSearchClicked() }
        binding.buttonCancel.setOnClickListener { onCancelClicked() }

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        if (parentFragment is FilterListener) {
            filterListener = parentFragment as FilterListener
        }
```

**(b). Our `onCancelClicked()` function**

Write the `onCancelClicked()` function as follows:

```kotlin
    private fun onCancelClicked() {
        dismiss()
    }
```

**(c). Our `resetFilters()` function**

Write the `resetFilters()` function as follows:

```kotlin
    fun resetFilters() {
        _binding?.let {
            it.spinnerCategory.setSelection(0)
            it.spinnerCity.setSelection(0)
            it.spinnerPrice.setSelection(0)
            it.spinnerSort.setSelection(0)
        }
    }
```

**(d). Our `onSearchClicked()` function**

Write the `onSearchClicked()` function as follows:

```kotlin
    private fun onSearchClicked() {
        filterListener?.onFilter(filters)
        dismiss()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.databinding.DialogFiltersBinding
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import com.google.firebase.firestore.Query

/**
 * Dialog Fragment containing filter form.
 */
class FilterDialogFragment : DialogFragment() {

    private var _binding: DialogFiltersBinding? = null
    private val binding get() = _binding!!
    private var filterListener: FilterListener? = null

    private val selectedCategory: String?
        get() {
            val selected = binding.spinnerCategory.selectedItem as String
            return if (getString(R.string.value_any_category) == selected) {
                null
            } else {
                selected
            }
        }

    private val selectedCity: String?
        get() {
            val selected = binding.spinnerCity.selectedItem as String
            return if (getString(R.string.value_any_city) == selected) {
                null
            } else {
                selected
            }
        }

    private val selectedPrice: Int
        get() {
            val selected = binding.spinnerPrice.selectedItem as String
            return when (selected) {
                getString(R.string.price_1) -> 1
                getString(R.string.price_2) -> 2
                getString(R.string.price_3) -> 3
                else -> -1
            }
        }

    private val selectedSortBy: String?
        get() {
            val selected = binding.spinnerSort.selectedItem as String
            if (getString(R.string.sort_by_rating) == selected) {
                return Restaurant.FIELD_AVG_RATING
            }
            if (getString(R.string.sort_by_price) == selected) {
                return Restaurant.FIELD_PRICE
            }
            return if (getString(R.string.sort_by_popularity) == selected) {
                Restaurant.FIELD_POPULARITY
            } else {
                null
            }
        }

    private val sortDirection: Query.Direction
        get() {
            val selected = binding.spinnerSort.selectedItem as String
            if (getString(R.string.sort_by_rating) == selected) {
                return Query.Direction.DESCENDING
            }
            if (getString(R.string.sort_by_price) == selected) {
                return Query.Direction.ASCENDING
            }
            return if (getString(R.string.sort_by_popularity) == selected) {
                Query.Direction.DESCENDING
            } else {
                Query.Direction.DESCENDING
            }
        }

    val filters: Filters
        get() {
            val filters = Filters()

            filters.category = selectedCategory
            filters.city = selectedCity
            filters.price = selectedPrice
            filters.sortBy = selectedSortBy
            filters.sortDirection = sortDirection

            return filters
        }

    interface FilterListener {

        fun onFilter(filters: Filters)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = DialogFiltersBinding.inflate(inflater, container, false)

        binding.buttonSearch.setOnClickListener { onSearchClicked() }
        binding.buttonCancel.setOnClickListener { onCancelClicked() }

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        if (parentFragment is FilterListener) {
            filterListener = parentFragment as FilterListener
        }
    }

    override fun onResume() {
        super.onResume()
        dialog?.window?.setLayout(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT)
    }

    private fun onSearchClicked() {
        filterListener?.onFilter(filters)
        dismiss()
    }

    private fun onCancelClicked() {
        dismiss()
    }

    fun resetFilters() {
        _binding?.let {
            it.spinnerCategory.setSelection(0)
            it.spinnerCity.setSelection(0)
            it.spinnerPrice.setSelection(0)
            it.spinnerSort.setSelection(0)
        }
    }

    companion object {

        const val TAG = "FilterDialog"
    }
}


```

**(k). `RatingDialogFragment.kt`**

> Our `RatingDialogFragment` class.

Create a Kotlin file named `RatingDialogFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.
6. `DialogFragment` from the `androidx.fragment.app` package.

Next create a class that derives from `DialogFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onDestroyView() `.
2. `onAttach(context: Context) `.
3. `onResume() `.

We will be creating the following methods:

1. `onSubmitClicked() `.
2. `onCancelClicked() `.

**(a). Our `onSubmitClicked()` function**

Write the `onSubmitClicked()` function as follows:

```kotlin
    private fun onSubmitClicked() {
        val user = Firebase.auth.currentUser
        user?.let {
            val rating = Rating(
                    it,
                    binding.restaurantFormRating.rating.toDouble(),
                    binding.restaurantFormText.text.toString())

            ratingListener?.onRating(rating)
        }

        dismiss()
    }
```

**(b). Our `onRating()` function**

Write the `onRating()` function as follows:

```kotlin
        fun onRating(rating: Rating)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = DialogRatingBinding.inflate(inflater, container, false)

        binding.restaurantFormButton.setOnClickListener { onSubmitClicked() }
        binding.restaurantFormCancel.setOnClickListener { onCancelClicked() }

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        if (parentFragment is RatingListener) {
            ratingListener = parentFragment as RatingListener
        }
```

**(c). Our `onCancelClicked()` function**

Write the `onCancelClicked()` function as follows:

```kotlin
    private fun onCancelClicked() {
        dismiss()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.google.firebase.auth.ktx.auth
import com.google.firebase.example.fireeats.databinding.DialogRatingBinding
import com.google.firebase.example.fireeats.kotlin.model.Rating
import com.google.firebase.ktx.Firebase

/**
 * Dialog Fragment containing rating form.
 */
class RatingDialogFragment : DialogFragment() {

    private var _binding: DialogRatingBinding? = null
    private val binding get() = _binding!!
    private var ratingListener: RatingListener? = null

    internal interface RatingListener {

        fun onRating(rating: Rating)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = DialogRatingBinding.inflate(inflater, container, false)

        binding.restaurantFormButton.setOnClickListener { onSubmitClicked() }
        binding.restaurantFormCancel.setOnClickListener { onCancelClicked() }

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        if (parentFragment is RatingListener) {
            ratingListener = parentFragment as RatingListener
        }
    }

    override fun onResume() {
        super.onResume()
        dialog?.window?.setLayout(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT)
    }

    private fun onSubmitClicked() {
        val user = Firebase.auth.currentUser
        user?.let {
            val rating = Rating(
                    it,
                    binding.restaurantFormRating.rating.toDouble(),
                    binding.restaurantFormText.text.toString())

            ratingListener?.onRating(rating)
        }

        dismiss()
    }

    private fun onCancelClicked() {
        dismiss()
    }

    companion object {

        const val TAG = "RatingDialog"
    }
}


```

**(m). `RestaurantDetailFragment.kt`**

> Our `RestaurantDetailFragment` class.

Create a Kotlin file named `RestaurantDetailFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `Log` from the `android.util` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `InputMethodManager` from the `android.view.inputmethod` package.
8. `Fragment` from the `androidx.fragment.app` package.
9. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onDataChanged() `.
4. `onEvent(snapshot: DocumentSnapshot?, e: FirebaseFirestoreException?) `.
5. `onRating(rating: Rating) `.

We will be creating the following methods:

1. `onStart() `.
2. `onStop() `.
3. `onRestaurantLoaded(parameter)` - Pass to this method a `Restaurant` object as a parameter.
4. `onBackArrowClicked() `.
5. `onAddRatingClicked() `.
6. `addRating(restaurantRef: DocumentReference, rating: Rating): Task<Void> `.
7. `hideKeyboard() `.

**(a). Our `onStop()` function**

Write the `onStop()` function as follows:

```kotlin
    public override fun onStop() {
        super.onStop()

        ratingAdapter.stopListening()

        restaurantRegistration?.remove()
        restaurantRegistration = null
    }
```

**(b). Our `addRating()` function**

Write the `addRating()` function as follows:

```kotlin
    private fun addRating(restaurantRef: DocumentReference, rating: Rating): Task<Void> {
        // Create reference for new rating, for use inside the transaction
        val ratingRef = restaurantRef.collection("ratings").document()

        // In a transaction, add the new rating and update the aggregate totals
        return firestore.runTransaction { transaction ->
            val restaurant = transaction.get(restaurantRef).toObject<Restaurant>()
            if (restaurant == null) {
                throw Exception("Resraurant not found at ${restaurantRef.path}")
            }

            // Compute new number of ratings
            val newNumRatings = restaurant.numRatings + 1

            // Compute new average rating
            val oldRatingTotal = restaurant.avgRating * restaurant.numRatings
            val newAvgRating = (oldRatingTotal + rating.rating) / newNumRatings

            // Set new restaurant info
            restaurant.numRatings = newNumRatings
            restaurant.avgRating = newAvgRating

            // Commit to Firestore
            transaction.set(restaurantRef, restaurant)
            transaction.set(ratingRef, rating)

            null
        }
    }
```

**(c). Our `onAddRatingClicked()` function**

Write the `onAddRatingClicked()` function as follows:

```kotlin
    private fun onAddRatingClicked() {
        ratingDialog?.show(childFragmentManager, RatingDialogFragment.TAG)
    }
```

**(d). Our `onBackArrowClicked()` function**

Write the `onBackArrowClicked()` function as follows:

```kotlin
    private fun onBackArrowClicked() {
        requireActivity().onBackPressed()
    }
```

**(e). Our `hideKeyboard()` function**

Write the `hideKeyboard()` function as follows:

```kotlin
    private fun hideKeyboard() {
        val view = requireActivity().currentFocus
        if (view != null) {
            (requireActivity().getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager)
                    .hideSoftInputFromWindow(view.windowToken, 0)
        }
    }
```

**(f). Our `onStart()` function**

Write the `onStart()` function as follows:

```kotlin
    public override fun onStart() {
        super.onStart()

        ratingAdapter.startListening()
        restaurantRegistration = restaurantRef.addSnapshotListener(this)
    }
```

**(g). Our `onRestaurantLoaded()` function**

Write the `onRestaurantLoaded()` function as follows:

```kotlin
    private fun onRestaurantLoaded(restaurant: Restaurant) {
        binding.restaurantName.text = restaurant.name
        binding.restaurantRating.rating = restaurant.avgRating.toFloat()
        binding.restaurantNumRatings.text = getString(R.string.fmt_num_ratings, restaurant.numRatings)
        binding.restaurantCity.text = restaurant.city
        binding.restaurantCategory.text = restaurant.category
        binding.restaurantPrice.text = RestaurantUtil.getPriceString(restaurant)

        // Background image
        Glide.with(binding.restaurantImage.context)
                .load(restaurant.photo)
                .into(binding.restaurantImage)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.google.android.gms.tasks.Task
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.databinding.FragmentRestaurantDetailBinding
import com.google.firebase.example.fireeats.kotlin.adapter.RatingAdapter
import com.google.firebase.example.fireeats.kotlin.model.Rating
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import com.google.firebase.example.fireeats.kotlin.util.RestaurantUtil
import com.google.firebase.firestore.DocumentReference
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.EventListener
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreException
import com.google.firebase.firestore.ListenerRegistration
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.firestore.ktx.toObject
import com.google.firebase.ktx.Firebase

class RestaurantDetailFragment : Fragment(),
    EventListener<DocumentSnapshot>,
        RatingDialogFragment.RatingListener {

    private var ratingDialog: RatingDialogFragment? = null

    private lateinit var binding: FragmentRestaurantDetailBinding
    private lateinit var firestore: FirebaseFirestore
    private lateinit var restaurantRef: DocumentReference
    private lateinit var ratingAdapter: RatingAdapter

    private var restaurantRegistration: ListenerRegistration? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        binding = FragmentRestaurantDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Get restaurant ID from extras
        val restaurantId = RestaurantDetailFragmentArgs.fromBundle(requireArguments()).keyRestaurantId

        // Initialize Firestore
        firestore = Firebase.firestore

        // Get reference to the restaurant
        restaurantRef = firestore.collection("restaurants").document(restaurantId)

        // Get ratings
        val ratingsQuery = restaurantRef
                .collection("ratings")
                .orderBy("timestamp", Query.Direction.DESCENDING)
                .limit(50)

        // RecyclerView
        ratingAdapter = object : RatingAdapter(ratingsQuery) {
            override fun onDataChanged() {
                if (itemCount == 0) {
                    binding.recyclerRatings.visibility = View.GONE
                    binding.viewEmptyRatings.visibility = View.VISIBLE
                } else {
                    binding.recyclerRatings.visibility = View.VISIBLE
                    binding.viewEmptyRatings.visibility = View.GONE
                }
            }
        }
        binding.recyclerRatings.layoutManager = LinearLayoutManager(context)
        binding.recyclerRatings.adapter = ratingAdapter

        ratingDialog = RatingDialogFragment()

        binding.restaurantButtonBack.setOnClickListener { onBackArrowClicked() }
        binding.fabShowRatingDialog.setOnClickListener { onAddRatingClicked() }
    }

    public override fun onStart() {
        super.onStart()

        ratingAdapter.startListening()
        restaurantRegistration = restaurantRef.addSnapshotListener(this)
    }

    public override fun onStop() {
        super.onStop()

        ratingAdapter.stopListening()

        restaurantRegistration?.remove()
        restaurantRegistration = null
    }

    /**
     * Listener for the Restaurant document ([.restaurantRef]).
     */
    override fun onEvent(snapshot: DocumentSnapshot?, e: FirebaseFirestoreException?) {
        if (e != null) {
            Log.w(TAG, "restaurant:onEvent", e)
            return
        }

        snapshot?.let {
            val restaurant = snapshot.toObject<Restaurant>()
            if (restaurant != null) {
                onRestaurantLoaded(restaurant)
            }
        }
    }

    private fun onRestaurantLoaded(restaurant: Restaurant) {
        binding.restaurantName.text = restaurant.name
        binding.restaurantRating.rating = restaurant.avgRating.toFloat()
        binding.restaurantNumRatings.text = getString(R.string.fmt_num_ratings, restaurant.numRatings)
        binding.restaurantCity.text = restaurant.city
        binding.restaurantCategory.text = restaurant.category
        binding.restaurantPrice.text = RestaurantUtil.getPriceString(restaurant)

        // Background image
        Glide.with(binding.restaurantImage.context)
                .load(restaurant.photo)
                .into(binding.restaurantImage)
    }

    private fun onBackArrowClicked() {
        requireActivity().onBackPressed()
    }

    private fun onAddRatingClicked() {
        ratingDialog?.show(childFragmentManager, RatingDialogFragment.TAG)
    }

    override fun onRating(rating: Rating) {
        // In a transaction, add the new rating and update the aggregate totals
        addRating(restaurantRef, rating)
                .addOnSuccessListener(requireActivity()) {
                    Log.d(TAG, "Rating added")

                    // Hide keyboard and scroll to top
                    hideKeyboard()
                    binding.recyclerRatings.smoothScrollToPosition(0)
                }
                .addOnFailureListener(requireActivity()) { e ->
                    Log.w(TAG, "Add rating failed", e)

                    // Show failure message and hide keyboard
                    hideKeyboard()
                    Snackbar.make(
                        requireView().findViewById(android.R.id.content), "Failed to add rating",
                            Snackbar.LENGTH_SHORT).show()
                }
    }

    private fun addRating(restaurantRef: DocumentReference, rating: Rating): Task<Void> {
        // Create reference for new rating, for use inside the transaction
        val ratingRef = restaurantRef.collection("ratings").document()

        // In a transaction, add the new rating and update the aggregate totals
        return firestore.runTransaction { transaction ->
            val restaurant = transaction.get(restaurantRef).toObject<Restaurant>()
            if (restaurant == null) {
                throw Exception("Resraurant not found at ${restaurantRef.path}")
            }

            // Compute new number of ratings
            val newNumRatings = restaurant.numRatings + 1

            // Compute new average rating
            val oldRatingTotal = restaurant.avgRating * restaurant.numRatings
            val newAvgRating = (oldRatingTotal + rating.rating) / newNumRatings

            // Set new restaurant info
            restaurant.numRatings = newNumRatings
            restaurant.avgRating = newAvgRating

            // Commit to Firestore
            transaction.set(restaurantRef, restaurant)
            transaction.set(ratingRef, rating)

            null
        }
    }

    private fun hideKeyboard() {
        val view = requireActivity().currentFocus
        if (view != null) {
            (requireActivity().getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager)
                    .hideSoftInputFromWindow(view.windowToken, 0)
        }
    }

    companion object {

        private const val TAG = "RestaurantDetail"

        const val KEY_RESTAURANT_ID = "key_restaurant_id"
    }
}


```

**(n). `MainFragment.kt`**

> Our `MainFragment` class.

Create a Kotlin file named `MainFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Activity` from the `android.app` package.
2. `Bundle` from the `android.os` package.
3. `Log` from the `android.util` package.
4. `LayoutInflater` from the `android.view` package.
5. `Menu` from the `android.view` package.
6. `MenuInflater` from the `android.view` package.
7. `MenuItem` from the `android.view` package.
8. `View` from the `android.view` package.
9. `ViewGroup` from the `android.view` package.
10. `StringRes` from the `androidx.annotation` package.
11. `AlertDialog` from the `androidx.appcompat.app` package.
12. `HtmlCompat` from the `androidx.core.text` package.
13. `Fragment` from the `androidx.fragment.app` package.
14. `ViewModelProvider` from the `androidx.lifecycle` package.
15. `findNavController` from the `androidx.navigation.fragment` package.
16. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onDataChanged() `.
4. `onError(e: FirebaseFirestoreException) `.
5. `onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) `.
6. `onOptionsItemSelected(item: MenuItem): Boolean `.
7. `onRestaurantSelected(restaurant: DocumentSnapshot) `.
8. `onFilter(filters: Filters) `.

We will be creating the following methods:

1. `onStart() `.
2. `onStop() `.
3. `onSignInResult(parameter)` - Pass to this method a `FirebaseAuthUIAuthenticationResult` object as a parameter.
4. `onFilterClicked() `.
5. `onClearFilterClicked() `.
6. `shouldStartSignIn(): Boolean `.
7. `startSignIn() `.
8. `onAddItemsClicked() `.
9. `showSignInErrorDialog(parameter)` - We pass a `Int` object as a parameter.

**(a). Our `startSignIn()` function**

Write the `startSignIn()` function as follows:

```kotlin
    private fun startSignIn() {
        // Sign in with FirebaseUI
        val signInLauncher = requireActivity().registerForActivityResult(
            FirebaseAuthUIActivityResultContract()
        ) { result -> this.onSignInResult(result)}

        val intent = AuthUI.getInstance().createSignInIntentBuilder()
                .setAvailableProviders(listOf(AuthUI.IdpConfig.EmailBuilder().build()))
                .setIsSmartLockEnabled(false)
                .build()

        signInLauncher.launch(intent)
        viewModel.isSigningIn = true
    }
```

**(b). Our `showSignInErrorDialog()` function**

Write the `showSignInErrorDialog()` function as follows:

```kotlin
    private fun showSignInErrorDialog(@StringRes message: Int) {
        val dialog = AlertDialog.Builder(requireContext())
                .setTitle(R.string.title_sign_in_error)
                .setMessage(message)
                .setCancelable(false)
                .setPositiveButton(R.string.option_retry) { _, _ -> startSignIn() }
                .setNegativeButton(R.string.option_exit) { _, _ -> requireActivity().finish() }.create()

        dialog.show()
    }
```

**(c). Our `onAddItemsClicked()` function**

Write the `onAddItemsClicked()` function as follows:

```kotlin
    private fun onAddItemsClicked() {
        // Add a bunch of random restaurants
        val batch = firestore.batch()
        for (i in 0..9) {
            val restRef = firestore.collection("restaurants").document()

            // Create random restaurant / ratings
            val randomRestaurant = RestaurantUtil.getRandom(requireContext())
            val randomRatings = RatingUtil.getRandomList(randomRestaurant.numRatings)
            randomRestaurant.avgRating = RatingUtil.getAverageRating(randomRatings)

            // Add restaurant
            batch.set(restRef, randomRestaurant)

            // Add ratings to subcollection
            for (rating in randomRatings) {
                batch.set(restRef.collection("ratings").document(), rating)
            }
        }

        batch.commit().addOnCompleteListener { task ->
            if (task.isSuccessful) {
                Log.d(TAG, "Write batch succeeded.")
            } else {
                Log.w(TAG, "write batch failed.", task.exception)
            }
        }
    }
```

**(d). Our `onStop()` function**

Write the `onStop()` function as follows:

```kotlin
    public override fun onStop() {
        super.onStop()
        adapter.stopListening()
    }
```

**(e). Our `shouldStartSignIn()` function**

Write the `shouldStartSignIn()` function as follows:

```kotlin
    private fun shouldStartSignIn(): Boolean {
        return !viewModel.isSigningIn && Firebase.auth.currentUser == null
    }
```

**(f). Our `onFilterClicked()` function**

Write the `onFilterClicked()` function as follows:

```kotlin
    private fun onFilterClicked() {
        // Show the dialog containing filter options
        filterDialog.show(childFragmentManager, FilterDialogFragment.TAG)
    }
```

**(g). Our `onSignInResult()` function**

Write the `onSignInResult()` function as follows:

```kotlin
    private fun onSignInResult(result: FirebaseAuthUIAuthenticationResult) {
        val response = result.idpResponse
        viewModel.isSigningIn = false

        if (result.resultCode != Activity.RESULT_OK) {
            if (response == null) {
                // User pressed the back button.
                requireActivity().finish()
            } else if (response.error != null && response.error!!.errorCode == ErrorCodes.NO_NETWORK) {
                showSignInErrorDialog(R.string.message_no_network)
            } else {
                showSignInErrorDialog(R.string.message_unknown)
            }
        }
    }
```

**(h). Our `onClearFilterClicked()` function**

Write the `onClearFilterClicked()` function as follows:

```kotlin
    private fun onClearFilterClicked() {
        filterDialog.resetFilters()

        onFilter(Filters.default)
    }
```

**(i). Our `onStart()` function**

Write the `onStart()` function as follows:

```kotlin
    public override fun onStart() {
        super.onStart()

        // Start sign in if necessary
        if (shouldStartSignIn()) {
            startSignIn()
            return
        }

        // Apply filters
        onFilter(viewModel.filters)

        // Start listening for Firestore updates
        adapter.startListening()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.annotation.StringRes
import androidx.appcompat.app.AlertDialog
import androidx.core.text.HtmlCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.firebase.ui.auth.AuthUI
import com.firebase.ui.auth.ErrorCodes
import com.firebase.ui.auth.FirebaseAuthUIActivityResultContract
import com.firebase.ui.auth.data.model.FirebaseAuthUIAuthenticationResult
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.auth.ktx.auth
import com.google.firebase.example.fireeats.R
import com.google.firebase.example.fireeats.databinding.FragmentMainBinding
import com.google.firebase.example.fireeats.kotlin.adapter.RestaurantAdapter
import com.google.firebase.example.fireeats.kotlin.model.Restaurant
import com.google.firebase.example.fireeats.kotlin.util.RatingUtil
import com.google.firebase.example.fireeats.kotlin.util.RestaurantUtil
import com.google.firebase.example.fireeats.kotlin.viewmodel.MainActivityViewModel
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreException
import com.google.firebase.firestore.Query
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase

class MainFragment : Fragment(),
        FilterDialogFragment.FilterListener,
        RestaurantAdapter.OnRestaurantSelectedListener {

    lateinit var firestore: FirebaseFirestore
    lateinit var query: Query

    private lateinit var binding: FragmentMainBinding
    private lateinit var filterDialog: FilterDialogFragment
    lateinit var adapter: RestaurantAdapter

    private lateinit var viewModel: MainActivityViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        setHasOptionsMenu(true)
        binding = FragmentMainBinding.inflate(inflater, container, false);
        return binding.root;
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // View model
        viewModel = ViewModelProvider(this).get(MainActivityViewModel::class.java)

        // Enable Firestore logging
        FirebaseFirestore.setLoggingEnabled(true)

        // Firestore
        firestore = Firebase.firestore

        // Get ${LIMIT} restaurants
        query = firestore.collection("restaurants")
                .orderBy("avgRating", Query.Direction.DESCENDING)
                .limit(LIMIT.toLong())

        // RecyclerView
        adapter = object : RestaurantAdapter(query, this@MainFragment) {
            override fun onDataChanged() {
                // Show/hide content if the query returns empty.
                if (itemCount == 0) {
                    binding.recyclerRestaurants.visibility = View.GONE
                    binding.viewEmpty.visibility = View.VISIBLE
                } else {
                    binding.recyclerRestaurants.visibility = View.VISIBLE
                    binding.viewEmpty.visibility = View.GONE
                }
            }

            override fun onError(e: FirebaseFirestoreException) {
                // Show a snackbar on errors
                Snackbar.make(binding.root,
                        "Error: check logs for info.", Snackbar.LENGTH_LONG).show()
            }
        }

        binding.recyclerRestaurants.layoutManager = LinearLayoutManager(context)
        binding.recyclerRestaurants.adapter = adapter

        // Filter Dialog
        filterDialog = FilterDialogFragment()

        binding.filterBar.setOnClickListener { onFilterClicked() }
        binding.buttonClearFilter.setOnClickListener { onClearFilterClicked() }
    }

    public override fun onStart() {
        super.onStart()

        // Start sign in if necessary
        if (shouldStartSignIn()) {
            startSignIn()
            return
        }

        // Apply filters
        onFilter(viewModel.filters)

        // Start listening for Firestore updates
        adapter.startListening()
    }

    public override fun onStop() {
        super.onStop()
        adapter.stopListening()
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.menu_main, menu)
        return super.onCreateOptionsMenu(menu, inflater)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.menu_add_items -> onAddItemsClicked()
            R.id.menu_sign_out -> {
                AuthUI.getInstance().signOut(requireContext())
                startSignIn()
            }
        }
        return super.onOptionsItemSelected(item)
    }

    private fun onSignInResult(result: FirebaseAuthUIAuthenticationResult) {
        val response = result.idpResponse
        viewModel.isSigningIn = false

        if (result.resultCode != Activity.RESULT_OK) {
            if (response == null) {
                // User pressed the back button.
                requireActivity().finish()
            } else if (response.error != null && response.error!!.errorCode == ErrorCodes.NO_NETWORK) {
                showSignInErrorDialog(R.string.message_no_network)
            } else {
                showSignInErrorDialog(R.string.message_unknown)
            }
        }
    }

    private fun onFilterClicked() {
        // Show the dialog containing filter options
        filterDialog.show(childFragmentManager, FilterDialogFragment.TAG)
    }

    private fun onClearFilterClicked() {
        filterDialog.resetFilters()

        onFilter(Filters.default)
    }

    override fun onRestaurantSelected(restaurant: DocumentSnapshot) {
        // Go to the details page for the selected restaurant
        val action = MainFragmentDirections
            .actionMainFragmentToRestaurantDetailFragment(restaurant.id)

        findNavController().navigate(action)
    }

    override fun onFilter(filters: Filters) {
        // Construct query basic query
        var query: Query = firestore.collection("restaurants")

        // Category (equality filter)
        if (filters.hasCategory()) {
            query = query.whereEqualTo(Restaurant.FIELD_CATEGORY, filters.category)
        }

        // City (equality filter)
        if (filters.hasCity()) {
            query = query.whereEqualTo(Restaurant.FIELD_CITY, filters.city)
        }

        // Price (equality filter)
        if (filters.hasPrice()) {
            query = query.whereEqualTo(Restaurant.FIELD_PRICE, filters.price)
        }

        // Sort by (orderBy with direction)
        if (filters.hasSortBy()) {
            query = query.orderBy(filters.sortBy.toString(), filters.sortDirection)
        }

        // Limit items
        query = query.limit(LIMIT.toLong())

        // Update the query
        adapter.setQuery(query)

        // Set header
        binding.textCurrentSearch.text = HtmlCompat.fromHtml(filters.getSearchDescription(requireContext()),
                HtmlCompat.FROM_HTML_MODE_LEGACY)
        binding.textCurrentSortBy.text = filters.getOrderDescription(requireContext())

        // Save filters
        viewModel.filters = filters
    }

    private fun shouldStartSignIn(): Boolean {
        return !viewModel.isSigningIn && Firebase.auth.currentUser == null
    }

    private fun startSignIn() {
        // Sign in with FirebaseUI
        val signInLauncher = requireActivity().registerForActivityResult(
            FirebaseAuthUIActivityResultContract()
        ) { result -> this.onSignInResult(result)}

        val intent = AuthUI.getInstance().createSignInIntentBuilder()
                .setAvailableProviders(listOf(AuthUI.IdpConfig.EmailBuilder().build()))
                .setIsSmartLockEnabled(false)
                .build()

        signInLauncher.launch(intent)
        viewModel.isSigningIn = true
    }

    private fun onAddItemsClicked() {
        // Add a bunch of random restaurants
        val batch = firestore.batch()
        for (i in 0..9) {
            val restRef = firestore.collection("restaurants").document()

            // Create random restaurant / ratings
            val randomRestaurant = RestaurantUtil.getRandom(requireContext())
            val randomRatings = RatingUtil.getRandomList(randomRestaurant.numRatings)
            randomRestaurant.avgRating = RatingUtil.getAverageRating(randomRatings)

            // Add restaurant
            batch.set(restRef, randomRestaurant)

            // Add ratings to subcollection
            for (rating in randomRatings) {
                batch.set(restRef.collection("ratings").document(), rating)
            }
        }

        batch.commit().addOnCompleteListener { task ->
            if (task.isSuccessful) {
                Log.d(TAG, "Write batch succeeded.")
            } else {
                Log.w(TAG, "write batch failed.", task.exception)
            }
        }
    }

    private fun showSignInErrorDialog(@StringRes message: Int) {
        val dialog = AlertDialog.Builder(requireContext())
                .setTitle(R.string.title_sign_in_error)
                .setMessage(message)
                .setCancelable(false)
                .setPositiveButton(R.string.option_retry) { _, _ -> startSignIn() }
                .setNegativeButton(R.string.option_exit) { _, _ -> requireActivity().finish() }.create()

        dialog.show()
    }

    companion object {

        private const val TAG = "MainActivity"

        private const val LIMIT = 50
    }
}


```

**(o). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Navigation` from the `androidx.navigation` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.Navigation
import com.google.firebase.example.fireeats.R

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.toolbar))
        Navigation.findNavController(this, R.id.nav_host_fragment)
            .setGraph(R.navigation.nav_graph_kotlin)
    }
}

```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/firestore/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
