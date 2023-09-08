# Building autofill services

An autofill service is an app that makes it easier for users to fill out forms by injecting data into the views of other apps. Autofill services can also retrieve user data from the views in an app and store it to use it at a later time. Autofill services are usually provided by apps that manage user data, such as password managers.

Android makes filling out forms easier with the autofill framework available in Android 8.0 (API level 26) and higher. Users can take advantage of autofill features only if there is an app that provides autofill services on their device.

This page shows how to implement an autofill service in your app. If you're looking for a code sample that shows how to implement a service, see the AutofillFramework sample Java | Kotlin. For further details about how autofill services work, see the reference documentation of the `AutofillService` and `AutofillManager` classes.

Manifest declarations and permissions
-------------------------------------

Apps that provide autofill services must include a declaration that describes the implementation of the service. To specify the declaration, include a `<service>` element in the app manifest. The `<service>` element should include the following attributes and elements:

*   `android:name` attribute that points to the subclass of `AutofillService` in the app that implements the service.
*   `android:permission` attribute that declares the `BIND_AUTOFILL_SERVICE` permission.
*   `<intent-filter>` element, whose mandatory `<action>` child specifies the `android.service.autofill.AutofillService` action.
*   Optional `<meta-data>` element that you can use to provide additional configuration parameters for the service.

The following example shows an autofill service declaration:

```xml
    <service
        android:name=".MyAutofillService"
        android:label="My Autofill Service"
        android:permission="android.permission.BIND_AUTOFILL_SERVICE">
        <intent-filter>
            <action android:name="android.service.autofill.AutofillService" />
        </intent-filter>
        <meta-data
            android:name="android.autofill"
            android:resource="@xml/service_configuration" />
    </service>
```


The `<meta-data>` element includes an `android:resource` attribute that points to an XML resource with further details about the service. The `service_configuration` resource in the previous example specifies an activity that allows the users to configure the service. The following example shows the `service_configuration` XML resource:

```xml
    <autofill-service
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:settingsActivity="com.example.android.SettingsActivity" />
```

For more information about XML resources, see Providing Resources.

Prompt to enable the service
----------------------------

An app is used as the autofill service after it declares the `BIND_AUTOFILL_SERVICE` permission and the user enables it in the device settings. An app can verify if it's the currently enabled service by calling the `hasEnabledAutofillServices()` method of the `AutofillManager` class.

If the app isn't the current autofill service, then it can request the user to change the autofill settings by using the `ACTION_REQUEST_SET_AUTOFILL_SERVICE` intent. The intent returns a `RESULT_OK` value if the user selected an autofill service that matches the package of the caller.

Fill out client views
---------------------

The autofill service receives requests to fill out client views when the user interacts with other apps. If the autofill service has user data that satisfies the request then it sends the data in the response. The Android system shows an autofill UI with the available data, as shown in figure 1:

![Autofill UI](https://developer.android.com/static/images/guide/topics/text/autofill_sample_framed.png)

**Figure 1.** Autofill UI displaying a dataset.

The autofill framework defines a workflow to fill out views that is designed to minimize the time that the Android system is bound to the autofill service. In each request, the Android system sends an `AssistStructure` object to the service by calling the `onFillRequest()` method. The autofill service checks if it can satisfy the request with user data that it has previously stored. If it can satisfy the request, then the service packages the data in `Dataset` objects. The service calls the `onSuccess()` method passing a `FillResponse` object, which contains the `Dataset` objects. If the service doesn't have data to satisfy the request, it passes `null` to the `onSuccess()` method. The service calls the `onFailure()` method instead if there's an error processing the request. For a detailed explanation of the workflow, see Basic usage.

The following code shows an example of the `onFillRequest()` method:

### Kotlin

```kotlin
override fun onFillRequest(
    request: FillRequest,
    cancellationSignal: CancellationSignal,
    callback: FillCallback
) {
    // Get the structure from the request
    val context: List<FillContext> = request.fillContexts
    val structure: AssistStructure = context[context.size - 1].structure

    // Traverse the structure looking for nodes to fill out.
    val parsedStructure: ParsedStructure = parseStructure(structure)

    // Fetch user data that matches the fields.
    val (username: String, password: String) = fetchUserData(parsedStructure)

    // Build the presentation of the datasets
    val usernamePresentation = RemoteViews(packageName, android.R.layout.simple_list_item_1)
    usernamePresentation.setTextViewText(android.R.id.text1, "my_username")
    val passwordPresentation = RemoteViews(packageName, android.R.layout.simple_list_item_1)
    passwordPresentation.setTextViewText(android.R.id.text1, "Password for my_username")

    // Add a dataset to the response
    val fillResponse: FillResponse = FillResponse.Builder()
            .addDataset(Dataset.Builder()
                    .setValue(
                            parsedStructure.usernameId,
                            AutofillValue.forText(username),
                            usernamePresentation
                    )
                    .setValue(
                            parsedStructure.passwordId,
                            AutofillValue.forText(password),
                            passwordPresentation
                    )
                    .build())
            .build()

    // If there are no errors, call onSuccess() and pass the response
    callback.onSuccess(fillResponse)
}

data class ParsedStructure(var usernameId: AutofillId, var passwordId: AutofillId)

data class UserData(var username: String, var password: String)
```

### Java

```java
@Override
public void onFillRequest(FillRequest request, CancellationSignal cancellationSignal, FillCallback callback) {
    // Get the structure from the request
    List<FillContext> context = request.getFillContexts();
    AssistStructure structure = context.get(context.size() - 1).getStructure();

    // Traverse the structure looking for nodes to fill out.
    ParsedStructure parsedStructure = parseStructure(structure);

    // Fetch user data that matches the fields.
    UserData userData = fetchUserData(parsedStructure);

    // Build the presentation of the datasets
    RemoteViews usernamePresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
    usernamePresentation.setTextViewText(android.R.id.text1, "my_username");
    RemoteViews passwordPresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
    passwordPresentation.setTextViewText(android.R.id.text1, "Password for my_username");

    // Add a dataset to the response
    FillResponse fillResponse = new FillResponse.Builder()
            .addDataset(new Dataset.Builder()
                    .setValue(parsedStructure.usernameId,
                            AutofillValue.forText(userData.username), usernamePresentation)
                    .setValue(parsedStructure.passwordId,
                            AutofillValue.forText(userData.password), passwordPresentation)
                    .build())
            .build();

    // If there are no errors, call onSuccess() and pass the response
    callback.onSuccess(fillResponse);
}

class ParsedStructure {
    AutofillId usernameId;
    AutofillId passwordId;
}

class UserData {
    String username;
    String password;
}
```

A service could have more than one dataset that satisfies the request. In this case, the Android system shows multiple options—one for each dataset—in the autofill UI. The following code example shows how to provide multiple datasets in a response:

### Kotlin

```kotlin
// Add multiple datasets to the response
val fillResponse: FillResponse = FillResponse.Builder()
        .addDataset(Dataset.Builder()
                .setValue(parsedStructure.usernameId,
                        AutofillValue.forText(user1Data.username), username1Presentation)
                .setValue(parsedStructure.passwordId,
                        AutofillValue.forText(user1Data.password), password1Presentation)
                .build())
        .addDataset(Dataset.Builder()
                .setValue(parsedStructure.usernameId,
                        AutofillValue.forText(user2Data.username), username2Presentation)
                .setValue(parsedStructure.passwordId,
                        AutofillValue.forText(user2Data.password), password2Presentation)
                .build())
        .build()
```

### Java

```java
// Add multiple datasets to the response
FillResponse fillResponse = new FillResponse.Builder()
        .addDataset(new Dataset.Builder()
                .setValue(parsedStructure.usernameId,
                        AutofillValue.forText(user1Data.username), username1Presentation)
                .setValue(parsedStructure.passwordId,
                        AutofillValue.forText(user1Data.password), password1Presentation)
                .build())
        .addDataset(new Dataset.Builder()
                .setValue(parsedStructure.usernameId,
                        AutofillValue.forText(user2Data.username), username2Presentation)
                .setValue(parsedStructure.passwordId,
                        AutofillValue.forText(user2Data.password), password2Presentation)
                .build())
        .build();
```

Autofill services can navigate the `ViewNode` objects in the `AssistStructure` to retrieve the autofill data required to fulfill the request. A service can retrieve autofill data using methods of the `ViewNode` class, such as `getAutofillId()`. A service should be able to describe the contents of a view to check if it can satisfy the request. Using the `autofillHints` attribute is the first approach that a service should use to describe the contents of a view. However, client apps must explicitly provide the attribute in their views before it is available to the service. If a client app doesn't provide the `autofillHints` attribute, a service should use its own heuristics to describe the contents. The service can use methods of other classes to get information about the contents of the view, such as `getText()` or `getHint()`. For more information, see Providing hints for autofill. The following example shows how to traverse the `AssistStructure` and retrieve autofill data from a `ViewNode` object:

### Kotlin

```kotlin
fun traverseStructure(structure: AssistStructure) {
    val windowNodes: List<AssistStructure.WindowNode> =
            structure.run {
                (0 until windowNodeCount).map { getWindowNodeAt(it) }
            }

    windowNodes.forEach { windowNode: AssistStructure.WindowNode ->
        val viewNode: ViewNode? = windowNode.rootViewNode
        traverseNode(viewNode)
    }
}

fun traverseNode(viewNode: ViewNode?) {
    if (viewNode?.autofillHints?.isNotEmpty() == true) {
        // If the client app provides autofill hints, you can obtain them using:
        // viewNode.getAutofillHints();
    } else {
        // Or use your own heuristics to describe the contents of a view
        // using methods such as getText() or getHint().
    }

    val children: List<ViewNode>? =
            viewNode?.run {
                (0 until childCount).map { getChildAt(it) }
            }

    children?.forEach { childNode: ViewNode ->
        traverseNode(childNode)
    }
}
```

### Java

```java
public void traverseStructure(AssistStructure structure) {
    int nodes = structure.getWindowNodeCount();

    for (int i = 0; i < nodes; i++) {
        WindowNode windowNode = structure.getWindowNodeAt(i);
        ViewNode viewNode = windowNode.getRootViewNode();
        traverseNode(viewNode);
    }
}

public void traverseNode(ViewNode viewNode) {
    if(viewNode.getAutofillHints() != null && viewNode.getAutofillHints().length > 0) {
        // If the client app provides autofill hints, you can obtain them using:
        // viewNode.getAutofillHints();
    } else {
        // Or use your own heuristics to describe the contents of a view
        // using methods such as getText() or getHint().
    }

    for(int i = 0; i < viewNode.getChildCount(); i++) {
        ViewNode childNode = viewNode.getChildAt(i);
        traverseNode(childNode);
    }
}
```

Save user data
--------------

An autofill service needs user data to fill out views in apps. When users manually fill out a view, they're prompted to save the data to the current autofill service, as shown in figure 2.

![Autofill save UI](https://developer.android.com/static/images/guide/topics/text/autofill_save.png)

**Figure 2.** Autofill save UI

To save the data, the service must indicate that it is interested in storing the data for future use. Before the Android system sends a request to save the data, there is a fill request where the service has the opportunity to fill out the views. To indicate that it is interested in saving the data, the service includes a `SaveInfo` object to the response of the precedent fill request. The `SaveInfo` object contains at least the following data:

*   The type of user data that would be saved. For a list of the available `SAVE_DATA` values, see `SaveInfo`.
*   The minimum set of views that need to be changed to trigger a save request. For example, a login form typically requires the user to update the `username` and `password` views to trigger a save request.

A `SaveInfo` object is associated with a `FillResponse` object, as shown in the following code example:

### Kotlin

```kotlin
override fun onFillRequest(
    request: FillRequest,
    cancellationSignal: CancellationSignal,
    callback: FillCallback
) {
    ...
    // Builder object requires a non-null presentation.
    val notUsed = RemoteViews(packageName, android.R.layout.simple_list_item_1)

    val fillResponse: FillResponse = FillResponse.Builder()
            .addDataset(
                    Dataset.Builder()
                            .setValue(parsedStructure.usernameId, null, notUsed)
                            .setValue(parsedStructure.passwordId, null, notUsed)
                            .build()
            )
            .setSaveInfo(
                    SaveInfo.Builder(
                            SaveInfo.SAVE_DATA_TYPE_USERNAME or SaveInfo.SAVE_DATA_TYPE_PASSWORD,
                            arrayOf(parsedStructure.usernameId, parsedStructure.passwordId)
                    ).build()
            )
            .build()
    ...
}
```

### Java

```java
@Override
public void onFillRequest(FillRequest request, CancellationSignal cancellationSignal, FillCallback callback) {
    ...
    // Builder object requires a non-null presentation.
    RemoteViews notUsed = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);

    FillResponse fillResponse = new FillResponse.Builder()
            .addDataset(new Dataset.Builder()
                    .setValue(parsedStructure.usernameId, null, notUsed)
                    .setValue(parsedStructure.passwordId, null, notUsed)
                    .build())
            .setSaveInfo(new SaveInfo.Builder(
                    SaveInfo.SAVE_DATA_TYPE_USERNAME | SaveInfo.SAVE_DATA_TYPE_PASSWORD,
                    new AutofillId[] {parsedStructure.usernameId, parsedStructure.passwordId})
                    .build())
            .build();
    ...
}
```

The autofill service can implement logic to persist the user data in the `onSaveRequest()` method, which is usually called after the client activity finishes or when the client app calls `commit()`. The following code shows an example of the `onSaveRequest()` method:

### Kotlin

```kotlin
override fun onSaveRequest(request: SaveRequest, callback: SaveCallback) {
    // Get the structure from the request
    val context: List<FillContext> = request.fillContexts
    val structure: AssistStructure = context[context.size - 1].structure

    // Traverse the structure looking for data to save
    traverseStructure(structure)

    // Persist the data, if there are no errors, call onSuccess()
    callback.onSuccess()
}
```

### Java

```java
@Override
public void onSaveRequest(SaveRequest request, SaveCallback callback) {
    // Get the structure from the request
    List<FillContext> context = request.getFillContexts();
    AssistStructure structure = context.get(context.size() - 1).getStructure();

    // Traverse the structure looking for data to save
    traverseStructure(structure);

    // Persist the data, if there are no errors, call onSuccess()
    callback.onSuccess();
}
```

Autofill services should encrypt sensitive data before persisting it. However, user data includes labels or data that isn't sensitive. For example, a user account can include a label that marks the data as a _work_ or a _personal_ account. Services shouldn't encrypt labels, which allows them to use the labels in presentation views if the user hasn't authenticated, and substitute the labels with the actual data after the user authenticates.

### Postpone the autofill save UI

Starting with Android 10, if you use multiple screens to implement an autofill workflow (for example, one screen for the username field and another for the password), you can postpone the autofill save UI by using the `SaveInfo.FLAG_DELAY_SAVE` flag.

If this flag is set, the autofill save UI is not triggered when the autofill context associated with the `SaveInfo` response is committed. Instead, you can use a separate activity within the same task to deliver future fill requests and then show the UI via a save request. For more information, see `SaveInfo.FLAG_DELAY_SAVE`.

Require user authentication
---------------------------

Autofill services can provide an additional level of security by requiring the user to authenticate before it can fill out views. The following scenarios are good candidates to implement user authentication:

*   The user data in the app needs to be unlocked using a primary password or a fingerprint scan.
*   A specific dataset needs to be unlocked, for example, credit card details by using a card verification code (CVC).

In a scenario where the service requires user authentication before unlocking the data, the service can present boilerplate data or a label and specify the `Intent` that takes care of authentication. If you need additional data to process the request after the authentication flow is done, you can add such data to the intent. Your authentication activity can then return the data to the `AutofillService` class in your app. The following code example shows how to specify that the request requires authentication:

### Kotlin

```kotlin
val authPresentation = RemoteViews(packageName, android.R.layout.simple_list_item_1).apply {
    setTextViewText(android.R.id.text1, "requires authentication")
}
val authIntent = Intent(this, AuthActivity::class.java).apply {
    // Send any additional data required to complete the request.
    putExtra(MY_EXTRA_DATASET_NAME, "my_dataset")
}

val intentSender: IntentSender = PendingIntent.getActivity(
        this,
        1001,
        authIntent,
        PendingIntent.FLAG_CANCEL_CURRENT
).intentSender

// Build a FillResponse object that requires authentication.
val fillResponse: FillResponse = FillResponse.Builder()
        .setAuthentication(autofillIds, intentSender, authPresentation)
        .build()
```

### Java

```java
RemoteViews authPresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
authPresentation.setTextViewText(android.R.id.text1, "requires authentication");
Intent authIntent = new Intent(this, AuthActivity.class);

// Send any additional data required to complete the request.
authIntent.putExtra(MY_EXTRA_DATASET_NAME, "my_dataset");
IntentSender intentSender = PendingIntent.getActivity(
                this,
                1001,
                authIntent,
                PendingIntent.FLAG_CANCEL_CURRENT
        ).getIntentSender();

// Build a FillResponse object that requires authentication.
FillResponse fillResponse = new FillResponse.Builder()
        .setAuthentication(autofillIds, intentSender, authPresentation)
        .build();
```

Once the activity completes the authentication flow, it should call the `setResult()` method passing a `RESULT_OK` value and set the `EXTRA_AUTHENTICATION_RESULT` extra to the `FillResponse` object that includes the populated dataset. The following code shows an example of how to return the result once the authentication flows completes:

### Kotlin

```kotlin
// The data sent by the service and the structure are included in the intent.
val datasetName: String? = intent.getStringExtra(MY_EXTRA_DATASET_NAME)
val structure: AssistStructure = intent.getParcelableExtra(EXTRA_ASSIST_STRUCTURE)
val parsedStructure: ParsedStructure = parseStructure(structure)
val (username, password) = fetchUserData(parsedStructure)

// Build the presentation of the datasets.
val usernamePresentation =
        RemoteViews(packageName, android.R.layout.simple_list_item_1).apply {
            setTextViewText(android.R.id.text1, "my_username")
        }
val passwordPresentation =
        RemoteViews(packageName, android.R.layout.simple_list_item_1).apply {
            setTextViewText(android.R.id.text1, "Password for my_username")
        }

// Add the dataset to the response.
val fillResponse: FillResponse = FillResponse.Builder()
        .addDataset(Dataset.Builder()
                .setValue(
                        parsedStructure.usernameId,
                        AutofillValue.forText(username),
                        usernamePresentation
                )
                .setValue(
                        parsedStructure.passwordId,
                        AutofillValue.forText(password),
                        passwordPresentation
                )
                .build()
        ).build()

val replyIntent = Intent().apply {
    // Send the data back to the service.
    putExtra(MY_EXTRA_DATASET_NAME, datasetName)
    putExtra(EXTRA_AUTHENTICATION_RESULT, fillResponse)
}

setResult(Activity.RESULT_OK, replyIntent)
```

### Java

```java
Intent intent = getIntent();

// The data sent by the service and the structure are included in the intent.
String datasetName = intent.getStringExtra(MY_EXTRA_DATASET_NAME);
AssistStructure structure = intent.getParcelableExtra(EXTRA_ASSIST_STRUCTURE);
ParsedStructure parsedStructure = parseStructure(structure);
UserData userData = fetchUserData(parsedStructure);

// Build the presentation of the datasets.
RemoteViews usernamePresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
usernamePresentation.setTextViewText(android.R.id.text1, "my_username");
RemoteViews passwordPresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
passwordPresentation.setTextViewText(android.R.id.text1, "Password for my_username");

// Add the dataset to the response.
FillResponse fillResponse = new FillResponse.Builder()
        .addDataset(new Dataset.Builder()
                .setValue(parsedStructure.usernameId,
                        AutofillValue.forText(userData.username), usernamePresentation)
                .setValue(parsedStructure.passwordId,
                        AutofillValue.forText(userData.password), passwordPresentation)
                .build())
        .build();

Intent replyIntent = new Intent();

// Send the data back to the service.
replyIntent.putExtra(MY_EXTRA_DATASET_NAME, datasetName);
replyIntent.putExtra(EXTRA_AUTHENTICATION_RESULT, fillResponse);

setResult(RESULT_OK, replyIntent);
```

In the scenario where a credit card dataset needs to be unlocked, the service can display UI asking for the CVC. You can hide the data until the dataset is unlocked by presenting boilerplate data, such as the name of the bank and the last four digits of the credit card number. The following example shows how to require authentication for a dataset and hide the data until the user provides the CVC:

### Kotlin

```kotlin
// Parse the structure and fetch payment data.
val parsedStructure: ParsedStructure = parseStructure(structure)
val paymentData: Payment = fetchPaymentData(parsedStructure)

// Build the presentation that shows the bank and the last four digits of the credit card number.
// For example 'Bank-1234'.
val maskedPresentation: String = "${paymentData.bank}-" +
        paymentData.creditCardNumber.substring(paymentData.creditCardNumber.length - 4)
val authPresentation = RemoteViews(packageName, android.R.layout.simple_list_item_1).apply {
    setTextViewText(android.R.id.text1, maskedPresentation)
}

// Prepare an intent that displays the UI that asks for the CVC.
val cvcIntent = Intent(this, CvcActivity::class.java)
val cvcIntentSender: IntentSender = PendingIntent.getActivity(
        this,
        1001,
        cvcIntent,
        PendingIntent.FLAG_CANCEL_CURRENT
).intentSender

// Build a FillResponse object that includes a Dataset that requires authentication.
val fillResponse: FillResponse = FillResponse.Builder()
        .addDataset(
                Dataset.Builder()
                        // The values in the dataset are replaced by the actual
                        // data once the user provides the CVC.
                        .setValue(parsedStructure.creditCardId, null, authPresentation)
                        .setValue(parsedStructure.expDateId, null, authPresentation)
                        .setAuthentication(cvcIntentSender)
                        .build()
        ).build()
```

### Java

```java
// Parse the structure and fetch payment data.
ParsedStructure parsedStructure = parseStructure(structure);
Payment paymentData = fetchPaymentData(parsedStructure);

// Build the presentation that shows the bank and the last four digits of the credit card number.
// For example 'Bank-1234'.
String maskedPresentation = paymentData.bank + "-" +
    paymentData.creditCardNumber.subString(paymentData.creditCardNumber.length - 4);
RemoteViews authPresentation = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);
authPresentation.setTextViewText(android.R.id.text1, maskedPresentation);

// Prepare an intent that displays the UI that asks for the CVC.
Intent cvcIntent = new Intent(this, CvcActivity.class);
IntentSender cvcIntentSender = PendingIntent.getActivity(
        this,
        1001,
        cvcIntent,
        PendingIntent.FLAG_CANCEL_CURRENT
).getIntentSender();

// Build a FillResponse object that includes a Dataset that requires authentication.
FillResponse fillResponse = new FillResponse.Builder()
        .addDataset(new Dataset.Builder()
                // The values in the dataset are replaced by the actual
                // data once the user provides the CVC.
                .setValue(parsedStructure.creditCardId, null, authPresentation)
                .setValue(parsedStructure.expDateId, null, authPresentation)
                .setAuthentication(cvcIntentSender)
                .build())
        .build();
```

Once the activity validates the CVC, it should call the `setResult()` method passing a `RESULT_OK` value and set the `EXTRA_AUTHENTICATION_RESULT` extra to a `Dataset` object that contains the credit card number and expiration date. The new dataset replaces the dataset that requires authentication and the views are filled out immediately. The following code shows an example of how to return the dataset once the user provides the CVC:

### Kotlin

```kotlin
// Parse the structure and fetch payment data.
val parsedStructure: ParsedStructure = parseStructure(structure)
val paymentData: Payment = fetchPaymentData(parsedStructure)

// Build a non-null RemoteViews object that we can use as the presentation when
// creating the Dataset object. This presentation isn't actually used, but the
// Builder object requires a non-null presentation.
val notUsed = RemoteViews(packageName, android.R.layout.simple_list_item_1)

// Create a dataset with the credit card number and expiration date.
val responseDataset: Dataset = Dataset.Builder()
        .setValue(
                parsedStructure.creditCardId,
                AutofillValue.forText(paymentData.creditCardNumber),
                notUsed
        )
        .setValue(
                parsedStructure.expDateId,
                AutofillValue.forText(paymentData.expirationDate),
                notUsed
        )
        .build()

val replyIntent = Intent().apply {
    putExtra(EXTRA_AUTHENTICATION_RESULT, responseDataset)
}
```

### Java

```java
// Parse the structure and fetch payment data.
ParsedStructure parsedStructure = parseStructure(structure);
Payment paymentData = fetchPaymentData(parsedStructure);

// Build a non-null RemoteViews object that we can use as the presentation when
// creating the Dataset object. This presentation isn't actually used, but the
// Builder object requires a non-null presentation.
RemoteViews notUsed = new RemoteViews(getPackageName(), android.R.layout.simple_list_item_1);

// Create a dataset with the credit card number and expiration date.
Dataset responseDataset = new Dataset.Builder()
        .setValue(parsedStructure.creditCardId,
                AutofillValue.forText(paymentData.creditCardNumber), notUsed)
        .setValue(parsedStructure.expDateId,
                AutofillValue.forText(paymentData.expirationDate), notUsed)
        .build();

Intent replyIntent = new Intent();
replyIntent.putExtra(EXTRA_AUTHENTICATION_RESULT, responseDataset);
```

Organize the data in logical groups
-----------------------------------

Autofill services should organize the data in logical groups that isolate concepts from different domains. These logical groups are referred to as _partitions_ in this page. The following list shows typical examples of partitions and fields:

*   Credentials, which includes username and password fields.
*   Address, which includes street, city, state, and zip code fields.
*   Payment information, which includes credit card number, expiration date, and verification code fields.

An autofill service that correctly partitions data is able to better protect the data of its users by not exposing data from more than one partition in a dataset. For example, a dataset that includes credentials not necessarily should include payment information. Organizing your data in partitions allows your service to expose the minimum amount of information required to satisfy a request.

Organizing the data in partitions enables services to fill activities that have views from multiple partitions while sending the minimum amount of data to the client app. For example, consider an activity that includes views for username, password, street, and city, and an autofill service that has the following data:

Partition

Field 1

Field 2

Credentials

work_username

work_password

personal_username

personal_password

Address

work_street

work_city

personal_street

personal_city

The service can prepare a dataset that includes the credentials partition for both, the work and personal accounts. When the user chooses one, a subsequent autofill response can provide either, the work or the personal address, depending on the user's first choice.

A service can identify the field that originated the request by calling the `isFocused()` method while traversing the `AssistStructure` object. This allows services to prepare a `FillResponse` with the appropriate partition data.

SMS one-time code autofill
--------------------------

Your autofill service can assist the user in filling one-time codes sent via SMS by using the SMS Retriever API.

To use this feature, these requirements must be met:

*   The Autofill service is running on Android 9 (API level 28) or higher
*   The user has granted consent for your autofill service to read one-time codes from SMS
*   The application that you are providing autofill for is not already using the SMS Retriever API to read one-time codes

Your autofill service can use `SmsCodeAutofillClient`, available by calling `SmsCodeRetriever.getAutofillClient()` from Google Play Services `19.0.56` or higher.

The primary steps of using this API in an Autofill service are:

1.  In the Autofill Service, use `hasOngoingSmsRequest` from `SmsCodeAutofillClient` to determine if there are already any requests active for the package name of the application you're autofilling. Your autofill service should only display a suggestion prompt if this returns `false`.
2.  In the Autofill Service, use `checkPermissionState` from `SmsCodeAutofillClient` to check if the autofill service has permission to autofill one-time codes. This permission state could be `NONE`, `GRANTED`, or `DENIED`. The Autofill service should display a suggestion prompt for `NONE` and `GRANTED` states.
3.  In the Autofill authentication activity, use the `SmsRetriever.SEND_PERMISSION` permission to register a `BroadcastReceiver` listening for `SmsCodeRetriever.SMS_CODE_RETRIEVED_ACTION` to receive the SMS code result once it's available.
4.  Call `startSmsCodeRetriever` on `SmsCodeAutofillClient` to start listening for one-time codes sent via SMS. If the user has granted permissions for your autofill service to retrieve one-time codes from SMS, this will look for SMS messages received in the last minute through five minutes from now.
    
    If your autofill service needs to request user permission to read one-time codes, then the `Task` returned by `startSmsCodeRetriever` may fail with a `ResolvableApiException` returned. If this happens, you should call the `ResolvableApiException`’s `startResolutionForResult()` method to display a consent dialog for permission request.
    
5.  Receive SMS code result from the intent and then return the SMS code as an autofill response.
    

Advanced autofill scenarios
---------------------------

Integrate with keyboard

Beginning with Android 11, the platform allows keyboards and other input-method editors (_IMEs_) to display autofill suggestions inline, instead of using a pulldown menu. For more information on how your autofill service can support this functionality, see Integrating autofill with keyboards.

Paginate datasets

A large autofill response can exceed the allowed transaction size of the `Binder` object that represents the remotable object required to process the request. To prevent Android system from throwing an exception in these scenarios, you can keep the `FillResponse` small by adding no more than 20 `Dataset` objects at a time. If your response needs more datasets, you can add a dataset that lets users know that there's more information and retrieves the next group of datasets when selected. For more information, see `addDataset(Dataset)`.

Saving data split in multiple screens

Apps often split the user data in multiple screens in the same activity, especially in activities used to create a new user account. For example, the first screen asks for a username, and if the username is available, it moves to a second screen, which asks for a password. In these situations, the autofill service must wait until the user enters both fields before the autofill save UI can be shown. A service can follow these steps to handle such scenarios:

1.  In the first fill request), the service adds a client state bundle) in the response, containing the autofill IDs of the partial fields present in the screen.
2.  In the second fill request), the service retrieves the client state bundle, gets the autofill IDs set in the previous request from the client state, and adds these IDs and the `FLAG_SAVE_ON_ALL_VIEWS_INVISIBLE` flag to the `SaveInfo` object used in the second response.
3.  In the save request), the service uses the proper `FillContext` objects to get the value of each field. There is one fill context per fill request.

For more information, see Saving when data is split in multiple screens.

Provide initialization and teardown logic for each request

Every time there's an autofill request, the Android system binds to the service and calls its `onConnected()` method. Once the service processes the request, the Android system calls the `onDisconnected()` method and unbinds from the service. You can implement `onConnected()` to provide code that runs before processing a request and `onDisconnected()` to provide code that runs after processing a request.

Customize the autofill save UI

Autofill services can customize the autofill save UI to help users decide if they want to allow the service to save their data. Services can provide additional information about what would be saved either through a simple text or through a customized view. Services can also change the appearance of the button that cancels the save request and get a notification when the user taps that button. For more information, see the `SaveInfo` reference documentation.

Compatibility mode

The compatibility mode allows autofill services to use the accessibility virtual structure for autofill purposes. It's particularly useful for providing autofill functionality in browsers that haven't explicitly implemented the autofill APIs yet.

To test your autofill service using compatibility mode, you must explicitly allowlist the browser or app that requires compatibility mode. You can check which packages are already allowlisted by running the following command:

$ adb shell settings get global autofill_compat_mode_allowed_packages

If the package you're testing isn't listed, you can add it by running this command:

$ adb shell settings put global autofill_compat_mode_allowed_packages pkg1[resId1]:pkg2[resId1,resId2]

...where `pkgX` is the package of the app. If the app is a browser, then you use `resIdx` to specify the resource ID of the input field that contains the URL of the rendered page.

Compatibility mode has the following limitations:

*   A save request is triggered when the service uses the FLAG_SAVE_ON_ALL_VIEWS_INVISIBLE flag or the `setTrigger()` method is called. `FLAG_SAVE_ON_ALL_VIEWS_INVISIBLE` is set by default when using compatibility mode.
*   The text value of the nodes might not be available in the `onSaveRequest(SaveRequest, SaveCallback)` method.

For more information about compatibility mode, including the limitations associated with it, see the `AutofillService` class reference.