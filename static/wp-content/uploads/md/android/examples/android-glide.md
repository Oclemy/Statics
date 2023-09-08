# Android Glide Tutorial and Examples

> Glide is an [image loading](https://android.camposha.info/en/category/imageloader) and caching library for Android focused on smooth scrolling

It is an alternative to [Picasso](https://android.camposha.info/en/picasso) and [Fresco](https://android.camposha.info/en/fresco).

In this tutorial you will learn how to use `Glide` in several scenarios. Follow the quick examples and snippets to learn how to use Glide.


### What is `Glide`?

[![Maven Central](https://camo.githubusercontent.com/2264d38a0a699e79205d7be4dcd42a25ff4f9c9c211dc8f323085bcfa8367176/68747470733a2f2f6d6176656e2d6261646765732e6865726f6b756170702e636f6d2f6d6176656e2d63656e7472616c2f636f6d2e6769746875622e62756d70746563682e676c6964652f676c6964652f62616467652e737667)](https://maven-badges.herokuapp.com/maven-central/com.github.bumptech.glide/glide) [![Build Status](https://camo.githubusercontent.com/954b182dc8571642c3bd5afe0c00cefdcfe353d49d16899b1376aa9387f71ae2/68747470733a2f2f7472617669732d63692e6f72672f62756d70746563682f676c6964652e7376673f6272616e63683d6d6173746572)](https://travis-ci.org/bumptech/glide) 

> `Glide` is a fast and efficient open source media management and image loading framework for Android that wraps media decoding, memory and disk caching, and resource pooling into a simple and easy to use interface.

`Glide` supports fetching, decoding, and displaying video stills, images, and animated GIFs. `Glide` includes a flexible API that allows developers to plug in to almost any network stack. By default `Glide` uses a custom `HttpUrlConnection` based stack, but also includes utility libraries plug in to Google's `Volley` project or Square's `OkHttp` library instead.

`Glide`'s primary focus is on making scrolling any kind of a list of images as smooth and fast as possible, but `Glide` is also effective for almost any case where you need to fetch, resize, and display a remote image.

### Step 1: Installation

Install `Glide` via Gradle:

```groovy
repositories {
  google()
  mavenCentral()
}

dependencies {
  implementation 'com.github.bumptech.glide:glide:4.14.2'
  annotationProcessor 'com.github.bumptech.glide:compiler:4.14.2'
}
```

Or Maven:

```xml
<dependency>
  <groupId>com.github.bumptech.glide</groupId>
  <artifactId>glide</artifactId>
  <version>4.14.2</version>
</dependency>
<dependency>
  <groupId>com.github.bumptech.glide</groupId>
  <artifactId>compiler</artifactId>
  <version>4.14.2</version>
  <optional>true</optional>
</dependency>
```


### Step 2: Use it

Check out the [documentation](https://bumptech.github.io/glide/) for pages on a variety of topics, and see the [javadocs](https://bumptech.github.io/glide/ref/javadocs.html).

Simple use cases will look something like this:

```java
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

## Quick Glide Examples

#### 1\. How to Display Image with Glide

Here's a static method to load an image into an imageview. You provide a url and the imageview and Glide will load the image, showing a placeholder as the image loads.

You can also set the cache strategy:

```java
    public static void displayImage(String url,ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)

                .placeholder(R.drawable.pictures_no)
                .thumbnail(0.2f)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

#### 2\. How to Display Image referer

```java
    public static String UserAgent="Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2";
    public static void displayImageReferer(String url,ImageView imageView,String referer) {
        if(url==null){
            return;
        }
        LazyHeaders.Builder builder=new LazyHeaders.Builder().addHeader("User-Agent", UserAgent);
        if(referer!=null){
            builder.addHeader("Referer", referer);
        }

        GlideUrl glideUrl = new GlideUrl(url,builder.build());

        Glide.with(MainApp.getContext())
                .load(glideUrl)
                .placeholder(R.drawable.pictures_no)
                .thumbnail(0.2f)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

#### 3\. How to Display a Gif Image with Glide

```java
    public static void displayImageGif(String url,ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)
                .thumbnail(0.2f)
                .placeholder(R.drawable.pictures_no)
                .crossFade()
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

#### 4\. How to Load Bitmap into ImageView via Glide

```java
    public static void displayImageBitmap(String url,ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)
                .asBitmap()
                .thumbnail(0.2f)
                .placeholder(R.drawable.pictures_no)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

#### 5\. How to Load Bitmap Captcha into ImageView via Glide

```java
    public static void displayImageBitmapCaptcha(String url, ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)
                .asBitmap()
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .into(imageView);

    }
```

#### 6\. How to Display thumbnail into ImageView via Glide

```java
    public static void displayImageThumb(String url,ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)
                .asBitmap()
                .thumbnail(0.2f)
                .placeholder(R.drawable.pictures_no)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

## More Glide Examples

Here are more Glide examples and extensions

[loop type=post taxonomy=chapter term=glide orderby=date order=asc]

<h3>[loop-count]. [field chapter]</h3>

[field chapter_description]

<a href="[field url]">Read More.</a>


### Glide Alternatives

Here are some cool alternatives to this library:

[loop type=post taxonomy=category term=imageloader orderby=date order=asc]
<h2>[loop-count]. [field title-link] </h2>
[content more=true link=false]
<a href="[field url]">Read More.</a>
[/loop]
[else]
[/if]

