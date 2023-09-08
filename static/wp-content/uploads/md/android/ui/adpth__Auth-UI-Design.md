# AuthUI Designs

>  In this Project you could find some designs which will help you in creating your own Auth pages in your app and brings your app a Standard look.

![AuthUI Designs Tutorial](https://user-images.githubusercontent.com/61702243/94936921-8b40ba00-04ec-11eb-96ae-4cfbf4071549.png)

![AuthUI Designs Tutorial](https://user-images.githubusercontent.com/61702243/94936984-a14e7a80-04ec-11eb-9127-0ce47e2c03d1.png)

![AuthUI Designs Tutorial](https://user-images.githubusercontent.com/61702243/94937042-af040000-04ec-11eb-865f-aae8ed625906.png)

![AuthUI Designs Tutorial](https://user-images.githubusercontent.com/61702243/94937073-baefc200-04ec-11eb-85e6-7ed559202eb6.png)

![AuthUI Designs Tutorial](https://user-images.githubusercontent.com/61702243/94937097-c216d000-04ec-11eb-8434-a5c30ba02d48.png)


Let us look at the full AuthUI Designs code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 3 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29

    defaultConfig {
        applicationId "com.adpth.authuidesigns"
        minSdkVersion 16
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"
        vectorDrawables.useSupportLibrary = true
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
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    implementation 'androidx.cardview:cardview:1.0.0'
    testImplementation 'junit:junit:4.13'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `layout_item.xml`**

> Our `layout_item` layout.

This layout will represent our Item Layout's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="9dp"
    android:background="@android:color/white">

    <TextView
        android:id="@+id/header"
        android:paddingLeft="?android:attr/expandableListPreferredItemPaddingLeft"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="16sp"
        android:textStyle="normal"
        android:paddingStart="?android:attr/expandableListPreferredItemPaddingLeft"
        tools:ignore="RtlSymmetry" />

</LinearLayout>
```

**(b). `layout_child.xml`**

> Our `layout_child` layout.

This layout will represent our Child Layout's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:padding="7dp"
    android:layout_height="50dp">

    <TextView
        android:id="@+id/child"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="5dp"
        android:paddingLeft="?android:attr/expandableListPreferredChildPaddingLeft"
        android:textSize="16sp"
        android:layout_alignParentStart="true"
        android:layout_alignParentBottom="true"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true"
        android:paddingStart="?android:attr/expandableListPreferredChildPaddingLeft"
        tools:ignore="RtlSymmetry" />

    <ImageView
        android:layout_width="24dp"
        android:layout_height="match_parent"
        app:srcCompat="@drawable/ic_eye"
        android:layout_marginRight="7dp"
        android:contentDescription="@string/eye"
        android:layout_alignParentRight="true"
        android:layout_alignParentTop="true"
        android:layout_alignParentBottom="true"
        android:layout_alignParentEnd="true"
        android:layout_marginEnd="7dp" />

</RelativeLayout>
```

**(c). `activity_signup01.xml`**

> Our `activity_signup01` layout.

This layout will represent our Signup01 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".signup.Signup01Activity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginLeft="24dp"
        android:layout_marginTop="24dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/create_your_account"
        android:textColor="@android:color/black"
        android:textSize="23sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/sign_up_and_get_started"
        android:textColor="@android:color/black"
        app:layout_constraintStart_toStartOf="@+id/textView"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="350dp"
        android:layout_height="230dp"
        android:contentDescription="@string/login"
        android:layout_marginTop="16dp"
        android:src="@drawable/signup01"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2" />

    <EditText
        android:id="@+id/signup_username01"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:background="@drawable/edittext_border01"
        android:hint="@string/username"
        android:paddingLeft="16dp"
        android:inputType="textPersonName"
        android:autofillHints="@string/email"
        android:paddingStart="16dp"
        android:paddingTop="10dp"
        tools:ignore="RtlSymmetry"
        android:paddingBottom="10dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <EditText
        android:id="@+id/signup_email01"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:background="@drawable/edittext_border01"
        android:hint="@string/email"
        android:paddingLeft="16dp"
        android:inputType="textEmailAddress"
        android:autofillHints="@string/email"
        android:paddingStart="16dp"
        android:paddingTop="10dp"
        tools:ignore="RtlSymmetry"
        android:paddingBottom="10dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_username01" />

    <EditText
        android:id="@+id/signup_password01"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:background="@drawable/edittext_border01"
        android:hint="@string/password"
        android:inputType="textPassword"
        android:autofillHints="@string/password"
        android:paddingLeft="16dp"
        android:paddingStart="16dp"
        tools:ignore="RtlSymmetry"
        android:paddingTop="10dp"
        android:paddingBottom="10dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_email01" />

    <TextView
        android:id="@+id/signup01_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:text="@string/forget_password"
        android:textColor="@android:color/black"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_password01" />

    <RelativeLayout
        android:id="@+id/signup01_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="10dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login01_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup01_forget">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup01_btn">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/already_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_in"
            android:textColor="#FC155D" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(d). `activity_signup02.xml`**

> Our `activity_signup02` layout.

This layout will represent our Signup02 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`FrameLayout`](https://android.examples.directory/framelayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)
6. [`View`](https://android.examples.directory/view)
7. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".signup.Signup02Activity">

    <FrameLayout
        android:id="@+id/frameLayout"
        android:layout_width="match_parent"
        android:layout_height="230dp"
        android:background="#4648FF"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:id="@+id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="20dp"
            android:textSize="20sp"
            android:drawablePadding="20sp"
            android:layout_gravity="center|bottom"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/music_stream"
            android:textColor="@android:color/white"
            app:drawableTopCompat="@drawable/login02" />

    </FrameLayout>


    <EditText
        android:id="@+id/signup_username02"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/username"
        android:hint="@string/username"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toTopOf="@+id/signup_email02"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_email02"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:autofillHints="@string/email"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/signup_password02"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:autofillHints="@string/password"
        android:layout_marginRight="16dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_email02" />

    <RelativeLayout
        android:id="@+id/signup02_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_password02">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/signup01_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/forget_password"
        android:textColor="#666666"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup02_btn" />

    <LinearLayout
        android:id="@+id/linearLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup01_forget">

        <View
            android:layout_width="150dp"
            android:layout_height="2dp"
            android:background="#666666" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="10dp"
            android:layout_marginRight="10dp"
            android:text="@string/or"
            android:textColor="#666666" />

        <View
            android:layout_width="150dp"
            android:layout_height="2dp"
            android:background="#666666" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout">

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb1" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_marginLeft="30dp"
            android:layout_marginRight="30dp"
            android:contentDescription="@string/google"
            android:src="@drawable/google1" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter1" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(e). `activity_signup03.xml`**

> Our `activity_signup03` layout.

This layout will represent our Signup03 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`EditText`](https://android.examples.directory/edittext)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`View`](https://android.examples.directory/view)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".signup.Signup03Activity">

    <TextView
        android:id="@+id/textView5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="32dp"
        android:fontFamily="@font/ubuntu_bold"
        android:text="@string/signup_and_nstart_learning"
        android:textColor="@android:color/black"
        android:textSize="25sp"
        app:layout_constraintBottom_toTopOf="@+id/signup_username03"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_username03"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/username"
        android:hint="@string/username"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toTopOf="@+id/signup_email03"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_email03"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/signup_password03"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_password03"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:autofillHints="@string/password"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/sign_up"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintBottom_toBottomOf="@+id/signup03_btn"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/signup03_btn" />

    <ImageView
        android:id="@+id/signup03_btn"
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:contentDescription="@string/login"
        android:src="@drawable/login03_btn"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_password03" />


    <RelativeLayout
        android:id="@+id/relativeLayout2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginBottom="175dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView6">

        <TextView
            android:id="@+id/myTextView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_in"
            android:textColor="@android:color/black"
            android:textSize="20sp" />

        <View
            android:layout_width="60dp"
            android:layout_height="1.5dp"
            android:layout_below="@+id/myTextView"
            android:background="#000" />

    </RelativeLayout>



</androidx.constraintlayout.widget.ConstraintLayout>
```

**(f). `activity_signup04.xml`**

> Our `activity_signup04` layout.

This layout will represent our Signup04 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`EditText`](https://android.examples.directory/edittext)
3. [`RelativeLayout`](https://android.examples.directory/relativelayout)
4. [`LinearLayout`](https://android.examples.directory/linearlayout)
5. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".signup.Signup04Activity">

    <TextView
        android:id="@+id/textView7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:fontFamily="@font/ubuntu_bold"
        android:text="@string/sign_up"
        android:textColor="#5A64F2"
        android:textSize="30sp"
        app:layout_constraintBottom_toTopOf="@+id/textView8"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="32dp"
        android:text="@string/create_your_own_account_to_access_nthousands_of_products"
        android:textColor="#858383"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/textView"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/username"
        android:textColor="#666666"
        android:textSize="18sp"
        app:layout_constraintBottom_toTopOf="@+id/signup_username04"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_username04"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="Enter your name"
        android:hint="@string/enter_your_name"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toTopOf="@+id/textView9"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/email"
        android:textColor="#666666"
        android:textSize="18sp"
        app:layout_constraintBottom_toTopOf="@+id/signup_email04"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_email04"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:hint="@string/enter_your_email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/textView10"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/password"
        android:textColor="#666666"
        android:textSize="18sp"
        app:layout_constraintBottom_toTopOf="@+id/signup_password04"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_password04"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:autofillHints="@string/password"
        android:hint="@string/enter_your_password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />


    <RelativeLayout
        android:id="@+id/signup04_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_password04">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_up"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/textView12"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/connect_with"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup04_btn" />

    <LinearLayout
        android:id="@+id/linearLayout2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:orientation="horizontal"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView12">

        <ImageView
            android:id="@+id/imageView6"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb4" />

        <ImageView
            android:id="@+id/imageView7"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/google"
            android:layout_marginLeft="20dp"
            android:layout_marginRight="20dp"
            android:src="@drawable/google4" />

        <ImageView
            android:id="@+id/imageView8"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter4" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout2">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/already_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_in"
            android:textColor="#4648FF" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(g). `activity_signup05.xml`**

> Our `activity_signup05` layout.

This layout will represent our Signup05 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".signup.Signup05Activity">

    <ImageView
        android:id="@+id/imageView9"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:contentDescription="@string/back"
        android:src="@drawable/back"
        app:layout_constraintBottom_toTopOf="@+id/textView13"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/signup05_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/have_trouble_with_signup"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toBottomOf="@+id/imageView9"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/imageView9" />

    <TextView
        android:id="@+id/textView13"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/hello"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintBottom_toTopOf="@+id/textView14"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView14"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="16dp"
        android:text="@string/please_fill_in_to_sign_up_new_account"
        app:layout_constraintBottom_toTopOf="@+id/signup_firstnm"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_firstnm"
        android:layout_width="170dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/first_name"
        android:hint="@string/first_name"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toTopOf="@+id/signup_email05"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_lastnm"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:autofillHints="@string/last_name"
        android:hint="@string/last_name"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toBottomOf="@+id/signup_firstnm"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/signup_firstnm" />

    <EditText
        android:id="@+id/signup_email05"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:drawablePadding="3dp"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/signup_password05"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_password05"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/password"
        android:drawablePadding="3dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toTopOf="@+id/signup_retypepass05"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/signup_retypepass05"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:autofillHints="@string/retype_password"
        android:drawablePadding="3dp"
        android:hint="@string/retype_password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />


    <RelativeLayout
        android:id="@+id/signup05_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup_retypepass05">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/textView17"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/or_login_with"
        android:textColor="@android:color/black"
        android:textSize="19sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/signup05_btn" />

    <LinearLayout
        android:id="@+id/linearLayout3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView17">

        <ImageView
            android:layout_width="45dp"
            android:layout_height="45dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb5" />

        <ImageView
            android:layout_width="45dp"
            android:layout_height="45dp"
            android:layout_marginLeft="30dp"
            android:layout_marginRight="30dp"
            android:contentDescription="@string/google"
            android:src="@drawable/google5" />

        <ImageView
            android:layout_width="45dp"
            android:layout_height="45dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter5" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout3">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/already_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_in"
            android:textColor="#4648FF" />

    </LinearLayout>


</androidx.constraintlayout.widget.ConstraintLayout>
```

**(h). `activity_login01.xml`**

> Our `activity_login01` layout.

This layout will represent our Login01 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".login.Login01Activity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginLeft="24dp"
        android:layout_marginTop="32dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/welcome_back"
        android:textColor="@android:color/black"
        android:textSize="23sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="5dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/login_to_continue"
        android:textColor="@android:color/black"
        app:layout_constraintStart_toStartOf="@+id/textView"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="280dp"
        android:layout_height="280dp"
        android:contentDescription="@string/login"
        android:layout_marginTop="16dp"
        android:src="@drawable/login01"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2" />

    <EditText
        android:id="@+id/login_email01"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:background="@drawable/edittext_border01"
        android:hint="@string/email"
        android:paddingLeft="16dp"
        android:inputType="textEmailAddress"
        android:autofillHints="@string/email"
        android:paddingStart="16dp"
        android:paddingTop="10dp"
        tools:ignore="RtlSymmetry"
        android:paddingBottom="10dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <EditText
        android:id="@+id/login_password01"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:background="@drawable/edittext_border01"
        android:hint="@string/password"
        android:inputType="textPassword"
        android:autofillHints="@string/password"
        android:paddingLeft="16dp"
        android:paddingStart="16dp"
        tools:ignore="RtlSymmetry"
        android:paddingTop="10dp"
        android:paddingBottom="10dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login_email01" />

    <TextView
        android:id="@+id/login01_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:text="@string/forget_password"
        android:textColor="@android:color/black"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login_password01" />

    <RelativeLayout
        android:id="@+id/login01_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="10dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login01_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login01_forget">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/login"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login01_btn">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/don_t_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="#FC155D" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(i). `activity_login02.xml`**

> Our `activity_login02` layout.

This layout will represent our Login02 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`FrameLayout`](https://android.examples.directory/framelayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)
6. [`View`](https://android.examples.directory/view)
7. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"

    tools:context=".login.Login02Activity">

    <FrameLayout
        android:id="@+id/frameLayout"
        android:layout_width="match_parent"
        android:layout_height="250dp"
        android:background="#4648FF"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:id="@+id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="20dp"
            android:textSize="20sp"
            android:drawablePadding="20sp"
            android:layout_gravity="center|bottom"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/music_stream"
            android:textColor="@android:color/white"
            app:drawableTopCompat="@drawable/login02" />

    </FrameLayout>

    <EditText
        android:id="@+id/login_email02"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginRight="16dp"
        android:hint="@string/email"
        android:autofillHints="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/frameLayout" />

    <EditText
        android:id="@+id/login_password02"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:autofillHints="@string/password"
        android:layout_marginRight="16dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login_email02" />

    <RelativeLayout
        android:id="@+id/login02_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login_password02">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/login"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/login02_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/forget_password"
        android:textColor="#666666"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login02_btn" />

    <LinearLayout
        android:id="@+id/linearLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login02_forget">

        <View
            android:layout_width="150dp"
            android:layout_height="2dp"
            android:background="#666666" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="10dp"
            android:layout_marginRight="10dp"
            android:text="@string/or"
            android:textColor="#666666" />

        <View
            android:layout_width="150dp"
            android:layout_height="2dp"
            android:background="#666666" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout">

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb1" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_marginLeft="30dp"
            android:layout_marginRight="30dp"
            android:contentDescription="@string/google"
            android:src="@drawable/google1" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter1" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(j). `activity_login03.xml`**

> Our `activity_login03` layout.

This layout will represent our Login03 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`EditText`](https://android.examples.directory/edittext)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`View`](https://android.examples.directory/view)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white"
    tools:context=".login.Login03Activity">

    <TextView
        android:id="@+id/textView5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        android:fontFamily="@font/ubuntu_bold"
        android:text="@string/welcome_nback"
        android:textColor="@android:color/black"
        android:textSize="30sp"
        app:layout_constraintBottom_toTopOf="@+id/login_email03"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/login_email03"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/login_password03"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/login_password03"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/password"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toTopOf="@+id/login03_btn"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/sign_in"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintBottom_toBottomOf="@+id/login03_btn"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/login03_btn" />

    <ImageView
        android:id="@+id/login03_btn"
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:contentDescription="@string/login"
        android:src="@drawable/login03_btn"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/imageView5"
        android:layout_width="55dp"
        android:layout_height="55dp"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:contentDescription="@string/google"
        android:src="@drawable/google2"
        app:layout_constraintBottom_toBottomOf="@+id/imageView2"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/imageView2" />

    <ImageView
        android:id="@+id/imageView2"
        android:layout_width="55dp"
        android:layout_height="55dp"
        android:contentDescription="@string/apple"
        android:src="@drawable/apple"
        app:layout_constraintBottom_toBottomOf="@+id/imageView4"
        app:layout_constraintEnd_toStartOf="@+id/imageView4"
        app:layout_constraintStart_toEndOf="@+id/imageView5"
        app:layout_constraintTop_toTopOf="@+id/imageView4" />

    <ImageView
        android:id="@+id/imageView4"
        android:layout_width="55dp"
        android:layout_height="55dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:contentDescription="@string/facebook"
        android:src="@drawable/fb2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login03_btn" />

    <RelativeLayout
        android:id="@+id/relativeLayout2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView5">

        <TextView
            android:id="@+id/myTextView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_up"
            android:textSize="16sp"
            android:textColor="@android:color/black" />

        <View
            android:layout_width="60dp"
            android:layout_height="1.5dp"
            android:layout_below="@+id/myTextView"
            android:background="#000" />

    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/login03_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        app:layout_constraintBottom_toBottomOf="@+id/relativeLayout2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/relativeLayout2">

        <TextView
            android:id="@+id/myTextView1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/forget_password"
            android:textColor="@android:color/black"
            android:textSize="16sp" />

        <View
            android:layout_width="130dp"
            android:layout_height="1.5dp"
            android:layout_below="@+id/myTextView1"
            android:background="#000" />

    </RelativeLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(k). `activity_login04.xml`**

> Our `activity_login04` layout.

This layout will represent our Login04 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`EditText`](https://android.examples.directory/edittext)
3. [`RadioButton`](https://android.examples.directory/radiobutton)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`LinearLayout`](https://android.examples.directory/linearlayout)
6. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".login.Login04Activity">

    <TextView
        android:id="@+id/textView7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="8dp"
        android:fontFamily="@font/ubuntu_bold"
        android:text="@string/sign_in"
        android:textColor="#5A64F2"
        android:textSize="30sp"
        app:layout_constraintBottom_toTopOf="@+id/textView8"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="32dp"
        android:text="@string/sign_in_into_your_account_to_access_nthousand_of_products"
        android:textColor="#858383"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/textView9"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/email"
        android:textColor="#666666"
        android:textSize="18sp"
        app:layout_constraintBottom_toTopOf="@+id/login_email04"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/login_email04"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:hint="@string/enter_your_email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/textView10"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/password"
        android:textColor="#666666"
        android:textSize="18sp"
        app:layout_constraintBottom_toTopOf="@+id/login_password04"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/login_password04"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/password"
        android:hint="@string/enter_your_password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toTopOf="@+id/radioButton"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <RadioButton
        android:id="@+id/radioButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView11"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/remember_me"
        android:textColor="@android:color/black"
        android:textSize="18sp"
        app:layout_constraintBottom_toBottomOf="@+id/radioButton"
        app:layout_constraintStart_toEndOf="@+id/radioButton"
        app:layout_constraintTop_toTopOf="@+id/radioButton" />

    <TextView
        android:id="@+id/login04_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="20dp"
        android:layout_marginRight="20dp"
        android:text="@string/forget_password"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toBottomOf="@+id/textView11"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/textView11" />


    <RelativeLayout
        android:id="@+id/login04_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/radioButton">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/sign_in"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/textView12"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:fontFamily="@font/ubuntu_regular"
        android:text="@string/connect_with"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login04_btn" />

    <LinearLayout
        android:id="@+id/linearLayout2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:orientation="horizontal"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView12">

        <ImageView
            android:id="@+id/imageView6"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb4" />

        <ImageView
            android:id="@+id/imageView7"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/google"
            android:layout_marginLeft="20dp"
            android:layout_marginRight="20dp"
            android:src="@drawable/google4" />

        <ImageView
            android:id="@+id/imageView8"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter4" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout2">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/don_t_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="#4648FF" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(m). `activity_login05.xml`**

> Our `activity_login05` layout.

This layout will represent our Login05 Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`RelativeLayout`](https://android.examples.directory/relativelayout)
5. [`SwitchCompat`](https://android.examples.directory/switchcompat)
6. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".login.Login05Activity">

    <ImageView
        android:id="@+id/imageView9"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="16dp"
        android:contentDescription="@string/back"
        android:src="@drawable/back"
        app:layout_constraintBottom_toTopOf="@+id/textView13"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/login05_forget"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/have_trouble_with_login"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toBottomOf="@+id/imageView9"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/imageView9" />

    <TextView
        android:id="@+id/textView13"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="8dp"
        android:fontFamily="@font/ubuntu_medium"
        android:text="@string/welcome_back1"
        android:textColor="@android:color/black"
        android:textSize="20sp"
        app:layout_constraintBottom_toTopOf="@+id/textView14"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView14"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="24dp"
        android:text="@string/enter_your_credentials_to_continue"
        app:layout_constraintBottom_toTopOf="@+id/login_email05"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/login_email05"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:autofillHints="@string/email"
        android:drawableStart="@drawable/ic_person"
        android:drawableLeft="@drawable/ic_person"
        android:drawablePadding="3dp"
        android:hint="@string/email"
        android:inputType="textEmailAddress"
        app:layout_constraintBottom_toTopOf="@+id/login_password05"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/login_password05"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="32dp"
        android:autofillHints="@string/password"
        android:drawableStart="@drawable/ic_lock"
        android:drawableLeft="@drawable/ic_lock"
        android:drawablePadding="3dp"
        android:hint="@string/password"
        android:inputType="textPassword"
        app:layout_constraintBottom_toTopOf="@+id/textView15"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/textView15"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:text="@string/remember_me_next_time"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <RelativeLayout
        android:id="@+id/custom_switch"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        app:layout_constraintBottom_toBottomOf="@+id/textView15"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@+id/textView15">

        <androidx.appcompat.widget.SwitchCompat
            android:id="@+id/switchCompat"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:clickable="false"
            android:checked="false"
            android:focusable="false"
            android:thumb="@drawable/switch_thumb"
            app:track="@drawable/switch_track" />

    </RelativeLayout>

    <RelativeLayout
        android:id="@+id/login05_btn"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="24dp"
        android:layout_marginRight="16dp"
        android:background="@drawable/login02_btn"
        android:gravity="center"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView15">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/login"
            android:textColor="@android:color/white"
            android:textSize="20sp" />

    </RelativeLayout>

    <TextView
        android:id="@+id/textView17"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:text="@string/or_login_with"
        android:textColor="@android:color/black"
        android:textSize="19sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/login05_btn" />

    <LinearLayout
        android:id="@+id/linearLayout3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView17">

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/facebook"
            android:src="@drawable/fb5" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_marginLeft="30dp"
            android:layout_marginRight="30dp"
            android:contentDescription="@string/google"
            android:src="@drawable/google5" />

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:contentDescription="@string/twitter"
            android:src="@drawable/twitter5" />

    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/linearLayout3">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_regular"
            android:text="@string/don_t_have_an_account"
            android:textColor="@android:color/black" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:fontFamily="@font/ubuntu_medium"
            android:text="@string/signup"
            android:textColor="#4648FF" />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(n). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`Toolbar`](https://android.examples.directory/toolbar)
2. [`TextView`](https://android.examples.directory/textview)
3. [`ExpandableListView`](https://android.examples.directory/expandablelistview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="match_parent"
    tools:context=".Mainpage.MainActivity">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/colorPrimary"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/app_name"
            android:textColor="@android:color/white"
            android:textSize="18sp"
            android:textStyle="bold" />

    </androidx.appcompat.widget.Toolbar>

    <ExpandableListView
        android:id="@+id/ExpandableListView"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    </ExpandableListView>

</LinearLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `Signup01Activity.java`**

> Our `Signup01Activity` class.

Create a java file named `Signup01Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `RelativeLayout` from the `android.widget` package.
7. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        username = findViewById(R.id.signup_username01);
        email = findViewById(R.id.signup_email01);
        password = findViewById(R.id.signup_password01);
        signup_btn = findViewById(R.id.signup01_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;
import com.adpth.authuidesigns.login.Login01Activity;

public class Signup01Activity extends AppCompatActivity {

    EditText username,email,password;
    RelativeLayout signup_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup01);

        FindviewbyId();

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(username.getText().toString())) {
                    if (!TextUtils.isEmpty(email.getText().toString())) {
                        if (!TextUtils.isEmpty(password.getText().toString())) {
                            Toast.makeText(Signup01Activity.this,"Account is created",Toast.LENGTH_LONG).show();
                        }
                    }
                }

                if (username.getText().toString().length() == 0) {
                    Toast.makeText(Signup01Activity.this,"Enter the Username",Toast.LENGTH_LONG).show();
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Signup01Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Signup01Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });

    }

    private void FindviewbyId() {
        username = findViewById(R.id.signup_username01);
        email = findViewById(R.id.signup_email01);
        password = findViewById(R.id.signup_password01);
        signup_btn = findViewById(R.id.signup01_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(b). `Signup02Activity.java`**

> Our `Signup02Activity` class.

Create a java file named `Signup02Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `RelativeLayout` from the `android.widget` package.
7. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        username = findViewById(R.id.signup_username02);
        email = findViewById(R.id.signup_email02);
        password = findViewById(R.id.signup_password02);
        signup_btn = findViewById(R.id.signup02_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Signup02Activity extends AppCompatActivity {

    EditText username,email,password;
    RelativeLayout signup_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup02);

        FindviewbyId();

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(username.getText().toString())) {
                    if (!TextUtils.isEmpty(email.getText().toString())) {
                        if (!TextUtils.isEmpty(password.getText().toString())) {
                            Toast.makeText(Signup02Activity.this,"Account is created",Toast.LENGTH_LONG).show();
                        }
                    }
                }

                if (username.getText().toString().length() == 0) {
                    Toast.makeText(Signup02Activity.this,"Enter the Username",Toast.LENGTH_LONG).show();
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Signup02Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Signup02Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        username = findViewById(R.id.signup_username02);
        email = findViewById(R.id.signup_email02);
        password = findViewById(R.id.signup_password02);
        signup_btn = findViewById(R.id.signup02_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(c). `Signup03Activity.java`**

> Our `Signup03Activity` class.

Create a java file named `Signup03Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `ImageView` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        username = findViewById(R.id.signup_username03);
        email = findViewById(R.id.signup_email03);
        password = findViewById(R.id.signup_password03);
        signup_btn = findViewById(R.id.signup03_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Signup03Activity extends AppCompatActivity {

    EditText username,email,password;
    ImageView signup_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup03);

        FindviewbyId();

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(username.getText().toString())) {
                    if (!TextUtils.isEmpty(email.getText().toString())) {
                        if (!TextUtils.isEmpty(password.getText().toString())) {
                            Toast.makeText(Signup03Activity.this,"Account is created",Toast.LENGTH_LONG).show();
                        }
                    }
                }

                if (username.getText().toString().length() == 0) {
                    Toast.makeText(Signup03Activity.this,"Enter the Username",Toast.LENGTH_LONG).show();
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Signup03Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Signup03Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        username = findViewById(R.id.signup_username03);
        email = findViewById(R.id.signup_email03);
        password = findViewById(R.id.signup_password03);
        signup_btn = findViewById(R.id.signup03_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(d). `Signup04Activity.java`**

> Our `Signup04Activity` class.

Create a java file named `Signup04Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `ImageView` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        username = findViewById(R.id.signup_username04);
        email = findViewById(R.id.signup_email04);
        password = findViewById(R.id.signup_password04);
        signup_btn = findViewById(R.id.signup04_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Signup04Activity extends AppCompatActivity {

    EditText username,email,password;
    RelativeLayout signup_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup04);

        FindviewbyId();

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(username.getText().toString())) {
                    if (!TextUtils.isEmpty(email.getText().toString())) {
                        if (!TextUtils.isEmpty(password.getText().toString())) {
                            Toast.makeText(Signup04Activity.this,"Account is created",Toast.LENGTH_LONG).show();
                        }
                    }
                }

                if (username.getText().toString().length() == 0) {
                    Toast.makeText(Signup04Activity.this,"Enter the Username",Toast.LENGTH_LONG).show();
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Signup04Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Signup04Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        username = findViewById(R.id.signup_username04);
        email = findViewById(R.id.signup_email04);
        password = findViewById(R.id.signup_password04);
        signup_btn = findViewById(R.id.signup04_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(e). `Signup05Activity.java`**

> Our `Signup05Activity` class.

Create a java file named `Signup05Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `RelativeLayout` from the `android.widget` package.
7. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        first = findViewById(R.id.signup_firstnm);
        last = findViewById(R.id.signup_lastnm);
        email = findViewById(R.id.signup_email05);
        password = findViewById(R.id.signup_password05);
        signup_btn = findViewById(R.id.signup05_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Signup05Activity extends AppCompatActivity {

    EditText first,last,email,password;
    RelativeLayout signup_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup05);

        FindviewbyId();

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(first.getText().toString())) {
                    if (!TextUtils.isEmpty(last.getText().toString())) {
                        if (!TextUtils.isEmpty(email.getText().toString())) {
                            if (!TextUtils.isEmpty(password.getText().toString())) {
                                Toast.makeText(Signup05Activity.this,"Account is created",Toast.LENGTH_LONG).show();
                            }
                        }
                    }
                }

                if (first.getText().toString().length() == 0) {
                    Toast.makeText(Signup05Activity.this,"Enter the First Name",Toast.LENGTH_LONG).show();
                }

                if (last.getText().toString().length() == 0) {
                    Toast.makeText(Signup05Activity.this,"Enter the Last Name",Toast.LENGTH_LONG).show();
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Signup05Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Signup05Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        first = findViewById(R.id.signup_firstnm);
        last = findViewById(R.id.signup_lastnm);
        email = findViewById(R.id.signup_email05);
        password = findViewById(R.id.signup_password05);
        signup_btn = findViewById(R.id.signup05_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(f). `Login01Activity.java`**

> Our `Login01Activity` class.

Create a java file named `Login01Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `RelativeLayout` from the `android.widget` package.
7. `Toast` from the `android.widget` package.
8. `Toolbar` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        email = findViewById(R.id.login_email01);
        password = findViewById(R.id.login_password01);
        login_btn = findViewById(R.id.login01_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.Toolbar;

import com.adpth.authuidesigns.R;

public class Login01Activity extends AppCompatActivity {

    EditText email,password;
    RelativeLayout login_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login01);

        FindviewbyId();

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(email.getText().toString())) {
                    if (!TextUtils.isEmpty(password.getText().toString())) {
                        Toast.makeText(Login01Activity.this,"Login is successful",Toast.LENGTH_LONG).show();
                    }
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Login01Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Login01Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        email = findViewById(R.id.login_email01);
        password = findViewById(R.id.login_password01);
        login_btn = findViewById(R.id.login01_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(g). `Login02Activity.java`**

> Our `Login02Activity` class.

Create a java file named `Login02Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `RelativeLayout` from the `android.widget` package.
7. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        email = findViewById(R.id.login_email02);
        password = findViewById(R.id.login_password02);
        login_btn = findViewById(R.id.login02_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Login02Activity extends AppCompatActivity {

    EditText email,password;
    RelativeLayout login_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login02);

        FindviewbyId();

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(email.getText().toString())) {
                    if (!TextUtils.isEmpty(password.getText().toString())) {
                        Toast.makeText(Login02Activity.this,"Login is successful",Toast.LENGTH_LONG).show();
                    }
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Login02Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Login02Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        email = findViewById(R.id.login_email02);
        password = findViewById(R.id.login_password02);
        login_btn = findViewById(R.id.login02_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(h). `Login03Activity.java`**

> Our `Login03Activity` class.

Create a java file named `Login03Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `ImageView` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        email = findViewById(R.id.login_email03);
        password = findViewById(R.id.login_password03);
        login_btn = findViewById(R.id.login03_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Login03Activity extends AppCompatActivity {

    EditText email,password;
    ImageView login_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login03);

        FindviewbyId();

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(email.getText().toString())) {
                    if (!TextUtils.isEmpty(password.getText().toString())) {
                        Toast.makeText(Login03Activity.this,"Login is successful",Toast.LENGTH_LONG).show();
                    }
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Login03Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Login03Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        email = findViewById(R.id.login_email03);
        password = findViewById(R.id.login_password03);
        login_btn = findViewById(R.id.login03_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(i). `Login04Activity.java`**

> Our `Login04Activity` class.

Create a java file named `Login04Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `EditText` from the `android.widget` package.
6. `ImageView` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        email = findViewById(R.id.login_email04);
        password = findViewById(R.id.login_password04);
        login_btn = findViewById(R.id.login04_btn);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Login04Activity extends AppCompatActivity {

    EditText email,password;
    RelativeLayout login_btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login04);

        FindviewbyId();

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(email.getText().toString())) {
                    if (!TextUtils.isEmpty(password.getText().toString())) {
                        Toast.makeText(Login04Activity.this,"Login is successful",Toast.LENGTH_LONG).show();
                    }
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Login04Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Login04Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });
    }

    private void FindviewbyId() {
        email = findViewById(R.id.login_email04);
        password = findViewById(R.id.login_password04);
        login_btn = findViewById(R.id.login04_btn);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(j). `Login05Activity.java`**

> Our `Login05Activity` class.

Create a java file named `Login05Activity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `SwitchCompat` from the `androidx.appcompat.widget` package.
3. `Bundle` from the `android.os` package.
4. `TextUtils` from the `android.text` package.
5. `View` from the `android.view` package.
6. `EditText` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onBackPressed()`.

We will be creating the following methods:

1. `FindviewbyId()`.

**(a). Our `FindviewbyId()` method.**

A method to  findviewby id:

```java
    private void FindviewbyId() {
        email = findViewById(R.id.login_email05);
        password = findViewById(R.id.login_password05);
        login_btn = findViewById(R.id.login05_btn);
        custom_switch = findViewById(R.id.custom_switch);
        switchCompat = findViewById(R.id.switchCompat);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.adpth.authuidesigns.R;

public class Login05Activity extends AppCompatActivity {

    EditText email,password;
    RelativeLayout login_btn,custom_switch;
    SwitchCompat switchCompat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login05);
        FindviewbyId();

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(email.getText().toString())) {
                    if (!TextUtils.isEmpty(password.getText().toString())) {
                        Toast.makeText(Login05Activity.this,"Login is successful",Toast.LENGTH_LONG).show();
                    }
                }

                if (email.getText().toString().length() == 0) {
                    Toast.makeText(Login05Activity.this,"Enter the email",Toast.LENGTH_LONG).show();
                }

                if (password.getText().toString().length() == 0) {
                    Toast.makeText(Login05Activity.this,"Enter the password",Toast.LENGTH_LONG).show();
                }
            }
        });

        custom_switch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (switchCompat.isChecked()) {
                    switchCompat.setChecked(false);
                    Toast.makeText(Login05Activity.this,"Password Remember is OFF",Toast.LENGTH_LONG).show();
                } else {
                    switchCompat.setChecked(true);
                    Toast.makeText(Login05Activity.this,"Password Remember is ON",Toast.LENGTH_LONG).show();
                }
            }
        });

    }

    private void FindviewbyId() {
        email = findViewById(R.id.login_email05);
        password = findViewById(R.id.login_password05);
        login_btn = findViewById(R.id.login05_btn);
        custom_switch = findViewById(R.id.custom_switch);
        switchCompat = findViewById(R.id.switchCompat);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right);
    }
}

```

**(k). `Adapter.java`**

> Our `Adapter` class.

Create a java file named `Adapter.java`.

Inside it create a class that extends `BaseExpandableListAdapter` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `SuppressLint` from the `android.annotation` package.
2. `Context` from the `android.content` package.
3. `Typeface` from the `android.graphics` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `BaseExpandableListAdapter` from the `android.widget` package.
8. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `getGroupCount()`.
2. `getChildrenCount(int`.
3. `getGroup(int`.
4. `getChild(int`.
5. `getGroupId(int`.
6. `getChildId(int`.
7. `hasStableIds()`.
8. `getGroupView(int`.
9. `getChildView(int`.
10. `isChildSelectable(int`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

import com.adpth.authuidesigns.R;

import java.util.HashMap;
import java.util.List;

public class Adapter extends BaseExpandableListAdapter {

    private Context context;
    private List<String> header;
    private HashMap<String,List<String>> hashMap;

    public Adapter(Context context, List<String> header, HashMap<String, List<String>> hashMap) {
        this.context = context;
        this.header = header;
        this.hashMap = hashMap;
    }

    @Override
    public int getGroupCount() {
        return header.size();
    }

    @Override
    public int getChildrenCount(int groupPosition) {
       return hashMap.get(header.get(groupPosition)).size();
    }

    @Override
    public Object getGroup(int groupPosition) {
        return header.get(groupPosition);
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        return  hashMap.get(header.get(groupPosition)).get(childPosition);
    }

    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @SuppressLint("InflateParams")
    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        String headerTitle = (String) getGroup(groupPosition);
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.layout_item,null);
        }
        TextView ListHeader = convertView.findViewById(R.id.header);
        ListHeader.setTypeface(null, Typeface.BOLD);
        ListHeader.setText(headerTitle);
        return convertView;
    }

    @SuppressLint("InflateParams")
    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
        final String child = (String) getChild(groupPosition,childPosition);
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.layout_child,null);
        }
        TextView ListChild = convertView.findViewById(R.id.child);
        ListChild.setText(child);
        return convertView;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return true;
    }
}


```

**(m). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Intent` from the `android.content` package.
3. `Bundle` from the `android.os` package.
4. `View` from the `android.view` package.
5. `ExpandableListAdapter` from the `android.widget` package.
6. `ExpandableListView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onChildClick(ExpandableListView`.

We will be creating the following methods:

1. `initData()`.

2. `switch(childPosition)` - It will return `switch` object.

3. `switch(childPosition)` - It will return `switch` object.

**(a). Our `()` method.**

Write this method as follows:

```java
                    switch (childPosition) {
                        case 0:
                            Intent intentChild0 = new Intent(MainActivity.this, Signup01Activity.class);
                            startActivity(intentChild0);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 1:
                            Intent intentChild1 = new Intent(MainActivity.this, Signup02Activity.class);
                            startActivity(intentChild1);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 2:
                            Intent intentChild2 = new Intent(MainActivity.this, Signup03Activity.class);
                            startActivity(intentChild2);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 3:
                            Intent intentChild3 = new Intent(MainActivity.this, Signup04Activity.class);
                            startActivity(intentChild3);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 4:
                            Intent intentChild4 = new Intent(MainActivity.this, Signup05Activity.class);
                            startActivity(intentChild4);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;
                    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ExpandableListAdapter;
import android.widget.ExpandableListView;

import com.adpth.authuidesigns.Adapter.Adapter;
import com.adpth.authuidesigns.R;
import com.adpth.authuidesigns.login.Login01Activity;
import com.adpth.authuidesigns.login.Login02Activity;
import com.adpth.authuidesigns.login.Login03Activity;
import com.adpth.authuidesigns.login.Login04Activity;
import com.adpth.authuidesigns.login.Login05Activity;
import com.adpth.authuidesigns.signup.Signup01Activity;
import com.adpth.authuidesigns.signup.Signup02Activity;
import com.adpth.authuidesigns.signup.Signup03Activity;
import com.adpth.authuidesigns.signup.Signup04Activity;
import com.adpth.authuidesigns.signup.Signup05Activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ExpandableListAdapter listAdapter;
    private ExpandableListView listView;
    private List<String> listHeader;
    private HashMap<String,List<String>> listHashMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = findViewById(R.id.ExpandableListView);
        initData();
        listAdapter = new Adapter(this,listHeader,listHashMap);
        listView.setAdapter(listAdapter);
    }

    private void initData() {
        listHeader = new ArrayList<>();
        listHashMap = new HashMap<>();

        listHeader.add("LoginPages");
        listHeader.add("SignUpPages");

        List<String> loginpages = new ArrayList<>();
        loginpages.add("LoginPage 01");
        loginpages.add("LoginPage 02");
        loginpages.add("LoginPage 03");
        loginpages.add("LoginPage 04");
        loginpages.add("LoginPage 05");

        List<String> signuppages = new ArrayList<>();
        signuppages.add("SignUpPages 01");
        signuppages.add("SignUpPages 02");
        signuppages.add("SignUpPages 03");
        signuppages.add("SignUpPages 04");
        signuppages.add("SignUpPages 05");

        listHashMap.put(listHeader.get(0), loginpages);
        listHashMap.put(listHeader.get(1), signuppages);

        listView.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
            @Override
            public boolean onChildClick(ExpandableListView parent, View v, int groupPosition, int childPosition, long id) {
                if (groupPosition == 0) {
                    switch (childPosition) {
                        case 0:
                            Intent intentChild0 = new Intent(MainActivity.this, Login01Activity.class);
                            startActivity(intentChild0);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 1:
                            Intent intentChild1 = new Intent(MainActivity.this, Login02Activity.class);
                            startActivity(intentChild1);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 2:
                            Intent intentChild2 = new Intent(MainActivity.this, Login03Activity.class);
                            startActivity(intentChild2);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 3:
                            Intent intentChild3 = new Intent(MainActivity.this, Login04Activity.class);
                            startActivity(intentChild3);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 4:
                            Intent intentChild4 = new Intent(MainActivity.this, Login05Activity.class);
                            startActivity(intentChild4);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                    }
                }
                if (groupPosition == 1) {
                    switch (childPosition) {
                        case 0:
                            Intent intentChild0 = new Intent(MainActivity.this, Signup01Activity.class);
                            startActivity(intentChild0);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 1:
                            Intent intentChild1 = new Intent(MainActivity.this, Signup02Activity.class);
                            startActivity(intentChild1);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 2:
                            Intent intentChild2 = new Intent(MainActivity.this, Signup03Activity.class);
                            startActivity(intentChild2);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 3:
                            Intent intentChild3 = new Intent(MainActivity.this, Signup04Activity.class);
                            startActivity(intentChild3);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;

                        case 4:
                            Intent intentChild4 = new Intent(MainActivity.this, Signup05Activity.class);
                            startActivity(intentChild4);
                            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left);
                            break;
                    }
                }
                return true;
            }
        });
    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/adpth/Auth-UI-Design/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/adpth/Auth-UI-Design).|
|3.|Follow code author [here](https://github.com/adpth).|
