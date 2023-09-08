# Android Files - Write, Read and Delete - Examples

In this tutorial we will explore how to write into and read and delete from files in Android. These files are saved to and read from the internal storage.


## Example 1: Write,Read,Delete Files with Runtime Permissions

A simple example written in Java on how to read from or write into Files in Android. We also handle runtime permissions appropriately. We will read, write and delete in a background thread using AsyncTask.

Here is a demo of the created project:

![read_write_delete_files](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/10/read_write_delete_files.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependency is needed.

### Step 3: Design Layout

Design your MainActivity layout by including Button, EditText and TextView as widgets as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout
    tools:context="com.example.ankitkumar.asynctask.MainActivity"
    android:background="#F58F"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    android:id="@+id/activity_main"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">

<LinearLayout
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    android:id="@+id/ll_for_enter_data"
    android:weightSum="3"
    android:orientation="horizontal">

    <EditText
        android:background="#ffffF1"
        android:layout_height="75dp"
        android:layout_width="0dp"
        android:id="@+id/ed_enter_data"
        android:layout_weight="2.25"/>

    <Button
        android:layout_height="75dp"
        android:layout_width="0dp"
        android:id="@+id/button_add"
        android:layout_weight="0.75"
        android:text="Add Data"/>

</LinearLayout>

<TextView
    android:layout_height="wrap_content"
    android:layout_width="wrap_content"
    android:id="@+id/tv_title"
    android:text="Content from file"
    android:textColor="#eae8c2"
    android:layout_centerHorizontal="true"
    android:layout_marginTop="10dp"
    android:layout_below="@+id/ll_for_enter_data"
    android:textSize="18sp"/>

<TextView
    android:background="#303F9F"
    android:layout_height="100dp"
    android:layout_width="match_parent"
    android:id="@+id/tv_show_data"
    android:text="Data from file"
    android:textColor="#000000"
    android:layout_marginTop="10dp"
    android:layout_below="@+id/tv_title"
    android:textSize="16sp"/>

<Button
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    android:id="@+id/button_delete"
    android:text="Delete File"
    android:layout_alignParentStart="true"
    android:layout_alignParentLeft="true"
    android:layout_centerVertical="true"/>

</RelativeLayout>
```

### Step 4: Write Code

The following method will allow us to check for permissions at runtime and ask the user for them:

```java
    private void askForPermission(String permission, Integer requestCode) {
        if (ContextCompat.checkSelfPermission(MainActivity.this, permission) != PackageManager.PERMISSION_GRANTED) {
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this, permission)) {
                //This is called if user has denied the permission before
                //In this case I am just asking the permission again
                ActivityCompat.requestPermissions(MainActivity.this, new String[]{permission}, requestCode);
            } else {
                ActivityCompat.requestPermissions(MainActivity.this, new String[]{permission}, requestCode);
            }
        } else {
            //Toast.makeText(this, "" + permission + " is already granted.", Toast.LENGTH_SHORT).show();
        }
    }
```

And when granted permission we either write to the filesystem or read from it:

```java
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(ActivityCompat.checkSelfPermission(this, permissions[0]) == PackageManager.PERMISSION_GRANTED){
            switch (requestCode) {

                case 3:
                    writeFile();
                    break;
                //Read External Storage
                case 4:
                    Intent imageIntent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    startActivityForResult(imageIntent, 11);
                    break;
            }

            Toast.makeText(this, "Permission granted", Toast.LENGTH_SHORT).show();
        }else{
            Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show();
        }
    }
```

The following method will allow us write into a File using the `FileOutputStream` class. In this case we are writing the text the user types in an edittext to the Filesystem:

```java
    public void writeFile(){
        // write on SD card file data in the text box
        try {
            FileOutputStream fOut = new FileOutputStream(myFile);
            final OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            String temp=editTextForSave.getText().toString();

            myOutWriter.append(temp);
            myOutWriter.append("\n");

            myOutWriter.close();
            fOut.close();
            Log.e("MA : ","Done writing SD");

        } catch (Exception e) {
            Log.e("catch : ",e.getMessage());
        }

    }
```

The following function will allow us to read from the filesystem and show in a TextView:

```java
    public void showData(){
        try {
            FileInputStream fis = new FileInputStream(myFile);
            DataInputStream in = new DataInputStream(fis);
            BufferedReader br =  new BufferedReader(new InputStreamReader(in));
            String strLine;
            while ((strLine = br.readLine()) != null) {
                myData = myData + "\n" + strLine;
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

The following function will allow us to delete a file:

```java
    public void deleteFile(){
        myFile.delete();
        myData = "";
        textViewForShowData.setText("File no Longer Exist.");
        Log.e("MA : ","File Deleted");
    }
```

Here's the full code:

**MainActivity.java**

```java
import android.Manifest;
        import android.content.Intent;
        import android.content.pm.PackageManager;
        import android.os.AsyncTask;
        import android.os.Bundle;
        import android.os.Environment;
        import android.support.v4.app.ActivityCompat;
        import android.support.v4.content.ContextCompat;
        import android.support.v7.app.AppCompatActivity;
        import android.util.Log;
        import android.view.View;
        import android.widget.Button;
        import android.widget.EditText;
        import android.widget.TextView;
        import android.widget.Toast;

        import java.io.BufferedReader;
        import java.io.DataInputStream;
        import java.io.File;
        import java.io.FileInputStream;
        import java.io.FileOutputStream;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.io.OutputStreamWriter;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    static final Integer LOCATION = 0x1;
    static final Integer CALL = 0x2;
    static final Integer WRITE_EXST = 0x3;
    static final Integer READ_EXST = 0x4;
    static final Integer CAMERA = 0x5;
    static final Integer ACCOUNTS = 0x6;
    static final Integer GPS_SETTINGS = 0x7;
    String myData = "";

    final File myFile = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+"/TestFile.txt");

    Button buttonAdd, buttonDelete;
    EditText editTextForSave;
    TextView textViewForShowData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editTextForSave = (EditText) findViewById(R.id.ed_enter_data);
        textViewForShowData = (TextView) findViewById(R.id.tv_show_data);

        buttonAdd = (Button) findViewById(R.id.button_add);
        buttonDelete = (Button) findViewById(R.id.button_delete);
        buttonAdd.setOnClickListener(this);
        buttonDelete.setOnClickListener(this);
    }

    private void askForPermission(String permission, Integer requestCode) {
        if (ContextCompat.checkSelfPermission(MainActivity.this, permission) != PackageManager.PERMISSION_GRANTED) {
            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this, permission)) {
                //This is called if user has denied the permission before
                //In this case I am just asking the permission again
                ActivityCompat.requestPermissions(MainActivity.this, new String[]{permission}, requestCode);
            } else {
                ActivityCompat.requestPermissions(MainActivity.this, new String[]{permission}, requestCode);
            }
        } else {
            //Toast.makeText(this, "" + permission + " is already granted.", Toast.LENGTH_SHORT).show();
        }
    }

    public void ask(View v){
        switch (v.getId()){

            case R.id.button_add:
                askForPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE,WRITE_EXST);
                new MyAsynTask().execute();

                break;
            case R.id.button_delete:
                askForPermission(Manifest.permission.READ_EXTERNAL_STORAGE,READ_EXST);
                deleteFile();
                break;

            default:
                break;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(ActivityCompat.checkSelfPermission(this, permissions[0]) == PackageManager.PERMISSION_GRANTED){
            switch (requestCode) {

                case 3:
                    writeFile();
                    break;
                //Read External Storage
                case 4:
                    Intent imageIntent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    startActivityForResult(imageIntent, 11);
                    break;
            }

            Toast.makeText(this, "Permission granted", Toast.LENGTH_SHORT).show();
        }else{
            Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onClick(View v) {
        ask(v);
    }

    public void writeFile(){
        // write on SD card file data in the text box
        try {
            // buttonAdd.setEnabled(false);

            FileOutputStream fOut = new FileOutputStream(myFile);
            final OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            String temp=editTextForSave.getText().toString();

            myOutWriter.append(temp);
            myOutWriter.append("\n");

            myOutWriter.close();
            fOut.close();
            Log.e("MA : ","Done writing SD");

        } catch (Exception e) {
            Log.e("catch : ",e.getMessage());
        }
//        editTextForSave.setText("");
        // buttonAdd.setEnabled(true);
    }

    public void showData(){
        try {
            FileInputStream fis = new FileInputStream(myFile);
            DataInputStream in = new DataInputStream(fis);
            BufferedReader br =  new BufferedReader(new InputStreamReader(in));
            String strLine;
            while ((strLine = br.readLine()) != null) {
                myData = myData + "\n" + strLine;
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
//        textViewForShowData.setText(myData);
    }

    public void deleteFile(){
        myFile.delete();
        myData = "";
        textViewForShowData.setText("File no Longer Exist.");
        Log.e("MA : ","File Deleted");
    }

    // The definition of our task class
    private class MyAsynTask extends AsyncTask<String, Integer, String> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected String doInBackground(String... params) {
            writeFile();
            showData();
            return "All Done!";
        }

        @Override
        protected void onProgressUpdate(Integer... values) {
            super.onProgressUpdate(values);
            buttonAdd.setEnabled(false);
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            textViewForShowData.setText(myData);
            editTextForSave.setText("");
            buttonAdd.setEnabled(true);
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment16.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 2: How to Save a String to a File to and Read it

This example will teach you how to save a String in memory to internal storage as a File and also how to check that the file exists.

Here is the demo screenshot:

![Save String to File and read it](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/10/Save-String-to-File-and-read-it-2.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependencies are needed for this project.

### Step 3: Design Layout

Design a simple layout for our MainActivity with two buttons, one for saving the String into a File, the other for checking if the File exists:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:gravity="center"
    tools:context="com.acadgild.android.internalfile.MainActivity">

    <Button
        android:id="@+id/save_file"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Save File" />

    <Button
        android:id="@+id/check_file"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Check File"
        android:layout_below="@id/save_file"
        android:layout_marginTop="20dp"/>

</RelativeLayout>
```

### Step 4: Write Code

Here is how you write our String into a File using the `FileOutputStream` class:

```java
                String fileName = "MyFile";
                String content = "hello world";
                FileOutputStream outputStream = null;
                try {
                    outputStream = openFileOutput(fileName, Context.MODE_PRIVATE);
                    outputStream.write(content.getBytes());
                    outputStream.close();
                    Toast.makeText(MainActivity.this, "File Saved !!", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
```

And here is how we check if the File Exists:

```java
                String path=getFilesDir().getAbsolutePath()+"/MyFile";
                File file = new File ( path );

                if ( file.exists() )
                {
                    // Toast File is exists
                    Toast.makeText(MainActivity.this, "File exist !!", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    // Toast File is not exists
                    Toast.makeText(MainActivity.this, "File not exist !!", Toast.LENGTH_SHORT).show();
                }
```

Here is the full code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button save_btn= (Button)findViewById(R.id.save_file);
        save_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String fileName = "MyFile";
                String content = "hello world";
                FileOutputStream outputStream = null;
                try {
                    outputStream = openFileOutput(fileName, Context.MODE_PRIVATE);
                    outputStream.write(content.getBytes());
                    outputStream.close();
                    Toast.makeText(MainActivity.this, "File Saved !!", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        Button chk_btn= (Button)findViewById(R.id.check_file);
        chk_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String path=getFilesDir().getAbsolutePath()+"/MyFile";
                File file = new File ( path );

                if ( file.exists() )
                {
                    // Toast File is exists
                    Toast.makeText(MainActivity.this, "File exist !!", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    // Toast File is not exists
                    Toast.makeText(MainActivity.this, "File not exist !!", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment14.3/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
