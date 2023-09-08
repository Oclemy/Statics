# Overview of shared storage

Use shared storage for user data that can or should be accessible to other apps and saved even if the user uninstalls your app.

Android provides APIs for storing and accessing the following types of shareable data:

*   **Media content:** The system provides standard public directories for these kinds of files, so the user has a common location for all their photos, another common location for all their music and audio files, and so on. Your app can access this content using the platform's `MediaStore` API.
*   **Documents and other files:** The system has a special directory for containing other file types, such as PDF documents and books that use the EPUB format. Your app can access these files using the platform's Storage Access Framework.
*   **Datasets:** On Android 11 (API level 30) and higher, the system caches large datasets that multiple apps might use. These datasets can support use cases like machine learning and media playback. Apps can access these shared datasets using the `BlobStoreManager` API.

For more information about these APIs, see the following guides:

*   Media content
*   Documents and other files
*   Datasets