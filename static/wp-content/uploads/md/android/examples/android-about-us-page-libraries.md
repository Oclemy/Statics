# About Us Page Libraries

In web development, for sites like this one of ours, having an about us page is almost a must. Users can read about your services, what you are offering and maybe your email address. Google, the search engine can also use it to learn about your business. In android development, having one is also important. Users of the app can learn more about you as a person, or your business and maybe where to contact you.

It's thus imperative we look at some options for you to include an about us page in your app. Obviously you can roll out one for yourself, using a dedicated activity or fragment, or even a full screen dialog. Another option is to use existing libraries in github. These have already been designed and do provide you with simple builder methods that you can use to set properties like name, title, email, links etc.


Let's look at some of the best libraries in this regard.

## (a). Android About Page

> Create an awesome About Page for your Android App in 2 minutes

This library allows to generate beautiful About Pages with less effort, it's fully customizable and supports opening specific intent.

```java
View aboutPage = new AboutPage(this)
  .isRTL(false)
  .setImage(R.drawable.dummy_image)
  .addItem(versionElement)
  .addItem(adsElement)
  .addGroup("Connect with us")
  .addEmail("elmehdi.sakout@gmail.com")
  .addWebsite("http://medyo.github.io/")
  .addFacebook("the.medy")
  .addTwitter("medyo80")
  .addYoutube("UCdPQtdWIsg7_pi4mrRu46vA")
  .addPlayStore("com.ideashower.readitlater.pro")
  .addGitHub("medyo")
  .addInstagram("medyo80")
  .create();
```

### Step 1: How to Install

Available on Jcenter, Maven and JitPack

```groovy
compile 'com.github.medyo:android-about-page:1.2.1'
```

### Step 2: How to Use

#### 1\. Add Description

```java
setDescription(String)
```

#### 2\. Add Image

```java
setImage(Int)
```

#### 3\. Add predefined Social network

The library has already some predefined social networks like :

- Facebook
- Twitter
- Instagram
- Youtube
- PlayStore

```java
addFacebook(String PageID)
addTwitter(String AccountID)
addYoutube(String AccountID)
addPlayStore(String PackageName)
addInstagram(String AccountID)
addGitHub(String AccountID)
```

#### 4\. Add Custom Element

For example `app version` :

```java
Element versionElement = new Element();
versionElement.setTitle("Version 6.2");
addItem(versionElement)
```

#### 5\. Available attributes for Element Class

| Function | Description |
| --- | --- |
| setTitle(String) | Set title of the element |
| setIconTint(Int) | Set color of the element |
| setIconDrawable(Int) | Set icon of the element |
| setValue(String) | Set Element value like Facebook ID |
| setIntent(Intent) | Set an intent to be called on `onClickListener` |
| setGravity(Gravity) | Set a Gravity for the element |
| setOnClickListener(View.OnClickListener) | If `intent` isn't suitable for you need, implement your custom behaviour by overriding the click listener |

### Step 3: Example

Here's an example usage:

```java
package mehdi.sakout.aboutpage.sample;

import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.AppCompatDelegate;
import android.view.Gravity;
import android.view.View;
import android.widget.Toast;

import java.util.Calendar;

import mehdi.sakout.aboutpage.AboutPage;
import mehdi.sakout.aboutpage.Element;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        simulateDayNight(/* DAY */ 0);
        Element adsElement = new Element();
        adsElement.setTitle("Advertise with us");

        View aboutPage = new AboutPage(this)
                .isRTL(false)
                .setImage(R.drawable.dummy_image)
                .addItem(new Element().setTitle("Version 6.2"))
                .addItem(adsElement)
                .addGroup("Connect with us")
                .addEmail("elmehdi.sakout@gmail.com")
                .addWebsite("http://medyo.github.io/")
                .addFacebook("the.medy")
                .addTwitter("medyo80")
                .addYoutube("UCdPQtdWIsg7_pi4mrRu46vA")
                .addPlayStore("com.ideashower.readitlater.pro")
                .addInstagram("medyo80")
                .addGitHub("medyo")
                .addItem(getCopyRightsElement())
                .create();

        setContentView(aboutPage);
    }

    Element getCopyRightsElement() {
        Element copyRightsElement = new Element();
        final String copyrights = String.format(getString(R.string.copy_right), Calendar.getInstance().get(Calendar.YEAR));
        copyRightsElement.setTitle(copyrights);
        copyRightsElement.setIconDrawable(R.drawable.about_icon_copy_right);
        copyRightsElement.setIconTint(mehdi.sakout.aboutpage.R.color.about_item_icon_color);
        copyRightsElement.setIconNightTint(android.R.color.white);
        copyRightsElement.setGravity(Gravity.CENTER);
        copyRightsElement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, copyrights, Toast.LENGTH_SHORT).show();
            }
        });
        return copyRightsElement;
    }

    void simulateDayNight(int currentSetting) {
        final int DAY = 0;
        final int NIGHT = 1;
        final int FOLLOW_SYSTEM = 3;

        int currentNightMode = getResources().getConfiguration().uiMode
                & Configuration.UI_MODE_NIGHT_MASK;
        if (currentSetting == DAY && currentNightMode != Configuration.UI_MODE_NIGHT_NO) {
            AppCompatDelegate.setDefaultNightMode(
                    AppCompatDelegate.MODE_NIGHT_NO);
        } else if (currentSetting == NIGHT && currentNightMode != Configuration.UI_MODE_NIGHT_YES) {
            AppCompatDelegate.setDefaultNightMode(
                    AppCompatDelegate.MODE_NIGHT_YES);
        } else if (currentSetting == FOLLOW_SYSTEM) {
            AppCompatDelegate.setDefaultNightMode(
                    AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
        }
    }
}
```

## (b). EasyAbout

> A fully material-designed about fragment for your application.

You can download the **sample apk** [here](https://github.com/marcoscgdev/Licenser/releases/download/1.0.2/app-debug.apk).

| Default | Default Dark | Colored |
| --- | --- | --- |
| ![Sample App](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/1.png) |
| ![Sample App](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/2.png) | ![Sample App](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/3.png) |

### Step 1: How to Install EasyAbout

Add this to your root _build.gradle_ file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Now add the dependency to your app build.gradle file:

```groovy
implementation 'com.github.marcoscgdev:EasyAbout:1.0.6'
```

### Step 2: How to Use

#### Create the fragment

Your about fragment **must extend** from _EasyAboutFragment_

```java
public class AboutFragment extends EasyAboutFragment {

    @Override
    protected void configureFragment(Context context, View rootView, Bundle savedInstanceState) {
        // add cards here
    }
}
```

#### Create a card

**Note: all parameters are optional**

```java
AboutCard aboutCard = new AboutCard.Builder(context)
        .setTitle("Card title") // It can also be passed as a string resource
        .setTitleColorRes(R.color.colorAccent) // You can also use setTitleColor(int color);
        .addItem(personAboutItem)
        .addItem(normalAboutItem)
        .build();
```

#### Create a item

**Note: all parameters are optional and common for all item types**

#### Header item

![Header item](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/header_item.png)

```java
HeaderAboutItem headerAboutItem = new HeaderAboutItem.Builder(context)
        .setTitle(R.string.app_name) // It can also be passed as a string value
        .setSubtitle(BuildConfig.VERSION_NAME) // It can also be passed as a string resource
        .setIcon(R.mipmap.ic_launcher) // It can also be passed as a drawable
        .build();
```

#### Normal item

![Normal item](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/normal_item.png)

```java
NormalAboutItem normalAboutItem = new NormalAboutItem.Builder(context)
        .setTitle("Item title") // It can also be passed as a string resource
        .setSubtitle("Item subtitle") // It can also be passed as a string resource
        .setIcon(R.drawable.ic_info_outline_black_24dp) // It can also be passed as a drawable
        .setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Your click action here
            }
        })
        .setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                // Your long click action here
                return false;
            }
        })
        .build();
```

#### Person item

![Person item](https://raw.githubusercontent.com/marcoscgdev/EasyAbout/master/screenshots/person_item.png)

```java
PersonAboutItem personAboutItem = new PersonAboutItem.Builder(context)
        .setTitle("Your name here") // It can also be passed as a string resource
        .setSubtitle("Your info here") // It can also be passed as a string resource
        .setIcon(R.drawable.user) // It can also be passed as a drawable
        .build();
```

#### Add cards to the fragment

You can add cards with the _addCard(AboutCard aboutCard);_ method (inside the configureFragment function of the fragment)

```java
AboutCard aboutCard = new AboutCard.Builder(context)
        .setTitle("Card title") // It can also be passed as a string resource
        .setTitleColorRes(R.color.colorAccent) // You can also use setTitleColor(int color);
        .addItem(personAboutItem)
        .addItem(normalAboutItem)
        .build();

addCard(aboutCard);
addCard(anotherCard);
addCard(contactCard);
```

#### Sample fragment

Here's a sample easyabout fragment:

```java
public class AboutFragment extends EasyAboutFragment {

    @Override
    protected void configureFragment(final Context context, View rootView, Bundle savedInstanceState) {
        addCard(new AboutCard.Builder(context)
                .addItem(AboutItemBuilder.generateAppTitleItem(context)
                        .setSubtitle("by @MarcosCGdev."))
                .addItem(AboutItemBuilder.generateAppVersionItem(context, true)
                        .setIcon(R.drawable.ic_info_outline_black_24dp))
                .addItem(new NormalAboutItem.Builder(context)
                        .setTitle("Licenses")
                        .setIcon(R.drawable.ic_description_black_24dp)
                        .setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                DemoUtils.showLicensesDialog(context);
                            }
                        })
                        .build())
                .build());

        addCard(new AboutCard.Builder(context)
                .setTitle("Support")
                .addItem(AboutItemBuilder.generatePlayStoreItem(context)
                        .setTitle("Rate application")
                        .setIcon(R.drawable.ic_star_black_24dp))
                .addItem(AboutItemBuilder.generateLinkItem(context, "https://github.com/marcoscgdev/EasyAbout/issues/new")
                        .setTitle("Report bugs")
                        .setIcon(R.drawable.ic_bug_report_black_24dp))
                .addItem(new NormalAboutItem.Builder(context)
                        .setTitle("Clickable item")
                        .setSubtitle("This item has onClick and onLongClick listener.")
                        .setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                Toast.makeText(context, "onClick", Toast.LENGTH_SHORT).show();
                            }
                        })
                        .setOnLongClickListener(new View.OnLongClickListener() {
                            @Override
                            public boolean onLongClick(View view) {
                                Toast.makeText(context, "onLongClick", Toast.LENGTH_SHORT).show();
                                return false;
                            }
                        })
                        .setIcon(R.drawable.ic_mouse_black_24dp)
                        .build())
                .build());
    }
}
```

#### Customize card color

Simply add this to your app theme. Replace _@color/colorPrimary_ with your desired color.

```xml
<item name="aboutCardBackground">@color/colorPrimary</item>
```

## (c). AboutUsActivity - Library

> About Us Activity for Android Application About screen.

It is Simple and Easy to Use

**Demo App** - [Click here](https://gitlab.com/manimaran/aboutusactivity/raw/master/files/about_us_activity_demo.apk)

**Screen Shot**

![](https://gitlab.com/manimaran/aboutusactivity/raw/master/files/about_us_activity.gif)

**More Screen Shot**

![](https://gitlab.com/manimaran/aboutusactivity/raw/master/files/4.png)

### Step 1: How To Install

1. Add the JitPack repository to your build file. Add it in your root build.gradle at the end of repositories

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

2. Add the dependency

```groovy
    dependencies {
            implementation 'com.gitlab.manimaran:aboutusactivity:v1.0'
    }
```

### Step 2: How to Use

Inside Click Listener:

```java
    // Base
    int appTheme = R.style.AppTheme;
    String aboutUsActivityTitle = "About Us";

    // App Details
    int appLogo = R.drawable.ic_app_logo;
    String appName = getString(R.string.app_name);
    String appAbout = "About App Info. About Activity for simple and easy way to show about us.";
    String appVersion = "Version : " + BuildConfig.VERSION_NAME;
    String appPlayStoreLink =  "https://play.google.com/store/apps/details?id=com.jskaleel.fte";

    // License details
    String licenseName = "GPL v3";
    String licenseUrl = "https://www.gnu.org/licenses/gpl-3.0.txt";

    // Share Details
    String shareMsgText = "About Us Activity you can see : \nhttps://gitlab.com/manimaran/aboutusactivity";
    String shareIntentTitle = "Choose app to share...";

    // Powered By
    int poweredByIcon = R.drawable.ic_power_by; // If No need image set 0
    String poweredByTitle = "Powered By";
    String poweredByName = "Coopon";
    String poweredByAbout = "Coopon Sci Tech LLP";
    String poweredByLink = "http://cooponscitech.in/";

    // Initiated By
    int initiatedByIcon = R.drawable.ic_initiator; // If No need image set 0
    String initiatedByTitle = "Initiated By";
    String initiatedByName = "Initiator";
    String initiatedByAbout = "About details of Initiator";
    String initiatedByLink = "http://initiator.in/";

    // Others
    String sourceCodeLink = "https://gitlab.com/manimaran/aboutusactivity";
    int jsonResOfThirdPartyLibrary = R.raw.third_party_library;
    int jsonResOfCredits = R.raw.credits;
    String contactMail = "manimaran@cooponscitech.in";

    /**
     *  All the values are set in about activity builder
     *  If we don't need any views just ignore in build.
     */
    new AboutActivityBuilder.Builder(MainActivity.this)
            .setAppTheme(appTheme)
            .setTitle(aboutUsActivityTitle)
            .setAppLogo(appLogo)
            .setAppName(appName)
            .setAppAbout(appAbout)
            .setAppVersion(appVersion)
            .setLicense(licenseName, licenseUrl)
            .setShare(shareMsgText, shareIntentTitle)
            .setRateUs(appPlayStoreLink)
            .setPoweredBy(poweredByIcon, poweredByTitle, poweredByName, poweredByAbout, poweredByLink)
            .setInitiatedBy(initiatedByIcon, initiatedByTitle, initiatedByName, initiatedByAbout, initiatedByLink)
            .setSeeSourceCode(sourceCodeLink)
            .setThirdPartyLibrary(jsonResOfThirdPartyLibrary)
            .setCredits(jsonResOfCredits)
            .setContactUs(contactMail)
            .showAboutActivity();
```

#### Note

**Syntax : R.raw.credits - structure like**

```json
{
  "credits": [
    {
      "name": "Manimaran",
      "about": "Reason/About",
      "url": "http://manimaran96.wordpress.com/"
    },
    {
      "name": "XYZ",
      "about": "Reason/About",
      "url": "http://xyz.com/"
    }
  ]
}
```

**Syntax : R.raw.third_party_library**

```json
{
  "third_party_library": [
    {
      "name": "androidx.appcompat:appcompat:1.0.2",
      "url": "http://developer.android.com/tools/extras/support-library.html",
      "license": "The Apache Software License, Version 2.0",
      "license_url": "http://www.apache.org/licenses/LICENSE-2.0.txt"
    },
    {
      "name": "androidx.constraintlayout:constraintlayout:1.1.3",
      "url": "http://developer.android.com/tools/extras/support-library.html",
      "license": "The Apache Software License, Version 2.0",
      "license_url": "http://www.apache.org/licenses/LICENSE-2.0.txt"
    }
  ]
}
```

## (d). Nordan Simply Page

> Another simple to use About Us Page library.

### Step 1: How to Install

Install in your module level build.gradle:

```groovy
dependencies {
    ...
    implementation 'com.github.Dan629pl:nordan-simply-page-android:1.2.5'
}
```

### Step 2: How to Use

```java
        ...
    ConstraintLayout simplyPage = new NordanSimplyPage(this)
                  .addImageItem(R.drawable.nordan_logo)
                  .addDescriptionItem(R.string.lorem_ipsum)
                  .addSeparator()
                  .addGroup("Contact", R.color.gray_font_color)
                  .addPhone("123456789", "Call to me")
                  .addEmail("email address", "Write me an email")
                  .addSms("123456789", "Send message to me", "Sms message")
                  .addGroup("Check my socials", R.color.gray_font_color)
                  .addFacebook("facebookId")
                  .addInstagram("instagramId")
                  .addGithub("githubId")
                  .addGooglePlayStore("com.google.android.googlequicksearchbox")
                  .addYoutube("channelId")
                  .addWebsite("https://www.google.com", "Website")
                  .addSkype("profileId")
                  .addLinkedIn("daniel-owczarczyk-8b89a6150")
                  .addTwitter("profileId")
                  .addGroup(R.mipmap.ic_launcher_round, "Other groups (with left side image)")
                  .addMinimalItem(BaseElement.builder().title("Minimal item (only text view)").build())
                  .addEmptyItem()
                  .addMinimalItem(
                          BaseElement.builder()
                                  .title("Version " + BuildConfig.VERSION_NAME)
                                  .gravity(Gravity.CENTER)
                                  .build())
                  .addCopyRightsItem()
                  .create();
          setContentView(simplyPage);
            ...
```

#### Settings Page Style

```java
                    ...
      View settingPage = new NordanSimplyPage(this)
                .addImageItem(R.drawable.nordan_logo, 300, 75)
                .addGroup(getString(R.string.account_group), R.drawable.account_icon, R.color.gray_font_color)
                .addAccountItem(createAccountElement())
                .addItem(createAccountConfirmedElement())
                .addMinimalItem(createSignOutElement())
                .addEmptyItem(30)
                .addGroup(R.drawable.settings_app_icon, "Application")
                .addSwitchItem(createThemeSwitcherElement())
                .addItem(createTimeRefreshElement())
                .addSingleRadioChoiceItem(createSingleChoiceElement())
                .addCheckBoxItem(createCheckBoxElement())
                .addCheckBoxItem(createCheckBoxExtendableElement())
                .addSeekBarItem(createSeekBarElement())
                .addEditTextItem(createEditTextElement())
                .addEmptyItem(200)
                .create();
        setContentView(settingPage);
                     ...
```
