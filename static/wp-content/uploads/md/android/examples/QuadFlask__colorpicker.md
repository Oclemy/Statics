# Simple colorpicker


> Simple android color picker with color wheel and lightness bar.

Here are demo screenshots:

![screenshot3.png](https://github.com/QuadFlask/colorpicker/blob/master/screenshot/screenshot3.png)

![screenshot.png](https://github.com/QuadFlask/colorpicker/blob/master/screenshot/screenshot.png)


### Step 1: Add as a Dependency

This library is not released in Maven Central, but instead you can use [JitPack](https://jitpack.io)

add remote maven url in `allprojects.repositories`

```groovy
allprojects {
	repositories {
		maven { url "https://jitpack.io" }
	}
}
```

then add a library dependency

```groovy
dependencies {
	implementation 'com.github.QuadFlask:colorpicker:0.0.15'
}
```

or, you can manually download `aar` and put into your project's `libs` directory.

and add dependency

```groovy
dependencies {
	compile(name:'[arrFileName]', ext:'aar')
}
```


### Step 2: Use:

As a dialog

```java
ColorPickerDialogBuilder
	.with(context)
	.setTitle("Choose color")
	.initialColor(currentBackgroundColor)
	.wheelType(ColorPickerView.WHEEL_TYPE.FLOWER)
	.density(12)
	.setOnColorSelectedListener(new OnColorSelectedListener() {
		@Override
		public void onColorSelected(int selectedColor) {
			toast("onColorSelected: 0x" + Integer.toHexString(selectedColor));
		}
	})
	.setPositiveButton("ok", new ColorPickerClickListener() {
		@Override
		public void onClick(DialogInterface dialog, int selectedColor, Integer[] allColors) {
			changeBackgroundColor(selectedColor);
		}
	})
	.setNegativeButton("cancel", new DialogInterface.OnClickListener() {
		@Override
		public void onClick(DialogInterface dialog, int which) {
		}
	})
	.build()
	.show();
```
As a widget
```xml
	<com.flask.colorpicker.ColorPickerView
		android:id="@+id/color_picker_view"
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		app:alphaSlider="true"
		app:density="12"
		app:lightnessSlider="true"
		app:wheelType="FLOWER"
		app:lightnessSliderView="@+id/v_lightness_slider"
	    app:alphaSliderView="@+id/v_alpha_slider"
		/>

	<com.flask.colorpicker.slider.LightnessSlider
		android:id="@+id/v_lightness_slider"
		android:layout_width="match_parent"
		android:layout_height="48dp"
		/>

	<com.flask.colorpicker.slider.AlphaSlider
		android:id="@+id/v_alpha_slider"
		android:layout_width="match_parent"
		android:layout_height="48dp"
		/>
```

### Reference

> Read more [here](https://github.com/QuadFlask/colorpicker/).
