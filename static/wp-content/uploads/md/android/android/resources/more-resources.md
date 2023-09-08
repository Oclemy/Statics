More resource types
===================

>   On this page you will learn:

*   Bool
*   Color
*   Dimension
*   ID
*   Integer
*   Integer array
*   Typed array

This page defines more types of resources you can externalize, including:

Bool XML resource that carries a boolean value. Color XML resource that carries a color value (a hexadecimal color). Dimension XML resource that carries a dimension value (with a unit of measure). ID XML resource that provides a unique identifier for application resources and components. Integer XML resource that carries an integer value. Integer Array XML resource that provides an array of integers. Typed Array XML resource that provides a `TypedArray` (which you can use for an array of drawables).

Bool
----

A boolean value defined in XML.

**Note:** A bool is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine bool resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`

The filename is arbitrary. The `<bool>` element's `name` will be used as the resource ID. resource reference: In Java: `R.bool._bool_name_`

In XML: `@[_package_:]bool/_bool_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <bool

    name="_bool\_name_"
    >\[true | false\]</bool>

</resources>
```
elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<bool>` A boolean value: `true` or `false` .

attributes:

`name` _String_. A name for the bool value. This will be used as the resource ID. example: XML file saved at `res/values-small/bools.xml` :

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <bool name="screen\_small">true</bool>
  <bool name="adjust\_view\_bounds">true</bool>
</resources>
```
This application code retrieves the boolean:

**Kotlin**

```kotlin
val screenIsSmall: Boolean = `resources)`.`getBoolean)`(R.bool.screen\_small)
```

**Java**

```java
Resources res = `getResources())`;
boolean screenIsSmall = res.`getBoolean)`(R.bool.screen\_small);
```

This layout XML uses the boolean for an attribute:
```xml
<ImageView
  android:layout\_height="fill\_parent"
  android:layout\_width="fill\_parent"
  android:src="@drawable/logo"
  android:adjustViewBounds="@bool/adjust\_view\_bounds" />
```
Color
-----

A color value defined in XML. The color is specified with an RGB value and alpha channel. You can use a color resource any place that accepts a hexadecimal color value. You can also use a color resource when a drawable resource is expected in XML (for example, `android:drawable="@color/green"` ).

The value always begins with a pound (#) character and then followed by the Alpha-Red-Green-Blue information in one of the following formats:

*   #_RGB_
*   #_ARGB_
*   #_RRGGBB_
*   #_AARRGGBB_

**Note:** A color is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine color resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/colors.xml`

The filename is arbitrary. The `<color>` element's `name` will be used as the resource ID. resource reference: In Java: `R.color._color_name_`

In XML: `@[_package_:]color/_color_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <color

    name="_color\_name_"
    >_hex\_color_</color>

</resources>
```
elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<color>` A color expressed in hexadecimal, as described above.

attributes:

`name` _String_. A name for the color. This will be used as the resource ID. example: XML file saved at `res/values/colors.xml` :

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
 <color name="opaque\_red">#f00</color>
 <color name="translucent\_red">#80ff0000</color>
</resources>
```
This application code retrieves the color resource:

**Kotlin**

```kotlin

val color: Int = `resources)`.`getColor)`(R.color.opaque\_red)
```

**Java**

```java
Resources res = `getResources())`;
int color = res.`getColor)`(R.color.opaque\_red);
```

This layout XML applies the color to an attribute:

```xml
<TextView
  android:layout\_width="fill\_parent"
  android:layout\_height="wrap\_content"
  android:textColor="@color/translucent\_red"
  android:text="Hello"/>
  ```

Dimension
---------

A dimension value defined in XML. A dimension is specified with a number followed by a unit of measure. For example: 10px, 2in, 5sp. The following units of measure are supported by Android:

`dp` Density-independent Pixels - An abstract unit that is based on the physical density of the screen. These units are relative to a 160 dpi (dots per inch) screen, on which 1dp is roughly equal to 1px. When running on a higher density screen, the number of pixels used to draw 1dp is scaled up by a factor appropriate for the screen's dpi. Likewise, when on a lower density screen, the number of pixels used for 1dp is scaled down. The ratio of dp-to-pixel will change with the screen density, but not necessarily in direct proportion. Using dp units (instead of px units) is a simple solution to making the view dimensions in your layout resize properly for different screen densities. In other words, it provides consistency for the real-world sizes of your UI elements across different devices. `sp` Scale-independent Pixels - This is like the dp unit, but it is also scaled by the user's font size preference. It is recommend you use this unit when specifying font sizes, so they will be adjusted for both the screen density and the user's preference. `pt` Points - 1/72 of an inch based on the physical size of the screen, assuming a 72dpi density screen. `px` Pixels - Corresponds to actual pixels on the screen. This unit of measure is not recommended because the actual representation can vary across devices; different devices may have a different number of pixels per inch and may have more or fewer total pixels available on the screen. `mm` Millimeters - Based on the physical size of the screen. `in` Inches - Based on the physical size of the screen.

**Note:** A dimension is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine dimension resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The `<dimen>` element's `name` will be used as the resource ID. resource reference: In Java: `R.dimen._dimension_name_`
In XML: `@[_package_:]dimen/_dimension_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <dimen
    name="_dimension\_name_"
    >_dimension_</dimen>
</resources>

```
elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<dimen>` A dimension, represented by a float, followed by a unit of measurement (dp, sp, pt, px, mm, in), as described above.

attributes:

`name` _String_. A name for the dimension. This will be used as the resource ID. example: XML file saved at `res/values/dimens.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <dimen name="textview\_height">25dp</dimen>
  <dimen name="textview\_width">150dp</dimen>
  <dimen name="ball\_radius">30dp</dimen>
  <dimen name="font\_size">16sp</dimen>
</resources>
```

This application code retrieves a dimension:

**Kotlin**  ```kotlin
```kotlin
val fontSize: Float = `resources)`.`getDimension)`(R.dimen.font\_size)
```

**Java**
```java
Resources res = `getResources())`;
float fontSize = res.`getDimension)`(R.dimen.font\_size);
```

This layout XML applies dimensions to attributes:

```xml
<TextView
  android:layout\_height="@dimen/textview\_height"
  android:layout\_width="@dimen/textview\_width"
  android:textSize="@dimen/font\_size"/>
```

ID
--

A unique resource ID defined in XML. Using the name you provide in the `<item>` element, the Android developer tools create a unique integer in your project's `R.java` class, which you can use as an identifier for an application resources (for example, a `View` in your UI layout) or a unique integer for use in your application code (for example, as an ID for a dialog or a result code).

**Note:** An ID is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine ID resources with other simple resources in the one XML file, under one `<resources>` element. Also, remember that an ID resources does not reference an actual resource item; it is simply a unique ID that you can attach to other resources or use as a unique integer in your application.

file location: `res/values/_filename.xml_`
The filename is arbitrary. resource reference: In Java: `R.id._name_`
In XML: `@[_package_:]id/_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <item
    type="id"
    name="_id\_name_" />
</resources>
```
elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<item>` Defines a unique ID. Takes no value, only attributes.

attributes:

`type` Must be "id". `name` _String_. A unique name for the ID. example:

XML file saved at `res/values/ids.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <item type="id" name="button\_ok" />
  <item type="id" name="dialog\_exit" />
</resources>
```

Then, this layout snippet uses the "button\_ok" ID for a Button widget:

```xml
<Button android:id="**@id/button\_ok**"
  style="@style/button\_style" />
```

Notice that the `android:id` value does not include the plus sign in the ID reference, because the ID already exists, as defined in the `ids.xml` example above. (When you specify an ID to an XML resource using the plus sign—in the format `android:id="@+id/name"`—it means that the "name" ID does not exist and should be created.)

As another example, the following code snippet uses the "dialog\_exit" ID as a unique identifier for a dialog:

**Kotlin**

```kotlin
showDialog

```

**Java**

```java
showDialog

```

In the same application, the "dialog\_exit" ID is compared when creating a dialog:

**Kotlin**

```kotlin

override fun `onCreateDialog)`(id: Int): Dialog? {
  return when(id) {
    R.id.dialog\_exit -> {
      ...
    }
    else -> {
      null
    }
  }
}
```

**Java**

```java
protected Dialog `onCreateDialog)`(int id) {
  Dialog dialog;
  switch(id) {
  case R.id.dialog\_exit:
    ...
    break;
  default:
    dialog = null;
  }
  return dialog;
}
```

Integer
-------

An integer defined in XML.

**Note:** An integer is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine integer resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename.xml_`
The filename is arbitrary. The `<integer>` element's `name` will be used as the resource ID. resource reference: In Java: `R.integer._integer_name_`
In XML: `@[_package_:]integer/_integer_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <integer
    name="_integer\_name_"
    >_integer_</integer>
</resources>
```


elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<integer>` An integer.

attributes:

`name` _String_. A name for the integer. This will be used as the resource ID. example:

XML file saved at `res/values/integers.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <integer name="max\_speed">75</integer>
  <integer name="min\_speed">5</integer>
</resources>
```

This application code retrieves an integer:

**Kotlin**

```kotlin

val maxSpeed: Int = `resources)`.`getInteger)`(R.integer.max\_speed)
```

**Java**

```java
Resources res = `getResources())`;
int maxSpeed = res.`getInteger)`(R.integer.max\_speed);
```

Integer array
-------------

An array of integers defined in XML.

**Note:** An integer array is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine integer array resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The `<integer-array>` element's `name` will be used as the resource ID. compiled resource datatype: Resource pointer to an array of integers. resource reference: In Java: `R.array._integer_array_name_`
In XML: `@[_package_:]array/_integer_array_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <integer-array
    name="_integer\_array\_name_">
    <item
      >_integer_</item>
  </integer-array>
</resources>
```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<integer-array>` Defines an array of integers. Contains one or more child `<item>` elements.

attributes:

`android:name` _String_. A name for the array. This name will be used as the resource ID to reference the array. `<item>` An integer. The value can be a reference to another integer resource. Must be a child of a `<integer-array>` element.

No attributes.

example: XML file saved at `res/values/integers.xml` :

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <integer-array name="bits">
    <item>4</item>
    <item>8</item>
    <item>16</item>
    <item>32</item>
  </integer-array>
</resources>
```

This application code retrieves the integer array:

**Kotlin**

```kotlin

val bits: IntArray = `resources)`.`getIntArray)`(R.array.bits)
```

**Java**

```java
Resources res = `getResources())`;
int\[\] bits = res.`getIntArray)`(R.array.bits);
```

Typed array
-----------

A `TypedArray` defined in XML. You can use this to create an array of other resources, such as drawables. Note that the array is not required to be homogeneous, so you can create an array of mixed resource types, but you must be aware of what and where the data types are in the array so that you can properly obtain each item with the `TypedArray` 's `get...()` methods.

**Note:** A typed array is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine typed array resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`

The filename is arbitrary. The `<array>` element's `name` will be used as the resource ID. compiled resource datatype: Resource pointer to a `TypedArray` . resource reference: In Java: `R.array._array_name_`

In XML: `@[_package_:]array/_array_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <array
    name="_integer\_array\_name_">
    <item\>_resource_</item>
  </array>
</resources>
```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<array>` Defines an array. Contains one or more child `<item>` elements.

attributes:

`android:name` _String_. A name for the array. This name will be used as the resource ID to reference the array. `<item>` A generic resource. The value can be a reference to a resource or a simple data type. Must be a child of an `<array>` element.

No attributes.

example: XML file saved at `res/values/arrays.xml` :

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <array name="icons">
    <item>@drawable/home</item>
    <item>@drawable/settings</item>
    <item>@drawable/logout</item>
  </array>
  <array name="colors">
    <item>#FFFF0000</item>
    <item>#FF00FF00</item>
    <item>#FF0000FF</item>
  </array>
</resources>

```

This application code retrieves each array and then obtains the first entry in each array:

**Kotlin**

```kotlin
val icons: TypedArray = `resources)`.`obtainTypedArray)`(R.array.icons)
val drawable: Drawable = icons.`getDrawable)`(0)

val colors: TypedArray = `resources)`.`obtainTypedArray)`(R.array.colors)
val color: Int = colors.`getColor)`(0,0)
```

**Java**

```java
Resources res = `getResources())`;
TypedArray icons = res.`obtainTypedArray)`(R.array.icons);
Drawable drawable = icons.`getDrawable)`(0);

TypedArray colors = res.`obtainTypedArray)`(R.array.colors);
int color = colors.`getColor)`(0,0);
```
