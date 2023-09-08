# Android DateTime,Calender and DateTimePicker Tutorial and Libraries
#post_date: 10-07-2021

Handling dates is one of the most fundamental aspects of any programming language. Date and Time are important because it allows us identify when a certain event or operation occurred. For example you can easily organize your posts by the date they were published or updated. Without date it would be very difficult for to identify the latest tutorials in this website for example.

Luckily for us, android as a framework leans on Java which has a filthy rich set of APIs to allow us handle dates. For example the Calender class is easy to use to manipulate dates.

In this post we want to explore:

1. The Calender class and examples.
2. DateTimePicker
3. Other datetime libraries.
4. Other DateTimePicker libraries.


### Calender

The best way to understand the Calender class is to see it in action. Let's look at some real world examples of this important class.

**How to get the First Day of a Week**

You have a date, we want you to get the first day of the week in which that current date is located. You are returning a Date object:

```java

    /**
     * @param date
     * @return
     */
    public static Date getFirstDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.SUNDAY);
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_WEEK,
                calendar.getFirstDayOfWeek()); // Sunday
        return calendar.getTime();
    }
```

Let's say you want to get the first day of a week in a certain year. You have the year and week. By day we mean you are returning a Date object. Here is how to do it:

```java
    /**
     * @param year
     * @param week
     * @return
     */
    public static Date getFirstDayOfWeek(int year, int week) {
        week = week - 1;
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        calendar.set(Calendar.DATE, 1);

        Calendar cal = (Calendar) calendar.clone();
        cal.add(Calendar.DATE, week * 7);

        return getFirstDayOfWeek(cal.getTime());
    }
```

**How to get Last day of a week**

You are given a date object. Return the first day of the week in which that date is located:

```java
    /**
     * @param date
     * @return
     */
    public static Date getFirstDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.SUNDAY);
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_WEEK,
                calendar.getFirstDayOfWeek()); // Sunday
        return calendar.getTime();
    }
```

You are given the year and week as integers, return the last day of the week as a Date object:

```java
    /**
     * @param year
     * @param week
     * @return
     */
    public static Date getLastDayOfWeek(int year, int week) {
        week = week - 1;
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, Calendar.JANUARY);
        calendar.set(Calendar.DATE, 1);
        Calendar cal = (Calendar) calendar.clone();
        cal.add(Calendar.DATE, week * 7);

        return getLastDayOfWeek(cal.getTime());
    }
```

Here are more examples:

```java
    /**
     * Get the last day of the week of the current date
     *
     * @param date
     * @return
     */
    public static Date getLastDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.SUNDAY);
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_WEEK,
                calendar.getFirstDayOfWeek() + 6); // Saturday
        return calendar.getTime();
    }

    /**
     * Get the last day of the week before the week of the current date
     *
     * @param date
     * @return
     */
    public static Date getLastDayOfLastWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return getLastDayOfWeek(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.WEEK_OF_YEAR) - 1);
    }
```

**How to get the First day of a month**

You are given a date, return the first day of the month for that day. You are returning it as a Date object:

```java
    /**
     * Returns the first day of the month of the specified date
     */
    public static Date getFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH), 1);
        return calendar.getTime();
    }
```

Here are more examples for returning the first day of a month but with different parameters:

```java
   /**
     * Return to the first day of the month of the specified year and month
     *
     * @param year
     * @param month
     * @return
     */
    public static Date getFirstDayOfMonth(Integer year, Integer month) {
        Calendar calendar = Calendar.getInstance();
        if (year == null) {
            year = calendar.get(Calendar.YEAR);
        }
        if (month == null) {
            month = calendar.get(Calendar.MONTH);
        }
        calendar.set(year, month, 1);
        return calendar.getTime();
    }
```

**How to Get the Last Day of a month**

You are given a date object. You are asked to return the last day of that month in which that date is located. You are returning a Date object.

```java
    /**
     * Returns the last day of the month of the specified date
     */
    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH), 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }
```

What about if you are given only the year and week as integers:

```java
    /**
     * Returns the last day of the month of the specified year and month
     *
     * @param year
     * @param month
     * @return
     */
    public static Date getLastDayOfMonth(Integer year, Integer month) {
        Calendar calendar = Calendar.getInstance();
        if (year == null) {
            year = calendar.get(Calendar.YEAR);
        }
        if (month == null) {
            month = calendar.get(Calendar.MONTH);
        }
        calendar.set(year, month, 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }
```

**How to Get the Last Day of the Previous Month**

You are given a date object and asked to return the last day of the previous month:

```java
    /**
     * Returns the last day of the previous month on the specified date
     */
    public static Date getLastDayOfLastMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH) - 1, 1);
        calendar.roll(Calendar.DATE, -1);
        return calendar.getTime();
    }
```

**How to Get the First Day of a Quarter**

You are given a date object and asked to return the first day of quarter in which that date belongs:

```java
    /**
     * Returns the first day of the season for the specified date
     */
    public static Date getFirstDayOfQuarter(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return getFirstDayOfQuarter(calendar.get(Calendar.YEAR),
                getQuarterOfYear(date));
    }
```

What about if you are given only month and year:

```java
    /**
     * Returns the first day of the season for the specified season
     */
    public static Date getFirstDayOfQuarter(Integer year, Integer quarter) {
        Calendar calendar = Calendar.getInstance();
        Integer month = new Integer(0);
        if (quarter == 1) {
            month = 1 - 1;
        } else if (quarter == 2) {
            month = 4 - 1;
        } else if (quarter == 3) {
            month = 7 - 1;
        } else if (quarter == 4) {
            month = 10 - 1;
        } else {
            month = calendar.get(Calendar.MONTH);
        }
        return getFirstDayOfMonth(year, month);
    }
```

**How to Get last day of a quarter**

If you are given a date object:

```java
    /**
     * Returns the last day of the season for the specified date
     */
    public static Date getLastDayOfQuarter(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return getLastDayOfQuarter(calendar.get(Calendar.YEAR),
                getQuarterOfYear(date));
    }
```

If you are given the year and the quarter as integers:

```java

    /**
     * Returns the last day of the season for the specified season
     */
    public static Date getLastDayOfQuarter(Integer year, Integer quarter) {
        Calendarcalendar=Calendar.getInstance();
        Integer month = new Integer(0);
        if (quarter == 1) {
            month = 3 - 1;
        } else if (quarter == 2) {
            month = 6 - 1;
        } else if (quarter == 3) {
            month = 9 - 1;
        } else if (quarter == 4) {
            month = 12 - 1;
        } else {
            month = calendar.get(Calendar.MONTH);
        }
        return getLastDayOfMonth(year, month);
    }
```

**How to Get Last Day of Previous Quarter**

You are given a date object and asked to obtain the last day of the previous quarter:

```java
    /**
     * Returns the last day of the previous season on the specified date
     */
    public static Date getLastDayOfLastQuarter(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return getLastDayOfLastQuarter(calendar.get(Calendar.YEAR),
                getQuarterOfYear(date));
    }
```

If you are given only the year and the quarter:

```java
    /**
     * Returns the last day of the previous season for the specified season
     */
    public static Date getLastDayOfLastQuarter(Integer year, Integer quarter) {
        Calendar calendar = Calendar.getInstance();
        Integer month = new Integer(0);
        if (quarter == 1) {
            month = 12 - 1;
        } else if (quarter == 2) {
            month = 3 - 1;
        } else if (quarter == 3) {
            month = 6 - 1;
        } else if (quarter == 4) {
            month = 9 - 1;
        } else {
            month = calendar.get(Calendar.MONTH);
        }
        return getLastDayOfMonth(year, month);
    }
```

**How to Get the Quarter of a given date**

You are given a date object and asked to obtain its quarter:

```java
    /**
     * Returns the quarter of the specified date
     */
    public static int getQuarterOfYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH) / 3 + 1;
    }
```

**How to Compare Two Dates**

You have two date objects and need to compare them.You comparing them to check if they are the same or not. Here is how you do it using the Calender class.

```java
    public static boolean isSameDate(Date date1, Date date2) {

        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);

        boolean isSameYear = cal1.get(Calendar.YEAR) == cal2
                .get(Calendar.YEAR);
        boolean isSameMonth = isSameYear
                && cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH);
        boolean isSameDate = isSameMonth
                && cal1.get(Calendar.DAY_OF_MONTH) == cal2
                .get(Calendar.DAY_OF_MONTH);

        return isSameDate;
    }
```

What about if the dates to be compared are to be supplied as long data type:

```java
    Public static boolean isSameDate ( long date1 , long date2 ) {
        return isSameDate(new Date(date1), new Date(date2));
    }
```

**How to Get Month of a given date**

You are given a Date object and asked to return month as an integer:

```java
    public static int getMouth(Date date) {
        Calendar cale = Calendar.getInstance();
        cale.setTime(date);
//        int year = cale.get(Calendar.YEAR);
        int month = cale.get(Calendar.MONTH) + 1;
//        int day = cale.get(Calendar.DATE);
//        int hour = cale.get(Calendar.HOUR_OF_DAY);
// int minutes = path.get (Calendar.MINUTE);
//        int second = cale.get(Calendar.SECOND);
//        int dow = cale.get(Calendar.DAY_OF_WEEK);
//        int dom = cale.get(Calendar.DAY_OF_MONTH);
//        int doy = cale.get(Calendar.DAY_OF_YEAR);
        return month;
    }
```

**How to Get the Quarter or Season**

You are given a date object and asked to get the season or quarter in which that date belongs:

```java
    public static String getSeason(Date date) {
        Calendar cale = Calendar.getInstance();
        cale.setTime(date);
        int seasonNumber = cale.get(Calendar.MONTH);
        return seasonNumber >= 1 && seasonNumber <= 3 ? "春" : seasonNumber >= 4 && seasonNumber <= 6 ? "夏" : seasonNumber >= 7 && seasonNumber <= 9 ? "秋" : seasonNumber >= 10 ? "冬" : "冬";
    }
```

### TimePicker

Let's now come and look at the **TimePicker**.

A TimePicker is a widget for selecting the time of day, in either 24-hour or AM/PM mode.

TimePicker allows you select only time. If you want to select dates then you use [DatePicker](https://camposha.info/android/datepicker).

TimePicker for example is displayed in a Dialog to form TimePickerDialog.

#### TimePicker API Definition

TimePicker was added in `API level 1`.

As a clas it resides in the `android.widget` package and derives from FrameLayout.

```java
public class TimePicker extends FrameLayout
```

Here's it's inheritance tree:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
               ↳    android.widget.TimePicker
```

### DatePicker

_A DatePicker is a widget that allows us select a date._

It's existed API Level 1 and derives from FrameLayout.

You can use the `DatePicker` to select year, month and day. You can use a Spinner or CalenderView as long as you set the `R.styleable.DatePicker_datePickerMode` attribute.

The set of spinners and the calendar view are automatically synchronized. The client can customize whether only the spinners, or only the calendar view, or both to be displayed.

When the `R.styleable.DatePicker_datePickerMode` attribute is set to calendar, the month and day can be selected using a calendar-style view while the year can be selected separately using a list.

DatePickerDialog is a dialog that makes use of DatePicker.

#### DatePicker API Definition

DatePicker has been around since the beginning of android, `API Level 1`.

It's a class deriving from the FrameLayout.

```java
public class DatePicker extends FrameLayout
```

Let's see datepicker's inheritance hierarchy:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
               ↳    android.widget.DatePicker
```

#### Example 1 - DatePicker and TimePicker Example

Let's look at a simple timepicker example.

##### (a). MainActivity.java

Start by adding imports including `android.widget.Timepicker`:

```java
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.DatePicker;
import android.widget.TimePicker;
```

Create our class:

```java
public class MainActivity extends AppCompatActivity {
```

Define our instance fields:

```java
    private TimePicker timePicker ;
    private DatePicker datePicker;
    Private Calendar calendar ;
    private int year;
    private int month;
    private int day ;
    private int hour;
    private int minute;
```

In our onCreate() method start by initializing the `Calender` class:

```java
 calendar = Calendar.getInstance();
```

Use the `Calender` instance to obtain year,month,day,hour and minute:

```java
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH);
        day = calendar.get(Calendar.DAY_OF_MONTH);
        hour = calendar.get(Calendar.HOUR);
        minute = calendar.get(Calendar.MINUTE);
```

Here is the full code for MainActivity:

```java

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.DatePicker;
import android.widget.TimePicker;

import java.util.Calendar ;

public class MainActivity extends AppCompatActivity {

    private TimePicker timePicker ;
    private DatePicker datePicker;
    Private Calendar calendar ;
    private int year;
    private int month;
    private int day ;
    private int hour;
    private int minute;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_main);
        setContentView(R.layout.main);
        // Get an object of the calendar
        calendar = Calendar.getInstance();
        // Get the year, month, day, minute, second
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH);
        day = calendar.get(Calendar.DAY_OF_MONTH);
        hour = calendar.get(Calendar.HOUR);
        minute = calendar.get(Calendar.MINUTE);
        setTitle(year+"-"+ month%12 +"-"+day+"-"+" "+hour+":"+minute);
        datePicker = (DatePicker) findViewById(R.id.datePicker);
        timePicker = (TimePicker) findViewById(R.id.timePicker);

        datePicker.init(
                year, month, day, new DatePicker.OnDateChangedListener() {
                    @Override
                    public void onDateChanged(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                        setTitle(year+"-"+monthOfYear%12+"-"+dayOfMonth);
                    }
                });
        timePicker.setOnTimeChangedListener(new TimePicker.OnTimeChangedListener() {
            @Override
            public void onTimeChanged(TimePicker view, int hourOfDay, int minute) {
                setTitle(hourOfDay + ":" + minute);
            }
        });

        new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                setTitle(year + "-"+(monthOfYear+1)+"-"+dayOfMonth);
            }
        },year,calendar.get(Calendar.MONTH),day).show();

        new TimePickerDialog(this, new TimePickerDialog.OnTimeSetListener() {
            @Override
            public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                setTitle(hourOfDay+":"+minute);
            }
        },hour,minute,true).show();
    }

}
```

#### (b).main.xml

Here is the layout file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent" android:layout_height="match_parent"
    android:orientation="vertical"
    >

    <DatePicker
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:id="@+id/datePicker" />

    <TimePicker
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:id="@+id/timePicker"
        android:layout_gravity="bottom" />
```

#### DatePickerDialog

In this class we see how to set and retrieve date via the DatePickerDialog widget.

DatePickerDialog allows us to pick and set dates. Those dates can be set programmatically or via the datetimepicker component.

In this class let's see how to do both.

If you prefer a video tutorial or want to watch the demo please see the video below:

DatePickerDialog resides in the `android.widget` package and as we have said allows us set date and pick the set dates.

To set date basically this is what we do:

```java
new DatePickerDialog(this, myDateSetListener, myYear,myMonth, myDay);
```

Instantiate the DatePickerDialog passing in a `Context`,`android.app.DatePickerDialog.OnDateSetListener`,year month and day.

You can use the Calender class to get those year,month and date:

```java
// Get Year, Month and Day From java.util.Calendar
        final Calendar c = Calendar.getInstance();
        myYear = c.get(Calendar.YEAR);
        myMonth = c.get(Calendar.MONTH);
        myDay = c.get(Calendar.DAY_OF_MONTH);
```

But first we need to have instantiated that OnDateListener and overridden the `onDateSet()` method:

```java
 myDateSetListener = new OnDateSetListener() {
            //when date is set
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,int dayOfMonth) {
                //get the set date and show in a Toast message
                Toast.makeText(MainActivity.this,String.valueOf(dayOfMonth)+" : "+String.valueOf(monthOfYear)+" : "+ String.valueOf(year), Toast.LENGTH_SHORT).show();
            }
        };
```

Let's look at a complete example:

#### 1\. activity_main.xml

Here's our layout. At the root we have a RelativeLayout.

Inside it we have a TextView which is our header label.

Then a simple button that when clicked will show our DatePickerDialog.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingLeft="5dp"
    android:paddingRight="5dp"
    tools:context="info.camposha.mydatepicker.MainActivity">

    <TextView
        android:id="@+id/headerLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:fontFamily="casual"
        android:text="DatePicker - Get and Set"
        android:textAllCaps="true"
        android:textSize="24sp"
        android:textStyle="bold" />

    <Button
        android:id="@+id/showDatePicker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Date Picker"
        android:background="@android:drawable/edit_text"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true" />
</RelativeLayout>
```

#### 2\. MainActivity.java

Here's our main activity class:

First we specify the package our class will reside in. Then add our imports, including `android.widget.DatePicker` and `android.app.DatePickerDialog`.

We'll make our class derive from `android.app.Activity`, the base [activity](https://camposha.info/android/activity) class.

Then define our instance fields.

We'll have a method called `getAndSet()` that will first, using the Calender class, get the current Date.

Then instantiate the `android.app.DatePickerDialog.OnDateSetListener`, get the selected date and show in a Toast message.

We'll override the `onCreateDialog()` method of the Activity class and instantiate a DatePickerDialog and return it. We pass to it our date that we had obtained from the `java.Util.Calender`.

```java
package info.camposha.mydatepicker;

import java.util.Calendar;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.DatePickerDialog.OnDateSetListener;
import android.app.Dialog;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Toast;

public class MainActivity extends Activity {

    private static final int MY_DATE_PICKER = 0;
    private OnDateSetListener myDateSetListener;
    int myYear;
    int myMonth;
    int myDay;

    /*
    when activity is created
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button showDatePickerBtn=findViewById(R.id.showDatePicker);
        showDatePickerBtn.setOnClickListener(new OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        showDialog(MY_DATE_PICKER);
                    }
                });
        getAndSetDate();
    }
    /*
    Get and Set dates
     */
    private void getAndSetDate()
    {
        // Get Year, Month and Day From java.util.Calendar
        final Calendar c = Calendar.getInstance();
        myYear = c.get(Calendar.YEAR);
        myMonth = c.get(Calendar.MONTH);
        myDay = c.get(Calendar.DAY_OF_MONTH);

        //Listen to date set events
        myDateSetListener = new OnDateSetListener() {
            //when date is set
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,int dayOfMonth) {
                //get the set date and show in a Toast message
                Toast.makeText(MainActivity.this,String.valueOf(dayOfMonth)+" : "+String.valueOf(monthOfYear)+" : "+ String.valueOf(year), Toast.LENGTH_SHORT).show();
            }
        };
    }
    /*
    When any dialog is created
     */
    @Override
    protected Dialog onCreateDialog(int id) {
        switch (id) {
            case MY_DATE_PICKER:
                return new DatePickerDialog(this, myDateSetListener, myYear,myMonth, myDay);
        }
        return super.onCreateDialog(id);
    }
}
```

That's it.

Here is the demo:

![Android DateTimePickerDialog](https://camposha.info/wp-content/uploads/2019/12/datepicker.gif)

Android DateTimePickerDialog

### DateTime Libraries

#### (a). JodaTime

_Joda-Time is a datetime library that provides a quality replacement for the Java date and time classes._

Joda-Time is the de facto standard date and time library for Java prior to Java SE 8.

[notice] Note that from Java SE 8 onwards, users are asked to migrate to java.time (JSR-310) - a core part of the JDK which replaces this project. [/notice]

##### Features of Joda-Time

**1\. Easy to Use**.

Calendar makes accessing ‘normal’ dates difficult, due to the lack of simple methods. Joda-Time has straightforward field accessors such as `getYear()` or `getDayOfWeek()`.

**2\. Easy to Extend.**

The JDK supports multiple calendar systems via subclasses of Calendar. This is clunky, and in practice it is very difficult to write another calendar system. Joda-Time supports multiple calendar systems via a pluggable system based on the Chronology class. **3\. Comprehensive Feature Set.**

The library is intended to provide all the functionality that is required for date-time calculations. It already provides out-of-the-box features, such as support for oddball date formats, which are difficult to replicate with the JDK. **4\. Up-to-date Time Zone calculations.**

The time zone implementation is based on the public tz database, which is updated several times a year. New Joda-Time releases incorporate all changes made to this database. Should the changes be needed earlier, manually updating the zone data is easy. **5\. Calendar support.**

The library provides 8 calendar systems. Easy interoperability. The library internally uses a millisecond instant which is identical to the JDK and similar to other common time representations. This makes interoperability easy, and Joda-Time comes with out-of-the-box JDK interoperability.

**6\. Better Performance Characteristics**.

Calendar has strange performance characteristics as it recalculates fields at unexpected moments. Joda-Time does only the minimal calculation for the field that is being accessed.

**7\. Good Test Coverage.**

Joda-Time has a comprehensive set of developer tests, providing assurance of the library’s quality.

**8\. Complete Documentation.**

There is a full User Guide which provides an overview and covers common usage scenarios. The javadoc is extremely detailed and covers the rest of the API.

**9\. Maturity.**

The library has been under active development since 2002. It is a mature and reliable code base. A number of related projects are now available.

**10\. Open Source**. Joda-Time is licenced under the business friendly Apache License Version 2.0.

Here'a simple jadatime usage:

```java
public boolean isAfterPayDay(DateTime datetime) {
  if (datetime.getMonthOfYear() == 2) {   // February is month 2!!
    return datetime.getDayOfMonth() > 26;
  }
  return datetime.getDayOfMonth() > 28;
}

public Days daysToNewYear(LocalDate fromDate) {
  LocalDate newYear = fromDate.plusYears(1).withDayOfYear(1);
  return Days.daysBetween(fromDate, newYear);
}

public boolean isRentalOverdue(DateTime datetimeRented) {
  Period rentalPeriod = new Period().withDays(2).withHours(12);
  return datetimeRented.plus(rentalPeriod).isBeforeNow();
}

public String getBirthMonthText(LocalDate dateOfBirth) {
  return dateOfBirth.monthOfYear().getAsText(Locale.ENGLISH);
}
```

Find more information [here](http://www.joda.org/joda-time/) or [here](https://github.com/JodaOrg/joda-time).

### Awesome DateTimePicker and Calender Libraries

Let's look at some of the best open source DateTimePicker libraries as well as their examples.

#### (a). HorizontalDateTimePicker

_This is an android horizontal datetimepicker tutorial and example._

We see how to create a horizontally scrolling datetime picker. You can easily scroll to a certain date.

The selected date gets shown in a Toast message.

We will be using **HorizontalPicker** Library.

HorizontalPicker is a custom-build Android View used for choosing dates (similar to the native date picker) but draws horizontally into a vertically narrow container. It allows easy day picking using the horizontal pan gesture.

##### Video Tutorial

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw). Basically we have a TV for programming where do daily tutorials especially android.

##### Features of HorizontalPicker

Here are some of the features of HorizontalPicker library:

1. Date selection using a smooth swipe gesture
2. Date selection by clicking on a day slot
3. Date selection from code using the HorizontalPicker java object
4. Month and year view
5. Today button to jump to the current day
6. Localized day and month names
7. Configurable number of generated days (default: 120)
8. Configurable number of offset generated days before the current date (default: 7)
9. Customizable set of colors, or themed through the app theming engine

##### Dependencies of HorizontalPicker

To work with days, HorizontalPicker uses JodaTime library.

##### What is JodaTime

_Joda-Time is a datetime library that provides a quality replacement for the Java date and time classes._

Joda-Time is the de facto standard date and time library for Java prior to Java SE 8.

##### Requirements

1. Android 4.1 or later (Minimum SDK level 16)
2. Android Studio (to compile and use)

##### How do we install and use HorizontalPicker?

In your app module’s Gradle config file, add the following dependency:

```groovy
dependencies {
    implementation 'com.github.jhonnyx2012:horizontal-picker:1.0.6'
}
```

Then to include it into your layout, add the following:

```xml
<com.github.jhonnyx2012.horizontalpicker.HorizontalPicker
    android:id="@+id/datePicker"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"/>
```

In your activity, you need to initialize it and set a listener, like this:

```java
public class MainActivity extends AppCompatActivity implements DatePickerListener {
    @Override
    protected void onCreate(@Nullable final Bundle savedInstanceState) {
        // setup activity
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // find the picker
        HorizontalPicker picker = (HorizontalPicker) findViewById(R.id.datePicker);

        // initialize it and attach a listener
        picker
            .setListener(this)
            .init();
    }

    @Override
    public void onDateSelected(@NonNull final DateTime dateSelected) {
        // log it for demo
        Log.i("HorizontalPicker", "Selected date is " + dateSelected.toString());
    }
}
```

Finally, you can also configure the number of days to show, the date offset, or set a date directly to the picker. For all options, see the full configuration below.

```java
    // at init time
    picker
        .setListener(listner)
        .setDays(20)
        .setOffset(10)
        .setDateSelectedColor(Color.DKGRAY)
        .setDateSelectedTextColor(Color.WHITE)
        .setMonthAndYearTextColor(Color.DKGRAY)
        .setTodayButtonTextColor(getColor(R.color.colorPrimary))
        .setTodayDateTextColor(getColor(R.color.colorPrimary))
        .setTodayDateBackgroundColor(Color.GRAY)
        .setUnselectedDayTextColor(Color.DKGRAY)
        .setDayOfWeekTextColor(Color.DKGRAY)
        .setUnselectedDayTextColor(getColor(R.color.textColor))
        .showTodayButton(false)
        .init();

    // or on the View directly after init was completed
    picker.setBackgroundColor(Color.LTGRAY);
    picker.setDate(new DateTime().plusDays(4));
```

#### Android HorizontalDateTimepicker Full Example

Lets look at a complete example. Here is the demo gif.

![Android HorizontalDateTimePicker](https://camposha.info/wp-content/uploads/2019/12/horizontaldatetimepicker.gif)

Android HorizontalDateTimePicker

##### Tools

1. IDE: Android Studio - androids offical android IDE supported by Jetbrains and Google.
2. Language : Java - The famous java programming language first developed by James Gosling and his team in 1990s.
3. Emulator : Nox Player - An emulator fast enough for my slow machine.

##### Gradle Scripts

We start by exploring our gradle scripts.

##### (a). build.gradle(App)

Here is our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it is located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you have modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

You must set your `minSdkVersion` to atleast `16` as that is the minimum our HorizontalPicker supports.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.devosha.horizontalpicker"
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0-beta01'
    implementation 'com.android.support:recyclerview-v7:28.0.0-beta01'
    implementation 'com.github.jhonnyx2012:horizontal-picker:1.0.6'
}
```

##### Java Code

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (c). MainActivity.java

This is our MainActivity. Here's the full code of the `MainActivity`.

- class MainActivity.
- This is our launcher activity and will display our Horizontal DateTime Picker.
- This class will implement the DatePickerListener interface.

```java
package com.devosha.horizontalpicker;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.github.jhonnyx2012.horizontalpicker.DatePickerListener;
import com.github.jhonnyx2012.horizontalpicker.HorizontalPicker;

import org.joda.time.DateTime;

public class MainActivity extends AppCompatActivity implements DatePickerListener {

    /**
     * Function: onCreate()
     *
     * This is our `onCreate()` callback.
     * First we will inflate the `activity_main()` layout and set it as the layout
     * for this activity via the `setContentView()` method.
     * Then we reference our HorizontalPicker via the findViewById() method.
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        HorizontalPicker picker= (HorizontalPicker) findViewById(R.id.datePicker);
        picker.setListener(this)
                .setDays(120)
                .setOffset(7)
                .setDateSelectedColor(Color.DKGRAY)
                .setDateSelectedTextColor(Color.WHITE)
                .setMonthAndYearTextColor(Color.DKGRAY)
                .setTodayButtonTextColor(getResources().getColor(R.color.colorPrimary))
                .setTodayDateTextColor(getResources().getColor(R.color.colorPrimary))
                .setTodayDateBackgroundColor(Color.GRAY)
                .setUnselectedDayTextColor(Color.DKGRAY)
                .setDayOfWeekTextColor(Color.DKGRAY )
                .setUnselectedDayTextColor(getResources().getColor(R.color.primaryTextColor))
                .showTodayButton(false)
                .init();
        picker.setBackgroundColor(Color.LTGRAY);
        picker.setDate(new DateTime());
    }

    @Override
    public void onDateSelected(DateTime dateSelected) {
        Toast.makeText(this, dateSelected.toString(), Toast.LENGTH_SHORT).show();
    }
    //end
}
```

##### Layout Resources

##### (a). activity_main.xml

This is our main activitys layout. It will contain our HorizontalPicker which will be rendering our dates.

This layout will get inflated into the main activitys user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

We use the following elements:

1. [LinearLayout](https://camposha.info/android/linearlayout)
2. HorizontalPicker

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.github.jhonnyx2012.horizontalpicker.HorizontalPicker
        android:id="@+id/datePicker"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```
