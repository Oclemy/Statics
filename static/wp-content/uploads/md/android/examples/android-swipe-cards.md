# Swipe Cards Libraries


You may be creating an application that requires the ability to show some swipe cards. Users would probably swipe just to view some info like news articles or swipe to select. This type of features is common in dating apps where you swipe to select a person.

In this tutorial lets share some examples and best libraries so that you can easily add this feature in your app.


Feel free to add some yourself.

## (a). Swipe Cards with SwipeView

SwipeView is a a Tinder style StackSwipeview gesture library. It supports android API 15 and above.

Here is how to use it.

### Step 1 - Installation

To Install the library first add jitpack in your project level's build.gradle:

maven { url '[https://jitpack.io](https://jitpack.io)' }

Then the dependency statement in your app level's build.gradle:

```
dependencies {
  implementation 'com.github.umutsoysl:SwipeView:1.0'
}
```

### Step 2 - Layout

Add the SwipeView in your layout:

```
<com.umut.soysal.swipelayoutview.ui.StackImageView
               android:id="@+id/iv_avatar"
               android:layout_width="match_parent"
               android:layout_height="match_parent"
               android:scaleType="centerCrop"
               app:radius="10dp"
               android:src="@drawable/img_avatar_01" />
```

### Step 3 - Code

In your activity or fragment start by initializing your recyclerview as usual:

RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView); recyclerView.setAdapter(...);

then set \\`CardLayoutManager\` for RecyclerView and \\`CardItemTouchHelperCallback\` for ItemTouchHelper . In addition , don't forget set \\`OnSwipeListener\` for \\`CardItemTouchHelperCallback\` :

```
// dataList means dataSource for adapter
CardItemTouchHelperCallback cardCallback = new CardItemTouchHelperCallback(recyclerView.getAdapter(), dataList);
ItemTouchHelper touchHelper = new ItemTouchHelper(cardCallback); CardLayoutManager cardLayoutManager = new CardLayoutManager(recyclerView, touchHelper);
recyclerView.setLayoutManager(cardLayoutManager);
touchHelper.attachToRecyclerView(recyclerView);
cardCallback.setOnSwipedListener(new OnSwipeListener<T>() {

    @Override
    public void onSwiping(RecyclerView.ViewHolder viewHolder, float ratio, int direction) {
        /**
         * will callback when the card are swiping by user
         * viewHolder : thee viewHolder of swiping card
         * ratio : the ratio of swiping , you can add some animation by the ratio
         * direction : CardConfig.SWIPING_LEFT means swiping from left；CardConfig.SWIPING_RIGHT means swiping from right
         *             CardConfig.SWIPING_NONE means not left nor right
         */
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, T t, int direction) {
        /**
         *  will callback when the card swiped from screen by user
         *  you can also clean animation from the itemview of viewHolder in this method
         *  viewHolder : the viewHolder of swiped cards
         *  t : the data of swiped cards from dataList
         *  direction : CardConfig.SWIPED_LEFT means swiped from left；CardConfig.SWIPED_RIGHT means swiped from right
         */
    }

    @Override
    public void onSwipedClear() {
        /**
         *  will callback when all cards swiped clear
         *  you can load more data
         */
    }

});
```

\### step 3

```

/*
*Create stack photoview list
*/
 private void initData() {
        list.add(R.drawable.img_avatar_01);
        list.add(R.drawable.img_avatar_02);
        list.add(R.drawable.img_avatar_03);
        list.add(R.drawable.img_avatar_04);
        list.add(R.drawable.img_avatar_05);
        list.add(R.drawable.img_avatar_06);
        list.add(R.drawable.img_avatar_07);

    }
```

## Full Example

Here is a full example of how to use swipe view.

### (a). MainActivity

Here is the code for our only class, the main activity.

```
public class MainActivity extends AppCompatActivity {

    private List<Integer> list = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        initData();
    }

    private void initView() {
        final RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(new StackViewAdapter());
        StackItemTouchHelperCallback cardCallback = new StackItemTouchHelperCallback(recyclerView.getAdapter(), list);
        cardCallback.setOnSwipedListener(new OnSwipeListener<Integer>() {

            @Override
            public void onSwiping(RecyclerView.ViewHolder viewHolder, float ratio, int direction) {
                StackViewAdapter.MyViewHolder myHolder = (StackViewAdapter.MyViewHolder) viewHolder;
                viewHolder.itemView.setAlpha(1 - Math.abs(ratio) * 0.2f);
                if (direction == Utility.SWIPING_LEFT) {
                    myHolder.dislikeImageView.setAlpha(Math.abs(ratio));
                } else if (direction == Utility.SWIPING_RIGHT) {
                    myHolder.likeImageView.setAlpha(Math.abs(ratio));
                } else {
                    myHolder.dislikeImageView.setAlpha(0f);
                    myHolder.likeImageView.setAlpha(0f);
                }
            }

            @Override
            public void onSwiped(RecyclerView.ViewHolder viewHolder, Integer o, int direction) {
                StackViewAdapter.MyViewHolder myHolder = (StackViewAdapter.MyViewHolder) viewHolder;
                viewHolder.itemView.setAlpha(1f);
                myHolder.dislikeImageView.setAlpha(0f);
                myHolder.likeImageView.setAlpha(0f);
                Toast.makeText(MainActivity.this, direction == Utility.SWIPED_LEFT ? "dislike" : "like", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onSwipedClear() {
                Toast.makeText(MainActivity.this, "finish data", Toast.LENGTH_SHORT).show();
                recyclerView.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        initData();
                        recyclerView.getAdapter().notifyDataSetChanged();
                    }
                }, 3000L);
            }

        });
        final ItemTouchHelper touchHelper = new ItemTouchHelper(cardCallback);
        final StackLayoutViewManager cardLayoutManager = new StackLayoutViewManager(recyclerView, touchHelper);
        recyclerView.setLayoutManager(cardLayoutManager);
        touchHelper.attachToRecyclerView(recyclerView);
    }

    private void initData() {
        list.add(R.drawable.img_avatar_01);
        list.add(R.drawable.img_avatar_02);
        list.add(R.drawable.img_avatar_03);
        list.add(R.drawable.img_avatar_04);
        list.add(R.drawable.img_avatar_05);
        list.add(R.drawable.img_avatar_06);
        list.add(R.drawable.img_avatar_07);

    }

    private class StackViewAdapter extends RecyclerView.Adapter {
        @Override
        public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item, parent, false);
            return new MyViewHolder(view);
        }

        @Override
        public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
            ImageView avatarImageView = ((MyViewHolder) holder).avatarImageView;
            avatarImageView.setImageResource(list.get(position));
        }

        @Override
        public int getItemCount() {
            return list.size();
        }

        class MyViewHolder extends RecyclerView.ViewHolder {

            StackImageView avatarImageView;
            ImageView likeImageView;
            ImageView dislikeImageView;

            MyViewHolder(View itemView) {
                super(itemView);
                avatarImageView = (StackImageView) itemView.findViewById(R.id.iv_avatar);
                likeImageView = (ImageView) itemView.findViewById(R.id.iv_like);
                dislikeImageView = (ImageView) itemView.findViewById(R.id.iv_dislike);
            }

        }
    }

}
```

### Run

If you run the project you get the following:

![Android SwipeView](https://android.camposha.info/wp-content/uploads/2020/09/swipeview.gif)

## (b). ShyShark

_ShyShark is Swipeable card stack view like Tinder._

This library is written in Kotlin by extending RecyclerView to create a ShySharkView. The library is written with only 4 kotlin files so it's easy to customize if you want to create something unique. Furthermore, it doesn't use any external library. The only package it utilizes is RecyclerView and of course the AppCompat. This makes it reliable to use and lightweight.

### Step 1 - How to Install

Install it using the following command:

dependencies { implementation 'life.sabujak:shyshark:0.0.3' }

### Step 2

Add the following to your layout.

```
<life.sabujak.shyshark.ShySharkView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:layout_marginBottom="16dp"
    app:autoDraggingAnimationDuration="200"
    app:dragThrashold="0.1"
    app:layout_constraintBottom_toTopOf="@+id/fab_main_good"
    app:layout_constraintTop_toTopOf="parent"
    app:restoreScaleAnimationDuration="200"
    app:scaleGap="0.5"
    app:swipeableFlag="swipe_horizontal" />
```

### Step 3

Then in kotlin code:

```
recyclerView.setOnSwipeListener(object :
    OnSwipeListener {
    override fun onSwiped(position: Int, direction: Int) {
    }

    override fun onChangeHorizontalDrag(direction: Int, percent: Float) {
    }

    override fun onChangeVerticalDrag(direction: Int, percent: Float) {
    }
})
```

## FULL EXAMPLE

Let's look at a full example, to create swipeable cards.

### (a). SimpleAdapter.kt

First create an adapter class.

```
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso

class SimpleAdapter(private val sharkImages:List<Int>) : RecyclerView.Adapter<SimpleAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LayoutInflater.from(parent.context).inflate(
                R.layout.item_simple,
                parent,
                false
            )
        )
    }

    override fun getItemCount() = sharkImages.count()

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.setData(position, sharkImages[position])
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val textView = itemView.findViewById<TextView>(R.id.textView)
        private val imageView = itemView.findViewById<ImageView>(R.id.imageView)

        fun setData(position: Int, image:Int) {
            textView.text = position.toString()
            Picasso.get()
                .load(image)
                .fit()
                .centerCrop()
                .into(imageView)
        }

    }

}
```

### (a). MainActivity.kt

Then a main activity class.

```
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import life.sabujak.shyshark.ShySharkLayoutManager.Companion.SWIPE_BOTTOM
import life.sabujak.shyshark.ShySharkLayoutManager.Companion.SWIPE_LEFT
import life.sabujak.shyshark.ShySharkLayoutManager.Companion.SWIPE_RIGHT
import life.sabujak.shyshark.ShySharkLayoutManager.Companion.SWIPE_TOP
import life.sabujak.shyshark.listener.OnSwipeListener

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recyclerView.adapter = SimpleAdapter(
            arrayListOf(
                R.drawable.shyshark_1,
                R.drawable.shyshark_2,
                R.drawable.shyshark_3,
                R.drawable.shyshark_4,
                R.drawable.shyshark_5,
                R.drawable.shyshark_6,
                R.drawable.shyshark_7,
                R.drawable.shyshark_8,
                R.drawable.shyshark_9
            )
        )
        recyclerView.setOnSwipeListener(object :
            OnSwipeListener {
            override fun onSwiped(position: Int, direction: Int) {
                when (direction) {
                    SWIPE_LEFT -> {
                        println("swiped LEFT!! $position")
                    }
                    SWIPE_RIGHT -> {
                        println("swiped RIGHT $position")
                    }
                    SWIPE_TOP -> {
                        println("swiped TOP $position")
                    }
                    SWIPE_BOTTOM -> {
                        println("swiped BOTTOM $position")
                    }
                }
            }

            override fun onChangeHorizontalDrag(direction: Int, percent: Float) {
                println("changeHorizontalDrag $direction $percent")
            }

            override fun onChangeVerticalDrag(direction: Int, percent: Float) {
                println("changeVerticalDrag $direction $percent")
            }
        })

        fab_main_good.setOnClickListener {
            recyclerView.performSwipe(SWIPE_RIGHT)
        }
        fab_main_bad.setOnClickListener {
            recyclerView.performSwipe(SWIPE_LEFT)
        }
        fab_main_next.setOnClickListener {
            recyclerView.nextView()
        }
        fab_main_previous.setOnClickListener {
            recyclerView.previousView()
        }
    }
}
```

### Demo

Here is what you get:

![Android Swipe Cards](https://github.com/sabujak-sabujak/ShyShark/raw/develop/pic/sample.gif)

### Download

This example is written by [@sabujak-sabujak](https://github.com/sabujak-sabujak/ShyShark).

Direct Download the code [here](https://github.com/sabujak-sabujak/ShyShark/archive/develop.zip).
