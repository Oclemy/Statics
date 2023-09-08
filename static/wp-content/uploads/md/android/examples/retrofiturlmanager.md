# RetrofitUrlManager


> `RetrofitUrlManager` Lets Retrofit support multiple baseUrl and can be change the baseUrl at runtime.

![overview](https://github.com/JessYanCoding/RetrofitUrlManager/raw/master/art/overview.gif) 

### Step 1: Install it

Install it using the following command:

```groovy
 implementation 'me.jessyan:retrofit-url-manager:1.4.0'
```

### Step 2: Initialize

```java
 // When building OkHttpClient, the OkHttpClient.Builder() is passed to the with() method to initialize the configuration
 OkHttpClient = RetrofitUrlManager.getInstance().with(new OkHttpClient.Builder())
                .build();
```

### Step 2: Create API Service

```java
 public interface ApiService {
     @Headers({"Domain-Name: douban"}) // Add the Domain-Name header
     @GET("/v2/book/{id}")
     Observable<ResponseBody> getBook(@Path("id") int id);
}
```

### Step 3: Put domain

```java
 // You can change BaseUrl at any time while App is running (The interface that declared the Domain-Name header)
 RetrofitUrlManager.getInstance().putDomain("douban", "https://api.douban.com");
```

If you want to change the global BaseUrl:

```java
 // BaseUrl configured in the Domain-Name header will override BaseUrl in the global setting
 RetrofitUrlManager.getInstance().setGlobalDomain("your BaseUrl");
```

### Example 

Here is a full example:

**NetworkManager.java**

```java

package me.jessyan.retrofiturlmanager.demo;

import java.util.concurrent.TimeUnit;

import me.jessyan.retrofiturlmanager.RetrofitUrlManager;
import me.jessyan.retrofiturlmanager.demo.api.OneApiService;
import me.jessyan.retrofiturlmanager.demo.api.ThreeApiService;
import me.jessyan.retrofiturlmanager.demo.api.TwoApiService;
import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

import static me.jessyan.retrofiturlmanager.demo.api.Api.APP_DEFAULT_DOMAIN;

public class NetWorkManager {
    private OkHttpClient mOkHttpClient;
    private Retrofit mRetrofit;
    private OneApiService mOneApiService;
    private TwoApiService mTwoApiService;
    private ThreeApiService mThreeApiService;

    private static class NetWorkManagerHolder {
        private static final NetWorkManager INSTANCE = new NetWorkManager();
    }

    public static final NetWorkManager getInstance() {
        return NetWorkManagerHolder.INSTANCE;
    }

    private NetWorkManager() {
        this.mOkHttpClient = RetrofitUrlManager.getInstance().with(new OkHttpClient.Builder()) //RetrofitUrlManager 初始化
                .readTimeout(5, TimeUnit.SECONDS)
                .connectTimeout(5, TimeUnit.SECONDS)
                .build();

        this.mRetrofit = new Retrofit.Builder()
                .baseUrl(APP_DEFAULT_DOMAIN)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())//使用rxjava
                .addConverterFactory(GsonConverterFactory.create())//使用Gson
                .client(mOkHttpClient)
                .build();

        this.mOneApiService = mRetrofit.create(OneApiService.class);
        this.mTwoApiService = mRetrofit.create(TwoApiService.class);
        this.mThreeApiService = mRetrofit.create(ThreeApiService.class);
    }

    public OkHttpClient getOkHttpClient() {
        return mOkHttpClient;
    }

    public Retrofit getRetrofit() {
        return mRetrofit;
    }

    public OneApiService getOneApiService() {
        return mOneApiService;
    }

    public TwoApiService getTwoApiService() {
        return mTwoApiService;
    }

    public ThreeApiService getThreeApiService() {
        return mThreeApiService;
    }

}

```

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    private EditText mUrl1;
    private EditText mUrl2;
    private EditText mUrl3;
    private EditText mGlobalUrl;
    private ProgressDialog mProgressDialog;
    private ChangeListener mListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initView();
        initListener();
    }

    private void initView() {
        setContentView(R.layout.activity_main);
        mUrl1 = (EditText) findViewById(R.id.et_url1);
        mUrl2 = (EditText) findViewById(R.id.et_url2);
        mUrl3 = (EditText) findViewById(R.id.et_url3);
        mGlobalUrl = (EditText) findViewById(R.id.et_global_url);
        mProgressDialog = new ProgressDialog(this);
        mUrl1.setSelection(mUrl1.getText().toString().length());
    }


    private void initListener() {
        this.mListener = new ChangeListener();
        RetrofitUrlManager.getInstance().registerUrlChangeListener(mListener);

        findViewById(R.id.bt_request1).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                HttpUrl httpUrl = RetrofitUrlManager.getInstance().fetchDomain(GITHUB_DOMAIN_NAME);
                if (httpUrl == null || !httpUrl.toString().equals(mUrl1.getText().toString())) { 
                    RetrofitUrlManager.getInstance().putDomain(GITHUB_DOMAIN_NAME, mUrl1.getText().toString());
                }
                NetWorkManager
                        .getInstance()
                        .getOneApiService()
                        .getUsers(1, 10)
                        .compose(MainActivity.this.<ResponseBody>getDefaultTransformer())
                        .subscribe(getDefaultObserver());
            }
        });

        findViewById(R.id.bt_request2).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                HttpUrl httpUrl = RetrofitUrlManager.getInstance().fetchDomain(GANK_DOMAIN_NAME);
                if (httpUrl == null || !httpUrl.toString().equals(mUrl2.getText().toString())) {
                    RetrofitUrlManager.getInstance().putDomain(GANK_DOMAIN_NAME, mUrl2.getText().toString());
                }
               
                NetWorkManager
                        .getInstance()
                        .getTwoApiService()
                        .getData(10, 1)
                        .compose(MainActivity.this.<ResponseBody>getDefaultTransformer())
                        .subscribe(getDefaultObserver());
            }
        });

        findViewById(R.id.bt_request3).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                HttpUrl httpUrl = RetrofitUrlManager.getInstance().fetchDomain(DOUBAN_DOMAIN_NAME);
                if (httpUrl == null || !httpUrl.toString().equals(mUrl3.getText().toString())) { 
                    RetrofitUrlManager.getInstance().putDomain(DOUBAN_DOMAIN_NAME, mUrl3.getText().toString());
                }
                NetWorkManager
                        .getInstance()
                        .getThreeApiService()
                        .getBook(1220562)
                        .compose(MainActivity.this.<ResponseBody>getDefaultTransformer())
                        .subscribe(getDefaultObserver());
            }
        });

    }

    private void showResult(String result) {
        new AlertDialog.Builder(this)
                .setMessage(result)
                .setCancelable(true)
                .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .create()
                .show();
    }

    public void startAdvancedModel(View view) {
        final EditText editText = new EditText(MainActivity.this);
        editText.setBackgroundDrawable(null);
        editText.setText("http://jessyan.me/1");
        editText.setPadding(80, 30, 0, 0);
        new AlertDialog.Builder(this)
                .setTitle("增加或减少下面的 pathSegment, 看看替换后的 Url 有什么不同?")
                .setView(editText)
                .setCancelable(true)
                .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        RetrofitUrlManager.getInstance().startAdvancedModel(editText.getText().toString());
                    }
                })
                .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .create()
                .show();
    }

    public void urlNotChange(View view) {
        showResult("After using the global BaseUrl of this framework, all Urls of the entire project will be replaced by the global BaseUrl by default, but in actual development, some Urls need to remain as they are and not be replaced by the global BaseUrl. For example, when requesting some fixed image download addresses, At this time, adding RetrofitUrlManager.IDENTIFICATION_IGNORE at the end of this Url address can avoid being replaced by the global BaseUrl, you can use the RetrofitUrlManager.getInstance().setUrlNotChange(url) method, the Url returned by this method has helped you automatically add this flag at the end of the Url !");
    }

    public void btnRequestDefault(View view) {
        NetWorkManager
                .getInstance()
                .getOneApiService()
                .requestDefault()
                .compose(this.<ResponseBody>getDefaultTransformer())
                .subscribe(getDefaultObserver());
    }

    public void btnSetGlobalUrl(View view) {
        HttpUrl httpUrl = RetrofitUrlManager.getInstance().getGlobalDomain();
        if (null == httpUrl || !httpUrl.toString().equals(mGlobalUrl.getText().toString().trim()))
            RetrofitUrlManager.getInstance().setGlobalDomain(mGlobalUrl.getText().toString().trim());

        Toast.makeText(getApplicationContext(), "全局替换baseUrl成功", Toast.LENGTH_SHORT).show();
    }

    public void btnRmoveGlobalUrl(View view) {
        RetrofitUrlManager.getInstance().removeGlobalDomain();
        Toast.makeText(getApplicationContext(), "移除了全局baseUrl", Toast.LENGTH_SHORT).show();
    }

    private <T> ObservableTransformer<T, T> getDefaultTransformer() {
        return new ObservableTransformer<T, T>() {
            @Override
            public ObservableSource<T> apply(Observable<T> upstream) {
                return upstream.subscribeOn(Schedulers.io())
                        .doOnSubscribe(new Consumer<Disposable>() {
                            @Override
                            public void accept(Disposable disposable) throws Exception {
                                mProgressDialog.show();
                            }
                        })
                        .subscribeOn(AndroidSchedulers.mainThread())
                        .observeOn(AndroidSchedulers.mainThread())
                        .doAfterTerminate(new Action() {
                            @Override
                            public void run() throws Exception {
                                mProgressDialog.dismiss();
                            }
                        });
            }
        };
    }

    private Observer<ResponseBody> getDefaultObserver() {
        return new Observer<ResponseBody>() {
            @Override
            public void onSubscribe(Disposable d) {

            }

            @Override
            public void onNext(ResponseBody response) {
                try {
                    String string = response.string();
                    Log.d("test", string);
                    showResult(string);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onError(Throwable throwable) {
                throwable.printStackTrace();
                showResult(throwable.getMessage());
            }

            @Override
            public void onComplete() {

            }
        };
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        RetrofitUrlManager.getInstance().unregisterUrlChangeListener(mListener); //记住注销监听器
    }

    private class ChangeListener implements onUrlChangeListener {

        @Override
        public void onUrlChangeBefore(HttpUrl oldUrl, String domainName) {
            Log.d("MainActivity", String.format("The oldUrl is <%s>, ready fetch <%s> from DomainNameHub",
                    oldUrl.toString(),
                    domainName));
        }

        @Override
        public void onUrlChanged(final HttpUrl newUrl, HttpUrl oldUrl) {
            Observable.just(1)
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(new Consumer<Object>() {
                        @Override
                        public void accept(Object o) throws Exception {
                            Toast.makeText(getApplicationContext(), "The newUrl is { " + newUrl.toString() + " }", Toast.LENGTH_LONG).show();
                        }
                    }, new Consumer<Throwable>() {
                        @Override
                        public void accept(Throwable throwable) throws Exception {
                            throwable.printStackTrace();
                        }
                    });
        }
    }
}
```

> You can find full code [here](https://github.com/JessYanCoding/RetrofitUrlManager/tree/master/app).

### Reference

> Read more [here](https://github.com/JessYanCoding/RetrofitUrlManager/).
> Download code [here](https://github.com/JessYanCoding/RetrofitUrlManager/archive/refs/heads/master.zip).
> Read more [here](https://github.com/JessYanCoding/).
