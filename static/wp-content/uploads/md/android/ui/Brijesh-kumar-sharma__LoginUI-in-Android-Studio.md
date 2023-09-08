# LoginUI Android Studio

>  This repo contains the source code of an amazing ui android application you just fall in love after seeeing the UI.

![LoginUI Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/98360061-0e6a9980-1fde-11eb-906d-fc97cc619d2b.jpeg)


Let us look at the full LoginUI Android Studio code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.example.loginui"
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
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.2'
    implementation 'com.google.android.material:material:1.3.0-alpha03'
    implementation 'com.android.support:design:28.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`CardView`](https://android.examples.directory/cardview)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)
4. [`TextInputLayout`](https://android.examples.directory/textinputlayout)
5. [`EditText`](https://android.examples.directory/edittext)
6. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#22333B"
    tools:context=".MainActivity">

    <androidx.cardview.widget.CardView
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:id="@+id/logo"
        android:layout_marginStart="30dp"
        android:layout_marginTop="100dp"
        app:cardCornerRadius="10dp">

        <ImageView
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:scaleType="centerCrop"
            android:background="#40DF9F"
            android:padding="3dp"
            android:backgroundTint="#40df9f"
            android:src="@drawable/ic_baseline_code_24"
            android:contentDescription="@string/todo">
        </ImageView>

    </androidx.cardview.widget.CardView>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/logo"
        android:layout_marginStart="30dp"
        android:layout_marginTop="10dp"
        android:text="@string/wellcome"
        android:fontFamily="@font/sfprodisplay_bold"
        android:id="@+id/welcome"
        android:textColor="#ffffff"
        android:textSize="42sp">
    </TextView>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/welcome"
        android:textSize="27sp"
        android:fontFamily="@font/sfprodisplay_regular"
        android:layout_marginStart="30dp"
        android:layout_marginTop="5dp"
        android:textColor="#96A7AF"
        android:id="@+id/signin"
        android:text="@string/sign_in_to_continue">
    </TextView>

    <androidx.cardview.widget.CardView
        android:layout_width="35dp"
        android:layout_height="35dp"
        android:id="@+id/usericon"
        android:layout_marginStart="30dp"
        android:layout_below="@+id/signin"
        android:layout_marginTop="30dp"
        app:cardCornerRadius="10dp">

        <ImageView
            android:layout_width="35dp"
            android:layout_height="35dp"
            android:scaleType="centerCrop"
            android:background="#625B39"
            android:padding="3dp"
            android:contentDescription="@string/username"
            android:backgroundTint="#625B39"
            android:src="@drawable/ic_baseline_person_24">
        </ImageView>

    </androidx.cardview.widget.CardView>

    <androidx.cardview.widget.CardView
        android:layout_width="35dp"
        android:layout_height="35dp"
        android:id="@+id/passwordicon"
        android:layout_marginStart="30dp"
        android:layout_below="@+id/usericon"
        android:layout_marginTop="30dp"
        app:cardCornerRadius="10dp">

        <ImageView
            android:layout_width="35dp"
            android:layout_height="35dp"
            android:scaleType="centerCrop"
            android:background="#623A42"
            android:padding="5dp"
            android:contentDescription="@string/password"
            android:backgroundTint="#623A42"
            android:src="@drawable/ic_baseline_lock_24">
        </ImageView>

    </androidx.cardview.widget.CardView>

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="15dp"
        android:layout_marginEnd="20dp"
        android:textColorHint="#96A7AF"
        android:layout_below="@id/signin"
        android:layout_marginStart="10dp"
        android:layout_toEndOf="@+id/usericon"
        android:id="@+id/username">

        <EditText
            android:id="@+id/username_edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="@string/username"
            android:autofillHints="@string/username"
            android:textColor="#ffffff"
            android:inputType="textPersonName" />

    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/password"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/username"
        android:layout_marginTop="10dp"
        android:layout_marginEnd="20dp"
        app:passwordToggleTint="#96A7AF"
        android:layout_marginStart="10dp"
        android:layout_toEndOf="@+id/passwordicon"
        android:textColorHint="#96A7AF"
        app:passwordToggleEnabled="true"
        >

        <EditText
            android:id="@+id/password_edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="@string/password"
            android:inputType="textPassword"
            android:autofillHints="@string/password"
            android:textColor="#ffffff">
        </EditText>

    </com.google.android.material.textfield.TextInputLayout>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="30dp"
        android:layout_marginRight="30dp"
        android:layout_marginTop="30dp"
        android:id="@+id/signinButton"
        android:background="@drawable/button_design"
        android:textColor="@android:color/white"
        android:layout_below="@id/password">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:textSize="16sp"
            android:layout_centerInParent="true"
            android:text="@string/sign_in"
            android:fontFamily="@font/sfprodisplay_bold"
            android:textStyle="bold"
            android:textColor="#FFFFFF"
            app:drawableEndCompat="@drawable/ic_baseline_arrow_forward_24" />

    </RelativeLayout>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/forget"
        android:layout_marginRight="30dp"
        android:textAlignment="center"
        android:layout_marginTop="10dp"
        android:layout_marginLeft="30dp"
        android:textColor="#96A7AF"
        android:layout_below="@id/signinButton"
        android:text="@string/forget_password">
    </TextView>

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="30dp"
        android:layout_marginRight="30dp"
        android:id="@+id/newAccountButton"
        android:background="@drawable/button_design2"
        android:layout_marginTop="40dp"
        android:layout_below="@id/forget"
        android:textColor="#40DF9F"
        android:fontFamily="@font/sfprodisplay_bold"
        android:text="@string/create_an_account" />

</RelativeLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `TextUtils` from the `android.text` package.
4. `View` from the `android.view` package.
5. `Button` from the `android.widget` package.
6. `EditText` from the `android.widget` package.
7. `RelativeLayout` from the `android.widget` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button create = findViewById(R.id.newAccountButton);
        create.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this,"You clicked Create an account",Toast.LENGTH_LONG).show();
            }
        });

        TextView forget = findViewById(R.id.forget);
        forget.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this,"You clicked Forget Password",Toast.LENGTH_LONG).show();
            }
        });

        final EditText username = findViewById(R.id.username_edit);
        final EditText password = findViewById(R.id.password_edit);

        RelativeLayout signin = findViewById(R.id.signinButton);
        signin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!TextUtils.isEmpty(username.getText().toString())) {

                    if (!TextUtils.isEmpty(password.getText().toString())) {

                        Toast.makeText(MainActivity.this,"Account is created",Toast.LENGTH_LONG).show();

                    }
                }
                if (TextUtils.isEmpty(username.getText().toString())) {
                    Toast.makeText(MainActivity.this,"Username can't left empty",Toast.LENGTH_LONG).show();
                }

                if (TextUtils.isEmpty(password.getText().toString())) {
                    Toast.makeText(MainActivity.this,"Password can't left empty",Toast.LENGTH_LONG).show();
                }
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
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/LoginUI-in-Android-Studio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/LoginUI-in-Android-Studio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|
