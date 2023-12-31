# Sharing files

Apps often have a need to offer one or more of their files to another app. For example, an image gallery may want to offer files to image editors, or a file management app may want to allow users to copy and paste files between areas in external storage. One way a sending app can share a file is to respond to a request from the receiving app.

In all cases, the only secure way to offer a file from your app to another app is to send the receiving app the file's content URI and grant temporary access permissions to that URI. Content URIs with temporary URI access permissions are secure because they apply only to the app that receives the URI, and they expire automatically. The Android `FileProvider` component provides the method `getUriForFile()` for generating a file's content URI.

If you want to share small amounts of text or numeric data between apps, you should send an `Intent` that contains the data. To learn how to send simple data with an `Intent`, see the training class Sharing simple data.

This class explains how to securely share files from your app to another app using content URIs generated by the Android `FileProvider` component and temporary permissions that you grant to the receiving app for the content URI.

Lessons
-------

**Setting up file sharing**

Learn how to set up your app to share files.

**Sharing a file**

Learn how to offer a file to another app by generating a content URI for the file, granting access permissions to the URI, and sending the URI to the app.

**Requesting a shared file**

Learn how to request a file shared by another app, receive the content URI for the file, and use the content URI to open the file.

**Retrieving file information**

Learn how an app can use a content URI generated by a `FileProvider` to retrieve file information including MIME type and file size.

For additional related information, refer to:

*   Storage Options
*   Saving Files
*   Sharing Simple Data