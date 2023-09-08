# PDFBox Tutorial and Example


_PdfBox-Android Library Tutorial and Example._

This is an android PDFBox Tutorial.

PdfBox-Android is a port of Apache's PdfBox library to be usable on Android.

Majority of the features available in the parent libray are implemented already in PdfBox-Android.

PdfBox-Android requires `Android API 19` and greater for full functionality.


### Why PDFBox

This library is important as rendering of PDF documents is important as a capability in many apps. These days there are many documents which get rendered in form a PDF file. PDF documents have the advantage of portability and are concrete and not fragile for editability. You need special softwares to edit them. However their disadvantage is that you also need special PDF readers to read them.

So that's where libraries like PDFBox come in place. They allow us easily read these documents within our application. Thus we don't have to ask users to search for third party PDF reader.

### What is PDF?

PDF is an acronym for Portable Document Format. It's a format for presenting documents in way that makes them poratble yet easily preserving the appearance of those documents.

Long long ago, in the early 1990's PDF documents had to be viewed using expensive software. Yet they still had a ton of limitations like not being able to include embedded links. They were also too large.

However these days PDF documents are lightweight, portable and have a ton of features.

### What We Learn

We will look at a simple example of how to render PDF documents using PDfBox librray. Those PDF documents will be stored in the Assets Folder.

We also learn:

1. How to Install PDFBox.
2. Some important PDFBox APIs.
3. Full Example.

Let's start by looking at installation.

### Installation

We can install PdfBox-Android via Gradle or Maven. If you are using Android Studio probably you'll use gradle.

So go over to your app level `build.gradle` file and add the the implementation statememt:

```groovy
dependencies {
    implementation 'com.tom_roush:pdfbox-android:1.8.10.0'
}
```

You can check the latest version [here](https://bintray.com/birdbrain2/PdfBox-Android/PdfBox-Android/1.8.10.0).

If you are using Maven then add the following in your `pom.xml` file:

```xml
<dependency>
  <groupId>com.tom_roush</groupId>
  <artifactId>pdfbox-android</artifactId>
  <version>1.8.10.0</version>
  <type>pom</type>
</dependency>
```

[notice] Before calls to PDFBox are made it is highly recommended to initialize the library's resource loader. Add the following line before calling PDFBox methods:

```java
PDFBoxResourceLoader.init(getApplicationContext());
```

[/notice]

### Important PdfBox-Android Classes

**(a). PDDocument**

PDDocument is the in-memory representation of the PDF document. This class is implementing the `Closeable` interface. It's `close()` method must be called once the document is no longer needed. Here's one of the ways we can instantiate.

```java
        PDDocument document = new PDDocument();
```

**(b). PDPage**

This class represents a page in a PDF document.

Let's say we want to create a `PDPage` and add to the `PDDocument`:

```java
        PDPage page = new PDPage();
        document.addPage(page);
```

**(c). PDFont**

This is the base class for all PDF fonts.

```java
        PDFont font = PDType1Font.HELVETICA;
```

**(d). PDPageContentStream**

Provides the ability to write to a page content stream.

```java
        try {
            // Define a content stream for adding to the PDF
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
        }catch(IOException ie){}
```

### Full PdfBox-Android Examples

#### (1). Example 1.

Let's start by looking at various files:

##### (a). AndroidManifest.xml

Here we will need to add permission for external storage usage.

```xml
  <uses-permission android_name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

##### (b). build.gradle

In your app level build.gradle add depenedencies:

```groovy
dependencies {
    implementation 'com.tom_roush:pdfbox-android:1.8.10.0'
    implementation 'com.android.support:appcompat-v7:21.0.3'
}
```

##### (c). Assets

Create an assets folder and add your PDF documents there.

##### (b). activity_main.xml

Here we add several buttons for creating PDF, rendering it, filling form, stripping text etc. Then we add the ImageView that will render the PDF document.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <Button
        android_id="@+id/buttonCreate"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Create PDF"
        android_layout_alignParentTop="true"
        android_layout_marginTop="10dp"
        android_onClick="createPdf" />

    <Button
        android_id="@+id/buttonRender"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Render PDF to Image"
        android_layout_below="@+id/buttonCreate"
        android_layout_marginTop="10dp"
        android_onClick="renderFile" />

    <Button
        android_id="@+id/buttonFillForm"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Fill PDF Form"
        android_layout_below="@+id/buttonRender"
        android_layout_marginTop="10dp"
        android_onClick="fillForm" />

    <Button
        android_id="@+id/buttonStripText"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Strip Text From PDF"
        android_layout_below="@+id/buttonFillForm"
        android_layout_marginTop="10dp"
        android_onClick="stripText" />

    <TextView
        android_id="@+id/statusTextView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_below="@+id/buttonStripText"
        android_text="@string/hello_world"
        android_background="#EEE"/>

    <ImageView
        android_id="@+id/renderedImageView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignLeft="@+id/statusTextView"
        android_layout_below="@+id/statusTextView" />

</RelativeLayout>
```

#### (d). MainActivity.java

Here's the full code for the example.

```java
package com.tom_roush.pdfbox.sample;

import android.app.Activity;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.tom_roush.pdfbox.pdmodel.PDDocument;
import com.tom_roush.pdfbox.pdmodel.PDDocumentCatalog;
import com.tom_roush.pdfbox.pdmodel.PDPage;
import com.tom_roush.pdfbox.pdmodel.PDPageContentStream;
import com.tom_roush.pdfbox.pdmodel.encryption.AccessPermission;
import com.tom_roush.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import com.tom_roush.pdfbox.pdmodel.font.PDFont;
import com.tom_roush.pdfbox.pdmodel.font.PDType1Font;
import com.tom_roush.pdfbox.pdmodel.graphics.image.JPEGFactory;
import com.tom_roush.pdfbox.pdmodel.graphics.image.LosslessFactory;
import com.tom_roush.pdfbox.pdmodel.graphics.image.PDImageXObject;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDAcroForm;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDCheckbox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDComboBox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDField;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDListBox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDRadioButton;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDTextField;
import com.tom_roush.pdfbox.rendering.PDFRenderer;
import com.tom_roush.pdfbox.text.PDFTextStripper;
import com.tom_roush.pdfbox.util.PDFBoxResourceLoader;

import org.spongycastle.jce.provider.BouncyCastleProvider;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.Security;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {
    File root;
    AssetManager assetManager;
    Bitmap pageImage;
    TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    protected void onStart() {
        super.onStart();
        setup();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    /**
     * Initializes variables used for convenience
     */
    private void setup() {
        // Enable Android-style asset loading (highly recommended)
        PDFBoxResourceLoader.init(getApplicationContext());
        // Find the root of the external storage.
        root = android.os.Environment.getExternalStorageDirectory();
        assetManager = getAssets();
        tv = (TextView) findViewById(R.id.statusTextView);
    }

    /**
     * Creates a new PDF from scratch and saves it to a file
     */
    public void createPdf(View v) {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        // Create a new font object selecting one of the PDF base fonts
        PDFont font = PDType1Font.HELVETICA;
        // Or a custom font
//      try {
//          PDType0Font font = PDType0Font.load(document, assetManager.open("MyFontFile.TTF"));
//      } catch(IOException e) {
//          e.printStackTrace();
//      }

        PDPageContentStream contentStream;

        try {
            // Define a content stream for adding to the PDF
            contentStream = new PDPageContentStream(document, page);

            // Write Hello World in blue text
            contentStream.beginText();
            contentStream.setNonStrokingColor(15, 38, 192);
            contentStream.setFont(font, 12);
            contentStream.newLineAtOffset(100, 700);
            contentStream.showText("Hello World");
            contentStream.endText();

            // Load in the images
            InputStream in = assetManager.open("falcon.jpg");
            InputStream alpha = assetManager.open("trans.png");

            // Draw a green rectangle
            contentStream.addRect(5, 500, 100, 100);
            contentStream.setNonStrokingColor(0, 255, 125);
            contentStream.fill();

            // Draw the falcon base image
            PDImageXObject ximage = JPEGFactory.createFromStream(document, in);
            contentStream.drawImage(ximage, 20, 20);

            // Draw the red overlay image
            Bitmap alphaImage = BitmapFactory.decodeStream(alpha);
            PDImageXObject alphaXimage = LosslessFactory.createFromImage(document, alphaImage);
            contentStream.drawImage(alphaXimage, 20, 20 );

            // Make sure that the content stream is closed:
            contentStream.close();

            // Save the final pdf document to a file
            String path = root.getAbsolutePath() + "/Download/Created.pdf";
            document.save(path);
            document.close();
            tv.setText("Successfully wrote PDF to " + path);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Loads an existing PDF and renders it to a Bitmap
     */
    public void renderFile(View v) {
        // Render the page and save it to an image file
        try {
            // Load in an already created PDF
            PDDocument document = PDDocument.load(assetManager.open("Created.pdf"));
            // Create a renderer for the document
            PDFRenderer renderer = new PDFRenderer(document);
            // Render the image to an RGB Bitmap
            pageImage = renderer.renderImage(0, 1, Bitmap.Config.RGB_565);

            // Save the render result to an image
            String path = root.getAbsolutePath() + "/Download/render.jpg";
            File renderFile = new File(path);
            FileOutputStream fileOut = new FileOutputStream(renderFile);
            pageImage.compress(Bitmap.CompressFormat.JPEG, 100, fileOut);
            fileOut.close();
            tv.setText("Successfully rendered image to " + path);
            // Optional: display the render result on screen
            displayRenderedImage();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Fills in a PDF form and saves the result
     */
    public void fillForm(View v) {
        try {
            // Load the document and get the AcroForm
            PDDocument document = PDDocument.load(assetManager.open("FormTest.pdf"));
            PDDocumentCatalog docCatalog = document.getDocumentCatalog();
            PDAcroForm acroForm = docCatalog.getAcroForm();

            // Fill the text field
            PDTextField field = (PDTextField) acroForm.getField("TextField");
            field.setValue("Filled Text Field");
            // Optional: don't allow this field to be edited
            field.setReadOnly(true);

            PDField checkbox = acroForm.getField("Checkbox");
            ((PDCheckbox) checkbox).check();

            PDField radio = acroForm.getField("Radio");
            ((PDRadioButton)radio).setValue("Second");

            PDField listbox = acroForm.getField("ListBox");
            List<Integer> listValues = new ArrayList<>();
            listValues.add(1);
            listValues.add(2);
            ((PDListBox) listbox).setSelectedOptionsIndex(listValues);

            PDField dropdown = acroForm.getField("Dropdown");
            ((PDComboBox) dropdown).setValue("Hello");

            String path = root.getAbsolutePath() + "/Download/FilledForm.pdf";
            tv.setText("Saved filled form to " + path);
            document.save(path);
            document.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Strips the text from a PDF and displays the text on screen
     */
    public void stripText(View v) {
        String parsedText = null;
        PDDocument document = null;
        try {
            document = PDDocument.load(assetManager.open("Hello.pdf"));
        } catch(IOException e) {
            e.printStackTrace();
        }

        try {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            pdfStripper.setStartPage(0);
            pdfStripper.setEndPage(1);
            parsedText = "Parsed text: " + pdfStripper.getText(document);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (document != null) document.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        tv.setText(parsedText);
    }

    /**
     * Creates a simple pdf and encrypts
     */
    public void createEncryptedPdf()
    {
        String path = root.getAbsolutePath() + "/Download/crypt.pdf";

        int keyLength = 128; // 128 bit is the highest currently supported

        // Limit permissions of those without the password
        AccessPermission ap = new AccessPermission();
        ap.setCanPrint(false);

        // Sets the owner password and user password
        StandardProtectionPolicy spp = new StandardProtectionPolicy("12345", "hi", ap);

        // Setups up the encryption parameters
        spp.setEncryptionKeyLength(keyLength);
        spp.setPermissions(ap);
        BouncyCastleProvider provider = new BouncyCastleProvider();
        Security.addProvider(provider);

        PDFont font = PDType1Font.HELVETICA;
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();

        document.addPage(page);

        try
        {
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Write Hello World in blue text
            contentStream.beginText();
            contentStream.setNonStrokingColor(15, 38, 192);
            contentStream.setFont(font, 12);
            contentStream.newLineAtOffset(100, 700);
            contentStream.showText("Hello World");
            contentStream.endText();
            contentStream.close();

            // Save the final pdf document to a file
            document.protect(spp); // Apply the protections to the PDF
            document.save(path);
            document.close();

        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * Helper method for drawing the result of renderFile() on screen
     */
    private void displayRenderedImage() {
        new Thread() {
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        ImageView imageView = (ImageView) findViewById(R.id.renderedImageView);
                        imageView.setImageBitmap(pageImage);
                    }
                });
            }
        }.start();
    }
}
```

#### Download

Get PdfBox-Android below:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/TomRoush/PdfBox-Android/archive/master.zip) |
| 2. | GitHub | [Browse Sample](https://github.com/TomRoush/PdfBox-Android/tree/master/sample) |
