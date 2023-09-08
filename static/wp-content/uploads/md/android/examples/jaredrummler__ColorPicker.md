# jaredrummler/ColorPicker

> Yet another open source color picker for Android.

So, why should you use this color picker? It is highly customizable and easy to use. You can simply add the `ColorPreference` to your preferences and a beautiful color picker dialog will be displayed without additional code. The color picker supports alpha and allows you to set your own presets.

Here is the demo:

![](https://github.com/jaredrummler/ColorPicker/raw/master/art/demo.gif)


### Step 1: Install it

Download [the latest AAR](https://repo1.maven.org/maven2/com/jaredrummler/colorpicker/1.1.0/colorpicker-1.1.0.aar) or grab via Gradle:

```groovy
implementation 'com.jaredrummler:colorpicker:1.1.0'
```

### Step 2: Use it

Add the `ColorPreference` to your preference XML:

```xml
<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android"
                  xmlns:app="http://schemas.android.com/apk/res-auto">

  <PreferenceCategory>

    <com.jaredrummler.android.colorpicker.ColorPreference
        android:defaultValue="@color/color_default"
        android:key="default_color"
        android:summary="@string/color_default_summary"
        android:title="@string/color_default_title"/>

    ...

  </PreferenceCategory>

</PreferenceScreen>
```

Note: Using AndroidX's `PreferenceFragmentCompat`? Then use `com.jaredrummler.android.colorpicker.ColorPreferenceCompat`

You can add attributes to customize the `ColorPreference`:

| name                | type      | documentation                                                                         |
|---------------------|-----------|---------------------------------------------------------------------------------------|
| cpv_dialogType      | enum      | "custom" to show the color picker, "preset" to show pre-defined colors                |
| cpv_showAlphaSlider | boolean   | Show a slider for changing the alpha of a color (adding transparency)                 |
| cpv_colorShape      | enum      | "square" or "circle" for the shape of the color preview                               |
| cpv_colorPresets    | reference | An int-array of pre-defined colors to show in the dialog                              |
| cpv_dialogTitle     | reference | The string resource id for the dialog title. By default the title is "Select a Color" |
| cpv_showColorShades | boolean   | true to show different shades of the selected color                                   |
| cpv_allowPresets    | boolean   | true to add a button to toggle to the custom color picker                             |
| cpv_allowCustom     | boolean   | true to add a button to toggle to the presets color picker                            |
| cpv_showDialog      | boolean   | true to let the ColorPreference handle showing the dialog                             |

You can also show a `ColorPickerDialog` without using the `ColorPreference`:

```java
ColorPickerDialog.newBuilder().setColor(color).show(activity);
```

All the attributes above can also be applied to the `ColorPickerDialog`. The activity that shows the dialog *must* 
implement `ColorPickerDialogListener` to get a callback when a color is selected.

### Reference

Read more [here](https://github.com/jaredrummler/ColorPicker).
