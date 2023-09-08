# Common Intents 

An intent allows you to start an activity in another app by describing a simple action you'd like to perform (such as "view a map" or "take a picture") in an `Intent` object. This type of intent is called an _implicit_ intent because it does not specify the app component to start, but instead specifies an _action_ and provides some _data_ with which to perform the action.

When you call `startActivity()` or `startActivityForResult()` and pass it an implicit intent, the system resolves the intent to an app that can handle the intent and starts its corresponding `Activity`. If there's more than one app that can handle the intent, the system presents the user with a dialog to pick which app to use.

This page describes several implicit intents that you can use to perform common actions, organized by the type of app that handles the intent. Each section also shows how you can create an intent filter to advertise your app's ability to perform the same action.

**Caution:** If there are no apps on the device that can receive the implicit intent, your app will crash when it calls `startActivity()`. To first verify that an app exists to receive the intent, call `resolveActivity()` on your `Intent` object. If the result is non-null, there is at least one app that can handle the intent and it's safe to call `startActivity()`. If the result is null, you should not use the intent and, if possible, you should disable the feature that invokes the intent.

If you're not familiar with how to create intents or intent filters, you should first read Intents and Intent Filters.

To create a new alarm, use the `ACTION_SET_ALARM` action and specify alarm details such as the time and message using extras defined below.

**Note:** Only the hour, minutes, and message extras are available in Android 2.3 (API level 9) and lower. The other extras were added in later versions of the platform.

To create a countdown timer, use the `ACTION_SET_TIMER` action and specify timer details such as the duration using extras defined below.

**Note:** This intent was added in Android 4.4 (API level 19).

Although not many apps will invoke this intent (it's primarily used by system apps), any app that behaves as an alarm clock should implement this intent filter and respond by showing the list of current alarms.

**Note:** This intent was added in Android 4.4 (API level 19).

To add a new event to the user's calendar, use the `ACTION_INSERT` action and specify the data URI with `Events.CONTENT_URI`. You can then specify various event details using extras defined below.

To open a camera app and receive the resulting photo or video, use the `ACTION_IMAGE_CAPTURE` or `ACTION_VIDEO_CAPTURE` action. Also specify the URI location where you'd like the camera to save the photo or video, in the `EXTRA_OUTPUT` extra.

When the camera app successfully returns focus to your activity (your app receives the `onActivityResult()` callback), you can access the photo or video at the URI you specified with the `EXTRA_OUTPUT` value.

**Note:** When you use `ACTION_IMAGE_CAPTURE` to capture a photo, the camera may also return a downscaled copy (a thumbnail) of the photo in the result `Intent`, saved as a `Bitmap` in an extra field named `"data"`.

To do this when working beyond Anroid 11, refer to the example intent below.

### Kotlin

```kotlin
val REQUEST_IMAGE_CAPTURE = 1

private fun dispatchTakePictureIntent() {
    val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
    try {
        startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
    } catch (e: ActivityNotFoundException) {
        // display error state to the user
    }
}
```

### Java

```java
static final int REQUEST_IMAGE_CAPTURE = 1;

private void dispatchTakePictureIntent() {
    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    try {
        startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
    } catch (ActivityNotFoundException e) {
        // display error state to the user
    }
}
```

For more information about how to use this intent to capture a photo, including how to create an appropriate `Uri` for the output location, read Taking Photos Simply or Taking Videos Simply.

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.media.action.IMAGE_CAPTURE" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

When handling this intent, your activity should check for the `EXTRA_OUTPUT` extra in the incoming `Intent`, then save the captured image or video at the location specified by that extra and call `setResult()` with an `Intent` that includes a compressed thumbnail in an extra named `"data"`.

### Start a camera app in still image mode

Google Voice Actions

*   "take a picture"

To open a camera app in still image mode, use the `INTENT_ACTION_STILL_IMAGE_CAMERA` action.

**Action**

`INTENT_ACTION_STILL_IMAGE_CAMERA`

**Data URI Scheme**

None

**MIME Type**

None

**Extras**

None

**Example intent:**

### Kotlin

```kotlin
private fun dispatchTakePictureIntent() {
    val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
    try {
        startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
    } catch (e: ActivityNotFoundException) {
        // display error state to the user
    }
}
```

### Java

```java
public void capturePhoto(String targetFilename) {
    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    intent.putExtra(MediaStore.EXTRA_OUTPUT,
            Uri.withAppendedPath(locationForPhotos, targetFilename));
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.media.action.STILL_IMAGE_CAMERA" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

### Start a camera app in video mode

Google Voice Actions

*   "record a video"

To open a camera app in video mode, use the `INTENT_ACTION_VIDEO_CAMERA` action.

**Action**

`INTENT_ACTION_VIDEO_CAMERA`

**Data URI Scheme**

None

**MIME Type**

None

**Extras**

None

**Example intent:**

### Kotlin

```kotlin
fun capturePhoto() {
    val intent = Intent(MediaStore.INTENT_ACTION_VIDEO_CAMERA)
    if (intent.resolveActivity(packageManager) != null) {
        startActivityForResult(intent, REQUEST_IMAGE_CAPTURE)
    }
}
```

### Java

```java
public void capturePhoto() {
    Intent intent = new Intent(MediaStore.INTENT_ACTION_VIDEO_CAMERA);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivityForResult(intent, REQUEST_IMAGE_CAPTURE);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.media.action.VIDEO_CAMERA" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

### Select a contact

To have the user select a contact and provide your app access to all the contact information, use the `ACTION_PICK` action and specify the MIME type to `Contacts.CONTENT_TYPE`.

The result `Intent` delivered to your `onActivityResult()` callback contains the `content:` URI pointing to the selected contact. The response grants your app temporary permissions to read that contact using the Contacts Provider API even if your app does not include the `READ_CONTACTS` permission.

**Tip:** If you need access to only a specific piece of contact information, such as a phone number or email address, instead see the next section about how to select specific contact data.

**Action**

`ACTION_PICK`

**Data URI Scheme**

None

**MIME Type**

`Contacts.CONTENT_TYPE`

**Example intent:**

### Kotlin

```kotlin
const val REQUEST_SELECT_CONTACT = 1

fun selectContact() {
    val intent = Intent(Intent.ACTION_PICK).apply {
        type = ContactsContract.Contacts.CONTENT_TYPE
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivityForResult(intent, REQUEST_SELECT_CONTACT)
    }
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode == REQUEST_SELECT_CONTACT && resultCode == RESULT_OK) {
        val contactUri: Uri = data.data
        // Do something with the selected contact at contactUri
        //...
    }
}
```

### Java

```java
static final int REQUEST_SELECT_CONTACT = 1;

public void selectContact() {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivityForResult(intent, REQUEST_SELECT_CONTACT);
    }
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_SELECT_CONTACT && resultCode == RESULT_OK) {
        Uri contactUri = data.getData();
        // Do something with the selected contact at contactUri
        ...
    }
}
```

For information about how to retrieve contact details once you have the contact URI, read Retrieving Details for a Contact.

When you retrieve the contact URI using the above intent, you generally don't need the `READ_CONTACTS` permission to read basic details for that contact, such as display name and whether the contact is starred. However, if you're trying to read more specific data about a given contact—such as their phone number or email address—you need the `READ_CONTACTS` permission.

### Select specific contact data

To have the user select a specific piece of information from a contact, such as a phone number, email address, or other data type, use the `ACTION_PICK` action and specify the MIME type to one of the content types listed below, such as `CommonDataKinds.Phone.CONTENT_TYPE` to get the contact's phone number.

**Note:** In many cases, your app needs to have the `READ_CONTACTS` permission in order to view specific information about a particular contact.

If you need to retrieve only one type of data from a contact, this technique with a `CONTENT_TYPE` from the `ContactsContract.CommonDataKinds` classes is more efficient than using the `Contacts.CONTENT_TYPE` (as shown in the previous section) because the result provides you direct access to the desired data without requiring you to perform a more complex query to Contacts Provider.

The result `Intent` delivered to your `onActivityResult()` callback contains the `content:` URI pointing to the selected contact data. The response grants your app temporary permissions to read that contact data even if your app does not include the `READ_CONTACTS` permission.

**Action**

`ACTION_PICK`

**Data URI Scheme**

None

**MIME Type**

`CommonDataKinds.Phone.CONTENT_TYPE`

Pick from contacts with a phone number.

`CommonDataKinds.Email.CONTENT_TYPE`

Pick from contacts with an email address.

`CommonDataKinds.StructuredPostal.CONTENT_TYPE`

Pick from contacts with a postal address.

Or one of many other `CONTENT_TYPE` values under `ContactsContract`.

**Example intent:**

### Kotlin

```kotlin
const val REQUEST_SELECT_PHONE_NUMBER = 1

fun selectContact() {
    // Start an activity for the user to pick a phone number from contacts
    val intent = Intent(Intent.ACTION_PICK).apply {
        type = CommonDataKinds.Phone.CONTENT_TYPE
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivityForResult(intent, REQUEST_SELECT_PHONE_NUMBER)
    }
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode == REQUEST_SELECT_PHONE_NUMBER && resultCode == Activity.RESULT_OK) {
        // Get the URI and query the content provider for the phone number
        val contactUri: Uri = data.data
        val projection: Array<String> = arrayOf(CommonDataKinds.Phone.NUMBER)
        contentResolver.query(contactUri, projection, null, null, null).use { cursor ->
            // If the cursor returned is valid, get the phone number
            if (cursor.moveToFirst()) {
                val numberIndex = cursor.getColumnIndex(CommonDataKinds.Phone.NUMBER)
                val number = cursor.getString(numberIndex)
                // Do something with the phone number
                ...
            }
        }
    }
}
```

### Java

```java
static final int REQUEST_SELECT_PHONE_NUMBER = 1;

public void selectContact() {
    // Start an activity for the user to pick a phone number from contacts
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType(CommonDataKinds.Phone.CONTENT_TYPE);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivityForResult(intent, REQUEST_SELECT_PHONE_NUMBER);
    }
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_SELECT_PHONE_NUMBER && resultCode == RESULT_OK) {
        // Get the URI and query the content provider for the phone number
        Uri contactUri = data.getData();
        String[] projection = new String[]{CommonDataKinds.Phone.NUMBER};
        Cursor cursor = getContentResolver().query(contactUri, projection,
                null, null, null);
        // If the cursor returned is valid, get the phone number
        if (cursor != null && cursor.moveToFirst()) {
            int numberIndex = cursor.getColumnIndex(CommonDataKinds.Phone.NUMBER);
            String number = cursor.getString(numberIndex);
            // Do something with the phone number
            //...
        }
    }
}
```

### View a contact

To display the details for a known contact, use the `ACTION_VIEW` action and specify the contact with a `content:` URI as the intent data.

There are primarily two ways to initially retrieve the contact's URI:

*   Use the contact URI returned by the `ACTION_PICK`, shown in the previous section (this approach does not require any app permissions).
*   Access the list of all contacts directly, as described in Retrieving a List of Contacts (this approach requires the `READ_CONTACTS` permission).

**Action**

`ACTION_VIEW`

**Data URI Scheme**

`content:<URI>`

**MIME Type**

None. The type is inferred from contact URI.

**Example intent:**

### Kotlin

```kotlin
fun viewContact(contactUri: Uri) {
    val intent = Intent(Intent.ACTION_VIEW, contactUri)
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void viewContact(Uri contactUri) {
    Intent intent = new Intent(Intent.ACTION_VIEW, contactUri);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

### Edit an existing contact

To edit a known contact, use the `ACTION_EDIT` action, specify the contact with a `content:` URI as the intent data, and include any known contact information in extras specified by constants in `ContactsContract.Intents.Insert`.

There are primarily two ways to initially retrieve the contact URI:

*   Use the contact URI returned by the `ACTION_PICK`, shown in the previous section (this approach does not require any app permissions).
*   Access the list of all contacts directly, as described in Retrieving a List of Contacts (this approach requires the `READ_CONTACTS` permission).

**Action**

`ACTION_EDIT`

**Data URI Scheme**

`content:<URI>`

**MIME Type**

The type is inferred from contact URI.

**Extras**

One or more of the extras defined in `ContactsContract.Intents.Insert` so you can populate fields of the contact details.

**Example intent:**

### Kotlin

```kotlin
fun editContact(contactUri: Uri, email: String) {
    val intent = Intent(Intent.ACTION_EDIT).apply {
        data = contactUri
        putExtra(ContactsContract.Intents.Insert.EMAIL, email)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void editContact(Uri contactUri, String email) {
    Intent intent = new Intent(Intent.ACTION_EDIT);
    intent.setData(contactUri);
    intent.putExtra(Intents.Insert.EMAIL, email);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

For more information about how to edit a contact, read Modifying Contacts Using Intents.

### Insert a contact

To insert a new contact, use the `ACTION_INSERT` action, specify `Contacts.CONTENT_TYPE` as the MIME type, and include any known contact information in extras specified by constants in `ContactsContract.Intents.Insert`.

**Action**

`ACTION_INSERT`

**Data URI Scheme**

None

**MIME Type**

`Contacts.CONTENT_TYPE`

**Extras**

One or more of the extras defined in `ContactsContract.Intents.Insert`.

**Example intent:**

### Kotlin

```kotlin
fun insertContact(name: String, email: String) {
    val intent = Intent(Intent.ACTION_INSERT).apply {
        type = ContactsContract.Contacts.CONTENT_TYPE
        putExtra(ContactsContract.Intents.Insert.NAME, name)
        putExtra(ContactsContract.Intents.Insert.EMAIL, email)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void insertContact(String name, String email) {
    Intent intent = new Intent(Intent.ACTION_INSERT);
    intent.setType(Contacts.CONTENT_TYPE);
    intent.putExtra(Intents.Insert.NAME, name);
    intent.putExtra(Intents.Insert.EMAIL, email);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

For more information about how to insert a contact, read Modifying Contacts Using Intents.

Email
-----

### Compose an email with optional attachments

To compose an email, use one of the below actions based on whether you'll include attachments, and include email details such as the recipient and subject using the extra keys listed below.

**Action**

`ACTION_SENDTO` (for no attachment) or  
`ACTION_SEND` (for one attachment) or  
`ACTION_SEND_MULTIPLE` (for multiple attachments)

**Data URI Scheme**

None

**MIME Type**

`"text/plain"`

`"*/*"`

**Extras**

`Intent.EXTRA_EMAIL`

A string array of all "To" recipient email addresses.

`Intent.EXTRA_CC`

A string array of all "CC" recipient email addresses.

`Intent.EXTRA_BCC`

A string array of all "BCC" recipient email addresses.

`Intent.EXTRA_SUBJECT`

A string with the email subject.

`Intent.EXTRA_TEXT`

A string with the body of the email.

`Intent.EXTRA_STREAM`

A `Uri` pointing to the attachment. If using the `ACTION_SEND_MULTIPLE` action, this should instead be an `ArrayList` containing multiple `Uri` objects.

**Example intent:**

### Kotlin

```kotlin
fun composeEmail(addresses: Array<String>, subject: String, attachment: Uri) {
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "*/*"
        putExtra(Intent.EXTRA_EMAIL, addresses)
        putExtra(Intent.EXTRA_SUBJECT, subject)
        putExtra(Intent.EXTRA_STREAM, attachment)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void composeEmail(String[] addresses, String subject, Uri attachment) {
    Intent intent = new Intent(Intent.ACTION_SEND);
    intent.setType("*/*");
    intent.putExtra(Intent.EXTRA_EMAIL, addresses);
    intent.putExtra(Intent.EXTRA_SUBJECT, subject);
    intent.putExtra(Intent.EXTRA_STREAM, attachment);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

If you want to ensure that your intent is handled only by an email app (and not other text messaging or social apps), then use the `ACTION_SENDTO` action and include the `"mailto:"` data scheme. For example:

### Kotlin

```kotlin
fun composeEmail(addresses: Array<String>, subject: String) {
    val intent = Intent(Intent.ACTION_SENDTO).apply {
        data = Uri.parse("mailto:") // only email apps should handle this
        putExtra(Intent.EXTRA_EMAIL, addresses)
        putExtra(Intent.EXTRA_SUBJECT, subject)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void composeEmail(String[] addresses, String subject) {
    Intent intent = new Intent(Intent.ACTION_SENDTO);
    intent.setData(Uri.parse("mailto:")); // only email apps should handle this
    intent.putExtra(Intent.EXTRA_EMAIL, addresses);
    intent.putExtra(Intent.EXTRA_SUBJECT, subject);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <data android:type="*/*" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SENDTO" />
        <data android:scheme="mailto" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

File Storage
------------

### Retrieve a specific type of file

To request that the user select a file such as a document or photo and return a reference to your app, use the `ACTION_GET_CONTENT` action and specify your desired MIME type. The file reference returned to your app is transient to your activity's current lifecycle, so if you want to access it later you must import a copy that you can read later. This intent also allows the user to create a new file in the process (for example, instead of selecting an existing photo, the user can capture a new photo with the camera).

The result intent delivered to your `onActivityResult()` method includes data with a URI pointing to the file. The URI could be anything, such as an `http:` URI, `file:` URI, or `content:` URI. However, if you'd like to restrict selectable files to only those that are accessible from a content provider (a `content:` URI) and that are available as a file stream with `openFileDescriptor()`, you should add the `CATEGORY_OPENABLE` category to your intent.

On Android 4.3 (API level 18) and higher, you can also allow the user to select multiple files by adding `EXTRA_ALLOW_MULTIPLE` to the intent, set to `true`. You can then access each of the selected files in a `ClipData` object returned by `getClipData()`.

**Action**

`ACTION_GET_CONTENT`

**Data URI Scheme**

None

**MIME Type**

The MIME type corresponding to the file type the user should select.

**Extras**

`EXTRA_ALLOW_MULTIPLE`

A boolean declaring whether the user can select more than one file at a time.

`EXTRA_LOCAL_ONLY`

A boolean that declares whether the returned file must be available directly from the device, rather than requiring a download from a remote service.

**Category** (optional)

`CATEGORY_OPENABLE`

To return only "openable" files that can be represented as a file stream with `openFileDescriptor()`.

**Example intent to get a photo:**

### Kotlin

```kotlin
const val REQUEST_IMAGE_GET = 1

fun selectImage() {
    val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
        type = "image/*"
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivityForResult(intent, REQUEST_IMAGE_GET)
    }
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode == REQUEST_IMAGE_GET && resultCode == Activity.RESULT_OK) {
        val thumbnail: Bitmap = data.getParcelableExtra("data")
        val fullPhotoUri: Uri = data.data
        // Do work with photo saved at fullPhotoUri
        ...
    }
}
```

### Java

```java
static final int REQUEST_IMAGE_GET = 1;

public void selectImage() {
    Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
    intent.setType("image/*");
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivityForResult(intent, REQUEST_IMAGE_GET);
    }
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_IMAGE_GET && resultCode == RESULT_OK) {
        Bitmap thumbnail = data.getParcelable("data");
        Uri fullPhotoUri = data.getData();
        // Do work with photo saved at fullPhotoUri
        ...
    }
}
```

**Example intent filter to return a photo:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.GET_CONTENT" />
        <data android:type="image/*" />
        <category android:name="android.intent.category.DEFAULT" />
        <!-- The OPENABLE category declares that the returned file is accessible
             from a content provider that supports OpenableColumns
             and ContentResolver.openFileDescriptor() -->
        <category android:name="android.intent.category.OPENABLE" />
    </intent-filter>
</activity>
```

### Open a specific type of file

Instead of retrieving a copy of a file that you must import to your app (by using the `ACTION_GET_CONTENT` action), when running on Android 4.4 or higher, you can instead request to _open_ a file that's managed by another app by using the `ACTION_OPEN_DOCUMENT` action and specifying a MIME type. To also allow the user to instead create a new document that your app can write to, use the `ACTION_CREATE_DOCUMENT` action instead. For example, instead of selecting from existing PDF documents, the `ACTION_CREATE_DOCUMENT` intent allows users to select where they'd like to create a new document (within another app that manages the document's storage)—your app then receives the URI location of where it can write the new document.

Whereas the intent delivered to your `onActivityResult()` method from the `ACTION_GET_CONTENT` action may return a URI of any type, the result intent from `ACTION_OPEN_DOCUMENT` and `ACTION_CREATE_DOCUMENT` always specify the chosen file as a `content:` URI that's backed by a `DocumentsProvider`. You can open the file with `openFileDescriptor()` and query its details using columns from `DocumentsContract.Document`.

The returned URI grants your app long-term read access to the file (also possibly with write access). So the `ACTION_OPEN_DOCUMENT` action is particularly useful (instead of using `ACTION_GET_CONTENT`) when you want to read an existing file without making a copy into your app, or when you want to open and edit a file in place.

You can also allow the user to select multiple files by adding `EXTRA_ALLOW_MULTIPLE` to the intent, set to `true`. If the user selects just one item, then you can retrieve the item from `getData()`. If the user selects more than one item, then `getData()` returns null and you must instead retrieve each item from a `ClipData` object that is returned by `getClipData()`.

**Note:** Your intent **must** specify a MIME type and **must** declare the `CATEGORY_OPENABLE` category. If appropriate, you can specify more than one MIME type by adding an array of MIME types with the `EXTRA_MIME_TYPES` extra—if you do so, you must set the primary MIME type in `setType()` to `"*/*"`.

**Action**

`ACTION_OPEN_DOCUMENT` or  
`ACTION_CREATE_DOCUMENT`

**Data URI Scheme**

None

**MIME Type**

The MIME type corresponding to the file type the user should select.

**Extras**

`EXTRA_MIME_TYPES`

An array of MIME types corresponding to the types of files your app is requesting. When you use this extra, you must set the primary MIME type in `setType()` to `"*/*"`.

`EXTRA_ALLOW_MULTIPLE`

A boolean that declares whether the user can select more than one file at a time.

`EXTRA_TITLE`

For use with `ACTION_CREATE_DOCUMENT` to specify an initial file name.

`EXTRA_LOCAL_ONLY`

A boolean that declares whether the returned file must be available directly from the device, rather than requiring a download from a remote service.

**Category**

`CATEGORY_OPENABLE`

To return only "openable" files that can be represented as a file stream with `openFileDescriptor()`.

**Example intent to get a photo:**

### Kotlin

```kotlin
const val REQUEST_IMAGE_OPEN = 1

fun selectImage2() {
    val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
        type = "image/*"
        addCategory(Intent.CATEGORY_OPENABLE)
    }
    // Only the system receives the ACTION_OPEN_DOCUMENT, so no need to test.
    startActivityForResult(intent, REQUEST_IMAGE_OPEN)
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode == REQUEST_IMAGE_OPEN && resultCode == Activity.RESULT_OK) {
        val fullPhotoUri: Uri = data.data
        // Do work with full size photo saved at fullPhotoUri
        ...
    }
}
```

### Java

```java
static final int REQUEST_IMAGE_OPEN = 1;

public void selectImage() {
    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
    intent.setType("image/*");
    intent.addCategory(Intent.CATEGORY_OPENABLE);
    // Only the system receives the ACTION_OPEN_DOCUMENT, so no need to test.
    startActivityForResult(intent, REQUEST_IMAGE_OPEN);
}

@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == REQUEST_IMAGE_OPEN && resultCode == RESULT_OK) {
        Uri fullPhotoUri = data.getData();
        // Do work with full size photo saved at fullPhotoUri
        ...
    }
}
```

Third party apps cannot actually respond to an intent with the `ACTION_OPEN_DOCUMENT` action. Instead, the system receives this intent and displays all the files available from various apps in a unified user interface.

To provide your app's files in this UI and allow other apps to open them, you must implement a `DocumentsProvider` and include an intent filter for `PROVIDER_INTERFACE` (`"android.content.action.DOCUMENTS_PROVIDER"`). For example:

```xml
<provider ...
    android:grantUriPermissions="true"
    android:exported="true"
    android:permission="android.permission.MANAGE_DOCUMENTS">
    <intent-filter>
        <action android:name="android.content.action.DOCUMENTS_PROVIDER" />
    </intent-filter>
</provider>
```

For more information about how to make the files managed by your app openable from other apps, read the Storage Access Framework guide.

Local Actions
-------------

### Call a car

Google Voice Actions

*   "get me a taxi"
*   "call me a car"

(Wear OS only)

To call a taxi, use the `ACTION_RESERVE_TAXI_RESERVATION` action.

**Note:** Apps must ask for confirmation from the user before completing the action.

**Action**

`ACTION_RESERVE_TAXI_RESERVATION`

**Data URI**

None

**MIME Type**

None

**Extras**

None

**Example intent:**

### Kotlin

```kotlin
fun callCar() {
    val intent = Intent(ReserveIntents.ACTION_RESERVE_TAXI_RESERVATION)
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void callCar() {
    Intent intent = new Intent(ReserveIntents.ACTION_RESERVE_TAXI_RESERVATION);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="com.google.android.gms.actions.RESERVE_TAXI_RESERVATION" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

Maps
----

### Show a location on a map

To open a map, use the `ACTION_VIEW` action and specify the location information in the intent data with one of the schemes defined below.

**Action**

`ACTION_VIEW`

**Data URI Scheme**

`geo:latitude,longitude`

Show the map at the given longitude and latitude.

Example: `"geo:47.6,-122.3"`

`geo:latitude,longitude?z=zoom`

Show the map at the given longitude and latitude at a certain zoom level. A zoom level of 1 shows the whole Earth, centered at the given _lat_,_lng_. The highest (closest) zoom level is 23.

Example: `"geo:47.6,-122.3?z=11"`

`geo:0,0?q=lat,lng(label)`

Show the map at the given longitude and latitude with a string label.

Example: `"geo:0,0?q=34.99,-106.61(Treasure)"`

`geo:0,0?q=my+street+address`

Show the location for "my street address" (may be a specific address or location query).

Example: `"geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA"`

**Note:** All strings passed in the `geo` URI must be encoded. For example, the string `1st & Pike, Seattle` should become `1st%20%26%20Pike%2C%20Seattle`. Spaces in the string can be encoded with `%20` or replaced with the plus sign (`+`).

**MIME Type**

None

**Example intent:**

### Kotlin

```kotlin
fun showMap(geoLocation: Uri) {
    val intent = Intent(Intent.ACTION_VIEW).apply {
        data = geoLocation
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void showMap(Uri geoLocation) {
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(geoLocation);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="geo" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

Music or Video
--------------

### Play a media file

To play a music file, use the `ACTION_VIEW` action and specify the URI location of the file in the intent data.

**Action**

`ACTION_VIEW`

**Data URI Scheme**

`file:<URI>`

`content:<URI>`

`http:<URL>`

**MIME Type**

`"audio/*"`

`"application/ogg"`

`"application/x-ogg"`

`"application/itunes"`

Or any other that your app may require.

**Example intent:**

### Kotlin

```kotlin
fun playMedia(file: Uri) {
    val intent = Intent(Intent.ACTION_VIEW).apply {
        data = file
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void playMedia(Uri file) {
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(file);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <data android:type="audio/*" />
        <data android:type="application/ogg" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

### Play music based on a search query

Google Voice Actions

*   "play michael jackson billie jean"

To play music based on a search query, use the `INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH` intent. An app may fire this intent in response to the user's voice command to play music. The receiving app for this intent performs a search within its inventory to match existing content to the given query and starts playing that content.

This intent should include the `EXTRA_MEDIA_FOCUS` string extra, which specifies the intended search mode. For example, the search mode can specify whether the search is for an artist name or song name.

**Action**

`INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH`

**Data URI Scheme**

None

**MIME Type**

None

**Extras**

`MediaStore.EXTRA_MEDIA_FOCUS` (required)

Indicates the search mode (whether the user is looking for a particular artist, album, song, or playlist). Most search modes take additional extras. For example, if the user is interested in listening to a particular song, the intent might have three additional extras: the song title, the artist, and the album. This intent supports the following search modes for each value of `EXTRA_MEDIA_FOCUS`:

_Any_ - `"vnd.android.cursor.item/*"`

Play any music. The receiving app should play some music based on a smart choice, such as the last playlist the user listened to.

Additional extras:

*   `QUERY` (required) - An empty string. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

_Unstructured_ - `"vnd.android.cursor.item/*"`

Play a particular song, album or genre from an unstructured search query. Apps may generate an intent with this search mode when they can't identify the type of content the user wants to listen to. Apps should use more specific search modes when possible.

Additional extras:

*   `QUERY` (required) - A string that contains any combination of: the artist, the album, the song name, or the genre.

_Genre_ - `Audio.Genres.ENTRY_CONTENT_TYPE`

Play music of a particular genre.

Additional extras:

*   `"android.intent.extra.genre"` (required) - The genre.
*   `QUERY` (required) - The genre. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

_Artist_ - `Audio.Artists.ENTRY_CONTENT_TYPE`

Play music from a particular artist.

Additional extras:

*   `EXTRA_MEDIA_ARTIST` (required) - The artist.
*   `"android.intent.extra.genre"` - The genre.
*   `QUERY` (required) - A string that contains any combination of the artist or the genre. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

_Album_ - `Audio.Albums.ENTRY_CONTENT_TYPE`

Play music from a particular album.

Additional extras:

*   `EXTRA_MEDIA_ALBUM` (required) - The album.
*   `EXTRA_MEDIA_ARTIST` - The artist.
*   `"android.intent.extra.genre"` - The genre.
*   `QUERY` (required) - A string that contains any combination of the album or the artist. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

_Song_ - `"vnd.android.cursor.item/audio"`

Play a particular song.

Additional extras:

*   `EXTRA_MEDIA_ALBUM` - The album.
*   `EXTRA_MEDIA_ARTIST` - The artist.
*   `"android.intent.extra.genre"` - The genre.
*   `EXTRA_MEDIA_TITLE` (required) - The song name.
*   `QUERY` (required) - A string that contains any combination of: the album, the artist, the genre, or the title. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

_Playlist_ - `Audio.Playlists.ENTRY_CONTENT_TYPE`

Play a particular playlist or a playlist that matches some criteria specified by additional extras.

Additional extras:

*   `EXTRA_MEDIA_ALBUM` - The album.
*   `EXTRA_MEDIA_ARTIST` - The artist.
*   `"android.intent.extra.genre"` - The genre.
*   `"android.intent.extra.playlist"` - The playlist.
*   `EXTRA_MEDIA_TITLE` - The song name that the playlist is based on.
*   `QUERY` (required) - A string that contains any combination of: the album, the artist, the genre, the playlist, or the title. This extra is always provided for backward compatibility: existing apps that do not know about search modes can process this intent as an unstructured search.

**Example intent:**

If the user wants to listen to music from a particular artist, a search app may generate the following intent:

### Kotlin

```kotlin
fun playSearchArtist(artist: String) {
    val intent = Intent(MediaStore.INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH).apply {
        putExtra(MediaStore.EXTRA_MEDIA_FOCUS, MediaStore.Audio.Artists.ENTRY_CONTENT_TYPE)
        putExtra(MediaStore.EXTRA_MEDIA_ARTIST, artist)
        putExtra(SearchManager.QUERY, artist)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void playSearchArtist(String artist) {
    Intent intent = new Intent(MediaStore.INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH);
    intent.putExtra(MediaStore.EXTRA_MEDIA_FOCUS,
                    MediaStore.Audio.Artists.ENTRY_CONTENT_TYPE);
    intent.putExtra(MediaStore.EXTRA_MEDIA_ARTIST, artist);
    intent.putExtra(SearchManager.QUERY, artist);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.media.action.MEDIA_PLAY_FROM_SEARCH" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

When handling this intent, your activity should check the value of the `EXTRA_MEDIA_FOCUS` extra in the incoming `Intent` to determine the search mode. Once your activity has identified the search mode, it should read the values of the additional extras for that particular search mode. With this information your app can then perform the search within its inventory to play the content that matches the search query. For example:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ...
    if (intent.action.compareTo(MediaStore.INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH) == 0) {

        val mediaFocus: String? = intent.getStringExtra(MediaStore.EXTRA_MEDIA_FOCUS)
        val query: String? = intent.getStringExtra(SearchManager.QUERY)

        // Some of these extras may not be available depending on the search mode
        val album: String? = intent.getStringExtra(MediaStore.EXTRA_MEDIA_ALBUM)
        val artist: String? = intent.getStringExtra(MediaStore.EXTRA_MEDIA_ARTIST)
        val genre: String? = intent.getStringExtra("android.intent.extra.genre")
        val playlist: String? = intent.getStringExtra("android.intent.extra.playlist")
        val title: String? = intent.getStringExtra(MediaStore.EXTRA_MEDIA_TITLE)

        // Determine the search mode and use the corresponding extras
        when {
            mediaFocus == null -> {
                // 'Unstructured' search mode (backward compatible)
                playUnstructuredSearch(query)
            }
            mediaFocus.compareTo("vnd.android.cursor.item/*") == 0 -> {
                if (query?.isNotEmpty() == true) {
                    // 'Unstructured' search mode
                    playUnstructuredSearch(query)
                } else {
                    // 'Any' search mode
                    playResumeLastPlaylist()
                }
            }
            mediaFocus.compareTo(MediaStore.Audio.Genres.ENTRY_CONTENT_TYPE) == 0 -> {
                // 'Genre' search mode
                playGenre(genre)
            }
            mediaFocus.compareTo(MediaStore.Audio.Artists.ENTRY_CONTENT_TYPE) == 0 -> {
                // 'Artist' search mode
                playArtist(artist, genre)
            }
            mediaFocus.compareTo(MediaStore.Audio.Albums.ENTRY_CONTENT_TYPE) == 0 -> {
                // 'Album' search mode
                playAlbum(album, artist)
            }
            mediaFocus.compareTo("vnd.android.cursor.item/audio") == 0 -> {
                // 'Song' search mode
                playSong(album, artist, genre, title)
            }
            mediaFocus.compareTo(MediaStore.Audio.Playlists.ENTRY_CONTENT_TYPE) == 0 -> {
                // 'Playlist' search mode
                playPlaylist(album, artist, genre, playlist, title)
            }
        }
    }
}
```

### Java

```java
protected void onCreate(Bundle savedInstanceState) {
    //...
    Intent intent = this.getIntent();
    if (intent.getAction().compareTo(MediaStore.INTENT_ACTION_MEDIA_PLAY_FROM_SEARCH) == 0) {

        String mediaFocus = intent.getStringExtra(MediaStore.EXTRA_MEDIA_FOCUS);
        String query = intent.getStringExtra(SearchManager.QUERY);

        // Some of these extras may not be available depending on the search mode
        String album = intent.getStringExtra(MediaStore.EXTRA_MEDIA_ALBUM);
        String artist = intent.getStringExtra(MediaStore.EXTRA_MEDIA_ARTIST);
        String genre = intent.getStringExtra("android.intent.extra.genre");
        String playlist = intent.getStringExtra("android.intent.extra.playlist");
        String title = intent.getStringExtra(MediaStore.EXTRA_MEDIA_TITLE);

        // Determine the search mode and use the corresponding extras
        if (mediaFocus == null) {
            // 'Unstructured' search mode (backward compatible)
            playUnstructuredSearch(query);

        } else if (mediaFocus.compareTo("vnd.android.cursor.item/*") == 0) {
            if (query.isEmpty()) {
                // 'Any' search mode
                playResumeLastPlaylist();
            } else {
                // 'Unstructured' search mode
                playUnstructuredSearch(query);
            }

        } else if (mediaFocus.compareTo(MediaStore.Audio.Genres.ENTRY_CONTENT_TYPE) == 0) {
            // 'Genre' search mode
            playGenre(genre);

        } else if (mediaFocus.compareTo(MediaStore.Audio.Artists.ENTRY_CONTENT_TYPE) == 0) {
            // 'Artist' search mode
            playArtist(artist, genre);

        } else if (mediaFocus.compareTo(MediaStore.Audio.Albums.ENTRY_CONTENT_TYPE) == 0) {
            // 'Album' search mode
            playAlbum(album, artist);

        } else if (mediaFocus.compareTo("vnd.android.cursor.item/audio") == 0) {
            // 'Song' search mode
            playSong(album, artist, genre, title);

        } else if (mediaFocus.compareTo(MediaStore.Audio.Playlists.ENTRY_CONTENT_TYPE) == 0) {
            // 'Playlist' search mode
            playPlaylist(album, artist, genre, playlist, title);
        }
    }
}
```

New Note
--------

### Create a note

To create a new note, use the `ACTION_CREATE_NOTE` action and specify note details such as the subject and text using extras defined below.

**Note:** Apps must ask for confirmation from the user before completing the action.

**Action**

`ACTION_CREATE_NOTE`

**Data URI Scheme**

None

**MIME Type**

`PLAIN_TEXT_TYPE`

"*/*"

**Extras**

`EXTRA_NAME`

A string indicating the title or subject of the note.

`EXTRA_TEXT`

A string indicating the text of the note.

**Example intent:**

### Kotlin

```kotlin
fun createNote(subject: String, text: String) {
    val intent = Intent(NoteIntents.ACTION_CREATE_NOTE).apply {
        putExtra(NoteIntents.EXTRA_NAME, subject)
        putExtra(NoteIntents.EXTRA_TEXT, text)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void createNote(String subject, String text) {
    Intent intent = new Intent(NoteIntents.ACTION_CREATE_NOTE)
            .putExtra(NoteIntents.EXTRA_NAME, subject)
            .putExtra(NoteIntents.EXTRA_TEXT, text);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="com.google.android.gms.actions.CREATE_NOTE" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="*/*" />
    </intent-filter>
</activity>
```

Phone
-----

### Initiate a phone call

To open the phone app and dial a phone number, use the `ACTION_DIAL` action and specify a phone number using the URI scheme defined below. When the phone app opens, it displays the phone number but the user must press the _Call_ button to begin the phone call.

Google Voice Actions

*   "call 555-5555"
*   "call bob"
*   "call voicemail"

To place a phone call directly, use the `ACTION_CALL` action and specify a phone number using the URI scheme defined below. When the phone app opens, it begins the phone call; the user does not need to press the _Call_ button.

The `ACTION_CALL` action requires that you add the `CALL_PHONE` permission to your manifest file:

<uses-permission android:name="android.permission.CALL_PHONE" />

**Action**

*   `ACTION_DIAL` - Opens the dialer or phone app.
*   `ACTION_CALL` - Places a phone call (requires the `CALL_PHONE` permission)

**Data URI Scheme**

*   `tel:<phone-number>`
*   `voicemail:<phone-number>`

**MIME Type**

None

Valid telephone numbers are those defined in the IETF RFC 3966. Valid examples include the following:

*   `tel:2125551212`
*   `tel:(212) 555 1212`

The Phone's dialer is good at normalizing schemes, such as telephone numbers. So the scheme described isn't strictly required in the `Uri.parse()` method. However, if you have not tried a scheme or are unsure whether it can be handled, use the `Uri.fromParts()` method instead.

**Example intent:**

### Kotlin

```kotlin
fun dialPhoneNumber(phoneNumber: String) {
    val intent = Intent(Intent.ACTION_DIAL).apply {
        data = Uri.parse("tel:$phoneNumber")
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void dialPhoneNumber(String phoneNumber) {
    Intent intent = new Intent(Intent.ACTION_DIAL);
    intent.setData(Uri.parse("tel:" + phoneNumber));
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

Search
------

### Search using a specific app

Google Voice Actions

*   "search for cat videos on myvideoapp"

To support search within the context of your app, declare an intent filter in your app with the `SEARCH_ACTION` action, as shown in the example intent filter below.

**Note:** We no longer recommend using `SEARCH_ACTION` for app search. Instead, you should implement the `GET_THING` action to leverage Google Assistant's native support for in-app search. For more information, see the Google Assistant App Actions documentation.

**Action**

`"com.google.android.gms.actions.SEARCH_ACTION"`

Support search queries from Google Voice Actions.

**Extras**

`` `QUERY` ``

A string that contains the search query.

**Example intent filter:**

```xml
<activity android:name=".SearchActivity">
    <intent-filter>
        <action android:name="com.google.android.gms.actions.SEARCH_ACTION"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</activity>
```

### Perform a web search

To initiate a web search, use the `ACTION_WEB_SEARCH` action and specify the search string in the `SearchManager.QUERY` extra.

**Action**

`ACTION_WEB_SEARCH`

**Data URI Scheme**

None

**MIME Type**

None

**Extras**

`SearchManager.QUERY`

The search string.

**Example intent:**

### Kotlin

```kotlin
fun searchWeb(query: String) {
    val intent = Intent(Intent.ACTION_WEB_SEARCH).apply {
        putExtra(SearchManager.QUERY, query)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void searchWeb(String query) {
    Intent intent = new Intent(Intent.ACTION_WEB_SEARCH);
    intent.putExtra(SearchManager.QUERY, query);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

Settings
--------

### Open a specific section of Settings

To open a screen in the system settings when your app requires the user to change something, use one of the following intent actions to open the settings screen respective to the action name.

**Action**

`ACTION_SETTINGS`  
`ACTION_WIRELESS_SETTINGS`  
`ACTION_AIRPLANE_MODE_SETTINGS`  
`ACTION_WIFI_SETTINGS`  
`ACTION_APN_SETTINGS`  
`ACTION_BLUETOOTH_SETTINGS`  
`ACTION_DATE_SETTINGS`  
`ACTION_LOCALE_SETTINGS`  
`ACTION_INPUT_METHOD_SETTINGS`  
`ACTION_DISPLAY_SETTINGS`  
`ACTION_SECURITY_SETTINGS`  
`ACTION_LOCATION_SOURCE_SETTINGS`  
`ACTION_INTERNAL_STORAGE_SETTINGS`  
`ACTION_MEMORY_CARD_SETTINGS`

See the `Settings` documentation for additional settings screens that are available.

**Data URI Scheme**

None

**MIME Type**

None

**Example intent:**

### Kotlin

```kotlin
fun openWifiSettings() {
    val intent = Intent(Settings.ACTION_WIFI_SETTINGS)
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void openWifiSettings() {
    Intent intent = new Intent(Settings.ACTION_WIFI_SETTINGS);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

Text Messaging
--------------

### Compose an SMS/MMS message with attachment

To initiate an SMS or MMS text message, use one of the intent actions below and specify message details such as the phone number, subject, and message body using the extra keys listed below.

**Action**

`ACTION_SENDTO` or  
`ACTION_SEND` or  
`ACTION_SEND_MULTIPLE`

**Data URI Scheme**

`sms:<phone_number>`

`smsto:<phone_number>`

`mms:<phone_number>`

`mmsto:<phone_number>`

Each of these schemes are handled the same.

**MIME Type**

`"text/plain"`

`"image/*"`

`"video/*"`

**Extras**

`"subject"`

A string for the message subject (usually for MMS only).

`"sms_body"`

A string for the text message.

`EXTRA_STREAM`

A `Uri` pointing to the image or video to attach. If using the `ACTION_SEND_MULTIPLE` action, this extra should be an `ArrayList` of `Uri`s pointing to the images/videos to attach.

**Example intent:**

### Kotlin

```kotlin
fun composeMmsMessage(message: String, attachment: Uri) {
    val intent = Intent(Intent.ACTION_SENDTO).apply {
        type = HTTP.PLAIN_TEXT_TYPE
        putExtra("sms_body", message)
        putExtra(Intent.EXTRA_STREAM, attachment)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void composeMmsMessage(String message, Uri attachment) {
    Intent intent = new Intent(Intent.ACTION_SENDTO);
    intent.setType(HTTP.PLAIN_TEXT_TYPE);
    intent.putExtra("sms_body", message);
    intent.putExtra(Intent.EXTRA_STREAM, attachment);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

If you want to ensure that your intent is handled only by a text messaging app (and not other email or social apps), then use the `ACTION_SENDTO` action and include the `"smsto:"` data scheme. For example:

### Kotlin

```kotlin
fun composeMmsMessage(message: String, attachment: Uri) {
    val intent = Intent(Intent.ACTION_SEND).apply {
        data = Uri.parse("smsto:")  // This ensures only SMS apps respond
        putExtra("sms_body", message)
        putExtra(Intent.EXTRA_STREAM, attachment)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void composeMmsMessage(String message, Uri attachment) {
    Intent intent = new Intent(Intent.ACTION_SEND);
    intent.setData(Uri.parse("smsto:"));  // This ensures only SMS apps respond
    intent.putExtra("sms_body", message);
    intent.putExtra(Intent.EXTRA_STREAM, attachment);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <data android:type="text/plain" />
        <data android:type="image/*" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```

> **Note:** If you're developing an SMS/MMS messaging app, you must implement intent filters for several additional actions in order to be available as the _default SMS app_ on Android 4.4 and higher. For more information, see the documentation at `Telephony`.

Web Browser
-----------

### Load a web URL

Google Voice Actions

*   "open example.com"

To open a web page, use the `ACTION_VIEW` action and specify the web URL in the intent data.

**Action**

`ACTION_VIEW`

**Data URI Scheme**

`http:<URL>`  
`https:<URL>`

**MIME Type**

`"text/plain"`

`"text/html"`

`"application/xhtml+xml"`

`"application/vnd.wap.xhtml+xml"`

**Example intent:**

### Kotlin

```kotlin
fun openWebPage(url: String) {
    val webpage: Uri = Uri.parse(url)
    val intent = Intent(Intent.ACTION_VIEW, webpage)
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

### Java

```java
public void openWebPage(String url) {
    Uri webpage = Uri.parse(url);
    Intent intent = new Intent(Intent.ACTION_VIEW, webpage);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

**Example intent filter:**

```xml
<activity ...>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <!-- Include the host attribute if you want your app to respond
             only to URLs with your app's domain. -->
        <data android:scheme="http" android:host="www.example.com" />
        <category android:name="android.intent.category.DEFAULT" />
        <!-- The BROWSABLE category is required to get links from web pages. -->
        <category android:name="android.intent.category.BROWSABLE" />
    </intent-filter>
</activity>
```

**Tip:** If your Android app provides functionality similar to your web site, include an intent filter for URLs that point to your web site. Then, if users have your app installed, links from emails or other web pages pointing to your web site open your Android app instead of your web page. Learn more in the guides about Handling Android App Links.

Starting in Android 12 (API level 31), a generic web intent resolves to an activity in your app only if your app is approved for the specific domain contained in that web intent. If your app isn't approved for the domain, the web intent resolves to the user's default browser app instead.

Verify Intents with the Android Debug Bridge
--------------------------------------------

To verify that your app responds to the intents that you want to support, you can use the `adb` tool to fire specific intents:

1.  Set up an Android device for development, or use a virtual device.
2.  Install a version of your app that handles the intents you want to support.
3.  Fire an intent using `adb`:

```shell    
    adb shell am start -a <ACTION> -t <MIME_TYPE> -d <DATA> 
      -e <EXTRA_NAME> <EXTRA_VALUE> -n <ACTIVITY>
```

    For example:

```shell    
    adb shell am start -a android.intent.action.DIAL 
      -d tel:555-5555 -n org.example.MyApp/.MyActivity
```

4.  If you defined the required intent filters, your app should handle the intent.

For more information, see ADB Shell Commands.