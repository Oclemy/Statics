# Android Dual ProgressBar Example

You may need a progressbar that accounts for two progresses at the same time, for example let's say red progress and blue progress. As the red progress increases, the blue progress can increase or decrease and vice versa. This is the dual progress we are talking about.

Let's look at some examples.


## Example: Stacked Horizontal ProgressBar

An example that shows two progress indicators in one horizontal progress bar.

Here is the demo of what is created:

![Stacked Horizontal ProgressBar](https://github.com/nisrulz/stackedhorizontalprogressbar/raw/master/img/walkthrough-cropped.gif)

### Step 1: Install library

Start by installing the following library:

```groovy
implementation 'com.github.nisrulz:stackedhorizontalprogressbar:1.0.3'
```

### Step 2: Add to Layout

Now add this stackedhorizontal progressbar in your xml layout:

```xml
 <github.nisrulz.stackedhorizontalprogressbar.StackedHorizontalProgressBar
         android:id="@+id/stackedhorizontalprogressbar"
         style="?android:attr/progressBarStyleHorizontal"
         android:layout_width="match_parent"
         android:layout_height="wrap_content"
         android:layout_margin="5dp"
         android:progressDrawable="@drawable/stacked_horizontal_progress"/>
```

### Step 3: Write Code

Now reference the two progress sections as below:

```java
int primary_pts = 3;
int secondary_pts = 6;
int max = 10;

StackedHorizontalProgressBar stackedHorizontalProgressBar;
stackedHorizontalProgressBar = (StackedHorizontalProgressBar) findViewById(R.id.stackedhorizontalprogressbar);
stackedHorizontalProgressBar.setMax(max);
stackedHorizontalProgressBar.setProgress(primary_pts);
stackedHorizontalProgressBar.setSecondaryProgress(secondary_pts);
```

You can change the colors simply by placing and modifying the following two color items:

```xml
<!-- Stacked Horizontal Progressbar Colors -->
<color name="shpbr_primary_progress">#3F51B5</color>
<color name="shpbr_secondary_progress">#FF4081</color>
```

### Full Example

The example comprises two files:

1. MainActivity.java
2. activity_main.xml

**activity_main.xml**

Add the following code in your main activity layout:

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".MainActivity"
    >

  <github.nisrulz.stackedhorizontalprogressbar.StackedHorizontalProgressBar
      android:id="@+id/stackedhorizontalprogressbar"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:progressDrawable="@drawable/stacked_horizontal_progress"
      style="?android:attr/progressBarStyleHorizontal"
      />

  <TextView
      android:padding="10dp"
      android:id="@+id/txt_primary"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="left"
      android:textSize="25sp"
      tools:text="Primary Value : 70%"
      />
  <TextView
      android:padding="10dp"
      android:id="@+id/txt_secondary"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:gravity="left"
      android:textSize="25sp"
      tools:text="Secondary Value : 50%"
      />
  <Button
      android:padding="10dp"
      android:id="@+id/btn_reload"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Reload"
      />
</LinearLayout>
```

**MainActivity.java**

Here is the main activity code:

```java
public class MainActivity extends AppCompatActivity {

  final int primary_pts = 50;
  int secondary_pts = 40;
  int max = 100;

  int countPrimary = 0;
  int countSecondary = 0;
  StackedHorizontalProgressBar stackedHorizontalProgressBar;
  Handler handlerPrimaryProgress, handlerSecondaryProgress;

  TextView txt_primary, txt_secondary;
  Button btn_reload;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    stackedHorizontalProgressBar =
        (StackedHorizontalProgressBar) findViewById(R.id.stackedhorizontalprogressbar);
    stackedHorizontalProgressBar.setMax(max);

    txt_primary = (TextView) findViewById(R.id.txt_primary);
    txt_secondary = (TextView) findViewById(R.id.txt_secondary);

    btn_reload = (Button) findViewById(R.id.btn_reload);
    btn_reload.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {

        handlerPrimaryProgress.removeCallbacks(runnablePrimary);
        handlerSecondaryProgress.removeCallbacks(runnableSecondary);

        countPrimary = 0;
        stackedHorizontalProgressBar.setProgress(countPrimary);
        txt_primary.setText("Primary Value : " + countPrimary + "%");

        countSecondary = 0;
        stackedHorizontalProgressBar.setSecondaryProgress(countSecondary);
        txt_secondary.setText("Secondary Value : " + countSecondary + "%");

        handlerPrimaryProgress.post(runnablePrimary);
        handlerSecondaryProgress.post(runnableSecondary);
      }
    });

    handlerPrimaryProgress = new Handler();
    handlerSecondaryProgress = new Handler();

    handlerPrimaryProgress.post(runnablePrimary);
    handlerSecondaryProgress.post(runnableSecondary);
  }

  Runnable runnablePrimary = new Runnable() {
    @Override
    public void run() {
      if (countPrimary <= primary_pts) {
        stackedHorizontalProgressBar.setProgress(countPrimary);
        txt_primary.setText("Primary Value : " + countPrimary + "%");
        handlerPrimaryProgress.postDelayed(runnablePrimary, 50);
        countPrimary++;
      }
    }
  };

  Runnable runnableSecondary = new Runnable() {
    @Override
    public void run() {
      if (countSecondary <= secondary_pts) {
        stackedHorizontalProgressBar.setSecondaryProgress(countSecondary);
        txt_secondary.setText("Secondary Value : " + countSecondary + "%");
        handlerSecondaryProgress.postDelayed(runnableSecondary, 50);
        countSecondary++;
      }
    }
  };
}
```

### Reference

Find download links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/nisrulz/stackedhorizontalprogressbar/archive/refs/heads/master.zip) code |
| 2. | [Read more](https://github.com/nisrulz/stackedhorizontalprogressbar/) code |
| 1. | [Follow](https://github.com/nisrulz/) code author |
