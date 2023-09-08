# Printing custom documents

For some applications, such as drawing apps, page layout apps and other apps that focus on graphic output, creating beautiful printed pages is a key feature. In this case, it is not enough to print an image or an HTML document. The print output for these types of applications requires precise control of everything that goes into a page, including fonts, text flow, page breaks, headers, footers, and graphic elements.

Creating print output that is completely customized for your application requires more programming investment than the previously discussed approaches. You must build components that communicate with the print framework, adjust to printer settings, draw page elements and manage printing on multiple pages.

This lesson shows you how you connect with the print manager, create a print adapter and build content for printing.

Connect to the print manager
----------------------------

When your application manages the printing process directly, the first step after receiving a print request from your user is to connect to the Android print framework and obtain an instance of the `PrintManager` class. This class allows you to initialize a print job and begin the printing lifecycle. The following code example shows how to get the print manager and start the printing process.

### Kotlin

```kotlin
private fun doPrint() {
    activity?.also { context ->
        // Get a PrintManager instance
        val printManager = context.getSystemService(Context.PRINT_SERVICE) as PrintManager
        // Set job name, which will be displayed in the print queue
        val jobName = "${context.getString(R.string.app_name)} Document"
        // Start a print job, passing in a PrintDocumentAdapter implementation
        // to handle the generation of a print document
        printManager.print(jobName, MyPrintDocumentAdapter(context), null)
    }
}
```

### Java

```java
private void doPrint() {
    // Get a PrintManager instance
    PrintManager printManager = (PrintManager) getActivity()
            .getSystemService(Context.PRINT_SERVICE);

    // Set job name, which will be displayed in the print queue
    String jobName = getActivity().getString(R.string.app_name) + " Document";

    // Start a print job, passing in a PrintDocumentAdapter implementation
    // to handle the generation of a print document
    printManager.print(jobName, new MyPrintDocumentAdapter(getActivity()),
            null); //
}
```

The example code above demonstrates how to name a print job and set an instance of the `PrintDocumentAdapter` class which handles the steps of the printing lifecycle. The implementation of the print adapter class is discussed in the next section.

**Note:** The last parameter in the `print()` method takes a `PrintAttributes` object. You can use this parameter to provide hints to the printing framework and pre-set options based on the previous printing cycle, thereby improving the user experience. You may also use this parameter to set options that are more appropriate to the content being printed, such as setting the orientation to landscape when printing a photo that is in that orientation.

Create a print adapter
----------------------

A print adapter interacts with the Android print framework and handles the steps of the printing process. This process requires users to select printers and print options before creating a document for printing. These selections can influence the final output as the user chooses printers with different output capabilities, different page sizes, or different page orientations. As these selections are made, the print framework asks your adapter to lay out and generate a print document, in preparation for final output. Once a user taps the print button, the framework takes the final print document and passes it to a print provider for output. During the printing process, users can choose to cancel the print action, so your print adapter must also listen for and react to a cancellation requests.

The `PrintDocumentAdapter` abstract class is designed to handle the printing lifecycle, which has four main callback methods. You must implement these methods in your print adapter in order to interact properly with the print framework:

*   `onStart()` - Called once at the beginning of the print process. If your application has any one-time preparation tasks to perform, such as getting a snapshot of the data to be printed, execute them here. Implementing this method in your adapter is not required.
*   `onLayout()` - Called each time a user changes a print setting which impacts the output, such as a different page size, or page orientation, giving your application an opportunity to compute the layout of the pages to be printed. At the minimum, this method must return how many pages are expected in the printed document.
*   `onWrite()` - Called to render printed pages into a file to be printed. This method may be called one or more times after each `onLayout()` call.
*   `onFinish()` - Called once at the end of the print process. If your application has any one-time tear-down tasks to perform, execute them here. Implementing this method in your adapter is not required.

The following sections describe how to implement the layout and write methods, which are critical to the functioning of a print adapter.

> **Note:** These adapter methods are called on the main thread of your application. If you expect the execution of these methods in your implementation to take a significant amount of time, implement them to execute within a separate thread. For example, you can encapsulate the layout or print document writing work in separate `AsyncTask` objects.

### Compute print document info

Within an implementation of the `PrintDocumentAdapter` class, your application must be able to specify the type of document it is creating and calculate the total number of pages for print job, given information about the printed page size. The implementation of the `onLayout()` method in the adapter makes these calculations and provides information about the expected output of the print job in a `PrintDocumentInfo` class, including the number of pages and content type. The following code example shows a basic implementation of the `onLayout()` method for a `PrintDocumentAdapter`:

### Kotlin

```kotlin
override fun onLayout(
        oldAttributes: PrintAttributes?,
        newAttributes: PrintAttributes,
        cancellationSignal: CancellationSignal?,
        callback: LayoutResultCallback,
        extras: Bundle?
) {
    // Create a new PdfDocument with the requested page attributes
    pdfDocument = PrintedPdfDocument(activity, newAttributes)

    // Respond to cancellation request
    if (cancellationSignal?.isCanceled == true) {
        callback.onLayoutCancelled()
        return
    }

    // Compute the expected number of printed pages
    val pages = computePageCount(newAttributes)

    if (pages > 0) {
        // Return print information to print framework
        PrintDocumentInfo.Builder("print_output.pdf")
                .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                .setPageCount(pages)
                .build()
                .also { info ->
                    // Content layout reflow is complete
                    callback.onLayoutFinished(info, true)
                }
    } else {
        // Otherwise report an error to the print framework
        callback.onLayoutFailed("Page count calculation failed.")
    }
}
```

### Java

```java
@Override
public void onLayout(PrintAttributes oldAttributes,
                     PrintAttributes newAttributes,
                     CancellationSignal cancellationSignal,
                     LayoutResultCallback callback,
                     Bundle metadata) {
    // Create a new PdfDocument with the requested page attributes
    pdfDocument = new PrintedPdfDocument(getActivity(), newAttributes);

    // Respond to cancellation request
    if (cancellationSignal.isCanceled() ) {
        callback.onLayoutCancelled();
        return;
    }

    // Compute the expected number of printed pages
    int pages = computePageCount(newAttributes);

    if (pages > 0) {
        // Return print information to print framework
        PrintDocumentInfo info = new PrintDocumentInfo
                .Builder("print_output.pdf")
                .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                .setPageCount(pages)
                .build();
        // Content layout reflow is complete
        callback.onLayoutFinished(info, true);
    } else {
        // Otherwise report an error to the print framework
        callback.onLayoutFailed("Page count calculation failed.");
    }
}
```

The execution of `onLayout()` method can have three outcomes: completion, cancellation, or failure in the case where calculation of the layout cannot be completed. You must indicate one of these results by calling the appropriate method of the `PrintDocumentAdapter.LayoutResultCallback` object.

> **Note:** The boolean parameter of the `onLayoutFinished()` method indicates whether or not the layout content has actually changed since the last request. Setting this parameter properly allows the print framework to avoid unnecessarily calling the `onWrite()` method, essentially caching the previously written print document and improving performance.

The main work of `onLayout()` is calculating the number of pages that are expected as output given the attributes of the printer. How you calculate this number is highly dependent on how your application lays out pages for printing. The following code example shows an implementation where the number of pages is determined by the print orientation:

### Kotlin

```kotlin
private fun computePageCount(printAttributes: PrintAttributes): Int {
    var itemsPerPage = 4 // default item count for portrait mode

    val pageSize = printAttributes.mediaSize
    if (!pageSize.isPortrait) {
        // Six items per page in landscape orientation
        itemsPerPage = 6
    }

    // Determine number of print items
    val printItemCount: Int = getPrintItemCount()

    return Math.ceil((printItemCount / itemsPerPage.toDouble())).toInt()
}
```

### Java

```java
private int computePageCount(PrintAttributes printAttributes) {
    int itemsPerPage = 4; // default item count for portrait mode

    MediaSize pageSize = printAttributes.getMediaSize();
    if (!pageSize.isPortrait()) {
        // Six items per page in landscape orientation
        itemsPerPage = 6;
    }

    // Determine number of print items
    int printItemCount = getPrintItemCount();

    return (int) Math.ceil(printItemCount / itemsPerPage);
}
```

### Write a print document file

When it is time to write print output to a file, the Android print framework calls the `onWrite()` method of your application's `PrintDocumentAdapter` class. The method's parameters specify which pages should be written and the output file to be used. Your implementation of this method must then render each requested page of content to a multi-page PDF document file. When this process is complete, you call the `onWriteFinished()` method of the callback object.

> **Note:** The Android print framework may call the `onWrite()` method one or more times for every call to `onLayout()`. For this reason, it is important to set the boolean parameter of `onLayoutFinished()` method to `false` when the print content layout has not changed, to avoid unnecessary re-writes of the print document.

> **Note:** The boolean parameter of the `onLayoutFinished()` method indicates whether or not the layout content has actually changed since the last request. Setting this parameter properly allows the print framework to avoid unnecessarily calling the `onLayout()` method, essentially caching the previously written print document and improving performance.

The following sample demonstrates the basic mechanics of this process using the `PrintedPdfDocument` class to create a PDF file:

### Kotlin

```kotlin
override fun onWrite(
        pageRanges: Array<out PageRange>,
        destination: ParcelFileDescriptor,
        cancellationSignal: CancellationSignal?,
        callback: WriteResultCallback
) {
    // Iterate over each page of the document,
    // check if it's in the output range.
    for (i in 0 until totalPages) {
        // Check to see if this page is in the output range.
        if (containsPage(pageRanges, i)) {
            // If so, add it to writtenPagesArray. writtenPagesArray.size()
            // is used to compute the next output page index.
            writtenPagesArray.append(writtenPagesArray.size(), i)
            pdfDocument?.startPage(i)?.also { page ->

                // check for cancellation
                if (cancellationSignal?.isCanceled == true) {
                    callback.onWriteCancelled()
                    pdfDocument?.close()
                    pdfDocument = null
                    return
                }

                // Draw page content for printing
                drawPage(page)

                // Rendering is complete, so page can be finalized.
                pdfDocument?.finishPage(page)
            }
        }
    }

    // Write PDF document to file
    try {
        pdfDocument?.writeTo(FileOutputStream(destination.fileDescriptor))
    } catch (e: IOException) {
        callback.onWriteFailed(e.toString())
        return
    } finally {
        pdfDocument?.close()
        pdfDocument = null
    }
    val writtenPages = computeWrittenPages()
    // Signal the print framework the document is complete
    callback.onWriteFinished(writtenPages)

    ...
}
```

### Java

```java
@Override
public void onWrite(final PageRange[] pageRanges,
                    final ParcelFileDescriptor destination,
                    final CancellationSignal cancellationSignal,
                    final WriteResultCallback callback) {
    // Iterate over each page of the document,
    // check if it's in the output range.
    for (int i = 0; i < totalPages; i++) {
        // Check to see if this page is in the output range.
        if (containsPage(pageRanges, i)) {
            // If so, add it to writtenPagesArray. writtenPagesArray.size()
            // is used to compute the next output page index.
            writtenPagesArray.append(writtenPagesArray.size(), i);
            PdfDocument.Page page = pdfDocument.startPage(i);

            // check for cancellation
            if (cancellationSignal.isCanceled()) {
                callback.onWriteCancelled();
                pdfDocument.close();
                pdfDocument = null;
                return;
            }

            // Draw page content for printing
            drawPage(page);

            // Rendering is complete, so page can be finalized.
            pdfDocument.finishPage(page);
        }
    }

    // Write PDF document to file
    try {
        pdfDocument.writeTo(new FileOutputStream(
                destination.getFileDescriptor()));
    } catch (IOException e) {
        callback.onWriteFailed(e.toString());
        return;
    } finally {
        pdfDocument.close();
        pdfDocument = null;
    }
    PageRange[] writtenPages = computeWrittenPages();
    // Signal the print framework the document is complete
    callback.onWriteFinished(writtenPages);

    ...
}
```

This sample delegates rendering of PDF page content to `drawPage()` method, which is discussed in the next section.

As with layout, execution of `onWrite()` method can have three outcomes: completion, cancellation, or failure in the case where the the content cannot be written. You must indicate one of these results by calling the appropriate method of the `PrintDocumentAdapter.WriteResultCallback` object.

**Note:** Rendering a document for printing can be a resource-intensive operation. In order to avoid blocking the main user interface thread of your application, you should consider performing the page rendering and writing operations on a separate thread, for example in an `AsyncTask`. For more information about working with execution threads like asynchronous tasks, see Processes and Threads.

Drawing PDF page content
------------------------

When your application prints, your application must generate a PDF document and pass it to the Android print framework for printing. You can use any PDF generation library for this purpose. This lesson shows how to use the `PrintedPdfDocument` class to generate PDF pages from your content.

The `PrintedPdfDocument` class uses a `Canvas` object to draw elements on an PDF page, similar to drawing on an activity layout. You can draw elements on the printed page using the `Canvas` draw methods. The following example code demonstrates how to draw some simple elements on a PDF document page using these methods:

### Kotlin

```kotlin
private fun drawPage(page: PdfDocument.Page) {
    page.canvas.apply {

        // units are in points (1/72 of an inch)
        val titleBaseLine = 72f
        val leftMargin = 54f

        val paint = Paint()
        paint.color = Color.BLACK
        paint.textSize = 36f
        drawText("Test Title", leftMargin, titleBaseLine, paint)

        paint.textSize = 11f
        drawText("Test paragraph", leftMargin, titleBaseLine + 25, paint)

        paint.color = Color.BLUE
        drawRect(100f, 100f, 172f, 172f, paint)
    }
}
```

### Java

```java
private void drawPage(PdfDocument.Page page) {
    Canvas canvas = page.getCanvas();

    // units are in points (1/72 of an inch)
    int titleBaseLine = 72;
    int leftMargin = 54;

    Paint paint = new Paint();
    paint.setColor(Color.BLACK);
    paint.setTextSize(36);
    canvas.drawText("Test Title", leftMargin, titleBaseLine, paint);

    paint.setTextSize(11);
    canvas.drawText("Test paragraph", leftMargin, titleBaseLine + 25, paint);

    paint.setColor(Color.BLUE);
    canvas.drawRect(100, 100, 172, 172, paint);
}
```

When using `Canvas` to draw on a PDF page, elements are specified in points, which is 1/72 of an inch. Make sure you use this unit of measure for specifying the size of elements on the page. For positioning of drawn elements, the coordinate system starts at 0,0 for the top left corner of the page.

**Tip:** While the `Canvas` object allows you to place print elements on the edge of a PDF document, many printers are not able to print to the edge of a physical piece of paper. Make sure that you account for the unprintable edges of the page when you build a print document with this class.