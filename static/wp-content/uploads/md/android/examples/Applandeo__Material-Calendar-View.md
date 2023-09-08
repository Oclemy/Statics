# Material Calendar View


> Material-Calendar-View is a simple and customizable calendar widget for Android based on Material Design.

The widget has two funcionalities: a date picker to select dates (available as an XML widget and a dialog) and a classic calendar. The date picker can work either as a single day picker, many days picker or range picker.

![](https://user-images.githubusercontent.com/2614225/46456381-f72da200-c7ae-11e8-8284-1799fe83a1c9.png) 

![device-2018-01-04-125741](https://user-images.githubusercontent.com/2614225/34562842-709a71ee-f150-11e7-966b-cbbe6169b88b.png) 

Here are its main Features:

* Material Design
* Single date picker
* Many dates picker
* Range picker
* Events icons
* Fully colors customization
* Customized font


### Step 1: Installation

Make sure you are using Java 8 in your project. If not, add below code to **build.gradle** file:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

Add the dependency to module's **build.gradle** file:

```groovy
dependencies {
    implementation 'com.applandeo:material-calendar-view:1.7.0'
}
```

### Step 2: Add to Layout

To your **XML layout** file add:

```xml
<com.applandeo.materialcalendarview.CalendarView
    android:id="@+id/calendarView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### Step 3: Write Code

Adding events with icons:

```java
List<EventDay> events = new ArrayList<>();

Calendar calendar = Calendar.getInstance();
events.add(new EventDay(calendar, R.drawable.sample_icon));
//or
events.add(new EventDay(calendar, new Drawable()));
//or if you want to specify event label color
events.add(new EventDay(calendar, R.drawable.sample_icon, Color.parseColor("#228B22")));

CalendarView calendarView = (CalendarView) findViewById(R.id.calendarView);
calendarView.setEvents(events);
```

You can use our utils method to create Drawable with text:

```java
CalendarUtils.getDrawableText(Context context, String text, Typeface typeface, int color, int size);
```

Clicks handling:

```java
calendarView.setOnDayClickListener(new OnDayClickListener() {
    @Override
    public void onDayClick(EventDay eventDay) {
        Calendar clickedDayCalendar = eventDay.getCalendar();    
    }
});
```

...or long click:
```java
calendarView.setOnDayLongClickListener(new OnDayLongClickListener() {
    @Override
    public void onDayLongClick(EventDay eventDay) {
        Calendar clickedDayCalendar = eventDay.getCalendar();
    }
});
```

If you want to get all selected days, especially if you use multi date or range picker you should use the following code:

```java
List<Calendar> selectedDates = calendarView.getSelectedDates();
```
...or if you want to get the first selected day, for example in case of using single date picker, you can use:
```java
Calendar selectedDate = calendarView.getFirstSelectedDate();
```

Setting a current date:

```java
Calendar calendar = Calendar.getInstance();
calendar.set(2019, 7, 5);

calendarView.setDate(calendar);
```

Setting minumum and maximum dates:

```java
Calendar min = Calendar.getInstance();
Calendar max = Calendar.getInstance();

calendarView.setMinimumDate(min);
calendarView.setMaximumDate(max);
```

Setting disabled dates:

```java
List<Calendar> calendars = new ArrayList<>();
calendarView.setDisabledDays(calendars);
```


Previous and forward page change listeners:

```java
calendarView.setOnPreviousPageChangeListener(new OnCalendarPageChangeListener() {
    @Override
    public void onChange() {
        ...
    }
});

calendarView.setOnForwardPageChangeListener(new OnCalendarPageChangeListener() {
    @Override
    public void onChange() {
        ...
    }
});
```

### Reference

Read more [here](https://github.com/Applandeo/Material-Calendar-View).
