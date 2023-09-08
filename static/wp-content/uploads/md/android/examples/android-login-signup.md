# How to Create a Single Page Login and  Signup Page - Kotlin Android

In this tutorial we will look at how to design a beautiful tabbed signup/login page. The idea is to implement both login and signup functionality on a single screen and make it beautiful,minimalistic and clean. We use nothing more than an activity and few components like cardview, buttons and edittexts.


Here's a video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/kRBzYMNEqaE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Dependencies

The only third party library we will be using is the circular imageview. This will give us the circular avatar that we will be using in between our tabs:

```groovy
    implementation 'de.hdodenhof:circleimageview:2.2.0'
```

### Step 2: Design Layout

Here is the code for our main layout, the xml code for both our login and signup screen:

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

### Step 3: Kotlin Code

And here is our Kotlin code

```kotlin
package info.camposha.loginsignup

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

### Step 4: Run

Run the project and you will get the following:

![](https://github.com/Oclemy/LoginSignup/raw/master/SignUpLogin.gif)

### Step 5: Download

Download the full source code from [here](https://github.com/Oclemy/LoginSignup/archive/refs/heads/master.zip)
