# SeekBar Tutorial and Examples


_Android SeekBar Tutorial and Examples_

In this piece we look at the `SeekBar` class and several examples of this interesting class.


#### What is SeekBar?

_A SeekBar is an extension of ProgressBar that adds a draggable thumb._

The user can touch the thumb and drag left or right to set the current progress level or use the arrow keys. Placing focusable widgets to the left or right of a SeekBar is discouraged.

Normally Clients of the SeekBar can attach a `SeekBar.OnSeekBarChangeListener` to be notified of the user's actions. `SeekBar.OnSeekBarChangeListener` is a callback that notifies clients when the progress level has been changed. This includes changes that were initiated by the user through a touch gesture or arrow key/trackball as well as changes that were initiated programmatically.

#### Why SeekBar?

SeekBar is one of those underated UI components that you use almost on a dialy basis without knowing. You can talk about popular widgets like RecyclerView and Listview, but if you listen to music dialy then you are using a seekbar everyday.

The video and music players are the most common uses of SeekBar. Users can skip to a part of the media just by tapping or dragging with their thumbs.

However `SeekBar`, as we will see in our examples are not just limited to media players. Rather we can use them to input integers into our applications.

#### SeekBar API Definition

SeekBar resides in the `android.widget` package and derives from the `android.widget.AbsSeekBar` class.

```java
public class SeekBar extends AbsSeekBar
```

Here's the inheritance chain of seekbar:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.widget.ProgressBar
           ↳    android.widget.AbsSeekBar
               ↳    android.widget.SeekBar
```

#### Important Methods

**(a). onProgressChanged**

```java
public abstract void onProgressChanged (SeekBar seekBar,
                int progress,
                boolean fromUser)
```

Notification that the progress level has changed. Clients can use the fromUser parameter to distinguish user-initiated changes from those that occurred programmatically.

The parameters are:

1. `SeekBar` - The SeekBar whose progress has changed
2. `progress int`: The current progress level. This will be in the range min..max where min and max were set by `ProgressBar.setMin(int)` and `ProgressBar.setMax(int)`, respectively. (The default values for min is 0 and max is `100`.)
3. `fromUser boolean`: True if the progress change was initiated by the user.

**(b). onStartTrackingTouch**

```java
public abstract void onStartTrackingTouch (SeekBar seekBar)
```

Notification that the user has started a touch gesture. Clients may want to use this to disable advancing the seekbar.

The Parameters are:

1. `seekBar SeekBar`: The SeekBar in which the touch gesture began

**(c). onStopTrackingTouch**

```java
public abstract void onStopTrackingTouch (SeekBar seekBar)
```

Notification that the user has finished a touch gesture. Clients may want to use this to re-enable advancing the seekbar.

The Parameters are:

1. `seekBar SeekBar`: The SeekBar in which the touch gesture began

[notice] The above methods are not defined directly in seekbar class but inside the `OnSeekBarChangeListener` interface. However that interface resides in the seekbar class. [/notice]

### SeekBar Examples

#### 1\. SeekBar Example - Show Progress in a TextView

Here's the code for first example:

**(a). MainActivity.java**

Here's our main [activity](https://camposha.info/android/activity).

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.SeekBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SeekBar.OnSeekBarChangeListener{

    private SeekBar seekBar ;
    private TextView tv1 ;
    private TextView tv2 ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        seekBar = (SeekBar) findViewById(R.id.seekbar);
        tv1 = (TextView) findViewById(R.id.tv1);
        tv2= (TextView) findViewById(R.id.tv2);

        seekBar.setOnSeekBarChangeListener(this);
    }

    /**
     * Value change
     * @param seekBar
     * @param progress
     * @param fromUser
     */
    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        tv1.setText("dragging" );
        tv2.setText("current value: " + progress );
    }

    /**
     * Start dragging
     * @param seekBar
     */
    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
        tv1.setText("start dragging");
    }

    // Stop the move
    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
        tv1.setText("stop dragging");
    }
}
```

**(b). main.xml**

Here's the main layout for activity. Here we will have a Seekbar as well as several TextViews. We organize them vertically with a [LinearLayout](https://camposha.info/android/linearlayout).

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical">

    <SeekBar
        android_thumb="@drawable/my_thumb"
        android_id="@+id/seekbar"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_max="100"
        android_progress="50"/>
    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_id="@+id/tv1"/>
    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_id="@+id/tv2"/>
</LinearLayout>
```
