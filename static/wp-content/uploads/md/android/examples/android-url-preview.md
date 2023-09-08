# URL Preview Libraries


In the web, it is common to find that when you copy a URL from somewhere and paste it into an editor, it is automatically previewed. In android however, there isn't such type of capability natively as android editors like edittext are just too basic.

However there are plenty of examples and libaries that show or give easy to use implementations of not only loading a preview but it's details like title, description and image as well.


In this thread let's look at some of these.

## (a). RxUnfurl

RxUnfurl is a reactive extension to generate URL previews.

This library parses available open graph data from the provided url and returns them as a simple model class. Otherwise, the library searches for other fallbacks and returns them instead.

Image dimensions are read from its uri by fetching the required bytes and then sorted according to their resolution. The library uses RxJava2 as of the time of pulishing this.

### Step 1 - Install

To install the library add the following implementation statement in your module-level build.gradle:

```groovy
dependencies {
    implementation 'com.schinizer:rxunfurl:0.3.0'
}
```

### Usage

To generate previews, simply subscribe to `RxUnfurl.generatePreview(yourURL)`

Here is an example:

```java
OkHttpClient okhttpClient = new OkHttpClient();

RxUnfurl inst = new RxUnfurl.Builder()
        .client(okhttpClient) // You can supply your okhttp client here
        .scheduler(Schedulers.io())
        .build();

inst.generatePreview("http://9gag.com")
    .observeOn(AndroidSchedulers.mainThread())
    .subscribeWith(new DisposableSingleObserver<PreviewData>() {
        @Override
        public void onSuccess(PreviewData previewData) { // Observable has been changed to Single

        }

        @Override
        public void onError(Throwable e) {

        }
    });
```

Find more [here](https://github.com/Schinizer/RxUnfurl).
