# Tabbed Login Signup

>  How to design a beautiful a login or signup single page in android.


How to design a beautiful a login or signup single page in android


How to design a beautiful a login or signup single page in android
![Tabbed Login Signup Tutorial](https://github.com/Oclemy/LoginSignup/raw/master/SignUpLogin.gif)


Let us look at the full Tabbed Login Signup Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 7 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.3"

    defaultConfig {
        applicationId "info.camposha.loginsignup"
        minSdkVersion 14
        targetSdkVersion 30
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
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    implementation 'de.hdodenhof:circleimageview:2.2.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'

}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_login_page.xml`**

> Our `activity_login_page` layout.

This layout will represent our Page Login Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ScrollView`](https://android.examples.directory/scrollview)
2. [`CircleImageView`](https://android.examples.directory/circleimageview)
3. [`CardView`](https://android.examples.directory/cardview)
4. [`LinearLayout`](https://android.examples.directory/linearlayout)
5. [`TextView`](https://android.examples.directory/textview)
6. [`TextInputLayout`](https://android.examples.directory/textinputlayout)
7. [`EditText`](https://android.examples.directory/edittext)
8. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true">


        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <de.hdodenhof.circleimageview.CircleImageView
                android:id="@+id/circleImageView"
                android:layout_width="120dp"
                android:layout_height="120dp"
                android:layout_centerHorizontal="true"
                android:elevation="9dp"
                android:src="@drawable/sigin_boy_img"
                app:civ_border_color="@color/colorAccent"
                app:civ_border_width="3dp" />

            <androidx.cardview.widget.CardView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="63dp"
                android:elevation="0dp"
                app:cardElevation="8dp"
                app:cardCornerRadius="4dp"
                app:cardUseCompatPadding="true">

                <RelativeLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content">


                    <LinearLayout
                        android:id="@+id/linearLayout1"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal"
                        android:weightSum="100">

                        <TextView
                            android:id="@+id/signin"
                            android:layout_width="0dp"
                            android:layout_height="wrap_content"
                            android:layout_weight="50"
                            android:background="@color/colorAccent"
                            android:paddingBottom="12dp"
                            android:paddingTop="12dp"
                            android:text="SignIn"
                            android:textAlignment="center"
                            android:textColor="#FFFFFF"
                            android:textSize="16dp"
                            android:textStyle="bold"
                            android:layout_gravity="center_horizontal" />

                        <TextView
                            android:id="@+id/signup"
                            android:layout_width="0dp"
                            android:layout_height="wrap_content"
                            android:layout_weight="50"
                            android:background="@drawable/bordershape"
                            android:paddingBottom="12dp"
                            android:paddingTop="12dp"
                            android:text="SignUp"
                            android:textAlignment="center"
                            android:textColor="@color/colorAccent"
                            android:textSize="16dp"
                            android:textStyle="bold"
                            android:gravity="center_horizontal" />

                    </LinearLayout>

                    <LinearLayout
                        android:id="@+id/linearLayout2"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:layout_below="@id/linearLayout1"
                        android:orientation="vertical"
                        android:padding="16dp">

                        <TextView
                            android:id="@+id/signin_signup_txt"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:text="Sign in"
                            android:textAlignment="center"
                            android:textColor="#000000"
                            android:textSize="24dp"
                            android:textStyle="bold"
                            android:gravity="center_horizontal" />

                        <com.google.android.material.textfield.TextInputLayout
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="16dp">

                            <EditText
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                android:drawablePadding="16dp"
                                android:drawableStart="@drawable/ic_email_light_blue_24dp"
                                android:hint="Email"
                                android:inputType="textEmailAddress"
                                android:maxLines="1"
                                android:textColor="@android:color/black"
                                android:textSize="16sp"
                                android:drawableLeft="@drawable/ic_email_light_blue_24dp" />
                        </com.google.android.material.textfield.TextInputLayout>

                        <com.google.android.material.textfield.TextInputLayout
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="16dp"
                            app:passwordToggleEnabled="true">

                            <EditText
                                android:id="@+id/password"
                                android:layout_width="match_parent"
                                android:layout_height="match_parent"
                                android:drawablePadding="16dp"
                                android:drawableStart="@drawable/ic_lock_light_blue_24dp"
                                android:hint="Password"
                                android:inputType="textPassword"
                                android:maxLines="1"
                                android:textColor="@android:color/black"
                                android:textSize="16sp"
                                android:drawableLeft="@drawable/ic_lock_light_blue_24dp" />
                        </com.google.android.material.textfield.TextInputLayout>

                        <Button
                            android:id="@+id/signin_signup_btn"
                            android:layout_width="210dp"
                            android:layout_height="wrap_content"
                            android:layout_gravity="center"
                            android:layout_marginBottom="16dp"
                            android:layout_marginTop="24dp"
                            android:background="@drawable/buttonshape"
                            android:drawableLeft="@drawable/ic_touch_app_white_24dp"
                            android:drawableStart="@drawable/ic_touch_app_white_24dp"
                            android:paddingLeft="16dp"
                            android:paddingRight="16dp"
                            android:text="Sign In"
                            android:textAllCaps="false"
                            android:textColor="#fff"
                            android:textSize="18sp"
                            android:textStyle="bold" />

                        <TextView
                            android:id="@+id/forgot_password"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:layout_marginBottom="32dp"
                            android:text="Forgot your password?"
                            android:textAlignment="center"
                            android:textColor="#4f4f4f"
                            android:textSize="16sp"
                            android:textStyle="bold"
                            android:gravity="center_horizontal" />

                    </LinearLayout>

                </RelativeLayout>


            </androidx.cardview.widget.CardView>


        </RelativeLayout>

    </ScrollView>

</RelativeLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `LoginSignupPage.kt`**

> Our `LoginSignupPage` class.

Create a Kotlin file named `LoginSignupPage.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Color` from the `android.graphics` package.
2. `Bundle` from the `android.os` package.
3. `View` from the `android.view` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_login_page` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Color
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_login_page.*

class LoginSignupPage : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login_page)

        signin.setOnClickListener {
            signin.setTextColor(Color.parseColor("#FFFFFF"))
            signin.setBackgroundColor(Color.parseColor("#FF2729C3"))
            signup.setTextColor(Color.parseColor("#FF2729C3"))
            signup.setBackgroundResource(R.drawable.bordershape)
            circleImageView.setImageResource(R.drawable.sigin_boy_img)
            signin_signup_txt.text = "Sign In"
            signin_signup_btn.text = "Sign In"
            forgot_password.visibility = View.VISIBLE
        }
        signup.setOnClickListener {
            signup.setTextColor(Color.parseColor("#FFFFFF"))
            signup.setBackgroundColor(Color.parseColor("#FF2729C3"))
            signin.setTextColor(Color.parseColor("#FF2729C3"))
            signin.setBackgroundResource(R.drawable.bordershape)
            circleImageView.setImageResource(R.drawable.sigup_boy_img)
            signin_signup_txt.text = "Sign Up"
            signin_signup_btn.text = "Sign Up"
            forgot_password.visibility = View.INVISIBLE
        }
    }
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Oclemy/LoginSignup/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Oclemy/LoginSignup).|
|3.|Follow code author [here](https://github.com/Oclemy).|
