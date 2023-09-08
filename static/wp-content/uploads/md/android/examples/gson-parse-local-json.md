# GSON - How to Parse Local JSON File

>  This is an android example of how to parse JSON file in GSON.

Gson is a Java library that can be used to convert Java Objects into their JSON representation. 

Gson can work with arbitrary Java objects including pre-existing objects that you do not have source-code of. There are a few open-source projects that can convert Java objects to JSON.

However, most of them require that you place Java annotations in your classes; something that you can not do if you do not have access to the source-code. Most also do not fully support the use of Java Generics. This library considers both of these as very important design goals.

In this lesson you will learn how to parse a local JSON file using GSON. GSON is the most popular JSON parsing library. You can use it to parse all sorts of JSON data in android and java in general. In this particular we wanna show you how to specifically parse local JSON data. By local we mean data stored under the `raw` folder inside the `res` directory.



### Step 1: Install Gson

The first step is to install GSON. As popular as it is, GSON is a third party library. It was originally created by Google. It's been around for almost a decade so you can trust even in a production app.

Simply declare it in your `app/build.gradle` and sync.

Use the following implementation statement to install it. You can use a later version.

```groovy
//Install our GSON
//You can use a later version
implementation 'com.google.code.gson:gson:2.5'
```

### Step 2: Add JSON file

The second step is to add some JSON data to the `raw` directory. In your `res` directory create a `raw` folder and inside it add the shown JSON file. What you are seeing is a JSON object. It has three properties: a module name, a teacher and a semester. The Teacher itself is a JSON object. The module name is a string, while the semester is an integer.

#### /raw/course.json

```json
{
  "module_name": "Mobile Application Development",
  "teacher": {
    "first_name": "Nguyên",
    "last_name": "Baylatry"
  },
  "semester": 8
}

```

### Step 3: Design Layout

Next design your main layout with a bunch of TextViews inside a RelativeLayout. The target layout is the `activity_main xml` layout. These textviews will show the individual values of our JSON object. Our root element is the RelativeLayout. Then 2, 3 and 4 represent our TextViews. That's all we need to design our layout.

##### activity_main.xml

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="fr.esilv.gsonexample.MainActivity">

    <TextView
        android:id="@+id/moduleNameTextView"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

    <TextView
        android:id="@+id/teacherTextView"
        style="@style/TextAppearance.AppCompat.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/moduleNameTextView"/>

    <TextView
        android:id="@+id/semesterNameTextView"
        style="@style/TextAppearance.AppCompat.Medium"
        android:layout_width="wrap_content"
        android:layout_below="@+id/teacherTextView"
        android:layout_height="wrap_content"/>
</RelativeLayout>

```

### Step 4: Create Models

Create two model class as shown below:

**(a). Teacher.java**

A Teacher class to represent a single teacher. Each teacher will have a first name and a last name. Take note of the `SerializedName` annotations decorated on those properties and keys passed to them.

```java
package fr.esilv.gsonexample.models;


import com.google.gson.annotations.SerializedName;

public class Teacher {
    @SerializedName("first_name")
    private String firstName;
    @SerializedName("last_name")
    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}

```









**(b). Course.java**

We also have a course model class. It has the module name, teacher and semester as the properties. Only the module name in this case will be serialized. Our whole JSON object will be mapped to this particular class. You can see it also includes the Teacher object which too has properties serialized.

```java
package fr.esilv.gsonexample.models;


import com.google.gson.annotations.SerializedName;

public class Course {
    @SerializedName("module_name")
    private String moduleName;
    private Teacher teacher;
    private int semester;

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }
}

```

### Step 5: Load JSON

Our last step will be to load our JSON. We do this inside of our `MainActivity`. Proceed to the class, add imports. Then extend the AppCompatActivity. As instance fields, declare our `TextViews`. 

Then inside the `onCreate` method, reference them. To load our JSON data, invoke the initialize data function. In that function we load our JSON data, by first invoking `openRawResources` method. Inside the method we pass the ID of the JSON file.

This function will return an InputStream. We then instantiate a `ByteArrayOutputStream`. We will be writing the data we are reading from InputStream into this `ByteArrayOutputStream`. We do this, inside a try-catch block, so that we catch any `IO Exception`. We then convert the `ByteArrayOutputStream` object into a string, using the `toString` method. 

Then by invoking the `from JSON` method, and passing the `ByteArrayOutputStream` object, we will get a Course object. That's how load a JSON file from the raw folder using Google JSON library. 
**MainActivity.java**

```java
package fr.esilv.gsonexample;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;
import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import fr.esilv.gsonexample.models.Course;
import fr.esilv.gsonexample.models.Teacher;

public class MainActivity extends AppCompatActivity {

    private TextView moduleNameTextView;
    private TextView teacherTextView;
    private TextView semesterNameTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        moduleNameTextView = (TextView) findViewById(R.id.moduleNameTextView);
        teacherTextView = (TextView) findViewById(R.id.teacherTextView);
        semesterNameTextView = (TextView) findViewById(R.id.semesterNameTextView);

        initializeData();
    }

    private void initializeData() {
        //get the raw Json as A Stream
        InputStream courseAsInputStream = getResources().openRawResource(R.raw.course);

        //get a String from the Stream
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        int i;
        try {
            i = courseAsInputStream.read();
            while (i != -1) {
                byteArrayOutputStream.write(i);
                i = courseAsInputStream.read();
            }
            courseAsInputStream.close();
        } catch (IOException e) {

            e.printStackTrace();
        }

        String courseAsString = byteArrayOutputStream.toString();

        //parse the String as an Object using Gson
        Gson gson = new Gson();
        Course course = gson.fromJson(courseAsString, Course.class);

        //populate the View
        if (course != null) {
            moduleNameTextView.setText(course.getModuleName());
            Teacher teacher = course.getTeacher();
            teacherTextView.setText(getString(R.string.teacher, teacher.getFirstName(), teacher.getLastName()));
            semesterNameTextView.setText(getString(R.string.semester, course.getSemester()));
        }
    }
}

```

### Reference

> Download full code [here](https://github.com/nguyen-baylatry-esilv/gson-example/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/nguyen-baylatry-esilv/).
