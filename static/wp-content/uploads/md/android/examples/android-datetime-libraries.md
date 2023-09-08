# Best Android DateTime Libraries and HowTo Examples - 2021

In most apps we build, date and time is a feature we tend to use. The standard options availed by java.util do work well but they are not quite effective and for something so basic, they tend to need alot of custom solutions. This introduces possibilities of errors as we add lots of boilerplate code in our project. But there are solutions that have already been implemented, and that we can easily incorporate into our applications. These tend to do the job for us mostly using a single line of code.

For example with these libraries you will be able to easily perform the following:

- Get date today, yesterday etc.
- Get date 2 years from now or from the past.
- Add a certain number to a given date etc.


You do these with a single line of code. Let's look at the libraries:

## (a). Tempo

> Kotlin intuitive java.util.Date extensions.

The easiest way to work with date and time. Through Tempo you can:

1. Get and initialize datetime.
2. Compare Dates.
3. Add/Subtract dates.
4. show date in a User friendly, english like manner.
5. Parse and Format dates etc.

### Step 1: Install Tempo

```groovy
dependencies {
  implementation 'com.github.cesarferreira:tempo:0.7.0'
}
```

### Step 2: Use Tempo

Here are example usage of Tempo in Kotlin:

```kotlin
val now: Date = Tempo.now               //=> now
now + 1.week                            //=> next week
now - 2.days                            //=> day before yesterday
now + (3.weeks - 4.days + 5.hours)      //=> somewhere in 2 and a half weeks

Tempo.tomorrow                          //=> tomorrow
Tempo.yesterday                         //=> yesterday
1.day.ago                               //=> yesterday
3.weeks.ago                             //=> 3 weeks ago
5.years.forward                         //=> five years in the future
```

#### Initialize by specifying date components

```kotlin
Tempo.with(year = 1990, month = 1, day = 21)    //=> 1990/01/21
Tempo.with(year = 2019, month = 6, day = 26, hour = 18, minute = 58, second = 31, millisecond = 777)
```

#### Initialize by changing date components

```kotlin
Tempo.now.with(month = 12, day = 25)    //=> this year's christmas
Date().with(month = 12, day = 25)       //=> this year's christmas

// shortcuts
Tempo.now.beginningOfYear     //=> new year's day
Tempo.now.endOfYear           //=> new year's eve
```

#### Check day of the week / properties

```kotlin
Tempo.now.isMonday
Tempo.now.isTuesday
Tempo.now.isWednesday
Tempo.now.isThursday
Tempo.now.isFriday
Tempo.now.isSaturday
Tempo.now.isSunday
Tempo.now.isWeekend
Tempo.now.isWeekday

Tempo.now.isToday                       // true
Tempo.tomorrow.isToday                  // false
Tempo.tomorrow.isTomorrow               // true
Tempo.yesterday.isYesterday             // true
```

#### Format and parse

Here's how you format and parse dates using Tempo:

```kotlin
5.minutes.forward.toString("yyyy-MM-dd HH:mm:ss")
//=> "2019-06-11 12:05:00"

"1988-03-02".toDate("yyyy-MM-dd")
//=> Tempo.with(year = 1988, month = 3, day = 2)
```

#### Compare dates

Here's how you compare dates in kotlin using Tempo:

```kotlin
1.day.ago > 2.days.ago                  // true
1.day.ago in 2.days.ago..Tempo.now      // true
```

### Reference

Find complete reference [here](https://github.com/cesarferreira/tempo).

### Kotlin Android DateTime - Easiest way to work with Date and Time

Let's look at a full Tempo example. This example will teach everything Tempo has to offer.

#### Step 1: Install tempo

Install Tempo as we'd seen above.

Also we will enable ViewBinding in the app level build.gradle:

```groovy
   buildFeatures {
        viewBinding true
    }
```

ViewBinding will allowus easily reference widgets in our kotlin code.

#### Step 2: Create Layout

Our layout will have a listview that will render our results to the user.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ListView
        android:id="@+id/listView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Create MainActivity

MainActivity is our only activity in the project. It is slef explanatory:

**MainActivity.kt**

```kotlin
package info.camposha.mr_tempo_datetime

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.cesarferreira.tempo.*
import info.camposha.mr_tempo_datetime.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    private fun createDateExamples(): List<String> {
        val examples = listOf(
            "------ GET DATE,TIME   ----",
            "NOW: ${Tempo.now}",
            "INITIALIZATION: ${Tempo.with(year = 1990, month = 1, day = 21)}",
            "INITIALIZATION: ${Tempo.now.with(month = 12, day = 25)}",
            "",
            "------- USER FRIENDLY READABLE DATES   -------",
            "TOMORROW: ${Tempo.tomorrow}",
            "YESTERDAY: ${Tempo.yesterday}",
            "",
            "------- ADD OR SUBTRACT DATES   --------",
            "1 WEEK FROM NOW: " + (Tempo.now.plus(1.week)),
            "1 WEEK AGO: " + Tempo.now.minus(1.week),
            "2 DAYS AGO: " + Tempo.now.minus(2.days),
            "",
            "------ TIME AGO  ---------",
            "A DAY AGO: ${1.day.ago}",
            "3 WEEKS AGO: ${3.weeks.ago}",
            "5 YEARS FORWARD: ${5.years.forward}",
            "",
            "------- SHORTCUTS   -----",
            "NEW YEAR: ${Tempo.now.beginningOfYear}",
            "END OF YEAR: ${Tempo.now.endOfYear}",
            "----CHECK DATE-----",
            "IS MONDAY: ${Tempo.now.isMonday}",
            "IS TUESDAY: ${Tempo.now.isTuesday}",
            "IS WEDNESDAY: ${Tempo.now.isWednesday}",
            "IS THURSDAY: ${Tempo.now.isThursday}",
            "IS FRIDAY: ${Tempo.now.isFriday}",
            "IS SATURDAY: ${Tempo.now.isSaturday}",
            "IS SUNDAY: ${Tempo.now.isSunday}",
            "IS WEEKEND: ${Tempo.now.isWeekend}",
            "IS WEEKDAY: ${Tempo.now.isWeekday}",
            "",
            "------ FORMAT AND PARSE  ------",
            "${5.minutes.forward.toString("yyyy-MM-dd HH:mm:ss")}",
            "${"1988-03-02".toDate("yyyy-MM-dd")}",
            "",
            "------ COMPARE  -------",
            "${1.day.ago > 2.days.ago}",
            "${1.day.ago in 2.days.ago..Tempo.now}"

        )
        return examples
    }

    private fun populateListView(data: List<String>) {
        binding.listView.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, data)
        binding.listView.setOnItemClickListener { _, _, i, _ ->
            Toast.makeText(this@MainActivity,data[i],Toast.LENGTH_SHORT).show()
         }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        populateListView(createDateExamples())
    }
}
```

#### Run

Run the Code in android studio and you will get the following:

![Android DateTime Example](https://github.com/Oclemy/MrTempoDateTime/raw/master/MrTempoDateTime.gif)

#### Download

Download the source code [here](https://github.com/Oclemy/MrTempoDateTime/archive/refs/heads/master.zip).

## (b). Karamba

> A collection of useful Kotlin extension for Android.

![](https://github.com/matteocrippa/karamba/blob/master/.github/karamba.png?raw=true)

Karamba is not only a datetime library, it's actually a utilities library but has some easy to use datetime functions alongside some commonlyused functionalities in android development.

### Step 1: Install

Add to **gradle** in _allprojects_

```
maven { url 'https://jitpack.io' }
```

then add this

```
implementation 'com.github.matteocrippa:karamba:1.2.0'
```

### Step 2: How to Use Karamba

`Karamba` provides you a list of different and useful extensions for your project, here the list organized by the type extended.

#### General

- `support(apiVersion)`, lambda that allow you to run code only if current SDK is up to specified one
- `supportKitkat()`, lambda that checks if kitkat is supported and run the code
- `supportLollipop()`, lambda that checks if lollipop is supported and run the code

#### Bitmap

- `base64()`, produces a base64 representation of the current bitmap
- `resize(height, width)`, resize the current bitmap to new format

#### Boolean

- `toggle()`, handle the bool as a toogle changing the value to opposite one, then the new value is returned (not yet possible to change this)
- `random()`, returns a random boolean value, then the new value is returned (not yet possible to change this)

#### Date

- `convertTo(format)`, converts current date to a custom format provided as argument (eg. `dd-MM-yy HH:mm`)
- `toCalendar()`, converts current date to `Calendar`
- `isFuture()`, returns true if date is in the future
- `isPast()`, returns true if date is in the past
- `isToday()`, returns if current date is today
- `isTomorrow()`, returns if current date is tomorrow
- `isYesterday()`, returns if current date is yesterday
- `today()`, returns today's date
- `tomorrow()`, returns tomorrow's date
- `yesterday()`, returns yesterday's date
- `hour()`, returns current date hour as number
- `minute()`, returns current date minutes as number
- `second()`, returns current date seconds as number
- `month()`, returns current date month as number
- `monthName()`, returns current date month as long name
- `year()`, returns current date year as number
- `day()`, returns current date day as number
- `dayOfWeek()`, returns current date day of the week as number
- `dayOfWeekName()`, returns current date weekday as string
- `dayOfYear()`, returns current date day of year as number

#### Double

- `localCurrency(currency)`, converts current double to the currency format passed as argument (eg. `EUR`)
- `celsiusToFahrenheit()`, converts current double to fahrenheit
- `fahrenheitToCelsius()`, converts current double to celsius

#### Drawable

- `toBitmap()`, converts the current drawable in `Bitmap`

#### Int

- `readableDistanceFromMeters()`, converts an int amount of meters in a readable meter, kilometers distance
- `commaSeparatedId()`, converts an array of int, in a string of comma separated items
- `random()`, provides a random number in the range provided (eg. `(0..10).random()`)

#### String

- `isValidEmail()`, returns if current string is a valid email
- `isUrl()`, returns if current string is a valid url
- `isNumeric()`, returns if current string contains a number
- `isPhoneNumber()`, returns if current string contains a phone number
- `random(lenght)`, returns a random string of provided length
- `toBitmap()`, convert current base64 string into Bitmap
- `ellipsize(chars)`, ellipsizes the current string, truncating at defined amount of characters
- `toDate(format)`, converts current string in a `Date` object using the provided format
- `plainText()`, removes all html formatting from current string
- `toCamelCase()`, camel case the current string current string

#### View

- `toBitmap()`, converts current view into `Bitmap`

## (c). SimpleDate

> Android/Kotlin Library To Format Date & Time Into Common Formats.

### Step 1: Install

In project-level `build.gradle`:

```
allprojects {
   repositories {
      ...
      maven { url 'https://jitpack.io' }
    }
}
```

In app-level `build.gradle`:

```
dependencies {
     implementation 'com.github.sidhuparas:SimpleDate:2.1.0'
}
```

### Step 2: How to Use

You can use the methods on a date object. Following are the available functions:

#### For Date and Time

```kotlin
date
     .toDateTimeStandard()               // 13 August 2019 21:55:11
     .toDateTimeStandardIn12Hours()      // 13 August 2019 9:55:11 PM
     .toDateTimeStandardInDigits()       // 13-08-2019 21:55:11
     .toDateTimeStandardInDigitsAnd12Hours()     // 13-08-2019 9:55:11 PM
     .toDateTimeStandardConcise()                // 13 Aug 2019 21:55:11
     .toDateTimeStandardConciseIn12Hours()       // 13 Aug 2019 9:55:11 PM
     .toDateTimeYY()                     // 13 August 19 21:55:11
     .toDateTimeYYIn12Hours()            // 13 August 19 9:55:11 PM
     .toDateTimeYYInDigits()             // 13-08-19 21:55:11
     .toDateTimeYYInDigitsAnd12Hours()   // 13-08-19 9:55:11 PM
     .toDateTimeYYConcise()              // 13 Aug 19 21:55:11
     .toDateTimeYYConciseIn12Hours()     // 13 Aug 19 9:55:11 PM
     .toZuluFormat()                     // 2019-08-19T21:16:55:11.926Z
```

#### For Time Only

```kotlin
date
     .toTimeStandard()                           // 21:55:11
     .toTimeStandardWithoutSeconds()             // 21:55
     .toTimeStandardIn12Hours()                  // 9:55:11 PM
     .toTimeStandardIn12HoursWithoutSeconds()    // 9:55 PM
```

#### For Date Only

```kotlin
date
      .toDateStandard()               // 13 August 2019
      .toDateStandardConcise()        // 13 Aug 2019
      .toDateStandardInDigits()       // 13-08-2019
      .toDateYY()                     // 13 August 19
      .toDateYYConcise()              // 13 Aug 19
      .toDateYYInDigits()             // 13-08-19
      .toDateYMD()                    // 2019 August 13
      .toDateYMDConcise()             // 2019 Aug 13
      .toDateYMDInDigits()            // 2019-08-13
      .toDateEMd()                    // Tue, Aug 13
      .toDateEMYShort()               // Tue, Aug 19
      .toDateEMY()                    // Tuesday, August 2019
```

#### For Day Only

```kotlin
date.toDay()                    // Tuesday
```

### Examples

- **Kotlin**:

```kotlin
   val date = Date()
   println(date.toDateTimeStandard())
```

- **Java**:

```java
    Date date = new Date();
    System.out.println(SimpleDateKt.toDateTimeStandard(date));
```

### Reference

Find completre reference [here](https://github.com/sidhuparas/SimpleDate).

## (d). DateTimeUtils

### Step 1: Install

The DateTimeUtils library is available from [JitPack](https://jitpack.io/#thunder413/NetRequest/1.2).

First add JitPack dependency line in your project `build.gradle` file:

```xml
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

And then simply add the following line to the `dependencies` section of your app module `build.gradle` file:

```groovy
implementation 'com.github.thunder413:DateTimeUtils:3.0'
```

### Step 2: Use

Use DateTimeUtils. Let's see some examples.

#### setTimeZone

`setTimeZone` allow you to define your time zone by default it's `UTC`

```java
DateTimeUtils.setTimeZone("UTC");
```

#### formatDate

`formatDate` is a method that allow you to convert `date object` to `string` or `timeStamp` to date and vice-versa.

#### Date string to Date object

```java
// MySQL/SQLite dateTime example
Date date = DateTimeUtils.formatDate("2017-06-13 04:14:49");
// Or also with / separator
Date date = DateTimeUtils.formatDate("2017/06/13 04:14:49");
// MySQL/SQLite date example
Date date = DateTimeUtils.formatDate("2017-06-13");
// Or also with / separator
Date date = DateTimeUtils.formatDate("2017/06/13");
```

#### Date object to date string MySQL/SQLite

```java
String date = DateTimeUtils.formatDate(new Date());
```

#### timeStamp to Date object

By default it will considere given timeStamp in milliseconds but in case you did retrieve the timeStamp from server wich usually will be in seconds supply `DateTimeUnits.SECONDS` to tell the fonction about

```java
// Using milliseconds
Date date = DateTimeUtils.formatDate(1497399731000);
// Using seconds (Server timeStamp)
Date date = DateTimeUtils.formatDate(1497399731,DateTimeUnits.SECONDS);
```

#### formatWithStyle

`formatWithStyle` allow to parse date into localized format using most common style

#### Date object to localized date

```java
DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.FULL); // Tuesday, June 13, 2017
DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.LONG); // June 13, 2017
DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.MEDIUM); // Jun 13, 2017
DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.SHORT); // 06/13/17
```

#### Date string to localized date

```java
DateTimeUtils.formatWithStyle("2017-06-13", DateTimeStyle.FULL); // Tuesday, June 13, 2017
DateTimeUtils.formatWithStyle("2017-06-13", DateTimeStyle.LONG); // June 13, 2017
DateTimeUtils.formatWithStyle("2017-06-13", DateTimeStyle.MEDIUM); // Jun 13, 2017
DateTimeUtils.formatWithStyle("2017-06-13", DateTimeStyle.SHORT); // 06/13/17
```

#### formatWithPattern

`formatWithPattern` allow to define your own parse pattern following `SimpleDateFormat` scheme

#### Date string as source

```java
DateTimeUtils.formatWithPattern("2017-06-13", "EEEE, MMMM dd, yyyy"); // Tuesday, June 13, 2017
```

#### Date object as source

```java
DateTimeUtils.formatWithPattern(new Date(), "EEEE, MMMM dd, yyyy"); // Tuesday, June 13, 2017
```

#### isToday

`isToday` Tell whether or not a given date is today date

```java
// Date object as source
boolean state = DateTimeUtils.isToday(new Date());
// Date String as source
boolean state = DateTimeUtils.isToday("2017-06-15 04:14:49");
```

#### isYesterday

`isYesterday` Tell whether or not a given date is yesterday date

```java
// Date object as source
boolean state = DateTimeUtils.isYesterday(new Date());
// Date String as source
boolean state = DateTimeUtils.isYestrday("2017-06-15 04:14:49");
```

#### Get Previous next Week

`getPreviousWeekDate/getNextWeekDate` Return the next or a previous week date from a given date it also allow you to set the day of the week by using Calendar Constant

```java
// Date object as source
Date date = DateTimeUtils.getPreviousWeekDate(new Date(), Calendar.MONDAY);
// Date String as source
Date date = DateTimeUtils.getNextWeekDate("2017-06-15 04:14:49",Calendar.SUNDAY);
```

#### Get Previous next month

`getPreviousMonthDate/getNextMonthDate` Return the next or a previous month date from a given date

```java
// Date object as source
Date date = DateTimeUtils.getNextMonthDate(new Date());
// Date String as source
Date date = DateTimeUtils.getPreviousMonthDate("2017-06-15 04:14:49");
```

#### getDateDiff

`getDateDiff` give you the difference between two date in days, hours, minutes, seconds or milliseconds `DateTimeUnits`

```java
// Dates can be date object or date string
Date date = new Date();
String date2 = "2017-06-13 04:14:49";
// Get difference in milliseconds
int diff = DateTimeUtils.getDateDiff(date,date2, DateTimeUnits.MILLISECONDS);
// Get difference in seconds
int diff = DateTimeUtils.getDateDiff(date,date2, DateTimeUnits.SECONDS);
// Get difference in minutes
int diff = DateTimeUtils.getDateDiff(date,date2, DateTimeUnits.MINUTES);
// Get difference in hours
int diff = DateTimeUtils.getDateDiff(date,date2, DateTimeUnits.HOURS);
// Get difference in days
int diff = DateTimeUtils.getDateDiff(date,date2, DateTimeUnits.DAYS);
```

#### getTimeAgo

`getTimeAgo` give ou the elapsed time since a given date, it also offer two print mode the full and short strings `eg . 3 hours ago | 3h ago` the strings are localized but at the moment only FR and EN language are available. If you need your langage to be add just let me know :)

```java
String timeAgo = DateTimeUtils.getTimeAgo(context,new Date()); // Full string style will be used
// Short string style
String timeAgo = DateTimeUtils.getTimeAgo(context,"new Date()",DateTimeStyle.AGO_SHORT_STRING );
```

#### formatTime

`formatTime` allow you to extract time from date by default it wont show the hours if equal to `0` but you can supply `forceShowHours` parameter to force hours display

```java
String time = DateTimeUtils.formatTime(new Date()); // 14:49 if hours equals 0 or 04:14:09 if hours witch is wrong when use it on time rather than a duration
// Solution >> force hours display
String time = DateTimeUtils.formatTime(new Date(),true);
// And you can also supplie a date string
String time = DateTimeUtils.formatTime("2017-06-13 04:14:49"); // 04:14:49
```

#### millisToTime

`millisToTime` is usefull when your dealing with duration and want to display for example player duration or current playback position into human readable value.

```java
String time = DateTimeUtils.millisToTime(2515); // It take millis as an argument not seconds
```

#### timeToMillis

`timeToMillis` allow to convert `time` string to `millseconds`

```java
int milliseconds = DateTimeUtils.timeToMillis("14:20"); // 860000
```

### Example

Here's a full example:

**MainActivity.java**

```java
import android.os.Bundle;

import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.format.DateUtils;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.github.thunder413.datetimeutils.DateTimeStyle;
import com.github.thunder413.datetimeutils.DateTimeUnits;
import com.github.thunder413.datetimeutils.DateTimeUtils;

import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Date date = new Date();
        DateTimeUtils.setDebug(true);

        Log.d(TAG,"Date To String >> "+DateTimeUtils.formatDate(new Date()));
        DateTimeUtils.setTimeZone("GMT");
        Log.d(TAG,"Previous month from today >> "+DateTimeUtils.formatDate(DateTimeUtils.getPreviousMonthDate(new Date())));
        Log.d(TAG,"Next month from today >> "+DateTimeUtils.formatDate(DateTimeUtils.getNextMonthDate(new Date())));
        Log.d(TAG,"Previous >> "+DateTimeUtils.formatDate(DateTimeUtils.getPreviousWeekDate(DateTimeUtils.formatDate(" 2019-05-06 22:32:57"), Calendar.MONDAY)));
        Log.d(TAG,"String To Date >> "+DateTimeUtils.formatDate("2017-06-13 04:14:49"));
        Log.d(TAG,"IsToDay >> "+DateTimeUtils.isToday(new Date()));
        Log.d(TAG,"IsToDay String >> "+DateTimeUtils.isToday("2017-06-15 04:14:49"));
        Log.d(TAG,"IsYesterdaY Date >> "+DateTimeUtils.isYesterday(new Date()));
        Log.d(TAG,"IsYesterdaY String >> "+DateTimeUtils.isYesterday("2017-06-12 04:14:49"));
        Log.d(TAG,"TimeAgo String >> "+DateTimeUtils.getTimeAgo(this,"2017-06-13 04:14:49"));
        Log.d(TAG,"TimeAgo Date >> "+DateTimeUtils.getTimeAgo(this,date));
        Log.d(TAG,"Diff in milliseconds >> "+DateTimeUtils.getDateDiff(new Date(),DateTimeUtils.formatDate("2017-06-13 04:14:49"), DateTimeUnits.MILLISECONDS));
        Log.d(TAG,"Diff in seconds >> "+DateTimeUtils.getDateDiff(new Date(),DateTimeUtils.formatDate("2017-06-13 04:14:49"), DateTimeUnits.SECONDS));
        Log.d(TAG,"Diff in minutes >> "+DateTimeUtils.getDateDiff(new Date(),DateTimeUtils.formatDate("2017-06-13 04:14:49"), DateTimeUnits.MINUTES));
        Log.d(TAG,"Diff in hours >> "+DateTimeUtils.getDateDiff(new Date(),DateTimeUtils.formatDate("2017-06-13 04:14:49"), DateTimeUnits.HOURS));
        Log.d(TAG,"Diff in days >> "+DateTimeUtils.getDateDiff(new Date(),DateTimeUtils.formatDate("2017-06-13 04:14:49"), DateTimeUnits.DAYS));
        Log.d(TAG,"Extract time from date >> "+DateTimeUtils.formatTime(new Date()));
        Log.d(TAG,"Extract time from dateString >> "+DateTimeUtils.formatTime("2017-06-13 04:14:49"));
        Log.d(TAG,"Millis to time  >> "+DateTimeUtils.millisToTime(25416660));
        Log.d(TAG,"Time to millis  >> "+DateTimeUtils.timeToMillis("14:20"));
        Log.d(TAG,"Revert Millis to time  >> "+DateTimeUtils.millisToTime(860000));
        Log.d(TAG,"FormatWithStyle  FULL >> "+DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.FULL));
        Log.d(TAG,"FormatWithStyle  LONG >> "+DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.LONG));
        Log.d(TAG,"FormatWithStyle  MEDIUM >> "+DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.MEDIUM));
        Log.d(TAG,"FormatWithStyle  SHORT >> "+DateTimeUtils.formatWithStyle(new Date(), DateTimeStyle.SHORT));

    }

}
```

### Reference

Javadocs are available [here](http://https://github.com/thunder413/DateTimeUtils/apidocs/index.html).
