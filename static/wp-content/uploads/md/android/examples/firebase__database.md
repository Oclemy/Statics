# Kotlin Firebase Realtime Database BlogPosts App

This is a full blog posts app allowing you to learn Firebase Realtime Database and use it to create a fully functional app.

Here is the screenshot of what is created:

![Firebase Realtime Database Blog App Tutorial](https://github.com/firebase/quickstart-android/raw/master/database/app/src/screen.png)


#### Data Model

The database has four "root" nodes:

##### Database Rules

Below are some samples rules that limit access and validate data:

```kotlin
{
  "rules": {
    // User profiles are only readable/writable by the user who owns it
    "users": {
      "$UID": {
        ".read": "auth.uid == $UID",
        ".write": "auth.uid == $UID"
      }
    },

    // Posts can be read by anyone but only written by logged-in users.
    "posts": {
      ".read": true,
      ".write": "auth.uid != null",

      "$POSTID": {
        // UID must match logged in user and is fixed once set
        "uid": {
          ".validate": "(data.exists() && data.val() == newData.val()) || newData.val() == auth.uid"
        },

        // User can only update own stars
        "stars": {
          "$UID": {
              ".validate": "auth.uid == $UID"
          }
        }
      }
    },

    // User posts can be read by anyone but only written by the user that owns it,
    // and with a matching UID
    "user-posts": {
      ".read": true,

      "$UID": {
        "$POSTID": {
          ".write": "auth.uid == $UID",
        	".validate": "data.exists() || newData.child('uid').val() == auth.uid"
        }
      }
    },


    // Comments can be read by anyone but only written by a logged in user
    "post-comments": {
      ".read": true,
      ".write": "auth.uid != null",

      "$POSTID": {
        "$COMMENTID": {
          // UID must match logged in user and is fixed once set
          "uid": {
              ".validate": "(data.exists() && data.val() == newData.val()) || newData.val() == auth.uid"
          }
        }
      }
    }
  }
}
```

Let's start:

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 14 dependencies:

1. Our `Appcompat` library.
2. Our `Recyclerview` library.
3. Our `Material` library.
4. Our `Navigation-fragment-ktx` library.
5. Our `Navigation-ui-ktx` library.
6. Our `Firebase-bom` library.
7. Our `Com.google.firebase` library.
8. Our `Com.google.firebase` library.
9. Our `Com.google.firebase` library.
10. Our `Com.google.firebase` library.
11. Our `Firebase-ui-database` library.
12. Our `Core-runtime` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

check.dependsOn 'assembleDebugAndroidTest'

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.firebase.quickstart.database"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }

    buildTypes {
        release {
            minifyEnabled true
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

    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'androidx.recyclerview:recyclerview:1.2.1'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.5.2'
    implementation 'androidx.navigation:navigation-ui-ktx:2.5.2'

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firebase Realtime Database (Java)
    implementation 'com.google.firebase:firebase-database'

    // Firebase Realtime Database (Kotlin)
    implementation 'com.google.firebase:firebase-database-ktx'

    // Firebase Authentication (Java)
    implementation 'com.google.firebase:firebase-auth'

    // Firebase Authentication (Kotlin)
    implementation 'com.google.firebase:firebase-auth-ktx'

    implementation 'com.firebaseui:firebase-ui-database:8.0.2'

    // Needed to fix a dependency conflict with FirebaseUI'
    implementation 'androidx.arch.core:core-runtime:2.1.0'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so or follow these steps:

- Add Firebase to your Android Project.
- Log in to the Firebase Console.
- Go to Auth tab and enable Email/Password authentication.
- Download and Run the sample on Android device or emulator.

#### Step 3. Our Android Manifest

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.quickstart.database">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".java.MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar" />

        <activity
            android:name=".kotlin.MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar" />
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
    app:startDestination="@id/SignInFragment">

    <fragment
        android:id="@+id/SignInFragment"
        android:name="com.google.firebase.quickstart.database.kotlin.SignInFragment"
        android:label="@string/title_sign_in"
        tools:layout="@layout/fragment_sign_in">

        <action
            android:id="@+id/action_SignInFragment_to_MainFragment"
            app:popUpTo="@id/MainFragment"
            app:destination="@id/MainFragment" />
    </fragment>
    <fragment
        android:id="@+id/MainFragment"
        android:name="com.google.firebase.quickstart.database.kotlin.MainFragment"
        android:label="@string/app_name"
        tools:layout="@layout/fragment_main">
        <action
            android:id="@+id/action_MainFragment_to_NewPostFragment"
            app:destination="@id/NewPostFragment" />
        <action
            android:id="@+id/action_MainFragment_to_SignInFragment"
            app:popUpTo="@id/SignInFragment"
            app:destination="@id/SignInFragment" />
        <action
            android:id="@+id/action_MainFragment_to_PostDetailFragment"
            app:destination="@id/PostDetailFragment" >
            <argument android:name="post_key" app:nullable="false" app:argType="string" android:defaultValue=""/>
        </action>
    </fragment>

    <fragment
        android:id="@+id/PostDetailFragment"
        android:name="com.google.firebase.quickstart.database.kotlin.PostDetailFragment"
        android:label="@string/app_name"
        tools:layout="@layout/fragment_post_detail">
    </fragment>

    <fragment
        android:id="@+id/NewPostFragment"
        android:name="com.google.firebase.quickstart.database.kotlin.NewPostFragment"
        android:label="@string/app_name"
        tools:layout="@layout/fragment_new_post">
        <action
            android:id="@+id/action_NewPostFragment_to_MainFragment"
            app:destination="@id/MainFragment"
            app:popUpTo="@id/MainFragment">
        </action>
    </fragment>
</navigation>
```

#### Step 5. Create Menus

Create a directory known as `menu` inside your `res` directory and add the following menu files:

**(a). `menu_main.xml`**


Inside your `/res/menu/` directory create a menu resource file named `menu_main.xml` and add menu items as shown below:

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <item
        android:id="@+id/action_logout"
        android:title="@string/menu_logout"
        android:visible="true"
        app:showAsAction="never" />
</menu>

```
#### Step 6. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `item_post.xml`**

> Our `item_post` layout.

Inside your `/res/layout/` directory create an xml layout file named `item_post.xml` and add the following:

1. [`com.google.android.material.card.MaterialCardView`](https://android.camposha.info/en/materialcardview)
2. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="5dp"
    tools:viewBindingIgnore="true">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="10dp">

        <include
            android:id="@+id/postAuthorLayout"
            layout="@layout/include_post_author"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <ImageView
            android:id="@+id/star"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="?attr/selectableItemBackground"
            android:src="@drawable/ic_toggle_star_outline_24"
            app:layout_constraintBottom_toBottomOf="@+id/postAuthorLayout"
            app:layout_constraintEnd_toStartOf="@+id/postNumStars"
            app:layout_constraintTop_toTopOf="@+id/postAuthorLayout" />

        <TextView
            android:id="@+id/postNumStars"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintBottom_toBottomOf="@+id/star"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="@+id/star"
            tools:text="7" />

        <include
            layout="@layout/include_post_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_marginLeft="8dp"
            android:layout_marginTop="16dp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/postAuthorLayout" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</com.google.android.material.card.MaterialCardView>

```

**(b). `item_comment.xml`**


> Our `item_comment` layout.

Inside your `/res/layout/` directory create an xml layout file named `item_comment.xml` and add these 3 UI widgets and ViewGroups:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingTop="8dp"
    android:paddingBottom="8dp"
    tools:viewBindingIgnore="true">

    <ImageView
        android:id="@+id/commentPhoto"
        android:layout_width="32dp"
        android:layout_height="32dp"
        android:layout_centerVertical="true"
        android:src="@drawable/ic_action_account_circle_40"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/commentAuthor"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:textStyle="bold"
        app:layout_constraintStart_toEndOf="@+id/commentPhoto"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="John Doe" />

    <TextView
        android:id="@+id/commentBody"
        style="@style/TextAppearance.AppCompat.Small"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="@+id/commentAuthor"
        app:layout_constraintTop_toBottomOf="@+id/commentAuthor"
        tools:text="This is the comment text.." />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(c). `include_post_text.xml`**


> Our `include_post_text` layout.

Design your XML layout using the following 2 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/postTitle"
        style="@style/TextAppearance.AppCompat.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:maxLines="1"
        android:textStyle="bold"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="My First Post" />

    <TextView
        android:id="@+id/postBody"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/postTitle"
        tools:text="@string/lorem" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(d). `include_post_author.xml`**


> Our `include_post_author` layout.

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/postAuthorPhoto"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/ic_action_account_circle_40"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/postAuthor"
        style="@style/Base.TextAppearance.AppCompat.Small"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:gravity="center_vertical"
        app:layout_constraintBottom_toBottomOf="@+id/postAuthorPhoto"
        app:layout_constraintStart_toEndOf="@+id/postAuthorPhoto"
        app:layout_constraintTop_toTopOf="@+id/postAuthorPhoto"
        tools:text="someauthor@email.com" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(e). `fragment_sign_in.xml`**


> Our `fragment_sign_in` layout.

We design our Sign-in screen:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ProgressBar`](https://android.camposha.info/en/progressbar)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`EditText`](https://android.camposha.info/en/edittext)
5. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin">

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:indeterminate="true"
        android:visibility="invisible"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar" />

    <EditText
        android:id="@+id/fieldEmail"
        android:layout_width="150dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:ellipsize="end"
        android:hint="@string/hint_email"
        android:inputType="textEmailAddress"
        android:maxLines="1"
        app:layout_constraintHorizontal_chainStyle="packed"
        app:layout_constraintEnd_toStartOf="@+id/fieldPassword"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/icon" />

    <EditText
        android:id="@+id/fieldPassword"
        android:layout_width="150dp"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:hint="@string/hint_password"
        android:inputType="textPassword"
        android:maxLines="1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/fieldEmail"
        app:layout_constraintTop_toTopOf="@+id/fieldEmail" />

    <Button
        android:id="@+id/buttonSignIn"
        android:layout_width="150dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="@string/sign_in"
        app:layout_constraintHorizontal_chainStyle="packed"
        app:layout_constraintEnd_toStartOf="@+id/buttonSignUp"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/fieldEmail" />

    <Button
        android:id="@+id/buttonSignUp"
        android:layout_width="150dp"
        android:layout_height="wrap_content"
        android:text="@string/sign_up"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/buttonSignIn"
        app:layout_constraintTop_toTopOf="@+id/buttonSignIn" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(f). `fragment_post_detail.xml`**


> Our `fragment_post_detail` layout.

This will be our Blog Post Detail content screen. Create an xml layout file named `fragment_post_detail.xml` and add the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
3. [`EditText`](https://android.camposha.info/en/edittext)
4. [`com.google.android.material.button.MaterialButton`](https://android.camposha.info/en/materialbutton)
5. [`androidx.recyclerview.widget.RecyclerView`](https://android.camposha.info/en/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin">

    <include
        android:id="@+id/postAuthorLayout"
        layout="@layout/include_post_author"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <include
        android:id="@+id/postTextLayout"
        layout="@layout/include_post_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/postAuthorLayout" />

    <EditText
        android:id="@+id/fieldCommentText"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:hint="Write a comment..."
        android:maxLines="1"
        app:layout_constraintEnd_toStartOf="@+id/buttonPostComment"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_weight="8"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/postTextLayout" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/buttonPostComment"
        style="@style/Widget.MaterialComponents.Button.TextButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Post"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_weight="2"
        app:layout_constraintStart_toEndOf="@+id/fieldCommentText"
        app:layout_constraintTop_toTopOf="@+id/fieldCommentText" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerPostComments"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/buttonPostComment"
        tools:listitem="@layout/item_comment" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(g). `fragment_new_post.xml`**


> Our `fragment_new_post` layout.

Create an xml layout file named `fragment_new_post.xml` and add the following 3 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. [`EditText`](https://android.camposha.info/en/edittext)
3. [`com.google.android.material.floatingactionbutton.FloatingActionButton`](https://android.camposha.info/en/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <EditText
        android:id="@+id/fieldTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:hint="Title"
        android:maxLines="1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        />

    <EditText
        android:id="@+id/fieldBody"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:hint="Write your post..."
        android:inputType="textMultiLine"
        android:maxLines="10"
        android:scrollHorizontally="false"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/fieldTitle"
        />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fabSubmitPost"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:src="@drawable/ic_navigation_check_24"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(h). `fragment_main.xml`**


> Our `fragment_main` layout.

Create an xml layout file named `fragment_main.xml` and add the following:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. [`com.google.android.material.tabs.TabLayout`](https://android.camposha.info/en/tablayout)
3. [`androidx.viewpager2.widget.ViewPager2`](https://android.camposha.info/en/viewpager2)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        />

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tabs" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(i). `fragment_all_posts.xml`**


> Our `fragment_all_posts` layout.

Create an xml layout file named `fragment_all_posts.xml` and add these:

1. [`FrameLayout`](https://android.camposha.info/en/frameayout)
2. [`androidx.recyclerview.widget.RecyclerView`](https://android.camposha.info/en/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:viewBindingIgnore="true">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/messagesList"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:clipToPadding="false"
        android:padding="5dp"
        android:scrollbars="vertical"
        tools:listitem="@layout/item_post" />

</FrameLayout>

```

**(j). `activity_main.xml`**


> Our `activity_main` layout.

Design your  main activity layout using the following 6 UI widgets and ViewGroups:

1. [`androidx.coordinatorlayout.widget.CoordinatorLayout`](https://android.camposha.info/en/coordinatorlayout)
2. [`com.google.android.material.appbar.AppBarLayout`](https://android.camposha.info/en/appbarlayout)
3. [`androidx.appcompat.widget.Toolbar`](https://android.camposha.info/en/toolbar)
4. [`com.google.android.material.floatingactionbutton.FloatingActionButton`](https://android.camposha.info/en/floatingactionbutton)
5. [`FrameLayout`](https://android.camposha.info/en/framelayout)
6. [`fragment`](https://android.camposha.info/en/fragment)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        app:srcCompat="@drawable/ic_image_edit" />

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <fragment
            android:id="@+id/nav_host_fragment"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:defaultNavHost="true"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"/>
    </FrameLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
#### Step 7. Write Code

Finally we need to write our code as follows:


**(a). `Comment.kt`**

> Our `Comment` class.

Create a Kotlin file named `Comment.kt`.

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.IgnoreExtraProperties

@IgnoreExtraProperties
data class Comment(
    var uid: String? = "",
    var author: String? = "",
    var text: String? = ""
)


```

**(b). `Post.kt`**

> Our `Post` class.

Create a Kotlin file named `Post.kt`.

We will be creating the following methods:

1. `toMap(): Map<String, Any?> `.

**(a). Our `toMap()` function**

Write the `toMap()` function as follows:

```kotlin
    fun toMap(): Map<String, Any?> {
        return mapOf(
                "uid" to uid,
                "author" to author,
                "title" to title,
                "body" to body,
                "starCount" to starCount,
                "stars" to stars
        )
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.Exclude
import com.google.firebase.database.IgnoreExtraProperties
import java.util.HashMap

@IgnoreExtraProperties
data class Post(
    var uid: String? = "",
    var author: String? = "",
    var title: String? = "",
    var body: String? = "",
    var starCount: Int = 0,
    var stars: MutableMap<String, Boolean> = HashMap()
) {

    @Exclude
    fun toMap(): Map<String, Any?> {
        return mapOf(
                "uid" to uid,
                "author" to author,
                "title" to title,
                "body" to body,
                "starCount" to starCount,
                "stars" to stars
        )
    }
}


```

**(c). `User.kt`**

> Our `User` class.

Create a Kotlin file named `User.kt`.


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.IgnoreExtraProperties

@IgnoreExtraProperties
data class User(
    var username: String? = "",
    var email: String? = ""
)


```

**(d). `PostViewHolder.kt`**

> Our `PostViewHolder` class.

Create a Kotlin file named `PostViewHolder.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `RecyclerView` from the `androidx.recyclerview.widget` package.
2. `View` from the `android.view` package.
3. `ImageView` from the `android.widget` package.
4. `TextView` from the `android.widget` package.

Next create a class that derives from `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

We will be creating the following methods:

1. `bindToPost(post: Post, starClickListener: View.OnClickListener) `.
2. `setLikedState(parameter)` - Our function will take a `Boolean` object as a parameter.

**(a). Our `setLikedState()` function**

Write the `setLikedState()` function as follows:

```kotlin
    fun setLikedState(liked: Boolean) {
        if (liked) {
            star.setImageResource(R.drawable.ic_toggle_star_24)
        } else {
            star.setImageResource(R.drawable.ic_toggle_star_outline_24)
        }
    }
```

**(b). Our `bindToPost()` function**

Write the `bindToPost()` function as follows:

```kotlin
    fun bindToPost(post: Post, starClickListener: View.OnClickListener) {
        postTitle.text = post.title
        postAuthor.text = post.author
        postNumStars.text = post.starCount.toString()
        postBody.text = post.body

        star.setOnClickListener(starClickListener)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.recyclerview.widget.RecyclerView
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.kotlin.models.Post

class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    private val postTitle: TextView = itemView.findViewById(R.id.postTitle)
    private val postAuthor: TextView = itemView.findViewById(R.id.postAuthor)
    private val postNumStars: TextView = itemView.findViewById(R.id.postNumStars)
    private val postBody: TextView = itemView.findViewById(R.id.postBody)
    private val star: ImageView = itemView.findViewById(R.id.star)

    fun bindToPost(post: Post, starClickListener: View.OnClickListener) {
        postTitle.text = post.title
        postAuthor.text = post.author
        postNumStars.text = post.starCount.toString()
        postBody.text = post.body

        star.setOnClickListener(starClickListener)
    }

    fun setLikedState(liked: Boolean) {
        if (liked) {
            star.setImageResource(R.drawable.ic_toggle_star_24)
        } else {
            star.setImageResource(R.drawable.ic_toggle_star_outline_24)
        }
    }
}


```

**(e). `CommentViewHolder.kt`**

> Our `CommentViewHolder` class.

Create a Kotlin file named `CommentViewHolder.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `View` from the `android.view` package.
2. `TextView` from the `android.widget` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

We will be creating the following methods:

1. `bind(parameter)` - Pass to this method a `Comment` object as a parameter.

**(a). Our `bind()` function**

Write the `bind()` function as follows:

```kotlin
    fun bind(comment: Comment) {
        itemView.findViewById<TextView>(R.id.commentAuthor).text = comment.author
        itemView.findViewById<TextView>(R.id.commentBody).text = comment.text
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.kotlin.models.Comment

class CommentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bind(comment: Comment) {
        itemView.findViewById<TextView>(R.id.commentAuthor).text = comment.author
        itemView.findViewById<TextView>(R.id.commentBody).text = comment.text
    }
}

```

**(f). `RecentPostsFragment.kt`**

> Our `RecentPostsFragment` class.

Create a Kotlin file named `RecentPostsFragment.kt`.


Next create a class that derives from `PostListFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `getQuery(databaseReference: DatabaseReference): Query `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.Query

class RecentPostsFragment : PostListFragment() {

    override fun getQuery(databaseReference: DatabaseReference): Query {
        // [START recent_posts_query]
        // Last 100 posts, these are automatically the 100 most recent
        // due to sorting by push() keys.
        return databaseReference.child("posts")
                .limitToFirst(100)
        // [END recent_posts_query]
    }
}


```

**(g). `PostListFragment.kt`**

> Our `PostListFragment` class.

Create a Kotlin file named `PostListFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `Log` from the `android.util` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.
6. `bundleOf` from the `androidx.core.os` package.
7. `Fragment` from the `androidx.fragment.app` package.
8. `findNavController` from the `androidx.navigation` package.
9. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
10. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onActivityCreated(savedInstanceState: Bundle?) `.
2. `onCreateViewHolder(viewGroup: ViewGroup, i: Int): PostViewHolder `.
3. `onBindViewHolder(viewHolder: PostViewHolder, position: Int, model: Post) `.
4. `doTransaction(mutableData: MutableData): Transaction.Result `.
5. `onStart() `.
6. `onStop() `.

We will be creating the following methods:

1. `onStarClicked(parameter)` - Our function will take a `DatabaseReference` object as a parameter.

**(a). Our `onStarClicked()` function**

Write the `onStarClicked()` function as follows:

```kotlin
    private fun onStarClicked(postRef: DatabaseReference) {
        postRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(mutableData: MutableData): Transaction.Result {
                val p = mutableData.getValue(Post::class.java)
                        ?: return Transaction.success(mutableData)

                if (p.stars.containsKey(uid)) {
                    // Unstar the post and remove self from stars
                    p.starCount = p.starCount - 1
                    p.stars.remove(uid)
                } else {
                    // Star the post and add self to stars
                    p.starCount = p.starCount + 1
                    p.stars[uid] = true
                }

                // Set value and report transaction success
                mutableData.value = p
                return Transaction.success(mutableData)
            }

            override fun onComplete(
                databaseError: DatabaseError?,
                committed: Boolean,
                currentData: DataSnapshot?
            ) {
                // Transaction completed
                Log.d(TAG, "postTransaction:onComplete:" + databaseError!!)
            }
        })
    }
```

**(b). Our `getQuery()` function**

Write the `getQuery()` function as follows:

```kotlin
    abstract fun getQuery(databaseReference: DatabaseReference): Query

    companion object {

        private const val TAG = "PostListFragment"
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.firebase.ui.database.FirebaseRecyclerAdapter
import com.firebase.ui.database.FirebaseRecyclerOptions
import com.google.firebase.auth.ktx.auth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.MutableData
import com.google.firebase.database.Query
import com.google.firebase.database.Transaction
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.kotlin.PostDetailFragment
import com.google.firebase.quickstart.database.kotlin.models.Post
import com.google.firebase.quickstart.database.kotlin.viewholder.PostViewHolder

abstract class PostListFragment : Fragment() {

    // [START define_database_reference]
    private lateinit var database: DatabaseReference
    // [END define_database_reference]

    private lateinit var recycler: RecyclerView
    private lateinit var manager: LinearLayoutManager
    private var adapter: FirebaseRecyclerAdapter<Post, PostViewHolder>? = null

    val uid: String
        get() = Firebase.auth.currentUser!!.uid

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        val rootView = inflater.inflate(R.layout.fragment_all_posts, container, false)

        // [START create_database_reference]
        database = Firebase.database.reference
        // [END create_database_reference]

        recycler = rootView.findViewById(R.id.messagesList)
        recycler.setHasFixedSize(true)

        return rootView
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        // Set up Layout Manager, reverse layout
        manager = LinearLayoutManager(activity)
        manager.reverseLayout = true
        manager.stackFromEnd = true
        recycler.layoutManager = manager

        // Set up FirebaseRecyclerAdapter with the Query
        val postsQuery = getQuery(database)

        val options = FirebaseRecyclerOptions.Builder<Post>()
                .setQuery(postsQuery, Post::class.java)
                .build()

        adapter = object : FirebaseRecyclerAdapter<Post, PostViewHolder>(options) {

            override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): PostViewHolder {
                val inflater = LayoutInflater.from(viewGroup.context)
                return PostViewHolder(inflater.inflate(R.layout.item_post, viewGroup, false))
            }

            override fun onBindViewHolder(viewHolder: PostViewHolder, position: Int, model: Post) {
                val postRef = getRef(position)

                // Set click listener for the whole post view
                val postKey = postRef.key
                viewHolder.itemView.setOnClickListener {
                    // Launch PostDetailFragment
                    val navController = requireActivity().findNavController(R.id.nav_host_fragment)
                    val args = bundleOf(PostDetailFragment.EXTRA_POST_KEY to postKey)
                    navController.navigate(R.id.action_MainFragment_to_PostDetailFragment, args)
                }

                // Determine if the current user has liked this post and set UI accordingly
                viewHolder.setLikedState(model.stars.containsKey(uid))

                // Bind Post to ViewHolder, setting OnClickListener for the star button
                viewHolder.bindToPost(model) {
                    // Need to write to both places the post is stored
                    val globalPostRef = database.child("posts").child(postRef.key!!)
                    val userPostRef = database.child("user-posts").child(model.uid!!).child(postRef.key!!)

                    // Run two transactions
                    onStarClicked(globalPostRef)
                    onStarClicked(userPostRef)
                }
            }
        }
        recycler.adapter = adapter
    }

    // [START post_stars_transaction]
    private fun onStarClicked(postRef: DatabaseReference) {
        postRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(mutableData: MutableData): Transaction.Result {
                val p = mutableData.getValue(Post::class.java)
                        ?: return Transaction.success(mutableData)

                if (p.stars.containsKey(uid)) {
                    // Unstar the post and remove self from stars
                    p.starCount = p.starCount - 1
                    p.stars.remove(uid)
                } else {
                    // Star the post and add self to stars
                    p.starCount = p.starCount + 1
                    p.stars[uid] = true
                }

                // Set value and report transaction success
                mutableData.value = p
                return Transaction.success(mutableData)
            }

            override fun onComplete(
                databaseError: DatabaseError?,
                committed: Boolean,
                currentData: DataSnapshot?
            ) {
                // Transaction completed
                Log.d(TAG, "postTransaction:onComplete:" + databaseError!!)
            }
        })
    }
    // [END post_stars_transaction]

    override fun onStart() {
        super.onStart()
        adapter?.startListening()
    }

    override fun onStop() {
        super.onStop()
        adapter?.stopListening()
    }

    abstract fun getQuery(databaseReference: DatabaseReference): Query

    companion object {

        private const val TAG = "PostListFragment"
    }
}


```

**(h). `MyTopPostsFragment.kt`**

> Our `MyTopPostsFragment` class.

Create a Kotlin file named `MyTopPostsFragment.kt`.


Next create a class that derives from `PostListFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `getQuery(databaseReference: DatabaseReference): Query `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.Query

class MyTopPostsFragment : PostListFragment() {

    override fun getQuery(databaseReference: DatabaseReference): Query {
        // My top posts by number of stars
        val myUserId = uid

        return databaseReference.child("user-posts").child(myUserId)
                .orderByChild("starCount")
    }
}


```

**(i). `MyPostsFragment.kt`**

> Our `MyPostsFragment` class.

Create a Kotlin file named `MyPostsFragment.kt`.


Next create a class that derives from `PostListFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `getQuery(databaseReference: DatabaseReference): Query `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.Query

class MyPostsFragment : PostListFragment() {

    override fun getQuery(databaseReference: DatabaseReference): Query {
        // All my posts
        return databaseReference.child("user-posts")
                .child(uid)
    }
}


```

**(j). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.

Next create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Realtime Database quickstart written in Java.",
                        Intent(this, com.google.firebase.quickstart.database.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Realtime Database quickstart written in Kotlin.",
                        Intent(this, com.google.firebase.quickstart.database.kotlin.MainActivity::class.java))
        )
    }
}


```

**(k). `SignInFragment.kt`**

> Our `SignInFragment` class.

Create a Kotlin file named `SignInFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `TextUtils` from the `android.text` package.
3. `Log` from the `android.util` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `Toast` from the `android.widget` package.
8. `findNavController` from the `androidx.navigation.fragment` package.

Next create a class that derives from `BaseFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onStart() `.
4. `onDestroy() `.

We will be creating the following methods:

1. `signIn() `.
2. `signUp() `.
3. `onAuthSuccess(parameter)` - Our function will take a `FirebaseUser` object as a parameter.
4. `usernameFromEmail(parameter)` - Pass to this method a `String` object as a parameter.
5. `validateForm(): Boolean `.
6. `writeNewUser(userId: String, name: String, email: String?) `.

**(a). Our `usernameFromEmail()` function**

Write the `usernameFromEmail()` function as follows:

```kotlin
    private fun usernameFromEmail(email: String): String {
        return if (email.contains("@")) {
            email.split("@".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()[0]
        } else {
            email
        }
    }
```

**(b). Our `validateForm()` function**

Write the `validateForm()` function as follows:

```kotlin
    private fun validateForm(): Boolean {
        var result = true
        if (TextUtils.isEmpty(binding.fieldEmail.text.toString())) {
            binding.fieldEmail.error = "Required"
            result = false
        } else {
            binding.fieldEmail.error = null
        }

        if (TextUtils.isEmpty(binding.fieldPassword.text.toString())) {
            binding.fieldPassword.error = "Required"
            result = false
        } else {
            binding.fieldPassword.error = null
        }

        return result
    }
```

**(c). Our `writeNewUser()` function**

Write the `writeNewUser()` function as follows:

```kotlin
    private fun writeNewUser(userId: String, name: String, email: String?) {
        val user = User(name, email)
        database.child("users").child(userId).setValue(user)
    }
```

**(d). Our `signIn()` function**

Write the `signIn()` function as follows:

```kotlin
    private fun signIn() {
        Log.d(TAG, "signIn")
        if (!validateForm()) {
            return
        }

        showProgressBar()
        val email = binding.fieldEmail.text.toString()
        val password = binding.fieldPassword.text.toString()

        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    Log.d(TAG, "signIn:onComplete:" + task.isSuccessful)
                    hideProgressBar()

                    if (task.isSuccessful) {
                        onAuthSuccess(task.result?.user!!)
                    } else {
                        Toast.makeText(context, "Sign In Failed",
                                Toast.LENGTH_SHORT).show()
                    }
                }
    }
```

**(e). Our `onAuthSuccess()` function**

Write the `onAuthSuccess()` function as follows:

```kotlin
    private fun onAuthSuccess(user: FirebaseUser) {
        val username = usernameFromEmail(user.email!!)

        // Write new user
        writeNewUser(user.uid, username, user.email)

        // Go to MainFragment
        findNavController().navigate(R.id.action_SignInFragment_to_MainFragment)
    }
```

**(f). Our `signUp()` function**

Write the `signUp()` function as follows:

```kotlin
    private fun signUp() {
        Log.d(TAG, "signUp")
        if (!validateForm()) {
            return
        }

        showProgressBar()
        val email = binding.fieldEmail.text.toString()
        val password = binding.fieldPassword.text.toString()

        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    Log.d(TAG, "createUser:onComplete:" + task.isSuccessful)
                    hideProgressBar()

                    if (task.isSuccessful) {
                        onAuthSuccess(task.result?.user!!)
                    } else {
                        Toast.makeText(context, "Sign Up Failed",
                                Toast.LENGTH_SHORT).show()
                    }
                }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.ktx.auth
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.databinding.FragmentSignInBinding
import com.google.firebase.quickstart.database.kotlin.models.User

class SignInFragment : BaseFragment() {
    private var _binding: FragmentSignInBinding? = null
    private val binding get() = _binding!!

    private lateinit var database: DatabaseReference
    private lateinit var auth: FirebaseAuth

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _binding = FragmentSignInBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        database = Firebase.database.reference
        auth = Firebase.auth

        setProgressBar(R.id.progressBar)

        // Click listeners
        with(binding) {
            buttonSignIn.setOnClickListener { signIn() }
            buttonSignUp.setOnClickListener { signUp() }
        }
    }

    override fun onStart() {
        super.onStart()

        // Check auth on Fragment start
        auth.currentUser?.let {
            onAuthSuccess(it)
        }
    }

    private fun signIn() {
        Log.d(TAG, "signIn")
        if (!validateForm()) {
            return
        }

        showProgressBar()
        val email = binding.fieldEmail.text.toString()
        val password = binding.fieldPassword.text.toString()

        auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    Log.d(TAG, "signIn:onComplete:" + task.isSuccessful)
                    hideProgressBar()

                    if (task.isSuccessful) {
                        onAuthSuccess(task.result?.user!!)
                    } else {
                        Toast.makeText(context, "Sign In Failed",
                                Toast.LENGTH_SHORT).show()
                    }
                }
    }

    private fun signUp() {
        Log.d(TAG, "signUp")
        if (!validateForm()) {
            return
        }

        showProgressBar()
        val email = binding.fieldEmail.text.toString()
        val password = binding.fieldPassword.text.toString()

        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(requireActivity()) { task ->
                    Log.d(TAG, "createUser:onComplete:" + task.isSuccessful)
                    hideProgressBar()

                    if (task.isSuccessful) {
                        onAuthSuccess(task.result?.user!!)
                    } else {
                        Toast.makeText(context, "Sign Up Failed",
                                Toast.LENGTH_SHORT).show()
                    }
                }
    }

    private fun onAuthSuccess(user: FirebaseUser) {
        val username = usernameFromEmail(user.email!!)

        // Write new user
        writeNewUser(user.uid, username, user.email)

        // Go to MainFragment
        findNavController().navigate(R.id.action_SignInFragment_to_MainFragment)
    }

    private fun usernameFromEmail(email: String): String {
        return if (email.contains("@")) {
            email.split("@".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()[0]
        } else {
            email
        }
    }

    private fun validateForm(): Boolean {
        var result = true
        if (TextUtils.isEmpty(binding.fieldEmail.text.toString())) {
            binding.fieldEmail.error = "Required"
            result = false
        } else {
            binding.fieldEmail.error = null
        }

        if (TextUtils.isEmpty(binding.fieldPassword.text.toString())) {
            binding.fieldPassword.error = "Required"
            result = false
        } else {
            binding.fieldPassword.error = null
        }

        return result
    }

    private fun writeNewUser(userId: String, name: String, email: String?) {
        val user = User(name, email)
        database.child("users").child(userId).setValue(user)
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

    companion object {
        private const val TAG = "SignInFragment"
    }
}

```

**(m). `PostDetailFragment.kt`**

> Our `PostDetailFragment` class.

Create a Kotlin file named `PostDetailFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Bundle` from the `android.os` package.
3. `Log` from the `android.util` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `Toast` from the `android.widget` package.
8. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
9. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `BaseFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onStart() `.
4. `onDataChange(dataSnapshot: DataSnapshot) `.
5. `onCancelled(databaseError: DatabaseError) `.
6. `onStop() `.
7. `onChildAdded(dataSnapshot: DataSnapshot, previousChildName: String?) `.
8. `onChildChanged(dataSnapshot: DataSnapshot, previousChildName: String?) `.
9. `onChildRemoved(dataSnapshot: DataSnapshot) `.
10. `onChildMoved(dataSnapshot: DataSnapshot, previousChildName: String?) `.
11. `onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder `.
12. `onBindViewHolder(holder: CommentViewHolder, position: Int) `.
13. `onDestroy() `.

We will be creating the following methods:

1. `postComment() `.
2. `cleanupListener() `.

**(a). Our `postComment()` function**

Write the `postComment()` function as follows:

```kotlin
    private fun postComment() {
        val uid = uid
        Firebase.database.reference.child("users").child(uid)
                .addListenerForSingleValueEvent(object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        // Get user information
                        val user = dataSnapshot.getValue<User>() ?: return

                        val authorName = user.username

                        // Create new comment object
                        val commentText = binding.fieldCommentText.text.toString()
                        val comment = Comment(uid, authorName, commentText)

                        // Push the comment, it will appear in the list
                        commentsReference.push().setValue(comment)

                        // Clear the field
                        binding.fieldCommentText.text = null
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                    }
                })
    }
```

**(b). Our `cleanupListener()` function**

Write the `cleanupListener()` function as follows:

```kotlin
        fun cleanupListener() {
            childEventListener?.let {
                databaseReference.removeEventListener(it)
            }
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
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.ChildEventListener
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.database.ktx.getValue
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.databinding.FragmentPostDetailBinding
import com.google.firebase.quickstart.database.kotlin.models.Comment
import com.google.firebase.quickstart.database.kotlin.models.Post
import com.google.firebase.quickstart.database.kotlin.models.User
import com.google.firebase.quickstart.database.kotlin.viewholder.CommentViewHolder
import java.lang.IllegalArgumentException
import java.util.ArrayList

class PostDetailFragment : BaseFragment() {

    private lateinit var postKey: String
    private lateinit var postReference: DatabaseReference
    private lateinit var commentsReference: DatabaseReference

    private var postListener: ValueEventListener? = null
    private var adapter: CommentAdapter? = null

    private var _binding: FragmentPostDetailBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentPostDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Get post key from arguments
        postKey = requireArguments().getString(EXTRA_POST_KEY)
                ?: throw IllegalArgumentException("Must pass EXTRA_POST_KEY")

        // Initialize Database
        postReference = Firebase.database.reference
                .child("posts").child(postKey)
        commentsReference = Firebase.database.reference
                .child("post-comments").child(postKey)

        // Initialize Views
        with(binding) {
            buttonPostComment.setOnClickListener { postComment() }
            recyclerPostComments.layoutManager = LinearLayoutManager(context)
        }
    }

    override fun onStart() {
        super.onStart()

        // Add value event listener to the post
        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                // Get Post object and use the values to update the UI
                val post = dataSnapshot.getValue<Post>()
                post?.let {
                    binding.postAuthorLayout.postAuthor.text = it.author
                    with(binding.postTextLayout) {
                        postTitle.text = it.title
                        postBody.text = it.body
                    }
                }
            }

            override fun onCancelled(databaseError: DatabaseError) {
                // Getting Post failed, log a message
                Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
                Toast.makeText(context, "Failed to load post.",
                        Toast.LENGTH_SHORT).show()
            }
        }
        postReference.addValueEventListener(postListener)

        // Keep copy of post listener so we can remove it when app stops
        this.postListener = postListener

        // Listen for comments
        adapter = CommentAdapter(requireContext(), commentsReference)
        binding.recyclerPostComments.adapter = adapter
    }

    override fun onStop() {
        super.onStop()

        // Remove post value event listener
        postListener?.let {
            postReference.removeEventListener(it)
        }

        // Clean up comments listener
        adapter?.cleanupListener()
    }

    private fun postComment() {
        val uid = uid
        Firebase.database.reference.child("users").child(uid)
                .addListenerForSingleValueEvent(object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        // Get user information
                        val user = dataSnapshot.getValue<User>() ?: return

                        val authorName = user.username

                        // Create new comment object
                        val commentText = binding.fieldCommentText.text.toString()
                        val comment = Comment(uid, authorName, commentText)

                        // Push the comment, it will appear in the list
                        commentsReference.push().setValue(comment)

                        // Clear the field
                        binding.fieldCommentText.text = null
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                    }
                })
    }

    private class CommentAdapter(
            private val context: Context,
            private val databaseReference: DatabaseReference
    ) : RecyclerView.Adapter<CommentViewHolder>() {

        private val childEventListener: ChildEventListener?

        private val commentIds = ArrayList<String>()
        private val comments = ArrayList<Comment>()

        init {

            // Create child event listener
            val childEventListener = object : ChildEventListener {
                override fun onChildAdded(dataSnapshot: DataSnapshot, previousChildName: String?) {
                    Log.d(TAG, "onChildAdded:" + dataSnapshot.key!!)

                    // A new comment has been added, add it to the displayed list
                    val comment = dataSnapshot.getValue<Comment>()

                    // Update RecyclerView
                    commentIds.add(dataSnapshot.key!!)
                    comments.add(comment!!)
                    notifyItemInserted(comments.size - 1)
                }

                override fun onChildChanged(dataSnapshot: DataSnapshot, previousChildName: String?) {
                    Log.d(TAG, "onChildChanged: ${dataSnapshot.key}")

                    // A comment has changed, use the key to determine if we are displaying this
                    // comment and if so displayed the changed comment.
                    val newComment = dataSnapshot.getValue<Comment>()
                    val commentKey = dataSnapshot.key

                    val commentIndex = commentIds.indexOf(commentKey)
                    if (commentIndex > -1 && newComment != null) {
                        // Replace with the new data
                        comments[commentIndex] = newComment

                        // Update the RecyclerView
                        notifyItemChanged(commentIndex)
                    } else {
                        Log.w(TAG, "onChildChanged:unknown_child: $commentKey")
                    }
                }

                override fun onChildRemoved(dataSnapshot: DataSnapshot) {
                    Log.d(TAG, "onChildRemoved:" + dataSnapshot.key!!)

                    // A comment has changed, use the key to determine if we are displaying this
                    // comment and if so remove it.
                    val commentKey = dataSnapshot.key

                    val commentIndex = commentIds.indexOf(commentKey)
                    if (commentIndex > -1) {
                        // Remove data from the list
                        commentIds.removeAt(commentIndex)
                        comments.removeAt(commentIndex)

                        // Update the RecyclerView
                        notifyItemRemoved(commentIndex)
                    } else {
                        Log.w(TAG, "onChildRemoved:unknown_child:" + commentKey!!)
                    }
                }

                override fun onChildMoved(dataSnapshot: DataSnapshot, previousChildName: String?) {
                    Log.d(TAG, "onChildMoved:" + dataSnapshot.key!!)

                    // A comment has changed position, use the key to determine if we are
                    // displaying this comment and if so move it.
                    val movedComment = dataSnapshot.getValue<Comment>()
                    val commentKey = dataSnapshot.key

                    // ...
                }

                override fun onCancelled(databaseError: DatabaseError) {
                    Log.w(TAG, "postComments:onCancelled", databaseError.toException())
                    Toast.makeText(context, "Failed to load comments.",
                            Toast.LENGTH_SHORT).show()
                }
            }
            databaseReference.addChildEventListener(childEventListener)

            // Store reference to listener so it can be removed on app stop
            this.childEventListener = childEventListener
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
            val inflater = LayoutInflater.from(context)
            val view = inflater.inflate(R.layout.item_comment, parent, false)
            return CommentViewHolder(view)
        }

        override fun onBindViewHolder(holder: CommentViewHolder, position: Int) {
            holder.bind(comments[position])
        }

        override fun getItemCount(): Int = comments.size

        fun cleanupListener() {
            childEventListener?.let {
                databaseReference.removeEventListener(it)
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

    companion object {
        private const val TAG = "PostDetailFragment"
        const val EXTRA_POST_KEY = "post_key"
    }
}

```

**(n). `NewPostFragment.kt`**

> Our `NewPostFragment` class.

Create a Kotlin file named `NewPostFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `TextUtils` from the `android.text` package.
3. `Log` from the `android.util` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `Toast` from the `android.widget` package.
8. `findNavController` from the `androidx.navigation.fragment` package.

Next create a class that derives from `BaseFragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onDataChange(dataSnapshot: DataSnapshot) `.
4. `onCancelled(databaseError: DatabaseError) `.
5. `onDestroy() `.

We will be creating the following methods:

1. `submitPost() `.
2. `setEditingEnabled(parameter)` - We pass a `Boolean` object as a parameter.
3. `writeNewPost(userId: String, username: String, title: String, body: String) `.

**(a). Our `writeNewPost()` function**

Write the `writeNewPost()` function as follows:

```kotlin
    private fun writeNewPost(userId: String, username: String, title: String, body: String) {
        // Create new post at /user-posts/$userid/$postid and at
        // /posts/$postid simultaneously
        val key = database.child("posts").push().key
        if (key == null) {
            Log.w(TAG, "Couldn't get push key for posts")
            return
        }

        val post = Post(userId, username, title, body)
        val postValues = post.toMap()

        val childUpdates = hashMapOf<String, Any>(
                "/posts/$key" to postValues,
                "/user-posts/$userId/$key" to postValues
        )

        database.updateChildren(childUpdates)
    }
```

**(b). Our `submitPost()` function**

Write the `submitPost()` function as follows:

```kotlin
    private fun submitPost() {
        val title = binding.fieldTitle.text.toString()
        val body = binding.fieldBody.text.toString()

        // Title is required
        if (TextUtils.isEmpty(title)) {
            binding.fieldTitle.error = REQUIRED
            return
        }

        // Body is required
        if (TextUtils.isEmpty(body)) {
            binding.fieldBody.error = REQUIRED
            return
        }

        // Disable button so there are no multi-posts
        setEditingEnabled(false)
        Toast.makeText(context, "Posting...", Toast.LENGTH_SHORT).show()

        val userId = uid
        database.child("users").child(userId).addListenerForSingleValueEvent(
                object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        // Get user value
                        val user = dataSnapshot.getValue<User>()

                        if (user == null) {
                            // User is null, error out
                            Log.e(TAG, "User $userId is unexpectedly null")
                            Toast.makeText(context,
                                    "Error: could not fetch user.",
                                    Toast.LENGTH_SHORT).show()
                        } else {
                            // Write new post
                            writeNewPost(userId, user.username.toString(), title, body)
                        }

                        setEditingEnabled(true)
                        findNavController().navigate(R.id.action_NewPostFragment_to_MainFragment)
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException())
                        setEditingEnabled(true)
                    }
                })
    }
```

**(c). Our `setEditingEnabled()` function**

Write the `setEditingEnabled()` function as follows:

```kotlin
    private fun setEditingEnabled(enabled: Boolean) {
        with(binding) {
            fieldTitle.isEnabled = enabled
            fieldBody.isEnabled = enabled
            if (enabled) {
                fabSubmitPost.show()
            } else {
                fabSubmitPost.hide()
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.database.ktx.getValue
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.databinding.FragmentNewPostBinding
import com.google.firebase.quickstart.database.kotlin.models.Post
import com.google.firebase.quickstart.database.kotlin.models.User

class NewPostFragment : BaseFragment() {
    private var _binding: FragmentNewPostBinding? = null
    private val binding get() = _binding!!

    private lateinit var database: DatabaseReference

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _binding = FragmentNewPostBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        database = Firebase.database.reference

        binding.fabSubmitPost.setOnClickListener { submitPost() }
    }

    private fun submitPost() {
        val title = binding.fieldTitle.text.toString()
        val body = binding.fieldBody.text.toString()

        // Title is required
        if (TextUtils.isEmpty(title)) {
            binding.fieldTitle.error = REQUIRED
            return
        }

        // Body is required
        if (TextUtils.isEmpty(body)) {
            binding.fieldBody.error = REQUIRED
            return
        }

        // Disable button so there are no multi-posts
        setEditingEnabled(false)
        Toast.makeText(context, "Posting...", Toast.LENGTH_SHORT).show()

        val userId = uid
        database.child("users").child(userId).addListenerForSingleValueEvent(
                object : ValueEventListener {
                    override fun onDataChange(dataSnapshot: DataSnapshot) {
                        // Get user value
                        val user = dataSnapshot.getValue<User>()

                        if (user == null) {
                            // User is null, error out
                            Log.e(TAG, "User $userId is unexpectedly null")
                            Toast.makeText(context,
                                    "Error: could not fetch user.",
                                    Toast.LENGTH_SHORT).show()
                        } else {
                            // Write new post
                            writeNewPost(userId, user.username.toString(), title, body)
                        }

                        setEditingEnabled(true)
                        findNavController().navigate(R.id.action_NewPostFragment_to_MainFragment)
                    }

                    override fun onCancelled(databaseError: DatabaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException())
                        setEditingEnabled(true)
                    }
                })
    }

    private fun setEditingEnabled(enabled: Boolean) {
        with(binding) {
            fieldTitle.isEnabled = enabled
            fieldBody.isEnabled = enabled
            if (enabled) {
                fabSubmitPost.show()
            } else {
                fabSubmitPost.hide()
            }
        }
    }

    private fun writeNewPost(userId: String, username: String, title: String, body: String) {
        // Create new post at /user-posts/$userid/$postid and at
        // /posts/$postid simultaneously
        val key = database.child("posts").push().key
        if (key == null) {
            Log.w(TAG, "Couldn't get push key for posts")
            return
        }

        val post = Post(userId, username, title, body)
        val postValues = post.toMap()

        val childUpdates = hashMapOf<String, Any>(
                "/posts/$key" to postValues,
                "/user-posts/$userId/$key" to postValues
        )

        database.updateChildren(childUpdates)
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

    companion object {
        private const val TAG = "NewPostFragment"
        private const val REQUIRED = "Required"
    }
}

```

**(o). `MainFragment.kt`**

> Our `MainFragment` class.

Create a Kotlin file named `MainFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `LayoutInflater` from the `android.view` package.
3. `Menu` from the `android.view` package.
4. `MenuInflater` from the `android.view` package.
5. `MenuItem` from the `android.view` package.
6. `View` from the `android.view` package.
7. `ViewGroup` from the `android.view` package.
8. `Fragment` from the `androidx.fragment.app` package.
9. `findNavController` from the `androidx.navigation.fragment` package.
10. `FragmentStateAdapter` from the `androidx.viewpager2.adapter` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.
2. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
3. `onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) `.
4. `onOptionsItemSelected(item: MenuItem): Boolean `.
5. `onDestroy() `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.google.android.material.tabs.TabLayoutMediator
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.databinding.FragmentMainBinding
import com.google.firebase.quickstart.database.kotlin.listfragments.MyPostsFragment
import com.google.firebase.quickstart.database.kotlin.listfragments.MyTopPostsFragment
import com.google.firebase.quickstart.database.kotlin.listfragments.RecentPostsFragment

class MainFragment : Fragment() {
    private var _binding: FragmentMainBinding? = null
    private val binding get() = _binding!!

    private lateinit var pagerAdapter: FragmentStateAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _binding = FragmentMainBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setHasOptionsMenu(true)

        // Create the adapter that will return a fragment for each section
        pagerAdapter = object : FragmentStateAdapter(parentFragmentManager, viewLifecycleOwner.lifecycle) {
            private val fragments = arrayOf<Fragment>(
                    RecentPostsFragment(),
                    MyPostsFragment(),
                    MyTopPostsFragment())

            override fun createFragment(position: Int) = fragments[position]

            override fun getItemCount() = fragments.size
        }

        // Set up the ViewPager with the sections adapter.
        with(binding) {
            container.adapter = pagerAdapter
            TabLayoutMediator(tabs, container) { tab, position ->
                tab.text = when(position) {
                    0 -> getString(R.string.heading_recent)
                    1 -> getString(R.string.heading_my_posts)
                    else -> getString(R.string.heading_my_top_posts)
                }
            }.attach()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.menu_main, menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return if (item.itemId == R.id.action_logout) {
            Firebase.auth.signOut()
            findNavController().navigate(R.id.action_MainFragment_to_SignInFragment)
            true
        } else {
            super.onOptionsItemSelected(item)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }
}

```

**(p). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `isGone` from the `androidx.core.view` package.
4. `isVisible` from the `androidx.core.view` package.
5. `findNavController` from the `androidx.navigation` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isGone
import androidx.core.view.isVisible
import androidx.navigation.findNavController
import com.google.firebase.quickstart.database.R
import com.google.firebase.quickstart.database.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val toolbar = binding.toolbar
        setSupportActionBar(toolbar)

        val fab = binding.fab
        val navController = findNavController(R.id.nav_host_fragment)
        navController.setGraph(R.navigation.nav_graph_kotlin)
        navController.addOnDestinationChangedListener { _, destination, _ ->
            if (destination.id == R.id.MainFragment) {
                fab.isVisible = true
                fab.setOnClickListener {
                    navController.navigate(R.id.action_MainFragment_to_NewPostFragment)
                }
            } else {
                fab.isGone = true
            }
        }
    }
}

```

**(q). `BaseFragment.kt`**

> Our `BaseFragment` class.

Create a Kotlin file named `BaseFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `View` from the `android.view` package.
2. `ProgressBar` from the `android.widget` package.
3. `Fragment` from the `androidx.fragment.app` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be creating the following methods:

1. `setProgressBar(parameter)` - This function will take a `Int` object as a parameter.
2. `showProgressBar() `.
3. `hideProgressBar() `.

**(a). Our `hideProgressBar()` function**

Write the `hideProgressBar()` function as follows:

```kotlin
    fun hideProgressBar() {
        progressBar?.visibility = View.INVISIBLE
    }
```

**(b). Our `setProgressBar()` function**

Write the `setProgressBar()` function as follows:

```kotlin
    fun setProgressBar(resId: Int) {
        progressBar = view?.findViewById(resId)
    }
```

**(c). Our `showProgressBar()` function**

Write the `showProgressBar()` function as follows:

```kotlin
    fun showProgressBar() {
        progressBar?.visibility = View.VISIBLE
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.view.View
import android.widget.ProgressBar
import androidx.fragment.app.Fragment
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

open class BaseFragment : Fragment() {
    private var progressBar: ProgressBar? = null

    val uid: String
        get() = Firebase.auth.currentUser!!.uid

    fun setProgressBar(resId: Int) {
        progressBar = view?.findViewById(resId)
    }

    fun showProgressBar() {
        progressBar?.visibility = View.VISIBLE
    }

    fun hideProgressBar() {
        progressBar?.visibility = View.INVISIBLE
    }
}

```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/database/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
