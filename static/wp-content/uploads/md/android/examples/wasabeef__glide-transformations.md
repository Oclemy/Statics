# Glide-transformations

>  An Android transformation library providing a variety of image transformations for Glide..

An Android transformation library providing a variety of image transformations for Glide.

![Glide Transformation Tutorial](https://camo.githubusercontent.com/2bfcc6f18bf9588dbc2f4fd8a85650a9088a94ccfad91be1dfdea0c281487d25/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f416e64726f6964253230417273656e616c2d676c6964652d2d7472616e73666f726d6174696f6e732d627269676874677265656e2e7376673f7374796c653d666c6174)

![Glide Transformation Tutorial](https://camo.githubusercontent.com/9330efc6e55b251db7966bffaec1bd48e3aae79348121f596d541991cfec8858/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d417061636865253230322d626c75652e737667)

![Glide Transformation Tutorial](https://camo.githubusercontent.com/fc14e70ed47efd96eecb2985ae758c4ea0304592baf2b2456827e24888b98538/68747470733a2f2f6d6176656e2d6261646765732e6865726f6b756170702e636f6d2f6d6176656e2d63656e7472616c2f6a702e77617361626565662f676c6964652d7472616e73666f726d6174696f6e732f62616467652e737667)

An Android transformation library providing a variety of image transformations for Glide.

### Original Image

![Glide Transformation Tutorial](https://github.com/wasabeef/glide-transformations/raw/main/art/demo-org.jpg)


### Transformations

![Glide Transformation Tutorial](https://github.com/wasabeef/glide-transformations/raw/main/art/demo.gif)


How to use it:

Follow these steps:


### Step 1 : Install it


Install it via Gradle:


```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'jp.wasabeef:glide-transformations:4.3.0'
  // If you want to use the GPU Filters
  implementation 'jp.co.cyberagent.android:gpuimage:2.1.0'
}
```


### Step 2: Set Transformation

Set Glide Transform.

```kotlin
Glide.with(this).load(R.drawable.demo)
  .apply(RequestOptions.bitmapTransform(BlurTransformation(25, 3)))
  .into(imageView)
```


###  Step 3(Advanced): Set Multiple Transformations

You can set a multiple transformations.

```kotlin
val multi = MultiTransformation<Bitmap>(
  BlurTransformation(25),
  RoundedCornersTransformation(128, 0, CornerType.BOTTOM))))
Glide.with(this).load(R.drawable.demo)
  .apply(RequestOptions.bitmapTransform(multi))
  .into(imageView))
```


### Transformations


#### Crop

- `CropTransformation`
- `CropCircleTransformation`
- `CropCircleWithBorderTransformation`
- `CropSquareTransformation`
- `RoundedCornersTransformation`

#### Color


- `ColorFilterTransformation`
- `GrayscaleTransformation`

#### Blur


- `BlurTransformation`

#### Mask

- `MaskTransformation`

#### GPU Filter (use GPUImage)

Will require add dependencies for GPUImage.

- `ToonFilterTransformation`
- `SepiaFilterTransformation`
- `ContrastFilterTransformation`
- `InvertFilterTransformation`
- `PixelationFilterTransformation`
- `SketchFilterTransformation`
- `SwirlFilterTransformation`
- `BrightnessFilterTransformation`
- `KuwaharaFilterTransformation`
- `VignetteFilterTransformation`


### Full Example

For a full Glide Transformation example project follow the following steps.

#### Step 1. Design Layouts

Let's create the following layouts:


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

Add these widgets:

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
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `Ext.kt`**

> Our `Ext` class.

Create a Kotlin file named `Ext.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Resources` from the `android.content.res` package.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.res.Resources

val Float.px: Float get() = (this * Resources.getSystem().displayMetrics.density)

val Int.px: Int get() = ((this * Resources.getSystem().displayMetrics.density).toInt())


```

**(b). `MainAdapter.kt`**

> Our `MainAdapter` class.

Create a Kotlin file named `MainAdapter.kt`.

Next create a class that derives from `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

We will be overriding the following functions: 

1. `getItemCount(): Int ` - To return the number of items in our adapter
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder ` - To hold views ready for recycling
3. `onBindViewHolder(holder: ViewHolder, position: Int) ` - To bind data to views

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.PointF
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.MultiTransformation
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.request.RequestOptions.bitmapTransform
import com.bumptech.glide.request.RequestOptions.overrideOf
import jp.wasabeef.example.glide.MainAdapter.Type.*
import jp.wasabeef.glide.transformations.*
import jp.wasabeef.glide.transformations.CropTransformation.CropType
import jp.wasabeef.glide.transformations.gpu.*
import jp.wasabeef.glide.transformations.internal.Utils

/**
 * Created by Wasabeef on 2015/01/11.
 */
class MainAdapter(
  private val context: Context,
  private val dataSet: MutableList<Type>
) : RecyclerView.Adapter<MainAdapter.ViewHolder>() {

  enum class Type {
    Mask,
    NinePatchMask,
    CropTop,
    CropCenter,
    CropBottom,
    CropSquare,
    CropCircle,
    CropCircleWithBorder,
    ColorFilter,
    Grayscale,
    RoundedCorners,
    BlurLight,
    BlurDeep,
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

  override fun getItemCount(): Int {
    return dataSet.size
  }

  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
    val v = LayoutInflater.from(context).inflate(R.layout.layout_list_item, parent, false)
    return ViewHolder(v)
  }

  override fun onBindViewHolder(holder: ViewHolder, position: Int) {

    when (dataSet[position]) {
      Mask -> {
        Glide.with(context)
          .load(R.drawable.check)
          .apply(overrideOf(266.px, 252.px))
          .apply(bitmapTransform(MultiTransformation<Bitmap>(CenterCrop(),
            MaskTransformation(R.drawable.mask_starfish))))
          .into(holder.image)
      }
      NinePatchMask -> {
        Glide.with(context)
          .load(R.drawable.check)
          .apply(overrideOf(300.px, 200.px))
          .apply(bitmapTransform(MultiTransformation<Bitmap>(CenterCrop(),
            MaskTransformation(R.drawable.mask_chat_right))))
          .into(holder.image)
      }

      CropTop -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(CropTransformation(300.px, 100.px, CropType.TOP)))
        .into(holder.image)

      CropCenter -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(CropTransformation(300.px, 100.px, CropType.CENTER)))
        .into(holder.image)

      CropBottom -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(CropTransformation(300.px, 100.px, CropType.BOTTOM)))
        .into(holder.image)

      CropSquare -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(CropSquareTransformation()))
        .into(holder.image)

      CropCircle -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(CropCircleTransformation()))
        .into(holder.image)

      CropCircleWithBorder -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(
          CropCircleWithBorderTransformation(Utils.toDp(4), Color.rgb(0, 145, 86))))
        .into(holder.image)

      ColorFilter -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(ColorFilterTransformation(Color.argb(80, 255, 0, 0))))
        .into(holder.image)

      Grayscale -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(GrayscaleTransformation()))
        .into(holder.image)

      RoundedCorners -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(RoundedCornersTransformation(120, 0,
          RoundedCornersTransformation.CornerType.DIAGONAL_FROM_TOP_LEFT)))
        .into(holder.image)

      BlurLight -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(BlurTransformation(25)))
        .into(holder.image)

      BlurDeep -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(BlurTransformation(25, 8)))
        .into(holder.image)

      Toon -> Glide.with(context)
        .load(R.drawable.demo)
        .apply(bitmapTransform(ToonFilterTransformation()))
        .into(holder.image)

      Sepia -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(SepiaFilterTransformation()))
        .into(holder.image)

      Contrast -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(ContrastFilterTransformation(2.0f)))
        .into(holder.image)

      Invert -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(InvertFilterTransformation()))
        .into(holder.image)

      Pixel -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(PixelationFilterTransformation(20f)))
        .into(holder.image)

      Sketch -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(SketchFilterTransformation()))
        .into(holder.image)

      Swirl -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(
          SwirlFilterTransformation(0.5f, 1.0f, PointF(0.5f, 0.5f))).dontAnimate())
        .into(holder.image)

      Brightness -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(BrightnessFilterTransformation(0.5f)).dontAnimate())
        .into(holder.image)

      Kuawahara -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(KuwaharaFilterTransformation(25)).dontAnimate())
        .into(holder.image)

      Vignette -> Glide.with(context)
        .load(R.drawable.check)
        .apply(bitmapTransform(VignetteFilterTransformation(PointF(0.5f, 0.5f),
          floatArrayOf(0.0f, 0.0f, 0.0f), 0f, 0.75f)).dontAnimate())
        .into(holder.image)
    }
    holder.title.text = dataSet[position].name
  }

  class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    var image: ImageView = itemView.findViewById(R.id.image)
    var title: TextView = itemView.findViewById(R.id.title)
  }
}


```

**(c). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import jp.wasabeef.example.glide.MainAdapter.Type.*

class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    findViewById<RecyclerView>(R.id.list).apply {
      layoutManager = LinearLayoutManager(context)
      adapter = MainAdapter(context, mutableListOf(
        Mask, NinePatchMask, RoundedCorners, CropTop, CropCenter, CropBottom, CropSquare, CropCircle,
        CropCircleWithBorder, Grayscale, BlurLight, BlurDeep, Toon, Sepia, Contrast, Invert,
        Pixel, Sketch, Swirl, Brightness, Kuawahara, Vignette
      ))
    }
  }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/wasabeef/glide-transformations/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/wasabeef/glide-transformations).|
|3.|Follow code author [here](https://github.com/wasabeef).|
