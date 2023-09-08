# How to render Gifs - Android Solutions

A popular image format that adds more dynamism to your app and allows you to show more engaging content is the GIF. GIF is an acronym for Graphics Interchange Format and is a lossless format for image files that supports both animated and static images. In this tutorial we want to look at solutions and libraries that easen playing or rendering of gifs in our android apps.


## (a). Use GifView

> GifView is a Library for playing gifs on Android.

It is a simple android view to display gifs efficiently. You can start, pause and stop gifView.

### Step 1: Install GifView

Start by installing this GifView. In your root level build.gradle file, register jitpack as follows:

```groovy
repositories {
    maven {
        url "https://jitpack.io"
    }
}
```

Then in the app level build.gradle specify the following implementation statement under the dependencies closure:

```groovy
implementation 'com.github.Cutta:GifView:1.4'
```

### Step 2: Add GifView to Layout

Yeah, go to the xml layout where you want to render the GifView and add the following:

```xml
<com.cunoraz.gifview.library.GifView
            android:id="@+id/gif1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            custom:gif="@mipmap/gif1" />
```

### Step 3: Write Code

Now come and reference the GifView we had added in the xml layout:

```xml
  GifView gifView1 = (GifView) view.findViewById(R.id.gif1);
```

Here's how you play gif:

```java
 gifView1.play();
```

Here's how you pause gif:

```java
gifView1.pause();
```

Here's how you set a gif image to the GifView:

```java
 gifView1.setGifResource(R.mipmap.gif5);
```

### Example

There is a GifView example provided with this library:

**MainActivity**

```java

public class MainActivity extends AppCompatActivity {
    private Button pauseButton;
    private Button playButton;
    private Button nextButton;
    private Button dialogButton;
    private Button toastButton;
    private Button fragmentButton;
    private GifView gifView;
    private int index = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        gifView = findViewById(R.id.gif1);
        pauseButton = findViewById(R.id.button_gif_pause);
        playButton = findViewById(R.id.button_gif_play);
        nextButton = findViewById(R.id.button_gif_next);
        dialogButton = findViewById(R.id.button_dialog);
        fragmentButton = findViewById(R.id.fragment);
        toastButton = findViewById(R.id.toast);

        fragmentButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                openFragment();
            }
        });

        toastButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                showToast();

            }
        });

        pauseButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {

                if (gifView.isPlaying())
                    gifView.pause();
            }
        });
        playButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {

                if (gifView.isPaused())
                    gifView.play();
            }
        });
        nextButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
               switch (index % 10){
                   case 0:
                       gifView.setGifResource(R.mipmap.wine);
                       break;
                   case 1:
                       gifView.setGifResource(R.mipmap.gif1);
                       break;
                   case 2:
                       gifView.setGifResource(R.mipmap.gif2);
                       break;
                   case 3:
                       gifView.setGifResource(R.mipmap.gif3);
                       break;
                   case 4:
                       gifView.setGifResource(R.mipmap.gif4);
                       break;
                   case 5:
                       gifView.setGifResource(R.mipmap.gif5);
                       break;
                   case 6:
                       gifView.setGifResource(R.mipmap.gif6);
                       break;
                   case 7:
                       gifView.setGifResource(R.mipmap.gif7);
                       break;
                   case 8:
                       gifView.setGifResource(R.mipmap.gif8);
                       break;
                   case 9:
                       gifView.setGifResource(R.mipmap.gif9);
                       break;
               }
                index++;
            }
        });

        dialogButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                openDialog();
            }
        });
    }

    public void openFragment() {
        FragmentTransaction trans = getSupportFragmentManager()
                .beginTransaction();
        GifFragment fragmentLocal =  GifFragment.newInstance();
        fragmentLocal.setHasOptionsMenu(true);
        trans.replace(R.id.frame, fragmentLocal, fragmentLocal.getTAG());
        trans.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
        trans.addToBackStack(fragmentLocal.getTAG());
        trans.commitAllowingStateLoss();
    }

    public void showToast() {
        LayoutInflater inflater = getLayoutInflater();
        View layout = inflater.inflate(R.layout.custom_toast, null);
        Toast toastLocal = new Toast(getApplicationContext());
        toastLocal.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
        toastLocal.setDuration(Toast.LENGTH_LONG);
        toastLocal.setView(layout);
        toastLocal.show();
    }

    public void openDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.AppCompatAlertDialogStyle);
        builder.setView(getLayoutInflater().inflate(R.layout.dialog_deleting,null));
        builder.show();

    }

}
```

Find more code [here](https://github.com/Cutta/GifView/tree/master/app)

### Reference

Find more [here](https://github.com/Cutta/GifView)
