# Android FloatingActionButton Libraries

Years back with one of the most visible components introduced with the design support library was the Floating Action Button. As a component widely used, several customizations of this widget have also risen and we aim to look at these in this article.


## (a). CounterFAB

> A FloatingActionButton subclass that shows a counter badge on right top corner.

Here's its demo:

![](https://raw.githubusercontent.com/andremion/CounterFab/master/art/sample.gif)

### Step 1: Install the library

Start by installing the library from maven central. Add the following in your dependencies closure in your build.gradle file:

```groovy
implementation 'com.github.andremion:counterfab:1.2.2'
```

Now sync to download the library.

### Step 2: Add CounterFAB to Layout

Add the following in the location where you want the counterfab to appear in your xml layout:

```xml
<com.andremion.counterfab.CounterFab
        android:id="@+id/counter_fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/ic_add_white_24dp" />
```

You can also customize it by providing attributes:

```xml
<com.andremion.counterfab.CounterFab
        android:id="@+id/counter_fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:badgeBackgroundColor="@color/red"
        app:badgeTextColor="@color/white"
        app:badgePosition="RightTop"
        android:src="@drawable/ic_add_white_24dp" />
```

That's it. You now have CounterFAB. You can reference it and maybe listen to its click events.

You can alsocreate it programmatically:

```java
CounterFab counterFab = (CounterFab) findViewById(R.id.counter_fab);
counterFab.setCount(10); // Set the count value to show on badge
counterFab.increase(); // Increase the current count value by 1
counterFab.decrease(); // Decrease the current count value by 1
```

### Example

There is an example.

**Mainactivity.java**

The main activity, we will listen to checked change events right here:

```java
public class MainActivity extends AppCompatActivity {

    private RadioGroup mCounterMode;
    private CounterFab mCounterFab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mCounterMode = findViewById(R.id.counter_mode);
        mCounterMode.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                if (checkedId == R.id.increase_button) {
                    mCounterFab.setImageResource(R.drawable.ic_add_white_24dp);
                } else {
                    mCounterFab.setImageResource(R.drawable.ic_remove_white_24dp);
                }
            }
        });

        mCounterFab = findViewById(R.id.fab);
        mCounterFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mCounterMode.getCheckedRadioButtonId() == R.id.increase_button) {
                    mCounterFab.increase();
                } else {
                    mCounterFab.decrease();
                }
            }
        });
    }

}
```

**Layouts**

You can find layouts [here](https://github.com/andremion/CounterFab/tree/development/sample).

### Reference

Find complete source code reference [here](https://github.com/andremion/CounterFab).
