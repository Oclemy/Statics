# CountryCodePicker Example


> A Country Code Picker Library.

Country Code Picker (CCP)  is an android library which provides an easy way to search and select country phone code for the telephone number.

CCP gives professional touch to your well designed form like login screen, sign up screen, edit profile screen.
CCP removes confusion about how to add number and thus make view more understandable. Finally reduces mistakes in user input.

The most recommended usage for CCP is using the default setting so the library will auto check the all the value.
 To do that, you need to follow the following steps:
 
 1. Add CCP view to layout
 2. Add EditText view to layout
 3. register the `EditText` using `registerPhoneNumberTextView(editText)` we can also use TextView instead of editText.
 4. Let the magic happens ;)

<img src="https://raw.githubusercontent.com/joielechong/CountryCodePicker/master/release/dialog_color.png" width="300">

### Step 1: Install it

How to add to your project

1. Add jitpack.io to your root build.gradle file:

```groovy
    allprojects {
        repositories {
            jcenter()
            maven { url "https://jitpack.io" }
        }
    }
```

2. Add library to your app build.gradle file then sync

```groovy
    dependencies {
        implementation 'com.github.joielechong:countrycodepicker:2.4.2'
    }
```

### Step 2: Add to Layout

Add ccp view to xml layout
   
```xml
    <com.rilixtech.widget.countrycodepicker.CountryCodePicker
          android:id="@+id/ccp"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content" />
```

If you want to Add EditText view to layout:

 ```xml
     <EditText
            android:id="@+id/phone_number_edt"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="phone"
            android:inputType="phone"/>
 ```

### Step 4: Show in Activity/Fragment:

Add ccp object in Activity / Fragment

```java
    CountryCodePicker ccp;
```

Then Bind ccp from layout
   
```java
    ccp = (CountryCodePicker) findViewById(R.id.ccp);
```

That's it. Run the project and see the results.


If you want to register an EditText with code:

```java
   CountryCodePicker ccp;
   AppCompatEditText edtPhoneNumber;

   ...

   ccp = (CountryCodePicker) findViewById(R.id.ccp);
   edtPhoneNumber = findViewById(R.id.phone_number_edt);

   ...

   ccp.registerPhoneNumberTextView(edtPhoneNumber);
```
> You can check validity of phone number using `isValid()` method.

### Attributes

Here the attributes that can be used in CountryCodePicker layout:

|   Attribute    |   method                        | Description
|---------------|---------------------------------|-------------------------------
|ccp_defaultCode | setDefaultCountryUsingPhoneCodeAndApply(int defaultCode) |  set selected Flag and phone in CCP by phone code.
|ccp_showFullName| showFullName(boolean show) | Show full name of country in CCP. Default is false|
|ccp_hideNameCode| hideNameCode(boolean hide) | Hide the country name code. Default is false|
|ccp_hidePhoneCode| hidePhoneCode(boolean hide)| Hide the phone code. Default is false|

### Reference

Read more [here](https://github.com/joielechong/CountryCodePicker).

 
