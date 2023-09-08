# Fresco-processors

>  An Android image processor library providing a variety of image transformations for Fresco..


### Fresco Processors


![Fresco Transformation Tutorial](https://camo.githubusercontent.com/1a6fd9d9b6c2ee6e22cf58b91dc28242ee771b9e22c9d81a056e6ab05c8a4224/68747470733a2f2f6d6176656e2d6261646765732e6865726f6b756170702e636f6d2f6d6176656e2d63656e7472616c2f6a702e77617361626565662f66726573636f2d70726f636573736f72732f62616467652e737667)

An Android image processor library providing a variety of transformations for Fresco.

Here are the demos:

#### Original Image

![Fresco Transformation Tutorial](https://github.com/wasabeef/fresco-processors/raw/main/art/demo-org.jpg)


#### Processors

![Fresco Transformation Tutorial](https://github.com/wasabeef/fresco-processors/raw/main/art/demo.gif)


To use follow these steps:


### Step 1: Install it

Install it via Gradle

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'jp.wasabeef:fresco-processors:2.2.1'
  // If you want to use the GPU Filters
  implementation 'jp.co.cyberagent.android:gpuimage:2.1.0'
}
```


### Step 2: Set Postprocessor

Set Fresco Postprocessor.

```java
ImageRequest request =
    ImageRequestBuilder.newBuilderWithResourceId(R.drawable.demo)
      .setPostprocessor(processor)
      .build();

PipelineDraweeController controller =
    (PipelineDraweeController) Fresco.newDraweeControllerBuilder()
      .setImageRequest(request)
      .setOldController(holder.drawee.getController())
      .build();
```


### Processors


#### Color

- `ColorFilterPostprocessor`
-`GrayscalePostprocessor`

#### Blur

- `BlurPostprocessor`

#### Mask

- `MaskProcessors`

#### GPU Filter (use GPUImage)

Will require add dependencies for GPUImage.
- `VignetteFilterPostprocessor`

### Combine Processors

```java
processor = new CombinePostProcessors.Builder()
                .add(new BlurPostprocessor(context))
                .add(new GrayscalePostprocessor())
                .build();
```

### Full Example

For a full Fresco Transformation example project follow the following steps.

#### Step 1. Design Layouts

**(a). `layout_list_item.xml`**

> Our `layout_list_item` layout.

Inside your `/res/layout/` directory create an xml layout file named `layout_list_item.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. `com.facebook.drawee.view.SimpleDraweeView`
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  android:padding="5dp"
  >

  <com.facebook.drawee.view.SimpleDraweeView
    android:id="@+id/image"
    android:layout_width="250dp"
    android:layout_height="250dp"
    android:layout_centerInParent="true"
    />

  <TextView
    android:id="@+id/title"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_below="@id/image"
    android:layout_centerHorizontal="true"
    android:shadowColor="@android:color/black"
    android:shadowDx="5"
    android:shadowDy="5"
    android:shadowRadius="10"
    android:textColor="@android:color/white"
    />

</RelativeLayout>
```

**(b). `activity_main.xml`**


> Our `activity_main` layout.

Design this XML layout using the following 2 UI widgets and ViewGroups:

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. [`androidx.recyclerview.widget.RecyclerView`](https://android.camposha.info/en/recyclerview)

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="#FFFFFFFF"
  tools:context=".MainActivity"
  >

  <androidx.recyclerview.widget.RecyclerView
    android:id="@+id/list"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    />

</RelativeLayout>

```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `MainAdapter.java`**

> Our `MainAdapter` class.

Create a java file named `MainAdapter.java`.

Then create a class that extends `RecyclerView.Adapter<MainAdapter.ViewHolder>` and add its contents as follows:

We will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Color` from the `android.graphics` package.
3. `PointF` from the `android.graphics` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `TextView` from the `android.widget` package.
8. `NonNull` from the `androidx.annotation` package.
9. `RecyclerView` from the `androidx.recyclerview.widget` package.

We will be overriding the following methods: 

1. `onCreateViewHolder(@NonNull`.
2. `onBindViewHolder(MainAdapter.ViewHolder`.
3. `getItemCount()`.

We will be creating the following methods:


Just copy the code below and replace the package with your app's package name.

```java
package replace_with_your_package_name;

import android.content.Context;
import android.graphics.Color;
import android.graphics.PointF;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.backends.pipeline.PipelineDraweeController;
import com.facebook.drawee.drawable.ScalingUtils;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.facebook.imagepipeline.request.Postprocessor;

import java.util.List;

import jp.wasabeef.fresco.processors.BlurPostprocessor;
import jp.wasabeef.fresco.processors.ColorFilterPostprocessor;
import jp.wasabeef.fresco.processors.CombinePostProcessors;
import jp.wasabeef.fresco.processors.GrayscalePostprocessor;
import jp.wasabeef.fresco.processors.MaskPostprocessor;
import jp.wasabeef.fresco.processors.gpu.BrightnessFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.ContrastFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.InvertFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.KuawaharaFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.PixelationFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.SepiaFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.SketchFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.SwirlFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.ToonFilterPostprocessor;
import jp.wasabeef.fresco.processors.gpu.VignetteFilterPostprocessor;

public class MainAdapter extends RecyclerView.Adapter<MainAdapter.ViewHolder> {

  private final Context context;
  private final List<Type> dataSet;

  enum Type {
    Mask,
    NinePatchMask,
    ColorFilter,
    Grayscale,
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
    Vignette,
    BlurAndGrayscale
  }

  public MainAdapter(Context context, List<Type> dataSet) {
    this.context = context;
    this.dataSet = dataSet;
  }

  @NonNull
  @Override
  public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
    View v = LayoutInflater.from(context).inflate(R.layout.layout_list_item, parent, false);
    return new ViewHolder(v);
  }

  @Override
  public void onBindViewHolder(MainAdapter.ViewHolder holder, int position) {
    Context context = holder.itemView.getContext();
    Postprocessor processor = null;

    holder.drawee.getHierarchy().setActualImageScaleType(ScalingUtils.ScaleType.CENTER_CROP);

    switch (dataSet.get(position)) {
      case Mask: {
        processor = new MaskPostprocessor(context, R.drawable.mask_starfish);
        holder.drawee.getHierarchy().setActualImageScaleType(ScalingUtils.ScaleType.FIT_CENTER);
        break;
      }
      case NinePatchMask: {
        processor = new MaskPostprocessor(context, R.drawable.mask_chat_right);
        holder.drawee.getHierarchy().setActualImageScaleType(ScalingUtils.ScaleType.CENTER_INSIDE);
        break;
      }
      case ColorFilter:
        processor = new ColorFilterPostprocessor(Color.argb(80, 255, 0, 0));
        break;
      case Grayscale:
        processor = new GrayscalePostprocessor();
        break;
      case Blur:
        processor = new BlurPostprocessor(context, 25, 4);
        break;
      case BlurAndGrayscale:
        processor = new CombinePostProcessors.Builder()
          .add(new BlurPostprocessor(context, 25))
          .add(new GrayscalePostprocessor())
          .build();
        break;
      case Toon:
        processor = new ToonFilterPostprocessor(context);
        break;
      case Sepia:
        processor = new SepiaFilterPostprocessor(context);
        break;
      case Contrast:
        processor = new ContrastFilterPostprocessor(context, 2.0f);
        break;
      case Invert:
        processor = new InvertFilterPostprocessor(context);
        break;
      case Pixel:
        processor = new PixelationFilterPostprocessor(context, 30f);
        break;
      case Sketch:
        processor = new SketchFilterPostprocessor(context);
        break;
      case Swirl:
        processor = new SwirlFilterPostprocessor(context, 0.5f, 1.0f, new PointF(0.5f, 0.5f));
        break;
      case Brightness:
        processor = new BrightnessFilterPostprocessor(context, 0.5f);
        break;
      case Kuawahara:
        processor = new KuawaharaFilterPostprocessor(context, 25);
        break;
      case Vignette:
        processor = new VignetteFilterPostprocessor(context, new PointF(0.5f, 0.5f),
          new float[]{0.0f, 0.0f, 0.0f}, 0f, 0.75f);
        break;
    }
    ImageRequest request = ImageRequestBuilder.newBuilderWithResourceId(R.drawable.demo)
      .setPostprocessor(processor)
      .build();

    PipelineDraweeController controller =
      (PipelineDraweeController) Fresco.newDraweeControllerBuilder()
        .setImageRequest(request)
        .setOldController(holder.drawee.getController())
        .build();
    holder.drawee.setController(controller);
    holder.title.setText(dataSet.get(position).name());
  }

  @Override
  public int getItemCount() {
    return dataSet.size();
  }

  static class ViewHolder extends RecyclerView.ViewHolder {

    public SimpleDraweeView drawee;
    public TextView title;

    ViewHolder(View itemView) {
      super(itemView);
      drawee = (SimpleDraweeView) itemView.findViewById(R.id.image);
      title = (TextView) itemView.findViewById(R.id.title);
    }
  }
}


```

**(b). `MainActivity.java`**

> Our `MainActivity` class.

We will be overriding the following methods: 

1. `onCreate(Bundle)`.

Just copy the code below and replace the package with your app's package name.

```java
package replace_with_your_package_name;


import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.facebook.drawee.backends.pipeline.Fresco;

import java.util.ArrayList;
import java.util.List;

import jp.wasabeef.example.fresco.MainAdapter.Type;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Fresco.initialize(this);
    setContentView(R.layout.activity_main);

    RecyclerView recyclerView = findViewById(R.id.list);
    recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
    recyclerView.setHasFixedSize(true);

    List<Type> dataSet = new ArrayList<>();
    dataSet.add(Type.BlurAndGrayscale);
    dataSet.add(Type.Blur);
    dataSet.add(Type.Grayscale);
    dataSet.add(Type.ColorFilter);
    dataSet.add(Type.Mask);
    dataSet.add(Type.NinePatchMask);
    dataSet.add(Type.Pixel);
    dataSet.add(Type.Vignette);
    dataSet.add(Type.Kuawahara);
    dataSet.add(Type.Brightness);
    dataSet.add(Type.Swirl);
    dataSet.add(Type.Sketch);
    dataSet.add(Type.Invert);
    dataSet.add(Type.Contrast);
    dataSet.add(Type.Sepia);
    dataSet.add(Type.Toon);

    recyclerView.setAdapter(new MainAdapter(this, dataSet));
  }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/wasabeef/fresco-processors/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/wasabeef/fresco-processors).|
|3.|Follow code author [here](https://github.com/wasabeef).|
