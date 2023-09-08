# Android Dialer Example


> A reusable dialer implementation extracted from AOSP.

Here is the demo screenshot:

![Android Dialoer](https://github.com/dialogs/android-dialer/raw/master/demo.gif?raw=true)

### Step 1: Install it

```groovy
repositories {
    jcenter()
}
implementation 'im.dlg:android-dialer:1.2.5'
```

### Step 2: Usage

Within fragment

Just add the `DialpadFragment` into your activity and make sure the activity implements
`DialpadFragment.Callback`:

```java
interface Callback {
    void ok(String formatted, String raw);
}
```

The formatted string contains the input as it displayed to user (+1 555-546-0001) and the raw
string contains characters only (+15555460001).


Or Via `startActivityForResult`

```java
Intent intent = new Intent(context, DialpadActivity.class);
startActivityForResult(intent, 100); // any result request code is ok
```

And then in your `onActivityResult`:

```java
@Override
override void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (resultCode == Activity.RESULT_OK) {
        String formatted = data.getStringExtra(DialpadActivity.EXTRA_RESULT_FORMATTED);
        String raw = data.getStringExtra(DialpadActivity.EXTRA_RESULT_RAW);
        ...
    }
}
```

### Configuration

Whether you're using a fragment or an activity, you can provide configuration via extras.
For a fragment use `setArguments`, and for activity use intent extras.

Arguments are:

1) `EXTRA_REGION_CODE` (string): Region code for the phone formatter. Default is `US`.
2) `EXTRA_FORMAT_AS_YOU_TYPE` (boolean): Enable phone formatting. If disabled, both `formatted` and
`raw` results will be the same. Default is `true`.
3) `EXTRA_ENABLE_STAR` (boolean): Will show the 'star' symbol. Default is `true`.
4) `EXTRA_ENABLE_POUND` (boolean): Will show the 'pound' symbol. Default is `true`.
5) `EXTRA_ENABLE_PLUS` (boolean): Will show the 'plus' symbol. Default is `true`.
6) `EXTRA_CURSOR_VISIBLE` (boolean): Will show the cursor in the digits `EditText`. Default is `false`.

### Styles

The dialer is styled using android theme colors; the button color is `colorAccent` and digits color is `colorPrimary`.

### Reference

Read more [here](https://github.com/dialogs/android-dialer).
