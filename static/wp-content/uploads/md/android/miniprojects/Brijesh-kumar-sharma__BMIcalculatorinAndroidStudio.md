# Android Studio BMI Calculator

>  This BMI Calculator in android studio using java in Android studio.

This BMI Calculator in android studio using java in Android studio Some of the output screens
![Android Studio BMI Calculator Tutorial](https://user-images.githubusercontent.com/64765400/119442448-b75bb600-bcdc-11eb-8e58-aa9a5c00b4c1.png)

![Android Studio BMI Calculator Tutorial](https://user-images.githubusercontent.com/64765400/119442460-bb87d380-bcdc-11eb-9c62-a291afccc355.png)

![Android Studio BMI Calculator Tutorial](https://user-images.githubusercontent.com/64765400/119442467-be82c400-bcdc-11eb-974a-de62c3ac9cfb.png)

![Android Studio BMI Calculator Tutorial](https://user-images.githubusercontent.com/64765400/119442473-c2164b00-bcdc-11eb-8176-7fc6dbe60345.png)


Let us look at the full Android Studio BMI Calculator code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 3 dependencies:


Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
}

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.example.bmicalculator"
        minSdkVersion 22
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

repositories {

}

dependencies {

    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'

 
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#2c2c2c"
    tools:context=".splash">

        <ImageView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:src="@drawable/bmifinall"
            android:layout_centerInParent="true"
            android:id="@+id/logo">
        </ImageView>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="BMI CALCULATOR"
        android:layout_marginTop="30dp"
        android:textStyle="bold"
        android:fontFamily="@font/raleway"
        android:textSize="20sp"
        android:layout_below="@id/logo"
        android:textColor="@color/white"
        android:lineSpacingExtra="2dp">

    </TextView>

</RelativeLayout>
```

**(b). `activity_bmiactivity.xml`**

> Our `activity_bmiactivity` layout.

This layout will represent our Bmiactivity Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/background"
    android:background="#1E1D1D"
    tools:context=".bmiactivity">


    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:padding="10dp"
        android:id="@+id/imageview"
        android:layout_above="@id/contentlayout"
        android:layout_marginBottom="30dp"
        android:layout_centerHorizontal="true"
        android:src="@drawable/ok">

    </ImageView>


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="20dp"
        android:id="@+id/contentlayout"
        android:background="@drawable/cardbackgroung"
        android:layout_centerInParent="true">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="50sp"
            android:textStyle="bold"
            android:layout_centerHorizontal="true"
            android:background="@color/trans"
            android:textColor="@color/white"
            android:id="@+id/bmidisplay"
            android:text="22">

        </TextView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Gender"
            android:layout_marginTop="15dp"
            android:textSize="17sp"
            android:textStyle="bold"
            android:layout_below="@id/bmidisplay"
            android:layout_centerHorizontal="true"
            android:textColor="@color/white"
            android:id="@+id/genderdisplay" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Your BMI Category Is"
            android:textStyle="bold"
            android:id="@+id/bmicategorydispaly"
            android:textColor="@color/white"
            android:fontFamily="@font/raleway"
            android:layout_marginTop="15dp"
            android:layout_centerHorizontal="true"
            android:layout_below="@id/genderdisplay"
            android:textSize="25sp">

        </TextView>






    </RelativeLayout>



    <android.widget.Button
        android:layout_width="match_parent"
        android:layout_height="40dp"
        android:id="@+id/gotomain"
        android:layout_below="@id/contentlayout"
        android:layout_marginTop="50dp"
        android:background="@drawable/buttonbackground"
        android:text="RECALCULATE YOUR BMI"
        android:textSize="15sp"
        android:textColor="@color/white"
        android:fontFamily="@font/raleway"
        android:textStyle="bold"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        >

    </android.widget.Button>



</RelativeLayout>
```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`SeekBar`](https://android.examples.directory/seekbar)
4. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#1E1D1D"
    tools:context=".MainActivity">


    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/centerhorizontalline"
        android:layout_centerInParent="true">

    </RelativeLayout>


    <RelativeLayout
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_centerInParent="true"
        android:id="@+id/centerverticalline">

    </RelativeLayout>


  <RelativeLayout
      android:layout_width="150dp"
      android:layout_height="150dp"
      android:layout_toStartOf="@id/centerverticalline"
      android:background="@drawable/cardbackgroung"
      android:layout_above="@id/heightlayout"
      android:layout_marginBottom="35dp"
      android:layout_marginRight="20dp"
      android:layout_marginLeft="20dp"
      android:id="@+id/male">

      <ImageView
          android:layout_width="170px"
          android:layout_height="170px"
          android:layout_above="@id/textmale"
          android:layout_marginBottom="20dp"
          android:layout_centerInParent="true"
          android:src="@drawable/male"
          android:contentDescription="@string/todo">

      </ImageView>

      <TextView
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:textSize="18sp"
          android:textColor="@color/white"
          android:text="@string/male"
          android:id="@+id/textmale"
          android:textStyle="bold"
          android:fontFamily="@font/raleway"
          android:textAlignment="center"
          android:layout_alignParentBottom="true"
          android:layout_marginBottom="10dp">

      </TextView>


  </RelativeLayout>

    <RelativeLayout
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:layout_above="@id/heightlayout"
        android:layout_marginBottom="35dp"
        android:layout_marginRight="20dp"
        android:layout_toEndOf="@id/centerverticalline"
        android:background="@drawable/cardbackgroung"
        android:layout_marginLeft="20dp"
        android:id="@+id/female">

        <ImageView
            android:layout_width="170px"
            android:layout_height="170px"
            android:layout_centerInParent="true"
            android:layout_above="@id/textfemale"
            android:layout_marginBottom="20dp"
            android:src="@drawable/female"
            android:contentDescription="@string/todo">

        </ImageView>

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="18sp"
            android:textColor="@color/white"
            android:text="@string/femaletext"
            android:id="@+id/textfemale"
            android:textStyle="bold"
            android:fontFamily="@font/raleway"
            android:textAlignment="center"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="10dp">

        </TextView>


    </RelativeLayout>


    <RelativeLayout
        android:layout_width="340dp"
        android:layout_height="150dp"
        android:layout_above="@id/centerhorizontalline"
        android:layout_marginBottom="-50dp"
        android:layout_centerHorizontal="true"
        android:background="@drawable/cardbackgroung"
        android:layout_marginLeft="25dp"
        android:layout_marginRight="25dp"
        android:id="@+id/heightlayout">

        <TextView
            android:layout_width="match_parent"
            android:layout_marginTop="15dp"
            android:textAlignment="center"
            android:textStyle="bold"
            android:fontFamily="@font/raleway"
            android:layout_height="wrap_content"
            android:textColor="@color/white"
            android:text="@string/height"
            android:textSize="20sp">

        </TextView>


        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/startingheight"
            android:layout_marginBottom="50dp"
            android:textSize="40sp"
            android:layout_alignParentBottom="true"
            android:textColor="@color/white"
            android:layout_centerInParent="true"
            android:id="@+id/currentheight"
            android:textStyle="bold">

        </TextView>


        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/unit"
            android:textSize="20sp"
            android:fontFamily="@font/raleway"
            android:textStyle="bold"
            android:layout_toEndOf="@id/currentheight"
            android:layout_marginStart="20dp"
            android:layout_centerInParent="true"
            android:textColor="@color/white" />


        <SeekBar
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="20dp"
            android:layout_marginLeft="10dp"
            android:progressTint="#FF4C4C"
            android:thumbTint="@color/white"
            android:layout_marginRight="10dp"
            android:id="@+id/seekbarforheight">

        </SeekBar>

    </RelativeLayout>

    <android.widget.Button
        android:layout_width="match_parent"
        android:layout_height="40dp"
        android:id="@+id/calculatebmi"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="15dp"
        android:background="@drawable/buttonbackground"
        android:text="@string/calculate_your_bmi"
        android:textSize="15sp"
        android:textColor="@color/white"
        android:fontFamily="@font/raleway"
        android:textStyle="bold"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        >

    </android.widget.Button>



    <RelativeLayout
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:layout_toStartOf="@id/centerverticalline"
        android:background="@drawable/cardbackgroung"
        android:layout_below="@id/heightlayout"
        android:layout_marginBottom="20dp"
        android:layout_marginTop="85dp"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:id="@+id/weight">



        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="18sp"
            android:textColor="@color/white"
            android:text="@string/weight"
            android:fontFamily="@font/raleway"
            android:id="@+id/textweight"
            android:layout_marginTop="15dp"
            android:textAlignment="center"
            android:textStyle="bold"
            android:layout_marginBottom="10dp">

        </TextView>


        <TextView
            android:id="@+id/currentweight"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:fontFamily="@font/raleway"
            android:text="@string/startingweight"
            android:textAlignment="center"
            android:textColor="@color/white"
            android:textSize="30sp"
            android:textStyle="bold">

        </TextView>

        <RelativeLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="10dp"
            android:layout_marginStart="20dp"
            android:background="@drawable/plusminus"
           >

            <ImageView
                android:layout_width="30dp"
                android:layout_height="30dp"
                android:src="@drawable/minus"
                android:id="@+id/decrementweight"
                android:contentDescription="@string/todo">

            </ImageView>

        </RelativeLayout>

        <RelativeLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="10dp"
            android:layout_marginEnd="20dp"
            android:layout_alignParentEnd="true"
            android:background="@drawable/plusminus"
            >

            <ImageView
                android:layout_width="30dp"
                android:layout_height="30dp"
                android:id="@+id/incremetweight"

                android:src="@drawable/add"
                android:contentDescription="@string/todo">

            </ImageView>

        </RelativeLayout>
    </RelativeLayout>


    <RelativeLayout
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:layout_toEndOf="@id/centerverticalline"
        android:background="@drawable/cardbackgroung"
        android:layout_below="@id/heightlayout"
        android:layout_marginBottom="20dp"
        android:layout_marginTop="85dp"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:id="@+id/Age">



        <TextView

            android:id="@+id/textage"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="18sp"
            android:textColor="@color/white"
            android:text="@string/age"
            android:fontFamily="@font/raleway"
            android:layout_marginTop="15dp"
            android:textAlignment="center"
            android:textStyle="bold"
            android:layout_marginBottom="10dp">

        </TextView>

        <TextView
            android:id="@+id/currentage"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:fontFamily="@font/raleway"
            android:text="@string/startingage"
            android:textAlignment="center"

            android:textColor="@color/white"
            android:textSize="30sp"
            android:textStyle="bold">

        </TextView>


        <RelativeLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="10dp"
            android:layout_marginStart="20dp"
            android:background="@drawable/plusminus"
            >

            <ImageView
                android:layout_width="30dp"
                android:layout_height="30dp"
                android:src="@drawable/minus"
                android:id="@+id/decrementage"

                android:contentDescription="@string/todo">

            </ImageView>

        </RelativeLayout>

        <RelativeLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_marginBottom="10dp"
            android:layout_marginEnd="20dp"
            android:layout_alignParentEnd="true"
            android:background="@drawable/plusminus"
            >

            <ImageView
                android:layout_width="30dp"
                android:layout_height="30dp"
                android:id="@+id/incrementage"
                android:src="@drawable/add"
                android:contentDescription="@string/todo">

            </ImageView>

        </RelativeLayout>
    </RelativeLayout>
</RelativeLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `splash.java`**

> Our `splash` class.

Create a java file named `splash.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Intent` from the `android.content` package.
3. `Bundle` from the `android.os` package.
4. `Handler` from the `android.os` package.
5. `WindowManager` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `run()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;

public class splash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent=new Intent(splash.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        },4000);
    }
}

```

**(b). `bmiactivity.java`**

> Our `bmiactivity` class.

Create a java file named `bmiactivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `SuppressLint` from the `android.annotation` package.
3. `Intent` from the `android.content` package.
4. `Color` from the `android.graphics` package.
5. `ColorDrawable` from the `android.graphics.drawable` package.
6. `Bundle` from the `android.os` package.
7. `Html` from the `android.text` package.
8. `View` from the `android.view` package.
9. `Button` from the `android.widget` package.
10. `ImageView` from the `android.widget` package.
11. `RelativeLayout` from the `android.widget` package.
12. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class bmiactivity extends AppCompatActivity {



    TextView mbmidisplay,magedisplay,mweightdisplay,mheightdisplay,mbmicategory,mgender;
    Button mgotomain;
    Intent intent;

    ImageView mimageview;
    String mbmi;
    String cateogory;
    float intbmi;

    String height;
    String weight;

    float intheight,intweight;

    RelativeLayout mbackground;

    @SuppressLint("ResourceAsColor")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bmiactivity);
        getSupportActionBar().setElevation(0);
        ColorDrawable colorDrawable=new ColorDrawable(Color.parseColor("#1E1D1D"));
        getSupportActionBar().setBackgroundDrawable(colorDrawable);

     ///   ColorDrawable colorDrawable2=new ColorDrawable(Color.parseColor("#1E1D1D"));
  //      getSupportActionBar().setBackgroundDrawable(colorDrawable);


        getSupportActionBar().setTitle(Html.fromHtml("<font color=\"white\"></font>"));
        getSupportActionBar().setTitle("Result");


        intent=getIntent();
        mbmidisplay=findViewById(R.id.bmidisplay);
    //    magedisplay=findViewById(R.id.agedisplay);
    //    mweightdisplay=findViewById(R.id.weightdisplay);
        mbmicategory = findViewById(R.id.bmicategorydispaly);
        mgotomain=findViewById(R.id.gotomain);

        mimageview=findViewById(R.id.imageview);

     //   mheightdisplay=findViewById(R.id.heightdisplay);
        mgender=findViewById(R.id.genderdisplay);
        mbackground=findViewById(R.id.contentlayout);


        height=intent.getStringExtra("height");
        weight=intent.getStringExtra("weight");


        intheight=Float.parseFloat(height);
        intweight=Float.parseFloat(weight);

        intheight=intheight/100;
        intbmi=intweight/(intheight*intheight);


        mbmi=Float.toString(intbmi);
        System.out.println(mbmi);

        if(intbmi<16)
        {
            mbmicategory.setText("Severe Thinness");
        //   mbackground.setBackgroundColor(Color.GRAY);
            mbackground.setBackgroundColor(Color.RED);
            mimageview.setImageResource(R.drawable.crosss);
          //  mimageview.setBackground(colorDrawable2);

        }
        else if(intbmi<16.9 && intbmi>16)
        {
            mbmicategory.setText("Moderate Thinness");
            mbackground.setBackgroundColor(R.color.halfwarn);
            mimageview.setImageResource(R.drawable.warning);
         //   mimageview.setBackground(colorDrawable2);

        }
        else if(intbmi<18.4 && intbmi>17)
        {
            mbmicategory.setText("Mild Thinness");
            mbackground.setBackgroundColor(R.color.halfwarn);
            mimageview.setImageResource(R.drawable.warning);
       //   mimageview.setBackground(colorDrawable2);
        }
        else if(intbmi<24.9 && intbmi>18.5 )
        {
            mbmicategory.setText("Normal");
            mimageview.setImageResource(R.drawable.ok);
           // mbackground.setBackgroundColor(Color.YELLOW);
          //  mimageview.setBackground(colorDrawable2);
        }
        else if(intbmi <29.9 && intbmi>25)
        {
            mbmicategory.setText("Overweight");
            mbackground.setBackgroundColor(R.color.halfwarn);
            mimageview.setImageResource(R.drawable.warning);
            //mimageview.setBackground(colorDrawable2);
        }
        else if(intbmi<34.9 && intbmi>30)
        {
            mbmicategory.setText("Obese Class I");
            mbackground.setBackgroundColor(R.color.halfwarn);
            mimageview.setImageResource(R.drawable.warning);
          //  mimageview.setBackground(colorDrawable2);
        }
        else
        {
            mbmicategory.setText("Obese Class II");
            mbackground.setBackgroundColor(R.color.warn);
            mimageview.setImageResource(R.drawable.crosss);
          //  mimageview.setBackground(colorDrawable2);
        }

        //magedisplay.setText("your age is"+intent.getStringExtra("age"));
       //mheightdisplay.setText("Your Height is "+intent.getStringExtra("height"));
        //mweightdisplay.setText("Your Weight is "+intent.getStringExtra("weight"));
        mgender.setText(intent.getStringExtra("gender"));
        mbmidisplay.setText(mbmi);


        mgotomain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent1=new Intent(getApplicationContext(),MainActivity.class);
                startActivity(intent1);
            }
        });







    }
}

```

**(c). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `ContextCompat` from the `androidx.core.content` package.
3. `SuppressLint` from the `android.annotation` package.
4. `Intent` from the `android.content` package.
5. `Bundle` from the `android.os` package.
6. `View` from the `android.view` package.
7. `Button` from the `android.widget` package.
8. `ImageView` from the `android.widget` package.
9. `RelativeLayout` from the `android.widget` package.
10. `SeekBar` from the `android.widget` package.
11. `TextView` from the `android.widget` package.
12. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onProgressChanged(SeekBar`.
4. `onStartTrackingTouch(SeekBar`.
5. `onStopTrackingTouch(SeekBar`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {


    TextView mcurrentheight;
    TextView mcurrentweight,mcurrentage;
    ImageView mincrementage,mdecrementage,mincrementweight,mdecrementweight;
    SeekBar mseekbarforheight;
    Button mcalculatebmi;
    RelativeLayout mmale,mfemale;

    int intweight=55;
    int intage=22;
    int currentprogress;
    String mintprogress="170";
    String typerofuser="0";
    String weight2="55";
    String age2="22";

    @SuppressLint("ResourceAsColor")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportActionBar().hide();
        mcurrentage=findViewById(R.id.currentage);
        mcurrentweight=findViewById(R.id.currentweight);
        mcurrentheight=findViewById(R.id.currentheight);
        mincrementage=findViewById(R.id.incrementage);
        mdecrementage=findViewById(R.id.decrementage);
        mincrementweight=findViewById(R.id.incremetweight);
        mdecrementweight=findViewById(R.id.decrementweight);
        mcalculatebmi=findViewById(R.id.calculatebmi);
        mseekbarforheight=findViewById(R.id.seekbarforheight);
        mmale=findViewById(R.id.male);
        mfemale=findViewById(R.id.female);



        mmale.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                        mmale.setBackground(ContextCompat.getDrawable(getApplicationContext(),R.drawable.malefemalefocus));
                        mfemale.setBackground(ContextCompat.getDrawable(getApplicationContext(),R.drawable.malefemalenotfocus));
                        typerofuser="Male";

            }
        });


      mfemale.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              mfemale.setBackground(ContextCompat.getDrawable(getApplicationContext(),R.drawable.malefemalefocus));
              mmale.setBackground(ContextCompat.getDrawable(getApplicationContext(),R.drawable.malefemalenotfocus));
              typerofuser="Female";
          }
      });

        mseekbarforheight.setMax(300);
        mseekbarforheight.setProgress(170);
        mseekbarforheight.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

                currentprogress=progress;
                mintprogress=String.valueOf(currentprogress);
                mcurrentheight.setText(mintprogress);

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });


        mincrementweight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                intweight=intweight+1;
                weight2=String.valueOf(intweight);
                mcurrentweight.setText(weight2);
            }
        });

        mincrementage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                intage=intage+1;
                age2=String.valueOf(intage);
                mcurrentage.setText(age2);
            }
        });


        mdecrementage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                intage=intage-1;
                age2=String.valueOf(intage);
                mcurrentage.setText(age2);
            }
        });


        mdecrementweight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                intweight=intweight-1;
                 weight2=String.valueOf(intweight);
                mcurrentweight.setText(weight2);
            }
        });



        mcalculatebmi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(typerofuser.equals("0"))
                {
                    Toast.makeText(getApplicationContext(),"Select Your Gender First",Toast.LENGTH_SHORT).show();
                }
                else if(mintprogress.equals("0"))
                {
                    Toast.makeText(getApplicationContext(),"Select Your Height First",Toast.LENGTH_SHORT).show();
                }
                else if(intage==0 || intage<0)
                {
                    Toast.makeText(getApplicationContext(),"Age is Incorrect",Toast.LENGTH_SHORT).show();
                }

                else if(intweight==0|| intweight<0)
                {
                    Toast.makeText(getApplicationContext(),"Weight Is Incorrect",Toast.LENGTH_SHORT).show();
                }
                else {

                    Intent intent = new Intent(MainActivity.this, bmiactivity.class);
                    intent.putExtra("gender", typerofuser);
                    intent.putExtra("height", mintprogress);
                    intent.putExtra("weight", weight2);
                    intent.putExtra("age", age2);
                    startActivity(intent);

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
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/BMIcalculatorinAndroidStudio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/BMIcalculatorinAndroidStudio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|
