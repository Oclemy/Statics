# Scoped Storage Example



This piece covers scoped strorage examples in a step by step manner.


### What is ScopedStorage?

Basically if your app targets API Level 29(Android 10) and above, then by default the system assigns you scoped access into external storage, or scoped storage.

> Such apps have access only to the app-specific directory on external storage, as well as specific types of media that the app has created.

This is intended to give users more control over their files and to limit file clutter.

Let's now looked at some examples.

## Android Scoped Storage Example

> A project explaining Scoped storage with different operations performed on file as well as Image.

Here is the demo:

![Android ScopedStorage example](https://github.com/niharika2810/ScopedStorageDemo/raw/master/images/demo_image.png)

### Step 1: Add Dependencies

Add dependencies including the document file.

```groovy
    implementation 'androidx.documentfile:documentfile:1.0.1'
```

### Step 2: Add Permissions

Add the necessary permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
        android:maxSdkVersion="28"
        />
```

### Step 3: Create Layouts

Create the following layouts:

**(a). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <EditText
        android:id="@+id/edit_file_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:hint="Name of File"
        android:inputType="text"
        android:maxLength="5"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/edit_content"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Content"
        app:layout_constraintTop_toBottomOf="@id/edit_file_name" />

    <Button
        android:id="@+id/btn_save"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="newFile"
        android:text="Create File"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/edit_content" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/nested_scroll"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <TextView
            android:id="@+id/title"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:gravity="center"
            android:text="Let's learn Scoped Storage through some demo"
            android:textColor="@color/colorPrimary"
            android:textSize="30dp"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <Button
            android:id="@+id/btn_create_file"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/holo_orange_dark"
            android:padding="10dp"
            android:text="Create File"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/title" />

        <Button
            android:id="@+id/btn_open_file"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/holo_blue_bright"
            android:padding="10dp"
            android:text="Open file"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/btn_create_file" />

        <Button
            android:id="@+id/btn_download_file"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/holo_orange_light"
            android:padding="10dp"
            android:text="Download File"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/btn_open_file" />

        <Button
            android:id="@+id/open_folder"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/holo_purple"
            android:padding="10dp"
            android:text="Open Folder"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/btn_download_file" />

        <Button
            android:id="@+id/download_image_media_location"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@color/colorAccent"
            android:padding="10dp"
            android:text="Fetch Image Meta"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/open_folder" />

        <Button
            android:id="@+id/download_image_external"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/darker_gray"
            android:padding="10dp"
            android:text="Download Image(Url) to Downloads"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/download_image_media_location" />

        <Button
            android:id="@+id/download_image_internal"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:background="@android:color/holo_blue_dark"
            android:padding="10dp"
            android:text="Download Image to App Folder"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/download_image_external" />

        <ImageView
            android:id="@+id/image"
            android:layout_width="200dp"
            android:layout_height="200dp"
            android:layout_marginTop="20dp"
            android:src="@drawable/group_4"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/download_image_internal" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.core.widget.NestedScrollView>
```

### Step 5: Create files Activity

And add the following code:

```java
package com.sample.scopedstorage.activities

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.sample.scopedstorage.R
import kotlinx.android.synthetic.main.activity_files.*
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException

class FileActivity : AppCompatActivity() {

    companion object {
        private const val CREATE_FILE_REQUEST_CODE = 1
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_files)
        btn_save.setOnClickListener {
            createFile()
        }
    }

    private fun createFile() {
        val intent = Intent(Intent.ACTION_CREATE_DOCUMENT)

        intent.addCategory(Intent.CATEGORY_OPENABLE)
        intent.type = "text/plain"
        intent.putExtra(Intent.EXTRA_TITLE, "${edit_file_name.text}.txt")
        startActivityForResult(intent, CREATE_FILE_REQUEST_CODE)
    }

    private fun writeFileContent(uri: Uri?) {
        try {
            val file = uri?.let { this.contentResolver.openFileDescriptor(it, "w") }

            file?.let {
                val fileOutputStream = FileOutputStream(
                    it.fileDescriptor
                )
                val textContent = edit_content.text.toString()

                fileOutputStream.write(textContent.toByteArray())

                fileOutputStream.close()
                it.close()
            }

        } catch (e: FileNotFoundException) {
            //print logs
        } catch (e: IOException) {
            //print logs
        }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        //Write the file content
        if (requestCode == CREATE_FILE_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                writeFileContent(data.data)
            }

        }
    }
}
```

### Step 6: Create Main Activity

Create the main activity:

```java
package com.sample.scopedstorage.activities

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DownloadManager
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Paint
import android.graphics.drawable.BitmapDrawable
import android.graphics.pdf.PdfDocument
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.documentfile.provider.DocumentFile
import androidx.exifinterface.media.ExifInterface
import com.sample.scopedstorage.R
import kotlinx.android.synthetic.main.activity_main.*
import java.io.*
import kotlin.random.Random

/*
 The sample code is for Android 10 and above, Handle the below version as your were doing earlier
*/
class MainActivity : AppCompatActivity() {

    companion object {
        private const val OPEN_FILE_REQUEST_CODE = 1
        private const val OPEN_FOLDER_REQUEST_CODE = 2
        private const val MEDIA_LOCATION_PERMISSION_REQUEST_CODE = 3
        private const val CHOOSE_FILE = 4
        private const val PERMISSION_READ_EXTERNAL_STORAGE = 5
        var downloadImageUrl = "https://cdn.pixabay.com/photo/2020/04/21/06/41/bulldog-5071407_1280.jpg"

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_create_file.setOnClickListener {
            startActivity(Intent(this@MainActivity, FileActivity::class.java))
        }

        btn_open_file.setOnClickListener {
            openFile()
        }

        btn_download_file.setOnClickListener {
            downloadFile()
        }
        open_folder.setOnClickListener {
            openFolder()
        }
        download_image_media_location.setOnClickListener {
            fetchMediaLocation()
        }

        download_image_external.setOnClickListener {
            downloadImage()
        }
        download_image_internal.setOnClickListener {
            downloadImageToAppFolder()
        }
    }

    private fun downloadImage() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {

            if (checkPermissionForReadWrite(this)) {
                downloadImageToDownloadFolder()
            } else {
                requestPermissionForReadWrite(this)
            }

        } else {
            downloadImageToDownloadFolder()
        }
    }

    private fun downloadImageToAppFolder() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            if (checkPermissionForReadWrite(this)) {
                downloadToInternalFolder()
            } else {
                requestPermissionForReadWrite(this)
            }

        } else {
            downloadToInternalFolder()
        }
    }

    //Downloading file to Internal Folder
    private fun downloadToInternalFolder() {
        try {
            val file = File(
                this.getExternalFilesDir(
                    null
                ), "SampleImageDemo.png"
            )

            if (!file.exists())
                file.createNewFile()

            var fileOutputStream: FileOutputStream? = null

            fileOutputStream = FileOutputStream(file)
            val bitmap = (image.drawable as BitmapDrawable).bitmap

            bitmap?.compress(Bitmap.CompressFormat.PNG, 100, fileOutputStream)
            Toast.makeText(
                applicationContext,
                "Download successfully to " + file.absolutePath,
                Toast.LENGTH_LONG
            ).show()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    //Check if you already have read storage permission
    private fun checkPermissionForReadWrite(context: Context): Boolean {
        val result: Int =
            ContextCompat.checkSelfPermission(
                context,
                android.Manifest.permission.READ_EXTERNAL_STORAGE
            )

        return result == PackageManager.PERMISSION_GRANTED
    }

    //Request Permission For Read Storage
    private fun requestPermissionForReadWrite(context: Context) {
        ActivityCompat.requestPermissions(
            context as Activity,
            arrayOf(
                android.Manifest.permission.READ_EXTERNAL_STORAGE,
                android.Manifest.permission.READ_EXTERNAL_STORAGE
            ), PERMISSION_READ_EXTERNAL_STORAGE
        )
    }

    private fun downloadImageToDownloadFolder() {
        val mgr = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager

        val downloadUri = Uri.parse(downloadImageUrl)
        val request = DownloadManager.Request(
            downloadUri
        )
        request.setAllowedNetworkTypes(
            DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE
        )
            .setAllowedOverRoaming(false).setTitle("Sample")
            .setDescription("Sample Image Demo New")
            .setDestinationInExternalPublicDir(
                Environment.DIRECTORY_DOWNLOADS,
                "SampleImage.jpg"
            )

        Toast.makeText(
            applicationContext,
            "Download successfully to ${downloadUri?.path}",
            Toast.LENGTH_LONG
        ).show()

        mgr.enqueue(request)

    }

    //Function for Image check on
    private fun fetchMediaLocation() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {

            openChooser()

        } else {

            if (isPermissionGrantedForMediaLocationAccess(this)) {

                openChooser()
            } else {
                Log.i("Tag", "else chooseFile")

                requestPermissionForAccessMediaLocation(this)
            }

        }
    }

//Request Permission if not given

    @RequiresApi(Build.VERSION_CODES.Q)
    fun requestPermissionForAccessMediaLocation(context: Context) {
        Log.i("Tag", "requestPermissionForAML")

        ActivityCompat.requestPermissions(
            context as Activity,
            arrayOf(android.Manifest.permission.ACCESS_MEDIA_LOCATION),
            MEDIA_LOCATION_PERMISSION_REQUEST_CODE
        )

    }

    fun openChooser() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
        intent.type = "image/*"
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false)
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(Intent.createChooser(intent, "Select Picture"), CHOOSE_FILE)
    }

    //Check if Permission granted for Accessing Media Location
    private fun isPermissionGrantedForMediaLocationAccess(context: Context): Boolean {
        Log.i("Tag", "checkPermissionForAML")
        val result: Int =
            ContextCompat.checkSelfPermission(
                context,
                android.Manifest.permission.ACCESS_MEDIA_LOCATION
            )
        return result == PackageManager.PERMISSION_GRANTED
    }

    private fun openFolder() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT_TREE).apply {
            flags = Intent.FLAG_GRANT_READ_URI_PERMISSION or
                    Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION
        }
        startActivityForResult(intent, OPEN_FOLDER_REQUEST_CODE)
    }

    private fun openFile() {
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            //if you want to open PDF file
            type = "application/pdf"
            addCategory(Intent.CATEGORY_OPENABLE)
            //Adding Read URI permission
            flags = flags or Intent.FLAG_GRANT_READ_URI_PERMISSION
        }
        startActivityForResult(intent, OPEN_FILE_REQUEST_CODE)
    }

    @SuppressLint("NewApi")
    private fun downloadFile() {
        // create a new document
        val document = PdfDocument()
        // crate a page description
        val pageInfo = PdfDocument.PageInfo.Builder(400, 300, 1).create()
        // start a page
        val page = document.startPage(pageInfo)
        val canvas = page.canvas
        val paint = Paint()
        canvas.drawText("HelloWorld", 80F, 50F, paint)
        // finish the page
        document.finishPage(page)

        //Make IS_PENDING 1 so that it is not visible to other apps till the time this is downloaded
        val values = ContentValues().apply {
            put(MediaStore.Downloads.DISPLAY_NAME, "demofile_" + Random.nextInt(9999) + ".pdf")
            put(MediaStore.Downloads.IS_PENDING, 1)
        }

        val resolver = contentResolver

        //Storing at primary location
        val collection = MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)

        //Insert the item
        val item = resolver.insert(collection, values)

        if (item != null) {
            resolver.openOutputStream(item).use { out ->
                document.writeTo(out);
            }
        }
        values.clear()

        //Make it 0 when downloaded
        values.put(MediaStore.Images.Media.IS_PENDING, 0)
        item?.let { resolver.update(it, values, null, null) }

        Toast.makeText(
            applicationContext,
            "Download successfully to ${item?.path}",
            Toast.LENGTH_LONG
        ).show()

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == OPEN_FILE_REQUEST_CODE) {
                data?.data?.also { documentUri ->

                    //Permission needed if you want to retain access even after reboot
                    contentResolver.takePersistableUriPermission(
                        documentUri,
                        Intent.FLAG_GRANT_READ_URI_PERMISSION
                    )
                    Toast.makeText(this, documentUri.path.toString(), Toast.LENGTH_LONG).show()
                }
            } else if (requestCode == OPEN_FOLDER_REQUEST_CODE) {
                val directoryUri = data?.data ?: return

                //Taking permission to retain access
                contentResolver.takePersistableUriPermission(
                    directoryUri,
                    Intent.FLAG_GRANT_READ_URI_PERMISSION
                )
                //Now you have access to the folder, you can easily view the content or do whatever you want.
                val documentsTree = DocumentFile.fromTreeUri(application, directoryUri) ?: return
                val childDocuments = documentsTree.listFiles().asList()
                Toast.makeText(
                    this,
                    "Total Items Under this folder =" + childDocuments.size.toString(),
                    Toast.LENGTH_LONG
                ).show()

            } else if (requestCode == CHOOSE_FILE) {
                if (data != null) {
                    var inputStream: InputStream? = null
                    //Not guaranteed to get the metadata
                    try {

                        inputStream = contentResolver.openInputStream(data.data!!)
                        val exifInterface = ExifInterface(inputStream!!)

                        Toast.makeText(
                            this,
                            "Path = " + data.data + "   ,Latitude = " + exifInterface.getAttribute(
                                ExifInterface.TAG_GPS_LATITUDE
                            ) + "   ,Longitude =" + exifInterface.getAttribute(ExifInterface.TAG_GPS_LONGITUDE),
                            Toast.LENGTH_LONG
                        ).show()
                    } catch (e: IOException) {
                        // Handle any errors
                    } finally {
                        if (inputStream != null) {
                            try {
                                inputStream.close()
                            } catch (ignored: IOException) {
                            }

                        }
                    }
                }
            }
        }
    }
}
```

### Run

Run the project.

### Reference

Find the source code reference below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/niharika2810/ScopedStorageDemo/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/niharika2810/ScopedStorageDemo/) code |
| 3. | [Follow](https://github.com/niharika2810/) code author |
