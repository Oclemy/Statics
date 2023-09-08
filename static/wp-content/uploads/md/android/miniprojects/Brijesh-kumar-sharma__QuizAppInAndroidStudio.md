# Quiz App AndroidStudio

>  This repository contains a normal quiz app which stores questions locally . It contains a score view with a horizontal progress bar. At the end of the app it contains a alert dialog box.

![Quiz App AndroidStudio Tutorial](https://user-images.githubusercontent.com/64765400/102950884-6a02c080-4480-11eb-8bb1-b6d286c46987.png)


Let us look at the full Quiz App AndroidStudio code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 2 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.example.quiztutorial"
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
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/splash"
    tools:context=".splash">

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="#272343"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/QuestionNumber"
        android:text="@string/question_number"
        android:layout_marginTop="30dp"
        android:textColor="#ffa384"
        android:textStyle="bold"
        android:textAlignment="center"
        android:textSize="20sp"
        >

    </TextView>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        >

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/selctedoption"
            android:visibility="gone"
            android:id="@+id/selectoption"
            android:textAlignment="center"
            android:textColor="#ffffff">

        </TextView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/CorrectAnswer"
            android:textColor="#ffffff"
            android:visibility="gone"
            android:textAlignment="center"
            android:text="@string/correctanswer"
 >

        </TextView>

    </LinearLayout>


    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:paddingLeft="50dp"
        android:paddingRight="50dp"
        android:layout_marginBottom="60dp"
        android:layout_marginTop="70dp"
        android:gravity="center">


        <TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textColor="#ffffff"
            android:id="@+id/question"
            android:text="@string/question_1"
            android:textSize="25sp">

        </TextView>


    </LinearLayout>

<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/FirstTwoOption"
    android:layout_gravity="center"
    android:paddingLeft="50dp"
    android:paddingRight="50dp"
    android:orientation="vertical">


    <TextView
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:id="@+id/optionA"
        android:text="@string/question1_A"
        android:background="@drawable/optiondesign"
        android:textColor="#272343"
        android:textAlignment="center"
        android:paddingTop="14dp"
        >

    </TextView>
    <TextView
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:id="@+id/optionB"
        android:text="@string/question1_B"
        android:background="@drawable/optiondesign"
        android:layout_marginTop="10dp"
        android:textColor="#272343"
        android:textAlignment="center"
        android:paddingTop="14dp"
        >

    </TextView>




</LinearLayout>


    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/RemainingTwoOption"
        android:layout_gravity="center"
        android:paddingLeft="50dp"
        android:paddingRight="50dp"
        android:layout_marginBottom="30dp"
        android:orientation="vertical">


        <TextView
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:id="@+id/optionC"
            android:text="@string/question1_C"
            android:background="@drawable/optiondesign"
            android:layout_marginTop="10dp"
            android:textColor="#272343"
            android:textAlignment="center"
            android:paddingTop="14dp"
            >

        </TextView>
        <TextView
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:id="@+id/optionD"
            android:text="@string/question1_D"
            android:background="@drawable/optiondesign"
            android:textColor="#272343"
            android:layout_marginTop="10dp"
            android:textAlignment="center"
            android:paddingTop="14dp"
            >

        </TextView>




    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:layout_marginTop="20dp">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/score"
            android:textStyle="bold"
            android:textColor="#ffffff"
            android:text="@string/score"
            android:layout_gravity="end"
            android:padding="10dp"/>


        <ProgressBar
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:backgroundTint="#ffa384"
            android:layout_gravity="bottom"
            android:id="@+id/progress_bar"
            style="@android:style/Widget.ProgressBar.Horizontal"
            android:indeterminate="false">

        </ProgressBar>




    </LinearLayout>









</LinearLayout>
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
4. `Window` from the `android.view` package.
5. `WindowManager` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

public class splash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_splash);

        logo logo = new logo();
        logo.start();

    }

    private class logo extends Thread
    {
        public void run()
        {
            try {

                    sleep(2000);


            }
            catch (InterruptedException e)
            {
                e.printStackTrace();
            }
            Intent intent = new Intent(splash.this,MainActivity.class);
            startActivity(intent);
            splash.this.finish();
        }
    }



}

```

**(b). `answerclass.java`**

> Our `answerclass` class.

Create a java file named `answerclass.java`.

We will be creating the following methods:

1. `getOptionA()` - It will return `int` object.

2. `getOptionB()` - It will return `int` object.

3. `getOptionC()` - It will return `int` object.

4. `getOptionD()` - It will return `int` object.

5. `getQuestionid()` - It will return `int` object.

6. `getAnswerid()` - It will return `int` object.

**(a). Our `getOptionD()` method.**

A method to get option d:

```java
    public int getOptionD() {
        return optionD;
    }
```

**(b). Our `getAnswerid()` method.**

A method to get answerid:

```java
    public int getAnswerid() {
        return answerid;
    }
```

**(c). Our `getQuestionid()` method.**

A method to get questionid:

```java
    public int getQuestionid() {
        return questionid;
    }
```

**(d). Our `getOptionB()` method.**

A method to get option b:

```java
    public int getOptionB() {
        return optionB;
    }
```

**(e). Our `getOptionC()` method.**

A method to get option c:

```java
    public int getOptionC() {
        return optionC;
    }
```

**(f). Our `getOptionA()` method.**

A method to get option a:

```java
    public int getOptionA() {
        return optionA;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

public class answerclass {

    private int optionA,optionB,optionC,optionD,questionid,answerid;

    public answerclass(int questionide,int optiona,int optionb,int optionc,int optiond,int answeride)
    {
        questionid=questionide;
        optionA=optiona;
        optionB=optionb;
        optionC=optionc;
        optionD=optiond;
        answerid=answeride;



    }


    public int getOptionA() {
        return optionA;
    }

    public int getOptionB() {
        return optionB;
    }

    public int getOptionC() {
        return optionC;
    }

    public int getOptionD() {
        return optionD;
    }

    public int getQuestionid() {
        return questionid;
    }

    public int getAnswerid() {
        return answerid;
    }
}


```

**(c). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AlertDialog` from the `androidx.appcompat.app` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `SuppressLint` from the `android.annotation` package.
4. `DialogInterface` from the `android.content` package.
5. `Bundle` from the `android.os` package.
6. `View` from the `android.view` package.
7. `ProgressBar` from the `android.widget` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onClick(DialogInterface`.

We will be creating the following methods:

1. `checkAnswer(int userSelection)`.

2. `updateQuestion()`.

**(a). Our `checkAnswer()` method.**

A method to check answer:

```java
    private void checkAnswer(int userSelection) {

        int correctanswer=questionBank[currentIndex].getAnswerid();

        chechkout1.setText(userSelection);
        checkout2.setText(correctanswer);

        String m= chechkout1.getText().toString().trim();
        String n=checkout2.getText().toString().trim();

        if(m.equals(n))
        {
            Toast.makeText(getApplicationContext(),"Right",Toast.LENGTH_SHORT).show();
            mscore=mscore+1;
        }
        else
        {
            Toast.makeText(getApplicationContext(),"Wrong",Toast.LENGTH_SHORT).show();
        }




    }
```

**(b). Our `updateQuestion()` method.**

A method to update question:

```java
    private void updateQuestion() {

        currentIndex=(currentIndex+1)%questionBank.length;

        if(currentIndex==0)
        {

            AlertDialog.Builder alert=new AlertDialog.Builder(this);
            alert.setTitle("Game Over");
            alert.setCancelable(false);
            alert.setMessage("Your Score" + mscore +"points");
            alert.setPositiveButton("Close Application", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                }
            });

            alert.setNegativeButton("No", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    mscore=0;
                    qn=1;
                    progressBar.setProgress(0);
                    score.setText("Score" + mscore +"/" +questionBank.length);
                    questionnumber.setText(qn + "/" + questionBank.length +"Question");
                }
            });

         alert.show();

        }



        CurrentQuestion=questionBank[currentIndex].getQuestionid();
        question.setText(CurrentQuestion);
        CurrentOptionA=questionBank[currentIndex].getOptionA();
        optionA.setText(CurrentOptionA);
        CurrentOptionB=questionBank[currentIndex].getOptionB();
        optionB.setText(CurrentOptionB);
        CurrentOptionC=questionBank[currentIndex].getOptionC();
        optionC.setText(CurrentOptionC);
        CurrentOptionD=questionBank[currentIndex].getOptionD();
        optionD.setText(CurrentOptionD);

        qn=qn+1;

        if(qn<=questionBank.length)

        {
            questionnumber.setText(qn + "/" + questionBank.length +"Question");
        }
        score.setText("Score" + mscore +"/" +questionBank.length);
        progressBar.incrementProgressBy(PROGRESS_BAR);


    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private TextView optionA,optionB,optionC,optionD;
    private TextView questionnumber,question,score;
    private TextView chechkout1,checkout2;
    int currentIndex;
    int mscore=0;
    int qn=1;
    ProgressBar progressBar;

    int CurrentQuestion,CurrentOptionA,CurrentOptionB,CurrentOptionC,CurrentOptionD;



    private answerclass[] questionBank= new answerclass[]
            {
                new answerclass(R.string.question_1,R.string.question1_A,R.string.question1_B,R.string.question1_C,R.string.question1_D,R.string.answer_1),
                new answerclass(R.string.question_2,R.string.question_2A,R.string.question_2B,R.string.question_2C,R.string.question_2D,R.string.answer_2),
                    new answerclass(R.string.question_3,R.string.question_3A,R.string.question_3B,R.string.question_3C,R.string.question_3D,R.string.answer_3),
                    new answerclass(R.string.question_4,R.string.question_4A,R.string.question_4B,R.string.question_4C,R.string.question_4D,R.string.answer_4),
                    new answerclass(R.string.question_5,R.string.question_5A,R.string.question_5B,R.string.question_5C,R.string.question_5D,R.string.answer_5),
                    new answerclass(R.string.question_6,R.string.question_6A,R.string.question_6B,R.string.question_6C,R.string.question_6D,R.string.answer_6),
                    new answerclass(R.string.question_7,R.string.question_7A,R.string.question_7B,R.string.question_7C,R.string.question_7D,R.string.answer_7),
                    new answerclass(R.string.question_8,R.string.question_8A,R.string.question_8B,R.string.question_8C,R.string.question_8D,R.string.answer_8),




            };

    final int PROGRESS_BAR = (int) Math.ceil(100/questionBank.length);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        optionA=findViewById(R.id.optionA);
        optionB=findViewById(R.id.optionB);
        optionC=findViewById(R.id.optionC);
        optionD=findViewById(R.id.optionD);

        question = findViewById(R.id.question);
        score=findViewById(R.id.score);
        questionnumber=findViewById(R.id.QuestionNumber);

        chechkout1=findViewById(R.id.selectoption);
        checkout2=findViewById(R.id.CorrectAnswer);
        progressBar=findViewById(R.id.progress_bar);

        CurrentQuestion=questionBank[currentIndex].getQuestionid();
        question.setText(CurrentQuestion);
        CurrentOptionA=questionBank[currentIndex].getOptionA();
        optionA.setText(CurrentOptionA);
        CurrentOptionB=questionBank[currentIndex].getOptionB();
        optionB.setText(CurrentOptionB);
        CurrentOptionC=questionBank[currentIndex].getOptionC();
        optionC.setText(CurrentOptionC);
        CurrentOptionD=questionBank[currentIndex].getOptionD();
        optionD.setText(CurrentOptionD);

        optionA.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkAnswer(CurrentOptionA);
                updateQuestion();

            }
        });

        optionB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkAnswer(CurrentOptionB);
                updateQuestion();


            }
        });
        optionC.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkAnswer(CurrentOptionC);
                updateQuestion();


            }
        });
        optionD.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                checkAnswer(CurrentOptionD);
                updateQuestion();

            }
        });
        











    }

    private void checkAnswer(int userSelection) {

        int correctanswer=questionBank[currentIndex].getAnswerid();

        chechkout1.setText(userSelection);
        checkout2.setText(correctanswer);

        String m= chechkout1.getText().toString().trim();
        String n=checkout2.getText().toString().trim();

        if(m.equals(n))
        {
            Toast.makeText(getApplicationContext(),"Right",Toast.LENGTH_SHORT).show();
            mscore=mscore+1;
        }
        else
        {
            Toast.makeText(getApplicationContext(),"Wrong",Toast.LENGTH_SHORT).show();
        }




    }

    @SuppressLint("SetTextI18n")
    private void updateQuestion() {

        currentIndex=(currentIndex+1)%questionBank.length;

        if(currentIndex==0)
        {

            AlertDialog.Builder alert=new AlertDialog.Builder(this);
            alert.setTitle("Game Over");
            alert.setCancelable(false);
            alert.setMessage("Your Score" + mscore +"points");
            alert.setPositiveButton("Close Application", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                }
            });

            alert.setNegativeButton("No", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    mscore=0;
                    qn=1;
                    progressBar.setProgress(0);
                    score.setText("Score" + mscore +"/" +questionBank.length);
                    questionnumber.setText(qn + "/" + questionBank.length +"Question");
                }
            });

         alert.show();

        }



        CurrentQuestion=questionBank[currentIndex].getQuestionid();
        question.setText(CurrentQuestion);
        CurrentOptionA=questionBank[currentIndex].getOptionA();
        optionA.setText(CurrentOptionA);
        CurrentOptionB=questionBank[currentIndex].getOptionB();
        optionB.setText(CurrentOptionB);
        CurrentOptionC=questionBank[currentIndex].getOptionC();
        optionC.setText(CurrentOptionC);
        CurrentOptionD=questionBank[currentIndex].getOptionD();
        optionD.setText(CurrentOptionD);

        qn=qn+1;

        if(qn<=questionBank.length)

        {
            questionnumber.setText(qn + "/" + questionBank.length +"Question");
        }
        score.setText("Score" + mscore +"/" +questionBank.length);
        progressBar.incrementProgressBy(PROGRESS_BAR);


    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/QuizAppInAndroidStudio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/QuizAppInAndroidStudio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|
