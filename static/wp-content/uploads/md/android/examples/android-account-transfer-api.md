# Account Transfer API Example


> Learn how to copy google accounts and data from an existing Android device to a new one using Account Transfer API.

You can use the Account Transfer API to let users also copy credentials for custom accounts implemented using `AbstractAccountAuthenticator` and integrated with `AccountManager`. The system invokes the Account Transfer API from the Tap & Go setup wizard running on the new device. The system also invokes the Account Transfer API to transfer data from an Android phone to a Pixel using a cable.


You can read more about Account Transfer [here](https://developer.android.com/guide/topics/data/account-transfer.html).

Let us look at some exmaples.

## Example 1: Kotlin AccountTransferApi Example

A sample app demonstrating how to use AccountTransferApi to transfer accounts during the setup of a new device.

- Install the app on the source device.
- Add an account by going to Android Settings. Account username and password can be anything.
- Start Account Transfer flow. Read [API Guide](https://developer.android.com/guide/topics/data/account-transfer.html) for more information on how to trigger the flow.
- After completion, install and open the app to confirm the account has been copied over.

![](https://developer.android.com/guide/topics/data/images/tap-and-go-1.png)

![](https://developer.android.com/guide/topics/data/images/tap-and-go-2.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Go to your `app/build.gradle` and add the Play Services Auth Base as a dependency:

```groovy
    // For Account Transfer api, use SDK version 11.2.0 or higher
    implementation 'com.google.android.gms:play-services-auth-base:17.1.2'
```

### Step 3: Add Permissions

Add the following permissions in your `app/src/AndroidManifest.xml`:

```xml
    <uses-permission
        android:name="android.permission.GET_ACCOUNTS"
        android:maxSdkVersion="22" />
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.AUTHENTICATE_ACCOUNTS"/>
```

### Step 4: Create Authenticator

Go to your res folder and create a folder known as `xml` and add the following code:

**res/xml/authenticator.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<account-authenticator xmlns:android="http://schemas.android.com/apk/res/android"
    android:accountType="@string/account_type"
    android:icon="@mipmap/ic_launcher"
    android:smallIcon="@mipmap/ic_launcher"
    android:label="@string/account_label" />
```

### Step 5: Design Layouts

Design two layouts:

**(a). login_activity.xml**

Add two EditTexts and a Button:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:paddingLeft="17dp"
    android:paddingRight="17dp"
    >

    <EditText android:id="@+id/accountName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:hint="Username"
        android:inputType="textEmailAddress"
        android:padding="10dp"
        />

    <EditText android:id="@+id/accountPassword"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:inputType="textPassword"
        android:hint="Password"
        android:padding="10dp"
        />

    <Button android:id="@+id/submit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:text="Sign in"
        android:padding="10dp"/>

</LinearLayout>
```

**(b). activity_main.xml**

Add a refresh button and a TextView to display account text:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

  <TextView
      android:id="@+id/account_text"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"/>

  <Button
      android:id="@+id/refresh"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:text="@string/refresh"/>

</LinearLayout>
```

### Step 6: Write Authenticator Code

Create `Authenticator.java` file and add the following imports:

```java

import android.accounts.AbstractAccountAuthenticator;
import android.accounts.Account;
import android.accounts.AccountAuthenticatorResponse;
import android.accounts.AccountManager;
import android.accounts.NetworkErrorException;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
```

Extend the `AbstractAccountAuthenticator`:

```java
public class Authenticator extends AbstractAccountAuthenticator {
```

Declare a Context object and a TAG:

```java
    private static final String TAG = "Authenticator";
    private final Context mContext;
```

Let the constructor receive a Context object:

```java
    public Authenticator(Context context) {
        super(context);
        this.mContext = context;
    }
```

Override the method to add account:

```java
    @Override
    public Bundle addAccount(
            AccountAuthenticatorResponse response,
            String accountType,
            String authTokenType,
            String[] requiredFeatures,
            Bundle options)
            throws NetworkErrorException {
        Log.d(TAG, "addAccount");

        final Intent intent = new Intent(mContext, AuthenticatorActivity.class);
        intent.putExtra(AccountManager.KEY_ACCOUNT_TYPE, accountType);
        intent.putExtra(AccountManager.KEY_ACCOUNT_AUTHENTICATOR_RESPONSE, response);

        final Bundle bundle = new Bundle();
        bundle.putParcelable(AccountManager.KEY_INTENT, intent);
        return bundle;
    }
```

Override the method to get authentication token, authentication token label, etc. In this case we will return null:

```java
    @Override
    public Bundle getAuthToken(
            AccountAuthenticatorResponse response, Account account, String authTokenType, Bundle options)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public String getAuthTokenLabel(String authTokenType) {
        return null;
    }

    @Override
    public Bundle hasFeatures(
            AccountAuthenticatorResponse response, Account account, String[] features)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public Bundle editProperties(AccountAuthenticatorResponse response, String accountType) {
        return null;
    }

    @Override
    public Bundle confirmCredentials(
            AccountAuthenticatorResponse response, Account account, Bundle options)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public Bundle updateCredentials(
            AccountAuthenticatorResponse response, Account account, String authTokenType, Bundle options)
            throws NetworkErrorException {
        return null;
    }
}
```

Here is the full code:

**Authenticator.java**

```java

import android.accounts.AbstractAccountAuthenticator;
import android.accounts.Account;
import android.accounts.AccountAuthenticatorResponse;
import android.accounts.AccountManager;
import android.accounts.NetworkErrorException;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class Authenticator extends AbstractAccountAuthenticator {

    private static final String TAG = "Authenticator";
    private final Context mContext;

    public Authenticator(Context context) {
        super(context);
        this.mContext = context;
    }

    @Override
    public Bundle addAccount(
            AccountAuthenticatorResponse response,
            String accountType,
            String authTokenType,
            String[] requiredFeatures,
            Bundle options)
            throws NetworkErrorException {
        Log.d(TAG, "addAccount");

        final Intent intent = new Intent(mContext, AuthenticatorActivity.class);
        intent.putExtra(AccountManager.KEY_ACCOUNT_TYPE, accountType);
        intent.putExtra(AccountManager.KEY_ACCOUNT_AUTHENTICATOR_RESPONSE, response);

        final Bundle bundle = new Bundle();
        bundle.putParcelable(AccountManager.KEY_INTENT, intent);
        return bundle;
    }

    @Override
    public Bundle getAuthToken(
            AccountAuthenticatorResponse response, Account account, String authTokenType, Bundle options)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public String getAuthTokenLabel(String authTokenType) {
        return null;
    }

    @Override
    public Bundle hasFeatures(
            AccountAuthenticatorResponse response, Account account, String[] features)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public Bundle editProperties(AccountAuthenticatorResponse response, String accountType) {
        return null;
    }

    @Override
    public Bundle confirmCredentials(
            AccountAuthenticatorResponse response, Account account, Bundle options)
            throws NetworkErrorException {
        return null;
    }

    @Override
    public Bundle updateCredentials(
            AccountAuthenticatorResponse response, Account account, String authTokenType, Bundle options)
            throws NetworkErrorException {
        return null;
    }
}
```

### Step 7: Create Authenticator Activity

Create `AuthenticatorActivity.kt` and extend the `AccountAuthenticatorActivity` class

```java
public class AuthenticatorActivity extends AccountAuthenticatorActivity {
```

Prepare an `AccountManager`:

```java
    private AccountManager mAccountManager;
```

Override the `onCreate()`:

```java
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
```

Obtain the accountManager based on the context:

```java
        mAccountManager = AccountManager.get(getBaseContext());
```

When the submit button is clicked, add an account:

```java
        findViewById(R.id.submit)
                .setOnClickListener(
                        new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                addAccount();
                            }
                        });
    }
```

Here is the code for adding an account:

```java
    private void addAccount() {
        final String accountName = ((TextView) findViewById(R.id.accountName)).getText().toString();
        final String accountPassword =
                ((TextView) findViewById(R.id.accountPassword)).getText().toString();
        final Intent intent = getIntent();
        final Account account =
                new Account(accountName, intent.getStringExtra(AccountManager.KEY_ACCOUNT_TYPE));

        // There is no check for username/password as this is sample app. Real apps should verify
        // the account credentials before adding it to device.
        mAccountManager.addAccountExplicitly(account, accountPassword, null);
        setResult(RESULT_OK);
        finish();
    }
}
```

**AuthenticatorActivity.java**

```java
import android.accounts.Account;
import android.accounts.AccountAuthenticatorActivity;
import android.accounts.AccountManager;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import com.google.accounttransfer.sample.R;

public class AuthenticatorActivity extends AccountAuthenticatorActivity {

    private AccountManager mAccountManager;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        mAccountManager = AccountManager.get(getBaseContext());

        findViewById(R.id.submit)
                .setOnClickListener(
                        new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                addAccount();
                            }
                        });
    }

    private void addAccount() {
        final String accountName = ((TextView) findViewById(R.id.accountName)).getText().toString();
        final String accountPassword =
                ((TextView) findViewById(R.id.accountPassword)).getText().toString();
        final Intent intent = getIntent();
        final Account account =
                new Account(accountName, intent.getStringExtra(AccountManager.KEY_ACCOUNT_TYPE));

        // There is no check for username/password as this is sample app. Real apps should verify
        // the account credentials before adding it to device.
        mAccountManager.addAccountExplicitly(account, accountPassword, null);
        setResult(RESULT_OK);
        finish();
    }
}
```

### Step 8: Create Authenticator service

Create `AuthenticatorService.java` add these imports:

```java
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
```

Extend the `android.app.Service`:

```java
public class AuthenticatorService extends Service {
```

Override the `onBind()` method:

```
    @Override
    public IBinder onBind(Intent intent) {
        Authenticator authenticator = new Authenticator(this);
        return authenticator.getIBinder();
    }
}
```

Here is the full code:

**AuthenticatorService.java**

```java
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class AuthenticatorService extends Service {
    @Override
    public IBinder onBind(Intent intent) {
        Authenticator authenticator = new Authenticator(this);
        return authenticator.getIBinder();
    }
}
```

### Step 9: Create an AccountTransfer BroadcastReceiver

Create a `AccountTransferBroadcastReceiver.java` and extend the `android.content.BroadcastReceiver`:

```java
public class AccountTransferBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "ATBroadcastReceiver";
```

Override the `onReceive()`:

```java
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Received intent:" + intent);
```

Because Long running tasks, like calling Account Transfer API, shouldn't happen here, you start a foreground service to perform long running tasks:

```java
        Intent serviceIntent = AccountTransferService.getIntent(context, intent.getAction());
        if (Build.VERSION.SDK_INT >= 26) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }
```

Here is the full code:

**AccountTransferBroadcastReceiver.java**

```java
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

/**
 * Broadcast receiver entry point for listening to Account Transfer Broadcasts.
 */

public class AccountTransferBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "ATBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Received intent:" + intent);
        // Long running tasks, like calling Account Transfer API, shouldn't happen here. Start a
        // foreground service to perform long running tasks.
        Intent serviceIntent = AccountTransferService.getIntent(context, intent.getAction());
        if (Build.VERSION.SDK_INT >= 26) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }
    }
}
```

### Step 10: Create An Account Tansfer Service

Create the `AccountTransferService.java` and extend the `IntentService`:

```java
public class AccountTransferService extends IntentService {
```

Define the following constants:

```java
    private static final String TAG = "AccountTransferService";
    private static final String ACTION_START_ACCOUNT_EXPORT =
            AccountTransfer.ACTION_START_ACCOUNT_EXPORT;
    private static final String ACCOUNT_TYPE = AccountTransferUtil.ACCOUNT_TYPE;

    private static final String ACCOUNT_TRANSFER_CHANNEL = "TRANSFER ACCOUNTS";
    private static final int NOTIFICATION_ID = 1;

    private static final long TIMEOUT_API = 10;
    private static final TimeUnit TIME_UNIT = TimeUnit.SECONDS;
```

Create a constructor:

```java
    public AccountTransferService() {
        super("AccountTransferService");
    }
```

Define a helper method to return an Intent when provided with an action as well as a context:

```java
    public static Intent getIntent(Context context, String action) {
        Intent intent = new Intent();
        intent.setAction(action);
        intent.setClass(context, AccountTransferService.class);
        return intent;
    }
```

Override our `onCreate()` and create a Notification as well as starting a foreground service:

```java
    @Override
    public void onCreate() {
        super.onCreate();

        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= 26) {
            createNotificationChannel();
            builder = new Notification.Builder(this, ACCOUNT_TRANSFER_CHANNEL);
        } else {
            builder = new Notification.Builder(this);
        }
        Notification notification = builder
                .setSmallIcon(R.mipmap.ic_launcher)
                .setTicker(getString(R.string.copying_text))
                .setWhen(System.currentTimeMillis())
                .setContentTitle(getText(R.string.copying_text))
                .setContentText(getString(R.string.copying_text))
                .build();
        startForeground(NOTIFICATION_ID, notification);
    }
```

Stop the foreground service when the service is being destroyed:

```java
    @Override
    public void onDestroy() {
        stopForeground(true);
        super.onDestroy();
    }
```

Handle Intent:

```java
    protected void onHandleIntent(Intent intent) {
        String action = intent.getAction();
        if (action == null) {
            Log.e(TAG, "Receiver with action == null");
            return;
        }
        Log.d(TAG, "Receiver with action:" + action);

        switch (action) {

            case AccountTransfer.ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE:
                importAccount();
                return;

            case ACTION_START_ACCOUNT_EXPORT:
            case AccountTransfer.ACTION_ACCOUNT_EXPORT_DATA_AVAILABLE:
                exportAccount();
                return;

            default:
        }
    }
```

Return null in the `onBind()`:

```java
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
```

Here is how you import an account:

```java
    private void importAccount() {
        // Handle to client object
        AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);

        // Make RetrieveData api call to get the transferred over data.
        Task<byte[]> transferTask = client.retrieveData(ACCOUNT_TYPE);
        try {
            byte[] transferBytes = Tasks.await(transferTask, TIMEOUT_API, TIME_UNIT);
            AccountTransferUtil.importAccounts(transferBytes, this);
        } catch (ExecutionException | InterruptedException | TimeoutException | JSONException e) {
            Log.e(TAG, "Exception while calling importAccounts()", e);
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
            return;
        }
        client.notifyCompletion(
                ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS);

    }
```

Here is how you export an account:

```java
    private void exportAccount() {
        Log.d(TAG, "exportAccount()");
        byte[] transferBytes = AccountTransferUtil.getTransferBytes(this);
        AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);
        if (transferBytes == null) {
            Log.d(TAG, "Nothing to export");
            // Notifying is important.
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS);
            return;
        }

        // Send the data over to the other device.
        Task<Void> exportTask = client.sendData(ACCOUNT_TYPE, transferBytes);
        try {
            Tasks.await(exportTask, TIMEOUT_API, TIME_UNIT);
        } catch (ExecutionException | InterruptedException | TimeoutException e) {
            Log.e(TAG, "Exception while calling exportAccounts()", e);
            // Notifying is important.
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
            return;
        }
    }
```

Here is a method to create notification channel:

```java
    private void createNotificationChannel() {
        NotificationManager mNotificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        String id = ACCOUNT_TRANSFER_CHANNEL;
        CharSequence name = "AccountTransfer";
        String description = "Account Transfer";
        int importance = NotificationManager.IMPORTANCE_MIN;
        NotificationChannel mChannel = new NotificationChannel(id, name, importance);
        mChannel.setDescription(description);
        mChannel.enableLights(false);
        mChannel.enableVibration(false);
        mNotificationManager.createNotificationChannel(mChannel);
    }
}
```

Here is the full code:

**AccountTransferService.java**

```java
import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import android.util.Log;
import com.google.android.gms.auth.api.accounttransfer.AccountTransfer;
import com.google.android.gms.auth.api.accounttransfer.AccountTransferClient;
import com.google.android.gms.auth.api.accounttransfer.AuthenticatorTransferCompletionStatus;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;

import org.json.JSONException;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AccountTransferService extends IntentService {

    private static final String TAG = "AccountTransferService";
    private static final String ACTION_START_ACCOUNT_EXPORT =
            AccountTransfer.ACTION_START_ACCOUNT_EXPORT;
    private static final String ACCOUNT_TYPE = AccountTransferUtil.ACCOUNT_TYPE;

    private static final String ACCOUNT_TRANSFER_CHANNEL = "TRANSFER ACCOUNTS";
    private static final int NOTIFICATION_ID = 1;

    private static final long TIMEOUT_API = 10;
    private static final TimeUnit TIME_UNIT = TimeUnit.SECONDS;

    public AccountTransferService() {
        super("AccountTransferService");
    }

    public static Intent getIntent(Context context, String action) {
        Intent intent = new Intent();
        intent.setAction(action);
        intent.setClass(context, AccountTransferService.class);
        return intent;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        Notification.Builder builder;
        if (Build.VERSION.SDK_INT >= 26) {
            createNotificationChannel();
            builder = new Notification.Builder(this, ACCOUNT_TRANSFER_CHANNEL);
        } else {
            builder = new Notification.Builder(this);
        }
        Notification notification = builder
                .setSmallIcon(R.mipmap.ic_launcher)
                .setTicker(getString(R.string.copying_text))
                .setWhen(System.currentTimeMillis())
                .setContentTitle(getText(R.string.copying_text))
                .setContentText(getString(R.string.copying_text))
                .build();
        startForeground(NOTIFICATION_ID, notification);
    }

    @Override
    public void onDestroy() {
        stopForeground(true);
        super.onDestroy();
    }

    protected void onHandleIntent(Intent intent) {
        String action = intent.getAction();
        if (action == null) {
            Log.e(TAG, "Receiver with action == null");
            return;
        }
        Log.d(TAG, "Receiver with action:" + action);

        switch (action) {

            case AccountTransfer.ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE:
                importAccount();
                return;

            case ACTION_START_ACCOUNT_EXPORT:
            case AccountTransfer.ACTION_ACCOUNT_EXPORT_DATA_AVAILABLE:
                exportAccount();
                return;

            default:
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void importAccount() {
        // Handle to client object
        AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);

        // Make RetrieveData api call to get the transferred over data.
        Task<byte[]> transferTask = client.retrieveData(ACCOUNT_TYPE);
        try {
            byte[] transferBytes = Tasks.await(transferTask, TIMEOUT_API, TIME_UNIT);
            AccountTransferUtil.importAccounts(transferBytes, this);
        } catch (ExecutionException | InterruptedException | TimeoutException | JSONException e) {
            Log.e(TAG, "Exception while calling importAccounts()", e);
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
            return;
        }
        client.notifyCompletion(
                ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS);

    }

    private void exportAccount() {
        Log.d(TAG, "exportAccount()");
        byte[] transferBytes = AccountTransferUtil.getTransferBytes(this);
        AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);
        if (transferBytes == null) {
            Log.d(TAG, "Nothing to export");
            // Notifying is important.
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS);
            return;
        }

        // Send the data over to the other device.
        Task<Void> exportTask = client.sendData(ACCOUNT_TYPE, transferBytes);
        try {
            Tasks.await(exportTask, TIMEOUT_API, TIME_UNIT);
        } catch (ExecutionException | InterruptedException | TimeoutException e) {
            Log.e(TAG, "Exception while calling exportAccounts()", e);
            // Notifying is important.
            client.notifyCompletion(
                    ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
            return;
        }
    }

    private void createNotificationChannel() {
        NotificationManager mNotificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        String id = ACCOUNT_TRANSFER_CHANNEL;
        CharSequence name = "AccountTransfer";
        String description = "Account Transfer";
        int importance = NotificationManager.IMPORTANCE_MIN;
        NotificationChannel mChannel = new NotificationChannel(id, name, importance);
        mChannel.setDescription(description);
        mChannel.enableLights(false);
        mChannel.enableVibration(false);
        mNotificationManager.createNotificationChannel(mChannel);
    }
}
```

### Step 11: Create Account Tansfer Utilities

A simple utilities class for Account Transfer functionality:

```java
public class AccountTransferUtil {

    public static final String ACCOUNT_TYPE = "com.accountransfer.account.type";
    public static final String KEY_ACCOUNT_NAME = "account_name";
    public static final String KEY_ACCOUNT_PASSWORD = "account_password";
    public static final String KEY_ACCOUNT_ARRAY = "account_array";

    private static final String TAG = "AccountTransferUtil";

    private AccountTransferUtil() {}

    static void importAccounts(byte[] transferBytes, Context context) throws JSONException {
        if (transferBytes != null) {
            String jsonString = new String(transferBytes, Charset.forName("UTF-8"));
            JSONObject object = new JSONObject(jsonString);
            JSONArray jsonArray = object.getJSONArray(KEY_ACCOUNT_ARRAY);
            for (int i = 0, size = jsonArray.length(); i < size; i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String password = jsonObject.getString(KEY_ACCOUNT_PASSWORD);
                String name = jsonObject.getString(KEY_ACCOUNT_NAME);
                Account newAccount = new Account(
                        name + " COPY time:" + System.currentTimeMillis(), ACCOUNT_TYPE);
                boolean result = AccountManager.get(context)
                        .addAccountExplicitly(newAccount, password, null);
                // Don't log PII in actual app.
                Log.d(TAG, "Added account:" + newAccount + " with password:" + password
                        + " with result:" + result);
                Log.d(TAG, "Don't log PII in actual app");

            }
        }
    }

    static byte[] getTransferBytes(Context context) {
        AccountManager am = AccountManager.get(context);
        Account[] accounts = am.getAccountsByType(ACCOUNT_TYPE);
        String msg = "Length of accounts of type com.mfm are " + accounts.length;
        Log.v(TAG, msg);
        if (accounts.length != 0) {
            JSONArray jsonArray = new JSONArray();
            for (Account account : accounts) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put(KEY_ACCOUNT_NAME, account.name);
                    String password  = am.getPassword(account);
                    jsonObject.put(KEY_ACCOUNT_PASSWORD, password);
                } catch (JSONException e) {
                    Log.e(TAG, "Error while creating bytes for transfer", e);
                    return null;
                }
                jsonArray.put(jsonObject);
            }
            JSONObject object = new JSONObject();
            try {
                object.put(KEY_ACCOUNT_ARRAY, jsonArray);
            } catch (JSONException e) {
                Log.e(TAG, "Error", e);
                return null;
            }
            return object.toString().getBytes(Charset.forName("UTF-8"));
        }
        return null;
    }
}
```

### Step 12: MainActivity

Here is the code for the `MainActivity.java`

```java
import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.SharedPreferences;
import android.graphics.Color;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.google.android.gms.auth.api.accounttransfer.AccountTransfer;
import com.google.android.gms.auth.api.accounttransfer.AccountTransferClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONException;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private static final String SHARED_PREF = "accountTransfer";
    private static final String KEY_FIRST_TIME = "first_time";
    private static final String ACCOUNT_TYPE = AccountTransferUtil.ACCOUNT_TYPE;

    private static Boolean firstTime = null;
    SharedPreferences sharedPreferences;
    private TextView mAccountTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mAccountTextView = (TextView) findViewById(R.id.account_text);
        findViewById(R.id.refresh).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                populateAccountTextView();
            }
        });
        // In production app, call this in a background thread, showing progress screen meanwhile.
        fetchData();
    }

    @Override
    protected void onResume() {
        super.onResume();
        populateAccountTextView();
    }

    private void populateAccountTextView() {
        AccountManager am = AccountManager.get(this);
        Account[] accounts = am.getAccountsByType(ACCOUNT_TYPE);
        String accountString = "Accounts of type " + ACCOUNT_TYPE + " are : \n";
        if (accounts.length != 0) {
            for (Account account : accounts) {
                accountString += "Account:" +  account.name + "\n";
            }
        } else {
            accountString = "No Accounts of type " + ACCOUNT_TYPE +
                    " found. Please add accounts before exporting.";
            mAccountTextView.setTextColor(Color.RED);
        }
        mAccountTextView.setText(accountString);
    }

    private void fetchData() {
        // The logic can be modified according to your need.
        sharedPreferences = getSharedPreferences(SHARED_PREF, MODE_PRIVATE);
        firstTime = sharedPreferences.getBoolean(KEY_FIRST_TIME, true);
        if (firstTime) {
            Log.v(TAG, "Fetching account info from API");
            AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);
            final Task<byte[]> transferBytes = client.retrieveData(ACCOUNT_TYPE);
            transferBytes.addOnCompleteListener(this, new OnCompleteListener<byte[]>() {
                @Override
                public void onComplete(@NonNull Task<byte[]> task) {
                    if (task.isSuccessful()) {
                        Log.d(TAG, "Success retrieving data. Importing it.");
                        try {
                            AccountTransferUtil.importAccounts(task.getResult(), MainActivity.this);
                        } catch (JSONException e) {
                            Log.e(TAG, "Encountered failure while retrieving data", e);
                            return;
                        }
                        populateAccountTextView();
                    } else {
                        // No need to notify API about failure, as it's running outside setup of
                        // device.
                        Log.e(TAG, "Encountered failure while retrieving data", task.getException());
                    }
                    // Don't try the next time
                    sharedPreferences.edit().putBoolean(KEY_FIRST_TIME, false).apply();
                }
            });
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/android/identity-samples/tree/main/AccountTransferApi) Example |
| 2. | [Follow](https://github.com/android/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
