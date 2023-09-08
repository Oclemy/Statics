`<category>`
==========

syntax:

```xml
<category android:name\="_string_" />
```

contained in: `<intent-filter>` description: Adds a category name to an intent filter. See Intents and Intent Filters for details on intent filters and the role of category specifications within a filter. attributes: `android:name` The name of the category. Standard categories are defined in the `Intent` class as `CATEGORY__name_` constants. The name assigned here can be derived from those constants by prefixing "`android.intent.category.`" to the `_name_` that follows `CATEGORY_`. For example, the string value for `CATEGORY_LAUNCHER` is "`android.intent.category.LAUNCHER`".

**Note:** In order to receive implicit intents, you must include the `CATEGORY_DEFAULT` category in the intent filter. The methods `startActivity())` and `startActivityForResult())` treat all intents as if they declared the `CATEGORY_DEFAULT` category. If you do not declare it in your intent filter, no implicit intents will resolve to your activity.

Custom categories should use the package name as a prefix, to ensure that they are unique.

introduced in: API Level 1 see also: `<action>`
`<data>`