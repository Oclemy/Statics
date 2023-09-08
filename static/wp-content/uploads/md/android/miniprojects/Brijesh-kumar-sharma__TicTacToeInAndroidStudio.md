# TicTacToe Android Studio

>  This is Tic Tac Toe Game which created in Android Studio Using Java.

This is the basic design of App in Playing Condition
![TicTacToe Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/111019763-1d8b9a80-8376-11eb-86ea-99869b8229a4.png)


It also contains the logic if no one wins then how to handle condtion
![TicTacToe Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/111019765-21b7b800-8376-11eb-9ea7-a549924877b5.png)


It Can increment the score if someone wins
![TicTacToe Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/111019769-254b3f00-8376-11eb-8c1f-6583d13ab194.png)


The design is very sleek and it contains reset button to reset everything
![TicTacToe Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/111019781-29775c80-8376-11eb-9fe3-53e21ed89e5e.png)


It Contains A Beautiful Splash Screen
![TicTacToe Android Studio Tutorial](https://user-images.githubusercontent.com/64765400/111019784-2da37a00-8376-11eb-9077-265724237a1d.png)


Let us look at the full TicTacToe Android Studio code.

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
        applicationId "com.example.tictactoetutorial"
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

    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.2.1'
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
    android:background="#fff0f0"
    tools:context=".splash">

    <ImageView
        android:layout_width="400dp"
        android:layout_height="400dp"
        android:src="@drawable/ic_tictactoe"
        android:layout_centerInParent="true">

    </ImageView>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Tic Tac Toe"
        android:fontFamily="@font/raleway"
        android:textColor="@color/black"
        android:textSize="25sp"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="110dp">

    </TextView>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="play with fun"
        android:textColor="#545454"
        android:fontFamily="@font/playlist"
        android:textSize="40sp"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="40dp">

    </TextView>

</RelativeLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`Button`](https://android.examples.directory/button)
3. [`LinearLayout`](https://android.examples.directory/linearlayout)
4. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#343e56"
    tools:context=".MainActivity">

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn5"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage5">

        </ImageView>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn4"
        android:layout_toLeftOf="@id/btn5"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage4">

        </ImageView>

    </RelativeLayout>
    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn6"
        android:layout_toRightOf="@id/btn5"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage6">

        </ImageView>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="330dp"
        android:layout_height="8dp"
        android:background="#F69e78"
        android:layout_centerHorizontal="true"
        android:layout_above="@id/btn5"
        android:layout_marginBottom="8dp">

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="330dp"
        android:layout_height="8dp"
        android:background="#F69e78"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/btn5"
        android:layout_marginTop="8dp">

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="8dp"
        android:layout_height="350dp"
        android:background="#F69e78"
        android:layout_centerVertical="true"
        android:layout_toLeftOf="@id/btn5"
       android:layout_marginRight="-14dp">

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="8dp"
        android:layout_height="350dp"
        android:background="#F69e78"
        android:layout_centerVertical="true"
        android:layout_toRightOf="@id/btn5"
        android:layout_marginLeft="-14dp">

    </RelativeLayout>


    <Button
        android:layout_width="320dp"
        android:layout_height="50dp"
        android:layout_below="@+id/btn8"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="80dp"
        android:text="Reset"
        android:id="@+id/Reset"
        android:textSize="15sp"
        android:textColor="@color/white"
       android:backgroundTint="@color/purple_200">

    </Button>

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn8"
        android:layout_below="@id/btn5"
        android:layout_marginTop="20dp"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage8">

        </ImageView>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn7"
        android:layout_below="@id/btn5"
        android:layout_marginTop="20dp"

        android:layout_toLeftOf="@id/btn8"

        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage7">

        </ImageView>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn9"
        android:layout_below="@id/btn5"
        android:layout_marginTop="20dp"

        android:layout_toRightOf="@id/btn8"

        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage9">

        </ImageView>

    </RelativeLayout>




    <LinearLayout
        android:layout_width="250dp"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingRight="40dp"
        android:paddingLeft="40dp"
        android:layout_marginTop="40dp"
        android:layout_centerHorizontal="true"
        >


        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Score X :- 0"
            android:textSize="30sp"
            android:textColor="@color/white"
            android:textStyle="bold"
            android:id="@+id/ScoreX"
            >

        </TextView>
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Score Y :- 0"
            android:textSize="30sp"
            android:textColor="@color/white"
            android:textStyle="bold"
            android:id="@+id/ScoreY"
            >

        </TextView>

    </LinearLayout>


    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn2"
        android:layout_above="@id/btn5"
        android:layout_marginBottom="20dp"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage2">

        </ImageView>

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn1"
        android:layout_above="@id/btn5"
        android:layout_marginBottom="20dp"
        android:layout_toLeftOf="@id/btn2"
        android:background="#343e56">

        <ImageView
            android:id="@+id/buttonImage1"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            >

        </ImageView>

    </RelativeLayout>


    <RelativeLayout
        android:layout_width="90dp"
        android:layout_height="90dp"
        android:layout_centerInParent="true"
        android:id="@+id/btn3"
        android:layout_above="@id/btn5"
        android:layout_marginBottom="20dp"
        android:layout_toRightOf="@id/btn2"
        android:background="#343e56">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"

            android:id="@+id/buttonImage3">

        </ImageView>

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
2. `Manifest` from the `android` package.
3. `Intent` from the `android.content` package.
4. `Bundle` from the `android.os` package.
5. `Handler` from the `android.os` package.
6. `WindowManager` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `run()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
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

**(b). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AlertDialog` from the `androidx.appcompat.app` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `DialogInterface` from the `android.content` package.
4. `Bundle` from the `android.os` package.
5. `View` from the `android.view` package.
6. `Button` from the `android.widget` package.
7. `ImageView` from the `android.widget` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onClick(DialogInterface`.

We will be creating the following methods:

1. `resetValues()`.

**(a). Our `resetValues()` method.**

A method to reset values:

```java
    private void resetValues() {

        b1=5;
        b2=5;;
        b3=5;
        b4=5;
        b5=5;
        b6=5;
        b7=5;
        b8=5;
        b9=5;
        i=0;
         c1=0;
       c2=0;

        c3=0;
        c4=0;
        c5=0;
        c6=0;
        c7=0;
        c8=0;
        c9=0;




    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    ImageView button1,button2,button3,button4,button5,button6,button7,button8,button9;
    private String startGame="X";
    int b1=5,b2=5,b3=5,b4=5,b5=5,b6=5,b7=5,b8=5,b9=5,xCount=0,oCount=0,i=0;
    int c1=0,c2=0,c3=0,c4=0,c5=0,c6=0,c7=0,c8=0,c9=0;
    private TextView scorex,scoreo;
    private Button Reset;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button1=findViewById(R.id.buttonImage1);
        button2=findViewById(R.id.buttonImage2);

        button3=findViewById(R.id.buttonImage3);

        button4=findViewById(R.id.buttonImage4);

        button5=findViewById(R.id.buttonImage5);
        button6=findViewById(R.id.buttonImage6);
        button7=findViewById(R.id.buttonImage7);
        button8=findViewById(R.id.buttonImage8);
        button9=findViewById(R.id.buttonImage9);

        scorex = findViewById(R.id.ScoreX);
        scoreo = findViewById(R.id.ScoreY);

        Reset=findViewById(R.id.Reset);

        Reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                button1.setImageDrawable(null);
                button2.setImageDrawable(null);
                button3.setImageDrawable(null);
                button4.setImageDrawable(null);
                button5.setImageDrawable(null);
                button6.setImageDrawable(null);
                button7.setImageDrawable(null);
                button8.setImageDrawable(null);
                button9.setImageDrawable(null);
                resetValues();
                xCount=0;
                oCount=0;
                scorex.setText("Score X :- "+String.valueOf(xCount));
                scoreo.setText("Score Y :- "+String.valueOf(oCount));
            }
        });

        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(c1==0) {



                    if (startGame.equals("X")) {
                        button1.setImageResource(R.drawable.cross);
                        b1 = 1;
                        i++;
                        c1=1;
                    } else {
                        button1.setImageResource(R.drawable.circle);
                        b1 = 0;
                        i++;
                        c1=1;
                    }
                    choosePlayer();
                    winningGame();

                }
                else
                {
                    Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
                }

            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c2==0)
                {


                if(startGame.equals("X"))
                {
                    button2.setImageResource(R.drawable.cross);
                    b2=1;
                    i++;
                    c2=1;
                }
                else
                {
                    button2.setImageResource(R.drawable.circle);
                    b2=0;
                    i++;
                    c2=1;
                }
                choosePlayer();
                winningGame();

            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }

            }
        });

        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c3==0)
                {


                if(startGame.equals("X"))
                {
                    button3.setImageResource(R.drawable.cross);
                    b3=1;
                    i++;
                    c3=1;
                }
                else
                {
                    button3.setImageResource(R.drawable.circle);
                    b3=0;
                    i++;
                    c3=1;
                }
                choosePlayer();
                winningGame();

            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }


            }
        });

        button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(c4==0)
                {

                if(startGame.equals("X"))
                {
                    button4.setImageResource(R.drawable.cross);
                    b4=1;
                    i++;
                    c4=1;
                }
                else
                {
                    button4.setImageResource(R.drawable.circle);
                    b4=0;
                    i++;
                    c4=1;
                }
                choosePlayer();
               winningGame();


            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }

            }
        });

        button5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c5==0)
                {

                if(startGame.equals("X"))
                {
                    button5.setImageResource(R.drawable.cross);
                    b5=1;
                    i++;
                    c5=1;
                }
                else
                {
                    button5.setImageResource(R.drawable.circle);
                    b5=0;
                    i++;
                    c5=1;
                }
                choosePlayer();
                winningGame();

            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }

            }
        });


        button6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c6==0)
                {

                if(startGame.equals("X"))
                {
                    button6.setImageResource(R.drawable.cross);
                    b6=1;
                    i++;
                    c6=1;
                }
                else
                {
                    button6.setImageResource(R.drawable.circle);
                    b6=0;
                    i++;
                    c6=1;
                }
                choosePlayer();
                winningGame();


            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }
            }
        });


        button7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(c7==0)
                {

                if(startGame.equals("X"))
                {
                    button7.setImageResource(R.drawable.cross);
                    b7=1;
                    i++;
                    c7=1;
                }
                else
                {
                    button7.setImageResource(R.drawable.circle);
                    b7=0;
                    i++;
                    c7=1;
                }
                choosePlayer();
                winningGame();


            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }
            }
        });

        button8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c8==0)
                {

                if(startGame.equals("X"))
                {
                    button8.setImageResource(R.drawable.cross);
                    b8=1;
                    i++;
                    c8=1;
                }
                else
                {
                    button8.setImageResource(R.drawable.circle);
                    b8=0;
                    i++;
                    c8=1;
                }
                choosePlayer();
                winningGame();

            }
                else
            {
                Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
            }

            }
        });

        button9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(c9==0)
                {

                if(startGame.equals("X"))
                {
                    button9.setImageResource(R.drawable.cross);
                    b9=1;
                    i++;
                    c9=1;
                }
                else
                {
                    button9.setImageResource(R.drawable.circle);
                    b9=0;
                    i++;
                    c9=1;
                }
                choosePlayer();
                winningGame();

                }
                else
                {
                    Toast.makeText(MainActivity.this,"Button Already Pressed",Toast.LENGTH_SHORT).show();
                }

            }
        });


    }





    private void winningGame()
    {


        if((b1==1) && (b2==1) && (b3==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));


        }


        else if((b4==1) && (b5==1) && (b6==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));


        }


      else  if((b7==1) && (b8==1) && (b9==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));





        }

        else  if((b1==1) && (b4==1) && (b7==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));





        }


        else  if((b2==1) && (b5==1) && (b8==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));





        }


        else  if((b3==1) && (b6==1) && (b9==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));





        }


        else  if((b1==1) && (b5==1) && (b9==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));





        }

        else  if((b3==1) && (b5==1) && (b7==1))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player X Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            xCount++;
            scorex.setText("Score X :- "+String.valueOf(xCount));


        }

        else  if((b1==0) && (b2==0) && (b3==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }
        else  if((b4==0) && (b5==0) && (b6==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }



        else  if((b7==0) && (b8==0) && (b9==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }


        else  if((b1==0) && (b4==0) && (b7==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }

        else  if((b2==0) && (b5==0) && (b8==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }
        else  if((b3==0) && (b6==0) && (b9==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }
        else  if((b1==0) && (b5==0) && (b9==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }

        else  if((b3==0) && (b5==0) && (b7==0))
        {

            AlertDialog.Builder builder=new AlertDialog.Builder(this);
            builder.setMessage("Player O Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    button1.setImageDrawable(null);
                    button2.setImageDrawable(null);
                    button3.setImageDrawable(null);
                    button4.setImageDrawable(null);
                    button5.setImageDrawable(null);
                    button6.setImageDrawable(null);
                    button7.setImageDrawable(null);
                    button8.setImageDrawable(null);
                    button9.setImageDrawable(null);
                    resetValues();
                }
            });

            AlertDialog alertDialog=builder.create();
            alertDialog.show();
            oCount++;
            scoreo.setText("Score Y :- "+String.valueOf(oCount));

        }

        else
        {
            if(i==9)
            {
                AlertDialog.Builder builder=new AlertDialog.Builder(this);
                builder.setMessage("No One Wins").setCancelable(false).setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        button1.setImageDrawable(null);
                        button2.setImageDrawable(null);
                        button3.setImageDrawable(null);
                        button4.setImageDrawable(null);
                        button5.setImageDrawable(null);
                        button6.setImageDrawable(null);
                        button7.setImageDrawable(null);
                        button8.setImageDrawable(null);
                        button9.setImageDrawable(null);
                        resetValues();
                    }
                });

                AlertDialog alertDialog=builder.create();
                alertDialog.show();
            }

        }

    }


    private void choosePlayer()
    {
        if(startGame.equals("X"))
        {
            startGame="O";
        }
        else
        {
            startGame="X";
        }
    }



    private void resetValues() {

        b1=5;
        b2=5;;
        b3=5;
        b4=5;
        b5=5;
        b6=5;
        b7=5;
        b8=5;
        b9=5;
        i=0;
         c1=0;
       c2=0;

        c3=0;
        c4=0;
        c5=0;
        c6=0;
        c7=0;
        c8=0;
        c9=0;




    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/TicTacToeInAndroidStudio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/TicTacToeInAndroidStudio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|
