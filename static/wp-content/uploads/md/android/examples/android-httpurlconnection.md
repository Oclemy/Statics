# Kotlin Android HttpURLConnection Tutorial and Examples

In this piece we explore HttpURLConnection, android and java's standard networking class.

As a networking class HttpURLConnection can be to make HTTP requests over the web.


#### What is HttpUrlConnection?

_HttpUrlconnection is a UrlConnection for HTTP used to send as well receive data over the web._ These data may be of any type and length.

HttpURLConnection was added in android 1.0 and is a URLConnection with support for HTTP-specific features. Like its parent URLConnection, it resides in the java.net package. This class allows us do networking easily and is the standard networking library in android.

- HttpURLConnection subclasses java.net.URLConnection.
- It also directly Superclasses HttpsURLConnection

HttpUrlConnection can also be used to send and receive streams whose length isn’t known in advance.

To be used,we obtain a new `HttpUrlconnection` object by calling `url.openConnection()` and casting to `HttpUrlConnection`.

If we open a connction to a url with "https" scheme,this returns HttpsUrlConnection.

Here is a simple usage of HttpURLConnection to download a webpage:

```java
   URL url = new URL("http://www.google.com/");
   HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
   try {
     InputStream in = new BufferedInputStream(urlConnection.getInputStream());
     readStream(in);
   } finally {
     urlConnection.disconnect();
   }
```

For example, to retrieve the webpage at [http://www.android.com/](http://www.android.com/):

```java
   URL url = new URL("http://www.android.com/");
   HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
   try {
     InputStream in = new BufferedInputStream(urlConnection.getInputStream());
     readStream(in);
   } finally {
     urlConnection.disconnect();
   }
```

##### Posting Content

To post some content to a web server, first you have to configure the connection for output using setDoOutput(true).

For best performance, you should call either setFixedLengthStreamingMode(int) when the body length is known in advance, or setChunkedStreamingMode(int) when it is not. Otherwise HttpURLConnection will be forced to buffer the complete request body in memory before it is transmitted, wasting (and possibly exhausting) heap and increasing latency.

```java
 HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
   try {
     urlConnection.setDoOutput(true);
     urlConnection.setChunkedStreamingMode(0);

     OutputStream out = new BufferedOutputStream(urlConnection.getOutputStream());
     writeStream(out);

     InputStream in = new BufferedInputStream(urlConnection.getInputStream());
     readStream(in);
   } finally {
     urlConnection.disconnect();
   }
```

##### HTTP Authentication

HttpURLConnection supports HTTP basic authentication. You can use Authenticator to set the VM-wide authentication handler:

```java
  Authenticator.setDefault(new Authenticator() {
     protected PasswordAuthentication getPasswordAuthentication() {
       return new PasswordAuthentication(username, password.toCharArray());
     }
   });
```

##### Sessions with Cookies

To establish and maintain a potentially long-lived session between client and server, HttpURLConnection includes an extensible cookie manager. Enable VM-wide cookie management using CookieHandler and CookieManager:

```java
  CookieManager cookieManager = new CookieManager();
   CookieHandler.setDefault(cookieManager);
```

#### Quick HttpURLConnection Examples

##### 1\. Get Byte Array From Server

The aim is to get a byte array when supplied a URL string. We first instantiate the `java.net.URL` with the url.

Once we have the `java.net.URL` instance, we use it to open a connection which returns us a `URLConnection`.

This `URLConnection` is the parent class of `HttpURLConnection`, so we just cast it to our HttpUrlConnection.

Here's the full method:

```java
public byte[] getUrlBytes(String urlSpec) throws IOException {
    URL url = new URL(urlSpec);
    HttpURLConnection connection = (HttpURLConnection)url.openConnection();

    try {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        InputStream in = connection.getInputStream();

        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new IOException(connection.getResponseMessage() + ": with " +
                    urlSpec);
        }

        int bytesRead;
        byte[] buffer = new byte[1024];
        while ((bytesRead = in.read(buffer)) > 0) {
            out.write(buffer, 0, bytesRead);
        }
        out.close();
        return out.toByteArray();
    } finally {
        connection.disconnect();
    }
}
```

##### 2\. Ping URL

This method will ping the given url for availability. It will send a HEAD request and return true if the response code is in the `200 - 399`range.

```java
private static final String HEAD_REQUEST_METHOD = "HEAD";
/**
 * @param url the url to be pinged.
 * @param timeout_millis the timeout in millis for both the connection timeout and the response read timeout. Note that
 * the total timeout is effectively two times the given timeout.
 * @return {@code true} if the given {@code url} has returned response code within the range of {@code 200} - {@code 399} on a HEAD request, {@code false} otherwise
 */
public static boolean ping(final URL url, final int timeout_millis) {

    try {
        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(timeout_millis);
        connection.setReadTimeout(timeout_millis);
        connection.setRequestMethod(HEAD_REQUEST_METHOD);

        final int response_code = connection.getResponseCode();
        return HttpURLConnection.HTTP_OK <= response_code && response_code < HttpURLConnection.HTTP_BAD_REQUEST;
    }
    catch (IOException exception) {
        return false;
    }
}
```

##### 3\. Download Image Using HttpURLConnection

There are many complex image downloaders and loaders out there. But we also have to know how to implement our own with basic HttpURLConnection and AsyncTask

Here's how we can download a bitmap and return it. To use with AsyncTask all you have to do is call this method inside your `doInBackground()` method, then receive the bitmap in the `onPostExecute()` method, where then you can render it into your imageview.

```java
/**
 * Download the image from the given URL
 * @param urlString the URL to download
 * @return a bitmap of the downloaded image
 */
private Bitmap downloadImage(String urlString) {
    Bitmap bmp = null;

    try {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        InputStream is = conn.getInputStream();
        bmp = BitmapFactory.decodeStream(is);
        if (bmp != null) {
            return bmp;
        }
    }
    catch (Exception e) {
        e.printStackTrace();
    }
    return bmp;
}
```

##### 4\. Two methods to get Domain Names

You can reuse these two methods to get domain name for either SSL sites and Non-SSL sites.

All you have to do is pass the string url.

```java
public static String getDomainName(String url) {
        boolean ssl = url.startsWith(Constants.HTTPS);
        int index = url.indexOf('/', 8);
        if (index != -1) {
            url = url.substring(0, index);
        }

        URI uri;
        String domain = null;
        try {
            uri = new URI(url);
            domain = uri.getHost();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        if (domain == null || domain.isEmpty()) {
            return url;
        }
        if (ssl)
            return Constants.HTTPS + domain;
        else
            return domain.startsWith("www.") ? domain.substring(4) : domain;
    }

    public static String getDomainName2(String url) {

        URI uri;
        String domain = "";
        try {
            uri = new URI(url);
            domain = uri.getHost();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if(domain==null){
            return "";
        }
        return domain;
    }
```

##### 5\. How to get Protocol when provided a url

```java
    public static String getProtocol(String url) {
        int index = url.indexOf('/');
        return url.substring(0, index + 2);
    }
```

##### 6\. How to Check if a given URL can respond to a HTTP request

This method will Check if a URL exists and can respond to an HTTP request.

The first parameter is the `url` to check. Then we return `True` if the URL exists, `false` if it doesn't or an error occured.

```java
public static boolean checkURL(String url) {
    try {
        HttpURLConnection.setFollowRedirects(false);
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
        con.setRequestMethod("HEAD");
        return (con.getResponseCode() == HttpURLConnection.HTTP_OK);
    } catch (Exception e) {
        return false;
    }
}
```

##### 7\. How to get ContentTypes(and Cache them)

We want to see how we can get Content Types. We will be caching our results throughout the runtime of our app.

Start by importing HttpURLConnection, URL, and HashMap.

The HttpURLConnection is of course our networking class. The URL will allow us convert a simple string into a URL we can actually connect.

The HashMap will be used to cache our content types.

Let's start by creating a class:

```java
public final class HttpUtil {..}
```

You can see we have used the `final` modifier. This keyword is a non-access modifier applicable only to a variable, a method or a class.

A final class is a class that can't be extended or derived from. This is a utility class and we don't want it extended.

We will then have two constants:

```java
    static public final int TIMEOUT_DIRECT = 5 * 1000;
    private static final HashMap<URL, String> cachedContentTypes
            = new HashMap<URL, String>();
```

The `TIMEOUT_DIRECT` is our default timeout for direct URL connections. On the other hand `cachedContentTypes` will cache our retrieved content types.

Now we will have two methods responsible for getting us the content types.

First we are receiving a URL object. We will check first if that URL is already contained in our cached contents. If it is then we just get it from there. Otherwise we open our connection, set it's properties and return later our content type.

```java
    /**
     * Gets the content type reported for the given URL.
     * Results are cached throughout runtime.
     */
    public static String getContentType(URL uri) {
        if (!cachedContentTypes.containsKey(uri)) {
            String contentType = null;
            try {
                HttpURLConnection c = (HttpURLConnection)  uri.openConnection();
                HttpURLConnection.setFollowRedirects(true);
                c.setConnectTimeout(TIMEOUT_DIRECT);
                c.setReadTimeout(TIMEOUT_DIRECT);
                c.setRequestMethod("HEAD");
                c.connect();
                contentType = c.getContentType();
            } catch (Exception e) { }
            cachedContentTypes.put(uri, contentType);
        }
        return cachedContentTypes.get(uri);
    }
}
```

Then our second method simply receives a string then we build our URL from that string. Then we can simply reuse the first method.

```java
    /**
     * Gets the content type reported for the given URL.
     * Results are cached throughout runtime.
     */
    public static String getContentType(String uri) {
        String contentType = null;
        try {
            contentType = getContentType(new URL(uri));
        } catch (Exception e) { }
        return contentType;
    }
```

Just take those two methods and our two constants and add them to our class.

## Android HttpURLConection - HTTP GET in Java

_Android HttpURLConnection HTTP GET Tutorial._

In this piece we explore some HTTP GET examples. Basicaly how to perform HTTP GET using the HttpURLConnection class.

Let's start.

### Quick HTTP GET Examples

Let's start by looking at some quick HTTP GET examples.

#### 1\. How to perform HTTP GET and return a JSONObject

The first step is to perform a HTTP GET when provided the target URL and a Context object.

```java
    public static JSONObject getJsonObject(String url, Context context) throws IOException, JSONException{
        String line = null;
        InputStream is = getInputStream(url, null, null, context);
        BufferedReader br = new BufferedReader(new java.io.InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null){
            sb.append(line + 'n');
        }

        is.close();

        return new JSONObject(sb.toString());

    }
```

#### 2\. How to perform a HTTP GET and return a BufferedInputStream

Let's say we have a `getUserAgentString()` method as follows:

```java
    public static String  getUserAgentString(Context context){
        SharedPreferences sPref = PreferenceManager.getDefaultSharedPreferences(context);
        String myid = sPref.getString("myId", "NoInfo");
        String myscr = sPref.getInt("scW", 0)+"x"+sPref.getInt("scH", 0);
        String verString = null;
        try {
            verString = context.getPackageManager().getPackageInfo(context.getPackageName(),0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        String partnerid = "";

        return "aptoideAppsBackup-" + verString+";"+ Constants.TERMINAL_INFO+";"+myscr+";id:"+myid+";"+sPref.getString(Constants.LOGIN_USER_LOGIN, "")+";"+partnerid;
    }
```

Then here's we get the and return the BufferedInputStream.

```java
    public static BufferedInputStream getInputStream(String url, String username, String password, Context context) throws IOException{

        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();

        connection.setConnectTimeout(TIME_OUT);
        connection.setReadTimeout(TIME_OUT);
        if(username != null){
            String userPassword = username + ":" + password;
            String encoding = Base64.encodeToString(userPassword.getBytes(), Base64.NO_WRAP);
            connection.setRequestProperty("Authorization", "Basic " + encoding);
        }
        connection.setRequestProperty("User-Agent", getUserAgentString(context));
        System.out.println("Using user-agent: " + (getUserAgentString(context)));
        Log.d("TAG", username + " " + password);
        BufferedInputStream bis = new BufferedInputStream(connection.getInputStream(), 8 * 1024);

        return bis;

    }
```

## Android HttpURLConection -HTTP POST

_Android HttpURLConnection HTTP POST Tutorial._

This section contains various examples that allow you make HTTP POST request against a server. We use android's standard networking class HttpURLConection to make our requests.

### Quick HttpURLConnection HowTo Examples

Let's start by looking at some HowTo examples.

#### 1\. How to make a HttpURLConection HTTP POST Request and Return a response

Let's say we we provide you with a URL encoded string data. You are supposed to send them via a HTTP POST Request using HttpURLConnection.

Here's how we can do it.

```java
    public static JSONObject post(String url_string, String encoded_data) throws IOException {
        URL url;
        StringBuilder sb = null;
        String data;

            url = new URL(url_string);
            HttpURLConnection connection = null;

            connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(encoded_data);
            wr.flush();
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line + "n");
            }
            wr.close();
            br.close();

        JSONObject response = null;
        try {
            response = new JSONObject(sb.toString());
        } catch (JSONException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return response;
    }
```

#### 2\. How to make a HttpURLConection HTTP POST Request with Authentication

We want to make this post request in a background thread using AsyncTask class. We make that POST Request and receive a result.

Say for instance we want to make the POST request to GitHub.

Our first step would be to create a class that would then represent our result, lets call the class `HTTPConnectionResult`.

Our result will contain a string and a response code.

```java
public class HTTPConnectionResult {
    private final String result;
    private final int responceCode;

    public HTTPConnectionResult(String result, int responceCode) {
        this.result = result;
        this.responceCode = responceCode;
    }

    public String getResult() {
        return result;
    }

    public int getResponceCode() {
        return responceCode;
    }
}
```

Then let's another class to represent User session data. This class will store data associated with a given user session, or the time the request was being made.

Those data for us will comprise the id, credentials, token and login.

```java
public class UserSessionData {

    private final String id;
    private final String credentials;
    private final String token;
    private final String login;

    public UserSessionData(String id, String credentials, String token, String login) {
        this.id = id;
        this.credentials = credentials;
        this.token = token;
        this.login = login;
    }

    public static UserSessionData createUserSessionDataFromString(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] array = data.split(";");
        return new UserSessionData(array[0], array[1], array[2], array[3]);
    }

    public String getLogin() {
        return login;
    }

    public String getId() {
        return id;
    }

    public String getCredentials() {
        return credentials;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return id + ";" + credentials + ";" + token + ";" + login;
    }
}
```

What about a last class before looking at our AsyncTask, in this case a `Util` class:

```java
import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.preference.PreferenceManager;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

public final class Utils {
    public static final String SHARED_PREF_NAME = "com.ok.lab.GitJourney";
    public static final String DMY_DATE_FORMAT_PATTERN = "dd-MM-yyyy";
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private Utils() {

    }

    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        Log.e("TAG", "verifyStoragePermissions");
        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE
            );
        }
    }

    public static DateFormat createDateFormatterWithTimeZone(Context context, String pattern) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(context);
        boolean timeZone = sharedPref.getBoolean("timezone_switch", true);
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, Locale.getDefault());
        if (timeZone) {
            formatter.setTimeZone(TimeZone.getDefault());
        } else {
            String customTimeZone = sharedPref.getString("timezone_list", TimeZone.getDefault().getID());
            formatter.setTimeZone(TimeZone.getTimeZone(customTimeZone));
        }
        return formatter;
    }

    public static String getStackTrace(Exception e) {
        StringWriter writer = new StringWriter();
        PrintWriter printer = new PrintWriter(writer);
        e.printStackTrace(printer);
        printer.close();
        return writer.toString();
    }
}
```

Then now we come tou our AsynTask class.

Here's the thing, this class will perform an authentication to our Github account for instance. We will make a HTTP POST request for this and receive a result.

We have to do this in a background thread to avoid freezing the user interface.

The request itself we perform it in the `doInBackground` method. The result of this method will be our `UserSessionData` object.

Then when the results are back they will automatically get passed to our `onPostExecute()` method.

From there we can receive those data and store them in SharedPreferences. This allows our app to remember login details.

Here's the code for that.

```java
public class AuthenticationAsyncTask extends AsyncTask<String, Integer, UserSessionData> {

    private static final String TAG = AuthenticationAsyncTask.class.getSimpleName();
    private final Context context;

    public AuthenticationAsyncTask(Context context) {
        this.context = context;
    }

    @Override
    protected UserSessionData doInBackground(String... args) {
        try {
            HttpURLConnection connect = (HttpURLConnection) new URL(context.getString(R.string.url_connect)).openConnection();
            connect.setRequestMethod("POST");
            connect.setDoOutput(true);
            String inputString = args[0] + ":" + args[1];
            String credentials = Base64.encodeToString(inputString.getBytes(), Base64.NO_WRAP);
            String authentication = "basic " + credentials;
            connect.setRequestProperty("Authorization", authentication);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("client_id", context.getString(R.string.client_id));
            jsonObject.put("client_secret", context.getString(R.string.client_secret));
            jsonObject.put("note", context.getString(R.string.note));
            JSONArray jsonArray = new JSONArray();
            jsonArray.put("repo");
            jsonArray.put("user");
            jsonObject.put("scopes", jsonArray);

            OutputStream outputStream = connect.getOutputStream();
            Log.v(TAG, "request body = " + jsonObject.toString());
            outputStream.write(jsonObject.toString().getBytes());
            connect.connect();
            int responseCode = connect.getResponseCode();

            Log.v(TAG, "responseCode = " + responseCode);
            if (responseCode != HttpURLConnection.HTTP_CREATED) {
                return null;
            }
            InputStream inputStream = connect.getInputStream();
            String response = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Log.v(TAG, "response = " + response);
            JSONObject jObj = new JSONObject(response);

            HttpURLConnection reconnect = (HttpURLConnection) new URL(context.getString(R.string.url_login_data)).openConnection();
            reconnect.setRequestMethod("GET");

            authentication = "token " + jObj.getString("token");
            reconnect.setRequestProperty("Authorization", authentication);

            reconnect.connect();
            responseCode = connect.getResponseCode();
            Log.v(TAG, "responseCode = " + responseCode);

            inputStream = reconnect.getInputStream();
            response = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Log.v(TAG, "response = " + response);
            JSONObject object = new JSONObject(response);
            UserSessionData data = new UserSessionData(jObj.getString("id"), credentials, jObj.getString("token"), object.getString("login"));
            return data;
        } catch (Exception e) {
            Log.e(TAG, "Login failed", e);
            return null;
        }
    }

    @Override
    protected void onPostExecute(UserSessionData userSessionData) {
        super.onPostExecute(userSessionData);
        if (userSessionData != null) {
            SharedPreferences prefs = context.getSharedPreferences(Utils.SHARED_PREF_NAME, 0);
            SharedPreferences.Editor e = prefs.edit();
            e.putString("userSessionData", userSessionData.toString()); // save "value" to the SharedPreferences
            e.apply();
            Intent intent = new Intent(context, MainActivity.class);
            context.startActivity(intent);
        } else {
            Toast.makeText(context, context.getString(R.string.login_failed), LENGTH_SHORT).show();
        }
    }
}
```

NB/= This is not a standalone example, and is meant to be incorporated into your own project.

##### 2\. How to make a HTTP GET Request

We've seen how to make a HTTP POST request, in the first part. Let's now continue and create another async task class that will this time perform a HTTP GET request.

Let's now say we want to download a GitHub Readme.

But first we have to establishe a connection for making a HTTP GET request.

We just use the `openConnection()` method of the `URL` class and make sure to our request method as `GET`:

```java
            HttpURLConnection connect = (HttpURLConnection) new URL(uri).openConnection();
            connect.setRequestMethod("GET");
```

Then we get our authentication token from our SharedPreferences and set it as the request property, with the key being `Authorization` while the value being that token:

```java
            String authentication = "token " + currentSessionData.getToken();
            connect.setRequestProperty("Authorization", authentication);
```

Then connect.

```java
public class FetchHTTPConnectionService {
    private static final String TAG = FetchHTTPConnectionService.class.getSimpleName();
    private final String uri;
    private final UserSessionData currentSessionData;

    public FetchHTTPConnectionService(String uri, UserSessionData currentSessionData) {
        this.uri = uri;
        this.currentSessionData = currentSessionData;
    }

    public FetchHTTPConnectionService(String uri, Context context) {
        this.uri = uri;
        SharedPreferences prefs = context.getSharedPreferences(Utils.SHARED_PREF_NAME, 0);
        String sessionDataStr = prefs.getString("userSessionData", null);
        currentSessionData = UserSessionData.createUserSessionDataFromString(sessionDataStr);
    }

    public HTTPConnectionResult establishConnection() {
        try {
            HttpURLConnection connect = (HttpURLConnection) new URL(uri).openConnection();
            connect.setRequestMethod("GET");

            String authentication = "token " + currentSessionData.getToken();
            connect.setRequestProperty("Authorization", authentication);

            connect.connect();
            int responseCode = connect.getResponseCode();

            Log.v(TAG, "responseCode = " + responseCode);
            InputStream inputStream = connect.getInputStream();
            Log.v(TAG, "inputStream " + inputStream);
            String response = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Log.v(TAG, "response = " + response);
            return new HTTPConnectionResult(response, responseCode);

        } catch (Exception e) {
            Log.e(TAG, "Get data failed", e);
            return null;
        }
    }
}
```

The actual download, we said, will have to be performed in a background thread. This allows the UI to remain responsive.

Here's the code:

```java
public class RepoReadmeDownloadAsyncTask extends AsyncTask<String, Void, String> {

    private static final String TAG = RepoReadmeDownloadAsyncTask.class.getSimpleName();
    private final Context context;
    private final OnRepoReadmeContentLoadedListener listener;
    private UserSessionData currentSessionData;

    public RepoReadmeDownloadAsyncTask(Context context, OnRepoReadmeContentLoadedListener listener) {
        this.context = context;
        this.listener = listener;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        SharedPreferences prefs = context.getSharedPreferences(Utils.SHARED_PREF_NAME, 0);
        String sessionDataStr = prefs.getString("userSessionData", null);
        currentSessionData = UserSessionData.createUserSessionDataFromString(sessionDataStr);
    }

    @Override
    protected String doInBackground(String... args) {
        String repo = args[0];
        String login = args[1];
        try {
            HttpURLConnection connect = (HttpURLConnection) new URL(context.getString(R.string.url_repo_readme, login, repo)).openConnection();
            connect.setRequestMethod("GET");

            String authentication = "basic " + currentSessionData.getCredentials();
            connect.setRequestProperty("Authorization", authentication);
            connect.connect();
            int responseCode = connect.getResponseCode();

            Log.v(TAG, "responseCode = " + responseCode);
            if (responseCode != HttpURLConnection.HTTP_OK) {
                return null;
            }
            InputStream inputStream = connect.getInputStream();
            String response = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
            Log.v(TAG, "response = " + response);
            JSONObject jsonObj = new JSONObject(response);
            String downloadUrl = jsonObj.getString("download_url");
            FetchHTTPConnectionService fetchHTTPConnectionService = new FetchHTTPConnectionService(downloadUrl, context);
            HTTPConnectionResult result = fetchHTTPConnectionService.establishConnection();
            Log.v(TAG, "responseCode = " + result.getResponceCode());
            Log.v(TAG, "result = " + result.getResult());
            return result.getResult();
        } catch (IOException | JSONException e) {
            Log.e(TAG, "", e);
        }
        return null;
    }

    @Override
    protected void onPostExecute(String content) {
        super.onPostExecute(content);
        listener.onRepoContentLoaded(content);
    }

    public interface OnRepoReadmeContentLoadedListener {
        void onRepoContentLoaded(String content);
    }
}
```

## Full Example: How to Insert/Save into MySQL Database from Android via HttpURLConnection POST

_Android MySQL Insert tutorial.In this tutorial,we look at Android MySQL database,saving data to MySQL. We insert data from edittexts into mysql._

Alot of mobile applications employ webservice to enrich their functionalities and capabilities.

Even though mobile devices are at their most powerful currently, they are still not comparable to servers. Servers understandably:

- Have more memory.
- Have more processing power.
- Have more hard drives.

This then makes it imperatvie that delegate some jobs or storage services to the servers.

The most popular server side prgramming language is PHP. While the most popular Relational Database Management System(RDBMS) is MySQL. Combine those with Android the most popular mobile OS, then we have three technologies to build powerful mobile apps.

This tutorial is a start. We want to see how to connect to MySQL database from our android application via PHP. We'll save data to the database from our app.

PHP and Java will communicate via JSON data exchange format. We'll make use `HTTPURLConnection` to make webservice calls.

Let's go.

- We use HttpURLConnection class. It will be our HTTP Client
- We save to MySQL via PHP Code. PHP will be our server side language while mysql our database.
- We are making a HTTP POST Request. Basically we are sending data to our server.
- We write through an outputstream,but also read a response from server via inputstream.
- We do these in background [thread](https://camposha.info/java/thread) using asynctask.

We are using Java programming language.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Full Code

In this tutorial we want to see how save or insert data from an edittext to mysql database.

![Android MySQL Insert Save](https://raw.githubusercontent.com/Oclemy/AndroidMDMySQLSave/master/demos/Save%20Multiple%20Columns.PNG)

We are using httpurlconnection as our http client. The user will type data then click send to send the data via HTTP.

Our server side language is PHP while our database is mysql.

##### MySQL table Structure

Here's our mysql table:

![Android PHP MySQL](https://raw.githubusercontent.com/Oclemy/AndroidMDMySQLSave/master/demos/MySQL-table.PNG)

##### 1\. PHP Code

Here's our php code:

```php
<?php
$host='127.0.0.1';
$username='root';
$pwd='';
$db="spacecraftDB";
$con=mysqli_connect($host,$username,$pwd,$db) or die('Unable to connect');
if(mysqli_connect_error($con))
{
    echo "Failed to Connect to Database ".mysqli_connect_error();
}
$name=$_POST['name'];
$propellant=$_POST['propellant'];
$description=$_POST['description'];
$sql="INSERT INTO spacecraftTB(Name,Propellant,Description) VALUES('$name','$propellant','$description')";
$result=mysqli_query($con,$sql);
if($result)
{
    echo ('Successfully Saved........');

}else
{
    echo('Not saved Successfully............');

}
mysqli_close($con);
?>
```

##### 2\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Our Spacecraft Class

This is our data object representing a single spacecraft.

```java
package com.tutorials.hp.androidmdmysqlsave.mDataObject;

public class Spacecraft {

    int id;
    String name;
    String propellant;
    String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

##### (b). Our DataPackager Class

- Basically,we package our data here for sending.
- First we add them to a JSON Object.
- Then we encode them into UTF-8 format using URLEncorder class.
- Then we return it as a string ready to be written over the network.

```java
package com.tutorials.hp.androidmdmysqlsave.mMySQL;

import com.tutorials.hp.androidmdmysqlsave.mDataObject.Spacecraft;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;

public class DataPackager {

    Spacecraft spacecraft;

    public DataPackager(Spacecraft spacecraft) {
        this.spacecraft = spacecraft;
    }

    public String packData()
    {
        JSONObject jo=new JSONObject();
        StringBuffer sb=new StringBuffer();

        try {
            jo.put("Name",spacecraft.getName());
            jo.put("Propellant",spacecraft.getPropellant());
            jo.put("Description",spacecraft.getDescription());

            Boolean firstvalue=true;
            Iterator it=jo.keys();

            do {
                String key=it.next().toString();
                String value=jo.get(key).toString();

                if(firstvalue)
                {
                    firstvalue=false;
                }else
                {
                    sb.append("&");
                }

                sb.append(URLEncoder.encode(key,"UTF-8"));
                sb.append("=");
                sb.append(URLEncoder.encode(value,"UTF-8"));

            }while (it.hasNext());

            return sb.toString();

        } catch (JSONException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

##### (c). Our Connector Class

```java
package com.tutorials.hp.androidmdmysqlsave.mMySQL;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    public static HttpURLConnection connect(String urlAddress)
    {
        try {

            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //SET PROPS
            con.setRequestMethod("POST");
            con.setConnectTimeout(20000);
            con.setReadTimeout(20000);
            con.setDoInput(true);
            con.setDoOutput(true);

            return con;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
```

##### (d). Our Sender Class

- Yes,its our Sender class.To send us our data.
- We send our data in a background thread using AsyncTask,the super class of this sender class.
- While sending data in background,we show our Progressdialog,starting it in onPreExcecute() and dismissing immediately onPostExecute() is called.
- We establish an outputStream,write to it using OutputStreamWriter().
- The OutputStreamWriter() instance,we pass to BufferedWriter() instance.
- The bufferedWriter() instance writes our data.
- We then read the server response using bufferedreader instance.

```java
package com.tutorials.hp.androidmdmysqlsave.mMySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.androidmdmysqlsave.mDataObject.Spacecraft;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

public class Sender extends AsyncTask<Void,Void,String> {

    Context c;
    String urlAddress;
    EditText nameTxt,propellantTxt,descTxt;

    Spacecraft spacecraft;

    ProgressDialog pd;

    public Sender(Context c, String urlAddress, EditText nameTxt, EditText propellantTxt, EditText descTxt) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.nameTxt = nameTxt;
        this.propellantTxt = propellantTxt;
        this.descTxt = descTxt;

        spacecraft=new Spacecraft();
        spacecraft.setName(nameTxt.getText().toString());
        spacecraft.setPropellant(propellantTxt.getText().toString());
        spacecraft.setDescription(descTxt.getText().toString());
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Send");
        pd.setMessage("Sending...Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return this.send();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        pd.dismiss();

        if(s==null)
        {
            Toast.makeText(c,"Unsuccessful,Null returned",Toast.LENGTH_SHORT).show();
        }else
        {
            if(s=="Bad Response")
            {
                Toast.makeText(c,"Unsuccessful,Bad Response returned",Toast.LENGTH_SHORT).show();

            }else
            {
                Toast.makeText(c,"Successfully Saved",Toast.LENGTH_SHORT).show();

                //CLEAR UI
                nameTxt.setText("");
                propellantTxt.setText("");
                descTxt.setText("");
            }
        }

    }

    private String send()
    {
        HttpURLConnection con=Connector.connect(urlAddress);
        if(con==null)
        {
            return null;
        }

        try {

            OutputStream os=con.getOutputStream();

            //WRITE
            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(os,"UTF-8"));
            bw.write(new DataPackager(spacecraft).packData());

            bw.flush();
            //RELEASE
            bw.close();
            os.close();

            //SUCCESS OR NOT??
            int responseCode=con.getResponseCode();
            if(responseCode==con.HTTP_OK)
            {
                BufferedReader br=new BufferedReader(new InputStreamReader(con.getInputStream()));
                StringBuffer response=new StringBuffer();

                String line;
                while ((line=br.readLine()) != null)
                {
                    response.append(line);
                }

                br.close();
                return response.toString();
            }else {
                return "Bad Response";
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
```

##### (d). Our MainActivity

- Launcher activity.
- Initialize UI like EditTexts.
- Starts the sender Asynctask on button click,passing on urladdress and edittext.

```java
package com.tutorials.hp.androidmdmysqlsave;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;

import com.tutorials.hp.androidmdmysqlsave.mMySQL.Sender;

public class MainActivity extends AppCompatActivity {

    String urlAddress="http://10.0.2.2/android/spacecraft.php";
    EditText nameTxt,propellantTxt,descTxt;
    Button saveBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        nameTxt= (EditText) findViewById(R.id.nameEditTxt);
        propellantTxt= (EditText) findViewById(R.id.propellantEditTxt);
        descTxt= (EditText) findViewById(R.id.descEditTxt);
        saveBtn= (Button) findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Sender s=new Sender(MainActivity.this,urlAddress,nameTxt,propellantTxt,descTxt);
                s.execute();
            }
        });

    }

}
```

#### 3\. Our Layouts

##### (a). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.androidmdmysqlsave.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

##### content_main.xml

- Our layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.androidmdmysqlsave.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_layout_width="fill_parent"
        android_layout_height="match_parent"
        android_layout_marginTop="?attr/actionBarSize"
        android_orientation="vertical"
        android_paddingLeft="15dp"
        android_paddingRight="15dp"
        android_paddingTop="50dp">

        <android.support.design.widget.TextInputLayout
            android_id="@+id/nameLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Name" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/propellantLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/propellantEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"

                android_hint="Propellant" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/descLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/descEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"

                android_hint="Description" />

        </android.support.design.widget.TextInputLayout>

        <Button android_id="@+id/saveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Save"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>

    </LinearLayout>
</RelativeLayout>
```

#### 4\. AndroidManifest.xml

Remember to add permission for internet in your manifest file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqlinsert">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="@string/app_name"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### 5\. Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/AndroidMDMySQLSave/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/AndroidMDMySQLSave) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=VwfWoK-SNp0) |

## Kotlin Android JSON with HttpURLConnection – Easiest Examples

Kotlin is a statically typed programming language that runs on the Java virtual machine and also can be compiled to JavaScript source code or use the LLVM compiler infrastructure.

Kotlin can do anything Java can including creating android apps. And in fact in this class we create an android app that downloads JSON data when a button is clicked, parses that data and renders the result in a custom gridview.

Watch our video tutorial here:

<iframe width="788" height="443" src="https://www.youtube.com/embed/j2ZMerGmZJs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## **What is AsyncTask?**

AsyncTask enables proper and easy use of the UI thread. This class allows to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers.

We use AsyncTask in this class instead of raw threads. We will be downloading data in the background thread. Also we parse data in the background thread. AsyncTask will allow us do these while reporting progress using Progress Dialog.

## **What is HttpURLConnection?**

HttpURLConnection is a URLConnection with support for HTTP-specific features. Through this class we will open a connection to a URL pointing us to JSON data and download that data.

We are basically making a HTTP GET request.

## **What is a GridView?**

A gridview is a view that shows items in two-dimensional scrolling grid. The items in the grid come from the ListAdapter associated with this view.

In this class we want to see how to make a HTTP GET request in Kotlin Android using the standard HttpURLConnection class, download some JSON data, parse that data and bind to a custom gridview.

We use AsyncTask for threading, JSONObject and JSONArray for threading.

Here's the JSON sample we are using: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).

Let's go.

## Project Structure

Here's our project structure:

![](https://camposha.info/wp-content/uploads/2019/04/demo1-14.png)

## AndroidManifest.xml

Let's add our internet connectivity permission in our androidmanifest. This is needed because we will be connecting to internet to download JSON data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.camposha.kotlin_json">

    <uses-permission android:name="android.permission.INTERNET"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

## row_model.xml

This is our row or grid model so to speak. This layout will get inflated into a single grid item in our GridView.

We are working with a custom gridview so that's why create a custom layout. This layout will contain an ImageView and several textviews.

The ImageView will display a static image while the TextViews will be populated with data parsed from json.

Take note that at the root of our XML we have a CardView with custom cardCornerRadius and cardElevation.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_margin="5dp"
    card_view:cardCornerRadius="5dp"
    card_view:cardElevation="10dp"
    android:layout_height="300dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="match_parent"
            android:layout_height="150dp"
            android:padding="10dp"
            card_view:srcCompat="@android:color/holo_red_light" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text="Name"
                android:id="@+id/nameTxt"
                android:padding="5dp"
                android:textColor="@color/colorAccent"
                android:layout_below="@+id/imageView"
                android:layout_alignParentLeft="true"
                />
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text=" Email --------------------"
                android:id="@+id/emailTxt"
                android:padding="5dp"
                android:layout_below="@+id/nameTxt"
                android:layout_alignParentLeft="true"
                />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text="Username"
                android:id="@+id/usernameTxt"
                android:padding="2dp"
                android:textStyle="italic"
                android:layout_below="@+id/imageView"
                android:layout_alignParentRight="true" />

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

## activity_main.xml

This is our main activity layout. It will be inflated into our MainActivity layout.

We will have a LinearLayout at the root with a vertical orientation. This means that it will arrange its children vertically.

We also have a header TextView to display the header of our app, a GridView to render our data parsed from JSON and a button that when clicked initiates the download of the json data from the internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="info.camposha.kotlin_json.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Verified Users"
        android:textAlignment="center"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@color/colorAccent" />

    <GridView
        android:id="@+id/myGridView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_weight="0.5"
        android:numColumns="auto_fit" />

    <Button
        android:id="@+id/downloadBtn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorAccent"
        android:text="Download" />

</LinearLayout>
```

## **JSONDownloader.kt**

This is our class responsible for downloading JSON data in the background thread via AsyncTask. We make our HTTP GET request using HttpURLConnection.

We are showing a progress dialog as our data downloads.

### Derive From AsyncTask

So as to use AsyncTask which we said abstracts for us away thread details, we have to make our class extend the `AsyncTask` class which resides in the `android.os` package. We do this because AsyncTask is an abstract class and requires us to override he `doInBackground()` method:

```kotlin
class JSONDownloader() : AsyncTask<Void, Void, String>() {..}
```

But we will be passing some variables via the constructor, here's how we do that in Kotlin:

```kotlin
class JSONDownloader(private var c: Context, private var jsonURL: String, private var myGridView: GridView)..
```

As you can see we are passing a Context object, a url leading us to our JSON download url and a GridView wehere we will bind our data.

### Show ProgressDialog

We will be showing the progressDialog as our data downloads, however be aware that the `ProgressDialog` class is deprecated so you may use a progressbar if you like. However, we can still use ProgressBar currently and suppress the deprecation notices.

```kotlin
    override fun onPreExecute() {
        super.onPreExecute()

        pd = ProgressDialog(c)
        pd.setTitle("Download JSON")
        pd.setMessage("Downloading...Please wait")
        pd.show()
    }
```

### Connect to Network via HttpURLConnection

Instead of using third part libraries, we will use the standard HttpURLConnection class to connect to our network.

First we instantiate the `java.net.URL` class passing in our url string. We then open the a connection to that url using the `openConnection()` method of `URL` class and cast the returned `URLConnection` object to a HttpURLConnection.

We will be making a `HTTP GET` request. WE also set the `connectTimeout`, `readTimeout` and `doInput` properties. The we return the HttpURLConnection object.

```kotlin
    private fun connect(jsonURL: String): Any {
        try {
            val url = URL(jsonURL)
            val con = url.openConnection() as HttpURLConnection

            //CON PROPS
            con.requestMethod = "GET"
            con.connectTimeout = 15000
            con.readTimeout = 15000
            con.doInput = true

            return con

        } catch (e: MalformedURLException) {
            e.printStackTrace()
            return "URL ERROR " + e.message

        } catch (e: IOException) {
            e.printStackTrace()
            return "CONNECT ERROR " + e.message
        }
    }
```

### Download JSON Data

We will now download the data given that we've established the connection. We first obtain an `InputStream` from our HttpURLConnection object and pass it to our `BufferedInputStream` constructor.

We then pass the `BufferedInputStream` object to an `InputStreamReader` object, which in turn we pass to our `BufferedReader`.

We instantiate a StringBuffer(or you can use a StringBuilder) onto which we will append our data.

```kotlin
private fun downlaod(): String {
        val connection = connect(jsonURL)
        if (connection.toString().startsWith("Error")) {
            return connection.toString()
        }
        //DOWNLOAD
        try {
            val con = connection as HttpURLConnection
            //if response is HTTP OK
            if (con.responseCode == 200) {
                //GET INPUT FROM STREAM
                val `is` = BufferedInputStream(con.inputStream)
                val br = BufferedReader(InputStreamReader(`is`))

                val jsonData = StringBuffer()
                var line: String?

                do {
                    line = br.readLine()

                    if (line == null){ break}

                    jsonData.append(line + "n");

                } while (true)

                //CLOSE RESOURCES
                br.close()
                `is`.close()

                //RETURN JSON
                return jsonData.toString()

            } else {
                return "Error " + con.responseMessage
            }
        } catch (e: IOException) {
            e.printStackTrace()
            return "Error " + e.message
        }
    }
```

Here's the full source code for this `JSONDownloader` Kotlin class.

```kotlin
package info.camposha.kotlin_json

import android.app.ProgressDialog
import android.content.Context
import android.os.AsyncTask
import android.widget.GridView
import android.widget.Toast
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.URL

@Suppress("DEPRECATION")
class JSONDownloader(private var c: Context, private var jsonURL: String, private var myGridView: GridView) : AsyncTask<Void, Void, String>() {

    private lateinit var pd: ProgressDialog
    /*
    show dialog while downloading data
     */
    override fun onPreExecute() {
        super.onPreExecute()

        pd = ProgressDialog(c)
        pd.setTitle("Download JSON")
        pd.setMessage("Downloading...Please wait")
        pd.show()
    }
    /*
    Perform Background downloading of data
     */
    override fun doInBackground(vararg voids: Void): String {
        return downlaod()
    }
    /*
    When BackgroundWork Finishes, dismiss dialog and pass data to JSONParser
     */
    override fun onPostExecute(jsonData: String) {
        super.onPostExecute(jsonData)

        pd.dismiss()
        if (jsonData.startsWith("URL ERROR")) {
            val error = jsonData
            Toast.makeText(c, error, Toast.LENGTH_LONG).show()
            Toast.makeText(c, "MOST PROBABLY APP CANNOT CONNECT DUE TO WRONG URL SINCE MALFORMEDURLEXCEPTION WAS RAISED", Toast.LENGTH_LONG).show()

        }else  if (jsonData.startsWith("CONNECT ERROR")) {
            val error = jsonData
            Toast.makeText(c, error, Toast.LENGTH_LONG).show()
            Toast.makeText(c, "MOST PROBABLY APP CANNOT CONNECT TO ANY NETWORK SINCE IOEXCEPTION WAS RAISED", Toast.LENGTH_LONG).show()
        }
        else {
            //PARSE
            Toast.makeText(c, "Network Connection and Download Successful. Now attempting to parse .....", Toast.LENGTH_LONG).show()
            JSONParser(c, jsonData, myGridView).execute()
        }
    }
    /*
    Connect to network via HTTPURLConnection
     */
    private fun connect(jsonURL: String): Any {
        try {
            val url = URL(jsonURL)
            val con = url.openConnection() as HttpURLConnection

            //CON PROPS
            con.requestMethod = "GET"
            con.connectTimeout = 15000
            con.readTimeout = 15000
            con.doInput = true

            return con

        } catch (e: MalformedURLException) {
            e.printStackTrace()
            return "URL ERROR " + e.message

        } catch (e: IOException) {
            e.printStackTrace()
            return "CONNECT ERROR " + e.message
        }
    }
    /*
    Download JSON data
     */
    private fun downlaod(): String {
        val connection = connect(jsonURL)
        if (connection.toString().startsWith("Error")) {
            return connection.toString()
        }
        //DOWNLOAD
        try {
            val con = connection as HttpURLConnection
            //if response is HTTP OK
            if (con.responseCode == 200) {
                //GET INPUT FROM STREAM
                val `is` = BufferedInputStream(con.inputStream)
                val br = BufferedReader(InputStreamReader(`is`))

                val jsonData = StringBuffer()
                var line: String?

                do {
                    line = br.readLine()

                    if (line == null){ break}

                    jsonData.append(line + "n");

                } while (true)

                //CLOSE RESOURCES
                br.close()
                `is`.close()

                //RETURN JSON
                return jsonData.toString()

            } else {
                return "Error " + con.responseMessage
            }
        } catch (e: IOException) {
            e.printStackTrace()
            return "Error " + e.message
        }
    }
}
```

## JSONParser.kt

This class is responsible for parsing the downloaded JSON data and rendering it into a GridView. We do this in a background thread using AsyncTask.

We show a progress dialog as our data is parsed. We use the native JSONObject and JSONArray classes to parse the data.

We also define ouf data object, which is `User` as an inner class here. The `User` class will define a single user.

Furthermore we define pur `CustomAdapter` class right here. The `CustomAdapter` will inflate our custom `row_model.xml` into a `View` object and bind our data to the custom views.

```kotlin
package info.camposha.kotlin_json

import android.app.ProgressDialog
import android.content.Context
import android.os.AsyncTask
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.GridView
import android.widget.TextView
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

import java.util.ArrayList

@Suppress("DEPRECATION")

class JSONParser(private var c: Context, private var jsonData: String, private var myGridView: GridView) : AsyncTask<Void, Void, Boolean>() {

    private lateinit var pd: ProgressDialog
    private var users = ArrayList<User>()

    override fun onPreExecute() {
        super.onPreExecute()

        pd = ProgressDialog(c)
        pd.setTitle("Parse JSON")
        pd.setMessage("Parsing...Please wait")
        pd.show()
    }

    override fun doInBackground(vararg voids: Void): Boolean? {
        return parse()
    }

    override fun onPostExecute(isParsed: Boolean?) {
        super.onPostExecute(isParsed)

        pd.dismiss()
        if (isParsed!!) {
            //BIND
            myGridView.adapter = MrAdapter(c, users)
        } else {
            Toast.makeText(c, "Unable To Parse that data. ARE YOU SURE IT IS VALID JSON DATA? JsonException was raised. Check Log Output.", Toast.LENGTH_LONG).show()
            Toast.makeText(c, "THIS IS THE DATA WE WERE TRYING TO PARSE :  "+ jsonData, Toast.LENGTH_LONG).show()
        }
    }

    /*
    Parse JSON data
     */
    private fun parse(): Boolean {
        try {
            val ja = JSONArray(jsonData)
            var jo: JSONObject

            users.clear()
            var user: User

            for (i in 0 until ja.length()) {
                jo = ja.getJSONObject(i)

                val name = jo.getString("name")
                val username = jo.getString("username")
                val email = jo.getString("email")

                user = User(username,name,email)
                users.add(user)
            }

            return true
        } catch (e: JSONException) {
            e.printStackTrace()
            return false
        }
    }
    class User(private var m_username:String, private var m_name: String, private var m_email: String) {

        fun getUsername(): String {
            return m_username
        }

        fun getName(): String {
            return m_name
        }

        fun getEmail(): String {
            return m_email
        }
    }
    class MrAdapter(private var c: Context, private var users: ArrayList<User>) : BaseAdapter() {

        override fun getCount(): Int {
            return users.size
        }

        override fun getItem(pos: Int): Any {
            return users[pos]
        }

        override fun getItemId(pos: Int): Long {
            return pos.toLong()
        }

        /*
        Inflate row_model.xml and return it
         */
        override fun getView(i: Int, view: View?, viewGroup: ViewGroup): View {
            var convertView = view
            if (convertView == null) {
                convertView = LayoutInflater.from(c).inflate(R.layout.row_model, viewGroup, false)
            }

            val nameTxt = convertView!!.findViewById<TextView>(R.id.nameTxt) as TextView
            val usernameTxt = convertView.findViewById<TextView>(R.id.usernameTxt) as TextView
            val emailTxt = convertView.findViewById<TextView>(R.id.emailTxt) as TextView

            val user = this.getItem(i) as User

            nameTxt.text = user.getName()
            emailTxt.text = user.getEmail()
            usernameTxt.text = user.getUsername()

            convertView.setOnClickListener { Toast.makeText(c,user.getName(),Toast.LENGTH_SHORT).show() }

            return convertView
        }
    }
}
```

## MainActivity.kt

Our MainActivity Kotlin class. Derives from `AppCompatActivity`.

We define the URL to our JSON data right here. Furthermmore when the `download` button is clicked, we instantiate our `JSONDownloader` class and execute it to start downloading our data.

```kotlin
package info.camposha.kotlin_json

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Button
import android.widget.GridView

class MainActivity : AppCompatActivity() {

    private var jsonURL = "http://jsonplaceholder.typicode.com/users"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gv = findViewById<GridView>(R.id.myGridView)

        val downloadBtn = findViewById<Button>(R.id.downloadBtn)
        downloadBtn.setOnClickListener({ JSONDownloader(this@MainActivity, jsonURL, gv).execute() })
    }

}
```

### Result

![Kotlin Android GridView HttpURLConnection](https://camposha.info/wp-content/uploads/2019/04/demo2-7.png)

Kotlin Android GridView HttpURLConnection

![Kotlin Android GridView HttpURLConnection](https://camposha.info/wp-content/uploads/2019/04/demo3-5.png)

Kotlin Android GridView HttpURLConnection

Best regards.

## Example 2 : Kotlin Android - JSON ListView - HTTP GET using HttURLConnection

In this class we want to see how to perform a HTTP GET request and fetch data from online and bind to our custom listview. We are using the standard HttpURLConnection class to perform this request.

We also use an AsyncTask to do these in the background thread. We show a progress dialog as our data downloads.

When the download of json data is complete, we parse that data asynchronously using the JSONObject and JSONArray classes. This parsing also takes place in the background thread via AsyncTask.

Let's start.

## Sample JSON

We will be using sample JSON from this [website](https://jsonplaceholder.typicode.com/).

Here's the JSON data [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users).

## Project Structure

![](https://camposha.info/wp-content/uploads/2019/04/demo1-15.png)

## Build.gradle

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:26.1.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.0'
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:cardview-v7:26.+'
    implementation 'com.android.support:design:26.+'
}
```

## AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.camposha.kotlinlistviewjson">

    <uses-permission android:name="android.permission.INTERNET" />

    ....

</manifest>
```

## activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="info.camposha.kotlinlistviewjson.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Verified Users"
        android:textAlignment="center"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@color/colorAccent" />

    <ListView
        android:id="@+id/myListView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_weight="0.5" />

    <Button
        android:id="@+id/downloadBtn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorAccent"
        android:text="Download" />

</LinearLayout>
```

## row_model.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_margin="5dp"
    card_view:cardCornerRadius="5dp"
    card_view:cardElevation="10dp"
    android:layout_height="300dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="match_parent"
            android:layout_height="150dp"
            android:padding="10dp"
            card_view:srcCompat="@android:color/holo_red_light" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text="Name"
                android:id="@+id/nameTxt"
                android:padding="5dp"
                android:textColor="@color/colorAccent"
                android:layout_below="@+id/imageView"
                android:layout_alignParentLeft="true"
                />
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text=" Email --------------------"
                android:id="@+id/emailTxt"
                android:padding="5dp"
                android:layout_below="@+id/nameTxt"
                android:layout_alignParentLeft="true"
                />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textAppearance="?android:attr/textAppearanceSmall"
                android:text="Username"
                android:id="@+id/usernameTxt"
                android:padding="2dp"
                android:textStyle="italic"
                android:layout_below="@+id/imageView"
                android:layout_alignParentRight="true" />

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

## JSONDownloader.kt

```kotlin
package info.camposha.kotlinlistviewjson

import android.app.ProgressDialog
import android.content.Context
import android.os.AsyncTask
import android.widget.ListView
import android.widget.Toast
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.MalformedURLException
import java.net.URL

@Suppress("DEPRECATION")
class JSONDownloader(private var c: Context, private var jsonURL: String, private var myListView: ListView) : AsyncTask<Void, Void, String>() {

    private lateinit var pd: ProgressDialog

    /*
   Connect to network via HTTPURLConnection
    */
    private fun connect(jsonURL: String): Any {
        try {
            val url = URL(jsonURL)
            val con = url.openConnection() as HttpURLConnection

            //CON PROPS
            con.requestMethod = "GET"
            con.connectTimeout = 15000
            con.readTimeout = 15000
            con.doInput = true

            return con

        } catch (e: MalformedURLException) {
            e.printStackTrace()
            return "URL ERROR " + e.message

        } catch (e: IOException) {
            e.printStackTrace()
            return "CONNECT ERROR " + e.message
        }
    }
    /*
    Download JSON data
     */
    private fun downlaod(): String {
        val connection = connect(jsonURL)
        if (connection.toString().startsWith("Error")) {
            return connection.toString()
        }
        //DOWNLOAD
        try {
            val con = connection as HttpURLConnection
            //if response is HTTP OK
            if (con.responseCode == 200) {
                //GET INPUT FROM STREAM
                val `is` = BufferedInputStream(con.inputStream)
                val br = BufferedReader(InputStreamReader(`is`))

                val jsonData = StringBuffer()
                var line: String?

                do {
                    line = br.readLine()

                    if (line == null){ break}

                    jsonData.append(line + "n");

                } while (true)

                //CLOSE RESOURCES
                br.close()
                `is`.close()

                //RETURN JSON
                return jsonData.toString()

            } else {
                return "Error " + con.responseMessage
            }
        } catch (e: IOException) {
            e.printStackTrace()
            return "Error " + e.message
        }
    }
    /*
    show dialog while downloading data
     */
    override fun onPreExecute() {
        super.onPreExecute()

        pd = ProgressDialog(c)
        pd.setTitle("Download JSON")
        pd.setMessage("Downloading...Please wait")
        pd.show()
    }
    /*
    Perform Background downloading of data
     */
    override fun doInBackground(vararg voids: Void): String {
        return downlaod()
    }
    /*
    When BackgroundWork Finishes, dismiss dialog and pass data to JSONParser
     */
    override fun onPostExecute(jsonData: String) {
        super.onPostExecute(jsonData)

        pd.dismiss()
        if (jsonData.startsWith("URL ERROR")) {
            val error = jsonData
            Toast.makeText(c, error, Toast.LENGTH_LONG).show()
            Toast.makeText(c, "MOST PROBABLY APP CANNOT CONNECT DUE TO WRONG URL SINCE MALFORMEDURLEXCEPTION WAS RAISED", Toast.LENGTH_LONG).show()

        }else  if (jsonData.startsWith("CONNECT ERROR")) {
            val error = jsonData
            Toast.makeText(c, error, Toast.LENGTH_LONG).show()
            Toast.makeText(c, "MOST PROBABLY APP CANNOT CONNECT TO ANY NETWORK SINCE IOEXCEPTION WAS RAISED", Toast.LENGTH_LONG).show()
        }
        else {
            //PARSE
            Toast.makeText(c, "Network Connection and Download Successful. Now attempting to parse .....", Toast.LENGTH_LONG).show()
            JSONParser(c, jsonData, myListView).execute()
        }
    }

}
```

## JSONParser.kt

```kotlin
package info.camposha.kotlinlistviewjson

import android.app.ProgressDialog
import android.content.Context
import android.os.AsyncTask
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

import java.util.ArrayList

@Suppress("DEPRECATION")

class JSONParser(private var c: Context, private var jsonData: String, private var myListView: ListView) : AsyncTask<Void, Void, Boolean>() {

    private lateinit var pd: ProgressDialog
    private var users = ArrayList<User>()

    class User(private var m_username:String, private var m_name: String, private var m_email: String) {

        fun getUsername(): String {
            return m_username
        }

        fun getName(): String {
            return m_name
        }

        fun getEmail(): String {
            return m_email
        }
    }
    class MrAdapter(private var c: Context, private var users: ArrayList<User>) : BaseAdapter() {

        override fun getCount(): Int {
            return users.size
        }

        override fun getItem(pos: Int): Any {
            return users[pos]
        }

        override fun getItemId(pos: Int): Long {
            return pos.toLong()
        }

        /*
        Inflate row_model.xml and return it
         */
        override fun getView(i: Int, view: View?, viewGroup: ViewGroup): View {
            var convertView = view
            if (convertView == null) {
                convertView = LayoutInflater.from(c).inflate(R.layout.row_model, viewGroup, false)
            }

            val nameTxt = convertView!!.findViewById<TextView>(R.id.nameTxt) as TextView
            val usernameTxt = convertView.findViewById<TextView>(R.id.usernameTxt) as TextView
            val emailTxt = convertView.findViewById<TextView>(R.id.emailTxt) as TextView

            val user = this.getItem(i) as User

            nameTxt.text = user.getName()
            emailTxt.text = user.getEmail()
            usernameTxt.text = user.getUsername()

            convertView.setOnClickListener { Toast.makeText(c,user.getName(),Toast.LENGTH_SHORT).show() }

            return convertView
        }
    }

    /*
    Parse JSON data
     */
    private fun parse(): Boolean {
        try {
            val ja = JSONArray(jsonData)
            var jo: JSONObject

            users.clear()
            var user: User

            for (i in 0 until ja.length()) {
                jo = ja.getJSONObject(i)

                val name = jo.getString("name")
                val username = jo.getString("username")
                val email = jo.getString("email")

                user = User(username,name,email)
                users.add(user)
            }

            return true
        } catch (e: JSONException) {
            e.printStackTrace()
            return false
        }
    }
    override fun onPreExecute() {
        super.onPreExecute()

        pd = ProgressDialog(c)
        pd.setTitle("Parse JSON")
        pd.setMessage("Parsing...Please wait")
        pd.show()
    }

    override fun doInBackground(vararg voids: Void): Boolean? {
        return parse()
    }

    override fun onPostExecute(isParsed: Boolean?) {
        super.onPostExecute(isParsed)

        pd.dismiss()
        if (isParsed!!) {
            //BIND
            myListView.adapter = MrAdapter(c, users)
        } else {
            Toast.makeText(c, "Unable To Parse that data. ARE YOU SURE IT IS VALID JSON DATA? JsonException was raised. Check Log Output.", Toast.LENGTH_LONG).show()
            Toast.makeText(c, "THIS IS THE DATA WE WERE TRYING TO PARSE :  "+ jsonData, Toast.LENGTH_LONG).show()
        }
    }

}
```

## MainActivity.kt

```kotlin
package info.camposha.kotlinlistviewjson

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ListView

class MainActivity : AppCompatActivity() {

    private var jsonURL = "http://jsonplaceholder.typicode.com/users"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val myListView = findViewById<ListView>(R.id.myListView)

        val downloadBtn = findViewById<Button>(R.id.downloadBtn)
        downloadBtn.setOnClickListener({ JSONDownloader(this@MainActivity, jsonURL, myListView).execute() })
    }

}
```
