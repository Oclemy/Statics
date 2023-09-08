---
title: characterdog/bmi-calculator
taxonomy: 
    post_tag: BMI Calculator
post_status: publish
custom_fields:
    rating: 5
---

>  BMI calculator app for Android.


![BMI Calculator Tutorial](https://camo.githubusercontent.com/63456f6f4ef391d2268dbbfc8cf50caff94199f088fe19d5bb42bfee65cd830b/68747470733a2f2f6170692e7472617669732d63692e636f6d2f636861726163746572646f672f626d692d63616c63756c61746f722e7376673f6272616e63683d6d6173746572)

![BMI Calculator Tutorial](https://camo.githubusercontent.com/27cce8298ca81398c452b064b998f95a6499e68ae5f0670e3bf472b136730f44/68747470733a2f2f64333232637174353834626f346f2e636c6f756466726f6e742e6e65742f636861726163746572646f672d626d692d63616c63756c61746f722f6c6f63616c697a65642e737667)


- Supports metric and imperial system of units
- Material Design
- Your data stays on your device
- No ads or tracking


![BMI Calculator Tutorial](https://camo.githubusercontent.com/fefd7089be3e793fb7858c5965f46e046d5bb78eac6d7f5bdd11f3e737b226a4/68747470733a2f2f662d64726f69642e6f72672f62616467652f6765742d69742d6f6e2e706e67)

![BMI Calculator Tutorial](https://camo.githubusercontent.com/2149f526e69167218eb7eea8f21cb74a756aa43495f7acfeccfe995d40f62028/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f696d616765732f67656e657269632f656e5f62616467655f7765625f67656e657269632e706e67)

![BMI Calculator Tutorial](https://github.com/characterdog/bmi-calculator/raw/master/fastlane/metadata/android/en-US/images/icon.png)

![BMI Calculator Tutorial](https://github.com/characterdog/bmi-calculator/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/1.png)

![BMI Calculator Tutorial](https://github.com/characterdog/bmi-calculator/raw/master/fastlane/metadata/android/en-US/images/phoneScreenshots/2.png)

Published under [GNU General Public License v3.0 or later](https://spdx.org/licenses/GPL-3.0-or-later.html).


Let us look at the full BMI Calculator Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 1 plugins:

1. Our `com.android.application` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 4 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.github.characterdog.bmicalculator"
        minSdkVersion 14
        targetSdkVersion 27
        versionCode 3
        versionName "1.3"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    lintOptions {
        abortOnError false
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-alpha2'
    implementation 'com.google.android.material:material:1.1.0-alpha01'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.0'

    implementation 'com.github.daniel-stoneuk:material-about-library:2.4.2'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `privacy_policy_fragment.xml`**

> Our `privacy_policy_fragment` layout.

This layout will represent our Fragment Policy Privacy's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
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
            android:layout_height="match_parent"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"/>

</LinearLayout>
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
2. [`TextInputLayout`](https://android.examples.directory/textinputlayout)
3. [`AutoCompleteTextView`](https://android.examples.directory/autocompletetextview)
4. [`TextView`](https://android.examples.directory/textview)
5. [`AppCompatButton`](https://android.examples.directory/appcompatbutton)
6. [``](https://android.examples.directory/)
7. [`RadioButton`](https://android.examples.directory/radiobutton)
8. [`RadioGroup`](https://android.examples.directory/radiogroup)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    tools:layout_editor_absoluteY="81dp">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.0">

        <androidx.constraintlayout.widget.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <com.google.android.material.textfield.TextInputLayout
                android:id="@+id/txt_height_outer"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="16dp"
                android:layout_marginLeft="16dp"
                android:layout_marginRight="16dp"
                android:layout_marginStart="16dp"
                android:layout_marginTop="24dp"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent">

                <AutoCompleteTextView
                    android:id="@+id/txt_height"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:digits="0123456789.,"
                    android:ems="10"
                    android:hint="@string/height_metric"
                    android:inputType="numberDecimal"
                    android:maxLines="1"
                    android:singleLine="true" />
            </com.google.android.material.textfield.TextInputLayout>

            <com.google.android.material.textfield.TextInputLayout
                android:id="@+id/txt_weight_outer"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="16dp"
                android:layout_marginLeft="16dp"
                android:layout_marginRight="16dp"
                android:layout_marginStart="16dp"
                android:layout_marginTop="8dp"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/txt_height_outer">

                <AutoCompleteTextView
                    android:id="@+id/txt_weight"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:ems="10"
                    android:hint="@string/weight_metric"
                    android:inputType="numberDecimal"
                    android:maxLines="1"
                    android:singleLine="true" />
            </com.google.android.material.textfield.TextInputLayout>

            <TextView
                android:id="@+id/txt_result_bmi"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginLeft="8dp"
                android:layout_marginRight="8dp"
                android:layout_marginStart="8dp"
                android:layout_marginTop="16dp"
                android:textSize="20sp"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/txt_weight_outer"
                tools:text="BMI: 20" />

            <TextView
                android:id="@+id/txt_result_cat"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginLeft="8dp"
                android:layout_marginRight="8dp"
                android:layout_marginStart="8dp"
                android:layout_marginTop="8dp"
                android:textSize="20sp"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/txt_result_bmi"
                tools:text="Normal (healthy weight) " />

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btn_more_info"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginLeft="8dp"
                android:layout_marginRight="8dp"
                android:layout_marginStart="8dp"
                android:layout_marginTop="16dp"
                android:text="@string/more_information"
                android:textColor="#ffffff"
                app:backgroundTint="@color/colorPrimary"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/txt_result_cat" />

            <RadioGroup xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginLeft="8dp"
                android:layout_marginRight="8dp"
                android:layout_marginStart="8dp"
                android:layout_marginTop="8dp"
                android:orientation="horizontal"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@+id/btn_more_info">

                <RadioButton
                    android:id="@+id/btn_metric"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/metric"
                    android:onClick="setSystemOfUnits"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintStart_toStartOf="parent"
                    app:layout_constraintTop_toTopOf="parent" />

                <RadioButton
                    android:id="@+id/btn_imperial"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="8dp"
                    android:layout_marginStart="8dp"
                    android:text="@string/imperial"
                    android:onClick="setSystemOfUnits"
                    app:layout_constraintBottom_toBottomOf="parent"
                    app:layout_constraintEnd_toEndOf="parent"
                    app:layout_constraintStart_toEndOf="@+id/btn_metric"
                    app:layout_constraintTop_toTopOf="parent" />
            </RadioGroup>
        </androidx.constraintlayout.widget.ConstraintLayout>
    </ScrollView>
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
6. `Fragment` from the `androidx.fragment.app` package.
7. `AppCompatActivity` from the `androidx.appcompat.app` package.
8. `LayoutInflater` from the `android.view` package.
9. `MenuItem` from the `android.view` package.
10. `View` from the `android.view` package.
11. `ViewGroup` from the `android.view` package.
12. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onOptionsItemSelected(MenuItem`.
3. `onCreateView(LayoutInflater`.
4. `onResume()`.
5. `getMaterialAboutList(final`.
6. `onClick()`.
7. `getTheme()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.appcompat.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.danielstone.materialaboutlibrary.ConvenienceBuilder;
import com.danielstone.materialaboutlibrary.MaterialAboutFragment;
import com.danielstone.materialaboutlibrary.items.MaterialAboutActionItem;
import com.danielstone.materialaboutlibrary.items.MaterialAboutItemOnClickAction;
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
                    .icon(R.drawable.ic_person_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog"));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.help_translating_this_app))
                    .icon(R.drawable.ic_language_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://crowdin.com/project/characterdog-bmi-calculator"));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.rate_in_play_store))
                    .icon(R.drawable.ic_star_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(PLAY_STORE_LINK));
                            startActivity(intent);
                        }
                    })
                    .build());
            firstCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.share_with_friends))
                    .icon(R.drawable.ic_share_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent sendIntent = new Intent();
                            sendIntent.setAction(Intent.ACTION_SEND);
                            sendIntent.putExtra(Intent.EXTRA_TEXT,
                                    String.format(activityContext.getString(R.string.check_out),
                                            getString(R.string.app_name), PLAY_STORE_LINK));
                            sendIntent.setType("text/plain");
                            startActivity(sendIntent);
                        }
                    })
                    .build());

            MaterialAboutCard.Builder legalCard = new MaterialAboutCard.Builder();
            legalCard.title(activityContext.getString(R.string.legal));
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.license))
                    .subText("GNU General Public License v3.0")
                    .icon(R.drawable.ic_account_balance_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/characterdog/bmi-calculator/blob/master/LICENSE"));
                            startActivity(intent);
                        }
                    })
                    .build());
            legalCard.addItem(new MaterialAboutActionItem.Builder()
                    .text(activityContext.getString(R.string.privacy_policy))
                    .icon(R.drawable.ic_security_teal_24dp)
                    .setOnClickAction(new MaterialAboutItemOnClickAction() {
                        @Override
                        public void onClick() {
                            ShowPrivacyPolicyFragment f = new ShowPrivacyPolicyFragment();
                            getActivity().getSupportFragmentManager()
                                    .beginTransaction()
                                    .replace(R.id.about_container, f)
                                    .addToBackStack(null)
                                    .commit();
                        }
                    })
                    .build());

            Drawable codeDrawable = activityContext.getResources().getDrawable(R.drawable.ic_code_teal_24dp);

            MaterialAboutCard materialAboutLibraryLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "material-about-library", "2016", "Daniel Stone",
                            OpenSourceLicense.APACHE_2);

            MaterialAboutCard iconLicenseCard = ConvenienceBuilder
                    .createLicenseCard(activityContext, codeDrawable,
                            "Material Design icons", "2018", "Google",
                            OpenSourceLicense.APACHE_2);

            return new MaterialAboutList.Builder()
                    .addCard(firstCard.build())
                    .addCard(legalCard.build())
                    .addCard(materialAboutLibraryLicenseCard)
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

1. `SuppressLint` from the `android.annotation` package.
2. `Intent` from the `android.content` package.
3. `SharedPreferences` from the `android.content` package.
4. `Uri` from the `android.net` package.
5. `PreferenceManager` from the `android.preference` package.
6. `AppCompatActivity` from the `androidx.appcompat.app` package.
7. `Bundle` from the `android.os` package.
8. `Editable` from the `android.text` package.
9. `TextWatcher` from the `android.text` package.
10. `Menu` from the `android.view` package.
11. `MenuItem` from the `android.view` package.
12. `View` from the `android.view` package.
13. `AutoCompleteTextView` from the `android.widget` package.
14. `Button` from the `android.widget` package.
15. `EditText` from the `android.widget` package.
16. `RadioButton` from the `android.widget` package.
17. `TextView` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onCreateOptionsMenu(Menu`.
4. `onOptionsItemSelected(MenuItem`.
5. `beforeTextChanged(CharSequence`.
6. `onTextChanged(CharSequence`.
7. `afterTextChanged(Editable`.

We will be creating the following methods:

1. `initTextField(EditText editText)`.

2. `calculateBmiIfPossible()`.

3. `isValidInput(EditText editText)` - It will return `boolean` object.

4. `getTextAsDouble(EditText editText)` - It will return `double` object.

5. `calculateBmiAndCastIfNeeded(double height, double weight)` - It will return `double` object.

6. `calculateBmi(double height, double weight)` - It will return `double` object.

7. `getCategory(double bmi)` - It will return `String` object.

8. `setSystemOfUnits()`.

9. `isMetric()` - It will return `boolean` object.

10. `setSystemOfUnits(View v)`.

**(a). Our `isValidInput()` method.**

A method to is valid input:

```java
    private boolean isValidInput(EditText editText) {
        return getTextAsDouble(editText) > 0;
    }
```

**(b). Our `setSystemOfUnits()` method.**

A method to set system of units:

```java
    public void setSystemOfUnits(View v) {
        sharedPreferences.edit().putBoolean(PREF_IS_METRIC, v.getId() == R.id.btn_metric).apply();
        setSystemOfUnits();
        calculateBmiIfPossible();
    }
```

**(c). Our `calculateBmiAndCastIfNeeded()` method.**

A method to calculate bmi and cast if needed:

```java
    private double calculateBmiAndCastIfNeeded(double height, double weight) {
        height = isMetric() ? height : height / 39.37008;
        weight = isMetric() ? weight : weight / 2.204623;
        return calculateBmi(height, weight);
    }
```

**(d). Our `initTextField()` method.**

A method to init text field:

```java
    private void initTextField(EditText editText) {
        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                calculateBmiIfPossible();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });
    }
```

**(e). Our `getTextAsDouble()` method.**

A method to get text as double:

```java
    private double getTextAsDouble(EditText editText) {
        String input = editText.getText().toString().replace(',', '.');
        try {
            return Double.valueOf(input);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
```

**(f). Our `calculateBmiIfPossible()` method.**

A method to calculate bmi if possible:

```java
    private void calculateBmiIfPossible() {
        if (isValidInput(txt_height) && isValidInput(txt_weight)) {
            double bmi = calculateBmiAndCastIfNeeded(getTextAsDouble(txt_height), getTextAsDouble(txt_weight));
            txt_result_bmi.setText(getString(R.string.bmi_result, bmi));
            txt_result_cat.setText(getCategory(bmi));
        } else {
            txt_result_bmi.setText("");
            txt_result_cat.setText("");
        }
    }
```

**(g). Our `isMetric()` method.**

A method to is metric:

```java
    private boolean isMetric() {
        boolean defaultToMetric = getString(R.string.default_unit).equals(getString(R.string.metric));
        return sharedPreferences.getBoolean(PREF_IS_METRIC, defaultToMetric);
    }
```

**(h). Our `calculateBmi()` method.**

A method to calculate bmi:

```java
    public static double calculateBmi(double height, double weight) {
        return Math.round(weight / Math.pow(height, 2) * 10d) / 10d;
    }
```

**(i). Our `getCategory()` method.**

A method to get category:

```java
    private String getCategory(double bmi) {
        if (bmi < 15) {
            return getString(R.string.bmi_cat_1);
        }
        if (bmi < 16) {
            return getString(R.string.bmi_cat_2);
        }
        if (bmi < 18.5) {
            return getString(R.string.bmi_cat_3);
        }
        if (bmi < 25) {
            return getString(R.string.bmi_cat_4);
        }
        if (bmi < 30) {
            return getString(R.string.bmi_cat_5);
        }
        if (bmi < 35) {
            return getString(R.string.bmi_cat_6);
        }
        if (bmi < 40) {
            return getString(R.string.bmi_cat_7);
        }
        if (bmi < 45) {
            return getString(R.string.bmi_cat_8);
        }
        if (bmi < 50) {
            return getString(R.string.bmi_cat_9);
        }
        if (bmi < 60) {
            return getString(R.string.bmi_cat_10);
        }
        return getString(R.string.bmi_cat_11);
    }
```

**(j). Our `setSystemOfUnits()` method.**

A method to set system of units:

```java
    private void setSystemOfUnits() {
        RadioButton btn_metric = findViewById(R.id.btn_metric);
        RadioButton btn_imperial = findViewById(R.id.btn_imperial);
        btn_metric.setChecked(isMetric());
        btn_imperial.setChecked(!isMetric());

        TextInputLayout txt_weight_outer = findViewById(R.id.txt_weight_outer);
        TextInputLayout txt_height_outer = findViewById(R.id.txt_height_outer);
        txt_weight_outer.setHint(isMetric() ? getString(R.string.weight_metric) : getString(R.string.weight_imperial));
        txt_height_outer.setHint(isMetric() ? getString(R.string.height_metric) : getString(R.string.height_imperial));
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.preference.PreferenceManager;
import com.google.android.material.textfield.TextInputLayout;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

import static com.github.characterdog.bmicalculator.AboutActivity.EXTRA_PRIVACY_POLICY;

public class MainActivity extends AppCompatActivity {
    private final static String TAG = MainActivity.class.getSimpleName();
    private final static String PREF_IS_METRIC = "system_of_unit";

    TextView txt_result_bmi;
    TextView txt_result_cat;
    AutoCompleteTextView txt_height;
    AutoCompleteTextView txt_weight;
    SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        txt_height = findViewById(R.id.txt_height);
        txt_weight = findViewById(R.id.txt_weight);
        initTextField(txt_height);
        initTextField(txt_weight);

        txt_result_bmi = findViewById(R.id.txt_result_bmi);
        txt_result_cat = findViewById(R.id.txt_result_cat);
        Button btn_more_info = findViewById(R.id.btn_more_info);
        btn_more_info.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(getString(R.string.wikipedia_bmi_link)));
                startActivity(browserIntent);
            }
        });

        setSystemOfUnits();
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

    private void initTextField(EditText editText) {
        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                calculateBmiIfPossible();
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });
    }

    @SuppressLint("StringFormatMatches")
    private void calculateBmiIfPossible() {
        if (isValidInput(txt_height) && isValidInput(txt_weight)) {
            double bmi = calculateBmiAndCastIfNeeded(getTextAsDouble(txt_height), getTextAsDouble(txt_weight));
            txt_result_bmi.setText(getString(R.string.bmi_result, bmi));
            txt_result_cat.setText(getCategory(bmi));
        } else {
            txt_result_bmi.setText("");
            txt_result_cat.setText("");
        }
    }

    private boolean isValidInput(EditText editText) {
        return getTextAsDouble(editText) > 0;
    }

    private double getTextAsDouble(EditText editText) {
        String input = editText.getText().toString().replace(',', '.');
        try {
            return Double.valueOf(input);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private double calculateBmiAndCastIfNeeded(double height, double weight) {
        height = isMetric() ? height : height / 39.37008;
        weight = isMetric() ? weight : weight / 2.204623;
        return calculateBmi(height, weight);
    }

    public static double calculateBmi(double height, double weight) {
        return Math.round(weight / Math.pow(height, 2) * 10d) / 10d;
    }

    private String getCategory(double bmi) {
        if (bmi < 15) {
            return getString(R.string.bmi_cat_1);
        }
        if (bmi < 16) {
            return getString(R.string.bmi_cat_2);
        }
        if (bmi < 18.5) {
            return getString(R.string.bmi_cat_3);
        }
        if (bmi < 25) {
            return getString(R.string.bmi_cat_4);
        }
        if (bmi < 30) {
            return getString(R.string.bmi_cat_5);
        }
        if (bmi < 35) {
            return getString(R.string.bmi_cat_6);
        }
        if (bmi < 40) {
            return getString(R.string.bmi_cat_7);
        }
        if (bmi < 45) {
            return getString(R.string.bmi_cat_8);
        }
        if (bmi < 50) {
            return getString(R.string.bmi_cat_9);
        }
        if (bmi < 60) {
            return getString(R.string.bmi_cat_10);
        }
        return getString(R.string.bmi_cat_11);
    }

    private void setSystemOfUnits() {
        RadioButton btn_metric = findViewById(R.id.btn_metric);
        RadioButton btn_imperial = findViewById(R.id.btn_imperial);
        btn_metric.setChecked(isMetric());
        btn_imperial.setChecked(!isMetric());

        TextInputLayout txt_weight_outer = findViewById(R.id.txt_weight_outer);
        TextInputLayout txt_height_outer = findViewById(R.id.txt_height_outer);
        txt_weight_outer.setHint(isMetric() ? getString(R.string.weight_metric) : getString(R.string.weight_imperial));
        txt_height_outer.setHint(isMetric() ? getString(R.string.height_metric) : getString(R.string.height_imperial));
    }

    private boolean isMetric() {
        boolean defaultToMetric = getString(R.string.default_unit).equals(getString(R.string.metric));
        return sharedPreferences.getBoolean(PREF_IS_METRIC, defaultToMetric);
    }

    public void setSystemOfUnits(View v) {
        sharedPreferences.edit().putBoolean(PREF_IS_METRIC, v.getId() == R.id.btn_metric).apply();
        setSystemOfUnits();
        calculateBmiIfPossible();
    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/characterdog/bmi-calculator/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/characterdog/bmi-calculator).|
|3.|Follow code author [here](https://github.com/characterdog).|
