# Kotlin Android MediaPlayer Tutorial and Examples


_Android MediaPlayer Tutorial and Examples._

Here we want to explore some examples regarding the `MediaPlayer` class using simple step by step examples written in either Kotlin or Java.


### Why MediaPlayer?

Mobile devices have these days become many people's primary source of entertainment. Not only do we use them as our personal assistants which allow us schedule reminders, keep todo lists, shopping and even wish lists, but we also play games and music through them.

Some years back,probably just a decade ago, it was very expensive to find a phone that could do all these. During those days we had feature phones like nokia, sony ericson, alcatel,siemens etc. These phones were not smartphones and didn't do alot more than calling and sending text messages.

However, these days smarphones are as easy to get as almost anything else. Not just in tier one countries but also in poor countries people have powerful smartphones that can:

1. Access the internet, Send emails, Whatsapp etc.
2. Play media files like mp3 and mp4 songs.
3. Install other apps.

MediaPlayer as a class therefore allows us continue this rich tradition of empowering users. These days we don't media files only for entertainment but also for educative purposes. Hence this class is one of the most empowering android framework classes that is continuing to revolutionize the tech world.

## Example 1: Android Simple ListView MP3 Player Example

In this example we want to see how to create a simple MP3 Player using ListView and `MediaPlayer` class. We load mp3 files from our external storage and show them in a simple listview. We do this recursively so that we don't miss songs found in sub-directories. We display the song names in a ListView.

Then when the user clicks a single song in our ListView, we open a new activity, a Player activity and automatically play the song. We will be passing the song path to that activity. Then we use the `MediaPlayer` class to play the song.

As we play the song we display the a Lottie Animation. When the user will click the back button of our Player Activity, we will continue playing the song. In fact even if we open a new app, that is our app is paused we still continue playing the song.

Here is the screenshot demo of what we create:

![Android MediaPlayer Tutorial and Examples](https://github.com/Oclemy/ListViewMp3Player/raw/master/demo/demo1.gif)

#### 1\. MainActivity.java

Here's our MainActivity. The main responsibility of this class is to show our ListView of MP3 songs. To turn it into an [Activity](https://camposha.info/android/activity) we derive from the `android.app.Activity` class.

Among our imports include the `java.io.File` as we are reading the file system. Please make sure you add the `READ_EXTERNAL_STORAGE` permission in your android manifest. We also have the `android.os.AsyncTask`, a class that allows us implement basic threading. In this case we create a simple asynctask to read our songs in the background. We've called it the `SongsLoaderAsyncTask`. AsyncTask is an abstract class so we have to atleast override the `doInBackground` method. The `android.widget.ProgressBar` allows us show an indeterminate progressbar as we read our songs into the listview.

`android.widget.ListView` is our list component. `android.widget.ArrayAdapter` will be enough for us to adapt our simple data to our listview.

```java
package info.camposha.mrmp3player;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {

    private ListView listview;
    private String mediaPath;
    private List<String> songs = new ArrayList<String>();
    private MediaPlayer mediaPlayer = new MediaPlayer();
    private SongsLoaderAsyncTask task;
    ProgressBar songsLoadingProgressBar;
    ArrayList<String> songNames=new ArrayList<>();

    /**
     * We will scan and load all mp3 files in a background thread via asynctask.
     */
    // Use AsyncTask to read all mp3 file names
    private class SongsLoaderAsyncTask extends AsyncTask<Void, String, Void> {
        private List<String> loadedSongs = new ArrayList<String>();

        /**
         * Before our background starts
         */
        protected  void onPreExecute() {
            songsLoadingProgressBar.setVisibility(View.VISIBLE);
            songNames.clear();
            Toast.makeText(getApplicationContext(),"Scanning Songs..Please Wait.",Toast.LENGTH_LONG).show();
        }

        /**
         * Load files in background thread here
         * @param url
         * @return
         */
        protected Void doInBackground(Void... url) {
            updateSongListRecursive(new File(mediaPath));
            return null;
        }

        /**
         * Recursively Load Files From ExternalStorage
         * @param path
         */
        public void updateSongListRecursive(File path) {
            if (path.isDirectory()) {
                for (int i = 0; i < path.listFiles().length; i++) {
                    File file = path.listFiles()[i];
                    updateSongListRecursive(file);
                }
            } else {
                String songPath = path.getAbsolutePath();
                String songName=path.getName();
                publishProgress(songPath);
                if (songPath.endsWith(".mp3")) {
                    loadedSongs.add(songPath);
                    songNames.add(songName.substring(0,songName.length()-4));
                }
            }
        }

        /**
         * When our background work is over.
         * @param args
         */
        protected void onPostExecute(Void args) {
            songsLoadingProgressBar.setVisibility(View.GONE);
            ArrayAdapter<String> songList =  new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_list_item_1, songNames);
            listview.setAdapter(songList);
            songs = loadedSongs;
            Toast.makeText(getApplicationContext(),"Scanning Complete."+songs.size()+" Songs Found.",Toast.LENGTH_LONG).show();
        }
    }

    /*
     *OPEN PLAYER ACTIVITY PASSING THE SONG TO PLAYER
     */
    private void openPlayerActivity(int position)
    {
        Intent i=new Intent(this,PlayerActivity.class);
        i.putExtra("SONG_KEY",songs.get(position));
        startActivity(i);
    }

    /**
     * When the activity is created.
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        songsLoadingProgressBar=findViewById(R.id.myProgressBar);
        listview = findViewById(R.id.mListView);
        mediaPath = Environment.getExternalStorageDirectory().getPath() + "/Music/";
        //mediaPath = Environment.getExternalStorageDirectory().getPath() + "/Download/";
        //mediaPath = Environment.getExternalStorageDirectory().getPath() + "/mnt/shared/Other/";
        //mediaPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).getPath() ;
        //mediaPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getPath() ;
        // itemclick listener for our listview
        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                openPlayerActivity(position);
            }
        });
        //instantiate and execute our asynctask
        task = new SongsLoaderAsyncTask();
        task.execute();

    }

    /** Called when the activity is stopped */
    @Override
    public void onStop() {
        super.onStop();
        if (mediaPlayer.isPlaying()) mediaPlayer.reset();
    }

}
```

#### 2\. PlayerActivity.java

Here's our PlayerActivity. This activity will play our song. As we play the song we will use the `LottieAnimationView` to play our animation. Obviously `MediaPlayer` is the class responsible for playing our mp3 files.

```java
package info.camposha.mrmp3player;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;

import java.io.IOException;

public class PlayerActivity extends AppCompatActivity {

    private MediaPlayer mediaPlayer = new MediaPlayer();

    TextView songTxt;
    LottieAnimationView rippleAnimation;
    String songToPlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);

        initializeViews();
        receiveSong();
        playSong();
    }

    /**
     * Initialize widgets
     */
    private void initializeViews(){
        songTxt=findViewById(R.id.songTxt);
        rippleAnimation = findViewById(R.id.lottieloading);

    }
    private void receiveSong(){

        //receive passed song via intent
        Intent i=this.getIntent();
        songToPlay=i.getStringExtra("SONG_KEY");
    }

    private void playSong(){
        //TextView to display the song name
        songTxt.setText(songToPlay);

        if(TextUtils.isEmpty(songToPlay))
        {
            Toast.makeText(this, "Hey PlayerActivity has received a null or empty song.", Toast.LENGTH_LONG).show();
        }
        else{
            try {
                mediaPlayer.reset();
                // in recursive version
                mediaPlayer.setDataSource(songToPlay);
                mediaPlayer.prepare();
                mediaPlayer.start();

            } catch(IOException e) {
                Toast.makeText(getBaseContext(), "Cannot Play Song!", Toast.LENGTH_SHORT).show();

            }
        }
        showSplash();
    }

    public void showSplash() {
        if (mediaPlayer.isPlaying()) {
            rippleAnimation.setAnimation(R.raw.ripple);
            rippleAnimation.playAnimation();
        } else {
            rippleAnimation.pauseAnimation();
        }
    }

    /** Called when the activity is stopped */
    @Override
    public void onStop() {
        super.onStop();
        //if you want to stop playing when this activity is closed then uncomment this.
//        if (mediaPlayer.isPlaying()){
//            mediaPlayer.reset();
//            rippleAnimation.pauseAnimation();
//        }
    }

}
```

#### 3\. activity_main.xml

This is the layout to be used as the user interface for `MainActivity`. First it will contain a header textview to display our header text. Then below it we have a [ListView](https://camposha.info/android/listview) to render our data in a list. We arrange them linearly using a [LinearLayout](https://camposha.info/android/linearlayout) with vertical orientation.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_padding="5dp"
        android_text="ListView MP3 Player"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent"
        android_textStyle="bold" />

    <ProgressBar
        android_id="@+id/myProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <ListView
        android_id="@+id/mListView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"/>

</LinearLayout>
```

#### 4\. activity_player.xml

This is the layout responsible for showing our `LottieAnimationView`. We will be showing an animation as our song plays. We wrap a TextView and `LottieAnimationView` inside a [RelativeLayout](https://camposha.info/android/relativelayout).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_id="@+id/activity_mp3_player"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    android_background="#25272d"
    tools_context="info.camposha.mrmp3player.PlayerActivity">

    <TextView
        android_id="@+id/songTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_centerHorizontal="true"
        android_textColor="@android:color/white"
        android_textSize="10sp"
        android_text="Rock With You"
        android_layout_marginTop="50dp"/>

    <com.airbnb.lottie.LottieAnimationView
        android_id="@+id/lottieloading"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_lottie_loop="true" />

</RelativeLayout>
```

#### 5\. AndroidManifest.xml

Add permission to read from songs from external storage

```xml
<uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE" />
```

##### Download

Here are reference resources:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/ListViewMp3Player/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListViewMp3Player) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=8x5zH8p7R9g) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Example 2: Android MP3 MusicPlayer with Background Service

This example now shows you how you can play a music player via the MediaPlayer API alongside a Service.

Check the screenshot demo below:

![Android MusicPlayer with Service](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/music_player_simple.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependency is needed for this project.

### Step 3: Add Music

In your `res` directory create a folder known as `raw` and add your mp3 song inside it:

```shell
/res/raw/mission.mp3
```

### Step 4: Design Layout

Add two buttons: one to start our music player and the other to stop it, inside the MainActivity layout as shown below:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

<RelativeLayout
    tools:context="com.example.ankitkumar.music_player.MainActivity"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    android:id="@+id/activity_main"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">

<Button
    android:layout_height="wrap_content"
    android:layout_width="wrap_content"
    android:id="@+id/button_start"
    android:layout_marginBottom="103dp"
    android:layout_alignLeft="@+id/button_stop"
    android:layout_above="@+id/button_stop"
    android:textStyle="bold"
    android:textAllCaps="false"
    android:text="@string/start"/>

<Button
    android:layout_height="wrap_content"
    android:layout_width="wrap_content"
    android:id="@+id/button_stop"
    android:layout_marginBottom="169dp"
    android:textStyle="bold"
    android:textAllCaps="false"
    android:text="@string/stop"
    android:layout_centerHorizontal="true"
    android:layout_alignParentBottom="true"/>

</RelativeLayout>
```

### Step 5: Create Music Service

We will be playing our music in a background service. Start by creating a file known as `MusicService.java` and add the following imports:

```java
import android.app.Service;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.IBinder;
```

Then extend the `android.app.Service` class:

```java
public class MusicService extends Service {
```

Declare the MediaPlayer object as our Musicplayer and override the `onBind()`, in this case to return null:

```java
    MediaPlayer musicPlayer;
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
```

Now override the `onCreate()`. Inside it we will create our MusicPlayer by initiating the MediaPlayer using the `create()` method. We pass the `Context` as well as the Music Path:

```java
    @Override
    public void onCreate()
    {
        super.onCreate();
        musicPlayer = MediaPlayer.create(getApplicationContext(), R.raw.mission);
    }
```

We will the override the `onStartCommand()`. We will start our MusicPlayer here:

```java
    @Override
    public int onStartCommand(Intent intent, int flags, int startId)
    {
        musicPlayer.start();
        musicPlayer.setLooping(true);
        return super.onStartCommand(intent, flags, startId);
    }
```

In the `onDestroy()` callback we will stop our MediaPlayer and release it:

```java
    @Override
    public void onDestroy()
    {
        musicPlayer.stop();
        musicPlayer.release();
        super.onDestroy();
    }
}
```

Here is the full code:

**MusicService.java**

```java
import android.app.Service;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.IBinder;

public class MusicService extends Service {

    MediaPlayer musicPlayer;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate()
    {
        super.onCreate();
        musicPlayer = MediaPlayer.create(getApplicationContext(), R.raw.mission);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId)
    {
        musicPlayer.start();
        musicPlayer.setLooping(true);
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy()
    {
        musicPlayer.stop();
        musicPlayer.release();
        super.onDestroy();
    }
}
```

### Step 6: Create Activity

We have only one activity: our MainActivity:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener
{
    MusicService musicService;
    Button button_start, button_stop;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button_start = (Button) findViewById(R.id.button_start);
        button_stop = (Button) findViewById(R.id.button_stop);

        button_start.setOnClickListener(this);
        button_stop.setOnClickListener(this);
    }

    @Override
    public void onClick(View v)
    {
        if (v.getId() == R.id.button_start)
        {
            Intent intent = new Intent(this, MusicService.class);
            startService(intent);
            Log.e("button_start","startIntent");
        }
        else
        {
            Intent intent = new Intent(this, MusicService.class);
            stopService(intent);
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
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment17.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 3: Kotlin Android Audio Player App

In this third example we will write our music player or audioplayer with Kotlin.

Here is what is created:

![Kotlin Android Music Player App](https://github.com/Talentica/AndroidWithKotlin/raw/master/gifs/audioplayer.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` kotlin project.

### Step 2: Dependencies

No third party dependency is needed for this project. We however use Kotlin so make sure you've created a Kotlin project.

### Step 3: Design Music Player Layout

We will do this in our `activity_main.xml`:

**activity_main.xml**

We will have an imageview,imagebuttons for navigating to next or previous songs as well as playing or pausing the music, seekbar and textview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingTop="@dimen/medium_margin">

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="@dimen/medium_margin"
        android:layout_weight="1"
        android:background="?attr/selectableItemBackgroundBorderless"
        android:paddingBottom="@dimen/medium_margin"
        android:src="@mipmap/music" />

    <ImageButton
        android:id="@+id/play_pause_btn"
        android:layout_width="49dp"
        android:layout_height="49dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="@dimen/medium_margin"
        android:background="?attr/selectableItemBackgroundBorderless"
        android:paddingBottom="@dimen/medium_margin"
        android:src="@android:drawable/ic_media_play" />

    <TextView
        android:id="@+id/song_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:gravity="center_horizontal"
        android:maxLines="1"
        android:textSize="14sp" />

    <TextView
        android:id="@+id/song_artist"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_horizontal"
        android:maxLines="1"
        android:text="Simple Rock"
        android:textSize="16sp" />

    <SeekBar
        android:id="@+id/progressbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="@dimen/medium_margin"
        android:paddingTop="@dimen/medium_margin" />

    <TextView
        android:id="@+id/tv_progress"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/progressbar"
        android:layout_marginBottom="@dimen/medium_margin"
        android:layout_marginLeft="@dimen/medium_margin"
        android:layout_marginRight="@dimen/medium_margin"
        android:gravity="center_horizontal"
        android:maxLines="1" />
</LinearLayout>
```

### Step 4: Create a SeekBar Handler class

Create the class under the `utils` and add the following code:

**utils/SeekBarHandler.kt**

```kotlin
import android.media.MediaPlayer
import android.os.AsyncTask
import android.widget.SeekBar
import android.widget.TextView

class SeekBarHandler(val seekbar: SeekBar?, var mediaPlayer: MediaPlayer?, var isViewOn: Boolean,val timer:TextView): AsyncTask<Void, Void, Boolean>() {

    override fun onPreExecute() {
        super.onPreExecute()
        seekbar?.max = mediaPlayer?.duration!!
    }

    override fun onProgressUpdate(vararg values: Void?) {
        super.onProgressUpdate(*values)
        val time = mediaPlayer?.getCurrentPosition()!!
        seekbar?.setProgress(time);
        var seconds = (time / 1000)
        val minutes = time / (1000 * 60) % 60
        seconds = seconds - minutes * 60
        timer.setText(minutes.toString()+":"+seconds.toString())
    }

    override fun onCancelled() {
        super.onCancelled()
        setViewOnOff(false)
    }

    fun setViewOnOff(isOn:Boolean) {
        isViewOn = isOn
    }

    fun refreshMediaPlayer(mediaPlayer: MediaPlayer?) {
        this.mediaPlayer = mediaPlayer
    }

    override fun doInBackground(vararg params: Void?): Boolean {
        while (mediaPlayer?.isPlaying() == true && isViewOn == true) {
            try {
                Thread.sleep(200)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }

            publishProgress()
        }
        return true
    }

    override fun onPostExecute(result: Boolean?) {
        super.onPostExecute(result)
    }

}
```

### Step 5: Create MainActivity

And add the following code:

**MainActivity.kt**

```kotlin
import android.media.MediaPlayer
import android.os.Bundle
import android.os.PowerManager
import android.util.Log
import android.view.View
import android.view.View.OnClickListener
import android.widget.ImageButton
import android.widget.SeekBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.talentica.androidkotlin.audioplayer.utils.LogHelper
import com.talentica.androidkotlin.audioplayer.utils.SeekBarHandler

class MainActivity : AppCompatActivity(), SeekBar.OnSeekBarChangeListener, MediaPlayer.OnCompletionListener, MediaPlayer.OnErrorListener,
        MediaPlayer.OnPreparedListener, MediaPlayer.OnSeekCompleteListener, OnClickListener {

    private val TAG = LogHelper.makeLogTag("MainActivity")
    private var mMediaPlayer: MediaPlayer? = null
    private var mPlayPauseButton: ImageButton? = null
    private var mSeekbar:SeekBar? = null
    private var mTimer:TextView? = null
    private var seekBarHandler:SeekBarHandler? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mSeekbar = findViewById<SeekBar>(R.id.progressbar)
        mSeekbar?.setOnSeekBarChangeListener(this)

        mPlayPauseButton = findViewById<ImageButton>(R.id.play_pause_btn)
        mPlayPauseButton?.setOnClickListener(this)

        mTimer = findViewById<TextView>(R.id.tv_progress)
    }

    override fun onClick(v: View?) {
        if (v?.id == R.id.play_pause_btn) {
            togglePlayback()
        }
    }

    fun togglePlayback() {
        if (mMediaPlayer?.isPlaying == true) {
            pauseAudio()
        } else {
            createMediaPlayerIfNeeded()
            playAudio()
        }
    }

    /**
     * Makes sure the media player exists and has been reset. This will create
     * the media player if needed, or reset the existing media player if one
     * already exists.
     */
    private fun createMediaPlayerIfNeeded() {
        Log.d(TAG, "createMediaPlayerIfNeeded")
        if (mMediaPlayer == null) {
            mMediaPlayer = MediaPlayer.create(this, R.raw.simplerock)

            // Make sure the media player will acquire a wake-lock while
            // playing. If we don't do that, the CPU might go to sleep while the
            // song is playing, causing playback to stop.
            mMediaPlayer?.setWakeMode(this.getApplicationContext(),
                    PowerManager.PARTIAL_WAKE_LOCK)

            // we want the media player to notify us when it's ready preparing,
            // and when it's done playing:
            mMediaPlayer?.setOnPreparedListener(this)
            mMediaPlayer?.setOnCompletionListener(this)
            mMediaPlayer?.setOnErrorListener(this)
            mMediaPlayer?.setOnSeekCompleteListener(this)
        }
    }

    fun playAudio() {
        mMediaPlayer?.start()
        seekBarHandler = SeekBarHandler(mSeekbar, mMediaPlayer, isViewOn = true, timer = mTimer!!)
        seekBarHandler?.execute()
        val pauseDrawabale = ContextCompat.getDrawable(this, android.R.drawable.ic_media_pause)
        mPlayPauseButton?.setImageDrawable(pauseDrawabale)
    }

    fun pauseAudio() {
        seekBarHandler?.cancel(true)
        mMediaPlayer?.pause()
        val playDrawabale = ContextCompat.getDrawable(this, android.R.drawable.ic_media_play)
        mPlayPauseButton?.setImageDrawable(playDrawabale)
    }

    /**
     * Releases resources used by the service for playback. This includes the
     * "foreground service" status, the wake locks and possibly the MediaPlayer.
     * @param releaseMediaPlayer Indicates whether the Media Player should also
     * *            be released or not
     */
    private fun relaxResources(releaseMediaPlayer: Boolean) {
        LogHelper.d(TAG, "relaxResources. releaseMediaPlayer=", releaseMediaPlayer)

        seekBarHandler?.cancel(true)
        seekBarHandler = null
        // stop and release the Media Player, if it's available
        if (releaseMediaPlayer && mMediaPlayer != null) {
            mMediaPlayer?.reset()
            mMediaPlayer?.release()
            mMediaPlayer = null
        }
    }

    override fun onPause() {
        super.onPause()
        if (mMediaPlayer?.isPlaying == true) {
            pauseAudio()
        }
    }

    override fun onBackPressed() {
        super.onBackPressed()
        relaxResources(true)
    }

    override fun onCompletion(mp: MediaPlayer?) {
        relaxResources(true)
        val playDrawabale = ContextCompat.getDrawable(this, android.R.drawable.ic_media_play)
        mPlayPauseButton?.setImageDrawable(playDrawabale)
        mSeekbar?.progress = 0
    }

    override fun onError(mp: MediaPlayer?, what: Int, extra: Int): Boolean {
        return false
    }

    override fun onPrepared(mp: MediaPlayer?) {
    }

    override fun onSeekComplete(mp: MediaPlayer?) {
    }

    override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
        if (fromUser) {
            val progress = seekBar?.progress
            mMediaPlayer?.seekTo(progress!!)
        }
    }

    override fun onStartTrackingTouch(seekBar: SeekBar?) {
    }

    override fun onStopTrackingTouch(seekBar: SeekBar?) {
    }
}
```

### Step 6: Add Permission

In your `AndroidManifest.xml` add the following permission:

```xml
    <uses-permission android:name="android.permission.WAKE_LOCK" />
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/Talentica/AndroidWithKotlin/tree/master/audioplayer) Example |
| 2. | [Follow](https://github.com/Talentica/) code author |

## Example 4: Kotlin Android MediaPlayer with Adjustable Volume

This is the fourth mediaplayer example for you. It is written in Kotlin and teaches not only how to play the media but also programmatically adjust the volume of the playing music. We will provide a seekbar for this.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Add Music

Add a music to your raw folder. If you don't have such a folder create it inside the `res` directory.

**res/raw/music.mp3**

[Download it](https://github.com/Kiran-Bahalaskar/Play-Music-Using-Kotlin/blob/master/app/src/main/res/raw/music.mp3).

### Step 4: Design Layout

Design your MainActivity layout to resemble a music player view or interface using seekbar, imageviews, textviews, buttons etc as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:background="@android:color/white"
    tools:context=".MainActivity">

    <ImageView
        android:layout_width="400dp"
        android:layout_height="400dp"
        android:src="@drawable/img"/>

    <SeekBar
        android:id="@+id/positionBar"
        android:layout_marginTop="30dp"
        android:layout_width="300dp"
        android:layout_height="wrap_content"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/elapsedTimeLabel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="0:11"
            android:layout_marginLeft="40dp"/>

        <TextView
            android:id="@+id/remainingTimeLabel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="0:11"
            android:layout_marginLeft="240dp"/>

    </LinearLayout>

    <Button
        android:id="@+id/playBtn"
        android:layout_marginTop="40dp"
        android:layout_width="30dp"
        android:layout_height="30dp"
        android:background="@drawable/ic_play_arrow_black_24dp"
        android:onClick="playBtnClick"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:layout_marginTop="40dp"
        android:gravity="center">

        <ImageView
            android:layout_width="18dp"
            android:layout_height="18dp"
            android:src="@drawable/ic_volume_down_black_24dp"/>

        <SeekBar
            android:id="@+id/volumeBar"
            android:layout_width="300dp"
            android:layout_height="wrap_content"
            android:progress="50"
            android:max="100"/>

        <ImageView
            android:layout_width="26dp"
            android:layout_height="26dp"
            android:src="@drawable/ic_volume_up_black_24dp"/>

    </LinearLayout>

</LinearLayout>
```

### Step 5: Play Media

The play/pause button can be used to play or pause the music as follows:

```kotlin
    fun playBtnClick(v: View)
    {
        if (mp.isPlaying)
        {
            //stop
            mp.pause()
            playBtn.setBackgroundResource(R.drawable.ic_play_arrow_black_24dp)
        }
        else
        {
            //start
            mp.start()
            playBtn.setBackgroundResource(R.drawable.ic_stop_black_24dp)
        }
    }
```

Here's how a timer label is created for the music player:

```kotlin
    fun createTimeLable(time: Int): String
    {
        var timeLabel = ""
        var min = time / 100 / 60
        var sec = time / 100 % 60

        timeLabel = "$min:"
        if (sec < 10)
        {
            timeLabel += "0"
        }
        else
        {
            timeLabel += sec
        }
        return timeLabel
    }
```

Here is how the volume can be adjusted using a custom seekbar:

```kotlin
        volumeBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener{
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                if (fromUser)
                {
                    var volumeNum = progress / 100.0f
                    mp.setVolume(volumeNum, volumeNum)
                }
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })
```

And here is how we can adjust the music position or seek to a certain period of the music:

```kotlin
        positionBar.max = totalTime
        positionBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener{
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                if (fromUser)
                {
                    mp.seekTo(progress)
                }
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })
```

Here's the full code:

**MainActivity.kt**

```kotlin
import android.annotation.SuppressLint
import android.media.MediaPlayer
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Message
import android.view.View
import android.widget.SeekBar
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.Exception

class MainActivity : AppCompatActivity() {

    private lateinit var mp: MediaPlayer
    private var totalTime : Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mp = MediaPlayer.create(this, R.raw.music)
        mp.isLooping = true
        mp.setVolume(0.5f, 0.5f)
        totalTime = mp.duration

        // Volume Bar
        volumeBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener{
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                if (fromUser)
                {
                    var volumeNum = progress / 100.0f
                    mp.setVolume(volumeNum, volumeNum)
                }
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })

        positionBar.max = totalTime
        positionBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener{
            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                if (fromUser)
                {
                    mp.seekTo(progress)
                }
            }

            override fun onStartTrackingTouch(seekBar: SeekBar?) {

            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {

            }
        })
        Thread(Runnable {
            while (mp !=null)
            {
                try {
                    var msg = Message()
                    msg.what = mp.currentPosition
                    handler.sendMessage(msg)
                    Thread.sleep(1000)
                }
                catch (e: InterruptedException)
                {

                }
            }
        }).start()
    }

    @SuppressLint("HandlerLeak")
    var handler = object : Handler()
    {
        override fun handleMessage(msg: Message) {
            var currentPostion = msg.what

            // Update positionbar
            positionBar.progress = currentPostion

            // Update labels
            var elspedTime = createTimeLable(currentPostion)
            elapsedTimeLabel.text = elspedTime

            var remainingTime = createTimeLable(totalTime - currentPostion)
            remainingTimeLabel.text = "-$remainingTime"
        }
    }

    fun createTimeLable(time: Int): String
    {
        var timeLabel = ""
        var min = time / 100 / 60
        var sec = time / 100 % 60

        timeLabel = "$min:"
        if (sec < 10)
        {
            timeLabel += "0"
        }
        else
        {
            timeLabel += sec
        }
        return timeLabel
    }

    fun playBtnClick(v: View)
    {
        if (mp.isPlaying)
        {
            //stop
            mp.pause()
            playBtn.setBackgroundResource(R.drawable.ic_play_arrow_black_24dp)
        }
        else
        {
            //start
            mp.start()
            playBtn.setBackgroundResource(R.drawable.ic_stop_black_24dp)
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
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Play-Music-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
