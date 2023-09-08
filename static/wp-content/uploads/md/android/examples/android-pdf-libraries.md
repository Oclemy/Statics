# Best Android PDF Libraries


> _Best Android PDF Libraries this year._

PDF stands for Portable Document Format. It's a file format developed in the 1990s to present documents, including text formatting and images, in a manner independent of application software, hardware, and operating systems.

PDF was first released 24 years ago in the year `15 June 1993` by Adobe, however is now an open standard maintained by the International Organization for Standardization (ISO).

There are plenty of free and commercial PDF Reader applications for android devices. However, we as developers should build our own little pdf readers that maybe we and our friends can use.

It's not as difficult as you would think and several open source libraries exist to aid in this.

In this piece we will look at some of these libraries and probably snippets of how to use them.


Let's start.

## 1\. AndroidPdfViewer

> This is an open source libary for displaying PDF documents.These PDFs are rendered with PdfiumAndroid.

AndroidPdfViewer is currently the most popular Android PDF View library. It's maintained by [bartesk](https://github.com/barteksc) and he has released various versions of the library independently.

For example, alot of people are still using [AndroidPdfView](https://github.com/barteksc/AndroidPdfViewer), yet there is a [AndroidPdfViewV1](https://github.com/barteksc/AndroidPdfViewerV1) and [AndroidPdfViewV2](https://github.com/barteksc/AndroidPdfViewerV2).

This library has support for `animations`, `gestures`, `zoom` and `double tap` support.

Using this library is easy, very easy.

First you just include it in your app level build.gradle:

```groovy
implementation 'com.github.barteksc:android-pdf-viewer:2.8.2'
```

Then in your layout:

```xml
<com.github.barteksc.pdfviewer.PDFView
        android_id="@+id/pdfView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>
```

Then you can load the pdf from various sources:

```java
pdfView.fromUri(Uri)
or
pdfView.fromFile(File)
or
pdfView.fromBytes(byte[])
or
pdfView.fromStream(InputStream) // stream is written to bytearray - native code cannot use Java Streams
or
pdfView.fromSource(DocumentSource)
or
pdfView.fromAsset(String)
    .pages(0, 2, 1, 3, 3, 3) // all pages are displayed by default
    .enableSwipe(true) // allows to block changing pages using swipe
    .swipeHorizontal(false)
    .enableDoubletap(true)
    .defaultPage(0)
    // allows to draw something on the current page, usually visible in the middle of the screen
    .onDraw(onDrawListener)
    // allows to draw something on all pages, separately for every page. Called only for visible pages
    .onDrawAll(onDrawListener)
    .onLoad(onLoadCompleteListener) // called after document is loaded and starts to be rendered
    .onPageChange(onPageChangeListener)
    .onPageScroll(onPageScrollListener)
    .onError(onErrorListener)
    .onPageError(onPageErrorListener)
    .onRender(onRenderListener) // called after document is rendered for the first time
    // called on single tap, return true if handled, false to toggle scroll handle visibility
    .onTap(onTapListener)
    .enableAnnotationRendering(false) // render annotations (such as comments, colors or forms)
    .password(null)
    .scrollHandle(null)
    .enableAntialiasing(true) // improve rendering a little bit on low-res screens
    // spacing between pages in dp. To define spacing color, set view background
    .spacing(0)
    .invalidPageColor(Color.WHITE) // color of page that is invalid and cannot be loaded
    .load();
```

### Example

Here is an example

```java
@EActivity(R.layout.activity_main)
@OptionsMenu(R.menu.options)
public class PDFViewActivity extends AppCompatActivity implements OnPageChangeListener, OnLoadCompleteListener,
        OnPageErrorListener {

    private static final String TAG = PDFViewActivity.class.getSimpleName();

    private final static int REQUEST_CODE = 42;
    public static final int PERMISSION_CODE = 42042;

    public static final String SAMPLE_FILE = "sample.pdf";
    public static final String READ_EXTERNAL_STORAGE = "android.permission.READ_EXTERNAL_STORAGE";

    @ViewById
    PDFView pdfView;

    @NonConfigurationInstance
    Uri uri;

    @NonConfigurationInstance
    Integer pageNumber = 0;

    String pdfFileName;

    @OptionsItem(R.id.pickFile)
    void pickFile() {
        int permissionCheck = ContextCompat.checkSelfPermission(this,
                READ_EXTERNAL_STORAGE);

        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                    this,
                    new String[]{READ_EXTERNAL_STORAGE},
                    PERMISSION_CODE
            );

            return;
        }

        launchPicker();
    }

    void launchPicker() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("application/pdf");
        try {
            startActivityForResult(intent, REQUEST_CODE);
        } catch (ActivityNotFoundException e) {
            //alert user that file manager not working
            Toast.makeText(this, R.string.toast_pick_file_error, Toast.LENGTH_SHORT).show();
        }
    }

    @AfterViews
    void afterViews() {
        pdfView.setBackgroundColor(Color.LTGRAY);
        if (uri != null) {
            displayFromUri(uri);
        } else {
            displayFromAsset(SAMPLE_FILE);
        }
        setTitle(pdfFileName);
    }

    private void displayFromAsset(String assetFileName) {
        pdfFileName = assetFileName;

        pdfView.fromAsset(SAMPLE_FILE)
                .defaultPage(pageNumber)
                .onPageChange(this)
                .enableAnnotationRendering(true)
                .onLoad(this)
                .scrollHandle(new DefaultScrollHandle(this))
                .spacing(10) // in dp
                .onPageError(this)
                .pageFitPolicy(FitPolicy.BOTH)
                .load();
    }

    private void displayFromUri(Uri uri) {
        pdfFileName = getFileName(uri);

        pdfView.fromUri(uri)
                .defaultPage(pageNumber)
                .onPageChange(this)
                .enableAnnotationRendering(true)
                .onLoad(this)
                .scrollHandle(new DefaultScrollHandle(this))
                .spacing(10) // in dp
                .onPageError(this)
                .load();
    }

    @OnActivityResult(REQUEST_CODE)
    public void onResult(int resultCode, Intent intent) {
        if (resultCode == RESULT_OK) {
            uri = intent.getData();
            displayFromUri(uri);
        }
    }

    @Override
    public void onPageChanged(int page, int pageCount) {
        pageNumber = page;
        setTitle(String.format("%s %s / %s", pdfFileName, page + 1, pageCount));
    }

    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
        }
        if (result == null) {
            result = uri.getLastPathSegment();
        }
        return result;
    }

    @Override
    public void loadComplete(int nbPages) {
        PdfDocument.Meta meta = pdfView.getDocumentMeta();
        Log.e(TAG, "title = " + meta.getTitle());
        Log.e(TAG, "author = " + meta.getAuthor());
        Log.e(TAG, "subject = " + meta.getSubject());
        Log.e(TAG, "keywords = " + meta.getKeywords());
        Log.e(TAG, "creator = " + meta.getCreator());
        Log.e(TAG, "producer = " + meta.getProducer());
        Log.e(TAG, "creationDate = " + meta.getCreationDate());
        Log.e(TAG, "modDate = " + meta.getModDate());

        printBookmarksTree(pdfView.getTableOfContents(), "-");

    }

    public void printBookmarksTree(List<PdfDocument.Bookmark> tree, String sep) {
        for (PdfDocument.Bookmark b : tree) {

            Log.e(TAG, String.format("%s %s, p %d", sep, b.getTitle(), b.getPageIdx()));

            if (b.hasChildren()) {
                printBookmarksTree(b.getChildren(), sep + "-");
            }
        }
    }

    /**
     * Listener for response to user permission request
     *
     * @param requestCode  Check that permission request code matches
     * @param permissions  Permissions that requested
     * @param grantResults Whether permissions granted
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String permissions[],
                                           @NonNull int[] grantResults) {
        if (requestCode == PERMISSION_CODE) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                launchPicker();
            }
        }
    }

    @Override
    public void onPageError(int page, Throwable t) {
        Log.e(TAG, "Cannot load page " + page);
    }
}
```

### Reference

| No | Lin |
| --- | --- |
| 1. | [Browse](https://github.com/barteksc/AndroidPdfViewer/tree/master/sample) Example |
| 2. | [Read more](https://github.com/barteksc/AndroidPdfViewer) |
| 3. | [Direct Download](https://github.com/barteksc/AndroidPdfViewer/archive/master.zip) |

## 2\. PdfiumAndroid

The same author of AndroidPdfViewer, [bartesk](https://github.com/barteksc/PdfiumAndroid) forked PdfiumAndroid from it's [original repository](https://github.com/mshockwave/PdfiumAndroid) and has been maintaining and added some documentation as well.

The [original PdfiumAndroid](https://github.com/mshockwave/PdfiumAndroid) hasn't been maintained.

So the [forked version](https://github.com/barteksc/PdfiumAndroid](https://github.com/barteksc/PdfiumAndroid)) has some documentation and is being actively mainatinaed.

He forked it so as to use it with the popular [AndroidPdfViewer](https://github.com/barteksc/AndroidPdfViewer).

However you can use it independently as well.

First you'd need to add it as a dependency:

```groovy
implementation 'com.github.barteksc:pdfium-android:1.8.2'
```

Then here's a simple example:

```java
void openPdf() {
    ImageView iv = (ImageView) findViewById(R.id.imageView);
    ParcelFileDescriptor fd = ...;
    int pageNum = 0;
    PdfiumCore pdfiumCore = new PdfiumCore(context);
    try {
        PdfDocument pdfDocument = pdfiumCore.newDocument(fd);

        pdfiumCore.openPage(pdfDocument, pageNum);

        int width = pdfiumCore.getPageWidthPoint(pdfDocument, pageNum);
        int height = pdfiumCore.getPageHeightPoint(pdfDocument, pageNum);

        // ARGB_8888 - best quality, high memory usage, higher possibility of OutOfMemoryError
        // RGB_565 - little worse quality, twice less memory usage
        Bitmap bitmap = Bitmap.createBitmap(width, height,
                Bitmap.Config.RGB_565);
        pdfiumCore.renderPageBitmap(pdfDocument, bitmap, pageNum, 0, 0,
                width, height);
        //if you need to render annotations and form fields, you can use
        //the same method above adding 'true' as last param

        iv.setImageBitmap(bitmap);

        printInfo(pdfiumCore, pdfDocument);

        pdfiumCore.closeDocument(pdfDocument); // important!
    } catch(IOException ex) {
        ex.printStackTrace();
    }
}

public void printInfo(PdfiumCore core, PdfDocument doc) {
    PdfDocument.Meta meta = core.getDocumentMeta(doc);
    Log.e(TAG, "title = " + meta.getTitle());
    Log.e(TAG, "author = " + meta.getAuthor());
    Log.e(TAG, "subject = " + meta.getSubject());
    Log.e(TAG, "keywords = " + meta.getKeywords());
    Log.e(TAG, "creator = " + meta.getCreator());
    Log.e(TAG, "producer = " + meta.getProducer());
    Log.e(TAG, "creationDate = " + meta.getCreationDate());
    Log.e(TAG, "modDate = " + meta.getModDate());

    printBookmarksTree(core.getTableOfContents(doc), "-");

}

public void printBookmarksTree(List<PdfDocument.Bookmark> tree, String sep) {
    for (PdfDocument.Bookmark b : tree) {

        Log.e(TAG, String.format("%s %s, p %d", sep, b.getTitle(), b.getPageIdx()));

        if (b.hasChildren()) {
            printBookmarksTree(b.getChildren(), sep + "-");
        }
    }
}
```

| View | Download |
| --- | --- |
| [View](https://github.com/barteksc/PdfiumAndroid) | [Direct Download](https://github.com/barteksc/PdfiumAndroid/archive/master.zip) |

## 3\. PdfBox-Android

PdfBox-Android is a port of Apache's PdfBox library to be usable on Android. Most features should in the parent libray are implemented already in PdfBox-Android.

PdfBox-Android requires Android API 19 and greater for full functionality.

PdfBox-Android is yet another library allowing us to render PDF documents. It was written by [Tom Roush](https://github.com/TomRoush) and has several contributors.

The main code of the PdfBox-Android project is licensed under the Apache 2.0 License, found [here](http://www.apache.org/licenses/LICENSE-2.0.html).

This library has existed for more than 4 years but still get updated regularly.

### Installation of PdfBox-Android

Here's how to install PdfBox-Android.

Go over to your app level build.gradle and add the the implementation statememt:

```groovy
dependencies {
    implementation 'com.tom-roush:pdfbox-android:1.8.10.3'
}
```

You can check the latest version [here](https://bintray.com/birdbrain2/PdfBox-Android/PdfBox-Android/1.8.10.0).

If you are using Maven then:

```xml
<dependency>
  <groupId>com.tom_roush</groupId>
  <artifactId>pdfbox-android</artifactId>
  <version>1.8.10.0</version>
  <type>pom</type>
</dependency>
```

Before calls to PDFBox are made it is highly recommended to initialize the library's resource loader. Add the following line before calling PDFBox methods:

```java
PDFBoxResourceLoader.init(getApplicationContext());
```

### Example

Here is an example:

**MainActivity.java**

```java
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
        // Enable Android asset loading
        PDFBoxResourceLoader.init(getApplicationContext());
        // Find the root of the external storage.

        root = getApplicationContext().getCacheDir();
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
//        try
//        {
//            // Replace MyFontFile with the path to the asset font you'd like to use.
//            // Or use LiberationSans "com/tom_roush/pdfbox/resources/ttf/LiberationSans-Regular.ttf"
//            font = PDType0Font.load(document, assetManager.open("MyFontFile.TTF"));
//        }
//        catch (IOException e)
//        {
//            Log.e("PdfBox-Android-Sample", "Could not load font", e);
//        }

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
            String path = root.getAbsolutePath() + "/Created.pdf";
            document.save(path);
            document.close();
            tv.setText("Successfully wrote PDF to " + path);

        } catch (IOException e) {
            Log.e("PdfBox-Android-Sample", "Exception thrown while creating PDF", e);
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
            pageImage = renderer.renderImage(0, 1, ImageType.RGB);

            // Save the render result to an image
            String path = root.getAbsolutePath() + "/render.jpg";
            File renderFile = new File(path);
            FileOutputStream fileOut = new FileOutputStream(renderFile);
            pageImage.compress(Bitmap.CompressFormat.JPEG, 100, fileOut);
            fileOut.close();
            tv.setText("Successfully rendered image to " + path);
            // Optional: display the render result on screen
            displayRenderedImage();
        }
        catch (IOException e)
        {
            Log.e("PdfBox-Android-Sample", "Exception thrown while rendering file", e);
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
            ((PDCheckBox) checkbox).check();

            PDField radio = acroForm.getField("Radio");
            ((PDRadioButton)radio).setValue("Second");

            PDField listbox = acroForm.getField("ListBox");
            List<Integer> listValues = new ArrayList<>();
            listValues.add(1);
            listValues.add(2);
            ((PDListBox) listbox).setSelectedOptionsIndex(listValues);

            PDField dropdown = acroForm.getField("Dropdown");
            ((PDComboBox) dropdown).setValue("Hello");

            String path = root.getAbsolutePath() + "/FilledForm.pdf";
            tv.setText("Saved filled form to " + path);
            document.save(path);
            document.close();
        } catch (IOException e) {
            Log.e("PdfBox-Android-Sample", "Exception thrown while filling form fields", e);
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
            Log.e("PdfBox-Android-Sample", "Exception thrown while loading document to strip", e);
        }

        try {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            pdfStripper.setStartPage(0);
            pdfStripper.setEndPage(1);
            parsedText = "Parsed text: " + pdfStripper.getText(document);
        }
        catch (IOException e)
        {
            Log.e("PdfBox-Android-Sample", "Exception thrown while stripping text", e);
        } finally {
            try {
                if (document != null) document.close();
            }
            catch (IOException e)
            {
                Log.e("PdfBox-Android-Sample", "Exception thrown while closing document", e);
            }
        }
        tv.setText(parsedText);
    }

    /**
     * Creates a simple pdf and encrypts it
     */
    public void createEncryptedPdf(View v)
    {
        String path = root.getAbsolutePath() + "/crypt.pdf";

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
            tv.setText("Successfully wrote PDF to " + path);

        }
        catch (IOException e)
        {
            Log.e("PdfBox-Android-Sample", "Exception thrown while creating PDF for encryption", e);
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

### Reference

Get PdfBox-Android below:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Example](https://github.com/TomRoush/PdfBox-Android/tree/master/sample) |
| 2. | GitHub | [Direct Download](https://github.com/TomRoush/PdfBox-Android/archive/master.zip) |
| 3. | GitHub | [Browse](https://github.com/TomRoush/PdfBox-Android) |

## 4\. PdfViewPager

> Android widget that can render PDF documents stored on SD card, linked as assets, or downloaded from a remote URL.

This widget can display PDF documents in your Activities or Fragments.

> Important note: **PDFViewPager** uses [PdfRenderer](http://developer.android.com/reference/android/graphics/pdf/PdfRenderer.html) class, which works **only on API 21 or higher**. See [Official doc](http://developer.android.com/reference/android/graphics/pdf/PdfRenderer.html) for details.

Here is the demo:

![PDFViewpager](https://github.com/voghDev/PdfViewPager/raw/master/screenshots/local.gif)

### Step 1: Install it

Install it by adding the following implementation statement in your app level build.gradle file:

```groovy
implementation 'es.voghdev.pdfviewpager:library:1.1.2'
```

### Step 2: Step Add it to Layout

PDFViewPager can be added to a page declaratively or imperatively. To add it declaratively add the following to your layout:

```xml
<es.voghdev.pdfviewpager.library.PDFViewPager
    android:id="@+id/pdfViewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

### Step 3: Write Code

**Load PDFs from Asset Folder**

If you PDF file is located in the assets folder then copy it to cache directory.

```java
CopyAsset copyAsset = new CopyAssetThreadImpl(context, new Handler());
copyAsset.copy(asset, new File(getCacheDir(), "sample.pdf").getAbsolutePath(
```

You can then load it as follows:

```xml
<es.voghdev.pdfviewpager.library.PDFViewPager
    android:id="@+id/pdfViewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:assetFileName="sample.pdf"/>
```

or like this:

```java
pdfViewPager = new PDFViewPager(this, "sample.pdf");
```

Then release resourcesby closing the `close()` like this:

```java
@Override
protected void onDestroy() {
    super.onDestroy();

    ((PDFPagerAdapter) pdfViewPager.getAdapter()).close();
}
```

**Load PDFs from SD Card**

If your PDFs are located in the SD Card then create a **PDFViewPager** object, passing the file location in your SD card

```java
PDFViewPager pdfViewPager = new PDFViewPager(context, getPdfPathOnSDCard());

protected String getPdfPathOnSDCard() {
    File f = new File(getExternalFilesDir("pdf"), "adobe.pdf");
    return f.getAbsolutePath();
}
```

Then release occuppied resources:

```java
    @Override
    protected void onDestroy() {
        super.onDestroy();

        ((PDFPagerAdapter) pdfViewPager.getAdapter()).close();
    }
```

**How to load PDFs from Remote Sources**

Start by adding the following permissions in your android manifest:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Then make your Activity or Fragment implement `DownloadFile.Listener`:

```java
public class RemotePDFActivity extends AppCompatActivity implements DownloadFile.Listener {
```

Then Create a **RemotePDFViewPager** object:

```java
String url = "http://www.cals.uidaho.edu/edComm/curricula/CustRel_curriculum/content/sample.pdf";

RemotePDFViewPager remotePDFViewPager =
      new RemotePDFViewPager(context, url, this);
```

Then handle the events:

```java
@Override
public void onSuccess(String url, String destinationPath) {
    // That's the positive case. PDF Download went fine

    adapter = new PDFPagerAdapter(this, "AdobeXMLFormsSamples.pdf");
    remotePDFViewPager.setAdapter(adapter);
    setContentView(remotePDFViewPager);
}

@Override
public void onFailure(Exception e) {
    // This will be called if download fails
}

@Override
public void onProgressUpdate(int progress, int total) {
    // You will get download progress here
    // Always on UI Thread so feel free to update your views here
}
```

And of course close the adapter:

```java
@Override
protected void onDestroy() {
    super.onDestroy();

    adapter.close();
}
```

Find full examples below.

### Reference

| No. | Link |
| --- | --- |
| 1. | [Browse](https://github.com/voghDev/PdfViewPager/tree/master/sample) Examples |
| 2. | [Read](https://github.com/voghDev/PdfViewPager) more |
| 3. | [Follow](https://github.com/voghDev) library author |
