# Sending simple data to other apps

Android uses Intents and their associated extras to allow users to share information quickly and easily, using their favorite apps.

Android provides two ways for users to share data between apps:

*   The Android Sharesheet is primarily designed for sending content outside your app and/or directly to another user. For example, sharing a URL with a friend.
*   The Android intent resolver is best suited for passing data to the next stage of a well-defined task. For example, opening a PDF from your app and letting users pick their preferred viewer.

When you construct an intent, you must specify the action you want the intent to perform. Android uses the action `ACTION_SEND` to send data from one activity to another, even across process boundaries. You need to specify the data and its type. The system automatically identifies the compatible activities that can receive the data and displays them to the user. In the case of the intent resolver, if only one activity can handle the intent, that activity immediately starts.

![](https://developer.android.com/static/images/training/sharing/sharesheet_api29.png)

We strongly recommend using the Android Sharesheet to create consistency for your users across apps. Apps should not display their own list of share targets or to create their own Sharesheet variations.

The Android Sharesheet gives users the ability to share information with the right person, with relevant app suggestions, all with a single tap. The Sharesheet can suggest targets unavailable to custom solutions, and with consistent ranking. This is because the Sharesheet can take into account information about the app and user activity that is only available to the system.

The Android Sharesheet also has many handy features for developers. For example, you can:

*   Find out when your users complete a share and to where
*   Add your own custom `ChooserTarget` and app targets
*   Provide rich text content previews starting in Android 10 (API level 29)
*   Exclude targets matching specific `ComponentName`s

For all types of sharing, create an intent and set its action to `Intent.ACTION_SEND`. In order to display the Android Sharesheet you need to call `Intent.createChooser()` , passing it your `Intent` object. It returns a version of your intent that will always display the Android Sharesheet.

### Sending text content

The most straightforward and common use of the Android Sharesheet is to send text content from one activity to another. For example, most browsers can share the URL of the currently-displayed page as text with another app. This is useful for sharing an article or website with friends via email or social networking. Here's an example of how to do this:

### Kotlin

```kotlin
val sendIntent: Intent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_TEXT, "This is my text to send.")
    type = "text/plain"
}

val shareIntent = Intent.createChooser(sendIntent, null)
startActivity(shareIntent)
```

### Java

```java
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, "This is my text to send.");
sendIntent.setType("text/plain");

Intent shareIntent = Intent.createChooser(sendIntent, null);
startActivity(shareIntent);
```

Optionally, you can add extras to include more information, such as email recipients (`EXTRA_EMAIL`, `EXTRA_CC`, `EXTRA_BCC`), the email subject (`EXTRA_SUBJECT`), and so on.

**Note:** Some e-mail apps, such as Gmail, expect a `String[]` for extras like `EXTRA_EMAIL` and `EXTRA_CC`, use `putExtra(String, String[])` to add these to your intent.

### Sending binary content

Share binary data using the `ACTION_SEND` action. Set the appropriate MIME type and place a URI to the data in the extra `EXTRA_STREAM`. This is commonly used to share an image but can be used to share any type of binary content:

### Kotlin

```kotlin
val shareIntent: Intent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_STREAM, uriToImage)
    type = "image/jpeg"
}
startActivity(Intent.createChooser(shareIntent, null))
```

### Java

```java
Intent shareIntent = new Intent();
shareIntent.setAction(Intent.ACTION_SEND);
shareIntent.putExtra(Intent.EXTRA_STREAM, uriToImage);
shareIntent.setType("image/jpeg");
startActivity(Intent.createChooser(shareIntent, null));
```

The receiving application needs permission to access the data the `Uri` points to. The recommended ways to do this are:

*   Store the data in your own `ContentProvider`, making sure that other apps have the correct permission to access your provider. The preferred mechanism for providing access is to use per-URI permissions which are temporary and only grant access to the receiving application. An easy way to create a `ContentProvider` like this is to use the `FileProvider` helper class.
*   Use the system `MediaStore`. The `MediaStore` is primarily for video, audio and image MIME types, however beginning with Android 3.0 (API level 11) it can also store non-media types (see `MediaStore.Files` for more info). Files can be inserted into the `MediaStore` using `scanFile()` after which a `content://` style `Uri` suitable for sharing is passed to the provided `onScanCompleted()` callback. Note that once added to the system `MediaStore` the content is accessible to any app on the device.

### Using the right MIME type

You should provide the most specific MIME type for the data you’re sending. For example, you should use `text/plain` when sharing plain text. Here are a few common MIME types when sending simple data in Android.

*   `text/plain`, `text/rtf`, `text/html`, `text/json`, receivers should register for `text/*`
*   `image/jpg`, `image/png`, `image/gif`, receivers should register for `image/*`
*   `video/mp4`, `video/3gp`, receivers should register for `video/*`
*   `application/pdf`, receivers should register for supported file extensions
*   You can use a MIME type of `*/*`, but this is highly discouraged and will only match activities that are able to handle generic data streams.

The Android Sharesheet may show a content preview based on the provided MIME type. Some preview features are only available for specific types.

Please refer to the IANA official registry of MIME media types.

To share multiple pieces of content, use the `ACTION_SEND_MULTIPLE` action together with a list of URIs pointing to the content. The MIME type varies according to the mix of content you're sharing. For example, if you share three JPEG images, the type is still `"image/jpg"`. For a mixture of image types, it should be `"image/*"` to match an activity that handles any type of image. While possible to share a mix of types, this is highly discouraged as it's unclear to the receiver what is intended to be sent. If it is necessary to send multiple types, use `"*/*"`. It's up to the receiving application to parse and process your data. Here's an example:

### Kotlin

```kotlin
val imageUris: ArrayList<Uri> = arrayListOf(
        // Add your image URIs here
        imageUri1,
        imageUri2
)

val shareIntent = Intent().apply {
    action = Intent.ACTION_SEND_MULTIPLE
    putParcelableArrayListExtra(Intent.EXTRA_STREAM, imageUris)
    type = "image/*"
}
startActivity(Intent.createChooser(shareIntent, null))
```

### Java

```java
ArrayList<Uri> imageUris = new ArrayList<Uri>();
imageUris.add(imageUri1); // Add your image URIs here
imageUris.add(imageUri2);

Intent shareIntent = new Intent();
shareIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
shareIntent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, imageUris);
shareIntent.setType("image/*");
startActivity(Intent.createChooser(shareIntent, null));
```

Be sure the provided `URIs` point to data that a receiving application can access.

### Adding rich content to text previews

Starting in Android 10 (API level 29), the Android Sharesheet shows a preview of the text being shared. In some cases, text that's being shared can be hard to understand. Consider sharing a complicated URL like https://www.google.com/search?ei=2rRVXcLkJajM0PEPoLy7oA4. A richer preview can reassure your users what is being shared.

If you are previewing text, you can set a title, a thumbnail image, or both. Add a description to `Intent.EXTRA_TITLE` before calling `Intent.createChooser()`. Add a relevant thumbnail via ClipData.

> **Note:** The image content URI should be provided from a FileProvider, usually from a configured `<cache-path>`. See Sharing files. Be sure to give Sharesheet the right permissions to read any image you want to be used as a thumbnail. See Intent.FLAG_GRANT_READ_URI_PERMISSION.

Here's an example:

### Kotlin

```kotlin
 val share = Intent.createChooser(Intent().apply {
      action = Intent.ACTION_SEND
      putExtra(Intent.EXTRA_TEXT, "https://developer.android.com/training/sharing/")

      // (Optional) Here we're setting the title of the content
      putExtra(Intent.EXTRA_TITLE, "Introducing content previews")

      // (Optional) Here we're passing a content URI to an image to be displayed
      data = contentUri
      flags = Intent.FLAG_GRANT_READ_URI_PERMISSION
  }, null)
  startActivity(share)
```

### Java

```java
Intent sendIntent = new Intent(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, "https://developer.android.com/training/sharing/");

// (Optional) Here we're setting the title of the content
sendIntent.putExtra(Intent.EXTRA_TITLE, "Introducing content previews");

// (Optional) Here we're passing a content URI to an image to be displayed
sendIntent.setData(contentUri);
sendIntent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

// Show the Sharesheet
startActivity(Intent.createChooser(sendIntent, null));
```

The preview looks like this:

![](https://developer.android.com/static/images/training/sharing/sharing_content_preview.png)

### Adding custom targets

The Android Sharesheet lets you specify up to two `ChooserTarget` objects that are shown before the sharing shortcuts and ChooserTargets loaded from `ChooserTargetServices`. You can also specify up to two intents pointing to activities that are listed before the app suggestions.

![](https://developer.android.com/static/images/training/sharing/customshare.png)

Add `Intent.EXTRA_CHOOSER_TARGETS` and `Intent.EXTRA_INITIAL_INTENTS` to your share Intent **after** calling `Intent.createChooser()`.

### Kotlin

```kotlin
val share = Intent.createChooser(myShareIntent, null).apply {
    putExtra(Intent.EXTRA_CHOOSER_TARGETS, myChooserTargetArray)
    putExtra(Intent.EXTRA_INITIAL_INTENTS, myInitialIntentArray)
}
```

### Java

```java
Intent shareIntent = Intent.createChooser(sendIntent, null);
share.putExtra(Intent.EXTRA_CHOOSER_TARGETS, myChooserTargetArray);
share.putExtra(Intent.EXTRA_INITIAL_INTENTS, myInitialIntentArray);
```

Use this feature with care. Every custom `Intent` and `ChooserTarget` that you add reduces the number the system suggests. Adding custom targets is normally discouraged. A common appropriate example of adding `Intent.EXTRA_INITIAL_INTENTS` is to provide additional actions users may take on shared content. For example, a user shares images and `Intent.EXTRA_INITIAL_INTENTS` is used to give users the ability to send a link instead. A common appropriate example of adding `Intent.EXTRA_CHOOSER_TARGETS` is to surface relevant people or devices that your app provides.

### Excluding specific targets by component

You can exclude specific targets by providing `Intent.EXTRA_EXCLUDE_COMPONENTS.` This is to be used only to remove targets you have control over. A common use case is to hide your app’s share targets when your users share from within your app as their intent is likely to share outside your app.

Add `Intent.EXTRA_EXCLUDE_COMPONENTS` to your intent after calling `Intent.createChooser()`

### Kotlin

```kotlin
val share = Intent.createChooser(myShareIntent, null).apply {
  // Only use components you have control over
  share.putExtra(Intent.EXTRA_EXCLUDE_COMPONENTS, myComponentArray)
}
```

### Java

```java
Intent shareIntent = Intent.createChooser(sendIntent, null);
// Only use components you have control over
share.putExtra(Intent.EXTRA_EXCLUDE_COMPONENTS, myComponentArray);
```

It can be useful to know when your users are sharing and what target they've selected. The Android Sharesheet enables this by providing the `ComponentName` of targets your users click via an `IntentSender`.

First create a `PendingIntent` for a `BroadcastReceiver` and supply its `IntentSender` in `Intent.createChooser()`

### Kotlin

```kotlin
var share = Intent(Intent.ACTION_SEND)
// ...
val pi = PendingIntent.getBroadcast(
    myContext, requestCode,
    Intent(myContext, MyBroadcastReceiver::class.java),
    PendingIntent.FLAG_UPDATE_CURRENT
)
share = Intent.createChooser(share, null, pi.intentSender)
```

### Java

```java
Intent share = new Intent(ACTION_SEND);
...
PendingIntent pi = PendingIntent.getBroadcast(myContext, requestCode,
        new Intent(myContext, MyBroadcastReceiver.class),
        PendingIntent.FLAG_UPDATE_CURRENT);
share = Intent.createChooser(share, null, pi.getIntentSender());
```

Receive the callback in MyBroadcastReceiver and look in `Intent.EXTRA_CHOSEN_COMPONENT`

### Kotlin

```kotlin
override fun onReceive(context: Context, intent: Intent) {
  ...
  val clickedComponent : ComponentName = intent.getParcelableExtra(EXTRA_CHOSEN_COMPONENT);
}
```

### Java

```java
@Override public void onReceive(Context context, Intent intent) {
  ...
  ComponentName clickedComponent = intent.getParcelableExtra(EXTRA_CHOSEN_COMPONENT);
}
```

Using the Android intent resolver
---------------------------------

Screenshot of `ACTION_SEND` intent resolver.

The Android intent resolver is best used when sending data to another app as part of a well-defined task flow.

To use the Android intent resolver, create an intent and add extras as you would if you were to call the Android Sharesheet. However, **do not call `Intent.createChooser()`**.

If there are multiple installed applications with filters that match `ACTION_SEND` and the MIME type, the system displays a disambiguation dialog called the intent resolver that allows the user to choose a target to share to. If a single application matches it will be run.

Here is an example of how to use the Android intent resolver to send text:

### Kotlin

```kotlin
val sendIntent: Intent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_TEXT, "This is my text to send.")
    type = "text/plain"
}
startActivity(sendIntent)
```

### Java

```java
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, "This is my text to send.");
sendIntent.setType("text/plain");
startActivity(sendIntent);
```