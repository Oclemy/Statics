# Best Android ImageLoaders – 2021

In this article we want to explore some of the best image loading options for you. These are some of the most commonly used third party libraries since android sdk doesn't provide a simple image loading solution for developers to use. Generally you tend to have to implement one yourself or look at third party libraries.


## (a). Glide

> Glide is a fast and efficient open source media management and image loading framework for Android that wraps media decoding, memory and disk caching, and resource pooling into a simple and easy to use interface.

It supports API 14+.

Glide supports fetching, decoding, and displaying video stills, images, and animated GIFs. By default Glide uses a custom `HttpUrlConnection` based stack, but also includes utility libraries plug in to Google's Volley project or Square's OkHttp library instead.

Glide's primary focus is on making scrolling any kind of a list of images as smooth and fast as possible, but Glide is also effective for almost any case where you need to fetch, resize, and display a remote image.

### How to Install Glide

Add Glide as a dependency:

```groovy
dependencies {
  implementation 'com.github.bumptech.glide:glide:4.12.0'
  annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
}
```

If you are using Kotlin you replace annotationProcessor with `kapt`.

### How to Use Glide

Here's code example for Glide usage:

```groovy
// For a simple view:
@Override public void onCreate(Bundle savedInstanceState) {
  ...
  ImageView imageView = (ImageView) findViewById(R.id.my_image_view);

  Glide.with(this).load("http://goo.gl/gEgYUd").into(imageView);
}

// For a simple image list:
@Override public View getView(int position, View recycled, ViewGroup container) {
  final ImageView myImageView;
  if (recycled == null) {
    myImageView = (ImageView) inflater.inflate(R.layout.my_image_view, container, false);
  } else {
    myImageView = (ImageView) recycled;
  }

  String url = myUrls.get(position);

  Glide
    .with(myFragment)
    .load(url)
    .centerCrop()
    .placeholder(R.drawable.loading_spinner)
    .into(myImageView);

  return myImageView;
}
```

### Reference

Read more about Glide [here](https://bumptech.github.io/glide/).

### (b). Coil

> An image loading library for Android backed by Kotlin Coroutines. Coil is:

- **Fast**: Coil performs a number of optimizations including memory and disk caching, downsampling the image in memory, re-using bitmaps, automatically pausing/cancelling requests, and more.
- **Lightweight**: Coil adds ~2000 methods to your APK (for apps that already use OkHttp and Coroutines), which is comparable to Picasso and significantly less than Glide and Fresco.
- **Easy to use**: Coil's API leverages Kotlin's language features for simplicity and minimal boilerplate.
- **Modern**: Coil is Kotlin-first and uses modern libraries including Coroutines, OkHttp, Okio, and AndroidX Lifecycles.

Coil is an acronym for: **Co**routine **I**mage **L**oader.

### How to Install Coil

Install Coil using the following implementation statement:

```groovy
implementation("io.coil-kt:coil:1.2.1")
```

Coil requires the following:

- AndroidX
- Min SDK 14+
- [Java 8+](https://coil-kt.github.io/coil/getting_started/#java-8)

### How to Use Coil

To load an image into an ImageView, use the load extension function:

```kotlin
// URL
imageView.load("https://www.example.com/image.jpg")

// Resource
imageView.load(R.drawable.image)

// File
imageView.load(File("/path/to/image.jpg"))

// And more...
```

Requests can be configured with an optional trailing lambda:

```kotlin
imageView.load("https://www.example.com/image.jpg") {
    crossfade(true)
    placeholder(R.drawable.image)
    transformations(CircleCropTransformation())
}
```

#### Requests

To load an image into a custom target, `enqueue` an `ImageRequest`:

```kotlin
val request = ImageRequest.Builder(context)
    .data("https://www.example.com/image.jpg")
    .target { drawable ->
        // Handle the result.
    }
    .build()
val disposable = imageLoader.enqueue(request)
```

To load an image imperatively, `execute` an `ImageRequest`:

```kotlin
val request = ImageRequest.Builder(context)
    .data("https://www.example.com/image.jpg")
    .build()
val drawable = imageLoader.execute(request).drawable
```

### Reference

Read more about Coil [here](https://coil-kt.github.io/coil/getting_started/).

## (c). Picasso

> A powerful image downloading and caching library for Android.

This library has existed for ages and served millions of apps.

### How to Install Picasso

To install Picasso:

```groovy
implementation 'com.squareup.picasso:picasso:2.71828'
```

### How to Use Picasso

Images add much-needed context and visual flair to Android applications. Picasso allows for hassle-free image loading in your application—often in one line of code!

```java
Picasso.get().load("http://i.imgur.com/DvpvklR.png").into(imageView);
```

Many common pitfalls of image loading on Android are handled automatically by Picasso:

- Handling `ImageView` recycling and download cancelation in an adapter.
- Complex image transformations with minimal memory use.
- Automatic memory and disk caching.

#### Adapter Downloads

Adapter re-use is automatically detected and the previous download canceled.

```java
@Override public void getView(int position, View convertView, ViewGroup parent) {
  SquaredImageView view = (SquaredImageView) convertView;
  if (view == null) {
    view = new SquaredImageView(context);
  }
  String url = getItem(position);

  Picasso.get().load(url).into(view);
}
```

#### Image Transformations

Transform images to better fit into layouts and to reduce memory size.

```java
Picasso.get()
  .load(url)
  .resize(50, 50)
  .centerCrop()
  .into(imageView)
```

You can also specify custom transformations for more advanced effects.

```java
public class CropSquareTransformation implements Transformation {
  @Override public Bitmap transform(Bitmap source) {
    int size = Math.min(source.getWidth(), source.getHeight());
    int x = (source.getWidth() - size) / 2;
    int y = (source.getHeight() - size) / 2;
    Bitmap result = Bitmap.createBitmap(source, x, y, size, size);
    if (result != source) {
      source.recycle();
    }
    return result;
  }

  @Override public String key() { return "square()"; }
}
```

Pass an instance of this class to the `transform` method.

#### Place Holders

Picasso supports both download and error placeholders as optional features.

```java
Picasso.get()
    .load(url)
    .placeholder(R.drawable.user_placeholder)
    .error(R.drawable.user_placeholder_error)
    .into(imageView);
```

A request will be retried three times before the error placeholder is shown.

#### Resource Loading

Resources, assets, files, content providers are all supported as image sources.

```java
Picasso.get().load(R.drawable.landing_screen).into(imageView1);
Picasso.get().load("file:///android_asset/DvpvklR.png").into(imageView2);
Picasso.get().load(new File(...)).into(imageView3);
```

### Reference

Read more about Picasso [here](https://square.github.io/picasso/).
