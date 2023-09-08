# Content providers

Content providers can help an application manage access to data stored by itself, stored by other apps, and provide a way to share data with other apps. They encapsulate the data, and provide mechanisms for defining data security. Content providers are the standard interface that connects data in one process with code running in another process. Implementing a content provider has many advantages. Most importantly you can configure a content provider to allow other applications to securely access and modify your app data as illustrated in figure 1.

![Overview diagram of how content providers manage access to storage.](https://developer.android.com/static/guide/topics/providers/images/content-provider-overview.png)

**Figure 1.** Overview diagram of how content providers manage access to storage.

Use content providers if you plan to share data. If you don’t plan to share data, you may still use them because they provide a nice abstraction, but you don’t have to. This abstraction allows you to make modifications to your application data storage implementation without affecting other existing applications that rely on access to your data. In this scenario only your content provider is affected and not the applications that access it. For example, you might swap out a SQLite database for alternative storage as illustrated in figure 2.

![Illustration of migrating content provider storage.](https://developer.android.com/static/guide/topics/providers/images/content-provider-migration.png)

**Figure 2.** Illustration of migrating content provider storage.

A number of other classes rely on the `ContentProvider` class:

*   `AbstractThreadedSyncAdapter`
*   `CursorAdapter`
*   `CursorLoader`

If you are making use of any of these classes you also need to implement a content provider in your application. Note that when working with the sync adapter framework you can also create a stub content provider as an alternative. For more information about this topic, see Creating a stub content provider. In addition, you need your own content provider in the following cases:

*   You want to implement custom search suggestions in your application
*   You need to use a content provider to expose your application data to widgets
*   You want to copy and paste complex data or files from your application to other applications

The Android framework includes content providers that manage data such as audio, video, images, and personal contact information. You can see some of them listed in the reference documentation for the `android.provider` package. With some restrictions, these providers are accessible to any Android application.

A content provider can be used to manage access to a variety of data storage sources, including both structured data, such as a SQLite relational database, or unstructured data such as image files. For more information on the types of storage available on Android, see Storage options, as well as Designing data storage.

Advantages of content providers
-------------------------------

Content providers offer granular control over the permissions for accessing data. You can choose to restrict access to a content provider from solely within your application, grant blanket permission to access data from other applications, or configure different permissions for reading and writing data. For more information on using content providers securely, see Security tips for storing data, as well as Content provider permissions.

You can use a content provider to abstract away the details for accessing different data sources in your application. For example, your application might store structured records in a SQLite database, as well as video and audio files. You can use a content provider to access all of this data, if you implement this development pattern in your application.

Also note that `CursorLoader` objects rely on content providers to run asynchronous queries and then return the results to the UI layer in your application. For more information on using a CursorLoader to load data in the background, see Running a query with a CursorLoader.

The following topics describe content providers in more detail:

**Content provider basics**

How to access and update data using an existing content provider.

**Creating a content provider**

How to design and implement your own content provider.

**Calendar provider**

How to access the Calendar provider that is part of the Android platform.

**Contacts provider**

How to access the Contacts provider that is part of the Android platform.