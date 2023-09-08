# Android ColorPicker


> An AndroidColorPicker Library.

Here is the demo screenshot:

<img src="https://github.com/mejdi14/AndroidColorPicker/blob/master/images/original.gif" height="400" width="550" >

	
### Step 1: Installation

Add this in your root `build.gradle` file (**not** your module `build.gradle` file):

```groovy
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
``` 

Then declare the dependency:

Add this to your module's `build.gradle` file (make sure the version matches the JitPack badge above):

```groovy
dependencies {
	...
	implementation 'com.github.mejdi14:AndroidColorPicker:1.0.2'
}
```


### Step 2: Use it

Use it with Kotlin as shown below:

``` kotlin
    MHColorsDialog(this)
                .setColorListener { color, colorHex ->
                    // color and colorHex are the chosen color
                }
                .show()
```

Here is how you use it with Java: 

``` java
  MHColorsDialog mhColorsDialog=new MHColorsDialog(MainActivity.this);
                mhColorsDialog.setColorListener(new ColorListener() {
                    @Override
                    public void onColorSelected(int color, @NotNull String colorHex) {
                          // color and colorHex are the chosen color
                    }
                });
                mhColorsDialog.show();
```


### ColorPicker Dark Mode

Dark Mode
-----
<img src="https://github.com/mejdi14/AndroidColorPicker/blob/master/images/dark4.png" alt="sample" title="sample" width="320" height="350" align="right" vspace="52" />

``` kotlin
 .withDarkMode()
```

Add new colors
-----

``` kotlin
 .addColors(colorsList,ColorsPosition.START)
```

where colorsList is an` ArrayList<Int>` (every Int represent a color).
ColorsPosition is where your colors should be in the final list of colors (Start or End)
	
Use your own colors as shown below:


``` kotlin
 .withMyOwnColors(colorsList)
```
where colorsList is an `ArrayList<Int>` (every Int represent a color)
this will make the library ignore the default colors and use only your colors from colorsList	

### Reference

Read more [here](https://github.com/mejdi14/AndroidColorPicker).

