# Best Android Email Sending Libraries


In this article lets look at several options, libraries and examples for sending email in android.


You can send email just via intents. You need to chose an action based on whether an attachment is part of the email or not.

1. ACTION_SENDTO (for no attachment) or
2. ACTION_SEND (for one attachment) or
3. ACTION_SEND_MULTIPLE (for multiple attachments)

The MIME Type can be:

1. `"text/plain"`
2. "\*/\*"

The Extras can be:

1. Intent.EXTRA_EMAIL - A string array of all "To" recipient email addresses.
2. Intent.EXTRA_CC - A string array of all "CC" recipient email addresses.
3. Intent.EXTRA_BCC - A string array of all "BCC" recipient email addresses.
4. Intent.EXTRA_SUBJECT - A string with the email subject.
5. Intent.EXTRA_TEXT - A string with the body of the email.
6. Intent.EXTRA_STREAM - A Uri pointing to the attachment. If using the ACTION_SEND_MULTIPLE -  action, this should instead be an ArrayList containing multiple  Uri objects.

Here is a Kotlin example to send email:

```java
fun composeEmail(addresses: Array<String>, subject: String, attachment: Uri) {
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "\*/\*"
        putExtra(Intent.EXTRA_EMAIL, addresses)
        putExtra(Intent.EXTRA_SUBJECT, subject)
        putExtra(Intent.EXTRA_STREAM, attachment)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

Here is a Java Example to send email in android:

```java
public void composeEmail(String[] addresses, String subject, Uri attachment) {
    Intent intent = new Intent(Intent.ACTION_SEND);
    intent.setType("\*/\*");
    intent.putExtra(Intent.EXTRA_EMAIL, addresses);
    intent.putExtra(Intent.EXTRA_SUBJECT, subject);
    intent.putExtra(Intent.EXTRA_STREAM, attachment);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}
```

Proceed below to see more options for sending email. Feel free to contribute more examples.

## (a). EmailIntentBuilder

This an Android Library for the creation of SendTo Intents with mailto: URI.

### Step 1 - Installation

Install the library by adding the following statement in your build.gradle  file:

implementation 'de.cketti.mailto:email-intent-builder:2.0.0'

### Step 2

Then set the appropriate fields to be sent:

```java
EmailIntentBuilder.from(activity)
        .to("alice@example.org")
        .cc("bob@example.org")
        .bcc("charles@example.org")
        .subject("Message from an app")
        .body("Some text here")
        .start();
```

## FULL EXAMPLE

Here is a full example to use this library to send email:

**(a). MainActivity.java**

```java
import android.os.Bundle;
import android.text.TextUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.snackbar.Snackbar;
import de.cketti.mailto.EmailIntentBuilder;

public class MainActivity extends AppCompatActivity {
    private View mainContent;
    private EditText emailTo;
    private EditText emailCc;
    private EditText emailBcc;
    private EditText emailSubject;
    private EditText emailBody;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainContent = findViewById(R.id.main_content);
        emailTo = findViewById(R.id.email_to);
        emailCc = findViewById(R.id.email_cc);
        emailBcc = findViewById(R.id.email_bcc);
        emailSubject = findViewById(R.id.email_subject);
        emailBody = findViewById(R.id.email_body);

        findViewById(R.id.button_send_email).setOnClickListener(v -> sendEmail());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.menu_feedback) {
            sendFeedback();
        }
        return true;
    }

    private void sendFeedback() {
        boolean success = EmailIntentBuilder.from(this)
                .to("cketti@gmail.com")
                .subject(getString(R.string.feedback_subject))
                .body(getString(R.string.feedback_body))
                .start();

        if (!success) {
            Snackbar.make(mainContent, R.string.error_no_email_app, Snackbar.LENGTH_LONG).show();
        }
    }

    void sendEmail() {
        String to = emailTo.getText().toString();
        String cc = emailCc.getText().toString();
        String bcc = emailBcc.getText().toString();
        String subject = emailSubject.getText().toString();
        String body = emailBody.getText().toString();

        EmailIntentBuilder builder = EmailIntentBuilder.from(this);

        try {
            if (!TextUtils.isEmpty(to)) {
                builder.to(to);
            }
            if (!TextUtils.isEmpty(cc)) {
                builder.cc(cc);
            }
            if (!TextUtils.isEmpty(bcc)) {
                builder.bcc(bcc);
            }
            if (!TextUtils.isEmpty(subject)) {
                builder.subject(subject);
            }
            if (!TextUtils.isEmpty(body)) {
                builder.body(body);
            }

            boolean success = builder.start();
            if (!success) {
                Snackbar.make(mainContent, R.string.error_no_email_app, Snackbar.LENGTH_LONG).show();
            }
        } catch (IllegalArgumentException e) {
            String errorMessage = getString(R.string.argument_error, e.getMessage());
            Snackbar.make(mainContent, errorMessage, Snackbar.LENGTH_LONG).show();
        }
    }
}
```

### Download

Here are the links:

1. Directly Download the code [here](https://github.com/cketti/EmailIntentBuilder/archive/master.zip).
2. Browse through the code or read more [here](https://github.com/cketti/EmailIntentBuilder).
3. Follow Author [here](https://github.com/cketti/).

**(b). Maildroid**

MMaildroid is a small robust android library for sending emails using SMTP server.

It uses Oracle [Java Mail API](https://javaee.github.io/javamail/Android) to handle connections and sending emails.

### Key Features

- Sending emails using SMTP protocol ![incoming_envelope](https://github.githubassets.com/images/icons/emoji/unicode/1f4e8.png)
- Compatible with all smtp providers ![tada](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png)
- Sending HTML/CSS styled emails ![art](https://github.githubassets.com/images/icons/emoji/unicode/1f3a8.png)
- Library is using Java Mail API that is well known as best library for sending emails ![telescope](https://github.githubassets.com/images/icons/emoji/unicode/1f52d.png)

**Step 1: Installation**

This library is hosted in jitpack. So start by adding jitpack in your root level build.gradle:

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then you add the dependency:

```groovy
dependencies {
            implementation 'com.github.nedimf:maildroid:v0.0.4-relase'
          }
```

**Step 2: Code**

You can use builder pattern:

```kotlin
  MaildroidX.Builder()
            .smtp("")
            .smtpUsername("")
            .smtpPassword("")
            .port("")
            .type(MaildroidXType.HTML)
            .to("")
            .from("")
            .subject("")
            .body("")
            .attachment("")
        .isJavascriptDisabled()
        //or
        .attachments() //List
        .onCompleteCallback(object : MaildroidX.onCompleteCallback{
        override val timeout: Long = 3000
        override fun onSuccess() {
            Log.d("MaildroidX",  "SUCCESS")
        }
        override fun onFail(errorMessage: String) {
             Log.d("MaildroidX",  "FAIL")
        }
         })
         .mail()
```

Or DSL implementation

```kotlin
sendEmail {
      smtp("smtp.mailtrap.io")
      smtpUsername("username")
      smtpPassword("password")
      smtpAuthentication(true)
      port("2525")
      type(MaildroidXType.HTML)
      to("johndoe@email.com")
      from("janedoen@email.com")
      subject("Hello!")
      body("email body")
      attachment("path_to_file/file.txt")
      //or
      attachments() //List
      callback {
          timeOut(3000)
          onSuccess {
              Log.d("MaildroidX",  "SUCCESS")
          }
          onFail {
              Log.d("MaildroidX",  "FAIL")
          }
      }
 }
```

**Step 3: Download**

Here are the links:

1. Browse and Read more [here.](https://github.com/nedimf/maildroid)
2. Follow author [here](https://github.com/nedimf).

### (c). Sending Emails using Shelly

Shelly is a Fluent API for common Intent use-cases in Android.

This library wraps Intents with a clean and simple to understand interface for a number of specific use-cases. You can use it to send emails via Intent.

**Step 1: Installation**

Install Shell from jcenter:

```groovy
implementation 'au.com.jtribe.shelly:shelly:0.1.6@aar'
```

**Step 2: Send Email**

To send email:

```java
Shelly.email(context)
  .to("angus@jtribe.com")
  .subject("Subject Text")
  .body("Email Body")
  .send();
```

To send an email to multiple addresses:

```java
Shelly.email(context)
 .to("angus@jtribe.com", "partyravi@jtribe.com", "markymark@jtribe.com")
 .subject("Subject Text")
 .body("Email Body")
 .send();
```

To send an email with a cc:

```java
Shelly.email(context)
 .to("angus@jtribe.com", "partyravi@jtribe.com", "markymark@jtribe.com")
 .cc("toccto@jtribe.com", "anothercc@jtribe.com")
 .subject("Subject Text")
 .body("Email Body")
 .send();
```

To send an email with bcc:

```java
Shelly.email(context)
 .to("angus@jtribe.com", "partyravi@jtribe.com", "markymark@jtribe.com")
 .bcc("toccto@jtribe.com", "anothercc@jtribe.com")
 .subject("Subject Text")
 .body("Email Body")
 .send();
```

**Links**

1. Download the code [here](https://github.com/jtribe/shelly).
