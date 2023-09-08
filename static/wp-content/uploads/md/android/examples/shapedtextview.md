# ShapedTextView Examples


In this piece we will look at some shaped textviews that you can use in your project to achieve more stunning textviews.


## Example 1: Shaped TextViews using SuperTextView

Rather than using the good old simple textview, use this super powered custom view for a more modern look and feel of your textviews, edittexts and imageviews.

> SuperShapeView is a smart custom view support shapes for ImageView, TextView ,EditView ,instead of shape.xml. (custom shape control, support TextView, EditText).

Here is a demo of example project we will write shortly:

![](https://github.com/KingJA/SuperShapeView/raw/master/imgs/super_shape_view.png)

### Step 1: Install it

Start by installing it using the following implementation statement:

```groovy
 implementation 'com.kingja.supershapeview:supershapeview:1.2.0'
```

### Step 2: Add to Layout

Nextyou need to add the desired version to your layout:

For example you can add a textview as follows:

```xml
<com.kingja.supershapeview.view.SuperShapeTextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:padding="12dp"
    android:text="More"
    android:textColor="#d2490e"
    app:super_dashGap="2dp"
    app:super_dashWidth="2dp"
    app:super_solidColor="#ffffff"
    app:super_strokeColor="#d2490e"
    app:super_strokeWidth="1dp"/>
```

If you wan a shaped imageview you can add the following:

```xml
<com.kingja.supershapeview.view.SuperShapeImageView
    android:id="@+id/ssiv"
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:layout_marginLeft="12dp"
    android:layout_marginRight="12dp"
    android:onClick="changeIvStyle"
    android:scaleType="centerCrop"
    android:src="@mipmap/taylor"
    app:super_cornerRadius="50dp"
    app:super_strokeColor="#000000"
    app:super_strokeWidth="2dp"/>
```

### Step 3: Use

You can now reference and use the widgets.

```java
SuperShapeTextView superShapeTextView = (SuperShapeTextView) view;
```

There is no Kotlin/Java code needed. However if you want to modify the items programmatically you can use the following code for example:

```java
SuperManager superManager = superShapeTextView.getSuperManager();
superManager.setSolidColor(0xff303F9F);
superManager.setStrokeColor(getResources().getColor(R.color.colorAccent));
superManager.setCorner(20);//DP
superManager.setStrokeWidth(2);//DP
superManager.setDashGap(2);//DP
superManager.setDashWidth(2);//DP
superManager.setCorner(10,6,10,6);
...
```

### Full Example

1. Start by installing library as described above.
    
2. Create a `MainActivity` layout using the following code:
    

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:focusable="true"
              android:focusableInTouchMode="true"
              android:gravity="center"
              android:orientation="vertical"
              android:padding="12dp"
              tools:context="sample.kingja.supershapeview.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center">

        <com.kingja.supershapeview.view.SuperShapeImageView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:onClick="changeIvStyle"
            android:scaleType="centerCrop"
            android:src="@mipmap/jason"
            app:super_cornerRadius="50dp"/>

        <com.kingja.supershapeview.view.SuperShapeImageView
            android:id="@+id/ssiv"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginLeft="12dp"
            android:layout_marginRight="12dp"
            android:onClick="changeIvStyle"
            android:scaleType="centerCrop"
            android:src="@mipmap/taylor"
            app:super_dashGap="3dp"
            app:super_dashWidth="1dp"
            app:super_cornerRadius="16dp"
            app:super_strokeColor="@color/colorAccent"
            app:super_strokeWidth="6dp"/>

        <com.kingja.supershapeview.view.SuperShapeImageView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:onClick="changeIvStyle"
            android:scaleType="centerCrop"
            android:src="@mipmap/car"
            app:super_strokeColor="#000000"
            app:super_strokeWidth="2dp"
            app:super_bottomRightRadius="20dp"
            app:super_topLeftRadius="20dp"/>

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center">

        <com.kingja.supershapeview.view.SuperShapeRelativeLayout
            android:id="@+id/superShapeTextView2"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:gravity="center"
            android:text="添加"
            android:textColor="#ffffff"
            android:textSize="12sp"
            app:super_cornerRadius="25dp"
            app:super_solidColor="#45a65f">

            <ImageView
                android:layout_width="24dp"
                android:layout_height="24dp"
                android:background="@mipmap/send"/>

        </com.kingja.supershapeview.view.SuperShapeRelativeLayout>

        <com.kingja.supershapeview.view.SuperShapeTextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="12dp"
            android:layout_marginRight="12dp"
            android:gravity="center"
            android:paddingBottom="4dp"
            android:paddingLeft="12dp"
            android:paddingRight="12dp"
            android:paddingTop="4dp"
            android:text="关注"
            android:textColor="#ffffff"
            android:textSize="14sp"
            app:super_cornerRadius="4dp"
            app:super_solidColor="#f14b22"/>

        <com.kingja.supershapeview.view.SuperShapeLinearLayout
            android:layout_width="120dp"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal"
            android:orientation="horizontal"
            app:super_cornerRadius="20dp"
            app:super_solidColor="#e4261c"
            app:super_strokeWidth="2dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginRight="4dp"
                android:text="¥"
                android:textColor="#ffffff"/>

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginRight="4dp"
                android:text="27"
                android:textColor="#ffffff"
                android:textSize="30sp"/>

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="起"
                android:textColor="#ffffff"/>

        </com.kingja.supershapeview.view.SuperShapeLinearLayout>
    </LinearLayout>

    <com.kingja.supershapeview.view.SuperShapeTextView
        android:id="@+id/sstv"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center"
        android:padding="12dp"
        android:text="确定"
        android:textColor="#ffffff"
        app:super_cornerRadius="56dp"
        app:super_solidColor="#b143ba"/>

    <com.kingja.supershapeview.view.SuperShapeTextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center"
        android:padding="12dp"
        android:text="提交"
        android:textColor="#2360b6"
        app:super_cornerRadius="56dp"
        app:super_strokeColor="#2360b6"
        app:super_strokeWidth="1dp"/>

    <com.kingja.supershapeview.view.SuperShapeTextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center"
        android:padding="12dp"
        android:text="更多"
        android:textColor="#d2490e"
        app:super_dashGap="2dp"
        app:super_dashWidth="2dp"
        app:super_solidColor="#ffffff"
        app:super_strokeColor="#d2490e"
        app:super_strokeWidth="1dp"/>

    <com.kingja.supershapeview.view.SuperShapeTextView
        android:id="@+id/superShapeTextView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center"
        android:padding="12dp"
        android:text="加入"
        android:textColor="#ffffff"
        app:super_bottomLeftRadius="16dp"
        app:super_bottomRightRadius="4dp"
        app:super_solidColor="#e95a55"
        app:super_topLeftRadius="4dp"
        app:super_topRightRadius="16dp"/>

    <com.kingja.supershapeview.view.SuperShapeEditText
        android:id="@+id/sset"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:hint="请输入用户名"
        android:padding="12dp"
        android:textColorHint="#919191"
        android:textSize="12sp"
        app:super_cornerRadius="4dp"
        app:super_solidColor="#e7e7e7"
        app:super_strokeWidth="1dp"/>

    <com.kingja.supershapeview.view.SuperShapeLinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="12dp"
        android:gravity="center_vertical"
        android:paddingBottom="6dp"
        android:paddingLeft="12dp"
        android:paddingRight="12dp"
        android:paddingTop="6dp"
        android:textColorHint="#919191"
        android:textSize="12sp"
        app:super_cornerRadius="16dp"
        app:super_solidColor="#ffffff"
        app:super_strokeColor="#ff5912"
        app:super_strokeWidth="1dp">

        <EditText
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginRight="12dp"
            android:layout_weight="1"
            android:background="@null"
            android:hint="请输入商品名称"
            android:textSize="12sp"/>

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:background="@mipmap/close"/>
    </com.kingja.supershapeview.view.SuperShapeLinearLayout>

</LinearLayout>
```

3. Write Code. Here is the java code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void changeIvStyle(View view) {
        SuperShapeImageView superShapeImageView = (SuperShapeImageView) view;
        SuperManager superManager = superShapeImageView.getSuperManager();
        superManager.setStrokeColor(getResources().getColor(R.color.colorAccent));
        superManager.setStrokeWidth(new Random().nextInt(6));
        superManager.setDashGap(new Random().nextInt(6));
        superManager.setDashWidth(new Random().nextInt(6));
        superManager.setCorner(new Random().nextInt(10), new Random().nextInt(20), new Random().nextInt(30), new
                Random().nextInt(50));
    }

}
```

### Run

Copy the code into your project or download the code in the reference links below.

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/KingJA/SuperShapeView/tree/master/app) code |
| 2. | [Read more](https://github.com/KingJA/SuperShapeView) code author |
| 3. | [Follow](https://github.com/KingJA/) code author |
