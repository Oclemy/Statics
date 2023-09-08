# Android ImageView Tutorial and Examples

> An android imageview tutorial and examples.

This is an android imageview tutorial and examples. We start by looking at the imageview, it's api definition, then discuss why it's needed, then several methods in this class and hwo to use. Then we look at various quick imageview examples.


##### What is ImageView?

ImageView is a class that allows us render images in an android app.

##### Why ImageView?

ImageView is one of the most important widgets in android. It's even strange to imagine how android apps would be without it. This is because imageview is probably one of those widgets that doesn't seem to have any viable alternatives.

You can say an alternative to TextView would be EditText, an alternative to Button would be clickable TextView, an alternative to RadioButton would be cleverly synchronized CheckBox, an alternative [ListView](https://android.camposha.info/en/listview) would be [RecyclerView](https://android.camposha.info/en/recyclerview) or one column GridView etc.

However for ImageView it is difficult to imagine an alternative. This is because while the others simply render text data, imageview renders binary data.

Hence it becomes very important to master this class because we will use it in almost every practical apps.

##### Common Applications of ImageView

Here are some of the common use cases of imageview:

1. While Making a Slider or Gallery.
2. While Rendering list of products in an ecommerce store. This is commonly done via adapterviews Grid RecyclerView or GridView. The products images get rendered in an imageview and alternative product text and description can be rendered below or beside the imageview.

#### Quick ImageView Examples and HowTo's

Lets start by looking at quick custom ImageView examples:

##### 1\. How to create a Square ImageView

Let's say we want to create a square imageview. That is an imageview where both width and height are the same.

First we will have our `SquareHelper` class:

```java
import android.content.res.TypedArray;
import android.support.annotation.IntDef;
import android.util.AttributeSet;
import android.view.View;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import online.sniper.R;

/**
 * Square view helper class
 */
public class SquareHelper {

    public static final int BASE_WIDTH = 0;
    public static final int BASE_HEIGHT = 1;
    public static final int BASE_MIN_EDGE = 2;
    public static final int BASE_MAX_EDGE = 3;

    @IntDef({BASE_WIDTH, BASE_HEIGHT, BASE_MAX_EDGE, BASE_MIN_EDGE})
    @Retention(RetentionPolicy.SOURCE)
    public @interface SquareViewEdge {

    }

    private View mView;
    private int mBaseEdge = BASE_WIDTH;

    public SquareHelper(View view, AttributeSet attrs) {
        mView = view;
        TypedArray a = view.getContext().obtainStyledAttributes(attrs, R.styleable.SquareView);
        try {
            mBaseEdge = a.getInt(R.styleable.SquareView_baseEdge, BASE_WIDTH);
        } finally {
            a.recycle();
        }
    }

    public void setBaseEdge(@SquareViewEdge int baseEdge) {
        mBaseEdge = baseEdge;
    }

    public int getMeasuredSize() {
        switch (mBaseEdge) {
            caseBASE_WIDTH:
                return mView.getMeasuredWidth();
            caseBASE_HEIGHT:
                return mView.getMeasuredHeight();
            caseBASE_MIN_EDGE:
                return Math.min(mView.getMeasuredWidth(), mView.getMeasuredHeight());
            caseBASE_MAX_EDGE:
                return Math.max(mView.getMeasuredWidth(), mView.getMeasuredHeight());
            default:
                returnmView.getMeasuredWidth();
        }
    }

}
```

Then our `SquareImageView`

```java
import android.content.Context;
import android.support.v7.widget.AppCompatImageView;
import  android.util.AttributeSet ;

public class SquareImageView extends AppCompatImageView {

    private final SquareHelper mHelper ;

    public SquareImageView(Context context) {
        this(context,null);
    }

    public SquareImageView(Context context, AttributeSet attrs) {
        super(context,attrs);
        mHelper = new SquareHelper(this, attrs);
    }

    @Override
    protectedvoid onMeasure(intwidthMeasureSpec,intheightMeasureSpec){
        super.onMeasure(widthMeasureSpec,heightMeasureSpec);
        int size = mHelper.getMeasuredSize();
        setMeasuredDimension(size, size);
    }

}
```

## More ImageView Examples

Let us look at libraries and examples related to enhancing an imageview or customizing it, for example to achieve a desired shape, or to add zoom capabilities etc.

[loop type=post taxonomy=chapter term=imageview orderby=date order=asc]

<h3>[loop-count]. [field chapter]</h3>

[field chapter_description]

<a href="[field url]">Read More.</a>


[/loop]
