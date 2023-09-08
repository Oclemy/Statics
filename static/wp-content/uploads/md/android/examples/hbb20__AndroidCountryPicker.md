# Android CountryPicker Example


> An android countrypicker library:

Here is the demo screenshot of this library in use:

<img height=500 src="https://user-images.githubusercontent.com/4918760/90301130-32916100-de5b-11ea-8238-3f1e03ef325c.png"/>


### Step 1. Add dependency

Add in your `app/build.gradle`:

```groovy
         dependencies {
           implementation 'com.hbb20:android-country-picker:X.Y.Z'
          }
```


### Step 2: Add to Layout

For the Default Country Picker View add following to your XML layout:

```xml
   <com.hbb20.CountryPickerView
   android:id="@+id/countryPicker"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content" />
```

### Step 2: Write Code

Modify view / dialog / list config in activity or fragment:

```kotlin
private fun setupCountryPickerView() {
        val countryPicker = findViewById<CountryPickerView>(R.id.countryPicker)

        // Modify CPViewConfig if you need. Access cpViewConfig through `cpViewHelper`
        countryPicker.cpViewHelper.cpViewConfig.viewTextGenerator = { cpCountry: CPCountry ->
            "${cpCountry.name} (${cpCountry.alpha2})"
        }
        // make sure to refresh view once view configuration is changed
        countryPicker.cpViewHelper.refreshView()

        // Modify CPDialogConfig if you need. Access cpDialogConfig through `countryPicker.cpViewHelper`
        // countryPicker.cpViewHelper.cpDialogConfig.

        // Modify CPListConfig if you need. Access cpListConfig through `countryPicker.cpViewHelper`
        // countryPicker.cpViewHelper.cpListConfig.

        // Modify CPRowConfig if you need. Access cpRowConfig through `countryPicker.cpViewHelper`
        // countryPicker.cpViewHelper.cpRowConfig.
    }
```

To Launch Country Picker Dialog add following to your Activity/Fragment: 

```kotlin
   context.launchCountryPickerDialog { selectedCountry: CPCountry? ->
     // your code to handle selected country
   }
```

To Load countries in RecyclerView add following to your Activity/Fragment:

```kotlin
   recyclerView.loadCountries { selectedCountry: CPCountry -> 
     // your code to handle selected country
   }
```

### Reference

[Read More](https://github.com/hbb20/AndroidCountryPicker/wiki/Country-Picker-View) about Country Picker View and available configuration.
 

