# Picasso Transformations

>  An Android transformation library providing a variety of image transformations for [Picasso](https://andrpod.camposha.info/en/picasso).

![Picasso Transformation Tutorial](https://camo.githubusercontent.com/9330efc6e55b251db7966bffaec1bd48e3aae79348121f596d541991cfec8858/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d417061636865253230322d626c75652e737667)

![Picasso Transformation Tutorial](https://camo.githubusercontent.com/8f02fb5f53d13fff2072f4f3639169d637664d53132bf145a258626356771acf/68747470733a2f2f6d6176656e2d6261646765732e6865726f6b756170702e636f6d2f6d6176656e2d63656e7472616c2f6a702e77617361626565662f7069636173736f2d7472616e73666f726d6174696f6e732f62616467652e737667)

An Android transformation library providing a variety of image transformations for [Picasso](https://andrpod.camposha.info/en/picasso) .


Here are the demos:

### Original Image

![Picasso Transformation Tutorial](https://github.com/wasabeef/picasso-transformations/raw/main/art/demo-org.jpg)


### Transformations

![Picasso Transformation Tutorial](https://github.com/wasabeef/picasso-transformations/raw/main/art/demo.gif)


Follow these steps to use this library:


### Step 1: Install it

```gradle
repositories {
    mavenCentral()
}

dependencies {
    implementation 'jp.wasabeef:picasso-transformations:2.4.0'
    // If you want to use the GPU Filters
    implementation 'jp.co.cyberagent.android:gpuimage:2.1.0
}
```


### Step 2: Set Transformation

Set [Picasso](https://andrpod.camposha.info/en/picasso)  Transform.

```java
Picasso.with(mContext).load(R.drawable.demo)
    .transform(transformation).into((ImageView) findViewById(R.id.image));
```


### Step 3(Advanced) : Multiple Transformations

You can set a multiple transformations.

```java
Picasso.with(mContext).load(R.drawable.demo)
    .transform(transformation)
    .transform(new CropCircleTransformation())
    .into(holder.image);
```


### Transformations


#### Crop

- `RoundedCornersTransformation`

#### Color

- `ColorFilterTransformation`, `GrayscaleTransformation`

#### Blur

-`BlurTransformation`

#### Mask

- `MaskTransformation`

#### GPU Filter (use GPUImage)

Will require add dependencies for GPUImage.
-`VignetteFilterTransformation`



### Full Example

Let us look at a full android Picasso Transformation sample project.

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `layout_list_item.xml`**


> Our `layout_list_item` layout.

Inside your `/res/layout/` directory create an xml layout file named `layout_list_item.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="wrap_content">

  <ImageView
    android:id="@+id/image"
    android:layout_width="250dp"
    android:layout_height="250dp"
    android:layout_marginBottom="8dp"
    android:layout_marginEnd="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginTop="8dp"
    android:cropToPadding="false"
    android:scaleType="fitCenter"
    app:layout_constraintBottom_toTopOf="@+id/title"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

  <TextView
    android:id="@+id/title"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginBottom="8dp"
    android:layout_marginEnd="8dp"
    android:layout_marginStart="8dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>

```

**(b). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`androidx.recyclerview.widget.RecyclerView`](https://android.camposha.info/en/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="match_parent">

  <androidx.recyclerview.widget.RecyclerView
    android:id="@+id/list"
    android:layout_width="0dp"
    android:layout_height="0dp"
    android:layout_marginBottom="8dp"
    android:layout_marginEnd="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginTop="8dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `Utils.java`**

> Our `Utils` class.

Create a java file named `Utils.java`.

We will be creating the following methods:

1. `toDp(Context context, float dp)` - It will return `int` object.

Here is the full code:

```java
package replace_with_your_package_name;

import android.content.Context;

public class Utils {

  public static int toDp(Context context, float dp) {
    float scale = context.getResources().getDisplayMetrics().density;
    return (int) (dp * scale + 0.5f);
  }
}


```

**(b). `MainAdapter.java`**

> Our `MainAdapter` class.

Create a java file named `MainAdapter.java`.

Then create a class that extends `RecyclerView.Adapter<MainAdapter.ViewHolder>` and add its contents as follows:

We will be overriding the following methods: 

1. `onCreateViewHolder(ViewGroup)`.
2. `onBindViewHolder(MainAdapter.ViewHolder)`.
3. `getItemCount()`.

We will be creating the following methods:

Here is the full code:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PointF;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.List;

import jp.wasabeef.picasso.transformations.BlurTransformation;
import jp.wasabeef.picasso.transformations.ColorFilterTransformation;
import jp.wasabeef.picasso.transformations.CropCircleTransformation;
import jp.wasabeef.picasso.transformations.CropSquareTransformation;
import jp.wasabeef.picasso.transformations.CropTransformation;
import jp.wasabeef.picasso.transformations.GrayscaleTransformation;
import jp.wasabeef.picasso.transformations.MaskTransformation;
import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;
import jp.wasabeef.picasso.transformations.gpu.BrightnessFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.ContrastFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.InvertFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.KuwaharaFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.PixelationFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.SepiaFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.SketchFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.SwirlFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.ToonFilterTransformation;
import jp.wasabeef.picasso.transformations.gpu.VignetteFilterTransformation;

/**
 * Created by Wasabeef on 2015/01/11.
 */
public class MainAdapter extends RecyclerView.Adapter<MainAdapter.ViewHolder> {

  private Context mContext;
  private List<Type> mDataSet;

  enum Type {
    Mask,
    NinePatchMask,
    CropLeftTop,
    CropLeftCenter,
    CropLeftBottom,
    CropCenterTop,
    CropCenterCenter,
    CropCenterBottom,
    CropRightTop,
    CropRightCenter,
    CropRightBottom,
    CropSquareCenterCenter,
    Crop169CenterCenter,
    Crop43CenterCenter,
    Crop31CenterCenter,
    Crop31CenterTop,
    CropQuarterCenterCenter,
    CropQuarterCenterTop,
    CropQuarterBottomRight,
    CropHalfWidth43CenterCenter,
    CropSquare,
    CropCircle,
    ColorFilter,
    Grayscale,
    RoundedCorners,
    Blur,
    Toon,
    Sepia,
    Contrast,
    Invert,
    Pixel,
    Sketch,
    Swirl,
    Brightness,
    Kuawahara,
    Vignette
  }

  public MainAdapter(Context context, List<Type> dataSet) {
    mContext = context;
    mDataSet = dataSet;
  }

  @Override
  public MainAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    View v = LayoutInflater.from(mContext).inflate(R.layout.layout_list_item, parent, false);
    return new ViewHolder(v);
  }

  @Override
  public void onBindViewHolder(MainAdapter.ViewHolder holder, int position) {
    switch (mDataSet.get(position)) {
      case Mask: {
        int width = Utils.toDp(mContext, 266.66f);
        int height = Utils.toDp(mContext, 252.66f);
        Picasso.get()
          .load(R.drawable.check)
          .resize(width, height)
          .centerCrop()
          .transform((new MaskTransformation(mContext, R.drawable.mask_starfish)))
          .into(holder.image);
        break;
      }
      case NinePatchMask: {
        int width = Utils.toDp(mContext, 300.0f);
        int height = Utils.toDp(mContext, 200.0f);
        Picasso.get()
          .load(R.drawable.check)
          .resize(width, height)
          .centerCrop()
          .transform(new MaskTransformation(mContext, R.drawable.chat_me_mask))
          .into(holder.image);
        break;
      }
      case CropLeftTop:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.LEFT,
            CropTransformation.GravityVertical.TOP))
          .into(holder.image);
        break;
      case CropLeftCenter:
        Picasso.get().load(R.drawable.demo)
          // 300, 100, CropTransformation.GravityHorizontal.LEFT, CropTransformation.GravityVertical.CENTER))
          .transform(new CropTransformation(300, 100)).into(holder.image);
        break;
      case CropLeftBottom:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.LEFT,
            CropTransformation.GravityVertical.BOTTOM))
          .into(holder.image);
        break;
      case CropCenterTop:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.TOP))
          .into(holder.image);
        break;
      case CropCenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100))
          .into(holder.image);
        break;
      case CropCenterBottom:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.BOTTOM))
          .into(holder.image);
        break;
      case CropRightTop:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
            CropTransformation.GravityVertical.TOP))
          .into(holder.image);
        break;
      case CropRightCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case CropRightBottom:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
            CropTransformation.GravityVertical.BOTTOM))
          .into(holder.image);
        break;
      case Crop169CenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 16 / (float) 9,
            CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case Crop43CenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 4 / (float) 3,
            CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case Crop31CenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(3, CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case Crop31CenterTop:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(3, CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.TOP))
          .into(holder.image);
        break;
      case CropSquareCenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation(1, CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case CropQuarterCenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 0.5, (float) 0.5,
            CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case CropQuarterCenterTop:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 0.5, (float) 0.5,
            CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.TOP))
          .into(holder.image);
        break;
      case CropQuarterBottomRight:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 0.5, (float) 0.5,
            CropTransformation.GravityHorizontal.RIGHT,
            CropTransformation.GravityVertical.BOTTOM))
          .into(holder.image);
        break;
      case CropHalfWidth43CenterCenter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropTransformation((float) 0.5, 0, (float) 4 / (float) 3,
            CropTransformation.GravityHorizontal.CENTER,
            CropTransformation.GravityVertical.CENTER))
          .into(holder.image);
        break;
      case CropSquare:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropSquareTransformation())
          .into(holder.image);
        break;
      case CropCircle:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new CropCircleTransformation())
          .into(holder.image);
        break;
      case ColorFilter:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new ColorFilterTransformation(Color.argb(80, 255, 0, 0)))
          .into(holder.image);
        break;
      case Grayscale:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new GrayscaleTransformation())
          .into(holder.image);
        break;
      case RoundedCorners:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new RoundedCornersTransformation(120, 0,
            RoundedCornersTransformation.CornerType.DIAGONAL_FROM_TOP_LEFT))
          .into(holder.image);
        break;
      case Blur:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new BlurTransformation(mContext, 25, 1))
          .into(holder.image);
        break;
      case Toon:
        Picasso.get()
          .load(R.drawable.demo)
          .transform(new ToonFilterTransformation(mContext))
          .into(holder.image);
        break;
      case Sepia:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new SepiaFilterTransformation(mContext))
          .into(holder.image);
        break;
      case Contrast:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new ContrastFilterTransformation(mContext, 2.0f))
          .into(holder.image);
        break;
      case Invert:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new InvertFilterTransformation(mContext))
          .into(holder.image);
        break;
      case Pixel:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new PixelationFilterTransformation(mContext, 20))
          .into(holder.image);
        break;
      case Sketch:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new SketchFilterTransformation(mContext))
          .into(holder.image);
        break;
      case Swirl:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new SwirlFilterTransformation(mContext, 0.5f, 1.0f, new PointF(0.5f, 0.5f)))
          .into(holder.image);

        break;
      case Brightness:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new BrightnessFilterTransformation(mContext, 0.5f))
          .into(holder.image);
        break;
      case Kuawahara:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new KuwaharaFilterTransformation(mContext, 25))
          .into(holder.image);
        break;
      case Vignette:
        Picasso.get()
          .load(R.drawable.check)
          .transform(new VignetteFilterTransformation(mContext, new PointF(0.5f, 0.5f),
            new float[]{0.0f, 0.0f, 0.0f}, 0f, 0.75f))
          .into(holder.image);
        break;
    }
    holder.title.setText(mDataSet.get(position).name());
  }

  @Override
  public int getItemCount() {
    return mDataSet.size();
  }

  static class ViewHolder extends RecyclerView.ViewHolder {

    public ImageView image;
    public TextView title;

    ViewHolder(View itemView) {
      super(itemView);
      image = itemView.findViewById(R.id.image);
      title = itemView.findViewById(R.id.title);
    }
  }
}


```

**(c). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Then create a class that extends `AppCompatActivity` and add its contents as follows:

```java
package replace_with_your_package_name;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.example.picasso.MainAdapter.Type;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    RecyclerView recyclerView = findViewById(R.id.list);
    recyclerView.setLayoutManager(new LinearLayoutManager(this));

    List<Type> dataSet = new ArrayList<>();
    dataSet.add(Type.Mask);
    dataSet.add(Type.NinePatchMask);
    dataSet.add(Type.CropCenterTop);
    dataSet.add(Type.CropCenterCenter);
    dataSet.add(Type.CropCenterBottom);
    dataSet.add(Type.CropSquare);
    dataSet.add(Type.CropCircle);
    dataSet.add(Type.ColorFilter);
    dataSet.add(Type.Grayscale);
    dataSet.add(Type.RoundedCorners);
    dataSet.add(Type.Blur);
    dataSet.add(Type.Toon);
    dataSet.add(Type.Sepia);
    dataSet.add(Type.Contrast);
    dataSet.add(Type.Invert);
    dataSet.add(Type.Pixel);
    dataSet.add(Type.Sketch);
    dataSet.add(Type.Swirl);
    dataSet.add(Type.Brightness);
    dataSet.add(Type.Kuawahara);
    dataSet.add(Type.Vignette);

    dataSet.add(Type.CropLeftTop);
    dataSet.add(Type.CropLeftCenter);
    dataSet.add(Type.CropLeftBottom);
    dataSet.add(Type.CropRightTop);
    dataSet.add(Type.CropRightCenter);
    dataSet.add(Type.CropRightBottom);
    dataSet.add(Type.Crop169CenterCenter);
    dataSet.add(Type.Crop43CenterCenter);
    dataSet.add(Type.Crop31CenterCenter);
    dataSet.add(Type.Crop31CenterTop);
    dataSet.add(Type.CropSquareCenterCenter);
    dataSet.add(Type.CropQuarterCenterCenter);
    dataSet.add(Type.CropQuarterCenterTop);
    dataSet.add(Type.CropQuarterBottomRight);
    dataSet.add(Type.CropHalfWidth43CenterCenter);

    recyclerView.setAdapter(new MainAdapter(this, dataSet));
  }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/wasabeef/picasso-transformations/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/wasabeef/picasso-transformations).|
|3.|Follow code author [here](https://github.com/wasabeef).|
