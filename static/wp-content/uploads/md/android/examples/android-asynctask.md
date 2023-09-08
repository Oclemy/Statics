# Android AsyncTask Tutorial and Examples

_Android AsyncTask Tutorial and Examples_

This an android async task class. We look at several async task examples both quick snippets and full examples.


#### What is AsyncTask?

_**AsyncTask** is a helper class for performing easy threading and created around Thread._

Through AsyncTask we can perform threading, especially those requiring us to post progress and results to the user interface in an easier manner than almost all the alternatives.

AsyncTask is an abstract class and has to be derived from and atleast it's `doInBackground()` overriden.

It derives from the `Object` and resides in the `android.os` package.

```java
public abstract class AsyncTask
extends Object
```

AsyncTask has existed for quite a while since API level 3.

#### Why AsyncTask?

Here are some of the reasons or advantages you get from using AsyncTask:

1. AsyncTask is meant to be easy to use yet provide reliable threading. Most of the Complexities of working with threads have been abstracted away from you. All you have to do is extend it's class and override atleast one of it's methods. AsyncTask allows our brain to easily figure out how we will perform a task based on the methods it allows us override. For example `onPreExecute()` allows us do some task like start showing a progressbar to users. `doInBackground()` allows us perform our task in the background thread. `onProgressUpdate()` allows us update our user interface of the task's progress. `onPostExecute()` allows us do something with result on the user interface thread once the background task is complete.
2. AsyncTask allows us easily report progress to the user interface. Many a times while performing time-consuming operations, we need to inform the user of the progress of our task. This is what users like as it affords them control over the application. They feel involved in whatever the application is doing. Using AsyncTask to report progress makes your application user friendly.
3. AsyncTask provides us better and easy way to cancel a task that is already taking place. Having this ability is important as users again gain control over the app. When an application is performing some sort of task and user are not able to cancel it, then users will feel understably quite frustrated.

#### When To Use AsyncTask

The thing about AsyncTask is that it is a helper class.It is created to abstract the complexities of dealing with threads away from us. Hence that provides a limit in it's capabilities.

AsyncTask need to be used for short operations (a few seconds at the most). Something like downloading small quantities of data from online, or reading some files off the device into a ListView, something like that.

Don't use AsyncTask for jobs that take alot of time like polling jobs, or timer operations, or any other task that will keep threads engaged for a long time. Those type of tasks need full threading frameworks and packages like the `Executor`,`ThreadPoolExecutor` and `FutureTask`.

#### Quick Android AsyncTask HowTos and Examples

##### 1\. Download Image From Internet via HttpURLConnection

We want to use AsyncTask to download an image in the background thread from a network then show it an ImageView.

HttpURLConnection is the class we use as our downloader.

The download will take place in the `doInBackground()` method. This method gets executed in the background thread.

It's result then gets passed to the `onPostExecute()` method. The `onPostExecute()` runs on the main/ui thread so we can update our User Interface widgets there.

We will then load our bitmap into an imageview using the `setImageBitmap()` method.

```java
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.widget.ImageView;

import java.io.InputStream;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Downloads an image asynchronously from the internet
 */
public class DownloadImageTask extends AsyncTask<ImageView, Void, Bitmap> {

    private WeakReference<ImageView> imageView = null;

    /**
     * Download the image
     * @param imageViews image view with tag set to image URL
     * @return the downloaded bitmap
     */
    @Override
    protected Bitmap doInBackground(ImageView... imageViews) {
        this.imageView = new WeakReference<>(imageViews[0]);
        return downloadImage((String)imageView.get().getTag());
    }

    /**
     * Populate the imageView with the downloaded image
     * @param bitmap the downloaded image
     */
    @Override
    protected void onPostExecute(Bitmap bitmap) {
        imageView.get().setImageBitmap(bitmap);
    }

    /**
     * Download the image from the given URL
     * @param urlString the URL to download
     * @return a bitmap of the downloaded image
     */
    private Bitmap downloadImage(String urlString) {
        Bitmap bmp = null;

        try {
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            InputStream is = conn.getInputStream();
            bmp = BitmapFactory.decodeStream(is);
            if (bmp != null) {
                return bmp;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return bmp;
    }
}
```

### 1\. Android AsyncTask - Update ProgressBar

[center]_Android AsyncTask - Update ProgressBar tutorial._[/center]

This is android asynctask tutorial.We simply update a progressbar while simulating a background task. We are showing a determinate progressbar. This means users or even the app can predict the time fairly accurately that the task will finish.

If you are downloading a large file, this is almost always mandatory. If you were to use an indeterminate progressbar for a large download then users will grow frustrated and may close the app.

#### Demo

Here's the demo:

#### Section 1 : MainActivity Class

Here's the main activity class.

```java
    package com.tutorials.asynctaskprogressbar;

    import android.app.Activity;
    import android.os.AsyncTask;
    import android.os.Bundle;
    import android.view.View;
    import android.view.View.OnClickListener;
    import android.widget.Button;
    import android.widget.ProgressBar;
    import android.widget.Toast;

    public class MainActivity extends Activity {

      ProgressBar pb;
      Button startBtn;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            pb=(ProgressBar) findViewById(R.id.progressBar1);
            startBtn=(Button) findViewById(R.id.startBtn);

            //ONCLICK
            startBtn.setOnClickListener(new OnClickListener() {

          @Override
          public void onClick(View arg0) {
            // TODO Auto-generated method stub
            new Downloader().execute();
          }
        });

        }

        class Downloader extends AsyncTask<Void, Integer, Integer>
        {

            @Override
            protected void onPreExecute() {
                // TODO Auto-generated method stub
                super.onPreExecute();

                //SET PB PROIPERTIES
                pb.setMax(100);

            }
            @Override
            protected void onProgressUpdate(Integer... values) {
                // TODO Auto-generated method stub
                super.onProgressUpdate(values);

                //UPDATE PROGRESSBAR
                pb.setProgress(values[0]);

            }

        @Override
        protected Integer doInBackground(Void... arg0) {
          // TODO Auto-generated method stub

          //DO HEAVY JOB
          for(int i=0;i<100;i++)
          {
            publishProgress(i);

            try
            {
              Thread.sleep(100);
            }catch(InterruptedException ie)
            {
              ie.printStackTrace();
            }
          }

          return null;
        }

        @Override
        protected void onPostExecute(Integer result) {
          // TODO Auto-generated method stub
          super.onPostExecute(result);

          Toast.makeText(getApplicationContext(), "Download Finished !!", Toast.LENGTH_LONG).show();
        }

        }

    }
```

#### Section 2 : Layout Class

```xml
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context=".MainActivity" >

        <ProgressBar
            android_id="@+id/progressBar1"
            style="?android:attr/progressBarStyleHorizontal"
            android_layout_width="match_parent"
            android_layout_height="50dp"
            android_layout_alignParentTop="true"
            android_layout_centerHorizontal="true"
                    android_layout_marginTop="198dp" />

        <Button
            android_id="@+id/startBtn"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_below="@+id/progressBar1"
            android_background="#009968"
            android_layout_centerHorizontal="true"
            android_layout_marginTop="69dp"
            android_text="Start" />

    </RelativeLayout>
```

### 2\. Android AsyncTask - Download Image/Bitmap

[center]_Android AsyncTask - How to Download Image/Bitmap Tutorial_[/center]

Here we see how to downlaod an image/bitmap from online using async task.

There are plenty of image downloader libraries.Picasso and Glide are so far my best two.However,the truth is they are third party libraries and have to be added as a dependency in android studio or jar in Eclipse.

Sometimes instead of using third party dependencies you just need to do something using the built in classes.

So in this example we see how to download an image/bitmap in the background thread using asynctask.

AsyncTask is an abstract class that makes threading while updating the UI easier.

\\===

#### What we make?

In this tutorial we will make a simple app to download an image from a server in the background thread when a button is clicked. When the user clicks the download button, the app starts downloading the image while a progressDialog is displayed. We display the progressDialog as it's allows our users track the progress of the download from our app.

#### Tools Used

In this guide we used to Eclipse to create our simple app while we used BlueStacks Emulator to test the app. Bluestacks Emulator is a free emulator however you are free to test with any emulator like say Genymotion etc.

You can also use an android mobile device like Samsung,HTC,Infinix etc whatever device you are using as long as it runs android. However, you have to provide a URL(Uniform Resource Identifier) that is accessible over the web. In this example I created a simple WordPress website and downloaded the image from it. But you can also provide an internet URL.

NB/= If you are using the emulator and you are downloaing the image from localhost then use the IP address: `10.0.2.2` instead of `127.0.0.1` or localhost.

#### 1\. Our MainActivity Class

Here are the responsibilities for this class:

| No. | Role |
| --- | --- |
| 1. | It's our launcher [activity](https://camposha.info/android/activity). This class will derive from `android.app.Activity`. |
| 2. | Define the URL we will connect to and download the image. |
| 3. | Define an inner class that derives from AsyncTask so that we are able to download our image without freezing the UI. |
| 4. | Render the an ImageView, a button and a progressbar as our User Interface controls. The button will be clicked to initiate the download. The progressbar will display the progress of the download. The ImageView will render the downloaded image. |

Let's go.

First specify the package name:

```java
package com.tutorials.asyncimagedownload;
```

Then add these imports:

```java
    import java.io.InputStream;
    import java.net.URL;
    import android.app.Activity;
    import android.app.ProgressDialog;
    import android.graphics.Bitmap;
    import android.graphics.BitmapFactory;
    import android.os.AsyncTask;
    import android.os.Bundle;
    import android.view.View;
    import android.view.View.OnClickListener;
    import android.widget.Button;
    import android.widget.ImageView;
```

Create a class and make it extend android.app.Activity:

```java
public class MainActivity extends Activity {}
```

Add the following as instance fields. Please give a url pointing us to the image:

```java
      private String url="http://10.0.2.2/galacticnews/spacecraft.jpg";
      ImageView img;
      Button downloadBtn;
      ProgressDialog pd;
```

If your image is hosted locally then specify the root ip address as I have, that is if you'll be testing in an emulator.

Let's now create an inner class inside our MainActivity. First here are the roles of this inner Downloader class:

| No. | Role |
| --- | --- |
| 1. | It's responsible for downloading our image in the background thread and rendering it in an imageview. |
| 2. | It shows a progress dialog while download in progress and dismisses it when it's over. |

```java
private class Downloader {}
```

Make the class derive from AsyncTask, an abstract class.:

```java
private class Downloader extends AsyncTask<String,Void,Bitmap>{}
```

AsyncTask is an abstract class, hence you'll have to override at least the doInBackground() method. But for us firs we override the onPreExecute().This method will get called before our doInBackground()

```java
            @Override
            protected void onPreExecute() {
                // TODO Auto-generated method stub

                super.onPreExecute();
```

We'll set up our progressbar and show it here inside the onPreExecute():

```java

                //CREATE PD,SET PROPERTIES
                pd=new ProgressDialog(MainActivity.this);
                pd.setTitle("Image Downloader");
                pd.setMessage("Downloading...");
                pd.setIndeterminate(false);
                pd.show();
            }
```

We then override the doInBackground(). This is a must since it's here that our background image downloading will be taking place in a separate thread.

```java
@Override
        protected Bitmap doInBackground(String... url) {|
```

You can see it's returning a Bitmap while taking in a string url. Here's how we download the image. Add the following code inside your doInBackground() method:

```java
          String myurl=url[0];
          Bitmap bm=null;
          InputStream is=null;

          try
          {
            is=new URL(myurl).openStream();

            //DECODE
            bm=BitmapFactory.decodeStream(is);

          }
          catch(Exception e)
          {
            e.printStackTrace();
          }

          return bm;
```

Then lastly we override the onPostExecute() a method that gets executed when the doInBackground has returned. We set our bitmap to our imageview here and clear the progress dialog.

```java
@Override
        protected void onPostExecute(Bitmap result) {
          // TODO Auto-generated method stub
          super.onPostExecute(result);

          //SET TO IMG
          img.setImageBitmap(result);

           //DISMISS
          pd.dismiss();

        }
```

Now let's go back inside our MainActivity and override it's onCreate() method:

```java
  @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
```

Then refernce our widgets: imageview and download button:

```java
            img=(ImageView) findViewById(R.id.imageView1);
            downloadBtn=(Button) findViewById(R.id.button);
```

Then inside our download button's onClickListener execute our AsyncTask, passing in the URL:

```java
          @Override
          public void onClick(View arg0) {
            // TODO Auto-generated method stub
            new Downloader().execute(url);
          }
        });
```

#### 2\. AndroidMainfest.xml

Then make sure you add the permission to internet in your androidmanifest.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
    <manifest
        package="com.tutorials.asyncimagedownload"
        android_versionCode="1"
        android_versionName="1.0" >

        <uses-permission android_name="android.permission.INTERNET" />

        <application
            android_allowBackup="true"
            android_icon="@drawable/ic_launcher"
            android_label="@string/app_name"
            android_theme="@style/AppTheme" >
            <activity
                android_name="com.tutorials.asyncimagedownload.MainActivity"
                android_label="@string/app_name" >
                <intent-filter>
                    <action android_name="android.intent.action.MAIN" />

                    <category android_name="android.intent.category.LAUNCHER" />
                </intent-filter>
            </activity>
        </application>

    </manifest>
```

#### 3\. Our XML Layout

Android apps user interface are written in XML. So we need to write our layout in XML as well. Our root layout tag is going to be a [relativelayout](https://camposha.info/android/relativelayout). We add a button and an imageview inside it. Just Add ImageView and button to your xml layout.

```xml

    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context=".MainActivity" >

        <Button
            android_id="@+id/button"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_alignParentBottom="true"
            android_layout_alignParentRight="true"
            android_background="#009968"
            android_layout_marginBottom="58dp"
            android_text="Download" />

        <ImageView
            android_id="@+id/imageView1"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_above="@+id/imageView1"
            android_layout_centerHorizontal="true"
            android_layout_marginBottom="43dp"
            android_src="@drawable/imageloading" />

    </RelativeLayout>
```

And that's it.
