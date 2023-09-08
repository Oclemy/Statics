# Beautiful colorpicker


> A beautiful colorpicker library for Android.

<img src="https://raw.githubusercontent.com/vadiole/colorpicker/master/assets/1_l.png" alt="screenshot 1" width="25%" height="25%">

<img src="https://raw.githubusercontent.com/vadiole/colorpicker/master/assets/2_l.png" alt="screenshot 2" width="25%" height="25%">

Here are its main features:

- Simple dialog builder 
- ARGB, RGB & HSV color models
- Dark theme support
- Sliders with gradient background
- Switch color models in runtime


### Step 1: Install it:

```gradle
dependencies {
    implementation 'io.github.vadiole:colorpicker:1.0.2'
}
```

### Step 2: Pick Colors

Pick colors as shown below:

```kotlin

//  create dialog
val colorPicker: ColorPickerDialog = ColorPickerDialog.Builder()

                //  set initial (default) color
                .setInitialColor(currentColor)

                //  set Color Model. ARGB, RGB or HSV
                .setColorModel(ColorModel.HSV)

                //  set is user be able to switch color model
                .setColorModelSwitchEnabled(true)

                //  set your localized string resource for OK button
                .setButtonOkText(android.R.string.ok)

                //  set your localized string resource for Cancel button
                .setButtonCancelText(android.R.string.cancel)

                //  callback for picked color (required)
                .onColorSelected { color: Int ->
                    //  use color
                }

                //  create dialog
                .create()
                
                
//  show dialog from Activity
colorPicker.show(supportFragmentManager, "color_picker") 

//  show dialog from Fragment
colorPicker.show(childFragmentManager, "color_picker")      
```

### Reference

Read more [here](https://github.com/vadiole/colorpicker)
