# Best Android License Display Libraries - 2021


If you are looking for an easy way to display licenses for libraries used in android app then this article is for you. We will be examining some of the best license display libraries for android. These are mainly dialogs or pages.


## (a). Licenser

> An android library to display the licenses of your application libraries in a easy way.

![Licenser - Display licenses](https://raw.githubusercontent.com/marcoscgdev/Licenser/master/device-2018-02-11-161003.png)

### Step 1: Install Licenser

Install Licenser as a gradle dependency:

First of all add this to your root _build.gradle_ file:

```groovy
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
    }
}
```

Now add the dependency to your app _build.gradle_ file:

```groovy
implementation 'com.github.marcoscgdev:Licenser:2.0.0'
```

### How to Use Licenser

> Note that this library relies on AppCompatActivity, so you have to use it your activity.

```kotlin
LicenserDialog(this)
        .setTitle("Licenses")
        .setCustomNoticeTitle("Notices for files:")
        .setBackgroundColor(Color.RED) // Optional
        .setLibrary(Library("Android Support Libraries",
                "https://developer.android.com/topic/libraries/support-library/index.html",
                License.APACHE2)) // APACHE deprecated, see wiki
        .setLibrary(Library("Example Library",
                "https://github.com/marcoscgdev",
                License.APACHE2)) // APACHE deprecated, see wiki
        .setLibrary(Library("Licenser",
                "https://github.com/marcoscgdev/Licenser",
                License.MIT))
        .setPositiveButton(android.R.string.ok, object:DialogInterface.OnClickListener() {
            fun onClick(dialogInterface:DialogInterface, i:Int) {
                // TODO: 11/02/2018
            }
        })
        .show()
```

You can also set a custom dialog theme:

```
LicenserDialog(this, R.style.DialogStyle)
        ...
```

Library structure:

```java
val lib1 = Library(var title: String, var url: String?, var license: License)
```

**NEW:** License structure:

```java
// Use a license code like APACHE2 or MIT
val lic1 = License(val code: String, var htmlContent: String)
```

LICENSE TYPES (At this moment):

```java
 - License.APACHE1 // Apache v1
 - License.APACHE1_1 // Apache v1.1
 - License.APACHE2 // Apache v2
 - License.BSD3 // BSD v3
 - License.BSD4 // BSD v4
 - License.BSL // BSL
 - License.CREATIVE_COMMONS // Creative commons
 - License.FREEBSD // FreeBSD
 - License.GNU2 // GNU v2
 - License.GNU3 // GNU v3
 - License.ISC // ISC
 - License.LGPL2_1 // GNU Lesser v2.1
 - License.LGPL3 // GNU Lesser v3
 - License.MIT // MIT
 - License.MPL1 // MPL v1
 - License.MPL1_1 // MPL v1.1
 - License.MPL2 // MPL v2
 - License.NTP // NTP
 - License.OFL1_1 // SIL Open Font License v1.1
```

Please, if you need a license that is not yet in this list, try to create a custom license.

```java
val lic1 = License("CUSTOM_LICENSE_CODE", customLicenseHtmlContent)

val lib1 = Library("Library name", "https://github.com/marcoscgdev", lic1)
```

**If you don't want a dialog, you can use the Licenser class:**

```java
var licenser = Licenser()
        .setCustomNoticeTitle("Notices for files:")
        .setLibrary(Library("Android Support Libraries",
                "https://developer.android.com/topic/libraries/support-library/index.html",
                License.APACHE))
        .setLibrary(Library("Example Library",
                "https://github.com/marcoscgdev",
                License.APACHE))
        .setLibrary(Library("Licenser",
                "https://github.com/marcoscgdev/Licenser",
                License.MIT))
```

And show it in a webview:

```java
webView.loadData(licenser.htmlContent, "text/html; charset=UTF-8", null)
```

#### [](#extra-functions)Extra functions

You can access this functions with both classes

```java
var licenses = licenser.getHTMLContent() // HTML content
var apacheLibraries = licenser.getApacheLibraries()
var mitLibraries = licenser.getMitLibraries()
var gnuLibraries = licenser.getGnuLibraries()
```

### Example

Let's look at a full licenser example in Kotlin

**MainActivity.kt**

```kotlin
package com.marcoscg.licensersample

import android.content.DialogInterface
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.marcoscg.licenser.Library
import com.marcoscg.licenser.License
import com.marcoscg.licenser.LicenserDialog
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private var licenserDialog: LicenserDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val customLicenseHtmlContent = "Licensed under the Custom License, V.3" +
                "<br><br>LICENSE DESCRIPTION HERE<br>REMEMBER TO USE HTML TAGS!"

        licenserDialog = LicenserDialog(this, R.style.DialogStyle)
                .setTitle("Licenses")
                .setCancelable(true)
                .setBackgroundColor(ContextCompat.getColor(this, R.color.colorPrimary))
                .setCustomNoticeTitle("Notices for files:")
                .setLibrary(Library("Android Support Libraries",
                        null,
                        License.APACHE2))
                .setLibrary(Library("Example Library",
                        "https://github.com/marcoscgdev",
                        License.APACHE2))
                .setLibrary(Library("Licenser",
                        "https://github.com/marcoscgdev/Licenser",
                        License.MIT))
                .setLibrary(Library("Custom library",
                        null,
                        License("CUSTOM_LIC", customLicenseHtmlContent))) // use license code like APACHE2 or MIT
                .setPositiveButton(android.R.string.ok, DialogInterface.OnClickListener { dialogInterface, i ->
                    // TODO: 11/02/2018
                })

        //val apache2Libraries = licenserDialog?.apache2Libraries

        bt_show_dialog.setOnClickListener {
            licenserDialog?.show()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_github -> {
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/marcoscgdev/Licenser")))
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
```

Find complete source cide [here](https://github.com/marcoscgdev/Licenser/tree/master/app).

### Reference

Find complete documentation and reference [here](https://github.com/marcoscgdev/Licenser).
