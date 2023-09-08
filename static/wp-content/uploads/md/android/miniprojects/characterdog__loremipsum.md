# Lorem Ipsum Generator

>  "Lorem ipsum" generator app for Android.


![Lorem Ipsum Generator Tutorial](https://camo.githubusercontent.com/66cad3c26f22b8832534cb4e897720376c1ab0ab407956ba2bc555288ddd25a4/68747470733a2f2f6170692e7472617669732d63692e636f6d2f636861726163746572646f672f6c6f72656d697073756d2e7376673f6272616e63683d6d6173746572)

![Lorem Ipsum Generator Tutorial](https://camo.githubusercontent.com/9d25a3ba6b86a71d9185851f30729e95cd2f91f38b355a4240046246e3fb841a/68747470733a2f2f64333232637174353834626f346f2e636c6f756466726f6e742e6e65742f6c6f72656d2d697073756d2d67656e657261746f722f6c6f63616c697a65642e737667)


"Lorem ipsum" is a commonly used pseudo-Latin placeholder text in print and web design. It's based on "De finibus bonorum et malorum" by Marcus Tullius Cicero.

Why use this app:

- Supports 10 to 10000 words
- Material Design
- No ads or tracking


![Lorem Ipsum Generator Tutorial](https://camo.githubusercontent.com/fefd7089be3e793fb7858c5965f46e046d5bb78eac6d7f5bdd11f3e737b226a4/68747470733a2f2f662d64726f69642e6f72672f62616467652f6765742d69742d6f6e2e706e67)

![Lorem Ipsum Generator Tutorial](https://camo.githubusercontent.com/2149f526e69167218eb7eea8f21cb74a756aa43495f7acfeccfe995d40f62028/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e5f62616467655f7765625f67656e657269632e706e67)

![Lorem Ipsum Generator Tutorial](https://github.com/characterdog/loremipsum/raw/master/fastlane/metadata/android/en-US/images/icon.png)

![Lorem Ipsum Generator Tutorial](https://github.com/characterdog/loremipsum/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/1.png)

![Lorem Ipsum Generator Tutorial](https://github.com/characterdog/loremipsum/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/2.png)

![Lorem Ipsum Generator Tutorial](https://github.com/characterdog/loremipsum/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/3.png)


Published under [GNU General Public License v3.0 or later](https://spdx.org/licenses/GPL-3.0-or-later.html).


Let us look at the full Lorem Ipsum Generator Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.github.characterdog.loremipsum"
        minSdkVersion 14
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility = '1.8'
        targetCompatibility = '1.8'
    }
    lintOptions {
        abortOnError false
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-alpha2'

    implementation 'com.github.GrenderG:Toasty:1.3.0'
    implementation 'com.github.characterdog:materialcolor:1.0'
    implementation 'com.github.daniel-stoneuk:material-about-library:2.4.2'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `privacy_policy_fragment.xml`**

> Our `privacy_policy_fragment` layout.

This layout will represent our Fragment Policy Privacy's layout. Specify [`ScrollView`](https://android.examples.directory/scrollview) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <TextView
            android:id="@+id/privacy_policy"
            android:singleLine="false"
            android:padding="8dp"
            android:textSize="20sp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"/>

</ScrollView>
```

**(b). `activity_about.xml`**

> Our `activity_about` layout.

This layout will represent our About Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:id="@+id/about_container"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
</LinearLayout>
```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ScrollView`](https://android.examples.directory/scrollview)
2. [``](https://android.examples.directory/)
3. [`SeekBar`](https://android.examples.directory/seekbar)
4. [`TextView`](https://android.examples.directory/textview)
5. [`AppCompatButton`](https://android.examples.directory/appcompatbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <ScrollView
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintEnd_toEndOf="parent" app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            android:layout_marginBottom="8dp" app:layout_constraintBottom_toTopOf="@+id/seekBar">
        <TextView android:layout_width="match_parent" android:layout_height="wrap_content"
                  android:padding="8dp"
                  tools:text="@string/lorem"
                  android:id="@+id/text"/>
    </ScrollView>
    <SeekBar
            style="@style/Widget.AppCompat.SeekBar.Discrete"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:max="9"
            android:progress="3"
            android:id="@+id/seekBar"
            android:layout_marginStart="8dp"
            app:layout_constraintStart_toStartOf="parent" android:layout_marginLeft="8dp"
            android:layout_marginBottom="8dp" app:layout_constraintBottom_toTopOf="@+id/button_clipboard"
            android:layout_marginEnd="8dp" app:layout_constraintEnd_toStartOf="@+id/textView_size"
            android:layout_marginRight="8dp"/>
    <TextView
            tools:text="42"
            android:minEms="2"
            android:textColor="@color/colorPrimaryDark"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" android:id="@+id/textView_size"
            app:layout_constraintEnd_toEndOf="parent"
            android:layout_marginEnd="8dp" android:layout_marginRight="8dp"
            app:layout_constraintBottom_toBottomOf="@+id/seekBar"
            app:layout_constraintTop_toTopOf="@+id/seekBar"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"/>
    <androidx.appcompat.widget.AppCompatButton
            android:text="@string/share"
            android:drawableStart="@drawable/ic_share_gray_24dp"
            android:drawableLeft="@drawable/ic_share_gray_24dp"
            android:drawablePadding="4dp"
            app:backgroundTint="@color/colorAccent"
            android:textColor="@color/colorPrimaryDark"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/button_share" app:layout_constraintEnd_toEndOf="parent" android:layout_marginEnd="8dp"
            android:layout_marginRight="8dp" android:layout_marginBottom="8dp"
            app:layout_constraintBottom_toBottomOf="parent"/>
    <androidx.appcompat.widget.AppCompatButton
            android:text="@string/copy_to_clipboard"
            android:drawableStart="@drawable/ic_content_copy_gray_24dp"
            android:drawableLeft="@drawable/ic_content_copy_gray_24dp"
            android:drawablePadding="8dp"
            app:backgroundTint="@color/colorAccent"
            android:textColor="@color/colorPrimaryDark"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/button_clipboard" app:layout_constraintStart_toStartOf="parent"
            android:layout_marginLeft="8dp"
            android:layout_marginStart="8dp" android:layout_marginBottom="8dp"
            app:layout_constraintBottom_toBottomOf="parent" app:layout_constraintEnd_toStartOf="@+id/button_share"
            android:layout_marginEnd="8dp" android:layout_marginRight="8dp" app:layout_constraintHorizontal_bias="0.0"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `AboutActivity.java`**

> Our `AboutActivity` class.

Create a java file named `AboutActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `Intent` from the `android.content` package.
3. `Drawable` from the `android.graphics.drawable` package.
4. `Uri` from the `android.net` package.
5. `Bundle` from the `android.os` package.
6. `LayoutInflater` from the `android.view` package.
7. `MenuItem` from the `android.view` package.
8. `View` from the `android.view` package.
9. `ViewGroup` from the `android.view` package.
10. `TextView` from the `android.widget` package.
11. `AppCompatActivity` from the `androidx.appcompat.app` package.
12. `Fragment` from the `androidx.fragment.app` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onOptionsItemSelected(MenuItem`.
3. `onCreateView(LayoutInflater`.
4. `onResume()`.
5. `getMaterialAboutList(final`.
6. `getTheme()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.danielstone.materialaboutlibrary.ConvenienceBuilder;
import com.danielstone.materialaboutlibrary.MaterialAboutFragment;
import com.danielstone.materialaboutlibrary.items.MaterialAboutActionItem;
import com.danielstone.materialaboutlibrary.items.MaterialAboutTitleItem;
import com.danielstone.materialaboutlibrary.model.MaterialAboutCard;
import com.danielstone.materialaboutlibrary.model.MaterialAboutList;
import com.danielstone.materialaboutlibrary.util.OpenSourceLicense;

public class AboutActivity extends AppCompatActivity {
    public final static String EXTRA_PRIVACY_POLICY = "privacy_policy";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about);

        if (savedInstanceState == null) {
            Fragment f;
            if (getIntent().getBooleanExtra(EXTRA_PRIVACY_POLICY, false)) {
                f = new ShowPrivacyPolicyFragment();
            } else {
                f = new MyMaterialAboutFragment();
            }

            getSupportFragmentManager()
                    .beginTransaction()
                    .add(R.id.about_container, f)
                    .commit();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public static class ShowPrivacyPolicyFragment extends Fragment {
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            return inflater.inflate(R.layout.privacy_policy_fragment, container, false);
        }

        @Override
        public void onResume() {
            super.onResume();
            TextView privacyPolicy = getView().findViewById(R.id.privacy_policy);
            privacyPolicy.setText(getString(R.string.privacy_policy_content));
        }
    }

    public static class MyMaterialAboutFragment extends MaterialAboutFragment {
        private static String PLAY_STORE_LINK;

        @Override
        protected MaterialAboutList getMaterialAboutList(final Context activityContext) {
            PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=" + activityContext.getPackageName();
            MaterialAboutCard.Builder firstCard = new MaterialAboutCard.Builder();
            firstCard.addItem(new MaterialAboutTitleItem.Builder()
                    .text(getString(R.string.app_name))
                    .icon(R.mipmap.ic_launcher)
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.author))
                    .subText("CharacterDog")
                    .icon(R.drawable.ic_person_gray_24dp)
                    .setOnClickAction(() -> {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog"));
                        startActivity(intent);
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.help_translating_this_app))
                    .icon(R.drawable.ic_language_gray_24dp)
                    .setOnClickAction(() -> {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://crowdin.com/project/lorem-ipsum-generator"));
                        startActivity(intent);
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.rate_in_play_store))
                    .icon(R.drawable.ic_star_gray_24dp)
                    .setOnClickAction(() -> {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(PLAY_STORE_LINK));
                        startActivity(intent);
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.share_with_friends))
                    .icon(R.drawable.ic_share_gray_24dp)
                    .setOnClickAction(() -> {
                        Intent sendIntent = new Intent();
                        sendIntent.setAction(Intent.ACTION_SEND);
                        sendIntent.putExtra(Intent.EXTRA_TEXT,
                                String.format(activityContext.getString(R.string.check_out),
                                        getString(R.string.app_name), PLAY_STORE_LINK));
                        sendIntent.setType("text/plain");
                        startActivity(sendIntent);
                    })
                    .build());

            MaterialAboutCard.Builder legalCard = new MaterialAboutCard.Builder();
            legalCard.title(activityContext.getString(R.string.legal));
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.license))
                    .subText("GNU General Public License v3.0")
                    .icon(R.drawable.ic_account_balance_gray_24dp)
                    .setOnClickAction(() -> {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog/loremipsum/blob/master/LICENSE"));
                        startActivity(intent);
                    })
                    .build());
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.privacy_policy))
                    .icon(R.drawable.ic_security_gray_24dp)
                    .setOnClickAction(() -> {
                        ShowPrivacyPolicyFragment f = new ShowPrivacyPolicyFragment();
                        getActivity().getSupportFragmentManager()
                                .beginTransaction()
                                .replace(R.id.about_container, f)
                                .addToBackStack(null)
                                .commit();
                    })
                    .build());

            Drawable codeDrawable = activityContext.getResources().getDrawable(R.drawable.ic_code_gray_24dp);

            MaterialAboutCard materialAboutLibraryLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "material-about-library", "2016", "Daniel Stone",
                            OpenSourceLicense.APACHE_2);

            MaterialAboutCard colorLibraryLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "Material Color Palette Library", "2018", "CharacterDog",
                            OpenSourceLicense.GNU_GPL_3);

            MaterialAboutCard toastyLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "Toasty", "2018", "Daniel Morales",
                            OpenSourceLicense.GNU_GPL_3); // todo GNU Lesser General Public License v3.0

            MaterialAboutCard iconLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "Material Design icons", "2018", "Google",
                            OpenSourceLicense.APACHE_2);

            return new MaterialAboutList.Builder()
                    .addCard(firstCard.build())
                    .addCard(legalCard.build())
                    .addCard(materialAboutLibraryLicenseCard)
                    .addCard(colorLibraryLicenseCard)
                    .addCard(toastyLicenseCard)
                    .addCard(iconLicenseCard)
                    .build();
        }

        @Override
        protected int getTheme() {
            return R.style.AppTheme_MaterialAboutActivity_Fragment;
        }
    }
}

```

**(b). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `ClipData` from the `android.content` package.
2. `ClipboardManager` from the `android.content` package.
3. `Intent` from the `android.content` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `Bundle` from the `android.os` package.
6. `Log` from the `android.util` package.
7. `Menu` from the `android.view` package.
8. `MenuItem` from the `android.view` package.
9. `Button` from the `android.widget` package.
10. `SeekBar` from the `android.widget` package.
11. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onProgressChanged(SeekBar`.
3. `onStartTrackingTouch(SeekBar`.
4. `onStopTrackingTouch(SeekBar`.
5. `onCreateOptionsMenu(Menu`.
6. `onOptionsItemSelected(MenuItem`.

We will be creating the following methods:

1. `updateUI(TextView sizeTextView, TextView loremIpsumTextView, int progress)`.

2. `getLorem(int size)` - It will return `String` object.

3. `getWordCount(int position)` - It will return `int` object.

4. `switch(position)` - It will return `switch` object.

**(a). Our `updateUI()` method.**

A method to update u i:

```java
    void updateUI(TextView sizeTextView, TextView loremIpsumTextView, int progress) {
        int wordCount = getWordCount(progress);
        sizeTextView.setText(getResources().getQuantityString(R.plurals.words, wordCount, wordCount));
        loremIpsumTextView.setText(getLorem(wordCount));
    }
```

**(b). Our `getLorem()` method.**

A method to get lorem:

```java
    String getLorem(int size) {
        int timesFullLorem = size / NUMBER_WORDS_IN_LOREM_RES;
        StringBuilder lorem = new StringBuilder();
        for (int i = 0; i < timesFullLorem; i++) {
            lorem.append(getString(R.string.lorem)).append(" ");
        }
        StringTokenizer stringTokenizer = new StringTokenizer(getString(R.string.lorem));
        for(int i = 0; i < size % NUMBER_WORDS_IN_LOREM_RES; i++) {
            lorem.append(stringTokenizer.nextToken()).append(" ");
        }
        lorem.deleteCharAt(lorem.length() - 1).append(".");
        return lorem.toString();
    }
```

**(c). Our `()` method.**

Write this method as follows:

```java
        switch (position) {
            case 0: return 10;
            case 1: return 20;
            case 2: return 50;
            case 3: return 100;
            case 4: return 200;
            case 5: return 500;
            case 6: return 1000;
            case 7: return 2000;
            case 8: return 5000;
            default: return 10000;
        }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import es.dmoral.toasty.Toasty;

import java.util.StringTokenizer;

import static com.github.characterdog.loremipsum.AboutActivity.EXTRA_PRIVACY_POLICY;

public class MainActivity extends AppCompatActivity {
    private final static String TAG = MainActivity.class.getSimpleName();
    private final static int NUMBER_WORDS_IN_LOREM_RES = 69;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SeekBar seekBar = findViewById(R.id.seekBar);
        final TextView sizeTextView = findViewById(R.id.textView_size);
        final TextView loremTextView = findViewById(R.id.text);
        Button shareButton = findViewById(R.id.button_share);
        Button copyButton = findViewById(R.id.button_clipboard);

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                updateUI(sizeTextView, loremTextView, progress);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
        updateUI(sizeTextView, loremTextView, seekBar.getProgress());

        shareButton.setOnClickListener(v -> {
            Intent sendIntent = new Intent();
            sendIntent.setAction(Intent.ACTION_SEND);
            sendIntent.putExtra(Intent.EXTRA_TEXT, loremTextView.getText());
            sendIntent.setType("text/plain");
            startActivity(sendIntent);
        });

        copyButton.setOnClickListener(v -> {
            try {
                ClipboardManager clipboard = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
                ClipData clip = ClipData.newPlainText("Lorem ipsum", loremTextView.getText());
                clipboard.setPrimaryClip(clip);
                Toasty.success(getApplicationContext(), getString(R.string.copy_success)).show();
            } catch (Exception e) {
                Log.e(TAG, "Error copying to clipboard", e);
                Toasty.error(getApplicationContext(), getString(R.string.copy_error)).show();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        if (id == R.id.action_about) {
            Intent i = new Intent(this, AboutActivity.class);
            startActivity(i);
            return true;
        } else if (id == R.id.action_privacy) {
            Intent i = new Intent(this, AboutActivity.class);
            i.putExtra(EXTRA_PRIVACY_POLICY, true);
            startActivity(i);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    void updateUI(TextView sizeTextView, TextView loremIpsumTextView, int progress) {
        int wordCount = getWordCount(progress);
        sizeTextView.setText(getResources().getQuantityString(R.plurals.words, wordCount, wordCount));
        loremIpsumTextView.setText(getLorem(wordCount));
    }

    String getLorem(int size) {
        int timesFullLorem = size / NUMBER_WORDS_IN_LOREM_RES;
        StringBuilder lorem = new StringBuilder();
        for (int i = 0; i < timesFullLorem; i++) {
            lorem.append(getString(R.string.lorem)).append(" ");
        }
        StringTokenizer stringTokenizer = new StringTokenizer(getString(R.string.lorem));
        for(int i = 0; i < size % NUMBER_WORDS_IN_LOREM_RES; i++) {
            lorem.append(stringTokenizer.nextToken()).append(" ");
        }
        lorem.deleteCharAt(lorem.length() - 1).append(".");
        return lorem.toString();
    }

    int getWordCount(int position) {
        switch (position) {
            case 0: return 10;
            case 1: return 20;
            case 2: return 50;
            case 3: return 100;
            case 4: return 200;
            case 5: return 500;
            case 6: return 1000;
            case 7: return 2000;
            case 8: return 5000;
            default: return 10000;
        }
    }
}


```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/characterdog/loremipsum/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/characterdog/loremipsum).|
|3.|Follow code author [here](https://github.com/characterdog).|
