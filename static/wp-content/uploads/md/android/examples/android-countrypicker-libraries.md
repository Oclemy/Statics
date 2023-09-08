# Android CountryPicker

One of the input fields to your app may be the country of a user, say in an app that registers users. In such a case you would need to define an array of countries then load them in a list, then handle click events for the clicked item. That's not difficult but what if you want to provide richer experience, let the countries have flags, provide a search capability etc? Well your code will add up. You can therefore consider using the following country picker libraries. They are lightweight and won't clatter up your app.


## (a). Country-Picker

> Android Library that can be used to show a country picker.

Here are its features:

- Written in Kotlin
- No boilerplate code
- Easy initialization
- Search countries
- Show country names alongside flags.

![Android Country Picker](https://camo.githubusercontent.com/5d5c33005d2ea8f3281615c1314f2de560504098a94b9f725f6e106d4b4635e7/68747470733a2f2f692e706f7374696d672e63632f486e63547a786e662f77672d4f6e307a76702d55556b2d53442e6a7067)

### Step 1: Installing Country Picker

Start by registering jitpack as a maven url in your build.gradle as a repository:

```kotlin
maven { url 'https://jitpack.io' }
```

Then specify the implementation statement in the dependencies closure:

```groovy
implementation 'com.github.akshaaatt:Country-Picker:1.0.0'
```

Then sync the project.

### Step 2: Write Kotlin Code

The next step is to write code.

You can find a country by name:

```kotlin
private fun findByName() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val builder = AlertDialog.Builder(this, R.style.Base_Theme_MaterialComponents_Dialog_Alert)
        val input = EditText(this)
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        builder.setTitle("Country Name")
        builder.setView(input)
        builder.setCancelable(false)
        builder.setPositiveButton(android.R.string.ok) { dialog, which ->
            val country = countryPicker.getCountryByName(input.text.toString())
            if (country == null) {
                Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
            } else {
                showResultActivity(country)
            }
        }
        builder.setNegativeButton(android.R.string.cancel) { dialog, which -> dialog.cancel() }
        builder.show()
    }
```

Here's how to find a country by sim:

```kotlin
private fun findBySim() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val country = countryPicker.countryFromSIM
        if (country == null) {
            Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
        } else {
            showResultActivity(country)
        }
    }
```

Here's how to find a country by locale:

```kotlin
    private fun findByLocale() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val country = countryPicker.getCountryByLocale(Locale.getDefault())
        if (country == null) {
            Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
        } else {
            showResultActivity(country)
        }
    }
```

Here's how to find a country by ISO:

```kotlin
    private fun findByIson() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val builder = AlertDialog.Builder(this, R.style.Base_Theme_MaterialComponents_Dialog_Alert)
        val input = EditText(this)
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        builder.setTitle("Country Code")
        builder.setView(input)
        builder.setCancelable(false)
        builder.setPositiveButton(android.R.string.ok) { dialog, which ->
            val country = countryPicker.getCountryByISO(input.text.toString())
            if (country == null) {
                Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
            } else {
                showResultActivity(country)
            }
        }
        builder.setNegativeButton(android.R.string.cancel) { dialog, which -> dialog.cancel() }
        builder.show()
    }
```

### Example

Let's look at an example:

**(a). MainActivity.kt**

Heres the full code for main activity:

```kotlin
package com.limerse.picker

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SwitchCompat
import com.limerse.countrypicker.Country
import com.limerse.countrypicker.CountryPicker
import com.limerse.countrypicker.listeners.OnCountryPickerListener
import java.util.*

class MainActivity : AppCompatActivity(), OnCountryPickerListener {
    private var pickCountryButton: Button? = null
    private var findByNameButton: Button? = null
    private var findBySimButton: Button? = null
    private var findByLocaleButton: Button? = null
    private var findByIsoButton: Button? = null
    private lateinit var countryPicker: CountryPicker
    private var themeSwitch: SwitchCompat? = null
    private var styleSwitch: SwitchCompat? = null
    private var useBottomSheet: SwitchCompat? = null
    private var searchSwitch: SwitchCompat? = null
    private var sortByRadioGroup: RadioGroup? = null
    private var sortBy = CountryPicker.SORT_BY_NONE
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initialize()
        setListener()
    }

    private fun setListener() {
        findByNameButton!!.setOnClickListener { findByName() }
        findBySimButton!!.setOnClickListener { findBySim() }
        findByLocaleButton!!.setOnClickListener { findByLocale() }
        findByIsoButton!!.setOnClickListener { findByIson() }
        sortByRadioGroup!!.setOnCheckedChangeListener { radioGroup, id ->
            sortBy = when (id) {
                R.id.none_radio_button -> CountryPicker.SORT_BY_NONE
                R.id.name_radio_button -> CountryPicker.SORT_BY_NAME
                R.id.dial_code_radio_button -> CountryPicker.SORT_BY_DIAL_CODE
                R.id.iso_radio_button -> CountryPicker.SORT_BY_ISO
                else -> CountryPicker.SORT_BY_NONE
            }
        }
        pickCountryButton!!.setOnClickListener { showPicker() }
    }

    private fun findByIson() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val builder = AlertDialog.Builder(this, R.style.Base_Theme_MaterialComponents_Dialog_Alert)
        val input = EditText(this)
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        builder.setTitle("Country Code")
        builder.setView(input)
        builder.setCancelable(false)
        builder.setPositiveButton(android.R.string.ok) { dialog, which ->
            val country = countryPicker.getCountryByISO(input.text.toString())
            if (country == null) {
                Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
            } else {
                showResultActivity(country)
            }
        }
        builder.setNegativeButton(android.R.string.cancel) { dialog, which -> dialog.cancel() }
        builder.show()
    }

    private fun findByLocale() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val country = countryPicker.getCountryByLocale(Locale.getDefault())
        if (country == null) {
            Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
        } else {
            showResultActivity(country)
        }
    }

    private fun findBySim() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val country = countryPicker.countryFromSIM
        if (country == null) {
            Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
        } else {
            showResultActivity(country)
        }
    }

    private fun findByName() {
        countryPicker = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity).build()
        val builder = AlertDialog.Builder(this, R.style.Base_Theme_MaterialComponents_Dialog_Alert)
        val input = EditText(this)
        input.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
        builder.setTitle("Country Name")
        builder.setView(input)
        builder.setCancelable(false)
        builder.setPositiveButton(android.R.string.ok) { dialog, which ->
            val country = countryPicker.getCountryByName(input.text.toString())
            if (country == null) {
                Toast.makeText(this@MainActivity, "Country not found", Toast.LENGTH_SHORT).show()
            } else {
                showResultActivity(country)
            }
        }
        builder.setNegativeButton(android.R.string.cancel) { dialog, which -> dialog.cancel() }
        builder.show()
    }

    private fun showResultActivity(country: Country?) {
        val intent = Intent(this@MainActivity, ResultActivity::class.java)
        intent.putExtra(ResultActivity.Companion.BUNDLE_KEY_COUNTRY_NAME, country!!.name)
        intent.putExtra(ResultActivity.Companion.BUNDLE_KEY_COUNTRY_CURRENCY, country.currency)
        intent.putExtra(ResultActivity.Companion.BUNDLE_KEY_COUNTRY_DIAL_CODE, country.dialCode)
        intent.putExtra(ResultActivity.Companion.BUNDLE_KEY_COUNTRY_ISO, country.getCode())
        intent.putExtra(ResultActivity.Companion.BUNDLE_KEY_COUNTRY_FLAG_IMAGE, country.flag)
        startActivity(intent)
    }

    private fun showPicker() {
        val builder = CountryPicker.Builder().with(this@MainActivity)
                .listener(this@MainActivity)
        if (styleSwitch!!.isChecked) {
            builder.style(R.style.CountryPickerStyle)
        }
        builder.theme(if (themeSwitch!!.isChecked) CountryPicker.THEME_NEW else CountryPicker.THEME_OLD)
        builder.canSearch(searchSwitch!!.isChecked)
        builder.sortBy(sortBy)
        countryPicker = builder.build()
        if (useBottomSheet!!.isChecked) {
            countryPicker.showBottomSheet(this@MainActivity)
        } else {
            countryPicker.showDialog(this@MainActivity)
        }
    }

    private fun initialize() {
        pickCountryButton = findViewById(R.id.country_picker_button)
        themeSwitch = findViewById(R.id.theme_toggle_switch)
        styleSwitch = findViewById(R.id.custom_style_toggle_switch)
        useBottomSheet = findViewById(R.id.bottom_sheet_switch)
        searchSwitch = findViewById(R.id.search_switch)
        sortByRadioGroup = findViewById(R.id.sort_by_radio_group)
        findByNameButton = findViewById(R.id.by_name_button)
        findBySimButton = findViewById(R.id.by_sim_button)
        findByLocaleButton = findViewById(R.id.by_local_button)
        findByIsoButton = findViewById(R.id.by_iso_button)
    }

    override fun onSelectCountry(country: Country?) {
        showResultActivity(country)
    }
}
```

**(b). ResultActivity.kt**

Here's the result activity:

```kotlin
package com.limerse.picker

import android.os.Bundle
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ResultActivity : AppCompatActivity() {
    private var countryNameTextView: TextView? = null
    private var countryIsoCodeTextView: TextView? = null
    private var countryDialCodeTextView: TextView? = null
    private var selectedCountryCurrency: TextView? = null
    private var countryFlagImageView: ImageView? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)
        initialize()
        showData()
    }

    private fun showData() {
        val bundle = intent.extras
        if (bundle != null) {
            countryNameTextView!!.text = bundle.getString(BUNDLE_KEY_COUNTRY_NAME)
            countryIsoCodeTextView!!.text = bundle.getString(BUNDLE_KEY_COUNTRY_ISO)
            countryDialCodeTextView!!.text = bundle.getString(BUNDLE_KEY_COUNTRY_DIAL_CODE)
            selectedCountryCurrency!!.text = bundle.getString(BUNDLE_KEY_COUNTRY_CURRENCY)
            countryFlagImageView!!.setImageResource(bundle.getInt(BUNDLE_KEY_COUNTRY_FLAG_IMAGE))
        }
    }

    private fun initialize() {
        countryNameTextView = findViewById(R.id.selected_country_name_text_view)
        countryIsoCodeTextView = findViewById(R.id.selected_country_iso_text_view)
        countryDialCodeTextView = findViewById(R.id.selected_country_dial_code_text_view)
        countryFlagImageView = findViewById(R.id.selected_country_flag_image_view)
        selectedCountryCurrency = findViewById(R.id.selected_country_currency)
        val backButton = findViewById<ImageButton>(R.id.back_button)
        backButton.setOnClickListener { finish() }
    }

    companion object {
        const val BUNDLE_KEY_COUNTRY_NAME = "country_name"
        const val BUNDLE_KEY_COUNTRY_ISO = "country_iso"
        const val BUNDLE_KEY_COUNTRY_DIAL_CODE = "dial_code"
        const val BUNDLE_KEY_COUNTRY_CURRENCY = "currency"
        const val BUNDLE_KEY_COUNTRY_FLAG_IMAGE = "flag_image"
    }
}
```

You can find the layouts [here](https://github.com/akshaaatt/Country-Picker/tree/master/app/src/main/res/layout)

### Reference

Find reference [here](https://github.com/akshaaatt/Country-Picker)
