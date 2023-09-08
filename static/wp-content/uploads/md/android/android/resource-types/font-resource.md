# Font resources

A font resource defines a custom font that you can use in your app. Fonts can be individual font files or a collection of font files, known as a font family and defined in XML.

Also see how to define fonts in XML or instead use downloadable fonts.

Bundled font
------------

You can bundle fonts as resources in an app. Fonts are compiled in `R` file and are automatically available in the system as a resource. You can then access these fonts with the help of the `font` resource type.

file location:

`res/font/filename.ttf` (`.ttf`, `.ttc`, `.otf`, or `.xml`)  
The filename is used as the resource ID.

resource reference:

In XML: `@[package:]font/font_name`

syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family>
  <font
    android:font="@[package:]font/font_to_include"
    android:fontStyle=["normal" | "italic"]
    android:fontWeight="weight_value" />
</font-family>
```

elements:

`<font-family>`

**Required.** This must be the root node.

No attributes.

`<font>`

Defines a single font within a family. Contains no child nodes.

attributes:

`android:fontStyle`

_Keyword_. Defines the font style. This attribute is used when the font is loaded into the font stack and overrides any style information in the font's header tables. If you do not specify the attribute, the app uses the value from the font's header tables. The constant value must be either `normal` or `italic`.

`android:fontWeight`

_Integer_. The weight of the font. This attribute is used when the font is loaded into the font stack and overrides any weight information in the font's header tables. The attribute value _must_ be a positive number, a multiple of 100, and between 100 and 900, inclusive. If you do not specify the attribute, the app uses the value from the font's header tables.The most common values are 400 for regular weight and 700 for bold weight.

example:

XML file saved at `res/font/lobster.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android">
    <font
        android:fontStyle="normal"
        android:fontWeight="400"
        android:font="@font/lobster_regular" />
    <font
        android:fontStyle="italic"
        android:fontWeight="400"
        android:font="@font/lobster_italic" />
</font-family>
```

XML file that applies the font to a `TextView` is saved in `res/layout/`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<EditText
    android:fontFamily="@font/lobster"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="Hello, World!" />
```

Downloadable font
-----------------

A downloadable font resource defines a custom font that you can use in an app. This font is not available in the app itself; instead the font is retrieved from a font provider.

file location:

`res/font/filename.xml` The filename is used as the resource ID.

resource reference:

In XML:`@[package:]font/font_name`

syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family
    android:fontProviderAuthority="authority"
    android:fontProviderPackage="package"
    android:fontProviderQuery="query"
    android:fontProviderCerts="@[package:]array/array_resource" />
```

elements:

`<font-family>`

**Required.** This must be the root node.

attributes:

`android:fontProviderAuthority`

_String_. **Required**. The authority of the font provider that defines the font request.

`android:fontProviderPackage`

_String_. **Required**. The package name of the Font Provider to be used for the request. This is used to verify the identity of the provider.

`android:fontProviderQuery`

_String_. **Required**. The string query of the font. Refer to your font provider's documentation on the format of this string.

`android:fontProviderCerts`

_Array resource_. **Required**. Defines the sets of hashes for the certificates used to sign this provider. This is used to verify the identity of the provider and is only required if the provider is not part of the system image. The value can point to a single list (string array resource) or a list of lists (array resource), where each individual list represents one collection of signature hashes. Refer to your font provider's documentation for these values.

example:

XML file saved at `res/font/lobster.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android"
    android:fontProviderAuthority="com.example.fontprovider.authority"
    android:fontProviderPackage="com.example.fontprovider"
    android:fontProviderQuery="Lobster"
    android:fontProviderCerts="@array/certs">
</font-family>
```

XML file that defines the cert array is saved in `res/values/`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="certs">
      <item>MIIEqDCCA5CgAwIBAgIJA071MA0GCSqGSIb3DQEBBAUAMIGUMQsww...</item>
    </string-array>
</resources>
```

XML file that applies the font to a `TextView` is saved in `res/layout/`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<EditText
    android:fontFamily="@font/lobster"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="Hello, World!" />
```