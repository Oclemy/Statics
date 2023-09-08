# Recents screen

The **Recents** screen (also referred to as the Overview screen, recent task list, or recent apps) is a system-level UI that lists recently accessed activities and tasks. The user can navigate through the list and select a task to resume, or the user can remove a task from the list by swiping it away.

The Recents screen uses a document-centric model—introduced in Android 5.0 (API level 21)—in which multiple instances of the same activity containing different documents may appear as tasks in the **Recents** screen. For example, Google Drive may have a task for each of several Google documents. Each document appears as a task in the **Recents** screen.

  

The **Recents** screen showing two Google Drive documents, each represented as a separate task.

Another common example is when the user is using their browser, and they tap **Share** > **Gmail**. The Gmail app's **Compose** screen appears. Tapping the **Recents** button at that time reveals Chrome and Gmail running as separate tasks.

  

The **Recents** screen showing Chrome and Gmail running as separate tasks.

Normally you should allow the system to define how your tasks and activities are represented in the **Recents** screen, and you don't need to modify this behavior. However, your app can determine how and when activities appear in the **Recents** screen. The `ActivityManager.AppTask` class lets you manage tasks, and the activity flags of the `Intent` class let you specify when an activity is added or removed from the **Recents** screen. Also, the `<activity>` attributes let you set the behavior in the manifest.

Add tasks to the Recents screen
-------------------------------

Using the flags of the `Intent` class to add a task affords greater control over when and how a document gets opened or reopened in the **Recents** screen. When you use the `<activity>` attributes you can choose between always opening the document in a new task or reusing an existing task for the document.

### Use the Intent flag to add a task

When you create a new document for your activity, you call the `startActivity()`) method, passing to it the intent that launches the activity. To insert a logical break so that the system treats your activity as a new task in the **Recents** screen, pass the `FLAG_ACTIVITY_NEW_DOCUMENT` flag in the `addFlags()`) method of the `Intent` that launches the activity.

If you set the `FLAG_ACTIVITY_MULTIPLE_TASK` flag when you create the new document, the system always creates a new task with the target activity as the root. This setting allows the same document to be opened in more than one task. The following code demonstrates how the main activity does this:

### Kotlin

```kotlin
fun createNewDocument(view: View) {
    val newDocumentIntent = newDocumentIntent()
    if (useMultipleTasks) {
        newDocumentIntent.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK)
    }
    startActivity(newDocumentIntent)
}

private fun newDocumentIntent(): Intent =
        Intent(this, NewDocumentActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT or
                    android.content.Intent.FLAG_ACTIVITY_RETAIN_IN_RECENTS)
            putExtra(KEY_EXTRA_NEW_DOCUMENT_COUNTER, documentCounter++)
        }
```

### Java

```java
public void createNewDocument(View view) {
      final Intent newDocumentIntent = newDocumentIntent();
      if (useMultipleTasks) {
          newDocumentIntent.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
      }
      startActivity(newDocumentIntent);
  }

  private Intent newDocumentIntent() {
      boolean useMultipleTasks = checkbox.isChecked();
      final Intent newDocumentIntent = new Intent(this, NewDocumentActivity.class);
      newDocumentIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT);
      newDocumentIntent.putExtra(KEY_EXTRA_NEW_DOCUMENT_COUNTER, documentCounter++);
      return newDocumentIntent;
  }

}
```

When the main activity launches a new activity, the system searches through existing tasks for one whose intent matches the intent component name and the Intent data for the activity. If the task is not found, or the intent contained the `FLAG_ACTIVITY_MULTIPLE_TASK` flag, a new task will be created with the activity as its root. If it finds one, it brings that task to the front and passes the new intent to `onNewIntent()`). The new activity gets the intent and creates a new document in the **Recents** screen, as in the following example:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_new_document)
    documentCount = intent
            .getIntExtra(DocumentCentricActivity.KEY_EXTRA_NEW_DOCUMENT_COUNTER, 0)
    documentCounterTextView = findViewById(R.id.hello_new_document_text_view)
    setDocumentCounterText(R.string.hello_new_document_counter)
}

override fun onNewIntent(newIntent: Intent) {
    super.onNewIntent(newIntent)
    /* If FLAG_ACTIVITY_MULTIPLE_TASK has not been used, this Activity
    will be reused. */
    setDocumentCounterText(R.string.reusing_document_counter)
}
```

### Java

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_new_document);
    documentCount = getIntent()
            .getIntExtra(DocumentCentricActivity.KEY_EXTRA_NEW_DOCUMENT_COUNTER, 0);
    documentCounterTextView = (TextView) findViewById(
            R.id.hello_new_document_text_view);
    setDocumentCounterText(R.string.hello_new_document_counter);
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    /* If FLAG_ACTIVITY_MULTIPLE_TASK has not been used, this activity
    is reused to create a new document.
     */
    setDocumentCounterText(R.string.reusing_document_counter);
}
```

### Use the activity attribute to add a task

An activity can also specify in its manifest that it always launches into a new task by using the `<activity>` attribute, `android:documentLaunchMode`. This attribute has four values which produce the following effects when the user opens a document with the application:

`intoExisting`

The activity reuses an existing task for the document. This is the same as setting the `FLAG_ACTIVITY_NEW_DOCUMENT` flag _without_ setting the `FLAG_ACTIVITY_MULTIPLE_TASK` flag, as described in Using the Intent flag to add a task, above.

`always`

The activity creates a new task for the document, even if the document is already opened. Using this value is the same as setting both the `FLAG_ACTIVITY_NEW_DOCUMENT` and `FLAG_ACTIVITY_MULTIPLE_TASK` flags.

`none`

The activity does not create a new task for the document. The **Recents** screen treats the activity as it would by default: it displays a single task for the app, which resumes from whatever activity the user last invoked.

`never`

The activity does not create a new task for the document. Setting this value overrides the behavior of the `FLAG_ACTIVITY_NEW_DOCUMENT` and `FLAG_ACTIVITY_MULTIPLE_TASK` flags, if either of these are set in the intent, and the **Recents** screen displays a single task for the app, which resumes from whatever activity the user last invoked.

Remove tasks
------------

By default a document task is automatically removed from the **Recents** screen when its activity finishes. You can override this behavior with the `ActivityManager.AppTask` class, with an `Intent` flag, or with an`<activity>` attribute.

You can always exclude a task from the **Recents** screen entirely by setting the `<activity>` attribute, `android:excludeFromRecents` to `true`.

You can set the maximum number of tasks that your app can include in the **Recents** screen by setting the `<activity>` attribute `android:maxRecents` to an integer value. The default is 16. When the maximum number of tasks is reached, the least recently used task is removed from the **Recents** screen. The `android:maxRecents` maximum value is 50 (25 on low memory devices); values less than 1 are not valid.

### Use the AppTask class to remove tasks

In the activity that creates a new task in the **Recents** screen, you can specify when to remove the task and finish all activities associated with it by calling the `finishAndRemoveTask()`) method.

### Kotlin

```kotlin
fun onRemoveFromOverview(view: View) {
    // It is good pratice to remove a document from the overview stack if not needed anymore.
    finishAndRemoveTask()
}
```

### Java

```java
public void onRemoveFromRecents(View view) {
    // The document is no longer needed; remove its task.
    finishAndRemoveTask();
}
```

### Retain finished tasks

If you want to retain a task in the **Recents** screen, even if its activity has finished, pass the `FLAG_ACTIVITY_RETAIN_IN_RECENTS` flag in the `addFlags()`) method of the Intent that launches the activity.

### Kotlin

```kotlin
private fun newDocumentIntent() =
        Intent(this, NewDocumentActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT or
                    android.content.Intent.FLAG_ACTIVITY_RETAIN_IN_RECENTS)
            putExtra(KEY_EXTRA_NEW_DOCUMENT_COUNTER, getAndIncrement())
        }
```

### Java

```java
private Intent newDocumentIntent() {
    final Intent newDocumentIntent = new Intent(this, NewDocumentActivity.class);
    newDocumentIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT |
      android.content.Intent.FLAG_ACTIVITY_RETAIN_IN_RECENTS);
    newDocumentIntent.putExtra(KEY_EXTRA_NEW_DOCUMENT_COUNTER, getAndIncrement());
    return newDocumentIntent;
}
```

To achieve the same effect, set the `<activity>` attribute `android:autoRemoveFromRecents` to `false`. The default value is `true` for document activities, and `false` for regular activities. Using this attribute overrides the `FLAG_ACTIVITY_RETAIN_IN_RECENTS` flag, discussed previously.

Enable recents URL sharing (Pixel only)
---------------------------------------

On Pixel devices running Android 12 or higher, users can share links to recently viewed web content directly from the Recents screen. After visiting the content in an app, the user can swipe to the Recents screen and find the app where they viewed the content, then tap on the link button to copy or share the URL.

  

The **Recents** screen with a link to share recently-viewed web content.

Any app can enable Recents linking for users by providing a web UI and overriding `onProvideAssistContent()`), as shown in the following example:

### Kotlin

```kotlin
class MainActivity : AppCompatActivity() {
    protected fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun onProvideAssistContent(outContent: AssistContent) {
        super.onProvideAssistContent(outContent)
        outContent.setWebUri(Uri.parse("https://example.com/myCurrentPage"))
    }
}
```

### Java

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public void onProvideAssistContent(AssistContent outContent) {
        super.onProvideAssistContent(outContent);

        outContent.setWebUri(Uri.parse("https://example.com/myCurrentPage"));
    }
}
```