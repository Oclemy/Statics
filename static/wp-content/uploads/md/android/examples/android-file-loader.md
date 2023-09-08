# Android File Loading – Load File locally or Download from network

In this lesson we will look at several options of loading a file in android. This can be important if you want to process or extract some data from a file. For example, rather than storing simple texts in a database, you may store them in a text file, then asynchronously load that file from a network or locally and extract that data and render it in your app.

The files can be loaded synchronously or asynchronously. Unless the file is super-tiny, you should always prefer asynchronous loading as it doesn't block the user interface.


**(a). Solution 1: Use File Loader library**

This is a beautiful library that allows us load files asynchronously and synchronously. When loading the file from the network, you have the option of using a cached one or forcing download from the network. This may be important in scenarios where you want to load only from the network if a local copy does not exist.

This library is described as "_Android library for downloading, saving/caching and retrieving any type of files ( image, video, pdf, apk etc ) easily._"

Here are examples:

**How to Asynchronously load a file generically**

```java
FileLoader.with(this)
                .load("https://upload.wikimedia.org/wikipedia/commons/3/3c/Enrique_Simonet_-_Marina_veneciana_6MB.jpg",false) //2nd parameter is optioal, pass true to force load from network
                .fromDirectory("test4", FileLoader.DIR_INTERNAL)
                .asFile(new FileRequestListener<File>() {
                    @Override
                    public void onLoad(FileLoadRequest request, FileResponse<File> response) {
                        File loadedFile = response.getBody();
                        // do something with the file
                    }

                    @Override
                    public void onError(FileLoadRequest request, Throwable t) {
                    }
                });
```

**How to load file as an Object**

```java
FileLoader.with(this)
                .load("http://echo.jsontest.com/key1/value1/key2/value2")
                .fromDirectory("test3", FileLoader.DIR_INTERNAL)
                .asObject(new FileRequestListener<JsonTest>() {
                    @Override
                    public void onLoad(FileLoadRequest request, FileResponse<JsonTest> response) {
                        JsonTest jsonTest = response.getBody();
                        //do something with jsonTest object
                    }

                    @Override
                    public void onError(FileLoadRequest request, Throwable t) {

                    }
                });
```

**How to Load Multiple Files**

You can load multiple files while handling progress states. Here is how you can upload from the same directory:

```java
final String[] uris = {"https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg",
                "https://upload.wikimedia.org/wikipedia/commons/3/3c/Enrique_Simonet_-_Marina_veneciana_6MB.jpg",
                "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2017/01/Google-acquires-Fabric.png"};

FileLoader.multiFileDownload(this)
                .fromDirectory(Environment.DIRECTORY_PICTURES, FileLoader.DIR_EXTERNAL_PUBLIC)
                .progressListener(new MultiFileDownloadListener() {
                    @Override
                    public void onProgress(File downloadedFile, int progress, int totalFiles) {
                    }

                    @Override
                    public void onError(Exception e, int progress) {
                        super.onError(e, progress);
                    }
                }).loadMultiple(uris);
```

And here is how you can load from different directories:

```java
List<MultiFileLoadRequest> multiFileLoadRequests = new ArrayList<>();
        multiFileLoadRequests.add(new MultiFileLoadRequest(uris[0], "test2", FileLoader.DIR_INTERNAL, false));
        multiFileLoadRequests.add(new MultiFileLoadRequest(uris[1], Environment.DIRECTORY_DOWNLOADS, FileLoader.DIR_EXTERNAL_PRIVATE, false));
        multiFileLoadRequests.add(new MultiFileLoadRequest(uris[2], Environment.DIRECTORY_PICTURES, FileLoader.DIR_EXTERNAL_PUBLIC, false));

MultiFileDownloader multiFileDownloader = FileLoader.multiFileDownload(this);
multiFileDownloader.progressListener(new MultiFileDownloadListener() {
            @Override
            public void onProgress(File downloadedFile, int progress, int totalFiles) {

            }

            @Override
            public void onError(Exception e, int progress) {
                super.onError(e, progress);
            }
        }).loadMultiple(true, uris);
```

**How to cancel loading**

```java
multiFileDownloader.cancelLoad();
```

### Deleting Files

**How to Delete Files**

You can also delete multiple files:

```java
final String[] uris = {"https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg",
                "https://upload.wikimedia.org/wikipedia/commons/3/3c/Enrique_Simonet_-_Marina_veneciana_6MB.jpg",
                "https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2017/01/Google-acquires-Fabric.png"};
try {
      FileLoader.deleteWith(this).fromDirectory("test2", FileLoader.DIR_INTERNAL).deleteFiles(uris);
    } catch (Exception e) {
      e.printStackTrace();
    }
```

To delete all files of a given directory:

```
FileLoader.deleteWith(this).fromDirectory("test2", FileLoader.DIR_INTERNAL).deleteAllFiles();
```

To delete all files except the specified ones:

```
FileLoader.deleteWith(this).fromDirectory("test3", FileLoader.DIR_INTERNAL).deleteAllFilesExcept(uris);
```

### Installation

To install file loader:

```groovy
repositories {
    mavenCentral()
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.kk121:File-Loader:1.2'
}
```

Find more info [here](https://github.com/kk121/File-Loader).

## (b). Download Files using Downloader

> Downloader is a Powerful and flexible Android file downloader.

Downloader is a very lightweight and powerful fast download library, only about 50KB in size. For

most applications, it is the most cost-effective download library. The API provided by Downloader

is simpler and lighter, and Downloader provides synchronous download, system notification

progress, etc.

Here are it's features:

- Support serial, multi-threaded parallel download
- Supports resuming from a breakpoint
- Supports chunked transfers
- Support system notification progress
- Support synchronous and asynchronous download
- Support custom path
- Support for adding request headers
- Support timeout configuration
- Provide simple API
- Support redirect download
- Support progress callback
- Retry times configuration
- Support automatic installation after downloading APK file
- Supports operations such as pausing, resuming downloads

Here is a demo image:

![](https://github.com/Justson/Downloader/raw/master/img/download1.jpg)

### Step 1: Install it

First go to your `YOUR_PROJECT/build.gradle` and register `Jitpack` as a maven repository:

```groovy
allprojects {
    repositories {
            ...
            maven { url 'https://jitpack.io' }
    }
}
```

Then in your `app/build.gradle` declare the dependency:

```groovy
 implementation 'com.github.Justson:Downloader:v5.0.0-androidx'
```

### Step 2: Download

You can download a file synchronously using the following code:

```java
File file = DownloadImpl.getInstance(getApplicationContext())
                .url

("http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_

636.apk")
                .get();
```

To download a file asynchronously use the following code:

```java
DownloadImpl.getInstance(getApplicationContext())
                .url

("http://shouji.360tpcdn.com/170918/f7aa8587561e4031553316ada312ab38/com.tencent.qqlive_13049.apk

")
                .enqueue();
```

Here is how you can monitor progress:

```java
DownloadImpl.getInstance(getApplicationContext())
        .target(new File(this.getExternalCacheDir(), 

"com.ss.android.article.news_636.apk"))
        .setUniquePath(false)
        .setForceDownload(true)
.url

("http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_

636.apk")
        .enqueue(new DownloadListenerAdapter() {
                    @Override
                    public void onStart(String url, String userAgent, String 

contentDisposition, String mimetype, long contentLength, Extra extra) {
                        super.onStart(url, userAgent, contentDisposition, 

mimetype, contentLength, extra);
                    }

                    @Override
                    public void onProgress(String url, long downloaded, long 

length, long usedTime) {
                        super.onProgress(url, downloaded, length, 

usedTime);
                        Log.i(TAG, " progress:" + downloaded + " url:" + 

url);
                    }

                    @Override
                    public boolean onResult(Throwable throwable, Uri path, 

String url, Extra extra) {
                        Log.i(TAG, " path:" + path + " url:" + url + " 

length:" + new File(path.getPath()).length());
                        return super.onResult(throwable, path, url, 

extra);
                    }
        });
```

### Full Example

Here is a full example:

**MainActivity.java**

```java
package com.download.sample;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.net.Uri;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.download.library.DownloadException;
import com.download.library.DownloadImpl;
import com.download.library.DownloadListenerAdapter;
import com.download.library.DownloadTask;
import com.download.library.Downloader;
import com.download.library.Extra;
import com.download.library.Runtime;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;
import com.squareup.picasso.Picasso;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    private ArrayList<DownloadBean> mDownloadTasks = new ArrayList<DownloadBean>();
    private static final String TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_download);
        createDatasource();
        final NativeDownloadAdapter downloadAdapter = new NativeDownloadAdapter();
        mRecyclerView = this.findViewById(R.id.download_recyclerview);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(downloadAdapter);
        FileDownloader.setup(this.getApplicationContext());
        this.findViewById(R.id.resumeAllBtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                if (DownloadImpl.getInstance(getApplicationContext()).pausedTasksTotals() > 0) 

{
//                    DownloadImpl.getInstance(getApplicationContext()).resumeAll();
////                    downloadAdapter.notifyDataSetChanged();
//                }
                DownloadImpl.getInstance(MainActivity.this).url("data:application/vnd.ms-

excel;base64,PGh0bWwgeG1sbnM6bz0idXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlIiAKICB4bWxu

czp4PSJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOm9mZmljZTpleGNlbCIgCiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnL

1RSL1JFQy1odG1sNDAiPgogIDxoZWFkPjxtZXRhIGNoYXJzZXQ9IlVURi04Ij48IS0tW2lmIGd0ZSBtc28gOV0+PHhtbD48eD

pFeGNlbFdvcmtib29rPjx4OkV4Y2VsV29ya3NoZWV0cz48eDpFeGNlbFdvcmtzaGVldD4KICAgIDx4Ok5hbWU

+MjAyMeW5tDEy5pyIMTXml6XlupPlrZjpooTorablr7zlh7rmlbDmja48L3g6TmFtZT4KICAgIDx4OldvcmtzaGVldE9wdGlv

bnM+PHg6RGlzcGxheUdyaWRsaW5lcy8+PC94OldvcmtzaGVldE9wdGlvbnM

+PC94OkV4Y2VsV29ya3NoZWV0PgogICAgPC94OkV4Y2VsV29ya3NoZWV0cz48L3g6RXhjZWxXb3JrYm9vaz48L3htbD48IVtl

bmRpZl0tLT4KICAgIDwvaGVhZD48Ym9keT48dGFibGU+PHRyPjx0ZD7lkI3np7AJPC90ZD48dGQ+5bqT5a2YCTwvdGQ

+PHRkPuWNleS9jQk8L3RkPjx0ZD7liIbnsbsJPC90ZD48dGQ+5bqT5a2Y5LiK6ZmQCTwvdGQ+PHRkPuW6k+WtmOS4i

+mZkAk8L3RkPjx0ZD7kvpvlupTllYYJPC90ZD48dGQ+6aKE6K2m57G75Z6LCTwvdGQ

+PHRkPumihOitpuWAvAk8L3RkPjwvdHI+PHRyPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3JtYXQ6J0AnOyI

+6L6J54WM5o2u5LqG6KejCTwvdGQ+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4wLjAwCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij43OTQ2CTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij7mtYvor5UxCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4xMDAwMC4wMDAJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXIt

Zm9ybWF0OidAJzsiPjIuMDAwCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4JPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidA

JzsiPuW6k+WtmOS4jei2swk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3JtYXQ6J0AnOyI+LTIuMDAwCTwvdGQ

+PC90cj48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidAJzsiPua1i

+ivlTEJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidAJzsiPi0xLjAwCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij7ljIUJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0

OidAJzsiPua1i+ivlQk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3JtYXQ6J0AnOyI+MjAuMDAwCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij41LjAwMAk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3Jt

YXQ6J0AnOyI+CTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij7lupPlrZjkuI3otrMJPC90ZD48dGQgc3R5bGU9Im1zby1udW1i

ZXItZm9ybWF0OidAJzsiPi02LjAwMAk8L3RkPjwvdHI

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij42NWfniZvmtarmsYnniZvogonlubLvvIjpppnovqPvvIkJPC90

ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidAJzsiPjAuMDAJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9yb

WF0OidAJzsiPuiiiwk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3JtYXQ6J0AnOyI+5LyR6Zey6aOf5ZOBCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4wLjAwMAk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3Jt

YXQ6J0AnOyI

+Mi4wMDAJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidAJzsiPuiHquiQpQk8L3RkPjx0ZCBzdHlsZT0ibXNv

LW51bWJlci1mb3JtYXQ6J0AnOyI+5bqT5a2Y5LiN6LazCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4tMi4wMDAJPC90ZD48L3RyPjx0ZCBzdHlsZT0ibXNvLW51bWJl

ci1mb3JtYXQ6J0AnOyI+NTBn5Y+v5q+U5YWL57qv5YiH55Wq6IyE5ZGzCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij43MC4wMAk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3Jt

YXQ6J0AnOyI+5YyFCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij7mlaPnp7Dpo5/lk4EJPC90ZD48dGQgc3R5bGU9Im1zby1udW1i

ZXItZm9ybWF0OidAJzsiPjUwLjAwMAk8L3RkPjx0ZCBzdHlsZT0ibXNvLW51bWJlci1mb3JtYXQ6J0AnOyI

+MC4wMDAJPC90ZD48dGQgc3R5bGU9Im1zby1udW1iZXItZm9ybWF0OidAJzsiPuiHquiQpQk8L3RkPjx0ZCBzdHlsZT0ibXNv

LW51bWJlci1mb3JtYXQ6J0AnOyI+5bqT5a2Y6L+H5YmpCTwvdGQ

+PHRkIHN0eWxlPSJtc28tbnVtYmVyLWZvcm1hdDonQCc7Ij4yMC4wMDAJPC90ZD48L3RyPjwvdGFibGU

+PC9ib2R5PjwvaHRtbD4=")
                        .autoOpenIgnoreMD5()
                        .setEnableIndicator(true)
                        .enqueue(new DownloadListenerAdapter(){
                            @Override
                            public boolean onResult(Throwable throwable, Uri path, String url, 

Extra extra) {
                                return super.onResult(throwable, path, url, extra);
                            }
                        });
            }
        });
        this.findViewById(R.id.cancelAllBtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                List<DownloadTask> downloadTasks = DownloadImpl.getInstance

(getApplicationContext()).cancelAll();
            }
        });
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                Context context = getApplicationContext();
//                /**
//                 *  文件同步下载
//                 */
//                File file = DownloadImpl.getInstance(getApplicationContext())
//                        .with("http://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx?

0.04400023248109086")
//                        .target(context.getCacheDir().getAbsolutePath() + "/a/b/c/d/f/e/g.apk")
//                        .setDownloadListenerAdapter(new DownloadListenerAdapter() {
//                            @Override
//                            public void onProgress(String url, long downloaded, long length, 

long usedTime) {
//                                super.onProgress(url, downloaded, length, usedTime);
//                                Log.i(TAG, " downloaded:" + downloaded);
//                            }
//
//                            @Override
//                            public boolean onResult(Throwable throwable, Uri path, String url, 

Extra extra) {
//                                Log.i(TAG, "downloaded onResult isSuccess:" + (throwable == 

null) + " url:" + url + " Thread:" + Thread.currentThread().getName() + " uri:" + path.toString

());
//
//                                return super.onResult(throwable, path, url, extra);
//                            }
//                        }).get();
//                Log.i(TAG, " download success file length:" + byte2FitMemorySize(((File) 

file).length()) + " name:" + file.getName());
//
//            }
//        }).start();

        /*DownloadImpl.getInstance(getApplicationContext())
                .url

("http://shouji.360tpcdn.com/170918/f7aa8587561e4031553316ada312ab38/com.tencent.qqlive_13049.apk

")
                .setEnableIndicator(true)//启动通知
                .addHeader("xx","cookies")//添加请求头
                .autoOpenIgnoreMD5()//下载完成后自动打开文件，不做文件校验
                .enqueue(new DownloadListenerAdapter() {
                    @Override
                    public void onProgress(String url, long downloaded, long length, long 

usedTime) {
                        super.onProgress(url, downloaded, length, usedTime);
                        Log.i(TAG, " progress:" + downloaded + " url:" + url);
                    }

                    @Override
                    public boolean onResult(Throwable throwable, Uri path, String url, Extra 

extra) {
                        Log.i(TAG, " path:" + path + " url:" + url + " length:" + new File

(path.getPath()).length());
                        return super.onResult(throwable, path, url, extra);
                    }
                });*/

        /*File dir = new File(getExternalCacheDir() + "/download/" + "public");
        if (!dir.exists()) {
            dir.mkdirs();
        }
        DownloadImpl.getInstance(getApplicationContext())
                .url

("http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_

636.apk")
                .target(new File(getExternalCacheDir() + "/download/" + "public" + "/" + 

"com.ss.android.article.news_636.apk"), this.getPackageName() + ".SampleFileProvider")//自定义路径

需指定目录和authority(FileContentProvide),需要相对应匹配才能启动通知，和自动打开文件
                .setUniquePath(false)//是否唯一路径
                .setForceDownload(true)//不管网络类型
                .setRetry(4)//下载异常，自动重试,最多重试4次
                .setBlockMaxTime(60000L) //以8KB位单位，默认60s ，如果60s内无法从网络

流中读满8KB数据，则抛出异常 。
                .setConnectTimeOut(10000L)//连接10超时
                .addHeader("xx", "cookie")//添加请求头
                .setDownloadTimeOut(Long.MAX_VALUE)//下载最大时长
                .setOpenBreakPointDownload(true)//打开断点续传
                .setParallelDownload(true)//打开多线程下载
                .autoOpenWithMD5("93d1695d87df5a0c0002058afc0361f1")//校验md5通过

后自动打开该文件,校验失败会回调异常
//                .autoOpenIgnoreMD5()
//                .closeAutoOpen()
                .quickProgress()//快速连续回调进度，默认1.2s回调一次
                .enqueue(new DownloadListenerAdapter() {
                    @Override
                    public void onStart(String url, String userAgent, String 

contentDisposition, String mimetype, long contentLength, Extra extra) {
                        super.onStart(url, userAgent, contentDisposition, 

mimetype, contentLength, extra);
                    }

                    @MainThread //加上该注解，自动回调到主线程
                    @Override
                    public void onProgress(String url, long downloaded, long 

length, long usedTime) {
                        super.onProgress(url, downloaded, length, 

usedTime);
                        Log.i(TAG, " progress:" + downloaded + " url:" + 

url);
                    }

                    @Override
                    public boolean onResult(Throwable throwable, Uri path, 

String url, Extra extra) {
                        String md5 = Runtime.getInstance().md5(new File

(path.getPath()));
                        Log.i(TAG, " path:" + path + " url:" + url + " 

length:" + new File(path.getPath()).length() + " md5:" + md5 + " extra.getFileMD5:" + 

extra.getFileMD5());
                        return super.onResult(throwable, path, url, 

extra);
                    }
                });
        run2();*/
    }

    private void run3() {
        final long begin1 = SystemClock.elapsedRealtime();
        FileDownloader.getImpl()
                .create

("http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_

636.apk")
                .setPath(this.getCacheDir().getAbsolutePath() + "/" + "test.apk")
                .setListener(new FileDownloadListener() {
                    @Override
                    protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) 

{

                    }

                    @Override
                    protected void progress(BaseDownloadTask task, int soFarBytes, int 

totalBytes) {
                        Log.i(TAG, "FileDownloader progress:" + soFarBytes);
                    }

                    @Override
                    protected void completed(BaseDownloadTask task) {
                        Log.i(TAG, " FileDownloader time:" + (SystemClock.elapsedRealtime() - 

begin1)
                                + " length:" + new File(task.getPath()).length()
                                + "  path:" + task.getPath());
                        new File(task.getPath()).delete();
//                      run2();
                    }

                    @Override
                    protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) 

{

                    }

                    @Override
                    protected void error(BaseDownloadTask task, Throwable e) {
                        e.printStackTrace();
                    }

                    @Override
                    protected void warn(BaseDownloadTask task) {

                    }
                }).start();
    }

    private void run2() {
        final long begin = SystemClock.elapsedRealtime();
        DownloadImpl.with(getApplicationContext())
                .url

("http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_

636.apk")
                .enqueue(new DownloadListenerAdapter() {
                    @Override
                    public void onProgress(String url, long downloaded, long length, long 

usedTime) {
                        super.onProgress(url, downloaded, length, usedTime);
//                        Log.i(TAG, " progress:" + downloaded + " url:" + url);
                    }

                    @Override
                    public boolean onResult(Throwable throwable, Uri path, String url, Extra 

extra) {
                        Log.i(TAG, " path:" + path + " url:" + url + " length:" + new File

(path.getPath()).length());
                        Log.i(TAG, " DownloadImpl time:" + (SystemClock.elapsedRealtime() - 

begin) + " length:" + new File(path.getPath()).length());
                        run3();
                        return super.onResult(throwable, path, url, extra);
                    }
                });
    }

    private class NativeDownloadAdapter extends RecyclerView.Adapter<NativeDownloadViewHolder> {
        @NonNull
        @Override
        public NativeDownloadViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
            View v = LayoutInflater.from(viewGroup.getContext()).inflate

(R.layout.recyclerview_item_download, viewGroup, false);
            return new NativeDownloadViewHolder(v);
        }

        @Override
        public void onBindViewHolder(@NonNull final NativeDownloadViewHolder 

nativeDownloadViewHolder, final int i) {
            final DownloadBean downloadBean = mDownloadTasks.get(i);
            Picasso.get().load(downloadBean.imageUrl)
                    .resize(100, 100)
                    .centerCrop().
                    transform(new RoundTransform(MainActivity.this.getApplicationContext()))
                    .into(nativeDownloadViewHolder.mIconIv);
            nativeDownloadViewHolder.mStatusButton.setEnabled(true);
            nativeDownloadViewHolder.mStatusButton.setTag(downloadBean);
            if (downloadBean.getTotalsLength() > 0L) {
                int mProgress = (int) ((downloadBean.getLoaded()) / Float.valueOf

(downloadBean.getTotalsLength()) * 100);
                Log.e(TAG, "mProgress:" + mProgress + " position:" + i);
                nativeDownloadViewHolder.mProgressBar.setProgress(mProgress);
                nativeDownloadViewHolder.mCurrentProgress.setText("当前进度" + byte2FitMemorySize

(downloadBean.getLoaded()) + "/" + byte2FitMemorySize(downloadBean.getTotalsLength()) + " 耗时:" + 

((downloadBean.getUsedTime()) / 1000) + "s");
            } else {
                nativeDownloadViewHolder.mProgressBar.setProgress(0);
                nativeDownloadViewHolder.mCurrentProgress.setText("当前进度,已下载:" + 

byte2FitMemorySize(downloadBean.getLoaded()) + " 耗时:" + ((downloadBean.getUsedTime()) / 1000) + 

"s");
            }
            Log.e(TAG, "status:" + downloadBean.getStatus() + " position:" + i);
            if (downloadBean.getStatus() == DownloadTask.STATUS_NEW) {
                nativeDownloadViewHolder.mStatusButton.setText("开始");
            } else if (downloadBean.getStatus() == DownloadTask.STATUS_PAUSING) {
                nativeDownloadViewHolder.mStatusButton.setText("暂停中...");
                nativeDownloadViewHolder.mStatusButton.setEnabled(false);
            } else if (downloadBean.getStatus() == DownloadTask.STATUS_PENDDING) {
                nativeDownloadViewHolder.mStatusButton.setText("等待中...");
                nativeDownloadViewHolder.mStatusButton.setEnabled(false);
            } else if (downloadBean.getStatus() == DownloadTask.STATUS_PAUSED) {
                nativeDownloadViewHolder.mStatusButton.setText("继续");
            } else if (downloadBean.getStatus() == DownloadTask.STATUS_DOWNLOADING) {
                nativeDownloadViewHolder.mStatusButton.setText("暂停");
            } else if (downloadBean.getStatus() == DownloadTask.STATUS_CANCELED || 

downloadBean.getStatus() == DownloadTask.STATUS_ERROR) {
                nativeDownloadViewHolder.mStatusButton.setText("出错");
                nativeDownloadViewHolder.mStatusButton.setEnabled(false);
            } else {
                nativeDownloadViewHolder.mStatusButton.setText("已完成");
                nativeDownloadViewHolder.mStatusButton.setEnabled(false);
            }
            nativeDownloadViewHolder.mStatusButton.setOnClickListener(new View.OnClickListener() 

{
                long lastTime = SystemClock.elapsedRealtime();

                @Override
                public void onClick(View v) {
                    Runtime.getInstance().log(TAG, "mStatusButton onClick");
                    if (SystemClock.elapsedRealtime() - lastTime <= 500) {
                        return;
                    }
                    lastTime = SystemClock.elapsedRealtime();
                    if (downloadBean.getStatus() == DownloadTask.STATUS_NEW) {
                        nativeDownloadViewHolder.mStatusButton.setText("等待中...");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                        boolean isStarted = DownloadImpl.getInstance(getApplicationContext

()).enqueue(downloadBean);
                        if (!isStarted) {
                            bindViewHolder(nativeDownloadViewHolder, i);
                        }
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_PENDDING) {
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_DOWNLOADING) {
                        if (TextUtils.isEmpty(downloadBean.getUrl())) {
                            nativeDownloadViewHolder.mStatusButton.setText("出错");
                            nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                            return;
                        }
                        DownloadTask downloadTask = DownloadImpl.getInstance

(getApplicationContext()).pause(downloadBean.getUrl());
                        if (downloadTask != null) {
                            nativeDownloadViewHolder.mStatusButton.setText("继续");
                        } else {
                            bindViewHolder(nativeDownloadViewHolder, i);
                        }
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_PAUSED) {
                        boolean isStarted = DownloadImpl.getInstance(getApplicationContext

()).resume(downloadBean.getUrl());
                        nativeDownloadViewHolder.mStatusButton.setText("等待中...");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                        if (!isStarted) {
                            bindViewHolder(nativeDownloadViewHolder, i);
                        }
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_CANCELED) {
                    } else {
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                        nativeDownloadViewHolder.mStatusButton.setText("已完成");
                    }
                }
            });
            downloadBean.setDownloadListenerAdapter(new DownloadListenerAdapter() {
                @Override
                public void onStart(String url, String userAgent, String contentDisposition, 

String mimetype, long contentLength, Extra extra) {
                    if (nativeDownloadViewHolder.mStatusButton.getTag() != downloadBean) {
                        Log.e(TAG, "item recycle onStart");
                        return;
                    }
//                    nativeDownloadViewHolder.mStatusButton.setText("暂停");
//                    nativeDownloadViewHolder.mStatusButton.setEnabled(true);
                    Log.i(TAG, " isRunning:" + DownloadImpl.getInstance(getApplicationContext

()).isRunning(url));
                }

                @MainThread //回调到主线程，添加该注释
                @Override
                public void onProgress(String url, long downloaded, long length, long usedTime) {
                    if (nativeDownloadViewHolder.mStatusButton.getTag() != downloadBean) {
                        Log.e(TAG, "onProgress item recycle");
                        return;
                    }
                    int mProgress = (int) ((downloaded) / Float.valueOf(length) * 100);
//                    Log.i(TAG, "onProgress:" + mProgress + " downloaded:" + downloaded + " 

totals:" + length + " url:" + url + " Thread:" + Thread.currentThread().getName());
                    nativeDownloadViewHolder.mProgressBar.setProgress(mProgress);
                    if (length <= 0) {
                        nativeDownloadViewHolder.mCurrentProgress.setText("当前进度,已下载:" + 

byte2FitMemorySize(downloaded) + " 耗时:" + ((downloadBean.getUsedTime()) / 1000) + "s");
                    } else {
                        nativeDownloadViewHolder.mCurrentProgress.setText("当前进度" + 

byte2FitMemorySize(downloaded) + "/" + byte2FitMemorySize(length) + " 耗时:" + 

((downloadBean.getUsedTime()) / 1000) + "s");

                    }
                }

                @Override
                public boolean onResult(Throwable throwable, Uri uri, String url, Extra extra) {
                    if (nativeDownloadViewHolder.mStatusButton.getTag() != downloadBean) {
                        Log.e(TAG, "item recycle");
                        return super.onResult(throwable, uri, url, extra);
                    }
                    Log.i(TAG, "onResult isSuccess:" + (throwable == null) + " url:" + url + " 

Thread:" + Thread.currentThread().getName() + " uri:" + uri.toString() + " isPaused:" + 

DownloadImpl.getInstance(getApplicationContext()).isPaused(url));
                    nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                    if (throwable == null) {
                        nativeDownloadViewHolder.mStatusButton.setText("已完成");
                    } else if (throwable instanceof DownloadException) {
                        DownloadException downloadException = (DownloadException) throwable;
                        if (downloadException.getCode() == Downloader.ERROR_USER_PAUSE) {
                            nativeDownloadViewHolder.mStatusButton.setText("继续");
                            nativeDownloadViewHolder.mStatusButton.setEnabled(true);
                        } else {
                            nativeDownloadViewHolder.mStatusButton.setText("出错");
                            nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                        }
                        Toast.makeText(MainActivity.this, downloadException.getMsg(), 1).show();
                    }
                    return super.onResult(throwable, uri, url, extra);
                }

                @Override
                public void onDownloadStatusChanged(Extra extra, int status) {
                    super.onDownloadStatusChanged(extra, status);
                    Log.e(TAG, "onDownloadStatusChanged:" + status);
                    if (nativeDownloadViewHolder.mStatusButton.getTag() != downloadBean) {
                        Log.e(TAG, "item recycle onDownloadStatusChanged");
                        return;
                    }
                    if (status == DownloadTask.STATUS_NEW) {
                        nativeDownloadViewHolder.mStatusButton.setText("开始");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(true);

                    } else if (status == DownloadTask.STATUS_PENDDING) {
                        nativeDownloadViewHolder.mStatusButton.setText("等待中...");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                    } else if (status == DownloadTask.STATUS_PAUSING) {
                        nativeDownloadViewHolder.mStatusButton.setText("暂停中...");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_DOWNLOADING) {
                        nativeDownloadViewHolder.mStatusButton.setText("暂停");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(true);
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_PAUSED) {
                        nativeDownloadViewHolder.mStatusButton.setText("继续");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(true);
                    }  /*else if (downloadBean.getStatus() == DownloadTask.STATUS_PAUSED) {
                        nativeDownloadViewHolder.mStatusButton.setText("继续");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(true);
                    } else if (downloadBean.getStatus() == DownloadTask.STATUS_CANCELED) {
                        nativeDownloadViewHolder.mStatusButton.setText("出错");
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                    } else {
                        nativeDownloadViewHolder.mStatusButton.setEnabled(false);
                        nativeDownloadViewHolder.mStatusButton.setText("已完成");
                    }*/
                }
            });

        }

        @Override
        public int getItemCount() {
            return mDownloadTasks.size();
        }
    }

    private static String byte2FitMemorySize(final long byteNum) {
        if (byteNum < 0) {
            return "";
        } else if (byteNum < 1024) {
            return String.format(Locale.getDefault(), "%.1fB", (double) byteNum);
        } else if (byteNum < 1048576) {
            return String.format(Locale.getDefault(), "%.1fKB", (double) byteNum / 1024);
        } else if (byteNum < 1073741824) {
            return String.format(Locale.getDefault(), "%.1fMB", (double) byteNum / 1048576);
        } else {
            return String.format(Locale.getDefault(), "%.1fGB", (double) byteNum / 1073741824);
        }
    }

    private class NativeDownloadViewHolder extends RecyclerView.ViewHolder {
        ProgressBar mProgressBar;
        Button mStatusButton;
        ImageView mIconIv;
        private final TextView mCurrentProgress;

        public NativeDownloadViewHolder(@NonNull View itemView) {
            super(itemView);
            mIconIv = itemView.findViewById(R.id.icon_iv);
            mStatusButton = itemView.findViewById(R.id.start_button);
            mProgressBar = itemView.findViewById(R.id.progressBar);
            mProgressBar.setMax(100);
            mCurrentProgress = itemView.findViewById(R.id.current_progress);
        }
    }

    public static class DownloadBean extends DownloadTask {
        public String title;
        public String imageUrl;

        public DownloadBean(String title, String imageUrl, String url) {
            this.title = title;
            this.imageUrl = imageUrl;
            this.mUrl = url;
        }

        @Override
        public DownloadTask addHeader(String key, String value) {
            return super.addHeader(key, value);
        }

        @Override
        protected DownloadBean setDownloadListenerAdapter(DownloadListenerAdapter 

downloadListenerAdapter) {
            return (DownloadBean) super.setDownloadListenerAdapter(downloadListenerAdapter);
        }

        @Override
        public DownloadTask setTargetCompareMD5(String targetCompareMD5) {
            return super.setTargetCompareMD5(targetCompareMD5);
        }

        @Override
        public DownloadBean setUrl(String url) {
            return (DownloadBean) super.setUrl(url);
        }

        @Override
        public DownloadBean setContext(Context context) {
            return (DownloadBean) super.setContext(context);
        }

        @Override
        protected DownloadTask setForceDownload(boolean force) {
            return super.setForceDownload(force);
        }

        @Override
        public void setCalculateMD5(boolean calculateMD5) {
            super.setCalculateMD5(calculateMD5);
        }

        @Override
        public DownloadBean setEnableIndicator(boolean enableIndicator) {
            return (DownloadBean) super.setEnableIndicator(enableIndicator);
        }

        @Override
        public DownloadBean setRetry(int retry) {
            return (DownloadBean) super.setRetry(retry);
        }

        @Override
        public DownloadBean setQuickProgress(boolean quickProgress) {
            return (DownloadBean) super.setQuickProgress(quickProgress);
        }

        @Override
        public DownloadBean autoOpenIgnoreMD5() {
            return (DownloadBean) super.autoOpenIgnoreMD5();
        }
    }

    public static class RoundTransform implements com.squareup.picasso.Transformation {

        private Context mContext;

        public RoundTransform(Context context) {
            mContext = context;
        }

        @Override
        public Bitmap transform(Bitmap source) {

            int widthLight = source.getWidth();
            int heightLight = source.getHeight();
            int radius = dp2px(mContext, 8); // 圆角半径

            Bitmap output = Bitmap.createBitmap(source.getWidth(), source.getHeight(), 

Bitmap.Config.ARGB_8888);

            Canvas canvas = new Canvas(output);
            Paint paintColor = new Paint();
            paintColor.setFlags(Paint.ANTI_ALIAS_FLAG);

            RectF rectF = new RectF(new Rect(0, 0, widthLight, heightLight));

            canvas.drawRoundRect(rectF, radius, radius, paintColor);
//        canvas.drawRoundRect(rectF, widthLight / 5, heightLight / 5, paintColor);

            Paint paintImage = new Paint();
            paintImage.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_ATOP));
            canvas.drawBitmap(source, 0, 0, paintImage);
            source.recycle();
            return output;
        }

        @Override
        public String key() {
            return "roundcorner";
        }

    }

    public void createDatasource() {
        DownloadBean downloadBean = new DownloadBean("QQ", 

"http://p18.qhimg.com/dr/72__/t0111cb71dabfd83b21.png", 

"https://d71329e5c0be6cdc2b46d0df2b4bd841.dd.cdntips.com/imtt.dd.qq.com/16891/apk/06AB1F5B0A51BEF

D859B2B0D6B9ED9D9.apk?

mkey=5d47b9f223f7bc0d&f=1806&fsname=com.tencent.mobileqq_8.1.0_1232.apk&csr=1bbd&cip=35.247.154.2

48&proto=https");
        downloadBean.setQuickProgress(true);
        downloadBean.setRetry(4);
        downloadBean.setForceDownload(true);
        downloadBean.setContext(this.getApplicationContext());
        mDownloadTasks.add(downloadBean);
        downloadBean = new DownloadBean("支付宝", 

"http://p18.qhimg.com/dr/72__/t01a16bcd9acd07d029.png", 

"http://shouji.360tpcdn.com/170919/e7f5386759129f378731520a4c953213/com.eg.android.AlipayGphone_1

15.apk");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("UC", 

"http://p19.qhimg.com/dr/72__/t01195d02b486ef8ebe.png", 

"http://shouji.360tpcdn.com/170919/9f1c0f93a445d7d788519f38fdb3de77/com.UCMobile_704.apk");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("腾讯视频", 

"http://p18.qhimg.com/dr/72__/t01ed14e0ab1a768377.png", 

"http://shouji.360tpcdn.com/170918/f7aa8587561e4031553316ada312ab38/com.tencent.qqlive_13049.apk"

);
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setForceDownload(true);
        downloadBean.setQuickProgress(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("头条", 

"http://p15.qhimg.com/dr/72__/t013d31024ae54d9c35.png", 

"http://shouji.360tpcdn.com/170918/93d1695d87df5a0c0002058afc0361f1/com.ss.android.article.news_6

36.apk");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setCalculateMD5(true);
        downloadBean.addHeader("cookies", "abc");
        downloadBean.addHeader("tests", "tests");
        downloadBean.setForceDownload(true);
        downloadBean.setTargetCompareMD5("93d1695d87df5a0c0002058afc0361f1");
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("应用宝", 

"https://pp.myapp.com/ma_icon/0/icon_5848_1565090584/96", 

"http://imtt.dd.qq.com/16891/myapp/channel_78665107_1000047_48e7227d3afeb842447c73c4b7af2509.apk?

hsr=5848");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        downloadBean.autoOpenIgnoreMD5();
        downloadBean.setCalculateMD5(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("附近越爱", 

"https://pp.myapp.com/ma_icon/0/icon_52396134_1563435176/96", 

"https://wxz.myapp.com/16891/apk/66339C385B32951E838F89AFDBB8AFBF.apk?

fsname=com.wangjiang.fjya_5.6.3_98.apk&hsr=4d5s");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("白菜二手车", 

"https://pp.myapp.com/ma_icon/0/icon_52728407_1565231751/96", 

"http://imtt.dd.qq.com/16891/myapp/channel_78665107_1000047_48e7227d3afeb842447c73c4b7af2509.apk?

hsr=5848&fsname=YYB.998886.dad220fda3959275efcb77f06835b974.1000047.apk");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("老鹰抓小鸡", 

"https://pp.myapp.com/ma_icon/0/icon_12097212_1555095310/96", 

"http://183.235.254.177/cache/112.29.208.41/imtt.dd.qq.com/16891/myapp/channel_78665107_1000047_4

8e7227d3afeb842447c73c4b7af2509.apk?

mkey=5d5016b578e7f75c&f=184b&hsr=5848&fsname=YYB.998886.2e4a1c0f5a55b75a2e7a10c0b53a3491.1000047.

apk&cip=120.231.209.169&proto=http&ich_args2=6-

11231103023581_c2af2d3056e749ee2654202c210b6535_10004303_9c896229d2c0f7d3903d518939a83798_e03b546

f591096a2b6182b487572fb16");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("2345手机助手", 

"https://pp.myapp.com/ma_icon/0/icon_10427994_1565164413/96", 

"https://wxz.myapp.com/16891/apk/14004450452AC52D15749001DBD0E4EA.apk?

fsname=com.market2345_7.0_115.apk&hsr=4d5s");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("随手借", 

"https://pp.myapp.com/ma_pic2/0/shot_12170461_3_1564367665/550", 

"https://fb187cdbcc69278c9f1e6ce8e7257596.dd.cdntips.com/wxz.myapp.com/16891/apk/B505BB2B5D831592

D5E190BAD5E66CCA.apk?

mkey=5d50161b78e7f75c&f=1026&fsname=audaque.SuiShouJie_4.11.11_49.apk&hsr=4d5s&cip=120.231.209.16

9&proto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("极光单词", 

"https://pp.myapp.com/ma_pic2/0/shot_52835037_1_1564713577/550", 

"https://6b7e49d6fab5c817409329478a000160.dd.cdntips.com/wxz.myapp.com/16891/apk/C721DE2D7E453877

2FA98C1E9830F92F.apk?

mkey=5d5017df78e7f75c&f=9870&fsname=com.qingclass.jgdc_2.0.4_9.apk&hsr=4d5s&cip=120.231.209.169&p

roto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("帮帮测", 

"https://pp.myapp.com/ma_pic2/0/shot_52499136_3_1561616032/550", 

"https://fb187cdbcc69278c9f1e6ce8e7257596.dd.cdntips.com/wxz.myapp.com/16891/5571F5786B8E9F15058B

E615B419A28B.apk?

mkey=5d50176c78e7f75c&f=8ea4&fsname=com.bangbangce.mm_4.1.4_3104.apk&hsr=4d5s&cip=120.231.209.169

&proto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("速贷之家", 

"https://pp.myapp.com/ma_pic2/0/shot_42330202_2_1564649857/550", 

"https://3e25603914f997244c41c1ed7fbedfb5.dd.cdntips.com/wxz.myapp.com/16891/apk/7AADD4A8C9D404FB

97378EA3CA2E69E6.apk?

mkey=5d50172c78e7f75c&f=184b&fsname=com.yeer.sdzj_3.2.8_328.apk&hsr=4d5s&cip=120.231.209.169&prot

o=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("中原消费金融", 

"https://pp.myapp.com/ma_pic2/0/shot_52471681_2_1565161792/550", 

"https://f437b8a1a8be40951a91f58666e659d0.dd.cdntips.com/wxz.myapp.com/16891/apk/B1C6CC0DB7D412DA

47A3A446E28D9C09.apk?

mkey=5d5014fb78e7f75c&f=24c5&fsname=com.hnzycfc.zyxj_3.0.1_52.apk&hsr=4d5s&cip=120.231.209.169&pr

oto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setForceDownload(true);
        downloadBean.setQuickProgress(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("店长直聘", 

"https://pp.myapp.com/ma_icon/0/icon_12216213_1564373730/96", 

"https://f437b8a1a8be40951a91f58666e659d0.dd.cdntips.com/wxz.myapp.com/16891/apk/FA29D09A6CD550DC

BEBC1D89EA392109.apk?

mkey=5d5014b478e7f75c&f=1849&fsname=com.hpbr.directhires_4.31_403010.apk&hsr=4d5s&cip=120.231.209

.169&proto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("淘卷吧", 

"https://pp.myapp.com/ma_icon/0/icon_42320744_1564583832/96", 

"https://11473001bb572df6cb60e7e0821a4586.dd.cdntips.com/wxz.myapp.com/16891/apk/4AA997287EEA4A96

C2DFD97CEE0180AD.apk?

mkey=5d50148f78e7f75c&f=24c5&fsname=com.ciyun.oneshop_7.07_69.apk&hsr=4d5s&cip=120.231.209.169&pr

oto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("本地寻爱", 

"https://pp.myapp.com/ma_icon/0/icon_53268261_1564479560/96", 

"https://ce7ce9c885b5c04b6771ea454e096946.dd.cdntips.com/wxz.myapp.com/16891/apk/AAB98D7BDAFB390F

A4D37F6CBD910992.apk?

mkey=5d50142d78e7f75c&f=07b4&fsname=com.kaitai.bdxa_5.6.3_98.apk&hsr=4d5s&cip=120.231.209.169&pro

to=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("360借条", 

"https://pp.myapp.com/ma_icon/0/icon_42379225_1564124706/96", 

"https://e2983106ebfb9f560ff3a8e230faa981.dd.cdntips.com/wxz.myapp.com/16891/apk/DEB654116EC627AB

A4DB12A6E777EAAD.apk?

mkey=5d5015d578e7f75c&f=1026&fsname=com.qihoo.loan_1.5.4_213.apk&hsr=4d5s&cip=120.231.209.169&pro

to=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setEnableIndicator(false);
        downloadBean.setForceDownload(true);
        downloadBean.setQuickProgress(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("淘宝", 

"https://pp.myapp.com/ma_icon/0/icon_5080_1564463763/96", 

"http://shouji.360tpcdn.com/170901/ec1eaad9d0108b30d8bd602da9954bb7/com.taobao.taobao_161.apk");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        //http://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx?0.04400023248109086

        downloadBean = new DownloadBean("分块传输，图片", 

"http://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx?0.04400023248109086", 

"http://www.httpwatch.com/httpgallery/chunked/chunkedimage.aspx?0.04400023248109086");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.autoOpenIgnoreMD5();
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        downloadBean = new DownloadBean("也爱直播", 

"https://pp.myapp.com/ma_icon/0/icon_10472625_1555686747/96", 

"https://a46fefcd092f5f917ed1ee349b85d3b7.dd.cdntips.com/wxz.myapp.com/16891/F9B7FA7EC195FC453AE9

082F826E6B28.apk?

mkey=5d4c6bdc78e5058d&f=1806&fsname=com.tiange.hz.paopao8_4.4.1_441.apk&hsr=4d5s&cip=120.229.35.1

20&proto=https");
        downloadBean.setContext(this.getApplicationContext());
        downloadBean.autoOpenIgnoreMD5().setQuickProgress(true);
        downloadBean.setForceDownload(true);
        mDownloadTasks.add(downloadBean);

        //
    }

    public static int dp2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        DownloadImpl.getInstance(getApplicationContext()).cancelAll();
    }
}
```

### Reference

- Read more [here](https://github.com/Justson/Downloader).
- Download code [here](https://downgit.github.io/#/home?url=https://github.com/Justson/Downloader/tree/master/app).