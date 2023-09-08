# Android- Asynchronously Download Multiple Files

In this article we want to look at some powerful options to include asynchronous multi-request download capability in your android applications.


### (a). FileBox

FileBox is an async file downloader library for Android. It's powerful download library based on RxJava.

FileBox downloads a given URL, and if it is already downloaded, it provides downloaded content directly.

**Features of FileBox:**

- Shares ongoing download requests to the observers. So It reduces Data Usage.
- Has TTL(Time To Live) duration. Filebox re-download the URL if TTL is expired.
- Supports both Cache and External directory.
- Supports the File Encryption for sensitive URL(images, videos, any file).
- Allows you to create a custom folder destination.
- Clears unreliable data automagically.
- Does Etag Check. Filebox doesn't download the file again If the file's TLL(Time To Live) is up but the file has not changed.
- Supports Multiple Download. If you have N file and want to get notified when all completed.
- Runs on application scope. There is no pause/resume continuation support.

**Step 1: Installation**

FileBox is hosted in jitpack so to install start by adding jitpack as a repository in your root level build.gradle:

```groovy
allprojects {
     repositories {
    ...
    maven { url 'https://jitpack.io' }
     }
}
```

Then in the app level build gradle add it's implementation statement under the dependency closure:

```groovy
dependencies {
      implementation 'com.github.lyrebirdstudio:filebox:0.1'
}
```

**Step 2: Basic Usage**

For basic usage of FileBox, follow the following code:

```kotlin
val fileBoxRequest = FileBoxRequest("https://url1.png")

val filebox= FileBoxProvider.newInstance(applicationContext, FileBoxConfig.createDefault())

filebox.get(fileBoxRequest)
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe { fileBoxResponse ->
        when (fileBoxResponse) {
            is FileBoxResponse.Downloading -> {
                val progress: Float = fileBoxResponse.progress
                val ongoingRecord: Record = fileBoxResponse.record
            }
            is FileBoxResponse.Complete -> {
                val savedRecord: Record = fileBoxResponse.record
                val savedPath = fileBoxResponse.record.getReadableFilePath()
            }
            is FileBoxResponse.Error -> {
                val savedRecord: Record = fileBoxResponse.record
                val error = fileBoxResponse.throwable
            }
        }
    }
```

**How to Customize the Configurations**

You can customize FileBox configs:

```kotlin
val fileBoxConfig = FileBoxConfig.FileBoxConfigBuilder()
        .setCryptoType(CryptoType.CONCEAL) // Default is CryptoType.NONE
        .setTTLInMillis(TimeUnit.DAYS.toMillis(7)) // Default is 7 Days
        .setDirectory(DirectoryType.CACHE) // Default is External
        .setFolderName("MyPhotos") // Default is none
        .build()
```

**Multiple Download Requests**

If you want to download multiple files at the same time:

```kotlin
val fileBoxMultipleRequest = FileBoxMultiRequest(
            arrayListOf(
                FileBoxRequest("https://url1.png"),
                FileBoxRequest("https://url2.zip"),
                FileBoxRequest("https://url3.json"),
                FileBoxRequest("https://url4.mp4")
            )
        )

val filebox = FileBoxProvider.newInstance(applicationContext, FileBoxConfig.createDefault())

filebox.get(fileBoxMultipleRequest)
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe { fileBoxResponse ->
        when (fileBoxResponse) {
            is FileBoxMultiResponse.Downloading -> {
                val progress = fileBoxResponse.progress
                val ongoingFileResponseList = fileBoxResponse.fileBoxResponseList
            }
            is FileBoxMultiResponse.Complete -> {
                val ongoingFileResponseList = fileBoxResponse.fileBoxResponseList
                ongoingFileResponseList.forEach { it.record.getReadableFilePath() }
            }
            is FileBoxMultiResponse.Error -> {
                val error = fileBoxResponse.throwable
                val ongoingFileResponseList = fileBoxResponse.fileBoxResponseList
            }
        }
    }
```

**Step 3: Destroy FileBox**

Don't forget to destroy the filebox when your initialized scope is destroyed. If you create a filebox in your application class, It is application scoped. If you create a filebox in your activity class, It is activity scoped. Be aware of your lifecycle.

```kotlin
filebox.destroy()
```

**Links**

1. Download a Full Example [here](https://github.com/lyrebirdstudio/filebox).
2. Follow the author [here](https://github.com/lyrebirdstudio/).
