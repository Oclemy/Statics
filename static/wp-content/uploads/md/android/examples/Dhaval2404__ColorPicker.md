# ColorPicker View

> Yet another Color Picker Library for Android. 
 
It is highly customizable and easy to use. Pick the color from wheel or select Material Colors from dialog. The original ColorPickerView was written by [Hong Duan](https://github.com/duanhong169/ColorPicker).

Here are its main features:

* Color Picker View
* Color Picker Dialog with Recent Color Option
* Material Color Picker Alert Dialog
* Material Color Picker BottomSheet Dialog

Here is a demo:

![](https://github.com/Dhaval2404/ColorPicker/blob/master/art/colorpicker_demo.gif)  

### Step 1: Install it

1. Gradle dependency:

	```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
	```

	```groovy
	implementation 'com.github.Dhaval2404:ColorPicker:2.3'
	```

### Step 2:  Build and Show:

The **ColorPicker** configuration is created using the builder pattern.

```kotlin
    // Kotlin Code
    ColorPickerDialog
        .Builder(this)        				// Pass Activity Instance
        .setTitle("Pick Theme")           	// Default "Choose Color"
        .setColorShape(ColorShape.SQAURE)   // Default ColorShape.CIRCLE
        .setDefaultColor(mDefaultColor)     // Pass Default Color
        .setColorListener { color, colorHex ->
        	// Handle Color Selection
        }
        .show()
```

Java:

```java
    // Java Code
    new ColorPickerDialog
        .Builder(this)
        .setTitle("Pick Theme")
        .setColorShape(ColorShape.SQAURE)
        .setDefaultColor(mDefaultColor)
        .setColorListener(new ColorListener() {
            @Override
            public void onColorSelected(int color, @NotNull String colorHex) {
                // Handle Color Selection
            }
        })
        .show();
````


The **MaterialColorPicker** configuration is created using the builder pattern.

```kotlin
    // Kotlin Code
    MaterialColorPickerDialog
        .Builder(this)        					// Pass Activity Instance
        .setTitle("Pick Theme")           		// Default "Choose Color"
        .setColorShape(ColorShape.SQAURE)   	// Default ColorShape.CIRCLE
        .setColorSwatch(ColorSwatch._300)   	// Default ColorSwatch._500
        .setDefaultColor(mDefaultColor) 		// Pass Default Color
        .setColorListener { color, colorHex ->
       		// Handle Color Selection
        }
        .show()
```

Java:

```java
    // Java Code
    new MaterialColorPickerDialog
        .Builder(this)
        .setTitle("Pick Theme")
        .setColorShape(ColorShape.SQAURE)
        .setColorSwatch(ColorSwatch._300)
        .setDefaultColor(mDefaultColor)
        .setColorListener(new ColorListener() {
            @Override
            public void onColorSelected(int color, @NotNull String colorHex) {
            	// Handle Color Selection
            }
        })
        .show();
```

### Reference

Read more [here](https://github.com/Dhaval2404/ColorPicker/)
