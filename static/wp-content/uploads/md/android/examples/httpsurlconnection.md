# Android HttpsURLConnection

In this tutorial you will learn how to fetch data from a network over a secure HTTPS connection via `HttpsURLConnection`.


### Step 1: Dependencies

No external dependency is needed.

### Step 2: Add Permissions

Add the following two permissions in your `AndroidManifest.xml`:

```xml
    <!-- Add Internet capabilities to our application -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Step 3: Design Layout

Design your `Activity` layout as follows:

**activity_network.xml**

Place a `TextView` and a `ProgressBar` inside a `FrameLayout`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
             xmlns:tools="http://schemas.android.com/tools"
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             tools:context="fr.esilv.networkexample.NetworkActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Hello World!"/>

    <ProgressBar
        android:id="@+id/progressBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:visibility="gone"/>
</FrameLayout>

```

### Step 4: Write Code

Create a `NetworkActivity.java` and add the following code:

**NetworkActivity.java**

```java
package fr.esilv.networkexample;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class NetworkActivity extends AppCompatActivity {
	
	private TextView textView;
	private ProgressBar progressBar;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_network);
		
		textView = findViewById(R.id.textView);
		progressBar = findViewById(R.id.progressBar);
		
		new DownloadTask().execute("https://www.esilv.fr");
	}
	
	public NetworkInfo getActiveNetworkInfo() {
		ConnectivityManager connectivityManager =
				(ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
		return networkInfo;
	}
	
	/**
	 * Converts the contents of an InputStream to a String.
	 */
	public String readStream(InputStream stream, int maxReadSize)
			throws IOException {
		Reader reader;
		reader = new InputStreamReader(stream, "UTF-8");
		char[] rawBuffer = new char[maxReadSize];
		int readSize;
		StringBuffer buffer = new StringBuffer();
		while (((readSize = reader.read(rawBuffer)) != -1) && maxReadSize > 0) {
			if (readSize > maxReadSize) {
				readSize = maxReadSize;
			}
			buffer.append(rawBuffer, 0, readSize);
			maxReadSize -= readSize;
		}
		return buffer.toString();
	}
	
	/**
	 * Given a URL, sets up a connection and gets the HTTP response body from the server.
	 * If the network request is successful, it returns the response body in String form. Otherwise,
	 * it will throw an IOException.
	 */
	private String downloadUrl(URL url) throws IOException {
		InputStream stream = null;
		HttpsURLConnection connection = null;
		String result = null;
		try {
			connection = (HttpsURLConnection) url.openConnection();
			// Timeout for reading InputStream arbitrarily set to 3000ms.
			connection.setReadTimeout(3000);
			// Timeout for connection.connect() arbitrarily set to 3000ms.
			connection.setConnectTimeout(3000);
			// For this use case, set HTTP method to GET.
			connection.setRequestMethod("GET");
			// Already true by default but setting just in case; needs to be true since this request
			// is carrying an input (response) body.
			connection.setDoInput(true);
			// Open communications link (network traffic occurs here).
			connection.connect();
			int responseCode = connection.getResponseCode();
			if (responseCode != HttpsURLConnection.HTTP_OK) {
				throw new IOException("HTTP error code: " + responseCode);
			}
			// Retrieve the response body as an InputStream.
			stream = connection.getInputStream();
			if (stream != null) {
				// Converts Stream to String with max length of 500.
				result = readStream(stream, 2000);
			}
		} finally {
			// Close Stream and disconnect HTTPS connection.
			if (stream != null) {
				stream.close();
			}
			if (connection != null) {
				connection.disconnect();
			}
		}
		return result;
	}
	
	/**
	 * Implementation of AsyncTask designed to fetch data from the network.
	 */
	private class DownloadTask extends AsyncTask<String, Integer, String> {
		
		/**
		 * Cancel background network operation if we do not have network connectivity.
		 */
		@Override
		protected void onPreExecute() {
			NetworkInfo networkInfo = getActiveNetworkInfo();
			if (networkInfo == null || !networkInfo.isConnected() ||
					(networkInfo.getType() != ConnectivityManager.TYPE_WIFI
							&& networkInfo.getType() != ConnectivityManager.TYPE_MOBILE)) {
				// If no connectivity, cancel task and update Callback with null data.
				textView.setText("no network");
				cancel(true);
			} else {
				progressBar.setVisibility(View.VISIBLE);
			}
		}
		
		/**
		 * Defines work to perform on the background thread.
		 */
		@Override
		protected String doInBackground(String... urls) {
			String result = null;
			if (!isCancelled() && urls != null && urls.length > 0) {
				String urlString = urls[0];
				try {
					URL url = new URL(urlString);
					result = downloadUrl(url);
					
				} catch (Exception e) {
				}
			}
			return result;
		}
		
		/**
		 * Updates the DownloadCallback with the result.
		 */
		@Override
		protected void onPostExecute(String result) {
			progressBar.setVisibility(View.INVISIBLE);
			if (result != null) {
				textView.setText(result);
			}
		}
	}
	
}

```

### Reference

- Download full code [here](https://github.com/nguyen-baylatry-esilv/NetworkExample/archive/refs/heads/master.zip).
- Follow code author [here](https://github.com/nguyen-baylatry-esilv/).
