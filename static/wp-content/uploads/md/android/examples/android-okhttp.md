# Android OkHTTP Quick Examples

_Android Okhttp Tutorial and Example._


#### OkHttp Quick Examples and HowTos

##### 1\. How to Download Image in Background Thread with OkHttp

Let's say we want to download our image from the web, either http or https network.

Yeah we can download the image and probably return it as a bitmap which we can then load into our imageview.

We've used the `zxing` library's StringUtils. You can ommit it and modify the code appropriately.

Here's the full class:

```java
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.util.Log;

import com.google.zxing.common.StringUtils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;

public class DownloadUtils {

    private static DownloadUtils sInstance;

    private OkHttpClient client;

    private ExecutorService downloadService;

    private DownloadUtils() {
        client = new OkHttpClient.Builder()
                .addInterceptor(new HttpLoggingInterceptor())
                .build();
        downloadService = Executors.newCachedThreadPool();
    }

    public static DownloadUtils getInstance() {
        if (sInstance == null) {
            sInstance = new DownloadUtils();
        }
        return sInstance;
    }

    public Bitmap downloadImage(@NonNull String url) {
        final Bitmap[] result = new Bitmap[1];
        if (url.startsWith("https://") || url.startsWith("http://")) {
            final Request request = new Request.Builder()
                    .url(url)
                    .build();

            final CountDownLatch latch = new CountDownLatch(1);
            downloadService.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        Response response = client.newCall(request).execute();
                        result[0] = BitmapFactory.decodeStream(response.body().byteStream());
                        latch.countDown();
                    } catch (IOException e) {
                        latch.countDown();
                    }
                }
            });
            try {
                latch.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return result[0];
        } else {
            return null;
        }

    }

}
```
