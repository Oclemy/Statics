# Sharing files with NFC

Android allows you to transfer large files between devices using the Android Beam file transfer feature. This feature has a simple API and allows users to start the transfer process by simply touching devices. In response, Android Beam file transfer automatically copies files from one device to the other and notifies the user when it's finished.

While the Android Beam file transfer API handles large amounts of data, the Android Beam NDEF transfer API introduced in Android 4.0 (API level 14) handles small amounts of data such as URIs or other small messages. In addition, Android Beam is only one of the features available in the Android NFC framework, which allows you to read NDEF messages from NFC tags. To learn more about Android Beam, see the topic Beaming NDEF messages to other devices. To learn more about the NFC framework, see the Near Field Communication API guide.

Dependencies and prerequisites
------------------------------

*   Android 4.1 (API Level 16) or higher
*   At least two NFC-enabled Android devices (NFC is not supported in the emulator)

Lessons
-------

**Sending files to another device**

Learn how to set up your app to send files to another device.

**Receiving files from another device**

Learn how to set up your app to receive files sent by another device.

For additional related information, refer to Using the External Storage