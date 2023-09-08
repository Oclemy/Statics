# How to programmatically compress images - Android Solutions

Image compression is a type of data compression applied to digital images, to reduce their cost for storage or transmission. This very relevant to android devices since we don't want to be exorbitant with the user's bandwith nor use too much storage. Thus in this article we will look at how to compress images in android programmatically using several libraries.


## (a). Use Compression

> Compression is an android image compression library.

It is a lightweight and powerful android image compression library. Compressor will allow you to compress large photos into smaller sized photos with very less or negligible loss in quality of the image.

### Step 1: Install Compressor

Start by installing compressor. It's hosted in jcenter so add the following in dependencies closure in your app module's build.gradle file:

```groovy
implementation 'id.zelory:compressor:3.0.1'
```

Then sync to fetch it.

### Step 2: Compress Image

To compress an image all you need to do is call the `compress()` method, passing in the context as well as the image file:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile)
```

If you want to compress it and save it to a specific destination then you do this:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    default()
    destination(myFile)
}
```

You can also create a custom compressor as below:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    default(width = 640, format = Bitmap.CompressFormat.WEBP)
}
```

For full custom constraint:

```kotlin
val compressedImageFile = Compressor.compress(context, actualImageFile) {
    resolution(1280, 720)
    quality(80)
    format(Bitmap.CompressFormat.WEBP)
    size(2_097_152) // 2 MB
}
```

To use your own custom constraint:

```kotlin
class MyLowerCaseNameConstraint: Constraint {
    override fun isSatisfied(imageFile: File): Boolean {
        return imageFile.name.all { it.isLowerCase() }
    }

    override fun satisfy(imageFile: File): File {
        val destination = File(imageFile.parent, imageFile.name.toLowerCase())
        imageFile.renameTo(destination)
        return destination
    }
}

val compressedImageFile = Compressor.compress(context, actualImageFile) {
    constraint(MyLowerCaseNameConstraint()) // your own constraint
    quality(80) // combine with compressor constraint
    format(Bitmap.CompressFormat.WEBP)
}
```

You can create your own extension:

```kotlin
fun Compression.lowerCaseName() {
    constraint(MyLowerCaseNameConstraint())
}

val compressedImageFile = Compressor.compress(context, actualImageFile) {
    lowerCaseName() // your own extension
    quality(80) // combine with compressor constraint
    format(Bitmap.CompressFormat.WEBP)
}
```

### Example

Let's look at a full example of using a compressor to compress image.

**(a). FileUtil.kt**

Start by creating a file utilities classs:

```kotlin
package id.zelory.compressor.sample;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;
import android.util.Log;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created on : June 18, 2016
 * Author     : zetbaitsu
 * Name       : Zetra
 * GitHub     : https://github.com/zetbaitsu
 */
class FileUtil {
    private static final int EOF = -1;
    private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;

    private FileUtil() {

    }

    public static File from(Context context, Uri uri) throws IOException {
        InputStream inputStream = context.getContentResolver().openInputStream(uri);
        String fileName = getFileName(context, uri);
        String[] splitName = splitFileName(fileName);
        File tempFile = File.createTempFile(splitName[0], splitName[1]);
        tempFile = rename(tempFile, fileName);
        tempFile.deleteOnExit();
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(tempFile);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        if (inputStream != null) {
            copy(inputStream, out);
            inputStream.close();
        }

        if (out != null) {
            out.close();
        }
        return tempFile;
    }

    private static String[] splitFileName(String fileName) {
        String name = fileName;
        String extension = "";
        int i = fileName.lastIndexOf(".");
        if (i != -1) {
            name = fileName.substring(0, i);
            extension = fileName.substring(i);
        }

        return new String[]{name, extension};
    }

    private static String getFileName(Context context, Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf(File.separator);
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }

    private static File rename(File file, String newName) {
        File newFile = new File(file.getParent(), newName);
        if (!newFile.equals(file)) {
            if (newFile.exists() && newFile.delete()) {
                Log.d("FileUtil", "Delete old " + newName + " file");
            }
            if (file.renameTo(newFile)) {
                Log.d("FileUtil", "Rename file to " + newName);
            }
        }
        return newFile;
    }

    private static long copy(InputStream input, OutputStream output) throws IOException {
        long count = 0;
        int n;
        byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
        while (EOF != (n = input.read(buffer))) {
            output.write(buffer, 0, n);
            count += n;
        }
        return count;
    }
}
```

**(b). MainActivity.kt**

Then the main activity:

```kotlin
class MainActivity : AppCompatActivity() {
    companion object {
        private const val PICK_IMAGE_REQUEST = 1
    }

    private var actualImage: File? = null
    private var compressedImage: File? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        actualImageView.setBackgroundColor(getRandomColor())
        clearImage()
        setupClickListener()
    }

    private fun setupClickListener() {
        chooseImageButton.setOnClickListener { chooseImage() }
        compressImageButton.setOnClickListener { compressImage() }
        customCompressImageButton.setOnClickListener { customCompressImage() }
    }

    private fun chooseImage() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "image/*"
        startActivityForResult(intent, PICK_IMAGE_REQUEST)
    }

    private fun compressImage() {
        actualImage?.let { imageFile ->
            lifecycleScope.launch {
                // Default compression
                compressedImage = Compressor.compress(this@MainActivity, imageFile)
                setCompressedImage()
            }
        } ?: showError("Please choose an image!")
    }

    private fun customCompressImage() {
        actualImage?.let { imageFile ->
            lifecycleScope.launch {
                // Default compression with custom destination file
                /*compressedImage = Compressor.compress(this@MainActivity, imageFile) {
                    default()
                    getExternalFilesDir(Environment.DIRECTORY_PICTURES)?.also {
                        val file = File("${it.absolutePath}${File.separator}my_image.${imageFile.extension}")
                        destination(file)
                    }
                }*/

                // Full custom
                compressedImage = Compressor.compress(this@MainActivity, imageFile) {
                    resolution(1280, 720)
                    quality(80)
                    format(Bitmap.CompressFormat.WEBP)
                    size(2_097_152) // 2 MB
                }
                setCompressedImage()
            }
        } ?: showError("Please choose an image!")
    }

    private fun setCompressedImage() {
        compressedImage?.let {
            compressedImageView.setImageBitmap(BitmapFactory.decodeFile(it.absolutePath))
            compressedSizeTextView.text = String.format("Size : %s", getReadableFileSize(it.length()))
            Toast.makeText(this, "Compressed image save in " + it.path, Toast.LENGTH_LONG).show()
            Log.d("Compressor", "Compressed image save in " + it.path)
        }
    }

    private fun clearImage() {
        actualImageView.setBackgroundColor(getRandomColor())
        compressedImageView.setImageDrawable(null)
        compressedImageView.setBackgroundColor(getRandomColor())
        compressedSizeTextView.text = "Size : -"
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK) {
            if (data == null) {
                showError("Failed to open picture!")
                return
            }
            try {
                actualImage = FileUtil.from(this, data.data)?.also {
                    actualImageView.setImageBitmap(loadBitmap(it))
                    actualSizeTextView.text = String.format("Size : %s", getReadableFileSize(it.length()))
                    clearImage()
                }
            } catch (e: IOException) {
                showError("Failed to read picture data!")
                e.printStackTrace()
            }
        }
    }

    private fun showError(errorMessage: String) {
        Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show()
    }

    private fun getRandomColor() = Random().run {
        Color.argb(100, nextInt(256), nextInt(256), nextInt(256))
    }

    private fun getReadableFileSize(size: Long): String {
        if (size <= 0) {
            return "0"
        }
        val units = arrayOf("B", "KB", "MB", "GB", "TB")
        val digitGroups = (log10(size.toDouble()) / log10(1024.0)).toInt()
        return DecimalFormat("#,##0.#").format(size / 1024.0.pow(digitGroups.toDouble())) + " " + units[digitGroups]
    }
}
```

Find the full source code [here](https://github.com/zetbaitsu/Compressor/tree/master/app)

### Reference

Find complete reference [here](https://github.com/zetbaitsu/Compressor)
