# WebSocket Examples



> WebSocket is a protocol that makes it possible to open a two-way interactive communication session between the client and the server. It provides a full-duplex communication channels over a single TCP connection.

This protocol defines an API that establishes a "socket" connection between a web browser and a server. Rather than long polling to get updates for example from a livescore app, you can use websockets to create a persistent connection between the client and the server. Thus the app auto-updates itself whenever newer updates are available.


This avoids the overhead of sending an additional HTTP request to check if there are newer updates.

Thus the client and server only need to complete a handshake, and a persistent connection can be created directly between the two, and two-way data transfer carried out.

![Websocket](https://camo.githubusercontent.com/a985b5f6ece41fbd5ebcf5e126ac275cc0aab8f1d92c09696421f4c40e685f8a/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f32303139303130373130353635383936322e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a6d46755a33706f5a57356e6147567064476b2c736861646f775f31302c746578745f6148523063484d364c7939696247396e4c6d4e7a5a473475626d56304c325a7662576c755833706f64513d3d2c73697a655f31362c636f6c6f725f4646464646462c745f3730)

Websocket uses the same TCP port as HTTP, which can bypass most firewall restrictions. By default, the Websocket protocol uses port 80; when running on top of TLS, port 443 is used by default. Its protocol identifier is ws. If wss is used for encryption, the server web address is URL, such as:

```shell
ws://www.example.com/
wss://www.example.com/
```

### Advantages of Websocket

- Less control overhead: After the connection is created, when data is exchanged between the server and the client, the data packet header used for protocol control is relatively small
- Stronger real-time performance: Since the protocol is full-duplex, the server can actively send data to the client at any time
- Keep the connection state: Unlike HTTP, Websocket needs to create a connection first, which makes it a stateful protocol, and then part of the state information can be omitted when communicating. The HTTP request may need to carry status information in each request (such as identity authentication, etc.)
- Better binary support: Websocket defines binary frames, which can handle binary content more easily than HTTP
- Better compression effect: Compared with HTTP compression, Websocket can use the context of the previous content with proper extension support, and can significantly improve the compression rate when transferring similar data.

## Example 1: Android WebSockets Example

In this tutorial you will learn how to use websockets using OkHTTP. The url(ws://echo.websocket.org) is used to setup websockets.

### Step 1: Install Okhttp

In your app-level build.gradle add the following implementation statement:

```groovy
implementation 'com.squareup.okhttp3:okhttp:3.6.0'
```

### Step 2: Add Internet Permission

In your android manifest, add the internet permission as follows:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3: Design Layout

Create a layout with a textview and a button. The textview will show the result from the server. The button on the other hand will initiate the connection:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <Button
        android:id="@+id/buttonSend"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="SEND"
        android:layout_marginTop="60dp"
        android:textSize="20sp"/>
    <TextView
        android:id="@+id/textResult"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/buttonSend"
        android:layout_centerHorizontal="true"
        android:textSize="18sp"
        android:layout_marginTop="40dp"/>
</RelativeLayout>
```

### Step 4: Write Code

Start by creating a helper method to print the result from the server on a textview. This is done on the UI thread:

```java
    private void print(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                textResult.setText(textResult.getText().toString() + "\n" + message);
            }
        });
    }
```

Create an EchoWebListener as an inner class. This class will extend the WebSocketListener:

```java
    private final class EchoWebSocketListener extends WebSocketListener {
        private static final int CLOSE_STATUS = 1000;
        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            webSocket.send("What's up ?");
            webSocket.send(ByteString.decodeHex("abcd"));
            webSocket.close(CLOSE_STATUS, "Socket Closed !!");
        }
        @Override
        public void onMessage(WebSocket webSocket, String message) {
            print("Receive Message: " + message);
        }
        @Override
        public void onMessage(WebSocket webSocket, ByteString bytes) {
            print("Receive Bytes : " + bytes.hex());
        }
        @Override
        public void onClosing(WebSocket webSocket, int code, String reason) {
            webSocket.close(CLOSE_STATUS, null);
            print("Closing Socket : " + code + " / " + reason);
        }
        @Override
        public void onFailure(WebSocket webSocket, Throwable throwable, Response response) {
            print("Error : " + throwable.getMessage());
        }
    }
```

The following method will initiate the websocket connection. OkHTTP Request class is instantiated and the url is passed to the `url()` method. Then instantiate an EchoWebSocketListener and pass both the Request object and the EchoWebListener instance to the `newWebSocket()` method.

Here is the full method:

```java
    private void start() {
        Request request = new Request.Builder().url("ws://echo.websocket.org").build();
        EchoWebSocketListener listener = new EchoWebSocketListener();
        WebSocket webSocket = mClient.newWebSocket(request, listener);
        mClient.dispatcher().executorService().shutdown();
    }
```

Here is the full code:

**MainActivity.java**

```java

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;

public class MainActivity extends AppCompatActivity {

    private Button buttonSend;
    private TextView textResult;
    private OkHttpClient mClient;

    private final class EchoWebSocketListener extends WebSocketListener {
        private static final int CLOSE_STATUS = 1000;
        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            webSocket.send("What's up ?");
            webSocket.send(ByteString.decodeHex("abcd"));
            webSocket.close(CLOSE_STATUS, "Socket Closed !!");
        }
        @Override
        public void onMessage(WebSocket webSocket, String message) {
            print("Receive Message: " + message);
        }
        @Override
        public void onMessage(WebSocket webSocket, ByteString bytes) {
            print("Receive Bytes : " + bytes.hex());
        }
        @Override
        public void onClosing(WebSocket webSocket, int code, String reason) {
            webSocket.close(CLOSE_STATUS, null);
            print("Closing Socket : " + code + " / " + reason);
        }
        @Override
        public void onFailure(WebSocket webSocket, Throwable throwable, Response response) {
            print("Error : " + throwable.getMessage());
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        buttonSend = (Button) findViewById(R.id.buttonSend);
        textResult = (TextView) findViewById(R.id.textResult);
        mClient = new OkHttpClient();
        buttonSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                start();
            }
        });
    }
    private void start() {
        Request request = new Request.Builder().url("ws://echo.websocket.org").build();
        EchoWebSocketListener listener = new EchoWebSocketListener();
        WebSocket webSocket = mClient.newWebSocket(request, listener);
        mClient.dispatcher().executorService().shutdown();
    }
    private void print(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                textResult.setText(textResult.getText().toString() + "\n" + message);
            }
        });
    }
}
```

### Reference

Below is the download link.

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/sayanmanna/WebSocketOkhttp/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/sayanmanna/) code author |

## Example 2: Kotlin Android Websocket Example with Okhttp

Here is another android websocket example but this time round written in Kotlin. It still uses OkHttp as the networking library.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

We will install two OkHttp libraries:

```groovy
    implementation 'com.squareup.okhttp3:okhttp:3.12.6'
    implementation 'com.squareup.okhttp3:mockwebserver:3.12.1'
```

Add those in your `app/build.gradle` and sync.

### Step 3: Design Layout

In your `MainActivity's` layout add several buttons and an edittext as shown below:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/connectBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:layout_marginEnd="20dp"
        android:layout_marginRight="20dp"
        android : text = " Connect "
        app:layout_constraintRight_toLeftOf="@+id/clientSendBtn"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/clientSendBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android : text = " Send from the client "
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/closeConnectionBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:layout_marginTop="10dp"
        android : text = " Client is closed "
        app:layout_constraintLeft_toRightOf="@+id/clientSendBtn"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/contentEt"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginTop="10dp"
        android:background="@color/colorGray"
        android:enabled="false"
        android:gravity="top"
        android:padding="5dp"
        android:textColor="@color/colorWhite"
        android:textSize="14sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@id/clientSendBtn"
        app:layout_constraintVertical_weight="1" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create a Message Listener

This will be an interface with several callbacks raised depending on the status of the connection, for example when successfully connected, close, failed etc:

**MessageListener.kt**

```kotlin
interface MessageListener {
    fun  onConnectSuccess () // successfully connected
    fun  onConnectFailed () // connection failed
    fun  onClose () // close
    fun onMessage(text: String?)
}
```

### Step 5: Create a Websocket Manager

Create a `WebSocketManager.kt` then start by adding the following imports:

```kotlin
import  android.util.Log
import okhttp3.*
import okio.ByteString
import  java.util.concurrent.TimeUnit
```

Create a `WebSocketManager` object class with the following private fields;

```kotlin
object  WebSocketManager {
    private val TAG = WebSocketManager::class.java.simpleName
    private  const  val  MAX_NUM  =  5  // Maximum number of reconnections
    private  const  val  MILLIS  =  5000  // Reconnection interval, milliseconds
    private lateinit var client: OkHttpClient
    private lateinit var request: Request
    private lateinit var messageListener: MessageListener
    private lateinit var mWebSocket: WebSocket
    private var isConnect = false
    private var connectNum = 0
```

Then the init function, pass the url as well as the MessageListener. You initialize the `OkHTTP` client here:

```kotlin
    fun init(url: String, _messageListener: MessageListener) {
        client = OkHttpClient.Builder()
            .writeTimeout(5, TimeUnit.SECONDS)
            .readTimeout(5, TimeUnit.SECONDS)
            .connectTimeout(10, TimeUnit.SECONDS)
            .build()
        request = Request.Builder().url(url).build()
        messageListener = _messageListener
    }
```

Now create a function to connect:

```kotlin
    fun connect() {
        if (isConnect()) {
            Log.i(TAG, "web socket connected")
            return
        }
        client.newWebSocket(request, createListener())
    }
```

Also create a function to reconnect:

```kotlin
    fun reconnect() {
        if (connectNum <= MAX_NUM) {
            try {
                Thread.sleep(MILLIS.toLong())
                connect()
                connectNum++
            } catch (e: InterruptedException) {
                e.printStackTrace ()
            }
        } else {
            Log.i(
                TAG,
                "reconnect over $MAX_NUM,please check url or network"
            )
        }
    }
```

We will also have functions to send a message:

```kotlin
    fun sendMessage(text: String): Boolean {
        return if (!isConnect()) false else mWebSocket.send(text)
    }
    fun sendMessage(byteString: ByteString): Boolean {
        return if (!isConnect()) false else mWebSocket.send(byteString)
    }
```

And a function to close the connection:

```kotlin
    fun close() {
        if (isConnect()) {
            mWebSocket.cancel()
            mWebSocket.close( 1001 , "The client actively closes the connection " )
        }
    }
```

Here is the full code:

**WebSocketManager.kt**

```kotlin
import  android.util.Log
import okhttp3.*
import okio.ByteString
import  java.util.concurrent.TimeUnit

object  WebSocketManager {
    private val TAG = WebSocketManager::class.java.simpleName
    private  const  val  MAX_NUM  =  5  // Maximum number of reconnections
    private  const  val  MILLIS  =  5000  // Reconnection interval, milliseconds
    private lateinit var client: OkHttpClient
    private lateinit var request: Request
    private lateinit var messageListener: MessageListener
    private lateinit var mWebSocket: WebSocket
    private var isConnect = false
    private var connectNum = 0
    fun init(url: String, _messageListener: MessageListener) {
        client = OkHttpClient.Builder()
            .writeTimeout(5, TimeUnit.SECONDS)
            .readTimeout(5, TimeUnit.SECONDS)
            .connectTimeout(10, TimeUnit.SECONDS)
            .build()
        request = Request.Builder().url(url).build()
        messageListener = _messageListener
    }

    /**
     * connect
     */
    fun connect() {
        if (isConnect()) {
            Log.i(TAG, "web socket connected")
            return
        }
        client.newWebSocket(request, createListener())
    }

    /**
     * Reconnection
     */
    fun reconnect() {
        if (connectNum <= MAX_NUM) {
            try {
                Thread.sleep(MILLIS.toLong())
                connect()
                connectNum++
            } catch (e: InterruptedException) {
                e.printStackTrace ()
            }
        } else {
            Log.i(
                TAG,
                "reconnect over $MAX_NUM,please check url or network"
            )
        }
    }

    /**
     * Whether to connect
     */
    fun isConnect(): Boolean {
        return isConnect
    }

    /**
     * send messages
     *
     * @param text string
     * @return boolean
     */
    fun sendMessage(text: String): Boolean {
        return if (!isConnect()) false else mWebSocket.send(text)
    }

    /**
     * send messages
     *
     * @param byteString character set
     * @return boolean
     */
    fun sendMessage(byteString: ByteString): Boolean {
        return if (!isConnect()) false else mWebSocket.send(byteString)
    }

    /**
     * Close connection
     */
    fun close() {
        if (isConnect()) {
            mWebSocket.cancel()
            mWebSocket.close( 1001 , "The client actively closes the connection " )
        }
    }

    private fun createListener(): WebSocketListener {
        return object : WebSocketListener() {
            override fun onOpen(
                webSocket: WebSocket,
                response: Response
            ) {
                super.onOpen(webSocket, response)
                Log.d(TAG, "open:$response")
                mWebSocket = webSocket
                isConnect = response.code() == 101
                if (!isConnect) {
                    reconnect()
                } else {
                    Log.i(TAG, "connect success.")
                    messageListener.onConnectSuccess()
                }
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                super.onMessage(webSocket, text)
                messageListener.onMessage(text)
            }

            override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
                super.onMessage(webSocket, bytes)
                messageListener.onMessage(bytes.base64())
            }

            override fun onClosing(
                webSocket: WebSocket,
                code: Int,
                reason: String
            ) {
                super.onClosing(webSocket, code, reason)
                isConnect = false
                messageListener.onClose()
            }

            override fun onClosed(
                webSocket: WebSocket,
                code: Int,
                reason: String
            ) {
                super.onClosed(webSocket, code, reason)
                isConnect = false
                messageListener.onClose()
            }

            override fun onFailure(
                webSocket: WebSocket,
                t: Throwable,
                response: Response?
            ) {
                super.onFailure(webSocket, t, response)
                if (response != null) {
                    Log.i(
                        TAG,
                        "connect failed：" + response.message()
                    )
                }
                Log.i(
                    TAG,
                    "connect failed throwable：" + t.message
                )
                isConnect = false
                messageListener.onConnectFailed()
                reconnect()
            }
        }
    }
}
```

### Step 6: Write MainActivity code

Here is the full code for the `MainActivity`:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.concurrent.thread

class MainActivity : AppCompatActivity(), MessageListener {
    private val serverUrl = "ws://192.168.18.145:8086/socketServer/abc"
    override fun onCreate(savedInstanceState: Bundle?) {
        super .onCreate (savedInstanceState)
        setContentView(R.layout.activity_main)
        WebSocketManager.init(serverUrl, this)
        connectBtn.setOnClickListener {
            thread {
                kotlin.run {
                    WebSocketManager.connect()
                }
            }
        }
        clientSendBtn.setOnClickListener {
            if ( WebSocketManager .sendMessage( " Client send " )) {
                addText( " Send from the client \n " )
            }
        }
        closeConnectionBtn.setOnClickListener {
            WebSocketManager.close()
        }
    }

    override fun onConnectSuccess() {
        addText( " Connected successfully \n " )
    }

    override fun onConnectFailed() {
        addText( " Connection failed \n " )
    }

    override fun onClose() {
        addText( " Closed successfully \n " )
    }

    override fun onMessage(text: String?) {
        addText( " Receive message: $text \n " )
    }

    private fun addText(text: String?) {
        runOnUiThread {
            contentEt.text.append(text)
        }
    }

    override fun onDestroy() {
        super .onDestroy ()
        WebSocketManager.close()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/hspbc666/webSocketDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/hspbc666/) code author |
