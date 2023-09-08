Style resource
==============

A style resource defines the format and look for a UI. A style can be applied to an individual `View` (from within a layout file) or to an entire `Activity` or application (from within the manifest file).

For more information about creating and applying styles, please read Styles and Themes.

**Note:** A style is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine style resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The element's `name` will be used as the resource ID. resource reference: In XML: `@[package:]style/_style_name_` syntax:


```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <style
    name="_style\_name_"
    parent="@\[package:\]style/_style\_to\_inherit_">
    <item
      name="_\[package:\]style\_property\_name_"
      >_style\_value_</item>
  </style>
</resources>

```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<style>` Defines a single style. Contains `<item>` elements.

attributes:

`name` _String_. **Required**. A name for the style, which is used as the resource ID to apply the style to a View, Activity, or application. `parent` _Style resource_. Reference to a style from which this style should inherit style properties. `<item>` Defines a single property for the style. Must be a child of a `<style>` element.

attributes:

`name` _Attribute resource_. **Required**. The name of the style property to be defined, with a package prefix if necessary (for example `android:textColor`). example: XML file for the style (saved in `res/values/`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <style name="CustomText" parent="@style/Text">
    <item name="android:textSize">20sp</item>
    <item name="android:textColor">#008</item>
  </style>
</resources>

```
XML file that applies the style to a `TextView` (saved in `res/layout/`):

```xml

<?xml version="1.0" encoding="utf-8"?>
<EditText
  style="@style/CustomText"
  android:layout\_width="fill\_parent"
  android:layout\_height="wrap\_content"
  android:text="Hello, World!" />

```